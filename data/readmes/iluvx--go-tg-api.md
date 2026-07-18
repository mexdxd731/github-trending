# go-tg-api

**Build Telegram bots and user clients in Go — without wrestling MTProto.**

`go-tg-api` is a high-level Telegram library on top of [gotd/td](https://github.com/gotd/td). It gives you a clean client, a filterable update dispatcher, and helpers for the work you actually do every day: reply, ban, forward, download media, manage chats.

If you’ve used Pyrogram, Telethon, or GramJS, you’ll feel at home. If you’ve only used Bot API wrappers, you’ll finally get full MTProto power without the boilerplate.

---

## Why this library?

| Pain point | What go-tg-api does |
|---|---|
| Raw `gotd` is powerful but verbose | One `NewClient` call → authenticated session + idle loop |
| Session migration is painful | Import **Pyrogram**, **Telethon**, **GramJS**, and **Telegram Desktop (tdata)** sessions |
| Updates need glue code | Handler groups, filters, commands, callbacks — ready to use |
| Peers and access hashes are annoying | Built-in peer storage (SQLite or in-memory) |
| Flood waits kill production bots | First-class middleware hooks (rate limit, flood wait, and more) |

Ship an echo bot in under 50 lines. Scale to userbots, downloaders, and multi-account tooling without changing libraries.

---

## Features

- **Bots and users** — `ClientTypeBot` or `ClientTypePhone`
- **Update dispatcher** — messages, commands, callback queries, inline queries, chat members, join requests
- **Composable filters** — text, prefixes, custom predicates
- **Handler groups** — control flow with `EndGroups`, `SkipCurrentGroup`, `ContinueGroups`
- **Rich `ext.Context`** — reply, send media, ban/unban, promote, archive, resolve usernames, download files, and more
- **Flexible sessions** — memory, SQLite, custom SQL via GORM, string sessions, tdata
- **Session interoperability** — bring sessions from other ecosystems
- **Middleware-ready** — plug in `gotd` middlewares for flood wait and rate limiting
- **Parse mode helpers** — markdown / entity utilities for formatted messages

---

## Install

```bash
go get github.com/iluvx/go-tg-api
```

Requires Go **1.25+**. Get `api_id` and `api_hash` from [my.telegram.org/apps](https://my.telegram.org/apps).

---

## Quick start — echo bot

```go
package main

import (
	"fmt"
	"log"

	gotgapi "github.com/iluvx/go-tg-api"
	"github.com/iluvx/go-tg-api/dispatcher/handlers"
	"github.com/iluvx/go-tg-api/dispatcher/handlers/filters"
	"github.com/iluvx/go-tg-api/ext"
	"github.com/iluvx/go-tg-api/sessionMaker"
)

func main() {
	client, err := gotgapi.NewClient(
		123456,                    // api_id
		"API_HASH_HERE",           // api_hash
		gotgapi.ClientTypeBot("BOT_TOKEN_HERE"),
		&gotgapi.ClientOpts{
			InMemory: true,
			Session:  sessionMaker.SimpleSession(),
		},
	)
	if err != nil {
		log.Fatalln(err)
	}

	client.Dispatcher.AddHandler(handlers.NewCommand("start", start))
	client.Dispatcher.AddHandler(handlers.NewMessage(filters.Message.Text, echo))

	fmt.Printf("running as @%s\n", client.Self.Username)
	log.Fatalln(client.Idle())
}

func start(ctx *ext.Context, update *ext.Update) error {
	user := update.EffectiveUser()
	_, err := ctx.Reply(update, ext.ReplyTextString("Hi "+user.FirstName), nil)
	return err
}

func echo(ctx *ext.Context, update *ext.Update) error {
	_, err := ctx.Reply(update, ext.ReplyTextString(update.EffectiveMessage.Text), nil)
	return err
}
```

---

## User clients (userbots)

Same API — swap the client type:

```go
client, err := gotgapi.NewClient(
	123456,
	"API_HASH_HERE",
	gotgapi.ClientTypePhone("+1234567890"),
	&gotgapi.ClientOpts{
		Session: sessionMaker.SimpleSession(),
	},
)
```

Login prompts for the code (and 2FA password if needed). Persist the session so you only do this once.

---

## Sessions that travel with you

```go
// Fresh / simple
sessionMaker.SimpleSession()

// Named SQLite file
sessionMaker.SqlSession(sqlite.Open("mybot.session"))

// Import from other stacks
sessionMaker.PyrogramSession(pyrogramString)
sessionMaker.TelethonSession(telethonString)
sessionMaker.GramjsSession(gramjsString)
sessionMaker.TdataSession(tdesktopAccount)
```

Migrate an existing bot or userbot without forcing every user to log in again.

---

## Examples

| Example | What it shows |
|---|---|
| [`examples/echo-bot`](examples/echo-bot) | Commands, callbacks, filters (memory & SQLite) |
| [`examples/authorizing-as-user`](examples/authorizing-as-user) | Phone login as a user |
| [`examples/auth-using-string-session`](examples/auth-using-string-session) | Pyrogram / Telethon / GramJS / native strings |
| [`examples/auth-using-tdata`](examples/auth-using-tdata) | Telegram Desktop session import |
| [`examples/middleware`](examples/middleware) | Flood wait + rate limiting |
| [`examples/downloader`](examples/downloader) | Media downloads |
| [`examples/auth-using-api-base`](examples/auth-using-api-base) | Custom auth / web flow |

---

## Project layout

```
go-tg-api/
├── client.go              # NewClient, ClientOpts, lifecycle
├── dispatcher/            # Update routing & handler groups
│   └── handlers/          # Message, Command, Callback, Inline, …
├── ext/                   # Context + Update helpers
├── sessionMaker/          # Session constructors & importers
├── storage/               # Peer & session persistence
├── functions/             # Chat, message, media, peer helpers
├── parsemode/             # Formatting utilities
└── examples/              # Runnable recipes
```

---

## Who is this for?

- Go developers who want **MTProto** without a custom framework
- Teams migrating from **Pyrogram / Telethon / GramJS** and keeping sessions
- Anyone building **bots, userbots, downloaders, or automation** that outgrows Bot API limits

---

## Status

Current library version: **`v1.0.0-beta22`** (see `gotgapi.VERSION`).

The public surface is already used for real bots and clients; APIs may still evolve while the beta tag remains.

---

## License

[GNU General Public License v3.0](LICENSE)

---

## Credits

Built on the excellent [gotd/td](https://github.com/gotd/td) Telegram MTProto stack for Go.

---

**Ready when you are.**

```bash
go get github.com/iluvx/go-tg-api
```

<!-- sync-00-0041 -->

<!-- sync-31-59f2 -->

<!-- sync-63-0c75 -->
