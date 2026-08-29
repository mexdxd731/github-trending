# AI Research Assistant

A fully Dockerized local web research assistant: you type a search query into
a web UI, the backend launches a headless Hermes Agent run that does real web
research through the DonSeTch MCP server (stealth search, bot-wall-bypassing
fetch, crawl), and a dated, styled HTML research report is written to
`research/reports/`. The static `research/index.html` listing is regenerated
and reports older than the retention window are deleted. Everything runs with
`docker compose`; reports persist at the absolute path given by
`${RESEARCH_VOLUME}` (default
`/appdata/A--docker_stacks/AI-Research-Assistant/research` on this deployment;
override for other hosts).

You fork it, you support it. I only add what I find I need in my own homelab.

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg) ![Docker](https://img.shields.io/badge/docker-compose-blue.svg)

Web Page

<img width="1960" height="671" alt="image" src="https://github.com/user-attachments/assets/a0fe9600-1648-4dac-bd3f-52a87b76643d" />

Sample Report

<img width="772" height="789" alt="image" src="https://github.com/user-attachments/assets/3d5fb7b6-096d-45d6-9c9b-e94299ebc7c0" />


## Architecture

- **frontend** — static nginx container serving the UI and proxying all API
  traffic to the backend.
- **backend** — FastAPI (uvicorn) control plane: validates the query, drives
  Hermes, owns deterministic retention and the report index.
- **Hermes Agent** — the research brain; runs headless in the backend
  container and drives DonSeTch's MCP tools.
- **DonSeTch** — Rust MCP web-research server (search + semantic reranking,
  bot-wall bypassing fetch, crawl), compiled into the backend image.
- **reports on disk** — generated HTML lives in the bind-mounted
  `./research/reports` volume.

```
browser ──▶ frontend (nginx :8080)
                │  /api/*, /index, /reports/*, /health
                ▼
            backend (FastAPI :8000)
                │  hermes chat -q "<research prompt>"
                ▼
            Hermes Agent (headless)
                │  mcp__donsetch__* tools (stdio MCP)
                ▼
            DonSeTch MCP (web search / fetch / crawl)
                │
                ▼
            reports on disk (research/reports/) + regenerated index
```

## Repository layout

```
AI-Research-Assistant/
  README.md                     # this file
  AGENTS.md                     # agent rules for dsh/CRG-driven maintenance
  .gitignore                    # keys, caches, generated reports
  .env.example                  # template for your API keys (.env is ignored)

  docker/
    Dockerfile.backend          # builder: DonSeTch (Rust) + runtime: Hermes + FastAPI
    Dockerfile.frontend         # static nginx serving the UI
    docker-compose.yml          # full stack (backend + frontend)
    nginx.conf                  # frontend nginx: static files + /api proxy
    backend/
      entrypoint.sh             # container startup: Hermes creds, then uvicorn

  backend/
    server.py                   # FastAPI app: /run-research, /reports, /index, /health
    hermes_prompts.md           # RESEARCH PROMPT + HTML GENERATION GUIDELINES for Hermes
    config/
      paths.json                # report dir, retention policy, ports, timeouts

  frontend/
    index.html                  # search box + report list UI
    report-template.html        # HTML template Hermes fills for each report
    assets/
      style.css                 # UI styles (shared design language with the template)
      app.js                    # calls backend /run-research etc. via /api/*

  research/
    reports/.gitkeep            # keeps the dir tracked; generated reports are gitignored
    index.html                  # generated at runtime — do NOT commit content
```

## Prerequisites

- Docker with the Docker Compose v2 plugin (`docker compose version`).
- A DeepSeek API key (the pre-seeded Hermes config uses the native `deepseek`
  provider). An OpenRouter key is optional — it is not used by the default
  deepseek provider.

## Setup

```sh
cp .env.example .env
```

Fill in `DEEPSEEK_API_KEY=` in `.env` (`OPENROUTER_API_KEY=` is optional —
only relevant if you flip the provider; the pre-seeded config uses the native
deepseek provider). `.env` is gitignored; `.env.example` is committed. The API
keys can alternatively come from your shell environment instead of `.env` —
shell exports take precedence over the `.env` values.

The backend service loads this file directly via `env_file: ../.env`, so the
keys reach the container whether you deploy with dockhand, bare
`docker compose`, or `--env-file`.

## Build & run

```sh
docker compose --env-file .env -f docker/docker-compose.yml up -d --build
```

The `--env-file .env` flag is needed because compose's automatic `.env` lookup
follows the compose file's directory (`docker/`), while this project keeps its
`.env` at the repo root next to `.env.example`.

- UI: <http://localhost:8080>
- API directly: <http://localhost:8000> — endpoints:
  - `POST /run-research` — body `{"query": "<terms>"}`; runs research, returns
    the new report path and the list of reports deleted by retention.
  - `GET /reports` — all reports, newest first.
  - `GET /index` — the regenerated `research/index.html` listing.
  - `GET /reports/{filename}` — a single report (traversal-guarded).
  - `GET /health` — `{"status": "ok"}`, used by the compose healthcheck.

Logs: `docker compose --env-file .env -f docker/docker-compose.yml logs -f backend`.

## How the research workflow works

1. You type a query in the UI and hit **Run Research**.
2. `app.js` POSTs `{"query": ...}` to `/api/run-research`; nginx strips the
   `/api` prefix and forwards to the backend.
3. The backend validates the query, computes a slug (`lowercase, alphanumerics
   + hyphens, ≤ 48 chars`) and the target path
   `research/reports/report-YYYY-MM-DD-<slug>.html` (appending `-2`, `-3`, …
   when the file already exists — runs never overwrite).
4. It substitutes `{{query}}`, `{{report_path}}`, `{{today}}` and
   `{{retention_days}}` into the RESEARCH PROMPT section of
   `backend/hermes_prompts.md` and runs `hermes chat -q "<prompt>"` headless
   with the container environment passed through.
5. Hermes uses the DonSeTch MCP tools (`mcp__donsetch__web_search`,
   `mcp__donsetch__web_fetch`, `mcp__donsetch__web_crawl`) to research, fills
   `frontend/report-template.html` and writes the report HTML to the exact
   target path.
6. Hermes regenerates `research/index.html` (list of all reports with links,
   dates and titles, newest first) and deletes reports older than the
   retention window.
7. The backend then runs retention cleanup itself as a deterministic fallback
   and refreshes the index, so the API contract holds even if Hermes skipped
   the housekeeping.
8. The UI shows the new report path and how many old reports were deleted, and
   refreshes the report list.

## Retention & cleanup

- Rule: any `report-*.html` in `research/reports/` whose filename date is
  older than `retention_days` (default 30) is deleted, compared against
  today's date (UTC).
- Configuration: `retention_days` in `backend/config/paths.json`.
- When it runs: after every research run (as a deterministic fallback, even if
  Hermes failed) and at backend startup (so old reports are cleaned even if no
  research is ever triggered).
- Determinism: age is parsed from the filename date, not the file mtime, so
  the same directory state always yields the same deletions.

## Integration: Hermes + DonSeTch + DeepSeek-Harness + CRG

Four pieces come together in this project:

- **Hermes Agent** is the research brain. It runs headless inside the backend
  container, drives the DonSeTch MCP server for stealth web search / fetch /
  crawl, and generates the dated HTML reports. The pre-seeded
  `~/.hermes/config.yaml` uses the native DeepSeek provider with
  `deepseek-v4-flash` and registers DonSeTch as a stdio MCP server;
  `DEEPSEEK_API_KEY` reaches it via `~/.hermes/.env` (written by
  `entrypoint.sh`) and the container environment. `HERMES_MODEL` overrides
  the model at runtime via `entrypoint.sh`.
- **DonSeTch** is the Rust MCP web-research server: search with semantic
  reranking, bot-wall-bypassing fetch, and crawl. It is compiled from a pinned
  commit inside the backend image; `DONGHOST_NO_SANDBOX=1` is set because
  Chromium's sandbox cannot initialize inside a default container.
- **DeepSeek-Harness (dsh)** is the coding agent used to generate and maintain
  this very repository — all code in this repo was produced by dsh headless
  runs routed through OpenRouter to `deepseek/deepseek-v4-flash-0731`. The
  invocation pattern (from your local dsh checkout):
  `OPENROUTER_API_KEY=... pnpm dsh --profile headless --patch
  openrouter.patch.yml "<task>"`.
- **code-review-graph (CRG)** builds a knowledge graph of this repo
  (`graph.db` under `.code-review-graph/`) used for graph-first exploration
  and review of every change — run `build_or_update_graph_tool` with this
  repo's root as `repo_root` after changes.

**The glibc story:** DonSeTch's ONNX Runtime (OCR + semantic reranking
features) requires glibc ≥ 2.38. The backend image is therefore Debian
trixie-based (glibc 2.41) end to end, and **no LD_PRELOAD shim is needed
inside the container** — that shim only matters on hosts with older glibc.

## Troubleshooting

- **Missing API key** — research runs fail; the backend logs show
  `MISSING_CREDENTIAL`. Paste a real key into `.env` and restart:
  `docker compose --env-file .env -f docker/docker-compose.yml restart backend`.
- **First research run is slow** — the first search downloads the ONNX rerank
  model into DonSeTch's cache; subsequent runs are faster.
- **Long research runs** — the nginx proxy read timeout is set to 600s, and
  the backend's `hermes_timeout` (default 600s) is configurable in
  `backend/config/paths.json`; if a run exceeds both, either raise
  `hermes_timeout` or split the query.
- **Resetting the stack** — `docker compose --env-file .env -f
  docker/docker-compose.yml down -v` removes the containers and named volumes
  but nothing important: the reports live in `./research` on your host.
- **Re-running the same query** — the same day's re-run gets a `-2` suffix
  (`report-YYYY-MM-DD-<slug>-2.html`); reports are never overwritten.

## License

Released under the [MIT License](LICENSE).
