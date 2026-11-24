# SeedSwap

SeedSwap lets you play Switch 1 games on a Switch 2 by running them in place of Seedsow Lullaby or
another installed Switch 1 game.
- It needs firmware 23.0.1 with kaiHEN.
- You pick and switch games on the console.

![SeedSwap's Library](images/library.png)

| | |
|---|---|
| ![Switching to another game](images/switch-confirm.png) | ![Picking a host](images/hosts.png) |
| ![Converting a dump on the console](images/convert.png) | ![Choosing the play user](images/play-user.png) |
| ![Saves and backups](images/saves.png) | ![Setting up an installed game as a host](images/add-host.png) |

These screenshots come from SeedSwap 0.12.0's PC preview, which runs the real UI. The users and user
IDs in them are made up.

This repository builds two things:
- **The Seedsow save.** It holds alula's launcher, the seedsow-semi-untethered exploit chain, and
  SeedSwap's A/B launcher entries.
- **The SD card files.** These are SeedSwap itself, kaiHEN's loader stage, and the install image.

## Build

1. **Get SeedSwap (`seedswap.nro`).** GitHub Actions builds it from `seedswap/` on every push:
   - Download the `seedswap-nro` artifact of a run.
   - Or, when the repo has a `v*` tag, get it from that tag's release.
   - Or build it yourself (see `seedswap/README.md`).
2. **Build the rest** (needs Python 3.8 or newer):

       python3 build.py --nro seedswap.nro

   This writes:
   - `out/save/`: the Seedsow save;
   - `out/seedsow-seedswap-save.zip`: the same save as one zip;
   - `out/sd/`: the SD card files.

   It also downloads three parts at fixed commits and checks every file against `SHA256SUMS.txt`:
   - alula's launcher files;
   - the unchanged seedsow-semi-untethered modules;
   - kurumuz's ns2jb RO helper.

   The repository doesn't include these parts: alula's and kurumuz's repositories have no licence
   file, so `build.py` downloads all three from their sources.

The CI run does the same steps and checks the result. Its SeedSwap must match the tested build byte
for byte. It uploads only `seedswap.nro`.

## Install (firmware 23.0.1, kaiHEN on the SD card)

**[INSTALL.md](INSTALL.md) has the full step-by-step guide.** It also covers updating an existing
seedsow-semi-untethered save over the network (`upload_save.py`).

> **Use only your own games and keys.** Only play dumps of games you own, made yourself, and only use
> the `prod.keys` from your own console. This repository has no games or keys; don't download them
> from anywhere.

In short:

1. Copy `out/sd/` to the root of the SD card.
2. Put the save on a spare user's Seedsow save with ns2jb + ns2-savekit (back up, then replace from
   `out/save/`).
3. Restart. Start Seedsow on that user, and press A in the launcher.
4. Open SeedSwap. It finds the user with the exploit save and never uses that user.
5. In the Saves tab, press Y and pick the user who plays. Restart and run the launcher (A) again.
6. In the Library, press - and pick a host: Seedsow, or any installed Switch 1 game. Then switch games.

## Launcher buttons

| Button | What it does |
|---|---|
| A | Runs kaiHEN, with SeedSwap's loader first. |
| B | Same as A, with the newest seedsow-semi-untethered scan and wave stages (e5c14e5). Where e5c14e5 ends the run after an uneven race wave, B retries like A and logs it. Then B installs SeedSwap from the save to `SD:/switch`, unless the SD copy is the same or newer. |
| Y | alula's HTTP server (port 8080). |
| Hold - first | Runs the previous A or B. |

## What is here

| Folder | Contents |
|---|---|
| `upload_save.py` | Updates an existing seedsow-semi-untethered save over the launcher's HTTP server (see INSTALL.md). |
| `save/` | Our files for the Seedsow save: the kaiHEN stage that starts the loader (`s2_kh_ro.lua`), the A/B menu, the A and B entries, their hardened copies, and B's two newer modules. |
| `sd/` | The loader stage (`kaihen/s2_ml.lua`), `ml_image.lua`, `tpl.lua`, and the install image. The image has Seedsow plus 9 spare host slots. Its save guard is on nobody until you pick the play user. |
| `seedswap/` | SeedSwap's source. |
| `loader/` | Our changes to ns2jb-modloader, which the install image is built from, and the image tools. |
| `licenses/` | Licence texts. |

## Licences

- **GPL-2.0 (`LICENSE`):** everything in this repository except the third-party parts below:
  - `seedswap/`: SeedSwap's source, `GPL-2.0-only` in each file;
  - `save/`, `sd/` and `loader/`: these derive from seedsow-semi-untethered and
    SebaaMG/ns2jb-modloader, which are both GPL-2.0.
- **Third-party parts:**
  - seedsow-semi-untethered's CivSwitchFS part is MIT (`licenses/CivSwitchFS-MIT.txt`);
  - `seedswap/source/vendor/stb_image.h` is MIT or public domain;
  - `seedswap/source/font_data.c` and `seedswap/assets/fonts/` are the Ubuntu font
    (`licenses/UBUNTU-FONT-LICENCE.txt`).
- **Downloaded files:** these keep their authors' terms.

## Credits

| Who | Project |
|---|---|
| alula | switch-artemis-launcher |
| rushinz | seedsow-semi-untethered |
| ItsNerisma | CivSwitchFS |
| kurumuz | ns2jb |
| SebaaMG | ns2jb-modloader |
| ouncebrew | kaiHEN, libounce, ounce-devkit |
| dougchansan | ns2-savekit |
