# Bedrock Calculator
<img width="839" height="922" alt="image" src="https://github.com/user-attachments/assets/2c74c0ae-15c1-475a-991f-4c1b01d07ecf" />


A client-side [Fabric](https://fabricmc.net/) mod for Minecraft that opens a fake
"bedrock coordinate calculator" GUI. Type in a bedrock/deepslate pattern, hit
**Confirm**, watch an authentic-looking calculation run for 20–30 seconds, and get
a result.

> **Note:** This is a novelty / prop mod. The "calculation" is theater — it runs a
> pile of real-looking math (pattern hashing, seed cracking, noise sampling,
> triangulation, entropy, checksums) and then ignores all of it, returning a random
> coordinate. It does **not** actually locate anything.

## Usage

Run the command in-game:

```
/bedrock
```
<img width="1294" height="530" alt="image" src="https://github.com/user-attachments/assets/33ae3515-dd63-4f30-b9de-041257ffd95c" />

- A **6×7 grid** opens titled *"Enter your bedrock location"*.
- The top 6 rows are **deepslate** — click a cell to toggle it to **bedrock**.
- **Reset** (red, bottom-left) clears the grid; **Confirm** (green, bottom-right)
  starts the calculation.
- After a 20–30 second loading bar with cycling status messages, it shows a random
  **X / Z** in the 10,000–225,000 range. Click **Scan again** to reset, or `Esc` to
  close.

## Compatibility

| | |
|---|---|
| Minecraft | 1.21.1 – 1.21.11 |
| Loader | Fabric |
| Requires | [Fabric API](https://modrinth.com/mod/fabric-api) |
| Java | 21+ |
| Side | Client only |

Not compatible with Forge/NeoForge.

## Building

You need JDK 21.

```bash
./gradlew build
```

The built jar lands in `build/libs/`. Drop it (plus Fabric API) into your
`.minecraft/mods` folder.

> **Windows note:** if Gradle fails with
> `Unable to establish loopback connection`, set this before building:
> ```powershell
> $env:JAVA_TOOL_OPTIONS = "-Djdk.net.unixdomain.tmpdir=C:/tmp"
> ```

## Project structure

```
src/main/java/com/chestgui/
  ChestGuiMod.java            # client entrypoint, registers /bedrock
  BedrockLocationScreen.java  # the GUI, states, and (fake) math
src/main/resources/
  fabric.mod.json             # mod metadata
```

## License

[MIT](LICENSE)
