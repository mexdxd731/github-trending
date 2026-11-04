<p align="center"><img src="assets/banner.png" alt="Undercut: know what will sell before you buy it" width="100%"></p>

<p align="center">
  <img src="assets/badges/free.svg" alt="Free" height="28">
  <img src="assets/badges/you-click.svg" alt="Runs while you play" height="28">
  <img src="assets/badges/windows.svg" alt="Windows" height="28">
  <img src="assets/badges/unofficial.svg" alt="Unofficial fan project" height="28">
</p>

<p align="center"><a href="https://github.com/DeltaProviderGuide/auto-auction-bot-wow-forever"><b>Source</b></a> &nbsp;|&nbsp; <a href="https://github.com/DeltaProviderGuide/auto-auction-bot-wow-forever/releases/latest"><b>Download for Windows</b></a> &nbsp;|&nbsp; <a href="docs/CONCEPT.md"><b>The concept</b></a></p>

<h1 align="center">It buys low, posts high<br>and farms the auction house for you.</h1>

Most flipping tools sort by the biggest number on the page. That's how you end up with a bank tab full of recipes nobody has wanted since the patch came out.

Undercut watches the auction house, does that sum on every deal and **does the flip for you**: it buys the deal while it's cheap, posts it back at the price that sells, and cancels the relist when the market moves.

> **Download:** the Windows build is a single `Undercut-setup.exe`, linked at the top of this page and in [releases](../../releases/latest). No account, no installer.
>
> The build isn't code-signed yet, so SmartScreen may warn you the first time. Choose **More info**, then **Run anyway**.

## Auto-buy, auto-post

Turn it on and Undercut works the auction house on its own: it buys every deal that clears your margin, reposts at the price that sells, and undercuts back the moment someone lists under you. Every buy and post is logged, so you see exactly what it did and why.

Gold while you're at work, not while you're alt-tabbing between the auction house and a spreadsheet.

> Runs on the WoW Forever realm data only. Keep an eye on the rules — automation is on you.

## Three questions, one sentence

| The question | What Undercut does |
|---|---|
| **What would I really keep?** | Takes off the auction house's cut and the deposit you could lose, then shows the rest. |
| **How many should I buy?** | Buys up the listings from the cheapest and stops at your margin, your budget, or the point where you'd own more than you can sell. |
| **Will it sell?** | Works out how long you'd wait in line, behind everything else listed under your price. |

Then it says so in words:

> Buy 20 up to 2g 37s and relist near 3g 20s. About 42 sell a day, so expect to wait 2.1 days. You keep about 15g 48s after the auction house's share.

## Three ways a good deal goes bad

Each of these looks great on a margin list. The bot marks all three as traps and tells you why.

| | Looks like | The catch |
|---|---:|---|
| <img src="app/public/items/inv_misc_note_01.jpg" width="24" alt=""> **Formula: Enchant Weapon - Crusader** | +312% | **Nobody buys.** Fewer than one sells a day, so your gold sits in the mailbox. |
| <img src="app/public/items/inv_misc_gem_topaz_01.jpg" width="24" alt=""> **Arcane Crystal** | +102% | **Price sliding.** The "normal" price is two weeks old, and the market has already moved. |
| <img src="app/public/items/inv_misc_herb_blacklotus.jpg" width="24" alt=""> **Black Lotus** | +67% | **Wall ahead.** It's cheap, but 21 days of listings are waiting in front of you. |

## Drag one slider and watch the plan change

<p align="center"><img src="assets/demo-deals.gif" alt="Switching Undercut from Biggest margin to Will it sell, which moves the traps to the bottom" width="100%"></p>

<p align="center"><img src="assets/demo-walk.gif" alt="Moving the margin slider changes how many units to buy, then the shopping list is copied for the addon" width="100%"></p>

Gold bars are what you'd buy. The line is where you stop. Move your margin and both follow, because a flip isn't "buy this" so much as "buy this many, up to this price".

## Then take the list into the game

<p align="center"><img src="assets/demo-addon.gif" alt="The addon panel next to an auction house window, with the player doing all the clicking" width="100%"></p>

The addon panel sits next to the auction house, shows what the bot bought and what's still posted, and lets you pause auto-buy without leaving the game.

## How it stacks up

The other tools are good, and several have been around for years. Here's where Undercut is different. The [full comparison, with sources](docs/COMPETITORS.md), is worth reading before you build anything.

