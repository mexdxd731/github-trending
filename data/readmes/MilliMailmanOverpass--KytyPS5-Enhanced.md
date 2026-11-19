<div align="center">

<img src="banner_1.svg" alt="KytyPS5-Enhanced" width="100%">

</div>

<br>

<div align="center">

**An enhanced KytyPS5 build with a launcher, shader cache and per-game profiles, tuned for a comfortable Grand Theft Auto VI experience on PC.**

<br>

<a href="../../releases/latest"><img src="https://img.shields.io/badge/%E2%AC%87%20DOWNLOAD-LATEST%20BUILD-5c7e10?style=for-the-badge&labelColor=1b2838" alt="Download"></a>
<a href="#-compatibility"><img src="https://img.shields.io/badge/%E2%9C%85%20COMPATIBILITY-CHECK%20STATUS-66c0f4?style=for-the-badge&labelColor=1b2838" alt="Compatibility"></a>
<a href="https://discord.com/invite/UNrkMqGaBg"><img src="https://img.shields.io/badge/DISCORD-JOIN%20COMMUNITY-5865F2?style=for-the-badge&labelColor=1b2838&logo=discord&logoColor=white" alt="Discord"></a>

</div>

## 📖 About this software

**KytyPS5-Enhanced** takes the open-source [KytyPS5](https://github.com/KytyPS5/KytyPS5) emulator,
built on [Kyty](https://github.com/InoriRus/Kyty) by InoriRus, and adds the things players actually
need: a launcher, ready-made presets, a persistent shader cache, frame pacing, a live performance
overlay and one-click bug reports.

Our first target is **Grand Theft Auto VI**. Every change is profiled on a real GTA 6 workload, and
generic fixes are kept in separate commits so they can be sent back to upstream KytyPS5.

## ⭐ Key features

<table>
<tr>
<td width="50%" valign="top">

#### 🎮 Per-game profiles
Tested settings are applied automatically when GTA 6 is detected. No config editing needed.

</td>
<td width="50%" valign="top">

#### ⚡ Persistent shader cache
Compiled pipelines are stored on disk and reused, which greatly reduces stutter after the first run.

</td>
</tr>
<tr>
<td valign="top">

#### 🧵 Async shader compilation
Shaders compile on worker threads, so the render thread is not blocked.

</td>
<td valign="top">

#### 🕰️ Frame pacing
Smoother frame delivery with a built-in limiter: 30 / 60 / custom.

</td>
</tr>
<tr>
<td valign="top">

#### 🖼️ Resolution scaling
Internal resolution multiplier and FSR-style spatial upscaling, with four presets.

</td>
<td valign="top">

#### 📊 Live overlay
FPS, frametime graph, CPU/GPU load and VRAM usage in-game. Toggle with `F1`.

</td>
</tr>
<tr>
<td valign="top">

#### 🕹️ Controller support
XInput and DualSense profiles, a remapping UI and adjustable dead zones.

</td>
<td valign="top">

#### 🧾 One-click bug report
Logs, hardware info, driver version and settings packed into a single archive.

</td>
</tr>
</table>

## 🆕 What's new in v0.1.0
- First public build with the launcher, setup wizard and four performance presets
- Persistent shader cache with async compilation
- Frame pacing and limiter, live performance overlay (`F1`)
- XInput and DualSense profiles
- Fixes for flickering geometry and a startup crash with a read-only cache folder

Full notes: [Releases](../../releases).

## ✅ Compatibility

| Status | Meaning |
|---|---|
| 🟢 **Playable** | Runs through progression with minor issues |
| 🟡 **In-game** | Reaches gameplay, with notable glitches or slowdowns |
| 🟠 **Menu** | Reaches the main menu, gameplay unreliable |
| 🔴 **Boots** | Shows graphics, then crashes or hangs |
| ⚫ **Nothing** | Does not start |

| Game | Game version | Build | Status | Notes |
|---|---|---|---|---|
| Grand Theft Auto VI | [1.00] | v0.1.0 | 🟡 **In-game** | [Missing effects in some scenes, occasional hitching, audio desync in cutscenes] |

Tested on **[Windows 11 · Ryzen 7 7800X3D · RTX 4070 · 32 GB · driver 5xx.xx]**.
Add your result via the [compatibility form](../../issues/new?template=compat_report.yml).

## 💻 System requirements

<table>
<tr>
<th width="50%" align="left">MINIMUM</th>
<th width="50%" align="left">RECOMMENDED</th>
</tr>
<tr>
<td valign="top">

**OS:** Windows 10 64-bit (22H2)<br>
**Processor:** 6 cores, AVX2<br>
**Memory:** 16 GB RAM<br>
**Graphics:** Vulkan 1.3, 8 GB VRAM<br>
**Storage:** SSD, [XX] GB available<br>
**Additional:** Latest GPU driver

</td>
<td valign="top">

**OS:** Windows 11 64-bit<br>
**Processor:** 8+ cores, strong single-thread<br>
**Memory:** 32 GB RAM<br>
**Graphics:** Vulkan 1.3, 12 GB+ VRAM<br>
**Storage:** NVMe SSD, [XX] GB available<br>
**Additional:** Latest GPU driver

</td>
</tr>
</table>

> [!TIP]
> Use an SSD. The game streams a lot of data and the shader cache is written continuously during the first hours.

## 🎛️ Presets

| Preset | Resolution | Upscaling | Shaders | Made for |
|---|:---:|:---:|:---:|---|
| **Quality** | 1.5× | Off | Async | High-end GPUs |
| **Balanced** *(default)* | 1.0× | Off | Async | Mid-range GPUs |
| **Performance** | 0.75× | FSR | Async | Low-end GPUs |
| **Low** | 0.5× | FSR | Async | Integrated GPUs |

## 🚀 Get started

1. **Download** `KytyPS5-Enhanced-vX.Y.Z-win64.zip` from [Releases](../../releases/latest).
2. **Extract** to a short path without special characters, e.g. `C:\Emulators\KytyPS5-Enhanced`.
3. **Update your GPU driver** (Vulkan 1.3 required).
4. **Run** `KytyPS5-Enhanced.exe`.
5. Follow the **setup wizard**: your game folder, a preset, a controller profile.
6. Pick **Grand Theft Auto VI** in the library and press **Play**.

The first launch is slower while shaders compile and are cached. After that it gets smoother.

## ⚙️ Configuration

```text
KytyPS5-Enhanced/
├── KytyPS5-Enhanced.exe
├── config/
│   ├── global.toml           # defaults
│   └── games/gta6.toml       # per-game overrides
├── cache/shaders/            # persistent shader cache
└── logs/
```

`config/games/gta6.toml` <!-- SAMPLE -->

```toml
[graphics]
preset           = "balanced"
resolution_scale = 1.0
upscaler         = "off"      # off | fsr
frame_limit      = 60         # 0 = unlimited
vsync            = false

[shaders]
async_compile    = true
cache_enabled    = true

[audio]
latency_ms       = 80

[input]
profile          = "xinput"   # xinput | dualsense
deadzone         = 0.12

[debug]
overlay          = true
log_level        = "info"     # error | warn | info | debug
```

**Default hotkeys**

| Action | Keyboard | Controller |
|---|---|---|
| Toggle overlay | `F1` | `Back + Y` |
| Screenshot | `F12` | `Back + X` |
| Pause emulation | `F5` | `Back + Start` |
| Fullscreen | `Alt + Enter` | n/a |
| Quit | `Alt + F4` | `Back + Start` (hold) |

## 🛠️ Troubleshooting

<details>
<summary><b>The game does not start or crashes immediately</b></summary>

- Update your GPU driver and make sure it supports Vulkan 1.3.
- Check that the game folder is complete.
- Delete `cache/` and try again.
- Set `log_level = "debug"` and attach `logs/latest.log` to an issue.

</details>

<details>
<summary><b>Heavy stuttering</b></summary>

- The first hours are the slowest while the shader cache builds.
- Enable `async_compile` and keep the cache on an SSD.
- Close overlays from other software (recording, RGB, monitoring).
- Try the **Performance** preset.

</details>

<details>
<summary><b>Black screen or missing graphics</b></summary>

- Select the correct Vulkan device in settings if you have several GPUs.
- Disable third-party Vulkan layers (some overlays inject them).
- Attach a log and your GPU model to an issue.

</details>

<details>
<summary><b>No sound or crackling audio</b></summary>

- Increase `latency_ms` (try 120).
- Make sure no other app holds the audio device in exclusive mode.

</details>

## ❓ FAQ

<details>
<summary><b>Can I play GTA 6 on PC with this?</b></summary>

Support is experimental. The [compatibility section](#-compatibility) shows the current status of the
latest build, and we only list results that were actually tested.

</details>

<details>
<summary><b>Does the project include the game?</b></summary>

No. No games, firmware or keys are included, provided or linked.

</details>

<details>
<summary><b>How is this different from upstream KytyPS5?</b></summary>

Upstream targets broad PS5 compatibility. This build prioritises one title and adds a launcher,
presets, shader cache, overlay and reporting tools. Generic fixes are kept separate so they can go upstream.

</details>

<details>
<summary><b>Will other PS5 games work?</b></summary>

Maybe, since the core is shared, but only GTA 6 is actively tested.

</details>

<details>
<summary><b>Linux or macOS?</b></summary>

Windows is the primary target. Linux is experimental, macOS is not supported yet.

</details>

## 🗺️ Coming soon

- [x] Launcher, presets and setup wizard
- [x] Persistent shader cache and async compilation
- [x] Performance overlay
- [ ] Stable boot to the main menu on all tested GPUs
- [ ] Stable in-game performance on mid-range hardware
- [ ] Remaining graphical artefacts
- [ ] Audio sync in cutscenes
- [ ] Linux parity
- [ ] Send generic fixes upstream

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-change`.
2. Keep generic emulator fixes in **separate commits** from game-specific changes.
3. Add or update tests where it makes sense.
4. Open a PR describing **what** changed and **how you tested it**.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 🐞 Reporting issues

Include: build version or commit, game version, CPU / GPU / driver, OS, your `config/`,
`logs/latest.log`, steps to reproduce, and a screenshot or short video if relevant. The launcher's
**Create bug report** button collects most of this automatically.

> [!IMPORTANT]
> Do not post links to game files, keys or firmware. Such posts will be deleted.

## 🙏 Credits

- **[InoriRus](https://github.com/InoriRus/Kyty)**: the original Kyty emulator
- **[KytyPS5 contributors](https://github.com/KytyPS5/KytyPS5)**: the PS5 emulator this build is based on
- Everyone who tests builds and sends detailed reports

## 📄 License

Licensed under **GPL-2.0**, the same as upstream KytyPS5. See [LICENSE](LICENSE).

"PlayStation" and "PS5" are trademarks of Sony Interactive Entertainment. "Grand Theft Auto" is a
trademark of Take-Two Interactive Software, Inc. All trademarks belong to their respective owners.
