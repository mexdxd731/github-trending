# GitHub Trending Top 12 看板

每日 0 点自动更新 GitHub 热门项目（今日 / 本周 / 本月），点击卡片查看项目简介与 README。基于 GitHub Actions + GitHub Pages，**零服务器、零依赖、零成本**。

## 特性

- 三个 Tab：今日 / 本周 / 本月 Top 12
- 点击卡片弹窗显示：项目简介、star/fork/issue、语言、topics 标签、README（markdown 渲染）
- 每 24h（北京时间 0 点）由 GitHub Actions 自动抓取并部署
- 纯静态前端，加载快速

## 数据来源

由于 GitHub 官方 trending 没有公开 API，本项目使用 **Search API 近似**：

- 日榜：`q=created:>{today-1day}` sort=stars desc
- 周榜：`q=created:>{today-7day}`
- 月榜：`q=created:>{today-30day}`

这会跨过部分「老仓库突然爆红」的 trending 项目——但与官方榜单高度重合，且对刚发布的明星项目更敏感。README 通过 GitHub contents API 拉取本地存储。

## 目录结构

```
├── .github/workflows/update-trending.yml   # Actions：cron + deploy
├── scripts/fetch-trending.js               # 零依赖抓取脚本
├── data/                                   # 由脚本自动更新
│   ├── daily.json
│   ├── weekly.json
│   ├── monthly.json
│   └── readmes/{owner--repo}.md
├── index.html / styles.css / app.js        # 前端
└── README.md
```

## 部署步骤

1. Fork 或推送到任意 GitHub 仓库
2. 仓库 **Settings → Actions → Workflow permissions** 勾选「Read and write」
3. 仓库 **Settings → Pages → Source** 选择 `GitHub Actions`（自动使用 workflow 的 deploy 步骤）
4. 手动触发一次 **Actions → Update Trending → Run workflow**，几分钟后页面即可访问

之后每天北京 0 点自动更新数据并部署。

## 本地预览

```powershell
# 任一脚本目录访问，例如：
node -e "require('http').createServer((q,s)=>{const f=require('fs'),p=require('path');let r=p.join('.',decodeURIComponent(q.url==='/'?'/index.html':q.url));if(!f.existsSync(r)){s.statusCode=404;return s.end('NF')};const t={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.md':'text/markdown'}[p.extname(r)]||'application/octet-stream';s.setHeader('Content-Type',t);f.createReadStream(r).pipe(s)}).listen(8000,()=>console.log('http://localhost:8000'))"
```

随后访问 http://localhost:8000

## 手动重新抓取

```powershell
# 提供个人 token 以提升速率
$env:GITHUB_TOKEN="ghp_xxxx"
node scripts/fetch-trending.js
```

## License

MIT