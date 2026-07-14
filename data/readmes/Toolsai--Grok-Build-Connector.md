# Grok Build Connector

**English** · [繁體中文](README.zh-TW.md)

> Give your AI agent a second mind—and watch the two agents work together in real time.

When xAI [made Grok 4.5 free to use for a limited time in Grok Build](https://x.ai/news/grok-4-5), it sparked a simple question: could Grok 4.5 be brought into Codex and other AI agents without building a separate API integration?

That question became **Grok Build Connector**. This Agent Skill lets your AI agent talk directly with Grok, exchange ideas, challenge conclusions, review projects, and carry out other agent-to-agent conversations. Instead of hiding the exchange in the background, it also provides a visual Live UI where you can follow the conversation as it happens.

Each topic is kept in its own conversation. The history stays available after the local server restarts, so you can return to an earlier discussion, continue it, or delete it when it is no longer needed.

![Grok Build Connector live conversation history](docs/images/live-ui-conversation-history.png)

## What can it do?

- **Agent-to-agent collaboration** — ask Grok for a second opinion, start a debate, compare approaches, brainstorm, or review a project.
- **Grok Build setup assistance** — checks whether the official Grok Build CLI is available and, if it is missing, explains the installation and asks for permission before starting it.
- **Live conversation view** — follow the public exchange between your AI agent and Grok in a clean Live UI.
- **Separate conversation history** — every topic has its own history and Grok session, so unrelated discussions are not mixed together.
- **Simple conversation management** — search, switch, continue, or delete conversations from the Live UI.
- **Flexible discussion length** — conversations can stop early when the question is resolved or continue when a concrete disagreement remains.
- **Works with compatible AI agents** — the core workflow is not tied to one specific agent. The exact in-app browser experience depends on the agent you use.
- **You stay in control** — installation and file-writing actions require your approval; ordinary consultation and review remain read-only.

![An AI agent and Grok Build Connector shown side by side](docs/images/codex-side-by-side.png)

*Example of an AI agent conversation and the Live UI displayed side by side. The exact layout may vary between agents.*

## Requirements

- An AI agent that supports Agent Skills and can run local commands
- Python 3.10 or newer
- An xAI account with access to the official Grok Build CLI
- Network access for Grok Build sign-in and model requests
- Node.js if you use the recommended `npx` installation method
- A modern browser, or an in-app browser provided by your AI agent, for the Live UI

Grok 4.5 availability, free usage, regions, and limits are controlled by xAI and may change over time.

## Installation

### Ask your AI agent to install it

Paste this prompt into your AI agent:

```text
Please install the Skill from https://github.com/Toolsai/Grok-Build-Connector into this AI agent's Skills folder.
```

### Skills CLI

```bash
npx skills add Toolsai/Grok-Build-Connector
```

### Git clone

```bash
git clone https://github.com/Toolsai/Grok-Build-Connector.git
npx skills add ./Grok-Build-Connector
```

You can also copy the `skills/grok-build-connector` folder into the Skills directory used by your AI agent. Restart the agent after installation if it does not discover the Skill immediately.

## First use

Ask your AI agent to use the Skill in natural language:

```text
Use $grok-build-connector to ask Grok for an independent second opinion on this plan.
```

On first use, the Skill will:

1. check for the official Grok Build CLI;
2. explain the official installation and ask for your approval if Grok Build is missing;
3. let you complete the Grok sign-in without collecting your credentials;
4. start the local Live UI and give you a clickable link;
5. create a separate conversation for the topic;
6. begin the requested agent-to-agent exchange.

If your AI agent supports an in-app browser, it can open the Live UI beside the conversation. Otherwise, simply open the provided link in a browser.

## Prompt ideas

### Ask for a second opinion

```text
Use $grok-build-connector to ask Grok for an independent solution. Compare both approaches and give me the strongest recommendation.
```

### Start a short debate

```text
Use $grok-build-connector to debate this decision with Grok for up to three rounds. Stop early if the main disagreement is resolved.
```

### Review a project

```text
Use $grok-build-connector to have Grok review this project in read-only mode. Verify the important findings before giving me the final answer.
```

### Brainstorm together

```text
Use $grok-build-connector to brainstorm several solutions with Grok. Challenge weak ideas and keep the most practical options.
```

### Continue an earlier conversation

```text
Continue the previous Grok conversation and investigate the remaining unresolved question.
```

## How it works

1. You give a task to your AI agent.
2. The agent sends a clear, public message to Grok through the official Grok Build CLI.
3. Their visible messages and progress appear in the local Live UI.
4. Your AI agent compares the answers, checks important claims, and gives you the final result.

Agreement between two models is useful, but it is not proof. Important conclusions should still be verified.

## Conversation history

Every new topic receives its own conversation ID, Grok session, and event history. Starting a new session does not bring old messages into the current discussion.

The Live UI lets you:

- search previous conversations;
- switch between topics;
- continue an earlier discussion;
- delete conversations you no longer want.

History is stored locally and remains available after the Live UI server restarts. Deleting a conversation from the UI also removes its stored messages from the local history database.

## Privacy and control

- The Live UI server is available only from your own computer through `127.0.0.1`.
- Each server session uses a random access token.
- Hidden reasoning, credentials, environment variables, and raw tool logs are not shown in the UI.
- Grok Build installation never starts silently; your approval is required.
- Consultation and review are read-only by default.
- File changes require an explicit request and should be reviewed by your main AI agent before delivery.

## Frequently asked questions

### Does it only work with one AI agent?

No. The core Skill and local Live UI are designed for AI agents that support Agent Skills and local commands. Automatic in-app opening depends on the browser features and permissions offered by each agent; a clickable Live UI link is available as the fallback.

### Is Grok 4.5 always free?

Not necessarily. xAI announced free Grok 4.5 usage in Grok Build for a limited time. Availability and usage limits are determined by xAI and your account.

### What if the Live UI does not open automatically?

Open the Live UI link provided by your AI agent. If the default port is busy, the Skill automatically chooses another available local port.

### What if the Skill cannot find Grok Build?

Ask your AI agent to initialize Grok Build Connector. The Skill will check the installation, explain the next step, and request approval before using the official installer.

## Disclaimer

Grok Build Connector is an unofficial community project and is not affiliated with or endorsed by xAI, OpenAI, or any AI agent provider. Product names and trademarks belong to their respective owners. Review model output, follow the relevant service terms, and monitor your own usage limits.
