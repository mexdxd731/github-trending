# WAI Play

> 把网页游戏地址交给 AI，让它像玩家一样试玩、发现问题，并给出可复现的证据和修改建议。

WAI Play 是面向 **vibe coding 网页游戏创作者** 的自动试玩与质量诊断 Agent。它会在真实浏览器中操作游戏，理解游戏目标和流程，记录状态、截图与录像，最后生成结构化评分、问题卡片和通俗易懂的优化建议。

你不需要先写复杂的自动化脚本：选择游戏类型、填写游戏 URL，就可以开始基础测试；如果同时上传 ZIP 源码包，WAI Play 还能结合源码理解通关条件、关键节点和玩法规则，让路线规划更准确。

## 🎯 为什么做 WAI Play

用 AI 快速做出网页游戏并不难，难的是回答下面这些问题：

- 游戏能不能从开始完整玩到通关？
- 核心玩法、操作反馈和界面是否合理？
- 如何快速测试游戏获得关键节点的问题？
- 上述问题又应该如何进行确认？
- 发现问题以后，应该具体修改什么，又该如何后续验证？

WAI Play 把这些工作串成一条完整流程：**提交游戏 → Agent 自动试玩 → 验证关键流程 → 整理问题证据 → 输出评分与优化建议**。

## ✨ 你可以得到什么

- **真实浏览器试玩**：通过键盘、鼠标和游戏接口操作正在运行的网页游戏。
- **游戏流程理解**：结合游戏类型、运行状态和可选源码，识别目标、前置条件、关键节点与通关路线。
- **失败后的重新规划**：首次路线无法完成时，根据真实结果倒推条件并调整后续尝试。
- **五维质量评分**：从核心流程、核心玩法、UI 与视觉、操作反馈、技术稳定性评价游戏本身。
- **可复现的问题卡片**：同一问题只展示一次，并绑定一次最佳尝试中的状态变化、截图或不超过 20 秒的录像片段。
- **具体优化建议**：根据问题类型说明“哪里有问题、建议怎么改、改完如何验证”。
- **测试可信度诊断**：API 接入、证据完整度和 Agent 操作可靠性单独展示，不混入游戏质量得分。

## 🧭 WAI Play 如何工作

1. **选择游戏类型**：从五类网页游戏中选择最接近的一类。
2. **提供游戏**：填写可访问的游戏 URL；可选上传与当前版本一致的 ZIP 源码包。
3. **检查是否可测**：验证页面、游戏状态、动作和重新开始等能力是否真正可用。
4. **建立游戏模型**：识别玩法目标、成功与失败条件、场景关系和关键节点。
5. **真实试玩与调整**：先按规划操作；失败后根据实际状态重新规划，而不是盲目重复动作。
6. **生成评测报告**：汇总评分、真实游戏问题、最佳证据和可执行的优化建议。

只提供 URL 时仍可进行浏览器黑盒测试；同时提供 ZIP 源码包时，流程理解和通关规划通常会更准确。源码包只用于本次临时分析，WAI Play 不会直接修改用户的原项目。

## 🖥️ 页面预览

### 测试前

选择游戏类型、填写游戏 URL，并按需上传 ZIP 源码包。右侧的小 WAI 会提示当前准备状态。

![WAI Play 测试前页面](docs/screenshots/wai-play-before-test.png)

### 测试中

页面会同步展示测试状态和小 WAI 的工作状态；等待期间，用户也可以直接玩一局俄罗斯方块小游戏。

![WAI Play 测试中页面](docs/screenshots/wai-play-during-test.png)

## 🎮 支持的游戏类型

| 游戏类型 | 重点验证内容 |
| --- | --- |
| 生存 / 肉鸽 / 幸存者 Like | 生存循环、战斗、成长选择、Boss 与结局 |
| 经典街机 / 动作射击 | 移动攻击、得分循环、受击反馈与失败重试 |
| 平台跳跃 | 移动跳跃、落点、障碍、检查点与终点 |
| 解谜 / 卡牌 | 规则理解、选择反馈、关卡目标与解题流程 |
| 视觉小说 / 剧情选择 | 对话推进、分支条件、结局与重玩路径 |

## 🚀 快速开始

建议使用 Python 3.12。

```powershell
git clone https://github.com/waiterve/wai-play.git
cd wai-play
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m playwright install chromium
Copy-Item .env.example .env
streamlit run app.py
```

打开 <http://127.0.0.1:8501>。

编辑 `.env`，填写自己的 DeepSeek 与 Kimi API Key。请勿把 `.env` 提交到 GitHub。没有 AI Key 时，部分规则测试仍可工作，但源码建模、路线规划和自然语言建议会降级。

## 🕹️ 运行五类演示游戏

另开一个终端：

```powershell
python -m http.server 8768 --bind 127.0.0.1 --directory web_examples/five_games
```

打开演示导航页：<http://127.0.0.1:8768>。

| 类型 | 演示地址 |
| --- | --- |
| 生存 / 肉鸽 | <http://127.0.0.1:8768/survivor.html> |
| 经典街机 / 动作射击 | <http://127.0.0.1:8768/arcade-shooter.html> |
| 平台跳跃 | <http://127.0.0.1:8768/platformer.html> |
| 解谜 / 卡牌 | <http://127.0.0.1:8768/puzzle-card.html> |
| 视觉小说 / 剧情选择 | <http://127.0.0.1:8768/visual-novel.html> |

## 🐳 Docker 运行

```powershell
docker build -t wai-play .
docker run --rm -p 8501:8501 --env-file .env wai-play
```

容器访问宿主机游戏时，请把游戏地址中的 `127.0.0.1` 改为 `host.docker.internal`。

## ✅ 运行测试

```powershell
.\.venv\Scripts\python.exe -m compileall -q app.py agent web llm games database rag
.\.venv\Scripts\python.exe -m unittest discover -s tests -p "test_*.py" -v
```

集成测试会自动启动仓库内的五类演示游戏服务器，不依赖开发者电脑上的固定目录。仓库也配置了 GitHub Actions，在推送和 Pull Request 时自动执行编译与测试。

## 🔐 数据、隐私与使用边界

- `.env`、录像、截图、报告、日志和本地记忆目录不会提交到 GitHub。
- 上传 ZIP 源码包时，系统只分析临时解压副本；测试结束后应清理临时文件。
- 开启 AI 源码建模后，相关源码摘要可能发送给所配置的第三方模型服务。
- 请只测试自己拥有或已获授权的游戏地址和源码。
- 当前版本适合本地运行、学习和演示；若作为面向公众的在线服务，还需要账号体系、任务队列、访问额度、远程 URL 安全限制和测试数据自动清理。

## 🧩 主要代码入口

- Streamlit 页面：`app.py`
- 测试编排：`agent/orchestrator.py`
- 浏览器适配：`web/web_game_adapter.py`
- 游戏类型标准：`game_profiles.py`、`agent/scoring_standards.py`
- 五类接口模板：`integration_templates.py`

## 🗺️ 下一步计划

- 完善公开在线服务所需的多用户隔离、任务队列和安全限制。
- 增加更多陌生游戏样本，持续提高流程建模和关键节点识别能力。
- 改进报告建议的针对性，让开发者能更快定位代码与验证修复结果。

## 🤝 参与项目

欢迎通过 Issue 提交 Bug、游戏兼容性问题或产品建议，也欢迎通过 Pull Request 改进测试规则、游戏模板和文档。

如果 WAI Play 对你的网页游戏开发有帮助，欢迎给项目一个 Star。
