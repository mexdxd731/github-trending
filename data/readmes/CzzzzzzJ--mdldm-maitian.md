<p align="center"><img src="docs/readme/banner.png" alt="麦田 · 给多平台博主的开源工作台" /></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2ea44f" alt="MIT" /></a>
  <img src="https://img.shields.io/badge/macOS-only-1c1a16?logo=apple" alt="macOS" />
  <img src="https://img.shields.io/badge/Node.js-%E2%89%A5%2022.5-5FA04E?logo=nodedotjs&logoColor=white" alt="Node 22.5+" />
  <a href="https://chromewebstore.google.com/detail/eaaipbilkhibicihiollecmbpneikpnj"><img src="https://img.shields.io/badge/Chrome-麦田发布助手-F2B21B?logo=googlechrome&logoColor=white" alt="麦田发布助手" /></a>
  <a href="https://github.com/CzzzzzzJ/mdldm-maitian/stargazers"><img src="https://img.shields.io/github/stars/CzzzzzzJ/mdldm-maitian?style=social" alt="Stars" /></a>
</p>

<p align="center">
  <a href="#一行装好">一行装好</a> ·
  <a href="#看它跑一遍">看它跑一遍</a> ·
  <a href="#怎么配合">怎么配合</a> ·
  <a href="#各平台的坑实战总结">各平台的坑</a> ·
  <a href="#作者">作者</a>
</p>

一个人做内容，要发六七个平台，每个平台的文案、封面、发布形式都不一样；发完还想知道哪期起来了、哪个平台涨粉、哪个平台真的带来了付费。麦田就是我自己每天在用的那套工作台：

1. **发得出去**：一期视频分批填好 B站、抖音、小红书、视频号、YouTube、X、Instagram，提前排进「分发计划」，到点发布、自动取链接。
2. **看得清楚**：每期在每个平台的播放、互动，各平台粉丝，每天自动采、长期留存；手机上看大屏，飞书群推卡片。
3. **算得出钱**：接上你自己的站点，看哪一期、哪个平台带来了注册和收入。

> 跑在一台常开的 Mac 上，用你自己登录好的浏览器操作各平台，**不存任何平台密码**。国内四家只填写不发布，最后一下由你自己点。

## 看它跑一遍

<p align="center"><img src="https://github.com/CzzzzzzJ/mdldm-maitian/releases/download/media/maitian-publish.gif" alt="一期视频的发布流程：Agent 写文案 → 进分发计划 → 插件分批填写各平台 → 国内平台你来点发布 → 到点回填链接" /></p>
<p align="center"><sub>一期视频从写文案到上线（47 秒，各平台发布页为示意，数据是作者第 4 期的真实文案和封面）· <a href="https://github.com/CzzzzzzJ/mdldm-maitian/releases/download/media/maitian-publish.mp4">高清 MP4</a></sub></p>

<p align="center"><img src="docs/screenshots/board.jpg" alt="麦田大屏：最新一期轮播、粉丝、数据分析、各平台卡片（演示数据）" /></p>
<p align="center"><sub>大屏（演示数据，<code>node src/demo.mjs</code> 就能看到）</sub></p>

| 日历：分发计划 | 单期复盘：同龄对比 | 每期转化漏斗 |
|---|---|---|
| <img src="docs/screenshots/calendar.jpg" alt="日历" /> | <img src="docs/screenshots/episode.jpg" alt="单期复盘" /> | <img src="docs/screenshots/convert.jpg" alt="转化漏斗" /> |

## 怎么配合

<p align="center"><img src="docs/readme/flow.png" alt="发布 skill → 麦田发布助手 → 麦田" /></p>

