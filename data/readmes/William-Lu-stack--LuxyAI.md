# LuxyAI

[![Python](https://img.shields.io/badge/Python-3.14+-3776AB?logo=python&logoColor=white)](#quick-start)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](#development)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-ready-326CE5?logo=kubernetes&logoColor=white)](#kubernetes-deployment)
[![Docker](https://img.shields.io/badge/Docker-luxyai-2496ED?logo=docker&logoColor=white)](#docker)
[![Langfuse](https://img.shields.io/badge/Langfuse-optional-111827)](#langfuse)
[![License](https://img.shields.io/badge/license-PolyForm%20Noncommercial-red)](#license)
[![Field Notes](https://img.shields.io/badge/Field%20Notes-中英双语-4ED7E8)](https://william-lu-stack.github.io/LuxyAI/)

**Your infrastructure can explain itself, heal safely, and prove it recovered.**<br>
**让基础设施自己解释故障、安全完成修复，并证明它真的恢复了。**

LuxyAI is an AI-native SRE control plane for Kubernetes and cloud infrastructure. It connects alerts, evidence, topology, human approval, controlled remediation, and recovery verification in one auditable AgenticOps loop.

Created in Shanghai by **陆宣宇 (Xuanyu Lu)**.

![LuxyAI connects alerts, evidence, approval, remediation, and verified recovery](blog/assets/images/luxyai-agenticops-loop.png)

Current release: **3.2.0**.

Release 3.2 adds persistent remediation lineage: every failed strategy, action,
verification result, and replacement plan stays linked across operator-approved
follow-up jobs. The effectiveness ledger is persisted on the runtime volume so
model comparisons and recovery records survive Pod restarts.


## The AgenticOps Loop

`discover → diagnose → preview → approve → execute → verify → learn`

- **Evidence first**: connect alerts, events, logs, metrics, topology, runbooks, and recent changes.
- **Guarded action**: keep RBAC, policy, dry-run, human approval, and audit outside the model boundary.
- **Verified recovery**: test the original symptom after execution instead of treating a successful command as success.

## Field Notes / 实战手记

Read the bilingual LuxyAI series on AgenticOps, AI SRE, Kubernetes safety, and building in public:

- [From Alert to Verified Recovery / 从告警到可验证恢复](https://william-lu-stack.github.io/LuxyAI/posts/from-alert-to-verified-recovery/)
- [Should AI Be Allowed to Fix Kubernetes? / AI 可以修 Kubernetes 吗？](https://william-lu-stack.github.io/LuxyAI/posts/ai-should-earn-the-right-to-act/)
- [The Next SRE Control Plane Is More Than a Chat Box / 下一代 SRE 控制平面](https://william-lu-stack.github.io/LuxyAI/posts/not-another-chatbox/)
- [Building AgenticOps from Shanghai / 在上海构建 AgenticOps](https://william-lu-stack.github.io/LuxyAI/posts/building-agenticops-in-shanghai/)

## Why This Exists

Modern cloud systems fail in ways that are hard to reason about from a single log line:

- a Pod restart can hide a PVC, image, scheduling, network, quota, or rollout issue;
- a small workload change can affect services, data pipelines, middleware, and downstream users;
- repeated human firefighting leaves valuable operational knowledge outside the platform;
- model output is useful only when it is constrained by evidence, policy, permissions, and rollback.

`luxyai` is built as an SRE control plane. It uses a model as a planner and explainer, but the platform keeps the execution boundary: RBAC, action catalog, dry-run, approval, audit, and recovery verification.

## Core Features

- **SRE Chat**: ChatGPT-style operations console with cluster, namespace, workload, and risk context.
- **Inspection Queue**: scheduled or manual scans across Rancher/Kubernetes scopes with severity ranking.
- **Controlled Remediation**: evidence collection, change preview, human approval, execution, post-change verification, and evidence-driven replanning that remembers failed strategies across follow-up jobs.
- **Topology Impact**: 2D/3D topology, CMDB-style dependencies, eBPF/data-flow adapters, blast-radius analysis.
- **Release Governance**: SLO, error budget, canary/risk gate, emergency fix path, and release audit chain.
- **Skills Library**: portable operation skills that encode expert knowledge and can be reused by other agents.
- **Knowledge Base**: upload text, Markdown, PDF, Word, Excel, logs, YAML, and runbooks for operations RAG.
- **Model Lab**: configure multiple OpenAI-compatible or OAuth-protected model gateways and compare outcomes.
- **Measurable Outcomes**: persistent remediation lineage, changed-resource history, recovery evidence, and model effectiveness comparisons.
- **Observability**: Prometheus metrics, Loki logs, Tempo traces, Grafana links, and optional Langfuse traces.
- **Extensible Infrastructure**: adapters for Kubernetes, Rancher, databases, virtual machines, storage, and middleware.

## Architecture

```text
Frontend Console
  ├─ SRE Chat / Inspection / Topology / Release / Skills / Models
  │
  ▼
Control Plane API
  ├─ Evidence pipeline
  ├─ Remediation job state machine
  ├─ Release gate and SLO budget
  ├─ Knowledge and model registries
  ├─ Observability store
  └─ Integration health checks
  │
  ├─ MCP Kubernetes tools
  ├─ A2A healing / incident / postmortem agents
  ├─ Rancher / Prometheus / CMDB / eBPF flow adapters
  ├─ Langfuse / Loki / Tempo / Grafana adapters
  └─ Optional custom algorithm extension
```

## Quick Start

### 1. Clone

```bash
git clone https://github.com/William-Lu-stack/LuxyAI.git
cd luxyai
```

### 2. Configure

```bash
cp .env.example .env
```

For a simple local OpenAI-compatible endpoint:

```env
LLM_API_BASE=http://localhost:11434/v1
LLM_API_KEY=ollama
LLM_MODEL=qwen2.5:7b
LLM_AUTH_TYPE=api_key
```

For an OAuth client-credentials gateway:

```env
LLM_AUTH_TYPE=oauth_client_credentials
OAUTH_TOKEN_URL=https://your-iam/realms/main/protocol/openid-connect/token
OAUTH_CLIENT_ID=your-client
OAUTH_CLIENT_SECRET=your-secret
LLM_API_BASE=https://your-llm-gateway/engines/default
LLM_MODEL=your-model
LLM_VERIFY_SSL=true
```

### 3. Build the Console

```bash
cd frontend/modern
npm install
npm run build
cd ../..
```

The build outputs to `frontend/dist`, which is served by the Python control plane.

### 4. Run Locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

uvicorn backend.app.main:app --host 0.0.0.0 --port 8080
```

Open `http://localhost:8080`.

For local agent compatibility ports:

```bash
uvicorn agents.observability_agent:app --host 0.0.0.0 --port 8100 &
uvicorn agents.healing_agent:app --host 0.0.0.0 --port 8101 &
uvicorn agents.incident_agent:app --host 0.0.0.0 --port 8102 &
uvicorn agents.postmortem_agent:app --host 0.0.0.0 --port 8103 &
uvicorn mcp_servers.mcp_http_server:app --host 0.0.0.0 --port 8105 &
uvicorn openwebui.openwebui_adapter:app --host 0.0.0.0 --port 8200 &
```

## Docker

Build the all-in-one backend image:

```bash
docker build --target backend-runtime -t luxyai:latest .
```

Run it locally:

```bash
docker run --rm \
  --env-file .env \
  -p 8080:8080 \
  luxyai:latest \
  python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8080
```

Push to GHCR or an internal registry:

```bash
IMAGE=ghcr.io/luxyai/luxyai:latest ./scripts/build-push.sh
```

For air-gapped or China mainland networks, the `Dockerfile` and `scripts/build-push.sh` already expose mirror build args:

```bash
NODE_IMAGE=docker.m.daocloud.io/library/node:24-slim \
PYTHON_IMAGE=docker.m.daocloud.io/library/python:3.14.6-slim \
NPM_REGISTRY=https://registry.npmmirror.com \
PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple \
IMAGE=your-registry/luxyai:latest \
./scripts/build-push.sh
```

## Kubernetes Deployment

### Recommended: Helm

The chart installs the control plane, six agent services, controlled cluster-wide
RBAC, Generic NAS persistence, NodePort access, optional Ingress, and Secret hooks:

```bash
kubectl create namespace k8s-agent

helm upgrade --install luxyai ./charts/luxyai \
  --namespace k8s-agent \
  --set image.repository='<internal-registry>/luxyai/luxyai' \
  --set image.tag='<release-tag>' \
  --set persistence.storageClass=standard
```

Use `rbac.mode=controlled` in production. `rbac.mode=cluster-admin` exists only
for isolated validation environments and should require a security exception.

Render and review before deployment:

```bash
helm lint ./charts/luxyai --strict
helm template luxyai ./charts/luxyai -n k8s-agent > rendered.yaml
```

### Raw Manifests

#### 1. Create Namespace

```bash
kubectl create namespace k8s-agent
```

#### 2. Create Secrets

Do not commit real secrets. Create them from your terminal or secret manager:

```bash
kubectl -n k8s-agent create secret generic k8s-agent-oauth \
  --from-literal=OAUTH_CLIENT_ID='<client-id>' \
  --from-literal=OAUTH_CLIENT_SECRET='<client-secret>' \
  --from-literal=RANCHER_TOKEN='<optional-rancher-token>'
```

For Langfuse:

```bash
kubectl -n k8s-agent create secret generic k8s-agent-langfuse \
  --from-literal=public-key='<pk-lf-...>' \
  --from-literal=secret-key='<sk-lf-...>'
```

Administrator configuration is disabled by default. The password must never be
stored in `values.yaml`, a ConfigMap, or the repository:

```bash
kubectl -n k8s-agent create secret generic luxyai-console-auth \
  --from-literal=CONSOLE_BASIC_AUTH_USERNAME='admin' \
  --from-literal=CONSOLE_BASIC_AUTH_PASSWORD='<password-from-vault>'

helm upgrade --install luxyai ./charts/luxyai \
  -n k8s-agent \
  --reuse-values \
  --set admin.enabled=true
```

When admin mode is off, the console remains readable and operational approvals
continue to work, but model, knowledge, and Skill writes are blocked. When it is
on, those three write surfaces require the Secret-backed administrator identity.

#### 3. Configure Runtime

Edit `manifests/deployment.yaml`:

- `LLM_AUTH_TYPE`
- `OAUTH_TOKEN_URL`
- `LLM_API_BASE` / `LLM_GATEWAY_BASE`
- `LLM_MODEL`
- `PROMETHEUS_URL`
- `CMDB_URL`
- `RANCHER_URL`
- `RANCHER_CLUSTER_IDS`
- `ALLOWED_NAMESPACES`
- `OPS_MUTATION_ENABLED`
- `AUTO_HEALING_ENABLED`

#### 4. Apply Manifests

```bash
kubectl apply -f manifests/rbac.yaml
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/frontend.yaml
```

The default service exposes the console through NodePort `30080`:

```bash
kubectl get svc -n k8s-agent
```

For production, use your company Ingress/Gateway with TLS and identity middleware instead of exposing an unauthenticated public NodePort.

## Model Configuration

`luxyai` supports two common model access patterns.

### OAuth Token URL + Base URL

Use this when your gateway requires a dynamic bearer token:

```json
[
  {
    "id": "primary",
    "provider": "oauth-gateway",
    "model": "your-model",
    "base_url": "https://your-gateway/engines/default",
    "auth_type": "oauth_client_credentials",
    "token_url": "https://your-iam/token",
    "client_id": "your-client",
    "client_secret": "from-secret",
    "role": "primary",
    "max_tokens": 4096,
    "verify_ssl": true
  }
]
```

### Base URL + API Key

Use this for OpenAI-compatible providers:

```json
[
  {
    "id": "openai-compatible",
    "provider": "openai-compatible",
    "model": "your-model",
    "base_url": "https://api.example.com/v1",
    "auth_type": "api_key",
    "api_key": "from-secret",
    "role": "candidate",
    "max_tokens": 4096
  }
]
```

Set the JSON in `MODEL_PROFILES_JSON` or add models from the **Model Lab** page. Secrets should come from Kubernetes Secret or your enterprise secret platform.

## Langfuse

Langfuse is optional. When configured, the platform records model calls, latency, token usage, cost estimates, tool spans, quality scores, and trace IDs.

Environment variables:

```env
LANGFUSE_ENABLED=true
LANGFUSE_HOST=http://langfuse-web.langfuse.svc.cluster.local:3000
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
```

Deployment references:

- Docker Compose: https://langfuse.com/self-hosting/deployment/docker-compose
- Kubernetes Helm: https://langfuse.com/self-hosting/deployment/kubernetes-helm

This repository also contains `manifests/langfuse-local.yaml` as a local reference manifest. It is ignored by Git by default because production Langfuse credentials and storage settings should be managed separately.

## Custom Algorithm Extension

The public repository includes a runnable baseline algorithm module at `agents/aiops_algorithms.py`.

If you have a custom scoring implementation, keep it outside the repository and load it at runtime:

```bash
export LUXYAI_CUSTOM_ALGORITHM_PATH=.local/custom_algorithms/aiops_algorithms_custom.py
uvicorn backend.app.main:app --host 0.0.0.0 --port 8080
```

Docker:

```bash
docker run --rm \
  --env-file .env \
  -e LUXYAI_CUSTOM_ALGORITHM_PATH=/var/lib/luxyai-custom/aiops_algorithms_custom.py \
  -v "$PWD/.local/custom_algorithms:/var/lib/luxyai-custom:ro" \
  -p 8080:8080 \
  luxyai:latest \
  python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8080
```

Kubernetes:

```bash
kubectl -n k8s-agent create secret generic luxyai-custom-algorithms \
  --from-file=aiops_algorithms_custom.py=.local/custom_algorithms/aiops_algorithms_custom.py
kubectl rollout restart deploy/luxyai -n k8s-agent
kubectl rollout restart deploy/k8s-agent-api -n k8s-agent
```

If the secret is absent, the platform still runs with the open baseline.

To explicitly test the open baseline path:

```bash
LUXYAI_DISABLE_CUSTOM_ALGORITHMS=1 uvicorn backend.app.main:app --host 0.0.0.0 --port 8080
```

## Skills

Skills are portable operational knowledge packages. They describe:

- symptoms and trigger conditions;
- required evidence;
- allowed objects;
- allowed actions;
- recovery criteria;
- rollback guidance;
- optional references and runbooks.

Skills are stored under `OPS_SKILL_ROOT` and can be created from the console. They are intentionally portable so they can be reused by other agents or moved between environments.

Each Skill is persisted as an independent package directory, rather than being
compiled into the application. This keeps the Skill repository separately
versionable, reviewable, exportable, and reusable by other compatible agents.

## Unified Resource API

`GET /api/resources` exposes Kubernetes, databases, virtual machines,
middleware, storage, and cloud resources through one stable contract:

```text
GET /api/resources?resource_type=pod&cluster=prod&namespace=orders&limit=200
```

The response uses contract `luxyai.resource.v1`, includes source and health
summaries, and supports cursor pagination. New infrastructure teams should add
an adapter and normalize into this contract instead of introducing a parallel
resource API.

## Safety Model

The platform is designed around least privilege:

- no browser-side shell or arbitrary command execution;
- no mutation unless server switches allow it;
- high-risk actions require explicit operator confirmation;
- action catalog limits what the model can request;
- namespace/workload scope is controlled by RBAC and allowlists;
- every change records preview, actor, diff, result, and verification status;
- secrets are never committed and should be supplied through Kubernetes Secret or a secret manager.

## Repository Layout

```text
luxyai/
├── agents/                  # SRE workflow agents and execution engines
├── backend/app/             # Control plane API, schemas, services, domain logic
├── mcp_servers/             # Kubernetes MCP tools
├── cmdb/                    # Local CMDB/topology service
├── cloud/                   # Cloud and infrastructure adapter contracts
├── frontend/modern/         # React + TypeScript + Vite console
├── charts/luxyai/      # Production Helm chart
├── manifests/               # Kubernetes manifests
├── scripts/                 # Build and image helper scripts
├── docs/                    # Architecture and maintainer documentation
├── examples/                # Sample alerts
└── tests/                   # Backend and workflow tests
```

## Development

```bash
python -m compileall -q backend agents mcp_servers cmdb cloud a2a openwebui
python -m unittest discover -s tests -v
cd frontend/modern && npm run build
```

Run the security gate locally:

```bash
python -m pip install pip-audit
pip-audit -r requirements.lock --no-deps --disable-pip
```

## GitHub

The public engineering baseline lives at
[`William-Lu-stack/LuxyAI`](https://github.com/William-Lu-stack/LuxyAI). Custom algorithm
extensions, credentials, production topology, and company data are loaded at
runtime and are intentionally excluded from the public repository.

## Roadmap

`luxyai` is designed to grow from a Kubernetes SRE console into an AgenticOps operating system for modern infrastructure.

- **Kubernetes Autopilot**: cover the full lifecycle from alert, evidence, root-cause analysis, remediation preview, approval, execution, rollback, and recovery verification.
- **Rancher Multi-Cluster Fleet**: make every cluster, namespace, workload, event, metric, and operation record searchable and governable from one control plane.
- **Full-Stack Infrastructure Operations**: extend the same evidence-to-action loop to databases, virtual machines, storage, middleware, ingress, service mesh, and hybrid-cloud resources.
- **Runtime Data-Flow Intelligence**: fuse Kubernetes inventory, CMDB, Prometheus, Loki, Tempo, and eBPF flow data into a living dependency graph that explains impact, blast radius, and traffic direction.
- **Release Governance Control Plane**: turn SLO, error budget, canary scope, image risk, YAML policy, topology risk, and emergency repair paths into a programmable release gate.
- **Operations Skills Network**: let engineers package hard-won troubleshooting experience as portable Skills, so the platform becomes stronger every time an incident is solved.
- **Model Benchmark Arena**: evaluate different models by remediation success rate, MTTR reduction, safety score, evidence quality, token cost, and rollback correctness.
- **Digital Twin for Change Risk**: simulate changes against topology, historical incidents, dependency paths, and SLO budgets before production is touched.
- **100k-Node Scale Architecture**: move heavy discovery to event-driven collectors, sharded caches, async job queues, streaming evidence pipelines, and pluggable stores.
- **Enterprise Trust Layer**: ship production Helm charts, air-gapped packages, OIDC/SSO, RBAC presets, audit retention, policy-as-code, secret-manager integration, and compliance reports.
- **Cloud & Edge Expansion**: add first-class adapters for Alibaba Cloud, Generic Cloud, Tencent Cloud, AWS, Azure, private cloud, edge clusters, and cross-region disaster recovery.
- **Self-Healing Platform Runtime**: let the platform inspect and repair its own agents, collectors, queues, stores, and integrations under strict approval and audit boundaries.

## License

This project is released under the standardized
[PolyForm Noncommercial License 1.0.0](LICENSE).

You may use, study, modify, and redistribute the source code for non-commercial purposes. Commercial use, hosted commercial services, resale, enterprise product bundling, paid support services, and removal of author attribution require prior written authorization from **the maintainer**.

This is a standardized source-available non-commercial license, not an
OSI-approved open-source license. Commercial authorization: **the maintainer**,
telephone `18616350794`, WeChat `Lxylxy_-`.
