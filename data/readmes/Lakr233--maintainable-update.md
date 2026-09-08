# Maintainable Update

A skill that runs a **repo-wide maintainability sweep** across parallel
subagents, then commits and pushes. It works on any codebase: Swift and
Objective-C, Go, TypeScript, Rust, Python, Kotlin, Java, C#, Dart, and
monorepos that mix them.

Seven passes, in an order that is not negotiable:

```
copy, clarity  →  split  →  wrap, width  →  rename  →  tidy
```

| Op | What it changes | Guarantee |
| --- | --- | --- |
| `copy` | User-facing strings | Wording only |
| `clarity` | Dead state, duplicate derivations, one-caller wrappers, redundant error cases | Behaviour-preserving, reviewed |
| `wrap` | One parameter per line in multi-line declarations and calls | **Token-inert — proven** |
| `width` | Lines over the column limit, broken at semantic groups | **Token-inert — proven** |
| `split` | Oversized files split at real seams | **Token-inert — proven** |
| `rename` | Each file named after the code it owns | `git mv` only |
| `tidy` | Folders grouped by ownership | `git mv` only |

Default set: `clarity,wrap,width,split,rename,tidy`. `copy` is opt-in.

## Install

```bash
# Claude Code
git clone https://github.com/Lakr233/maintainable-update.git ~/.claude/skills/maintainable-update
# Grok
git clone https://github.com/Lakr233/maintainable-update.git ~/.grok/skills/maintainable-update
# Cursor
git clone https://github.com/Lakr233/maintainable-update.git ~/.cursor/skills/maintainable-update
```

Then run `/maintainable-update`, or ask for a repo-wide readability cleanup.

## Usage

```
/maintainable-update
/maintainable-update --ops shape
/maintainable-update --ops all --column-limit 100
/maintainable-update --ops split --split-threshold 400 ./Sources
/maintainable-update --ops identity --no-push
/maintainable-update --ops clarity,copy --languages swift,typescript
```

| Flag | Effect |
| --- | --- |
| _(none)_ | Default op set over the current workspace, checkpoint per stage, push at the end |
| `path` | Limit discovery to that root |
| `--ops a,b` | Choose operations. Aliases: `all`, `default`, `shape`, `identity` |
| `--column-limit N` | Soft limit for `width` (default **120**) |
| `--split-threshold N` | Line count above which `split` looks at a file (default 600) |
| `--max-shards N` | Cap parallel shards (default 12) |
| `--languages a,b` | Restrict to these languages |
| `--include-tests` | Let content ops touch test sources too |
| `--no-commit` / `--no-push` | Stop before committing / before pushing |
| `--no-checkpoint` | One commit at the end instead of one per stage |

Commits use explicit pathspecs. Other dirty files in the tree are left alone.

## How it runs

Four stages. Within a stage every shard runs its own chain concurrently.
Between stages there is a barrier, the repository's own check, a commit — and a
**remeasure**, because a split changes the file set and a rename changes every
path, so a plan computed before them names files that no longer exist.

```
Stage 1  CONTENT   copy, clarity   find → verify → fix → review⇄fix (max 3)
Stage 2  SPLIT     split           remeasure → split each file → prove inert
Stage 3  SHAPE     wrap, width     remeasure → formatter → agents → prove inert
Stage 4  IDENTITY  rename, tidy    remeasure → plan (parallel) → apply (serial git mv)
         SHIP                      final checks, push once
```

`rename` and `tidy` apply through **one** agent. `git mv` touches the index,
and two agents moving files at once produce a corrupted staging area. Their
planning is parallel; only the application is serial.

## The proof

`wrap`, `width` and `split` claim they moved whitespace and file boundaries
only. That claim has been wrong before, so the skill turns it into a test:

```bash
python3 scripts/verify-inert.py --base HEAD src/*.swift
python3 scripts/verify-inert.py --split OldFile.swift New1.swift New2.swift
```

