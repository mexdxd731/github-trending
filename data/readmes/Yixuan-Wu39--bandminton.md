# Bandminton

[![Test](https://github.com/Yixuan-Wu39/bandminton/actions/workflows/test.yml/badge.svg)](https://github.com/Yixuan-Wu39/bandminton/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Open, safety-conscious badminton motion analysis for Xiaomi Vela wearables.**

Bandminton is a lightweight Vela JS Quick App and data toolchain for exploring
badminton swing structure on constrained wearables. It is designed around a
simple principle: classify the *shape and direction* of a motion trajectory,
then analyse personal swing intensity separately.

The project currently targets right-handed use and four structural classes:

- **Forehand overhead** (`forehand_overhead`)
- **Backhand overhead** (`backhand_overhead`)
- **Forehand underhand** (`forehand_underhand`)
- **Backhand underhand** (`backhand_underhand`)

It does **not** claim to measure racket-head speed, shuttle speed, calories,
medical metrics, or professional coaching quality.

## What is in this repository

- A Vela JS main application for on-device swing feedback and session portraits.
- A separate collector application that records continuous, labelled
  accelerometer segments without forcing on-device single-swing splits.
- Reproducible Node.js scripts for data recovery, de-duplication, feature
  extraction, model training, validation, and on-band model packing.
- A lightweight, on-device trajectory model and state machine.
- Tests, device manifests, and release-safety documentation.

The Android receiver, raw volunteer recordings, signed builds, and proprietary
SDK binaries are deliberately excluded from the public repository.

## Portability and localisation

The current implementation is Xiaomi Vela-specific, but the core design is not:
continuous signed three-axis acceleration, candidate-motion gating, trajectory
features, a compact classifier, and session-level aggregation can be ported to
other smartwatch and fitness-band platforms. A port must still be treated as a
new device-validation effort. Sampling rate, axis conventions, timestamps,
sensor calibration, application lifecycle, display constraints, power behaviour,
and permission models vary by vendor and can materially affect recognition.

The wearable UI is intentionally Chinese in this first release. Xiaomi's band
ecosystem and the project's initial real-device users are primarily Chinese, so
the on-device interface prioritises clear Chinese use during installation,
collection, and training. The engineering entry points, data contracts, model
documentation, and contribution process are maintained in English to support
international review and ports. Localised UI translations are welcome when they
are tested on the target device.

## Future sensor integration

The present classifier uses accelerometer trajectories only. This is a deliberate
baseline rather than a claim that additional sensors are unnecessary.

- **Gyroscope integration:** where a wearable exposes reliable, documented,
  time-synchronised gyroscope samples, a future port can evaluate angular
  velocity and orientation-change features alongside acceleration. The target is
  improved motion-context and rejection behaviour, especially for structurally
  similar wrist paths. Gyroscope data will not be assumed available across
  Xiaomi or other vendors, and any fusion model must be calibrated and evaluated
  per device family before release.
- **Heart-rate integration:** where continuous exercise heart-rate access is
  officially supported, heart rate may be used as optional session-load context
  (for example, time in a relative intensity range). It will not be used as an
  input to determine a swing class, as a medical measurement, or as the basis
  of a calorie claim. Availability, sampling cadence, wear-state quality,
  consent, privacy handling, and battery cost must be verified for each
  platform before this capability is enabled.

## Current validation status

An internal evaluation associated with the initial right-handed trajectory
model reported **90.8% accuracy** and **90.7% macro F1** in controlled air
swings. It used leave-one-recording-out validation over 130 labelled swing
windows from 13 recordings. This is a development signal, not a claim about
real matches, other users, left-handed wear, or every Xiaomi wearable. Read
the [model card](docs/MODEL_CARD.md) before quoting or comparing this result.

## Safety and compatibility

Bandminton is a normal Vela Quick App, not firmware. It never flashes device
software, accesses system partitions, or starts accelerometer collection until
the wearer taps **Start**. Still, third-party RPK installation has device and
firmware compatibility risk. Only Xiaomi Smart Band 9 Pro has a project
validation path; other packages remain unverified until community testing.

Read [Safety and Testing](docs/safety-and-testing.md) and
[Device Adaptation](docs/device-adaptation.md) before sideloading an RPK.
For the engineering path behind the current system, read the
[development history](docs/DEVELOPMENT_HISTORY.md).

## Development

Prerequisites:

- Node.js 16 or newer
- pnpm
- Xiaomi AIoT Toolkit / AIoT IDE for Vela builds

```powershell
pnpm install
pnpm test
pnpm run build:band9pro
```

The JSC build script stages the project into an ASCII-only temporary directory
before invoking the Vela toolchain. This avoids known Windows path issues with
non-ASCII workspace paths.

Useful commands:

```powershell
pnpm run build:band9pro
pnpm run build:band10pro
pnpm run build:band9
pnpm run build:band10
pnpm run build:collector
pnpm run ml:pipeline -- "C:\path\to\training-manifest.json"
pnpm run ml:check -- "C:\path\to\training-manifest.json"
```

## Project direction

See [Roadmap](docs/ROADMAP.md), [Maintenance Policy](docs/MAINTAINING.md),
[Architecture](docs/ARCHITECTURE.md), and [Contributing](CONTRIBUTING.md).

## License

Bandminton source code is available under the [MIT License](LICENSE).

## Status

This is an active experimental project. The main goals are reproducible
evaluation, conservative claims, safe device testing, and community-led
validation across real hardware.
