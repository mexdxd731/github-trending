# ShellPad

<p align="center">
  <img src="https://img.shields.io/badge/platform-iPadOS%2026.0+-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/Swift-5.10-orange.svg" alt="Swift">
  <img src="https://img.shields.io/badge/Xcode-16.0+-blue.svg" alt="Xcode">
  <img src="https://img.shields.io/badge/SwiftUI-iPadOS-red.svg" alt="SwiftUI">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
</p>

**ShellPad** 是一款专为 iPad 打造的 SSH 终端应用,让你在 iPad 上随时随地连接并管理远程服务器。基于 [SwiftTerm](https://github.com/migueldeicaza/SwiftTerm) 终端模拟器和 [NMSSH](https://github.com/NMSSH/NMSSH) SSH 库,采用 SwiftUI + MVVM 架构,原生体验流畅、安全可靠。

## ✨ 功能特性

- 🖥️ **原生终端体验** — 基于 SwiftTerm,支持完整的终端渲染、ANSI 颜色、键盘输入与滚动回溯
- 🔐 **多种认证方式** — 支持密码认证与公钥(RSA / Ed25519)认证
- 🗄️ **主机管理** — 直观的侧边栏列表,支持主机分组、颜色标记、快速编辑与删除
- 🔑 **安全存储** — 凭据通过 iOS Keychain 加密存储,绝不明文落盘
- 🔗 **端口转发** — 支持本地转发、远程转发与动态转发(SOCKS)三种模式
- 📋 **代码片段** — 保存常用命令,一键发送到终端,告别重复输入
- 🌙 **深色模式** — 默认深色界面,搭配高对比度绿色终端,长时间使用不疲劳
- 📐 **多窗口支持** — 适配 iPad 多窗口与多方向(竖屏 / 横屏),支持多任务并行操作

## 📱 运行环境

| 项目 | 要求 |
|------|------|
| 平台 | iPadOS 26.0+ |
| Swift | 5.10 |
| Xcode | 16.0+ |
| 依赖 | SwiftTerm ≥ 1.2.0、NMSSH ≥ 2.4.0 |

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone git@github.com:kvvipa0028/NBShell_For_Ipad.git
cd NBShell_For_Ipad
```

### 2. 生成 Xcode 工程(可选)

本项目使用 [XcodeGen](https://github.com/yonaskolb/XcodeGen) 通过 `project.yml` 管理工程配置。若仓库未包含 `.xcodeproj`,可自行生成:

```bash
brew install xcodegen
xcodegen generate
```

### 3. 打开并运行

```bash
open ShellPad.xcodeproj
```

在 Xcode 中选择一台 iPad 模拟器或真机,按 `⌘R` 构建并运行。

## 🏗️ 项目结构

```
ShellPad/
├── App/                # 应用入口
│   └── ShellPadApp.swift
├── Models/             # 数据模型
│   ├── Models.swift        # Host / KeyPair / Snippet / PortForward
│   └── HostStore.swift     # 主机持久化(UserDefaults)
├── ViewModels/        # 视图模型(MVVM)
│   └── HostViewModel.swift
├── Views/             # 视图层(SwiftUI)
│   ├── HostListView.swift      # 主机列表 / 侧边栏
│   ├── HostRowView.swift       # 主机列表项
│   ├── HostEditView.swift      # 新增 / 编辑主机表单
│   ├── TerminalView.swift      # 终端页面 + 状态栏
│   └── SwiftTermView.swift     # SwiftTerm 终端封装
├── Services/          # 服务层
│   ├── SSHService.swift        # SSH 连接生命周期管理
│   ├── KeychainService.swift   # iOS Keychain 封装
│   └── MockSSHChannel.swift    # 本地 shell 模拟通道(调试用)
├── Utils/             # 工具
│   └── Color+Hex.swift
├── Resources/         # 资源(Info.plist 等)
└── project.yml        # XcodeGen 工程配置
```

## 🏛️ 架构设计

采用 **MVVM(Model–View–ViewModel)** 架构,职责清晰分层:

- **Models**:定义 `Host`、`KeyPair`、`Snippet`、`PortForward` 等核心数据结构,均为 `Codable`,可序列化持久化。
- **ViewModels**:桥接 View 与 Store,处理业务逻辑,持有可观察状态驱动 UI 更新。
- **Views**:纯 SwiftUI 声明式 UI,通过 `@StateObject` 持有 ViewModel,保证数据流单向。
- **Services**:封装底层能力。其中 `SSHChannel` 协议解耦了 SwiftTerm 终端与具体 SSH 实现,便于在真实 NMSSH 通道与本地 Mock 通道之间切换。

> 💡 **设计亮点**:通过 `SSHChannel` 协议抽象,`SSHService` 默认注入 `MockSSHChannel`(在 macOS / 模拟器下挂载本地 `/bin/zsh`,提供真实终端体验用于开发调试),后续接入 NMSSH 时无需改动上层 UI 代码。

## 🛠️ 开发

项目通过 [XcodeGen](https://github.com/yonaskolb/XcodeGen) 管理工程文件。修改 `project.yml` 后重新生成即可,避免 `.xcodeproj` 冲突:

```bash
xcodegen generate
```

依赖通过 Swift Package Manager 管理,首次打开 Xcode 会自动解析 `SwiftTerm` 与 `NMSSH`。

## 📝 开发计划

- [ ] 接入 NMSSH 实现真实 SSH 通道(目前真机使用 Mock)
- [ ] 密钥对管理界面(生成 / 导入 / 导出)
- [ ] 端口转发配置与运行界面
- [ ] 代码片段管理界面
- [ ] 终端主题与字体自定义
- [ ] 多会话标签页

## 🤝 贡献

欢迎提交 Issue 与 Pull Request!请确保:

1. Fork 本仓库并创建特性分支(`git checkout -b feature/your-feature`)
2. 遵循现有的 Swift 代码风格与 MVVM 架构
3. 提交清晰的 commit message
4. 开启 PR 描述变更内容与测试方式

## 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源,欢迎自由使用、修改与分发。

## 🙏 致谢

- [SwiftTerm](https://github.com/migueldeicaza/SwiftTerm) — 由 Miguel de Icaza 开发的 Swift 终端模拟器
- [NMSSH](https://github.com/NMSSH/NMSSH) — 基于 libssh2 的 iOS / macOS SSH 库
