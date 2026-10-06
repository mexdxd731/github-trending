# Auto Trading Bot Pump.fun Solana V2

An automated, real-time **momentum trading bot for Pump.fun bonding-curve tokens on Solana**. It listens to on-chain events, scores every new token every second, filters out rugs and manipulated launches, buys only when many independent conditions line up, and manages the exit automatically (take-profits, stop loss, trailing stop). A built-in web dashboard lets you watch everything live and change settings without restarting.

## Features

- **Real-time discovery** – subscribes to the Pump.fun program logs over a Solana WebSocket and decodes `Create`, `Buy` and `Sell` events with no third-party data API.
- **Older-token radar** – also picks up tokens that were not launched while the bot was running if they show strong buying activity.
- **Multi-factor scoring (0–100)** – flow, momentum, acceleration, holder structure, safety, plus social, creator, wallet-quality and attention bonuses.
- **Anti-rug intelligence** – checks creator history, wallet funding clusters, copy-cat tokens, whale concentration, wash trading, bot bursts, and how the market reacts when the creator sells.
- **Strict entry logic** – hard rejects, hard gates, soft momentum gates and a confirmation period must **all** pass before a buy.
- **Automatic exits** – three take-profit levels, stop loss, breakeven stop after TP1, trailing stop, flow-reversal and sell-pressure exits, and time stop
- **Risk controls** – max open positions, daily loss limit, pause button, wallet-balance check.
- **Live dashboard** – KPIs, token radar, scanner table, candle chart with buy/sell volume, score breakdown, open positions, trade history, equity curve and event log.
- **Live-editable settings** – every strategy value can be changed from the dashboard instantly.
- **Resilient RPC layer** – priority queue, rate limiting, automatic back-off on HTTP 429, and optional multi-RPC round-robin / failover.
- **On-chain SOL/USD price** – read from the Pyth price feed account, so market-cap figures need no external price API.
- **Crash-safe** – open positions are stored in SQLite and restored on restart.
- **Optional ML filter** – train a small logistic-regression model from the data the bot collects.

---

## Dashboard preview

<img width="1440" height="2706" alt="dashboard" src="https://github.com/user-attachments/assets/541edc98-f5ea-4170-84bb-8acb688733c0" />

Settings drawer

<img width="1440" height="900" alt="settings" src="https://github.com/user-attachments/assets/da6d6527-9b13-4d1d-a0ea-b79766421f0c" />

</details>

| Area | What it shows |
|---|---|
| **Header** | WebSocket status, RPC rate/queue/429 counter, UTC clock, **Pause entries** and **Settings** buttons |
| **KPI row** | Wallet balance, total P&L, today's P&L, win rate, profit factor, max drawdown, expectancy per trade, break-even win rate |
| **Token universe** | Animated radar of tracked tokens (colour = score / momentum) |
| **Open positions** | Live P&L, entry vs. current market cap, size, take-profits hit, remaining size, age; copy-contract / Pump.fun / chart shortcuts |
| **Filter diagnostics** | Which gate blocks tokens most often (great for tuning) |
| **Token scanner** | Top tokens by score with market cap, buy %, holders, phase and the reason they are not yet entered |
| **Token detail** | Candle chart (5s) with buy/sell volume, entry line, intel chips, and per-component score bars |
| **Trade history / Equity curve / Event log** | Closed trades with exit reason, cumulative P&L, and a live log of every signal, reject, buy and sell |

---

## How the bot works

### 1. Architecture

<img width="2100" height="1200" alt="architecture" src="https://github.com/user-attachments/assets/9ac4e659-f6e1-4a94-b22c-44bd7b72e997" />

1. **Pump.fun program → Solana WebSocket.** `wsclient.js` subscribes to the program's logs (`logsSubscribe`) and reconnects automatically. Several WebSocket URLs can be supplied.
2. **Decoder.** Each `Program data:` log line is decoded into a `create` or `trade` event (mint, SOL amount, token amount, buy/sell, wallet, virtual reserves). If an event is missing from the logs, the bot falls back to fetching the transaction through the RPC queue.
3. **Strategy engine (`strategy.js`).** The heart of the bot. It keeps a rolling window of trades per token and runs a **1-second loop** that evaluates every token, applies the gates and manages open positions.
4. **Intel (`intel.js`).** For promising candidates only (to save RPC credits) it fetches token metadata (social links, image, description) and on-chain wallet history (creator history, who funded the early buyers).
5. **Attention (`attention.js`).** Measures how fast new people are piling in. Uses an optional external callout feed, or an on-chain proxy (new unique buyers and their acceleration) when no feed exists. Also detects FOMO.
6. **Live trader (`trader.js`).** Builds Pump.fun buy/sell instructions with the official `@pump-fun/pump-sdk`, signs them with your key and confirms the result on-chain. The private key never leaves the server.
7. **Dashboard server (`index.js`).** An Express + WebSocket server pushes a snapshot to the browser every second and accepts setting changes.
8. **SQLite (`bot.db`).** Stores trades, open positions, snapshots, wallet data and outcomes.

