<div align="center">

# ⚡ agent-doctor

### *Diagnose your AI coding agent & MCP setup in 30 seconds.*

[![CI](https://github.com/emailhayday10-coder/agent-doctor/actions/workflows/ci.yml/badge.svg)](https://github.com/emailhayday10-coder/agent-doctor/actions)
[![npm version](https://img.shields.io/npm/v/agent-doctor.svg?color=blue)](https://www.npmjs.com/package/agent-doctor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen)](https://nodejs.org)

<br/>

> **“Your MCP setup wastes 38% of context (~4,200 tokens per turn).”**  
> `agent-doctor` scans your entire Claude Code, Cursor, Windsurf, Cline, OpenCode & MCP environment and immediately points out why your agent is running slow, burning tokens, failing tool calls, or misconfigured.

<br/>

```bash
# Run instantly with npx — zero installation required
npx agent-doctor
```

</div>

---

## 🧐 Why Agent Doctor?

As AI coding ecosystems explode with multiple harnesses (**Claude Code**, **Cursor**, **Windsurf**, **Cline**, **Roo Code**, **Antigravity**), dozens of **MCP servers**, custom rule files (`.cursorrules`, `CLAUDE.md`), hooks, and session memories, configuration becomes messy fast.

Developers frequently suffer from:
1. **Hidden Token Waste**: Bloated MCP tool schemas and oversized rule files injected into *every single turn*, silently burning 30-50% of the context window.
2. **Duplicate & Conflicting Tools**: Same GitHub or Filesystem MCP server configured across 3 different agents, causing tool collision and latency penalties.
3. **Broken Runtimes & Dummy Keys**: Missing binary paths (`uvx`, `npx`), `<YOUR_API_KEY>` placeholders, or unexpanded `$ENV` vars that cause agents to crash or hang.
4. **Hanging Git Hooks**: Pre-commit hooks running massive test suites that block agent edit loops for minutes.
5. **Missing `.gitignore` Exclusions**: Coding agents accidentally indexing `node_modules/` or `dist/` bundles into context.

**`agent-doctor` solves this in one command.**

---

## 🚀 Features

- 🔍 **Detect Installed Agents**: Auto-discovers Claude Code, Cursor, Windsurf, Cline, Roo Code, OpenCode, Codex, Aider, Zed & Antigravity.
- 🔌 **Deep MCP Configuration Audit**: Parses Claude Desktop, Claude Code, Cursor, Cline, Roo Code, and workspace `mcp.json` configs.
- 👥 **Duplicate & Redundant Server Detection**: Pinpoints duplicate servers across agents and flags schema collisions.
- 🔑 **Broken Env & Key Validator**: Detects missing variables, dummy placeholders (`sk-ant-xxx`, `TODO`, `<KEY>`), and unexpanded shell variables.
- 📜 **Context & Rule Bloat Auditor**: Flags oversized `.cursorrules` and `CLAUDE.md` files (>5KB), warning about attention degradation and token burn.
- ⚡ **Slow & Interactive Hook Detection**: Identifies slow git hooks and interactive prompt loops that freeze AI agents.
- 💰 **Token Waste & Latency Calculator**: Quantifies wasted tokens per turn and estimates monthly dollar cost burn.
- 🩺 **Health Score & Grade**: Gives your environment a clear score (0–100) and grade (A+ to F) with a prioritized issue breakdown.
- 🛠️ **Automated Auto-Fixer**: Runs `agent-doctor fix` to apply safe fixes (adding missing `.gitignore` rules, cleaning templates).
- 📊 **Multiple Export Formats**: Generates beautiful terminal UI, JSON (for CI), Markdown (for PR comments), and interactive standalone HTML reports.

---

## 📦 Quick Start

### 1. Instant Run via NPX

```bash
npx agent-doctor
```

### 2. Auto-Fix Detected Issues

```bash
npx agent-doctor fix
```

### 3. Generate CI / PR Markdown Report

```bash
npx agent-doctor --format markdown -o doctor-report.md
```

### 4. Generate Interactive HTML Dashboard

```bash
npx agent-doctor --format html -o doctor-report.html
```

---

## 🖥️ Example Terminal Output

```text
⚡ AGENT DOCTOR v1.0.0 — AI Agent & MCP Health Diagnostic
Diagnosing Claude Code, Cursor, Windsurf, Cline, OpenCode & MCPs in 30s

Score: 68/100 [Grade: C]
Verdict: Suboptimal performance. Detected 3 high-impact issue(s) inflating context tokens.

Token Waste Analysis:
“Your MCP & context setup wastes 38% of tokens (~4,200 tokens/turn)”
• Wasted per turn: 4,200 tokens
• Est. Monthly Waste: $94.50 USD (at 250 turns/day)
• Execution Time: 28ms

 Detected Coding Agents & Harnesses:
┌──────────────────────┬──────────┬─────────────┬─────────────────────────────────────────────┐
│ Agent                │ Detected │ MCP Servers │ Config Locations                            │
├──────────────────────┼──────────┼─────────────┼─────────────────────────────────────────────┤
│ Claude Code          │ ✔ Yes    │ 3           │ CLAUDE.md                                   │
│ Cursor               │ ✔ Yes    │ 4           │ .cursorrules                                │
│ Windsurf             │ ✔ Yes    │ 2           │ ~/.codeium/windsurf/mcp_config.json         │
└──────────────────────┴──────────┴─────────────┴─────────────────────────────────────────────┘

 Diagnostic Findings (4):
┌────────┬─────────────┬─────────────────────────────────────────────┬──────────────────────────────┐
│ Sev    │ Category    │ Issue                                       │ File / Source                │
├────────┼─────────────┼─────────────────────────────────────────────┼──────────────────────────────┤
│ HIGH   │ duplicate   │ Redundant MCP Server: github-server         │ .cursor/mcp.json             │
│ WARN   │ token-waste │ Missing .gitignore Exclusions (node_modules)│ .gitignore                   │
│ WARN   │ context     │ Bloated Rule File: .cursorrules (12.4 KB)    │ .cursorrules                 │
│ CRIT   │ env         │ Unconfigured API Key: BRAVE_API_KEY         │ mcp.json                     │
└────────┴─────────────┴─────────────────────────────────────────────┴──────────────────────────────┘

 Recommended Fix Commands:
  $ npx agent-doctor fix --rule gitignore
  $ npm install -g @modelcontextprotocol/server-brave-search
```

---

## 🛠️ CLI Usage & Options

```text
Usage: agent-doctor [command] [options]

Commands:
  scan (default)    Run full environment scan and diagnose agent setup
  fix               Automatically apply recommended fixes
  init              Initialize clean, optimized agent rule templates

Options:
  -c, --cwd <path>      Workspace directory to scan (default: current directory)
  -f, --format <type>   Output format: console, json, markdown, html (default: "console")
  -o, --output <file>   Save output report to file path
  --fix                 Automatically apply safe fixes during scan
  -v, --verbose         Enable verbose debugging logs
  -V, --version         Output the version number
  -h, --help            Display help for command
```

---

## 🤖 Supported Agents & Ecosystems

| Agent / Harness | MCP Scanning | Context Bloat Check | Hook Check | Memory Audit |
| :--- | :---: | :---: | :---: | :---: |
| **Claude Code** (Anthropic CLI) | ✅ | ✅ | ✅ | ✅ |
| **Claude Desktop** | ✅ | N/A | N/A | ✅ |
| **Cursor** | ✅ | ✅ (`.cursorrules`) | ✅ | ✅ |
| **Windsurf** (Codeium) | ✅ | ✅ (`.windsurfrules`) | ✅ | ✅ |
| **Cline / Roo Code** | ✅ | ✅ (`.clinerules`) | ✅ | ✅ |
| **OpenCode / AgentRules** | ✅ | ✅ (`.agentrules`) | ✅ | ✅ |
| **Aider AI** | ✅ | ✅ (`CONVENTIONS.md`) | ✅ | ✅ |
| **Zed Editor** | ✅ | N/A | N/A | ✅ |
| **Google Antigravity** | ✅ | ✅ (`.agy`) | ✅ | ✅ |

---

## 🧩 Programmatic API (TypeScript / Node.js)

`agent-doctor` can be integrated directly into developer tooling, CI pipelines, or internal harness audits:

```typescript
import { AgentDoctorScanner, ScoreCalculator } from 'agent-doctor';

const scanner = new AgentDoctorScanner({
  cwd: process.cwd()
});

const report = await scanner.scan();

console.log(`Health Score: ${report.health.score}/100 [Grade: ${report.health.grade}]`);
console.log(`Token Waste: ${report.tokenWaste.wastePercentage}%`);
```

---

## 🔄 CI / GitHub Actions Integration

Prevent rule bloat and broken agent configurations in pull requests:

```yaml
name: Agent Doctor Audit
on: [push, pull_request]

jobs:
  agent-doctor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Run Agent Doctor Audit
        run: npx agent-doctor --format markdown -o doctor-report.md
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/emailhayday10-coder/agent-doctor/issues).

```bash
# Clone the repository
git clone https://github.com/emailhayday10-coder/agent-doctor.git

# Install dependencies
npm install

# Run unit tests
npm test

# Build
npm run build
```

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.
