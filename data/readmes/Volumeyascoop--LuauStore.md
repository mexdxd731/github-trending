# LuauStore

DataStore wrapper for Roblox with **retries, caching, template reconcile and autosave**.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Download](https://img.shields.io/badge/download-latest%20release-blue)](../../releases/latest)

## Download
**[Latest release](../../releases/latest)**

## Features
- Exponential-backoff retries on every DataStore call
- In-memory cache, dirty tracking, periodic autosave
- Template reconcile (new fields appear in old saves)
- `BindPlayers` handles join, leave and `BindToClose`

## Install
1. Install [Rojo](https://rojo.space) and run `rojo build -o LuauStore.rbxlx`, or copy `src/LuauStore.luau` into `ServerScriptService` manually.
2. Enable **Studio Access to API Services** (Game Settings > Security).

## Usage
```lua
local LuauStore = require(ServerScriptService.LuauStore)
local store = LuauStore.new("PlayerData_v1", { template = { coins = 0 } })
store:BindPlayers(function(player, data)
    store:Update(tostring(player.UserId), function(d) d.coins += 1 end)
end)
```

## API
| Method | Description |
|---|---|
| `LuauStore.new(name, options)` | Create a store |
| `:Load(key)` | Load and cache data |
| `:Get(key)` | Read cached data |
| `:Update(key, fn)` | Mutate data, mark dirty |
| `:Save(key)` / `:SaveAll()` | Persist |
| `:Release(key)` | Save and drop from cache |
| `:BindPlayers(cb)` | Auto-manage players |


## License
MIT, see [LICENSE](LICENSE).
 
 
 
