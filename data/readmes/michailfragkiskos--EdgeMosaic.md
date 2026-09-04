<!-- edgemosaic — on-device AI evaluation lab -->

<p align="center">
  <img src="assets/banner.svg" alt="EdgeMosaic banner" width="100%"/>
</p>

<h1 align="center">EdgeMosaic</h1>

<p align="center">
  <em>Assemble a mosaic of on-device AI benchmarks — one tile per delegate.</em><br/>
  <strong>Python stdlib CLI</strong> + <strong>Kotlin JVM/Android core</strong> · zero third-party dependencies
</p>

<p align="center">
  <code>manifest</code> → <code>plan</code> → <code>samples</code> → <code>report</code>
</p>

---

## Why a mosaic?

On-device inference is never a single number. The *same* model behaves like a
different animal depending on the **delegate** it runs on (CPU, GPU, NNAPI,
XNNPACK…), the **thread count**, the **batch size**, and — crucially on phones —
the **thermal envelope** at the moment of measurement. A GPU delegate that wins
on a cold device may lose after ninety seconds of sustained load as the SoC
throttles.

EdgeMosaic treats every (model, delegate, config) combination as one **tile**.
Lay the tiles side by side and a picture emerges: which backend is genuinely
fastest, which stays coolest, which is leanest on memory, and where the thermal
cliff hides. The tooling is deliberately small and boring so it runs anywhere —
a CI runner, a laptop, or wired up next to a real device farm.

<p align="center">
  <img src="assets/pipeline.svg" alt="EdgeMosaic pipeline" width="100%"/>
</p>

---

## The two halves

EdgeMosaic is intentionally split into two runtimes that **never import each
other**. They agree only on a pair of tiny line-based text protocols. This keeps
the device-side code (Kotlin) free of any host tooling, and keeps the host-side
orchestration (Python) free of any Android baggage.

| Half | Language | Role | Dependencies |
|---|---|---|---|
| **Host CLI** | Python 3.9+ | Validate manifests, build plans, aggregate samples, render reports | **stdlib only** |
| **Device core** | Kotlin (JVM/Android friendly) | Parse plans, record samples, compute percentiles, emit interchange | **stdlib only** |

The contract between them is text:

```
# plan protocol (host builds it, device consumes it)
PLAN mobilenet-v3-small-sweep
RUN mobilenet-v3-small gpu batch=1 threads=4 warmup=5 iters=50

# sample protocol (device emits it, host consumes it)
SAMPLE mobilenet-v3-small gpu latency_ms=9.9 mem_mb=88.7 temp_c=46.1
```

Because both sides parse the same grammar and use the **same percentile
definition** (linear interpolation between closest ranks), a p50 computed on the
phone equals the p50 computed on the host for identical samples. No surprises
when you cross the boundary.

---

## Quick start (host CLI)

The Python side needs nothing but a stock interpreter.

```bash
cd python

# 1. validate a model manifest
python -m edgemosaic validate ../examples/mobilenet.manifest.json

# 2. build a benchmark plan (delegates × batches × threads)
python -m edgemosaic plan ../examples/mobilenet.manifest.json \
    --batches 1 --threads 1,4 --out ../examples/plan.txt

# 3. aggregate raw SAMPLE lines into per-run statistics
python -m edgemosaic aggregate ../examples/samples.txt

# 4. render a JSON + Markdown report with a leaderboard
python -m edgemosaic report ../examples/samples.txt \
    --title "MobileNet sweep" \
    --json ../examples/report.json \
    --md   ../examples/report.md
```

Everything pipes. `aggregate` and `report` accept `-` for stdin:

```bash
your-device-runner | python -m edgemosaic report - --md report.md
```

Or drive the whole flow with the Makefile:

```bash
make demo    # validate + plan + report
```

---

## A tile up close

Here is one row of the mosaic, straight out of `report`:

```
| Model              | Delegate | n | p50 ms | p90 ms | p99 ms | peak MB | peak C | ips    | throttled |
|--------------------|----------|---|--------|--------|--------|---------|--------|--------|-----------|
| mobilenet-v3-small | nnapi    | 3 | 8.1    | 8.34   | 8.394  | 74.1    | 42.6   | 123.46 | no        |
| mobilenet-v3-small | gpu      | 3 | 9.9    | 10.06  | 10.096 | 89.0    | 47.3   | 101.01 | yes       |
| mobilenet-v3-small | cpu      | 4 | 18.6   | 20.61  | 21.231 | 62.2    | 40.2   | 53.76  | no        |
```

Read the tiles together and the story is obvious: **NNAPI** is both the fastest
*and* the coolest here; **GPU** is quick but crosses the 45 °C throttle line and
burns the most memory; **CPU** is slow but thermally calm. The Markdown report
distils this into a leaderboard:

