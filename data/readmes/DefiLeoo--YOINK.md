<div align="center">

<img src="assets/banner.png" alt="YOINK" width="900">

**A second brain that marks its own homework.**

Notes are plain markdown in a folder — the same folder Obsidian opens.
Some of those notes make a claim about the future. Those settle themselves.

`python 3.10+` · `zero dependencies` · `MIT`

</div>

---

## The thirty seconds

```bash
git clone https://github.com/DefiLeoo/YOINK && cd YOINK
pip install -e .

yoink demo          # writes a vault that already has a life
yoink               # open it
```

```
  /\_/\
 ( o.o)
  > ^ <
  a vault with a life  ·  ~/yoink-vault

  35 notes · 14 alive · 21 never opened again
  5 claims settled on the spot · 2 still open
  said 75%, right 40% — +35 pts

  every number above was computed from those files, not written here.
```

<div align="center">
<img src="assets/terminal.gif" alt="yoink running in a terminal" width="900">
</div>

---

## What it is

Two things that usually live apart, in one folder.

**An Obsidian vault.** Markdown files with frontmatter and `[[wikilinks]]`.
Open the same folder in Obsidian and everything works — the links resolve, the
tags show up, the graph draws. Nothing is in a database. Nothing is in a format
you need this tool to read.

**A terminal.** Four panes, keyboard only, launched with one word. Capture,
search, follow links, read, settle — without leaving the shell you were
already in.

And one thing that lives in neither.

---

## The idea

Every note app can tell you how many notes you have.

None of them can tell you whether a single one of them was **right**.

yoink adds four lines to a note's frontmatter, and those four lines turn a
thought into a bet with a date on it:

```yaml
---
title: Robinhood Chain testnet clears 10M transactions
claim: tx count is at or above 10000000
settles: 2026-10-01
reads: chain:robinhood-testnet/txcount
test: gte 10000000
confidence: 0.7
---
```

When the date arrives, `yoink settle` reads the source, applies the test, and
writes the answer back into the note itself:

```yaml
outcome: false
reading: 8412998
settled: 2026-10-01T09:14:22
read_from: robinhood-testnet @ block 9412998
```

Your vault now holds not only what you thought, but what happened — attached to
the thought, in the same file, in plain text, forever.

That is the whole trick. Everything else in this repository exists to make it
work and to stop you from cheating at it.

---

## The pulse

Because the notes carry outcomes, the vault can be scored. `yoink score` prints
two things nobody's note app wants to print.

```
the vault
──────────────────────────────────────────────────────────────
  notes      35
  words      851
  links      16
  alive      14  (40%)
  dead       21  nothing links to them and you never went back  ·  yoink dead

the record
──────────────────────────────────────────────────────────────
  settled    5   graded 5
  said       75%      average confidence, folded to the side you took
  right      40%      how often that side was the right one
  gap        +35 pts   overconfident
  brier      0.388    0 perfect · 0.25 a coin · 1 certain and wrong
```

**Dead notes.** A note is alive if something links to it, it links to
something, you came back to it after the day you saved it, or it carries a bet
that has not closed. Otherwise it is dead. In most vaults this is a third of
everything, and it is invisible, which is why people believe their vault is
working.

**The gap.** `said − right`. You said 75%; you were right 40% of the time. That
is 35 points of overconfidence, computed from your own notes. It cannot be
improved by writing more notes — only by being right, or by saying a smaller
number and meaning it.

The grading is the Brier score, `(p − outcome)²`, used for weather forecasts
since 1950 and chosen for one property: **your best expected score comes from
saying what you actually believe.** Claiming 99% to look decisive costs you
badly when it goes the other way, which is the point.

Every figure above comes out of `yoink demo` on a fixed seed.
`python scripts/figures.py --check` fails if this page and the code disagree.

---

## The terminal

<div align="center">
<img src="assets/terminal.png" alt="the four panes" width="880">
</div>

The header carries the pulse at all times — on the demo vault it reads:

```
Y O I N K  ( o.o)  ·  35 notes  ·  14 alive  ·  21 never opened again  ·  5 claims settled  ·  +35 pts overconfident
```

