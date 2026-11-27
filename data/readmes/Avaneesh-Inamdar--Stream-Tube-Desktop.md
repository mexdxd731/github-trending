<p align="center">
  <img src="assets/logo.png" alt="Stream Tube" width="120">
</p>

<h1 align="center">Stream Tube</h1>

<p align="center">
  A native YouTube client for Windows and Linux, written in Rust.<br>
  No browser, no ads, no tracking. SponsorBlock, DeArrow and Return YouTube Dislike built in.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20Linux-0078D6" alt="Windows and Linux">
  <img src="https://img.shields.io/github/v/release/Avaneesh-Inamdar/Stream-Tube-Desktop?include_prereleases&sort=semver&label=release" alt="Latest release">
  <a href="https://github.com/Avaneesh-Inamdar/Stream-Tube-Desktop/releases"><img src="https://img.shields.io/github/downloads/Avaneesh-Inamdar/Stream-Tube-Desktop/total?label=downloads&color=FF0033&cacheSeconds=3600" alt="Total downloads"></a>
  <img src="https://img.shields.io/badge/built%20with-Rust-B7410E" alt="Rust">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT license">
</p>

<p align="center">
  <img src="docs/screenshots/home.png" alt="Home feed" width="900">
</p>

## Why

I wanted YouTube on my desktop without keeping a browser tab open, and without the
ads, autoplaying junk and sponsor reads. The existing options were either Electron
apps that eat a gigabyte of RAM or web frontends that break every other week.
Stream Tube is a single native app: the UI is drawn on the GPU with
[GPUI](https://github.com/zed-industries/zed/tree/main/crates/gpui), and video
goes through libmpv, so it starts fast and scrolls smoothly even with big feeds.

## What it does

**No ads, anywhere**
- No pre-roll, mid-roll or overlay ads: the app plays the video stream directly, so YouTube's ads are never loaded
- No promoted videos, banners or sponsored cards in Home, search or Shorts
- Sponsor reads inside videos are skipped too, with SponsorBlock (below)
- Nothing to install or keep updated: it isn't an ad blocker that YouTube can break, ads simply aren't part of how the app plays video

**Watching**
- Home, Shorts, Subscriptions, Explore categories, channels (including their courses and shows), and playlists
- Search with filters, suggestions, recent searches and more results as you scroll
- A personal Home without an account: "For you" recommends videos related to what you've watched and searched in the app, mixed with new uploads from your subscriptions. Signed in, Home is your own YouTube Home feed
- A *Recently uploaded* chip on Home, like youtube.com's: videos from your Home feed and subscriptions uploaded in the last two weeks, newest first
- Hover a video title in a grid or list to read the full title
- Ctrl+click a link or middle-click a video to open it in a background tab. A video's menu also has *Open in new tab*. Switch with Ctrl+Tab, Ctrl+1…9 or a click. Ctrl+T opens a new tab. Ctrl+W or a middle click on the tab closes it.
- Videos made for kids (YouTube Kids) play and download like any other video
- Old video annotations are back: notes, speech bubbles and clickable links from YouTube's annotation archive, drawn over the video where they used to be (turn them off in *Settings → Player* or from the player's gear menu)
- Arabic, Hebrew and other right-to-left text is shown in the right order
- Shorts follow your account's recommendations when you're signed in, or start from the Shorts you watched last
- Download the current Short from the vertical player's download button
- libmpv player with hardware decoding, codec preference (AV1, VP9 or H.264), 360p up to 4K, enhanced bitrate, speed control (remembered per channel if you want), captions you can style (font, colour, opacity, background and edge, with a live preview), chapters and seek-bar preview thumbnails
- A chapters panel beside the player, like youtube.com: click the chapter name in the player bar (or *View all* under the description) to list every chapter with its thumbnail, follow the one playing, and jump to any of them
- Timestamps in descriptions and comments seek the video and bring the player back into view
- Resumes where you left off, remembers your last quality, autoplays the next video or loops, and plays whole playlists as a queue
- Turn on *Original video titles* in Settings to show the creator's title when opening a video.
- Hover over the video to step through available resolutions or adjust playback speed in 0.5× increments. Click the speed to reset it to 1×.
- The picture-in-picture button opens the draggable in-app miniplayer or a floating window above other apps. Choose the mode in *Settings → Player*. Theater mode and fullscreen are also available, and the app remembers your theater setting.
- Keeps playing when minimized, or pauses and resumes when you come back. On Windows, active video playback keeps the display awake.
- Windows media controls can pause playback, resume it and move through the video queue.
- On Windows, *Settings → General → Minimize to tray* keeps Stream Tube in the notification area when you minimize or close the window. Use the tray icon to reopen or quit the app.
- Start *Cast over LAN* in Settings and open the temporary link on a phone on the same trusted network. If the desktop has more than one local address, choose the one on your phone's network. Paste a YouTube video link to play it on the desktop.
- Turn on *Independent tab playback* and restart Stream Tube to play up to three tabs at once. Each tab keeps its own queue. Background tabs play audio, and a tab with a floating picture-in-picture window keeps showing video there.
- Live streams with live chat (Top chat or every message), and chatting when signed in
- Shorts in a vertical player that moves to the next one by itself, or open them in the regular player. Shorts comments open their replies as threads too
- Hold Space or press and hold the main video to play at 2x
- Press `+` / `-` or `>` / `<` to move to the next or previous 0.25x playback speed step
- Hover previews: rest the pointer on a thumbnail and it plays inside it, muted, with a seek bar to skip around
- Most replayed graph with "jump ahead", ambient glow around the player (on or off from the player's gear menu), force original audio instead of auto-dubbing
- Aspect ratio controls for ultrawide screens, like the Ultrawidify extension: *Auto* finds a film's black bars and crops them away so it fills a 21:9 or 32:9 monitor, or pick 21:9, 18:9 or 32:9, *Zoom to fill* or *Stretch*. Choose it from the player's gear menu or *Settings → Player*, or press *Z* to cycle
- A screenshot button in the player bar
- Step one frame at a time with `,` or `.` while paused, or with Previous frame and Next frame in the player's right-click menu
- Comments sorted by Top, Timed or Newest. *Timed* works like youtube.com: comments that mention a moment of the video appear as playback reaches it
- Comments show animated GIFs, stickers and channel emojis, and replies are drawn as threads, with answers to a reply nested under it. Long comments and channel descriptions are shortened with *Read more* / *Show more*
- Keyboard shortcuts for playback, seek, volume, captions, fullscreen, theater, picture-in-picture and the queue. Z changes the aspect ratio and Ctrl+←/→ changes chapters. Playback letter keys also work with the Russian layout.
- Arrow keys briefly show the volume or the number of seconds skipped over the video
- "Open in external player" with no setup: it uses VLC or mpv if one is installed, otherwise your default video player, and continues from where you were
- Right-click the video for loop, copy link (optionally at the current time), screenshot and **Stats for nerds**: resolution, codecs, dropped frames, hardware decoding, bitrate, buffer health and connection speed, updated live (also *Shift+I*)

**Saves data**
- Audio only mode fetches just the audio stream, so podcasts, music and talks use a fraction of the data
- Pick a lower default quality, and turn off hover previews or seek-bar thumbnails if you're on a metered connection

**Premium features, free**
- No ads, background play, picture-in-picture, downloads, jump ahead and enhanced bitrate all work without YouTube Premium and without signing in

**Less noise**
- SponsorBlock with per-category behaviour: skip automatically, ask, only mark it on the seek bar, or ignore
- Use your own SponsorBlock private ID and see your contribution stats (segments, skips by others, time saved)
- DeArrow titles and thumbnails, so you see what a video is actually about
- Return YouTube Dislike counts
- Hide Shorts, live streams, premieres, watched videos, comments, related videos, description, chapters, channel avatars, view counts and Explore
- Block channels or keywords from every feed

**Your data stays yours**
- Subscriptions can live locally. The feed is built by fetching each channel directly, no account needed
- Sign in with your Google account to get your own Home feed, subscriptions, playlists, likes and subscribe button. Stream Tube opens youtube.com/activate in your default browser with the sign-in code already filled in, so you only pick your account and allow access. Stream Tube imports your YouTube watch history and recent searches automatically after sign-in
- Sign in to YouTube to open Watch later, Liked videos and any account Favorites playlist from the sidebar. The local playlists are available in Library.
- Signed in, videos play through YouTube's TV client as your account: no "confirm you're not a bot" checks, and age-restricted videos play. The JavaScript puzzles in YouTube's stream URLs are solved with the scripts from [yt-dlp/ejs](https://github.com/yt-dlp/ejs) in a built-in QuickJS engine, or in [Deno](https://deno.com) or [Node.js](https://nodejs.org) when one is installed, which is a few times faster
- Videos you watch in Stream Tube and the positions you stop at go back to your YouTube account through the same sign-in, so other devices resume where you left off. If you prefer, connect a browser session instead under *Settings → General → YouTube watch history*: sign in with a fresh browser profile (Chrome, Edge, Brave or Chromium) that is deleted afterwards, or load a `cookies.txt` file
- Your YouTube watch history refreshes in the background and when you return to Stream Tube
- History, watch later, favourites and playlists are stored in a local SQLite database, and you can pause or clear history at any time
- Import from YouTube Takeout, NewPipe, FreeTube or OPML. Export to NewPipe JSON, YouTube CSV, OPML or a full backup

**Downloads**
- Download video or audio in any quality through yt-dlp, with SponsorBlock chapters, from a download manager with progress
- Save a transcript as plain text (.txt) or timestamped subtitles (.srt) from the Download menu. A single caption track downloads immediately. If several tracks are available, choose the language; automatically generated tracks are labeled in the picker.
- Without yt-dlp it falls back to the built-in downloader (360p/720p or audio)
- yt-dlp and FFmpeg can be fetched from inside the app, on Windows and Linux (*Settings → Downloads*), with a progress bar, so nothing has to be installed by hand

**Open from the browser**
- The [Stream Tube userscript](userscript/stream-tube.user.js) adds an *Open in Stream Tube* button to youtube.com (or press Alt+S). The video continues in the app from where you were. Install it with Tampermonkey or Violentmonkey; it can also send every video to the app by itself
- `streamtube://open?url=<YouTube link>` links open the app, which is set up when you install it (or the first time the portable build runs)

**Network**
- A proxy setting (HTTP or SOCKS) that covers browsing, playback, thumbnails, downloads and sign-in
- On Linux, a choice of Wayland or X11, with an automatic switch to X11 if a Wayland window never shows up (ChromeOS)
- IPv4-only mode applies to new requests as soon as you change it. You can also choose a playback client (TV, visionOS, Android VR or yt-dlp).

**Looks the way you like**
- Dark, light or follow Windows
- Seven accent colours used across the app, and the app icon changes colour to match, on the taskbar and on your desktop shortcuts too
- Interface scaling, density, thumbnail corner style, grid columns, start page, language and region
- English, Azerbaijani, French, German, Japanese, Kazakh, Russian, Turkish, Ukrainian, Simplified Chinese and Traditional Chinese in *Settings → General → App language*. YouTube has a separate language setting.
- Smooth page, dialog and menu transitions, and mouse-wheel scrolling that glides instead of jumping
- Scrollbars you can drag (shown on hover, or always), and pages scroll from the keyboard too: Page Up/Down, Home/End, the arrow keys and Space

**Keeps itself up to date**
- Checks for new releases at startup and installs them in one click, and can update yt-dlp for you. Every download is checked against its SHA-256 before it is used

## Performance

Stream Tube versus youtube.com in Microsoft Edge (clean profile, no extensions) on
the same Windows 11 PC, playing the same video. Numbers are the working set of
every process involved, after browsing a few pages.

| | youtube.com in Edge | Stream Tube 0.4.0-alpha |
|---|---|---|
| Processes | 11–12 | 1 |
| RAM, idle on Home | 1,073 MB | **~405 MB** |
| RAM, playing a video | 1,203 MB | **~565 MB** |

Stream Tube uses less than half the RAM of the browser, and it stays flat as you
browse: thumbnails are kept at the size they're drawn and the ones you've scrolled
past are freed. While playing, part of the memory is a read-ahead buffer that keeps
seeking instant. Turn on *Settings → Player → Hardware decoding* to decode video on
the GPU like the browser does. Results depend on the video, resolution and hardware.

## Screenshots

<table>
  <tr>
    <td><img src="docs/screenshots/live.png" alt="Live stream with live chat"></td>
    <td><img src="docs/screenshots/search.png" alt="Search results"></td>
  </tr>
  <tr>
    <td align="center">Live streams with chat</td>
    <td align="center">Search</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/settings.png" alt="General settings"></td>
    <td><img src="docs/screenshots/sponsorblock.png" alt="SponsorBlock settings"></td>
  </tr>
  <tr>
    <td align="center">Settings</td>
    <td align="center">SponsorBlock and DeArrow</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="docs/screenshots/stats.png" alt="Stats for nerds" width="60%"><br>Stats for nerds</td>
  </tr>
</table>

## Install

Get the latest build from the [Releases page](https://github.com/Avaneesh-Inamdar/Stream-Tube-Desktop/releases).
This is an early alpha, so expect rough edges.

**Windows 10/11 (64-bit)**: run `StreamTube-<version>-setup.exe`. It installs for
your user only, so no administrator prompt, and the app updates itself when a new
release comes out (*Settings → About*).
To run it without installing, choose *Extract All* on
`StreamTube-<version>-windows-x64.zip`, then open `streamtube.exe` in the extracted
folder with `libmpv-2.dll` beside it. It doesn't need the Visual C++ runtime.
After you extract a build with portable update support, use *Settings → About*
for future updates. Stream Tube replaces the app files in that folder and
restarts with the same settings and history.
Older PCs whose graphics driver has no Vulkan support (for example Intel HD 4000)
work too: the app carries its own Vulkan loader for libmpv and uses it only when
Windows doesn't have one.

**Debian, Ubuntu, Mint**: install the `.deb`. This also installs libmpv:

```sh
sudo apt install ./streamtube_0.7.5-alpha_amd64.deb
```

**Fedora, openSUSE**: install the `.rpm`:

```sh
sudo dnf install ./streamtube-0.7.5-alpha.x86_64.rpm
```

**Any Linux (x86_64), nothing to install**: download the AppImage, make it executable
and run it. libmpv is inside, so video plays without installing anything else:

```sh
chmod +x StreamTube-0.7.5-alpha-x86_64.AppImage
./StreamTube-0.7.5-alpha-x86_64.AppImage
```

**Other Linux (x86_64), installed for your user**: unpack `StreamTube-<version>-linux-x86_64.tar.gz` and run
`./install.sh`. It puts the app in `~/.local/bin` and adds a menu entry.
Video plays through libmpv, so install it if you don't have it:

```sh
sudo apt install libmpv2      # Debian 12+, Ubuntu 24.04+ (Ubuntu 22.04: libmpv1)
sudo dnf install mpv-libs     # Fedora
sudo pacman -S mpv            # Arch
```

**macOS (Apple Silicon), unofficial.** Releases may include a
`StreamTube-<version>-macos-arm64-UNOFFICIAL.zip`. It is built from the
[`community/macos-apple-silicon`](https://github.com/Avaneesh-Inamdar/Stream-Tube-Desktop/tree/community/macos-apple-silicon)
branch, contributed by [William Wessex](https://github.com/wwessex). I don't have a
Mac, so keeping that branch up to date and packaging it is done with the help of AI.
It is **not tested on a real Mac by the maintainer** and isn't supported: use it at
your own risk.
It needs `brew install mpv`, and since it isn't notarised, macOS will warn before
opening it.

Downloads above 360p need yt-dlp and FFmpeg. The app offers to fetch both the first
time you need them, on Windows and Linux, or get them any time from *Settings → Downloads*.
You can also install them with your package manager instead.

### Verifying a download

Every file on a release is built by the public [Release workflow](.github/workflows/release.yml)
on GitHub's runners. Each release lists the files' SHA-256 checksums in `SHA256SUMS.txt`,
and each file has a signed build provenance attestation that ties it to the workflow
run that built it. With the [GitHub CLI](https://cli.github.com):

```sh
gh attestation verify StreamTube-0.7.5-alpha-setup.exe --repo Avaneesh-Inamdar/Stream-Tube-Desktop
```

Check a download against those before running it. The in-app updater also checks
the installer's SHA-256 before running it.

## Building

You need:

- **Rust 1.85 or newer** (the crate uses the 2024 edition). Get it from [rustup.rs](https://rustup.rs).
- **libmpv** — download a `mpv-dev-x86_64` archive from
  [shinchiro's mpv builds](https://github.com/shinchiro/mpv-winbuild-cmake/releases)
  and put `libmpv-2.dll` in `third_party/mpv/`. It isn't in the repo because it's over 100 MB.
- **yt-dlp** (optional, recommended) — on your `PATH`, or point to it in
  *Settings → Backend & network*. It's used for downloads and as a fallback when
  the built-in extractor can't get a stream.

Then:

```powershell
git clone https://github.com/Avaneesh-Inamdar/Stream-Tube-Desktop.git
cd Stream-Tube-Desktop
cargo build --release
```

The executable ends up at `target\release\streamtube.exe`. To run it somewhere
else, copy `libmpv-2.dll` next to it.

To build the installer, install [Inno Setup 6](https://jrsoftware.org/isinfo.php) and run:

```powershell
ISCC.exe /DAppVersion=0.7.5-alpha installer\streamtube.iss
```

It lands in `dist\`. On Linux, install the packages listed in
[`.github/workflows/linux.yml`](.github/workflows/linux.yml) and run `cargo build --release`.

## Where things are stored

History and subscriptions go in `%APPDATA%\StreamTube\streamtube.db` on
Windows and `~/.local/share/StreamTube/streamtube.db` on Linux. Settings (content
filters, SponsorBlock choices and everything else) are kept in `settings.json` in the
same folder, so they survive updates and signing out. If the database is ever
damaged, it is rebuilt from what can still be read at the next start, and the
damaged file is kept beside it. Set `STREAMTUBE_DATA_DIR` to keep everything
somewhere else (for example a portable copy).
If you used the app back when it was called Ferrotube, your old data is moved
over automatically on first launch.

## Project layout

```
src/
  api/       Innertube client, stream extraction, sign-in, SponsorBlock/DeArrow/RYD
  player/    libmpv binding, playback controller, player UI, local stream proxy
  ui/        app shell, pages (home, watch, shorts, settings, ...), cards, PiP window
  feed.rs    local subscription feed
  import.rs  Takeout / NewPipe / FreeTube / OPML import
  store.rs   SQLite storage
```

## Known issues

- YouTube sometimes answers with "Sign in to confirm you're not a bot". Signing in
  inside the app avoids it; otherwise updating yt-dlp usually fixes it.
- Windows is the main platform. The Linux build is new and less tested; macOS isn't built yet.

## Contributing

Pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to build,
what makes a PR easy to merge, and what won't be accepted.

## Credits

Stream Tube leans on a lot of other people's work:
[mpv](https://mpv.io), [yt-dlp](https://github.com/yt-dlp/yt-dlp),
[SponsorBlock](https://sponsor.ajay.app), [DeArrow](https://dearrow.ajay.app),
[Return YouTube Dislike](https://returnyoutubedislike.com),
[GPUI](https://www.gpui.rs), [FFmpeg](https://ffmpeg.org) and the annotation archive saved by
[Archive Team](https://wiki.archiveteam.org/index.php/YouTube/Annotations).

Thanks also to everyone who has sent fixes and features; each release's notes name
who did what, and the full list is on the [contributors page](https://github.com/Avaneesh-Inamdar/Stream-Tube-Desktop/graphs/contributors).

It's an independent project and isn't affiliated with or endorsed by YouTube or Google.

## License

[MIT](LICENSE)
