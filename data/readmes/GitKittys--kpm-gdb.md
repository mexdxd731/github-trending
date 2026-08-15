# kpm-gdb 无痕调试器

**[English](README_EN.md)**

> **一个利用内核硬件断点接口实现的调试器**：对外支持 **LLDB / GDB 的原生调试功能**（断点、观察点、寄存器、内存、单步、多线程、backtrace），对内在**内核层隐藏了硬件断点检测**——被调试的进程和它内置的反调试检测器，都感知不到自己正在被调试。

kpm-gdb 用 [KernelPatch](https://github.com/bmax121/KernelPatch) 模块（KPM）的**硬件断点 + 内核级跨进程内存/寄存器读写**，替代传统调试器赖以工作的 `ptrace`。它对电脑端暴露一个标准的 **GDB Remote Serial Protocol (RSP)** 后端：LLDB、GDB、IDA 通过标准 `gdb-remote` 连上来，像调试普通进程一样调试 Android 应用，而反调试检测看不到任何痕迹。

> 📖 **客户端命令、用法与协议以 LLDB 官方文档为准** —— kpm-gdb 实现的就是 LLDB 描述的 GDB Remote Serial Protocol，凡官方文档里标注支持的命令，连上 kpm-gdb 即可原生使用：
>
> - LLDB 官网 / 文档：[https://lldb.llvm.org/](https://lldb.llvm.org/)
> - LLDB 源码（llvm-project/lldb）：[https://github.com/llvm/llvm-project/tree/main/lldb](https://github.com/llvm/llvm-project/tree/main/lldb)
> - GDB-Remote 协议扩展（我们支持的 RSP 包在此定义）：[https://github.com/llvm/llvm-project/blob/main/lldb/docs/resources/lldbgdbremote.md](https://github.com/llvm/llvm-project/blob/main/lldb/docs/resources/lldbgdbremote.md)
> - GDB → LLDB 命令对照表：[https://lldb.llvm.org/use/map.html](https://lldb.llvm.org/use/map.html)
> - LLDB Python SB API 参考：[https://lldb.llvm.org/python_api.html](https://lldb.llvm.org/python_api.html)

> ⚡ **适用场景**：kpm-gdb 适合**单步 / 断点调试**、以及**观察某块内存的读写**这类交互式场景；它**不适合高速 trace**（LLDB 每条指令都要一次协议往返，逐指令 trace 很慢）。如果你需要的是追踪某个函数的执行流，需要**快速的逐指令 trace**，请改用另一个项目 **[AndroidPrybar](https://github.com/GitKittys/AndroidPrybar/)**。

整套代码用于**授权的安全研究、CTF、以及对自有应用的调试**。

---



## 项目结构

```
kpm-gdb/
├── kpm/                          # 内核模块（替代 ptrace 的底层，加载到内核常驻）
│   ├── Makefile
│   └── src/                      # 硬件断点、线程冻结、跨进程读写、反检测假账本
│
├── server/                       # 用户态调试服务器（= gdbserver，推送到手机运行）
│   ├── src/                      # GDB RSP 协议解析 + prctl 通道桥接
│   └── test/                     # 测试工具 + rsp_client.py
```

| 文件 | 角色 | 说明 |
|---|---|---|
| `kpm-dbg.kpm` | 内核模块 | 加载后常驻内核，提供硬件断点/寄存器/内存等底层能力 |
| `kpm-dbgserver` | **= gdbserver** | 推送到手机，TCP 监听，LLDB/GDB 连它调试 |

---



## 使用方法

### 1. 加载内核模块

```bash
adb push kpm-dbg.kpm /sdcard/Download/ && adb shell sync
adb shell "su -c 'ksud kpm load /sdcard/Download/kpm-dbg.kpm'"
```

### 2. 推送并启动 gdbserver

```bash
adb push kpm-dbgserver /data/local/tmp/ && adb shell chmod 755 /data/local/tmp/kpm-dbgserver

# 附加已运行的进程
adb shell "su -c '/data/local/tmp/kpm-dbgserver -p <pid> -l 1234'"

# 或者：等目标 app 启动后自动附加（抢在反检测之前）
adb shell "su -c '/data/local/tmp/kpm-dbgserver --spawn com.example.app -l 1234'"
```

### 3. LLDB 连接调试

```bash
adb forward tcp:1234 tcp:1234
lldb -o "gdb-remote 127.0.0.1:1234"
```

连上后就是标准的 LLDB 调试：

```
(lldb) breakpoint set --address 0x77e5f51ed0
(lldb) continue
Process stopped
* thread #1, stop reason = breakpoint 1.1
(lldb) register read
(lldb) memory read $sp
(lldb) thread list
(lldb) step-inst
```

也支持 Python SB API 脚本驱动。

---



## 为什么用内核硬断代替 ptrace？

**1. 尽可能减少 ptrace 特征。**
主流反调试的第一道防线就是查 ptrace —— `TracerPid`、`PTRACE_TRACEME` 自占、代码段被软件断点改写后的自校验、每次断点的 `SIGTRAP`、seccomp 白名单。kpm-gdb 把调试实现下沉到**内核的硬件断点 + 跨进程读写**，从根上不产生 ptrace 痕迹。

**2. 稳定、省心，面向 AI 自动化调试。**
kpm-gdb 刻意只暴露**标准 GDB Remote Serial Protocol**，任何 AI 或脚本都能用现成的 LLDB / GDB / Python SB API 直接驱动。

**3. 适配已有的 LLDB 协议工具，Python 一把梭。**
支持所有 LLDB 协议的工具，LLDB 原生支持 Python，调试起来方便。

|           | ptrace 调试器    | kpm-gdb                  |
| --------- | ------------- | ------------------------ |
| TracerPid | 暴露（非 0）       | **始终 0**                 |
| 断点        | 软件断点（改代码段）    | **纯硬件断点（text 零修改）**      |
| 命中信号      | 每次断点发 SIGTRAP | **不发信号（内核侧处理）**          |
| 注入目标      | 需 attach / 注入 | **不注入，独立进程/内核态**         |
| 硬件断点检测    | 直接暴露占用的调试寄存器  | **内核假账本虚拟化，检测器看到"干净世界"** |

---



## 特性

**调试功能（LLDB / GDB RSP 原生）**

- 硬件执行断点 —— ARM64 6 个，**text 零修改**
- 硬件数据观察点 —— 4 个，读 / 写 / 读写
- 寄存器读写、跨进程内存读写
- 单步执行、continue（命中处自动单步跨越+复点）
- 多线程枚举、**all-stop**（任一停→全部停）
- Ctrl-C 中断、**attach 即停**
- 真 LLDB / GDB 端到端验证通过

**反检测（内核层）**

- **硬件断点占用虚拟化**：ptrace 和 perf_event_open 两条路径全用假账本接管，检测器看到干净世界。**通用于任何 app**。
- **spawn-suspend 按包名接管**：反检测在极早期占满调试寄存器，kpm-gdb 按包名预登记，抢在检测之前反制。
- 无 SIGTRAP、无软件断点特征、无 ptrace、TracerPid 恒 0。

---



## 已知限制

- 硬件资源上限：ARM64 通常 6 执行断点 + 4 数据观察点，需要更多时应先取消不必要的断点。

---

**免责声明**：本项目仅用于**授权的**安全研究、逆向学习、CTF 与对自有应用/设备的调试。使用者须遵守当地法律法规，因滥用造成的后果由使用者自负。
