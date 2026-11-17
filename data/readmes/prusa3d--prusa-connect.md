<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/src/assets/logo/prusa-dark.svg">
    <img src="docs/src/assets/logo/prusa-light.svg" alt="Prusa" width="220">
  </picture>
</p>

<h1 align="center">Connect</h1>

<p align="center"><strong>Bring your own hardware. We bring the REST.</strong></p>

<div align="center">

[![CI](https://github.com/prusa3d/prusa-connect/actions/workflows/ci.yml/badge.svg)](https://github.com/prusa3d/prusa-connect/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/prusa3d/prusa-connect?include_prereleases&label=release)](https://github.com/prusa3d/prusa-connect/releases)
[![Go](https://img.shields.io/github/go-mod/go-version/prusa3d/prusa-connect?label=go)](go.mod)
[![Licence](https://img.shields.io/badge/licence-OCL%20v1.1%20%2B%20Micro%20%2B%20NoSaaS%20%2B%20SWAtt-orange)](LICENSE)

</div>

Prusa Connect is a server for your 3D printers that you run yourself. It is a
single Go binary with the web app inside, built for Linux, Windows, macOS and
the Raspberry Pi. Download it, start it on any computer you have, and open it
in a browser.

- No cloud. Your printers connect to your own server over your own network,
  and people sign in with accounts that live on that server.
- Your data stays with you. Accounts, printers, print history and print files
  are kept on the machine the server runs on.
- Not only Prusa. The driver for Prusa printers is built in. Drivers add
  printers of other makers, and anybody can write one.
- Open to your own tools. A REST API, live events and MQTT give other programs
  the same data the web app shows.

> [!WARNING]
> Prusa Connect is in public beta. The releases are 0.x pre-releases, and the
> configuration, the API and the extension SDK can still change from one
> release to the next. Back up your data before you update.

## What it does

- Your fleet on one screen: the state, temperatures and progress of every
  printer, live.
- Prints from the browser. Send a G-code file to a printer and start it, then
  pause, resume or stop the print.
- Accounts and permissions. People sign in with a password or through an
  OpenID Connect provider, and each person gets only the printers and actions
  you give them.
- Integrations: a REST API with its own reference, server-sent events, and
  event sinks for MQTT, AMQP, Kafka and webhooks.
- Extensions. Install them from the marketplace, or write your own against the
  SDK.
- From one printer to a farm: a Raspberry Pi from the Zero up, a NAS, a
  server, Docker or Kubernetes. The load test runs 400 simulated printers
  against one server.

The server reads the extension marketplace and checks for updates over the
internet. `core.marketplace.enabled: false` and `core.upgrade.enabled: false`
in `config.yaml` switch these off.

## Supported printers

Prusa Connect knows these Prusa printers:

| family | models |
| --- | --- |
| CORE One | CORE One, CORE One L, CORE One INDX, CORE One L INDX |
| MK4 | MK4, MK4S |
| MK3.9 and MK3.5 | MK3.9, MK3.9S, MK3.5, MK3.5S |
| XL | XL |
| MINI | MINI |

[Device models](docs/src/content/docs/device-models.md) lists every model the
server carries, and
[the firmware support matrix](docs/src/content/docs/prusa-command-architecture.md)
says which commands each model accepts, and from which firmware version.

### Printers of other makers

Prusa Connect is not tied to one vendor. The server talks to a printer through
a driver, and the SDK in [`sdk/connectorapi`](sdk/connectorapi) is the contract
every driver implements. The Prusa driver and a driver from the community pass
the same conformance suite, so a driver for another maker works like the Prusa
one.

[`examples/adapters/moonraker`](examples/adapters/moonraker) is an example
driver for Klipper printers that run Moonraker.
[Write a driver](docs/src/content/docs/writing-a-driver.md) takes you from an
empty directory to a driver that passes the suite. `make scaffold-driver`
writes the first files for you.

## Quick start

### Download a release

1. Open [Releases](https://github.com/prusa3d/prusa-connect/releases) and
   download the file for your machine. There are files for Linux, the
   Raspberry Pi, Windows and macOS.
2. Start it. On Linux and macOS, run `chmod +x` on the file first.
3. Open `http://<this computer>:8080/` in a browser and answer the questions
   of the setup wizard.

[Install from a release](docs/src/content/docs/install-from-a-release.md)
says which file you need, how to check it, and how to run it as a service.

### Run it in Docker

```bash
docker compose -f docker-compose.local.yml up -d prusa-connect
```

Then open `http://localhost:8080/`. [Container deployment](docs/src/content/docs/container.md)
covers the image, its ports, the writable paths and the health checks.

### Try it with no printer

```bash
make demo
```

The demo builds the server and connects a fleet of simulated printers to it.
When the printers have arrived, it prints the address to open and an account
to sign in with. Ctrl+C stops everything. It needs Go and pnpm, see
[Build from source](#build-from-source).

## Connect a printer

A Prusa printer finds the server through a file on a USB drive. Open the
**Add a printer** page in the web app: its first step downloads the file with
the address of your server filled in. It looks like this:

```ini
[service::connect]
hostname = 192.168.1.100
port = 8080
tls = false
```

Put it in the top folder of the drive. Then:

1. Insert the drive into the printer.
2. Open **Settings**, **Network**, **Prusa Connect** and choose
   **Load Settings**.
3. Choose **Add Printer to Connect**. The printer shows a code.
4. On the **Add a printer** page, check that the code matches the display of
   the printer, and choose **Approve**.

The printer gets its token when you approve it, so the file holds none. You
can encrypt the connection with a certificate of your own, see
[Custom certificates](docs/src/content/docs/certificates.md).

## Extend it

There are three ways to add something:

- A **module** is a separate program that the server starts and supervises.
  It can add pages and API routes, keep its own records and publish events.
  When it fails, the server restarts it.
- A **builtin** is compiled into the server. The Prusa printer driver is one.
- A **script** is an expression in the configuration file. It turns an event
  into messages that go to a web address or back onto the event stream.

Your extension lives in your own repository and is built against the SDK in
[`sdk/`](sdk/README.md). [Write a module](docs/src/content/docs/writing-a-module.md)
is the guide, and `make new-module` writes the first files for you.

## Documentation

The documentation lives in [`docs/src/content/docs/`](docs/src/content/docs/),
and `make docs` builds it into a site. Good places to start:

- [Getting started](docs/src/content/docs/getting-started.md): start the server
  with a simulated fleet, read a printer over the API, then connect a real one.
- [Configuration](docs/src/content/docs/config.md): the one YAML file the
  server reads, and every key with its type and default.
- [Architecture](docs/src/content/docs/architecture.md): how the data of a
  printer reaches an API client, and which package holds each step.
- [Human authentication](docs/src/content/docs/human-auth.md): how a person
  signs in, and the contract an identity provider implements.
- [Extension SDK](sdk/README.md): the contracts an extension is built against.
- [Server-sent events](docs/src/content/docs/sse-overview.md) and
  [MQTT](docs/src/content/docs/mqtt-overview.md): two ways to follow events
  from another program.
- [The printer protocol](docs/src/content/docs/prusa-xbuddy-websocket-protocol.md):
  registration, the WebSocket messages, commands and file transfer.

A running server also serves its API reference at `/docs` and the OpenAPI
document at `/openapi.json`.

## Build from source

You need:

- Go 1.26.11 or newer, the version `go.mod` names.
- make with a POSIX shell. On Windows, use Git Bash.
- Node.js and pnpm, only for the web app and the documentation. The `make`
  targets turn pnpm on through corepack, or offer to install it.

```bash
make run    # build the server and run it
make test   # run the Go unit tests
make        # list every target
```

The printer simulator speaks the same WebSocket protocol as the firmware, so
you can work with no hardware.
`go run ./tools/printersim -url http://127.0.0.1:8080 -model MK4 -count 5`
connects five simulated printers to a running server. The
[printer simulator](docs/src/content/docs/emulator.md) page has the details.

Where to find things:

| folder | what it holds |
| --- | --- |
| `internal/` | the core: printer connections, events, permissions and the HTTP API |
| `sdk/` | the contracts that extensions are built against |
| `adapters/` | the extensions built into the server: storage, databases, sign-in, cameras and event sinks |
| `extensions/` | modules maintained by Prusa, such as the slicer and fleet statistics |
| `examples/` | example drivers and modules to start from |
| `frontend/` | the web app |
| `packages/` | the TypeScript client, the Svelte component library, the lint and format configuration, and modules |
| `docs/` | the documentation |

## Contributing

Bug reports and pull requests are welcome. For a larger change, open an
[issue](https://github.com/prusa3d/prusa-connect/issues) first, so we can agree
on the approach before you write the code.

Every author of a pull request signs the
[contributor licence agreement](CLA.md) once, by a comment in the pull
request. [CONTRIBUTING.md](CONTRIBUTING.md) says how.

## Security

Please do not report a vulnerability in a public issue. [SECURITY.md](SECURITY.md)
says where to send it.

## Licence

Released under **OCL v1.1 + Micro v1 + NoSaaS v1 + SWAtt v1**. That is the
[Open Community License v1.1](https://github.com/OpenCommunityLicence/OpenCommunityLicence)
with the Micro Business, Software Specific Use and Software Attribution
add-ons. [`LICENSE`](LICENSE) holds all four texts, and they are what counts.
In short:

- For non-commercial use, you may use, copy, change and take the project apart
  as you like. If you give out something you changed, you give it out under
  the same licence and add-ons.
- Whatever you give out names who made what it is built on. The name shows in
  its user interface and in its source, for example "built on Prusa Connect by
  Prusa Research".
- A business may run it and change it for its own internal use, including its
  own production. This holds up to one million euros of annual gross revenue,
  affiliates included.
- A business may not offer it to others as a service: no hosting it for third
  parties and no exposing its functionality or its API to them.

Anything beyond that, such as a larger business, a hosted service or copying it
into a commercial product, needs a separate business licence. Write to
[sales@prusa3d.com](mailto:sales@prusa3d.com) for one.
