# n8n Workflows — Practical Automations & Agentic AI Systems

A curated collection of production-style [n8n](https://n8n.io) workflows, ranging from everyday business automation to autonomous, tool-calling AI agents. Every workflow ships with an importable `workflow.json` and a README covering what it solves, how it works, and how to set it up.

[![n8n](https://img.shields.io/badge/n8n-workflow-orange)](https://n8n.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Why this repo

Most workflow collections are either toy examples or a wall of unexplained JSON. This repo aims for neither:

- **Real problems** — each workflow maps to something a business, team, or individual actually pays to have solved.
- **Documented, not just dumped** — every workflow has a README explaining the trigger, the logic, the required credentials, and how to adapt it.
- **Two tiers of complexity** — straightforward trigger→action automations, and technical **agentic AI** workflows that use n8n's AI Agent node with tool-calling, memory, and multi-step reasoning.

## Getting started

1. Install [n8n](https://docs.n8n.io/hosting/) (self-hosted or [n8n Cloud](https://n8n.io/cloud/)).
2. Pick a workflow folder below and open its `README.md` for prerequisites (accounts, API keys, credentials).
3. In n8n: **Workflows → Import from File** and select the `workflow.json`.
4. Configure the credentials n8n prompts for, then test with **Execute Workflow**.

Every workflow uses placeholder credential names (e.g. `openAiApi`, `slackApi`) — you'll wire these to your own accounts on import. No secrets are stored in this repo.

## Built workflows

### 🔧 Practical Automation

| # | Workflow | Category | Key nodes |
|---|----------|----------|-----------|
| 01 | [Abandoned Cart Recovery](workflows/01-abandoned-cart-recovery) | E-commerce | Shopify Trigger, Wait, Send Email |
| 02 | [Website Uptime Monitor](workflows/02-website-uptime-monitor) | DevOps / Monitoring | Cron, HTTP Request, Slack, Twilio |
| 03 | [RSS → Slack/Discord Aggregator](workflows/03-rss-to-slack-discord-aggregator) | Content / Marketing | RSS Feed Read, Filter, Discord |
| 04 | [Invoice Generator from Form](workflows/04-invoice-generator-from-form) | Finance / Admin | Form Trigger, HTML→PDF, Gmail, Sheets |
| 05 | [GitHub PR Review Notifier](workflows/05-github-pr-review-notifier) | DevOps | GitHub Trigger, IF, Slack |
| 06 | [Daily Multi-Source KPI Report](workflows/06-daily-kpi-report-multi-source) | Reporting / Data | Cron, HTTP Request, Merge, Sheets |
| 07 | [Support Ticket Triage & Routing](workflows/07-support-ticket-triage-routing) | Customer Support | Webhook, OpenAI (classify), Switch |
| 15 | [Automated Database Backup to S3 with Rotation](workflows/15-database-backup-s3-rotation) | DevOps / IT | Schedule Trigger, Execute Command, S3, Filter |

### 🤖 Agentic AI Workflows

| # | Workflow | Category | Agent pattern |
|---|----------|----------|----------------|
| 08 | [RAG Slack Docs Chatbot](workflows/08-rag-slack-docs-chatbot) | Knowledge / RAG | Vector store retrieval + AI Agent |
| 09 | [Autonomous Email Triage Agent](workflows/09-autonomous-email-triage-agent) | Productivity | Tool-calling agent, classify + draft |
| 10 | [AI Lead Qualification Agent](workflows/10-ai-lead-qualification-agent) | Sales | Conversational agent, BANT scoring, tool calls |
| 11 | [AI Meeting Notes Agent](workflows/11-ai-meeting-notes-agent) | Productivity | Transcription + summarization chain |
| 12 | [Autonomous Code Review Agent](workflows/12-autonomous-code-review-agent) | DevOps | Tool-calling agent over diff + rules |
| 13 | [AI Support Resolution Agent](workflows/13-ai-support-resolution-agent) | Customer Support | RAG + tools + escalation logic |
| 14 | [Content Repurposing Agent](workflows/14-content-repurposing-agent) | Marketing / Content | Multi-output generation chain |

## Roadmap — 86 more ideas

These are scoped and ready to build, organized by category. Contributions welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

<details>
<summary><strong>Productivity & Personal Automation</strong></summary>

- Daily agenda digest (Calendar + Todoist + weather)
- Meeting notes → transcribe → summarize → Notion
- Auto-archive old chat attachments to S3
- Expense receipt scanner (photo → OCR → Sheets)
- Habit tracker Telegram bot with streaks
- Weekly time-tracking report from Toggl/Clockify
- Smart bookmark manager (Telegram → scrape → Notion)
- SSL/domain expiry watcher with alerts
- Auto-save Gmail attachments sorted by sender

</details>

<details>
<summary><strong>Business Operations & Admin</strong></summary>

- E-signature status reminder bot
- New employee onboarding checklist automation
- Offboarding automation (revoke access across tools)
- Vendor/contract renewal reminders
- Auto-generate meeting minutes from calendar events
- Office supply low-stock alerts
- PTO/leave request approval workflow
- Recurring subscription billing reminders
- Multi-stage document approval pipeline

</details>

<details>
<summary><strong>Sales & CRM</strong></summary>

- Lead capture → enrich → CRM → notify rep
- Cold email follow-up sequencer with reply detection
- LinkedIn lead scraper → dedupe → CRM
- Deal stage change → Slack notification
- Quote/proposal generator from CRM data
- CRM data hygiene bot (dedupe/incomplete flag)
- Sales call transcript → summary → CRM log
- Inbound call → CRM lead → round-robin assignment
- Win/loss broadcaster to sales channel

</details>

<details>
<summary><strong>Marketing</strong></summary>

- Social media auto-poster from blog RSS
- Content calendar sync (Notion ↔ Calendar)
- Newsletter automation from new blog post
- A/B test result aggregator
- Competitor price/feature monitor
- SEO rank tracker with drop alerts
- Brand mention monitor → Slack digest
- Webinar registration → reminder → follow-up sequence
- Ad spend tracker across platforms

</details>

<details>
<summary><strong>E-commerce</strong></summary>

- Order → fulfillment → shipping label → tracking email
- Low inventory alert with reorder suggestion
- Product review request automation
- Multi-channel order sync (Shopify + Amazon + Etsy)
- Fraud/high-risk order flagging
- Dynamic pricing from competitor scraping
- Refund/return approval routing
- Multi-channel product launch broadcaster
- Daily sales summary to Slack/email

</details>

<details>
<summary><strong>Customer Support</strong></summary>

- FAQ auto-responder from knowledge base
- CSAT survey sender + aggregation
- Unanswered-ticket escalation bot
- Support ticket → bug report in Linear/GitHub
- Live chat transcript archiver
- Complaint sentiment analyzer (churn-risk flagging)
- Unified multi-channel support inbox

</details>

<details>
<summary><strong>DevOps & IT</strong></summary>

- PR checks → auto-notify reviewers → auto-merge
- Server resource threshold alert + remediation
- Deployment notifier to Slack
- SSL cert auto-renewal check
- Log error aggregator → incident ticket
- Dependency vulnerability weekly scan
- Cloud cost anomaly detector
- Incident response war-room automation

</details>

<details>
<summary><strong>Data & ETL / Reporting</strong></summary>

- Multi-source API → Sheets/BigQuery nightly sync
- CSV watcher → validate → clean → load
- Weekly exec KPI report → PDF → email
- Cross-list data deduplication pipeline
- Two-way Airtable ↔ Notion sync
- Web scraper with change detection
- Currency/exchange rate updater
- Form response validation + conditional routing
- SaaS data export for compliance backup

</details>

<details>
<summary><strong>AI/LLM-Powered Workflows</strong></summary>

- Document summarizer → team distribution
- AI meeting scheduler (negotiates via email)
- Resume screener vs. job description
- Voice memo → transcription → task extraction
- Feedback theme clustering via embeddings
- RAG internal docs chatbot (Discord variant)
- Auto-translate incoming messages
- AI-generated weekly business narrative report

</details>

<details>
<summary><strong>Finance & Accounting</strong></summary>

- Bank transaction categorizer (Plaid → budget sheet)
- Invoice-to-payment reconciliation
- Late-payment reminder escalation
- Monthly financial close checklist automation
- Tax document collector
- Payroll pre-check validation

</details>

<details>
<summary><strong>HR & Recruiting</strong></summary>

- Job posting multi-board distributor
- Interview scheduling coordinator
- New hire document collection with reminders
- Birthday/anniversary Slack announcer
- ATS stage → candidate notification pipeline
- Reference check request automation

</details>

<details>
<summary><strong>Multi-Agent & Advanced Agentic Systems</strong></summary>

- Autonomous market research agent
- Due-diligence report agent
- Competitive intelligence agent (pricing/hiring signals)
- Deep-research agent with self-critique loop
- Real estate deal analyzer agent
- Supervisor + specialist agent team (routing)
- Recruiting screening chat agent
- Contract review agent with redline suggestions
- Financial controller agent (reconcile + escalate)
- Project manager agent (nags, re-prioritizes)
- Self-healing infra agent
- Bug reproduction agent
- Documentation sync agent
- On-call incident responder agent
- Test-writing agent
- Personal CRM memory agent
- Compliance/audit agent

</details>

## Repo structure

```
n8n-workflows/
├── workflows/
│   └── NN-workflow-name/
│       ├── workflow.json   # importable n8n workflow
│       └── README.md       # what it does, setup, customization
├── LICENSE
└── README.md
```

## Contributing

Ideas, fixes, and new workflows are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for the format to follow.

## License

[MIT](LICENSE) — use these freely in personal or commercial projects.