| 部分 | 做什么 | 在哪 |
|---|---|---|
| 发布 skill | 让 AI 助手（Claude Code / Codex）看片、写各平台文案、生成发布工程并校验 | 本仓库 [`skills/maitian-publish`](skills/maitian-publish/SKILL.md) |
| 麦田发布助手 | Chrome 插件，各平台适配器：打开上传页、传视频和封面、填文案、设定时 | [Chrome 应用商店](https://chromewebstore.google.com/detail/eaaipbilkhibicihiollecmbpneikpnj)（装进麦田的专用 Chrome，自动更新） |
| 麦田（本仓库） | 分发计划、调度、防重、等你点发布、取链接、采数据、网页大屏、飞书通知 | 本仓库 |

链路：成片 → skill 写「发布素材.md」→ 生成 `publish.json` → `hub plan` 进分发计划 → `hub run` 分批填写 → 国内平台你点发布 → 到点取链接 → 每天采数据 → 大屏和飞书卡片。

## 一行装好

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/CzzzzzzJ/mdldm-maitian/main/scripts/install.sh)"
```

下载麦田和发布助手到 `~/maitian/`、接上发布 skill、打开安装向导；向导问完几个问题，生成配置、装好开机自启、打开各平台登录页。需要 macOS、Node.js ≥ 22.5、Google Chrome。

Windows（社区贡献，感谢 [ajin558](https://github.com/ajin558)；开机自启暂未适配）：

```powershell
powershell -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/CzzzzzzJ/mdldm-maitian/main/scripts/install-windows.ps1 | iex"
```

同样下载到 `%USERPROFILE%\maitian\`、接上发布 skill、打开安装向导，安装目录里另有 4 个双击启动器（演示 / 登录 / 体检 / 启动）。需要 Windows 10/11、Node.js ≥ 22.5、Google Chrome；缺 Git / Node 时脚本会用 winget 自动补装。开机自启暂未适配（向导里的 launchd 步骤会自动跳过），可用任务计划程序指向安装目录的 `4-start.bat` 代替。

<p align="center"><img src="https://github.com/CzzzzzzJ/mdldm-maitian/releases/download/media/maitian-install.gif" width="720" alt="一行安装演示" /></p>

<details>
<summary><b>手动安装</b></summary>

或者手动：

需要：macOS、Node.js ≥ 22.5（用到内置 `node:sqlite`）、Google Chrome；可选 NAS（放成片）、飞书群机器人、cloudflared。

```bash
git clone https://github.com/CzzzzzzJ/mdldm-maitian.git && cd mdldm-maitian
node src/demo.mjs                       # 先用假数据看看效果：http://localhost:8788/?key=demo
node src/init.mjs                       # 安装向导：检查环境、生成 config.json、装开机自启；在专用 Chrome 里从应用商店添加麦田发布助手、登录各平台
node src/hub.mjs doctor                 # 登录完检查各平台登录态和上传页（不上传、不填写）
```

打开向导最后给出的地址（`http://localhost:8787/?key=<web.key>`），之后浏览器会记住口令。手动安装也可以：`cp config.example.json config.json` 填好后跑 `scripts/install-launchd.sh`。

</details>

### 三级上手

