<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/logo-dark.svg">
    <img src="docs/brand/logo-light.svg" width="400" alt="rea-games">
  </picture>
</p>

<p align="center"><sub>Made in Türkiye 🇹🇷 by <a href="https://github.com/erkamyaman">erKam Yaman</a> · <a href="https://github.com/sponsors/erkamyaman">❤️ Sponsor me</a> · <a href="#sponsors">Sponsors</a> · <a href="LICENSE">MIT</a><br>Sponsored by <a href="https://coderabbit.link/er-kam"><img src="docs/assets/brands/coderabbit.png" width="22" height="22" align="absmiddle" alt=""> <b>CodeRabbit</b></a></sub></p>

<p align="center">Also by me: <a href="https://github.com/erkamyaman/rust-anything"><b>rust-anything</b></a>, rewrite your app in Rust and prove it still behaves the same.</p>

<p align="center">
  <img src="docs/assets/2048.gif" alt="The original 2048 and the rebuild side by side, same moves, boards identical in every frame" width="820">
  <br><sub>The original 2048 (left) and a rebuild (right), same moves, same random numbers: the boards match on every move.</sub>
</p>

<p align="center">
  <img src="docs/assets/dino.gif" alt="The original Chrome Dino and the rebuild side by side, same inputs, identical state every frame" width="820">
  <br><sub>Chrome's Dino: 1,800 steps, 23 obstacles, a pterodactyl, then a crash. Obstacle positions, dino height, crash and score match on every step.</sub>
</p>

<p align="center">
  <img src="docs/assets/canvas-bird.gif" alt="The original Canvas Bird and the rebuild side by side; every draw call of every frame is identical" width="760">
  <br><sub>Canvas Bird: the original's state is private, so its draw calls are compared instead: all 1,140 steps match.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-555" alt="MIT license">
  <img src="https://img.shields.io/badge/games-6-2563EB" alt="6 games">
  <img src="https://img.shields.io/badge/recorded%20inputs-667%2C561-E2862A" alt="667,561 recorded inputs">
  <img src="https://img.shields.io/badge/runs%20in-Claude%20Code%20·%20Codex-6E40C9" alt="Runs in Claude Code and Codex">
</p>

