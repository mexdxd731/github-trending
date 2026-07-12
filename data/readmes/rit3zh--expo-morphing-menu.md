# expo-morphing-menu

A morphing, keyboard-aware **composer + picker menu** for React Native.

## ✨ Features

- 🫧 **Morphing presentation** — a single spring machine drives the composer's width, height, corner radius, and position together, so the input bar _grows into_ the menu surface instead of a separate sheet sliding up
- ⌨️ **Keyboard-following** via `react-native-keyboard-controller` — the surface reads live keyboard height and stays glued above it as it opens and closes
- 🧭 **Multi-panel navigation** — register `<BottomInput.Item>` rows (Camera, Photos, Files, Plugins…) and matching `<BottomInput.Content>` panels; `open(id)` morphs the surface to that panel and `back()` returns to the item list
- 🖼️ **Single-image morph** — tapping a photo runs a shared-element morph from its grid cell into an attachment thumb, coordinated through the root via `reportFrame` / `run`
- 🧠 TypeScript-first, fully typed surface

---

## ⚙️ Installation

```bash
git clone https://github.com/rit3zh/expo-morphing-menu
cd expo-morphing-menu
bun install
bun start -c
```

Core dependencies (already wired up in this template):

```bash
bun add react-native-reanimated react-native-gesture-handler \
  react-native-safe-area-context react-native-keyboard-controller \
  expo-symbols expo-glass-effect expo-image expo-document-picker
```

> **Expo SDK 57.** Read the exact versioned docs at
> https://docs.expo.dev/versions/v57.0.0/ before changing native code.

---

## 🚀 Usage

Wrap your app once with `KeyboardProvider`, then compose a `<BottomInput>` at the
bottom of your screen.

```tsx
// app/_layout.tsx
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <KeyboardProvider enabled>
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardProvider>
  );
}
```

The simplest composer — a placeholder, one trigger, one menu item:

```tsx
import { BottomInput } from "@/components/bottom-input";
import { SymbolView } from "expo-symbols";

export function Composer() {
  return (
    <BottomInput placeholder="Ask ChatGPT">
      <BottomInput.Trigger>
        <SymbolView name="plus" size={22} tintColor="#ececec" />
      </BottomInput.Trigger>

      <BottomInput.Items>
        <BottomInput.Item
          id="photos"
          label="Photos"
          icon={<SymbolView name="photo" size={22} tintColor="#ececec" />}
        />
      </BottomInput.Items>

      <BottomInput.Content id="photos">
        {/* your panel here */}
      </BottomInput.Content>
    </BottomInput>
  );
}
```

## Preview

https://github.com/user-attachments/assets/15abbea3-644f-4680-8795-4d16182a70ec



### Controlling open state

Pass `open` / `onOpenChange` to drive the menu from outside (e.g. to prefetch the
photo library the moment it opens):

```tsx
const [menuOpen, setMenuOpen] = useState(false);

<BottomInput
  placeholder="Ask ChatGPT"
  open={menuOpen}
  onOpenChange={setMenuOpen}
  trailing={<ComposerTrailing />}
>
  {/* … */}
</BottomInput>;
```

### Attachments

Render selected photos and files above the field. The composer measures the strip
and reflows to fit:

```tsx
<BottomInput.Attachments>
  {attachments.map((photo) => (
    <AttachmentThumb key={photo.id} photo={photo} onRemove={removeAttachment} />
  ))}
  {files.map((file) => (
    <FileAttachment key={file.id} file={file} onRemove={removeFile} />
  ))}
</BottomInput.Attachments>
```

### Multiple panels

Register several items and a matching `Content` panel per id. Tapping an item
morphs the surface to that panel:

```tsx
<BottomInput.Items>
  <BottomInput.Item id="camera" label="Camera" icon={/* … */} />
  <BottomInput.Item id="photos" label="Photos" icon={/* … */} />
  <BottomInput.Item id="files" label="Files" icon={/* … */} />
</BottomInput.Items>

<BottomInput.Content id="camera"><CameraSurface /></BottomInput.Content>
<BottomInput.Content id="photos"><PhotoGrid /></BottomInput.Content>
<BottomInput.Content id="files" height={800}><FilesPanel /></BottomInput.Content>
```

