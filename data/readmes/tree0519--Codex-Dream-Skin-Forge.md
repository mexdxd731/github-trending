# Codex Dream Skin

<p align="center">
  <strong>中文</strong> · <a href="./README.en.md">English</a>
</p>

<p align="center">
  <strong>让 Codex Desktop 拥有真正可切换、会动、可恢复的主题。</strong><br>
  Windows 13 套内置主题 · macOS 任意图片定制 · 本机回环 CDP 注入 · 不修改官方安装包
</p>

<p align="center">
  <code>Windows 10 / 11</code> · <code>macOS Apple Silicon / Intel</code> · <code>Light / Dark</code> · <code>PNG / JPG / GIF</code>
</p>

<p align="center">
  <a href="#项目特色">项目特色</a> ·
  <a href="#主题预览">主题预览</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="#制作自己的主题">制作主题</a> ·
  <a href="#常见问题">常见问题</a> ·
  <a href="#安全边界">安全边界</a>
</p>

> **一句话说明：** Codex Dream Skin 只为官方 Codex Desktop 增加外部主题渲染层。侧栏、项目选择器、建议卡、任务内容、菜单和输入框仍然是原生可交互控件，不是覆盖整窗的静态截图。

> [!IMPORTANT]
> 本项目不是 OpenAI 官方产品。它不修改 `.app`、`app.asar`、WindowsApps 文件、官方代码签名，也不会静默改写 API Key、Base URL 或模型供应商配置。

## 项目特色

| 特色 | 你能得到什么 |
| --- | --- |
| **13 套即装即用主题** | Windows 内置 7 套亮色、6 套暗色主题，其中 4 套为循环 GIF 动态主题。 |
| **真正的主题系统** | 每套主题都拥有独立的图片、缩略图、明暗模式、语义配色、裁切焦点和可读性遮罩，不是简单换一张背景图。 |
| **应用内快速切换** | Windows 侧栏内置主题选择器，真实缩略图预览、选择结果持久保存，新主题可热加载，无需反复还原。 |
| **原生交互完整保留** | 首页和普通任务页都能显示主题，同时保留 Codex 原生侧栏、代码块、输入框、菜单、弹窗和任务操作。 |
| **针对性能做过优化** | 普通任务使用轻量预览，首页需要时才加载高清原图；超大图片生成本地缓存，并减少大面积模糊与无效 DOM 重注入。 |
| **一张图生成一个主题** | 项目内置 `$add-windows-theme` 与 `$add-macos-theme` Skills，可分析图片、设计配色、生成配置、校验并热加载。 |
| **Windows + macOS 双平台** | Windows 提供多主题包与应用内选择器；macOS 提供 Finder 选图、本机主题库、桌面启动器和可选菜单栏控制。 |
| **外置、安全、可恢复** | 通过只监听 `127.0.0.1` 的 CDP 注入渲染层，不拆包、不改签名，并提供验证、临时移除和完整恢复入口。 |

## 选择你的平台

