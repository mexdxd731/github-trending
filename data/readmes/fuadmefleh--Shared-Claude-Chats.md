# Shared AI Chats

An archive of public Claude and Grok conversations, exported from their share
links as plain markdown, plus the two scripts that produce it.

929 conversations, 10,615 messages, ~29 MB.

| Directory | Source | Conversations | Messages | Longest |
| --- | --- | --- | --- | --- |
| `claude_chats/` | `claude.ai/share` | 410 | 3,405 | 204 |
| `grok_chats/` | `grok.com/share` | 519 | 7,210 | 4,308 |

## Layout

```
claude_share_export.py        exporter for claude.ai shares
grok_share_export.py          exporter for grok.com shares
claudeaisharelinks.txt        the claude.ai links this archive was built from
grokaisharelinks.txt          the grok.com links this archive was built from
claude_chats/                 one markdown file per Claude conversation
grok_chats/                   one markdown file per Grok conversation
.claude-share-export.json     manifest for claude_chats/
grok_chats/.grok-share-export.json   manifest for grok_chats/
```

Every conversation is one markdown file, named from its title:

```
Adding-Kerberos-Authentication-to-Hadoop-Cluster-on-EC2.md
AI-inflection-point-and-the-future-of-automation.md
네이버-AI-모델서비스-기획-직무-기업조사-리포트.md
```

Titles keep their original script rather than being transliterated, so non-Latin
filenames are expected. A conversation with no usable title falls back to its
snapshot UUID (`18754235-198d-446b-afc6-26191ea62d27.md`).

## File format

Both exporters write the same shape: a metadata header, then alternating turns
separated by a horizontal rule.

```markdown
# 네이버 AI 모델/서비스 기획 직무 기업조사 리포트

- Source: https://claude.ai/share/b76ffb8c-8a9d-43fb-b02d-0990e2e2fc7c
- Author: 쏠테크
- Created: 2026-02-04
- Messages: 2

---

## Human

당신은 자기소개서 작성을 돕기 위해…

---

## Assistant

# 조사 전략
…
```

The `---` before each turn is load-bearing. Message bodies contain their own
markdown headings, so without it a `## Assistant` turn marker would be
indistinguishable from a heading written inside a reply.

The headers differ slightly by source: Claude transcripts carry `Author`, Grok
transcripts carry `Model`. Grok transcripts may also include generated-image
links, attachment names, and — when exported with the relevant flags — quoted
thinking steps and cited web/X sources.

## Manifests

`.claude-share-export.json` and `grok_chats/.grok-share-export.json` map each
share id to the file written for it, plus title, message count, and export
timestamp. An exporter reads its own manifest to skip conversations it already
has, so re-running an existing links file costs no network requests. Deleting a
manifest means the next run re-fetches everything it covered.

A manifest is looked for in the output directory and then just above it, and a
transcript that has since been moved into a subdirectory is recognised by name
rather than downloaded again — which is why `.claude-share-export.json` still
governs `claude_chats/` after the transcripts were tidied into it.

## Adding more

Both scripts need `curl_cffi`:

```bash
pip install curl_cffi
```

Put share links in a file, one per line — blank lines and `#` comments are
ignored:

```
# new batch
https://claude.ai/share/b76ffb8c-8a9d-43fb-b02d-0990e2e2fc7c
https://claude.ai/share/7a9b58a6-0903-4964-8207-cbe44de743ff
```

Then export into the matching directory:

```bash
python3 claude_share_export.py claudeaisharelinks.txt -o claude_chats
python3 grok_share_export.py  grokaisharelinks.txt   -o grok_chats
```

Either script also takes bare links or ids as positional arguments, `-f FILE`
(repeatable) instead of a positional links file, and `-o` defaults to the
current directory.

Already-archived conversations are skipped, so it's safe to keep appending to
one links file and re-run it. Use `--force` to re-fetch a conversation that has
gained messages since it was archived — the archive is a snapshot, not a live
mirror.

Optional content flags, off by default:

- `--include-thinking` (both) — thinking blocks, where the snapshot exposes them
- `--include-sources` (Grok only) — web pages and X posts cited by each answer

## Caveats

Only public shares are reachable; there is no authenticated path, so revoked or
private conversations return "not found." The links files have been pruned to
what actually exported, so a fresh run of either should come back clean.

Both share pages are empty SPA shells, so the exporters read the underlying JSON
APIs directly. Those endpoints sit behind a Cloudflare check that fingerprints
TLS rather than headers, which is why `curl_cffi` (browser TLS impersonation) is
required instead of plain `requests`.

Some fidelity is lost upstream. Claude's own share API flattens tool calls and
search widgets to a literal `This block is not supported on your current device
yet.` fence, and that placeholder is what lands in these files. Nothing in the
export pipeline can recover the original content.
