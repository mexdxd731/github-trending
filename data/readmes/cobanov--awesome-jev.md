# Awesome Jev [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated, source-backed list of projects built with Jev, TypeSafe AI's System One model for fast, typed, probabilistic decisions.

Jev takes program state plus typed questions and returns constrained answers with probabilities. It is designed for software decisions such as classification, routing, scoring, ranking, verification, and guardrails—not free-form text generation.

This list favors public source code, concrete Jev usage, clear limitations, and reproducible evidence. The ecosystem is new and moving quickly; entries were last reviewed on **September 18, 2026**.

## Contents

- [Start here](#start-here)
- [Official resources](#official-resources)
- [SDKs and developer tools](#sdks-and-developer-tools)
- [Agents, coding, and guardrails](#agents-coding-and-guardrails)
- [Routing, data, and workflows](#routing-data-and-workflows)
- [Games, robotics, and interactive demos](#games-robotics-and-interactive-demos)
- [Open reproductions and research](#open-reproductions-and-research)
- [Evaluation and calibration](#evaluation-and-calibration)
- [Related lists](#related-lists)
- [Contributing](#contributing)

## Start here

- **System One shape:** unstructured state + typed questions → constrained answers + probabilities → deterministic application code.
- **Question primitives:** `Choice`, `Score`, and `Noul` (a probabilistic yes/no/unknown-style decision).
- **Good fits:** semantic routing, triage, reranking, rubric scoring, moderation, verification, and low-latency decisions inside bounded workflows.
- **Important caveat:** schema-valid output is not the same as a correct decision. Validate on your own data, calibrate thresholds, keep high-impact actions behind deterministic checks, and provide a human fallback.

## Official resources

- [TypeSafe AI](https://typesafe.ai/) - Product overview and early-access entry point.
- [Documentation](https://docs.typesafe.ai/) - Concepts, primitives, API, patterns, and SDK guides.
- [Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) - Launch post covering the model interface, RLCD, published performance claims, demos, and caveats.
- [typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js) - Official TypeScript and JavaScript SDK with inferred answer types.
- [typesafe-sdk-python](https://github.com/typesafe-ai/typesafe-sdk-python) - Official synchronous and asynchronous Python SDK.
- [system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python) - Drop-in adapter for comparing the System One interface with LLM providers.
- [skills](https://github.com/typesafe-ai/skills) - Official agent skills for building and evaluating System One workflows.

## SDKs and developer tools

- [advocaat](https://github.com/pithings/advocaat) - Small type-safe client for asking Jev questions about datasets.
- [jevclient](https://github.com/AboveColin/jevclient) - Async Python client for typed Jev questions and probabilities.
- [jev](https://github.com/dannote/jev) - Elixir/OTP client designed around GenServer replies and pattern matching.
- [typesafe-go](https://github.com/zhirschtritt/typesafe-go) - Idiomatic Go SDK for the TypeSafe API.
- [laravel-typesafe-jev](https://github.com/Butochnikov/laravel-typesafe-jev) - Laravel integration with typed responses, async requests, and testing fakes.
- [zod-jev](https://github.com/jomatsu/zod-jev) - Pairs local Zod shape validation with Jev semantic validation.
- [jev-mcp](https://github.com/blakestone-x/jev-mcp) - MCP server exposing classify, score, check, match, and screen tools.
- [typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp) - MCP connector that gives agents access to Jev decisions.
- [Jevbridge](https://github.com/gamesonrblx/Jevbridge) - ACP/MCP adapter for using Jev alongside coding and chat models.
- [semdecide](https://github.com/sharziki/semdecide) - Typed semantic decisions for Unix pipelines and CI.
- [jev-axi](https://github.com/shiftynick/jev-axi) - CLI for picking, rating, checking, ranking, triaging, and guarding from the shell.

## Agents, coding, and guardrails

- [jev-review](https://github.com/devagrawal09/jev-review) - Staged code-review workflow with a local dashboard.
- [jev-review MCP plugin](https://github.com/NiazMorshed2007/jev-review) - Local-first continuous software-quality review for coding agents.
- [foreman](https://github.com/thruwire/foreman) - Software-factory supervisor that uses Jev to keep coding agents on task.
- [skillranker](https://github.com/Dicklesworthstone/skillranker) - Rust CLI that ranks agent skills against live session context and can abstain.
- [pi-jev](https://github.com/y0usaf/pi-jev) - Measured tool-call gate and general typed decision layer for the Pi coding agent.
- [jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) - Per-turn Codex model, reasoning, and speed-mode routing.
- [supercov](https://github.com/supercorp-ai/supercov) - Scores source files so coding agents can prioritize code-quality work.
- [winnow](https://github.com/GhalebDweikat/winnow) - Judges tool results before admitting them into Claude Code context.
- [Canny](https://github.com/qkal/Canny) - Evidence ledger that challenges unsupported "done" claims from coding agents.
- [jev-guard](https://github.com/leepokai/jev-guard) - Cross-agent tool-call risk scoring with allow, ask, and deny outcomes.
- [typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use) - macOS computer-use experiment using OCR plus bounded Jev action selection.

## Routing, data, and workflows

- [hono-jev-router](https://github.com/yusukebe/hono-jev-router) - Routes Hono HTTP requests by meaning.
- [tiershift](https://github.com/iamvatsalpatel/tiershift) - Policy-bounded model routing for TypeScript and Python.
- [typesafe-jev-workflow](https://github.com/GiesN/typesafe-jev-workflow) - LangGraph email-intent workflow using a typed Jev choice.
- [HA-Jev](https://github.com/AboveColin/HA-Jev) - Home Assistant integration that exposes probabilities, choices, and scores as entities.
- [pg-jev](https://github.com/realZachi/pg-jev) - PostgreSQL extension for semantic questions over table rows.
- [jevsql](https://github.com/EugeneBoondock/jevsql) - SQL-like filtering, ranking, classification, and scoring with natural-language predicates.
- [jevlogs](https://github.com/reachjalil/jevlogs) - OpenTelemetry log triage before more expensive analysis.
- [jev-curate](https://github.com/AkashPriyadarshii/jev-curate) - Streaming filter and scorer for Parquet and JSONL datasets.
- [jev-tree](https://github.com/reachjalil/jev-tree) - Recursive choice over taxonomies larger than Jev's direct option limit.

## Games, robotics, and interactive demos

- [typesafe-mario](https://github.com/fhshaik/typesafe-mario) - Super Mario Bros. agent choosing actions from structured emulator state.
- [typesafe-snake](https://github.com/sorrycc/typesafe-snake) - Snake autoplayer with one typed decision per tick and code-generated legal moves.
- [jev-drone](https://github.com/RomanSlack/jev-drone) - MuJoCo quadrotor experiment with Jev making slower tactical judgments.
- [tsai-sc](https://github.com/phyous/tsai-sc) - Original StarCraft shareware controlled with recorded Jev action probabilities.
- [heist-one](https://github.com/AbdelStark/heist-one) - Browser stealth game where Jev judges guards while deterministic code owns the world.
- [jev-browser](https://github.com/jkudish/jev-browser) - Browser-use experiment powered by Jev decisions.
- [killmyidea](https://github.com/monteduro/killmyidea) - Startup-idea evaluator that chooses kill, fix, or ship.
- [jevmeter](https://github.com/ChetasLua/jevmeter) - Scores every sentence in a video and renders the result as an overlay.

## Open reproductions and research

These projects explore Jev-like interfaces or open implementations. They are independent efforts, not official TypeSafe releases.

- [openjev-sglang](https://github.com/ekzhang/openjev-sglang) - Jev-compatible API endpoint backed by open models and prefill-only inference.
- [jevmlx](https://github.com/bnsd55/jevmlx) - Jev-style parallel constrained decisions for MLX models on Apple Silicon.
- [openvons](https://github.com/genai-craft/openvons) - Open decision layer for finite options across text, images, and Japanese voice commands.
- [openjev](https://github.com/zhihz/openjev) - Local bilingual probability decisions from context, questions, and candidate answers.
- [Verdict-open-jev](https://github.com/Heman10x-NGU/Verdict-open-jev) - ModernBERT decision engine with calibrated uncertainty and a WebGPU playground.
- [parallelConstraintDecoding](https://github.com/stephanj/parallelConstraintDecoding) - Java and llama.cpp experiments in parallel constrained decoding.

## Evaluation and calibration

- [jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks) - Reproducible evaluation for calibration, selective risk, and latency.
- [jevcal](https://github.com/abhixhek/jevcal) - Fits and drift-checks confidence thresholds against labeled data.
- [Janus](https://github.com/FirasSX914/Janus) - Measures when to use Jev versus other models and routes accordingly.
- [jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark) - Early-access evaluation on Korean understanding and medical text.
- [typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark) - LLM gateway that mimics the System One output shape for comparison work.

## Related lists

- [awesome-jev-by-typesafe](https://github.com/Anil-matcha/awesome-jev-by-typesafe) - Evidence-backed use cases, patterns, prompts, and starter code.
- [awesome-jev](https://github.com/hellogumbo/awesome-jev) - Large community directory with a searchable companion site.
- [yibie/awesome-jev](https://github.com/yibie/awesome-jev) - High-signal field guide organized by decision domain.
- [awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe) - Broader TypeSafe and System One ecosystem list.
- [OmniJev/awesome-jev](https://github.com/OmniJev/awesome-jev) - Papers, open reproductions, independent evaluations, and technical lineage.

## Contributing

Built something with Jev? Read [CONTRIBUTING.md](CONTRIBUTING.md) and open a pull request. Small projects are welcome when the source clearly shows a concrete Jev decision loop.

## License

[CC0 1.0 Universal](LICENSE). Linked projects keep their own licenses.

## Acknowledgements

Initial discovery used the public GitHub `jev` topic, GitHub repository search, official TypeSafe materials, and the related community lists above. Descriptions were checked against public repository metadata and documentation; inclusion is not an endorsement by TypeSafe AI.
