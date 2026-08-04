<p align="center">
  <img src="assets/banner.png" alt="Project Vanta — squad keyart" width="100%">
</p>

<h1 align="center">PROJECT VANTA</h1>

<p align="center"><em>A two-faction battle royale where every match pays — and everything you earn is actually yours.</em></p>

<p align="center">
  <a href="https://projectvanta.io">Website</a> ·
  <a href="https://projectvanta.io/whitepaper/">Whitepaper</a> ·
  <a href="https://projectvanta.io/audits/">Audits</a> ·
  <a href="https://projectvanta.io/press/">Press Kit</a> ·
  <a href="https://x.com/projectvantabr">X / Twitter</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/engine-Unreal%20Engine%205-313131?style=for-the-badge" alt="Unreal Engine 5">
  <img src="https://img.shields.io/badge/stage-pre--alpha-ff5c1f?style=for-the-badge" alt="Pre-alpha">
  <img src="https://img.shields.io/badge/netcode-128--tick-6fc3e8?style=for-the-badge" alt="128-tick">
  <img src="https://img.shields.io/badge/%24VANTA-1B%20fixed%20supply-35d07f?style=for-the-badge" alt="1B fixed supply">
  <img src="https://img.shields.io/badge/contracts-unaudited%20%C2%B7%20WIP-f2b84b?style=for-the-badge" alt="Unaudited">
</p>

---

## What is Project Vanta?

