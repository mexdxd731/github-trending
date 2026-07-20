# 沐阳手绘视频

从一个主题，自动生成完整手绘风格动画讲解视频：文案、分镜、AI 图片、自然配音、同步字幕、Remotion 动效、MP4 渲染和成片验证。

![沐阳手绘视频内置十种风格预览](assets/previews/style-gallery-contact-sheet.png)

## Features

- 一句话生成：只输入主题即可默认完成脚本、画面、配音、字幕和视频渲染。
- 真人感旁白：支持 Fish Audio 和 ElevenLabs；中文项目默认优先选择中文/普通话声音，不用外国角色硬配中文。
- 统一配音：默认生成一条连续旁白音频，避免每个镜头声音不连贯。
- 图片生成画面：每个场景使用 `imagegen` 生成独立手绘插画，字幕和标题由 Remotion 渲染。
- 十种视觉风格：编辑手绘、现代卡片、笔记本、墨稿海报、水彩绘本、卷轴、复古报刊、黑板、蓝图、贴纸。
- 多套排版和动效：默认避免左右分栏，采用更适合短视频阅读的上方标题、中心画面、底部字幕结构。
- 可编辑工程：输出 Remotion 项目，可继续改脚本、图片、字幕、动画和字体。

## 中文快速开始

只需说：`使用 $沐阳手绘视频，主题：为什么存钱越早越轻松`。未指定的内容会自动采用推荐值：中文、60–90 秒、竖屏、暖色编辑手绘、逐幕生成图片、同一个自然中文声音的连续旁白、同步字幕和明显但克制的标题/画面动效。若想参与选择，说“引导模式”，skill 会分轮引导风格、画幅、时长和声音；随时说“其余默认”即可停止提问并继续制作。

## What users can say

```text
Use $沐阳手绘视频. Topic: Why saving early feels easier.
```

That is enough. The default run produces a 60–90 second vertical video with Chinese narration, Chinese subtitles, a warm editorial hand-drawn style, generated scene illustrations, one coherent continuous narrator voice, and visible Remotion motion.

For guided creation:

```text
Use $沐阳手绘视频 in guided mode. Help me choose the style and voice.
```

## Requirements

- Codex with this skill installed
- Node.js and npm
- Python 3.10+
- FFmpeg and FFprobe
- Remotion dependencies installed in the generated project
- Access to the `imagegen` skill
- A Fish Audio or ElevenLabs account and API key for narration

The skill never stores account keys, personal voice IDs, or reference recordings inside its own directory.

## Installation

