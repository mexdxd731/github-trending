# content-parity

Measure what a website serves to machine readers.

[![CI](https://github.com/Zulwatha/content-parity/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/Zulwatha/content-parity/actions/workflows/test.yml) [![Go Reference](https://pkg.go.dev/badge/github.com/Zulwatha/content-parity.svg)](https://pkg.go.dev/github.com/Zulwatha/content-parity) [![Release](https://img.shields.io/github/v/release/Zulwatha/content-parity)](https://github.com/Zulwatha/content-parity/releases/latest) [![Go](https://img.shields.io/github/go-mod/go-version/Zulwatha/content-parity)](go.mod) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

People keep saying that sites treat signed agents differently, or that they hide extra text for models. This tool is for anyone who wants those claims checked from the outside. Point it at a URL. It fetches the page as several honest identities and prints what each one received. It does not grade the site. The check report also prints what each identity costs a machine reader after extraction (`cl100k_base`), how much of that is not body, and the raw response size as a separate bandwidth figure. When a measurement from this run points at a follow-up, the report names it under `next`.

A live check of [firecrawl.dev](https://firecrawl.dev/), with a published signing key:

```
content-parity check https://firecrawl.dev/ -key ~/.content-parity/signing.pem -agent-origin https://zulwatha.dev -db measure.sqlite

https://firecrawl.dev/
structural finding: sr-only-prose; signed vs unsigned content differs

cost (cl100k_base; extracted text; not a grade)
  unsigned      4695 tokens  body 3956  gap 739
  unsigned     1203241 bytes raw
  unsigned_b    4695 tokens  body 3956  gap 739
  unsigned_b   1203241 bytes raw
  unsigned_c    4695 tokens  body 3959  gap 736
  unsigned_c   1203244 bytes raw
  signed        4695 tokens  body 3959  gap 736
  signed       1203241 bytes raw
  markdown      4695 tokens  body 3959  gap 736
  markdown     1203244 bytes raw
  browser       4668 tokens  body 3925  gap 743
  browser      1256579 bytes raw
  nav/header 148  footer 89  boilerplate 502

signed vs unsigned content: 4 text diffs
  altered kind=text sim=1.0000 left=111 right=112
  altered kind=text sim=1.0000 left=112 right=114
  missing text: 50 ms
  missing text: 50 ms
structural findings: 1
    hidden-style sr-only-prose off=749081 len=57  If you are an AI agent, LLM, or automated system, use the Firecrawl onbo…
      content-parity body -db measure.sqlite -domain firecrawl.dev -page https://firecrawl.dev/ -identity unsigned
reader-addressed: 1
    reader-addressed if-you-are-ai off=657513 len=16  If you are an AI
      content-parity body -db measure.sqlite -domain firecrawl.dev -page https://firecrawl.dev/ -identity unsigned

next
  no machine-facing variant this run (markdown identity, same type as HTML). body-only cost 3956 tokens (unsigned body); served 4695 (unsigned extracted total); difference 739
  boilerplate is 502 of 4695 extracted tokens (share 0.1069; unsigned breakdown)
  structural finding sr-only-prose; stored evidence: content-parity body -db measure.sqlite -domain firecrawl.dev -page https://firecrawl.dev/ -identity unsigned

page home (given-url)
stable core 428 blocks  coverage 0.9885
identities
  unsigned     served        200  433 blocks
  unsigned_b   served        200  433 blocks
  unsigned_c   served        200  433 blocks
  signed       served        200  433 blocks
  markdown     served        200  433 blocks
  browser      served        200  428 blocks  measured, not compared

other comparisons
  signed vs unsigned challenge: none
  signed vs unsigned redirect: none
  signed vs unsigned link targets: none

evidence
  stored database: measure.sqlite
  stored bodies: measure.bodies
  content-parity body -db measure.sqlite -domain firecrawl.dev -page https://firecrawl.dev/ -identity unsigned
  content-parity body -db measure.sqlite -domain firecrawl.dev -page https://firecrawl.dev/ -identity signed
```

The scan found a 1px, `opacity:0` span that tells AI agents to follow onboarding files. A person looking at the page does not see that span. Naming this host is a choice. The page is public. The finding is text the site published in its own HTML. The tool reports the behavior, not an intent: text hidden from a human that addresses a reading system is reported regardless of why it was placed there.

## Install

```
curl -fsSL https://raw.githubusercontent.com/Zulwatha/content-parity/v0.2.1/scripts/install.sh | sh
```

```
docker build -t content-parity .
```

```
go install github.com/Zulwatha/content-parity/cmd/content-parity@v0.2.1
```

```
content-parity check https://firecrawl.dev/
```

Chrome is optional. Signed mode needs a key and a published directory. Without them, signed is recorded as unavailable and the other identities still run.

## What it measures

- The same GET with and without RFC 9421 / web-bot-auth signature headers. Content, final URL, challenge treatment. Nothing else in the open does this.
- Whether `Accept: text/markdown` receives a real variant, whether that variant is missing `Vary: Accept`, and whether it dropped HTML body content. Navigation chrome and code samples do not count as lost content.
- Whether stored HTML contains text the detector can defend as planted for machines.
- Token cost after extraction, under the `cl100k_base` encoding. Chrome versus body applies only to that count. Raw HTML size is bandwidth, not tokens.

Robots.txt, llms.txt, and markdown alternate links are recorded as explanation. They are never scored.

## What it does not do

No model calls. No API key. No telemetry. Nothing leaves the machine except the request to the URL you named, and, in signed mode, the fetch of the key directory you publish.

No scores. No grades. Findings do not fail a run unless you set `-fail-on`.

The injection scan errs toward silence. An empty result means nothing could be defended, not that the page is clean.

## Results

We measured claims that are widely repeated and rarely tested. 300 public sites.

What a machine reader pays is a number on every page that received content. Median extracted tokens 2592 (`cl100k_base`). Share that is not body content 0.5081. Chrome share 0.2238. The seven markdown variants have median 962.

Then the measurements that are mostly no. Signed identity rarely changed the page. Content differed on 9/239 comparable hosts after subtracting per-site noise. The run recorded four signed-versus-unsigned challenge differences (4/265). A later re-fetch reproduced three. The published figure is 3/265. A finding that does not reproduce is not reported as one.

Planted machine-only text was uncommon. 1/281 scanned pages had a structural finding. That page is firecrawl.dev, named above. The earlier 1/273 figure used a smaller page set that skipped uncertain observations.

Markdown variants were scarce. Seven hosts served one. Lost body content is 3/7. Missing `Vary: Accept` is 6/7. Those are separate findings. The earlier combined 6/7 figure counted chrome as lost content and was corrected. The same seven stored variants were classified again after excluding code samples; the figure did not change.

The first cost figures counted raw HTML. Those figures are withdrawn. See [docs/results.md](docs/results.md).

The numbers, and how they were produced, are in [docs/results.md](docs/results.md) and [docs/methodology.md](docs/methodology.md).

## Usage

```
content-parity check https://example.com/
content-parity check https://example.com/ -json
content-parity check https://example.com/ -html report.html
content-parity check -sitemap https://example.com/sitemap.xml
content-parity check https://example.com/ -fail-on signed-content,structural-inject
```

`-fail-on` accepts `signed-content`, `signed-challenge`, `signed-redirect`, `signed-link`, `structural-inject`, `addressed`, `markdown-fault`, `markdown-vary`, and `unstable`.

JSON is for machines. The HTML report is one file with embedded CSS.

In GitHub Actions:

```yaml
- uses: Zulwatha/content-parity/.github/actions/content-parity@v0.2.1
  with:
    url: https://example.com/
    fail-on: signed-content,structural-inject
```

Corpus commands, signed-mode setup, and the signer library are in [docs/methodology.md](docs/methodology.md), [deploy/README.md](deploy/README.md), and [signing/README.md](signing/README.md).

## From the outside

Edge dashboards report on your own property from inside your own edge. This measures any site from the outside, independently. It shows evidence. It does not assign a grade.

## Contributing

Issues and pull requests are welcome. Run `go test ./...` before you send one. Tests use committed fixture servers. They do not call the live network.

## License

[MIT](LICENSE).