### 2. Entry pipeline

<img width="2100" height="1365" alt="entry-pipeline" src="https://github.com/user-attachments/assets/bcded700-a569-40ed-a3b5-09086ffd67a1" />

A token goes through these stages in order:

| # | Stage | What happens |
|---|---|---|
| 1 | **Discover** | A new token is created on Pump.fun, or an older one passes the radar (≥ 12 trades, ≥ 8 unique buyers and ≥ 55% buy volume in 30 s, inside your market-cap range). |
| 2 | **Observe** | The bot only watches for `watchSec` (default **20 s**). No decision is made earlier. |
| 3 | **Score** | A 0–100 score is recalculated every second from trade flow, momentum, acceleration, holder structure and intel. |
| 4 | **Hard rejects** | Instant, permanent disqualifiers that **no score can offset**: a single wallet holding > 25%, creator holding > `maxCreator`, top-10 holders > `maxTop10`, an early-buyer wallet cluster, market cap above max, serial-launcher creator (5+ tokens, zero successes), funder backing many creators, copy-cat token (3+ lookalikes), early wallets linked to the creator. |
| 5 | **Hard gates** | All must pass: observation done, market cap ≥ min, phase is **not** `parabolic` or `distribution`, score ≥ threshold, intel analysis finished (or timed out), no FOMO block, no creator-sell block, bot not halted (paused / daily loss limit), and the ML model agrees (only if enabled). |
| 6 | **Soft gates** | 8 momentum conditions are checked; at least `minPass` (default **6**) must pass. This tolerates one noisy metric without blocking a good setup. |
| 7 | **Confirm** | The conditions must keep holding for `confirmSec` (default **10**) one-second ticks. A bad second only lowers the counter by one instead of resetting it. |
| 8 | **Buy** | A market buy of `size` SOL is sent with the configured slippage, if fewer than `maxOpen` positions are open and the wallet can afford it. |

**Market phases** used by the gates: `launch` (< 20 s old), `accumulation`, `expansion` (acceleration and positive return – preferred), `parabolic` (rise above +50 % in 30 s or +100 % in 60 s – skipped to avoid buying the top) and `distribution` (sell-heavy and > 20 % below the peak – skipped).

**Creator selling is judged by the market, not blindly rejected.** When the creator sells, the bot measures for ~12–60 s whether other buyers *absorb* the supply: `ABSORBED` (small bonus), `neutral`, or `REJECTED` (large penalty, entry blocked). You can switch to "always reject if creator sells" with `creatorSellReject = 1`.

### 3. Scoring

The base score has these weighted parts (maximum points in brackets):

| Component | Pts | Measures |
|---|---|---|
| Flow | 30 | Buy pressure (wallet-capped) and unique buyer/seller ratio |
| Momentum | 25 | 30 s price return and how steadily price climbs |
| Acceleration | 20 | Growth in buyers, volume, transactions and price-rate vs. the previous 15 s |
| Structure | 15 | Top-10 holder concentration and curve progress |
| Safety | 10 | Creator holdings and largest single holder |
| Liquidity velocity | 5 | Net liquidity added per trade toward graduation |
| Social | 4 | Twitter/X, Telegram, website, description, image |
| Dev buy | 3 | Creator's initial buy size |
| Creator | 6 | Creator's past tokens that reached 3×; fresh wallets score lower |
| Wallet quality | 5 | Early buyers' historical hit-rate vs. the baseline |
| Attention | 10 | New-caller / buyer acceleration, diversity and quality |
| Creator exit | 4 | Bonus if the market absorbed a creator sell |

**Penalties** are subtracted for: top-10 > 45 %, bot-like bursts, wallet clusters, whale-dominated buying, wash trading, copy-cats, Mayhem mode, FOMO / price already multiplied (anti-chase), and a rejected creator sell.

An **organic score** (wallet diversity, timing spread, persistence, size variety) is calculated separately and used as one of the soft conditions.

### 4. Exit rules

<img width="2100" height="1170" alt="exit-rules" src="https://github.com/user-attachments/assets/5350a618-889e-4d47-94f0-c345ace1d141" />

