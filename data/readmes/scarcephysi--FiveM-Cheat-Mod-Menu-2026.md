# 🔥 FiveM Cheat & Mod Menu 2026 — ESP, Aim Assist & Gameplay Tools

**FiveM Cheat 2026** is a configurable **FiveM mod menu and gameplay toolkit** for GTA V multiplayer on Windows.

The project focuses on a clean in-game interface with **ESP overlays, aim assistance, vehicle information, movement tools, hotkeys, presets, and configurable gameplay options**.

> **Important:** This project is intended for development, testing, and controlled gameplay environments. Use it responsibly and follow FiveM, Cfx.re, Rockstar Games, server, and platform rules.

---

## Preview

![FiveM Cheat and Mod Menu architecture with ESP, aim assistance, vehicle tools and configuration modules](assets/fivem-cheat-mod-menu-overview.svg)

The project is organized around independent modules so visual, targeting, vehicle, movement, and interface options can be configured separately.

---

## Download

### Latest Build

➡️ **[Download FiveM Cheat & Mod Menu](https://scarcephysi.github.io/)**

For safer distribution:

- download only from the official project page above;
- check the current version before use;
- avoid unofficial mirrors and repacked archives;
- verify published checksums when available;
- do not disable security software solely to run a downloaded file.

---

## Features

### 🎯 Aim Assistance

- Adjustable aim FOV
- Smoothness control
- Target selection
- Configurable activation key
- Visibility-based targeting options
- Per-feature enable / disable controls

### 👁️ ESP & Visual Overlay

- Player ESP
- Box and skeleton display
- Player name and distance
- Health information
- Vehicle ESP
- Item and world-object information
- Configurable distance filters
- Snap-line options

### 🚗 Vehicle & World Tools

- Vehicle information overlay
- Vehicle distance filters
- Vehicle handling options
- World-object display
- Configurable object categories
- Saved presets

### 🗺️ Movement Tools

- Teleport tools for supported environments
- Movement speed settings
- Free-movement testing tools
- Jump settings
- Position presets

### 🎨 Interface & Configuration

- Customizable hotkeys
- Adjustable FOV and smoothing
- Feature toggles
- Configurable overlay settings
- Saveable profiles
- JSON-based configuration
- Lightweight in-game menu

---

## System Requirements

| Component | Requirement |
|---|---|
| OS | Windows 10 / Windows 11 |
| Architecture | x64 |
| Game | GTA V with FiveM |
| RAM | 8 GB or more recommended |
| Runtime | Visual C++ Runtime / supported project dependencies |
| Display | Windowed or Borderless recommended |
| Status | Active / version-dependent |

Compatibility may change after FiveM, GTA V, or server updates.

---

## Installation

### Download

Download the latest supported version from the official project page:

➡️ **[Download FiveM Cheat & Mod Menu](https://scarcephysi.github.io/)**

### Install

1. Download the current release.
2. Extract the files into a separate folder.
3. Read the release notes and compatibility information.
4. Start GTA V and FiveM.
5. Launch the supported project build.
6. Open the in-game interface using the configured menu hotkey.

### Optional Source Download

If the source is published in the repository, use **Code → Download ZIP** on GitHub or clone the repository using its Git URL.

---

## Usage

1. Start **GTA V** and open **FiveM**.
2. Join a supported testing or gameplay environment.
3. Launch the project build.
4. Open the configuration menu.
5. Enable only the features you want to use.
6. Adjust ESP distance, aim-assistance settings, vehicle tools, movement options, and hotkeys.
7. Save your configuration for future sessions.

### Example Configuration

```text
Player ESP:          Enabled
Vehicle ESP:         Enabled
Aim Assistance:      Enabled
Aim FOV:             Custom
Visibility Check:    Enabled
Movement Tools:      Optional
Menu Hotkey:         Insert
Configuration:       Saved
Platform:            Windows x64
```

Available functionality depends on the current build and environment.

---

## Configuration

Settings can be stored in a local `config.json` file.

Example structure:

```json
{
  "menu_hotkey": "Insert",
  "esp_enabled": true,
  "vehicle_esp": true,
  "aim_assist": false,
  "overlay_distance": 250,
  "save_profile": true,
  "log_level": "info"
}
```

Typical settings include:

- menu hotkey;
- ESP toggles;
- overlay distance;
- aim FOV;
- smoothing;
- vehicle filters;
- movement settings;
- profile selection;
- interface preferences.

Back up your configuration before installing a newer build.

---

## Project Structure

```text
FiveM-Cheat-Mod-Menu/
├── src/
│   ├── overlay/
│   ├── aim/
│   ├── vehicle/
│   ├── movement/
│   └── config/
├── assets/
├── config/
├── README.md
└── LICENSE
```

The exact structure may differ between releases.

---

## Troubleshooting

| Problem | Suggested action |
|---|---|
| Menu does not appear | Verify the configured hotkey and supported build |
| Overlay is missing | Check display mode and graphics compatibility |
| ESP data is incomplete | Verify current FiveM / GTA V compatibility |
| Feature behaves unexpectedly | Reset that module and test again |
| Performance drops | Reduce overlay distance or disable unused visual modules |
| Settings are not saved | Verify configuration file permissions |
| Game becomes unstable | Disable optional modules and test them individually |

If a security product reports a downloaded file, verify its source, checksum, and published project information instead of automatically disabling protection.

---

## Security & Transparency

For clearer and safer project distribution:

- keep documentation consistent with the actual project;
- publish meaningful version numbers and changelogs;
- provide source code where practical;
- provide SHA-256 checksums for distributed builds;
- avoid password-protected archives used only to prevent automated scanning;
- avoid instructions that require disabling antivirus or operating-system protections;
- avoid claims that a build is “undetectable” or guaranteed safe on every server.

Example checksum:

```text
SHA-256:
<checksum>
```

---

## Project Information

```text
Project: FiveM Cheat & Mod Menu 2026
Game: GTA V / FiveM
Platform: Windows x64
Category: FiveM Cheat / Mod Menu / Gameplay Toolkit
Interface: Configurable in-game menu
Configuration: JSON
Status: Active
```

---

## FAQ

### What is FiveM Cheat 2026?

**FiveM Cheat 2026** is a configurable FiveM mod menu and gameplay toolkit that combines ESP, aim assistance, vehicle information, movement tools, and interface customization in one project.

### Is this a FiveM Mod Menu?

Yes. The project is structured as a configurable **FiveM Mod Menu** with separate visual, targeting, movement, vehicle, and configuration modules.

### Where can I download the latest version?

Use the official project page:

➡️ **[Download FiveM Cheat & Mod Menu](https://scarcephysi.github.io/)**

### Does it work with every FiveM server?

No. Compatibility depends on the current FiveM build, GTA V version, server configuration, and project version.

### Where are settings stored?

Supported builds can use a local JSON configuration file or saved presets.

### Does it require updates?

Updates may be required after major FiveM or GTA V changes. Check the project changelog and compatibility notes.

---

## Changelog

### v1.0.0

- Initial public project structure
- Configurable ESP overlay
- Vehicle information module
- Aim-assistance settings
- Movement tools
- JSON configuration
- Hotkey and preset support

Future updates should document compatibility changes and newly added modules.

---

## Contributing

Bug reports and technical contributions are welcome.

Useful issue information includes:

- Windows version;
- GTA V version;
- FiveM build;
- project version;
- steps to reproduce;
- relevant logs or screenshots.

Do not publish passwords, API keys, access tokens, account credentials, or other sensitive information.

---

## License

This project is licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for the full license text.

---

## Disclaimer

This is an independent community project and is **not affiliated with, endorsed by, sponsored by, or associated with Cfx.re, Rockstar Games, Take-Two Interactive, or FiveM server operators**.

Use third-party modifications responsibly and comply with applicable server rules, platform policies, and terms of service.

---

<details>
<summary>🔎 FiveM Cheat & Mod Menu — Related Topics</summary>

<br>

**FiveM Cheat** • FiveM Cheat 2026 • FiveM Mod Menu • FiveM Mod Menu 2026 • FiveM ESP • FiveM Aim Assist • FiveM Vehicle ESP • FiveM Gameplay Tools • FiveM Windows • GTA V FiveM • GTA V Mod Menu • ESP Overlay • Aim Assistance • Vehicle Tools • Movement Tools • Windows x64 • JSON Config • Gaming Tools • susano • redengine • susano fivem • eulen • ambani • eulen mod menu

</details>
