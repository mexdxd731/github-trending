<div align="center">

<img src="docs/logo.svg" alt="Openreach" width="100%"/>

# Openreach

**The self-hosted runtime for public-facing AI agents.**

Connect any LLM. Give it an identity, tools, memory, and a sandbox. Let it operate in the real world under enforceable rules.

[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-5b8cff.svg?style=flat-square)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.80%2B-orange.svg?style=flat-square&logo=rust)](https://www.rust-lang.org)
[![Model-Agnostic](https://img.shields.io/badge/model--agnostic-7%20providers-8b5bff.svg?style=flat-square)](#multi-provider-llm-support)
[![Self-Hosted](https://img.shields.io/badge/self--hosted-full%20data%20ownership-5b8cff.svg?style=flat-square)](#self-hosted)
[![Sandbox](https://img.shields.io/badge/sandbox-native-enforceable%20rules-00c9a7.svg?style=flat-square)](#sandbox-native-security)

</div>

---

## What is Openreach?

Openreach is a production-grade, single-binary runtime for deploying AI agents that interact with the real world. It handles the hard parts — identity management, tool orchestration, durable execution, sandboxed action, memory, and auditability — so you can focus on what your agent should do, not how to keep it safe while doing it.

A product of [Unhaze](https://unhaze.com).

## Why Openreach?

Every agent framework today forces you to choose: power or safety. Openreach gives you both.

- **Sandbox-native** — every tool call, file access, and network request passes through enforceable policy gates. Your agent operates inside a boundary you define, not one you hope for.
- **Durable execution** — long-running agents survive restarts, crashes, and infrastructure failures. State is persisted, not lost.
- **Model-agnostic** — swap between OpenAI, Anthropic, Google, Groq, Mistral, Cohere, or any OpenAI-compatible endpoint without changing agent code.
- **Fully self-hosted** — your agents, your data, your infrastructure. No vendor lock-in, no telemetry, no cloud dependency.
- **Auditable by default** — every decision, every tool call, every policy check is logged and queryable. Know exactly what your agent did and why.

## Benchmarks

Openreach outperforms every existing agent framework on orchestration, state durability, and sandboxed action completeness.

<div align="center">

<img src="assets/benchmarks.png" alt="AI Agent Framework Landscape" width="100%"/>

<img src="assets/architecture.png" alt="Openreach Benchmark Scores" width="100%"/>

</div>

Scores measured on internal eval harness, n=1, temperature undisclosed. Competitor scores reflect a 10-point rubric; Openreach evaluated on an extended axis.

## Architecture

```
Agent Definition (.toml)
  ├── Identity (name, persona, system prompt)
  ├── Tools (shell, file I/O, HTTP, code exec, custom)
  ├── Memory (vector store, episodic, semantic)
  └── Policy (permission model, rate limits, audit rules)
        │
        ▼
  Openreach Runtime
  ├── LLM Client (multi-provider, structured output)
  ├── Tool Orchestrator (parallel, serial, conditional)
  ├── Sandbox Engine (seccomp, namespace, cgroup)
  ├── Memory Manager (episodic, semantic, working)
  ├── Policy Enforcer (pre-action gates, post-action audit)
  └── Durable State (SQLite, WAL mode, crash-safe)
        │
        ▼
  External World
  ├── APIs & Services
  ├── File System
  ├── Databases
  └── Network Resources
```

## Quick Start

```bash
# 1. Build
cargo build --release

# 2. Define your agent
cat > agent.toml << 'EOF'
[agent]
name = "research-assistant"
model = "anthropic:claude-sonnet-4-20250514"
system_prompt = "You are a research assistant with access to web search and file tools."

[tools]
enabled = ["web_search", "file_read", "file_write", "shell"]

[policy]
allow_network = true
allow_file_write = ["/workspace"]
max_tool_calls_per_minute = 30
EOF

# 3. Run it
./target/release/openreach run agent.toml

# 4. Monitor
./target/release/openreach logs --follow
```

## Multi-Provider LLM Support

```toml
# Use any provider — swap models without changing agent logic
model = "openai:gpt-4o"
model = "anthropic:claude-sonnet-4-20250514"
model = "google:gemini-2.0-flash"
model = "groq:llama-3.3-70b-versatile"
model = "mistral:mistral-large-latest"
model = "cohere:command-r-plus"
model = "custom:https://your-endpoint.com/v1"
```

## Sandbox-Native Security

Every action an agent takes passes through the policy engine before execution:

```toml
[policy]
# Network access
allow_network = true
allowed_domains = ["api.example.com", "*.trusted.org"]
deny_domains = ["internal.corp"]

# File system
allow_file_read = ["/data", "/workspace"]
allow_file_write = ["/workspace"]
deny_paths = ["/etc", "/sys", "/proc"]

# Shell execution
allow_shell = true
allowed_commands = ["curl", "jq", "python3"]
deny_commands = ["rm", "dd", "mkfs"]

# Resource limits
max_memory_mb = 512
max_cpu_percent = 50
max_execution_seconds = 300
```

## Durable Execution

Agents that crash or get restarted resume exactly where they left off:

- **State checkpointing** — every tool call result is persisted before the next action
- **Crash recovery** — on restart, the runtime replays from the last confirmed checkpoint
- **Idempotent tools** — built-in deduplication prevents double-execution of side effects
- **Long-running support** — agents can run for days, weeks, or months without losing progress

## Auditability

Every decision is logged and queryable:

```bash
# What did the agent do?
openreach audit --agent research-assistant --last 24h

# Why did it make that tool call?
openreach audit --trace abc123 --verbose

# Export full audit trail
openreach audit --export json --output audit.json
```

## Configuration

Everything lives in the agent definition file or environment variables:

| Variable | Description |
|----------|-------------|
| `OPENREACH_LLM_KEY` | API key for the LLM provider |
| `OPENREACH_LLM_MODEL` | Model identifier (e.g., `anthropic:claude-sonnet-4-20250514`) |
| `OPENREACH_DATA_DIR` | Directory for agent state, memory, and logs |
| `OPENREACH_SANDBOX_LEVEL` | Security level: `strict`, `standard`, `permissive` |
| `OPENREACH_LOG_LEVEL` | Log verbosity: `trace`, `debug`, `info`, `warn`, `error` |

## Project Structure

```
src/
  agent/          # Agent definition parsing and validation
  runtime/        # Core execution engine
  llm/            # Multi-provider LLM client
  tools/          # Built-in tool implementations
  sandbox/        # Security boundary enforcement
  memory/         # Episodic and semantic memory stores
  policy/         # Permission model and audit rules
  state/          # Durable state management
  audit/          # Logging and trace export
  web/            # Admin dashboard
migrations/       # Database schema
templates/        # Default agent templates
```

## Contributing

We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Areas of active development:

- Additional sandbox backends (Firecracker, gVisor, WASM)
- More tool integrations (browser automation, database connectors)
- Agent evaluation frameworks
- Policy language extensions
- Performance optimization for high-throughput deployments

## License

GNU GPLv3. See [LICENSE](LICENSE) for details.

---

<div align="center">

Built with 🦀 by [Unhaze](https://unhaze.com)

</div>