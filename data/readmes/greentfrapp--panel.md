# Panel

A research workspace where the agent works beside you: chat, files, PDFs and notebooks in one dock, and the agent can also create custom viewers and apps when necessary

This is an early build for testers. Expect rough edges, and feel free to raise issues.

![Screenshot of Panel in action.](assets/panel_screenshot.jpg)

## Before you start

- [Node](https://nodejs.org/en/download) 22.18 or newer (or 24.12 and newer)
- [pnpm](https://pnpm.io/installation)
- [uv](https://docs.astral.sh/uv/getting-started/installation/), which fetches the Python it needs (3.12 or newer) by itself
- [Claude Code](https://code.claude.com/docs/en/setup), installed and signed in: run `claude` once and log in. The agent and the literature review run through it.

## Install and start

```sh
pnpm install
uv sync
pnpm start
```

Then open <http://localhost:4173>. `pnpm start` builds the app first, so the first start takes a minute. Ctrl-C stops everything it started.

## Where your things are

- `~/Panel/panel.db` holds your conversations and everything the agents did.
- `~/Panel/workspaces` is where new Workspaces are created, unless you pick another folder.

Both are outside this folder, so deleting or re-cloning the repo keeps them.

## What works

- Chatting with an agent that can read and write files, and asks before running a tool.
- Workspaces: a folder the agent works in, with its own chats and saved layout.
- Panes for files, PDFs, markdown and Jupyter notebooks. Notebooks run against a real kernel, and you and the agent can edit the same one.
- Long-running commands in the background, which you can watch and stop.
- Panes the agent writes for you when you ask to see something a built-in Pane cannot show.
- A literature review: ask the chat for one, and open its result from the tool card.

## What doesn't yet

- Currently only has full support for Claude Code.
- Modules start only by asking the chat. There is no button to launch one.
- The hypothesis Modules have no view of their own, so their results can be hard to read.
- Modules don't work with OpenAI API yet.

## The OpenAI key (optional)

Copy `apps/server/.env.example` to `apps/server/.env` and set `OPENAI_API_KEY`. This adds "OpenAI API" to the agent picker, for chat and tools.

It does not run literature reviews or the hypothesis Modules: those need an agent that can search the web, and today only Claude Code can. Without a key, the picker shows OpenAI as not set up, which is expected.

## If something's wrong

- **"Panel couldn't reach its server."** The server half is not running. Check the terminal `pnpm start` is in, then press Retry.
- **An agent shows as not set up.** The reason is written under the message box.
- **A port is already in use**, or the app answers but never loads: run `pnpm dev:doctor`. It says what is holding each port and how to clear it.

## Licence

[MIT](./LICENSE)

---

## The idea

### UI

The UI has multiple configurable windows, called Panes, that can display things ranging from image files, data files, code, as well as chat sessions. This is critical for researchers who often have to context switch between different types of files.

A default set of Panes are provided for common use cases. But custom Panes can also be added by humans and agents, such as a PDB viewer or SQLite visualizer.

### Module Protocol

Modules are similar to Skills but with additional definitions to support inter-module workflows and integration with the workspace.

Specifically, Modules have typed definitions for Inputs, Outputs, and Intermediates.

Inputs and Outputs are straightforward. Intermediates refer to objects that provide observability, such as the Chain-of-Thought or scratchpad for an agentic Module, or may be intermediate outputs in a multi-stage Module. These are especially important for processes that need transparency or long-running jobs that should show progress.

Having typed definitions for these enable validation at runtime and make it easier for humans and agents to develop custom Modules for downstream tasks and Panes for visualizations.

#### Data Abstraction Layer

A data abstraction layer (DAL) bridges in-memory and filesystem objects. A DAL helps to map a URI to either an in-memory store or a local file, so that the Module just has to concern itself with the manipulation of the object.