| 级别 | 你能得到 | 要装的 | 大概时间 |
|---|---|---|---|
| L1 只看数据 | 各平台粉丝、已发作品的播放互动、大屏、飞书日报 | 麦田；专用 Chrome 里登录各平台；已发的期用 `hub adopt` 登记 | 30 分钟 |
| L2 分发 | 一期一次填好七个平台，定时，自动取链接 | + [麦田发布助手](https://chromewebstore.google.com/detail/eaaipbilkhibicihiollecmbpneikpnj)（应用商店装进专用 Chrome）；+ 发布 skill（或手写 `publish.json`） | 再 1 小时 |
| L3 转化 | 每期带来的注册和收入 | + 你自己的站点按 `src/site.mjs` 的接口接入 | 看站点 |

## 它做什么

- **播种（发布）**：读 NAS 上的一期发布工程（成片、封面、各平台文案、定时），按批次在专用 Chrome 里填好各平台上传页。
  - X、YouTube、Instagram、自有站点：回读文案和定时一致后自动提交，只点一次。
  - B站、抖音、小红书、视频号：**填好就停**，等你自己点「发布 / 定时发布」，守护进程每 20 分钟提醒。
  - 防重：库里已经到位的平台不再跑；X 定时列表、YouTube Studio、Instagram 主页、站点后台已有同名的不再传。
- **长势（流量和粉丝）**：每天上午采一次各期在各平台的播放和互动、各平台粉丝数；新一期头三天每 6 小时采一次。
- **收成（转化，可选）**：接上自有站点后，看注册、会员、订单、收入从哪个渠道、哪一期来。
- **日历**：上周到未来两周，已发布、已定时、等你点、计划中的期一眼看清。
- **粮仓（档案）**：每期的封面、文案快照、各平台链接、过程日志。
- **复盘（数据分析）**：每期发布后第 1/3/7 天自动出复盘卡片：各平台占比、互动率、和上一期同龄对比（第 N 天对第 N 天）、期间涨粉、带来的注册；每周一出周报。网页单期页有同一份复盘表，转化页有每期转化漏斗（播放 → 注册 → 会员 → 收入）。
- **飞书通知**：开跑、每个平台到位、异常、等你点发布、定时被平台改掉、每日日报、复盘和周报，都是带颜色的卡片。

## 各平台的坑（实战总结）

- **国内四家由你自己点最终发布**。自动化只负责填写和核对，最后一下人点，降低风控风险。
- **小红书只走最保守的路**：只读页面上已经渲染的内容、像人一样滚动和点击，不在页面里直接调它的接口，低频。
- **同一条视频每个平台只上传一次**，反复重传最容易触发风控；中控的防重就是为这个。
- **视频号的定时可能被改**：表单回读是对的，提交后平台记成别的时间（遇到过 +2 小时）。`sync` 会拿平台记录的定时和计划比对，不一致发 ⚠️ 卡片。
- **YouTube 上传对话框被关掉**时，视频可能已经排好定时；中控会先查 Studio 列表再下结论。
- **成片必须 faststart**（moov 在文件头），否则小红书报「无视频流信息」、抖音不出表单；校验会拦。
- **专用 Chrome 卡死**：用 `curl 127.0.0.1:9333/json/close/<id>` 关掉卡住的标签页，不会触发「离开此网站」确认。

<details>
<summary><b>架构</b></summary>

```
            ┌────────────── Mac（常开）──────────────┐
NAS 发布工程 │  hub.mjs 守护进程 ──── 专用 Chrome（CDP 9333）── 各平台创作者后台
publish.json ─▶│     │  ▲                 ▲                       │
成片/封面     │     │  │ 平台适配器（麦田发布助手 lib/）       │
            │     ▼  │                                          │
            │  SQLite（data/hub.db） ── web.mjs（麦田网页 :8787）── 手机/电脑（可选 Cloudflare 隧道）
            │     │                                              │
            │     └── feishu.mjs ──▶ 飞书群机器人（卡片通知）       │
            └───────────────────────────────────────────────┘
```

- 平台填写逻辑在 [麦田发布助手](https://chromewebstore.google.com/detail/eaaipbilkhibicihiollecmbpneikpnj)（Chrome 插件）里。插件从应用商店装进麦田的专用 Chrome 后由 Chrome 自动更新，麦田直接加载专用 Chrome 里这份插件的发布引擎（`src/plugin.mjs`），平台改版时插件更新一次，所有人自动生效。`src/chrome-shim.mjs` 在 Node 里模拟插件需要的 `chrome.tabs` / `chrome.debugger`。
- 发布工程 `publish.json` 由 `src/make-publish.mjs` 从一份 Markdown 发布素材生成，`src/validate.mjs` 校验（字数、禁词、封面比例、成片 faststart 等），字段规则跟着插件走。

</details>

<details>
<summary><b>命令</b></summary>

```bash
node src/hub.mjs plan [工程目录]            # 登记进分发计划（不带目录 = 扫描 rootPath）
node src/hub.mjs run <工程目录> [--only x,zsz] [--force] [--now]   # 发一期；--now 让站点课程立即上线（默认推迟到定时前 30 分钟）
node src/hub.mjs status [id] [--logs]
node src/hub.mjs sync <id> [--only a,b]     # 取链接，写 发布记录.json，回填发布素材 md 的「已发布」行
node src/hub.mjs mark <id> <平台> <状态> [备注] [--url 链接]   # 手动改状态（平台认不出时用）
node src/hub.mjs adopt <工程目录>            # 登记一期已经发过的（不上传），按标题取链接
node src/hub.mjs metrics [id]               # 采流量并发日报
node src/hub.mjs followers                  # 采粉丝
node src/hub.mjs review <id> [天数] [--notify]   # 看某期发布 N 天的复盘（守护进程会在第 1/3/7 天自动发）
node src/hub.mjs weekly [--notify]          # 上周周报（守护进程每周一自动发）
node src/hub.mjs board                      # 同步到飞书多维表格（可选）
node src/hub.mjs daemon                     # 常驻（install-launchd.sh 装的就是它）
```

</details>

<details>
<summary><b>配置要点（config.json）</b></summary>

| 项 | 说明 |
|---|---|
| `plugin` | `store`（默认）：用专用 Chrome 里从应用商店装的麦田发布助手 |
| `rootPath` / `nasUrl` | 发布工程根目录；NAS 掉线或被挂到「…-1」时守护进程会自己卸掉重挂 |
| `batches` | 上传批次。一次传太多平台会互相抢带宽导致超时，建议国内两两一批 |
| `auto` / `manual` | 自动提交 / 等你点发布的平台 |
| `keepAlive` | 容易掉登录的平台（视频号），定时刷一下保活 |
| `site` | 自有站点，可选，见下 |
| `board` | 飞书多维表格看板，可选 |
| `web.key` | 网页口令，所有页面和接口没有口令一律 401 |

</details>

<details>
<summary><b>接入你自己的站点（可选，二次开发）</b></summary>

不配 `config.site` 就整块关掉，网页上不显示站点卡片，「转化」页只说明怎么接。要看转化：

1. 发布 skill 会在 B站、YouTube、X 的链接上带 `utm_campaign=<主题>-<序号>`；你的站点记下访客第一次带来的这个参数，注册和下单时一起存。
2. 站点提供两个只读接口给麦田（用专用 Chrome 里的管理员登录态去调），字段见 [`src/site.mjs`](src/site.mjs) 顶部注释。
3. 在 `config.site` 里填站点地址和接口路径。

作者用自己的课程站做了示例；你的站结构不同，改 `src/site.mjs` 和转化页即可。

</details>

<details>
<summary><b>远程访问（可选）</b></summary>

`scripts/install-launchd.sh --tunnel` 会装一个 cloudflared 隧道，地址推到飞书。

- **固定域名（推荐）**：域名交给 Cloudflare 后，跑 `cloudflared tunnel login`、`cloudflared tunnel create maitian`、`cloudflared tunnel route dns maitian maitian.你的域名`，在 `config.json` 里加 `"tunnel": { "name": "maitian", "hostname": "maitian.你的域名" }`。地址永远不变，建议再在 Cloudflare Zero Trust 里给它加一层邮箱验证码登录（Access → Self-hosted 应用），然后在 `config.json` 的 `web.access` 填团队域名和应用的 AUD Tag：麦田会验证 Access 签发的登录凭证，手机上输邮箱收验证码就能进，不用再带 `?key=`。
- **飞书验证码登录（推荐，零配置）**：`config.json` 的 `web` 里加 `"login": "feishu"`。远程打开麦田会先到登录页，点「发送验证码」，6 位码推到飞书群，输入后这台设备记住 30 天；验证码 5 分钟有效、只能用一次、错 5 次作废，60 秒内只能发一次。`?key=` 口令仍可用作备用。
- **快速隧道（默认）**：不配 `tunnel` 时用 `https://xxx.trycloudflare.com`，不用账号，但每次重启地址都会变。

</details>

## 手机小组件（可选）

iPhone 桌面 / 锁屏常驻显示全平台粉丝、今日涨粉、最新一期播放、站点近 7 天注册和收入，点一下打开麦田。

1. `config.json` 的 `web` 里加 `"widgetToken": "<一串随机字符>"`（只读口令，只能读 `/api/widget` 的汇总数字）；想在小组件上显示头像和署名，再加 `"avatar": "data/avatar.jpg"`、`"owner": "你的名字"`（中号、大号还会显示最新一期封面）
2. 手机上登录麦田后打开 `/widget`，按页面提示装 [Scriptable](https://apps.apple.com/app/scriptable/id1405459188)、复制脚本（地址和口令已填好）。复制的是一个加载器：每次刷新从麦田的 `/api/widget/code` 拉最新的 `scripts/widget/maitian-widget.js` 来运行，以后改样式手机上自动生效，拉不到就用上次存下的那份
3. 桌面添加 Scriptable 小组件（小 / 中 / 大），锁屏也可以加（长条 / 圆形 / 单行），Script 选它

另外，Safari 里「分享 → 添加到主屏幕」可以把麦田当 App 用（全屏、带麦苗图标）。

## 数据和隐私

- `config.json`、`data/`（数据库、日志）、`chrome-profile/`（各平台登录态）都不进 git。
- 麦田只读你自己账号的创作者后台数据，不做互动自动化、不碰别人的账号。
- 安装向导结尾、出错通知（每天最多一次）和没接站点时的「转化」页里，有一个作者知识站和交流群的链接，带 utm 参数，只是让知识站知道访客从麦田来；麦田本身不上报任何数据。不想看到就在 `config.json` 里加 `"learnLinks": false`。

## 作者

<p align="center"><a href="https://www.mdldm.club/ai-course-promotion?utm_source=github&utm_medium=readme&utm_campaign=maitian-readme"><img src="docs/readme/author.png" alt="麦当 mdldm · 0 基础 AI Agent 教学博主 · mdldm.club 知识站" /></a></p>

我是麦当，做 0 基础 AI Agent / AI Coding 教程。麦田是照着我自己的发布流程一点点搭起来的，一边发视频一边在改。

- 📚 **知识站 [mdldm.club](https://www.mdldm.club/ai-course-promotion?utm_source=github&utm_medium=readme&utm_campaign=maitian-readme)**：0 基础 AI Agent 课程 + 每周直播。麦田怎么搭、数据怎么采、怎么接自己的项目，课里讲得更细。
- 🎬 B站 / 小红书 / 抖音 / 视频号：搜「麦当mdldm」
- ▶️ [YouTube](https://www.youtube.com/channel/UCOz23ZQMefLAgDdnraGV2RQ) · 𝕏 [@czzzzzzJ_](https://x.com/czzzzzzJ_)

### 交流群

想一起聊麦田、多平台运营的，微信扫码进群（1、2 群已满，现在开的是 3 群）：

<p align="center"><img src="docs/readme/qr-group.jpg" width="260" alt="微信群：麦当 mdldm 的麦田 3 群" /></p>

> 微信群码 7 天有效（这张 11 月 24 日前可扫），我会定期换；扫不进去就提个 Issue 喊我一声。

觉得有用就点个 ⭐ Star，这是我继续改下去的动力；遇到问题直接提 [Issue](https://github.com/CzzzzzzJ/mdldm-maitian/issues)。

## Star History

<a href="https://www.star-history.com/?repos=czzzzzzj%2Fmdldm-maitian&type=date&releases=&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=czzzzzzj/mdldm-maitian&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=czzzzzzj/mdldm-maitian&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=czzzzzzj/mdldm-maitian&type=date&legend=top-left" />
 </picture>
</a>

## License

MIT