```
## Leaderboard
- Fastest (p50):     mobilenet-v3-small via nnapi (8.1 ms)
- Coolest (peak C):  mobilenet-v3-small via xnnpack
- Leanest (peak MB): mobilenet-v3-small via cpu

> ⚠️ Thermal throttling detected in at least one run.
```

---

## Manifests

A manifest is a small JSON document describing the model under test. The
validator is **non-throwing**: it collects *every* problem so you can fix them in
one pass, and it distinguishes hard **errors** from soft **warnings**.

```json
{
  "name": "mobilenet-v3-small",
  "version": "1.2.0",
  "format": "tflite",
  "quantization": "int8",
  "size_mb": 4.7,
  "delegates": ["cpu", "gpu", "nnapi", "xnnpack"],
  "inputs": [
    { "name": "image", "shape": [1, 224, 224, 3], "dtype": "uint8" }
  ]
}
```

| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | non-empty string |
| `version` | ✅ | non-empty string |
| `format` | ✅ | one of `tflite`, `onnx`, `torchscript`, `ggml`, `coreml` |
| `delegates` | ✅ | non-empty list; unknown entries → warning |
| `quantization` | – | `none` / `fp16` / `int8` / `int4` / `dynamic` |
| `size_mb` | – | positive; > 2 GB → warning |
| `inputs` | – | list of tensor specs |

Invalid manifests exit non-zero, so `validate` slots straight into a CI gate:

```
[E] format: unknown format 'bogus'; expected one of ['coreml', 'ggml', 'onnx', 'tflite', 'torchscript']
[E] delegates: must be a non-empty list
[E] size_mb: must be positive
-> INVALID (3 error(s), 0 warning(s))
```

---

## The Kotlin core

The device-side core is plain Kotlin with no Android SDK types in its public
surface, so it compiles as a vanilla JVM library and drops into an Android module
unchanged. Four small pieces:

- **`PlanParser`** — turns the `PLAN` / `RUN` text into `RunSpec` objects.
- **`BenchmarkRecorder`** — records `Sample`s (or ingests `SAMPLE` lines) and
  aggregates them into `RunStats` with p50/p90/p99, peak memory, peak
  temperature, throughput and a thermal-throttle flag.
- **`Stats`** — the shared percentile / mean helpers.
- **`Interchange`** — emits `SAMPLE` lines and a hand-rolled JSON array, with no
  serialization library.

```kotlin
import io.edgemosaic.core.*

val plan = PlanParser.parse(File("plan.txt").readText())

val recorder = BenchmarkRecorder(thermalThrottleC = 45.0)
for (run in plan.runs) {
    repeat(run.iters) {
        // ... invoke your delegate, measure ...
        recorder.record(run.model, run.delegate, latencyMs, memMb, tempC)
    }
}

val stats = recorder.aggregate()
print(Interchange.toJson(stats))          // hand back to the host
```

### Building the core

```bash
cd kotlin
gradle jar            # or: gradle compileKotlin
```

> **Note on local builds:** the Python CLI in this repository has been
> byte-compiled and exercised end-to-end locally. The Kotlin toolchain was **not
> available** in the authoring environment, so the Kotlin core is **not claimed
> to have been compiled locally** — it is instead compiled on every push by the
> `kotlin` job in [CI](.github/workflows/ci.yml) (Temurin JDK 17 + Gradle).

---

## Layout

```
edgemosaic/
├── assets/
│   ├── banner.svg              # animated mosaic banner
│   └── pipeline.svg            # animated pipeline + thermal bar
├── examples/
│   ├── mobilenet.manifest.json # sample model manifest
│   ├── plan.txt                # sample benchmark plan
│   └── samples.txt             # sample delegate runs
├── python/
│   └── edgemosaic/
│       ├── __init__.py
│       ├── __main__.py         # python -m edgemosaic
│       ├── cli.py              # argparse front-end
│       ├── manifest.py         # validation + diagnostics
│       ├── plan.py             # plan build + parse (line protocol)
│       ├── aggregate.py        # SAMPLE parse + percentile aggregation
│       └── report.py           # JSON + Markdown rendering
├── kotlin/
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   └── src/main/kotlin/io/edgemosaic/core/
│       ├── PlanParser.kt
│       ├── Stats.kt
│       ├── BenchmarkRecorder.kt
│       ├── Interchange.kt
│       └── Main.kt
├── .github/workflows/ci.yml    # python matrix + kotlin build
├── Makefile
├── pyproject.toml
├── CHANGELOG.md
├── ROADMAP.md
└── LICENSE
```

---

## Recipes

A handful of real workflows the tooling was shaped around.

### Gate a pull request on manifest validity

```bash
# fails the build if any manifest is structurally broken
python -m edgemosaic validate models/*.manifest.json
```

Because `validate` exits non-zero on any error, this is a one-line CI gate. It
prints every problem across every file first, so a contributor fixes them in a
single round-trip instead of playing whack-a-mole.

