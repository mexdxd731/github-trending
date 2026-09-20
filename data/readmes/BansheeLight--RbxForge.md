# RbxForge

Command-line project generator for Roblox + [Rojo](https://rojo.space). Create a ready project in one command.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Download](https://img.shields.io/badge/download-latest%20release-blue)](../../releases/latest)

## Download
**[Latest release (rbxforge.exe)](../../releases/latest)**

## Usage
```
rbxforge list
rbxforge new MyGame                  # game template
rbxforge new MyLib -t library
rbxforge new MyTool -t plugin -o C:\Projects
```

Templates: `game` (server/client/shared), `library`, `plugin`.

## Run from source
```
python -m rbxforge new MyGame
```

## Build your own exe
Run `build_exe.bat` (needs Python and PyInstaller). Output: `RELEASE/rbxforge.exe`.

## License
MIT, see [LICENSE](LICENSE).
 
 
 
