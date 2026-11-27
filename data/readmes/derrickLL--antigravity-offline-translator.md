# Antigravity Offline Translator

面向 **[antigravity-plus](https://github.com/derrickLL/antigravity-plus)** 的可选本地离线英译中神经机器翻译（NMT）扩展包，也可作为任何桌面 AI 工具的通用低开销本地离线翻译后端。

> **是否需要安装本仓库？**
> - 如果你的电脑日常保持联网，**仅安装 `antigravity-plus` 主仓库即可**（主仓库自带高速在线多路翻译与自动故障切换，零 Python 依赖、开箱即用）。
> - 如果你需要在**完全断网、纯内网隔离或所有在线翻译通道均不可用**的环境下继续实时翻译 AI 的英文思考过程（Thought）与会话标题，安装本扩展包即可自动激活断网离线兜底。

---

## 核心特性

1. **零常驻内存与按需唤醒**：平时后台 **0 进程驻留、0 内存占用**；仅在在线接口全部不可用时按需拉起，空闲 3 分钟后自动销毁进程释放内存。
2. **Windows JobObject 内核级资源硬限流（`ResourceHost.exe`）**：
   - 使用 Windows 原生 JobObject 将离线推理子进程硬性限制在 **最高 25% CPU 占用**、`BelowNormal` 调度优先级与 **`max(5% 物理内存, 800MB)` 内存上限**内；
   - 开启 `JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE`，宿主退出时 100% 杜绝僵尸 `python.exe` 残留。
3. **CTranslate2 `int8` 量化高速 CPU 推理与中文路径兼容**：基于 Argos Translate / OpenNMT `translate-en_zh-1_9`（约 70MB，严格校验官方 SHA-256），采用内存直读 `SentencePiece` 模型字节与兼容中文/非 ASCII 路径加载策略，自动保护 `[C0]` 代码/路径占位符与 `[P0]` 专业术语占位符，并内置中文标点间距精修。
4. **安全原子重装与白名单卸载**：重复安装或模型更新时先在临时目录下载、验签并校验通过后再原子替换旧模型（断网或校验失败绝不破坏原有可用模型）；卸载严格校验 `deployment.json` 归属并仅删除本扩展包自建目录与文件，保留同目录内的其他用户文件。
5. **自动关联 `antigravity-plus`**：一键安装完成后自动将引擎路径注册至 `%LOCALAPPDATA%\AntigravityPlus\config.json`（若后装 `antigravity-plus`，主程序也会自动识别默认安装路径 `%LOCALAPPDATA%\AntigravityOfflineTranslator`）。

---

## 环境要求

- **操作系统**：Windows 10 / Windows 11 (x64)
- **Python**：已安装 Python 3.9 ~ 3.13 且加入系统 `PATH`（无需安装 Visual Studio，C# 资源宿主使用 Windows 系统自带 `.NET Framework csc.exe` 自动编译）
- **首次安装网络**：首次运行安装脚本需联网拉取 `ctranslate2`、`sentencepiece` 与约 70MB 模型权重包（支持自动识别系统代理）；安装完成后运行阶段 100% 纯离线（`HF_HUB_OFFLINE=1`）。

---

## 一键安装与卸载

### 一键安装
双击仓库根目录的 **`Install.cmd`**，或在终端执行：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\Install.ps1
```

可选参数：
- `-InstallDir "D:\CustomPath\AntigravityOfflineTranslator"`：指定自定义安装目录（默认安装至 `%LOCALAPPDATA%\AntigravityOfflineTranslator`）。
- `-ProxyUrl "http://127.0.0.1:7897"`：显式指定首次下载模型使用的 HTTP 代理（默认自动探测系统代理并在失败时回退直连）。

### 一键卸载
双击仓库根目录或已安装目录的 **`Uninstall.cmd`**，或执行：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\Uninstall.ps1
# 如安装到了自定义目录，可指定 -InstallDir：
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\Uninstall.ps1 -InstallDir "D:\CustomPath\AntigravityOfflineTranslator"
```

> **安全边界**：卸载脚本会先校验目标目录中的 `deployment.json` 部署回执，并仅删除本扩展包创建的 `ResourceHost.exe`、`translation-worker.py`、`venv`、`model-package`、`deployment.json`、`Uninstall.cmd`、`scripts\Uninstall.ps1` 等白名单项；若你在同一目录下存放了其他无关文件，卸载时会完整保留，绝不误删。

---

## 与 `antigravity-plus` 联动说明

安装完成后会在目标目录生成 `deployment.json` 回执文件。`antigravity-plus` 在以下任一条件下会自动启用离线兜底：

1. 安装在默认路径 `%LOCALAPPDATA%\AntigravityOfflineTranslator`（自动探测，无需手改配置）；
2. 或在 `%LOCALAPPDATA%\AntigravityPlus\config.json` 中指定自定义路径：

```json
{
  "translation": {
    "mode": "hybrid",
    "offlineRoot": "C:\\Users\\<YourName>\\AppData\\Local\\AntigravityOfflineTranslator"
  }
}
```

也可以在 Antigravity 界面内的 **Antigravity Plus 设置面板** 中随时将翻译模式切换为：
- `hybrid`（推荐：在线高速优先 + 断网离线兜底）
- `online`（仅使用在线通道）
- `offline`（强制全程使用本地离线模型）

---

## 独立协议调用（供其他工具复用）

读取 `deployment.json` 后，按以下参数启动进程并通过标准输入输出（JSON Lines）通信：

```text
<resourceHost> <python> <worker> <modelRoot>
```

- **启动就绪信号（`stdout` 首行）**：`{"type": "ready", "computeType": "int8", "threads": 4}`
- **发送批量翻译请求（写入 `stdin` 一行 JSON）**：
  ```json
  {"id": 1, "texts": ["Inspecting [C0] token refresh flow."]}
  ```
- **返回翻译结果（`stdout` 一行 JSON）**：
  ```json
  {"id": 1, "texts": ["正在检查[C0]令牌刷新流程。"], "elapsedMs": 115}
  ```
- **资源遥测信号（`stderr`，可选消费）**：`ResourceHost.exe` 会向 `stderr` 输出 JobObject 限额（`limits`）与周期用量（`usage`）JSON；内置非阻塞有界缓冲队列（调用方即使忽略 `stderr` 也不会死锁），如需记录遥测可直接按行读取 `stderr`。

运行自检测试：

```powershell
node .\tests\smoke-test.cjs
```

## License

MIT