### Fan a single model across a delegate sweep

```bash
python -m edgemosaic plan model.manifest.json \
    --batches 1,4 --threads 1,2,4 --warmup 10 --iters 100 \
    --out plan.txt
```

The plan is the cartesian product of `delegates × batches × threads`. A model
listing four delegates with two batch sizes and three thread counts expands to
twenty-four tiles — each a `RUN` line the device core can execute verbatim.

### Merge sample streams from several devices

Sample files are append-only text, so combining runs from a device farm is just
concatenation:

```bash
cat pixel8.samples oneplus12.samples s24.samples \
  | python -m edgemosaic report - --md fleet-report.md
```

Aggregation groups by `(model, delegate)`, so pooling identical configs across
devices widens the sample count and tightens the percentiles automatically.

### Diff two reports over time

Because reports are deterministic JSON, a regression check is a plain diff:

```bash
python -m edgemosaic report today.samples --json today.json
diff <(jq '.runs' baseline.json) <(jq '.runs' today.json)
```

A future milestone (M6) turns this into a first-class regression gate; until
then, `jq` and `diff` get you most of the way.

---

## FAQ

**Why not just use a spreadsheet?**
You can — the Markdown table pastes cleanly into one. edgemosaic exists to make
the *collection* and *aggregation* reproducible and scriptable, so the numbers
that land in the spreadsheet were computed identically every time.

**Why split Python and Kotlin instead of one language?**
The host and the device have opposite constraints. The host wants rich CLI
ergonomics and lives on a laptop or CI runner; the device wants a tiny,
dependency-free library that embeds into an Android app. Forcing both into one
language compromises one of them. The text protocol lets each be idiomatic.

**Is the percentile really the same on both sides?**
Yes — both use linear interpolation between the two closest ranks on the sorted
sample list. For a single sample they return it directly; for two or more they
interpolate. Feed the same numbers to `edgemosaic.aggregate.percentile` and
`io.edgemosaic.core.Stats.percentile` and you get the same float.

**Can I add a new delegate or format?**
Add it to the relevant frozenset in `manifest.py` (`KNOWN_DELEGATES`,
`KNOWN_FORMATS`, `KNOWN_QUANT`). Unknown values are still *accepted* — they
downgrade to warnings rather than hard errors — so you are never blocked by the
validator being out of date.

---

## Design principles

1. **Stdlib only, both sides.** No `requirements.txt`, no Gradle dependency
   block. If it runs Python 3.9 or a JVM, it runs edgemosaic. This is a
   deliberate constraint: benchmarking tools that pull in a dependency tree tend
   to rot, and on-device code should stay lean.

2. **Text is the API.** The plan and sample protocols are line-based and
   human-readable. You can hand-write a plan, `grep` a sample stream, or diff two
   reports without any special tooling.

3. **Collect all diagnostics.** Validation never bails on the first error. You
   see the whole picture and fix it once.

4. **Identical math across runtimes.** Percentiles are defined once, in prose,
   and implemented the same way in Python and Kotlin. Cross-boundary numbers
   match.

5. **Thermal is a first-class signal.** Latency without temperature lies on
   phones. Every run carries a peak temperature and a throttle flag, and the
   report surfaces the coolest delegate alongside the fastest.

---

## Interpreting a mosaic

A few field-tested reading tips:

- **Compare p90/p99, not just p50.** A delegate with a great median but a long
  tail will stutter in an interactive app. The tail columns expose that.
- **Watch `throttled`.** A "fast" run that throttled was measured on borrowed
  thermal headroom; it will not hold under sustained use. Re-run after a
  soak period and compare.
- **Memory is a gate, not a race.** `peak MB` matters mostly as a ceiling — the
  leanest delegate wins when you are close to an OOM boundary on low-end
  devices, otherwise treat it as informational.
- **Throughput (`ips`) is derived from p50** for a quick apples-to-apples feel;
  trust the raw percentiles for anything you ship on.

---

## Roadmap & changelog

The foundation (validation, plan protocol, aggregation, reporting, CI) is
complete. See [ROADMAP.md](ROADMAP.md) for the finished milestones and what is
planned next (live delegate harness, regression gates, multi-model mosaics,
static HTML dashboards), and [CHANGELOG.md](CHANGELOG.md) for the release
history.

---

## Reporting issues

Bugs and surprising benchmark numbers are both welcome as issues. Please
include the manifest, plan, or SAMPLE lines (or a minimised version) that
produced the wrong output, the command line used, and the expected versus
actual result. Because EdgeMosaic is deterministic, a wrong number should
reproduce exactly on the same input. Security concerns should be reported
privately rather than in a public issue; the repository security policy
lists the contact channel.

---

## License

[MIT](LICENSE) © EdgeMosaic contributors.

<p align="center"><sub>Lay the tiles. Read the picture. Ship the fast one that stays cool.</sub></p>
