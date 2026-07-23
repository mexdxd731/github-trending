# Variant Clone Factory

通用 Variant 模板复刻工厂：粘贴共享链接 → 1:1 还原 React 工程 → 导出 ZIP。

仓库：[lulistart/variant-clone-factory](https://github.com/lulistart/variant-clone-factory)

## 流水线

```text
Capture → Classify → Codegen → Package ZIP → Visual QA
```

默认像素级 DOM/CSS 1:1（faithful）。

## Docker 部署（推荐 / VPS）

### 1. 拉取代码

```bash
git clone https://github.com/lulistart/variant-clone-factory.git
cd variant-clone-factory
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

按需编辑 `.env`：

```env
HOST_PORT=8787
VCF_API_KEY=
HTTP_PROXY=
HTTPS_PROXY=
NO_PROXY=127.0.0.1,localhost,::1
```

说明：

- `HOST_PORT`：宿主机访问端口，默认 `8787`
- `VCF_API_KEY`：可选 API 鉴权；留空则不鉴权
- `HTTP_PROXY` / `HTTPS_PROXY`：VPS 访问不了 `variant.com` 时再填

### 3. 启动

```bash
docker compose up -d --build
```

### 4. 验证

```bash
docker compose ps
curl -fsS http://127.0.0.1:8787/api/health
```

浏览器访问：

```text
http://<VPS_IP>:8787/
```

### 5. 常用运维

```bash
# 查看日志
docker compose logs -f --tail=200

# 更新代码后重建
git pull
docker compose up -d --build

# 停止
docker compose down

# 停止并删除数据卷（会清空历史 job）
docker compose down -v
```

更完整的 Nginx / 环境变量说明见 [DEPLOY.md](./DEPLOY.md)。

## 本地开发

```bash
git clone https://github.com/lulistart/variant-clone-factory.git
cd variant-clone-factory
npm install
npm run build

# 终端 1
npm run dev

# 终端 2
npm run dev:web
```

- Web: http://127.0.0.1:5176
- API: http://127.0.0.1:8787

本地需要代理抓取时：

```bash
# Windows PowerShell
$env:HTTP_PROXY="http://127.0.0.1:1080"
$env:HTTPS_PROXY="http://127.0.0.1:1080"
$env:NO_PROXY="127.0.0.1,localhost,::1"
npx playwright install chromium
```

## 生产启动（无 Docker）

```bash
npm install
npm run build

export HOST=0.0.0.0
export PORT=8787
export VCF_WEB_DIST="$PWD/apps/web/dist"
export VCF_JOBS_ROOT="$PWD/jobs"
npm start
```

Windows PowerShell：

```powershell
npm install
npm run build
$env:HOST="0.0.0.0"
$env:PORT="8787"
$env:VCF_WEB_DIST="$PWD\apps\web\dist"
$env:VCF_JOBS_ROOT="$PWD\jobs"
npm start
```

访问：`http://<host>:8787/`

## CLI

```bash
npm run clone -- "https://variant.com/shared/<id>?t=..."
npm run demo
npm run verify
```

## 说明

- 前端只提交 `sourceUrl`，后端固定 1:1 复刻
- 支持仪表盘 / 营销页 / 登录页 / 卡片站 / 应用壳
- 产物：`jobs/<jobId>/artifact.zip`，可选 `visual/*` 像素 diff
- 单容器同时提供 Web UI + API + Playwright 验收

## 致谢
[学AI上L站](https://linux.do/)
