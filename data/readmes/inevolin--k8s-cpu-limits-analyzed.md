# Kubernetes CPU limits make your apps slow and costly

*Platform engineering · analysis*

We tested the same app with and without a CPU limit. Same code, same CPU request, same load.
The only difference was the limit. Here is what we measured — and how to check it on your own
cluster.

## TL;DR

- **Remove CPU limits.** They freeze your apps many times per second, even when the node has free CPU.
- **Keep CPU requests.** Requests are the real protection. They guarantee every app its share.
- **Keep memory limits.** Memory is different. A memory limit still protects the node.
- **Faster:** tail latency holds up under traffic peaks instead of collapsing, and CPU-bound startup work finishes about 2x sooner (sections 5, 10).
- **Less hardware:** most clusters reserve far more CPU than they ever use at peak. Right-sizing requests after dropping limits lets a meaningful share of nodes go (section 10).
- **Cheaper:** a worked, illustrative cost model puts this in the tens of thousands of dollars per year per cluster (section 10) — plug in your own prices to get a real number.

**In this analysis:** [1. Requests vs limits](#1-two-settings-two-very-different-jobs) · [2. How throttling works](#2-how-a-limit-really-stops-your-app) · [3. CFS fair sharing](#3-without-limits-who-shares-the-cpu-meet-cfs) · [4. The worst case](#4-but-if-all-pods-use-100-cpu-at-once-the-node-will-die) · [5. What we measured](#5-we-measured-it-same-app-with-and-without-a-limit) · [6. Noisy neighbor](#6-the-noisy-neighbor-test-does-a-busy-pod-slow-down-its-neighbors) · [7. When it breaks](#7-how-a-tight-cpu-limit-cascades-into-an-outage) · [8. One step for .NET](#8-one-extra-step-for-net-apps) · [9. The plan](#9-the-plan) · [10. Outcomes](#10-outcomes-what-do-you-win-and-is-it-worth-it) · [11. Q&A](#11-qa-the-hard-questions-answered-up-front) · [12. Glossary](#12-words-used-in-this-analysis)

**Going deeper.** This page is the argument. Each claim in it is backed by a longer document,
linked inline as you read and collected here:

| | |
|---|---|
| [docs/01-theory.md](docs/01-theory.md) | The cgroup mechanics: `cpu.max` vs `cpu.weight`, multi-thread quota burn, and the one configuration where a CPU limit genuinely helps. |
| [docs/02-dotnet.md](docs/02-dotnet.md) | What a CPU limit does to a .NET runtime: `ProcessorCount`, ThreadPool starvation, GC heap count, and how a *CPU* limit causes a *memory* kill. |
| [docs/03-postgres.md](docs/03-postgres.md) | Postgres specifics: why it ignores your quota when sizing itself, and which effects this PoC measured versus merely inferred. |
| [docs/04-objections.md](docs/04-objections.md) | Every counter-argument we met, answered — noisy neighbors, HPA/KEDA, QoS class, multi-tenancy, and when limits *are* right. |
| [docs/05-cost.md](docs/05-cost.md) | The full cost model, its assumptions, and the memory floor that stops freed cores becoming freed money. |
| [docs/06-rollout.md](docs/06-rollout.md) | The staged rollout: six steps, what gates what, and the one-line rollback. |
| [results/](results/) | Raw output from the benchmark run, plus the per-scenario reports the numbers below come from. |

---

## 1. Two settings, two very different jobs

| | CPU request | CPU limit |
|---|---|---|
| **What it is** | A guaranteed slice of CPU | A hard ceiling, a wall |
| **Protects other apps?** | Yes. CPU is shared by request size. | No. It only blocks its own app. |
| **Idle CPU on the node** | App may borrow it for free | Wasted. The limit blocks it. |

![A node with 4 cores, an app with a 1-core request. With a CPU limit, borrowing idle CPU stops at the wall. Without a limit, all idle CPU is free to borrow for bursts.](assets/01-request-vs-limit.png)

*Same app twice. The only difference is access to the node's idle CPU. The request (solid) is identical in both rows — borrowing idle CPU takes nothing from anyone.*

> **Deeper:** these are two different cgroup files, not two settings of one knob.
> [docs/01-theory.md](docs/01-theory.md#cpuweight-what-requests-actually-buy) walks through
> `cpu.max` (the limit) and `cpu.weight` (the request) and what each one actually controls.

## 2. How a limit really stops your app

The kernel (the core part of the operating system) enforces limits in **windows of 100
milliseconds**. A 500m limit (500 millicores, half a core) means: 50 ms of CPU time per
window. When the budget runs out, the kernel **freezes the whole app** until the
next window. This is **throttling**.

A typical .NET service runs many threads: HTTP handlers, background consumers, and the GC (the garbage
collector). **All threads share one budget.** Our test node has 4 cores, so at most
4 threads can run at the same instant. 8 busy threads still use up the 50 ms budget in about
12.5 ms of real time:

![Three windows of 100 ms for an app with a 500m limit. An unlimited app runs continuously. A limited app with one busy thread runs 50ms then freezes 50ms every window. A limited app with 8 busy threads runs ~12.5ms then is frozen for ~87.5ms of every window.](assets/02-throttling-windows.png)

*The freezes repeat up to 10 times per second. The next chart shows why your dashboards never see them.*

![Illustration of one minute of a limited app under bursty load: per-second CPU use is spiky and often hits the limit (shown in orange), while the one-minute rolling average stays low and looks healthy.](assets/03-dashboard-blind-spot.png)

_Every orange second the app hit its limit and the kernel froze it. The 1-minute average never comes close to the limit, so every graph looks healthy. **This is how a container can be throttled all day while its dashboard stays green.** If you only ever look at averaged CPU, you cannot see this — check `container_cpu_cfs_throttled_periods_total` instead._

We proved this. We sent load that needs only **320m on average** to an app with a
**500m limit**. The average never touched the limit. The app still stalled:

![Bar chart: p99 response time is 40.5ms with a 500m limit versus 16.7ms with no limit, at only 64% average use of the limit.](assets/04-p99-below-the-limit.png)

_Same app, same load (8 parallel tasks of 5 ms, 8 requests per second). **The limit made the slow requests 2.4x slower, while average CPU stayed well under the limit.**_

> **Deeper:** why parallelism makes this so much worse than it looks —
> [16 threads burn a 300m quota in under 2 ms of wall time](docs/02-dotnet.md#16-kafka-consumer-threads-vs-a-300m-quota) —
> and why the result is [a stall rather than a slowdown](docs/01-theory.md#throttling-arrives-as-a-stall-not-a-slowdown),
> which is what destroys your tail latency while the average looks fine.

## 3. Without limits, who shares the CPU? Meet CFS

Linux has a built-in referee: **CFS, the Completely Fair Scheduler**. Every pod
has a **weight**. Kubernetes sets the weight from the pod's **CPU request**.
The rule is simple: **when the node is fully busy, pods share the CPU based on their
weights**. When a pod is idle, it stops using its share. Other pods can use that share instead. The idle pod gets its
share back as soon as it has work again.

![Two panels. Left: three apps (A=100m, B=200m, C=700m requests) all busy — A gets 10%, B gets 20%, C gets 70% of CPU, matching their request weights. Right: app C is idle — A gets 33%, B gets 67%, splitting C's unused share in the same 1:2 ratio.](assets/05-cfs-fair-sharing.png)

_Three apps on one node, weights from requests: A = 100m, B = 200m, C = 700m. This referee runs on every Linux server, always. It needs no CPU limit to work. **A limit adds only one thing extra: the freezes from section 2.**_

> **Deeper:** the full argument that
> [a limit provides no protection a request does not already provide](docs/01-theory.md#limits-provide-no-protection-that-requests-do-not-already-provide),
> plus [the one real exception](docs/01-theory.md#the-one-real-exception-guaranteed-qos-static-cpu-manager):
> Guaranteed QoS with the static CPU manager, where the "limit" is pinning cores rather than
> throttling quota.

## 4. "But if all pods use 100% CPU at once, the node will die!"

No. This fear treats CPU and memory as the same problem. Here is the worst possible CPU
moment on a node:

![Diagram of a fully busy 4-core node: a reserved slice for the OS and kubelet, then pods A, B, C, D each getting a share proportional to their CPU request.](assets/06-fully-busy-node.png)

*A 4-core node, fully busy. CFS splits CPU by request weight. Each pod drops back to its guaranteed request share — apps get slower, nothing breaks. The scheduler already makes sure the requests of all pods fit inside the node.*

Three protections make node failure a non-issue, all independent of CPU limits:

| | |
|---|---|
| **1. Reserved system CPU** | The OS and kubelet (the agent that runs and watches pods on a node) have their own reserved CPU slice, outside the pod pool. A busy pod cannot touch it. The node always stays responsive. |
| **2. Scheduler math** | Pods are placed by requests, and total requests never exceed node capacity. Full contention (every pod wanting CPU at once) still means everyone gets their request. That is the same guarantee limits give, without wasting idle CPU. |
| **3. CPU is compressible** | CPU can be compressed: too little of it just makes an app slower. It finishes the delayed work later. It does not crash. Memory is different: too little memory kills the app. That is exactly why memory limits stay. |

| Resource | Not enough of it means | So the rule is |
|---|---|---|
| **CPU** | App runs slower for a moment | Remove the limit, keep the request |
| **Memory** | App crashes (OOM kill, out-of-memory kill) | Keep the limit |

And in most clusters, node CPU utilization sits far below capacity — often in the single or low
double digits. The "everyone at 100%" moment is largely theoretical, while **the real, daily
problem is the opposite one: idle CPU that throttled apps are not allowed to touch.** If a node
ever does get fully busy, the two protections above still hold: reserved system CPU keeps the
node and kubelet responsive, and CFS weight-based sharing still guarantees every pod its
requested share. A node-level CPU dashboard would show sustained high usage well before this
becomes a concern.

### "But we have no ResourceQuota or LimitRange yet"

This is a fair objection, and the concern behind it is real: if every application shares one
namespace with no ResourceQuota and no LimitRange, nothing forces a team to set accurate
requests. A common interim step is to set something like `limits.cpu: 1` as a "circuit breaker
rather than a ceiling" — high enough that throttling stops in practice.

Setting a high limit is a fine emergency fix, and it does end throttling for the service it is
applied to. But as a safety mechanism for the pods *around* that service, a CPU limit does
not do what it looks like it does.

| The worry | What actually protects you |
|---|---|
| "An unlimited pod has nothing protecting the workloads around it." | A pod's own limit never protects its neighbors. It only restricts itself. Neighbor A is protected from greedy pod B by **A's own request**, which sets A's weight in the kernel. Putting a limit on B does nothing for A. |
| "Requests are not mandatory, so they cannot be trusted." | True, and that is the gap worth closing. But a pod with a missing or tiny request is the *victim*, not the aggressor: it gets the smallest weight and is the first to be squeezed. Adding CPU limits everywhere does not give it protection it lacks. |
| "We need a circuit breaker until the guardrails exist." | The scheduler already is one. It only places a pod if its **request** fits the node, so total requests never exceed capacity. That is what guarantees everyone can get their share at the same time. Limits play no part in it. |

> **The dilemma with "circuit breaker" limits.** A limit set high enough never to
> trip (30x real use) protects nobody, because it never does anything. A limit low enough to
> actually trip only harms the pod it is attached to, never the neighbor it was meant to
> protect. **It cannot be both a safety mechanism and harmless.**

**One measurement warning on sizing a limit as "30x what the service uses".** You cannot
size a limit from usage measured while a limit was throttling that same workload. A heavily
throttled pod's recorded usage is what the limit *allowed*, not what the app *wanted*. Sizing
from suppressed usage just builds the next too-small limit.

**So what is actually needed?** Exactly what the objection names: a **LimitRange** giving every
pod a default request, and a **ResourceQuota** capping total requests per namespace. Both work
on requests, not limits, and both can be applied to an existing shared namespace as-is — no
namespace redesign has to come first. In practice the gap is often smaller than it looks, since
a shared Helm chart typically sets a request for every service it templates.

To be clear about sequencing, because it is easy to overstate: **the LimitRange is worth doing
first** — it is one manifest, it costs nothing, and it catches anything that bypasses your normal
deployment path. The **ResourceQuota can trail**; it guards cost, not stability, since the
scheduler already refuses pods whose requests do not fit. But neither one *gates* limit removal.
The real safeguard is the removal change itself: it touches the exact values file where a
missing CPU request would be visible.

> **Deeper:** [docs/04-objections.md](docs/04-objections.md) answers this and the rest of the
> objection set individually, including
> [what happens when a node runs hot](docs/04-objections.md#what-happens-when-a-node-runs-hot-without-limits),
> [multi-tenant namespaces](docs/04-objections.md#what-about-multi-tenant-namespaces-dont-limits-protect-the-cluster),
> and [whether removing a limit changes QoS class](docs/04-objections.md#does-removing-the-limit-change-qos-class-or-eviction-behavior).

## 5. We measured it: same app, with and without a limit

The scripts in this repo deploy the same .NET 10 API twice into a throwaway namespace.
Both pods request 250m CPU. One has a 500m CPU limit, one has none. A load generator sends the
same requests at both. Everything is scripted and repeatable, so you can re-run all of it on
your own cluster.

**Note:** except startup (3 runs, median shown), every number below is from a
single run, not repeated or averaged. Treat differences under about 10% as a hint, not proof.

![Four panels comparing the app with a CPU limit (orange) versus no limit (blue): startup median time 20s vs 10s; steady-load p99 57.7ms vs 49.6ms; traffic spike (12x) p99 377.0ms vs 49.5ms; Postgres pgbench throughput 1720 vs 1897 TPS.](assets/07-ab-results.png)

*During the spike, the limited app was frozen in **89% of all 100 ms windows**. **The unlimited app absorbed a 12x spike with no slowdown at all.** Full tables: `results/SUMMARY.md` in the repo.*

**One caveat on the startup panel.** The test container runs `dotnet run`, which compiles on
every start, so "time to ready" here is dominated by CPU-bound compile work. That makes it a
clean demonstration of throttling delaying startup, but do not read the 2x as a universal
figure: a service whose startup is mostly waiting on I/O (pulling config, opening connections)
will gain far less. The gain scales with how much *CPU work* your app does before it reports
ready. The latency and spike panels have no such caveat.

> **Deeper:** per-scenario reports with the full percentile tables live in
> [results/](results/) ([startup](results/10-startup.md), [latency](results/20-latency.md),
> [burst](results/30-burst.md), [noisy neighbor](results/40-noisy-neighbor.md),
> [Postgres](results/50-postgres.md)). On the Postgres panel specifically,
> [docs/03-postgres.md](docs/03-postgres.md) is careful about which effects were measured and
> which are only mechanism — the pgbench gain is a single run, and the parallel-query test was
> a null result.

## 6. The noisy neighbor test (does a busy pod slow down its neighbors?)

This is the most common fear. We tested it. We put another pod on the same node. That pod ran
8 threads that constantly use CPU, with no limit. Then we measured our app's p99 again:

![Bar chart: victim app alone (no limit) has p99 49.0ms; with a CPU-hungry neighbor on the same node, 55.8ms; with the same neighbor and the victim's own 500m limit, 57.6ms.](assets/08-noisy-neighbour.png)

_For the unlimited victim (bars 1 and 2), the neighbor moved p99 by less than 7 ms, and it was
never throttled. Its request protected it, exactly as CFS promises (section 3). For the victim
with its own 500m limit (bar 3), the neighbor's placement on the same node was not guaranteed,
unlike the other two bars (see `results/40-noisy-neighbor.md`). Even so, that victim was
throttled in 0.29% of windows. Its 57.6 ms p99 is close to its own no-hog baseline of 57.7 ms
(section 5). That baseline is from a separate single-run test, not a controlled leg in this same
scenario, so treat this as consistent with "no extra protection," not as proof of it.
**Requests protect. Limits did not help here either.**_

Worth noting: running Burstable pods with a CPU request and no CPU limit is not an exotic
configuration. It is what every pod without a `limits.cpu` key already does, and plenty of
workloads (ingress controllers, batch jobs) are routinely deployed that way. The scenario above
is the measured evidence offered here; a single controlled test is not a fleet-wide guarantee,
so treat it as a strong signal rather than proof for every workload shape.

> **Deeper:** the noisy-neighbor objection answered in full, including
> [what happens if a pod genuinely runs away](docs/04-objections.md#what-if-a-pod-runs-away-and-tries-to-use-everything),
> is in [docs/04-objections.md](docs/04-objections.md#wont-a-noisy-neighbor-eat-all-the-cpu-without-a-limit).
> The caveat on leg C of this test is recorded in [results/40-noisy-neighbor.md](results/40-noisy-neighbor.md).

## 7. How a tight CPU limit cascades into an outage

The sections above are about latency. But a CPU limit that is well below what an app actually
needs does not just make things slow — it can take a service down, and it rarely looks like a
CPU problem while it is happening. The cascade below follows directly from the mechanics in
sections 2 and 3, and each step is caused by the step above it.

| Step | What happens |
|---|---|
| **1. Frozen** | The app burns its quota early in each 100 ms window and spends most of every window suspended (section 2). |
| **2. Garbage collector starved** | The runtime cannot get enough CPU to reclaim memory. A normal memory peak becomes a death spiral instead of a short pause. |
| **3. Out of memory** | Allocation outruns reclamation, so the pod throws out-of-memory errors and is OOM-killed — a *memory* failure caused by a *CPU* setting. |
| **4. Timeouts on healthy dependencies** | Any call with a timeout (a cache read, a config or feature-flag lookup, a database query) blows that timeout because the caller is frozen, not because the dependency is slow. |
| **5. Silently wrong behavior** | Whatever those calls guard now falls back to a default. A feature flag that reads `false` because its lookup timed out is not slowness — it is the product behaving differently than configured, with nobody being told. |
| **6. Traffic keeps arriving** | A readiness probe that only checks that the port is open still passes, so the orchestrator never takes the sick pod out of rotation. A frozen app also cannot answer its own health check reliably, which tends to get written off as a flaky probe. |

**Why this is the whole argument in one failure mode:**

- **It is a default, not a mistake.** A low CPU limit like `100m` is a common copy-paste
  default. Nothing about it looks dangerous in a values file.
- **It blames the wrong system.** Throttling does not surface as "high CPU". It surfaces as
  errors and timeouts from whatever the app was calling, which sends responders investigating a
  dependency that is perfectly healthy.
- **The damage can be a correctness bug, not a slow page.** A silently defaulted feature flag
  in production is far harder to detect, and harder to explain to a customer, than a slow
  endpoint.

Two practical consequences worth carrying into any triage:

- **An out-of-memory kill on a throttled pod is not automatically a memory leak.** Check the
  throttle ratio before raising the memory limit; you may be treating a CPU problem with more
  memory.
- **"Raise the limit" is a fix that admits the problem.** When the remedy for an incident is to
  multiply the CPU limit several times over, the limit was never a safety mechanism — it was
  the fault.

> **Honest note on evidence like this.** Throttling is systematically under-diagnosed. Incident
> write-ups tend to record the visible symptom ("timeout", "cache error") rather than the CPU
> quota underneath it, because nobody checks the throttle ratio during an incident. That cuts
> both ways: throttling is not behind every slow service either. The dashboard in step 2 of the
> plan exists precisely to replace this guesswork with a number.

**Deeper:** step 2 of this cascade is the surprising one — a *CPU* setting causing a *memory*
kill. [docs/02-dotnet.md](docs/02-dotnet.md#gc-starvation-how-a-cpu-limit-causes-an-oom-kill)
explains the mechanism: the collector needs CPU to reclaim, gets throttled exactly when memory
pressure is highest, and allocation outruns reclamation. The same document covers
[connection pools stalling behind a starved ThreadPool](docs/02-dotnet.md#connection-pools-blocking-on-starved-pools),
which is why this so often presents as a database or cache problem.

## 8. One extra step for .NET apps

.NET reads the CPU limit to size itself. We measured this on the two test pods:

| What .NET sees | With 500m limit | No limit (4-core node) |
|---|---|---|
| `Environment.ProcessorCount` | 1 | 4 |
| ThreadPool minimum threads | 1 | 4 |
| Garbage collector mode | Workstation, 1 heap | Server, 4 heaps |

Server GC splits memory cleanup across one heap per processor, which is faster on machines
with many cores. Workstation GC always uses a single heap, no matter how many cores exist.

Both extremes are imperfect, but not equally. With a common `100m` default limit, every
.NET app starts with **1 processor and 1 thread pool thread**. This is the bad case.
The other direction is mild: our unlimited test pod sized itself for the whole node, and it
still won every test. Memory stays safe too: memory limits remain, and .NET caps its own GC
memory to the container's memory limit.

So why set anything at all? One reason: without a value, the same service behaves
differently on a 4-core node than on a 16-core node. This does not need per-service
bookkeeping. Nobody has to count their threads. Set **one default in your shared Helm
chart**, in one change:

```yaml
# one default in the shared chart, not one per service
- name: DOTNET_PROCESSOR_COUNT
  value: "4"  # services can override this, most never will
```

In practice this variable is rarely set anywhere, which means most .NET services end up running
on whatever `ProcessorCount` and GC mode their CPU limit happens to produce.

> **Deeper:** [docs/02-dotnet.md](docs/02-dotnet.md) has the whole chain —
> [how `ProcessorCount` is derived from the quota](docs/02-dotnet.md#environmentprocessorcount),
> [why the ThreadPool then grows too slowly to absorb a burst](docs/02-dotnet.md#threadpool-sizing-and-starvation),
> and [what to set once the limit is gone](docs/02-dotnet.md#what-changes-when-limits-are-dropped),
> including why deriving the value from `requests.cpu` via the downward API is a trap until
> requests are honest. Go, Java and Python have the same problem with different knobs; see
> [rollout step 1](docs/06-rollout.md#step-1-net-runtime-env-vars-first).

## 9. The plan

1. **Set one fleet-wide `DOTNET_PROCESSOR_COUNT` default** in your shared Helm chart (one change, no per-service bookkeeping). Special services can override it. Non-.NET runtimes get the equivalent knob (`GOMAXPROCS` for Go, worker counts for Python) before their own limit is dropped.
2. **Observability first.** Put per-container throttle ratio on a dashboard (target after rollout: ~0) and add a node CPU-pressure alert: a capacity signal telling you a request is set too low or a node is genuinely needed.
3. **Add cheap backstops, without waiting on them:** a LimitRange (default requests for strays outside your gitops flow) and, later, a ResourceQuota (guards cost, not stability). The real safeguard is each removal change itself: if your convention mandates an explicit CPU request, the review confirms it. Two quick one-time checks: any policy engine rule requiring limits to be set, and any services where request equals limit (Guaranteed QoS).
4. **Remove CPU limits per namespace,** least critical environment first, production last. One small values change per service; where a request is obviously too low (10m against 100m+ real usage), raise it in the same change, because the request is the neighbor protection. Rollback = restore one line. HPA is unaffected: it measures usage against requests.
5. **Right-size requests** from 30-day real CPU usage (P95 usage: the usage level exceeded only 5% of the time), so requests stay accurate and protection stays real. An autoscaler then removes empty general-purpose nodes on its own. Hand-sized pools need one manual size change each (section 10).

> **What you do not change:** CPU requests stay, and must be accurate. Memory limits
> stay everywhere. Only the CPU limit goes away.

> **Deeper:** [docs/06-rollout.md](docs/06-rollout.md) is the executable version of this list —
> each step with its entry and exit criteria, [what gates what](docs/06-rollout.md#step-3-guardrails-cheap-backstops-not-blockers)
> (less than you would think), the [burn-in and resilience test](docs/06-rollout.md#step-4-drop-cpu-limits-namespace-by-namespace-env-by-env)
> before production, the [one-line rollback](docs/06-rollout.md#step-6-rollback), and a
> [before/after values diff](docs/06-rollout.md#beforeafter-a-typical-service) for a typical service.

## 10. Outcomes: what do you win, and is it worth it?

| | | |
|---|---|---|
| **Throttling → ~0** | **8x better spike p99** | **up to ~$92k / year** |
| The point of the change: on a fleet where a meaningful share of containers are severely throttled, that share goes to roughly zero, and the frozen container-hours go with it. | p99 during a 12x traffic spike was 377 ms limited vs 49.5 ms unlimited (section 5). Time to ready after a deploy also halved, though that number is startup-work-dependent — see the caveat below. | Illustrative, for a hypothetical cluster, and this is the CPU-only ceiling *before* the memory floor — §"memory sets the floor" below cuts it to roughly half. Plug in your own prices for a real number; see [docs/05-cost.md](docs/05-cost.md). |

<details>
<summary><strong>How is the cost saving estimate calculated? Click to see every step.</strong></summary>

Nodes cost money, and the number of nodes follows **requests**: the
scheduler must reserve the full request of every pod, even if the pod never uses it.
Fewer requested cores means fewer nodes. Teams inflate requests to fight
throttling. Remove the limits, and requests can shrink to accurate values.

Worked example on a **hypothetical 1,000-core cluster**, with an illustrative placeholder price.
Every number here is invented to show the arithmetic — substitute your own:

| Step | Value | Where it comes from |
|---|---|---|
| 1. CPU requested today | 500 cores | sum of `requests.cpu` across the cluster |
| 2. CPU really used | 100 average, 140 at peak | measured over 24 h. Size on the peak (P95), not the average. |
| 3. Right-sized requests | 2 x 140 = ~280 cores | twice the peak, so every app keeps a full safety buffer above its worst hour |
| 4. Cores you stop reserving | 500 - 280 = ~220 cores | step 1 minus step 3 |
| 5. Price per core | $35 per month (illustrative) | a placeholder; real Azure/AWS/GCP pricing varies a lot by VM SKU, region, and reservation discount — price your own node inventory the same way (`scripts/95-cost-estimate.mjs` prices an inventory against the Azure retail API) |
| 6. Estimate | 220 x $35 = ~$7,700 / month = ~$92,000 / year | step 4 times step 5. This is a CPU-only estimate, before the memory floor below. |

The shape of this is what generalizes, not the digits: limits summing to more CPU than the nodes
physically have, and real usage a small fraction of what is requested. The memory floor below
brings the CPU-only estimate down to a more realistic figure.

**Two timing caveats that apply to any real version of this model:** core counts are a
same-day snapshot while a VM bill is a monthly average, and freed cores only turn into money
when nodes actually scale down and any reserved capacity rolls off or is reused by other
workloads.

<img src="assets/09-cores-freed.png" alt="Bar showing 500 requested cores split into ~280 still needed (2x the 140-core peak) and ~220 freed.">


**Why this is an upper bound, not a promise:** usage is not spread evenly across services, and
some services need more than 2x headroom. The real plan takes 30-day P95 usage per service
(rollout step 5) and real VM prices per instance type. Full model with all assumptions: [docs/05-cost.md](docs/05-cost.md)
in the repo.

</details>

### From freed cores to removed VMs: memory sets the floor

A VM only leaves the cluster when **both** its CPU and its memory are no longer needed. CPU is
not the only dimension, and memory is usually the fuller of the two. Run
`kube_pod_container_resource_requests{resource="memory"}` against
`kube_node_status_allocatable{resource="memory"}` per node pool to find your own floor; the
shape it tends to take:

| Segment | What it means for the model |
|---|---|
| **Memory-bound pools** (a hand-sized tier for something like a search or indexing engine) | Memory-full, so these VMs stay whatever you do with CPU. They are often also the heaviest real CPU users, which means their freed CPU requests produce no savings at all. |
| **General-purpose pools** (added and removed automatically by an autoscaler) | Partially full. Some real share of this capacity can leave once CPU is right-sized — this is where the savings actually come from. |
| **Lightly loaded pools** | CPU is the binding constraint, so the full CPU model applies. |

Whatever the split, only part of the CPU-only estimate above turns into removed VMs. The gap
between the CPU-only ceiling and the memory-floored reality is exactly why both numbers matter:
cores freed is not the same thing as nodes removed. If, say, half your capacity sits in
memory-bound pools, expect roughly half the ceiling to materialize.

> **The floor itself is probably too high.** In most fleets memory requests have never been
> right-sized either, and the same habit that inflates CPU requests inflates memory requests:
> teams pick a safe-looking number once and never revisit it. Every GiB reserved but not used
> pushes this floor down and the saving up. Measuring real memory use per service is a separate
> right-sizing effort, and on this evidence it is worth doing right after the CPU one.

**Who removes the VMs?** Removing CPU limits frees nothing by itself. After
requests are right-sized (plan step 5), an autoscaler such as Karpenter removes empty
general-purpose nodes automatically. Hand-sized pools each need a one-time size change, and
memory-bound pools should not shrink at all.

**Key numbers (KPIs) worth tracking.** Each rollout step should move them:

| KPI | Before | Target after rollout |
|---|---|---|
| Share of containers severely throttled (>10% of windows frozen), 24 h | whatever your dashboard shows today | ~0 |
| Combined container-hours frozen per day | whatever your dashboard shows today | ~0 |
| p99 during a 12x traffic spike (our test, section 5) | 377.0 ms | ~50 ms |
| Time to ready after a deploy or scale-up (our test, section 5; CPU-bound startup) | 20 s | 10 s |
| Self-hosted Postgres throughput (our test, section 5) | 1,720 TPS | ~1,897 TPS (single run, ~10% gain, a hint not proof) |
| Node CPU used vs paid for | typically low single/double digits | materially higher at peak, once requests are right-sized |

**How much faster will apps get?** There is no single accurate average. Apps
that never throttle today will change little. The containers that throttle badly will
gain the most. Per app type, based on our measurements:

| App type | Expected improvement | Evidence |
|---|---|---|
| **Request-serving APIs** | p99 about 14% lower under steady load, up to 87% lower during traffic spikes. Deploys and scale-ups faster to ready (see the startup caveat below). | test scenarios 1, 2, 3 |
| **Queue and event consumers** | 59% lower p99 in our generic burst test (8 handlers waking at once). We infer this applies to real consumer-group rebalances and backlog catch-up, but we did not test an actual rebalance. Faster restarts. | test scenarios 1 and 2 |
| **Databases** (self-hosted Postgres) | ~10% more throughput in one single-run pgbench test. This is within our own hint-not-proof threshold (section 5), so treat it as a hint, not a confirmed win. A parallel background query in the same run showed almost no difference (2,927 ms vs 2,920 ms, limited vs unlimited). | test scenario 5 |
| **Frontends, tooling, CI** | Often the biggest wins, because these tend to carry the smallest, least-tuned CPU limits while doing bursty work (bundling, image processing, test runs). | sections 2 and 5 |
| **Apps that never throttle** | No change, plus free headroom (spare capacity) for their next traffic spike. | section 3 (CFS) |

**Return on investment.** The cost side is small:

| | |
|---|---|
| **One-time effort** | One values line removed per service, one env var added for .NET services. Staged across your environments, production last. Weeks, not months. Zero application code changes. |
| **Recurring return** | Lower p99 latency, and faster starts for anything that does real CPU work before serving. ~10% more database throughput (single test run, a hint not a confirmed result). Throttled container-hours removed per day. Tens of thousands of dollars per year on the illustrative cluster above after the memory floor (see [the memory floor](docs/05-cost.md#the-memory-floor-from-freed-cores-to-removed-vms) — plug in your own prices for a real figure). |
| **Risk** | Low. Requests keep protecting neighbors (sections 3, 4, 6). Running Burstable pods without a CPU limit is an ordinary configuration, not an exotic one. HorizontalPodAutoscaler is unaffected: it measures usage against requests, not limits. Rollback is restoring one line, and a gitops controller applies it in minutes. |

> **Verdict: worth it, everywhere.** Remove CPU limits on all clusters and all
> apps, except the three special cases in [docs/04-objections.md](docs/04-objections.md#when-do-cpu-limits-actually-make-sense): untrusted
> third-party workloads, benchmark pods, and pinned-CPU pods (Guaranteed QoS: request equals
> limit, so the pod gets whole, dedicated cores; used for latency-critical workloads).

## 11. Q&A: the hard questions, answered up front

*A short version of the six questions that come up most. The full set — fifteen of them,
including HPA, KEDA, QoS class, multi-tenancy and when limits genuinely are the right tool —
is in [docs/04-objections.md](docs/04-objections.md).*

### Our requests are tiny today (often 10m). Isn't dropping limits before fixing them unsafe?

Fair sharing is weighted by requests, so they need to be roughly honest, and the fix rides
along for free: every removal is a values-file change, and the same change raises an
obviously-too-low request. Requests become honest at the same pace limits disappear; nothing
waits for a fleet-wide re-sizing. The few deviations you find are one-line fixes of their own.

### Couldn't we just right-size requests and keep the limits? Isn't that where the money is?

The money is in right-sizing, yes; deleting a limit line frees zero nodes by itself. But
right-sizing under limits fails twice: usage measured under throttling is what the limit
*permitted*, not what the app needed, so you would size from wrong data; and the throttling
that pushes teams to inflate requests stays. Limit removal makes the measurements honest;
right-sizing then cashes them in. Two linked steps, one saving.

### If everything shares one namespace, what does a per-namespace ResourceQuota actually protect?

Not much yet, and that is fine. The scheduler already refuses pods whose requests do not
fit, so a missing quota risks extra node cost, not an outage. The LimitRange default request
is the part worth having first; the quota (and any namespace split) can follow later.

### Without limits, what happens when a node runs hot?

Nothing breaks: every pod keeps its requested share, and the OS and kubelet have reserved
CPU. What shrinks is the idle headroom pods borrow above their requests. So the node-pressure
alert (plan step 2) is a capacity signal, not a fire alarm: it tells you a request is set too
low (one gitops fix) or the cluster genuinely needs another node.

### This evidence was gathered on a lightly loaded cluster. Is it still safe at high utilization?

The 2x-peak sizing rule keeps real headroom, but do not assume it: in your last
pre-production environment, drain a node under load and mass-restart a namespace at
post-rollout density, and confirm probes do not flap under the simultaneous startup burst.
Only then start on production.

### Which services keep a CPU limit?

Only the three exception categories (untrusted third-party code, benchmark pods, pinned-CPU
Guaranteed-QoS pods), inventoried per environment before its changes go out. In a first-party
application fleet these categories are usually rare: the worst-throttled workloads are typically
your own apps with limits set far below demand, not greedy outsiders. Any exception keeps its
limit, documented next to its values file.

## 12. Words used in this analysis

| Term | Meaning |
|---|---|
| **core / millicore** | 1 core = 1000m (millicores). 500m = half a core. |
| **request** | The CPU slice a pod is guaranteed. Used for scheduling and for fair sharing. |
| **limit** | A hard ceiling. The pod can never use more, even if the node is idle. |
| **kernel** | The core part of the operating system. It manages hardware and enforces CPU limits. |
| **kubelet** | The agent that runs on every Kubernetes node. It starts and watches the pods on that node. |
| **Karpenter** | A tool that adds and removes general-purpose nodes automatically, based on what pods request. |
| **namespace** | A named area inside a Kubernetes cluster. It groups related pods and services together. |
| **CFS** | Completely Fair Scheduler. The Linux CPU referee. Shares CPU between busy apps, based on their weights (= requests). |
| **contention** | When two or more pods want the same CPU at the same time. |
| **compressible** | Something that can be squeezed into less space without breaking. CPU is compressible: give a pod less of it, and it just runs slower. |
| **throttling** | The kernel freezing a pod because its limit budget for the current 100 ms window is used up. |
| **p99** | The response time of the slowest 1 request in 100. Users feel the p99, not the average. |
| **P95** | The response time of the slowest 5 requests in 100. Like p99, but for the top 5%, not the top 1%. |
| **TPS** | Transactions per second. Higher is faster. |
| **GC** | Garbage collector. The part of .NET that frees memory the app no longer uses. |
| **OOM kill** | Out Of Memory kill. The kernel stops an app that uses more memory than allowed. |
| **LimitRange** | A Kubernetes rule that sets a default CPU or memory request for pods that do not set one. |
| **ResourceQuota** | A Kubernetes rule that caps the total CPU or memory a namespace can request. |
| **gitops** | Storing the desired state of a cluster (deployments, config) as files in a git repo. A tool then applies that state to the cluster automatically. |
| **Helm chart** | A package of Kubernetes config templates for one service. Teams fill in per-environment values (like CPU requests) without rewriting the whole template. |
| **ArgoCD** | A tool that watches your gitops repos and applies changes to the cluster automatically, so nobody runs `kubectl apply` by hand. |
| **headroom** | Spare capacity kept unused on purpose, as a safety buffer for the next spike in demand. |

---

**Try it yourself:** clone this repo, point `kubectl` at a cluster you do not care about, then
run `scripts/00-preflight.sh`, `scripts/run-all.sh`, `scripts/90-cleanup.sh`. Everything it
creates goes into its own namespace, carries one label, and is removed by the cleanup script. It
refuses to run against a production-looking context unless you force it — it deliberately
throttles and OOM-kills its own pods, so give it somewhere disposable.

**More depth:** the [docs/](docs/) folder (theory, .NET, Postgres, objections FAQ, cost, rollout)
goes deeper on each mechanism than this analysis does. Raw data from the run is under
[results/](results/), app source under [app/](app/), and the Kubernetes manifests under
[k8s/](k8s/).

**License:** MIT, see [LICENSE](LICENSE).

All measured numbers in this analysis come from the test run committed under `results/`, produced
by the scripts in this repo. The cost model is an explicitly illustrative example, not a
measurement — plug in your own cluster's figures.