Every open position is checked every second. The first rule that fires wins.

| Rule | Default | Action |
|---|---|---|
| **TP1** | +25 % | Sell 25 % of the *original* size; stop-loss moves to **breakeven** |
| **TP2** | +50 % | Sell another 25 % of the original size |
| **TP3** | +100 % | Sell another 25 % of the original size |
| **Stop loss** | −10 % | Sell everything (before TP1) |
| **Breakeven stop** | ≈ +1.25 % | After TP1, sell everything if profit falls back to the fee level |
| **Trailing stop** | after +20 % peak | Sell all if price falls 8 % (peak < 50 %), 12 % (peak 50–100 %) or 15 % (peak > 100 %) from the peak |
| **Flow reversal** | – | Buy pressure fading + price falling: sell 50 %, then the rest if it persists 10 s |
| **Sell pressure** | 30 s buy ratio < 35 % | Sell everything |
| **Time stop** | 240 s | If still below +8 % and no TP hit, sell everything |
| **Before graduation** | curve ≥ 92 % | Sell everything (the bot trades bonding curves only) |
| **Daily loss limit** | −0.15 SOL | No new entries for the rest of the UTC day |

Positions are saved to SQLite after every change, so a restart restores them.

---

## Requirements

- **Node.js 22.5 or newer is recommended.** The bot uses the built-in `node:sqlite` module. On older Node (≥ 18) install the optional `better-sqlite3` package instead.
- A **Solana mainnet RPC endpoint**. The free public endpoint (`api.mainnet-beta.solana.com`) is heavily rate-limited and **not suitable for live trading**; use a paid or free-tier provider (Helius, QuickNode, Triton, Alchemy, etc.). Using 2+ providers is even better.
- A **dedicated Solana wallet** funded with SOL (the secret key goes in `.env`).
- A machine that stays online (a small VPS works well).

---

## Installation

### 1. Get the code
```bash
git clone https://github.com/TINGLISE/auto-trading-bot-pumpfun-solana-V2.git
cd auto-trading-bot-pumpfun-solana-V2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your private config
```bash
nano .env
```
Configuration (`.env`)
```bash
# Solana mainnet RPC used for live trading and on-chain reads.
# Multi RPC: put several URLs on the same line separated by commas, e.g. RPC_URL=https://rpc-1.example,https://rpc-2.example
RPC_URL=https://api.mainnet-beta.solana.com

# Solana wallet secret key. Use either a base58 secret key or a 64-byte JSON array.
PRIVATE_KEY=your_private_key