One rule for the colour:
**gold marks what needs you** — a claim that is due, a link that dangles, the
share of your vault that is dead. Everything healthy is green and quiet. If
every pane glowed, none of them would mean anything.

```
1  VAULT    the list, filtered        j / k      move
2  NOTE     the note, wrapped         enter      open
3  LINKS    ← in, → out               /          search
4  PULSE    alive, dead, the gap      a d c u o  all, dead, claims, due, orphans
                                      t g s r    tags, graph, settle, rescan
```

`r` rescans from disk, so editing a note in Obsidian in another window and
pressing `r` shows the change. There is no index to go stale, because there is
no index.

<div align="center">
<img src="assets/claims.png" alt="the claims filter" width="880">
</div>

---

## The command line

The terminal is for when you sit down on purpose. The rest of the time there is
one verb, and it takes whatever you have:

```bash
yoink "the thing I just thought"      # an argument
pbpaste | yoink                       # a pipe
yoink --file notes.txt                # a file
yoink --url https://…                 # a link, fetched and stripped to text
```

Nothing opens. No prompt appears. No folder must be chosen. **Capture has to be
faster than the thought**, or you stop doing it, and a second brain you do not
feed is worse than none because you believed you had one.

| | |
|---|---|
| `yoink` | the four panes |
| `yoink add` | capture text, a file, or a page |
| `yoink claim <note>` | turn a note into a bet with a date on it |
| `yoink settle` | read the sources, answer everything due |
| `yoink score` | the vault, and how right you have been |
| `yoink dead` | notes nothing points at that you never reopened |
| `yoink graph [note]` | the shape of the vault, or one neighbourhood |
| `yoink search <q> --why` | no index, so it is never stale |
| `yoink tags [tag]` | every tag, or every note under one |
| `yoink show <note>` | print a note, and record that you read it |
| `yoink ledger` | what happened, and whether it has been edited |
| `yoink doctor` | vault health, ledger integrity, claim sanity |
| `yoink demo` | write a vault that already has a life |

`--vault`, then `$YOINK_VAULT`, then `~/yoink-vault`. A machine with one vault
never types a path.

---

## Where an answer can come from

A claim is only worth making if somebody who was not there can check it. Four
kinds of source, and every one of them names where the number came from:

```
file:data/readings.json#chain.block     a JSON file, by key path
csv:bars.csv#close@2026-10-01           a column, on a date
chain:robinhood-testnet/blocknumber     a public chain, over JSON-RPC
manual:https://…                        you read it, and the URL is recorded
```

`manual:` is not a loophole. It stores the address and the number you typed, so
the settlement can be argued with later. What it will not let you do is settle
without writing down where you got it.

### The chain

`chain:` reads a public EVM chain over JSON-RPC, and exists for one reason: a
block height is a number **nobody in this repository controls.**

| network | chain id |
|---|---|
| `robinhood` — Robinhood Chain | 4663 |
| `robinhood-testnet` | 46630 |
| `ethereum` | 1 |

Two things are true of `src/yoink/chain.py` and both are enforced by tests:

- Before any settlement it calls `eth_chainId` and **refuses if the endpoint
  reports a different chain than the one the claim named.** A mainnet answer
  cannot quietly settle a testnet bet.
- It has four methods and all four read. There is no `eth_sendRawTransaction`,
  no key handling, no signing, no wallet. **yoink cannot spend anything, because
  the capability is absent from the source** — and a test parses the file to
  prove the words are not there.

Delete that file and everything else still works. The demo vault settles
entirely from files inside itself, so the test suite never opens a socket.

*Not affiliated with, endorsed by, or connected to Robinhood Markets, Inc.
Robinhood Chain is read here the way any public chain is read: over its public
RPC, without permission and without an account.*

---

## What it refuses

This is the part that makes the score mean anything. Each of these is a claim
that could never be graded, and yoink turns it away with the reason:

```
$ yoink claim idea --claim "it will moon" --settles 2027-01-01 …
✗ refused: "moon" cannot be settled by reading a number. Say what number, and which way

$ yoink claim idea --claim "block height is at or above 5" --settles 2020-01-01 …
✗ refused: 2020-01-01 is not in the future. You cannot bet on yesterday's race

$ yoink claim idea --reads nowhere …
✗ refused: 'nowhere' is not a source. Use file:, csv:, chain: or manual:<url>

$ yoink claim idea --test "goes up" …
✗ refused: 'goes up' is not a test. Use one of: gte 10, lte 3.5, gt 0, eq 1, between 2 4
```

