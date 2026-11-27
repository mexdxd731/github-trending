# Antigravity Plus (`antigravity-plus`)

面向 **Google Antigravity (Windows)** 的模块化增强套件。采用 **0 字节无损原生引导层（Shim V3）** 架构，在不破坏官方 `app.asar` 归档与签名的前提下，一站式集成极简桌面主题、三大实时状态微件、新对话最高旗舰模型自动锁定、鼠标侧键与四向右键手势、Thinking 与对话标题流式中文化、右下角无抢焦交互式任务通知/一键权限审批，以及进程级网络与外部浏览器路由修复。

**全部 15 项功能与 3 种翻译模式均支持随时独立开启或关闭**，可视化开关毫秒级实时生效。

---

## 一、功能模块一览（全部支持随时独立开/关）

| 分类 | 配置键 (`features.*`) | 默认 | 实时生效 | 功能说明 |
| :--- | :--- | :---: | :---: | :--- |
| **界面与微件** | `codexTheme` | 开启 | 即时 (0ms) | ChatGPT / Codex 极简桌面排版主题、高对比度代码块与 900px 宽屏阅读列 |
| **界面与微件** | `contextRing` | 开启 | 即时 (0ms) | 输入框右下角三色上下文圆环（0–59% 翠绿 / 60–79% 琥珀橙 / ≥80% 珊瑚红），支持免点击悬停预览（140ms 跨缝缓冲）、点击固定与 `Token breakdown` 明细 |
| **界面与微件** | `performancePill` | 开启 | 即时 (0ms) | 实时任务阶段计时（`Thinking` / `Generating` / `Executing`）与 `Avg tok/s` 输出速率胶囊，支持免点击悬停预览与点击固定 |
| **界面与微件** | `quotaSplitRing` | 开启 | 即时 (0ms) | 侧边栏左下角高对比度加粗双半环配额指示器（上半环 `5h` / 下半环 `Weekly`），独立轨道底槽与悬停重置提示 |
| **交互与模型** | `autoHighestModel` | 开启 | 即时 (0ms) | 仅在空白新对话自动选择最高阶旗舰模型与最高推理档位（手动切换后当次会话绝不覆盖） |
| **交互与模型** | `navigationGestures` | 开启 | 即时 (0ms) | 鼠标侧键（前进/后退）与按住右键四向拖拽手势（`←` 返回、`→` 前进、`↑` 到顶、`↓` 到底） |
| **交互与模型** | `newWindowMenu` | 开启 | 即时 (0ms) | 在顶部 `Window` 下拉菜单提供 `New Window (Ctrl+Shift+N)`，配合任务栏右键新建窗口与 `--new-window` |
| **实时中文化** | `thoughtTranslation` | 开启 | 即时 (0ms) | `Thinking` 思考展开正文实时流式中文化，完整保护代码路径与命令行参数，支持一键对照原文 |
| **实时中文化** | `titleTranslation` | 开启 | 即时 (0ms) | 侧边栏会话列表与顶栏英文标题自动中文化，鼠标悬停查看中英双语标题 |
| **弹窗与网络** | `taskToast` | 开启 | 即时 (0ms) | 右下角原生无抢焦任务完成提醒、`ask_question` 单选/多选直接作答与后台零切窗权限审批 |
| **弹窗与网络** | `externalBrowser` | 开启 | 即时 (0ms) | 拦截外部 `http/https` 链接并优先使用 Chrome（或系统默认浏览器）新建标签页打开 |
| **弹窗与网络** | `localProxy` | 开启 | 下次启动生效 | 仅在进程内存作用域注入本地回环代理（或自动继承系统 WinINET 代理）并清理异常 `NODE_OPTIONS` |
| **弹窗与网络** | `fastpushFix` | 开启 | 下次启动生效 | 为代理环境下的 `language_server.exe --standalone` 自动注入 `--remote_agent_fastpush_override=false` 防止流式断连 |
| **工作流规则** | `chineseExecutionRule` | 开启 | 即时同步文件 | 自动在 `~/.gemini/config/rules/` 同步或移除 `agy-plus-chinese-execution.md`（默认简体中文执行与回复） |
| **工作流规则** | `workspaceScriptsRule` | 开启 | 即时同步文件 | 自动在 `~/.gemini/config/rules/` 同步或移除 `agy-plus-workspace-local-scripts.md`（禁止 C 盘临时目录散落脚本） |

---

## 二、一键安装与一键卸载

### 环境要求
- **操作系统**：Windows 10 / Windows 11（x64）
- **客户端**：已安装 Google Antigravity（默认路径 `%LOCALAPPDATA%\Programs\antigravity`）
- **零额外运行时依赖**：
  - 使用 Windows 系统自带的 PowerShell 5.1 与内置 `.NET Framework csc.exe` 编译右下角原生通知宿主；
  - 若电脑未安装独立 Node.js，脚本会自动回退使用 `Antigravity.exe` 内置运行时（`ELECTRON_RUN_AS_NODE=1`），开箱即用。

