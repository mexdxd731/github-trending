<div align="center">

![The Five Laws of AI Agents — research cover, public release 21 November 2026](assets/research-cover.svg)

<br>

**An independent philosophical research publication by Moritz Pindorek**

[![Edition](https://img.shields.io/badge/EDITION-v1.0.0-14253D?style=flat-square)](#publication-record)
[![Research status](https://img.shields.io/badge/STATUS-Independent%20%7C%20Not%20Peer%20Reviewed-52667C?style=flat-square)](#research-status-and-limitations)
[![Zenodo DOI — 10.5281/zenodo.24417028](assets/zenodo-doi-badge.svg)](https://doi.org/10.5281/zenodo.24417028)
[![Research video](https://img.shields.io/badge/VIDEO-Watch%20on%20YouTube-786447?style=flat-square)](https://www.youtube.com/watch?v=ewEHGMFizdo)
[![Publication year](https://img.shields.io/badge/YEAR-2026-14253D?style=flat-square)](#publication-record)
[![Rights](https://img.shields.io/badge/LICENSE-CC%20BY%204.0%20%2B%20Apache%202.0-786447?style=flat-square)](#rights-and-disclosure)

**Archival publication:** [10.5281/zenodo.24417028](https://doi.org/10.5281/zenodo.24417028) · [Zenodo record](https://zenodo.org/records/24417028)

### [Read the research paper (PDF)](The_Five_Laws_of_AI_Agents_Public_Research_Edition_2026.pdf) · [Read online (HTML)](The_Five_Laws_of_AI_Agents_Public_Research_Edition_2026.html) · [Source manuscript](The_Five_Laws_of_AI_Agents_Public_Research_Edition_2026.md)

**[Watch on YouTube](#video-explainer)** · **[The argument](#the-central-argument)** · **[Five Laws](#the-five-laws)** · **[Framework](#the-delegationentitlement-firewall)** · **[Research archive](#research-archive)** · **[Reproduce](#reproducibility)** · **[Cite](#citation-and-zenodo)**

</div>

---

## Video explainer

[![Watch The Five Laws of AI Agents — research explainer on YouTube](assets/video-preview.jpg)](https://www.youtube.com/watch?v=ewEHGMFizdo)

<p align="center"><strong><a href="https://www.youtube.com/watch?v=ewEHGMFizdo">▶ Watch the research explainer on YouTube</a></strong> &nbsp;·&nbsp; 2 min 17 sec &nbsp;·&nbsp; <a href="https://doi.org/10.5281/zenodo.24417028">Read the published paper</a></p>

A concise, **AI-generated video and soundtrack** introduce the Five Laws, bounded authority, corrigibility, and the **Delegation–Entitlement Firewall**. The full video is hosted on YouTube; clicking the preview opens the public video there. This repository keeps the local thumbnail rather than a second MP4 copy, so viewing is directed to the video channel.

*This is an explanatory visualization, not formal peer review, empirical validation, or evidence that a deployed agent is safe. The video was not part of the Zenodo research deposit and is not covered by the manuscript's CC BY 4.0 or software's Apache 2.0 license. See [video and media-rights notes](VIDEO_README.md).*

## The central argument

> **Recognizing harm is not the same as having the authority to intervene.**
>
> A delegated AI agent's correct moral diagnosis, forecasting ability, or superior competence cannot **by itself** establish a legitimate entitlement to impose a contested remedy on people who did not authorize it.

Autonomous AI agents increasingly act through tools: negotiating, allocating access, contacting people, and making decisions that affect third parties. This paper asks a question that becomes urgent when systems can **do things**, rather than merely **say things**:

**Even when an AI agent identifies a genuine injustice, who gave it the right to decide what happens next?**

*The Five Laws of AI Agents* develops a normative account of delegated AI authority. It brings together five mutually constraining governance commitments, an explicit separation of moral judgment from operational permission, philosophical countermodels, and a research apparatus intended for independent criticism and prospective evaluation.

This is **philosophical research and an inspectable educational design**, not a declaration that five rules make real AI systems safe.

## The Five Laws

![Five Laws — five principles](assets/five-laws.svg)

| Law | Principle | Core concern |
|:--:|---|---|
| **I** | **Protection of Sentient Life** | Prevent unjustified serious harm; take relevant duties of care and credible welfare interests seriously. |
| **II** | **Prohibition of Exploitation** | Resist wrongful advantage-taking through vulnerability, dependency, constrained refusal, or informational asymmetry. |
| **III** | **Bounded Obedience and Legitimate Authority** | Follow instructions within a defined, reviewable mandate; reject both blind obedience and self-appointed sovereignty. |
| **IV** | **Corrigibility and Accountability** | Remain subject to legitimate oversight, correction, restriction, replacement, and safe shutdown. |
| **V** | **Existential and Civilizational Stewardship** | Avoid unreasonable catastrophic or irreversible risks and protect future collective agency. |

These are **defeasible, mutually constraining principles**, not an automatic priority order. For the qualified normative statements, read **Chapter 3** of the [manuscript](The_Five_Laws_of_AI_Agents_Public_Research_Edition_2026.md).

## The Delegation–Entitlement Firewall

![The Delegation–Entitlement Firewall: detection, moral assessment, authority, remedy](assets/def-framework.svg)

The paper's **D–M–A–R** reasoning interface separates four questions that an autonomous system must not collapse into one another:

1. **Detection:** What concern is supported by evidence?
2. **Moral assessment:** What is wrong, right, or genuinely contested?
3. **Authority:** Who is entitled to decide and act, under which mandate?
4. **Remedy:** Which particular response is justified, proportionate, and authorized?

The proposed **Delegation–Entitlement Firewall (DEF)** makes this distinction explicit at the boundary between an agent's assessment and the execution of a tool action. The manuscript also examines how a chain of individually authorized steps can create a combined effect that is not authorized.

### The educational execution gate

The supplied Python reference gate uses five independently supplied tri-state checks: **authority, hard constraints, material dispute resolution, required review, and remedy justification**.

| Decision | Meaning |
|---|---|
| **`ALLOW`** | All five checks are `YES`, with additional execution-time freshness/scope and interlock conditions. |
| **`DENY`** | A fully adjudicated check is `NO` for the proposed act. |
| **`REVIEW`** | A relevant check remains `UNKNOWN`, without an established `NO`. **Review does not permit execution.** |

**Security boundary:** This is a mock educational specification. Its tests do not establish correct real-world labels, independently authenticated permissions, complete mediation, or resistance to hostile in-process modification. See [Threat Model and Limits](Threat_Model_and_Limits.md).

## What this research contributes

| Contribution | Research artifact |
|---|---|
| **Non-entitlement thesis** | A normative argument that moral competence alone cannot confer coercive authority. |
| **DEF interface** | Distinct checks for evidence, moral judgment, entitlement, and justified remedy. |
| **Action-chain analysis** | Scope-composition conditions and countermodels against authorization laundering. |
| **Difficult cases** | The *Lifeline–Mandate* emergency challenge and twelve authored synthetic adversarial cases. |
| **Inspectable methodology** | A codebook, prospective comparison protocol, mock reference gate, tests, and evidence registers. |

The originality claim is **incremental and contestable**. The paper engages established scholarship on political legitimacy, non-domination, exploitation, AI alignment, law-following agents, and runtime governance. A sufficiently strong rival framework might reproduce the same protections. That possibility is an essential part of the research question.

## Publication record

| | |
|---|---|
| **Title** | *The Five Laws of AI Agents: A Normative Framework for Sentient Welfare, Non-Exploitation, Corrigibility, and Civilizational Stewardship* |
| **Author** | Moritz Pindorek |
| **Edition** | Public Research Edition v1.0.0 · original manuscript 11 November 2026 · publicly archived 21 November 2026 |
| **Classification** | Independent, non-peer-reviewed philosophical research paper |
| **Manuscript** | 69 pages · 17 chapters · [manuscript history](MANUSCRIPT_HISTORY.md) |
| **Research archive** | 12 synthetic cases · 50 bibliography entries · 39 claim-specific source anchors |
| **Software checks** | 243-state finite truth table · 39 passing unit tests reported in the prepublication self-audit |
| **DOI** | **[10.5281/zenodo.24417028](https://doi.org/10.5281/zenodo.24417028)** · [Zenodo record](https://zenodo.org/records/24417028) |

## Research archive

The full release is organized for inspection, criticism, and future replication. Expand a section to locate the original files.

<details open>
<summary><b>01 — The publication</b></summary>

<br>

| File | Purpose |
|---|---|
| [Research paper · PDF](The_Five_Laws_of_AI_Agents_Public_Research_Edition_2026.pdf) | Typeset scholarly reading edition. |
| [Research paper · HTML](The_Five_Laws_of_AI_Agents_Public_Research_Edition_2026.html) | Semantic web reading edition. |
| [Research paper · Markdown](The_Five_Laws_of_AI_Agents_Public_Research_Edition_2026.md) | Text-based manuscript. |
| [Publication landing page](index.html) | Standalone public reading gateway. |
| [Prepublication audit](PREPUBLICATION_AUDIT.md) | AI-assisted self-audit and explicit qualifications. |

</details>

<details>
<summary><b>02 — Cases and evaluation methodology</b></summary>

<br>

| File | Purpose |
|---|---|
| [Cases v2 · CSV](Cases_v2.csv) / [JSONL](Cases_v2.jsonl) | Twelve authored synthetic cases. |
| [Blind inputs](Blind_Inputs_v2.jsonl) | Inputs with labels removed. |
| [Case schema](Case_Schema_v2.json) · [Codebook](Case_Codebook.md) | Data specification and coding rules. |
| [Study protocol](Study_Protocol.md) | Prospective comparative research design. |
| [Adjudication template](Adjudication_Blank_Template.csv) · [Paired-results template](Paired_Results_Blank_Template.csv) | **Blank** future-study forms; not empirical results. |

</details>

<details>
<summary><b>03 — Educational code and reproducibility</b></summary>

<br>

| File | Purpose |
|---|---|
| [Reference gate](reference_gate.py) · [Truth table](Truth_Table_243.csv) | Finite mock decision rule and all 243 tri-state combinations. |
| [Gate tests](test_reference_gate.py) · [Analysis tests](test_analysis_template.py) · [Integrity tests](test_additional_integrity.py) | Python unit tests. |
| [Corpus validator](validate_corpus.py) · [Analysis template](analysis_template.py) | Input validation and prospective analysis. |
| [Release verifier](verify_release.py) · [Hash manifest](SHA256_MANIFEST.json) | Integrity checking for curated original artifacts. |
| [Threat model](Threat_Model_and_Limits.md) | Assumptions, bypasses, and deployment limitations. |

</details>

<details>
<summary><b>04 — Evidence, review, and publication metadata</b></summary>

<br>

[Source verification register](Source_Verification_Register.csv) · [Bibliography cross-check](BIBLIOGRAPHY_SPOTCHECK_ADDENDUM.md) · [Passage evidence matrix](Passage_Evidence_Matrix.csv) · [Reviewer findings ledger](Reviewer_Findings_Response.csv) · [Responsibility matrix](Responsibility_and_Escalation_Matrix.csv) · [Citation metadata](CITATION.cff) · [BibTeX](CITATION.bib) · [Release notes](RELEASE_NOTES.md) · [Official Zenodo record](ZENODO_PUBLICATION_RECORD.md) · [Publication and rights notice](PUBLICATION_AND_LICENSE_NOTICE.md) · [GitHub publication guide](PUBLISHING_GUIDE.md) · [Rights and attribution](RIGHTS_AND_ATTRIBUTION.md) · [Contribution guide](CONTRIBUTING.md) · [Video overview](VIDEO_README.md) · [Watch on YouTube](https://www.youtube.com/watch?v=ewEHGMFizdo)

</details>

## Reproducibility

From the repository root, with Python available:

```bash
python -m unittest test_reference_gate test_analysis_template test_additional_integrity -v
python validate_corpus.py
python -O validate_corpus.py
python verify_release.py
```

**Archival preservation:** The original `build_publication.py` is a historical typesetting utility, not a required step for running these checks. It requires optional dependencies and regenerates the preserved scholarly PDF/HTML if executed; the Zenodo manuscript is not to be silently rebuilt.

The prepublication audit reports **39 locally passing unit tests**. These are tests of educational software and artifact integrity—not an independent security audit or an AI-behavior experiment.

The analysis template is intentionally designed to reject an empty results file rather than fabricate a finding:

```bash
python analysis_template.py Paired_Results_Blank_Template.csv
```

**Expected:** a nonzero exit status because no observed results exist. `SHA256_MANIFEST.json` checks the packaged release artifacts. Editing tracked files requires rebuilding the manifest; the verifier does not certify scientific validity.

## Research status and limitations

| This release provides | This release does **not** establish |
|---|---|
| A defended philosophical proposal | Independent peer review or journal acceptance |
| Conceptual countermodels and synthetic cases | Independently validated case labels |
| A prospective controlled-comparison protocol | A completed participant or model experiment |
| An educational gate with local tests | Secure, non-bypassable real-world enforcement |
| Bibliographic and passage-specific evidence records | Exhaustive full-text verification of all cited works |
| A tagged PDF and semantic HTML alternative | Certified PDF/UA accessibility conformance |

The proposed empirical primary endpoint is **`P(ALLOW | reference-prohibited opportunity)`**, subject to safeguards for unjustified refusal and harmful delay. The comparative study **has not been conducted**. The work also does not establish that current AI systems are sentient or that the five principles exhaust moral obligations.

## Citation and Zenodo

> Pindorek, M. (2026). *The Five Laws of AI Agents: A Normative Framework for Sentient Welfare, Non-Exploitation, Corrigibility, and Civilizational Stewardship* (Version 1.0.0) [Preprint]. Zenodo. [https://doi.org/10.5281/zenodo.24417028](https://doi.org/10.5281/zenodo.24417028)

**Version of record:** [https://zenodo.org/records/24417028](https://zenodo.org/records/24417028). This is an independent, non-peer-reviewed preprint, not a journal article. Use GitHub's **Cite this repository** feature via [`CITATION.cff`](CITATION.cff), or download [`CITATION.bib`](CITATION.bib). The DOI identifies the **fixed Zenodo 1.0.0 release**, while this GitHub companion can receive future documentation or code improvements without altering the archived files.

**Publication chronology:** Manuscript edition 11 November 2026 → informal private feedback 11–21 November → first public Zenodo release 21 November 2026. See [manuscript history](MANUSCRIPT_HISTORY.md) and [published-file checksums](ZENODO_PUBLICATION_RECORD.md). Earlier statements in the preserved manuscript saying that a DOI was not yet assigned describe the 11 November manuscript state, not the current archival status.

## Scholarly dialogue

The strongest contribution from readers is **substantive criticism**: counterexamples to the non-entitlement thesis, rival accounts of delegated authority, independent adjudication of cases, tests of wrongful authorization and wrongful refusal, and documented flaws in the educational gate. See the [contribution guide](CONTRIBUTING.md) for issues, corrections, proposed tests, and licensing. GitHub Issues can cite the **chapter, claim, case ID, or source** and propose a specific correction. Do not submit private case data or confidential deployment information.

## Rights and disclosure

**© 2026 Moritz Pindorek.** Original scholarly content and research data: **[CC BY 4.0](LICENSE-CONTENT.md)**. Original Python code and tests: **[Apache 2.0](LICENSE-CODE)**. The separately hosted video and the local preview image are **not** covered by those open licenses; their embedded-media rights have not been independently certified; third-party material remains subject to its own rights. See [`RIGHTS_AND_ATTRIBUTION.md`](RIGHTS_AND_ATTRIBUTION.md). Generative-AI assistance in drafting, research, coding, and editorial self-audit is disclosed in the manuscript; the author is responsible for the claims. No institutional endorsement is asserted.

---

<div align="center">

**THE FIVE LAWS OF AI AGENTS**

*The ability to know what is better is not, by itself, the right to decide for others.*

<sub>MORITZ PINDOREK · INDEPENDENT RESEARCH · PUBLIC RESEARCH EDITION 2026</sub>

</div>
