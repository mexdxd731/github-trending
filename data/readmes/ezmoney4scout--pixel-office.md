# Pixel Office

**A Windows desktop app for visual AI teamwork and everyday office tasks.**

Describe what you need, approve the plan, and watch pixel-art agents work through it. Create editable PowerPoint presentations, Word documents, Excel spreadsheets, and PDFs using your own AI model API keys.

[Download v0.2.3 for Windows](https://github.com/ezmoney4scout/pixel-office/releases/tag/v0.2.3) · [Browse the source](https://github.com/ezmoney4scout/pixel-office/tree/main/src)

> The current desktop interface is in Chinese. This README is in English.

## Main features

| Feature | What you can do |
| --- | --- |
| **Create office files** | Generate real `.pptx`, `.docx`, `.xlsx`, and `.pdf` files, not just text outlines. |
| **Watch your AI team work** | Follow agent activity, task steps, logs, and deliverables in a pixel-art office. |
| **Choose your AI model** | Connect DeepSeek, OpenAI, Claude, Gemini, Qwen, Kimi, MiniMax, GLM, or a compatible custom endpoint with your own API key. |
| **Approve before execution** | Review plans, workspace access, and specialist assignments before tools run. Expanded access requires another approval. |
| **Use ready-made specialists** | Enable nine built-in roles or import compatible role definitions from GitHub. |
| **Manage ongoing work** | Queue, pause, cancel, revise, and resume tasks while keeping history and outputs. |
| **Work with local documents** | Read supported files and create new outputs. Explicitly approved operations support copying, moving, and recoverable deletion. |
| **Track usage** | View token usage, configure model prices, and set optional budgets for subsequent calls. |

## Office capabilities

- **PowerPoint:** editable presentations with a cover, bullet slides, automatic continuation pages, and speaker notes. Extract text from existing PPTX files.
- **Word:** reports, meeting minutes, weekly updates, and email drafts with headings, bold text, lists, and basic tables.
- **Excel:** multiple worksheets, filters, frozen headers, and same-sheet `SUM`, `AVERAGE`, `MIN`, `MAX`, and `COUNT` range formulas with calculated results.
- **PDF:** export organized text and extract text from supported PDFs.
- **Text and data:** read common text formats and generate Markdown, plain text, CSV, JSON, and supported source-code files.

Example requests:

- "Turn these notes into an eight-slide product presentation and save it as PPTX."
- "Create meeting minutes with decisions, action items, owners, and due dates. Mark missing information as unconfirmed."
- "Build a monthly expense workbook with a transaction sheet and a summary total."
- "Summarize the attached documents and export the result as a PDF."

## Get started

1. Download the **Windows x64 ZIP** from the [release page](https://github.com/ezmoney4scout/pixel-office/releases/tag/v0.2.3).
2. Extract the entire archive and run **Pixel Office.exe**. Keep all accompanying files and folders together.
3. Try the demo without model calls, or open model settings to choose a provider, follow the API-key guide, paste your key, and test the connection.
4. Describe a task. Add source files or select a workspace folder if needed.
5. Review and approve the plan. Follow progress and open the generated files from the task panel.

The packaged app does not require Node.js or a Pixel Office account. Model providers charge separately for API usage. Microsoft Office is not required to generate files; use a compatible office application to edit them afterward.

**Upgrading:** stop tasks and exit the old app before opening the new version. Minimizing to the tray leaves the old app running. Settings and history remain in the same Windows user's application data directory.

## How collaboration works

A task uses one main agent and up to two specialists. All agents share the selected model and work through steps sequentially. One task runs at a time; additional tasks enter a queue.

The built-in roles cover research, writing, presentations, document formatting, spreadsheet analysis, coding, file organization, content planning, and quality review. Imported GitHub roles are prompt definitions with recorded source revisions, not executable installation scripts.

Pixel characters reflect task state. They do not control the desktop or operate a real computer screen.

## Recent updates

- **v0.2.3 — Collaboration & MiniMax:** multi-agent tasks no longer fail because of experts from abandoned plans; every agent sees the approved team division; plans no longer schedule steps that ask the user mid-run; ordinary tool errors are returned to the model instead of failing the task; omitted flags in a proposed plan inherit the current plan (still requires approval). Adds the MiniMax provider, strips reasoning `<think>` blocks, and maps MiniMax in-body error codes. Planning output limit raised to 4096 tokens.
- **v0.2.2 — Readability:** dark neutral body text, blue file links, clearer status colors, 14px body text, and 12px secondary text. Measured contrast ratios: 13.2:1 for log text, 6.24:1 for secondary text, and 6.67:1 for file links.
- **v0.2.1 — Recovery:** regenerate legacy plans before execution while preserving outputs and plan history. Nested plan errors enter the bounded format-correction flow. Updated plans still require approval.
- **v0.2 — Office tools:** PPTX generation, a presentation specialist, richer Word formatting, multi-sheet Excel output, and office-task shortcuts. Invalid model output receives one correction attempt; correction calls count toward usage and budgets.

## Privacy and local data

The app uses Electron's user-data directory, normally `%APPDATA%\Pixel Office`:

- `state.json`: settings and task history.
- `keys.json`: API keys encrypted with Windows-backed Electron secure storage.
- `workspaces`: default task workspaces.
- `.pixel-trash` inside a workspace: files moved there by approved recoverable-delete operations.

API keys are excluded from renderer snapshots and task logs. Generated files go into a task-specific output folder without overwriting existing targets.

Your selected model receives task instructions, approved document excerpts, and step summaries. Initial planning sends your request before tool approval but does not read workspace files. Optional web searches go to Tavily; role imports access GitHub.

## Current limitations

Pixel Office is an early functional desktop release, not a full office editor or a production-validated automation system.

- **Live information:** web search requires a separate Tavily API key. Requests about the latest news or versions need search access or current source documents.
- **Office formatting:** complex template preservation, macros, OCR, chart generation, and automatic image selection are not supported. PPTX extraction reads text, not image or chart meaning. File size, row, and text-chunk limits apply.
- **Excel formulas:** supported formulas summarize raw numeric ranges within one worksheet. Formula-to-formula references and external workbooks are not supported.
- **Code execution:** calculations run in restricted QuickJS. Python, shell commands, and desktop/browser automation are unavailable. Generating a script does not execute it.
- **Integrations:** WorkBuddy's talent library is not connected. GitHub imports accept compatible manifests or Markdown roles, not arbitrary repository installers.
- **Communication:** the app creates email drafts as documents; it does not send email.
- **Cost estimates:** estimates depend on reported usage and your configured prices. They are not billing statements. Budgets cannot undo requests already sent.
- **Recovery:** inspect existing outputs before resuming. Exactly-once file execution is not guaranteed after power loss or external file changes.
- **Distribution:** the Windows x64 package is unsigned and runs after extraction. An installer and automatic updates are not included.

Production builds, automated runtime checks, and packaged desktop tests have been performed. v0.2.3 passed 49 automated tests. Office generation and approval flows were exercised with a local model-protocol fixture; live paid-model end-to-end validation remains incomplete. Fixture tests do not establish reliability across all providers.

## Run from source

Built with **TypeScript, Electron, and React**. Use Node.js 22 or newer, npm, and network access for dependency installation.

```powershell
npm ci
node node_modules/electron/install.js
npm test
npm run build
npm start
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start desktop development. |
| `npm run preview:web` | Run the browser demo; real API keys and filesystem operations require the desktop app. |
| `npm test` | Run runtime and office-generation tests. |
| `npm run build` | Type-check and build the production app. |
| `npm run package` | Package Windows files into `release-v0.2.3/win-unpacked`. |

Tests are in `tests/`. Desktop acceptance scripts are in `scripts/qa/` and require Playwright; set `PLAYWRIGHT_MODULE` for a custom module location. The app itself does not depend on those scripts.

## Credits

- Office visualization inspired by Marvis and [munder-difflin](https://github.com/chaitanyagiri/munder-difflin). Characters and scenes are drawn in this project's code; their artwork was not copied.
- Planning prompts adapt ideas from Superpowers; see the [included upstream MIT license](docs/SUPERPOWERS-LICENSE.txt). The app does not dynamically invoke an installed Superpowers plugin.
- Office output uses [PptxGenJS](https://gitbrent.github.io/PptxGenJS/), docx, and ExcelJS.
- Imported roles retain source and license metadata. Their respective licenses apply to redistributed material.