> ⚠️ `Content.height` — a fixed height only works reliably when the keyboard is
> **not** mounted. The panel is bottom-anchored just above the keyboard, so a
> height taller than the space above it overflows off-screen. Omit `height` to use
> the keyboard-safe default.

---

## 🧱 Component Anatomy

```tsx
<BottomInput>
  <BottomInput.Attachments />
  <BottomInput.Trigger />
  <BottomInput.Items>
    <BottomInput.Item />
  </BottomInput.Items>
  <BottomInput.Content />
</BottomInput>
```

---

## 🧩 API

### `<BottomInput>` (root)

| Prop           | Type                      | Default | Description                                                |
| -------------- | ------------------------- | ------- | ---------------------------------------------------------- |
| `placeholder`  | `string`                  | —       | Placeholder for the composer text field.                   |
| `open`         | `boolean`                 | —       | Controlled menu-open state.                                |
| `onOpenChange` | `(open: boolean) => void` | —       | Fires when the menu opens or closes.                       |
| `inputProps`   | `TextInputProps`          | —       | Props forwarded to the underlying `TextInput`.             |
| `trailing`     | `ReactNode`               | —       | Content pinned to the trailing edge of the field.          |
| `children`     | `ReactNode`               | —       | The `Attachments` / `Trigger` / `Items` / `Content` slots. |

### `<BottomInput.Trigger>`

| Prop       | Type        | Description                               |
| ---------- | ----------- | ----------------------------------------- |
| `children` | `ReactNode` | The pressable content (e.g. a ＋ symbol). |

### `<BottomInput.Items>` / `<BottomInput.Item>`

`Items` wraps the menu rows. Each `Item`:

| Prop    | Type        | Description                                      |
| ------- | ----------- | ------------------------------------------------ |
| `id`    | `string`    | Unique id linking this row to a `Content` panel. |
| `label` | `string`    | Row label.                                       |
| `icon`  | `ReactNode` | Leading icon.                                    |

### `<BottomInput.Content>`

| Prop       | Type        | Description                                                         |
| ---------- | ----------- | ------------------------------------------------------------------- |
| `id`       | `string`    | Matches an `Item` id; the surface morphs to this panel when opened. |
| `height`   | `number`    | Optional fixed panel height. See the keyboard caveat above.         |
| `children` | `ReactNode` | The panel body.                                                     |

### `<BottomInput.Attachments>`

| Prop       | Type        | Description                                 |
| ---------- | ----------- | ------------------------------------------- |
| `children` | `ReactNode` | Attachment thumbs rendered above the field. |

### `useBottomInput()`

Access menu state and the morph controller from any descendant of `<BottomInput>`.

| Field               | Type                   | Description                                                                       |
| ------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| `menuOpen`          | `boolean`              | Whether the menu is open.                                                         |
| `toggleMenu()`      | `() => void`           | Toggle the menu.                                                                  |
| `close()`           | `() => void`           | Close the menu.                                                                   |
| `activeId`          | `string \| null`       | The currently open panel id.                                                      |
| `open(id)`          | `(id: string) => void` | Morph the surface to a panel.                                                     |
| `back()`            | `() => void`           | Return from a panel to the item list.                                             |
| `contentWidth`      | `number`               | Measured width of the extended surface.                                           |
| `contentHeight`     | `number`               | Measured height of the extended surface.                                          |
| `attachmentsHeight` | `SharedValue<number>`  | Live height of the attachment strip.                                              |
| `morph`             | `IBottomInputMorph`    | Single-image morph controller (`reportFrame` / `run`, `pendingId`, `revealedId`). |

---

## 🧱 Stack

[Expo SDK 57](https://expo.dev/changelog) · [React Native 0.86](https://reactnative.dev/) · [Reanimated 4](https://docs.swmansion.com/react-native-reanimated/) · [Gesture Handler 2](https://docs.swmansion.com/react-native-gesture-handler/) · [Keyboard Controller](https://kirillzyusko.github.io/react-native-keyboard-controller/) · [expo-symbols](https://docs.expo.dev/versions/latest/sdk/symbols/) · [expo-glass-effect](https://docs.expo.dev/versions/latest/sdk/glass-effect/) · [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) · [Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) · [Expo Router](https://docs.expo.dev/router/introduction/)

---
