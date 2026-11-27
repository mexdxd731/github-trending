# Submarine Toolbox

Modular submarine simulation: 6-DOF hydrodynamics, 17 interacting
subsystems (propulsion, ballast, sonar, TMA, damage control, ...) and a live
3D viewer with PyQt5 dock panels. Each subsystem is a plug-in module on a
shared signal bus, so it is easy to extend.

![Main window: chase camera with HUD, ship-state plots, helm panel and broadband sonar waterfall](docs/figures/gui_overview.png)

## Features

- **Fossen 6-DOF dynamics** with RK4 at 50 Hz; ballast, trim, flooding and
  control surfaces all feed the equations of motion.
- **Unbounded world.** The seafloor is a deterministic procedural field
  (banks, ridges, seamounts); terrain streams in around the boat, traffic is
  recycled around own ship, and the 3D view uses a floating origin, so you can
  sail anywhere.
- **Acoustics and sensors.** Passive/active sonar equations, layer effects,
  baffles and towed array, own-ship signature, radar/ESM, INS + GPS, and
  bearing-only target motion analysis.
- **Casualties.** Compartment flooding and fire, hydraulics leaks, battery
  load shedding, atmosphere control, endurance.
- **Cockpit-style UI.** Keyboard helm with autopilot or manual control, HUD
  with compass tape, depth gauge and alerts, contact labels, four camera
  modes, and an in-app help overlay (H).
- **Fast.** About 90 µs per sim step, so time compression up to ×100.

![Chase camera with HUD: nav block, compass tape, depth gauge with layer/test/crush/seafloor marks](docs/figures/chase_hud.png)

## Install

Python ≥ 3.9.

```bash
git clone https://github.com/gaschenb/Submarine-Toolbox.git 
cd Submarine-Toolbox
pip install -r requirements.txt
pip install -e .
```

## Run

```bash
submarine-toolbox
# or
python -m submarine_toolbox.main
```

Click the 3D view so it has keyboard focus, then press **H** for controls.

## Controls

Helm keys drive autopilot orders, or the raw actuators in manual mode
(M switches between them without a jump).

| Key | Action |
|---|---|
| W / S | speed ±1 kn (manual: shaft rpm ±10) |
| A / D | heading ∓5° (manual: rudder) |
| R / F | rise / fall 10 m (manual: planes) |
| Shift + W S A D R F | ×5 step |
| 1 – 4 | depth preset 15 / 40 / 100 / 200 m |
| X | all stop |
| L | hold current course and depth |
| M | autopilot ⇄ manual |
| P | active sonar ping |
| T | towed array deploy / recover |
| U / N | periscope / snorkel up-down (periscope depth only) |
| G | GPS fix (needs a mast at periscope depth) |
| Ctrl+B | emergency blow |
| Space | pause / resume |
| [ / ] | time compression down / up (×1 – ×100) |
| C / V | cycle camera (chase / orbit / top / free) / reset camera |
| K | contact labels on / off |
| F2 / F11 | hide panels / fullscreen |
| H or F1 / Esc | help overlay / close help and refocus the 3D view |
| Mouse | drag to orbit, wheel to zoom, Ctrl-drag to pan |

All subsystem controls are also available in the dock panels (View menu).

![In-app help overlay (H), generated from the same keymap the shortcuts use](docs/figures/help_overlay.png)

## Architecture