Strip every whitespace character from the committed version and the working
version and compare. Identical means no token moved. Different means a real
change hid inside a formatting commit — that file gets reverted, not shipped.

Two limits, both printed on every run: whitespace **inside a string literal**
is stripped from both sides and is therefore invisible, and in a
whitespace-significant language indentation is syntax, so those files are
**refused** rather than passed — their formatter owns them.

## Formatters come first

If a repository's mechanical style is already owned by `gofmt`, `rustfmt`,
`swift-format`, `swiftformat`, `clang-format`, `prettier`, `black`, `ruff` or
`dart format`, running it *is* the whole `wrap`/`width` fix: faster than agents,
and incapable of introducing a semantic change. The engine runs it first and
sends agents only at what it leaves alone.

Two guards: the formatter's config must already be checked in — this skill
never introduces a formatter to a repository that has not chosen one — and the
tree must already be formatter-clean outside the sweep's targets, or running it
would produce a sweeping unrelated diff.

## What it detects

`scripts/discover-shards.py` walks the roots and emits disjoint shards,
per-op work lists, formatters, git roots, and a cheap check per repo.

| Stack | Recognised by | Check |
| --- | --- | --- |
| Make | `Makefile` with `check` / `lint` / `verify` | `make check` |
| SwiftPM | `Package.swift` | `swift build` |
| Xcode | `*.xcodeproj` | the repo's own target, with a dedicated derived-data path |
| Node | `package.json` (+ lockfile) | `<pm> run typecheck` / `lint`, else `tsc --noEmit` |
| Rust | `Cargo.toml` | `cargo check --all-targets` |
| Go | `go.mod` | `go build ./...` |
| Python | `pyproject.toml`, `setup.py` | `python3 -m compileall` |
| Dart / Flutter | `pubspec.yaml` | `dart analyze` |
| .NET | `*.sln`, `*.csproj` | `dotnet build` |
| Gradle | `gradlew` | the repo's own fast task (a full compile is too slow for a per-stage gate) |

The scanners are deliberately asymmetric: `wrap` over-reports (a false positive
costs one agent a read) and `rename` under-reports (a false positive costs a
history-losing move). Everything under `work` is a hint for an agent that opens
the file, never a verdict.

## Structure

```
maintainable-update/
├── SKILL.md                       # Orchestrator (host-agnostic)
├── references/
│   ├── operations.md              # The seven passes: rules, exclusions, refusals, proofs
│   ├── clarity-bar.md             # Concept inventory, decision gates, verdicts
│   ├── copy-bar.md                # User-facing writing standard
│   ├── roles.md                   # Every agent role in the engine
│   ├── safety.md                  # Merge hazards, git rules, inertness, reporting
│   └── …                          # naming, early-return, function design, abstraction
│                                  # levels, class/struct design, file organization,
│                                  # formatting consistency, repository conventions,
│                                  # testing and seams, Objective-C, TypeScript/Electron
├── scripts/
│   ├── discover-shards.py         # Shards, per-op work, formatters, checks
│   ├── verify-inert.py            # Token-stream equality proof
│   └── test_maintainable.py       # python3 scripts/test_maintainable.py
└── workflows/
    └── maintainable-update.js     # Engine for Claude Code's Workflow tool
```

## Hard rules

- Behaviour is not part of the deliverable. Every op except `copy` and
  `clarity` leaves observable behaviour byte-identical.
- A rename changes what a *reader* calls the code, never what a *machine* calls
  it: serialized names, persisted keys, enum raw values, database columns,
  environment variables, localization keys and on-disk names are contracts.
- Shards are disjoint. Two agents never hold the same file.
- Pathspec commits only. Never `git add -A`. Another session may be editing
  this tree.
- Every parallel builder gets its own build directory.
- No silent caps. Every truncation, skip and refusal is named with its reason.
- A check that cannot fail is not a check: prove it fails on the pre-fix tree.

## License

MIT
