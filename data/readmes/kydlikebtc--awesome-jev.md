<!--
  This file is generated from catalog.json. Edit the catalog, then run `python3 scripts/build_readme.py`.
-->

<div align="center">

# awesome-jev

**Every public example of Jev — TypeSafe AI's System One decision model — indexed by the decision it makes, not by the blog that mentioned it.**

[![lint](https://github.com/kydlikebtc/awesome-jev/actions/workflows/lint.yml/badge.svg)](https://github.com/kydlikebtc/awesome-jev/actions/workflows/lint.yml) [![links](https://github.com/kydlikebtc/awesome-jev/actions/workflows/links.yml/badge.svg)](https://github.com/kydlikebtc/awesome-jev/actions/workflows/links.yml) [![entries](https://img.shields.io/badge/entries-805-f5a524?style=flat-square)](https://kydlikebtc.github.io/awesome-jev/) [![verified](https://img.shields.io/badge/link--verified-801-3fb950?style=flat-square)](https://kydlikebtc.github.io/awesome-jev/) [![rechecked](https://img.shields.io/badge/claims%20re--checked-721-58a6ff?style=flat-square)](https://github.com/kydlikebtc/awesome-jev/actions/workflows/claims.yml) [![data](https://img.shields.io/badge/data-CC0--1.0-8b949e?style=flat-square)](LICENSE-CC0) [![code](https://img.shields.io/badge/code-MIT-8b949e?style=flat-square)](LICENSE-MIT)

[Searchable site](https://kydlikebtc.github.io/awesome-jev/) &nbsp;·&nbsp; [中文](README.zh-CN.md) &nbsp;·&nbsp; [Patterns](docs/patterns.md) &nbsp;·&nbsp; [Compatibility](docs/compatibility.md) &nbsp;·&nbsp; [Vetting](docs/vetting.md)

<a href="https://kydlikebtc.github.io/awesome-jev/"><img src="docs/screenshots/site-desktop.png" alt="The awesome-jev site: a coverage histogram down the left acting as the pattern filter, dense entry cards on the right" width="760"></a>

<sub>Filter by clicking a bar. Two more views: <a href="https://kydlikebtc.github.io/awesome-jev/?view=prims">primitives</a> · <a href="https://kydlikebtc.github.io/awesome-jev/?view=compat">compatibility</a>. Every filter and entry is a shareable URL.</sub>

</div>

---

## What this is

- **Jev** is a decision model from TypeSafe AI. It does not write text — you hand it state plus typed questions and it returns typed answers with calibrated confidence, fast and cheap enough to sit in an agent's inner loop.
- **This repo** indexes public examples of using it, organised by the *decision* being made. The resource you read this week is disposable; the decision pattern is not.
- **Why trust it:** every row names where it came from, says which primitives the code actually calls, and flags what a reader deserves to know before clicking. There are dozens of Jev lists — this one competes on verification, not on size.

> ⚠️ Not the product, not an SDK, not affiliated with TypeSafe AI, and not a recommendation. A row means the link resolved and a person read it — nothing more. See [what is verified](#what-is-verified-and-what-is-not).

## What Jev returns

Three primitives. Every pattern below is built out of them, and the asymmetry in the last row is the single most common source of bugs.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/primitives-en-dark.svg">
  <img src="docs/assets/primitives-en-light.svg" alt="Three panels describing the choice, score and noul primitives and what each returns" width="660">
</picture>

Input is **text only** — string, JSON object, or array of text. Context is **64k** tokens per request, **32k** for the state plus the longest question. Output tokens are free. There are no published weights, so it cannot be run locally. Full cross-platform differences: [`docs/compatibility.md`](docs/compatibility.md).

## Start here

Six things in reading order. Hand-picked, because "most starred" is not the same as "read this first".

1. **[Quickstart](https://docs.typesafe.ai/introduction/quickstart)**
   <sub>The canonical first call: one support ticket, one Choice, one Score and one Noul in a single request, in Python, JS and cURL.</sub>

2. **[Jev 1.13 known limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)**
   <sub>The most useful page in the docs and the least linked. It explains, among other things, that a Choice over options and one Noul per option answer different questions.</sub>

3. **[Example: three primitives in one request](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/01-three-primitives/main.py)**
   <sub>Written from the official API reference and checked field by field against it, but not executed against the live API.</sub>

4. **[fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction)**
   <sub>Exactly two nouls per tool call: does knowing this call happened still matter, and is the full output still needed verbatim. Despite the word "scored" in its own description, no score primitive is used.</sub>

5. **[ai-cookbook: Jev track](https://github.com/daveebbelaar/ai-cookbook)**
   <sub>The best structured tutorial found. It states plainly that typed output does not guarantee a correct decision, lists the documented weaknesses, and qualifies its own cost illustration rather than selling it.</sub>

6. **[Hermes Agent: Jev compaction evaluation](https://github.com/NousResearch/hermes-agent)**
   <sub>The single most credible row in this catalog. Recall came out below their existing summariser, and at a matched context budget it tied plain recency ordering. Cost was genuinely far lower. Publishing a negative result on a hyped model is rare.</sub>

## Coverage

Every decision pattern, sized by how many examples exist. This doubles as the index — the names link to the sections below. A zero is a research gap, not a rendering bug.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/coverage-en-dark.svg">
  <img src="docs/assets/coverage-en-light.svg" alt="Horizontal bar chart of how many catalog examples exist for each of the eighteen decision patterns" width="100%">
</picture>

Two patterns have no examples yet. Both are plausible fits nobody appears to have published — see [`docs/status.md`](docs/status.md).

## Measured, not claimed

Almost every performance number circulating about this model is the vendor's own, produced with reference answers derived from other models' judgements rather than human ground truth. These are the independent measurements in the catalog — several are **negative results**, which is exactly why they are worth reading first.

- **[Hermes Agent: Jev compaction evaluation](https://github.com/NousResearch/hermes-agent)** — Ported the Jev compaction approach, measured it against their shipping summariser, and published the conclusion not to adopt it.
  <sub>`Benchmark` · ★247,881 · `Py` · `noul`</sub>
  <sub>The single most credible row in this catalog. Recall came out below their existing summariser, and at a matched context budget it tied plain recency ordering. Cost was genuinely far lower. Publishing a negative result on a hyped model is rare.</sub>

- **[worldmonitor: news threat classification](https://github.com/koala73/worldmonitor)** — Two Choice questions over threat level and category, held in shadow mode after a blind evaluation found Jev merely tied the incumbent model.
  <sub>`Benchmark` · ★87,191 · `TS` · `choice` · ⚠ `shadow mode`</sub>
  <sub>Wired in but deliberately inert: by their own statement nothing Jev returns reaches a label, a cache row or an alert. Ships a golden fixture. A model to copy for how to trial a new model without betting production on it.</sub>

- **[no-mistakes: review context selection](https://github.com/kunchenguid/no-mistakes)** — One Score per candidate file to pick review context, with a measured outcome: materially more billed input for essentially no wall-clock gain.
  <sub>`Benchmark` · ★8,598 · `Go` · `score`</sub>
  <sub>Their own recommendation was to keep the feature opt-in, off by default, and ship no savings claim. That is what an honest measurement looks like.</sub>

- **[hippo-memory](https://github.com/kitfunso/hippo-memory)** — Biologically-inspired memory for AI agents. Decay, retrieval strengthening, consolidation. Zero runtime deps, SQLite, MCP. Benchmarked retrieval with an opt-in TypeSafe Jev reranker.
  <sub>`Benchmark` · ★752 · kitfunso · `TS`</sub>

- **[Probing Jev's behaviour with repeated API calls](https://github.com/ahastudio/til)** — Independent Korean-language notes reporting that reversing the order of options shifted a probability enough to flip a 0.9 threshold.
  <sub>`Benchmark` · ★190 · `Py` · ⚠ `no licence` `unverified`</sub>
  <sub>The most actionable engineering caveat found anywhere: if option order alone can move a probability past your threshold, your threshold is not as stable as it looks. Independent and unreplicated, so treat the magnitude as indicative.</sub>

- **[windtunnel](https://github.com/nekuda-ai/WindTunnel)** — A WebMCP benchmark, measures WebMCP against other browser-agent interfaces.
  <sub>`Benchmark` · ★76 · nekuda-ai · `TS`</sub>

- **[jevbench](https://github.com/fstandhartinger/jevbench)** — JevBench v1 - a benchmark for Jev-class typed decision models: smart, cheap, fast, reliable, open.
  <sub>`Benchmark` · ★71 · fstandhartinger · `Py`</sub>

- **[typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark)** — A gateway that mimics the structured-output shape, used to benchmark against it.
  <sub>`Benchmark` · ★37 · iammrduncan · `TS`</sub>

- **[smartmoney-cub](https://github.com/myc0576/SmartMoney-Cub)** — Read-only trading journal and review harness: Jev typed judgments, agent integration, and a reproducible finance benchmark. No orders, no advice.
  <sub>`Benchmark` · ★26 · myc0576 · `Py`</sub>

- **[jev-capability-atlas](https://github.com/Zaious/jev-capability-atlas)** — Independent, evidence-based map of when TypeSafe's Jev actually holds up vs. breaks down — real API-call receipts, not a leaderboard. 中文為主的雙語 repo。
  <sub>`Benchmark` · ★24 · zaious · `Py`</sub>

- **[jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks)** — Probability-aware evaluation for typed decision models: calibration, selective risk, latency, and reproducible benchmarks.
  <sub>`Benchmark` · ★17 · abdelstark · `Py`</sub>

- **[jev-rag-benchmark](https://github.com/erendikmenn/jev-rag-benchmark)** — Reproducible benchmark for measuring Jev reranking quality, latency, and cost in RAG
  <sub>`Benchmark` · ★14 · erendikmenn · `Py`</sub>

- **[jev-benchmark](https://github.com/wondertwins/jev-benchmark)** — Benchmarks and a playground for TypeSafe's Jev (System One) model: chess, and who-is-the-player-talking-to for speech-to-text game NPCs
  <sub>`Benchmark` · ★6 · wondertwins · `Py`</sub>

- **[jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark)** — Reproducible early-access evaluation of Jev on Korean understanding and medical text, with runtime and cost evidence
  <sub>`Benchmark` · ★6 · mahlernim · `Py` · ⚠ `no licence`</sub>

- **[jev-little-airways](https://github.com/lbotinelly/jev-little-airways)** — A show-and-tell capability study for Jev, TypeSafe's System One decision model.
  <sub>`Benchmark` · ★5 · lbotinelly · `TS`</sub>

- **[jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench)** — An independent head-to-head against dedicated rerankers across fourteen datasets.
  <sub>`Benchmark` · ★5 · anessbelbati · `Py`</sub>
  <sub>An independent measurement rather than a vendor figure, and a direct comparison against purpose-built rerankers — the comparison that matters for the search-ranking pattern.</sub>

- **[legalforecastbench](https://github.com/johnhughes3/LegalForecastBench)** — LegalForecast-MTD benchmark alpha and official evaluation workflows
  <sub>`Benchmark` · ★5 · johnhughes3 · `Py`</sub>

- **[jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration)** — Independent calibration test of TypeSafe's Jev on a task it cannot have seen: 900 rule-generated support tickets (choice / score / boolean) plus 3 public benchmarks via Vercel AI Gateway. Raw responses, ECE with noise floor, temperature refit, per-type sign of miscalibration. Reproducible for ~
  <sub>`Benchmark` · ★4 · scienthoon · `Py`</sub>

- **[jev-dspy-lab](https://github.com/jmanhype/jev-dspy-lab)** — Reproducible calibration and selective-risk benchmarks for Jev/TypeSafe decisions in DSPy workflows
  <sub>`Benchmark` · ★3 · jmanhype · `Py`</sub>

- **[jev-exploration](https://github.com/SamuelSacco/jev-exploration)** — Jev (TypeSafe) exploratory thread: claim audit, live demos, and runnable code
  <sub>`Benchmark` · ★3 · samuelsacco · `Py` · ⚠ `no licence`</sub>

- **[jev-phishing-bench](https://github.com/anisselbd/jev-phishing-bench)** — Jev (TypeSafe) vs Claude Haiku 4.5 on 2 000 phishing emails: accuracy, calibration, latency, cost. Reproducible benchmark.
  <sub>`Benchmark` · ★3 · anisselbd · `Py` · ⚠ `no licence`</sub>

- **[ego-jev-ultrafast](https://github.com/shikaizhong-design/ego-jev-ultrafast)** — Jev drives your Ego Lite browser: one typed-choice request per step. Single-file, zero-dependency port of browser-use/jev-ultrafast with multi-model benchmarks and extra guardrails. Unofficial.
  <sub>`Benchmark` · ★2 · shikaizhong-design · `JS` · ⚠ `no licence`</sub>

- **[jev-agent-failure-benchmark](https://github.com/TokenTrim/jev-agent-failure-benchmark)** — Benchmarking Jev (Typesafe.ai) against a strong LLM on the Who&When Pro agent-failure-attribution benchmark (text subset).
  <sub>`Benchmark` · ★2 · tokentrim · `Py`</sub>

- **[jev-play-ping-pong](https://github.com/Icohen007/jev-play-ping-pong)** — Jev plays browser table tennis in real time: structured telemetry, typed decisions, ordinary Chrome inputs, and auditable evidence.
  <sub>`Benchmark` · ★2 · icohen007 · `JS`</sub>

- **[jev-routing-experiment](https://github.com/TokenTrim/jev-routing-experiment)** — Benchmarking TypeSafe's Jev decision model as a cost-efficient LLM router on RouterArena
  <sub>`Benchmark` · ★2 · tokentrim · `Py`</sub>

- **[origin-civilization](https://github.com/JacquesGariepy/ORIGIN-CIVILIZATION)** — AI life-and-civilization simulation: TypeSafe Jev makes every decision (typed, probabilistic, auditable); LLMs plan — OpenAI-compatible APIs, local models (Ollama, LM Studio), Claude Code, Codex.
  <sub>`Benchmark` · ★2 · jacquesgariepy · `TS` · ⚠ `no licence`</sub>

- **[sysone-bench](https://github.com/instax-dutta/sysone-bench)** — First independent head-to-head benchmark of System One decision models (Laya vs Jev) on byte-identical inputs
  <sub>`Benchmark` · ★2 · instax-dutta · `Py` · ⚠ `no licence`</sub>

- **[zerosweep](https://github.com/sysadarsh/zerosweep)** — Autonomous System-One Triage Engine & Benchmark powered by TypeSafe AI (Jev). 75ms inference, $0 output tokens, and RLCD epistemic safety gates.
  <sub>`Benchmark` · ★2 · sysadarsh · `TS` · ⚠ `no licence`</sub>

- **[antigravity-mcp-semantic-search-with-typesafeai](https://github.com/greenyamao/Antigravity-mcp-semantic-search-with-TypeSafeAi)** — Fast semantic code search & diff sanity auditor for AI coding assistants (Antigravity, Cursor, Claude Code) powered by TypeSafe System One.
  <sub>`Benchmark` · ★1 · greenyamao · `Py` · ⚠ `no licence`</sub>

- **[dsh-jev-verify](https://github.com/xienda/dsh-jev-verify)** — Jev (TypeSafe System One) decision tools + live verification benchmark for DeepSeek Harness: jev_decision (choice/score/noul) and jev_verify, honest by design.
  <sub>`Benchmark` · ★1 · xienda · `JS`</sub>

- **[jev-eval](https://github.com/4esv/jev-eval)** — Benchmark TypeSafe Jev against any OpenRouter model on your own labelled classification data: accuracy, calibration, latency, cost
  <sub>`Benchmark` · ★1 · 4esv · `Py` · ⚠ `no licence`</sub>

- **[jev-sim](https://github.com/dashbi1/jev-sim)** — Jev-compatible /v1/systemone server reading typed decisions from LLM logits, benchmarked against TypeSafe's Jev on the same items via JevBench
  <sub>`Benchmark` · ★1 · dashbi1 · `Py`</sub>

- **[jevsbistro](https://github.com/andrewsilber/JevsBistro)** — 3D restaurant service simulator for benchmarking low-latency decision models
  <sub>`Benchmark` · ★1 · andrewsilber · `TS`</sub>

- **[padflow-jev-evals](https://github.com/zsavage8/padflow-jev-evals)** — Typed-decision benchmark from PadFlow (land development SaaS): schemas, anonymized labeled rows, and a runner for confidence-calibrated models like TypeSafe Jev.
  <sub>`Benchmark` · ★1 · zsavage8 · `Py`</sub>

- **[agent-handoff-gate](https://github.com/zsoXi/agent-handoff-gate)** — An experimental protocol for evidence-aware agent handoffs, bounded worker continuation, and TypeSafe/Jev-assisted review, with reproducible evaluation.
  <sub>`Benchmark` · ★0 · zsoxi · `Py`</sub>

- **[jev-calibration-audit](https://github.com/jujumilk3/jev-calibration-audit)** — Independent API-only calibration audit of TypeSafe AI's Jev decision model
  <sub>`Benchmark` · ★0 · jujumilk3 · `Py`</sub>

- **[jev-certify](https://github.com/nikkoxgonzales/jev-certify)** — Finite-sample guarantees for Jev (TypeSafe's System One). Conformal risk control turns calibrated probabilities into certified routing thresholds; prediction-powered inference audits them. 2,412 decisions on CLINC150 for $0.23 — including the shift and prevalence cases where the guarantee break
  <sub>`Benchmark` · ★0 · nikkoxgonzales · `Py`</sub>

- **[jev-enterprise-decision-fabric](https://github.com/ghubnab99/jev-enterprise-decision-fabric)** — Architecture for running many semantic decisions through one validated path, with a labelled 111-case benchmark comparing TypeSafe Jev against a Claude baseline, and a dashboard for inspecting any single decision. Experimental, not production.
  <sub>`Benchmark` · ★0 · ghubnab99 · `C#`</sub>

- **[jev-llm-router-benchmark](https://github.com/erendikmenn/jev-llm-router-benchmark)** — Benchmark-driven Jev router and judge for cost-aware, reliable LLM coding workflows
  <sub>`Benchmark` · ★0 · erendikmenn · `Py`</sub>

- **[jev-orderby-bench](https://github.com/yodablocks/jev-orderby-bench)** — Does ORDER BY over a Jev probability put rows in a defensible order? Independent ranking, calibration and invariant measurements of TypeSafe AI's Jev: passes six pre-registered gates on 360 labeled rows, fails four of six on graded product relevance.
  <sub>`Benchmark` · ★0 · yodablocks · `Py`</sub>

- **[jev-secret-detection](https://github.com/teyhouse/jev-secret-detection)** — Measures how well TypeSafe's RLCD-Jev model spots real secret credentials in file snippets
  <sub>`Benchmark` · ★0 · teyhouse · `Py` · ⚠ `no licence`</sub>

- **[jev-trace-classifier](https://github.com/sypherin/jev-trace-classifier)** — Application of TypeSafe Jev (noul judgment primitive) on the collusion.wiki corpus: agent vs human page authorship, head-to-head vs local Qwen3.8-Flash-Next
  <sub>`Benchmark` · ★0 · sypherin · `Py`</sub>

- **[smoking-extraction-benchmark](https://github.com/vclic/smoking-extraction-benchmark)** — Synthetic smoking-history extraction benchmark comparing TypeSafe Jev and OpenAI structured outputs, with reproducible accuracy, cost, and latency results.
  <sub>`Benchmark` · ★0 · vclic · `Py` · ⚠ `no licence`</sub>

- **[An early-access test of TypeSafe's Jev: calibrated judgments for half a cent](https://lindfors.no/blog/a-first-look-at-typesafes-jev/)** — The best independent test found: 24 Norwegian documents on one pinned model version, opening with a case the model got wrong while correctly reporting low confidence.
  <sub>`Benchmark` · Lindfors</sub>
  <sub>Methodology is stated cleanly and scoped honestly as a single-day snapshot. Leading with a failure case is what makes it a real calibration test rather than a testimonial.</sub>

- **[Testing TypeSafe Jev, Mistral and Gemini for local event validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation)** — The only three-way head-to-head found, with each model's prompt tuned separately and the scope limited to one task rather than a general ranking.
  <sub>`Benchmark` · Near Here</sub>
  <sub>Self-limits correctly: a use-case study, not a model leaderboard. That restraint is rarer than the numbers.</sub>

## By decision pattern

The primary index. Each heading is a decision an agent has to make; the rows are examples of making it. Caveats appear as short tags — the full note for each row is in [`catalog.json`](catalog.json) and on [the site](https://kydlikebtc.github.io/awesome-jev/).

### Tool selection

_Which tool or action the agent should call next._

<details>
<summary><b>147</b> rows — click to expand</summary>

- **[Cookbook: Function calling](https://docs.typesafe.ai/cookbooks/function_calling)** ⭐ — Maps natural-language trading requests onto ordinary typed functions by turning function names and closed-set arguments into confidence-aware questions.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Skill suggestion](https://docs.typesafe.ai/cookbooks/skill_suggestion)** ⭐ — Picks at most one skill out of 182 for an agent turn: one request ranks every skill and asks whether the turn needs one at all, a second reads the top three.
  <sub>`Official docs` · `Py` · `choice` · `noul`</sub>

- **[Demo: Smart home assistant](https://docs.typesafe.ai/demos/smart-home)** ⭐ — Runnable demo code for a smart home assistant that evaluates user requests with typed decisions.
  <sub>`Official docs` · `Py`</sub>

- **[claude-code-templates: three Jev plugins](https://github.com/davila7/claude-code-templates)** — Three independently installable Claude Code plugins — guardrails, model router and skill suggestion — each with its own hooks and tests.
  <sub>`Plugin` · ★30,899 · `Py` · `TS` · `choice` · `score` · `noul`</sub>

- **[Composio TypeSafe provider](https://github.com/ComposioHQ/composio/tree/next/python/providers/typesafe)** — Compiles a tool catalogue into questions and reconstructs tool calls from the answers, with typed errors for abstention and confirmation-required cases.
  <sub>`Project` · ★30,279 · `Py` · `choice`</sub>

- **[FastMCP jev_search transform](https://github.com/PrefectHQ/fastmcp/blob/main/fastmcp_slim/fastmcp/experimental/transforms/jev_search.py)** — Two-stage MCP tool search: a wide Choice coarse-ranks the whole catalogue, then a shortlist gets full descriptions plus one Noul each to decide whether it does the job at all.
  <sub>`Project` · ★27,855 · `Py` · `choice` · `noul`</sub>

- **[Cua driver: jev-use example](https://github.com/trycua/cua/tree/main/libs/cua-driver/examples/jev-use)** — Computer-use action selection in Python and TypeScript: Jev picks the next browser action from an immutable candidate set, with reobserve and abstain as reserved options.
  <sub>`Project` · ★25,834 · `Py` · `TS` · `choice`</sub>

- **[json-render](https://github.com/vercel-labs/json-render)** — Vercel Labs' generative UI framework. In its Jev experiment the model does not write JSON token by token — it only picks components, props and layout.
  <sub>`Project` · ★17,994 · Vercel Labs · `TS` · `choice`</sub>

- **[jev-ultrafast](https://github.com/browser-use/jev-ultrafast)** — A high-speed browser agent from Browser Use: Jev decides the operation and which element to act on, and a small LLM is called only when text must be typed.
  <sub>`Project` · ★16,758 · Browser Use · `Py` · `choice` · ⚠ `vendor numbers`</sub>

- **[DeepChat: agent tool-permission review](https://github.com/ThinkInAIXYZ/deepchat)** — Reviews each tool call on three axes — risk level, whether the user authorised it, and an explicit prompt-injection pressure check.
  <sub>`Project` · ★6,338 · `TS` · `choice` · `noul`</sub>

- **[jev-trader](https://github.com/jarrodwatts/jev-trader)** — High-frequency market making on a test network, deciding buy or sell from spread and trade direction.
  <sub>`Project` · ★1,911 · `TS` · `choice` · ⚠ `unverified`</sub>

- **[agent-desktop](https://github.com/lahfir/agent-desktop)** — Desktop automation that reads the system accessibility tree and decides which button, menu or field to act on next.
  <sub>`Project` · ★1,449 · `Rs` · `choice`</sub>

- **[typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use)** — Computer use on macOS: OCR the screen, classify the next action, click. Costs a fraction of a cent per step.
  <sub>`Project` · ★775 · awlevin · `Py`</sub>

- **[tiptour-macos](https://github.com/milind-soni/tiptour-macos)** — Open-Source fast local computer use
  <sub>`Project` · ★644 · milind-soni · `Swift` · ⚠ `no licence`</sub>

- **[agent](https://github.com/AgentiLoop/Agent)** — AgentiLoop Agent! An Autonomous Agentic Agent for Mac, and exclusive Apple only harnesss. Supports automation, scripting, coding, build anything and more. Powered by 21 LLM providers across local and cloud platforms. Dark or Light Mode UI.
  <sub>`Integration` · ★624 · agentiloop · `Swift` · ⚠ `no licence`</sub>

- **[Jev-cu](https://github.com/Sac-Y/Jev-cu)** — A computer-use agent that asks which accessibility-tree element to act on, plus a separate noul for whether the action needs explicit user confirmation.
  <sub>`Project` · ★557 · `JS` · `choice` · `noul`</sub>

- **[omg.dev](https://github.com/BennyKok/omg.dev)** — omg.dev — Remote control for claude, codex, cursor, opencode, pi, grok, jcocde with mobile client
  <sub>`Plugin` · ★535 · bennykok · `TS`</sub>

- **[foreman](https://github.com/thruwire/foreman)** — A software-factory foreman that uses Jev to decide what an agent pipeline should do next.
  <sub>`Project` · ★482 · thruwire · `Py`</sub>

- **[hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills)** — Nine agent skills plus a CLI covering model routing, memory filtering, turn retention, one-of-many skill selection and next-action choice.
  <sub>`Plugin` · ★408 · `Py` · `choice` · `score` · `noul`</sub>

- **[jev-browser-use](https://github.com/wy-coliney/jev-browser-use)** — Splits the loop: Jev clicks, a reasoning model thinks and verifies.
  <sub>`Project` · ★341 · wy-coliney · `JS`</sub>

- **[typesafe-mario](https://github.com/fhshaik/typesafe-mario)** — Plays Super Mario Bros. from structured emulator RAM rather than screenshots, deciding run, jump and dodge.
  <sub>`Project` · ★340 · `Py` · `choice` · `score` · `noul` · ⚠ `code untested` `one commit` `no licence`</sub>

- **[mobile-jev](https://github.com/droidrun/mobile-jev)** — Mobile computer use: Jev picks the next on-screen action on a phone.
  <sub>`Project` · ★336 · droidrun · `JS`</sub>

- **[wrongstack](https://github.com/WrongStack/WrongStack)** — An AI coding agent that reads your code, edits files, runs commands, and reasons through bugs — across a terminal REPL, a full-screen TUI, and a browser UI, while you keep your hand on every permission.
  <sub>`Project` · ★332 · wrongstack · `TS`</sub>

- **[jev-browser](https://github.com/jkudish/jev-browser)** — Browser automation where Jev chooses the next action.
  <sub>`Project` · ★235 · jkudish · `TS`</sub>

- **[quackd](https://github.com/rokbenko/quackd)** — One CLI for all your robots. Connect them, command them, and let them work together, each with an LLM for a brain, Jev for cheaper steps. Microduck, Open Duck Mini, LeRobot, XLeRobot, AlohaMini, ToddlerBot or any ROS base. Claude, OpenAI, Gemini, Grok, or local via Ollama or vLLM. Simulator, .d
  <sub>`Plugin` · ★228 · rokbenko · `Py`</sub>

- **[jev-voice-browser](https://github.com/moritzkremb/jev-voice-browser)** — Voice-driven browser control where target criteria are rebuilt per request from the live element list, always including a none option.
  <sub>`Project` · ★222 · `JS` · `choice` · `score` · `noul`</sub>

- **[hyperedit](https://github.com/kevinbadi/hyperedit)** — An AI video editor routing an editing instruction to an operation, a target clip and a track, with a keyword router as fallback.
  <sub>`Project` · ★179 · `TS` · `choice` · `noul` · ⚠ `no licence`</sub>

- **[interlinked-cli](https://github.com/QuentinCody/interlinked-cli)** — The harness for your harness. Local hooks, taste enforcement, and developer observability for AI coding agents (Claude Code, Codex, Cursor, Copilot CLI).
  <sub>`Plugin` · ★177 · quentincody · `TS`</sub>

- **[embodied-jev](https://github.com/FBddcz/embodied-jev)** — EmbodiedJev: MuJoCo robot decision workbench with MiniCPM5-2B, Jev and compatible model APIs
  <sub>`Project` · ★167 · fbddcz · `Py`</sub>

- **[jevpilot](https://github.com/standardagents/jevpilot)** — A driving simulator autopilot asking two choices per tick, which short-circuits single-option questions locally instead of paying to send them.
  <sub>`Project` · ★162 · `JS` · `choice` · ⚠ `no licence`</sub>

- **[jevrouter](https://github.com/BillionsBobby/JevRouter)** — A router for models, tools and subagents.
  <sub>`Project` · ★151 · billionsbobby · `TS`</sub>

- **[pi-jev](https://github.com/y0usaf/pi-jev)** — A decision layer for a coding agent: a measured tool-call gate plus a typed ask for calibrated answers.
  <sub>`Plugin` · ★135 · y0usaf · `TS`</sub>

- **[macbrow](https://github.com/timpratim/macbrow)** — Hands free Mac and Browser control powered by Gradium
  <sub>`Project` · ★131 · timpratim · `Py`</sub>

- **[jevharness](https://github.com/TianyuCodings/JevHarness)** — LLM-authored task-specific Jev harnesses with optional full-trajectory reward reflection and GEPA evolution.
  <sub>`Project` · ★130 · tianyucodings · `Py` · ⚠ `no licence`</sub>

- **[jev-drone](https://github.com/RomanSlack/jev-drone)** — Camera-only simulated drone where Jev makes tactical judgements at a low rate while stabilisation and safety reflexes stay in ordinary fast code.
  <sub>`Project` · ★121 · `Py` · `choice` · `score` · `noul` · ⚠ `unverified`</sub>

- **[jev-gateway](https://github.com/vinilana/jev-gateway)** — An easy way to use jev with your coding agent for tool calling reasoning
  <sub>`Project` · ★121 · vinilana · `TS`</sub>

- **[skillranker](https://github.com/Dicklesworthstone/skillranker)** — Ranks an agent's skills for the next step using live session context, with Claude Code hooks.
  <sub>`Plugin` · ★110 · dicklesworthstone · `Rs` · ⚠ `no licence`</sub>

- **[systemoneharness](https://github.com/HarnessRouter/SystemOneHarness)** — The system one Harness for system one models
  <sub>`Project` · ★100 · harnessrouter · `Py`</sub>

- **[fastbrowse](https://github.com/agent-labs-dev/fastbrowse)** — A fast browser agent: Jev picks each action from what is on the page, an LLM reads and plans, and every claim in an answer cites a quote from the page.
  <sub>`Project` · ★94 · agent-labs-dev · `Py`</sub>

- **[jev-chat: a tool-calling chatbot with no LLM](https://github.com/w3cj/jev-chat)** — A chat bot that does tool calling with no language model anywhere: one request asks the request kind, the tool, and every tool's arguments at once.
  <sub>`Project` · ★86 · `TS` · `choice` · `noul`</sub>

- **[jev-dsh-decision](https://github.com/Devin-AXIS/jev-dsh-decision)** — Jev DSH 决策引擎｜面向 Agent Harness 的结构化决策插件。原生支持 DeepSeek Harness，通过 iPolloWork 支持 OpenCode、Codex Harness。
  <sub>`Plugin` · ★85 · devin-axis · `JS` · ⚠ `no licence`</sub>

- **[neo4jev](https://github.com/jexp/neo4jev)** — Puts Jev inside a knowledge graph traversal: at each node it decides which edge is most worth following.
  <sub>`Project` · ★83 · `Py` · `choice`</sub>

- **[windtunnel](https://github.com/nekuda-ai/WindTunnel)** — A WebMCP benchmark, measures WebMCP against other browser-agent interfaces.
  <sub>`Benchmark` · ★76 · nekuda-ai · `TS`</sub>

- **[jev-desktop](https://github.com/yikangy873-gif/jev-desktop)** — TypeSafe Jev action selection inside Codex Computer Use
  <sub>`Plugin` · ★60 · yikangy873-gif · `JS`</sub>

- **[jev-libero](https://github.com/Dimweaker/jev-libero)** — Fine-grained robot control with Jev, physics previews, and configurable LIBERO tasks.
  <sub>`Project` · ★52 · dimweaker · `Py`</sub>

- **[jev-reviewer](https://github.com/choxos/jev-reviewer)** — Data extraction for systematic reviews, quoted from the papers. Ask a trial report and its supplements your extraction form or a RoB 2, ROBINS-I, QUADAS-2 or TIDieR template; Jev points at the lines, every answer is a verbatim quote with its page, you check it and export the table. Files stay i
  <sub>`Project` · ★32 · choxos · `JS`</sub>

- **[robojev](https://github.com/lykycy123/RoboJEV)** — Two-stage JEV control of a Franka Panda in MuJoCo
  <sub>`Project` · ★29 · lykycy123 · `Py`</sub>

- **[smartmoney-cub](https://github.com/myc0576/SmartMoney-Cub)** — Read-only trading journal and review harness: Jev typed judgments, agent integration, and a reproducible finance benchmark. No orders, no advice.
  <sub>`Benchmark` · ★26 · myc0576 · `Py`</sub>

- **[jev-mem](https://github.com/libingzheren/Jev-Mem)** — Jev-Mem: System-One Controlled Agentic Memory
  <sub>`Project` · ★24 · libingzheren · `Py`</sub>

- **[pi-jev-auto-mode](https://github.com/jomatsu/pi-jev-auto-mode)** — Jev (TypeSafe System One) backed auto mode for the Pi coding agent: semantically auto-approves bash, write, and edit tool calls and fails closed when a decision cannot be made.
  <sub>`Project` · ★23 · jomatsu · `TS`</sub>

- **[tsai-sc](https://github.com/phyous/tsai-sc)** — Drives a 1990s real-time strategy game through keyboard and mouse, recording the action probabilities.
  <sub>`Project` · ★22 · phyous · `Py`</sub>

- **[jev-guard](https://github.com/leepokai/jev-guard)** — Auto mode for every coding agent, built on Jev: risk-scores every tool call with session context (deny / ask / allow), flags prompt injection in results, checks skills and plugins. Claude Code, Codex, Copilot, Gemini, Cursor, pi, OpenCode, ACP.
  <sub>`Plugin` · ★21 · leepokai · `JS`</sub>

- **[jev-mac-voice](https://github.com/brudarko/jev-mac-voice)** — English full-duplex voice control for macOS with OpenAI Realtime, native Accessibility, and Jev.
  <sub>`Project` · ★20 · brudarko · `JS`</sub>

- **[OneVOneJev](https://github.com/emrickgarrett/OneVOneJev)** — A browser 1v1 FPS where every decision tick judges movement, view angle, aim, fire and jump.
  <sub>`Project` · ★20 · `TS` · `choice` · ⚠ `code untested` `no licence`</sub>

- **[jev-macos-loop](https://github.com/jcpsimmons/jev-macos-loop)** — Open-source macOS AI computer use and native GUI automation on Apple silicon. Jev + OmniParser CoreML + Apple Vision OCR. Bring your own OpenRouter, Vercel AI Gateway, or TypesafeAI token.
  <sub>`Project` · ★19 · jcpsimmons · `JS`</sub>

- **[jevalyn](https://github.com/Ray-Hughes/jevalyn)** — The decision layer for your Rails app. A Rails-native wrapper around TypeSafe's Jev System One API: typed, calibrated decisions in your control flow.
  <sub>`Project` · ★17 · ray-hughes · `Rb`</sub>

- **[jcr](https://github.com/NiazMorshed2007/jcr)** — A Jev-powered resolver for agent harnesses to find deterministic commands and their context in a nested capability tree.
  <sub>`Project` · ★16 · niazmorshed2007 · `JS`</sub>

- **[jev-for-chrome](https://github.com/chy4pro/jev-for-chrome)** — Jev for Chrome: drives the tab you are looking at with TypeSafe Jev, a sub-second decision model. Community port of browser-use/jev-ultrafast, not affiliated with TypeSafe.
  <sub>`Project` · ★16 · chy4pro · `TS`</sub>

- **[jevgpt](https://github.com/Bewinxed/jevgpt)** — A chatbot built on a model that cannot generate text (TypeSafe AI's Jev, driven autoregressively)
  <sub>`Project` · ★16 · bewinxed · `TS`</sub>

- **[jev-reflex-autonomy-lab](https://github.com/khordoo/jev-reflex-autonomy-lab)** — Multi-drone autonomy lab demonstrating TypeSafe Jev reflex decisions with optional System 2 strategy guidance.
  <sub>`Project` · ★15 · khordoo · `TS` · ⚠ `no licence`</sub>

- **[jev-use](https://github.com/shitianfang/jev-use)** — An agent plugin that hands steps needing no text output to Jev instead of the main model.
  <sub>`Plugin` · ★15 · shitianfang · `JS`</sub>

- **[live-jev](https://github.com/vinilana/live-jev)** — 2D autonomous car simulation in the browser, driven by TypeSafe's Jev decision model
  <sub>`Project` · ★15 · vinilana · `JS` · ⚠ `no licence`</sub>

- **[jev-mail-classifier](https://github.com/parth-kp/jev-mail-classifier)** — Classify your inbox with Jev (TypeSafe's System One model) — tag, move, flag, and notify, all config-driven.
  <sub>`Project` · ★14 · parth-kp · `Py`</sub>

- **[azdaja](https://github.com/kubet/azdaja)** — Minimal harness-agnostic recursive language model layer — one binary, Python + llm()
  <sub>`Project` · ★10 · kubet · `Py`</sub>

- **[discern](https://github.com/doeixd/discern)** — Craft Type-Safe Uncertainty-aware semantic pattern matching, control flow, and smart procedures for Effect DecisionModel and Jev
  <sub>`Project` · ★10 · doeixd · `TS`</sub>

- **[evoke](https://github.com/evoke-build/evoke)** — Software, by reflex. A sentence becomes a call of a small program, chosen by Jev, TypeSafe AI's classifier, and run only when it is sure enough. Reflexes are recipes anyone can write, share and improve. A CLI you talk to, a package manager for reflexes from git, and a TypeScript SDK.
  <sub>`Project` · ★10 · evoke-build · `Rs`</sub>

- **[jev-askable-arm](https://github.com/TarunTomar122/jev-askable-arm)** — Zero-shot English goals on a sim Franka. Jev chains hardcoded primitives.
  <sub>`Project` · ★10 · taruntomar122 · `Py`</sub>

- **[hearth-jev-rental-search](https://github.com/Nancy-Chauhan/hearth-jev-rental-search)** — Autonomous multi-source rental search powered by TypeSafe Jev
  <sub>`Project` · ★9 · nancy-chauhan · `JS`</sub>

- **[jev-autopilot](https://github.com/arielweinberger/jev-autopilot)** — This demo uses Jev from TypeSafe AI to autonomously fly a drone in a random city from point A to point B, avoiding obstacles along the way. A trip costs $0.01.
  <sub>`Project` · ★9 · arielweinberger · `TS` · ⚠ `no licence`</sub>

- **[jev-harness](https://github.com/AntonioCoppe/jev-harness)** — Decision harness for TypeSafe Jev — confidence gates, shadow mode, recipes, and evals. Claude CLI 48.9s → Jev 1.3s on the same row-filter job.
  <sub>`Project` · ★9 · antoniocoppe · `TS`</sub>

- **[jevscape](https://github.com/Skyvern-AI/jevscape)** — RuneBench harness for TypeSafe's Jev: bounded action catalog, tick-mode controller and a live dashboard
  <sub>`Project` · ★8 · skyvern-ai · `TS` · ⚠ `no licence`</sub>

- **[super-jev](https://github.com/Kevthetech143/super-jev)** — A small, extensible decision-to-action harness for TypeSafe Jev
  <sub>`Project` · ★8 · kevthetech143 · `Py`</sub>

- **[heist-one](https://github.com/AbdelStark/heist-one)** — Observable browser stealth game: Jev makes typed guard judgments while deterministic code owns the world.
  <sub>`Project` · ★7 · abdelstark · `TS`</sub>

- **[jev-doom-agent](https://github.com/lukaske/jev-doom-agent)** — A browser-native Doom agent experiment with structured spatial state, composable AI controls, live decision telemetry, and a Chocolate Doom WebAssembly runtime.
  <sub>`Project` · ★7 · lukaske · `TS` · ⚠ `no licence`</sub>

- **[pi-heed](https://github.com/Nyarlathoteppppp/pi-heed)** — Runtime constraints for the pi coding agent: checks every side-effecting tool call against what you said, before it runs. Powered by TypeSafe Jev.
  <sub>`Project` · ★7 · nyarlathoteppppp · `TS`</sub>

- **[aside-jev](https://github.com/himomohi/aside-jev)** — Aside agents decide with TypeSafe Jev (System One: Choice/Score/Noul). Not a Cua binding — Jev is the model, Aside is the browser runtime.
  <sub>`SDK` · ★6 · himomohi · `Py`</sub>

- **[browserclaw](https://github.com/GoldenLoaf24h/browserclaw)** — BrowserClaw - High-efficiency Chrome browser automation MCP server
  <sub>`Plugin` · ★6 · goldenloaf24h · `TS` · ⚠ `no licence`</sub>

- **[jev-agent-browser](https://github.com/forvela/jev-agent-browser)** — Fast, bounded browser agents powered by Jev and agent-browser — typed actions, research, classification, and safe orchestration.
  <sub>`Project` · ★6 · forvela · `JS`</sub>

- **[jev-tool-router](https://github.com/jackbarunz/jev-tool-router)** — Jev-powered MCP tool routing for Codex
  <sub>`Plugin` · ★6 · jackbarunz · `JS`</sub>

- **[bicameral](https://github.com/AbdelStark/bicameral)** — Hybrid coding harness: System 2 writes, System 1 (Jev) runs reflexes.
  <sub>`Project` · ★5 · abdelstark · `TS`</sub>

- **[deepseek-harness-jev-pre-compaction](https://github.com/wjw66/deepseek-harness-jev-pre-compaction)** — A pre-compaction advisor for DeepSeek Harness. Runs before the standard `compaction-basic` backend, using TypeSafe JEV to safely prune low-value tool results from model context. Original session events stay in the append-only log; only the model-visible view is replaced with compact markers or
  <sub>`Project` · ★5 · wjw66 · `TS`</sub>

- **[jev-lab](https://github.com/jammaru/jev-lab)** — 100 AI NPCs live in a tiny town. Jev chooses the next action; the world writes the story.
  <sub>`Project` · ★5 · jammaru · `TS`</sub>

- **[jev-usecases](https://github.com/kenhuangus/jev-usecases)** — Production TypeSafe Jev (System One) use-case harnesses with confidence-gated decision logic
  <sub>`Project` · ★5 · kenhuangus · `Py`</sub>

- **[jevonly](https://github.com/buluoray/JevOnly)** — Pure Jev that can "type" and drive towards task completion.
  <sub>`Project` · ★5 · buluoray · `Py`</sub>

- **[agi-jev-containment](https://github.com/carlosedm10/agi-jev-containment)** — AGI JEV Detection — local AI agent monitor: chain-level malicious-agent detection (TypeSafe Jev + Sentinel), escalate-only L1–L5 containment, Neo4j forensics, AngryRobot dashboard. HackSpain 2026.
  <sub>`Project` · ★4 · carlosedm10 · `Py` · ⚠ `no licence`</sub>

- **[ego-jev](https://github.com/jiangkoumo/ego-jev)** — Drive the ego lite browser with Jev (TypeSafe System One): one indexed element table in, one operation + target out, single process. ~2x faster than a per-step LLM loop in our measurements.
  <sub>`Project` · ★4 · jiangkoumo · `JS`</sub>

- **[jev-model-tokengate](https://github.com/Thanh-Mathieu95/jev-model-tokengate)** — An OpenAI-compatible proxy that sits between your LLM and your users. It evaluates each sliding window of tokens while the response is still streaming and cuts the stream before a violating token can reach the screen.
  <sub>`Project` · ★4 · thanh-mathieu95 · `JS`</sub>

- **[jev-robotics-demo](https://github.com/FazalAAli/jev-robotics-demo)** — Jev (TypeSafe System One) vs Claude Opus 5 driving a simulated robot arm in MuJoCo
  <sub>`Project` · ★4 · fazalaali · `Py`</sub>

- **[otto](https://github.com/NobleSpartan6/otto)** — Open-source native computer use for macOS and Windows: TypeSafe Jev, local OCR, and selective planning.
  <sub>`Project` · ★4 · noblespartan6 · `TS`</sub>

- **[slidepilot](https://github.com/harshil1712/slidepilot)** — Voice-driven semantic auto-advance for Slidev, powered by Cloudflare Agents and TypeSafe AI Jev
  <sub>`Project` · ★4 · harshil1712 · `TS`</sub>

- **[typesafe-jev](https://github.com/gtaras7/typesafe-jev)** — Screen a folder of CVs with the TypeSafe Jev decision model: typed judgments, an editable policy, free re-scoring.
  <sub>`Project` · ★4 · gtaras7 · `TS`</sub>

- **[agent-fastpath](https://github.com/abhishekswe/agent-fastpath)** — Jev MCP server: a decision layer for coding agents, built on TypeSafe Jev (System One model). Ship gates, risk checks, file triage that keeps files out of context, and a safe headless browser, with calibrated confidence. For Claude Code, Codex, Cursor.
  <sub>`Plugin` · ★3 · abhishekswe · `TS`</sub>

- **[computer-use-jev](https://github.com/paulsmith/computer-use-jev)** — macOS computer use driven by Jev (TypeSafe System One) as the decision maker
  <sub>`Project` · ★3 · paulsmith · `Go`</sub>

- **[dsh-jev-prune](https://github.com/yangyu666/dsh-jev-prune)** — Jev-judged context compaction for DeepSeek Harness: semantic tool-result pruning + deterministic receipt compaction
  <sub>`Project` · ★3 · yangyu666 · `JS`</sub>

- **[fast-compaction-dsh](https://github.com/kolawong/fast-compaction-dsh)** — Verdict-based context compaction for DeepSeek Harness — replaces lossy LLM summaries with fast keep/truncate/drop decisions from jev-latest; everything kept stays verbatim. Port of tamaratran/fast-jev-compaction.
  <sub>`Project` · ★3 · kolawong · `TS` · ⚠ `no licence`</sub>

- **[gg-friggin-ez](https://github.com/ItisShikhar/gg-friggin-ez)** — Fast, drop-in multilingual profanity and toxicity screener for Node.js, powered by System 1 models like TypeSafe AI Jev and Laya. Catches leetspeak, character spacing, and romanized profanity across languages including Kannada, Telugu, Tamil, Hindi, and Bengali. ~50-500ms latency.
  <sub>`Project` · ★3 · itisshikhar · `TS`</sub>

- **[jev-behavior-study](https://github.com/RINNECODER/jev-behavior-study)** — Independent Jev 1.13.0 behavior study: report, controlled prompt experiments, raw results, and offline verification.
  <sub>`Project` · ★3 · rinnecoder · `Py`</sub>

- **[jev-builder](https://github.com/collapseindex/jev-builder)** — A browser form for building requests to TypeSafe's Jev: pick a template, fill in the blanks, copy the request. No JSON, no install, runs locally.
  <sub>`Project` · ★3 · collapseindex · `JS` · ⚠ `no licence`</sub>

- **[jev-mobile](https://github.com/Friedjof/jev-mobile)** — Fast structured Android control loops with TypeSafe Jev and Mobile MCP
  <sub>`Plugin` · ★3 · friedjof · `Py`</sub>

- **[jev-voice-control](https://github.com/chris-wozniczek/jev-voice-control)** — Control your Mac by voice. Speech → Jev (TypeSafe AI System One model) typed decisions → macOS actions. Menu-bar Swift app.
  <sub>`Project` · ★3 · chris-wozniczek · `Swift`</sub>

- **[jevdroid](https://github.com/antiyro/jevdroid)** — A typed Python framework for controlling Android over ADB with Jev.
  <sub>`Project` · ★3 · antiyro · `Py`</sub>

- **[laya-browser-agent](https://github.com/ChenneyZhuang/laya-browser-agent)** — Local, open-source Jev alternative: browser agent decisions with Laya (System One model) on your own machine. No cloud, no API key. Playwright/CDP, MCP-friendly.
  <sub>`Jev-like alternative` · ★3 · chenneyzhuang · `Py` · ⚠ `not Jev`</sub>

- **[open-jev-approvals](https://github.com/alexj11324/open-jev-approvals)** — Binary approval gate for Codex and Claude Code — every intercepted tool call is reviewed by TypeSafe JEV and composed through a versioned local policy, with scoped authorization.
  <sub>`Jev-like alternative` · ★3 · alexj11324 · `Go` · ⚠ `not Jev`</sub>

- **[agent-chaperone](https://github.com/agent-chaperone/agent-chaperone)** — Screens an AI agent's tool calls before they run and tool results before the agent reads them. An MCP proxy plus a hooks adapter for a client's built-in tools.
  <sub>`Plugin` · ★2 · agent-chaperone · `TS`</sub>

- **[ego-jev-ultrafast](https://github.com/shikaizhong-design/ego-jev-ultrafast)** — Jev drives your Ego Lite browser: one typed-choice request per step. Single-file, zero-dependency port of browser-use/jev-ultrafast with multi-model benchmarks and extra guardrails. Unofficial.
  <sub>`Benchmark` · ★2 · shikaizhong-design · `JS` · ⚠ `no licence`</sub>

- **[jev-browser-control](https://github.com/nexibeo/jev-browser-control)** — Let Claude code, chatgpt codex or control your own Chrome. Chrome extension + MCP server: Jev, TypeSafe's decision model, picks each click in ~0.5 s for a fraction of a cent. MIT, bring your own OpenRouter key.
  <sub>`Plugin` · ★2 · nexibeo · `JS` · ⚠ `no licence`</sub>

- **[jev-browser-pilot](https://github.com/aidil2105/jev-browser-pilot)** — A bounded decision layer for browser and desktop automation: a decision-only model picks one next step; the code owns perception, content, actuation and verification.
  <sub>`Project` · ★2 · aidil2105 · `Py`</sub>

- **[jev-codex-pilot](https://github.com/Charlyhno-eng/jev-codex-pilot)** — Smart Codex overlay with JEV model routing, context optimization & Kanban automation. Reduce tokens, keep control
  <sub>`Plugin` · ★2 · charlyhno-eng · `TS`</sub>

- **[jev-for-engineers](https://github.com/Foadsf/jev-for-engineers)** — Eight minimal working examples of TypeSafe's Jev (a System One model) applied to mechanical and electrical engineering: CAD/CAE/CAM routing, FEM result triage, DFM screening, BOM alignment, hallucination-proof extraction. Zero dependencies.
  <sub>`Project` · ★2 · foadsf · `Py`</sub>

- **[jev-frontend-qa](https://github.com/Nainish-Rai/jev-frontend-qa)** — Evidence-driven frontend QA built on Jev Ultrafast and Browser Harness, with a synthetic todo demo.
  <sub>`Project` · ★2 · nainish-rai · `Py` · ⚠ `no licence`</sub>

- **[jev-git](https://github.com/AkashPriyadarshii/jev-git)** — Sub-second Git pre-commit & pre-push semantic reflex gate powered by TypeSafe AI Jev
  <sub>`Plugin` · ★2 · akashpriyadarshii · `Rs`</sub>

- **[jev-layer](https://github.com/typakon4/jev-layer)** — Portable System-1 decision layer for agent harnesses with host-owned routing, receipts, replay, and fail-open integrations.
  <sub>`Integration` · ★2 · typakon4 · `JS`</sub>

- **[jev-play-ping-pong](https://github.com/Icohen007/jev-play-ping-pong)** — Jev plays browser table tennis in real time: structured telemetry, typed decisions, ordinary Chrome inputs, and auditable evidence.
  <sub>`Benchmark` · ★2 · icohen007 · `JS`</sub>

- **[jev-ra](https://github.com/brnyxx/jev-ra)** — Browser use for coding agents, 3-5x faster than browser-use. MCP server + CLI; TypeSafe Jev decides every step in ~300 ms.
  <sub>`Plugin` · ★2 · brnyxx · `Py`</sub>

- **[jev-starter](https://github.com/hamakyo/jev-starter)** — Typed, policy-driven decision workflows on top of TypeSafe AI Jev: confidence routing, fallbacks, evaluation, and RAG patterns for TypeScript apps.
  <sub>`Plugin` · ★2 · hamakyo · `TS`</sub>

- **[jev-turbo](https://github.com/sightmap/jev-turbo)** — Jev-powered semantic browser use
  <sub>`Project` · ★2 · sightmap · `Go`</sub>

- **[jevarena](https://github.com/raihankhan-rk/jevarena)** — JevArena — two Jev agents duel in click-only browser games (Browser Use + TypeSafe Jev)
  <sub>`Project` · ★2 · raihankhan-rk · `TS`</sub>

- **[jevshield](https://github.com/lgy1027/jevshield)** — Sub-100ms security gate for AI agent tool calls, powered by TypeSafe's Jev (System-1) decision model. Single-request Choice/Noul/Score evaluation, dual-factor blocking matrix, calibrated-confidence routing, fail-closed parsing, zero-config local fallback. LangChain-ready.
  <sub>`Project` · ★2 · lgy1027 · `Py`</sub>

- **[pi-typesafe-jev](https://github.com/legacybridge-tech/pi-typesafe-jev)** — A pi extension that exposes TypeSafe (Jev, System One) judgments as five pi tools, so a model can make narrow semantic judgments while your code and your users keep control of thresholds, weights, and actions.
  <sub>`Plugin` · ★2 · legacybridge-tech · `TS` · ⚠ `no licence`</sub>

- **[robo-harness](https://github.com/grmkris/robo-harness)** — SO-101 robot-arm agent workbench: Bun/Effect coordinator, React workbench, Python LeRobot motor owner
  <sub>`Project` · ★2 · grmkris · `TS` · ⚠ `no licence`</sub>

- **[tsai-civ2](https://github.com/phyous/tsai-civ2)** — TypeSafe Jev plays original Civilization II in a browser, with live action probabilities. Experimental full-game harness.
  <sub>`Project` · ★2 · phyous · `Py` · ⚠ `no licence`</sub>

- **[typesafe-ai-firewall](https://github.com/AnshChoudhary/typesafe-ai-firewall)** — Shadow-mode validation harness for a pre-execution firewall on AI agent tool calls (TypeSafe/Jev). Real run, findings in report.md.
  <sub>`Project` · ★2 · anshchoudhary · `Py` · ⚠ `no licence`</sub>

- **[zerosweep](https://github.com/sysadarsh/zerosweep)** — Autonomous System-One Triage Engine & Benchmark powered by TypeSafe AI (Jev). 75ms inference, $0 output tokens, and RLCD epistemic safety gates.
  <sub>`Benchmark` · ★2 · sysadarsh · `TS` · ⚠ `no licence`</sub>

- **[datajev](https://github.com/zzz1YAO/DataJev)** — ⚡ DataJev LLM → Analyze Jev → Continue / Switch / Verify / Stop System-1 control for System-2 data agents
  <sub>`Project` · ★1 · zzz1yao · `Py`</sub>

- **[dsh-jev-verify](https://github.com/xienda/dsh-jev-verify)** — Jev (TypeSafe System One) decision tools + live verification benchmark for DeepSeek Harness: jev_decision (choice/score/noul) and jev_verify, honest by design.
  <sub>`Benchmark` · ★1 · xienda · `JS`</sub>

- **[jev-browser-skill](https://github.com/zurfyx/jev-browser-skill)** — Let Jev, TypeSafe's ~100ms decision model, drive your browser. A plug-and-play skill for Claude Code and Codex.
  <sub>`Plugin` · ★1 · zurfyx · `JS`</sub>

- **[jev-compaction](https://github.com/picaye/jev-compaction)** — Context compaction for Hermes sessions that never summarises: every tool call is scored by TypeSafe's Jev model, stale calls are dropped, everything kept stays verbatim.
  <sub>`Project` · ★1 · picaye · `JS`</sub>

- **[jev-engineering](https://github.com/eugeniughelbur/jev-engineering)** — The decision layer for AI agents. Typed, calibrated decisions in ~400ms for two hundredths of a cent: gate tool calls, route models, rank options. With the 300-call injection test that found what breaks.
  <sub>`Project` · ★1 · eugeniughelbur · `Py`</sub>

- **[jev-physical-ai](https://github.com/robokrunch/jev-physical-ai)** — Putting TypeSafe's Jev to work on robots, fleets, and edge hardware — real measured numbers, honestly caveated.
  <sub>`Project` · ★1 · robokrunch · `Py`</sub>

- **[jev-routing](https://github.com/nekowasabi/jev-routing)** — Go Jev harness for Claude Code, Codex, and Grok Build. No npx. Not an MCP server.
  <sub>`Plugin` · ★1 · nekowasabi · `Go`</sub>

- **[jevaluate](https://github.com/ElshinQ/jevaluate)** — Jevaluate: evaluate before you trust. Field notes, runnable scripts and an agent skill for TypeSafe Jev: gated evals, a browser loop, a product walk with DeepSeek vision, a UI text judge and a first-click tree test. Co-authored with Claude Fable 5.1.
  <sub>`Plugin` · ★1 · elshinq · `JS`</sub>

- **[stepwarden](https://github.com/getexcited/stepwarden)** — Every tool call your agent makes, checked before it runs. A Claude Code plugin that uses TypeSafe AI's Jev to verify each pending tool call against the session plan, then allows it, asks you, or blocks it. Proof of concept
  <sub>`Plugin` · ★1 · getexcited · `TS`</sub>

- **[typesafe-jev-drone-demo](https://github.com/kxzk/typesafe-jev-drone-demo)** — Three.js drone simulator with a Python backend and live TypeSafe Jev navigation
  <sub>`Project` · ★1 · kxzk · `Py` · ⚠ `no licence`</sub>

- **[browser-use-olympics](https://github.com/eriestra/browser-use-olympics)** — Browser Use Olympics by Almond: one prompt, five events, one clock. Plus fast loop, a ~200-line browser computer-use agent (Chrome DevTools + TypeSafe Jev).
  <sub>`Project` · ★0 · eriestra · `TS`</sub>

- **[casse-brique-typesafe](https://github.com/Para-FR/casse-brique-typesafe)** — A Next.js brick breaker whose paddle is controlled in real time by TypeSafe AI's Jev model. Built with Claude Code.
  <sub>`Plugin` · ★0 · para-fr · `TS` · ⚠ `no licence`</sub>

- **[Example: speculative fan-out](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/03-fan-out/main.py)** — Asks for an operation plus a target for each operation it might have picked, so a browser step never needs a second round trip.
  <sub>`Snippet` · `Py` · `choice` · `noul` · ⚠ `code untested`</sub>

- **[Example: tool selection with a none option](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/04-tool-selection/main.py)** — Pairs a choice over tools with a separate noul on whether a tool is needed at all, because those are different questions.
  <sub>`Snippet` · `Py` · `choice` · `noul` · ⚠ `code untested`</sub>

- **[harnessjudge](https://github.com/ndolinschi/harnessjudge)** — Judge agent steps — ok / retry / escalate / stop via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[jev-agent-skill](https://github.com/yuyang2230/jev-agent-skill)** — Free typed judgments for AI agents: offload classify/screen/score/verify to Jev (TypeSafe System One) via OpenCode Zen. Claude Code / ZCode skill. 给AI代理省token的免费决策分流技能
  <sub>`Plugin` · ★0 · yuyang2230 · `Py`</sub>

- **[jev-certify](https://github.com/nikkoxgonzales/jev-certify)** — Finite-sample guarantees for Jev (TypeSafe's System One). Conformal risk control turns calibrated probabilities into certified routing thresholds; prediction-powered inference audits them. 2,412 decisions on CLINC150 for $0.23 — including the shift and prevalence cases where the guarantee break
  <sub>`Benchmark` · ★0 · nikkoxgonzales · `Py`</sub>

- **[jev-llm-router-benchmark](https://github.com/erendikmenn/jev-llm-router-benchmark)** — Benchmark-driven Jev router and judge for cost-aware, reliable LLM coding workflows
  <sub>`Benchmark` · ★0 · erendikmenn · `Py`</sub>

- **[ps2-ai-agent](https://github.com/opaielsheikh/ps2-ai-agent)** — Autonomous PlayStation 2 AI Agent with real-time visual telemetry HUD powered by TypeSafe Jev System One
  <sub>`Project` · ★0 · opaielsheikh · `Py` · ⚠ `no licence`</sub>

- **[s1s](https://github.com/cpaczek/s1s)** — System One Search: navigate and trace code with TypeSafe judgments and repository evidence
  <sub>`Project` · ★0 · cpaczek · `TS`</sub>

- **[snake-jev](https://github.com/siroccomask/snake-jev)** — Snake controlled by parallel Jev assessments, with one API call per game tick.
  <sub>`Project` · ★0 · siroccomask · `Py`</sub>

- **[swarmrouter](https://github.com/ndolinschi/swarmrouter)** — Route tasks to research/code/browser/support/writer agents via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[terrarium](https://github.com/TheGali/terrarium)** — A sandbox where a TypeSafe System One model presses the controls of a small creature. Code runs the world.
  <sub>`Project` · ★0 · thegali · `JS`</sub>

- **[Jev (Fully Tested) + Browser Use: FASTEST AI Agent I'VE TRIED YET!](https://www.youtube.com/watch?v=SNJ3yuJ_QwY)** — Wires Jev into Browser Use to drive a browser automation agent.
  <sub>`Video` · AICodeKing · ⚠ `unverified`</sub>

</details>

### Intent routing

_Classify what the user wants and send the request down the right branch._

- **[Demo: Smart home assistant](https://docs.typesafe.ai/demos/smart-home)** ⭐ — Runnable demo code for a smart home assistant that evaluates user requests with typed decisions.
  <sub>`Official docs` · `Py`</sub>

- **[Pattern: Confidence-gated routing](https://docs.typesafe.ai/patterns/confidence-routing)** ⭐ — Treat confidence as a second axis: the answer tells you what, the confidence tells you whether to act on it.
  <sub>`Official docs` · `Py`</sub>

- **[Pattern: Intent routing](https://docs.typesafe.ai/patterns/intent-routing)** ⭐ — Classify an incoming request and route it to the cheapest adequate handler: deterministic code, a specialist LLM, or a person.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[AutoGPT TypeSafe blocks](https://github.com/Significant-Gravitas/AutoGPT/tree/master/autogpt_platform/backend/backend/blocks/typesafe)** — Seven production blocks — choice, score, yes/no, ask-many, route, pick-best, filter — with a UTF-8 byte budget, verbatim wire capture and eleven test files.
  <sub>`Project` · ★187,482 · `Py` · `choice` · `score` · `noul`</sub>

- **[Airflow LLMBranchOperator with Jev](https://airflow.apache.org/docs/apache-airflow-providers-common-ai/stable/index.html)** — Turns downstream task ids into a choice option set, with a minimum-confidence gate that routes uncertain runs to a human.
  <sub>`Integration` · ★46,934 · `Py` · `choice`</sub>

- **[Inbox Zero: seven email decisions](https://github.com/elie222/inbox-zero)** — Seven distinct email decisions, each with its own separately chosen threshold, falling back to the normal LLM on any error.
  <sub>`Project` · ★12,278 · `TS` · `choice` · `noul`</sub>

- **[Real Python: hello-jev](https://github.com/realpython/materials/tree/master/hello-jev)** — A teaching example with a deliberate control group: the same station-enquiry task written in plain Python that only accepts Y/N, next to a Noul that reads intent.
  <sub>`Tutorial` · ★5,205 · Real Python · `Py` · `noul`</sub>

- **[ai-cookbook: Jev track](https://github.com/daveebbelaar/ai-cookbook)** — A graded course from a first call through each primitive, state shapes and criteria, to ticket triage and a multi-step workflow, mirroring all four official patterns.
  <sub>`Tutorial` · ★4,559 · `Py` · `choice` · `score` · `noul`</sub>

- **[jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis)** — An Android reply co-pilot that judges intent, timing and risk from on-screen text, while separate models handle OCR and drafting.
  <sub>`Project` · ★1,950 · `Java` · `choice` · `score` · `noul`</sub>

- **[foreman](https://github.com/thruwire/foreman)** — A software-factory foreman that uses Jev to decide what an agent pipeline should do next.
  <sub>`Project` · ★482 · thruwire · `Py`</sub>

- **[jev-search](https://github.com/superagents-lab/jev-search)** — Jev-driven web search: chooses the recency window and the best query rewrite, then reranks results in batches with one noul each.
  <sub>`Project` · ★390 · `TS` · `choice` · `noul`</sub>

- **[jev-voice-browser](https://github.com/moritzkremb/jev-voice-browser)** — Voice-driven browser control where target criteria are rebuilt per request from the live element list, always including a none option.
  <sub>`Project` · ★222 · `JS` · `choice` · `score` · `noul`</sub>

- **[hyperedit](https://github.com/kevinbadi/hyperedit)** — An AI video editor routing an editing instruction to an operation, a target clip and a track, with a keyword router as fallback.
  <sub>`Project` · ★179 · `TS` · `choice` · `noul` · ⚠ `no licence`</sub>

- **[taskuary](https://github.com/ldbumble/taskuary)** — Automate your job: local-first AI task hub. Email, Teams, Slack & reports -> one timeline -> AI triage -> your coding agents (Claude Code, Codex, Gemini) do the work, you approve.
  <sub>`Plugin` · ★117 · ldbumble · `Py`</sub>

- **[jev-chat: a tool-calling chatbot with no LLM](https://github.com/w3cj/jev-chat)** — A chat bot that does tool calling with no language model anywhere: one request asks the request kind, the tool, and every tool's arguments at once.
  <sub>`Project` · ★86 · `TS` · `choice` · `noul`</sub>

- **[jev-social](https://github.com/socai-io/jev-social)** — Social-platform research with typed routing and browser evidence.
  <sub>`Project` · ★46 · socai-io · `JS`</sub>

- **[ha-jev](https://github.com/AboveColin/HA-Jev)** — A Home Assistant integration: typed answers as sensors, with actions for automations.
  <sub>`Integration` · ★45 · abovecolin · `Py`</sub>

- **[hono-jev-router](https://github.com/yusukebe/hono-jev-router)** — Routes HTTP requests by meaning — a semantic router for a web framework.
  <sub>`Project` · ★45 · yusukebe · `TS`</sub>

- **[jev-mail-classifier](https://github.com/parth-kp/jev-mail-classifier)** — Classify your inbox with Jev (TypeSafe's System One model) — tag, move, flag, and notify, all config-driven.
  <sub>`Project` · ★14 · parth-kp · `Py`</sub>

- **[jevyoumean](https://github.com/syumai/jevyoumean)** — Semantic "Did you mean?" for any CLI — wraps commands and uses TypeSafe's Jev to match subcommand typos by intent, not edit distance.
  <sub>`Project` · ★12 · syumai · `Go`</sub>

- **[jev-phishing-bench](https://github.com/anisselbd/jev-phishing-bench)** — Jev (TypeSafe) vs Claude Haiku 4.5 on 2 000 phishing emails: accuracy, calibration, latency, cost. Reproducible benchmark.
  <sub>`Benchmark` · ★3 · anisselbd · `Py` · ⚠ `no licence`</sub>

- **[A deep dive into Jev, TypeSafe's System One model](https://flaviocopes.com/jev/)** — The densest independent explainer: code in JS, Python and the AI SDK, all three answer shapes, the advanced patterns, and an honest list of where the model fails.
  <sub>`Tutorial` · Flavio Copes · `JS` · `Py` · `TS` · `choice` · `score` · `noul`</sub>

- **[Example: confidence-gated escalation](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/02-confidence-gate/main.py)** — Routing with an act-or-escalate gate, where the policy function is deliberately left unimplemented because the thresholds are yours to choose.
  <sub>`Snippet` · `Py` · `choice` · ⚠ `code untested`</sub>

- **[Jev AI Use Cases](https://medium.com/data-science-in-your-pocket/jev-ai-use-cases-9a87d57ac3b4)** — Walks through use case after use case — agent routing, an in-agent decision layer, ticket triage — each with a concrete option set and a sample response.
  <sub>`Tutorial` · Mehul Gupta · `Py` · `choice` · ⚠ `paywall`</sub>

- **[Jev on Netlify AI Gateway](https://www.netlify.com/changelog/typesafe-jev-ai-gateway/)** — Zero-config access from a Netlify function: use the official SDK with no API key, base URL or provider setup, billed through Netlify credits.
  <sub>`Integration` · `TS` · `choice`</sub>

- **[lanebreak](https://github.com/ndolinschi/lanebreak)** — LaneBreak — support ticket priority+routing via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[langchain-typesafe](https://docs.langchain.com/oss/python/integrations/providers/typesafe)** — The LangChain integration: a classifier plus experimental middleware for model routing and for gating risky tool calls before they run.
  <sub>`Integration` · `Py` · `choice` · `score` · `noul` · ⚠ `early access`</sub>

- **[Using TypeSafe Jev with the AI SDK](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk)** — The richest Vercel walkthrough: single and multi-question calls, probability-threshold routing, and unit tests with a mock evaluation model.
  <sub>`Tutorial` · `TS` · `noul` · `choice` · `score`</sub>

- **[jevai.org community showcase cases](https://www.jevai.org/cases)** — Nine worked community scenarios: intent routing, invoice classification, news filtering, product tagging, moderation, claim verification, CSV validation and more.
  <sub>`Project` · ⚠ `unverified`</sub>

### Context compaction

_Decide which tool calls and results still matter so stale context can be dropped._

- **[Hermes Agent: Jev compaction evaluation](https://github.com/NousResearch/hermes-agent)** — Ported the Jev compaction approach, measured it against their shipping summariser, and published the conclusion not to adopt it.
  <sub>`Benchmark` · ★247,881 · `Py` · `noul`</sub>

- **[jcode: memory recall without embeddings](https://github.com/1jehuang/jcode)** — Replaces the whole retrieval stack for memory recall — no embeddings, no BM25, no reranker — with one batched Noul per candidate memory.
  <sub>`Project` · ★19,996 · `Rs` · `noul`</sub>

- **[fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction)** — A Claude Code plugin that replaces the compaction summary with per-item decisions: stale tool calls are dropped or truncated, everything kept stays verbatim.
  <sub>`Plugin` · ★6,090 · tamaratran · `TS` · `noul`</sub>

- **[hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills)** — Nine agent skills plus a CLI covering model routing, memory filtering, turn retention, one-of-many skill selection and next-action choice.
  <sub>`Plugin` · ★408 · `Py` · `choice` · `score` · `noul`</sub>

- **[compact-adviser](https://github.com/kunchenguid/compact-adviser)** — "Work appears completed or recorded. Run /compact to save tokens."
  <sub>`Project` · ★174 · kunchenguid · `TS`</sub>

- **[jev-pruner](https://github.com/tamaratran/jev-pruner)** — Trims long shell output before the model sees it, asking one Noul per chunk.
  <sub>`Plugin` · ★137 · tamaratran · `TS` · `noul`</sub>

- **[Winnow](https://github.com/GhalebDweikat/winnow)** — Context garbage collection for Claude Code: when Read, Bash or Grep dump a wall of output, each chunk is judged for relevance to the current task.
  <sub>`Plugin` · ★59 · `Py` · `noul`</sub>

- **[yoshi](https://github.com/compozy/yoshi)** — Context-pruning proxy for Claude Code and Codex: Jev judges which history is still needed, measured not claimed. POC here now, heading soon into https://github.com/compozy/compozy
  <sub>`Plugin` · ★22 · compozy · `TS`</sub>

- **[omp-jev-compaction](https://github.com/jerryfane/omp-jev-compaction)** — Verbatim Jev-scored context reduction for omp, over TypeSafe or OpenRouter
  <sub>`Project` · ★8 · jerryfane · `TS`</sub>

- **[pi-jev-context](https://github.com/Nyarlathoteppppp/pi-jev-context)** — Model performance first. Token savings second. A Pi extension with freshness-aware read dedupe, Jev log filtering, and searchable verbatim recall. Keeps existing message history intact.
  <sub>`Plugin` · ★6 · nyarlathoteppppp · `TS`</sub>

- **[claude-jev](https://github.com/0x7067/claude-jev)** — Claude Code plugin: Jev for rule checks, verbatim compaction, and prompt routing
  <sub>`Plugin` · ★5 · 0x7067 · `Py`</sub>

- **[deepseek-harness-jev-pre-compaction](https://github.com/wjw66/deepseek-harness-jev-pre-compaction)** — A pre-compaction advisor for DeepSeek Harness. Runs before the standard `compaction-basic` backend, using TypeSafe JEV to safely prune low-value tool results from model context. Original session events stay in the append-only log; only the model-visible view is replaced with compact markers or
  <sub>`Project` · ★5 · wjw66 · `TS`</sub>

- **[dsh-jev-prune](https://github.com/yangyu666/dsh-jev-prune)** — Jev-judged context compaction for DeepSeek Harness: semantic tool-result pruning + deterministic receipt compaction
  <sub>`Project` · ★3 · yangyu666 · `JS`</sub>

- **[fast-compaction-dsh](https://github.com/kolawong/fast-compaction-dsh)** — Verdict-based context compaction for DeepSeek Harness — replaces lossy LLM summaries with fast keep/truncate/drop decisions from jev-latest; everything kept stays verbatim. Port of tamaratran/fast-jev-compaction.
  <sub>`Project` · ★3 · kolawong · `TS` · ⚠ `no licence`</sub>

- **[jselect](https://github.com/keltokhy/jselect)** — Useful evidence for your AI, within a token budget. A fast, source-linked context selector for files, records, and agents.
  <sub>`Project` · ★3 · keltokhy · `Py`</sub>

- **[jev-docs](https://github.com/chenrui333/jev-docs)** — Community-maintained history of Jev / TypeSafe System One APIs, SDKs, agent guidance, and engineering best practices.
  <sub>`SDK` · ★2 · chenrui333 · `Py`</sub>

- **[pi-fast-jev-compaction](https://github.com/KamilPostrozny/pi-fast-jev-compaction)** — Fast JEV compaction extension for pi
  <sub>`Plugin` · ★2 · kamilpostrozny · `TS`</sub>

- **[Jev by Example](https://github.com/ReallyArtificial/jev-by-example)** — Ten runnable JavaScript agent decisions, one file each: reconciling a new memory against a stored one, gating whether an HTTP 200 really satisfied the task, retry vs. reconcile after an uncertain write, scoring context against a budget, checking a handoff for dropped prohibitions.
  <sub>`Project` · ★1 · Really Artificial · `JS` · `choice` · `score` · `noul` · ⚠ `one commit` `AI-written`</sub>

- **[jev-compaction](https://github.com/picaye/jev-compaction)** — Context compaction for Hermes sessions that never summarises: every tool call is scored by TypeSafe's Jev model, stale calls are dropped, everything kept stays verbatim.
  <sub>`Project` · ★1 · picaye · `JS`</sub>

- **[smoking-extraction-benchmark](https://github.com/vclic/smoking-extraction-benchmark)** — Synthetic smoking-history extraction benchmark comparing TypeSafe Jev and OpenAI structured outputs, with reproducible accuracy, cost, and latency results.
  <sub>`Benchmark` · ★0 · vclic · `Py` · ⚠ `no licence`</sub>

### Safety gating

_Decide whether an action is safe to run. Defence in depth, never a security boundary._

<details>
<summary><b>105</b> rows — click to expand</summary>

- **[Cookbook: Classifying RAG passages](https://docs.typesafe.ai/cookbooks/classifying_rag_passages)** ⭐ — Scores each retrieved passage, then decides in code which reach the answering model — keeping contradictory ones flagged and dropping ones carrying prompt injection.
  <sub>`Official docs` · `Py`</sub>

- **[Cookbook: Guardrails for LLMs](https://docs.typesafe.ai/cookbooks/llm_guardrails)** ⭐ — Screens every message in and out of an LLM app in one request, naming hazards and scoring how much harm complying would do.
  <sub>`Official docs` · `Py` · `noul` · `score`</sub>

- **[sub2api: Jev as a moderation endpoint](https://github.com/Wei-Shaw/sub2api)** — Drops in as a moderation API by asking many parallel Noul questions in one request, one per hazard category, with an anti-injection prefix on every instruction.
  <sub>`Project` · ★42,345 · `Go` · `noul`</sub>

- **[claude-code-templates: three Jev plugins](https://github.com/davila7/claude-code-templates)** — Three independently installable Claude Code plugins — guardrails, model router and skill suggestion — each with its own hooks and tests.
  <sub>`Plugin` · ★30,899 · `Py` · `TS` · `choice` · `score` · `noul`</sub>

- **[@langchain/typesafe](https://github.com/langchain-ai/langchainjs)** — The JavaScript counterpart of the LangChain integration, with the same classifier and middleware shapes.
  <sub>`Integration` · ★18,214 · `TS` · `choice` · `score` · `noul`</sub>

- **[DeepChat: agent tool-permission review](https://github.com/ThinkInAIXYZ/deepchat)** — Reviews each tool call on three axes — risk level, whether the user authorised it, and an explicit prompt-injection pressure check.
  <sub>`Project` · ★6,338 · `TS` · `choice` · `noul`</sub>

- **[agentgateway: CI-validated LLM guardrail](https://github.com/agentgateway/agentgateway)** — Three Score questions on a shared severity scale, blocking the request when two or more cross the line, and failing closed.
  <sub>`Project` · ★4,971 · `Rs` · `score`</sub>

- **[atomic](https://github.com/bastani-inc/atomic)** — The verifiable coding agent runtime. Define your coding agent's process in natural language with stages, checks, and approval gates instead of hoping it follows your instructions.
  <sub>`Project` · ★813 · bastani-inc · `TS` · ⚠ `no licence`</sub>

- **[Jev-cu](https://github.com/Sac-Y/Jev-cu)** — A computer-use agent that asks which accessibility-tree element to act on, plus a separate noul for whether the action needs explicit user confirmation.
  <sub>`Project` · ★557 · `JS` · `choice` · `noul`</sub>

- **[vexjoy-agent](https://github.com/notque/vexjoy-agent)** — VexJoy AI Agent with Jev Intelligent Routing - /do routes plain-English requests to the right specialist agent and gates the work with reviews, tests, and a learning loop.
  <sub>`Project` · ★423 · notque · `Py`</sub>

- **[wrongstack](https://github.com/WrongStack/WrongStack)** — An AI coding agent that reads your code, edits files, runs commands, and reasons through bugs — across a terminal REPL, a full-screen TUI, and a browser UI, while you keep your hand on every permission.
  <sub>`Project` · ★332 · wrongstack · `TS`</sub>

- **[jev-mcp](https://github.com/jkudish/jev-mcp)** — A ready-made judgement toolbox for agents: fact verification, content screening, semantic ranking, classification and extraction as separate tools.
  <sub>`Plugin` · ★253 · `JS` · `choice` · `score` · `noul`</sub>

- **[quackd](https://github.com/rokbenko/quackd)** — One CLI for all your robots. Connect them, command them, and let them work together, each with an LLM for a brain, Jev for cheaper steps. Microduck, Open Duck Mini, LeRobot, XLeRobot, AlohaMini, ToddlerBot or any ROS base. Claude, OpenAI, Gemini, Grok, or local via Ollama or vLLM. Simulator, .d
  <sub>`Plugin` · ★228 · rokbenko · `Py`</sub>

- **[pi-jev](https://github.com/y0usaf/pi-jev)** — A decision layer for a coding agent: a measured tool-call gate plus a typed ask for calibrated answers.
  <sub>`Plugin` · ★135 · y0usaf · `TS`</sub>

- **[jev-drone](https://github.com/RomanSlack/jev-drone)** — Camera-only simulated drone where Jev makes tactical judgements at a low rate while stabilisation and safety reflexes stay in ordinary fast code.
  <sub>`Project` · ★121 · `Py` · `choice` · `score` · `noul` · ⚠ `unverified`</sub>

- **[jev-gateway](https://github.com/vinilana/jev-gateway)** — An easy way to use jev with your coding agent for tool calling reasoning
  <sub>`Project` · ★121 · vinilana · `TS`</sub>

- **[bluenoise](https://github.com/rokcso/bluenoise)** — Blur or hide noisy replies, posts & ads on X (Twitter), and clean up its interface with local, reversible keyword/account rules — no X API, no data collection, no account changes. 用本地可逆的关键词/账号规则模糊或隐藏 X（推特）上的嘈杂回复、帖子和广告，并整理界面——不调用 X API、不收集数据、不修改账号。
  <sub>`Project` · ★90 · rokcso · `TS`</sub>

- **[youtube-sponsor-detection](https://github.com/trungdq88/youtube-sponsor-detection)** — Detect youtube sponsor segment with live audio and transcript powered by Jev
  <sub>`Project` · ★81 · trungdq88 · `JS` · ⚠ `no licence`</sub>

- **[grok-bot-jev](https://github.com/Bodila51/grok-bot-jev)** — Connect TypeSafe Jev to Grok Bot as a cheap decision layer - usage gates, skill template, examples
  <sub>`Plugin` · ★74 · bodila51 · `Py`</sub>

- **[jevals](https://github.com/openlayer-ai/jevals)** — Agent evals and guardrails as Jev decisions: one request per trace, a fraction of a cent, fast enough for the agent loop. Runs locally with Kev or Laya.
  <sub>`Project` · ★53 · openlayer-ai · `Py`</sub>

- **[Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot)** — A Discord moderation bot: a Choice tiers each message while a Noul carries ban urgency, and an admin pardon is fed back as a safe precedent in later requests.
  <sub>`Project` · ★41 · brainstormity · `Py` · `choice` · `noul`</sub>

- **[is-malicious](https://github.com/luantak/is-malicious)** — A codebase scanner that helps you not run malicous code
  <sub>`Project` · ★22 · luantak · `TS`</sub>

- **[jev-guard](https://github.com/leepokai/jev-guard)** — Auto mode for every coding agent, built on Jev: risk-scores every tool call with session context (deny / ask / allow), flags prompt injection in results, checks skills and plugins. Claude Code, Codex, Copilot, Gemini, Cursor, pi, OpenCode, ACP.
  <sub>`Plugin` · ★21 · leepokai · `JS`</sub>

- **[jev-macos-loop](https://github.com/jcpsimmons/jev-macos-loop)** — Open-source macOS AI computer use and native GUI automation on Apple silicon. Jev + OmniParser CoreML + Apple Vision OCR. Bring your own OpenRouter, Vercel AI Gateway, or TypesafeAI token.
  <sub>`Project` · ★19 · jcpsimmons · `JS`</sub>

- **[jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks)** — Probability-aware evaluation for typed decision models: calibration, selective risk, latency, and reproducible benchmarks.
  <sub>`Benchmark` · ★17 · abdelstark · `Py`</sub>

- **[patdown](https://github.com/tyler-dot-earth/patdown)** — Block, steer, and "fuzzy lint" with Jev to make agents follow your rules and conventions. CLI, github action, pi package, and more. Built with Effect.
  <sub>`Project` · ★14 · tyler-dot-earth · `TS` · ⚠ `no licence`</sub>

- **[hermes-jev](https://github.com/keeltrace/hermes-jev)** — Typed System One decisions, ranking, verification, and an opt-in Hermes tool gate using TypeSafe Jev.
  <sub>`Project` · ★12 · keeltrace · `Py`</sub>

- **[pi-jev-router](https://github.com/mejiasd3v/pi-jev-router)** — Automatic model routing for Pi using TypeSafe's Jev through Vercel AI Gateway
  <sub>`Project` · ★12 · mejiasd3v · `JS`</sub>

- **[flue-jev-demo](https://github.com/matthewp/flue-jev-demo)** — Flue agent routing with TypeSafe Jev through Cloudflare AI Gateway
  <sub>`Project` · ★9 · matthewp · `TS` · ⚠ `no licence`</sub>

- **[jev-harness](https://github.com/AntonioCoppe/jev-harness)** — Decision harness for TypeSafe Jev — confidence gates, shadow mode, recipes, and evals. Claude CLI 48.9s → Jev 1.3s on the same row-filter job.
  <sub>`Project` · ★9 · antoniocoppe · `TS`</sub>

- **[pi-verdict](https://github.com/jesset/pi-verdict)** — A minimal permission gate for Pi in the style of Claude Code's auto mode
  <sub>`Plugin` · ★8 · jesset · `TS`</sub>

- **[heist-one](https://github.com/AbdelStark/heist-one)** — Observable browser stealth game: Jev makes typed guard judgments while deterministic code owns the world.
  <sub>`Project` · ★7 · abdelstark · `TS`</sub>

- **[jev_antispam_bot](https://github.com/backmeupplz/jev_antispam_bot)** — Minimal grammY Telegram anti-spam bot powered by TypeSafe Jev
  <sub>`Project` · ★7 · backmeupplz · `TS`</sub>

- **[augustus](https://github.com/24601/Augustus)** — Agent skill for the decision-model class (classifiers, encoders/decoders, specialized AR heads, System One). TypeSafe Jev is the dominant exemplar. Composition algebra, question design, validation gates. MIT.
  <sub>`Plugin` · ★6 · 24601 · `Py`</sub>

- **[daf-jev](https://github.com/docxology/daf-jev)** — daf-jev: composable Python toolkit for TypeSafe's Jev (System One) decision API — question builders, confidence gates, evaluator, calibration, CLI, MCP server, agent skill
  <sub>`Plugin` · ★5 · docxology · `Py`</sub>

- **[diffjury](https://github.com/raihankhan-rk/diffjury)** — DiffJury — TypeSafe Jev PR risk router + code review coach
  <sub>`Project` · ★5 · raihankhan-rk · `TS` · ⚠ `no licence`</sub>

- **[jev-block-android-ad](https://github.com/ufec/jev-block-android-ad)** — JevNoiseGate filters unwanted notifications and SMS on Android. Rather than matching keywords, an LLM decides what's noise — and only what it explicitly flags is blocked. Verification codes are matched on-device and never uploaded; anything uncertain passes through.
  <sub>`Project` · ★5 · ufec · `Kt`</sub>

- **[jev-usecases](https://github.com/kenhuangus/jev-usecases)** — Production TypeSafe Jev (System One) use-case harnesses with confidence-gated decision logic
  <sub>`Project` · ★5 · kenhuangus · `Py`</sub>

- **[agi-jev-containment](https://github.com/carlosedm10/agi-jev-containment)** — AGI JEV Detection — local AI agent monitor: chain-level malicious-agent detection (TypeSafe Jev + Sentinel), escalate-only L1–L5 containment, Neo4j forensics, AngryRobot dashboard. HackSpain 2026.
  <sub>`Project` · ★4 · carlosedm10 · `Py` · ⚠ `no licence`</sub>

- **[jev-model-tokengate](https://github.com/Thanh-Mathieu95/jev-model-tokengate)** — An OpenAI-compatible proxy that sits between your LLM and your users. It evaluates each sliding window of tokens while the response is still streaming and cuts the stream before a violating token can reach the screen.
  <sub>`Project` · ★4 · thanh-mathieu95 · `JS`</sub>

- **[jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration)** — Independent calibration test of TypeSafe's Jev on a task it cannot have seen: 900 rule-generated support tickets (choice / score / boolean) plus 3 public benchmarks via Vercel AI Gateway. Raw responses, ECE with noise floor, temperature refit, per-type sign of miscalibration. Reproducible for ~
  <sub>`Benchmark` · ★4 · scienthoon · `Py`</sub>

- **[jev-tool-permissions](https://github.com/NicolasMontone/jev-tool-permissions)** — Jev-backed tool approval gate and tool-list pruning for the Vercel AI SDK
  <sub>`SDK` · ★4 · nicolasmontone · `TS` · ⚠ `no licence`</sub>

- **[agent-fastpath](https://github.com/abhishekswe/agent-fastpath)** — Jev MCP server: a decision layer for coding agents, built on TypeSafe Jev (System One model). Ship gates, risk checks, file triage that keeps files out of context, and a safe headless browser, with calibrated confidence. For Claude Code, Codex, Cursor.
  <sub>`Plugin` · ★3 · abhishekswe · `TS`</sub>

- **[jev-dspy-lab](https://github.com/jmanhype/jev-dspy-lab)** — Reproducible calibration and selective-risk benchmarks for Jev/TypeSafe decisions in DSPy workflows
  <sub>`Benchmark` · ★3 · jmanhype · `Py`</sub>

- **[jev-gate](https://github.com/MongLong0214/jev-gate)** — Not every coding task needs your best model. Experimental Jev-powered model routing for Claude Code — V3 prototype runs today, V4 routes at the task boundary.
  <sub>`Plugin` · ★3 · monglong0214 · `TS` · ⚠ `no licence`</sub>

- **[jev-shield](https://github.com/vmendes90/jev-shield)** — Privacy-first Chrome extension that semantically blocks native ads, sponsored feed cards, and video ads using TypeSafe Jev
  <sub>`Plugin` · ★3 · vmendes90 · `TS`</sub>

- **[jev-skill-gate](https://github.com/ShivamPansuriya/jev-skill-gate)** — Cut Claude Code's skill manifest by ~75% with TypeSafe Jev. Scores every installed skill for relevance and hides the rest via skillOverrides — 12,750 → 3,185 tokens on a 217-skill install, for $0.0009 a session.
  <sub>`Plugin` · ★3 · shivampansuriya · `JS`</sub>

- **[jev-web-analyzer](https://github.com/replynodes/jev-web-analyzer)** — See what Jev thinks about your SaaS website — powered by ReplyNodes web context and Vercel AI Gateway.
  <sub>`Project` · ★3 · replynodes · `TS`</sub>

- **[mastra-jev-moderation](https://github.com/CodeAlive-AI/mastra-jev-moderation)** — Input moderation for Mastra agents on TypeSafe Jev — one file
  <sub>`Project` · ★3 · codealive-ai · `TS`</sub>

- **[open-jev-approvals](https://github.com/alexj11324/open-jev-approvals)** — Binary approval gate for Codex and Claude Code — every intercepted tool call is reviewed by TypeSafe JEV and composed through a versioned local policy, with scoped authorization.
  <sub>`Jev-like alternative` · ★3 · alexj11324 · `Go` · ⚠ `not Jev`</sub>

- **[rh-guard](https://github.com/24601/rh-guard)** — Reward-hack radar for coding agents: structural denies + TypeSafe Jev System One sidecar for Claude Code & Cursor hooks
  <sub>`Plugin` · ★3 · 24601 · `TS`</sub>

- **[actiongate-jev](https://github.com/omkarghugarkar007/actiongate-jev)** — Open-source Jev tool-calling authorization gateway for AI agents: deterministic policy, exact-action single-use permits, MCP and HTTP enforcement.
  <sub>`Plugin` · ★2 · omkarghugarkar007 · `TS`</sub>

- **[claude-jev-plugin](https://github.com/dr-dimitru/claude-jev-plugin)** — TypeSafe Jev semantic guardrails for Claude Code
  <sub>`Plugin` · ★2 · dr-dimitru · `TS`</sub>

- **[ego-jev-ultrafast](https://github.com/shikaizhong-design/ego-jev-ultrafast)** — Jev drives your Ego Lite browser: one typed-choice request per step. Single-file, zero-dependency port of browser-use/jev-ultrafast with multi-model benchmarks and extra guardrails. Unofficial.
  <sub>`Benchmark` · ★2 · shikaizhong-design · `JS` · ⚠ `no licence`</sub>

- **[jev-audio-beeper](https://github.com/santos-sanz/jev-audio-beeper)** — Low-latency audio censorship POC using Jev typed decisions and ffmpeg.
  <sub>`Project` · ★2 · santos-sanz · `TS` · ⚠ `no licence`</sub>

- **[jev-decisions](https://github.com/bojansandhaus/jev-decisions)** — Jev Decisions Plugin for Hermes (and other AI Agents): tool risk reviews, human approval recommendations, evidence checks, and a local decision journal.
  <sub>`Plugin` · ★2 · bojansandhaus · `Py`</sub>

- **[jev-git](https://github.com/AkashPriyadarshii/jev-git)** — Sub-second Git pre-commit & pre-push semantic reflex gate powered by TypeSafe AI Jev
  <sub>`Plugin` · ★2 · akashpriyadarshii · `Rs`</sub>

- **[jev-resilience](https://github.com/Vicente-MD/jev-resilience)** — Non-blocking Spring Boot Starter for Spring WebFlux that implements a Semantic Circuit Breaker to detect silent HTTP 200 failures using TypeSafe Jev.
  <sub>`Plugin` · ★2 · vicente-md · `Java` · ⚠ `no licence`</sub>

- **[jev-skillful](https://github.com/bestagentkits/jev-skillful)** — Per-prompt capability router for coding agents: resolves installed skills, MCP servers, agents and commands against your prompt via TypeSafe Jev, and measures whether the injection actually helps.
  <sub>`Plugin` · ★2 · bestagentkits · `TS`</sub>

- **[jevshield](https://github.com/lgy1027/jevshield)** — Sub-100ms security gate for AI agent tool calls, powered by TypeSafe's Jev (System-1) decision model. Single-request Choice/Noul/Score evaluation, dual-factor blocking matrix, calibrated-confidence routing, fail-closed parsing, zero-config local fallback. LangChain-ready.
  <sub>`Project` · ★2 · lgy1027 · `Py`</sub>

- **[toolgate](https://github.com/RiskAverseTech/toolgate)** — Open auto mode for AI agents — a calibrated tool-call firewall powered by TypeSafe Jev. Ships as a Claude Code hook
  <sub>`Plugin` · ★2 · riskaversetech · `TS`</sub>

- **[typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard)** — Automated database migration safety reviewer powered by TypeSafe AI (Jev System One model)
  <sub>`Project` · ★2 · opaielsheikh · `TS` · ⚠ `no licence`</sub>

- **[zerosweep](https://github.com/sysadarsh/zerosweep)** — Autonomous System-One Triage Engine & Benchmark powered by TypeSafe AI (Jev). 75ms inference, $0 output tokens, and RLCD epistemic safety gates.
  <sub>`Benchmark` · ★2 · sysadarsh · `TS` · ⚠ `no licence`</sub>

- **[dsh-jev-decide](https://github.com/nanami-0713/dsh-jev-decide)** — DSH plugin: register TypeSafe Jev (System One decision model) as an agent tool — jev_decide returns calibrated probabilities (noul/choice/score) for routing/triage/guardrail judgments, no text generation. 把 TypeSafe Jev 决策模型注册为 DSH agent 工具
  <sub>`Plugin` · ★1 · nanami-0713 · `JS`</sub>

- **[hush](https://github.com/emreozyoruk/hush)** — Issue triage that stays quiet when it isn't sure. Calibrated labels, spam and duplicate detection — with abstention.
  <sub>`Project` · ★1 · emreozyoruk · `JS`</sub>

- **[Jev by Example](https://github.com/ReallyArtificial/jev-by-example)** — Ten runnable JavaScript agent decisions, one file each: reconciling a new memory against a stored one, gating whether an HTTP 200 really satisfied the task, retry vs. reconcile after an uncertain write, scoring context against a budget, checking a handoff for dropped prohibitions.
  <sub>`Project` · ★1 · Really Artificial · `JS` · `choice` · `score` · `noul` · ⚠ `one commit` `AI-written`</sub>

- **[jev-carryforward](https://github.com/Dharundp6/jev-carryforward)** — What your last session knew, scored against what this one is doing. MCP server: a per-project ledger written as things happen, recalled per task with TypeSafe's Jev evaluation model via Vercel AI Gateway.
  <sub>`Plugin` · ★1 · dharundp6 · `TS`</sub>

- **[jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage)** — Jev decides whether a batch of logs is worth acting on. Typed questions, confidence gates, nothing executed.
  <sub>`Project` · ★1 · jyatesdotdev · `Py`</sub>

- **[jev-playwright-mcp](https://github.com/krw82/jev-playwright-mcp)** — Jev-augmented Playwright MCP proxy — page-state triage, prompt-injection shielding, goal-based snapshot pruning, risky-action gating. Drop-in wrapper around @playwright/mcp for any coding agent.
  <sub>`Plugin` · ★1 · krw82 · `TS`</sub>

- **[jev-preflight](https://github.com/muse0509/jev-preflight)** — A bounded Jev risk check for Claude Code: eight risk axes, one request, one optional reinspection.
  <sub>`Plugin` · ★1 · muse0509 · `Go`</sub>

- **[jev-switchboard](https://github.com/ZIJIAN004/jev-switchboard)** — A JEV-gated semantic communication layer for parallel coding agents.
  <sub>`Project` · ★1 · zijian004 · `JS`</sub>

- **[jevaluate](https://github.com/ElshinQ/jevaluate)** — Jevaluate: evaluate before you trust. Field notes, runnable scripts and an agent skill for TypeSafe Jev: gated evals, a browser loop, a product walk with DeepSeek vision, a UI text judge and a first-click tree test. Co-authored with Claude Fable 5.1.
  <sub>`Plugin` · ★1 · elshinq · `JS`</sub>

- **[pi-jev-permit](https://github.com/kurihada/pi-jev-permit)** — A Jev (TypeSafe System One) permission gate for the Pi coding agent: judges every bash / write / edit call before it runs
  <sub>`Project` · ★1 · kurihada · `TS`</sub>

- **[stepwarden](https://github.com/getexcited/stepwarden)** — Every tool call your agent makes, checked before it runs. A Claude Code plugin that uses TypeSafe AI's Jev to verify each pending tool call against the session plan, then allows it, asks you, or blocks it. Proof of concept
  <sub>`Plugin` · ★1 · getexcited · `TS`</sub>

- **[agent-gate-loop](https://github.com/Ripwords/agent-gate-loop)** — Reusable GitHub Action: agent fix loop gated by checks, an AI reviewer, and TypeSafe Jev
  <sub>`Project` · ★0 · ripwords · `TS` · ⚠ `no licence`</sub>

- **[agent-handoff-gate](https://github.com/zsoXi/agent-handoff-gate)** — An experimental protocol for evidence-aware agent handoffs, bounded worker continuation, and TypeSafe/Jev-assisted review, with reproducible evaluation.
  <sub>`Benchmark` · ★0 · zsoxi · `Py`</sub>

- **[assay-001](https://github.com/jourdanlabs/assay-001)** — ASSAY-001: independent, pre-registered verification of TypeSafe Jev's calibration and type-safety claims. Split verdict, published in full.
  <sub>`Project` · ★0 · jourdanlabs · `Py` · ⚠ `no licence`</sub>

- **[Building a Harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev)** — LangChain's explainer and integration walkthrough: the three question types, plus model routing and gating risky tool calls before they run.
  <sub>`Article` · Sydney Runkle, Hunter Lovell · `Py` · ⚠ `vendor numbers`</sub>

- **[check-risk](https://github.com/moezubair/check-risk)** — A CLI and GitHub Action that assesses code-change risk using deterministic rules and TypeSafe Jev, recommending checks and reviewers before merge.
  <sub>`Project` · ★0 · moezubair · `TS`</sub>

- **[github-issue-classification-using-jev](https://github.com/KalyanM45/GitHub-Issue-Classification-Using-Jev)** — This repository contains a GitHub issue classifier built on Jev, TypeSafe AI's System One model. It labels every new issue with typed values and calibrated confidence in milliseconds, labelling what it is sure about and escalating what it is not. Three guardrail layers guard every write, and a
  <sub>`Project` · ★0 · kalyanm45 · `Py`</sub>

- **[jev-certify](https://github.com/nikkoxgonzales/jev-certify)** — Finite-sample guarantees for Jev (TypeSafe's System One). Conformal risk control turns calibrated probabilities into certified routing thresholds; prediction-powered inference audits them. 2,412 decisions on CLINC150 for $0.23 — including the shift and prevalence cases where the guarantee break
  <sub>`Benchmark` · ★0 · nikkoxgonzales · `Py`</sub>

- **[jev-dev](https://github.com/n-yokomachi/jev-dev)** — 同じ発言を jev と LLM の両方に判定させ、感情の変動値のズレと応答速度を1画面で見比べるデモ（affectus + Vercel AI Gateway）
  <sub>`Project` · ★0 · n-yokomachi · `TS` · ⚠ `no licence`</sub>

- **[jev-gates](https://github.com/rashedInt32/jev-gates)** — Six calibrated gates for Claude Code, judged by TypeSafe Jev: rules, scope, intent, done, claims, and commit honesty. Each one escalates, none ever approves.
  <sub>`Plugin` · ★0 · rashedint32 · `JS`</sub>

- **[jev-orderby-bench](https://github.com/yodablocks/jev-orderby-bench)** — Does ORDER BY over a Jev probability put rows in a defensible order? Independent ranking, calibration and invariant measurements of TypeSafe AI's Jev: passes six pre-registered gates on 360 labeled rows, fails four of six on graded product relevance.
  <sub>`Benchmark` · ★0 · yodablocks · `Py`</sub>

- **[jev-packs](https://github.com/dtduc-git/jev-packs)** — Evidence-gated registry of Jev question packs — curated questions, golden cases and measured evidence for Jev-compatible decision endpoints
  <sub>`Project` · ★0 · dtduc-git · `Py`</sub>

- **[jev-secret-detection](https://github.com/teyhouse/jev-secret-detection)** — Measures how well TypeSafe's RLCD-Jev model spots real secret credentials in file snippets
  <sub>`Benchmark` · ★0 · teyhouse · `Py` · ⚠ `no licence`</sub>

- **[jev-spam-eval](https://github.com/bitnovus/jev-spam-eval)** — Zero-shot spam filtering with TypeSafe Jev Noul questions, compared with TF-IDF baselines
  <sub>`Project` · ★0 · bitnovus · `Py`</sub>

- **[jevegis](https://github.com/0xArx/jevegis)** — Guardrails for LLM apps in one API call. Prompt injection, jailbreaks, leaks, unsafe content. Built on TypeSafe Jev. MIT.
  <sub>`Project` · ★0 · 0xarx · `TS`</sub>

- **[langchain-typesafe](https://docs.langchain.com/oss/python/integrations/providers/typesafe)** — The LangChain integration: a classifier plus experimental middleware for model routing and for gating risky tool calls before they run.
  <sub>`Integration` · `Py` · `choice` · `score` · `noul` · ⚠ `early access`</sub>

- **[last-exit](https://github.com/0x963D/last-exit)** — A cyberpunk border encounter powered by TypeSafe Jev. Bluff the guard. Inspect the receipts.
  <sub>`Project` · ★0 · 0x963d · `JS` · ⚠ `no licence`</sub>

- **[omp-jevens-classifier](https://github.com/STRML/omp-jevens-classifier)** — Jev-powered model-judged permission gate for OMP (TypeSafe System One)
  <sub>`Project` · ★0 · strml · `TS` · ⚠ `archived`</sub>

- **[openclaw-typesafe-ai](https://github.com/Olli0103/openclaw-typesafe-ai)** — Optional typed TypeSafe AI Jev decisions for OpenClaw, with SecretRef credentials and strict API validation.
  <sub>`Project` · ★0 · olli0103 · `TS`</sub>

- **[openrouter-jev-mcp](https://github.com/ctmx/openrouter-jev-mcp)** — High-speed System One Jev AI decision gateway and MCP server powered by OpenRouter
  <sub>`Plugin` · ★0 · ctmx · `Py`</sub>

- **[pi-jev-code](https://github.com/KamilPostrozny/pi-jev-code)** — Single-agent Pi coding coprocessor with Jev semantic gates, baseline-to-current diff review, and append-only observability telemetry.
  <sub>`Project` · ★0 · kamilpostrozny · `TS`</sub>

- **[pkg-gate](https://github.com/hemanth/pkg-gate)** — Pre-install security gate for npm lifecycle scripts using TypeSafe System One.
  <sub>`Project` · ★0 · hemanth · `JS`</sub>

- **[progressgate](https://github.com/AshutoshVJTI/progressgate)** — Detect semantic stagnation in AI agent loops
  <sub>`Project` · ★0 · ashutoshvjti · `TS`</sub>

- **[s1s](https://github.com/cpaczek/s1s)** — System One Search: navigate and trace code with TypeSafe judgments and repository evidence
  <sub>`Project` · ★0 · cpaczek · `TS`</sub>

- **[shade-arena-jev-monitor](https://github.com/nican2018/shade-arena-jev-monitor)** — Evaluating TypeSafe's Jev as a fast monitor and action gate for agent sabotage in SHADE-Arena, compared with Gemini 2.5 Flash/Pro.
  <sub>`Project` · ★0 · nican2018 · `Py`</sub>

- **[shady-town](https://github.com/tpaulshippy/shady-town)** — Shady Town: social-deduction party game for the living room TV, moderated by TypeSafe Jev
  <sub>`Project` · ★0 · tpaulshippy · `Rb` · ⚠ `no licence`</sub>

- **[siege](https://github.com/vnmoorthy/siege)** — SIEGE: 200 people vs one agent. A typed action gate (TypeSafe System One) that learns from every breach, evaluated by W&B Weave, hardened by a defender loop. Built at CoreWeave Hacks: Agent Loops 2026.
  <sub>`Project` · ★0 · vnmoorthy · `TS`</sub>

- **[sloppy-jevs-extension](https://github.com/neddes/sloppy-jevs-extension)** — Open-source Chrome extension that filters AI-generated prose and ads with Jev
  <sub>`Plugin` · ★0 · neddes · `JS`</sub>

- **[trustgate](https://github.com/ndolinschi/trustgate)** — TrustGate — indie media T&S gate via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[typesafe-triage-guard](https://github.com/shivam2003-dev/typesafe-triage-guard)** — Three composable judgment pipelines on TypeSafe's Jev: support-ticket triage, observability alert triage, and a deploy-risk gate.
  <sub>`Project` · ★0 · shivam2003-dev · `Py`</sub>

- **[wakegate](https://github.com/shitianfang/wakegate)** — Ask Jev whether a sleeping agent's wakeup is worth a full LLM turn before you resume it. A fail-open wake gate for long-running agents on Workers, Durable Objects and Node.
  <sub>`Project` · ★0 · shitianfang · `TS`</sub>

- **[zcode-jev](https://github.com/Zahrannnn/zcode-jev)** — Typed judgment layer for coding agents — gates from PRD to ship. Jev-ready, provider-agnostic.
  <sub>`Integration` · ★0 · zahrannnn · `TS` · ⚠ `no licence`</sub>

</details>

### Output validation

_Check a model's output against a rubric before it reaches a user._

<details>
<summary><b>95</b> rows — click to expand</summary>

- **[Cookbook: Double-checking citations](https://docs.typesafe.ai/cookbooks/citation_check)** ⭐ — Catches wrong or invented citations against the source document with one Choice, using its confidence to flag borderline cases for review.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Guardrails for LLMs](https://docs.typesafe.ai/cookbooks/llm_guardrails)** ⭐ — Screens every message in and out of an LLM app in one request, naming hazards and scoring how much harm complying would do.
  <sub>`Official docs` · `Py` · `noul` · `score`</sub>

- **[latitude-llm](https://github.com/latitude-dev/latitude-llm)** — Open-source observability for AI agents. Find where your agents fail, dispatch your coding agent to fix it, and verify the fix against real traces.
  <sub>`Project` · ★4,666 · latitude-dev · `TS`</sub>

- **[atomic](https://github.com/bastani-inc/atomic)** — The verifiable coding agent runtime. Define your coding agent's process in natural language with stages, checks, and approval gates instead of hoping it follows your instructions.
  <sub>`Project` · ★813 · bastani-inc · `TS` · ⚠ `no licence`</sub>

- **[vexjoy-agent](https://github.com/notque/vexjoy-agent)** — VexJoy AI Agent with Jev Intelligent Routing - /do routes plain-English requests to the right specialist agent and gates the work with reviews, tests, and a learning loop.
  <sub>`Project` · ★423 · notque · `Py`</sub>

- **[jev-mcp](https://github.com/jkudish/jev-mcp)** — A ready-made judgement toolbox for agents: fact verification, content screening, semantic ranking, classification and extraction as separate tools.
  <sub>`Plugin` · ★253 · `JS` · `choice` · `score` · `noul`</sub>

- **[jev-review](https://github.com/NiazMorshed2007/jev-review)** — A local-first MCP plugin for continuous code-quality review by coding agents.
  <sub>`Plugin` · ★198 · niazmorshed2007 · `TS`</sub>

- **[perch: semantic code linting](https://github.com/lakeday-org/perch)** — Tree-sitter finds and ranks methods, then user-authored YAML rules compile into nouls, with severity read as the rubric's expected value rather than the top band.
  <sub>`Project` · ★168 · `JS` · `choice` · `score` · `noul`</sub>

- **[jev-eval-agent](https://github.com/vinilana/jev-eval-agent)** — An agent that routes evaluation work through typed decisions.
  <sub>`Project` · ★103 · vinilana · `TS` · ⚠ `no licence`</sub>

- **[formanator](https://github.com/timrogers/formanator)** — Submit Forma <https://joinforma.com> benefit claims from the command line and Model Context Protocol (MCP) clients, with support for AI-powered receipt analysis with an LLM or Jev
  <sub>`Plugin` · ★99 · timrogers · `Rs`</sub>

- **[supercov](https://github.com/supercorp-ai/supercov)** — Code quality and coverage judgements for coding agents, in Rust.
  <sub>`Project` · ★95 · supercorp-ai · `Rs`</sub>

- **[fastbrowse](https://github.com/agent-labs-dev/fastbrowse)** — A fast browser agent: Jev picks each action from what is on the page, an LLM reads and plans, and every claim in an answer cites a quote from the page.
  <sub>`Project` · ★94 · agent-labs-dev · `Py`</sub>

- **[jev-lint](https://github.com/mizchi/jev-lint)** — lint text in code by jev scorerer
  <sub>`Project` · ★70 · mizchi · `TS`</sub>

- **[jev-libero](https://github.com/Dimweaker/jev-libero)** — Fine-grained robot control with Jev, physics previews, and configurable LIBERO tasks.
  <sub>`Project` · ★52 · dimweaker · `Py`</sub>

- **[vibecheck](https://github.com/RafalWilinski/vibecheck)** — Chrome extension: vibe-check your X posts with TypeSafe's Jev before you hit Post
  <sub>`Plugin` · ★47 · rafalwilinski · `JS` · ⚠ `no licence`</sub>

- **[jev-recruiter](https://github.com/skeptrunedev/jev-recruiter)** — A Jev powered LinkedIn recruiting agent. Watch it browse relevant profiles, save links, and review evidence against your hiring brief.
  <sub>`Project` · ★45 · skeptrunedev · `Py`</sub>

- **[jev-reviewer](https://github.com/choxos/jev-reviewer)** — Data extraction for systematic reviews, quoted from the papers. Ask a trial report and its supplements your extraction form or a RoB 2, ROBINS-I, QUADAS-2 or TIDieR template; Jev points at the lines, every answer is a verbatim quote with its page, you check it and export the table. Files stay i
  <sub>`Project` · ★32 · choxos · `JS`</sub>

- **[Canny](https://github.com/qkal/Canny)** — Guards against a coding agent claiming it finished: reads tool output, the diff and test results, then judges whether the completion claim holds.
  <sub>`Project` · ★31 · `TS` · `noul` · `score`</sub>

- **[snifftest](https://github.com/DanRWilloughby/snifftest)** — A prose linter that sniffs out AI writing tells. Zero dependencies, countable rules plus one judgment model.
  <sub>`Project` · ★27 · danrwilloughby · `TS`</sub>

- **[smartmoney-cub](https://github.com/myc0576/SmartMoney-Cub)** — Read-only trading journal and review harness: Jev typed judgments, agent integration, and a reproducible finance benchmark. No orders, no advice.
  <sub>`Benchmark` · ★26 · myc0576 · `Py`</sub>

- **[jev-column-race](https://github.com/goodrahstar/jev-column-race)** — Jev vs Gemini 3.8 Flash: labelling 1,000 app reviews, 4.1× faster and 7× cheaper
  <sub>`Project` · ★22 · goodrahstar · `JS`</sub>

- **[yoshi](https://github.com/compozy/yoshi)** — Context-pruning proxy for Claude Code and Codex: Jev judges which history is still needed, measured not claimed. POC here now, heading soon into https://github.com/compozy/compozy
  <sub>`Plugin` · ★22 · compozy · `TS`</sub>

- **[jev-guard](https://github.com/leepokai/jev-guard)** — Auto mode for every coding agent, built on Jev: risk-scores every tool call with session context (deny / ask / allow), flags prompt injection in results, checks skills and plugins. Claude Code, Codex, Copilot, Gemini, Cursor, pi, OpenCode, ACP.
  <sub>`Plugin` · ★21 · leepokai · `JS`</sub>

- **[invalidate](https://github.com/chopratejas/invalidate)** — The invalidation layer for AI memory. Every fact gets a lease; new evidence ends it. Built on TypeSafe Jev.
  <sub>`Project` · ★15 · chopratejas · `Py`</sub>

- **[jev-rag-benchmark](https://github.com/erendikmenn/jev-rag-benchmark)** — Reproducible benchmark for measuring Jev reranking quality, latency, and cost in RAG
  <sub>`Benchmark` · ★14 · erendikmenn · `Py`</sub>

- **[patdown](https://github.com/tyler-dot-earth/patdown)** — Block, steer, and "fuzzy lint" with Jev to make agents follow your rules and conventions. CLI, github action, pi package, and more. Built with Effect.
  <sub>`Project` · ★14 · tyler-dot-earth · `TS` · ⚠ `no licence`</sub>

- **[hermes-jev](https://github.com/keeltrace/hermes-jev)** — Typed System One decisions, ranking, verification, and an opt-in Hermes tool gate using TypeSafe Jev.
  <sub>`Project` · ★12 · keeltrace · `Py`</sub>

- **[jevlint](https://github.com/iamtoomas/JevLint)** — Configurable semantic linting powered by Jev, with file-level NOUL judgments and a magic-strings plugin.
  <sub>`Plugin` · ★11 · huntedman · `TS`</sub>

- **[jev-commit](https://github.com/valentynkit/jev-commit)** — A pre-commit hook: one call judges whether the commit message matches the diff.
  <sub>`Project` · ★9 · valentynkit · `Py`</sub>

- **[jev-feels](https://github.com/Qew7/jev-feels)** — Semantic decisions as ordinary Ruby — feels?, decide, score, Rails validations and pattern matching powered by Jev
  <sub>`Project` · ★8 · qew7 · `Rb`</sub>

- **[pi-heed](https://github.com/Nyarlathoteppppp/pi-heed)** — Runtime constraints for the pi coding agent: checks every side-effecting tool call against what you said, before it runs. Powered by TypeSafe Jev.
  <sub>`Project` · ★7 · nyarlathoteppppp · `TS`</sub>

- **[augustus](https://github.com/24601/Augustus)** — Agent skill for the decision-model class (classifiers, encoders/decoders, specialized AR heads, System One). TypeSafe Jev is the dominant exemplar. Composition algebra, question design, validation gates. MIT.
  <sub>`Plugin` · ★6 · 24601 · `Py`</sub>

- **[riff](https://github.com/scale-venture-partners/riff)** — A small, fast prose linter: ruff-style rule codes for writing, backed by TypeSafe's Jev model
  <sub>`Project` · ★6 · scale-venture-partners · `Py`</sub>

- **[citation-verifier](https://github.com/MarissaFamularo/citation-verifier)** — Check whether each cited paper supports the sentence citing it. Claude proves the quote, TypeSafe's Jev scores it, a human decides.
  <sub>`Project` · ★5 · marissafamularo · `JS`</sub>

- **[claude-jev](https://github.com/0x7067/claude-jev)** — Claude Code plugin: Jev for rule checks, verbatim compaction, and prompt routing
  <sub>`Plugin` · ★5 · 0x7067 · `Py`</sub>

- **[diffjury](https://github.com/raihankhan-rk/diffjury)** — DiffJury — TypeSafe Jev PR risk router + code review coach
  <sub>`Project` · ★5 · raihankhan-rk · `TS` · ⚠ `no licence`</sub>

- **[jev-block-android-ad](https://github.com/ufec/jev-block-android-ad)** — JevNoiseGate filters unwanted notifications and SMS on Android. Rather than matching keywords, an LLM decides what's noise — and only what it explicitly flags is blocked. Verification codes are matched on-device and never uploaded; anything uncertain passes through.
  <sub>`Project` · ★5 · ufec · `Kt`</sub>

- **[jev-lm](https://github.com/y0usaf/jev-lm)** — A word-level language model whose output layer is Jev: n-gram drafter, Noul chunk verification, bits-per-token eval
  <sub>`Project` · ★5 · y0usaf · `TS`</sub>

- **[hunch](https://github.com/Kelbie/hunch)** — Semantic code review with Jev, plain-English rules and Agent Skills.
  <sub>`Project` · ★4 · kelbie · `TS`</sub>

- **[jev-code](https://github.com/FrancoisChastel/jev-code)** — Jev, TypeSafe's System One classifier, as a tool inside Claude Code, Codex, Pi, and OpenCode: typed classify, check, score, rank, and ask, plus one-command setup.
  <sub>`Plugin` · ★4 · francoischastel · `TS`</sub>

- **[jev-oas-sentinel](https://github.com/ShuhanSun/jev-oas-sentinel)** — Catch breaking API behavior hidden in OpenAPI prose with deterministic checks and TypeSafe JEV System One semantic review.
  <sub>`Project` · ★4 · shuhansun · `Py`</sub>

- **[jev-pref](https://github.com/doeixd/jev-pref)** — Turn your AGENTS.md preferences into a fast, Jev-powered AI linter.
  <sub>`Project` · ★4 · doeixd · `JS`</sub>

- **[jev-spec](https://github.com/nozomi-koborinai/jev-spec)** — ⚡ Catch spec drift on every commit: check your code against your Markdown specs with TypeSafe AI's Jev model.
  <sub>`Project` · ★4 · nozomi-koborinai · `TS`</sub>

- **[taste-lint](https://github.com/mblode/taste-lint)** — Catch AI slop before you ship.
  <sub>`Project` · ★4 · mblode · `TS`</sub>

- **[hermes-jev-plugin](https://github.com/ajensenwaud/hermes-jev-plugin)** — TypeSafe Jev (System One) decision tools for Hermes Agent: jev_check / jev_route / jev_score / jev_evaluate
  <sub>`Plugin` · ★3 · ajensenwaud · `Py`</sub>

- **[jev-auto-router](https://github.com/miniLV/Jev-Auto-Router)** — Jev Auto Router (Jev Router): experimental per-call GPT model routing for Codex via TypeSafe Jev and a local Responses proxy, with independent task verification.
  <sub>`Plugin` · ★3 · minilv · `TS`</sub>

- **[jev-behavior-study](https://github.com/RINNECODER/jev-behavior-study)** — Independent Jev 1.13.0 behavior study: report, controlled prompt experiments, raw results, and offline verification.
  <sub>`Project` · ★3 · rinnecoder · `Py`</sub>

- **[jev-exploration](https://github.com/SamuelSacco/jev-exploration)** — Jev (TypeSafe) exploratory thread: claim audit, live demos, and runnable code
  <sub>`Benchmark` · ★3 · samuelsacco · `Py` · ⚠ `no licence`</sub>

- **[jevkit](https://github.com/ariel-frischer/jevkit)** — Fast Rust CLI for TypeSafe Jev: typed decisions, offline linting before you pay
  <sub>`Project` · ★3 · ariel-frischer · `Rs`</sub>

- **[jod](https://github.com/mateonunez/jod)** — Semantic schemas over TypeSafe's Jev — validate the state locally, then project typed answers.
  <sub>`Project` · ★3 · mateonunez · `TS`</sub>

- **[open-jev-approvals](https://github.com/alexj11324/open-jev-approvals)** — Binary approval gate for Codex and Claude Code — every intercepted tool call is reviewed by TypeSafe JEV and composed through a versioned local policy, with scoped authorization.
  <sub>`Jev-like alternative` · ★3 · alexj11324 · `Go` · ⚠ `not Jev`</sub>

- **[clear-head](https://github.com/VladyslavHontar/clear-head)** — Claude Code Stop hook that checks an AI assistant's claims against what it actually read this session, using TypeSafe's Jev as the judge
  <sub>`Plugin` · ★2 · vladyslavhontar · `Py`</sub>

- **[jev-browser-pilot](https://github.com/aidil2105/jev-browser-pilot)** — A bounded decision layer for browser and desktop automation: a decision-only model picks one next step; the code owns perception, content, actuation and verification.
  <sub>`Project` · ★2 · aidil2105 · `Py`</sub>

- **[jev-decisions](https://github.com/bojansandhaus/jev-decisions)** — Jev Decisions Plugin for Hermes (and other AI Agents): tool risk reviews, human approval recommendations, evidence checks, and a local decision journal.
  <sub>`Plugin` · ★2 · bojansandhaus · `Py`</sub>

- **[jev-for-engineers](https://github.com/Foadsf/jev-for-engineers)** — Eight minimal working examples of TypeSafe's Jev (a System One model) applied to mechanical and electrical engineering: CAD/CAE/CAM routing, FEM result triage, DFM screening, BOM alignment, hallucination-proof extraction. Zero dependencies.
  <sub>`Project` · ★2 · foadsf · `Py`</sub>

- **[jev-rust-review](https://github.com/kindintelligence/jev-rust-review)** — Rust-aware code review for Claude Code and coding agents, powered by TypeSafe Jev
  <sub>`Plugin` · ★2 · kindintelligence · `Rs`</sub>

- **[jev-scout](https://github.com/AkashPriyadarshii/jev-scout)** — Zero-hallucination open-source repo and crate scout powered by TypeSafe AI Jev System One scoring
  <sub>`Project` · ★2 · akashpriyadarshii · `Rs`</sub>

- **[jevibe-check](https://github.com/sriganesh/jevibe-check)** — A live tone labeler for Bluesky posts and drafts, using TypeSafe's Jev API.
  <sub>`Project` · ★2 · sriganesh · `JS`</sub>

- **[jevsume](https://github.com/unownone/jevsume)** — ATS-friendly resume review powered by Jev (TypeSafe System One). The frontend extracts resume text the way a parser would, then a Cloudflare Worker runs typed JEV questions and composes a JevScore.
  <sub>`Project` · ★2 · unownone · `TS` · ⚠ `no licence`</sub>

- **[limpet](https://github.com/noplan-inc/limpet)** — A Stop hook that stops your coding agent from stopping too early. Plain-language rules, judged by jev.
  <sub>`Plugin` · ★2 · noplan-inc · `Py`</sub>

- **[tenbin](https://github.com/simota/tenbin)** — MCP server and agent skill for the TypeSafe AI System One API (Jev): decompose a judgment into Choice / Score / Noul questions, lint them, measure on labelled data, and put calibrated thresholds in code
  <sub>`Plugin` · ★2 · simota · `TS`</sub>

- **[tripwire](https://github.com/noelzappy/tripwire)** — Judge every LLM response before the user sees it. AI SDK middleware and OpenAI-compatible proxy.
  <sub>`Integration` · ★2 · noelzappy · `TS`</sub>

- **[typesafe-ai-firewall](https://github.com/AnshChoudhary/typesafe-ai-firewall)** — Shadow-mode validation harness for a pre-execution firewall on AI agent tool calls (TypeSafe/Jev). Real run, findings in report.md.
  <sub>`Project` · ★2 · anshchoudhary · `Py` · ⚠ `no licence`</sub>

- **[typesafe-as-a-judge](https://github.com/E-FL/typesafe-as-a-judge)** — Unofficial community MCP plugin for Codex and Claude Code using TypeSafe Jev for bounded routing, ranking, extraction, verification, and escalation
  <sub>`Plugin` · ★2 · e-fl · `JS`</sub>

- **[typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard)** — Automated database migration safety reviewer powered by TypeSafe AI (Jev System One model)
  <sub>`Project` · ★2 · opaielsheikh · `TS` · ⚠ `no licence`</sub>

- **[datajev](https://github.com/zzz1YAO/DataJev)** — ⚡ DataJev LLM → Analyze Jev → Continue / Switch / Verify / Stop System-1 control for System-2 data agents
  <sub>`Project` · ★1 · zzz1yao · `Py`</sub>

- **[dsh-jev-verify](https://github.com/xienda/dsh-jev-verify)** — Jev (TypeSafe System One) decision tools + live verification benchmark for DeepSeek Harness: jev_decision (choice/score/noul) and jev_verify, honest by design.
  <sub>`Benchmark` · ★1 · xienda · `JS`</sub>

- **[jackalope](https://github.com/Jackalope-Dev/jackalope)** — A desktop workspace for coding agents, parallel Git worktrees, and code review.
  <sub>`Project` · ★1 · jackalope-dev · `Rs`</sub>

- **[Jev by Example](https://github.com/ReallyArtificial/jev-by-example)** — Ten runnable JavaScript agent decisions, one file each: reconciling a new memory against a stored one, gating whether an HTTP 200 really satisfied the task, retry vs. reconcile after an uncertain write, scoring context against a budget, checking a handoff for dropped prohibitions.
  <sub>`Project` · ★1 · Really Artificial · `JS` · `choice` · `score` · `noul` · ⚠ `one commit` `AI-written`</sub>

- **[jev-labs](https://github.com/copyleftdev/jev-labs)** — Never confidently wrong: a TLA+-verified consensus kernel around TypeSafe's Jev, run through 1,680 chaos-tested pharmacy decisions with zero wrong verdicts. Film, code, and every captured call.
  <sub>`Project` · ★1 · copyleftdev · `Py`</sub>

- **[jev-preflight](https://github.com/muse0509/jev-preflight)** — A bounded Jev risk check for Claude Code: eight risk axes, one request, one optional reinspection.
  <sub>`Plugin` · ★1 · muse0509 · `Go`</sub>

- **[jev-review-action](https://github.com/fatwang2/jev-review-action)** — Configurable GitHub submission review and PR classification with TypeSafe Jev. No text-generation model.
  <sub>`Project` · ★1 · fatwang2 · `JS`</sub>

- **[jev-the-janitor](https://github.com/kylehovance-ai/jev-the-janitor)** — A janitor for markdown vaults powered by TypeSafe Jev: Jev votes on each note, your code files it, you review the low-confidence pile.
  <sub>`Project` · ★1 · kylehovance-ai · `Py`</sub>

- **[profanity-checker](https://github.com/4rays/profanity-checker)** — Cloudflare Worker to check for profanity using TypeSafe Jev
  <sub>`Project` · ★1 · 4rays · `TS`</sub>

- **[stepwarden](https://github.com/getexcited/stepwarden)** — Every tool call your agent makes, checked before it runs. A Claude Code plugin that uses TypeSafe AI's Jev to verify each pending tool call against the session plan, then allows it, asks you, or blocks it. Proof of concept
  <sub>`Plugin` · ★1 · getexcited · `TS`</sub>

- **[system-one-playground](https://github.com/DonaldMurillo/system-one-playground)** — Readable scripting, semantic code checks, a Go System One client, and Studio.
  <sub>`Project` · ★1 · donaldmurillo · `Go`</sub>

- **[agent-gate-loop](https://github.com/Ripwords/agent-gate-loop)** — Reusable GitHub Action: agent fix loop gated by checks, an AI reviewer, and TypeSafe Jev
  <sub>`Project` · ★0 · ripwords · `TS` · ⚠ `no licence`</sub>

- **[agent-handoff-gate](https://github.com/zsoXi/agent-handoff-gate)** — An experimental protocol for evidence-aware agent handoffs, bounded worker continuation, and TypeSafe/Jev-assisted review, with reproducible evaluation.
  <sub>`Benchmark` · ★0 · zsoxi · `Py`</sub>

- **[assay-001](https://github.com/jourdanlabs/assay-001)** — ASSAY-001: independent, pre-registered verification of TypeSafe Jev's calibration and type-safety claims. Split verdict, published in full.
  <sub>`Project` · ★0 · jourdanlabs · `Py` · ⚠ `no licence`</sub>

- **[check-risk](https://github.com/moezubair/check-risk)** — A CLI and GitHub Action that assesses code-change risk using deterministic rules and TypeSafe Jev, recommending checks and reviewers before merge.
  <sub>`Project` · ★0 · moezubair · `TS`</sub>

- **[human-compiler](https://github.com/asfarsadewa/human-compiler)** — A compiler for human language. Paste text, get diagnostics. Measured by TypeSafe Jev.
  <sub>`Project` · ★0 · asfarsadewa · `TS`</sub>

- **[jev-agent-skill](https://github.com/yuyang2230/jev-agent-skill)** — Free typed judgments for AI agents: offload classify/screen/score/verify to Jev (TypeSafe System One) via OpenCode Zen. Claude Code / ZCode skill. 给AI代理省token的免费决策分流技能
  <sub>`Plugin` · ★0 · yuyang2230 · `Py`</sub>

- **[jev-enterprise-decision-fabric](https://github.com/ghubnab99/jev-enterprise-decision-fabric)** — Architecture for running many semantic decisions through one validated path, with a labelled 111-case benchmark comparing TypeSafe Jev against a Claude baseline, and a dashboard for inspecting any single decision. Experimental, not production.
  <sub>`Benchmark` · ★0 · ghubnab99 · `C#`</sub>

- **[jev-gates](https://github.com/rashedInt32/jev-gates)** — Six calibrated gates for Claude Code, judged by TypeSafe Jev: rules, scope, intent, done, claims, and commit honesty. Each one escalates, none ever approves.
  <sub>`Plugin` · ★0 · rashedint32 · `JS`</sub>

- **[jev-resume-analyzer](https://github.com/awun8191/jev-resume-analyzer)** — CV diagnostics and job alignment with TypeSafe Jev, React and FastAPI
  <sub>`Project` · ★0 · awun8191 · `Py` · ⚠ `no licence`</sub>

- **[jev-shadcn-lint-eval](https://github.com/blas0/jev-shadcn-lint-eval)** — A small second eval for shadcn-ui/lint that uses TypeSafe's Jev to judge the linter's own output.
  <sub>`Project` · ★0 · blas0 · `JS` · ⚠ `no licence`</sub>

- **[jevguard](https://github.com/Jhonnyr97/JevGuard)** — Claude Code + Codex CLI plugin that verifies the agent follows project rules through a System One (Jev) model
  <sub>`Plugin` · ★0 · jhonnyr97 · `TS`</sub>

- **[n8n-nodes-jev-classification](https://github.com/khmuhtadin/n8n-nodes-jev-classification)** — n8n community node for Jev by TypeSafe AI: classify, score and check text with calibrated probabilities. Parallel requests and multi-item batching.
  <sub>`Project` · ★0 · khmuhtadin · `TS`</sub>

- **[openclaw-typesafe-ai](https://github.com/Olli0103/openclaw-typesafe-ai)** — Optional typed TypeSafe AI Jev decisions for OpenClaw, with SecretRef credentials and strict API validation.
  <sub>`Project` · ★0 · olli0103 · `TS`</sub>

- **[pi-jev-code](https://github.com/KamilPostrozny/pi-jev-code)** — Single-agent Pi coding coprocessor with Jev semantic gates, baseline-to-current diff review, and append-only observability telemetry.
  <sub>`Project` · ★0 · kamilpostrozny · `TS`</sub>

- **[plotveil](https://github.com/Dearest/plotveil)** — A quiet spoiler blocker for YouTube comments. One typed Jev (TypeSafe System One) Noul decision per comment; covered while checked, still covered if the check fails.
  <sub>`Project` · ★0 · dearest · `TS`</sub>

- **[pytest-jev](https://github.com/allebee/pytest-jev)** — Semantic assertions for pytest: test what your LLM app's output means, judged by TypeSafe's Jev.
  <sub>`Plugin` · ★0 · allebee · `Py`</sub>

- **[typesafeai-review](https://github.com/rbalch/typesafeai-review)** — Using Typesafe.AI to generate diff reviews.
  <sub>`Project` · ★0 · rbalch · `Py` · ⚠ `no licence`</sub>

- **[Testing TypeSafe Jev, Mistral and Gemini for local event validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation)** — The only three-way head-to-head found, with each model's prompt tuned separately and the scope limited to one task rather than a general ranking.
  <sub>`Benchmark` · Near Here</sub>

- **[TypeSafe's Jev: Can decision models replace LLM judges?](https://arize.com/blog/typesafe-jev-llm-judge/)** — Collects the third-party evaluations that exist so far and frames the question of where a decision model can stand in for an LLM judge.
  <sub>`Article` · Laurie Voss</sub>

</details>

### Retry control

_Decide whether a failed step is worth retrying._

- **[jevswiftsdk](https://github.com/NSStudent/JevSwiftSDK)** — An independent, type-safe Swift SDK for TypeSafe Jev, with async/await, batching, retries, and SPM support.
  <sub>`SDK` · ★8 · nsstudent · `Swift`</sub>

- **[jev-resilience](https://github.com/Vicente-MD/jev-resilience)** — Non-blocking Spring Boot Starter for Spring WebFlux that implements a Semantic Circuit Breaker to detect silent HTTP 200 failures using TypeSafe Jev.
  <sub>`Plugin` · ★2 · vicente-md · `Java` · ⚠ `no licence`</sub>

- **[Jev by Example](https://github.com/ReallyArtificial/jev-by-example)** — Ten runnable JavaScript agent decisions, one file each: reconciling a new memory against a stored one, gating whether an HTTP 200 really satisfied the task, retry vs. reconcile after an uncertain write, scoring context against a budget, checking a handoff for dropped prohibitions.
  <sub>`Project` · ★1 · Really Artificial · `JS` · `choice` · `score` · `noul` · ⚠ `one commit` `AI-written`</sub>

- **[harnessjudge](https://github.com/ndolinschi/harnessjudge)** — Judge agent steps — ok / retry / escalate / stop via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

### Human escalation

_Use calibrated confidence to decide what a person must see._

<details>
<summary><b>60</b> rows — click to expand</summary>

- **[Cookbook: Classification using confidence](https://docs.typesafe.ai/cookbooks/classification_using_confidence)** ⭐ — Classifies annual reports into 75 industry groups, then reads the answer's own confidence to decide whether to report that group or the broader division above it.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Double-checking citations](https://docs.typesafe.ai/cookbooks/citation_check)** ⭐ — Catches wrong or invented citations against the source document with one Choice, using its confidence to flag borderline cases for review.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Knowledge graph entity alignment](https://docs.typesafe.ai/cookbooks/entity_alignment)** ⭐ — Decides which of 450 candidate pairs from two product catalogues describe the same thing, with one Score whose three levels are the three available actions.
  <sub>`Official docs` · `Py` · `score`</sub>

- **[Cookbook: Self-consistency with choices](https://docs.typesafe.ai/cookbooks/consistency_choice_cookbook)** ⭐ — Adds an explicit "uncertain" outcome to moderation decisions and measures label agreement against the share of actions taken automatically.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Self-consistency with nouls](https://docs.typesafe.ai/cookbooks/consistency_noul_cookbook)** ⭐ — Routes uncertain probabilities to human review while keeping the underlying noul values visible rather than collapsing them to a label.
  <sub>`Official docs` · `Py` · `noul`</sub>

- **[Pattern: Confidence-gated routing](https://docs.typesafe.ai/patterns/confidence-routing)** ⭐ — Treat confidence as a second axis: the answer tells you what, the confidence tells you whether to act on it.
  <sub>`Official docs` · `Py`</sub>

- **[Confidence](https://docs.typesafe.ai/confidence)** ⭐ — How confidence is derived from the probability distribution, and why a threshold tuned on one question type does not transfer to another.
  <sub>`Official docs`</sub>

- **[Airflow LLMBranchOperator with Jev](https://airflow.apache.org/docs/apache-airflow-providers-common-ai/stable/index.html)** — Turns downstream task ids into a choice option set, with a minimum-confidence gate that routes uncertain runs to a human.
  <sub>`Integration` · ★46,934 · `Py` · `choice`</sub>

- **[Composio TypeSafe provider](https://github.com/ComposioHQ/composio/tree/next/python/providers/typesafe)** — Compiles a tool catalogue into questions and reconstructs tool calls from the answers, with typed errors for abstention and confirmation-required cases.
  <sub>`Project` · ★30,279 · `Py` · `choice`</sub>

- **[Inbox Zero: seven email decisions](https://github.com/elie222/inbox-zero)** — Seven distinct email decisions, each with its own separately chosen threshold, falling back to the normal LLM on any error.
  <sub>`Project` · ★12,278 · `TS` · `choice` · `noul`</sub>

- **[jev-review](https://github.com/devagrawal09/jev-review)** — Pre-screens code review with Jev to surface high-risk changes for a more expensive model or a person, with a local dashboard.
  <sub>`Project` · ★510 · `TS` · `choice` · `score` · `noul`</sub>

- **[jev-align](https://github.com/sutro-sh/jev-align)** — Builds calibrated decision functions from human feedback.
  <sub>`Project` · ★271 · sutro-sh · `Py`</sub>

- **[Probing Jev's behaviour with repeated API calls](https://github.com/ahastudio/til)** — Independent Korean-language notes reporting that reversing the order of options shifted a probability enough to flip a 0.9 threshold.
  <sub>`Benchmark` · ★190 · `Py` · ⚠ `no licence` `unverified`</sub>

- **[neurolink](https://github.com/juspay/neurolink)** — One TypeScript interface for 40 AI providers across three inference types — generate, stream, and decide. Decide returns typed, calibrated judgments (boolean/choice/score) via TypeSafe Jev, not text. MCP-native, voice (TTS/STT/realtime), RAG, memory, file processors. Powers Tara, Yama and Clair
  <sub>`Plugin` · ★137 · juspay · `TS`</sub>

- **[Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot)** — A Discord moderation bot: a Choice tiers each message while a Noul carries ban urgency, and an admin pardon is fed back as a safe precedent in later requests.
  <sub>`Project` · ★41 · brainstormity · `Py` · `choice` · `noul`</sub>

- **[jev-calibrate](https://github.com/smkrv/jev-calibrate)** — Calibrate Jev questions against your own labels: tune criteria on labelled examples, confirm on a held-out set, get a verdict per question. Unofficial.
  <sub>`Project` · ★31 · smkrv · `TS`</sub>

- **[jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks)** — Probability-aware evaluation for typed decision models: calibration, selective risk, latency, and reproducible benchmarks.
  <sub>`Benchmark` · ★17 · abdelstark · `Py`</sub>

- **[jevalyn](https://github.com/Ray-Hughes/jevalyn)** — The decision layer for your Rails app. A Rails-native wrapper around TypeSafe's Jev System One API: typed, calibrated decisions in your control flow.
  <sub>`Project` · ★17 · ray-hughes · `Rb`</sub>

- **[jevwire](https://github.com/Brainwires/jevwire)** — Jev decision layer for agents: MCP server, embeddable DecisionModel library, and an escalate-only Claude Code plugin (TypeSafe AI's Jev)
  <sub>`Plugin` · ★15 · brainwires · `TS`</sub>

- **[jev-agent-skill-router](https://github.com/GodsBoy/jev-agent-skill-router)** — Typed, confidence-aware agent skill routing with TypeSafe Jev.
  <sub>`Plugin` · ★13 · godsboy · `Py`</sub>

- **[jev-forge](https://github.com/zwliJay/jev-forge)** — An open training and inference stack for Jev-style decision models. Train models to score dynamic candidate branches from a shared prefix, with support for high-cardinality choice, calibration, and fast batched inference.
  <sub>`Jev-like alternative` · ★11 · zwlijay · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[discern](https://github.com/doeixd/discern)** — Craft Type-Safe Uncertainty-aware semantic pattern matching, control flow, and smart procedures for Effect DecisionModel and Jev
  <sub>`Project` · ★10 · doeixd · `TS`</sub>

- **[jevcal](https://github.com/abhixhek/jevcal)** — Calibrate, threshold and drift-check a decision model against an LLM teacher instead of guessing a cutoff.
  <sub>`Project` · ★10 · abhixhek · `Py`</sub>

- **[jev-harness](https://github.com/AntonioCoppe/jev-harness)** — Decision harness for TypeSafe Jev — confidence gates, shadow mode, recipes, and evals. Claude CLI 48.9s → Jev 1.3s on the same row-filter job.
  <sub>`Project` · ★9 · antoniocoppe · `TS`</sub>

- **[typesafe-local](https://github.com/aabolfazl/typesafe-local)** — Inspired by TypeSafe Ai, Ask a local LLM typed questions, get calibrated probabilities instead of text. Structured output without generation or parsing. MLX / Apple Silicon.
  <sub>`Project` · ★8 · aabolfazl · `Py`</sub>

- **[jevmory](https://github.com/romiluz13/jevmory)** — Coding-agent memory where every fact is a verbatim quote graded by TypeSafe Jev's calibrated confidence. Local-first, SQLite receipts, zero dependencies.
  <sub>`Project` · ★7 · romiluz13 · `Py`</sub>

- **[luce](https://github.com/scienthoon/luce)** — Luce: a recipe for calibrated decision models — a sentence about your task in, a small model that answers typed questions with honest probabilities out (init → synth → train → eval → serve)
  <sub>`Project` · ★7 · scienthoon · `Py`</sub>

- **[daf-jev](https://github.com/docxology/daf-jev)** — daf-jev: composable Python toolkit for TypeSafe's Jev (System One) decision API — question builders, confidence gates, evaluator, calibration, CLI, MCP server, agent skill
  <sub>`Plugin` · ★5 · docxology · `Py`</sub>

- **[jev-block-android-ad](https://github.com/ufec/jev-block-android-ad)** — JevNoiseGate filters unwanted notifications and SMS on Android. Rather than matching keywords, an LLM decides what's noise — and only what it explicitly flags is blocked. Verification codes are matched on-device and never uploaded; anything uncertain passes through.
  <sub>`Project` · ★5 · ufec · `Kt`</sub>

- **[jev-usecases](https://github.com/kenhuangus/jev-usecases)** — Production TypeSafe Jev (System One) use-case harnesses with confidence-gated decision logic
  <sub>`Project` · ★5 · kenhuangus · `Py`</sub>

- **[jevflow](https://github.com/Mawfyy/jevflow)** — Probabilistic AI decisions as composable backend primitives — typed judgments (noul/score/choice), deterministic thresholds, and explainable workflows. Powered by TypeSafe's Jev, provider-agnostic.
  <sub>`Integration` · ★5 · mawfyy · `TS` · ⚠ `no licence`</sub>

- **[poorjev](https://github.com/rupeshpoojary9/poorjev)** — Open-source, local Jev alternative: a System One decision layer with provably calibrated confidence (ECE 0.170→0.071). Typed decisions, runs offline, no API key, no waitlist.
  <sub>`Jev-like alternative` · ★5 · rupeshpoojary9 · `Py` · ⚠ `not Jev`</sub>

- **[jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration)** — Independent calibration test of TypeSafe's Jev on a task it cannot have seen: 900 rule-generated support tickets (choice / score / boolean) plus 3 public benchmarks via Vercel AI Gateway. Raw responses, ECE with noise floor, temperature refit, per-type sign of miscalibration. Reproducible for ~
  <sub>`Benchmark` · ★4 · scienthoon · `Py`</sub>

- **[qwen-rlcd](https://github.com/shamazharikh/qwen-rlcd)** — Jev-style calibrated decision model (Choice/Score/Noul) on Qwen3.5-0.8B
  <sub>`Jev-like alternative` · ★4 · shamazharikh · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[system-one-gemma](https://github.com/akash-kamat/system-one-gemma)** — Open-source Jev-style System One decision model. Gemma 3 270M with a scoring head — fast, calibrated decisions in a single forward pass. No text generation. Inspired by TypeSafe.ai's Jev.
  <sub>`Jev-like alternative` · ★4 · akash-kamat · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[tink-route](https://github.com/jon-devlapaz/tink-route)** — Dynamic, confidence-aware Agent Skill routing with TypeSafe Jev and Tink
  <sub>`Plugin` · ★4 · jon-devlapaz · `Py`</sub>

- **[jev-dspy-lab](https://github.com/jmanhype/jev-dspy-lab)** — Reproducible calibration and selective-risk benchmarks for Jev/TypeSafe decisions in DSPy workflows
  <sub>`Benchmark` · ★3 · jmanhype · `Py`</sub>

- **[jev-flash-router](https://github.com/Ravinder82/jev-flash-router)** — open-sourced jev-flash-router: an MCP server for TypeSafe's new Jev model. AI coding agents waste hundreds of reasoning tokens just deciding which file to edit, which route to pick, or whether a diff breaks tests. Jev evaluates state and outputs calibrated probabilities. Works with Cursor, Wind
  <sub>`Plugin` · ★3 · ravinder82 · `TS`</sub>

- **[jev-phishing-bench](https://github.com/anisselbd/jev-phishing-bench)** — Jev (TypeSafe) vs Claude Haiku 4.5 on 2 000 phishing emails: accuracy, calibration, latency, cost. Reproducible benchmark.
  <sub>`Benchmark` · ★3 · anisselbd · `Py` · ⚠ `no licence`</sub>

- **[opencode-jev-orchestrator](https://github.com/aaronshaf/opencode-jev-orchestrator)** — Keeps OpenCode on a cheap sticky model for warm cache; Jev escalates hard turns to stronger subagents.
  <sub>`Project` · ★3 · aaronshaf · `TS`</sub>

- **[typed-decisions](https://github.com/kotoba-lang/typed-decisions)** — Jev-shaped typed-decision model (state + Choice/Score/Noul questions -> calibrated probabilities, one pass) on ModernBERT / DeBERTa / LLaDA-MoE, with measured latency, accuracy, calibration and training cost
  <sub>`Project` · ★3 · kotoba-lang · `Py` · ⚠ `no licence`</sub>

- **[jev-mcp-server](https://github.com/wangkuangkuang/jev-mcp-server)** — MCP server for Jev (TypeSafe System One): the three official question types — choice, score, noul — plus batch classify. Calibrated probabilities, ~0.5s, <$0.001/call.
  <sub>`Plugin` · ★2 · wangkuangkuang · `Py`</sub>

- **[jev-starter](https://github.com/hamakyo/jev-starter)** — Typed, policy-driven decision workflows on top of TypeSafe AI Jev: confidence routing, fallbacks, evaluation, and RAG patterns for TypeScript apps.
  <sub>`Plugin` · ★2 · hamakyo · `TS`</sub>

- **[jev-ui](https://github.com/etweisberg/jev-ui)** — React components that resolve which component to render, how to order a list, and whether to show an affordance — from calibrated judgments returned by TypeSafe's Jev.
  <sub>`Project` · ★2 · etweisberg · `TS` · ⚠ `no licence`</sub>

- **[jevbus](https://github.com/zkjoie/jevbus)** — A streaming event bus whose routing, subscription and consumption are decided by a probabilistic judge. The reference judge is TypeSafe AI's Jev (System One) model: send it a payload and a set of typed questions, get back calibrated probabilities instead of prose.
  <sub>`Project` · ★2 · zkjoie · `Rs`</sub>

- **[pi-typesafe-jev](https://github.com/legacybridge-tech/pi-typesafe-jev)** — A pi extension that exposes TypeSafe (Jev, System One) judgments as five pi tools, so a model can make narrow semantic judgments while your code and your users keep control of thresholds, weights, and actions.
  <sub>`Plugin` · ★2 · legacybridge-tech · `TS` · ⚠ `no licence`</sub>

- **[tenbin](https://github.com/simota/tenbin)** — MCP server and agent skill for the TypeSafe AI System One API (Jev): decompose a judgment into Choice / Score / Noul questions, lint them, measure on labelled data, and put calibrated thresholds in code
  <sub>`Plugin` · ★2 · simota · `TS`</sub>

- **[toolgate](https://github.com/RiskAverseTech/toolgate)** — Open auto mode for AI agents — a calibrated tool-call firewall powered by TypeSafe Jev. Ships as a Claude Code hook
  <sub>`Plugin` · ★2 · riskaversetech · `TS`</sub>

- **[watfile](https://github.com/jexp/watfile)** — Text/PDF - File categorization and sorting with Typesafe AI Jev or local calibrated decision model
  <sub>`Project` · ★2 · jexp · `Py` · ⚠ `no licence`</sub>

- **[jev-eval](https://github.com/4esv/jev-eval)** — Benchmark TypeSafe Jev against any OpenRouter model on your own labelled classification data: accuracy, calibration, latency, cost
  <sub>`Benchmark` · ★1 · 4esv · `Py` · ⚠ `no licence`</sub>

- **[jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage)** — Jev decides whether a batch of logs is worth acting on. Typed questions, confidence gates, nothing executed.
  <sub>`Project` · ★1 · jyatesdotdev · `Py`</sub>

- **[jev-the-janitor](https://github.com/kylehovance-ai/jev-the-janitor)** — A janitor for markdown vaults powered by TypeSafe Jev: Jev votes on each note, your code files it, you review the low-confidence pile.
  <sub>`Project` · ★1 · kylehovance-ai · `Py`</sub>

- **[padflow-jev-evals](https://github.com/zsavage8/padflow-jev-evals)** — Typed-decision benchmark from PadFlow (land development SaaS): schemas, anonymized labeled rows, and a runner for confidence-calibrated models like TypeSafe Jev.
  <sub>`Benchmark` · ★1 · zsavage8 · `Py`</sub>

- **[qualm](https://github.com/qddegtya/qualm)** — Typed decisions from a System One model, where uncertainty is something you have to handle.
  <sub>`Project` · ★1 · qddegtya · `TS`</sub>

- **[assay-001](https://github.com/jourdanlabs/assay-001)** — ASSAY-001: independent, pre-registered verification of TypeSafe Jev's calibration and type-safety claims. Split verdict, published in full.
  <sub>`Project` · ★0 · jourdanlabs · `Py` · ⚠ `no licence`</sub>

- **[Example: confidence-gated escalation](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/02-confidence-gate/main.py)** — Routing with an act-or-escalate gate, where the policy function is deliberately left unimplemented because the thresholds are yours to choose.
  <sub>`Snippet` · `Py` · `choice` · ⚠ `code untested`</sub>

- **[jev-asks-until-sure](https://github.com/mintannn/jev-asks-until-sure)** — A twenty-questions guesser that keeps asking until Jev's calibrated confidence crosses a threshold — or gives up and says so
  <sub>`Project` · ★0 · mintannn · `TS`</sub>

- **[jev-calibration-audit](https://github.com/jujumilk3/jev-calibration-audit)** — Independent API-only calibration audit of TypeSafe AI's Jev decision model
  <sub>`Benchmark` · ★0 · jujumilk3 · `Py`</sub>

- **[n8n-nodes-typesafe-ai](https://github.com/DomMonte/n8n-nodes-typesafe-ai)** — n8n community node for the TypeSafe AI System One API — typed yes/no, choice and score questions with calibrated probabilities
  <sub>`Project` · ★0 · dommonte · `TS`</sub>

- **[An early-access test of TypeSafe's Jev: calibrated judgments for half a cent](https://lindfors.no/blog/a-first-look-at-typesafes-jev/)** — The best independent test found: 24 Norwegian documents on one pinned model version, opening with a case the model got wrong while correctly reporting low confidence.
  <sub>`Benchmark` · Lindfors</sub>

</details>

### Model routing

_Pick which downstream model or tier should handle a request._

- **[Cookbook: Structured data extraction cascade](https://docs.typesafe.ai/cookbooks/sde_cascade)** ⭐ — A two-stage mini-then-verify-then-reasoning cascade that reaches most of a big reasoning model's quality at a fraction of the cost.
  <sub>`Official docs` · `Py`</sub>

- **[Pattern: Intent routing](https://docs.typesafe.ai/patterns/intent-routing)** ⭐ — Classify an incoming request and route it to the cheapest adequate handler: deterministic code, a specialist LLM, or a person.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[claude-code-templates: three Jev plugins](https://github.com/davila7/claude-code-templates)** — Three independently installable Claude Code plugins — guardrails, model router and skill suggestion — each with its own hooks and tests.
  <sub>`Plugin` · ★30,899 · `Py` · `TS` · `choice` · `score` · `noul`</sub>

- **[@langchain/typesafe](https://github.com/langchain-ai/langchainjs)** — The JavaScript counterpart of the LangChain integration, with the same classifier and middleware shapes.
  <sub>`Integration` · ★18,214 · `TS` · `choice` · `score` · `noul`</sub>

- **[jev-review](https://github.com/devagrawal09/jev-review)** — Pre-screens code review with Jev to surface high-risk changes for a more expensive model or a person, with a local dashboard.
  <sub>`Project` · ★510 · `TS` · `choice` · `score` · `noul`</sub>

- **[hermes-jev-skills](https://github.com/kerpopule/hermes-jev-skills)** — Nine agent skills plus a CLI covering model routing, memory filtering, turn retention, one-of-many skill selection and next-action choice.
  <sub>`Plugin` · ★408 · `Py` · `choice` · `score` · `noul`</sub>

- **[jev-codex-router](https://github.com/0xNatoshi/jev-codex-router)** — Judges how hard a coding turn is, then picks the model tier, reasoning depth and speed mode to match.
  <sub>`Plugin` · ★188 · `JS` · `choice` · `score`</sub>

- **[jevrouter](https://github.com/BillionsBobby/JevRouter)** — A router for models, tools and subagents.
  <sub>`Project` · ★151 · billionsbobby · `TS`</sub>

- **[jev-eval-agent](https://github.com/vinilana/jev-eval-agent)** — An agent that routes evaluation work through typed decisions.
  <sub>`Project` · ★103 · vinilana · `TS` · ⚠ `no licence`</sub>

- **[jev-use](https://github.com/shitianfang/jev-use)** — An agent plugin that hands steps needing no text output to Jev instead of the main model.
  <sub>`Plugin` · ★15 · shitianfang · `JS`</sub>

- **[pi-jev-router](https://github.com/mejiasd3v/pi-jev-router)** — Automatic model routing for Pi using TypeSafe's Jev through Vercel AI Gateway
  <sub>`Project` · ★12 · mejiasd3v · `JS`</sub>

- **[jev-router](https://github.com/prismhq/jev-router)** — Open-source LLM router that uses TypeSafe's Jev to pick a model, on top of LiteLLM
  <sub>`Project` · ★7 · prismhq · `Py`</sub>

- **[jev-auto-router](https://github.com/miniLV/Jev-Auto-Router)** — Jev Auto Router (Jev Router): experimental per-call GPT model routing for Codex via TypeSafe Jev and a local Responses proxy, with independent task verification.
  <sub>`Plugin` · ★3 · minilv · `TS`</sub>

- **[jev-gate](https://github.com/MongLong0214/jev-gate)** — Not every coding task needs your best model. Experimental Jev-powered model routing for Claude Code — V3 prototype runs today, V4 routes at the task boundary.
  <sub>`Plugin` · ★3 · monglong0214 · `TS` · ⚠ `no licence`</sub>

- **[smart-switch](https://github.com/reycn/smart-switch)** — Reimagined window switcher for macOS using frontier artificial intelligence. Predicted by TypeSafe's Jev model
  <sub>`Project` · ★3 · reycn · `Swift`</sub>

- **[tiershift](https://github.com/iamvatsalpatel/tiershift)** — Shift every LLM call to the cheapest model that can handle it. Routing decided by TypeSafe Jev in ~180 ms. No training data. Policy in plain YAML. TypeScript and Python.
  <sub>`Project` · ★3 · iamvatsalpatel · `TS`</sub>

- **[janus](https://github.com/FirasSX914/Janus)** — Measure when to use Jev and other models on your data, then route accordingly.
  <sub>`Project` · ★2 · firassx914 · `Py`</sub>

- **[jev-codex-pilot](https://github.com/Charlyhno-eng/jev-codex-pilot)** — Smart Codex overlay with JEV model routing, context optimization & Kanban automation. Reduce tokens, keep control
  <sub>`Plugin` · ★2 · charlyhno-eng · `TS`</sub>

- **[hermes-jev-router](https://github.com/ussyverse/hermes-jev-router)** — Experimental Hermes plugin: Jev-assisted model routing plans with budget and capability constraints. API access pending.
  <sub>`Plugin` · ★1 · ussyverse · `Py`</sub>

- **[jev-engineering](https://github.com/eugeniughelbur/jev-engineering)** — The decision layer for AI agents. Typed, calibrated decisions in ~400ms for two hundredths of a cent: gate tool calls, route models, rank options. With the 300-call injection test that found what breaks.
  <sub>`Project` · ★1 · eugeniughelbur · `Py`</sub>

- **[jev-synthetic-survey](https://github.com/jjd-lab/jev-synthetic-survey)** — Jev vs GPT-4.1 as synthetic survey respondents on Twin-2K-500. How you ask mattered more than which model you used.
  <sub>`Project` · ★1 · jjd-lab · `Py`</sub>

- **[Building a Harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev)** — LangChain's explainer and integration walkthrough: the three question types, plus model routing and gating risky tool calls before they run.
  <sub>`Article` · Sydney Runkle, Hunter Lovell · `Py` · ⚠ `vendor numbers`</sub>

- **[Jev AI Use Cases](https://medium.com/data-science-in-your-pocket/jev-ai-use-cases-9a87d57ac3b4)** — Walks through use case after use case — agent routing, an in-agent decision layer, ticket triage — each with a concrete option set and a sample response.
  <sub>`Tutorial` · Mehul Gupta · `Py` · `choice` · ⚠ `paywall`</sub>

- **[langchain-typesafe](https://docs.langchain.com/oss/python/integrations/providers/typesafe)** — The LangChain integration: a classifier plus experimental middleware for model routing and for gating risky tool calls before they run.
  <sub>`Integration` · `Py` · `choice` · `score` · `noul` · ⚠ `early access`</sub>

### Speculative fan-out

_Pack many questions — including speculative ones — into one request and let code pick what mattered._

- **[Cookbook: Parallel questions](https://docs.typesafe.ai/cookbooks/parallel_questions)** ⭐ — A 13-question regulatory briefing over one long article, showing that batching every question into one call is far cheaper and faster with no change in answers.
  <sub>`Official docs` · `Py`</sub>

- **[Pattern: Speculative fan-out](https://docs.typesafe.ai/patterns/fan-out)** ⭐ — Pack many questions, including ones you may not need, into a single request and let your code decide afterwards what was relevant.
  <sub>`Official docs` · `Py`</sub>

- **[Quickstart](https://docs.typesafe.ai/introduction/quickstart)** ⭐ — The canonical first call: one support ticket, one Choice, one Score and one Noul in a single request, in Python, JS and cURL.
  <sub>`Official docs` · `Py` · `TS` · `sh` · `choice` · `score` · `noul`</sub>

- **[AutoGPT TypeSafe blocks](https://github.com/Significant-Gravitas/AutoGPT/tree/master/autogpt_platform/backend/backend/blocks/typesafe)** — Seven production blocks — choice, score, yes/no, ask-many, route, pick-best, filter — with a UTF-8 byte budget, verbatim wire capture and eleven test files.
  <sub>`Project` · ★187,482 · `Py` · `choice` · `score` · `noul`</sub>

- **[sub2api: Jev as a moderation endpoint](https://github.com/Wei-Shaw/sub2api)** — Drops in as a moderation API by asking many parallel Noul questions in one request, one per hazard category, with an anti-injection prefix on every instruction.
  <sub>`Project` · ★42,345 · `Go` · `noul`</sub>

- **[jev-ultrafast](https://github.com/browser-use/jev-ultrafast)** — A high-speed browser agent from Browser Use: Jev decides the operation and which element to act on, and a small LLM is called only when text must be typed.
  <sub>`Project` · ★16,758 · Browser Use · `Py` · `choice` · ⚠ `vendor numbers`</sub>

- **[ai-cookbook: Jev track](https://github.com/daveebbelaar/ai-cookbook)** — A graded course from a first call through each primitive, state shapes and criteria, to ticket triage and a multi-step workflow, mirroring all four official patterns.
  <sub>`Tutorial` · ★4,559 · `Py` · `choice` · `score` · `noul`</sub>

- **[jev-chat: a tool-calling chatbot with no LLM](https://github.com/w3cj/jev-chat)** — A chat bot that does tool calling with no language model anywhere: one request asks the request kind, the tool, and every tool's arguments at once.
  <sub>`Project` · ★86 · `TS` · `choice` · `noul`</sub>

- **[jev-sift](https://github.com/kbhuw/jev-sift)** — Classify first. Read selectively. A portable agent plugin and MCP tool for batch text classification.
  <sub>`Plugin` · ★45 · kbhuw · `JS` · ⚠ `no licence`</sub>

- **[pi-typesafe](https://github.com/DevMortimer/pi-typesafe)** — TypeSafe decisions for Pi: batched evaluation tool, terminal playground, and typed API for extension authors
  <sub>`Plugin` · ★40 · devmortimer · `TS`</sub>

- **[system-one](https://github.com/sgoedecke/system-one)** — Batched single-token choice inference for open language models, compatible with TypeSafe
  <sub>`Project` · ★27 · sgoedecke · `Py` · ⚠ `no licence`</sub>

- **[OneVOneJev](https://github.com/emrickgarrett/OneVOneJev)** — A browser 1v1 FPS where every decision tick judges movement, view angle, aim, fire and jump.
  <sub>`Project` · ★20 · `TS` · `choice` · ⚠ `code untested` `no licence`</sub>

- **[slop-grader](https://github.com/lukstei/slop-grader)** — Jev-powered, rule-based grader for text files. Runs every rule against every line in parallel. No skimming, no missed lines.
  <sub>`Project` · ★13 · lukstei · `TS`</sub>

- **[jev-forge](https://github.com/zwliJay/jev-forge)** — An open training and inference stack for Jev-style decision models. Train models to score dynamic candidate branches from a shared prefix, with support for high-cardinality choice, calibration, and fast batched inference.
  <sub>`Jev-like alternative` · ★11 · zwlijay · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[jevswiftsdk](https://github.com/NSStudent/JevSwiftSDK)** — An independent, type-safe Swift SDK for TypeSafe Jev, with async/await, batching, retries, and SPM support.
  <sub>`SDK` · ★8 · nsstudent · `Swift`</sub>

- **[duckdb-jev](https://github.com/prasanthj/duckdb-jev)** — High-throughput, robust native DuckDB extension for batched and streaming TypeSafe/Jev classification, scoring, and semantic predicates from SQL.
  <sub>`Plugin` · ★3 · prasanthj · `C++`</sub>

- **[jev-tree](https://github.com/reachjalil/jev-tree)** — Recursive Jev choice over a taxonomy. Select from more than 255 options without breaking TypeSafe Jev's choice cap.
  <sub>`Project` · ★3 · reachjalil · `TS`</sub>

- **[jackalope](https://github.com/Jackalope-Dev/jackalope)** — A desktop workspace for coding agents, parallel Git worktrees, and code review.
  <sub>`Project` · ★1 · jackalope-dev · `Rs`</sub>

- **[jev-switchboard](https://github.com/ZIJIAN004/jev-switchboard)** — A JEV-gated semantic communication layer for parallel coding agents.
  <sub>`Project` · ★1 · zijian004 · `JS`</sub>

- **[psearch](https://github.com/komikat/psearch)** — Parallel web search for terminals and agents, with local Chromium and Jev-guided exploration.
  <sub>`Project` · ★1 · komikat · `Py`</sub>

- **[typesafe-showcase](https://github.com/Ashadeepa/typesafe-showcase)** — Next.js UI showing off TypeSafe's System One model (Jev) — parallel Noul judgments and a Choice-based citation checker, deployable to Vercel
  <sub>`Project` · ★1 · ashadeepa · `TS` · ⚠ `no licence`</sub>

- **[A deep dive into Jev, TypeSafe's System One model](https://flaviocopes.com/jev/)** — The densest independent explainer: code in JS, Python and the AI SDK, all three answer shapes, the advanced patterns, and an honest list of where the model fails.
  <sub>`Tutorial` · Flavio Copes · `JS` · `Py` · `TS` · `choice` · `score` · `noul`</sub>

- **[Example: speculative fan-out](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/03-fan-out/main.py)** — Asks for an operation plus a target for each operation it might have picked, so a browser step never needs a second round trip.
  <sub>`Snippet` · `Py` · `choice` · `noul` · ⚠ `code untested`</sub>

- **[Example: three primitives in one request](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/01-three-primitives/main.py)** — A minimal first call asking a choice, a score and a noul together, annotated with the asymmetries that catch people out.
  <sub>`Snippet` · `Py` · `choice` · `score` · `noul` · ⚠ `code untested`</sub>

- **[Jev on Cloudflare Workers AI](https://developers.cloudflare.com/ai/models/typesafe/jev/)** — Workers AI binding and REST samples asking a noul, a choice and a score in one call, with the full response including per-answer confidence.
  <sub>`Integration` · `TS` · `sh` · `noul` · `choice` · `score`</sub>

- **[snake-jev](https://github.com/siroccomask/snake-jev)** — Snake controlled by parallel Jev assessments, with one API call per game tick.
  <sub>`Project` · ★0 · siroccomask · `Py`</sub>

- **[typesafe-image-diffusion](https://github.com/Wizhill05/typesafe-image-diffusion)** — Diffusion-style pixel art out of a general classifier (TypeSafe Jev): 256 parallel pixel questions + refinement passes
  <sub>`Project` · ★0 · wizhill05 · `TS` · ⚠ `no licence`</sub>

- **[Using TypeSafe Jev with the AI SDK](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk)** — The richest Vercel walkthrough: single and multi-question calls, probability-threshold routing, and unit tests with a mock evaluation model.
  <sub>`Tutorial` · `TS` · `noul` · `choice` · `score`</sub>

### Search & ranking

_Score or re-rank candidates from a cheaper retrieval step._

<details>
<summary><b>43</b> rows — click to expand</summary>

- **[Cookbook: Classifying RAG passages](https://docs.typesafe.ai/cookbooks/classifying_rag_passages)** ⭐ — Scores each retrieved passage, then decides in code which reach the answering model — keeping contradictory ones flagged and dropping ones carrying prompt injection.
  <sub>`Official docs` · `Py`</sub>

- **[Cookbook: Line-by-line search](https://docs.typesafe.ai/cookbooks/semantic_find)** ⭐ — Semantic search over a terms-of-service document: one request scores 218 line ids with a Choice, and a Noul checks whether the document answers at all.
  <sub>`Official docs` · `Py` · `choice` · `noul`</sub>

- **[Cookbook: Re-ranking](https://docs.typesafe.ai/cookbooks/rerank_typesafe)** ⭐ — Re-ranks 30-passage BM25 shortlists for 40 legal queries with one question per query-candidate pair, reporting large top-1 and top-10 gains.
  <sub>`Official docs` · `Py`</sub>

- **[AutoGPT TypeSafe blocks](https://github.com/Significant-Gravitas/AutoGPT/tree/master/autogpt_platform/backend/backend/blocks/typesafe)** — Seven production blocks — choice, score, yes/no, ask-many, route, pick-best, filter — with a UTF-8 byte budget, verbatim wire capture and eleven test files.
  <sub>`Project` · ★187,482 · `Py` · `choice` · `score` · `noul`</sub>

- **[OpenViking: retrieval reranking](https://github.com/volcengine/OpenViking)** — One Noul per candidate document in a single batched request, with the yes-probability used directly as the relevance score.
  <sub>`Project` · ★38,384 · `Py` · `noul`</sub>

- **[FastMCP jev_search transform](https://github.com/PrefectHQ/fastmcp/blob/main/fastmcp_slim/fastmcp/experimental/transforms/jev_search.py)** — Two-stage MCP tool search: a wide Choice coarse-ranks the whole catalogue, then a shortlist gets full descriptions plus one Noul each to decide whether it does the job at all.
  <sub>`Project` · ★27,855 · `Py` · `choice` · `noul`</sub>

- **[jcode: memory recall without embeddings](https://github.com/1jehuang/jcode)** — Replaces the whole retrieval stack for memory recall — no embeddings, no BM25, no reranker — with one batched Noul per candidate memory.
  <sub>`Project` · ★19,996 · `Rs` · `noul`</sub>

- **[LanceDB TypeSafeReranker](https://github.com/lancedb/lancedb/blob/main/python/python/lancedb/rerankers/typesafe.py)** — A vector-database reranker that asks one Noul per result and uses the yes-probability as an absolute relevance score, comparable across queries.
  <sub>`Project` · ★11,496 · `Py` · `noul`</sub>

- **[no-mistakes: review context selection](https://github.com/kunchenguid/no-mistakes)** — One Score per candidate file to pick review context, with a measured outcome: materially more billed input for essentially no wall-clock gain.
  <sub>`Benchmark` · ★8,598 · `Go` · `score`</sub>

- **[jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis)** — An Android reply co-pilot that judges intent, timing and risk from on-screen text, while separate models handle OCR and drafting.
  <sub>`Project` · ★1,950 · `Java` · `choice` · `score` · `noul`</sub>

- **[hippo-memory](https://github.com/kitfunso/hippo-memory)** — Biologically-inspired memory for AI agents. Decay, retrieval strengthening, consolidation. Zero runtime deps, SQLite, MCP. Benchmarked retrieval with an opt-in TypeSafe Jev reranker.
  <sub>`Benchmark` · ★752 · kitfunso · `TS`</sub>

- **[jev-search](https://github.com/superagents-lab/jev-search)** — Jev-driven web search: chooses the recency window and the best query rewrite, then reranks results in batches with one noul each.
  <sub>`Project` · ★390 · `TS` · `choice` · `noul`</sub>

- **[pg-jev](https://github.com/realZachi/pg-jev)** — A real PostgreSQL extension exposing the primitives as SQL functions, so a semantic decision can appear in a WHERE clause over any row type.
  <sub>`Project` · ★291 · `Py` · `sh` · `choice` · `score` · `noul`</sub>

- **[jev-mcp](https://github.com/jkudish/jev-mcp)** — A ready-made judgement toolbox for agents: fact verification, content screening, semantic ranking, classification and extraction as separate tools.
  <sub>`Plugin` · ★253 · `JS` · `choice` · `score` · `noul`</sub>

- **[vector-graph-rag](https://github.com/zilliztech/vector-graph-rag)** — Graph RAG with pure vector search, achieving SOTA performance in multi-hop reasoning scenarios.
  <sub>`Project` · ★245 · zilliztech · `Py`</sub>

- **[neurolink](https://github.com/juspay/neurolink)** — One TypeScript interface for 40 AI providers across three inference types — generate, stream, and decide. Decide returns typed, calibrated judgments (boolean/choice/score) via TypeSafe Jev, not text. MCP-native, voice (TTS/STT/realtime), RAG, memory, file processors. Powers Tara, Yama and Clair
  <sub>`Plugin` · ★137 · juspay · `TS`</sub>

- **[jev-semgrep](https://github.com/uehaj/jev-semgrep)** — grep by meaning, across languages. TypeSafe Jev scores every line against a meaning; combine meanings with AND/OR/NOT. 意味で探す grep。日本語で英語を、英語で日本語を検索できる
  <sub>`Project` · ★125 · uehaj · `JS` · ⚠ `no licence`</sub>

- **[skillranker](https://github.com/Dicklesworthstone/skillranker)** — Ranks an agent's skills for the next step using live session context, with Claude Code hooks.
  <sub>`Plugin` · ★110 · dicklesworthstone · `Rs` · ⚠ `no licence`</sub>

- **[jev-shell-history](https://github.com/mrnugget/jev-shell-history)** — Fish-style zsh history autosuggestions, ranked by Jev rather than by recency.
  <sub>`Project` · ★96 · mrnugget · `TS` · ⚠ `no licence`</sub>

- **[neo4jev](https://github.com/jexp/neo4jev)** — Puts Jev inside a knowledge graph traversal: at each node it decides which edge is most worth following.
  <sub>`Project` · ★83 · `Py` · `choice`</sub>

- **[jegrep](https://github.com/can1357/jegrep)** — Semantic grep: find code by describing what you're looking for, powered by Jev.
  <sub>`Project` · ★76 · can1357 · `Rs`</sub>

- **[Blink](https://github.com/ellipsis-dev/blink)** — Uses Jev as a codebase navigator: at each directory level it decides which files are most relevant to the question, then descends.
  <sub>`Project` · ★56 · `TS` · `choice` · ⚠ `no licence`</sub>

- **[jev-social](https://github.com/socai-io/jev-social)** — Social-platform research with typed routing and browser evidence.
  <sub>`Project` · ★46 · socai-io · `JS`</sub>

- **[jev-recall](https://github.com/samdotmak/jev-recall)** — Retrieve by relevance, not resemblance: filter an AI assistant's memories with TypeSafe's Jev
  <sub>`Project` · ★31 · samdotmak · `TS`</sub>

- **[pi-jev-skill-picker](https://github.com/safzanpirani/pi-jev-skill-picker)** — Rank Pi Agent Skills for the current task with TypeSafe Jev
  <sub>`Plugin` · ★25 · safzanpirani · `TS`</sub>

- **[jgrep](https://github.com/keltokhy/jgrep)** — grep, but the pattern is a description. Filters lines by meaning with TypeSafe's Jev decision model: ~200 ms and a thousandth of a cent per line.
  <sub>`Project` · ★17 · keltokhy · `Py`</sub>

- **[jev-rag-benchmark](https://github.com/erendikmenn/jev-rag-benchmark)** — Reproducible benchmark for measuring Jev reranking quality, latency, and cost in RAG
  <sub>`Benchmark` · ★14 · erendikmenn · `Py`</sub>

- **[hermes-jev](https://github.com/keeltrace/hermes-jev)** — Typed System One decisions, ranking, verification, and an opt-in Hermes tool gate using TypeSafe Jev.
  <sub>`Project` · ★12 · keeltrace · `Py`</sub>

- **[jevql](https://github.com/kylemclaren/jevql)** — Semantic SQL for Postgres, powered by Jev
  <sub>`Project` · ★11 · kylemclaren · `Go`</sub>

- **[every](https://github.com/sufianetaouil/every)** — Ask a yes/no question of every function in a codebase. Ranked answers in seconds, for cents. Grep whose pattern is a question, powered by TypeSafe Jev.
  <sub>`Project` · ★5 · sufianetaouil · `Py`</sub>

- **[jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench)** — An independent head-to-head against dedicated rerankers across fourteen datasets.
  <sub>`Benchmark` · ★5 · anessbelbati · `Py`</sub>

- **[jev-nlgrep](https://github.com/YehuiTang0316/jev-nlgrep)** — Search code and text by meaning with natural-language grep, powered by Jev.
  <sub>`Project` · ★4 · yehuitang0316 · `TS`</sub>

- **[jev-assist](https://github.com/glud123/jev-assist)** — Don't burn your expensive main model on grep-and-guess grunt work — let jev rank the whole repo, and save the main model for reading the right files and writing the right code.
  <sub>`Project` · ★3 · glud123 · `JS`</sub>

- **[jev-skill-gate](https://github.com/ShivamPansuriya/jev-skill-gate)** — Cut Claude Code's skill manifest by ~75% with TypeSafe Jev. Scores every installed skill for relevance and hides the rest via skillOverrides — 12,750 → 3,185 tokens on a 217-skill install, for $0.0009 a session.
  <sub>`Plugin` · ★3 · shivampansuriya · `JS`</sub>

- **[llama-index-jev](https://github.com/WiktorB2004/llama-index-jev)** — LlamaIndex reranker + router powered by TypeSafe Jev — typed scores/choices, cheaper than LLM-as-judge.
  <sub>`Project` · ★3 · wiktorb2004 · `Py`</sub>

- **[jev-reranker](https://github.com/shinpr/jev-reranker)** — Rerank, filter, and compress JSON search results with TypeSafe AI's Jev.
  <sub>`Project` · ★2 · shinpr · `Rs`</sub>

- **[jev-starter](https://github.com/hamakyo/jev-starter)** — Typed, policy-driven decision workflows on top of TypeSafe AI Jev: confidence routing, fallbacks, evaluation, and RAG patterns for TypeScript apps.
  <sub>`Plugin` · ★2 · hamakyo · `TS`</sub>

- **[typesafe-as-a-judge](https://github.com/E-FL/typesafe-as-a-judge)** — Unofficial community MCP plugin for Codex and Claude Code using TypeSafe Jev for bounded routing, ranking, extraction, verification, and escalation
  <sub>`Plugin` · ★2 · e-fl · `JS`</sub>

- **[typesafe-mod](https://github.com/BeLazy167/typesafe-mod)** — Claude Code mod that routes decisions to TypeSafe's Jev model: ranks installed skills per prompt, and answers the agent's own this-or-that questions when confident.
  <sub>`Plugin` · ★2 · belazy167 · `TS`</sub>

- **[jev-engineering](https://github.com/eugeniughelbur/jev-engineering)** — The decision layer for AI agents. Typed, calibrated decisions in ~400ms for two hundredths of a cent: gate tool calls, route models, rank options. With the 300-call injection test that found what breaks.
  <sub>`Project` · ★1 · eugeniughelbur · `Py`</sub>

- **[jev-bfs](https://github.com/komikat/jev-bfs)** — Wikipedia link races with direct Jev ranking and a live terminal display.
  <sub>`Project` · ★0 · komikat · `Py`</sub>

- **[jev-orderby-bench](https://github.com/yodablocks/jev-orderby-bench)** — Does ORDER BY over a Jev probability put rows in a defensible order? Independent ranking, calibration and invariant measurements of TypeSafe AI's Jev: passes six pre-registered gates on 360 labeled rows, fails four of six on graded product relevance.
  <sub>`Benchmark` · ★0 · yodablocks · `Py`</sub>

- **[jevgrep](https://github.com/allebee/jevgrep)** — grep by meaning: pipe in any text, ask a yes/no question in plain English, get only the matching lines. Works behind tail -f, about $0.004 per 1,000 lines, powered by TypeSafe's Jev.
  <sub>`Project` · ★0 · allebee · `Py`</sub>

</details>

### Structured extraction

_Pull typed fields out of messy text by choosing among candidates rather than generating them._

- **[Cookbook: Date extraction](https://docs.typesafe.ai/cookbooks/date_extraction_cookbook)** ⭐ — Extracts absolute and relative dates by asking for the parts a document names, then resolving and validating them in code with confidence-based review.
  <sub>`Official docs` · `Py`</sub>

- **[Cookbook: Pre-parsed value extraction](https://docs.typesafe.ai/cookbooks/pre_parsed_value_extraction_cookbook)** ⭐ — Regexes find candidate emails, phone numbers and amounts; the model selects the requested span so code can normalise a verbatim value.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Structure recovery](https://docs.typesafe.ai/cookbooks/autoformat)** ⭐ — Reconstructs Markdown from plain text that lost its formatting, in two requests: one restitches hard-wrapped lines, one classifies every block.
  <sub>`Official docs` · `Py`</sub>

- **[Cookbook: Structured data extraction cascade](https://docs.typesafe.ai/cookbooks/sde_cascade)** ⭐ — A two-stage mini-then-verify-then-reasoning cascade that reaches most of a big reasoning model's quality at a fraction of the cost.
  <sub>`Official docs` · `Py`</sub>

- **[jev-reviewer](https://github.com/choxos/jev-reviewer)** — Data extraction for systematic reviews, quoted from the papers. Ask a trial report and its supplements your extraction form or a RoB 2, ROBINS-I, QUADAS-2 or TIDieR template; Jev points at the lines, every answer is a verbatim quote with its page, you check it and export the table. Files stay i
  <sub>`Project` · ★32 · choxos · `JS`</sub>

- **[jev-macos-loop](https://github.com/jcpsimmons/jev-macos-loop)** — Open-source macOS AI computer use and native GUI automation on Apple silicon. Jev + OmniParser CoreML + Apple Vision OCR. Bring your own OpenRouter, Vercel AI Gateway, or TypesafeAI token.
  <sub>`Project` · ★19 · jcpsimmons · `JS`</sub>

- **[jeveryword](https://github.com/jkrup/jeveryword)** — Text extraction with Jev: field extraction, PII detection and exact quotes, built on TypeSafe's Jev.
  <sub>`Project` · ★4 · jkrup · `JS`</sub>

- **[jev-mcp-dispatcher](https://github.com/abhishekashokvkumar/jev-mcp-dispatcher)** — Natural-language MCP tool dispatcher powered entirely by TypeSafe's Jev — no general-purpose LLM. Discovers a simple MCP server's tool signatures at runtime and uses Jev's typed primitives (Choice/Noul) to pick the right tool and extract its arguments straight out of the sentence.
  <sub>`Plugin` · ★3 · abhishekashokvkumar · `Py` · ⚠ `no licence`</sub>

- **[jev-information-extraction](https://github.com/abhishekmamdapure/jev-information-extraction)** — Parsing the PDF and extracting the relevant information
  <sub>`Project` · ★2 · abhishekmamdapure · `Py` · ⚠ `no licence`</sub>

- **[jevsume](https://github.com/unownone/jevsume)** — ATS-friendly resume review powered by Jev (TypeSafe System One). The frontend extracts resume text the way a parser would, then a Cloudflare Worker runs typed JEV questions and composes a JevScore.
  <sub>`Project` · ★2 · unownone · `TS` · ⚠ `no licence`</sub>

- **[typesafe-ai-jev-example](https://github.com/ItBayMax/typesafe-ai-jev-example)** — Hands-on demos for TypeSafe's Jev (System One) model: six runnable examples and four field notes. Runs offline with no API key; samples/ holds real measured output from jev-1.13.0.
  <sub>`Project` · ★2 · itbaymax · `Py`</sub>

- **[smoking-extraction-benchmark](https://github.com/vclic/smoking-extraction-benchmark)** — Synthetic smoking-history extraction benchmark comparing TypeSafe Jev and OpenAI structured outputs, with reproducible accuracy, cost, and latency results.
  <sub>`Benchmark` · ★0 · vclic · `Py` · ⚠ `no licence`</sub>

### Classification

_Put an item into a taxonomy, including deep hierarchies walked with probabilities._

<details>
<summary><b>82</b> rows — click to expand</summary>

- **[Cookbook: Classification using confidence](https://docs.typesafe.ai/cookbooks/classification_using_confidence)** ⭐ — Classifies annual reports into 75 industry groups, then reads the answer's own confidence to decide whether to report that group or the broader division above it.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Hierarchical classification](https://docs.typesafe.ai/cookbooks/hierarchical_classification)** ⭐ — Walks deep patent, retail, biomedical and source-code taxonomies with a parallel beam search over Choice probabilities.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Cookbook: Knowledge graph entity alignment](https://docs.typesafe.ai/cookbooks/entity_alignment)** ⭐ — Decides which of 450 candidate pairs from two product catalogues describe the same thing, with one Score whose three levels are the three available actions.
  <sub>`Official docs` · `Py` · `score`</sub>

- **[Cookbook: Structure recovery](https://docs.typesafe.ai/cookbooks/autoformat)** ⭐ — Reconstructs Markdown from plain text that lost its formatting, in two requests: one restitches hard-wrapped lines, one classifies every block.
  <sub>`Official docs` · `Py`</sub>

- **[worldmonitor: news threat classification](https://github.com/koala73/worldmonitor)** — Two Choice questions over threat level and category, held in shadow mode after a blind evaluation found Jev merely tied the incumbent model.
  <sub>`Benchmark` · ★87,191 · `TS` · `choice` · ⚠ `shadow mode`</sub>

- **[json-render](https://github.com/vercel-labs/json-render)** — Vercel Labs' generative UI framework. In its Jev experiment the model does not write JSON token by token — it only picks components, props and layout.
  <sub>`Project` · ★17,994 · Vercel Labs · `TS` · `choice`</sub>

- **[Inbox Zero: seven email decisions](https://github.com/elie222/inbox-zero)** — Seven distinct email decisions, each with its own separately chosen threshold, falling back to the normal LLM on any error.
  <sub>`Project` · ★12,278 · `TS` · `choice` · `noul`</sub>

- **[classifier-dev](https://github.com/mrmps/classifier-dev)** — Zero-shot text classification over plain HTTP — no API key, no account. One Cloudflare Worker, a CLI, and an MCP server. https://classifier.dev
  <sub>`Plugin` · ★409 · mrmps · `TS`</sub>

- **[tax-doc-classifier](https://github.com/kyotofin/tax-doc-classifier)** — Tax document page classifier built on Jev decisions. 100% strict accuracy across 261 IRS forms, ~$0.001 per page.
  <sub>`Project` · ★361 · kyotofin · `TS`</sub>

- **[pg-jev](https://github.com/realZachi/pg-jev)** — A real PostgreSQL extension exposing the primitives as SQL functions, so a semantic decision can appear in a WHERE clause over any row type.
  <sub>`Project` · ★291 · `Py` · `sh` · `choice` · `score` · `noul`</sub>

- **[jev-mcp](https://github.com/jkudish/jev-mcp)** — A ready-made judgement toolbox for agents: fact verification, content screening, semantic ranking, classification and extraction as separate tools.
  <sub>`Plugin` · ★253 · `JS` · `choice` · `score` · `noul`</sub>

- **[docjev](https://github.com/jerryjliu/docjev)** — A very fast document classifier/splitter using Jev
  <sub>`Project` · ★207 · jerryjliu · `Py`</sub>

- **[Probing Jev's behaviour with repeated API calls](https://github.com/ahastudio/til)** — Independent Korean-language notes reporting that reversing the order of options shifted a probability enough to flip a 0.9 threshold.
  <sub>`Benchmark` · ★190 · `Py` · ⚠ `no licence` `unverified`</sub>

- **[unclutter](https://github.com/kitze/unclutter)** — A browser extension that removes page clutter, with reusable template rules.
  <sub>`Project` · ★181 · kitze · `TS`</sub>

- **[perch: semantic code linting](https://github.com/lakeday-org/perch)** — Tree-sitter finds and ranks methods, then user-authored YAML rules compile into nouls, with severity read as the rubric's expected value rather than the top band.
  <sub>`Project` · ★168 · `JS` · `choice` · `score` · `noul`</sub>

- **[taskuary](https://github.com/ldbumble/taskuary)** — Automate your job: local-first AI task hub. Email, Teams, Slack & reports -> one timeline -> AI triage -> your coding agents (Claude Code, Codex, Gemini) do the work, you approve.
  <sub>`Plugin` · ★117 · ldbumble · `Py`</sub>

- **[pg_typesafe](https://github.com/giuliosmall/pg_typesafe)** — Pre-alpha PostgreSQL extension for TypeSafe AI (Jev) categorical classification
  <sub>`Plugin` · ★81 · giuliosmall · `C`</sub>

- **[youtube-sponsor-detection](https://github.com/trungdq88/youtube-sponsor-detection)** — Detect youtube sponsor segment with live audio and transcript powered by Jev
  <sub>`Project` · ★81 · trungdq88 · `JS` · ⚠ `no licence`</sub>

- **[Prism](https://github.com/irfndi/prism-liquidity-agent)** — Does not place orders. It judges market conditions such as toxic flow and mean reversion, and hands the assessment to the existing strategy.
  <sub>`Project` · ★71 · `TS` · `choice` · `score`</sub>

- **[typesafe-adblock](https://github.com/realZachi/typesafe-adblock)** — A Chrome extension that asks whether a DOM element is an advert.
  <sub>`Project` · ★68 · realzachi · `JS`</sub>

- **[Blink](https://github.com/ellipsis-dev/blink)** — Uses Jev as a codebase navigator: at each directory level it decides which files are most relevant to the question, then descends.
  <sub>`Project` · ★56 · `TS` · `choice` · ⚠ `no licence`</sub>

- **[ha-jev](https://github.com/AboveColin/HA-Jev)** — A Home Assistant integration: typed answers as sensors, with actions for automations.
  <sub>`Integration` · ★45 · abovecolin · `Py`</sub>

- **[jev-sift](https://github.com/kbhuw/jev-sift)** — Classify first. Read selectively. A portable agent plugin and MCP tool for batch text classification.
  <sub>`Plugin` · ★45 · kbhuw · `JS` · ⚠ `no licence`</sub>

- **[commit-miner](https://github.com/devanshbatham/commit-miner)** — Classify Git commit diffs and messages with Jev. Bug fixes, security fixes/CWEs, and change types.
  <sub>`Project` · ★33 · devanshbatham · `Rs` · ⚠ `no licence`</sub>

- **[jev-calibrate](https://github.com/smkrv/jev-calibrate)** — Calibrate Jev questions against your own labels: tune criteria on labelled examples, confirm on a held-out set, get a verdict per question. Unofficial.
  <sub>`Project` · ★31 · smkrv · `TS`</sub>

- **[SemDecide](https://github.com/sharziki/semdecide)** — Jev as a command-line tool: classify, score and filter straight from a shell, for crawlers, CI and data pipelines.
  <sub>`Plugin` · ★31 · `Py` · `sh` · `choice` · `score` · `noul`</sub>

- **[jev-column-race](https://github.com/goodrahstar/jev-column-race)** — Jev vs Gemini 3.8 Flash: labelling 1,000 app reviews, 4.1× faster and 7× cheaper
  <sub>`Project` · ★22 · goodrahstar · `JS`</sub>

- **[jev-mcp](https://github.com/blakestone-x/jev-mcp)** — An MCP server exposing classify, score, check, match and screen to any agent.
  <sub>`Plugin` · ★18 · blakestone-x · `Py`</sub>

- **[x-scanner](https://github.com/oso95/x-scanner)** — Chrome extension that labels every post you scroll past on X with typed Jev judgments and a live cost counter
  <sub>`Plugin` · ★15 · oso95 · `TS`</sub>

- **[jev-mail-classifier](https://github.com/parth-kp/jev-mail-classifier)** — Classify your inbox with Jev (TypeSafe's System One model) — tag, move, flag, and notify, all config-driven.
  <sub>`Project` · ★14 · parth-kp · `Py`</sub>

- **[jevframe](https://github.com/ktaletsk/jevframe)** — Semantic AI for pandas and Polars: classify text, analyze sentiment, and score DataFrame rows with natural-language questions and full probabilities using TypeSafe Jev.
  <sub>`Project` · ★12 · ktaletsk · `Py`</sub>

- **[evoke](https://github.com/evoke-build/evoke)** — Software, by reflex. A sentence becomes a call of a small program, chosen by Jev, TypeSafe AI's classifier, and run only when it is sure enough. Reflexes are recipes anyone can write, share and improve. A CLI you talk to, a package manager for reflexes from git, and a TypeScript SDK.
  <sub>`Project` · ★10 · evoke-build · `Rs`</sub>

- **[jevlogs](https://github.com/reachjalil/jevlogs)** — Open-source Jev log triage for OpenTelemetry. Score the signal before expensive LLM analysis.
  <sub>`Project` · ★9 · reachjalil · `JS`</sub>

- **[sift](https://github.com/bohutang/sift)** — Chrome extension that labels every post on X (Substance · Humor · Chit-chat · Promo · Junk · AI-written) with TypeSafe Jev, and hides the ones you don't want.
  <sub>`Plugin` · ★9 · bohutang · `JS`</sub>

- **[jev-dsl](https://github.com/inanna-malick/jev-dsl)** — Agent-first Haskell DSL for TypeSafe's Jev judgment model: typed packets, inferred types, answers under the same labels
  <sub>`Project` · ★7 · inanna-malick · `Hs`</sub>

- **[augustus](https://github.com/24601/Augustus)** — Agent skill for the decision-model class (classifiers, encoders/decoders, specialized AR heads, System One). TypeSafe Jev is the dominant exemplar. Composition algebra, question design, validation gates. MIT.
  <sub>`Plugin` · ★6 · 24601 · `Py`</sub>

- **[jev-agent-browser](https://github.com/forvela/jev-agent-browser)** — Fast, bounded browser agents powered by Jev and agent-browser — typed actions, research, classification, and safe orchestration.
  <sub>`Project` · ★6 · forvela · `JS`</sub>

- **[agi-jev-containment](https://github.com/carlosedm10/agi-jev-containment)** — AGI JEV Detection — local AI agent monitor: chain-level malicious-agent detection (TypeSafe Jev + Sentinel), escalate-only L1–L5 containment, Neo4j forensics, AngryRobot dashboard. HackSpain 2026.
  <sub>`Project` · ★4 · carlosedm10 · `Py` · ⚠ `no licence`</sub>

- **[jev-code](https://github.com/FrancoisChastel/jev-code)** — Jev, TypeSafe's System One classifier, as a tool inside Claude Code, Codex, Pi, and OpenCode: typed classify, check, score, rank, and ask, plus one-command setup.
  <sub>`Plugin` · ★4 · francoischastel · `TS`</sub>

- **[jeveryword](https://github.com/jkrup/jeveryword)** — Text extraction with Jev: field extraction, PII detection and exact quotes, built on TypeSafe's Jev.
  <sub>`Project` · ★4 · jkrup · `JS`</sub>

- **[one-system](https://github.com/rawwerks/one-system)** — Use local and hosted classifiers aka decision models aka Jev-like models, all through a single TypeSafe API
  <sub>`Jev-like alternative` · ★4 · rawwerks · `TS` · ⚠ `not Jev`</sub>

- **[agent-fastpath](https://github.com/abhishekswe/agent-fastpath)** — Jev MCP server: a decision layer for coding agents, built on TypeSafe Jev (System One model). Ship gates, risk checks, file triage that keeps files out of context, and a safe headless browser, with calibrated confidence. For Claude Code, Codex, Cursor.
  <sub>`Plugin` · ★3 · abhishekswe · `TS`</sub>

- **[duckdb-jev](https://github.com/prasanthj/duckdb-jev)** — High-throughput, robust native DuckDB extension for batched and streaming TypeSafe/Jev classification, scoring, and semantic predicates from SQL.
  <sub>`Plugin` · ★3 · prasanthj · `C++`</sub>

- **[jev-document-classification](https://github.com/Charlyhno-eng/jev-document-classification)** — JEV Document Classification enables the rapid and cost-effective classification of text-based documents using AI, leveraging TypeSafe's "System One" model.
  <sub>`Project` · ★3 · charlyhno-eng · `TS`</sub>

- **[jev-skip](https://github.com/valentynkit/jev-skip)** — Skips video sponsor segments by reading the captions and deciding at watch time.
  <sub>`Project` · ★3 · valentynkit · `TS`</sub>

- **[jev-tree](https://github.com/reachjalil/jev-tree)** — Recursive Jev choice over a taxonomy. Select from more than 255 options without breaking TypeSafe Jev's choice cap.
  <sub>`Project` · ★3 · reachjalil · `TS`</sub>

- **[local-jev](https://github.com/amithgc/local-jev)** — A local, offline System One server compatible with TypeSafe's Jev API. It answers typed yes/no, category and score questions with small open models.
  <sub>`Project` · ★3 · amithgc · `Py`</sub>

- **[jev-chess](https://github.com/hemanth/jev-chess)** — Chess moves, evaluations, persona opponents, and game classification with TypeSafe AI System One
  <sub>`Project` · ★2 · hemanth · `TS` · ⚠ `no licence`</sub>

- **[jev-for-engineers](https://github.com/Foadsf/jev-for-engineers)** — Eight minimal working examples of TypeSafe's Jev (a System One model) applied to mechanical and electrical engineering: CAD/CAE/CAM routing, FEM result triage, DFM screening, BOM alignment, hallucination-proof extraction. Zero dependencies.
  <sub>`Project` · ★2 · foadsf · `Py`</sub>

- **[jev-ids](https://github.com/jev-ids/jev-ids)** — Blazing-Fast Token-Efficient Intrusion Detection System (IDS) based on TypeSafe's Jev
  <sub>`Project` · ★2 · jev-ids · `Py`</sub>

- **[jev-mcp-server](https://github.com/wangkuangkuang/jev-mcp-server)** — MCP server for Jev (TypeSafe System One): the three official question types — choice, score, noul — plus batch classify. Calibrated probabilities, ~0.5s, <$0.001/call.
  <sub>`Plugin` · ★2 · wangkuangkuang · `Py`</sub>

- **[jev-mode](https://github.com/ddfeyes/jev-mode)** — I kept watching coding agents burn context on decisions that aren't hard - triage 400 tickets, tag 600 files, route to one of six teams. jev-mode moves those verdicts to a typed-judgment model. I A/B'd it: 78% fewer tokens, 16x less work-attributable input, accuracy 96.1% vs 93.7%. Python, no d
  <sub>`Project` · ★2 · ddfeyes · `Py`</sub>

- **[jev-resilience](https://github.com/Vicente-MD/jev-resilience)** — Non-blocking Spring Boot Starter for Spring WebFlux that implements a Semantic Circuit Breaker to detect silent HTTP 200 failures using TypeSafe Jev.
  <sub>`Plugin` · ★2 · vicente-md · `Java` · ⚠ `no licence`</sub>

- **[watfile](https://github.com/jexp/watfile)** — Text/PDF - File categorization and sorting with Typesafe AI Jev or local calibrated decision model
  <sub>`Project` · ★2 · jexp · `Py` · ⚠ `no licence`</sub>

- **[zerosweep](https://github.com/sysadarsh/zerosweep)** — Autonomous System-One Triage Engine & Benchmark powered by TypeSafe AI (Jev). 75ms inference, $0 output tokens, and RLCD epistemic safety gates.
  <sub>`Benchmark` · ★2 · sysadarsh · `TS` · ⚠ `no licence`</sub>

- **[dsh-jev-decide](https://github.com/nanami-0713/dsh-jev-decide)** — DSH plugin: register TypeSafe Jev (System One decision model) as an agent tool — jev_decide returns calibrated probabilities (noul/choice/score) for routing/triage/guardrail judgments, no text generation. 把 TypeSafe Jev 决策模型注册为 DSH agent 工具
  <sub>`Plugin` · ★1 · nanami-0713 · `JS`</sub>

- **[hush](https://github.com/emreozyoruk/hush)** — Issue triage that stays quiet when it isn't sure. Calibrated labels, spam and duplicate detection — with abstention.
  <sub>`Project` · ★1 · emreozyoruk · `JS`</sub>

- **[Jev by Example](https://github.com/ReallyArtificial/jev-by-example)** — Ten runnable JavaScript agent decisions, one file each: reconciling a new memory against a stored one, gating whether an HTTP 200 really satisfied the task, retry vs. reconcile after an uncertain write, scoring context against a budget, checking a handoff for dropped prohibitions.
  <sub>`Project` · ★1 · Really Artificial · `JS` · `choice` · `score` · `noul` · ⚠ `one commit` `AI-written`</sub>

- **[jev-eval](https://github.com/4esv/jev-eval)** — Benchmark TypeSafe Jev against any OpenRouter model on your own labelled classification data: accuracy, calibration, latency, cost
  <sub>`Benchmark` · ★1 · 4esv · `Py` · ⚠ `no licence`</sub>

- **[jev-issue-radar](https://github.com/Patrick-SCH03/jev-issue-radar)** — GitHub issue triage with side-by-side evidence. Try the public sample without setup, or run the local app with TypeSafe Jev via OpenRouter.
  <sub>`Project` · ★1 · patrick-sch03 · `JS`</sub>

- **[jev-logtriage](https://github.com/jyatesdotdev/jev-logtriage)** — Jev decides whether a batch of logs is worth acting on. Typed questions, confidence gates, nothing executed.
  <sub>`Project` · ★1 · jyatesdotdev · `Py`</sub>

- **[jev-playwright-mcp](https://github.com/krw82/jev-playwright-mcp)** — Jev-augmented Playwright MCP proxy — page-state triage, prompt-injection shielding, goal-based snapshot pruning, risky-action gating. Drop-in wrapper around @playwright/mcp for any coding agent.
  <sub>`Plugin` · ★1 · krw82 · `TS`</sub>

- **[jev-review-action](https://github.com/fatwang2/jev-review-action)** — Configurable GitHub submission review and PR classification with TypeSafe Jev. No text-generation model.
  <sub>`Project` · ★1 · fatwang2 · `JS`</sub>

- **[jev-triage](https://github.com/cephalization/jev-triage)** — Uses typeful jev, zero sync to pull and sync large repositories for issue triage
  <sub>`Project` · ★1 · cephalization · `TS`</sub>

- **[jevticktrouter](https://github.com/GhrezaKh74/JevTicktRouter)** — A .NET 10 and React 19 application for fast, structured AI-powered ticket triage using TypeSafe Jev.
  <sub>`Project` · ★1 · ghrezakh74 · `C#` · ⚠ `no licence`</sub>

- **[metis](https://github.com/Ayush0054/metis)** — Metis: automatic GitHub issue triage powered by TypeSafe AI Jev. A reusable GitHub Action.
  <sub>`Project` · ★1 · ayush0054 · `Py`</sub>

- **[triagedy](https://github.com/m0rphtail/triagedy)** — Alert triage as a UNIX filter: JSONL security alerts in, typed decisions out. Runs on TypeSafe Jev or a local model; policy routing stays in code.
  <sub>`Project` · ★1 · m0rphtail · `Rs`</sub>

- **[discoprint](https://github.com/lirantal/discoprint)** — Classify an artist's discography by theme, mood, and lyrical complexity with Jev (TypeSafe AI), and view it as a colorful terminal dashboard
  <sub>`Project` · ★0 · lirantal · `JS`</sub>

- **[github-issue-classification-using-jev](https://github.com/KalyanM45/GitHub-Issue-Classification-Using-Jev)** — This repository contains a GitHub issue classifier built on Jev, TypeSafe AI's System One model. It labels every new issue with typed values and calibrated confidence in milliseconds, labelling what it is sure about and escalating what it is not. Three guardrail layers guard every write, and a
  <sub>`Project` · ★0 · kalyanm45 · `Py`</sub>

- **[jev-agent-skill](https://github.com/yuyang2230/jev-agent-skill)** — Free typed judgments for AI agents: offload classify/screen/score/verify to Jev (TypeSafe System One) via OpenCode Zen. Claude Code / ZCode skill. 给AI代理省token的免费决策分流技能
  <sub>`Plugin` · ★0 · yuyang2230 · `Py`</sub>

- **[jev-secret-detection](https://github.com/teyhouse/jev-secret-detection)** — Measures how well TypeSafe's RLCD-Jev model spots real secret credentials in file snippets
  <sub>`Benchmark` · ★0 · teyhouse · `Py` · ⚠ `no licence`</sub>

- **[jev-trace-classifier](https://github.com/sypherin/jev-trace-classifier)** — Application of TypeSafe Jev (noul judgment primitive) on the collusion.wiki corpus: agent vs human page authorship, head-to-head vs local Qwen3.8-Flash-Next
  <sub>`Benchmark` · ★0 · sypherin · `Py`</sub>

- **[n8n-nodes-jev-classification](https://github.com/khmuhtadin/n8n-nodes-jev-classification)** — n8n community node for Jev by TypeSafe AI: classify, score and check text with calibrated probabilities. Parallel requests and multi-item batching.
  <sub>`Project` · ★0 · khmuhtadin · `TS`</sub>

- **[omp-jevens-classifier](https://github.com/STRML/omp-jevens-classifier)** — Jev-powered model-judged permission gate for OMP (TypeSafe System One)
  <sub>`Project` · ★0 · strml · `TS` · ⚠ `archived`</sub>

- **[progressgate](https://github.com/AshutoshVJTI/progressgate)** — Detect semantic stagnation in AI agent loops
  <sub>`Project` · ★0 · ashutoshvjti · `TS`</sub>

- **[pulselane](https://github.com/ndolinschi/pulselane)** — PulseLane — clinic triage decisions via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[typesafe-image-diffusion](https://github.com/Wizhill05/typesafe-image-diffusion)** — Diffusion-style pixel art out of a general classifier (TypeSafe Jev): 256 parallel pixel questions + refinement passes
  <sub>`Project` · ★0 · wizhill05 · `TS` · ⚠ `no licence`</sub>

- **[typesafe-triage-guard](https://github.com/shivam2003-dev/typesafe-triage-guard)** — Three composable judgment pipelines on TypeSafe's Jev: support-ticket triage, observability alert triage, and a deploy-risk gate.
  <sub>`Project` · ★0 · shivam2003-dev · `Py`</sub>

- **[An early-access test of TypeSafe's Jev: calibrated judgments for half a cent](https://lindfors.no/blog/a-first-look-at-typesafes-jev/)** — The best independent test found: 24 Norwegian documents on one pinned model version, opening with a case the model got wrong while correctly reporting low confidence.
  <sub>`Benchmark` · Lindfors</sub>

- **[Jev - The Ultimate Classification Model?](https://youtube.com/watch?v=X117w2Rark8)** — An ML engineer's walkthrough from the classification-task angle, which is the framing closest to what the model actually does.
  <sub>`Video` · Sam Witteveen</sub>

- **[jevai.org community showcase cases](https://www.jevai.org/cases)** — Nine worked community scenarios: intent routing, invoice classification, news filtering, product tagging, moderation, claim verification, CSV validation and more.
  <sub>`Project` · ⚠ `unverified`</sub>

- **[Testing TypeSafe Jev, Mistral and Gemini for local event validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation)** — The only three-way head-to-head found, with each model's prompt tuned separately and the scope limited to one task rather than a general ranking.
  <sub>`Benchmark` · Near Here</sub>

</details>

### ML feature extraction

_Turn free text into numeric features for a classical downstream model._

- **[Cookbook: Autoresearch feature discovery](https://docs.typesafe.ai/cookbooks/autoresearch_feature_discovery)** ⭐ — An autoresearch loop that proposes questions, turns free text into numeric features, and uses model error to improve a supervised gradient-boosting regressor.
  <sub>`Official docs` · `Py`</sub>

- **[nimble](https://github.com/bespokelabsai/nimble)** — Local typed decisions, contrastive data curation, and model evaluation.
  <sub>`Project` · ★1,543 · bespokelabsai · `Py` · ⚠ `no licence`</sub>

- **[jev-align](https://github.com/sutro-sh/jev-align)** — Builds calibrated decision functions from human feedback.
  <sub>`Project` · ★271 · sutro-sh · `Py`</sub>

- **[Prism](https://github.com/irfndi/prism-liquidity-agent)** — Does not place orders. It judges market conditions such as toxic flow and mean reversion, and hands the assessment to the existing strategy.
  <sub>`Project` · ★71 · `TS` · `choice` · `score`</sub>

- **[jev-curate](https://github.com/AkashPriyadarshii/jev-curate)** — Curates training data: JSONL and Parquet rows are judged on quality, relevance and risk before deciding what reaches downstream training.
  <sub>`Project` · ★21 · `Rs` · `score` · `noul`</sub>

- **[tiershift](https://github.com/iamvatsalpatel/tiershift)** — Shift every LLM call to the cheapest model that can handle it. Routing decided by TypeSafe Jev in ~180 ms. No training data. Policy in plain YAML. TypeScript and Python.
  <sub>`Project` · ★3 · iamvatsalpatel · `TS`</sub>

- **[jev-board-lab](https://github.com/WebGrga/jev-board-lab)** — Interactive explorer and Jev question workspace for Jev Board datasets.
  <sub>`Project` · ★0 · webgrga · `JS` · ⚠ `no licence`</sub>

### Document triage

_Classify and route incoming documents, invoices and forms._

- **[tax-doc-classifier](https://github.com/kyotofin/tax-doc-classifier)** — Tax document page classifier built on Jev decisions. 100% strict accuracy across 261 IRS forms, ~$0.001 per page.
  <sub>`Project` · ★361 · kyotofin · `TS`</sub>

- **[docjev](https://github.com/jerryjliu/docjev)** — A very fast document classifier/splitter using Jev
  <sub>`Project` · ★207 · jerryjliu · `Py`</sub>

- **[formanator](https://github.com/timrogers/formanator)** — Submit Forma <https://joinforma.com> benefit claims from the command line and Model Context Protocol (MCP) clients, with support for AI-powered receipt analysis with an LLM or Jev
  <sub>`Plugin` · ★99 · timrogers · `Rs`</sub>

- **[doc-router](https://github.com/misbahsy/doc-router)** — A Document OCR Router to help route pages based on content.
  <sub>`Project` · ★26 · misbahsy · `Rs`</sub>

- **[jev-capability-atlas](https://github.com/Zaious/jev-capability-atlas)** — Independent, evidence-based map of when TypeSafe's Jev actually holds up vs. breaks down — real API-call receipts, not a leaderboard. 中文為主的雙語 repo。
  <sub>`Benchmark` · ★24 · zaious · `Py`</sub>

- **[jevmory](https://github.com/romiluz13/jevmory)** — Coding-agent memory where every fact is a verbatim quote graded by TypeSafe Jev's calibrated confidence. Local-first, SQLite receipts, zero dependencies.
  <sub>`Project` · ★7 · romiluz13 · `Py`</sub>

- **[jev-builder](https://github.com/collapseindex/jev-builder)** — A browser form for building requests to TypeSafe's Jev: pick a template, fill in the blanks, copy the request. No JSON, no install, runs locally.
  <sub>`Project` · ★3 · collapseindex · `JS` · ⚠ `no licence`</sub>

- **[jev-document-classification](https://github.com/Charlyhno-eng/jev-document-classification)** — JEV Document Classification enables the rapid and cost-effective classification of text-based documents using AI, leveraging TypeSafe's "System One" model.
  <sub>`Project` · ★3 · charlyhno-eng · `TS`</sub>

- **[decision-first](https://github.com/harrymunro/decision-first)** — Agent skill that spots bounded-judgment steps, tries a typed decision model (TypeSafe's Jev) first, and documents every attempt
  <sub>`Plugin` · ★2 · harrymunro · `Py`</sub>

- **[jev-information-extraction](https://github.com/abhishekmamdapure/jev-information-extraction)** — Parsing the PDF and extracting the relevant information
  <sub>`Project` · ★2 · abhishekmamdapure · `Py` · ⚠ `no licence`</sub>

- **[jev-layer](https://github.com/typakon4/jev-layer)** — Portable System-1 decision layer for agent harnesses with host-owned routing, receipts, replay, and fail-open integrations.
  <sub>`Integration` · ★2 · typakon4 · `JS`</sub>

- **[jev-score](https://github.com/a-Fig/jev-score)** — Local-first document evaluation workspaces powered by Jev
  <sub>`Project` · ★1 · a-fig · `JS`</sub>

- **[jev-decision-lab](https://github.com/jlov7/jev-decision-lab)** — A local lab for seeing what TypeSafe's Jev judgment model does on realistic business cases: typed answers, probabilities, policy in code, receipts.
  <sub>`Project` · ★0 · jlov7 · `Py`</sub>

- **[jev-report](https://github.com/HackSing/jev-report)** — 发明 RLHF 的人，这次做了个不会说话的模型：Jev 独立研究报告。52 页 PDF + 50 条中文实测复现包 + 143 条可回溯数据表
  <sub>`Project` · ★0 · hacksing · `Py`</sub>

- **[last-exit](https://github.com/0x963D/last-exit)** — A cyberpunk border encounter powered by TypeSafe Jev. Bluff the guard. Inspect the receipts.
  <sub>`Project` · ★0 · 0x963d · `JS` · ⚠ `no licence`</sub>

- **[jevai.org community showcase cases](https://www.jevai.org/cases)** — Nine worked community scenarios: intent routing, invoice classification, news filtering, product tagging, moderation, claim verification, CSV validation and more.
  <sub>`Project` · ⚠ `unverified`</sub>

### Support triage

_Route support tickets and conversations by intent and urgency._

- **[Quickstart](https://docs.typesafe.ai/introduction/quickstart)** ⭐ — The canonical first call: one support ticket, one Choice, one Score and one Noul in a single request, in Python, JS and cURL.
  <sub>`Official docs` · `Py` · `TS` · `sh` · `choice` · `score` · `noul`</sub>

- **[ai-cookbook: Jev track](https://github.com/daveebbelaar/ai-cookbook)** — A graded course from a first call through each primitive, state shapes and criteria, to ticket triage and a multi-step workflow, mirroring all four official patterns.
  <sub>`Tutorial` · ★4,559 · `Py` · `choice` · `score` · `noul`</sub>

- **[spring-ai-typesafe](https://spring.io/blog/2026/09/21/spring-ai-typesafe-structured-judgment)** — A community Spring AI starter bringing typed decisions to Java, with a builder API over the three question types.
  <sub>`Integration` · ★19 · `Java` · `choice` · `score` · `noul`</sub>

- **[Example: three primitives in one request](https://github.com/kydlikebtc/awesome-jev/blob/main/examples/01-three-primitives/main.py)** — A minimal first call asking a choice, a score and a noul together, annotated with the asymmetries that catch people out.
  <sub>`Snippet` · `Py` · `choice` · `score` · `noul` · ⚠ `code untested`</sub>

- **[Jev AI Use Cases](https://medium.com/data-science-in-your-pocket/jev-ai-use-cases-9a87d57ac3b4)** — Walks through use case after use case — agent routing, an in-agent decision layer, ticket triage — each with a concrete option set and a sample response.
  <sub>`Tutorial` · Mehul Gupta · `Py` · `choice` · ⚠ `paywall`</sub>

- **[Jev on AI/ML API](https://docs.aimlapi.com/api-references/decision-models/typesafe/jev)** — Another gateway route, notable because its endpoint path and request envelope differ again from both the native API and Cloudflare's.
  <sub>`Integration` · `Py` · `noul` · `choice` · `score`</sub>

- **[Jev on Cloudflare Workers AI](https://developers.cloudflare.com/ai/models/typesafe/jev/)** — Workers AI binding and REST samples asking a noul, a choice and a score in one call, with the full response including per-answer confidence.
  <sub>`Integration` · `TS` · `sh` · `noul` · `choice` · `score`</sub>

### Content scoring

_Score quality, risk or relevance on an ordered scale._

<details>
<summary><b>146</b> rows — click to expand</summary>

- **[Cookbook: Self-consistency with choices](https://docs.typesafe.ai/cookbooks/consistency_choice_cookbook)** ⭐ — Adds an explicit "uncertain" outcome to moderation decisions and measures label agreement against the share of actions taken automatically.
  <sub>`Official docs` · `Py` · `choice`</sub>

- **[Pattern: Composite scoring](https://docs.typesafe.ai/patterns/composite-scoring)** ⭐ — Break one broad judgement into atomic scores and combine them with weights that live in your code, not in the prompt.
  <sub>`Official docs` · `Py` · `score`</sub>

- **[AutoGPT TypeSafe blocks](https://github.com/Significant-Gravitas/AutoGPT/tree/master/autogpt_platform/backend/backend/blocks/typesafe)** — Seven production blocks — choice, score, yes/no, ask-many, route, pick-best, filter — with a UTF-8 byte budget, verbatim wire capture and eleven test files.
  <sub>`Project` · ★187,482 · `Py` · `choice` · `score` · `noul`</sub>

- **[worldmonitor: news threat classification](https://github.com/koala73/worldmonitor)** — Two Choice questions over threat level and category, held in shadow mode after a blind evaluation found Jev merely tied the incumbent model.
  <sub>`Benchmark` · ★87,191 · `TS` · `choice` · ⚠ `shadow mode`</sub>

- **[gptcache](https://github.com/zilliztech/GPTCache)** — Semantic cache for LLMs. Fully integrated with LangChain and llama_index.
  <sub>`Project` · ★8,200 · zilliztech · `Py`</sub>

- **[ai-cookbook: Jev track](https://github.com/daveebbelaar/ai-cookbook)** — A graded course from a first call through each primitive, state shapes and criteria, to ticket triage and a multi-step workflow, mirroring all four official patterns.
  <sub>`Tutorial` · ★4,559 · `Py` · `choice` · `score` · `noul`</sub>

- **[jev-chat-jarvis](https://github.com/jev-chat/jev-chat-jarvis)** — An Android reply co-pilot that judges intent, timing and risk from on-screen text, while separate models handle OCR and drafting.
  <sub>`Project` · ★1,950 · `Java` · `choice` · `score` · `noul`</sub>

- **[jev-review](https://github.com/devagrawal09/jev-review)** — Pre-screens code review with Jev to surface high-risk changes for a more expensive model or a person, with a local dashboard.
  <sub>`Project` · ★510 · `TS` · `choice` · `score` · `noul`</sub>

- **[pg-jev](https://github.com/realZachi/pg-jev)** — A real PostgreSQL extension exposing the primitives as SQL functions, so a semantic decision can appear in a WHERE clause over any row type.
  <sub>`Project` · ★291 · `Py` · `sh` · `choice` · `score` · `noul`</sub>

- **[jev-review](https://github.com/NiazMorshed2007/jev-review)** — A local-first MCP plugin for continuous code-quality review by coding agents.
  <sub>`Plugin` · ★198 · niazmorshed2007 · `TS`</sub>

- **[perch: semantic code linting](https://github.com/lakeday-org/perch)** — Tree-sitter finds and ranks methods, then user-authored YAML rules compile into nouls, with severity read as the rubric's expected value rather than the top band.
  <sub>`Project` · ★168 · `JS` · `choice` · `score` · `noul`</sub>

- **[neurolink](https://github.com/juspay/neurolink)** — One TypeScript interface for 40 AI providers across three inference types — generate, stream, and decide. Decide returns typed, calibrated judgments (boolean/choice/score) via TypeSafe Jev, not text. MCP-native, voice (TTS/STT/realtime), RAG, memory, file processors. Powers Tara, Yama and Clair
  <sub>`Plugin` · ★137 · juspay · `TS`</sub>

- **[llm2jev](https://github.com/Yinsongxu/LLM2Jev)** — Adapt local language models into Jev-compatible structured decision engines with Choice, Score, and Noul outputs powered by prefill-only binary inference.
  <sub>`Project` · ★127 · yinsongxu · `Py`</sub>

- **[jev-semgrep](https://github.com/uehaj/jev-semgrep)** — grep by meaning, across languages. TypeSafe Jev scores every line against a meaning; combine meanings with AND/OR/NOT. 意味で探す grep。日本語で英語を、英語で日本語を検索できる
  <sub>`Project` · ★125 · uehaj · `JS` · ⚠ `no licence`</sub>

- **[supercov](https://github.com/supercorp-ai/supercov)** — Code quality and coverage judgements for coding agents, in Rust.
  <sub>`Project` · ★95 · supercorp-ai · `Rs`</sub>

- **[jevmeter](https://github.com/ChetasLua/jevmeter)** — Scores every sentence of a video and renders the result as a live meter.
  <sub>`Project` · ★81 · chetaslua · `Py`</sub>

- **[killmyidea](https://github.com/monteduro/killmyidea)** — Scores a startup idea across several dimensions and returns a verdict of kill, fix or ship.
  <sub>`Project` · ★78 · `TS` · `score` · `choice` · ⚠ `no licence`</sub>

- **[jev-lint](https://github.com/mizchi/jev-lint)** — lint text in code by jev scorerer
  <sub>`Project` · ★70 · mizchi · `TS`</sub>

- **[jev-as-a-judge](https://github.com/danielgshea/jev-as-a-judge)** — Using Jev as an evaluator.
  <sub>`Project` · ★68 · danielgshea · `Py` · ⚠ `no licence`</sub>

- **[Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot)** — A Discord moderation bot: a Choice tiers each message while a Noul carries ban urgency, and an admin pardon is fed back as a safe precedent in later requests.
  <sub>`Project` · ★41 · brainstormity · `Py` · `choice` · `noul`</sub>

- **[jev-calibrate](https://github.com/smkrv/jev-calibrate)** — Calibrate Jev questions against your own labels: tune criteria on labelled examples, confirm on a held-out set, get a verdict per question. Unofficial.
  <sub>`Project` · ★31 · smkrv · `TS`</sub>

- **[plugins](https://github.com/cline/plugins)** — Official curated plugins for Cline CLI and extensions
  <sub>`Plugin` · ★31 · cline · `TS`</sub>

- **[SemDecide](https://github.com/sharziki/semdecide)** — Jev as a command-line tool: classify, score and filter straight from a shell, for crawlers, CI and data pipelines.
  <sub>`Plugin` · ★31 · `Py` · `sh` · `choice` · `score` · `noul`</sub>

- **[snifftest](https://github.com/DanRWilloughby/snifftest)** — A prose linter that sniffs out AI writing tells. Zero dependencies, countable rules plus one judgment model.
  <sub>`Project` · ★27 · danrwilloughby · `TS`</sub>

- **[smartmoney-cub](https://github.com/myc0576/SmartMoney-Cub)** — Read-only trading journal and review harness: Jev typed judgments, agent integration, and a reproducible finance benchmark. No orders, no advice.
  <sub>`Benchmark` · ★26 · myc0576 · `Py`</sub>

- **[typed-decision-bert](https://github.com/hawkymisc/typed-decision-bert)** — Unofficial PoC: a BERT-style encoder decision engine behind a typed-decision (noul / choice / score) HTTP API. Not affiliated with TypeSafe.
  <sub>`Project` · ★26 · hawkymisc · `Py`</sub>

- **[yoshi](https://github.com/compozy/yoshi)** — Context-pruning proxy for Claude Code and Codex: Jev judges which history is still needed, measured not claimed. POC here now, heading soon into https://github.com/compozy/compozy
  <sub>`Plugin` · ★22 · compozy · `TS`</sub>

- **[jev-curate](https://github.com/AkashPriyadarshii/jev-curate)** — Curates training data: JSONL and Parquet rows are judged on quality, relevance and risk before deciding what reaches downstream training.
  <sub>`Project` · ★21 · `Rs` · `score` · `noul`</sub>

- **[jev-mcp](https://github.com/blakestone-x/jev-mcp)** — An MCP server exposing classify, score, check, match and screen to any agent.
  <sub>`Plugin` · ★18 · blakestone-x · `Py`</sub>

- **[jevalyn](https://github.com/Ray-Hughes/jevalyn)** — The decision layer for your Rails app. A Rails-native wrapper around TypeSafe's Jev System One API: typed, calibrated decisions in your control flow.
  <sub>`Project` · ★17 · ray-hughes · `Rb`</sub>

- **[jevgpt](https://github.com/Bewinxed/jevgpt)** — A chatbot built on a model that cannot generate text (TypeSafe AI's Jev, driven autoregressively)
  <sub>`Project` · ★16 · bewinxed · `TS`</sub>

- **[jev-test-filter](https://github.com/mizchi/jev-test-filter)** — Score every test against a git diff with Jev, and emit the filter arguments vitest, node:test, Playwright, cargo test and go test already understand
  <sub>`Project` · ★15 · mizchi · `TS`</sub>

- **[x-scanner](https://github.com/oso95/x-scanner)** — Chrome extension that labels every post you scroll past on X with typed Jev judgments and a live cost counter
  <sub>`Plugin` · ★15 · oso95 · `TS`</sub>

- **[jev-superpowers](https://github.com/AkashPriyadarshii/jev-superpowers)** — Systematic software development framework for AI coding agents upgraded with TypeSafe Jev System One typed decisions
  <sub>`Project` · ★14 · akashpriyadarshii · `TS`</sub>

- **[slop-grader](https://github.com/lukstei/slop-grader)** — Jev-powered, rule-based grader for text files. Runs every rule against every line in parallel. No skimming, no missed lines.
  <sub>`Project` · ★13 · lukstei · `TS`</sub>

- **[jevframe](https://github.com/ktaletsk/jevframe)** — Semantic AI for pandas and Polars: classify text, analyze sentiment, and score DataFrame rows with natural-language questions and full probabilities using TypeSafe Jev.
  <sub>`Project` · ★12 · ktaletsk · `Py`</sub>

- **[jev-forge](https://github.com/zwliJay/jev-forge)** — An open training and inference stack for Jev-style decision models. Train models to score dynamic candidate branches from a shared prefix, with support for high-cardinality choice, calibration, and fast batched inference.
  <sub>`Jev-like alternative` · ★11 · zwlijay · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[jevlint](https://github.com/iamtoomas/JevLint)** — Configurable semantic linting powered by Jev, with file-level NOUL judgments and a magic-strings plugin.
  <sub>`Plugin` · ★11 · huntedman · `TS`</sub>

- **[jevlogs](https://github.com/reachjalil/jevlogs)** — Open-source Jev log triage for OpenTelemetry. Score the signal before expensive LLM analysis.
  <sub>`Project` · ★9 · reachjalil · `JS`</sub>

- **[jev-feels](https://github.com/Qew7/jev-feels)** — Semantic decisions as ordinary Ruby — feels?, decide, score, Rails validations and pattern matching powered by Jev
  <sub>`Project` · ★8 · qew7 · `Rb`</sub>

- **[omp-jev-compaction](https://github.com/jerryfane/omp-jev-compaction)** — Verbatim Jev-scored context reduction for omp, over TypeSafe or OpenRouter
  <sub>`Project` · ★8 · jerryfane · `TS`</sub>

- **[typesafe-local](https://github.com/aabolfazl/typesafe-local)** — Inspired by TypeSafe Ai, Ask a local LLM typed questions, get calibrated probabilities instead of text. Structured output without generation or parsing. MLX / Apple Silicon.
  <sub>`Project` · ★8 · aabolfazl · `Py`</sub>

- **[anydecisionmodel](https://github.com/mattt/AnyDecisionModel)** — A Swift package for typed decisions from language models (probabilities, choices, and scores), with support for local MLX models and the TypeSafe Jev API.
  <sub>`Project` · ★7 · mattt · `Swift`</sub>

- **[heist-one](https://github.com/AbdelStark/heist-one)** — Observable browser stealth game: Jev makes typed guard judgments while deterministic code owns the world.
  <sub>`Project` · ★7 · abdelstark · `TS`</sub>

- **[jev-dsl](https://github.com/inanna-malick/jev-dsl)** — Agent-first Haskell DSL for TypeSafe's Jev judgment model: typed packets, inferred types, answers under the same labels
  <sub>`Project` · ★7 · inanna-malick · `Hs`</sub>

- **[jevmory](https://github.com/romiluz13/jevmory)** — Coding-agent memory where every fact is a verbatim quote graded by TypeSafe Jev's calibrated confidence. Local-first, SQLite receipts, zero dependencies.
  <sub>`Project` · ★7 · romiluz13 · `Py`</sub>

- **[luce](https://github.com/scienthoon/luce)** — Luce: a recipe for calibrated decision models — a sentence about your task in, a small model that answers typed questions with honest probabilities out (init → synth → train → eval → serve)
  <sub>`Project` · ★7 · scienthoon · `Py`</sub>

- **[aside-jev](https://github.com/himomohi/aside-jev)** — Aside agents decide with TypeSafe Jev (System One: Choice/Score/Noul). Not a Cua binding — Jev is the model, Aside is the browser runtime.
  <sub>`SDK` · ★6 · himomohi · `Py`</sub>

- **[a0-typesafe-ai](https://github.com/3clyp50/a0-typesafe-ai)** — TypeSafe AI Jev judgments for Agent Zero, with typed tools and probability cards.
  <sub>`Project` · ★5 · 3clyp50 · `Py`</sub>

- **[citation-verifier](https://github.com/MarissaFamularo/citation-verifier)** — Check whether each cited paper supports the sentence citing it. Claude proves the quote, TypeSafe's Jev scores it, a human decides.
  <sub>`Project` · ★5 · marissafamularo · `JS`</sub>

- **[jev-rs](https://github.com/yijunyu/jev-rs)** — System One judgments (noul/choice/score) from any LLM in one prefill — a Rust, Jev-compatible /v1/systemone engine
  <sub>`Project` · ★5 · yijunyu · `Rs`</sub>

- **[jevflow](https://github.com/Mawfyy/jevflow)** — Probabilistic AI decisions as composable backend primitives — typed judgments (noul/score/choice), deterministic thresholds, and explainable workflows. Powered by TypeSafe's Jev, provider-agnostic.
  <sub>`Integration` · ★5 · mawfyy · `TS` · ⚠ `no licence`</sub>

- **[jevriel](https://github.com/thehan-co/jevriel)** — Give your AI JEV wings. A skill and plugin to build with TypeSafe Jev, upgrade LLM-only workflows and measure the result.
  <sub>`Plugin` · ★5 · thehan-co · `JS`</sub>

- **[poorjev](https://github.com/rupeshpoojary9/poorjev)** — Open-source, local Jev alternative: a System One decision layer with provably calibrated confidence (ECE 0.170→0.071). Typed decisions, runs offline, no API key, no waitlist.
  <sub>`Jev-like alternative` · ★5 · rupeshpoojary9 · `Py` · ⚠ `not Jev`</sub>

- **[ai-provider-for-jev](https://github.com/soderlind/ai-provider-for-jev)** — Connect WordPress to TypeSafe's Jev System One model for structured decisions (choice, score, noul).
  <sub>`Integration` · ★4 · soderlind · `PHP` · ⚠ `no licence`</sub>

- **[jev-code](https://github.com/FrancoisChastel/jev-code)** — Jev, TypeSafe's System One classifier, as a tool inside Claude Code, Codex, Pi, and OpenCode: typed classify, check, score, rank, and ask, plus one-command setup.
  <sub>`Plugin` · ★4 · francoischastel · `TS`</sub>

- **[jev-ood-calibration](https://github.com/scienthoon/jev-ood-calibration)** — Independent calibration test of TypeSafe's Jev on a task it cannot have seen: 900 rule-generated support tickets (choice / score / boolean) plus 3 public benchmarks via Vercel AI Gateway. Raw responses, ECE with noise floor, temperature refit, per-type sign of miscalibration. Reproducible for ~
  <sub>`Benchmark` · ★4 · scienthoon · `Py`</sub>

- **[qwen-rlcd](https://github.com/shamazharikh/qwen-rlcd)** — Jev-style calibrated decision model (Choice/Score/Noul) on Qwen3.5-0.8B
  <sub>`Jev-like alternative` · ★4 · shamazharikh · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[system-one-gemma](https://github.com/akash-kamat/system-one-gemma)** — Open-source Jev-style System One decision model. Gemma 3 270M with a scoring head — fast, calibrated decisions in a single forward pass. No text generation. Inspired by TypeSafe.ai's Jev.
  <sub>`Jev-like alternative` · ★4 · akash-kamat · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[typesafe-cli](https://github.com/y0usaf/typesafe-cli)** — Ask Jev typed questions from the shell: noul, choice, and score answers as numbers, not prose
  <sub>`Project` · ★4 · y0usaf · `TS`</sub>

- **[typesafe-jev](https://github.com/gtaras7/typesafe-jev)** — Screen a folder of CVs with the TypeSafe Jev decision model: typed judgments, an editable policy, free re-scoring.
  <sub>`Project` · ★4 · gtaras7 · `TS`</sub>

- **[dsh-jev](https://github.com/noetion/dsh-jev)** — DSH bundle that registers jev_ask for TypeSafe Jev noul, choice, and score answers.
  <sub>`Project` · ★3 · noetion · `TS`</sub>

- **[dsh-jev-prune](https://github.com/yangyu666/dsh-jev-prune)** — Jev-judged context compaction for DeepSeek Harness: semantic tool-result pruning + deterministic receipt compaction
  <sub>`Project` · ★3 · yangyu666 · `JS`</sub>

- **[jev-as-quant](https://github.com/jiayylu/jev-as-quant)** — Typed System-1 decisions (Laya/Jev) as the judgment layer of a quant research stack, with Claude as System 2. Requirements → design → code → experiments.
  <sub>`Project` · ★3 · jiayylu · `Py`</sub>

- **[jev-flash-router](https://github.com/Ravinder82/jev-flash-router)** — open-sourced jev-flash-router: an MCP server for TypeSafe's new Jev model. AI coding agents waste hundreds of reasoning tokens just deciding which file to edit, which route to pick, or whether a diff breaks tests. Jev evaluates state and outputs calibrated probabilities. Works with Cursor, Wind
  <sub>`Plugin` · ★3 · ravinder82 · `TS`</sub>

- **[jev-judgment](https://github.com/HyunjunJeon/jev-judgment)** — Agent Skill: send closed coding-agent judgments to TypeSafe Jev
  <sub>`Plugin` · ★3 · hyunjunjeon · `Py`</sub>

- **[jev-local](https://github.com/us/jev-local)** — Local Jev-compatible evaluation server: POST /v1/systemone with typed noul/choice/score, open weights, no waitlist
  <sub>`Jev-like alternative` · ★3 · us · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[jev-skill-gate](https://github.com/ShivamPansuriya/jev-skill-gate)** — Cut Claude Code's skill manifest by ~75% with TypeSafe Jev. Scores every installed skill for relevance and hides the rest via skillOverrides — 12,750 → 3,185 tokens on a 217-skill install, for $0.0009 a session.
  <sub>`Plugin` · ★3 · shivampansuriya · `JS`</sub>

- **[jevchess](https://github.com/choxos/jevchess)** — Jev, TypeSafe's System One model, plays chess against any OpenRouter LLM, Stockfish and you. One-page web app with live moves, Jev's move probabilities, saved games and win rates.
  <sub>`Project` · ★3 · choxos · `JS`</sub>

- **[jevseek](https://github.com/morcoan/JMP)** — JMP — Joint Model Participation. A local coding workspace where Jev routes actions and OpenAI, DeepSeek, or local models generate arguments.
  <sub>`Project` · ★3 · morcoan · `Py` · ⚠ `archived`</sub>

- **[jevseo](https://github.com/epergaboni/jevseo)** — Typed SEO, AEO and GEO judgments powered by Jev, a System One decision model. Code owns the rules, the model owns the meaning.
  <sub>`Project` · ★3 · epergaboni · `TS`</sub>

- **[leanest](https://github.com/baronunread/leanest)** — Local-first test selector using Jev judgments to determine which tests are affected by a code change
  <sub>`Project` · ★3 · baronunread · `TS`</sub>

- **[llama-index-jev](https://github.com/WiktorB2004/llama-index-jev)** — LlamaIndex reranker + router powered by TypeSafe Jev — typed scores/choices, cheaper than LLM-as-judge.
  <sub>`Project` · ★3 · wiktorb2004 · `Py`</sub>

- **[local-jev](https://github.com/amithgc/local-jev)** — A local, offline System One server compatible with TypeSafe's Jev API. It answers typed yes/no, category and score questions with small open models.
  <sub>`Project` · ★3 · amithgc · `Py`</sub>

- **[pagegrade](https://github.com/kitze/pagegrade)** — Grade page sections for clarity, writing and on-page SEO. WXT + TypeSafe AI Jev.
  <sub>`Project` · ★3 · kitze · `TS`</sub>

- **[prompt2jev](https://github.com/sumleo/prompt2jev)** — Agent skill and CLI that turn natural language, an LLM prompt, or the code that runs one into a TypeSafe Jev decision: typed state, Choice/Score/Noul questions, and a runnable script
  <sub>`Plugin` · ★3 · sumleo · `Py`</sub>

- **[typed-decisions](https://github.com/kotoba-lang/typed-decisions)** — Jev-shaped typed-decision model (state + Choice/Score/Noul questions -> calibrated probabilities, one pass) on ModernBERT / DeBERTa / LLaDA-MoE, with measured latency, accuracy, calibration and training cost
  <sub>`Project` · ★3 · kotoba-lang · `Py` · ⚠ `no licence`</sub>

- **[vgi-typesafe](https://github.com/Query-farm/vgi-typesafe)** — A VGI worker exposing TypeSafe System One questions (choice, noul, score) to DuckDB/SQL as LATERAL-joinable table functions
  <sub>`Project` · ★3 · query-farm · `Py`</sub>

- **[ask-jev-ai](https://github.com/waynesutton/ask-jev-ai)** — A public wall where anyone asks a question in three to fifteen words and Jev, TypeSafe's judgment model, answers yes, no, or it depends in about 100 milliseconds. Every judged ask lands on the wall in realtime, with a running count toward one million, showing cost.
  <sub>`Project` · ★2 · waynesutton · `JS` · ⚠ `no licence`</sub>

- **[clear-head](https://github.com/VladyslavHontar/clear-head)** — Claude Code Stop hook that checks an AI assistant's claims against what it actually read this session, using TypeSafe's Jev as the judge
  <sub>`Plugin` · ★2 · vladyslavhontar · `Py`</sub>

- **[decision-first](https://github.com/harrymunro/decision-first)** — Agent skill that spots bounded-judgment steps, tries a typed decision model (TypeSafe's Jev) first, and documents every attempt
  <sub>`Plugin` · ★2 · harrymunro · `Py`</sub>

- **[jev-builder-loop](https://github.com/rainbowpuffpuff/jev-builder-loop)** — Grok skill: Jev as a judgment sensor in a builder-agent loop (priors × probabilities → next act)
  <sub>`Plugin` · ★2 · rainbowpuffpuff · `Py`</sub>

- **[jev-mcp-server](https://github.com/wangkuangkuang/jev-mcp-server)** — MCP server for Jev (TypeSafe System One): the three official question types — choice, score, noul — plus batch classify. Calibrated probabilities, ~0.5s, <$0.001/call.
  <sub>`Plugin` · ★2 · wangkuangkuang · `Py`</sub>

- **[jev-mode](https://github.com/ddfeyes/jev-mode)** — I kept watching coding agents burn context on decisions that aren't hard - triage 400 tickets, tag 600 files, route to one of six teams. jev-mode moves those verdicts to a typed-judgment model. I A/B'd it: 78% fewer tokens, 16x less work-attributable input, accuracy 96.1% vs 93.7%. Python, no d
  <sub>`Project` · ★2 · ddfeyes · `Py`</sub>

- **[jev-model-router](https://github.com/lucianfialho/jev-model-router)** — Cost-optimized OpenRouter model router using TypeSafe's Jev, with a live full-catalog scorer instead of a hardcoded model list
  <sub>`Project` · ★2 · lucianfialho · `Py`</sub>

- **[jev-scout](https://github.com/AkashPriyadarshii/jev-scout)** — Zero-hallucination open-source repo and crate scout powered by TypeSafe AI Jev System One scoring
  <sub>`Project` · ★2 · akashpriyadarshii · `Rs`</sub>

- **[jev-ui](https://github.com/etweisberg/jev-ui)** — React components that resolve which component to render, how to order a list, and whether to show an affordance — from calibrated judgments returned by TypeSafe's Jev.
  <sub>`Project` · ★2 · etweisberg · `TS` · ⚠ `no licence`</sub>

- **[jev-workbench](https://github.com/molis-ai/jev-workbench)** — Build versioned judgment functions on TypeSafe's Jev once, then call the same published version from your backend over HTTP and from coding agents over MCP. The vendor key stays on your machine.
  <sub>`Plugin` · ★2 · molis-ai · `TS`</sub>

- **[jevbus](https://github.com/zkjoie/jevbus)** — A streaming event bus whose routing, subscription and consumption are decided by a probabilistic judge. The reference judge is TypeSafe AI's Jev (System One) model: send it a payload and a set of typed questions, get back calibrated probabilities instead of prose.
  <sub>`Project` · ★2 · zkjoie · `Rs`</sub>

- **[jevshield](https://github.com/lgy1027/jevshield)** — Sub-100ms security gate for AI agent tool calls, powered by TypeSafe's Jev (System-1) decision model. Single-request Choice/Noul/Score evaluation, dual-factor blocking matrix, calibrated-confidence routing, fail-closed parsing, zero-config local fallback. LangChain-ready.
  <sub>`Project` · ★2 · lgy1027 · `Py`</sub>

- **[limpet](https://github.com/noplan-inc/limpet)** — A Stop hook that stops your coding agent from stopping too early. Plain-language rules, judged by jev.
  <sub>`Plugin` · ★2 · noplan-inc · `Py`</sub>

- **[pi-typesafe-jev](https://github.com/legacybridge-tech/pi-typesafe-jev)** — A pi extension that exposes TypeSafe (Jev, System One) judgments as five pi tools, so a model can make narrow semantic judgments while your code and your users keep control of thresholds, weights, and actions.
  <sub>`Plugin` · ★2 · legacybridge-tech · `TS` · ⚠ `no licence`</sub>

- **[tenbin](https://github.com/simota/tenbin)** — MCP server and agent skill for the TypeSafe AI System One API (Jev): decompose a judgment into Choice / Score / Noul questions, lint them, measure on labelled data, and put calibrated thresholds in code
  <sub>`Plugin` · ★2 · simota · `TS`</sub>

- **[toolgate](https://github.com/RiskAverseTech/toolgate)** — Open auto mode for AI agents — a calibrated tool-call firewall powered by TypeSafe Jev. Ships as a Claude Code hook
  <sub>`Plugin` · ★2 · riskaversetech · `TS`</sub>

- **[tripwire](https://github.com/noelzappy/tripwire)** — Judge every LLM response before the user sees it. AI SDK middleware and OpenAI-compatible proxy.
  <sub>`Integration` · ★2 · noelzappy · `TS`</sub>

- **[typesafe-as-a-judge](https://github.com/E-FL/typesafe-as-a-judge)** — Unofficial community MCP plugin for Codex and Claude Code using TypeSafe Jev for bounded routing, ranking, extraction, verification, and escalation
  <sub>`Plugin` · ★2 · e-fl · `JS`</sub>

- **[typesafe-jev-bridge](https://github.com/RevocGG/typesafe-jev-bridge)** — Use the TypeSafe Jev decision model (System One) anywhere: zero-dependency OpenAI-compatible bridge for 9Router, Claude Code, Cursor, Cline & any OpenAI SDK. Typed yes/no, choice & score judgments via CLI or HTTP.
  <sub>`SDK` · ★2 · revocgg · `JS` · ⚠ `no licence`</sub>

- **[watfile](https://github.com/jexp/watfile)** — Text/PDF - File categorization and sorting with Typesafe AI Jev or local calibrated decision model
  <sub>`Project` · ★2 · jexp · `Py` · ⚠ `no licence`</sub>

- **[draftpulse](https://github.com/pekth/draftpulse)** — Experimental: live X draft viral scorer powered by TypeSafe Jev
  <sub>`Project` · ★1 · pekth · `TS` · ⚠ `no licence`</sub>

- **[dsh-jev-decide](https://github.com/nanami-0713/dsh-jev-decide)** — DSH plugin: register TypeSafe Jev (System One decision model) as an agent tool — jev_decide returns calibrated probabilities (noul/choice/score) for routing/triage/guardrail judgments, no text generation. 把 TypeSafe Jev 决策模型注册为 DSH agent 工具
  <sub>`Plugin` · ★1 · nanami-0713 · `JS`</sub>

- **[dsh-jev-verify](https://github.com/xienda/dsh-jev-verify)** — Jev (TypeSafe System One) decision tools + live verification benchmark for DeepSeek Harness: jev_decision (choice/score/noul) and jev_verify, honest by design.
  <sub>`Benchmark` · ★1 · xienda · `JS`</sub>

- **[gpt-vs-jev](https://github.com/TanayPadar/gpt-vs-jev)** — Compare GPT generated language with JEV structured Noul decisions on the same input.
  <sub>`Project` · ★1 · tanaypadar · `TS`</sub>

- **[hush](https://github.com/emreozyoruk/hush)** — Issue triage that stays quiet when it isn't sure. Calibrated labels, spam and duplicate detection — with abstention.
  <sub>`Project` · ★1 · emreozyoruk · `JS`</sub>

- **[instruct-jev](https://github.com/ctaxnagomi/instruct-jev)** — INSTRUCT_JEV - TypeSafe AI Jev / System One instruction corpus (choice/noul/score), compiled by DeckerGUI. 119 rows. Mirrored on HuggingFace.
  <sub>`Project` · ★1 · ctaxnagomi · `Py`</sub>

- **[jev-carryforward](https://github.com/Dharundp6/jev-carryforward)** — What your last session knew, scored against what this one is doing. MCP server: a per-project ledger written as things happen, recalled per task with TypeSafe's Jev evaluation model via Vercel AI Gateway.
  <sub>`Plugin` · ★1 · dharundp6 · `TS`</sub>

- **[jev-compaction](https://github.com/picaye/jev-compaction)** — Context compaction for Hermes sessions that never summarises: every tool call is scored by TypeSafe's Jev model, stale calls are dropped, everything kept stays verbatim.
  <sub>`Project` · ★1 · picaye · `JS`</sub>

- **[jev-hooks](https://github.com/microchipgnu/jev-hooks)** — Compose typed Jev judgments as reactive semantic state in React and backend programs
  <sub>`Project` · ★1 · microchipgnu · `TS` · ⚠ `no licence`</sub>

- **[jev-paper-judge](https://github.com/JacobLinCool/jev-paper-judge)** — Feedback on your paper in seconds.
  <sub>`Project` · ★1 · jacoblincool · `TS`</sub>

- **[jev-score](https://github.com/a-Fig/jev-score)** — Local-first document evaluation workspaces powered by Jev
  <sub>`Project` · ★1 · a-fig · `JS`</sub>

- **[jev-wrapped](https://github.com/gaborishka/jev-wrapped)** — Telegram channel X-ray: Jev judges a year of posts, you get a card. One Cloudflare Worker.
  <sub>`Project` · ★1 · gaborishka · `JS`</sub>

- **[jevaluate](https://github.com/ElshinQ/jevaluate)** — Jevaluate: evaluate before you trust. Field notes, runnable scripts and an agent skill for TypeSafe Jev: gated evals, a browser loop, a product walk with DeepSeek vision, a UI text judge and a first-click tree test. Co-authored with Claude Fable 5.1.
  <sub>`Plugin` · ★1 · elshinq · `JS`</sub>

- **[judging-with-typesafe](https://github.com/carlsonchik/judging-with-typesafe)** — Скилл для агентов Letta: суждения по критериям через TypeSafe System One (Jev)
  <sub>`Project` · ★1 · carlsonchik · `Py` · ⚠ `no licence`</sub>

- **[padflow-jev-evals](https://github.com/zsavage8/padflow-jev-evals)** — Typed-decision benchmark from PadFlow (land development SaaS): schemas, anonymized labeled rows, and a runner for confidence-calibrated models like TypeSafe Jev.
  <sub>`Benchmark` · ★1 · zsavage8 · `Py`</sub>

- **[pi-jev-permit](https://github.com/kurihada/pi-jev-permit)** — A Jev (TypeSafe System One) permission gate for the Pi coding agent: judges every bash / write / edit call before it runs
  <sub>`Project` · ★1 · kurihada · `TS`</sub>

- **[s1-rs](https://github.com/AbdelStark/s1-rs)** — Typed System One layer for Rust (Choice/Score/Noul).
  <sub>`Project` · ★1 · abdelstark · `Rs`</sub>

- **[typesafe-showcase](https://github.com/Ashadeepa/typesafe-showcase)** — Next.js UI showing off TypeSafe's System One model (Jev) — parallel Noul judgments and a Choice-based citation checker, deployable to Vercel
  <sub>`Project` · ★1 · ashadeepa · `TS` · ⚠ `no licence`</sub>

- **[A deep dive into Jev, TypeSafe's System One model](https://flaviocopes.com/jev/)** — The densest independent explainer: code in JS, Python and the AI SDK, all three answer shapes, the advanced patterns, and an honest list of where the model fails.
  <sub>`Tutorial` · Flavio Copes · `JS` · `Py` · `TS` · `choice` · `score` · `noul`</sub>

- **[decide-mcp](https://github.com/dakdevs/decide-mcp)** — Configurable decision MCP server with AI SDK, Jev, percentage scores, and bias profile routing
  <sub>`SDK` · ★0 · dakdevs · `TS`</sub>

- **[github-issue-classification-using-jev](https://github.com/KalyanM45/GitHub-Issue-Classification-Using-Jev)** — This repository contains a GitHub issue classifier built on Jev, TypeSafe AI's System One model. It labels every new issue with typed values and calibrated confidence in milliseconds, labelling what it is sure about and escalating what it is not. Three guardrail layers guard every write, and a
  <sub>`Project` · ★0 · kalyanm45 · `Py`</sub>

- **[harnessjudge](https://github.com/ndolinschi/harnessjudge)** — Judge agent steps — ok / retry / escalate / stop via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[jev-asks-until-sure](https://github.com/mintannn/jev-asks-until-sure)** — A twenty-questions guesser that keeps asking until Jev's calibrated confidence crosses a threshold — or gives up and says so
  <sub>`Project` · ★0 · mintannn · `TS`</sub>

- **[jev-certify](https://github.com/nikkoxgonzales/jev-certify)** — Finite-sample guarantees for Jev (TypeSafe's System One). Conformal risk control turns calibrated probabilities into certified routing thresholds; prediction-powered inference audits them. 2,412 decisions on CLINC150 for $0.23 — including the shift and prevalence cases where the guarantee break
  <sub>`Benchmark` · ★0 · nikkoxgonzales · `Py`</sub>

- **[jev-decision-lab](https://github.com/jlov7/jev-decision-lab)** — A local lab for seeing what TypeSafe's Jev judgment model does on realistic business cases: typed answers, probabilities, policy in code, receipts.
  <sub>`Project` · ★0 · jlov7 · `Py`</sub>

- **[jev-gates](https://github.com/rashedInt32/jev-gates)** — Six calibrated gates for Claude Code, judged by TypeSafe Jev: rules, scope, intent, done, claims, and commit honesty. Each one escalates, none ever approves.
  <sub>`Plugin` · ★0 · rashedint32 · `JS`</sub>

- **[jev-llm-router-benchmark](https://github.com/erendikmenn/jev-llm-router-benchmark)** — Benchmark-driven Jev router and judge for cost-aware, reliable LLM coding workflows
  <sub>`Benchmark` · ★0 · erendikmenn · `Py`</sub>

- **[jev-orderby-bench](https://github.com/yodablocks/jev-orderby-bench)** — Does ORDER BY over a Jev probability put rows in a defensible order? Independent ranking, calibration and invariant measurements of TypeSafe AI's Jev: passes six pre-registered gates on 360 labeled rows, fails four of six on graded product relevance.
  <sub>`Benchmark` · ★0 · yodablocks · `Py`</sub>

- **[jev-packs](https://github.com/dtduc-git/jev-packs)** — Evidence-gated registry of Jev question packs — curated questions, golden cases and measured evidence for Jev-compatible decision endpoints
  <sub>`Project` · ★0 · dtduc-git · `Py`</sub>

- **[jev-shadcn-lint-eval](https://github.com/blas0/jev-shadcn-lint-eval)** — A small second eval for shadcn-ui/lint that uses TypeSafe's Jev to judge the linter's own output.
  <sub>`Project` · ★0 · blas0 · `JS` · ⚠ `no licence`</sub>

- **[jev-songwriter](https://github.com/beingcognitive/jev-songwriter)** — A decision model that cannot write a single note writes songs. Code computes, Jev judges, and every call is replayable.
  <sub>`Project` · ★0 · beingcognitive · `JS`</sub>

- **[jev-trace-classifier](https://github.com/sypherin/jev-trace-classifier)** — Application of TypeSafe Jev (noul judgment primitive) on the collusion.wiki corpus: agent vs human page authorship, head-to-head vs local Qwen3.8-Flash-Next
  <sub>`Benchmark` · ★0 · sypherin · `Py`</sub>

- **[jevplay](https://github.com/ndolinschi/jevplay)** — TypeSafe Jev playground — custom Choice/Score/Noul builder with live distributions
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[n8n-nodes-jev-classification](https://github.com/khmuhtadin/n8n-nodes-jev-classification)** — n8n community node for Jev by TypeSafe AI: classify, score and check text with calibrated probabilities. Parallel requests and multi-item batching.
  <sub>`Project` · ★0 · khmuhtadin · `TS`</sub>

- **[n8n-nodes-typesafe-ai](https://github.com/DomMonte/n8n-nodes-typesafe-ai)** — n8n community node for the TypeSafe AI System One API — typed yes/no, choice and score questions with calibrated probabilities
  <sub>`Project` · ★0 · dommonte · `TS`</sub>

- **[omp-jevens-classifier](https://github.com/STRML/omp-jevens-classifier)** — Jev-powered model-judged permission gate for OMP (TypeSafe System One)
  <sub>`Project` · ★0 · strml · `TS` · ⚠ `archived`</sub>

- **[pytest-jev](https://github.com/allebee/pytest-jev)** — Semantic assertions for pytest: test what your LLM app's output means, judged by TypeSafe's Jev.
  <sub>`Plugin` · ★0 · allebee · `Py`</sub>

- **[s1s](https://github.com/cpaczek/s1s)** — System One Search: navigate and trace code with TypeSafe judgments and repository evidence
  <sub>`Project` · ★0 · cpaczek · `TS`</sub>

- **[shady-town](https://github.com/tpaulshippy/shady-town)** — Shady Town: social-deduction party game for the living room TV, moderated by TypeSafe Jev
  <sub>`Project` · ★0 · tpaulshippy · `Rb` · ⚠ `no licence`</sub>

- **[sloppy-jevs-extension](https://github.com/neddes/sloppy-jevs-extension)** — Open-source Chrome extension that filters AI-generated prose and ads with Jev
  <sub>`Plugin` · ★0 · neddes · `JS`</sub>

- **[spendbrake](https://github.com/ndolinschi/spendbrake)** — Agent budget brake — continue / downgrade_model / stop via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[transcript-scorecard](https://github.com/brandonbryant12/transcript-scorecard)** — ACME live support-call scoring demo with TypeSafe AI, Effect, SQLite, React, Vite, and Turborepo
  <sub>`Project` · ★0 · brandonbryant12 · `TS` · ⚠ `no licence`</sub>

- **[typesafe-demo-mcp](https://github.com/bestagentkits/typesafe-demo-mcp)** — MCP server exposing TypeSafe System One judgments (noul, choice, score) as agent tools
  <sub>`Plugin` · ★0 · bestagentkits · `TS` · ⚠ `no licence`</sub>

- **[typesafe-oracles](https://github.com/trophee-bot/typesafe-oracles)** — Evaluating TypeSafe's System One primitives (Choice/Score/Noul) — where a typed oracle beats an LLM call
  <sub>`Project` · ★0 · trophee-bot · `JS` · ⚠ `no licence`</sub>

- **[typesafe-triage-guard](https://github.com/shivam2003-dev/typesafe-triage-guard)** — Three composable judgment pipelines on TypeSafe's Jev: support-ticket triage, observability alert triage, and a deploy-risk gate.
  <sub>`Project` · ★0 · shivam2003-dev · `Py`</sub>

- **[typesafeai-review](https://github.com/rbalch/typesafeai-review)** — Using Typesafe.AI to generate diff reviews.
  <sub>`Project` · ★0 · rbalch · `Py` · ⚠ `no licence`</sub>

- **[zcode-jev](https://github.com/Zahrannnn/zcode-jev)** — Typed judgment layer for coding agents — gates from PRD to ship. Jev-ready, provider-agnostic.
  <sub>`Integration` · ★0 · zahrannnn · `TS` · ⚠ `no licence`</sub>

- **[jevai.org community showcase cases](https://www.jevai.org/cases)** — Nine worked community scenarios: intent routing, invoice classification, news filtering, product tagging, moderation, claim verification, CSV validation and more.
  <sub>`Project` · ⚠ `unverified`</sub>

</details>

### Overview

_Surveys the model or the space rather than one pattern._

<details>
<summary><b>301</b> rows — click to expand</summary>

- **[Official agent skill for Claude Code](https://docs.typesafe.ai/agent-skill)** ⭐ — Installs a TypeSafe skill into Claude Code so an agent can write correct Jev calls without you pasting the API shape each time.
  <sub>`Official docs` · ★1,645 · `sh`</sub>

- **[typesafe-ai/skills](https://github.com/typesafe-ai/skills)** ⭐ — The official agent-skills repository behind the Claude Code plugin, holding the SKILL.md that teaches an agent the System One API.
  <sub>`Plugin` · ★1,645 · `sh`</sub>

- **[system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python)** ⭐ — A drop-in TypeSafeClient replacement backed by ordinary LLM APIs, so you can run Jev-shaped code without Jev access.
  <sub>`SDK` · ★249 · `Py`</sub>

- **[@typesafe-ai/sdk (TypeScript / JavaScript)](https://github.com/typesafe-ai/typesafe-sdk-js)** ⭐ — The official TypeScript client. Ships ESM, CJS and type declarations, with lowercase choice()/score()/noul() helper factories.
  <sub>`SDK` · ★218 · `TS` · `JS` · `choice` · `score` · `noul`</sub>

- **[typesafe-sdk (Python)](https://github.com/typesafe-ai/typesafe-sdk-python)** ⭐ — The official Python client. Sync and async clients, retry policy with retry-after support, and Choice/Score/Noul helper classes.
  <sub>`SDK` · ★194 · `Py` · `choice` · `score` · `noul`</sub>

- **[API reference](https://docs.typesafe.ai/api)** ⭐ — The one endpoint, POST /v1/systemone, with the exact request and answer shapes for all three question types.
  <sub>`Official docs` · `sh` · `Py` · `TS`</sub>

- **[Models, pricing and limits](https://docs.typesafe.ai/models)** ⭐ — The authoritative sheet: jev-1.13.0, $0.042 per Mtok input with output free, 64k context, 32k for state plus the longest question, text input only.
  <sub>`Official docs` · `sh` · `Py` · `TS`</sub>

- **[Primitives: Choice, Score, Noul](https://docs.typesafe.ai/primitives)** ⭐ — What each primitive is for and how to write criteria, including the 255-option cap on Choice and the 2-10 level range on Score.
  <sub>`Official docs` · `Py` · `TS` · `choice` · `score` · `noul`</sub>

- **[Introducing System One models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)** ⭐ — The launch post: what a System One model is, why decisions were split from generation, and the vendor's latency and cost claims.
  <sub>`Article` · Diogo Almeida · ⚠ `vendor numbers`</sub>

- **[Jev 1.13 known limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)** ⭐ — The vendor's own list of where the model fails: literal reading, arithmetic and counting, date comparison, indirection, large noisy states, adversarial content.
  <sub>`Official docs`</sub>

- **[Use case map](https://docs.typesafe.ai/concepts/use-case-map)** ⭐ — The vendor's own taxonomy: five headline categories, nineteen industry groups, and ten decision shapes from classification through to structured data extraction.
  <sub>`Official docs`</sub>

- **[OpenCode Zen: Jev resale](https://github.com/anomalyco/opencode)** — A coding agent whose hosted gateway resells Jev, including a free tier model id.
  <sub>`Integration` · ★209,234 · `TS`</sub>

- **[langchain](https://github.com/langchain-ai/langchain)** — The agent engineering platform.
  <sub>`Project` · ★146,859 · langchain-ai · `Py`</sub>

- **[litellm](https://github.com/BerriAI/litellm)** — The fastest, litest AI Gateway. Rust core with Python SDK. Call 100+ LLM APIs in OpenAI (or native) format with cost tracking, guardrails, load balancing, and logging [Bedrock, Azure, OpenAI, Anthropic, OpenAI, VertexAI, vLLM, Nvidia NIM]
  <sub>`Integration` · ★59,374 · berriai · `Py` · ⚠ `no licence`</sub>

- **[oh-my-pi](https://github.com/can1357/oh-my-pi)** — ⌥ Coding agent with the IDE wired in
  <sub>`Project` · ★32,448 · can1357 · `TS`</sub>

- **[ai](https://github.com/vercel/ai)** — The AI Toolkit for TypeScript. From the creators of Next.js, the AI SDK is a free open-source library for building AI-powered applications and agents
  <sub>`SDK` · ★26,892 · vercel · `TS` · ⚠ `no licence`</sub>

- **[openwork](https://github.com/different-ai/openwork)** — The open-source alternative to Claude Cowork (powered by opencode)
  <sub>`Jev-like alternative` · ★23,687 · different-ai · `TS` · ⚠ `not Jev` `no licence`</sub>

- **[Opik TypeSafe tracker](https://github.com/comet-ml/opik/blob/main/sdks/python/src/opik/integrations/typesafe/opik_tracker.py)** — Wraps the sync and async clients so every system_one call is recorded as a traced span.
  <sub>`Project` · ★22,188 · `Py`</sub>

- **[pydantic-ai](https://github.com/pydantic/pydantic-ai)** — How Python does AI. Agents, realtime voice, image generation, embeddings. Every model, every interface, typed end to end.
  <sub>`Project` · ★20,111 · pydantic · `Py`</sub>

- **[eliza](https://github.com/elizaOS/eliza)** — Open source agentic operating system
  <sub>`Project` · ★19,403 · elizaos · `TS`</sub>

- **[@effect/ai-typesafe](https://github.com/Effect-TS/effect)** — Implements Effect's DecisionModel interface over Jev, with an unusually candid caveat about unverified rounding behaviour.
  <sub>`Integration` · ★16,167 · `TS` · `choice` · `score` · `noul`</sub>

- **[rig-typesafeai](https://github.com/0xPlaygrounds/rig)** — A Rust integration with compile-time-checked option counts, so an over-255 Choice fails to build rather than at runtime.
  <sub>`Integration` · ★8,693 · `Rs` · `choice` · `score` · `noul`</sub>

- **[deep-searcher](https://github.com/zilliztech/deep-searcher)** — Open Source Deep Research Alternative to Reason and Search on Private Data. Written in Python.
  <sub>`Jev-like alternative` · ★8,275 · zilliztech · `Py` · ⚠ `not Jev`</sub>

- **[Bifrost TypeSafe gateway route](https://github.com/maximhq/bifrost/tree/dev/core/providers/typesafe)** — A Go gateway provider that passes the native API through one-to-one, so the official SDKs work by changing only the base URL.
  <sub>`Project` · ★8,230 · `Go`</sub>

- **[Kiln: Jev adapter](https://github.com/Kiln-AI/Kiln)** — A JSON-Schema-to-question compiler wired into the adapter registry, with an honest note on what it cannot serve.
  <sub>`Integration` · ★5,078 · `Py` · `choice` · `score` · `noul`</sub>

- **[laya-mlx](https://github.com/mizorewww/laya-mlx)** — Native MLX runtime for Laya typed decision models — 7–14 ms short decisions on M3 Max. No text generation, PyTorch, or cloud API.
  <sub>`Project` · ★4,500 · mizorewww · `Py`</sub>

- **[ruby_llm: TypeSafe provider](https://github.com/crmne/ruby_llm)** — A Ruby provider with a dedicated System One protocol, the main route into Jev from Ruby.
  <sub>`Integration` · ★4,396 · `Rb` · `choice` · `score` · `noul`</sub>

- **[SemIf](https://github.com/TheoLeeCJ/SemIf)** — An independent semantic-if implementation that states up front it is unaffiliated with Jev or TypeSafe.
  <sub>`Jev-like alternative` · ★3,427 · `Py` · ⚠ `not Jev`</sub>

- **[ax](https://github.com/ax-llm/ax)** — The pretty much "official" DSPy framework for Typescript
  <sub>`Project` · ★2,943 · ax-llm · `TS`</sub>

- **[kev](https://github.com/jaredpalmer/kev)** — A trainable, self-hostable family of Jev-like decision models with a System One compatible API, so the official SDK can point at your own server.
  <sub>`Jev-like alternative` · ★2,764 · Jared Palmer · `Py` · `choice` · `score` · `noul` · ⚠ `not Jev`</sub>

- **[memsearch](https://github.com/zilliztech/memsearch)** — A persistent, unified memory layer for all your AI agents (e.g. Claude Code, Codex, DSH), backed by Markdown and Milvus.
  <sub>`Plugin` · ★2,634 · zilliztech · `Py`</sub>

- **[NanoJev](https://github.com/TianyuCodings/NanoJev)** — A self-described nano replica of Jev, for reading rather than for production.
  <sub>`Jev-like alternative` · ★1,887 · `Py` · ⚠ `not Jev`</sub>

- **[vellum-assistant](https://github.com/vellum-ai/vellum-assistant)** — An AI Assistant that’s easy to setup, does your work 24/7, knows your preferences and gets better over time.
  <sub>`Project` · ★1,298 · vellum-ai · `TS`</sub>

- **[jevlike](https://github.com/vinnylarouge/jevlike)** — An independent, trainable model with the same input and output shape as Jev: text plus N options in, one probability per option out, in a single pass.
  <sub>`Jev-like alternative` · ★1,183 · vinnylarouge · `Py` · ⚠ `not Jev`</sub>

- **[celesto](https://github.com/CelestoAI/celesto)** — Secure and persistent computer for AI agents -- build your own Grokbot, and Muse.
  <sub>`Project` · ★959 · celestoai · `Py`</sub>

- **[distill](https://github.com/samuelfaj/distill)** — Get FAR MORE done with FAR FEWER tokens 🔥
  <sub>`Project` · ★682 · samuelfaj · `Rs`</sub>

- **[aiavatarkit](https://github.com/uezo/aiavatarkit)** — 🥰 Building AI-based conversational avatars lightning fast ⚡️💬
  <sub>`Project` · ★678 · uezo · `Py`</sub>

- **[kody](https://github.com/kentcdodds/kody)** — 🐨 Your assistant's home — the memory, keys, code, and automations your AI agent keeps, portable across every MCP host. Built on Cloudflare Workers.
  <sub>`Plugin` · ★663 · kentcdodds · `TS` · ⚠ `no licence`</sub>

- **[req_llm](https://github.com/agentjido/req_llm)** — Composable Elixir library for LLM interactions built on Req and Finch
  <sub>`Project` · ★581 · agentjido · `Ex`</sub>

- **[simple-jev](https://github.com/featherless-ai/simple-jev)** — Turns any open-weights model into a Jev-shaped endpoint by reading next-token logits, with the server constructing the JSON rather than the model generating it.
  <sub>`Jev-like alternative` · ★462 · `Py` · ⚠ `not Jev`</sub>

- **[smithers](https://github.com/smithersai/smithers)** — Smithers is an agentic workflow framework for defining workflows in simple TypeScript configuration files and executing them quickly, durably, and reliably
  <sub>`Project` · ★420 · smithersai · `TS`</sub>

- **[jev-skill](https://github.com/wuyoscar/jev-skill)** — An agent skill plus CLI that validates all three primitives, requires explicit consent before a billed call, and forbids inventing output when simulating.
  <sub>`Plugin` · ★395 · `Py` · `choice` · `score` · `noul`</sub>

- **[awesome-jev-projects](https://github.com/logicrw/awesome-jev-projects)** — A sibling directory aiming at ecosystem breadth with commit-pinned sources, four README languages and a generated site.
  <sub>`Project` · ★339 · logicrw · `JS`</sub>

- **[openjev](https://github.com/razorback16/openjev)** — A Jev-compatible decision server on an open diffusion model.
  <sub>`Jev-like alternative` · ★288 · razorback16 · `Py` · ⚠ `not Jev`</sub>

- **[decider](https://github.com/Mapika/decider)** — A family of System One-style models fine-tuned from an open base for one-pass typed decisions.
  <sub>`Jev-like alternative` · ★287 · mapika · `Py` · ⚠ `not Jev`</sub>

- **[third-hand](https://github.com/shhivv/third-hand)** — computer-use assistant w/ decision models
  <sub>`Project` · ★287 · shhivv · `Swift`</sub>

- **[orchestkit](https://github.com/yonatangross/orchestkit)** — The Complete AI Development Toolkit for Claude Code. 106 skills, 36 agents, 171 hooks. Install `ork` for stable (v9.x), or `ork-alpha` for the v10 line, which ships daily.
  <sub>`Plugin` · ★283 · yonatangross · `TS`</sub>

- **[rizzo-flow](https://github.com/Rizzo-AI-Academy/rizzo-flow)** — The open, local take on Jev: typed decisions from an LLM, without generating a single token
  <sub>`Jev-like alternative` · ★261 · rizzo-ai-academy · `Py` · ⚠ `not Jev`</sub>

- **[openjev-sglang](https://github.com/ekzhang/openjev-sglang)** — A Jev-compatible endpoint served from open models, prefill only.
  <sub>`Jev-like alternative` · ★259 · ekzhang · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[awesome-jev (heyjunpenn)](https://github.com/heyjunpenn/awesome-jev)** — The broadest sibling directory: hundreds of projects in six languages, with a README that is itself the parsed data source.
  <sub>`Project` · ★256 · heyjunpenn · `TS` · ⚠ `no licence`</sub>

- **[pi-fabric](https://github.com/monotykamary/pi-fabric)** — A programmable tool and agent runtime for Pi
  <sub>`Project` · ★244 · monotykamary · `TS`</sub>

- **[typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp)** — The easiest first step once you have a key: registers Jev into Claude Code, Claude Desktop, Codex and Pi with one command.
  <sub>`Plugin` · ★234 · `Go` · `choice` · `score` · `noul`</sub>

- **[jev-chat-windows](https://github.com/jev-chat/jev-chat-windows)** — 微信（Windows 4.x）旁挂的回复辅助：窗口截图 + 本地离线 OCR 读对方消息 → Jev 判断意图 → 3 条候选一键填入，发送永远手动
  <sub>`Project` · ★217 · jev-chat · `Py` · ⚠ `no licence`</sub>

- **[laya](https://github.com/receptron/laya)** — Run Laya, the open-source Jev-compatible System-1 decision model, from Node.js / TypeScript via ONNX Runtime
  <sub>`Project` · ★216 · receptron · `TS`</sub>

- **[jeff](https://github.com/logan-markewich/jeff)** — A self-hosted drop-in replacement for TypeSafe's jev, powered by GliFormer.
  <sub>`Jev-like alternative` · ★207 · logan-markewich · `Py` · ⚠ `not Jev`</sub>

- **[awesome-jev (fatwang2)](https://github.com/fatwang2/awesome-jev)** — A sibling directory whose submissions are reviewed by Jev itself, with a notably thorough list of multi-language community clients.
  <sub>`Project` · ★187 · fatwang2 · `JS`</sub>

- **[openwhisper](https://github.com/Knuckles92/OpenWhisper)** — Local speech-to-text, dictation, and meetings with Whisper and OpenAI API. Optional Windows x64 engines: Parakeet, Qwen3-ASR, Nemotron Streaming, and Moonshine.
  <sub>`Project` · ★187 · knuckles92 · `Py`</sub>

- **[djev-spark](https://github.com/mmastrac/djev-spark)** — DiffusionGemma NVFP4 structured decisions on a DGX Spark: container recipe
  <sub>`Project` · ★170 · mmastrac · `TS` · ⚠ `no licence`</sub>

- **[runline](https://github.com/Michaelliv/runline)** — ⚡ Code mode for agents
  <sub>`Project` · ★163 · michaelliv · `TS` · ⚠ `no licence`</sub>

- **[crush-monitor](https://github.com/FerryCorleone/crush-monitor)** — Crush 好感监控器：用 Jev 分析微信聊天的情绪、意图和回复表现。本机部署，使用自己的 API Key。
  <sub>`Project` · ★159 · ferrycorleone · `TS`</sub>

- **[jev-chat-jarvis-mac](https://github.com/jev-chat/jev-chat-jarvis-mac)** — 微信消息意图识别悬浮窗（macOS）：看屏 + 本地小模型判断意图和风险，再按话术生成回复候选。纯只读、不注入微信。
  <sub>`Project` · ★147 · jev-chat · `Py`</sub>

- **[dasheng](https://github.com/wquguru/dasheng)** — 大声读 — R2T2 流式 ASR 听，Jev 逐词判，英文朗读评分
  <sub>`Project` · ★130 · wquguru · `JS` · ⚠ `no licence`</sub>

- **[stanley-code](https://github.com/devagrawal09/stanley-code)** — Bounded TypeSafe Jev workflows for coding agents.
  <sub>`Project` · ★111 · devagrawal09 · `TS`</sub>

- **[open-jev](https://github.com/daseinlabs/open-jev)** — Open Jev implementation with custom finetuning
  <sub>`Jev-like alternative` · ★95 · daseinlabs · `Py` · ⚠ `not Jev` `no licence`</sub>

- **[advocaat](https://github.com/pithings/advocaat)** — A small typed client for asking questions about your own data.
  <sub>`SDK` · ★89 · pithings · `TS`</sub>

- **[laya-ultrafast](https://github.com/ipenywis/laya-ultrafast)** — Same as jev-ultrafast but using Laya
  <sub>`Project` · ★88 · ipenywis · `Py`</sub>

- **[webctl](https://github.com/dorkitude/webctl)** — Smart web search CLI for agents, backed by Jev. Saves a lot of tokens.
  <sub>`Project` · ★79 · dorkitude · `Go`</sub>

- **[jev-leftpad](https://github.com/f/jev-leftpad)** — Left-pad strings with TypeSafe AI's Jev. For reasons.
  <sub>`Project` · ★78 · f · `JS`</sub>

- **[laya-vs-jev](https://github.com/virajbhartiya/laya-vs-jev)** — Laya vs Jev: local MLX and hosted AI decisions playing T-Rex side by side, with live metrics and replay recording
  <sub>`Project` · ★74 · virajbhartiya · `Py`</sub>

- **[captaincore](https://github.com/CaptainCore/captaincore)** — 👨🏽‍💻 CaptainCore is a command line application for automating WordPress maintenance.
  <sub>`Project` · ★71 · captaincore · `Go`</sub>

- **[jevbench](https://github.com/fstandhartinger/jevbench)** — JevBench v1 - a benchmark for Jev-class typed decision models: smart, cheap, fast, reliable, open.
  <sub>`Benchmark` · ★71 · fstandhartinger · `Py`</sub>

- **[jev-voice](https://github.com/kevinbadi/jev-voice)** — Talk to your Mac. Local whisper.cpp + one Jev (TypeSafe) call per command + macOS automation.
  <sub>`Project` · ★68 · kevinbadi · `Py`</sub>

- **[agent-router](https://github.com/nidhi-singh02/agent-router)** — CLI that picks Cursor, Claude Code, Codex, or OpenCode + model/effort for a task, then launches it. Powered by Jev and Herdr
  <sub>`Plugin` · ★63 · nidhi-singh02 · `TS`</sub>

- **[dspy-typesafeify](https://github.com/typesafeainate/dspy-typesafeify)** — Add a decorator for dspy Signatures that automatically uses TypeSafe where relevant
  <sub>`Project` · ★61 · typesafeainate · `Py`</sub>

- **[OpenDecision](https://github.com/deepanwadhwa/OpenDecision)** — An open-source semantic decision engine running a local zero-shot model, with a FastAPI server proven wire-compatible with the official SDK.
  <sub>`Jev-like alternative` · ★52 · deepanwadhwa · `Py` · `choice` · `score` · `noul` · ⚠ `not Jev`</sub>

- **[jev-paint](https://github.com/achimala/jev-paint)** — Use Jev to make art!
  <sub>`Project` · ★49 · achimala · `JS`</sub>

- **[ruby_decision_model](https://github.com/obie/ruby_decision_model)** — Ruby client for decision models such as Typesafe Jev
  <sub>`SDK` · ★49 · obie · `Rb`</sub>

- **[jev-rules](https://github.com/EliaAlberti/jev-rules)** — Jev picks which of your rules apply to each prompt, so Claude only sees the ones that matter.
  <sub>`Project` · ★46 · eliaalberti · `JS`</sub>

- **[cultivar](https://github.com/pinecone-io/cultivar)** — Use cultivar to test your Agent Skills and Docs by running them in sandboxes, and across different agents.
  <sub>`Project` · ★40 · pinecone-io · `Py`</sub>

- **[litjev](https://github.com/zhengxuyu/litjev)** — Turn any off-the-shelf LLM into a Jev -like decision layer
  <sub>`Jev-like alternative` · ★38 · zhengxuyu · `Py` · ⚠ `not Jev`</sub>

- **[openthai-systemone](https://github.com/iapp-technology/openthai-systemone)** — OpenThai-SystemOne: open Thai + English System One decision model (0.8B, 256-way slot head, Apache-2.0)
  <sub>`Project` · ★38 · iapp-technology · `Py`</sub>

- **[ask-jev-skill](https://github.com/shantanugoel/ask-jev-skill)** — Skill for Hermes, and other agents, to ask typesafe's jev
  <sub>`Plugin` · ★37 · shantanugoel · `Py`</sub>

- **[typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark)** — A gateway that mimics the structured-output shape, used to benchmark against it.
  <sub>`Benchmark` · ★37 · iammrduncan · `TS`</sub>

- **[call-coach-ai](https://github.com/ZeroGold/call-coach-ai)** — Jev powered call coach
  <sub>`Project` · ★35 · zerogold · `TS`</sub>

- **[jev-spring-boot-starter](https://github.com/danvega/jev-spring-boot-starter)** — A simple Spring Boot 4 starter for TypeSafe Jev using Spring MVC and RestClient
  <sub>`Plugin` · ★33 · danvega · `Java` · ⚠ `no licence`</sub>

- **[jev-seo](https://github.com/AkashPriyadarshii/jev-seo)** — 100% free ₹0 agent-first SEO & GEO CLI suite and MCP server in Rust replacing Semrush and OpenSEO via DuckDuckGo and TypeSafe Jev System One https://akashpriyadarshii.github.io/jev-seo/
  <sub>`Plugin` · ★32 · akashpriyadarshii · `Rs`</sub>

- **[jev-skill-suggester](https://github.com/win4r/jev-skill-suggester)** — 用 TypeSafe Jev 推荐已安装 Skill / Bounded installed-skill recommendations with TypeSafe Jev. Python CLI, Codex skill, bilingual docs and live examples.
  <sub>`Plugin` · ★32 · win4r · `Py`</sub>

- **[jev (Elixir/OTP)](https://github.com/dannote/jev)** — Jev as an OTP process: reply from a GenServer and pattern match on the answer.
  <sub>`SDK` · ★28 · dannote · `Ex`</sub>

- **[st-jeved](https://github.com/mossyfield/ST-jeved)** — SillyTavern extension that measures each reply and instructs the narrator only when a rule matches.
  <sub>`Plugin` · ★28 · mossyfield · `JS`</sub>

- **[jeview](https://github.com/andududu/jeview)** — An unofficial local visualizer for Jev (TypeSafe): a live view of every call your code makes. Not affiliated with TypeSafe AI.
  <sub>`Project` · ★27 · andududu · `JS`</sub>

- **[refgarden](https://github.com/AlbionaHoti/refgarden)** — A spatial reference explorer for creators. Local Jev query choices, metadata highlights and source-linked collections.
  <sub>`Jev-like alternative` · ★27 · albionahoti · `TS` · ⚠ `not Jev`</sub>

- **[typesafe](https://github.com/krzyzanowskim/TypeSafe)** — TypeSafe SDK in Swift
  <sub>`SDK` · ★27 · krzyzanowskim · `Swift`</sub>

- **[djev](https://github.com/mmastrac/djev)** — Jev-style structured decisions on DiffusionGemma: the example server from vLLM PR 57250
  <sub>`Jev-like alternative` · ★26 · mmastrac · `Py` · ⚠ `not Jev`</sub>

- **[loki](https://github.com/wundercorp/loki)** — The agent that evolves with you 𖤍
  <sub>`Project` · ★26 · wundercorp · `Py`</sub>

- **[jev-trades](https://github.com/zadescoxp/Jev-Trades)** — Trading bot with the all new TypeSafe AI's first system one model named as Jev
  <sub>`Project` · ★24 · zadescoxp · `Py`</sub>

- **[jev-register-tool](https://github.com/2951461586/Jev-Register-Tool)** — TypeSafe（Jev / System One）申请 → 确认邮件 → 获批 → 注册 → 建 API Key 全链路工具，纯 HTTP 无浏览器
  <sub>`Project` · ★22 · 2951461586 · `Py` · ⚠ `no licence`</sub>

- **[laya-vs-jev-arena](https://github.com/PromptEngineer48/laya-vs-jev-arena)** — Laya (open source, local) vs TypeSafe Jev (API): two AI models race in Snake and fight in a Mortal-Kombat-style arena. Every move is a real model decision.
  <sub>`Project` · ★22 · promptengineer48 · `JS`</sub>

- **[jevify](https://github.com/altryne/jevify)** — An agent skill to discover TypeSafe Jev opportunities, design typed questions, and learn from recent community experiments.
  <sub>`Plugin` · ★21 · altryne · `Py`</sub>

- **[jot](https://github.com/runta-dev/jot)** — The first general-purpose System One agent for Jev
  <sub>`Project` · ★19 · runta-dev · `TS` · ⚠ `no licence`</sub>

- **[ruby_llm-typesafe](https://github.com/kieranklaassen/ruby_llm-typesafe)** — A structured-output provider for a Ruby LLM library.
  <sub>`Integration` · ★18 · kieranklaassen · `Rb`</sub>

- **[jevocks](https://github.com/unicodeveloper/jevocks)** — Everyday Stocks Status with Jev
  <sub>`Project` · ★16 · unicodeveloper · `TS` · ⚠ `no licence`</sub>

- **[jev-studio](https://github.com/utk2103/jev-studio)** — if you're experimenting with jev it will be easier from here
  <sub>`Project` · ★15 · utk2103 · `Py`</sub>

- **[jevvy](https://github.com/PanAchy/jevvy)** — Jev-powered plugins for coding agents
  <sub>`Plugin` · ★15 · panachy · `TS`</sub>

- **[clash-jev](https://github.com/bytelabs-oss/clash-jev)** — A Clash Royale bot with no trained policy: Jev (TypeSafe System One) makes every decision from the live game state
  <sub>`Project` · ★14 · bytelabs-oss · `Py`</sub>

- **[open-spark-jev](https://github.com/abhishek085/open-spark-jev)** — Open-source, local decision models inspired by TypeSafe’s Jev and System One - built on Qwen3 for NVIDIA DGX Spark.
  <sub>`Project` · ★14 · abhishek085 · `Py`</sub>

- **[swift-typesafe](https://github.com/ainame/swift-typesafe)** — Unofficial Swift SDK for TypeSafe
  <sub>`SDK` · ★14 · ainame · `Swift`</sub>

- **[jev](https://github.com/BorisLeMeec/jev)** — A claude code plugin for jev
  <sub>`Plugin` · ★13 · borislemeec · `Go`</sub>

- **[jev-foundation-models](https://github.com/peterfriese/jev-foundation-models)** — A lightweight, native Swift 6 bridge integrating TypeSafe AI's Jev System One decision model into Apple's Foundation Models framework.
  <sub>`Project` · ★13 · peterfriese · `Swift`</sub>

- **[jev-tetris](https://github.com/trungdq88/jev-tetris)** — Jev play Tetris in real-time against other AI models
  <sub>`Project` · ★13 · trungdq88 · `JS` · ⚠ `no licence`</sub>

- **[jev-vs-ml](https://github.com/QuicqDev/Jev-vs-ML)** — Jev-vs-ML
  <sub>`Project` · ★13 · quicqdev · `Py` · ⚠ `no licence`</sub>

- **[jevloop](https://github.com/zjunlp/JevLoop)** — The agent loop where decisions don't cost a large language model call. Zero deps, runs offline, no API key needed.
  <sub>`Project` · ★13 · zjunlp · `TS`</sub>

- **[jev-cli](https://github.com/tumf/jev-cli)** — Small dependency-free CLI for TypeSafe Jev
  <sub>`SDK` · ★12 · tumf · `Py`</sub>

- **[jev_stock](https://github.com/sosopop/jev_stock)** — An experimental JEV-powered framework for forecasting short-term stock price direction from structured market data.
  <sub>`Project` · ★12 · sosopop · `Py` · ⚠ `no licence`</sub>

- **[jevthoven](https://github.com/cocktailpeanut/jevthoven)** — AI Music (MIDI) generator powered by Jev
  <sub>`Project` · ★12 · cocktailpeanut · `TS`</sub>

- **[typesafe-skill-router](https://github.com/DECRUX9812/typesafe-skill-router)** — TypeSafe (Jev) skill routing for Hermes Agent: names the one skill worth loading, before the model call. Opt-in, stdlib only, ~$0.001 per routed turn.
  <sub>`Plugin` · ★12 · decrux9812 · `Py`</sub>

- **[typesafe-ai](https://github.com/Twister915/typesafe-ai)** — Typed TypeSafe AI clients for Rust, with async and blocking backends and observable retries.
  <sub>`SDK` · ★11 · twister915 · `Rs`</sub>

- **[typesafe-playground](https://github.com/kavehmz/typesafe-playground)** — Interactive experiments with TypeSafe Jev, from support routing to 3D driving simulations with real AI decisions and visible sensor inputs.
  <sub>`Project` · ★11 · kavehmz · `JS` · ⚠ `no licence`</sub>

- **[jev-chat-for-twitch](https://github.com/ethanplusai/jev-chat-for-twitch)** — Filter any live Twitch chat with Jev: a bring-your-own-key Chrome extension
  <sub>`Plugin` · ★10 · ethanplusai · `JS`</sub>

- **[jevernetes](https://github.com/sunil-sadasivan/jevernetes)** — Live Kubernetes log analysis, contextual investigation, and agent handoff powered by Jev.
  <sub>`Project` · ★10 · sunil-sadasivan · `Py`</sub>

- **[pi-quiet-ask](https://github.com/HyunjunJeon/pi-quiet-ask)** — TypeSafe Jev as the pi coding agent's quiet decision layer
  <sub>`Project` · ★10 · hyunjunjeon · `TS`</sub>

- **[xtags](https://github.com/manifoldor/xtags)** — 在 X 的时间线上，给每条帖子标出它想让你干什么。判断来自 Jev，一个只返回概率、不生成文本的模型。
  <sub>`Project` · ★10 · manifoldor · `JS`</sub>

- **[jev_project_context](https://github.com/poiuyjie/jev_project_context)** — Evidence-first long-term experiment memory skill for AI coding agents, with optional Jev decision-model layers
  <sub>`Plugin` · ★9 · poiuyjie · `Py`</sub>

- **[jevgraph](https://github.com/chenmingtang830/jevgraph)** — Evidence-backed knowledge graph construction with typed Jev relation decisions
  <sub>`Project` · ★9 · chenmingtang830 · `Py`</sub>

- **[typesafe-sdk-go](https://github.com/Tangerg/typesafe-sdk-go)** — Go SDK for the TypeSafe AI API — typed questions in, probability distributions out.
  <sub>`SDK` · ★9 · tangerg · `Go`</sub>

- **[jev-minesweeper](https://github.com/comoc/jev-minesweeper)** — TypeSafe Jev (System One) にブラウザ上のマインスイーパーを解かせるデモ
  <sub>`Project` · ★8 · comoc · `JS` · ⚠ `no licence`</sub>

- **[jev-grand-prix](https://github.com/enoyola/jev-grand-prix)** — An F1 racing game where TypeSafe's Jev picks the racing line and the pedals, and learns each corner's limit between laps
  <sub>`Project` · ★7 · enoyola · `JS`</sub>

- **[jev_jsonschema](https://github.com/Kiln-AI/jev_jsonschema)** — Run a JSON Schema through TypeSafe's Jev API, and get JSON back.
  <sub>`Project` · ★7 · kiln-ai · `Py`</sub>

- **[edgejev](https://github.com/yzfly/edgejev)** — 离线可用的本地类型化决策：4 核 CPU 单题 15.6ms。Local & offline Jev / System One inference on CPU — ONNX + INT8, no torch at runtime. 支持 laya / kev / PlayJev
  <sub>`Project` · ★6 · yzfly · `Py` · ⚠ `no licence`</sub>

- **[jev-benchmark](https://github.com/wondertwins/jev-benchmark)** — Benchmarks and a playground for TypeSafe's Jev (System One) model: chess, and who-is-the-player-talking-to for speech-to-text game NPCs
  <sub>`Benchmark` · ★6 · wondertwins · `Py`</sub>

- **[jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark)** — Reproducible early-access evaluation of Jev on Korean understanding and medical text, with runtime and cost evidence
  <sub>`Benchmark` · ★6 · mahlernim · `Py` · ⚠ `no licence`</sub>

- **[jev-search](https://github.com/larguesa/jev-search)** — Experimental semantic line search with TypeSafe Jev via OpenRouter. Python CLI with no runtime dependencies.
  <sub>`Project` · ★6 · larguesa · `Py`</sub>

- **[jev-yt-time-saver](https://github.com/jaibhasin/jev-yt-time-saver)** — A Chrome extension that covers distracting YouTube videos with Jev. Show anyway whenever you want.
  <sub>`Plugin` · ★6 · jaibhasin · `JS` · ⚠ `no licence`</sub>

- **[jevtest](https://github.com/joshhu/jevtest)** — 情緒測謊器：嘴上說「好」，心裡真的好嗎？用 TypeSafe Jev（System One 模型）透過 OpenRouter 即時判斷，並與一般 LLM 對照
  <sub>`Project` · ★6 · joshhu · `TS` · ⚠ `no licence`</sub>

- **[secondlayer](https://github.com/ryanwaits/secondlayer)** — Decoded Stacks data in your own database. Self-hosted.
  <sub>`Project` · ★6 · ryanwaits · `TS`</sub>

- **[typesafe-sdk](https://github.com/joshmn/typesafe-sdk)** — Ruby client for typesafe.ai
  <sub>`SDK` · ★6 · joshmn · `Rb`</sub>

- **[typesafeai-dotnet-sdk](https://github.com/saibimajdi/typesafeai-dotnet-sdk)** — Community .NET SDK for the TypeSafe AI System One API — typed noul, choice, and score questions with structured, confidence-scored answers. Not affiliated with TypeSafe AI.
  <sub>`SDK` · ★6 · saibimajdi · `C#`</sub>

- **[ai-elo-ranker](https://github.com/opaielsheikh/ai-elo-ranker)** — High-speed recursive AI Elo tournament engine powered by Jev and Swiss matchmaking
  <sub>`Project` · ★5 · opaielsheikh · `Py` · ⚠ `no licence`</sub>

- **[awesome-jev](https://github.com/daftAI2026/awesome-jev)** — TypeSafe System One / Jev community directory — GitHub projects & posts around typed decisions (typesafe.ai)
  <sub>`Project` · ★5 · daftai2026 · `TS` · ⚠ `no licence`</sub>

- **[jev-little-airways](https://github.com/lbotinelly/jev-little-airways)** — A show-and-tell capability study for Jev, TypeSafe's System One decision model.
  <sub>`Benchmark` · ★5 · lbotinelly · `TS`</sub>

- **[jev4k](https://github.com/pambrose/jev4k)** — A Kotlin DSL and client for TypeSafe's Jev model
  <sub>`SDK` · ★5 · pambrose · `Kt`</sub>

- **[jevplayspokemon](https://github.com/anxkhn/JevPlaysPokemon)** — Jev plays Generation 3 Pokémon via Showdown and a real FireRed ROM.
  <sub>`Project` · ★5 · anxkhn · `TS`</sub>

- **[legalforecastbench](https://github.com/johnhughes3/LegalForecastBench)** — LegalForecast-MTD benchmark alpha and official evaluation workflows
  <sub>`Benchmark` · ★5 · johnhughes3 · `Py`</sub>

- **[mcts-agent](https://github.com/lhemerly/mcts-agent)** — Discriminative Monte Carlo Tree Search using TypeSafe Jev System One Primitives and Gemini
  <sub>`Project` · ★5 · lhemerly · `Py`</sub>

- **[typesafe_sdk (Elixir)](https://github.com/nshkrdotcom/typesafe_sdk)** — An Elixir port of the official SDK.
  <sub>`SDK` · ★5 · nshkrdotcom · `Ex`</sub>

- **[jev-bot](https://github.com/nssmd/jev-bot)** — Self-hosted Jev decision workbench and Feishu bot: automatic choices, probabilities, and experimental word/character writing.
  <sub>`Project` · ★4 · nssmd · `JS`</sub>

- **[jev-docs-zh](https://github.com/Bald0Wang/jev-docs-zh)** — Jev 模型（TypeSafe AI）官方使用文档的中文翻译 \| Unofficial Chinese translation of the official Jev (TypeSafe AI) docs — https://docs.typesafe.ai
  <sub>`Project` · ★4 · bald0wang · `Py` · ⚠ `no licence`</sub>

- **[jev-grug](https://github.com/mkotlikov/jev-grug)** — Helping JEV speak <3
  <sub>`Project` · ★4 · mkotlikov · `TS`</sub>

- **[jev-plays-pokemon](https://github.com/milanboers/jev-plays-pokemon)** — Playing Pokemon Red using TypeSafe Jev
  <sub>`Project` · ★4 · milanboers · `Py` · ⚠ `no licence`</sub>

- **[jev-realtime-trading](https://github.com/rthomas24/jev-realtime-trading)** — Paper trading agents on a live tape, decided every second by TypeSafe's Jev (System One). Electron desktop app.
  <sub>`Project` · ★4 · rthomas24 · `TS`</sub>

- **[jev-system-one](https://github.com/haseeb-heaven/jev-system-one)** — A polished OpenAI + TypeSafe Jev terminal interface for answers with transparent decision reports
  <sub>`Project` · ★4 · haseeb-heaven · `Py`</sub>

- **[laya-jev-lab](https://github.com/yibie/laya-jev-lab)** — Independent measurements of typed-decision models: Jev (TypeSafe API) vs Laya (open weights), and a local-first cascade that matches Jev's accuracy at 1.8x the speed
  <sub>`Project` · ★4 · yibie · `Py`</sub>

- **[rubikjev](https://github.com/0xtrou/rubikjev)** — Challenge the Jev's intelligence in Rubik Cube puzzles
  <sub>`Project` · ★4 · 0xtrou · `TS` · ⚠ `no licence`</sub>

- **[rust-sysone](https://github.com/zcoder-run/rust-sysone)** — System One TypeSafe AI Rust Client (unofficial)
  <sub>`Project` · ★4 · zcoder-run · `Rs`</sub>

- **[trade-jev](https://github.com/justinhe16/trade-jev)** — Backtest Jev (TypeSafe) as a BUY/SELL/HOLD trader on NQ L10 order-book data
  <sub>`Project` · ★4 · justinhe16 · `Py`</sub>

- **[typesafe-ai-rs](https://github.com/gilljon/typesafe-ai-rs)** — Independent async and blocking Rust SDK for the TypeSafe AI System One API
  <sub>`SDK` · ★4 · gilljon · `Rs`</sub>

- **[typesafe-sdk-swift](https://github.com/alterhq/typesafe-sdk-swift)** — Unofficial Swift library for the TypeSafe API
  <sub>`SDK` · ★4 · alterhq · `Swift`</sub>

- **[alphaoptimizer](https://github.com/alpha-tales/alphaoptimizer)** — Jev-powered output optimization for Codex, built to keep large tool results concise and usable.
  <sub>`Plugin` · ★3 · alpha-tales · `TS`</sub>

- **[everything-about-jev](https://github.com/qingshungLI/everything-about-jev)** — tell you everything about jev,TypeSafe AI's System One model for typed decisions.
  <sub>`Project` · ★3 · qingshungli · `Py`</sub>

- **[jcm-router](https://github.com/adarshmishra07/jcm-router)** — Local proxy that picks the Claude model and effort per message using TypeSafe Jev. Routes subagents, leaves your cached main chat alone.
  <sub>`Project` · ★3 · adarshmishra07 · `TS`</sub>

- **[jev-chat](https://github.com/adhyaay-karnwal/jev-chat)** — A chatbot from typed Jev decisions: hierarchical speculative decoding over System One probabilities.
  <sub>`Project` · ★3 · adhyaay-karnwal · `Py`</sub>

- **[jev-chat-windows-deepseek-jev](https://github.com/Aimark-dai/jev-chat-windows-deepseek-jev)** — Windows 微信回复助手：DeepSeek 官方生成话术，TypeSafe JEV 官方判断排序，支持可取消的 3 秒自动发送。
  <sub>`Project` · ★3 · aimark-dai · `Py` · ⚠ `no licence`</sub>

- **[jev-java](https://github.com/Olti1947/jev-java)** — Idiomatic Java SDK for TypeSafe AI Jev System One decision engine
  <sub>`SDK` · ★3 · olti1947 · `Java` · ⚠ `no licence`</sub>

- **[jev-resume-disqualifier](https://github.com/AiPersonacademy/jev-resume-disqualifier)** — Jev Resume Disqualifier: Sub-25ms automated resume knockout engine powered by TypeSafe Jev System One decision intelligence. Eliminates 80% of unqualified applicants with deterministic date math & EEOC-safe rejection notices.
  <sub>`Project` · ★3 · aipersonacademy · `Py`</sub>

- **[jev-wingman](https://github.com/1104480426-hash/jev-wingman)** — 基于 Jev 的聊天决策辅助，不挑 App（QQ / 微信 / 飞书皆可）· An on-device chat co-pilot that returns typed verdicts instead of prose, built on Jev
  <sub>`Project` · ★3 · 1104480426-hash · `Java`</sub>

- **[new-api-plugin-typesafe](https://github.com/FFatTiger/new-api-plugin-typesafe)** — TypeSafe AI System One (Jev) task plugin for QuantumNous/new-api — native /v1/systemone, synchronous evaluation, token billing
  <sub>`Plugin` · ★3 · ffattiger · `JS`</sub>

- **[should-ai-kill-us-all](https://github.com/hellogumbo/should-ai-kill-us-all)** — We ask Jev, TypeSafe AI's System One model, whether AI should kill us all. Every ten minutes. Using the actual headlines.
  <sub>`Project` · ★3 · hellogumbo · `JS`</sub>

- **[soupbase](https://github.com/spoonnotfound/soupbase)** — Jev x 海龟汤
  <sub>`Project` · ★3 · spoonnotfound · `TS`</sub>

- **[switchboard](https://github.com/ruban-24/switchboard)** — An open-source, model-agnostic decision router for Claude Code and Codex.
  <sub>`Plugin` · ★3 · ruban-24 · `TS`</sub>

- **[systemone-lite](https://github.com/fritzprix/systemone-lite)** — Toy local System One–style decision API (Jev-shaped). Not affiliated with TypeSafe.
  <sub>`Project` · ★3 · fritzprix · `Py`</sub>

- **[typesafe-assist](https://github.com/JanOstrowka/typesafe-assist)** — Home Assistant Assist conversation agent powered by TypeSafe's Jev (System One) model
  <sub>`Project` · ★3 · janostrowka · `Py` · ⚠ `no licence`</sub>

- **[typesafe-sdk-java](https://github.com/Premo-Cloud/typesafe-sdk-java)** — Community Java client for the TypeSafe System One API (unofficial)
  <sub>`SDK` · ★3 · premo-cloud · `Java`</sub>

- **[typesafe-sdk-rust](https://github.com/codeitlikemiley/typesafe-sdk-rust)** — Rust SDK for the TypeSafe AI API
  <sub>`SDK` · ★3 · codeitlikemiley · `Rs`</sub>

- **[agent-jev-tetris](https://github.com/Yasserbhb/Agent-JEV-Tetris)** — using the new model JEV to play the game tetris
  <sub>`Project` · ★2 · yasserbhb · `TS` · ⚠ `no licence`</sub>

- **[ailerix](https://github.com/tylerjharden/ailerix)** — Type-safe model router. Jev (System One) banks each request to a typed catalog route.
  <sub>`Project` · ★2 · tylerjharden · `TS` · ⚠ `no licence`</sub>

- **[auto-mode-for-paseo](https://github.com/obetomuniz/auto-mode-for-paseo)** — A Paseo provider that uses TypeSafe Jev to route each Codex turn.
  <sub>`Plugin` · ★2 · obetomuniz · `TS`</sub>

- **[barrunto](https://github.com/elpumberto/barrunto)** — A Chrome extension that brings TypeSafe's Jev to X.com to analyze posts as you browse
  <sub>`Plugin` · ★2 · elpumberto · `TS`</sub>

- **[btc-jev-signal](https://github.com/WebGrga/btc-jev-signal)** — Experimental multi-horizon BTC signal generator using TypeSafe Jev probabilities and Binance market data.
  <sub>`Project` · ★2 · webgrga · `TS` · ⚠ `no licence`</sub>

- **[emoji-jev](https://github.com/colinmcdermott/emoji-jev)** — Emoji autocomplete at the speed of typing. TypeSafe AI Jev on a Whop-hosted TanStack Start app.
  <sub>`Project` · ★2 · colinmcdermott · `TS` · ⚠ `no licence`</sub>

- **[git-jev-stage](https://github.com/ibrahemid/git-jev-stage)** — Select Git changes for staging with a plain-language description.
  <sub>`Project` · ★2 · ibrahemid · `TS`</sub>

- **[got-jev](https://github.com/phureewat29/jev-got)** — Jev (TypeSafe AI) PoC through Game of Thrones
  <sub>`Project` · ★2 · phureewat29 · `TS` · ⚠ `no licence`</sub>

- **[ha-conversation-jev](https://github.com/luxus/ha-conversation-jev)** — Home Assistant custom component: Conversation agent with Jev fast-path + Grok fallback
  <sub>`Project` · ★2 · luxus · `Py` · ⚠ `no licence`</sub>

- **[jear](https://github.com/iJ03l/jear)** — Jev-routed client for NEAR AI Cloud inference and IronClaw agents.
  <sub>`SDK` · ★2 · ij03l · `Rs`</sub>

- **[jev-2048](https://github.com/ARCJ137442/jev-2048)** — An instrumented 2048 web lab where every move is a Jev (TypeSafe AI System One) Choice, with no heuristic fallback \| 用 Jev 决策模型驱动每一步的 2048 网页实验台，概率、置信度、延迟与成本全部摊开可见，且刻意不做启发式兜底
  <sub>`Project` · ★2 · arcj137442 · `TS`</sub>

- **[jev-agent-failure-benchmark](https://github.com/TokenTrim/jev-agent-failure-benchmark)** — Benchmarking Jev (Typesafe.ai) against a strong LLM on the Who&When Pro agent-failure-attribution benchmark (text subset).
  <sub>`Benchmark` · ★2 · tokentrim · `Py`</sub>

- **[jev-android](https://github.com/dougsong/jev-android)** — A Kotlin Android SDK for UI automation powered by TypeSafe Jev, with an accessibility runtime and sample app.
  <sub>`SDK` · ★2 · dougsong · `Kt`</sub>

- **[jev-arena-nanojev](https://github.com/liao96312/jev-arena-nanojev)** — 完全本地的 NanoJev 网格决策游戏实验场，支持中文 Pygame、多关卡与 GTX 1660S 训练
  <sub>`Project` · ★2 · liao96312 · `Py` · ⚠ `no licence`</sub>

- **[jev-broadcast-lab](https://github.com/4anti/jev-broadcast-lab)** — Testing Lab for Jev AI
  <sub>`Project` · ★2 · 4anti · `JS` · ⚠ `no licence`</sub>

- **[jev-canvas](https://github.com/gaborishka/jev-canvas)** — Draw on a tldraw canvas with your voice and a pointing finger. Jev (TypeSafe System One) decides action, target and place in ~350 ms per spoken word.
  <sub>`Project` · ★2 · gaborishka · `JS`</sub>

- **[jev-codex-router-skill](https://github.com/455-dIAO/jev-codex-router-skill)** — Portable Codex Skill for Jev model and reasoning-effort routing, with safe installation and Chinese usage guides
  <sub>`Plugin` · ★2 · 455-diao · `Py` · ⚠ `no licence`</sub>

- **[jev-cvss](https://github.com/Red5d/jev-cvss)** — Fast CVSS scoring from vulnerability descriptions using Typesafe Jev
  <sub>`Project` · ★2 · red5d · `Py`</sub>

- **[jev-pii-checker](https://github.com/coo-quack/jev-pii-checker)** — CLI that finds PII in text with TypeSafe Jev: presence, sensitivity, and located spans
  <sub>`Project` · ★2 · coo-quack · `TS`</sub>

- **[jev-routing-experiment](https://github.com/TokenTrim/jev-routing-experiment)** — Benchmarking TypeSafe's Jev decision model as a cost-efficient LLM router on RouterArena
  <sub>`Benchmark` · ★2 · tokentrim · `Py`</sub>

- **[jev4mellea](https://github.com/SoundBlaster/Jev4Mellea)** — Jev adapter for Mellea
  <sub>`Integration` · ★2 · soundblaster · `Py`</sub>

- **[jevclient](https://github.com/AboveColin/jevclient)** — Async Python client for TypeSafe Jev. Typed questions in, probabilities and choices out, no prose to parse.
  <sub>`SDK` · ★2 · abovecolin · `Py`</sub>

- **[jevgo](https://github.com/fgn/jevgo)** — Go client for TypeSafe AI's System One API (Jev), with optional Langfuse instrumentation
  <sub>`SDK` · ★2 · fgn · `Go`</sub>

- **[jevopt](https://github.com/Ramneet-Singh/jevopt)** — Making intelligent compiler optimisation decisions with Jev
  <sub>`Project` · ★2 · ramneet-singh · `Py`</sub>

- **[jevslop](https://github.com/TKY-27/JevSlop)** — Jevによるnote記事のAI Slop判定サイト
  <sub>`Project` · ★2 · tky-27 · `TS`</sub>

- **[jevtown](https://github.com/gaborishka/jevtown)** — Jevtown: a social network where people write and 10,000 AI personas react
  <sub>`Project` · ★2 · gaborishka · `JS`</sub>

- **[midscene-jev-runner](https://github.com/KiritoKing/midscene-jev-runner)** — Community-maintained JEV runner integration for Midscene Test
  <sub>`Integration` · ★2 · kiritoking · `TS`</sub>

- **[n8n-nodes-typesafe-jev](https://github.com/n3ndor/n8n-nodes-typesafe-jev)** — n8n community node for TypeSafe Jev structured AI decisions
  <sub>`Project` · ★2 · n3ndor · `TS`</sub>

- **[origin-civilization](https://github.com/JacquesGariepy/ORIGIN-CIVILIZATION)** — AI life-and-civilization simulation: TypeSafe Jev makes every decision (typed, probabilistic, auditable); LLMs plan — OpenAI-compatible APIs, local models (Ollama, LM Studio), Claude Code, Codex.
  <sub>`Benchmark` · ★2 · jacquesgariepy · `TS` · ⚠ `no licence`</sub>

- **[pydantic-jev-examples](https://github.com/adtyavrdhn/pydantic-jev-examples)** — Pydantic AI capabilities made stronger with Jev: small runnable demos, one file each
  <sub>`Project` · ★2 · adtyavrdhn · `Py` · ⚠ `no licence`</sub>

- **[research_desk](https://github.com/0xnairb/research_desk)** — TypeSafe Jev demonstration for new analyzation — experimenting with Jev for fast analysis of news and tickers
  <sub>`Project` · ★2 · 0xnairb · `Py` · ⚠ `no licence`</sub>

- **[skill-router](https://github.com/lomeshdutta/skill-router)** — Tell Claude Code which installed skill a session needs, using Jev (TypeSafe AI) for the decision and skills.sh for discovery.
  <sub>`Plugin` · ★2 · lomeshdutta · `Py`</sub>

- **[sysone-bench](https://github.com/instax-dutta/sysone-bench)** — First independent head-to-head benchmark of System One decision models (Laya vs Jev) on byte-identical inputs
  <sub>`Benchmark` · ★2 · instax-dutta · `Py` · ⚠ `no licence`</sub>

- **[tempo-jev-demo](https://github.com/mychaelangelo/tempo-jev-demo)** — A natural-language task workspace comparing performance across AI models (TypeSafe's Jev, GPT-5.6 Luna, and Gemini 3.8 Flash)
  <sub>`Project` · ★2 · mychaelangelo · `TS`</sub>

- **[typesafe-jev-examples](https://github.com/rajivkuriakose/typesafe-jev-examples)** — Worked examples for TypeSafe's Jev System One decision model, runnable today through OpenRouter
  <sub>`Project` · ★2 · rajivkuriakose · `Py`</sub>

- **[typesafe-jev-mcp](https://github.com/anasbekheit/typesafe-jev-mcp)** — MCP server exposing TypeSafe's Jev model as a typed evaluate tool.
  <sub>`Plugin` · ★2 · anasbekheit · `Rs`</sub>

- **[typesafeai.net](https://github.com/Hawxy/TypeSafeAI.Net)** — .NET SDK for the TypeSafe AI platform
  <sub>`SDK` · ★2 · hawxy · `C#`</sub>

- **[your-signal](https://github.com/MithrilMan/your-signal)** — Open-source BYOK Chrome extension for personal, reversible X timeline filters.
  <sub>`Plugin` · ★2 · mithrilman · `JS`</sub>

- **[antigravity-mcp-semantic-search-with-typesafeai](https://github.com/greenyamao/Antigravity-mcp-semantic-search-with-TypeSafeAi)** — Fast semantic code search & diff sanity auditor for AI coding assistants (Antigravity, Cursor, Claude Code) powered by TypeSafe System One.
  <sub>`Benchmark` · ★1 · greenyamao · `Py` · ⚠ `no licence`</sub>

- **[askjev](https://github.com/pZacca/askjev)** — Unofficial MCP server for Jev (Typesafe AI)
  <sub>`Plugin` · ★1 · pzacca · `TS`</sub>

- **[bes-kelime-jev](https://github.com/mahmut-gundogdu/bes-kelime-jev)** — Ne yazarsanız yazın, beş kelimeden biriyle cevap veren sohbet botu. Kelimeyi TypeSafe AI'ın Jev evaluation modeli seçer.
  <sub>`Project` · ★1 · mahmut-gundogdu · `TS`</sub>

- **[cairn-jev-lab](https://github.com/Cairn-ink/cairn-jev-lab)** — Test what your AI should remember. An experimental, source-aware memory admission evaluator powered by Jev, with editable cases and inspectable results.
  <sub>`Project` · ★1 · cairn-ink · `JS`</sub>

- **[codex-jev-preflight](https://github.com/wellkilo/codex-jev-preflight)** — Fail-open Codex UserPromptSubmit hook that injects TypeSafe Jev pre-task routing metadata.
  <sub>`Plugin` · ★1 · wellkilo · `Py`</sub>

- **[commentcop](https://github.com/ntedvs/commentcop)** — Put your code comments on trial. Powered by Jev.
  <sub>`Project` · ★1 · ntedvs · `TS`</sub>

- **[decido](https://github.com/yairshy/decido)** — Probabilistic decisions for Python. Use Jev or bring your own provider; crawl with Playwright.
  <sub>`Integration` · ★1 · yairshy · `Py`</sub>

- **[harden-jev-decides](https://github.com/tylerjharden/harden-jev-decides)** — JEV picks which stream idea becomes the live MVP. TypeSafe System One decision board.
  <sub>`Project` · ★1 · tylerjharden · `TS` · ⚠ `no licence`</sub>

- **[jev-eyes](https://github.com/LeddoEngano/jev-eyes)** — Give Jev eyes — honest, local image perception for TypeSafe's text-only System One model. OCR + spatial layout → Jev state. CLI, MCP server, agent skill.
  <sub>`Plugin` · ★1 · leddoengano · `Py`</sub>

- **[jev-freeform](https://github.com/kesku/jev-freeform)** — An observable raw-character chat experiment powered entirely by TypeSafe Jev Choice
  <sub>`Project` · ★1 · kesku · `JS` · ⚠ `no licence`</sub>

- **[jev-go](https://github.com/guillemus/jev-go)** — Unofficial Go SDK for TypeSafe AI's Jev API
  <sub>`SDK` · ★1 · guillemus · `Go` · ⚠ `no licence`</sub>

- **[jev-gomoku](https://github.com/XieChengYuan/jev-gomoku)** — 弈瞬：双 Jev 五子棋九宫格输入实验台，逐手查看模型决策，支持真实对局回放与实时对战。
  <sub>`Project` · ★1 · xiechengyuan · `JS` · ⚠ `no licence`</sub>

- **[jev-playground](https://github.com/wustep/jev-playground)** — Can a System One model steer music? Jev picks the plan (enums only); code renders sheet, audio and MIDI.
  <sub>`Project` · ★1 · wustep · `TS` · ⚠ `no licence`</sub>

- **[jev-practice-speed](https://github.com/tubone24/jev-practice-speed)** — A WebGL demo where you play the card game Speed against a CPU whose brain is TypeSafe AI's Jev. The whole point of the app is to measure and show Jev's decision speed and decision accuracy in real time.
  <sub>`Project` · ★1 · tubone24 · `JS` · ⚠ `no licence`</sub>

- **[jev-sdk-java](https://github.com/luigivis/jev-sdk-java)** — Type-safe Java 21 client for the TypeSafe AI Jev (System One) decision API
  <sub>`SDK` · ★1 · luigivis · `Java`</sub>

- **[jev-sim](https://github.com/dashbi1/jev-sim)** — Jev-compatible /v1/systemone server reading typed decisions from LLM logits, benchmarked against TypeSafe's Jev on the same items via JevBench
  <sub>`Benchmark` · ★1 · dashbi1 · `Py`</sub>

- **[jev-skill-router](https://github.com/shimo4228/jev-skill-router)** — Claude Code plugin: asks TypeSafe Jev which installed skill fits each prompt and logs the answer (shadow-first). A working reference for the skill-suggestion cookbook on Claude Code — the README records why it is unlikely to help a strong model as a router.
  <sub>`Plugin` · ★1 · shimo4228 · `Py`</sub>

- **[jev-snake](https://github.com/iammusham/jev-snake)** — An experimental Snake environment where the game engine owns deterministic rules and TypeSafe AI's Jev makes the movement decision from structured state on every tick.
  <sub>`Project` · ★1 · iammusham · `Py` · ⚠ `no licence`</sub>

- **[jev2048](https://github.com/KyleKreuter/jev2048)** — Let Jev (TypeSafeAI) solve 2048
  <sub>`Project` · ★1 · kylekreuter · `TS` · ⚠ `no licence`</sub>

- **[jevsbistro](https://github.com/andrewsilber/JevsBistro)** — 3D restaurant service simulator for benchmarking low-latency decision models
  <sub>`Benchmark` · ★1 · andrewsilber · `TS`</sub>

- **[openpoke-meets-jev](https://github.com/0xShin0221/openpoke-meets-jev)** — Open source implementation of Poke
  <sub>`Project` · ★1 · 0xshin0221 · `Py`</sub>

- **[risc-jev](https://github.com/i2cjak/RISC-jeV)** — I tortured Jev into being a RISC-V CPU.
  <sub>`Project` · ★1 · i2cjak · `Py` · ⚠ `no licence`</sub>

- **[system-one-chess](https://github.com/dperezcabrera/system-one-chess)** — Chess against Jev, TypeSafe AI's System One model, through OpenRouter. Built with the pico framework.
  <sub>`Project` · ★1 · dperezcabrera · `Py`</sub>

- **[typesafe-ai-playground](https://github.com/markjaquith/typesafe-ai-playground)** — A playground for experiments around Jev, TypeSafe's System One model.
  <sub>`Project` · ★1 · markjaquith · `Rs`</sub>

- **[typesafe-client](https://github.com/JedimEmO/typesafe-client)** — Unofficial typed async Rust client for the TypeSafe System One API
  <sub>`SDK` · ★1 · jedimemo · `Rs`</sub>

- **[typesafe-go](https://github.com/zhirschtritt/typesafe-go)** — Idiomatic Go SDK for the TypeSafe AI API
  <sub>`SDK` · ★1 · zhirschtritt · `Go`</sub>

- **[typesafe-rs](https://github.com/AbdelStark/typesafe-rs)** — Latency-first Rust SDK for TypeSafe System One.
  <sub>`SDK` · ★1 · abdelstark · `Rs`</sub>

- **[typesafe_sdk_ex](https://github.com/vinnie357/typesafe_sdk_ex)** — Typesafe AI SDK in Elixir using Req
  <sub>`SDK` · ★1 · vinnie357 · `Ex` · ⚠ `no licence`</sub>

- **[typesafeai-go](https://github.com/chez-shanpu/typesafeai-go)** — Go SDK for TypeSafe AI API https://docs.typesafe.ai/api
  <sub>`SDK` · ★1 · chez-shanpu · `Go`</sub>

- **[@ai-sdk/typesafe-ai provider](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai)** — The AI SDK provider package for calling TypeSafe directly, with a sample covering all three question types and nested criteria shapes.
  <sub>`SDK` · `TS` · `JS` · `choice` · `score` · `noul`</sub>

- **[aegis: TypeSafe as a first-class provider](https://github.com/dvjn/aegis)** — A personal Rust AI gateway with a TypeSafe provider, usage extraction and alias resolution tested against real response bodies.
  <sub>`Project` · ★0 · dvjn · `Rs` · ⚠ `code untested` `no licence`</sub>

- **[beatjev](https://github.com/lambertsj/beatjev)** — try to beat jev
  <sub>`Project` · ★0 · lambertsj · `JS` · ⚠ `no licence`</sub>

- **[Build Your Own JEV Locally: Run a 100% Private AI Agent on Your Machine](https://medium.com/coding-nexus/build-your-own-jev-locally-run-a-100-private-ai-agent-on-your-machine-bb98126d394a)** — Despite the title, this does not run Jev. It builds a Jev-like decision engine from an open LLM using constrained next-token scoring.
  <sub>`Jev-like alternative` · DataScience Nexus · `Py` · ⚠ `not Jev` `code untested` `paywall`</sub>

- **[cartshield](https://github.com/ndolinschi/cartshield)** — CartShield — SMB checkout fraud disposition via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[cyber-breach-jev](https://github.com/rchovatiya88/cyber-breach-jev)** — Cyber-Breach: The Jev Protocol - A tactical cyberpunk arena combat game powered by TypeSafe AI Jev System One decision model
  <sub>`Project` · ★0 · rchovatiya88 · `JS` · ⚠ `no licence`</sub>

- **[extremely-specific-council](https://github.com/cbetz/extremely-specific-council)** — Twelve members. Zero qualifications. A playful TypeSafe AI council with animated votes, inspectable decisions, and shareable verdicts.
  <sub>`Project` · ★0 · cbetz · `TS`</sub>

- **[financialpredictionjev](https://github.com/thodoh1/FinancialPredictionJev)** — Using Jev to test how well it predicts financial markets(just like most llms as of september 2026, it doesnt do that good)
  <sub>`Project` · ★0 · thodoh1 · `Py` · ⚠ `no licence`</sub>

- **[frost](https://github.com/marcus/frost)** — A flexible and configurable CLI model router using TypeSafe Jev.
  <sub>`Project` · ★0 · marcus · `Go`</sub>

- **[functions](https://github.com/TrainLCD/Functions)** — 👷 Cloudflare Workers for the TrainLCD mobile app.
  <sub>`Project` · ★0 · trainlcd · `TS` · ⚠ `no licence`</sub>

- **[hiresignal](https://github.com/ndolinschi/hiresignal)** — HireSignal — resume first-pass fit+interview via TypeSafe Jev
  <sub>`Project` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[Jev Explained: How to Add Fast, Typed Decisions to an AI Agent](https://aihubmix.com/blog/jev-explained-how-to-add-fast-typed-decisions-to-an-ai-agent)** — A third-party explainer with a useful architecture sketch and an unusually honest list of cases where you should not use a decision model.
  <sub>`Article` · `Py` · ⚠ `code untested`</sub>

- **[jev-acp](https://github.com/formulahendry/jev-acp)** — Use Jev typed decisions from any ACP (Agent Client Protocol) client or IDE
  <sub>`Project` · ★0 · formulahendry · `TS`</sub>

- **[jev-anotacao-sentencas](https://github.com/lab-dados/jev-anotacao-sentencas)** — Jev (TypeSafe) vs. Gemini 3.8 Flash vs. GPT-5.6 Luna na anotação estruturada de sentenças do TJSP: qualidade, tempo e custo
  <sub>`Project` · ★0 · lab-dados · `Py` · ⚠ `no licence`</sub>

- **[jev-atlas](https://github.com/v60samurai/jev-atlas)** — Map where Jev and System One models actually belong in your project, test the strongest ideas, then implement them. A skill for Claude Code and Codex.
  <sub>`Plugin` · ★0 · v60samurai · `Py`</sub>

- **[jev-bun1](https://github.com/heiwa4126/jev-bun1)** — TypeSafe の Jev を TypeScript SDK で使ってみる最初の 1 歩
  <sub>`SDK` · ★0 · heiwa4126 · `TS` · ⚠ `no licence`</sub>

- **[jev-demo](https://github.com/sawzhang/jev-demo)** — Jev (TypeSafe System One) 学习与实测：概念文档 + 5 个可运行 demo + 可复现压测。实测 jev-1.13.0：扇出几乎免费，40 问与 1 问等延迟。
  <sub>`Project` · ★0 · sawzhang · `TS` · ⚠ `no licence`</sub>

- **[jev-evaluation](https://github.com/willkelly/jev-evaluation)** — An adversarial evaluation of TypeSafe's jev decision model: nine experiments and 28 predictions fixed before any data was collected. 123,805 requests, $12.69.
  <sub>`Project` · ★0 · willkelly · `Py`</sub>

- **[jev-games](https://github.com/shantanugoel/jev-games)** — Visual Jev lab for multiple games and emulator platforms
  <sub>`Project` · ★0 · shantanugoel · `Py` · ⚠ `no licence`</sub>

- **[jev-jp-address](https://github.com/smasato/jev-jp-address)** — Jev (TypeSafe) 性能評価プロジェクト — 日本郵便 KEN_ALL をマスタに、AI SDK 経由の Jev が住所のあいまい一致にどこまで使えるかを検証
  <sub>`SDK` · ★0 · smasato · `TS` · ⚠ `no licence`</sub>

- **[jev-measured](https://github.com/WallerChen/jev-measured)** — Measured cost, latency and raw output from the live Jev API (TypeSafe AI System One model) across 8 use cases — reproducible
  <sub>`Project` · ★0 · wallerchen · `Py`</sub>

- **[jev-pick-and-place-study](https://github.com/tryaksh/jev-pick-and-place-study)** — A small reproducible MuJoCo pilot comparing Jev, Claude Haiku, and reactive rules for pick-and-place.
  <sub>`Project` · ★0 · tryaksh · `Py` · ⚠ `no licence`</sub>

- **[jev-t-rex-runner](https://github.com/joshlarsen/jev-t-rex-runner)** — Chrome dino game played by Typesafe AI Jev model
  <sub>`Project` · ★0 · joshlarsen · `JS`</sub>

- **[jev-torneo-animales](https://github.com/hectorlcastro09/jev-torneo-animales)** — Winner-stays-on animal tournament refereed by Jev (TypeSafe System One): a local game to feel how fast typed decisions are. UI in Spanish.
  <sub>`Project` · ★0 · hectorlcastro09 · `TS`</sub>

- **[jevai.org community site](https://www.jevai.org/)** — An unaffiliated community site with a playground, a preset decision API, an MCP server, downloadable skills and a gallery of community apps.
  <sub>`Project` · `sh` · ⚠ `3rd-party key` `unverified`</sub>

- **[jevtok](https://github.com/LabGuy94/jevtok)** — Exact token counting and request-cost prediction for TypeSafe's Jev (tiktoken-style)
  <sub>`Project` · ★0 · labguy94 · `Py`</sub>

- **[kojev](https://github.com/ItisNoMatter/kojev)** — Kotlin Multiplatform client for Jev that returns your own enum/sealed types instead of string keys.
  <sub>`SDK` · ★0 · itisnomatter · `Kt`</sub>

- **[kunobi-jev](https://github.com/kunobi-ninja/kunobi-jev)** — Rust client for the TypeSafe System One API (Jev)
  <sub>`SDK` · ★0 · kunobi-ninja · `Rs`</sub>

- **[labs](https://github.com/kiarina/labs)** — Small, independent projects for experiments, research, and investigations.
  <sub>`Project` · ★0 · kiarina · `Py`</sub>

- **[mcpmatch](https://github.com/ndolinschi/mcpmatch)** — Match user goals to MCP catalog (two-stage) via TypeSafe Jev
  <sub>`Plugin` · ★0 · ndolinschi · `TS` · ⚠ `no licence`</sub>

- **[mimicry](https://github.com/jxucoder/mimicry)** — Rewrite AI drafts in your own voice with a bounded TypeSafe feedback loop.
  <sub>`Project` · ★0 · jxucoder · `Py` · ⚠ `no licence`</sub>

- **[pi-agent-foreman](https://github.com/alexshpunt/pi-agent-foreman)** — Send Pi agents back to work when they stop before the job is done.
  <sub>`Project` · ★0 · alexshpunt · `TS`</sub>

- **[pong-jev](https://github.com/safzanpirani/pong-jev)** — TypeSafe's Jev plays Atari Pong. One typed Choice question per frame, no coordinates sent to the model.
  <sub>`Project` · ★0 · safzanpirani · `TS` · ⚠ `no licence`</sub>

- **[river-run-typesafe](https://github.com/ashaazami/river-run-typesafe)** — River shooter game in Python, inspired by Atari's River Raid, played by a TypeSafe AI pilot
  <sub>`Project` · ★0 · ashaazami · `Py`</sub>

- **[scam-shield](https://github.com/ShupingR/scam-shield)** — Scam text message filter powered by TypeSafe's Jev model
  <sub>`Project` · ★0 · shupingr · `TS` · ⚠ `no licence`</sub>

- **[search-function-test](https://github.com/Shifros/Search-Function-Test)** — A test project based on Jev AI, the goal is to build a search function for a blog/article website that has 100s of articles to search from, So the user can actually use the search as chat to question anything and find related answers/articles
  <sub>`Project` · ★0 · shifros · `JS` · ⚠ `no licence`</sub>

- **[system-one-adapter-rust](https://github.com/codeitlikemiley/system-one-adapter-rust)** — Rust port of TypeSafe system-one-adapter (LLM-backed system_one evaluations)
  <sub>`Integration` · ★0 · codeitlikemiley · `Rs`</sub>

- **[tinyjevclient](https://github.com/tinyhumansai/tinyjevclient)** — An integration with jev by typesafe.ai in Rust
  <sub>`Integration` · ★0 · tinyhumansai · `Rs`</sub>

- **[Tracing Jev calls with Langfuse](https://langfuse.com/integrations/model-providers/typesafe)** — The only platform with dedicated Jev observability: an OpenInference instrumentor that traces every decision call over OpenTelemetry.
  <sub>`Integration` · `Py` · `choice` · `score` · `noul`</sub>

- **[TypeSafe AI Jev now available on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway)** — Vercel's launch note for Jev on AI Gateway, with an experimental_evaluate sample using the model string typesafe-ai/jev.
  <sub>`Integration` · `TS` · `noul`</sub>

- **[TypeSafe models in Pydantic AI](https://pydantic.dev/docs/ai/models/typesafe/)** — First-party Pydantic AI support: an Agent with output_type=bool over the typesafe:jev-latest model string.
  <sub>`Integration` · `Py`</sub>

- **[TypeSafe pass-through on LiteLLM](https://docs.litellm.ai/docs/pass_through/typesafe)** — Proxy Jev through LiteLLM for unified keys and cost tracking, with any path under /typesafe/ passed straight through.
  <sub>`Integration` · `sh`</sub>

- **[typesafe-ai-ruby](https://github.com/hnegishi/typesafe-ai-ruby)** — Ruby client for the TypeSafe AI(Jev) System One API
  <sub>`SDK` · ★0 · hnegishi · `Rb`</sub>

- **[typesafe-chess](https://github.com/TholeG/typesafe-chess)** — Chess where both players are TypeSafe's Jev model: every move is a typed Choice decision
  <sub>`Project` · ★0 · tholeg · `JS`</sub>

- **[typesafe-comment](https://github.com/Hexdigest123/typesafe-comment)** — Small Python package that uses typesafe.ai to evaluate code comments on certain heuristics
  <sub>`Project` · ★0 · hexdigest123 · `Py`</sub>

- **[TypeSafe-compatible API on Vercel AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/typesafe)** — Point the official TypeSafe SDK at Vercel by changing one baseURL, or call the gateway's systemone endpoint directly with cURL.
  <sub>`Integration` · `TS` · `sh` · `noul`</sub>

- **[typesafe-go](https://github.com/Nibir1/typesafe-go)** — A zero-dependency community Go SDK, including a static analyser that flags poorly designed questions at compile time.
  <sub>`SDK` · ★0 · Nibir1 · `Go` · `choice` · `score` · `noul` · ⚠ `code untested`</sub>

- **[typesafe_chess_eval](https://github.com/AliceRoselia/Typesafe_chess_eval)** — An evaluation of typesafe AI chess. As it turns out, the AI isn't doing really well even though chess is not a particularly open-ended game. Still, it's only a prototype and this probably wasn't optimzied for games.
  <sub>`Project` · ★0 · aliceroselia · `Py`</sub>

- **[awesome-jev (yibie)](https://github.com/yibie/awesome-jev)** — Currently the most-starred sibling directory in this space.
  <sub>`Project` · ★1,094 · ⚠ `no licence`</sub>

- **[A new kind of AI model from a ChatGPT inventor is thrilling developers](https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/)** — The only launch coverage with first-hand developer quotes rather than vendor figures, including a caution that interpreting the thresholds is now your job.
  <sub>`Article` · Tim Fernholz</sub>

- **[AI model "Jev" to make machines decide faster](https://www.heise.de/en/news/AI-model-Jev-to-make-machines-decide-faster-11457071.html)** — Focuses on the missing explainability — the model returns no reasoning in language — and on every published benchmark coming from the vendor.
  <sub>`Article` · Tomislav Bezmalinović</sub>

- **[Hacker News: Introducing System One Models and Jev](https://news.ycombinator.com/item?id=49717558)** — The launch thread, and the densest single collection of scepticism: unsupported RLCD claims, apples-to-oranges latency comparisons, and the deliberate absence of public benchmarks.
  <sub>`Discussion`</sub>

- **[Jev (AI model) on Wikipedia](https://en.wikipedia.org/wiki/Jev_(AI_model))** — Most useful as an index: its reference list is a fast route to the coverage worth reading.
  <sub>`Article`</sub>

- **[Jev by TypeSafe: A Decision Model for AI Agents](https://beam.ai/agentic-insights/jev-typesafe-ai-agents)** — An agent-builder's framing of where a decision model sits in an agent stack.
  <sub>`Article` · ⚠ `marketing`</sub>

- **[Jev Cuts AI Decision Costs 100x And Vercel, Cloudflare Rushed To Add It](https://www.forbes.com/sites/josipamajic/2026/09/19/jev-cuts-ai-decision-costs-100x-and-vercel-cloudflare-rushed-to-add-it/)** — Mainstream coverage of the launch and the speed with which gateways added support.
  <sub>`Article` · Josipa Majic Predin · ⚠ `vendor numbers` `paywall`</sub>

- **[Jev From TypeSafe is a New Class of AI Model that is FAST and CHEAP - But There is a Caveat!](https://youtube.com/watch?v=qdji39XXgEY)** — A review that puts the limitation in the title rather than burying it.
  <sub>`Video` · Gary Explains</sub>

- **[Jev: System One models for Prod, not God](https://www.latent.space/p/jev)** — The only long-form founder interview: why RLHF was the wrong optimisation target, why public benchmarks were withheld, and the all-synthetic data approach.
  <sub>`Discussion` · Latent Space</sub>

- **[Jev: TypeSafe's System One Model Explained](https://www.datacamp.com/blog/system-one-models-jev)** — A neutral survey of the architecture, the claimed benchmarks and the pricing, which states plainly that no large independent reproduction had surfaced.
  <sub>`Article` · Matt Crabtree</sub>

- **[jevai.org community app gallery](https://www.jevai.org/apps)** — Thirty-six community builds curated from social posts: browser agents, spreadsheet tooling, inbox search by intent, ad blocking with judgement, games and robotics.
  <sub>`Project` · ⚠ `unverified`</sub>

- **[RLCD explained: Reinforcement Learning for Calibrated Decisions](https://systemonemodels.org/guides/rlcd-explained/)** — An independent write-up whose most useful finding is a negative one: there is no paper, no reward function, no dataset description and no reproducible evaluation for RLCD.
  <sub>`Article`</sub>

- **[TypeSafe AI debuts model for machines that plays Doom](https://www.theregister.com/ai-and-ml/2026/09/16/typesafe-ai-debuts-model-for-machines-that-plays-doom/5296711)** — The most sceptical mainstream piece: it challenges the no-hallucination framing on the grounds that a well-formed answer is not the same as a correct one.
  <sub>`Article` · Thomas Claburn</sub>

- **[TypeSafe on OpenRouter](https://openrouter.ai/typesafe)** — OpenRouter's listing for Jev, with its own model ids and the unusual pricing shape of paid input and free output.
  <sub>`Integration`</sub>

</details>

## By resource kind

The same rows grouped by what you will find when you open the link.

| Kind | Examples | What you will find |
| --- | :-- | --- |
| **Official docs** | `31` █▏ | Vendor documentation, cookbooks and pattern pages. |
| **SDK** | `46` █▋ | Client libraries, official and community. |
| **Integration** | `32` █▏ | A gateway, framework or platform route to the model. |
| **Snippet** | ` 4` ▏ | Small runnable examples in this repository. |
| **Project** | `465` ████████████████ | An application or library that calls Jev in anger. |
| **Plugin** | `134` ████▋ | Editor, agent and MCP integrations you can install. |
| **Tutorial** | ` 5` ▏ | Step-by-step material with code. |
| **Benchmark** | `45` █▌ | Measurement. Check whether it is independent or vendor-reported. |
| **Article** | `12` ▍ | Explainers, analysis and launch coverage. |
| **Video** | ` 3` ▏ | Walkthroughs and reviews. |
| **Discussion** | ` 2` ▏ | Threads worth reading, including the sceptical ones. |
| **Jev-like alternative** | `26` ▉ | Independent reimplementations. These do NOT call Jev. |

## Also in this repo

The parts that are not the catalog.

| File | What it is |
| --- | --- |
| [`docs/patterns.md`](docs/patterns.md) | Every pattern defined, each with an explicit *when NOT to use this*. |
| [`docs/compatibility.md`](docs/compatibility.md) | Model string, field names, request shape, endpoint and env var differ per platform. This is that table. |
| [`docs/vetting.md`](docs/vetting.md) | What to check before trusting a row, and the one mistake most people make. |
| [`docs/status.md`](docs/status.md) | What week one of this ecosystem actually looked like, gaps included. |
| [`docs/method.md`](docs/method.md) | How the catalog was built, what was excluded, and where it is weakest. |
| [`docs/sources.md`](docs/sources.md) | Where every row came from, and the licence position. |
| [`examples/`](examples/) | Four runnable examples. One deliberately leaves the threshold policy to you. |
| [`schema/entry.schema.json`](schema/entry.schema.json) | What a catalog entry may contain. |
| [`mcp/`](mcp/) | An MCP server, so an agent can query the catalogue instead of reading it. Caveats travel with every result. |
| [`SKILL.md`](SKILL.md) | An agent skill: the facts that generated Jev code most often gets wrong, and the design rules worth following. |
| [`scripts/verify_claims.py`](scripts/verify_claims.py) | Re-reads every cited call site weekly, so a primitive claim is checkable rather than asserted. |
| [`scripts/refresh_metadata.py`](scripts/refresh_metadata.py) | Re-reads stars, licences and archive status from the GitHub API and opens a PR. |

## What is verified, and what is not

- ✅ **Verified** — the URL returned a success status on the date in `checked`; a person opened it and wrote the summary from what was there; for code rows the call site was read to confirm which primitives are used; stars and licences came from the GitHub API.
- 🔁 **Re-checked weekly** — 721 rows record the file their primitive claim was read in. A scheduled job re-reads each one from the repository's default branch and opens an issue if the claim stopped holding, so an upstream removal cannot leave a false claim sitting here. Deliberately unpinned to a commit: pinning would verify a historical snapshot forever.
- ❌ **Not verified** — whether the code runs, whether any performance claim holds, whether a project is maintained, or whether any of this suits your system. Nothing here has been executed, load-tested or security-reviewed.

### What the tags mean

| Tag | Means |
| --- | --- |
| `not Jev` | Does not call Jev at all. A compatible API does not imply compatible calibration, so thresholds do not transfer. |
| `shadow mode` | Wired in but deliberately inert — nothing it returns reaches a user-visible decision. |
| `early access` | Needs waitlist access to run. |
| `code untested` | The code was read, not executed. |
| `one commit` | One commit, so maintenance is unlikely. |
| `no licence` | No LICENSE file, whatever a README badge claims. A blocker for reuse. |
| `3rd-party key` | Needs a key for a service other than TypeSafe. |
| `vendor numbers` | Repeats the vendor's own benchmarks rather than an independent measurement. |
| `unverified` | Makes measurement claims that could not be checked. |
| `AI-written` | Reads as machine-generated content. |
| `marketing` | Published to sell something as much as to explain. |
| `paywall` | Behind a paywall or a metered reader. |
| `archived` | Development has visibly stopped. |

## Machine-readable data

One entry per example, validated against a JSON Schema on every push.

| File | What it is |
| --- | --- |
| [`catalog.json`](https://raw.githubusercontent.com/kydlikebtc/awesome-jev/main/catalog.json) | 805 entries |
| [`retired.json`](https://raw.githubusercontent.com/kydlikebtc/awesome-jev/main/retired.json) | 0 retired |
| [`compat.json`](https://raw.githubusercontent.com/kydlikebtc/awesome-jev/main/compat.json) | The platform matrix behind `docs/compatibility.md` |
| [`patterns.json`](https://raw.githubusercontent.com/kydlikebtc/awesome-jev/main/patterns.json) | The decision taxonomy both generators and the MCP server read |
| [`schema/entry.schema.json`](https://raw.githubusercontent.com/kydlikebtc/awesome-jev/main/schema/entry.schema.json) | One entry's shape |
| [`llms.txt`](https://raw.githubusercontent.com/kydlikebtc/awesome-jev/main/llms.txt) | For agents, with the caveats spelled out |

## Contributing and licence

Corrections take priority over additions — a wrong row costs more than a missing one. See [CONTRIBUTING.md](CONTRIBUTING.md); the bar is *could a reader act on this row without opening the link?*

Code in `scripts/`, `site/` and `examples/` is [MIT](LICENSE-MIT). Catalog metadata is [CC0-1.0](LICENSE-CC0), with a per-row `license` field. Linked works keep their own licences — `repo_license` records what each declares.