```
submarine_toolbox/
├── core/
│   ├── simulation.py        # fixed-timestep engine (RK4), shared bus
│   └── subsystem.py         # Subsystem base class (update + tau)
├── dynamics/
│   ├── vessel.py            # notional ~1500 t SSK parameters
│   └── rigid_body.py        # Fossen 6-DOF: M ν̇ + C ν + D ν + g(η) = τ
├── subsystems/
│   ├── propulsion.py        # shaft lag, Kt/Kq prop model, cavitation flag
│   ├── power.py             # battery SOC, hotel load, diesel/snorkel charge
│   ├── ballast.py           # MBT, variable ballast, trim, HP air, emerg. blow
│   ├── control_surfaces.py  # rate-limited rudder + stern planes
│   ├── autopilot.py         # speed-scheduled heading/depth/speed hold
│   ├── environment.py       # SVP, current, sea state, bathymetry sampling
│   ├── contacts.py          # ambient traffic, recycled around own ship
│   ├── signature.py         # own radiated SL + counter-detection radius
│   ├── sonar.py             # passive suite (baffles, towed array), active
│   ├── atmosphere.py        # O2/CO2 balance, scrubbers, O2 gen + bank
│   ├── masts.py             # mast interlocks, surface radar, ESM
│   ├── navigation.py        # INS drift model + GPS fixes at PD
│   ├── tma.py               # bearing-only TMA (Levenberg-Marquardt)
│   ├── damage.py            # compartments, flooding, fire, crush depth
│   ├── hydraulics.py        # plant pressure, leaks, actuator dependency
│   ├── comms.py             # VLF wire / SATCOM mast, broadcast schedule
│   └── endurance.py         # diesel fuel, provisions, fresh water
├── world/
│   └── bathymetry.py        # hashed value-noise fBm seafloor, unbounded
└── gui/
    ├── main_window.py       # docks, menus, keymap wiring, paced sim loop
    ├── controls.py          # keymap (single source) + command controller
    ├── hud.py               # QPainter HUD, compass, depth gauge, help
    ├── viewer3d.py          # GL: streamed terrain, floating origin, cams
    └── panels/              # ship_control / acoustics / tactical / ship_systems
```

## Dynamics and world

Fossen 6-DOF model (M ν̇ + C(ν)ν + D(ν)ν + g(η) = τ) integrated with RK4;
the autopilot closes heading, depth and speed loops on it. Heading and pitch
loops invert the rudder/plane lift (~u²), so the closed-loop response is the
same from 3 to 18 kn. Depth commands a vertical rate (limited by plane
authority, with anti-windup), and below ~6 kn variable ballast takes over
the share the planes cannot deliver, so depth changes work down to a hover.

![Autopilot step responses: heading, depth with pitch, speed](docs/figures/autopilot_response.png)

The seafloor is a hashed value-noise fBm field with seamounts, evaluated on
demand anywhere, so there is no map edge. Grounding, keel clearance and the
terrain-ahead warning use it.

![Procedural bathymetry with a 2.5 h track and the depth profile under the keel](docs/figures/bathymetry_track.png)

## Simulated Systems

**Damage control.** Five compartments (FWD/CONTROL/MACHINERY/ENGINE/AFT).
Breaches flood at Cd·A·sqrt(2g·depth); bilge pumps derate with depth
(150 m head limit); open WT doors equalize flooding into neighbours.
Flood weight and pitch moment feed the 6-DOF dynamics — a large breach
at depth genuinely requires speed, lightening, and possibly an emergency
blow, and can be unrecoverable. Fires need O2, dump CO2 into the
atmosphere model, and accumulate equipment damage (engine room ->
propulsion limit, machinery -> atmosphere equipment). Beyond crush depth
the hull starts failing with progressive breaching; the procedural
seafloor (mean 480 m, banks and seamounts) grounds the boat.

**Hydraulics.** Plant pressure bleeds with control-surface activity and
recovers on the (electric) pump. Leaks drain fluid until isolated; one
reserve refill. Low pressure slows plane/rudder slew and freezes masts.

**Comms.** Shore broadcasts every 10 min. VLF floating wire receives
(delayed) down to 50 m; the comms mast at PD gives two-way traffic and
drains the outbox. Missed-broadcast count is the discipline metric.

**Endurance.** Diesel fuel burns with generator output (SFC 0.22 kg/kWh)
and gates snorkel charging; crew consumes food and fresh water; the
distiller replenishes water while powered. Bilge pumps add a noise
component to the acoustic signature.