And two rules that hold after the fact:

- **A settled claim cannot be settled again.** No settling, looking, and
  settling differently.
- **A claim cannot be attached to a date that has passed.** No backdating a
  forecast you already know the answer to.

---

## On disk

```
~/yoink-vault/
├── 2026-09-11-robinhood-chain-testnet.md
├── claims-need-a-date-and-a-number.md
├── data/
│   └── readings.json          ← what some claims settle against
└── .yoink/
    └── ledger.jsonl           ← the only thing here that is not a note
```

That is the whole storage layer. No database, no index file, no lock file.
Everything yoink knows — the graph, the search, the pulse — is recomputed from
the files on every run. Ten thousand notes scan in well under a second, and in
exchange there is **no second copy of the truth to drift away from your notes.**

Edit a note in Obsidian, in vim, in TextEdit, or with `cat >>` from a script.
yoink sees it next time it looks. Delete yoink and nothing is lost, because
there was never anything but your files.

### The ledger

`.yoink/ledger.jsonl` is append-only, one JSON object per line, each hashed over
the one before it:

```
hash_n = sha256( seq | at | kind | body | hash_{n-1} )
```

It holds what was captured, what you opened, what became a claim, and how each
claim settled. **None of it is a note.** Delete the whole `.yoink/` directory
and you lose the history; you do not lose a single note. That asymmetry is
deliberate — the notes are yours and portable, the bookkeeping is yoink's and
disposable.

It is hashed because the pulse makes a claim about *you*, and a scoreboard you
can quietly edit is not a scoreboard. Change one confidence after a bad outcome
and `yoink doctor` names the line.

**What it is not:** proof of when anything happened. Whoever holds the file can
rewrite it end to end, and a test in this repository demonstrates exactly that.
It makes a *single* edit obvious, which is the thing that actually happens.

---

## Why there are no dependencies

The vault, the graph, the search, the four-pane terminal, the frontmatter
parser, the JSON-RPC reader — all standard library. `pip install yoink` pulls in
nothing else, and nothing else can break it.

That is not minimalism for its own sake. A tool that holds ten years of your
thinking should not be able to stop working because a package three levels down
changed its API.

```bash
python -m unittest discover -s tests -t .      # 201 tests, no network, under a second
python scripts/figures.py --check              # the README agrees with the code
```

Every terminal on this page is a real capture, not a mock-up. `scripts/screens.py`
opens a pseudo terminal, runs yoink inside it, presses keys, and photographs what
comes back. If a pane is misaligned here, it is misaligned in the app.

(The banner at the top is the one drawn thing — artwork, not a screenshot.)

---

## Honest limits

- **The ledger is tamper-evident, not tamper-proof.** See above. It catches the
  edit people actually make.
- **The demo numbers are from a demo.** They are reproducible, and they are not
  a record of anyone's forecasting. Yours starts empty.
- **`chain:` needs the endpoint to be up.** When it is not, the claim stays open
  rather than settling on a guess — `yoink doctor --chain` says which endpoints
  answered.
- **The frontmatter parser handles the subset Obsidian writes**: strings,
  numbers, booleans, dates, flat lists. It is not a YAML implementation, because
  that would be a dependency.
- **Nothing here predicts anything.** yoink has no model and no opinion. It
  records what you said, reads what happened, and does the subtraction.

---

## Docs

| | |
|---|---|
| [docs/VAULT.md](docs/VAULT.md) | the file format, and why it is Obsidian's |
| [docs/CLAIMS.md](docs/CLAIMS.md) | sources, tests, refusals, settlement |
| [docs/SCORING.md](docs/SCORING.md) | alive/dead, Brier, what the gap means |
| [docs/TERMINAL.md](docs/TERMINAL.md) | the panes and every key |

---

<div align="center">

MIT · built for the fun of it

<sub>Everything you yoinked is a note. Some notes make a claim about the future.
Those settle themselves.</sub>

</div>
