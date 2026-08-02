# OpenLyricSync

[![CI](https://github.com/TCeramic/OpenLyricSync/actions/workflows/ci.yml/badge.svg)](https://github.com/TCeramic/OpenLyricSync/actions/workflows/ci.yml)
[![Latest GitHub Release](https://img.shields.io/github/v/release/TCeramic/OpenLyricSync?display_name=tag&sort=semver)](https://github.com/TCeramic/OpenLyricSync/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js >=22.13](https://img.shields.io/badge/node-%3E%3D22.13-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/en/about/previous-releases)

OpenLyricSync is a clean-room, provider-neutral TypeScript toolkit for timed
lyrics. It parses LRC text, resolves the active line for a playback position,
aligns two lyric timelines, and compares normalized track metadata. The
workspace also includes a local-only CLI for using those operations with files.

Version `0.1.0` is the first GitHub source release. It provides the buildable
workspace and package metadata; npm registry publication is a separate action
and is not claimed by this release.

Canonical project links:

- Repository: <https://github.com/TCeramic/OpenLyricSync>
- Issue tracker: <https://github.com/TCeramic/OpenLyricSync/issues>
- New issue form: <https://github.com/TCeramic/OpenLyricSync/issues/new/choose>

## Features

- Parse UTF-8 LRC text into typed metadata, warnings, offsets, and timestamped
  lines.
- Resolve the current lyric line from a millisecond playback position.
- Align original and translated (or otherwise related) lyric timelines.
- Score two normalized track records without querying a music service.
- Resolve playback snapshots through a deterministic provider-neutral helper.
- Run `parse`, `current`, `align`, and `match` from a Node.js CLI with JSON
  output and stable exit-code categories.

## Project boundary

OpenLyricSync contains lyric and metadata logic, not music-service clients. The
core and CLI do not authenticate with, scrape, or make network requests to
Spotify, NetEase Cloud Music, or any other provider. A consuming application is
responsible for:

- obtaining playback and catalog data through an authorized integration;
- complying with the provider's terms, rate limits, and content rights;
- normalizing provider data at its adapter boundary;
- storing credentials outside OpenLyricSync and redacting them from logs.

The implementation is intended to be independently maintained. Contributions
must be original or come from a dependency or source whose license is compatible
and documented; copying private provider code or proprietary client behavior is
out of scope.

## Requirements

- Node.js 22.13 or later
- pnpm 11.9.0 (the workspace pins the package-manager version)

OpenLyricSync is ESM-first. Consumers should use an ESM-capable Node.js or
TypeScript configuration.

## Quick start

From a checkout of this repository:

```bash
pnpm install
pnpm verify
node packages/cli/dist/cli.js --help
```

Parse a local LRC file:

```bash
node packages/cli/dist/cli.js parse ./song.lrc
```

Get the active line at 65.432 seconds:

```bash
node packages/cli/dist/cli.js current ./song.lrc 65432
```

Align an original timeline with a translated timeline:

```bash
node packages/cli/dist/cli.js align ./original.lrc ./translated.lrc
```

Compare two local normalized track records:

```bash
node packages/cli/dist/cli.js match ./wanted.json ./candidate.json
```

Every data command writes formatted JSON to stdout. Diagnostics go to stderr;
the CLI never sends input files over the network. See [CLI reference](docs/cli.md)
for the complete interface and exit codes.

## Library overview

```ts
import {
  alignLyricTimelines,
  getCurrentLyricLine,
  matchTrack,
  parseLrc,
} from '@openlyricsync/core';

const original = parseLrc('[00:01.00]Hello');
const translated = parseLrc('[00:01.05]你好');

const current = getCurrentLyricLine(original, 1_250);
const alignment = alignLyricTimelines(original, translated);
const trackMatch = matchTrack(
  { title: 'Example', artists: ['Artist'], durationMs: 180_000 },
  { title: 'example', artists: ['Artist'], durationMs: 180_250 },
);
```

The package also exports `resolvePlaybackState` and its public TypeScript types.
See the [API reference](docs/api.md) for exact inputs, outputs, defaults, and
edge cases.

## Workspace layout

```text
packages/
  core/   Provider-neutral pure TypeScript functions
  cli/    Local Node.js command-line adapter
docs/     API, CLI, architecture, and release documentation
.github/  CI and contribution templates
```

The dependency direction is `cli -> core`. The core has no filesystem, process,
credential, or network responsibility. See [Architecture](docs/architecture.md).

## Compatibility

- Runtime: Node.js `>=22.13`.
- Modules: native ESM with TypeScript declarations.
- Text files: UTF-8; a leading UTF-8 BOM is accepted by the CLI.
- Time values: milliseconds represented as finite JavaScript numbers.
- Platforms: file paths are handled through Node.js APIs and do not assume a
  POSIX-only separator.

Enhanced word-level lyrics, provider-specific encrypted lyric formats, audio
fingerprinting, catalog lookup, and automatic lyric downloading are not part of
the `0.1.0` contract.

## Verification

Run the complete local gate:

```bash
pnpm verify
```

Or run only the CLI package checks:

```bash
pnpm --filter @openlyricsync/cli lint
pnpm --filter @openlyricsync/cli typecheck
pnpm --filter @openlyricsync/cli test
pnpm --filter @openlyricsync/cli build
```

The included CLI tests exercise help/version output, a real temporary UTF-8 LRC
file, current-line lookup, timeline alignment, and failure exit codes. GitHub CI
defines clean-install verification on supported Node.js versions; GitHub
Actions is the source of truth for each release commit's remote result.

### Verification status for this handoff

| Capability | Status |
| --- | --- |
| CLI lint, typecheck, 10 tests, and build | Verified locally on Windows with bundled Node.js 24.14.0 on 2026-08-02 |
| Focused core tests | 9 tests verified locally in the same handoff |
| Compiled CLI entry | `--help` and local LRC parsing smoke-tested; registry installation is not claimed |
| Local CLI package archive | `pnpm pack` verified with the package README, license, declarations, source maps, and executable entry |
| Clean Node.js 22.13/24 CI matrix | Required by the repository workflow; consult GitHub Actions for the release commit's final status |
| Provider integrations and real accounts | Not implemented and not tested |
| npm registry publication | Not claimed by the GitHub source release |

## Security and privacy

Read the [security policy](SECURITY.md) for supported versions and the private
vulnerability reporting process.

- The core operates on values already in memory; the CLI reads only paths named
  by the caller.
- No command performs network I/O, telemetry, analytics, or credential lookup.
- CLI errors are intentionally concise and do not print stack traces or file
  contents.
- Do not place access tokens, cookies, private lyric catalogs, or personal data
  in fixtures, issues, command examples, or debug output.
- Treat provider metadata and lyrics according to their licenses and the user's
  authorization; this project does not grant content rights.

For a suspected vulnerability, use
[GitHub private vulnerability reporting](https://github.com/TCeramic/OpenLyricSync/security/advisories/new)
when it is enabled. Do not include secrets or exploit data in a public issue.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md) before opening a change. Bug reports and
feature requests should use the structured issue forms.

## License

OpenLyricSync is licensed under the [MIT License](LICENSE).
