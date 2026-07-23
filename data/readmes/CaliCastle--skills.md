# Skills

A collection of Agent Skills by Cali Castle.

[![skills.sh](https://skills.sh/b/calicastle/skills)](https://skills.sh/calicastle/skills/signal-geometry)

## Signal Geometry

Signal Geometry is an Agent Skill for turning one concept into a sparse abstract illustration or poster. It uses precise geometry, quiet matte fields, restrained contrast, and one legible spatial event.

![Gated streamlines](skills/signal-geometry/assets/examples/01-gated-streamlines.png)

![Linked orbits](skills/signal-geometry/assets/examples/02-linked-orbits.png)

![Relay constellations](skills/signal-geometry/assets/examples/04-relay-constellations.png)

### Install

Using npm:

```sh
npx skills add CaliCastle/skills --skill signal-geometry
```

Using pnpm:

```sh
pnpm dlx skills add CaliCastle/skills --skill signal-geometry
```

### Use

Invoke the skill explicitly with `$signal-geometry`:

```text
Use $signal-geometry to create a dark 4:5 poster about a weak signal becoming stable through repeated filtering. No text.
```

For a prompt without rendering:

```text
Use $signal-geometry in prompt-only mode for an ultrawide illustration about two systems finding equilibrium.
```

### Output

Rendered work includes the accepted image, its exact final prompt, and the complete composition recipe. Prompt-only mode returns the prompt and recipe without generating an image.

### Requirements

- Prompt-only mode works without image tools.
- Rendered mode requires image generation and image inspection capabilities.
- The Codex integration is explicit-only by design, so invoke `$signal-geometry` by name.

### License

Signal Geometry and its reference images are released under the [MIT License](LICENSE).