Project Vanta is a AAA free-to-play shooter built in **Unreal Engine 5** by [Vanta Studios](#the-studio). Two factions — **AEGIS** and **ВОЛГА** — fight a persistent seasonal war across 24-player battle royale and team-deathmatch modes on 128-tick dedicated servers.

The difference from every other shooter: **the economy is player-owned.** Match performance pays out **$VANTA**, a fixed-supply token. Every cosmetic — weapon finishes with float and wear, operative skins, blueprints — is an on-chain asset you can hold, trade, or sell. Nothing purchasable affects gameplay. Ever.

> **Design law:** the economy serves the game; the game is never allowed to serve the economy.
> Ten thousand simulated seasons were run against the emission and sink model before a single real token design was finalised.

**Distribution:** launching on the **Epic Games Store** (PC), consoles to follow in 2027. Closed beta waves begin **Q4 2026** — [join the waitlist](https://projectvanta.io/#join).

---

## 🎬 Media

| Reveal Trailer | Founder Introduction |
|---|---|
| [<img src="assets/trailer-poster.jpg" alt="Watch the reveal trailer">](media/vanta-trailer.mp4) | Ryan Stemen on the vision, the build, and the economy — [watch](media/founder-intro.mp4) |
| 83s of pre-alpha, in-engine gameplay — [`media/vanta-trailer.mp4`](media/vanta-trailer.mp4) | [`media/founder-intro.mp4`](media/founder-intro.mp4) |

### Field captures — internal playtest servers

| | |
|---|---|
| ![Foundry — A main](assets/cam1.webp) | ![Relay — mid](assets/cam2.webp) |
| ![Deadlock — B yard](assets/cam3.webp) | ![Extract airfield](assets/cam5.webp) |

---

## 🎮 The Game

| Mode | Format | Economy role |
|---|---|---|
| **Faction Royale** | 24 players · AEGIS vs ВОЛГА squads · collapsing zone | Primary staked mode — winning squad takes the pot |
| **Team Deathmatch** | Faction vs faction · respawn · kill target | Baseline earn mode — per-kill payouts |
| **Arms Race** | FFA · respawn · 20-weapon ladder | Free warm-up — no stakes, no emissions |

### The faction war

Enlistment locks each account to one side per season. Every match moves a persistent front line, and at season's end the winning faction splits a protocol-funded **war chest** on top of personal earnings — capped per account so whales can't capture it.

| | AEGIS | ВОЛГА |
|---|---|---|
| **Doctrine** | Precision · Tech · Control | Attrition · Armor · Overwhelm |
| **Style** | Western coalition contractors — drones, optics, surgical strikes | Eastern bloc war machine — plates, artillery, human-wave pushes |
| **Perk** | Intel pings on damage | Damage resist in the zone |

### Operatives — the first cell

| Vanguard | Wraith | Rampart | Havoc |
|---|---|---|---|
| ![Vanguard](assets/card-vanguard.webp) | ![Wraith](assets/card-wraith.webp) | ![Rampart](assets/card-rampart.webp) | ![Havoc](assets/card-havoc.webp) |
| Assault | Recon | Support | Demolition |

![The first cell](assets/squad.webp)

### Arsenal

Recoil is a pattern, not a dice roll — every weapon has a fixed spray signature. 27 weapons at launch; finishes carry float, pattern index, wear grade, and kill counters on-chain.

| M7 Havoc — AR | VPR-9 — SMG | Nullpoint — Sniper | Bulwark-12 — Shotgun |
|---|---|---|---|
| ![M7 Havoc](assets/m7havoc.webp) | ![VPR-9](assets/vpr9.webp) | ![Nullpoint](assets/nullpoint.webp) | ![Bulwark-12](assets/bulwark.webp) |

---

## 💰 The $VANTA Economy

Fixed supply of **1,000,000,000** — no mint function exists after genesis. Full design in the [whitepaper](https://projectvanta.io/whitepaper/); condensed version in [`docs/tokenomics.md`](docs/tokenomics.md).

| Allocation | % | Tokens | Unlock |
|---|---:|---:|---|
| Play-to-Earn Rewards | 35% | 350,000,000 | Emitted in-game across five seasons |
| Ecosystem & Treasury | 20% | 200,000,000 | Governance-controlled, 48-mo linear |
| Team & Advisors | 15% | 150,000,000 | 36-mo vest, 12-mo cliff |
| Private Round | 12% | 120,000,000 | 24-mo vest, 6-mo cliff |
| Liquidity & Listings | 10% | 100,000,000 | Market depth at TGE |
| Public Sale | 8% | 80,000,000 | Unlocked at TGE |

**Sinks scale with play** — staked-queue rake (100% burned), crafting (90% burned), marketplace fee (5%: burn / staker share / treasury), wear upgrades (100% burned). The more the game is played, the faster supply is removed.

**Chain:** announced at TGE, after the third-party audit completes. Hard requirements: sub-cent fees, mature marketplace infrastructure, and email-based custodial onboarding so players never need a seed phrase.

<p align="center"><img src="assets/lootbox.gif" alt="Supply crates" width="420"></p>

---

## 🔒 Smart Contracts

> ⚠️ **UNAUDITED — WORK IN PROGRESS.** These contracts are published for transparency and review. They are **not deployed**, and nothing goes live before the third-party audit completes and its report is published on the [audits page](https://projectvanta.io/audits/). Audit first, launch second — always.

| Contract | Purpose |
|---|---|
| [`contracts/VantaToken.sol`](contracts/VantaToken.sol) | Fixed-supply ERC-20 (1B), burnable, permit — no mint, no owner privileges over balances |
| [`contracts/VantaVesting.sol`](contracts/VantaVesting.sol) | Irrevocable cliff + linear vesting for team / advisors / private round |
| [`contracts/VantaStaking.sol`](contracts/VantaStaking.sol) | 30/90/180-day lock tiers (1.0× / 1.5× / 2.2× weight), continuous marketplace-fee share |
| [`contracts/EmissionsVault.sol`](contracts/EmissionsVault.sol) | Seasonal emission caps, signed payout vouchers, per-account daily limits, treasury sweep of unspent seasons |

Design invariants the audit must verify:

- No path mints supply after genesis
- No path releases vested tokens early
- Emissions can undershoot a season's cap but never exceed it
- Governance cannot alter vesting or seize player balances

```bash
npm install
npx hardhat compile
npx hardhat test
```

---

## 🗺 Roadmap

| Phase | Window | Status |
|---|---|---|
| Foundation — core build, first arena, closed alpha, economy sim | H1 2026 | ✅ Complete |
| Season Zero — reveal, waitlist, beta waves, contract audit | H2 2026 | 🔶 In progress |
| Launch — TGE, open beta, marketplace, staked ranked queues | H1 2027 | ⬜ Upcoming |
| Expansion — consoles, new arenas, esports circuit, full governance | H2 2027+ | ⬜ Upcoming |

---

## 🏗 Repository layout

```
├── assets/          keyart, renders, captures, logo
├── media/           reveal trailer & founder introduction (mp4)
├── contracts/       Solidity sources (unaudited, WIP)
├── test/            Hardhat test suite
├── docs/            tokenomics & architecture notes
├── hardhat.config.js
└── package.json
```

---

## The Studio

**Vanta Studios** — a senior team of shooter developers building Project Vanta full-time.

- **Ryan Stemen** — Founder // Game Director · AAA credits from his years at Epic Games · [LinkedIn](https://www.linkedin.com/in/rastemen/)

**Enquiries:** [ryan@projectvanta.io](mailto:ryan@projectvanta.io) · **Press:** [press@projectvanta.io](mailto:press@projectvanta.io) · **Security:** [security@projectvanta.io](mailto:security@projectvanta.io)

---

## ⚠️ Disclaimers

All gameplay shown is **pre-alpha, in-engine footage** and does not represent final quality. $VANTA is a utility token for use within the Project Vanta ecosystem — it is not an investment, nothing in this repository is financial advice, and token values can go to zero. Contract code is unaudited and subject to change; the published audit report, not this repository, is the final word on deployed behaviour. Availability of token features is subject to jurisdiction.

<p align="center"><sub>© 2026 Vanta Studios. All rights reserved.</sub></p>