# SOL amount used for each new entry. This value can also be changed live from the dashboard.
ENTRY_SIZE=0.05
```

### 4. Running the bot

```bash
npm start
```

## Open dashboard

You should see the wallet address and balance, then Dashboard: http://localhost:3000 (LIVE TRADING). Open http://localhost:3000 in your browser.

Opening the dashboard

After npm start prints Dashboard: http://localhost:3000, open the web UI like this:

### A) Bot runs on your own computer (easiest)

Keep the terminal running.
Open any browser (Chrome, Edge, Firefox, Safari).
Go to http://localhost:3000 (or http://yourIP:3000).
The header badge should say connected. If it says disconnected, retrying…, the bot is not running or the port is blocked.

### B) Bot runs on a VPS / remote server (safe way: SSH tunnel)

The dashboard has no password, so do not open port 3000 to the internet. Create a private tunnel from your computer instead:

bash
ssh -L 3000:localhost:3000 your-user@your-server-ip

Leave that SSH window open, then browse to http://localhost:3000 on your own computer. Everything is encrypted and only you can reach it.

Windows users: run the same command in PowerShell, or in PuTTY go to Connection → SSH → Tunnels, set Source port 3000, Destination localhost:3000, click Add, then connect.

### C) Open it from your phone (same Wi-Fi only)

Find your computer's local IP (ipconfig on Windows, ifconfig / ip a on Mac/Linux), for example 597.157.1.40
On the phone's browser open http://597.157.1.40:3000.
Only do this on a network you trust. For remote access from a phone, use the SSH tunnel (B) or a VPN such as Tailscale.

Changing the port: edit port: 3000 in src/config.js and restart.

## Settings reference

All values below are the **defaults** in `src/config.js` and can be edited live in the dashboard.

<details>
<summary><b>Entry</b></summary>

| Key | Default | Meaning |
|---|---|---|
| `thr` | 55 | Minimum score to enter |
| `minMcap` / `maxMcap` | 7000 / 100000 | Allowed market-cap range in USD |
| `watchSec` | 20 | Observation time before any entry |
| `confirmSec` | 10 | Seconds conditions must keep holding |
| `minOrganic` | 60 | Minimum organic-flow score |
| `minFlow` | 65 | Minimum flow score |
| `minBuyers` | 12 | Minimum unique buyers in the last 30 s |
| `minBP` | 0.58 | Minimum buy pressure (share of buy volume) |
| `minBSR` | 1.2 | Minimum unique-buyer / unique-seller ratio |
| `minBAcc` / `minVAcc` / `minTAcc` | 1.25 / 1.3 / 1.25 | Minimum buyer / volume / transaction acceleration |
| `minPass` | 6 | Soft conditions that must pass (out of 8) |
| `maxTop10` | 0.45 | Max share of supply held by the top-10 wallets |
| `maxCreator` | 0.10 | Max share of supply held by the creator |
| `analysisTimeout` | 12 | Seconds to wait for intel before continuing unverified (small penalty) |
| `para30` / `para60` | 0.5 / 1.0 | Rise in 30 s / 60 s that marks a token as `parabolic` |
| `useModel` / `minP` | 0 / 0 | Enable the ML filter; minimum probability (0 = break-even automatically) |

</details>

<details>
<summary><b>Intel filters</b></summary>

| Key | Default | Meaning |
|---|---|---|
| `requireSocial` / `minSocial` | 0 / 1 | Require social links (Twitter/Telegram/website) and how many |
| `requireCreator` | 1 | Wait for the creator-history check |
| `requireWallet` | 1 | Wait for the early-wallet analysis |
| `rejectCopycat` | 1 | Reject tokens with 3+ lookalikes |
| `creatorSellReject` | 0 | `1` = reject/exit whenever the creator sells (instead of judging absorption) |
| `absorbSec` / `absorbWin` | 12 / 20 | Absorption measuring time / comparison window |
| `cxTtl` | 120 | How long a creator-sell event stays relevant |

</details>

<details>
<summary><b>Older tokens (radar)</b></summary>

| Key | Default | Meaning |
|---|---|---|
| `discoverOld` | 1 | Also track tokens that were not launched while the bot ran |
| `radarTrades` / `radarBuyers` | 12 / 8 | Trades and unique buyers per 30 s needed to adopt a token |
| `maxAdopted` | 40 | Maximum older tokens tracked at once |
| `adoptExtra` | 5 | Extra score required for older tokens (less data) |

</details>

<details>
<summary><b>Attention radar</b></summary>

| Key | Default | Meaning |
|---|---|---|
| `requireAttention` | 0 | Only enter at attention stage 2–3 |
| `minCallers` / `minCalloutAccel` | 5 / 1.8 | Unique callers / acceleration needed for stage 2–3 |
| `minCallerQuality` | 0.3 | Minimum average reputation of callers |
| `maxFromCall` | 0.5 | Block if price already rose more than 50 % since the callout |
| `fomoMult` / `fomoMax` | 3 / 60 | Price multiple and FOMO score that trigger the anti-chase block |
| `trendingMc` | 400000 | Market cap treated as "trending" |
| `pullbackReentry` | 1 | Allow re-entry after a 8–25 % pullback following a FOMO spike |

</details>

<details>
<summary><b>Exit</b></summary>

| Key | Default | Meaning |
|---|---|---|
| `tp1` / `tp2` / `tp3` | 25 / 50 / 100 | Take-profit levels in % |
| `tpFrac` | 0.25 | Fraction of the original size sold at each take-profit (config only) |
| `sl` | 10 | Stop loss in % |
| `gradExit` | 0.92 | Exit at this curve progress (0 = off) |
| `timeStopSec` | 240 | Time stop in seconds (0 = off) |

</details>

<details>
<summary><b>Risk & execution</b></summary>

| Key | Default | Meaning |
|---|---|---|
| `size` | `ENTRY_SIZE` or 0.05 | SOL per trade |
| `maxOpen` | 3 | Maximum simultaneous positions |
| `maxDailyLoss` | 0.15 | Daily realized loss (SOL, UTC day) that halts new entries |
| `fee` | 1.25 | Protocol fee % used in metrics / breakeven |
| `slip` | 1.5 | Slippage tolerance % for live orders |
| `paused` | 0 | `1` = no new entries (the Pause button) |

</details>

---

## Limitations

- Single wallet, single strategy, one process.
- Performance depends heavily on RPC speed and quality; slow RPC means worse fills.
- Past behaviour of tokens does not predict future results; the filters reduce, but do not remove, the risk of rugs and bot-manipulated tokens.
- Settings changed in the dashboard are in-memory only.

---