Copy the whole skill folder into your Codex skills directory, normally `%USERPROFILE%\.codex\skills\` on Windows or `~/.codex/skills/` on macOS/Linux, then restart Codex. The visible skill name is `沐阳手绘视频`; the existing folder may remain `create-handdrawn-explainer` for compatibility with older projects and scripts.

If you publish this repository to GitHub, keep the folder contents as the repository root:

```text
.
├─ SKILL.md
├─ README.md
├─ agents/
├─ assets/
├─ references/
├─ scripts/
└─ tests/
```

## Fish Audio setup

Fish Audio is a Chinese-first cloud TTS option and is useful when ElevenLabs has no usable Chinese voice in the current account.

1. Sign in at <https://fish.audio/zh-CN/app/api-keys/>.
2. Create an API key.
3. Create or update `.env` in the generated project:

   ```dotenv
   FISH_API_KEY=
   FISH_MODEL=s2.1-pro-free
   # Optional: FISH_REFERENCE_ID=<your reference voice id>
   ```

Run. By default this creates one continuous narration file, which keeps the voice identity, pacing, and emotion coherent across the whole video:

```powershell
python scripts/fish_audio_project.py --project video
```

For debugging only, you can force one file per scene:

```powershell
python scripts/fish_audio_project.py --project video --mode segmented
```

To make a short test sample:

```powershell
python scripts/fish_audio_project.py --project video --sample --sample-text "你好，我们用十秒钟试一下中文旁白效果。"
```

## ElevenLabs setup

1. Sign in at <https://elevenlabs.io/app/api/api-keys>.
2. Create a restricted key. Enable only **Text to Speech** and **Voices: Read**. A small usage cap is recommended.
3. Create `.env` in the generated project:

   ```dotenv
   ELEVENLABS_API_KEY=
   ```

Do not paste the key into chat or commit `.env`. If Chrome control is available, ask Codex to configure the key from your already signed-in browser; the skill instructs it to save the key locally without displaying it.

## Automatic voice selection

For Chinese projects, prefer Fish Audio or a true Chinese/Mandarin ElevenLabs voice. Do not use English role voices for Chinese narration unless the user explicitly requests cross-language casting.

### ElevenLabs

The bundled selector ranks voices available to the account:

1. Mandarin/Chinese voices intended for narration or education
2. Warm, professional, informative, or storyteller voices inside that Chinese/Mandarin pool
3. Voices usable by the current subscription

For Chinese narration, the selector does not fall back to an English role voice such as Bella, River, or another foreign-character voice. If every Chinese/Mandarin voice is unavailable on the current plan, generation stops and asks the user to add, enable, or choose a usable Chinese voice. Cross-language casting requires the explicit `--allow-cross-language-voice` flag.

## Visual styles

The default is `warm-editorial`. Guided mode can choose among editorial, magazine grid, notebook, ink poster, watercolor storybook, calligraphy scroll, retro newspaper, chalk classroom, technical blueprint, and playful sticker systems. See `references/style-catalog.md` for fonts, palettes, and use cases.

### Style gallery

Each preset controls the image prompt direction, palette, heading font mood, caption font stack, background texture, and default layout family.

![Ten built-in hand-drawn visual styles](assets/previews/style-gallery-contact-sheet.png)

The ten built-in style IDs are:

| Style ID | Best for |
|---|---|
| `warm-editorial` | finance, habits, psychology, calm explanation |
| `modern-grid` | business, technology, systems, creator economy |
| `notebook` | study, personal growth, tutorials, journaling |
| `ink-poster` | opinion, culture, strong hooks, dramatic contrast |
| `watercolor-storybook` | emotional stories, nature, history, softer lessons |
| `calligraphy-scroll` | philosophy, poetry, traditional culture |
| `retro-newspaper` | media analysis, case studies, history, events |
| `chalk-classroom` | science, step-by-step lessons, classroom teaching |
| `technical-blueprint` | mechanisms, workflows, engineering, software concepts |
| `playful-sticker` | short social explainers, children, light science |

### Text and image layout gallery

The Remotion template keeps generated images text-free, then renders all titles, scene numbers, captions, frames, and subtitles in code. The current presets use ten layout families instead of one repeated frame: editorial opener, grid spotlight, notebook diary, ink poster, storybook plate, scroll centerpiece, newspaper poster, chalk lesson, blueprint callout, and sticker stage. Default presets avoid left-right split layouts; title, image, and subtitle follow a top-center-bottom reading flow.

![Ten built-in text and image layout styles](assets/previews/layout-gallery-contact-sheet.png)

### Typography range

The style catalog includes multiple font moods for guided mode: serif editorial, humanist sans, handwritten note, brush poster, soft literary, calligraphy title, newspaper serif, chalk marker, technical grotesk, and rounded playful. Decorative fonts are used only for short headings; captions stay on readable sans or serif stacks.

### Motion presets

The Remotion template includes reusable motion presets. If `motion.id` is omitted, the selected visual style automatically chooses its matching motion language. Every default scene animates the heading, focal image, subtitle bar, texture/accent layer, and image reveal/drift. Subtitles are visible by default and are rendered by Remotion, not baked into generated images.

| Motion ID | Feel |
|---|---|
| `calm-explainer` | safe default with gentle fade, lift, and camera drift |
| `editorial-drift` | warm paper drift and relaxed editorial pacing |
| `grid-scan` | structured side-rail entrance and scan line |
| `notebook-flip` | notebook page lift and sticky-note movement |
| `poster-snap` | fast poster punch and stamp accent |
| `watercolor-float` | soft floating storybook motion |
| `scroll-reveal` | vertical scroll reveal and ink wipe |
| `newspaper-press` | press-like title drop and column motion |
| `chalk-write` | chalk dust and classroom board motion |
| `blueprint-scan` | blueprint scan, grid drift, and technical reveal |
| `sticker-pop` | playful sticker pop and light breathing |

## Manual command flow

```powershell
python scripts/preflight.py --project video
python scripts/create_project.py --plan plan.json --output video
# Use Codex + imagegen to create every public/images/<scene-id>.png listed in plan.json.
python scripts/fish_audio_project.py --project video
# or, if the account has a true Chinese/Mandarin voice:
python scripts/elevenlabs_project.py --project video --auto-voice
cd video
npm install
npm run render
python ../scripts/verify_output.py out/video.mp4 --plan src/generated/plan.json
```

To list voices:

```powershell
python scripts/elevenlabs_project.py --project video --list-voices
```

To force a selected voice:

```powershell
python scripts/elevenlabs_project.py --project video --voice "Voice name"
```

To create three comparable guided-mode samples:

```powershell
python scripts/elevenlabs_project.py --project video --sample-voices --sample-text "你好，我们用一分钟，把这件事讲清楚。"
```

## Output

Each generated project is editable and contains:

```text
video/
├─ public/images/          generated scene art
├─ public/audio/           continuous narration.mp3 by default
├─ script/                 readable exported scripts
│  ├─ voiceover-script.md  full narration script
│  ├─ captions-script.md   on-screen caption script
│  └─ scene-plan.md        scene titles, image prompts, captions, narration
├─ src/generated/plan.json
├─ src/generated/captions.json
├─ src/stylePresets.ts
└─ out/video.mp4
```

## Troubleshooting

- `Missing ELEVENLABS_API_KEY`: finish the setup above; do not use SAPI as a substitute.
- `Missing FISH_API_KEY`: create a Fish Audio key and save it in the project `.env`.
- Fish Audio `401`: the key is missing or invalid.
- Fish Audio `402`: the account has insufficient credit or selected model is unavailable.
- `402 paid_plan_required`: choose a premade voice or run `--auto-voice` to fall back automatically.
- `No usable Chinese/Mandarin voice`: add or enable a Chinese voice in ElevenLabs, choose a Chinese voice by name or ID, or explicitly allow cross-language casting.
- `429 concurrent_limit_exceeded`: retry sequentially; the bundled generator is sequential by default.
- Missing image: generate `public/images/<scene-id>.png` before rendering.
- Missing font: the presets contain safe fallbacks; install an OFL font from the style catalog for the intended appearance.
- Voice changes between scenes: rerun Fish Audio without `--mode segmented`; the default continuous mode creates one unified narrator track.
- Missing subtitles: rerun the TTS project script so it rebuilds `src/generated/captions.json`, then render again.
- Video cuts narration: rerun the TTS project script, which measures generated audio and rebuilds scene durations.

## Open-source release checklist

Before pushing to GitHub:

- Confirm `.env`, generated projects, audio files, videos, temporary preview projects, and API keys are not committed.
- Confirm `assets/previews/style-gallery-contact-sheet.png` and `assets/previews/layout-gallery-contact-sheet.png` render correctly on GitHub.
- Run a representative template type check from a generated project: `npx tsc --noEmit`.
- Run the skill validator. Note: this skill intentionally uses the Chinese display name `沐阳手绘视频`; Codex's default validator may warn that the name is not hyphen-case.
- Include `LICENSE` and keep third-party service credentials out of the repository.

## License

MIT. See [LICENSE](LICENSE).