**Atmosphere.** Crew O2 consumption / CO2 production against hull volume;
electrolytic O2 generator, scrubbers, emergency O2 bank, and free
ventilation when surfaced or snorkeling. Equipment draws electrical load
and honors load shedding. CAUTION/DANGER thresholds.

**Electrical.** Consumers publish `load.*` [W]; the plant sums them with
propulsion and hotel load. Bus voltage sags with SOC and current
(V = OCV(SOC) − I·R). Below 10% SOC non-vital loads shed automatically.

**Masts, radar, ESM.** Masts (periscope/ESM/radar/snorkel) auto-house
below 18 m. The surface-search radar detects surface contacts to the
4/3-earth radar horizon but is ESM-detectable by capable contacts at
~1.5x that range. Own ESM passively intercepts contacts' navigation
radars — bearing, emitter class, strength.

**Navigation.** INS position error grows as a velocity-bias random walk;
GPS (any raised mast at PD) snaps it back to ~5 m, automatically or on
demand.

**TMA.** Bearing-only target motion analysis on the tracked passive
contact: batch Levenberg-Marquardt fit of a constant-velocity solution
over multiple range-hypothesis initializations, using INS positions and
measured (noisy) bearings. Own-ship leg changes are required for range
observability; solution quality is honest about it (with a two-leg
geometry at ~10 km the range typically lands within a few percent).

![Two-leg bearing-only TMA: solution after each leg and error vs time](docs/figures/tma_two_leg.png)

## Acoustics model

Sonar equations with hybrid spreading TL = 20 log r (r ≤ 1 km) +
10 log r/1 km beyond, plus absorption and a 12 dB cross-layer penalty:

    passive:  SNRx = SL − TL − NL + DI − DT
    active:   SNRx = SL_ping − 2·TL + TS − NL + DI − DT

NL power-sums ambient (sea-state dependent) with own self-noise derived
from the signature subsystem — running quiet directly extends your own
detection ranges. Hull arrays are baffled ±30° astern; deploying the
towed array removes the baffle and adds 3 dB DI. Bearing/range
measurement noise scales inversely with SNR. Active pings publish a
counter-detection radius (everyone hears you). The Signature panel shows
the component breakdown (machinery/flow/cavitation/snorkel/blow) and an
estimated counter-detection range against a nominal threat sensor.

**Conventions.** SNAME/NED: body x fwd, y stbd, z down; depth positive.
Positive rudder → starboard turn; positive planes → nose up. MBT fill
1.0 = flooded (submerged trim), 0.0 = blown (surfaced).

**Signal bus.** `sim.bus` is a flat dict. Orders (`order.*`), actuator
commands (`cmd.*`), and telemetry (`propulsion.*`, `power.*`,
`ballast.*`, `state.*`). Panels write orders; subsystems read commands
and publish telemetry; dynamics reads mass properties from
`ballast.weight/xg/zg`.

## Adding a subsystem

```python
from submarine_toolbox.core.subsystem import Subsystem

class Sonar(Subsystem):
    name = "sonar"
    def update(self, dt):
        self.put("sonar.contacts", [...])
    # def tau(self): ...   # only if it exerts forces
```

Register with `sim.add(Sonar)`, add a panel in `gui/panels/`, dock it in
`main_window.py`.

## Headless use

```python
from submarine_toolbox import Simulation
from submarine_toolbox.subsystems import build_default_boat
import numpy as np

sim = build_default_boat(Simulation())
sim.bus["order.depth"] = 100.0
sim.bus["order.heading"] = np.radians(90)
sim.bus["order.speed"] = 4.0
sim.step(30000)   # 600 s at dt=0.02
print(sim.bus["state.depth"], sim.eta)
```

## Roadmap

- Scenario scripting / mission generator; save-load of sim state
- Convergence-zone & bottom-bounce propagation; narrowband sonar + demon lines
- Periscope visual model; contact AI reactions (evasion, counter-detection responses)

All coefficients are notional (plausible magnitudes for a small SSK), not
identified from any real hull.
