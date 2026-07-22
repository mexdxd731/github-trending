# Codex Agent Identity

本地 Codex Agent Identity 注册工具，提供命令行和仅监听 `127.0.0.1` 的 Web UI。

<p align="center">
  <img src="codex_agent_static/community-qr.png" alt="小脑虎 GPT 技术交流群二维码" width="316" />
</p>

## 启动 Web UI

```bash
python3 codex_agent.py --web
```

浏览器打开 `http://127.0.0.1:8765/`。Web 流程只在内存中处理凭证，成功后提供一次性 `auth.json` 下载，不会写入 `~/.codex`。

## 命令行

```bash
python3 codex_agent.py --token "<ChatGPT session JWT>"
python3 codex_agent.py --file session.json --output auth.json
```

## 测试

```bash
python3 -m unittest discover -s tests -v
```

依赖见 `requirements.txt`。请勿提交 `auth.json` 或任何真实 session token。
