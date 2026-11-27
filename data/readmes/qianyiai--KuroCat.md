<div align="center">
  <img src="website/public/assets/kurocat-icon.png" alt="KuroCat" width="84" height="84" />
  <h1>KuroCat</h1>
  <p>
    <strong>免费开源的 3D / 2D 透明置顶桌面打字小黑猫 &amp; AI 编程伴侣</strong><br />
    <sub>轻量 Rust + Tauri v2 打造 · 6 款猫咪 + 大肥鱼鲸鱼娘 · 输密码自动闭眼 · OBS 免抠像 · 内置 MCP AI 捏猫</sub>
  </p>

  <p>
    <strong>🇨🇳 简体中文</strong> &nbsp;·&nbsp;
    <a href="./README.en.md">🇺🇸 English</a> &nbsp;·&nbsp;
    <a href="./README.ja.md">🇯🇵 日本語</a> &nbsp;·&nbsp;
    <a href="./README.ko.md">🇰🇷 한국어</a>
  </p>

  <p>
    <a href="https://kurocat.org/"><img src="https://img.shields.io/badge/Website-kurocat.org-d4f044?style=flat-square&logo=googlechrome&logoColor=111" alt="Official Website" /></a>
    <a href="https://pan.quark.cn/s/673684ea4103"><img src="https://img.shields.io/badge/%E5%A4%B8%E5%85%8B%E7%BD%91%E7%9B%98-Win%20%7C%20Mac%20%7C%20Android-2563eb?style=flat-square&logo=icloud&logoColor=fff" alt="夸克网盘官方下载" /></a>
    <a href="https://github.com/qianyiai/KuroCat/releases/latest"><img src="https://img.shields.io/github/v/release/qianyiai/KuroCat?style=flat-square&color=38bdf8" alt="Latest Release" /></a>
    <a href="https://github.com/qianyiai/KuroCat/blob/main/LICENSE"><img src="https://img.shields.io/github/license/qianyiai/KuroCat?style=flat-square&color=22c55e" alt="MIT License" /></a>
    <img src="https://img.shields.io/badge/Platform-Win11%2F10%2F7%20%7C%20macOS%20%7C%20Linux%20%7C%20Android-818cf8?style=flat-square" alt="Cross Platform" />
  </p>

  <p>
    <a href="https://pan.quark.cn/s/673684ea4103"><strong>☁️ 夸克网盘高速下载（Win/Mac/安卓）</strong></a> &nbsp;·&nbsp;
    <a href="https://kurocat.org/"><strong>🌐 官网在线试玩</strong></a> &nbsp;·&nbsp;
    <a href="https://kurocat.org/download/"><strong>📥 官方下载与校验</strong></a> &nbsp;·&nbsp;
    <a href="https://kurocat.org/vs/bongo-cat/"><strong>⚡ vs Bongo Cat</strong></a> &nbsp;·&nbsp;
    <a href="https://kurocat.org/obs/"><strong>🎥 OBS 透明源</strong></a> &nbsp;·&nbsp;
    <a href="https://kurocat.org/mcp/"><strong>🤖 AI / MCP</strong></a> &nbsp;·&nbsp;
    <a href="https://github.com/qianyiai/homebrew-tap"><strong>🍺 Homebrew</strong></a>
  </p>

  <sub>🔒 唯一官方渠道：<a href="https://kurocat.org/"><strong>kurocat.org（唯一官网）</strong></a> · <a href="https://pan.quark.cn/s/673684ea4103"><strong>夸克网盘（KuroCat 谦一_官方）</strong></a> · <a href="https://github.com/qianyiai/KuroCat">GitHub</a> · <a href="https://github.com/qianyiai/homebrew-tap">Homebrew Tap</a> · <a href="https://kurocat.org/security/">防伪安全公告</a></sub>
</div>

