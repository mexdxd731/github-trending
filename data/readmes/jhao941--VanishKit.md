# VanishKit

A reversible disintegration effect for SwiftUI, rendered with Metal.

VanishKit captures any SwiftUI view as a single texture, divides that texture into thousands of deterministic particles, and renders the particles as instanced textured quads. Animate one normalized `progress` value forward to disintegrate and backward to reassemble along the same path.

The demo includes live controls for source width and height, particle size, direction, spread, travel, rotation, gravity, turbulence, stagger, wave direction, duration, and seed. Its interface is available in English and Simplified Chinese.

## Inspiration

This project was inspired by [Kavsoft's Disintegration Effect (SwiftUI)](https://www.youtube.com/watch?v=OlF8ed1L56M).

The effect was reimagined as a Metal renderer rather than a collection of per-particle SwiftUI views. This makes much smaller particles and substantially higher particle counts practical, while keeping particle motion deterministic and reversible.

## Highlights

- Accepts any SwiftUI `View`, including `Image`.
- Renders thousands of textured particles with one instanced draw call per frame.
- Supports up to 60,000 particles through a configurable safety cap.
- Uses a stable seed to reproduce the same particle field.
- Reassembles by evaluating the same particle field in reverse.
- Preserves texture detail, transparency, rounded corners, gradients, text, and shadows.
- Exposes direction, spread, distance, variation, rotation, gravity, turbulence, stagger, scale, and wave controls.
- Keeps `MTKView` paused and redraws only when its inputs change.
- Supports Reduce Motion in the demo.
- Includes editable numeric fields and a reproducible `0...9999` seed control.

## Requirements

- iOS 18.0 or later
- Xcode 16 or later
- Metal-capable iPhone, iPad, or Simulator
- The Xcode Metal Toolchain component

If shader compilation reports that the Metal Toolchain is missing, install it from Xcode's Components settings.

## Installation

Add this repository through **File → Add Package Dependencies** in Xcode, then
link the `VanishKit` library product to your app target:

```swift
import VanishKit
```

The Package contains its Metal shader source as a target resource. Client apps
do not need to add the shader to their own target.

## Running the Demo

1. Open `VanishKit.xcodeproj`.
2. Select the shared `VanishKit` scheme.
3. Run on an iOS device or Simulator.
4. Choose a SwiftUI view or image as the source.
5. Use **Disintegrate**, **Reassemble**, or the progress slider.
6. Adjust the particle parameters and seed to explore different results.

## Generic SwiftUI API

Use `VanishEffectView` when the particle canvas should be larger than the original source:

```swift
import VanishKit

@State private var progress: Float = 0
@State private var configuration = VanishEffectConfiguration()

VanishEffectView(
    progress: progress,
    configuration: configuration,
    contentSize: CGSize(width: 150, height: 96),
    snapshotPadding: 18
) {
    ExampleCard()
}
.frame(height: 350)
```

The convenience modifier works with images and other SwiftUI views:

```swift
Image("photo")
    .resizable()
    .scaledToFill()
    .vanishEffect(
        progress: progress,
        configuration: configuration,
        contentSize: CGSize(width: 240, height: 160),
        snapshotPadding: 12
    )
```

`progress` has a normalized range:

```text
0.0  fully assembled
1.0  fully disintegrated
```

Animate `0 → 1` to disintegrate and `1 → 0` to reassemble.

## Configuration

```swift
var configuration = VanishEffectConfiguration(
    particleSizePoints: 2,
    directionDegrees: -35,
    directionSpreadDegrees: 55,
    travelDistancePoints: 105,
    travelVariation: 0.35,
    rotationDegrees: 260,
    stagger: 0.38,
    gravityPoints: 18,
    turbulencePoints: 28,
    endScale: 0.18,
    waveDirectionDegrees: 0,
    seed: 42,
    maximumParticleCount: 60_000
)
```

| Parameter | Purpose |
| --- | --- |
| `particleSizePoints` | Requested particle cell size in points. |
| `directionDegrees` | Main travel direction. Negative angles move upward. |
| `directionSpreadDegrees` | Random angular spread around the main direction. |
| `travelDistancePoints` | Base particle travel distance. |
| `travelVariation` | Per-particle distance variation from `0...1`. |
| `rotationDegrees` | Maximum random particle rotation. |
| `stagger` | Amount of per-particle and directional start delay. |
| `gravityPoints` | Vertical quadratic displacement. |
| `turbulencePoints` | Sideways mid-flight variation. |
| `endScale` | Particle scale at full disintegration. |
| `waveDirectionDegrees` | Direction used to order the disintegration wave. |
| `seed` | Stable identifier for deterministic random motion. |
| `maximumParticleCount` | Safety cap that automatically increases cell size when needed. |

## How It Works

```text
SwiftUI content
      ↓ ImageRenderer
one premultiplied RGBA8 texture
      ↓
Metal vertex shader
  • derives each grid cell from instance_id
  • hashes instance_id + seed
  • calculates delay, travel, turbulence, rotation, and scale
      ↓
Metal fragment shader
  • samples the matching region of the source texture
  • applies opacity
      ↓
one instanced draw call
```

The SwiftUI layer owns content capture and progress. Metal owns particle generation, movement, texture sampling, and drawing. No cropped `UIImage`, Swift object, or SwiftUI `Image` is created for each particle.

## Why Metal?

A view-based implementation is approachable and works well at modest particle counts. Its cost grows as every particle becomes another cropped image and another view that must be created, diffed, laid out, and animated.

VanishKit keeps one source texture and derives the particle field in the vertex shader. Increasing particle density therefore does not create thousands of additional SwiftUI nodes or CPU-side image crops.

This is an architectural advantage rather than a universal benchmark result. Actual frame time depends on the source texture, particle count, device, drawable size, and configured travel area.

## Project Structure

- `Package.swift` — the public Swift Package definition.
- `Sources/VanishKit/` — reusable API, renderer, grid planner, and Metal shader.
- `Tests/VanishKitTests/` — grid, configuration, and shader-bundle tests.
- `VanishKit/ContentView.swift` — interactive demo and reversible progress driver.
- `VanishKit/Localizable.xcstrings` — English and Simplified Chinese demo strings.
- `VanishKit.xcodeproj` — example app that consumes the local Package product.

## Snapshot Behavior

SwiftUI content is captured when its size, display scale, environment, or `snapshotRevision` changes. During the effect, Metal renders that snapshot rather than the live view.

Increment `snapshotRevision` when the source content changes:

```swift
VanishEffectView(
    progress: progress,
    contentSize: contentSize,
    snapshotRevision: revision
) {
    DynamicCard(model: model)
}
```

Dynamic content such as video, maps, or an independently animating canvas freezes at the captured frame. The container must also be large enough for the configured travel distance because Metal cannot draw outside its drawable.

## Development Notes

See [PROMPT.md](PROMPT.md) for the condensed design conversation, the two implementation routes considered, the reasoning behind the Metal approach, and the development timeline.

## License

VanishKit is available under the MIT License. See [LICENSE](LICENSE).
