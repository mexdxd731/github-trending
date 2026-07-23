# Agent Identity Uploader

面向 Sub2API 的严格 Agent Identity 批量导入服务。它会校验 OpenAI Access
Token、注册或恢复 Agent Runtime、创建 Sub2API 账号，并以真实模型请求作为
最终验收条件。

> [!WARNING]
> 这是管理员工具。仅处理你有权管理的 OpenAI 账号和 Sub2API 实例。项目与
> OpenAI、Sub2API 均无隶属或官方合作关系。

## 核心特性

- 从混合文本中识别一个或多个 JWT 格式的 Access Token。
- 支持 Sub2API 管理员 API Key 或管理员邮箱/密码鉴权。
- 严格使用 `credentials.auth_mode=agentIdentity`，不会回退到普通 OAuth。
- 新 Runtime 被 OpenAI 拒绝时，可从同一 Sub2API 的完整 Agent Identity
  Runtime 池恢复 Runtime ID 和 Ed25519 私钥。
- 为目标账号注册全新 task，不复制来源账号的 task 或 Access Token。
- 自动同步可用模型并执行真实模型测试；失败时删除本次创建的账号。
- 通过 SSE 展示批处理进度，支持取消、失败筛选和结果复制。
- 持久化累计成功数与累计完成数，同时展示成功率和当前在线标签页数量。

## 严格 Agent Identity 流程

```text
校验 AT
  -> 检查 OpenAI 使用状态
  -> 注册新 Agent Runtime
     -> 若 agent_registry_not_enabled：检查目标 Sub2API Runtime 池
  -> 创建 auth_mode=agentIdentity 的 Sub2API 账号
  -> 同步模型
  -> 执行真实模型测试
  -> 验证 active / group / Runtime / private key / task
  -> 计入成功次数
```

Runtime 池恢复优先选择 `chatgpt_account_id` 和 `chatgpt_user_id` 完全匹配的
账号；没有匹配项时才使用同一 Sub2API 中其他完整、active 的 Agent Identity
Runtime。恢复过程只读取 Runtime ID 和私钥，目标 AT 仍需独立注册新 task。

任一模型测试或最终校验失败时，本次创建的 Sub2API 账号会被删除，成功计数
不会增加。

## 已知限制：TOTP step-up

部分 Sub2API 实例禁止管理员 API Key 访问敏感账号导出接口，并返回：

```text
STEP_UP_ADMIN_API_KEY_FORBIDDEN
Admin API key cannot access this endpoint; a two-factor verified admin session is required
```

当前版本没有实现 `/auth/login/2fa` 的 TOTP step-up 流程。此类实例可以完成
普通连接校验和账号列表读取，但无法恢复 Runtime 私钥，任务会以
`AGENT_IDENTITY_RECOVERY_FORBIDDEN` 失败关闭。系统不会因此创建普通 OAuth
账号。

## 安全与数据边界

- 后端不会把 AT、管理员凭据、Runtime 私钥或账号明细写入磁盘。
- 当前任务的机密数据只保存在服务进程内存中，并在任务过期或进程退出时清理。
- 前端会把当前表单内容暂存在该标签页的 `sessionStorage` 中，关闭标签页后由
  浏览器清除；共享设备上使用后应清空输入并关闭标签页。
- `/data/stats.json` 只包含 `successful_imports` 和 `finished_imports` 两个整数。
- 同时在线人数只在内存中根据匿名标签页心跳计算，不写入持久化文件。
- 默认只允许 HTTPS 且解析到公网地址的 Sub2API URL，降低 SSRF 风险。
- 写接口执行同源校验，API 响应禁用缓存，并设置 CSP、frame、referrer 等安全头。
- 应用没有内置多用户登录系统。公开部署时建议在入口增加访问控制或仅向可信
  操作员开放。

更多漏洞报告要求见 [SECURITY.md](SECURITY.md)。

## 环境要求

- Python 3.12
- 可访问目标 Sub2API 和 OpenAI/ChatGPT 上游接口的网络
- 一个你有权管理的 Sub2API 实例
- 生产部署需要可写的持久卷

## 本地运行

Windows PowerShell：

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
$env:STATS_FILE = "./data/stats.json"
$env:PUBLIC_ORIGIN = "http://127.0.0.1:3000"
python -m app.main
```

Linux/macOS：

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
export STATS_FILE=./data/stats.json
export PUBLIC_ORIGIN=http://127.0.0.1:3000
python -m app.main
```

打开 <http://127.0.0.1:3000>。健康检查地址为
<http://127.0.0.1:3000/healthz>。

## 配置

| 环境变量 | 默认值 | 说明 |
| --- | --- | --- |
| `STATS_FILE` | `/data/stats.json` | 累计统计 JSON 文件路径 |
| `PRESENCE_TTL_SECONDS` | `60` | 在线标签页心跳有效期，15–300 秒 |
| `JOB_RETENTION_SECONDS` | `1800` | 完成任务在内存中的保留时间，60–86400 秒 |
| `MAX_BATCH_ACCOUNTS` | `100` | 单批最大账号数，1–500 |
| `MAX_CONCURRENCY` | `4` | 服务端最大并发数，1–8 |
| `REQUEST_TIMEOUT_SECONDS` | `30` | 普通上游请求超时，5–120 秒 |
| `ALLOW_PRIVATE_SUB2API` | `false` | 是否允许解析到私网地址的 Sub2API URL |
| `ALLOW_INSECURE_SUB2API` | `false` | 是否允许 HTTP Sub2API URL |
| `PUBLIC_ORIGIN` | 空 | 反向代理后的公开同源地址，例如 `https://example.com` |
| `HOST` | `0.0.0.0` | 监听地址 |
| `PORT` | `3000` | 监听端口 |

`.env.example` 是配置清单；应用不会自动加载 `.env`。请通过 Shell、容器平台
或进程管理器注入环境变量。

## Docker

```bash
docker build -t agent-identity-uploader .
docker run --rm -p 3000:3000 \
  -e PUBLIC_ORIGIN=http://127.0.0.1:3000 \
  -e STATS_FILE=/data/stats.json \
  -v agent-identity-stats:/data \
  agent-identity-uploader
```

容器以非 root 用户运行，镜像自带 `/healthz` 健康检查。

## Zeabur 部署

1. 将 GitHub 仓库作为新服务导入，构建方式选择仓库内 `Dockerfile`。
2. 挂载持久卷到 `/data`。
3. 设置 `STATS_FILE=/data/stats.json`。
4. 设置 `PUBLIC_ORIGIN=https://你的域名`。
5. 服务端口使用 `3000`，等待 `/healthz` 返回 `{"status":"ok"}`。

不要把 AT、管理员 API Key、密码或 Runtime 私钥写入 Zeabur 环境变量；它们应
由操作员在页面中按任务输入。

## 测试

```bash
python -m pip install -r requirements-dev.txt
python -m pytest
python -m compileall -q app tests
```

自动化测试使用本地伪造响应，不需要真实 AT、Sub2API 凭据或 OpenAI 网络。

## 项目结构

```text
app/        FastAPI API、任务编排、OpenAI 与 Sub2API 客户端
public/     无构建步骤的浏览器界面
tests/      单元测试、接口安全测试和浏览器 QA 脚本
docs/       设计与实施说明
Dockerfile  生产容器定义
```

## 参与贡献

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。提交补丁时不得附带真实账号数据、
网络抓包、Access Token、管理员凭据或生产响应。

## 许可证

[MIT](LICENSE) © 2026 yyy-OPS
