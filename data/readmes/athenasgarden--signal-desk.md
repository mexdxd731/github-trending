# signal-desk

A Grok / Agent Skill for builders who already shipped and need conversations, not a content calendar.

It finds live X (and web) threads where people have the problem your product solves, scores them, and drafts **help-first** replies in your voice. Product mention is optional. Slop is banned.

Athena Studios — [athenasgarden](https://github.com/athenasgarden)

## Why this exists

Most “Twitter growth” skills tell you to post more.

This one tells you which 8–12 people to talk to today, and what to say that would still be useful if your product did not exist.

Grok is the right host: first-class X search, threads, and semantic lookup. Other agents can still load the skill; they just need URLs or weaker search.

## Install

Copy the skill folder into your skills directory.

```bash
git clone https://github.com/athenasgarden/signal-desk.git
mkdir -p ~/.grok/skills/signal-desk
cp SKILL.md ~/.grok/skills/signal-desk/
cp -R references assets ~/.grok/skills/signal-desk/
```

Also works as a project skill:

```text
.grok/skills/signal-desk/SKILL.md
```

Compatible with the [Agent Skills](https://agentskills.io) format (`SKILL.md` + optional `references/` and `assets/`). Drop it into any agent that reads that layout (Grok, Claude Code, Cursor, and others).

## Triggers

Say things like:

- daily radar
- who should I reply to
- scan X for demand
- draft a high-signal reply
- find conversations for [product]
- grow without slop

## What you get

**Radar** — ranked threads with scores, a skip list, and drafts for the top 3.

**Reply** — two tones (peer / blunt) plus a “do not say” line.

**Voice lock** — five bullets so later drafts sound like you.

**Objection map** — real complaints, honest answers.

The agent should never auto-post. You send the reply.

## Layout

```text
signal-desk/
├── SKILL.md
├── references/
│   ├── scoring-rubric.md
│   ├── reply-patterns.md
│   └── anti-slop.md
└── assets/
    └── daily-radar-template.md
```

## Rules of the desk

1. Answer the question they asked.
2. One concrete artifact.
3. Pitch last or never.
4. Eight good threads beat twenty maybes.
5. If a draft would work under any product name, it is slop.

## License

MIT
