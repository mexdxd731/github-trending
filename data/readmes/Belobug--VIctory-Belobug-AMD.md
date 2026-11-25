# VIctory fork for AMD Radeon (work in progress)

This is a fork of [VIctory](https://github.com/Marvisak/VIctory) by Marvisak
and its contributors. It follows upstream `main` up to `8e79c80` (2026-11-24),
carries a number of upstream pull requests, and adds fixes found while running
the game's world on one AMD card.

**This repository contains no game files, code or assets.** You need your own
copy of the game. It is not affiliated with or endorsed by the game's
developer or publisher.

## State of this fork (2026-11-25)

**Not playable yet: 5 to 7 frames per second.** Tested on one machine only:
Windows 11, AMD Radeon RX 9070 XT 16 GB, Ryzen 7 9800X3D, 64 GB RAM, Series X
profile. Nothing here has been run on an NVIDIA or Intel card.

| What | State on that machine |
|------|-----------------------|
| Boot, menus | work, 30 fps (as upstream) |
| The world | renders lit, with textures, people, vehicles, vegetation, water and sky |
| Saves | load and store |
| Frame rate in the world | 5 to 8 fps (7.2 to 7.7 standing still in a scene of 8,800 draws; less while driving). Shown in the picture's top left corner (`VICTORY_FPS=0` hides it) |
| Light in shadow | a stand-in that follows the game's sky by day and by night, less of it in creases and under objects: the game's ray-traced indirect light does not run |
| Reflections | the game's, held down: without rays every glossy surface reflected the open sky, indoors too, and floors looked whitewashed |
| Shadows of the sun and of lamps | the game's own, and they work; too much of the constant light drowns them |
| Distant trees | drawn |
| Vehicles in motion | whole (they lost and stretched parts until the copies of title memory saw writes through every view of a page) |
| In-game phone | **broken**: with the phone out the world is unlit (black) and the phone is an empty outline |
| Memory | about 22 GB of RAM and more video memory than a 16 GB card has |

A driver timeout (Windows resets the display driver, every monitor goes black
for a moment) happened once in the session this was written in. Expect it.

### What this fork changes over upstream

Picture:
- The world's indirect diffuse light is replaced by a constant while the ray
  passes do not run. What the game's resolve pass left instead was bright
  magenta on leaves, cloth and paper, and blocks of colours indoors
  (`VICTORY_AMBIENT=<level>`, 0.6 by default; `off` keeps the game's output).
  Its colour can be set (`VICTORY_AMBIENT_TINT=r,g,b`), and less of it
  reaches creases, corners and the underside of things, worked out from the
  scene's depth alone (`VICTORY_AMBIENT_SHADE=strength,radius`; grainy, it is
  not blurred yet). In diagnostics builds all of it can be tuned in a running
  game from a file (`VICTORY_AMBIENT_FILE`). It follows the sky dome the
  game draws for its reflections (`VICTORY_AMBIENT_SKY=off` keeps the
  constant, `gain,least,power` sets it): its level is `gain * mean^power +
  least` with the sky's hue, so night, dawn and noon need no hand-set level.
- Translated shaders get clean-up passes before they are written (dead
  code, constants, one instruction for one value, branch facts, one read
  for one place), taken from the VIctory fork at commit ba8697aa and
  adapted (`VICTORY_SHADER_OPT=0` turns them off). All 25,623 shaders this
  fork emits for the game pass Microsoft's validator with them. The first
  launch after such a change rebuilds every pipeline (minutes of black
  world) and **the water is missing until the game is started again**.
- The game's reflections are held to a part of that constant light after
  its last reflection pass (`VICTORY_AMBIENT_REFLECT`, 0.5 by default, 0
  leaves them alone). Without rays they are the sky's, unoccluded.
- Blending is off on integer render targets in host pipelines: the console
  ignores it there, D3D12 refuses the pipeline. One world pipeline the driver
  refused at every launch is made now (pull request #45, pgm1207 and Arvi23).
- In pixel shaders every read of another pixel of the same 2x2 quad goes
  through quad reads, helper pixels included. Wave reads return 0 from helper
  pixels on AMD, which showed as lines along every triangle on car paint,
  glass and skin. Upstream does this after discards only.
- A helper pixel's `v_readfirstlane` reads its own value (upstream `0601955`).
- Twice the dynamic descriptor slots, so the tables of heavy frames fit.
- Depth and stencil twins for depth textures written by compute, screen
  passes with pipeline workers of their own, textures told apart by the mips
  their memory really holds, and other fixes listed in the history.

Speed:
- The clamps of a run of indirect draws are recorded in a list before the
  list that draws, and run one after another (`VICTORY_HOIST_CLAMPS`, 7 by
  default, 0 for each before its draw): 225 to about 80 ms of GPU time per
  frame in a scene of 9,000 draws.
- The snapshots and the copy-back of the tiles shaders write are taken on
  several threads (pull request #18, PikPakPik): copying back went from
  about 43 to about 33 ms a frame here. The frame rate did not move.
- The title's submissions return before the host GPU is done, with what
  they owe finished at the next wait (`VICTORY_ASYNC_SUBMIT=0` turns it
  off): 200-238 to 150-186 ms a frame in the same place. It gained nothing
  until the next two changes were in.
- Title memory the game shows one 64 KiB view at a time is used in place:
  its pages follow one another in their section, so the stretch is mapped
  once more at an address of ours and the host heap opened there
  (`VICTORY_STRETCH=0` turns it off). Copying back went from 36 to 12 ms a
  frame. Ranges made of several stretches are still copied.
- The table of descriptor views is a read-write lock. A PIX timing capture
  showed the game's five recording threads taking turns on it as a mutex,
  6,600 context switches a second each.
- Thin LTO and one codegen unit for the release profile (pull request #96,
  Key-rs), and eight changes by romainhedouin that take repeated work out
  of the draw path (#24, #25, #27, #28, #29, #30, #33, #34). None of the
  eight moved the frame time measurably here; nothing broke.
- What a frame still waits for, from the same capture: the thread that
  submits, which prepares each batch while the host GPU is idle (the plan
  of directly indexed descriptors walks every slot, `bindless_plan`), and
  copies of title memory, about 100 MB a frame.
- Shader cache entries of another build can be reused
  (`VICTORY_SHADER_BUILD_OF=<executable>`, diagnostics).

Memory the title shows at several addresses:
- Every view of a guarded physical page is guarded with it, so a write of
  the title's through another address is seen (the idea of victory-fork
  #115 and victory-amd, written anew here); blocks the kernel is about to
  write stay writable for two seconds. Before this, parts of moving
  vehicles were left behind; the distant trees' quads that crossed the
  screen have not come back since either (cause not proven).

AMD:
- Shaders that crash or never leave the AMD driver's compiler cost only
  their pipeline, not the run.
- Buffer element counts come from the host's own table, not a size query the
  driver's compiler crashes on.

Lifetimes: a list keeps the copies of title memory whose addresses it gives
as root views, and objects the title let go of are kept eight seconds at
least (32 presented frames were a third of a second in the menus).

Diagnostics: every translated shader is logged with its DXIL hash, the one
[Radeon GPU Detective](https://gpuopen.com/radeon-gpu-detective/) names a
shader in flight by, so its crash reports can be matched to the game's
programs. Diagnostics builds: `VICTORY_SHADER_PATCH` changes one word of a
shader's machine code before translation, `VICTORY_SHADER_SWAP` replaces
shader containers by files, `VICTORY_ALWAYS_COPY=1` refreshes every copy of
title memory each frame, `VICTORY_GPU_TIMING=1` logs GPU time per pipeline.
Each is described in a comment where it is read.

### How it is run here

A diagnostics build (`cargo build --profile diag -p victory --features
diagnostics`), with:

```
VICTORY_PRESENT_TARGET=1x1:1
VICTORY_HAIR=1
victory run <game_scarlett_master.exe> --execute --console series-x
```

The first launch after a build translates every shader and builds about
2,500 pipelines; the loading screen can stay frozen, with sound, for minutes.

### Known problems

- With the in-game phone out the world is unlit (see the table).
- The per-draw descriptor slots are few for the heaviest places: when they
  run out, some draws of a frame are dropped.
- Memory: the process commits about 33 GB after a quarter of an hour's
  drive (the title's own 7 GB, 8 GB of textures on the card, copies of its
  buffers, and the system's backing of video memory).
- No ray-traced light; what stands in for it is the same everywhere in a
  frame. With the sky following turned off the constant of 0.6 is too much at
  night and too little at noon.
- Streamed textures are capped at 1024 pixels a side (512, then 256, as
  video memory fills): at 2048 this 16 GB card goes 1 to 2 GB over its
  budget (`VICTORY_TEXTURE_MAX=2048` to try).
- Some compute programs do not translate (ray-tracing structure builders,
  wind volumes, a few others) and their passes are dropped. With
  `VICTORY_RAYS=1` the builders translate and run, and the device is
  removed a minute and a half later: do not expect light from it. Two
  causes found with AMD's Radeon GPU Detective are fixed (lists and
  descriptors named copies of title memory that were already destroyed);
  the run now ends on a read at an address no resource ever had.
- Some draws of a frame are dropped in the world for want of a host
  pipeline: 266 programs of the pack do not translate (195 take console
  addresses in scalar registers: the ray-tracing builders and a family of
  geometry shaders; 71 mesh shaders pass the host's 32 KiB of outputs), and
  the AMD driver's compiler crashes on one compute program. Four mesh
  pipelines counted as refused before were only on the list of pipelines
  the driver's compiler does not end, put there by a rule that fired while
  the world loads; delete `pipelines/crashed.txt` in the cache folder if
  an older build wrote it. The program that activates the screen probes'
  rays is left out on purpose while rays do not run.
- Windows 10 is reported not to get past start-up without a newer D3D12
  runtime (issue #9, pull request #44, not merged or tried here yet); this
  fork has only been run on Windows 11.
- Tests that fail on this machine, before and after this update:
  `list::tests::lists_are_cut_at_waits_that_follow_work` in `victory-gpu`
  and five `xmem` tests in `victory-hle` (issues #2 and #8).
- `crates/victory-shader/src/emit/lower.rs` is larger than the size limit of
  `cargo xtask policy`; it is source code, not an asset.
- Many changes are specific to this title and this GPU, and some are marked
  `shortcut:` in the code where they approximate what the console does.

### Credits

- **[VIctory](https://github.com/Marvisak/VIctory)** by Marvisak and its
  contributors is the base of everything here. Licensed GPL-3.0-or-later; so
  is this fork. Upstream's history and the authors of the pull requests
  carried here are kept in the commit history.
- Pull requests merged into this fork, read line by line and run in the
  world before merging: #45 (pgm1207, sent by Arvi23), #18 (PikPakPik),
  #96 (Key-rs), and #24, #25, #27, #28, #29, #30, #33, #34 (romainhedouin).
  About ninety others are still to be read, the larger speed changes
  first; thank you for them, for the test reports, and for the advice to
  take a PIX timing capture, which found more in an hour than a day of
  our own counters.
- [fxceless/victory-fork](https://github.com/fxceless/victory-fork) and
  [myokex/victory-amd](https://github.com/myokex/victory-amd) were read for
  comparison; no code of theirs is in this fork.
- [XCL](https://github.com/ivall/xcl) by ivall: its README was read; no code
  of it is here.
- This fork's changes were developed with
  [Claude Code](https://claude.com/claude-code) and Gemini (Antigravity).

---

## From upstream's README

What follows is taken from upstream VIctory's own README: what the project
is, how to build it, its commands and its debugging switches. They apply to
this fork too. Upstream's status section is left out, because it describes
upstream's state and upstream's test machine (an RX 6700 XT), not this fork
or the machine above: read it
[in upstream's repository](https://github.com/Marvisak/VIctory#readme).

# VIctory

Runs Grand Theft Auto VI (Xbox Series X|S) natively on Windows, from files
the user supplies.

The title's x86-64 code runs unchanged inside our process; VIctory supplies
the platform underneath it and converts the title's data, ahead of time where
it can and on first use where it must (shaders). See
[docs/architecture.md](docs/architecture.md).

## Getting started

Requirements: Windows 10/11 x64, a CPU with AVX2, a Direct3D 12 GPU with
shader model 6.6 (and mesh shaders for the world), Rust (pinned in
`rust-toolchain.toml`).

The title also needs several GiB of available Windows commit at startup.
Check **Committed** under **Task Manager → Performance → Memory**. If
`crashes.log` reports Windows error 1455, close other applications or increase
the Windows paging file size, then retry.

```powershell
cargo xtask install-hooks                # asset-policy check on every commit
copy victory.example.toml victory.toml   # then set your paths (outside the repo)
cargo test --workspace                   # needs no game data
cargo run -p victory -- config           # check your paths
```

Run the title:

```powershell
cargo build --release -p victory
target\release\victory.exe run <game dir>\<the title's exe> --execute
```

The window caption shows the framerate. Saves, settings and `crashes.log`
are kept under the data folder (default `%LOCALAPPDATA%\victory\data`), derived
data under the cache folder.

Input: XInput pads. A DualSense or DualSense Edge (USB or Bluetooth) is read
over HID as well and plays as the first pad when no XInput pad answers. With
no pad connected the keyboard is a pad while the title's window has focus:

| Keys | Pad |
|------|-----|
| W A S D / I J K L | left / right stick |
| arrows | D-pad |
| Enter, O | A, B |
| Backspace, X, Y | B, X, Y |
| Q / E, Z / C | shoulders, triggers |
| F / H | stick clicks |
| Esc, Tab | Menu, View |

## Commands

```
victory inspect <exe|dll> [--imports] [--exports]
victory census [paths...] [--missing] [--strict]
victory lib-exports <import.lib> [--list]
victory shader-info [paths...] [--verbose] [--disasm]
victory translate [paths...] [--validate] [--pipelines] [--list] [--jobs N]
victory run <exe> [--execute] [--unimplemented trap|zero] [--strict]
            [--console series-x|series-s] [-- <title arguments>]
victory config
```

Logging: `VICTORY_LOG=victory_loader=trace,info` (a release build logs
info and above).

## Debugging

A release build has no debugging aids. Build them in with

```powershell
cargo build --profile diag -p victory --features diagnostics   # target\diag\victory.exe
```

| Variable | Effect |
|----------|--------|
| `VICTORY_LOG=<target>=debug,...` | debug and trace output |
| `VICTORY_STACKS=20,60` | every thread's stack at those seconds |
| `VICTORY_WATCH=<rva>,...` | logs a title u32 when it changes |
| `VICTORY_KEYS=30:Enter,35:X` | presses keys at those seconds, focus or not |
| `VICTORY_CRASH_BREAKPOINTS=1` | appends first-chance breakpoints to `crashes.log`, including ones a handler may recover from |
| `VICTORY_CRASH_SAVE=<rva>:<len>,...` | saves title memory to the cache folder on a crash |
| `VICTORY_CAPTURE=<dir>` | saves presented frames (powers of two, or `VICTORY_CAPTURE_FRAMES=<list>`) |
| `VICTORY_DUMP_TARGETS=1` | with the two above, saves every render target of those frames |
| `VICTORY_D3D12_DEBUG=1` | host debug layer |
| `VICTORY_D3D12_GBV=1` | with the above, GPU-based validation (bad descriptor use reported, not faulted; slow) |
| `VICTORY_D3D12_DRED=1` | on a GPU failure, the allocation hit and the commands in flight |
| `VICTORY_SKIP_PIPELINES=<hash>,...` | omit draws and dispatches, including indirect ones, whose pipeline contains a listed 16-digit shader hash |
| `VICTORY_GPU_TIMING=1` | with the above, each list of a submission run and timed on its own; slow lists logged with their slowest commands |
| `VICTORY_D3D12_WARP=1` | host device on the software adapter (slow; cannot reset the driver) |
| `VICTORY_SHADER_LOOP_LIMIT=<n>` | translated shader loops stop after `n` iterations per lane instead of 2^20 (own shader cache entries); if a lower `n` makes world frames much faster, loops hitting the limit are what makes them slow |
| `VICTORY_AUDIO_CAPTURE=<file.wav>` | records what the title plays (our process only) |
| `VICTORY_XMA_DUMP=<dir>` | saves the first 32 XMA voices' context and input |

Every build appends unhandled exceptions, panics, and host GPU failures to
`crashes.log` in the title's data folder.

For a startup breakpoint (`0x80000003`), run the diagnostics build with
`VICTORY_CRASH_BREAKPOINTS=1`. Keep the console output along with the new
`crashes.log` entries. A host DLL refusal includes the caller stack in the
console output. The refusal is expected for DLLs outside the host policy,
including `rpcrt4.dll`.

On Series 1.0.2.1, a missing `appdata0.rpf` reproduced the breakpoint at
`+0x2237178` before the first window. Restore the archive from the same
package beside the title executable. `run --execute` checks that it can
read the RPF9 header before starting this build.

To compare hardware and software rendering, repeat with
`VICTORY_D3D12_WARP=1` and check the console for
`host device on the software adapter (WARP)` to confirm the WARP device was
created. Compare the exception's module and offset, stack frames, and
preceding messages across the two runs.

## License

GPL-3.0-or-later. See [LICENSE](LICENSE).