Part of a family: [rea](https://github.com/morluto/rea) takes software apart, [rea-video](https://github.com/JuneYaooo/rea-video)
does it for video, [craft-anything](https://github.com/storytold/craft-anything) rebuilds apps, and
[rust-anything](https://github.com/erkamyaman/rust-anything) proves a Rust rewrite behaves like the original.
**rea-games does it for games.**

## Play the rebuilds

In your browser, no install: **[erkamyaman.github.io/rea-games](https://erkamyaman.github.io/rea-games/)**

Each is written from a behavior spec (`GAME.md`), draws its own art, and passes its recording.

| Game | Original | Play | Verified |
|---|---|---|---|
| 2048 | [gabrielecirulli/2048](https://github.com/gabrielecirulli/2048), MIT | [play it](https://erkamyaman.github.io/rea-games/play/2048.html) | 19 cases, 24,044 inputs: web, Godot and Rust (Bevy) ports |
| Dino | Chrome's offline dinosaur ([copy](https://github.com/wayou/t-rex-runner), BSD-3) | [play it](https://erkamyaman.github.io/rea-games/play/dino.html) | 29 cases, 63,000 frames: web, Godot and Rust (Bevy) ports |
| Canvas Bird | [giotiskl/Canvas-Bird](https://github.com/giotiskl/Canvas-Bird), MIT | [play it](https://erkamyaman.github.io/rea-games/play/canvas-bird.html) | 30 cases, 68,409 frames: web, Godot and Rust (Bevy) ports |
| Blocks (falling blocks) | [jakesgordon/javascript-tetris](https://github.com/jakesgordon/javascript-tetris), MIT | [play it](https://erkamyaman.github.io/rea-games/play/blocks.html) | 36 cases, 104,208 frames: web, Godot and Rust (Bevy) ports |
| Bricks (brick breaking) | [jakesgordon/javascript-breakout](https://github.com/jakesgordon/javascript-breakout), MIT | [play it](https://erkamyaman.github.io/rea-games/play/bricks.html) | 37 cases, 209,600 steps: web port |
| Paddles (two-paddle ball game) | [jakesgordon/javascript-pong](https://github.com/jakesgordon/javascript-pong), MIT | [play it](https://erkamyaman.github.io/rea-games/play/paddles.html) | 19 cases, 198,300 steps: web port |

## How it works

```
original game ──(fake clock, seeded random numbers)──> cases/*.json   inputs + every random number + state after each step
                                                                          │
GAME.md  (what the recording shows)  ──> your port, in any engine  ──> rea-games verify  ──> identical, or the first difference
```

1. **Record.** The original runs unmodified. Its clock and `Math.random` are replaced from outside, so a run can be repeated. Every random number it draws is saved (the *tape*), with the inputs and the game state after each step.
2. **Spec.** `GAME.md` states the rules, the order of operations in a frame, the constants, the quirks (including the original's bugs) and what is not modelled.
3. **Port.** Any program that reads a case on stdin and prints `{trace, tapeUsed}` is a port: JavaScript, Rust, Godot run headless, C#.
4. **Verify.** Every recorded state must match exactly, and the port must use exactly the recorded random numbers. The first difference is printed with its path.

```
$ node bin/rea-games.mjs verify all
2048 / web          => 19/19 cases identical, 24044 inputs
2048 / bevy         => 19/19 cases identical, 24044 inputs
2048 / godot        => 19/19 cases identical, 24044 inputs
canvas-bird / web   => 30/30 cases identical, 68409 inputs
canvas-bird / godot => 30/30 cases identical, 68409 inputs
canvas-bird / bevy  => 30/30 cases identical, 68409 inputs
dino / web          => 29/29 cases identical, 63000 inputs
dino / godot        => 29/29 cases identical, 63000 inputs
dino / bevy         => 29/29 cases identical, 63000 inputs
blocks / web        => 36/36 cases identical, 104208 inputs
blocks / godot      => 36/36 cases identical, 104208 inputs
blocks / bevy       => 36/36 cases identical, 104208 inputs
bricks / web        => 37/37 cases identical, 209600 inputs
paddles / web       => 19/19 cases identical, 198300 inputs
```

A check that cannot fail proves nothing, so each port was also broken on purpose (a constant, a collision offset, a timing gate, a spawn-gap factor): `verify` failed each time, for example 5 of 30 Canvas Bird cases pass with the 30 fps gate changed, 3 of 19 for 2048 with the spawn odds changed from 0.9 to 0.8.

## Use it with an agent

```
claude plugin marketplace add erkamyaman/rea-games
claude plugin install rea-games@rea-games
```

The same plugin is listed in `.agents/plugins/marketplace.json` for agents that use that marketplace format (for example Codex: `codex plugin marketplace add erkamyaman/rea-games`, then `codex plugin add rea-games@rea-games`).

Then: *"rea this game: <link to an open-source game>, rebuild it in Godot."* The skill (`skills/rea-games/SKILL.md`) runs the loop above. It records, writes the spec, builds the port, verifies, and reports what it could not cover.

Or by hand:

```
node bin/rea-games.mjs list
node bin/rea-games.mjs new my-game        # scaffold games/my-game
node bin/rea-games.mjs record my-game     # run the original, write the cases
node bin/rea-games.mjs verify my-game --port web
node bin/rea-games.mjs pack all           # gzip the cases for git
```

Needs Node 22. Browser games also need Playwright with Chromium; the Rust ports need `cargo`, the Godot one a Godot 4.4 binary (`REA_GODOT=/path/to/godot`).

## Engines

| Target | Status |
|---|---|
| Web (canvas, one HTML file, mobile friendly) | every game (2048, Dino, Canvas Bird, Blocks, Bricks, Paddles), verified |
| Rust / Bevy | 2048, Dino, Canvas Bird and Blocks as Bevy projects (`dino-core` logic verified through `dino-runner`; the Bevy window itself compiles and ran 25 s under Xvfb, never played) |
| Godot 4.4 (GDScript) | 2048, Dino, Canvas Bird and Blocks, verified: a headless runner passes all 19 cases. A playable scene (`ports/godot/main.tscn`) loads and takes input in a headless smoke test; its look has not been checked |
| Unity (C#) | not started |
| Capacitor (wrap the web build for iOS/Android) | not started; Capacitor wraps a web build, so it builds on the web ports |

A port counts as verified only when `verify` runs it through its runner. Ports that are not verified are labelled as such.

## Legal, in short

Rebuilding behavior from a recording is clean-room work. Originals are included only where their licence allows it, unmodified, with their licence (`NOTICE`). Rebuilds use no art, sound, names or code from the originals. If you add a game, check its licence first and do not use a trademarked name.

## What it does not do (yet)

- It matches **behavior**, not looks: the rebuilds draw their own art.
- Games must be runnable and deterministic once their clock and random numbers are controlled. Network games, and games whose state cannot be observed from outside, need more work.
- Coverage is what the cases hit. Each `GAME.md` lists the gaps (for Dino: few crashes into the flying obstacle; for Canvas Bird: few hits on the bottom pipe).

Details: [`docs/STATUS.md`](docs/STATUS.md) · [`DECISIONS.md`](DECISIONS.md) · [`docs/pitfalls.md`](docs/pitfalls.md) · [`NOTICE`](NOTICE)

## Sponsors

<p align="center">
  <a href="https://github.com/erkamyaman/rea-games">rea-games</a> is free and open source. If it helps your work, please consider sponsoring it.<br>
  Your support keeps new games and engine ports coming.
</p>

<p align="center"><sub>Your safety comes first: sponsors get a logo and a link here, nothing more. No paid recommendations and no setup guides for third-party AI API resellers, so nothing here steers your code, keys or data somewhere you didn't choose.</sub></p>

<p align="center">
  <a href="https://coderabbit.link/er-kam">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/assets/sponsors/company-dark.svg">
      <img src="docs/assets/sponsors/company-light.svg" width="800" alt="Company sponsor: CodeRabbit">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/sponsors/erkamyaman">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/assets/sponsors/sponsors-dark.svg">
      <img src="docs/assets/sponsors/sponsors-light.svg" width="800" alt="Sponsors: Santosh Yadav, Hakan Soytürk, Ali Yilmaz, Ashley Hunter, Fatih Uzuntaş, bugrcvi">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://github.com/sponsors/erkamyaman"><img src="https://img.shields.io/badge/Become_a_sponsor-%E2%9D%A4-db61a2?style=for-the-badge&logo=githubsponsors&logoColor=white" alt="Become a sponsor"></a>
  <a href="https://buymeacoffee.com/erkamyaman"><img src="https://img.shields.io/badge/Buy_me_a_coffee-%E2%98%95-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy me a coffee"></a>
</p>

MIT licensed. Made in Türkiye 🇹🇷 by [erKam Yaman](https://github.com/erkamyaman).
