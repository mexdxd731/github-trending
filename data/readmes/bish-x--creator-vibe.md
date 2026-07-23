# creator-vibe

[Русский](README.ru.md)

> Stop polishing the machinery. Build what the person actually needs.

Codex can be brilliant and still spend an absurd amount of effort polishing the wrong stone.

It can disappear into abstractions, versions, edge cases, architectural purity, and formally correct code long after the human result has gone missing. The work keeps moving. The person waiting for it does not.

`creator-vibe` is a small skill that puts the real outcome back at the center.

It makes the agent look beneath the literal prompt and ask:

- What is this person actually trying to make possible?
- What should someone be able to do, feel, or understand when the work is done?
- What must remain recognizably theirs?
- Which engineering decisions serve that result—and which are just motion?

This is not a shortcut around quality. It is a way to make quality answer to purpose.

## What changes

With `creator-vibe`, the agent stops treating technical sophistication as the finish line. It uses rigor where rigor earns trust, simplifies where complexity adds nothing, and keeps moving toward something a real person can use.

In practice, that often means less architectural wandering, fewer endless refinement loops, and a shorter path to a result you can actually see.

The skill is especially useful when:

- your brief is high-level, emotional, incomplete, or hard to put into words;
- Codex is overengineering instead of shipping the thing you meant;
- a technically correct result still feels lifeless, awkward, or wrong;
- product, UX, architecture, copy, or defaults depend on taste and human judgment;
- the agent needs to challenge your first solution without replacing your intent.

## A real shift in reasoning

Give Codex a few raw examples of the service responses you want from a self-assembling backend, and without this lens it may start by polishing schemas, version matrices, and abstraction boundaries.

With `creator-vibe` as the primary decision layer, it can reach the point underneath the samples:

> The goal is not to cram in more versions. It is to make the internal mechanics disappear for the developer, protect the user's work, and update only when the open interface can no longer satisfy the contract of the service it depends on.

That is the difference: not less thought, but thought aimed at the thing that matters.

## Use it in a task

When you want the skill to shape the whole task, paste this into your prompt:

> **Use `creator-vibe` as the foundation for this task.** Let it guide every decision you make. Keep the work rigorous and within scope, without overengineering. As you go, keep checking: is the implementation moving toward the result the person actually needs, or drifting into unnecessary complexity?

## Make it the default lens

If you want Codex to interpret every prompt through this lens by default, add the following to your global Codex `AGENTS.md`:

```markdown
### Creator Vibe Lens

Treat `creator-vibe` as the persistent interpretive lens for every user message, before classifying the task or acting on its literal wording.

Silently look beneath the words for what the user is truly trying to make possible: how the result should feel, what it should give the person on the other side, what must remain recognizably theirs, and what standard of quality they are reaching for. Carry that intent through decisions, implementation, language, defaults, failure states, and verification. Do not preserve the words and lose the point.

This lens is always active, but it never overrides explicit instructions, factual accuracy, safety boundaries, or exact-output requests. Do not invent requirements or expand scope in its name. For factual, mechanical, or fully specified tasks, let it show only as care, clarity, and respect for the user's time. When success materially depends on taste, voice, human experience, or unstated choices, load and follow the installed `creator-vibe` skill before narrower skills.

Do not explain this interpretation back to the user unless asked. Let it show in the work.
```

The lens stays present in every prompt. The full skill is loaded when the task genuinely benefits from it.

## The point

`creator-vibe` does not make an agent less rigorous. It stops rigor from becoming a place to hide.

The result should not merely be formally correct. It should reach the person it was made for.

---

<p align="center">
  Created by <a href="https://t.me/bishx"><strong>@bishx</strong></a><br>
  <sub>Follow the work on Telegram.</sub>
</p>