### 一键安装
1. 克隆或下载本仓库后，直接双击运行根目录下的 **`Install.cmd`**。
2. 如需指定代理端口、自定义目录或接管旧版引导脚本，可在终端传入可选参数：
   ```powershell
   .\Install.cmd -ProxyUrl "http://127.0.0.1:7897"
   ```
   完整安装参数（传给 `Install.cmd` 或 `scripts\Install.ps1`）：
   - `-InstallRoot <路径>`：自定义独立运行时目录（默认 `%LOCALAPPDATA%\AntigravityPlus`）。
   - `-AntigravityResourcesDir <路径>`：自定义客户端 `resources` 目录（默认 `%LOCALAPPDATA%\Programs\antigravity\resources`）。
   - `-GeminiConfigDir <路径>`：自定义 `~/.gemini/config` 目录（默认 `$HOME\.gemini\config`）。
   - `-ProxyUrl <URL>`：指定本地回环代理（默认自动读取或继承系统代理）。
   - `-OfflineTranslatorDir <路径>`：指定配套离线翻译引擎目录。
   - `-CleanLegacy` / `-LegacyLaunchDir <路径>`：明确授权接管旧版 Shim / 同名 Toast 插件与旧版规则，并在接管前自动将原文件备份至 `<InstallRoot>\backup\`（未传 `-CleanLegacy` 时遇未知 Shim 或同名插件会前置拦截，零文件覆盖）。
   - `-AllowMissingClient`：仅部署运行时与配置，跳过客户端 `app.asar` 校验（通常仅用于预部署）。
   - `-SkipRegistryRun` / `-SkipScheduledTask` / `-NoStartWatcher`：跳过开机自启、计划任务注册或立即启动守护进程。
3. 安装脚本会自动将运行时部署至目标目录并写入 `install-receipt.json` 绑定客户端路径，即使后续移动或删除下载的源码文件夹也不会影响运行。原地升级前会自动停止当前安装目录的旧版 `TaskToastHost.exe` 与 `watch.cjs` 进程，避免残留锁死文件。

### 一键卸载（100% 恢复官方原版）
- 直接双击仓库目录或**已安装目录**（例如 `%LOCALAPPDATA%\AntigravityPlus` 或自定义 `-InstallRoot`）下的 **`Uninstall.cmd`**。在自定义安装目录内直接双击 `Uninstall.cmd` 或 `Manage.cmd` 时，脚本会自动识别所在目录的 `install-receipt.json` 并作用于该实例。
- 卸载程序会严格校验 `install-receipt.json` 的目录绑定与 `resources\app` 归属（拒绝误删任何无关用户文件），随后移除打开窗口中的前端增强组件、关闭右下角弹窗宿主、清理开机守护与计划任务、删除写入的 Hook 插件与规则文件，并将 `app.real.asar` 原封不动还原回 `app.asar`。
- 若当初使用 `-CleanLegacy` 接管过旧版插件或规则，默认卸载会自动将备份的原插件与规则还原；同时默认保留 `<InstallRoot>\backup\` 备份目录以保障可回溯。
- 卸载可选参数（传给 `Uninstall.cmd` 或 `scripts\Uninstall.ps1`）：
  - `-KeepConfigAndCache`：保留 `config.json` 与标题翻译缓存。
  - `-NoRestoreLegacy`：卸载时不自动还原 `-CleanLegacy` 备份的旧版插件与规则。
  - `-PurgeBackups`：连同 `<InstallRoot>\backup\` 一并清理。
  - `-SkipSystemRegistration`：跳过注册表与计划任务清理。

---

## 三、如何随时开启或关闭任意功能

安装完成后，你有 **3 种方式** 随时独立控制每一项功能：

### 方式 1：客户端内可视化开关面板（推荐）
通过以下任意入口即可呼出 **Antigravity Plus 功能控制中心**：
- 点击侧边栏左下角的 **调节滑块图标**（即使关闭了所有主题和圆环，该入口始终保留）；
- 点击顶部菜单栏 **`Window -> Antigravity Plus Settings…`**；
- 按下快捷键 **`Ctrl + Shift + ,`**。

面板内提供全部 15 个独立开关、**「混合加速 / 仅在线 / 仅离线」** 三段式翻译引擎切换器，以及底部的 **「全部开启」 / 「全部关闭（原版模式）」** 一键切换按钮。修改后立即持久化至 `%LOCALAPPDATA%\AntigravityPlus\config.json` 并同步到所有打开的窗口。

### 方式 2：交互式终端菜单与命令行（`Manage.cmd`）
- **图形化数字菜单**：直接双击 **`Manage.cmd`**，输入序号 `1`–`15` 即可切换对应功能开关，输入 `M` 切换翻译引擎模式，输入 `P` 修改本地代理地址。
- **命令行快捷指令**：
  ```powershell
  .\Manage.cmd status                        # 查看桥接状态与当前窗口注入情况
  .\Manage.cmd config                        # 查看当前完整配置与离线模型探测状态
  .\Manage.cmd disable codexTheme            # 立即关闭 Codex 主题恢复原版配色
  .\Manage.cmd enable codexTheme             # 立即开启 Codex 主题
  .\Manage.cmd toggle thoughtTranslation     # 切换 Thinking 实时中文化开关
  .\Manage.cmd set-mode online               # 切换翻译模式：hybrid | online | offline
  .\Manage.cmd set-offline-root "D:\Custom\Translator"  # 自定义或清空离线翻译引擎目录
  .\Manage.cmd set-proxy http://127.0.0.1:7897
  ```

### 方式 3：直接编辑 `config.json`
直接修改 `%LOCALAPPDATA%\AntigravityPlus\config.json` 中的布尔值，运行中的客户端会在 1.5 秒内自动感知并热同步。

---

## 四、翻译引擎架构与可选离线模型包

`Antigravity Plus` 的实时中文化采用 **多级自动容灾管线**：
1. **默认在线极速通道（无需额外安装任何模型）**：
   - **第 1 级**：Google Chrome 词典批量通道（`clients5.google.com`，单次并发打包整段句子，延迟最低）；
   - **第 2 级**：阿里达摩院 NMT 直连通道（`translate.alibaba.com`，国内免代理直连毫秒级响应，自动续期 CSRF 凭证）；
   - **第 3 级**：Google GTX 备用通道（`translate.googleapis.com`）；
   - 任意通道出现超时或 `429` 限流时自动进入 45–120 秒冷却并无缝降级至下一通道，同时内置 AI/深度学习术语精修（如保护 `PyTorch`、`ONNX Runtime`、`Antigravity` 不被误译，修正 `DDP 培训 -> DDP 训练` 等）。
2. **第 4 级本地离线神经机器翻译兜底（可选独立仓库）**：
   - 若你处于纯离线内网环境，或希望在所有在线通道不可用时拥有 100% 本地兜底，可搭配安装配套仓库 **[`antigravity-offline-translator`](https://github.com/derrickLL/antigravity-offline-translator)**（基于 Windows JobObject 硬件级 25% CPU 限额 + `CTranslate2 int8` 离线模型）。
   - 安装 `antigravity-offline-translator` 后，`Antigravity Plus` 会自动识别 `%LOCALAPPDATA%\AntigravityOfflineTranslator\deployment.json`，无需手动配置路径；若未安装离线包，保持默认的 `hybrid` 或 `online` 模式即可零报错正常使用。

---

## 五、全局与客户端文件改动透明清单

为保证工程透明度与可审计性，以下完整列出 `Install.cmd` 在本机创建或调整的全部文件与系统项（**绝不修改系统级/用户级 `HTTP_PROXY` 环境变量，绝不解包重打包官方 `app.asar`**）：

### 1. Antigravity 客户端目录（`%LOCALAPPDATA%\Programs\antigravity\resources\`）
- **`app.asar` -> `app.real.asar`**：将官方原始归档重命名为 `app.real.asar`（二进制内容 0 字节改动）。
- **新增 `app\package.json`**：同步官方版本号并将入口指向同目录的 `index.js`。
- **新增 `app\index.js`**：30 行轻量引导脚本（标记为 `ANTIGRAVITY_PLUS_SHIM_V3`），启动时先加载 `%LOCALAPPDATA%\AntigravityPlus\src\core\runtime.cjs`，随后无缝移交回 `../app.real.asar/dist/main.js`。

### 2. 独立运行时目录（`%LOCALAPPDATA%\AntigravityPlus\`）
- **`config.json`**：保存全部 15 个功能开关、代理地址、外部浏览器路径与翻译模式。
- **`bin\TaskToastHost.exe`**：安装时由本机 `.NET Framework csc.exe` 从源码 `src\toast\TaskToastHost.cs` 与 `NativeApproval.cs` 现场编译生成的右下角原生 WinForms 弹窗宿主（透明可审计，无预编译黑盒二进制）。
- **`bin\Start-Watcher.vbs` / `bin\Ensure-Shim.vbs`**：无黑框后台静默守护启动脚本。
- **`cache\title-translations.json`**：本地会话标题中英映射缓存（避免重复请求翻译接口）。

### 3. Antigravity Agent 插件与全局规则目录（`~/.gemini/config/`）
- **新增插件 `~/.gemini/config/plugins/task-completion-toast/`**：
  - `plugin.json`：声明 `Antigravity Plus Toast Hook` 插件元信息。
  - `hooks.json`：注册 `Stop` 事件钩子（统一调用 `run-on-stop.cmd`，优先使用本机 Node.js，无独立 Node.js 时自动回退 `Antigravity.exe` + `ELECTRON_RUN_AS_NODE=1`），用于在后台会话完成时即使窗口未激活也能立即推送右下角通知卡片。
  - `on-stop.cjs` & `run-on-stop.cmd`：轻量转发器，读取 `config.json` 中的 `features.taskToast` 开关并唤醒 `%LOCALAPPDATA%\AntigravityPlus\src\toast\on-task-stop.cjs`（当你在面板中关闭「右下角任务弹窗」时，该钩子会直接静默退出）。
- **可开关全局工作流规则 `~/.gemini/config/rules/`**：
  - **`agy-plus-chinese-execution.md`**（受 `features.chineseExecutionRule` 开关控制，关闭即自动从 `rules` 目录移除）：约束 Agent 默认使用简体中文撰写执行说明、任务进度与回复，同时保留代码、路径与命令原文。
  - **`agy-plus-workspace-local-scripts.md`**（受 `features.workspaceScriptsRule` 开关控制，关闭即自动从 `rules` 目录移除）：禁止 Agent 将临时辅助脚本写入 C 盘系统临时目录或 `.gemini\...\scratch\`，统一收敛至当前项目工作区的 `scripts/` 或 `.tmp/` 目录，减少跨盘权限弹窗。
  - > **关于交互式弹窗规则的说明**：右下角弹窗对 `ask_question`（单选/多选问题）及权限审批的捕获完全通过主进程与前端状态树自动完成，无需手动修改工作流提示词；Agent 正常调用官方内置的 `ask_question` 工具时，若窗口处于后台，右下角会自动弹出可点击选项卡片。

### 4. 自启动与自动更新防覆盖项
- **当前用户注册表启动项**：`HKCU\Software\Microsoft\Windows\CurrentVersion\Run\AntigravityPlus`（登录后静默运行 `watch.cjs` 命名管道守护进程）。
- **Windows 计划任务**：`Antigravity-Plus-Guard`（登录时及每 5 分钟执行一次毫秒级快速校验，当 Antigravity 静默自动升级生成新 `app.asar` 时自动同步版本号并重建引导层）。

---

## 六、常见问题与排障

1. **安装或卸载提示客户端占用 `app.real.asar`（退出码 `3`）**：
   - Windows 不允许在 `Antigravity.exe` 正在加载 `app.real.asar` 时重命名归档。请先完全退出 Antigravity（含系统托盘），再重新双击 `Install.cmd` 或 `Uninstall.cmd` 即可。
2. **安装时提示已有旧版 Shim 或同名 `task-completion-toast` 插件**：
   - 为避免无意覆盖第三方或其他自定义方案，安装器默认拒绝覆盖并保持原目录 0 改动。确认需要接管并自动备份旧文件时，执行 `.\Install.cmd -CleanLegacy` 即可。
3. **非管理员账号下计划任务注册被跳过**：
   - `Install.ps1` 会尝试以普通用户权限注册登录触发与每 5 分钟触发的 `Antigravity-Plus-Guard`；若受企业组策略限制无法创建计划任务，安装器会给出提示并继续完成核心部署，客户端内置的自动更新重建助手仍会生效。
4. **电脑未安装独立 Node.js 时的行为**：
   - `Install.ps1`、`Manage.ps1`、`Check-CloudPermissions.ps1` 与 Stop Hook（`run-on-stop.cmd`）都会自动切换至 `Antigravity.exe` 内置运行时（`ELECTRON_RUN_AS_NODE=1`）；开机自启守护在无独立 Node.js 模式下以 `--once` 单次预热运行后自动退出，绝不常驻锁死 `Antigravity.exe` 阻碍官方更新。
5. **代理与云端权限回环排障**：
   - 在终端运行 `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\Check-CloudPermissions.ps1`（支持自定义安装目录自动识别），可检查 `language_server` 回环配置、代理端口连通性与 `fastpushFix` 状态。

---

## 七、开发与自动化测试

```powershell
# 1. 编译右下角通知宿主
powershell -NoProfile -ExecutionPolicy Bypass -File .\src\toast\Build-TaskToast.ps1

# 2. 运行全量单元与端到端自动化测试（18 大测试套件 + 故障注入 + 双仓库隐私可移植性扫描）
npm test

# 3. 诊断当前运行中客户端的本地代理与云端权限回环状态
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\Check-CloudPermissions.ps1
```

## 开源许可

MIT License