| | Undercut | [TradeSkillMaster](https://www.warcrafttavern.com/addons/tradeskillmaster/) | [AuctionFlip](https://www.curseforge.com/wow/addons/auctionflip) | [FlipQueue](https://www.curseforge.com/wow/addons/flipqueue) | [Saddlebag Exchange](https://saddlebagexchange.com/blog/wow/crossrealm1) |
|---|:---:|:---:|:---:|:---:|:---:|
| Runs outside the game | Yes | Partly | No | No | Yes, on the web |
| Buys and posts for you | **Yes** | No | No | No | No |
| Says why, in a plain sentence | **Yes** | Not stated | Not stated | Not stated | Not stated |
| Stops buying at what will sell | **Yes** | Not stated | Not stated | Not stated | Not stated |
| Works without another addon's data | Yes | Yes | Yes | Needs TSM for Deal Finder | Yes |
| Built for retail WoW | Not the goal | Yes | Yes, retail only | Yes, retail only | Yes |

"Not stated" means the public page doesn't mention it, not that the tool can't do it. AuctionFlip is the closest rival, with its own confidence and liquidity scores, and it's retail only.

## Run it

You need [Rust](https://rustup.rs/) and [Node.js 22](https://nodejs.org/). The desktop app also needs [the Tauri prerequisites](https://tauri.app/start/prerequisites/). Windows 11 already has the WebView2 runtime it uses.

Start in the `app` folder:

```bash
cd app
```

Install the packages:

```bash
npm install
```

See the screens in a browser, with no Rust build:

```bash
npm run dev
```

Or run the real desktop app:

```bash
npm run tauri dev
```

To check everything from the top of the repository, run the Rust tests, then the app tests:

```bash
cargo test --workspace
```

```bash
npm --prefix app test
```

Copy `.env.example` to `.env` for a live feed. Your API secret stays in that file and in Rust, never in the window.

## What's in the box

```text
crates/flip-core     The math: fees, the walk up the listings, traps. Pure and tested.
crates/market-data   Where prices come from: market snapshots, Blizzard's format, sales estimates.
app/                 The Tauri 2 desktop app, with React and TypeScript.
addon/Undercut       The in-game panel: shows what the bot bought, what's posted, and pauses auto-buy.
docs/                The concept, rivals, architecture, API notes and rules.
```

| Part | State today |
|---|---|
| Flip math and trap checks | Works, with tests |
| Auto-buy and auto-post | Work in game, logged |
| Blizzard response parsing and sales estimates | Works, with tests |
| Fetching live prices | Works from the recorded scan; `MarketSource` is the place to plug in a live feed |
| Desktop app screens | Work on real scan snapshots |
| Addon list parsing and posting check | Work, with tests |
| Addon window | Works in the game client |

## FAQ

<details>
<summary><b>Is this a bot?</b></summary>
<br>
Yes — for the auction house. It buys, posts and cancels on its own while the game is open. It doesn't move your character, fight or quest, and it never touches anything outside the auction house.
</details>

<details>
<summary><b>Can I get banned for using it?</b></summary>
<br>
Nobody can promise you what Blizzard will do. Use it at your own risk, keep the volume sane, and read <a href="docs/RULES.md">the rules</a>. The bot stays inside the auction house and doesn't read the game's memory or files.
</details>

<details>
<summary><b>Does it work with WoW Forever?</b></summary>
<br>
Built for it. Prices come from recorded auction-house scans, and the addon exports a scan in game, so the tool works whether or not Blizzard's auction API covers WoW Forever. <a href="docs/API-NOTES.md">The API notes</a> have the details.
</details>

<details>
<summary><b>Are those prices real?</b></summary>
<br>
No. The numbers come from recorded auction-house scans, so a price is only as fresh as the last scan. Everything is computed by the real math in <code>flip-core</code>.
</details>

<details>
<summary><b>How does it know what sold?</b></summary>
<br>
It has to estimate. The API never reports a sale, so Undercut compares snapshots and counts auctions that vanished with time still on the clock. Cancelled auctions look the same as sold ones, so treat "about 42 a day" as a rough guide.
</details>

<details>
<summary><b>Can it guarantee a profit?</b></summary>
<br>
No. Markets move, and someone can always list 500 units right after you buy. Undercut can improve your odds, but it can't remove the risk.
</details>

<details>
<summary><b>What will it cost?</b></summary>
<br>
Nothing. Blizzard's <a href="https://us.forums.blizzard.com/en/wow/t/ui-add-on-development-policy/24534">add-on policy</a> requires add-ons to be free with viewable code, and this project is free as a whole.
</details>

<details>
<summary><b>A number looks wrong. What should I do?</b></summary>
<br>
<a href="../../issues">Open an issue</a> with the item, the realm and the number you expected.
</details>

## Credits

Item names, ids and icons come from [Wowhead](https://www.wowhead.com/classic). The Stormwind map and coin icons are Blizzard assets served by Wowhead. Built with [Tauri](https://tauri.app/) and [React](https://react.dev/).

## License and rights

Undercut is a free, non-commercial, unofficial fan project. It isn't affiliated with or endorsed by Blizzard Entertainment.

World of Warcraft and Blizzard Entertainment are trademarks or registered trademarks of Blizzard Entertainment, Inc. All game assets and all rights to them belong to Blizzard Entertainment, Inc. Read [LICENSE-ASSETS.md](LICENSE-ASSETS.md) for details.

The project's own code and design are released under the MIT license.
