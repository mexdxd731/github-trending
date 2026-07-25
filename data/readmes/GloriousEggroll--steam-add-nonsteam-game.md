# Steam Add Non-Steam Game

`steam-add-nonsteam-game` adds local applications to the currently running
Steam client's library from the command line. Steam updates the library
immediately; the script does not edit `shortcuts.vdf` and Steam does not need
to restart.

The script accepts:

- Linux `.desktop` launchers
- Native executables and executable shell scripts
- AppImages
- Windows `.exe` files
- Literal launch targets and application URIs such as `lutris:rungameid/220`

## Requirements

- Steam for Linux
- Python 3.10 or newer

No third-party Python packages are required.

## Install

```bash
install -Dm755 steam-add-nonsteam-game \
  ~/.local/bin/steam-add-nonsteam-game
```

Ensure `~/.local/bin` is in your `PATH`, then keep Steam running while using
the command.

## Usage

Add a desktop launcher:

```bash
steam-add-nonsteam-game \
  ~/.local/share/applications/proton-selector.desktop
```

Add an executable or AppImage:

```bash
steam-add-nonsteam-game ~/Applications/MyGame.AppImage
```

Add a literal application URI:

```bash
steam-add-nonsteam-game 'lutris:rungameid/220'
```

If a supplied target exists on disk, the script resolves and validates it as
a file. If it does not exist, the text is preserved instead of being rejected.
For URI targets, the generated launcher invokes the registered scheme command.
For example, the Lutris target above becomes:

```ini
Exec="lutris" "lutris:rungameid/220"
```

Steam imports the URI as the launch argument rather than mistaking it for a
filesystem path.

Set a custom Steam title:

```bash
steam-add-nonsteam-game --name "Proton Plus" "$(which protonplus)"
```

`-n`, `--name`, and `--title` are equivalent. A custom title can only be used
with one path at a time.

Add several programs at once:

```bash
steam-add-nonsteam-game app-one.desktop app-two.desktop ~/bin/my-game
```

Preview a request without changing the Steam library:

```bash
steam-add-nonsteam-game --dry-run /path/to/program
```

The command refuses to add an exact path already present in any local Steam
user's `shortcuts.vdf`. To intentionally create a duplicate:

```bash
steam-add-nonsteam-game --allow-duplicate /path/to/program
```

## How it works

The running client exposes the URL handler
`steam://addnonsteamgame/<encoded-path>`. The script validates and resolves
the supplied path, creates Steam's `/tmp/addnonsteamgamefile` sentinel, and
passes the encoded URL to the `steam` launcher. Steam assigns the shortcut's
AppID and writes its own configuration safely.

When `--name` or a literal target is used, the script creates a persistent launcher under
`~/.local/share/applications/steam-add-nonsteam-game/`. Its `Name` is the
requested Steam title and its `Exec` points to the original program. This is
necessary because Steam's add URL accepts a path but has no title parameter.

Some SteamOS-derived distributions already ship a more limited shell helper
named `steamos-add-to-steam` that uses the same mechanism.