> [!TIP]
> **☁️ 官方夸克网盘高速分流（内含 Windows / macOS / Android 安装包）**
>
> 国内用户推荐优先从官方分享文件夹 [**「KuroCat 谦一_官方」→ 点此打开夸克网盘获取**](https://pan.quark.cn/s/673684ea4103)（打开「夸克网盘 APP」也可复制口令 `/~f3813cZv6O~:/` 直达）。不限速一站打包，点开获取即可免费支持作者持续开源维护！

> [!CAUTION]
> **官方渠道声明与安全警示（谨防假冒木马站点 `kurocat.net`）**
>
> **KuroCat 的唯一官方网站为 [`https://kurocat.org/`](https://kurocat.org/)**，唯一官方开源仓库为 `github.com/qianyiai/KuroCat`。
>
> 近期发现仿冒站点 **`kurocat.net`**（与作者完全无关）冒充 KuroCat 官网，并向 Windows 用户分发非官方的 **`64.25 MB` `KuroCat.v5.1.0.zip`**（SHA-256: `19ad10c48a7448584f1d00aa086f52b38231bacd659f04e83d3cefc60209796d`），内含非官方 `35.92 MB KuroCat.exe` 及 `50 MiB` 未压缩填充文件（`bin/resources.pak` / `bin/versions.dat`），而正版官方 Windows 10/11 安装包仅为 **`~2.4 MB` 的 `.exe`** 且从不附带此类文件。**切勿从 `kurocat.net` 下载或运行任何可执行文件！** 详情与自查步骤见 [**官方安全公告**](https://kurocat.org/security/) 与 [`SECURITY.md`](./SECURITY.md)。

<br />

## 🎬 实机演示

<table>
  <tr>
    <td align="center" width="52%" valign="top">
      <a href="https://kurocat.org/" target="_blank" rel="noopener">
        <img src="docs/wake-pet-demo.webp" alt="KuroCat 3D 小黑猫午睡起床气与摸头呼噜演示" width="380" />
      </a>
      <br />
      <strong>🐈‍⬛ <a href="https://kurocat.org/">打开官网在线试玩（直接敲键盘 &amp; 摸猫头）→</a></strong>
      <br />
      <sub>
        午睡打盹 → 吵醒起床气 → 摸头呼噜消气 ·
        <a href="https://kurocat.org/media/wake-pet-9s.mp4">9s 含音效 MP4</a>
      </sub>
    </td>
    <td align="center" width="48%" valign="top">
      <a href="https://kurocat.org/#whale-demo" target="_blank" rel="noopener">
        <img src="docs/whale-demo.webp" alt="KuroCat 大肥鱼（鲸鱼娘）14s 实机演示" width="272" />
      </a>
      <br />
      <strong>🐳 <a href="https://kurocat.org/#whale-demo">观看大肥鱼 1080P 60fps 原片 →</a></strong>
      <br />
      <sub>
        鼠键尾三线同动 · 加速脸红大笑 · 密码捂眼 ·
        <a href="https://kurocat.org/media/whale-douyin-14s.mp4">国内高速 MP4</a>
      </sub>
    </td>
  </tr>
</table>

---

<a id="download"></a>

## 📥 快速下载（`v5.1.3`）

> ✨ **v5.1.3 新亮点**：全平台 **20%–100% 不透明度调节**、**KuroCat Live 直播伴侣纯色抠像窗**、**2D/3D/MCP 22 项全五官捏脸**、**真猫实录呼噜声 & 打字键鼠音效**、**防误触贴边偷看（Edge-Peek）与全新待机互动动作**、**Android v5.1.3 全特性同步**，并集中修复 Windows 管理员重启 / 拖动 / 金融密码框 / 远程桌面退让 / macOS 键盘监控 / 面向观众鼠标朝向（#98 #80 #87 #40 #63 #92）。完整更新日志见 [Releases](https://github.com/qianyiai/KuroCat/releases)。

| 平台 | 推荐版本 | 体积 | 下载链接 |
| --- | --- | :---: | --- |
| **🪟 Windows 10 / 11** | x64 经典安装版（内置 65% / 108 键切换） | 2.40 MB | [**☁️ 夸克网盘**](https://pan.quark.cn/s/673684ea4103) · [**国内高速**](https://kurocat.org/#download) · [**GitHub 官方源**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-5.1.3-x64-setup.exe) |
| **🍎 macOS 10.15+** | Apple Silicon (M1–M4) & Intel 通用 DMG | 6.57 MB | [**☁️ 夸克网盘**](https://pan.quark.cn/s/673684ea4103) · [**国内高速**](https://kurocat.org/releases/v5.1.3/KuroCat-v5.1.3-macos-universal.dmg) · [**GitHub 官方源**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-macos-universal.dmg) |
| **🐧 Linux (x86_64)** | Ubuntu 22.04+ / Debian 12+ / 麒麟 V11+ | 2.66 MB | [**`.deb`**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-linux-amd64.deb) · [**`.AppImage`**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-linux-amd64.AppImage) · [**国内高速**](https://kurocat.org/#linux-download) |
| **🐧 Linux (ARM64)** | 飞腾 / 鲲鹏 / 麒麟 V11+ / 树莓派 | 2.62 MB | [**`.deb`**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-linux-arm64.deb) · [**`.AppImage`**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-linux-arm64.AppImage) · [**国内高速**](https://kurocat.org/#linux-download) |
| **🖥️ Windows 7 SP1 (64 位)** | 64 位离线兼容绿包（内置 WebView2 109） | 179.3 MB | [**GitHub 官方源**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-win7-x64-portable.zip) · [**国内高速**](https://kurocat.org/releases/v5.1.3/KuroCat-v5.1.3-win7-x64-portable.zip) |
| **🖥️ Windows 7 SP1 (32 位)** | 32 位离线兼容绿包（内置 WebView2 109） | 159.4 MB | [**GitHub 官方源**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-win7-x86-portable.zip) · [**国内高速**](https://kurocat.org/releases/v5.1.3/KuroCat-v5.1.3-win7-x86-portable.zip) |
| **🤖 Android** | Android 客户端 APK | 5.17 MB | [**☁️ 夸克网盘**](https://pan.quark.cn/s/673684ea4103) · [**国内高速**](https://kurocat.org/releases/v5.1.3/KuroCat-v5.1.3-android.apk) · [**GitHub 官方源**](https://github.com/qianyiai/KuroCat/releases/download/v5.1.3/KuroCat-v5.1.3-android.apk) |

**🍺 macOS Homebrew 一键安装**（推荐，自动清理隔离属性、免手动 `xattr`）：

```bash
brew install --cask qianyiai/tap/kurocat
```

<details>
<summary>🪟 <b>Windows 常见问题</b>：Edge / Chrome 提示「通常不会下载」· 蓝框拦截 · 缺少 WebView2</summary>

<br />

- **浏览器拦截 `.exe`**（开源项目未购商业 EV 签名证书，源码全公开）：
  - **Edge**：鼠标悬停下载条 → 点右侧 `···` → **保留** → 点「删除」旁下箭头 `▾` → **仍然保留**。
  - **Chrome**：按 `Ctrl + J` → **保留危险文件** → **仍然保留**。
  - **蓝框「Windows 已保护你的电脑」**：点 **更多信息** → **仍要运行**。
- **老版 Win10 / LTSC 提示缺少 WebView2**：下载微软官方引导程序 [`MicrosoftEdgeWebview2Setup.exe`](https://go.microsoft.com/fwlink/p/?LinkId=2124703)（1.8 MB），右键「以管理员身份运行」即可。
- **Win7 SP1 绿包版**：全部解压后保持 `KuroCat.exe` 与 `WebView2Runtime` 同目录直接双击运行（支持原生 256 级逐像素透明，开不开 Aero 均无白框）。

</details>

<details>
<summary>🍎 <b>macOS 首次打开与权限配置</b>：解除隔离 · 辅助功能与输入监控</summary>

<br />

- **手动安装 `.dmg` 提示「无法验证开发者 / 已损坏」**：打开终端执行一次即可彻底解除隔离（使用上方 Homebrew 安装则会自动完成）：
  ```bash
  xattr -cr /Applications/KuroCat.app && open /Applications/KuroCat.app
  ```
- **开启全局键鼠响应**：在「系统设置 → 隐私与安全性」中同时勾选 **辅助功能** 与 **输入监控** 里的 `KuroCat`（兼容 Karabiner-Elements；若覆盖升级后失效，选中 `KuroCat` 点 `-` 移除再重新 `+` 添加）。
- **macOS Stdio MCP 路径**：`/Applications/KuroCat.app/Contents/MacOS/KuroCat`（参数 `--mcp`）。

</details>

<details>
<summary>🎮 <b>游戏全屏 · OBS 免抠像直播 · 强反作弊网游护航</b></summary>

<br />

- **游戏全屏置顶**：Win10/11 全屏优化（FSO）或无边框窗口化下自动置顶且不抢焦点，建议开启 **锁定鼠标穿透**（按住 `Alt` 临时拖动）。若游戏以管理员运行，右键系统托盘点 **以管理员身份重启** 即可捕获键鼠。
- **OBS 透明直播源**：右键小猫或托盘点 **复制 OBS 透明源地址**（开启本机 `http://127.0.0.1:27421/obs`），在 OBS 添加浏览器源即享原生 Alpha 透明通道（免绿幕抠像，支持 **仅 OBS 显示** 与密码防偷窥同步）。
- **强内核反作弊网游**（无畏契约、三角洲行动等）：游玩前建议右键托盘点击 **暂停监听并隐藏（游戏反作弊护航）**，彻底卸载底层钩子。

</details>

<details>
<summary>🐧 <b>Linux 发行版依赖要求说明</b></summary>

<br />

- 基于 Ubuntu 22.04 基线构建，需要 **`glibc >= 2.34`**（适用 Ubuntu 22.04+ / Debian 12+ / 银河麒麟 V11+；暂不支持 `glibc 2.31` 的银河麒麟 V10 SP1）。
- `.deb` 包依赖 `libwebkit2gtk-4.1-0` 与 `libayatana-appindicator3-1`；无管理员权限可直接运行 `.AppImage`。
- 原生动态加载 X11 `XRecord`（免 root 捕获全局键鼠），Wayland 环境自动回退 `evdev`。

</details>

---

## ✨ 核心特性

<table>
  <tr>
    <td align="center" width="50%">
      <img src="website/public/assets/showcase-108key.webp" alt="65% 紧凑 / 108 键全尺寸双视角" />
      <br /><sub>65% 紧凑 / 108 键全尺寸 × 面向猫咪 / 面向观众双视角</sub>
    </td>
    <td align="center" width="50%">
      <img src="website/public/assets/showcase-mouse.webp" alt="鼠标左右键独立高亮 + 自动更新提醒" />
      <br /><sub>鼠标左 / 右键独立双色高亮 + App 内静默更新</sub>
    </td>
  </tr>
</table>

- **✨ 3D 立体手办 / 2D 经典双引擎**：GPU 合批渲染与游戏自动 30 FPS 省电模式，支持 20%–150% 无级缩放、3D 项圈铃铛与游戏自动戴电竞耳机。
- **🤖 AI 编程伴侣联动**：支持 **Claude Code / Codex / DeepSeek / 豆包工作版 / WorkBuddy / Cursor / Antigravity**，写代码自动代打、跑命令尾巴敲回车、待确认/报错/完工实时互动。
- **🎨 7 款内置皮肤 + MCP 无限捏猫**：经典小黑猫、布偶猫、大橘猫、三花猫、奶牛猫、暹罗猫 + **🐳 大肥鱼（鲸鱼娘）**，支持摸头眯眼与 24.5Hz 呼噜声。
- **⌨️ 65% / 108 键双视角 + 独立键鼠**：一键切换全尺寸小键盘与正反视角，支持自定义尾巴拍键，鼠标左/右/中键独立分色按压与错落 3D 按键气泡。
- **🙈 系统级输密码防偷窥**：自动感知 Win / Mac 密码框，底层钩子直接拦截不外传按键——猫咪闭眼、大肥鱼双手捂眼并遮蔽键帽。
- **🎥 OBS 透明源 & 多屏无感升级**：原生 Alpha 透明直播源、多显示器工作区固定、macOS 全屏空间悬浮、SHA-256 校验一键自动更新。

---

<a id="mcp"></a>

## 🤖 AI 伴侣与 MCP 捏猫

KuroCat 单文件原生内置 **Stdio** 与 **本机 Streamable HTTP（`127.0.0.1:27420`）** 双模式 MCP Server，无需安装 Node.js 或 Python：

1. 运行 KuroCat，右键小猫 → 开启 **「开启 MCP 扩展」** → 点击 **「复制 MCP 配置」**（或点 **「发给 AI 自动配置」**）。
2. 粘贴到 **Claude Desktop / Cursor / Antigravity / Windsurf / Cline** 后，直接发照片或用自然语言指挥 AI：

> 💬 *「看这张我家三花猫的照片，用 KuroCat MCP 按它的花色、耳型和斑点给我捏一只专属 3D 桌宠并切过去！」*  
> 💬 *「把桌宠缩放到 85%，切换为 108 键面向观众视角，并关闭悬浮按键气泡。」*

<details>
<summary>📋 <b>展开查看 Stdio / HTTP 配置 JSON 与 10 项内置 MCP 工具清单</b></summary>

<br />

**方式 A：Stdio 模式（所有 MCP 客户端通用）**
```json
{
  "mcpServers": {
    "kurocat": {
      "command": "C:\\Users\\<你的用户名>\\AppData\\Local\\KuroCat\\KuroCat.exe",
      "args": ["--mcp"]
    }
  }
}
```

**方式 B：本机 Streamable HTTP 模式（桌宠运行时直连）**
```json
{
  "mcpServers": {
    "kurocat": {
      "url": "http://127.0.0.1:27420/mcp"
    }
  }
}
```

| 工具名 | 功能说明 |
| --- | --- |
| `list_cats` | 列出所有内置与自定义皮肤及当前激活角色 |
| `get_cat_schema` | 获取完整花纹、16 处斑点坐标与 7 项 2D/3D 脸型耳型轮廓规范 |
| `upsert_cat` | 创建或全量覆盖自定义猫咪并 0.4s 热更新上屏 |
| `patch_cat` | 局部微调现有猫咪（支持微调内置皮肤） |
| `switch_cat` | 按 ID 立即切换桌面当前显示的猫咪 |
| `delete_cat` | 删除自定义猫咪（或重置被覆写的内置皮肤） |
| `get_settings` / `update_settings` | 读取或修改缩放比例、键盘配列、气泡、呼噜声、穿透锁定与开机自启 |
| `set_agent_status` | 同步 AI 编程代理状态（思考/编码/执行命令/待确认/出错/完工） |
| `trigger_action` | 触发摸头、开心、生气、打瞌睡等桌面互动动作 |

自定义猫咪配置保存在 `%APPDATA%\kuro-cat-pet\cats.json`（Windows）或 `~/Library/Application Support/kuro-cat-pet/cats.json`（macOS），支持手动编辑热重载。

</details>

---

## 📈 实时增长曲线

<a href="https://kurocat.org/#growth">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://kurocat.org/api/growth-chart?theme=dark&amp;lang=zh" />
    <source media="(prefers-color-scheme: light)" srcset="https://kurocat.org/api/growth-chart?theme=light&amp;lang=zh" />
    <img alt="KuroCat 实时下载量与 GitHub Stars 增长曲线" src="https://kurocat.org/api/growth-chart?theme=dark&amp;lang=zh" width="100%" />
  </picture>
</a>

<p align="center">
  <sub>📡 实时同步全渠道累计下载量与 GitHub Stars · <a href="https://kurocat.org/#growth">前往官网查看可交互双轴曲线 →</a></sub>
</p>

---

<details>
<summary>🛠️ <b>开发者指南：本地源码构建 &amp; macOS 发布签名</b></summary>

<br />

前置环境：Windows 10/11 或 macOS 11+、Node.js 18+、Rust（`cargo`）。

```bash
git clone https://github.com/qianyiai/KuroCat.git
cd kurocat
npm install
npm run tauri:dev      # 本地热更新调试
npm run tauri:build    # 编译 Release 安装包
```

**macOS 发布签名（可选，跨版本升级保留辅助功能权限）**：

```bash
scripts/macos-codesign.sh create-cert /path/outside/repo/kurocat-signing
gh secret set MACOS_SIGNING_CERT_P12_BASE64 < /path/outside/repo/kurocat-signing/kurocat-signing.p12.base64
gh secret set MACOS_SIGNING_CERT_PASSWORD < /path/outside/repo/kurocat-signing/kurocat-signing.password
```

<sub>不配置 Secrets 时自动回退临时签名（ad hoc）；配置同一套自签名证书后，用户覆盖升级无需重新授予 macOS「辅助功能 / 输入监控」权限。</sub>

</details>

## 📄 开源协议与致谢

本项目基于 [MIT License](LICENSE) 开源，完全免费。如果这只桌面小猫陪你写代码、办公或直播时带来过好心情，欢迎点一颗 ⭐ 支持持续维护！

- **🐳 大肥鱼（鲸鱼娘）** 运行时素材基于 MIT 开源项目 [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet)（衍生自 [QCYTSN/dsh-dafeiyu](https://github.com/QCYTSN/dsh-dafeiyu)），详见 `src/assets/dafeiyu/LICENSE-MIT.txt`。
- **社区贡献者**：特别感谢 [@XYZliang](https://github.com/XYZliang)、[@CandySunPlus](https://github.com/CandySunPlus)（#51）、[@Jack-GPT](https://github.com/Jack-GPT)（#47, #64）、[@Mangome](https://github.com/Mangome)（#67, #68）、[@Zyred9](https://github.com/Zyred9)（#42, #48）、[@bj-wangxiaoxiao](https://github.com/bj-wangxiaoxiao)（#65）、[@hacksmo](https://github.com/hacksmo)（#45）、[@LiMuhua](https://github.com/LiMuhua)（#75）。