| | Windows | macOS |
| --- | --- | --- |
| **适用版本** | Windows 10 / 11，Microsoft Store 版 Codex | Apple Silicon / Intel Mac，官方 Codex.app |
| **主题方式** | 13 套内置主题，应用内选择器切换 | 任意图片定制，本机主题库或菜单栏切换 |
| **运行依赖** | PowerShell 5.1+，需要本机 `node` | 不需要全局 Node.js，复用并验证 Codex 内置 Node.js |
| **默认 CDP 端口** | `127.0.0.1:9335` | `127.0.0.1:9341` |
| **从这里开始** | [Windows 安装教程](#windows安装与使用) | [macOS 安装教程](#macos安装与使用) |

## 主题预览

Windows 会自动发现 [`windows/themes/`](./windows/themes/) 下的主题包。当前内置 **13 套主题：9 套静态主题 + 4 套循环 GIF 动态主题**。以下精选 8 套主题展示完整界面效果。

<table>
  <tr>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-01.jpg" alt="赤色穹顶完整界面预览" width="100%"><br><strong>赤色穹顶</strong> · Light</td>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-02.jpg" alt="夏日晴海完整界面预览" width="100%"><br><strong>夏日晴海</strong> · Light</td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-03.jpg" alt="青春赤金完整界面预览" width="100%"><br><strong>青春赤金</strong> · Light</td>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-04.jpg" alt="晴空白昼完整界面预览" width="100%"><br><strong>晴空白昼</strong> · Light</td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-05.jpg" alt="上班充能完整界面预览" width="100%"><br><strong>上班充能</strong> · Light</td>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-06.jpg" alt="云铸大圣完整界面预览" width="100%"><br><strong>云铸大圣</strong> · Light</td>
  </tr>
  <tr>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-07.jpg" alt="星际候车站完整界面预览" width="100%"><br><strong>星际候车站</strong> · Dark</td>
    <td align="center" width="50%"><img src="docs/images/gallery/skin-08.jpg" alt="霓虹公路完整界面预览" width="100%"><br><strong>霓虹公路</strong> · Dark</td>
  </tr>
</table>

> 以上图片是按真实主题视觉生成的完整界面合成预览，用于展示侧栏、Hero、建议卡和输入框的整体效果；实际主题仍会加载对应的 `background.png` 或 `background.gif`，这些预览图不是可直接复制进主题包的纯背景素材。

## 快速开始

### 1. 下载项目

使用 Git 克隆本维护版：

```bash
git clone https://github.com/tree0519/Codex-Dream-Skin-Forge.git
cd Codex-Dream-Skin-Forge
```

也可以在 GitHub 页面选择 **Code → Download ZIP**，下载后完整解压。不要只单独下载某个脚本或 CSS 文件。

### 2. 按平台安装

- Windows 用户继续阅读 [Windows：安装与使用](#windows安装与使用)。
- macOS 用户继续阅读 [macOS：安装与使用](#macos安装与使用)。

## Windows：安装与使用

### 第一步：准备环境

开始前请确认：

- 已从 Microsoft Store 安装官方 Codex Desktop，并至少正常启动过一次。
- Windows 10 或 Windows 11。
- PowerShell 5.1 或更新版本。
- 终端可以使用 `node`，建议 Node.js 22 或更新版本。
- `%USERPROFILE%\.codex\config.toml` 已由官方 Codex 创建。

在 PowerShell 中检查：

```powershell
node --version
Test-Path "$env:USERPROFILE\.codex\config.toml"
Get-AppxPackage OpenAI.Codex | Select-Object Name, Version
```

第二条命令应返回 `True`，第三条命令应能看到 `OpenAI.Codex`。

### 第二步：首次安装

先关闭正在运行的 Codex，然后在项目根目录执行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\install-dream-skin.ps1'
```

安装脚本会自动完成：

1. 将当前 `~/.codex/config.toml` 备份到 `%LOCALAPPDATA%\CodexDreamSkin`。
2. 写入与主题渲染层匹配的基础外观配置。
3. 在桌面和开始菜单创建 **Codex Dream Skin** 启动快捷方式。
4. 在桌面创建 **Codex Dream Skin - Restore** 恢复快捷方式。

不需要快捷方式时追加 `-NoShortcuts`：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\install-dream-skin.ps1' -NoShortcuts
```

### 第三步：启动主题版 Codex

安装后双击桌面的 **Codex Dream Skin**。也可以在项目根目录执行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\start-dream-skin.ps1'
```

如果官方 Codex 已经普通启动，脚本会提醒你先关闭。确认可以重启当前 Codex 时，使用：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\start-dream-skin.ps1' -RestartExisting
```

脚本会动态查找当前安装的 `OpenAI.Codex` 包，在正确的 MSIX 应用包上下文中启动，并只在 `127.0.0.1:9335` 打开调试端口。注入守护进程会在页面跳转、刷新和热重载后自动重新应用主题。

### 第四步：切换主题

主题生效后，在 Codex 侧栏搜索入口附近打开主题选择器：

1. 从真实缩略图中选择主题。
2. 等待首页背景、侧栏、内容层和语义颜色同步更新。
3. 打开任意普通任务，确认任务页仍能看到当前主题且文字清晰。
4. 选择结果会保存在本机，下次启动时继续使用。

### 第五步：验证安装

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\verify-dream-skin.ps1' `
  -ScreenshotPath "$env:TEMP\codex-dream-skin.png"
```

验证会检查主题控件、主题目录、当前背景、原生输入框、侧栏样式和注入标记。完整人工检查项见 [`windows/references/qa-inventory.md`](./windows/references/qa-inventory.md)。

### 第六步：临时移除、恢复或卸载

只移除当前运行中的主题层：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\restore-dream-skin.ps1'
```

同时删除项目创建的快捷方式：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\restore-dream-skin.ps1' -Uninstall
```

卸载并恢复安装前备份的 Codex 基础外观配置：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\windows\scripts\restore-dream-skin.ps1' `
  -Uninstall -RestoreBaseTheme
```

## macOS：安装与使用

macOS 版本支持 Apple Silicon 和 Intel Mac，并会复用、校验官方 Codex 内置的签名 Node.js，**不需要全局安装 Node.js**。

### 第一步：准备环境

1. 安装官方 Codex Desktop。
2. 至少正常启动一次 Codex，让 `~/.codex/config.toml` 自动生成。
3. 关闭 Codex。

### 第二步：双击安装

进入项目的 [`macos/`](./macos/) 目录，双击：

```text
Install Codex Dream Skin.command
```

安装完成后，引擎会保存到 `~/.codex/codex-dream-skin-studio`，状态、日志、用户图片和主题库会保存到：

```text
~/Library/Application Support/CodexDreamSkinStudio
```

桌面会出现 Start、Customize、Verify 和 Restore 启动器，之后不需要依赖仓库原来的存放位置。

### 第三步：选择自己的图片

双击：

```text
Customize Codex Dream Skin.command
```

在 Finder 中选择图片并设置主题名称、强调色等参数。建议使用宽度不低于 2000 px 的横图，并为首页标题保留相对干净的区域。

### 第四步：启动、验证与恢复

根据需要双击桌面入口：

| 桌面入口 | 用途 |
| --- | --- |
| `Codex Dream Skin.command` | 启动或重新应用当前主题 |
| `Codex Dream Skin - Customize.command` | 更换图片和配色 |
| `Codex Dream Skin - Verify.command` | 验证注入并生成截图 |
| `Codex Dream Skin - Restore.command` | 停止注入并恢复官方基础外观 |

### 第五步：可选安装菜单栏控制

双击 `Install Menu Bar.command`，即可通过菜单栏的 **🎨 Skin** 执行应用、暂停、换图、切换已保存主题和完全恢复。

该入口使用 SwiftBar。若本机已安装 Homebrew，脚本可以自动安装 SwiftBar；否则请先手动安装 SwiftBar 后再次运行。

<details>
<summary><strong>macOS 终端安装方式</strong></summary>

```bash
cd macos

# 安装到稳定路径并创建桌面启动器，但暂不立即启动 Codex
./scripts/install-dream-skin-macos.sh --no-launch

# 自定义图片
~/.codex/codex-dream-skin-studio/scripts/customize-theme-macos.sh

# 可选安装菜单栏入口
./Install\ Menu\ Bar.command
```

更完整的图片规范、打包和运行说明见 [`macos/README.md`](./macos/README.md)。

</details>

## 制作自己的主题

在 Codex 中打开本仓库后，可以直接使用项目级 Skills。两端都遵循 **一张图片 = 一个独立主题**，不会移动或删除你的源图片。

### Windows：从图片生成主题包

使用 [`$add-windows-theme`](./.agents/skills/add-windows-theme/SKILL.md)：

```text
$add-windows-theme
请把 C:\Users\me\Pictures\aurora.gif 制作成一个新的 Windows 主题包，
名称为“极光之夜”，完成校验并热加载验证。
```

Skill 会自动：

1. 分析主色、明暗、主体位置和文案安全区。
2. 保留原图，并生成小于 250 KB 的真实 `preview.jpg`。
3. 为主题设计独立的明暗模式、语义配色、裁切焦点和遮罩。
4. 创建并校验 `theme.json`，避免 ID、排序或默认主题冲突。
5. 热加载主题目录，并检查首页、任务页、侧栏、输入框和窄窗口。

生成结构：

```text
windows/themes/aurora-night/
├── background.gif
├── preview.jpg
└── theme.json
```

支持 PNG、JPG、JPEG 和 GIF。主题 ID 使用唯一的 ASCII kebab-case，例如 `aurora-night`。

<details>
<summary><strong>手动创建 Windows 主题骨架与校验</strong></summary>

```powershell
powershell -NoProfile -ExecutionPolicy Bypass `
  -File '.\.agents\skills\add-windows-theme\scripts\new-theme-pack.ps1' `
  -ImagePath 'C:\path\to\image.png' `
  -ThemeId 'aurora-night'
```

根据 [`theme-schema.md`](./.agents/skills/add-windows-theme/references/theme-schema.md) 补齐 `theme.json` 后运行：

```powershell
node '.\.agents\skills\add-windows-theme\scripts\validate-themes.mjs' --repo .
node --check '.\windows\scripts\injector.mjs'
node --check '.\windows\assets\renderer-inject.js'
git diff --check
```

最后重新运行 `start-dream-skin.ps1`。如果 Codex 已经通过相同端口启动，新目录会被热加载。

</details>

### macOS：从图片保存到本机主题库

使用 [`$add-macos-theme`](./.agents/skills/add-macos-theme/SKILL.md)：

```text
$add-macos-theme
请把 /Users/me/Pictures/aurora.png 制作成一个 macOS 主题，
名称为“Aurora Night”，完成校验并热加载验证。
```

macOS 主题不会创建在项目内的 `macos/themes/`，而是保存到真实的本机主题库：

```text
~/Library/Application Support/CodexDreamSkinStudio/themes/<theme-id>/
```

可以从菜单栏切换，也可以执行：

```bash
./macos/scripts/switch-theme-macos.sh --id "<theme-id>"
```

支持 PNG、JPG、JPEG、WebP、HEIC 和 TIFF。Skill 会准备可注入图片、生成主题配置、校验文件，并通过回环 CDP 热加载验证。

## 工作原理

```text
用户运行本项目的启动脚本
        │
        ├─ 启动官方 Codex + 仅本机可访问的 CDP 端口
        │
        ▼
注入器连接 127.0.0.1
        │
        ├─ 读取当前 theme.json 与图片
        ├─ 注入 CSS、主题变量和必要的装饰 DOM
        └─ 监听页面跳转、刷新与主题变更
        │
        ▼
官方 Codex 原生界面 + 可切换主题渲染层
```

主题只作用于预期的 Codex 主渲染页面。它不会接管 API 请求，也不会把整套界面替换成一张无法交互的图片。

## 常见问题

| 问题 | 处理方式 |
| --- | --- |
| `Codex config not found` | 先正常启动一次官方 Codex，再确认 `~/.codex/config.toml` 已生成。 |
| Windows 提示找不到 `node` | 安装 Node.js，重新打开 PowerShell，并确认 `node --version` 可用。 |
| Codex 已运行但没有主题 | 关闭以普通方式启动的 Codex 后，使用主题快捷方式；或运行启动脚本并传入 `-RestartExisting`。 |
| `9335` 端口被占用 | 为 Windows 的 install、start、verify、restore 全部传入同一个其他端口，例如 `-Port 9345`。 |
| WindowsApps 出现“拒绝访问” | 使用仓库中的最新启动脚本；不要修改 WindowsApps 权限、所有者或官方签名。 |
| 新增主题没有出现在选择器 | 重新运行 `start-dream-skin.ps1`；当前目录清单会热加载并重建主题卡片。 |
| Codex 更新后主题消失 | 重新运行平台安装/启动脚本；脚本会重新发现当前 Codex 版本并应用主题。 |
| Windows 注入后验证失败 | 查看 `state.json` 中记录的日志路径；新版默认为 `%LOCALAPPDATA%\CodexDreamSkin\injector-<端口>.log` 与 `injector-<端口>-error.log`。 |
| macOS 菜单栏没有 `🎨 Skin` | 确认 SwiftBar 已启动，并将插件目录指向 `~/Library/Application Support/CodexDreamSkinStudio/menubar`。 |

更多 Windows 运行说明见 [`windows/references/runtime-notes.md`](./windows/references/runtime-notes.md)。

## 项目结构

```text
.
├── .agents/skills/
│   ├── add-windows-theme/             # 从图片制作 Windows 主题包
│   └── add-macos-theme/               # 从图片写入 macOS 本机主题库
├── docs/                              # 项目说明、平台路径与预览资料
├── macos/                             # macOS 安装、定制、验证、恢复与菜单栏脚本
└── windows/
    ├── assets/                        # 共享 CSS 与渲染注入脚本
    ├── scripts/                       # 安装、启动、验证、恢复与 CDP 注入器
    ├── themes/                        # 自动发现的独立主题包
    └── references/                    # QA 与运行说明
```

## 项目来源与维护版改进

本仓库基于原作者 **[Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)** 的开源项目继续开发。感谢原作者完成 Codex Desktop 外部主题、macOS 安装流程和本地 CDP 注入方案的基础工作。

在保留原项目设计与提交历史的基础上，本维护版主要完成了：

- 修复 Microsoft Store / MSIX 版 Codex 直接启动 WindowsApps 可执行文件时的“拒绝访问”问题，改为在正确的应用包上下文中启动。
- 建立由 `theme.json + 原图 + 缩略图` 组成的 Windows 独立主题包机制和应用内选择器。
- 扩展为 13 套明暗主题，并支持循环 GIF 动态主题、持久选择和目录热加载。
- 优化图片缓存、任务页轻量背景、DOM 监听和渲染负载。
- 增强页面跳转、刷新和热重载后的自动恢复能力。
- 提供 Windows / macOS 图片主题 Skills、校验流程、日志、验证和恢复工具。

这是独立维护的衍生项目，不代表原作者或 OpenAI 对本仓库中的后续修改提供背书。


## 安全边界

- CDP 只绑定 `127.0.0.1`，不会对局域网或公网监听。
- CDP 本身没有身份验证；主题运行期间不要运行来路不明的本机程序。
- 不修改官方 `.app`、`app.asar`、WindowsApps 文件、应用签名、所有权或安装包内容。
- 不接管 API 请求，不自动修改 API Key、Base URL 或模型供应商配置。
- 恢复操作只清理本项目的注入层、守护进程、可选快捷方式和可选基础外观配置。
- 主题图片中涉及的人物、角色、品牌或第三方素材，需要由主题发布者自行确认版权、肖像权和商标授权。

## 许可、署名与素材

- 软件代码沿用 MIT License，见 [`macos/LICENSE`](./macos/LICENSE) 和 [`macos/NOTICE.md`](./macos/NOTICE.md)。
- 衍生维护应保留原项目许可证、署名和相关声明。
- 本项目与 OpenAI 无隶属、赞助或官方认可关系；Codex 及相关商标归其权利人所有。
- 用户提供的图片和第三方素材不会因本项目使用 MIT License 而自动获得再分发授权。

## 交流群

<p align="center">
  <img src="qrcode_1784176993469.jpg" alt="Codex Dream Skin 交流群二维码" width="220"><br>
  QQ 群：<strong>1067113777</strong><br>
  <a href="https://qm.qq.com/q/5e4FpcDrW2">点击加入 Codex-Dream-Skin 交流群</a>
</p>

---

欢迎提交 Issue 或 Pull Request。报告问题时，请附上操作系统、Codex 版本、执行命令和脱敏后的日志片段。
