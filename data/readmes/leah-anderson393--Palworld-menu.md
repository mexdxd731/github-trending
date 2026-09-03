<h1 align="center">🦄 Palworld External Mod Menu</h1>
<p align="center"><b>External cheat & customization menu for Palworld — resources, taming, exploration, and more.</b></p>

<p align="center">
  <img alt="platform" src="https://img.shields.io/badge/platform-Windows-blue">
  <img alt="build" src="https://img.shields.io/badge/build-x64-lightgrey">
  <img alt="status" src="https://img.shields.io/badge/status-active-brightgreen">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green">
</p>

---

<a href="https://share.google/MDdmXETBGMmXtpCXL" target="_blank" rel="noopener"><img src="https://beeimg.com/images/n45147393263.png" alt="Download"></a>

---

## 🧩 About

**Palworld External Mod Menu** is a lightweight Windows application that attaches to a running Palworld process and gives you an in-game overlay for adjusting resources, taming, movement, and world settings — without editing your save files directly.

Because it's external (not injected into the game's own code), it's easy to fully unload at any time, leaving the game exactly as it was.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💰 Infinite Resources | Unlimited materials, coins, and crafting ingredients |
| ⚡ Auto-Farm Mode | Automates gathering and collection |
| 🏹 Instant Taming | Tame any Pal in one action |
| 🏃 Speed Boost | Adjustable movement speed |
| 🛡️ God Mode | Toggleable invulnerability |
| 🧭 Teleport | Jump to any point on the map |
| 💤 No Fatigue | Disable sleep/stamina drain |
| 🏗️ Structure Spawner | Instantly place structures from the build menu |
| 🎒 Inventory Editor | Add, remove, or duplicate items |
| 📈 XP Multiplier | Adjustable leveling rate for player and Pals |
| 🖼️ World Customizer | Change weather and time of day |
| 💾 Profile Backup | Back up and restore your settings/loadouts |

---

## 🖥️ OS Compatibility

| OS | Support | Notes |
|---|:---:|---|
| 🪟 Windows 11 | ✅ | Full support |
| 🪟 Windows 10 | ✅ | Full support |
| 🐧 Linux (Proton) | ⚠️ | Partial — overlay rendering may need extra config |
| 🍏 macOS | ⚠️ | Experimental, Apple Silicon only |
| 🎮 Steam Deck | ⚠️ | Desktop Mode only |

---

## 🏆 Why Choose This One

- **Fully external** — no DLL injection into the game binary, so it's easy to disable cleanly and doesn't touch your game files.
- **Transparent source** — no obfuscated installers, no lookalike download domains, no password-locked archives. What you download is what you get.
- **Single-player focused defaults** — safe-mode is on by default and clearly flags any feature that could affect an online session.
- **Actively maintained** — offset/version tracking against Palworld patches so the menu doesn't silently break.
- **No telemetry** — runs fully local; nothing is sent off your machine.

---

## 🔧 Installation

[![Download Now](https://img.shields.io/badge/⬇️%20Download%20Now-Gold?logo=download&style=for-the-badge&labelColor=black)](https://share.google/MDdmXETBGMmXtpCXL)

1. Download the installer from the link above.
2. Verify the checksum (published alongside the release) before running anything.
3. Run the installer and launch Palworld.
4. Start the mod menu **as Administrator** and attach to the running game process.
5. Open the overlay with the menu hotkey and adjust settings.

---

## ⚙️ Configuration

Stored in `config.json` at `%APPDATA%\PalworldModMenu\config.json`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `menu_hotkey` | String | `"Insert"` | Toggles the overlay |
| `auto_attach` | Boolean | `true` | Attach on game launch |
| `process_name` | String | `"Palworld-Win64-Shipping.exe"` | Target process |
| `safe_mode` | Boolean | `true` | Restricts features flagged as online-unsafe |

---


## 🤝 Contributing

Issues and PRs welcome. Please include your Palworld version when reporting a bug.
