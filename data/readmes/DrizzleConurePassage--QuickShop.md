# QuickShop

Drop-in shop and inventory template for Roblox: coins, server-validated purchases, saved ownership.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Download](https://img.shields.io/badge/download-latest%20release-blue)](../../releases/latest)

## Download
**[Latest release](../../releases/latest)**

## Features
- `leaderstats` Coins, 100 starting coins
- Purchases validated on the server (price, ownership, input type)
- Data saved via DataStore with `BindToClose`
- Items defined in one file: `src/shared/ShopItems.luau`
- Simple code-built UI, easy to restyle

## Install
1. Install [Rojo](https://rojo.space).
2. `rojo build -o QuickShop.rbxlx` or `rojo serve` and connect from Studio.
3. Enable **Studio Access to API Services** to test saving.

## Customize
Edit `ShopItems.luau` to add items. Grant effects (tools, speed) in the server purchase handler.


## License
MIT, see [LICENSE](LICENSE).
 
 
 
