# pull-refresh-island

A gooey pull-to-refresh for React Native where a black water drop is pulled
out of the iPhone Dynamic Island, detaches, spins while refreshing, then gets
absorbed back in. On devices without a Dynamic Island the drop drips from the
top edge of the screen instead.

Built with Expo, Reanimated 4, Gesture Handler, Skia and NativeWind v5.

## How it works

**Metaballs.** The island and the drop are drawn as plain black shapes on a
Skia `Canvas`, inside a layer that applies a `Blur` followed by a
`ColorMatrix` that sharpens the blurred alpha back into a hard edge:

```
alpha' = alpha * 40 - 18
```

When the two shapes are close, their blurred alphas overlap and survive the
threshold — that overlap is the liquid neck. As the drop travels away the
neck thins and snaps on its own. No path math, the goo is free.

**Gesture.** A `Pan` gesture runs simultaneously with the ScrollView's native
gesture and only accumulates when the scroll is at the top, with progressive
resistance. Past the threshold, release holds the drop in place, runs
`onRefresh`, then springs everything back.

**Dynamic Island detection.** Island devices report a top safe-area inset of
59pt (iPhone 14 Pro – 16) or 62pt (16 Pro), and the island sits 48pt above
the bottom of that inset on all of them:

```ts
const hasIsland = Platform.OS === "ios" && insets.top >= 59;
const islandTop = insets.top - 48;
```

Without an island, the source shape is a rounded bump hidden above the
screen edge that the drop pulls out of.

## Run

```bash
npm install
npm run ios      # iPhone 15/16 Pro simulator for the island effect
npm run android  # top-edge fallback
```

## Usage

```tsx
import { PullRefreshIsland } from "@/components/PullRefreshIsland";

<PullRefreshIsland onRefresh={async () => await reload()}>
  {/* scrollable content */}
</PullRefreshIsland>
```

### Props

| Prop                        | Type                          | Default | Description                                 |
| --------------------------- | ----------------------------- | ------- | ------------------------------------------- |
| `onRefresh`                 | `() => Promise<void> \| void` | —       | Called on release past the threshold.       |
| `threshold`                 | `number`                      | `100`   | Pull distance (pt) that triggers a refresh. |
| `className`                 | `string`                      | —       | Container classes (NativeWind).             |
| `contentContainerClassName` | `string`                      | —       | Classes for the scroll content wrapper.     |
| `children`                  | `ReactNode`                   | —       | Scrollable content.                         |

### Tuning the goo

In `src/components/PullRefreshIsland.tsx`:

- `Blur blur={6}` — how far the liquid reaches. Higher = thicker, stickier goo.
- `GOO_MATRIX` (`40, -18`) — edge sharpness of the thresholded alpha.
- `DROP_RADIUS` — size of the detached drop.
- `holdY` — where the drop rests while refreshing.

## Project structure

```
src/
  components/
    PullRefreshIsland.tsx   # the component (goo canvas + gesture + spinner)
    DotGrid.tsx             # dotted background used by the demo
  tw/                       # NativeWind-wrapped RN primitives
  global.css                # Tailwind v4 entry
App.tsx                     # minimal demo
```
