# FinSight Enterprise Frontend

FinSight Enterprise Frontend 是 FinSight 企业智能管理平台的前端工程，基于 Vue 3、TypeScript、Vite、Element Plus 构建。项目提供企业后台管理、动态权限菜单、AI 模型对话、RAG 知识库、文件中心、工作流审批、系统监控、日志审计和系统内即时通讯等完整界面能力。

> 后端工程位于 `../../0java/Financial_Intelligence_System/`，后端技术栈为 Spring Boot 3.5、PostgreSQL 16、pgvector、Redis、Flyway、Flowable。

## 目录

- [项目特性](#项目特性)
- [技术栈](#技术栈)
- [功能模块](#功能模块)
- [目录结构](#目录结构)
- [环境要求](#环境要求)
- [快速启动](#快速启动)
- [环境变量](#环境变量)
- [登录账号](#登录账号)
- [开发说明](#开发说明)
- [页面路由](#页面路由)
- [接口与代理](#接口与代理)
- [AI 与 RAG 前端能力](#ai-与-rag-前端能力)
- [文件预览能力](#文件预览能力)
- [即时通讯能力](#即时通讯能力)
- [构建部署](#构建部署)
- [常见问题](#常见问题)
- [开源说明](#开源说明)

## 项目特性

- Vue 3 `<script setup lang="ts">` 组合式开发。
- Vite 开发服务器，支持热更新和本地代理。
- Element Plus 企业级后台 UI。
- Pinia 管理登录用户、角色和权限。
- Axios 统一请求封装、Token 自动注入、401 自动跳转登录页。
- 后端动态菜单渲染，支持目录、菜单、多级菜单、按钮权限。
- 高仿 JeecgBoot 风格后台布局：左侧菜单、顶部工具栏、多标签页、内容区。
- AI 模型对话页面支持 SSE 流式输出、Markdown、代码块、表格、会话历史。
- RAG 知识库页面支持知识库集合、文档上传、解析状态、父子切片预览、PDF 跳页预览。
- 文件中心支持多类型文件管理和在线预览。
- 工作流页面支持流程定义、流程实例、我的待办、BPMN 设计器。
- 系统监控页面展示服务器、JVM、磁盘、Redis、PostgreSQL 指标。
- 日志页面支持登录日志、操作日志、模型对话日志查询和清理。
- 系统内即时通讯支持单聊、群聊、文件消息、未读、撤回、搜索、实时推送。
- 响应式样式适配桌面端和移动端浏览器。

## 技术栈

| 类型 | 技术 |
| --- | --- |
| 基础框架 | Vue 3.5 |
| 编程语言 | TypeScript 6 |
| 构建工具 | Vite 8 |
| UI 组件库 | Element Plus 2 |
| 状态管理 | Pinia |
| 路由 | Vue Router |
| HTTP 请求 | Axios、Fetch |
| 实时通信 | WebSocket |
| 流式响应 | Server-Sent Events |
| Markdown | marked、DOMPurify |
| 图表 | ECharts、vue-echarts |
| BPMN | bpmn-js |
| PDF 预览 | pdfjs-dist |
| Office/文档预览 | mammoth、后端 LibreOffice 转 PDF |

## 功能模块

### 登录与权限

- 登录页默认填充开发账号。
- 登录成功后保存 JWT Token 到 `localStorage`。
- 请求拦截器自动携带 `Authorization: Bearer <token>`。
- Token 失效后自动清理本地 Token 并跳转登录页。
- 菜单和页面权限来自后端 `/api/auth/me`。

### 工作台

- 企业后台首页。
- 展示平台概览、快捷入口和核心指标。

### 系统管理

- 用户管理：用户列表、新增、编辑、删除、角色授权、在线状态、强制退出。
- 角色管理：角色 CRUD、菜单权限授权。
- 菜单管理：目录、菜单、按钮权限、多级菜单维护。
- 部门管理：部门树和部门基础信息。
- 系统监控、文件设置、模型设置和日志管理也按后台菜单归入系统管理。

### AI 智能中心

- 模型对话：SSE 流式回复、Markdown 渲染、会话历史、挂载知识库。
- 知识库：知识库集合管理、文档上传、解析状态、切片预览、PDF 原文预览。
- 模型设置：Chat 模型和 Embedding 模型分开配置，支持连通性测试。

### 文件中心

- 文件管理：上传、下载、删除、预览。
- 文件设置：本地存储和 MinIO/S3 存储切换。
- 支持 Markdown、PDF、图片、Word、Excel、PPT 等常见企业文件类型。

### 工作流

- 流程定义：创建、编辑、部署 Flowable BPMN 流程。
- 流程实例：查看发起的流程和运行状态。
- 我的待办：审批通过、驳回、查看业务信息。
- BPMN 设计器：基于 bpmn-js 渲染和编辑审批流。

### 即时通讯

- 悬浮式系统聊天入口。
- 支持用户搜索、单聊、群聊、群成员管理。
- 支持文本、图片、文件消息。
- 支持未读、正在输入、撤回、搜索聊天记录。
- 通过 WebSocket 与后端保持实时通信。

## 目录结构

```text
financial_intelligence_system/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── README.md
├── public/
│   └── favicon.ico
└── src/
    ├── api.ts                         # Axios 请求封装
    ├── main.ts                        # 应用入口
    ├── App.vue
    ├── router/
    │   └── index.ts                   # 路由配置和登录守卫
    ├── stores/
    │   └── auth.ts                    # 登录用户和权限状态
    ├── layouts/
    │   └── AdminLayout.vue            # 企业后台布局
    ├── views/
    │   ├── LoginView.vue              # 登录页
    │   ├── DashboardView.vue          # 工作台
    │   ├── ManagementView.vue         # 用户/角色/部门通用管理页
    │   ├── MenuManagementView.vue     # 菜单管理
    │   ├── ChatView.vue               # AI 模型对话
    │   ├── KnowledgeBaseView.vue      # RAG 知识库
    │   ├── ModelSettingsView.vue      # 模型设置
    │   ├── LogsView.vue               # 日志管理
    │   ├── MonitorView.vue            # 系统监控
    │   ├── FileManagementView.vue     # 文件管理
    │   ├── StorageSettingsView.vue    # 文件设置
    │   └── WorkflowView.vue           # 工作流
    ├── components/
    │   ├── NavMenuTree.vue            # 动态菜单树
    │   ├── ImChatWidget.vue           # 即时通讯悬浮聊天
    │   ├── UniversalFilePreview.vue   # 通用文件预览
    │   ├── KnowledgePdfPreview.vue    # 知识库 PDF 跳页/高亮预览
    │   └── WorkflowDesigner.vue       # BPMN 流程设计器
    └── assets/
        ├── main.css
        ├── jeecg.css
        ├── responsive.css
        ├── ai-chat.css
        ├── knowledge-base.css
        ├── im-chat.css
        ├── file-preview.css
        ├── file-workflow.css
        ├── monitor.css
        └── ...
```

## 环境要求

- Node.js：`^22.18.0` 或 `>=24.12.0`
- npm：建议使用随 Node.js 安装的 npm
- 后端服务：默认 `http://localhost:8080`

查看当前 Node 版本：

```bash
node -v
```

## 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动后端

请先启动后端工程：

```bash
cd ../../0java/Financial_Intelligence_System
./mvnw spring-boot:run
```

后端默认地址：

```text
http://localhost:8080
```

### 3. 启动前端

```bash
npm run dev
```

前端默认地址：

```text
http://localhost:5173
```

开发服务器已配置：

```ts
server: {
  host: '0.0.0.0',
  port: 5173,
  proxy: {
    '/api': { target: 'http://localhost:8080', changeOrigin: true },
    '/ws': { target: 'ws://localhost:8080', ws: true, changeOrigin: true },
  },
}
```

因此开发环境中前端请求 `/api/**` 和 `/ws/**` 会自动代理到后端。

## 环境变量

前端默认使用相对路径 `/api` 访问后端。需要自定义后端地址时，可以创建 `.env.local`：

```env
VITE_API_BASE=http://localhost:8080/api
```

说明：

- 开发环境一般不需要设置 `VITE_API_BASE`，使用 Vite 代理即可。
- 生产部署如果前后端同域，也可以继续使用 `/api`。
- 生产部署如果前后端不同域，请配置 `VITE_API_BASE`，并在后端放开对应 CORS。

## 登录账号

默认管理员账号由后端 Flyway 初始化：

```text
用户名：admin
密码：Admin@123
```

登录成功后会进入工作台。首次公开部署建议立即修改默认密码。

## 开发说明

### 常用命令

```bash
npm run dev
```

启动 Vite 开发服务器。

```bash
npm run type-check
```

执行 Vue + TypeScript 类型检查。

```bash
npm run build
```

执行类型检查并构建生产包。

```bash
npm run preview
```

本地预览生产构建结果。

### 请求封装

请求统一封装在 `src/api.ts`：

- `baseURL` 默认取 `import.meta.env.VITE_API_BASE || '/api'`。
- 请求前自动读取 `localStorage.fis_token` 并写入 `Authorization`。
- 响应体按后端统一格式 `ApiResponse` 解包。
- 后端返回非 `code === 0` 时统一抛错并显示错误消息。
- 401 时自动退出并跳转 `/login`。

### 登录状态

登录状态由 `src/stores/auth.ts` 管理：

- `user`：当前登录用户信息。
- `permissions`：当前用户权限码。
- `isAdmin`：是否超级管理员。
- `login`：登录并保存 Token。
- `load`：加载当前用户信息。
- `logout`：调用退出接口并清空本地 Token。

## 页面路由

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/login` | 登录页 | 用户登录 |
| `/dashboard` | 工作台 | 首页概览 |
| `/system/users` | 用户管理 | 用户 CRUD、角色授权、在线状态 |
| `/system/roles` | 角色管理 | 角色 CRUD、菜单授权 |
| `/system/menus` | 菜单管理 | 多级菜单、按钮权限 |
| `/system/departments` | 部门管理 | 部门管理 |
| `/ai/chat` | 模型对话 | SSE 流式大模型对话 |
| `/ai/knowledge` | 知识库 | RAG 知识库管理 |
| `/ai/settings` | 模型设置 | Chat/Embedding 模型配置 |
| `/logs/login` | 登录日志 | 登录审计 |
| `/logs/operation` | 操作日志 | 接口操作审计 |
| `/logs/chat` | 模型对话日志 | AI 对话日志 |
| `/monitor/system` | 系统监控 | 服务器/JVM/Redis/数据库监控 |
| `/files` | 文件管理 | 文件上传、下载、预览 |
| `/settings/storage` | 文件设置 | 本地/MinIO 存储设置 |
| `/workflow/definitions` | 流程定义 | BPMN 流程定义 |
| `/workflow/instances` | 流程实例 | 流程运行记录 |
| `/workflow/tasks` | 我的待办 | 审批任务 |

## 接口与代理

开发环境请求关系：

```text
Vue 页面
  |
  | /api/**
  v
Vite Dev Server :5173
  |
  | proxy
  v
Spring Boot :8080
```

WebSocket 请求关系：

```text
Vue 即时通讯
  |
  | /ws/chat?token=...
  v
Vite Dev Server :5173
  |
  | ws proxy
  v
Spring Boot WebSocket :8080
```

如果手机或局域网设备访问前端，请使用电脑局域网 IP：

```text
http://电脑局域网IP:5173
```

同时后端 CORS 需要允许该来源。当前后端默认允许 `localhost` 和 `127.0.0.1`，如果跨设备访问，需要在后端 `SecurityConfig` 中增加局域网来源或使用同域反向代理。

## AI 与 RAG 前端能力

### 模型对话

页面：`src/views/ChatView.vue`

能力：

- SSE 流式输出。
- Markdown 渲染。
- 代码块、表格、列表、引用等 GitHub Flavored Markdown。
- 会话历史列表。
- 新建、重命名、删除会话。
- 临时指定模型和温度。
- 可挂载一个或多个知识库进行 RAG 问答。

### Markdown 安全

模型回复通过：

- `marked` 解析 Markdown。
- `DOMPurify` 清洗 HTML。

避免直接渲染不可信 HTML。

### 引用来源

RAG 回答返回的来源会在回答下方展示。前端会按文档聚合页码，避免同一份文档重复展示太多来源，例如：

```text
第 1、3、5、7 页 · 部署手册.pdf
```

### 知识库管理

页面：`src/views/KnowledgeBaseView.vue`

能力：

- 新建知识库。
- 编辑知识库名称、描述、权限类型。
- 删除知识库。
- 上传文档。
- 查看文档解析状态：`PENDING`、`PROCESSING`、`COMPLETED`、`FAILED`。
- 查看父子切片数量。
- 切片预览。
- PDF 预览和跳转到切片所在页。

## 文件预览能力

### 通用文件预览

组件：`src/components/UniversalFilePreview.vue`

支持：

- Markdown：前端解析并安全渲染。
- PDF：浏览器内嵌预览。
- 图片：直接预览。
- Word：使用 `mammoth` 提取并渲染内容。
- Excel、PPT：可走后端 Office 转 PDF 预览。
- 其他文件：提供下载。

### 知识库 PDF 预览

组件：`src/components/KnowledgePdfPreview.vue`

能力：

- 通过 pdfjs-dist 加载 PDF。
- 按切片页码自动跳转。
- 根据切片文本尝试定位原文并标记。
- 用于知识库切片校验和 RAG 来源追踪。

## 即时通讯能力

组件：`src/components/ImChatWidget.vue`

能力：

- 使用 WebSocket 建立实时连接。
- 支持断线重连和心跳。
- 查询会话、消息、未读数。
- 创建单聊和群聊。
- 发送文本、图片、文件。
- 文件消息支持预览和下载。
- 支持回复、撤回、正在输入、搜索聊天记录。
- 支持群成员邀请、移除、群名修改、置顶、免打扰。

## 构建部署

### 生产构建

```bash
npm run build
```

构建产物默认输出到：

```text
dist/
```

### 本地预览

```bash
npm run preview
```

### Nginx 部署示例

如果前端和后端同域部署，可以让 Nginx 托管 `dist`，并把 `/api` 和 `/ws` 转发给后端。

```nginx
server {
  listen 80;
  server_name example.com;

  root /data/apps/finsight-frontend/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:8080/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location /ws/ {
    proxy_pass http://127.0.0.1:8080/ws/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
}
```

### 跨域部署

如果前端部署在 `https://frontend.example.com`，后端部署在 `https://api.example.com`：

```env
VITE_API_BASE=https://api.example.com/api
```

同时后端需要允许该前端域名跨域访问。

## 常见问题

### 1. 登录后接口一直 401

请检查：

- 后端是否启动。
- `/api/auth/login` 是否返回 Token。
- 浏览器 `localStorage` 是否存在 `fis_token`。
- 后端 Redis 是否正常。
- 后端时间和本机时间是否差异过大。

### 2. 页面访问 `http://局域网IP:5173` 失败

前端 Vite 已配置 `host: '0.0.0.0'`，正常可以局域网访问。请检查：

- 电脑和手机是否在同一个网络。
- macOS/Windows 防火墙是否允许 5173 端口。
- 浏览器访问的是电脑局域网 IP，不是 `localhost`。
- 后端 CORS 是否允许局域网来源。

### 3. 前端能打开，但接口请求失败

开发环境默认代理到：

```text
http://localhost:8080
```

请确认后端正在运行，并且后端端口是 8080。如果后端不在本机或端口不同，请修改 `vite.config.ts` 的 proxy，或设置 `VITE_API_BASE`。

### 4. 大模型回复不是流式显示

请确认：

- 前端调用的是 `/api/ai/chat/stream`。
- 后端接口返回 `text/event-stream`。
- 代理或网关没有缓存 SSE 响应。
- 浏览器控制台没有 CORS 或 401 错误。

### 5. Markdown 没有渲染

模型回复只对 assistant 消息进行 Markdown 渲染。请确认消息角色为 `assistant`，并且内容不是被后端错误包装成普通文本。

### 6. PDF 预览空白

请检查：

- 文件接口 `/api/files/{id}/preview` 是否可访问。
- Token 是否有效。
- 浏览器控制台是否有 pdfjs-dist worker 加载错误。
- 文件本身是否是有效 PDF。

### 7. WebSocket 连接失败

请检查：

- Token 是否存在。
- 后端 `/ws/chat` 是否可访问。
- Vite proxy 是否配置了 `ws: true`。
- 生产 Nginx 是否配置了 `Upgrade` 和 `Connection`。

## 开源说明

提交 GitHub 前建议补充：

- `LICENSE`
- `.env.example`
- `CONTRIBUTING.md`
- `SECURITY.md`
- 项目截图或演示 GIF

建议 `.env.example`：

```env
VITE_API_BASE=/api
```

不要提交：

- `.env.local`
- 真实后端地址中的敏感参数
- 生产 Token
- 私有证书
- `dist/`
- `node_modules/`

开源前可执行：

```bash
npm run type-check
npm run build
```

确保类型检查和生产构建通过后再发布。
