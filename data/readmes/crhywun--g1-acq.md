# g1-acq

[![Telegram](https://img.shields.io/badge/Telegram-AI羊毛交流群-26A5E4?logo=telegram&logoColor=white)](https://t.me/muihbb)

> 💬 **AI羊毛交流群**:https://t.me/muihbb —— 交流 AI 优惠、订阅羊毛

Google One（iOS）订阅入口的商品 ID 改写与采集工具，适用于 **Shadowrocket / 小火箭**。

**v7.13.0 主模块为 G1 ACQ SKU 管理，共五套预制模板；「1 元 Pro · 月付源核对」改用两条月付 `exact`：旧 Pro 月付 `g1.ios.2tb.ai.m` 与已采集的 AI 月付候选 `g1.ios.ai.2tb.m.ip_3mo_75p.acq`，目标均为裸 ID `com.google.gemini.2tb.ai.m.3month_ip_99p`。** 新候选尚缺官方 iOS 同字段商品绑定和实机身份记录，套餐归属待核对；“1 元”为模板名称，金额、周期和可售状态以本次购买面板为准，不保证该价格。安装升级保留现有配置，**还需打开[本地报告页](https://one.google.com/g1-sku-report)，在所需模板卡片点击「应用模板」**。同次保存仅停用仍启用的旧 `prefix` `g1.ios.2tb.` → 同一 Gemini 目标与旧 `exact` `g1.ios.20tb.m.v2` → 同一 Gemini 目标，保留其他目标、规则 ID、顺序和历史；Pro 与土区 20TB / 30TB 可同时使用。**下一次 `/ai?` 响应才使用新规则；重新进入实际提供的 Pro / AI 月付方案后，核对卡片的本模板及每个源命中数**。这些数值只记录 HTTP 字符串改写，不证明购买调用或 App Store 面板已出现。页面继续支持手动编辑、启停、恢复默认、采集源预填和 SKU 候选输入。

默认模式 `discount75` 保留 20TB / 30TB 三个月 75p 和原始 iOS 2TB → `g1.2tb.ai.12months_ip_90p`；应用模板或保存手动规则后为 `custom`，即使模板目标恰好与默认相同。**75p = 75% off、实付 25%、2.5折**。当前改写运行版本为 `g1-acq-v7.13-mappings`，保留原始 SKU 采集、最近 10 次响应、重复诊断与 JSON 导出，无需另装扫描器；完整步骤见 [SKU 管理、Pro 12个月优惠测试与采集](docs/pro-annual-test.md)。

采集只读取手机实际收到的匹配响应，**不会主动查询全量 SKU**；旧 ID 再次出现时累加次数。字符串改写与 App Store 商品返回分别记录，商品名称、周期、初次与续费金额按收银台实际显示核对，权益按 Google One 账户实际状态记录。

## 主模块安装地址

**G1 ACQ SKU 管理 — 五套预制模板与本地手动映射，保留默认 75p 与 2TB 目标**

```text
https://cdn.jsdelivr.net/gh/crhywun/g1-acq@v7.13.0/g1-acq-ultra-discount.sgmodule
```

| 项目 | 当前主入口 |
|---|---|
| 当前配置 `configuredMode` | 默认 `discount75`；应用模板或保存手动规则后 `custom` |
| 响应脚本 | [g1-acq-discount.js](g1-acq-discount.js)，与 [g1-acq.js](g1-acq.js) 实现相同 |
| 响应运行版本 | `g1-acq-v7.13-mappings` |
| 报告脚本 | [g1-sku-report-discount.js](g1-sku-report-discount.js)，与 [g1-sku-report.js](g1-sku-report.js) 实现相同 |
| 报告版本 | `v7.13.0` |
| 默认 2TB 目标 | `g1.2tb.ai.12months_ip_90p`，无 `.acq` |
| 本地数据 | 沿用 v7.9 的三个 schema 1 键；模板结果仍保存在 `g1.sku.mappings.v1`，无数据迁移 |

首次安装时在小火箭模块管理中添加上方地址并启用。升级顺序为：**关闭旧模块 → 安装新地址 → 只开启 G1 ACQ SKU 管理一个改写入口 → 重新连接小火箭 → 打开报告并应用所需模板 → 重新进入对应方案页 → 核对最近执行**。使用「1 元 Pro · 月付源核对」时进入实际提供的 **Pro / AI 月付方案页**，按完整源核对，20TB / 30TB 入口仅供各自模板使用。曾安装 **G1 ACQ Ultra 75p**、**G1 ACQ**、**G1 ACQ Ultra 一折**、**G1 ACQ Ultra 试用**、独立 **G1 SKU Scan**、**G1 Pro Annual Test** 或其它改写副本时，停用旧副本，避免重复计数或改写。

安装入口与四个模块的 **8 个内部 `script-path`** 固定引用 `@v7.13.0`，无需单独添加脚本。**旧固定链接需换成新地址，不会自动更新；安装也不会自动应用模板。** 当前树保留四个模块，试用模块仍缺席；历史 `v7.12.0` / `v7.11.0` / `v7.10.0` / `v7.9.0` / `v7.8.0` / `v7.7.0` / `v7.6.0` / `v7.5.0` / `v7.4.0` / `v7.3.0` / `v7.2.0` / `v7.1.0` / `v7.0.0` 与 `pro-annual-test-v1` / `pro-annual-test-v2` 标签保持原样，旧试用链接仍指向原内容。

升级沿用 `g1.sku.scan.v1`、`g1.pro.annual.test.v1`、`g1.sku.mappings.v1`，三个键的 `schemaVersion=1` 保持不变，无自动配置迁移；v7.9 已保存的手动规则、累计 SKU、次数、最近 10 次响应和旧执行记录继续保留。当前配置与实际采集、执行记录分别显示，应用模板、保存或恢复规则不重写历史版本、模式、目标与时间。

[g1-acq-v7.sgmodule](g1-acq-v7.sgmodule) 保留名称 **G1 ACQ**；[g1-pro-annual-test.sgmodule](g1-pro-annual-test.sgmodule) 保留名称 **G1 Pro Annual Test** 和仅 `/ai?` 的响应范围，二者引用当前共享响应脚本与同一本地映射配置。[g1-sku-scan.sgmodule](g1-sku-scan.sgmodule) 更新下载 pin 并保留报告请求体配置，独立扫描实现仍为 `pro-annual-test-v2`，只识别原有 `g1.*` / `com.google.one.*`，保持响应原文，没有模式或响应事件字段；报告保留其真实旧版本、空模式与缺失历史。[g1-pro-annual-test.js](g1-pro-annual-test.js) 也保留历史独立实现。主响应脚本的 Gemini 支持不改变这两个 legacy 文件。四个报告 `http-request` 均设置 `requires-body=1,max-size=0`，供本地表单提交使用。

## 五套预制映射模板

报告的 **预制映射模板** 位于手动规则前，按以下顺序展示；点击卡片的 **应用模板** 即提交原生 POST，成功后以 **303** 返回报告，并提示模板已保存到本机、下一次匹配响应读取新配置。

| 模板 | 匹配方式 | 完整源 → 目标 |
|---|---|---|
| **1 元 Pro · 月付源核对**（`pro-1yuan`） | 两条精确 `exact` | 旧 Pro 月付 `g1.ios.2tb.ai.m` → `com.google.gemini.2tb.ai.m.3month_ip_99p`<br>AI 月付候选 `g1.ios.ai.2tb.m.ip_3mo_75p.acq` → `com.google.gemini.2tb.ai.m.3month_ip_99p` |
| **土区 20TB · 1989.99 里拉记录**（`tr-ultra-20tb`） | 精确 `exact` | `g1.ios.20tb.m.v2` → `g1.ios.20tb.m` |
| **土区 30TB · 2949.99 里拉记录**（`tr-ultra-30tb`） | 精确 `exact` | `g1.ios.30tb.ai.pro.m` → `g1.ios.30tb.m` |
| **Ultra 20TB / 30TB · 三个月 75p**（`ultra-75p`） | 两条精确 `exact` | `g1.ios.20tb.m.v2` → `g1.20tb.3months_ip_75p.acq`<br>`g1.ios.30tb.ai.pro.m` → `g1.ai.ultra.3months_ip_75p.acq` |
| **2TB / Pro · 12个月 90p**（`pro-12months-90p`） | 前缀 `prefix` | `g1.ios.2tb.` → `g1.2tb.ai.12months_ip_90p` |

「1 元 Pro · 月付源核对」的说明为：**匹配旧 Pro 月付编号与已采集的 AI 月付候选；新候选的套餐归属待实机核对，金额与周期查看购买面板。** 两条规则只匹配上表完整月付源，年度、`helium`、历史普通 2TB 优惠、20TB / 30TB 均未加入此模板；默认三条和土区两个模板目标保持原样。

旧月付源 `g1.ios.2tb.ai.m` 的 Pro 标签见早于 PR #8 的 [cuongpv88 固定脚本](https://github.com/cuongpv88/g1-ultra-free/blob/3a4c8864a064a04402a4cddfa79150fa1e7e3869/g1-ultra-free.js#L13-L25)，[Dgkncn 固定脚本](https://github.com/Dgkncn/g1-acq-plus/blob/e4280c20c69fe9dc2d8458de1b652b2a92d7d741/g1-acq.js#L37-L51)也明确列为 Pro 月付。[Google 官方套餐页](https://one.google.com/about/plans?hl=en&gl=US)将 web 商品族 `g1.2tb.ai` 标为 Pro 5TB、`g1.2tb` 标为 Plus 2TB，为旧命名族提供佐证，但未直接给出同一 iOS 字段绑定。新源 `g1.ios.ai.2tb.m.ip_3mo_75p.acq` 已在设备原始采集中出现，也见于[固定公开清单](https://github.com/deveappcool-sys/g1-acq/blob/45091b639646dadb9470138743dcab00fc5258f3/docs/sku-atlas.md#L18-L23)；它仍是 **AI 月付候选**，尚缺官方 iOS 商品名绑定和实机身份记录，不能按字序接近判为已证实 Pro。

目标沿用裸 `com.google.gemini.2tb.ai.m.3month_ip_99p`，没有 `https://` 前缀。[公开订阅管理截图](https://pbs.twimg.com/media/HYC1ZlybcAEMNPQ.jpg?name=orig)显示 Google App 下 Pro 5TB、前三个月 `£0.29/月` 与后续 `£18.99/月`；[原帖](https://x.com/radishzz_/status/2125898543567442351)和[印度计价面板截图](https://pbs.twimg.com/media/HYEQZrSbcAAGc8Z.jpg?name=orig)支持低价 Pro 面板或订阅状态存在，图片没有完整 productId 与 StoreKit 交易链，不证明本账号可售或这两条源已购买成功。[Apple QA1329](https://developer.apple.com/library/archive/qa/qa1329/_index.html)区分商品 ID 与 App ID，`com.google.gemini` 命名本身不足以判定在 Google App 中不可用。HTTP 改写、原生购买调用、面板显示和账户权益分别记录。

[@duwqijlk](https://github.com/duwqijlk) 在 [PR #8](https://github.com/crhywun/g1-acq/pull/8) 提供的目标与购买记录来自旧 `g1.ios.20tb.m.v2` → Gemini 入口，仅保留为历史贡献引用；本模板使用两条月付 exact，不借用 Ultra 20TB / 30TB 源，旧记录不作为这两条源的实机购买证明。

土区 20TB 的说明为：**旧 iOS 20TB 编号；公开记录报价为 1989.99 里拉，实际金额与周期查看 App Store。** [Dgkncn 固定提交](https://github.com/Dgkncn/g1-acq-plus/blob/f0f86c4dc955fcb35aad9c882e60deaf08db4d1f/g1-acq.js#L48-L54) 同时记录完整映射与 **₺1,989.99/月**；[RealTong 固定提交](https://github.com/RealTong/surge-rules/blob/4268e75ddb72411582d5491e3e1b587f3021c49d/g1.js#L13-L18) 也列出同一完整映射。[土耳其 App Store 公开列表](https://apps.apple.com/tr/app/google/id284815942)列出 **Google AI Ultra (20 TB) ₺1.989,99**，只提供商品名称与金额，未提供 productId 或周期。月付表述属于公开脚本记录，本项目未据此完成购买、周期或权益验证。

土区 30TB 的[公开历史记录](https://github.com/kawhaiyoung/rule/blob/b9ce20bc11a77762216fb9f1ab0f04371f943290/G1_ACQ_Egern_README.md#L75)记载 `g1.ios.30tb.m` 曾调起 **2949.99 TRY** 报价；同一 Apple 公开列表列出 **Google AI Ultra (30 TB) ₺2.949,99**。两个土区模板的公开报价均与当前账号的实际结算分开记录：金额、周期与续费看 App Store 面板，权益看 Google One 账户。

**Pro 与土区 20TB / 30TB 可同时使用。** Ultra 75p 同时切换 20TB / 30TB，土区 20TB、土区 30TB 各自只切换对应的精确源，均保留两条月付 exact。「2TB / Pro · 12个月 90p」仍使用宽 `prefix` `g1.ios.2tb.` → `g1.2tb.ai.12months_ip_90p`，不覆盖新增月付 exact：旧月付源按精确规则优先，新 AI 月付候选也不属于这个前缀。**切回旧前缀行为时，在管理页停用 `g1.ios.2tb.ai.m` 与 `g1.ios.ai.2tb.m.ip_3mo_75p.acq` 两条月付 exact，再应用 Pro 12个月模板**；前缀只匹配其自身源族，新 AI 月付候选仍按其他已启用规则处理。75p 表示减免 75%、实付 25%；默认三条保持不变，预制目录没有过期 `trial` 或 Ultra 90p 模板，也不重新开启旧试用或 Ultra 一折模式。

- **合并并启用**：按 `(match, from)` 查找已有规则，更新目标并设为启用，保留该条 `id` 和顺序；缺少时追加新规则。其他手动规则、禁用规则与更窄前缀 / 精确覆盖均保留，仍按精确优先、最长前缀决定实际匹配。
- **应用 Pro 修正旧入口**：仅在点击 `pro-1yuan` 时，同一次保存会将仍启用的两种旧规则设为 `enabled=false`：`prefix` `g1.ios.2tb.` → `com.google.gemini.2tb.ai.m.3month_ip_99p`、`exact` `g1.ios.20tb.m.v2` → 同一 Gemini 目标；保留原 ID、顺序和目标，已禁用项保持原样。随后合并启用两条月付 exact，已有条目保留 ID / 顺序，缺少时按模板顺序追加。停用只针对上述匹配方式 / 源 / 同一 Gemini 目标组合；旧来源采用其他目标时保留其值与启用状态，包括旧 2TB 前缀 90p、土区 20TB、75p 与手动 20TB 目标，未参与月付 exact 合并的其他规则保持原样。安装升级、普通 GET 不执行该修正；随后应用土区 20TB 可按同源合并，原位启用并切换旧 20TB 条目。
- **重复点击与容量**：重复应用不新增重复规则，但成功保存仍生成新修订。禁用规则也计入 **30 条**上限；已有 30 条时仍可更新同源规则。合并与停用旧入口先在副本中统一校验，超过 30 条或修订冲突时整次失败、零写入，不留下部分模板或单独停用的旧规则。
- **冲突与存储失败**：旧页面或保存前配置已变化时返回 409，刷新核对再提交；读取、写入或回读失败返回 503，不显示保存成功，刷新后核对实际配置。损坏或不可读取的配置会禁用模板控件；缺少写入接口时也停用模板操作。
- **状态与执行分开**：卡片的 **当前规则一致** 比较当前启用规则；Pro 卡片要求两条月付 exact 均以模板目标启用，且旧 2TB 前缀 → Gemini、旧 exact 20TB → Gemini 均未启用。内建默认满足 Ultra 75p 与 Pro 12个月两张卡片，POST 成功提示才表示本次已保存。重开方案后核对 **`test.version=g1-acq-v7.13-mappings`**、`test.mappingRevision`、`test.mappingUpdatedAt`、`test.mappingStatus` 与当前配置一致，并查看执行时间 `test.updatedAt` 和 **`test.matchedFrom` 的实际 `id` / `to`**；报告版本徽标与一致标签均不代替执行记录、App Store 购买或权益。
- **五张卡片的命中诊断**：配置有效、模板规则一致，且最近执行版本 / 修订 / 配置更新时间 / 状态符合当前配置时，显示 **最近响应：本模板命中 N 次。** 并逐条列出每个源的命中次数。计数按本模板 `exact` / `prefix` 原始来源和执行记录中明确保存的有效 `to` 筛选，不把旧记录展示时推断补全的目标计入，也不用全局 `test.hitCount` 替代；其他模板、同源不同目标、旧宽前缀产生的普通 2TB → Gemini 均不算作 Pro 模板命中。真实当前执行零命中显示 **0 次**；规则尚未一致显示 **当前规则尚未应用此模板。**；规则已一致而当前配置尚无新版执行记录显示 **等待当前配置的新响应记录。** 数字只代表 HTTP 字符串替换，未记录 StoreKit 查询、购买调用、错误码或弹窗结果。
- **与恢复默认的区别**：应用模板保留其他规则并保存为 `custom`；**恢复默认**替换整个规则配置，清除手动差异并回到内建三条 `discount75`。两种操作均保留采集与执行历史，模板不新增持久化字段或 JSON 字段。

## 默认规则与手动映射

主入口先采集 `one.google.com/` 原始文字响应，再仅对 `one.google.com/ai?` 响应中的完整 SKU 执行规则。首次使用或恢复默认时启用以下三条：

| 匹配方式 | 源 | 目标 ID |
|---|---|---|
| 前缀 `prefix` | `g1.ios.2tb.` | `g1.2tb.ai.12months_ip_90p` |
| 精确 `exact` | `g1.ios.20tb.m.v2` | `g1.20tb.3months_ip_75p.acq` |
| 精确 `exact` | `g1.ios.30tb.ai.pro.m` | `g1.ai.ultra.3months_ip_75p.acq` |

编辑时选择**精确或前缀**，填写源与完整目标 ID，勾选“启用”后保存。精确源与目标支持 `g1.*` / `com.google.one.*` / `com.google.gemini.*`，命名空间之后有 1–160 个字母、数字、点、下划线或连字符，完整 ID 不以点结尾；**前缀源以点结尾**且命名空间之后有内容，只匹配带非空后缀的完整 SKU。源 / 目标表单的 `maxlength=178` 容纳 18 字符 Gemini 命名空间加 160 字符后缀，后缀上限保持 160。相同匹配方式与源的规则重复、源与目标相同、非法 ID 或超过 **30 条**时提交被拒绝，禁用规则也计入上限与重复检查。

**启用的精确规则优先；否则采用最长的启用前缀。** 禁用规则不参与匹配；每个原始 ID 只替换一次，目标不再继续匹配另一条规则。删除全部规则或全部取消启用并保存后，响应原样通过。目标是否已在原响应或累计清单中出现，不影响规则执行；本版无备用目标，命中行 `fallback=false`。

默认 2TB 候选来自用户截图，目标没有 `.acq`；标签 `$1.99 × 12 months = $23.88/year` 表达连续 12 个月的月度优惠，`90p` 表示 **90% off、约一折**。截图标题 **Pro 5TB** 未改变默认 `g1.ios.2tb.` 源，也未新增 5TB 前缀；截图标签不等同于 iOS 商品、一次年付扣款或实际 5TB 权益。

## 安装（Shadowrocket / 小火箭）

进入 **配置页 → 当前使用配置右侧的 (i) 图标 → HTTPS 解密**。

![配置页入口示意：点击当前使用配置右侧的 (i) 图标进入配置编辑，才能看到 HTTPS 解密](docs-config-entry-example.png)

图中配置名为示例；个人文件列表、修改时间、文件大小和设备状态栏已移除。

1. 在小火箭模块管理中启用 `v7.13.0` **G1 ACQ SKU 管理**，只开启一个改写入口；旧版用户先关闭旧模块再安装新地址，首页保持 VPN 连接。
2. 从上述当前配置的 **(i)** 入口进入 **HTTPS 解密**，打开解密开关。已有可用且已受信任的 Shadowrocket 证书时直接沿用；尚未配置证书时，在该页生成并安装证书，再完成下两步。
3. 首次配置证书时，在 iOS **设置 → 通用 → VPN 与设备管理** 中完成 Shadowrocket 描述文件安装。
4. 首次配置证书时，在 iOS **设置 → 通用 → 关于本机 → 证书信任设置** 中开启对应 Shadowrocket 根证书的信任。
5. 在当前配置的 **HTTPS 解密 hostname 列表**中核对 `one.google.com`；模块通过 `%APPEND%` 追加该域名。这里是 HTTPS 解密列表，不是 DNS Hosts。
6. 安装、升级模块或更改解密配置后，重新连接小火箭，再重新进入 Google App 的方案页面。

## 手机端使用流程

1. 保持主入口开启与小火箭连接，在 **Google App（彩色 G 图标）→ Google One 管理** 浏览实际提供的 2TB / Pro、20TB / 30TB、月付、年付和优惠入口，让模块采集原始 SKU。
2. 在 Safari 打开[本地报告](https://one.google.com/g1-sku-report)，核对 **本机脚本已接管** 与 **v7.13.0**。在 **预制映射模板** 中点击所需卡片的 **应用模板** 直接合并保存；安装升级本身保留现有配置。「1 元 Pro · 月付源核对」应启用 `exact` `g1.ios.2tb.ai.m` 与 `exact` `g1.ios.ai.2tb.m.ip_3mo_75p.acq`，两者目标均为 `com.google.gemini.2tb.ai.m.3month_ip_99p`；旧 2TB 前缀与旧 exact 20TB → 同一 Gemini 目标均停用。新 AI 月付源仍标为候选。卡片已显示 **当前规则一致** 时，点击仍会保存并生成新修订。
3. 手动规则可从采集列表点源预填，或在新增表单填写源与目标；输入支持已采集 SKU 与模板目标候选。选择精确或前缀、勾选启用，再点该条的**保存**；取消勾选后保存可禁用。**删除**只移除该条；**恢复默认**替换全部规则为默认三条，不清历史。
4. 成功后 303 返回报告并提示已保存，核对当前配置。手动非法提交保留本次填写并显示错误；模板超过 30 条时整批失败；旧页面冲突提示后刷新、核对最新规则再提交；存储失败时不显示成功，刷新核对实际配置。
5. 重新进入 Google App 对应方案页，使下一次 `/ai?` 响应使用已保存配置；「1 元 Pro · 月付源核对」进入实际提供的 **Pro / AI 月付方案页**。刷新报告，核对 `test.version=g1-acq-v7.13-mappings`，执行修订、配置更新时间与状态符合当前配置，`test.updatedAt` 为本次时间；在卡片查看本模板及每源次数，在 `test.matchedFrom` 对照 `g1.ios.2tb.ai.m` 或 `g1.ios.ai.2tb.m.ip_3mo_75p.acq` 的完整 `id` 与 Gemini `to`。源未出现时该源为 0；尚无当前执行时显示等待。保存本身不改变旧执行记录；HTTP 命中不证明 Pro 按钮已调用购买或面板已打开。
6. 核对 App Store 实际商品名称、周期、初次与续费金额，再点 **导出 JSON** 保存本次记录；默认目标核对 2TB / Pro 和 Ultra，手动规则核对其实际源与目标。

![Google One Ultra 方案选择面板：旧模块的 20TB 方案入口示例](docs-ultra-plans-example.png)

截图展示旧 20TB 入口，供 Ultra 模板对应方案参考；「1 元 Pro · 月付源核对」使用实际提供的 **Pro / AI 月付方案**，不借用该 Ultra 源；2TB 12个月优惠模板继续按旧 2TB 前缀核对。账号、地区和版本会影响页面展示，以手机实际提供的方案为准。原生 StoreKit 界面自身不属于网页响应改写范围。

浏览方案且收到匹配响应时，主模块先读取原始正文中的 `g1.*`、`com.google.one.*` 与 `com.google.gemini.*`，按 ID 去重累计次数，最多保留 **300 个 ID**，然后才执行符合 `/ai?` 范围的映射。重复 ID 更新次数和时间；到达容量后继续更新已保存 ID，并记录被容量丢弃的新 ID 数。采集保存改写前的原始编号，跳过本地报告页；手机保存候选 ID、次数、UTC 时间、扫描状态和最多 **10 条**脱敏响应事件，不保存完整响应正文，不查询 App Store，不发网络上报。

查找页面未展示的 SKU 时，依次浏览 Google App 实际提供的月付、年付和优惠入口：原始响应中携带的编号即使未显示在界面上，也会被采集。服务器未下发的编号不会进入原始清单；指定候选由模块替换后，在 App Store 原生订阅界面验证。完整 iOS 操作见 [SKU 采集与候选验证](docs/pro-annual-test.md#6-在-ios-小火箭中采集与验证隐藏-sku)。

## 本地报告与排错

保持主入口开启与小火箭连接，在 Safari 打开[本地报告](https://one.google.com/g1-sku-report)。页面显示 **Google One SKU 管理**、**本机脚本已接管** 与 **v7.13.0**，分别展示当前映射配置、实际采集和最近执行记录；操作区可[导出 JSON](https://one.google.com/g1-sku-report?format=json)。

页面由 Shadowrocket 的 `http-request` 脚本在手机本机生成，拦截 `/g1-sku-report`、末尾 `/` 与 query，直接返回 HTML 或 JSON。编辑使用原生 HTML POST 表单，无页面 JavaScript 或外部资源；成功后以 303 返回报告 GET，刷新不重复提交。规则变更只接受报告同源表单，普通 GET、导出 JSON 和 GET 的 `action` 参数均不修改映射。

若看到 Google 普通页面、404，或没有本机标识与编辑控件，核对新主入口、小火箭连接、**当前配置 (i) → HTTPS 解密**、`one.google.com` hostname 与受信任证书，再粘贴完整地址打开。

**报告已是 v7.13.0，但 Gemini 配置显示 `invalid` / 执行 `config-error` 时，先排查响应与报告混装：**

1. 先导出 JSON，记录 `reportVersion`、`mappingConfig.status/revision`、`test.version/mappingStatus/mappingRevision/updatedAt`。旧执行记录会保留；报告提示旧版本时，先重新进入一次对应方案页，再看执行时间与版本是否更新，旧记录本身不证明仍在运行旧脚本。
2. 在模块管理中只启用本页 `@v7.13.0` 的 **G1 ACQ SKU 管理**，停用旧模块、独立扫描器与手工添加的重复脚本。检查该模块两个 `script-path` 均为 `@v7.13.0`，响应指向 `g1-acq-discount.js`，报告指向 `g1-sku-report-discount.js`；旧固定地址需要换新地址后更新模块。重新连接小火箭。报告徽标只说明报告脚本版本，旧 v7.10 响应脚本仍会把 Gemini 目标判为无效；这与短 Pro 目标的输入长度无关。
3. 回到本地报告应用 **1 元 Pro · 月付源核对**，核对 `g1.ios.2tb.ai.m` 与候选 `g1.ios.ai.2tb.m.ip_3mo_75p.acq` 两条月付 exact → Gemini 均启用，旧 2TB 前缀 → Gemini 和旧 exact 20TB → Gemini 均停用；已有前缀 90p、土区 20TB / 75p / 手动其他目标保留。安装、GET 与重新连接均不代替点击应用，也无需清空记录。
4. 退出已打开的方案，重新进入实际提供的 **Pro / AI 月付方案页**。刷新报告，核对 `test.version=g1-acq-v7.13-mappings`、执行修订 / 配置更新时间 / 状态与当前配置一致，再核对卡片本模板及两源次数、`test.matchedFrom` 的完整源和 Gemini `to`。卡片等待表示尚无当前配置的新记录；当前 0 次表示本次 HTTP 响应未命中模板，其他规则的命中数不计入 Pro。若本次执行时间已更新但版本仍旧，继续检查重复入口与该响应脚本的下载地址；若时间未更新，核对 `/ai?` 响应、页面缓存、连接、解密与保存日志。命中后仍无面板时分别记录原生商品返回 / 错误和是否调用购买；HTTP 报告未提供这条 StoreKit 证据链。
5. 响应与报告已统一当前版、当前 `mappingConfig.status` 仍为 `invalid` 时，保存错误状态与已有规则备份；报告只返回固定错误，不回显损坏配置原文。确认当前版仍判定存储 JSON / schema / 规则损坏后显式 **恢复默认**重建映射，再应用模板并从先前有效的导出恢复所需手动规则；恢复默认会替换自定义规则，采集 / 执行历史保留。`unavailable` 或 503 按存储读取 / 保存反馈处理。

| 当前 JSON 字段 | 含义 |
|---|---|
| `reportVersion=v7.13.0` | 报告脚本版本，与保存的采集、执行版本独立 |
| `mappingConfig` | 当前有效配置：`status, revision, updatedAt, mode, customized, rules, target, targetOrigin, error, limit`，`limit=30` |
| `mappingConfig.rules[]` | `{id, match, from, to, enabled}`；规则 ID 由本机生成，模板匹配已有规则时保留 ID，`match` 为 `exact` 或 `prefix` |
| `mappingConfig.status` | `default` 默认、`custom` 手动、`invalid` 配置损坏、`unavailable` 读取失败；后两种暂停改写并显示错误 |
| `configuredMode` / `configuredTarget` | 从当前 `mappingConfig` 派生；默认 `discount75` / `g1.2tb.ai.12months_ip_90p` |
| `scan.version` / `scan.mode` | 实际采集版本与模式；本版版本为 `g1-acq-v7.13-mappings`，模式取执行当时配置 |
| `test.version` / `test.mode` | 最近执行版本与模式，保留到下一次执行记录成功写入 |
| `test.mappingRevision` / `test.mappingUpdatedAt` / `test.mappingStatus` | 最近执行使用的配置修订、配置保存 UTC 时间和状态；旧记录缺失时不补成当前配置 |
| `scan.updatedAt` / `test.updatedAt` | 实际采集 / 执行记录的 UTC 时间，与映射保存时间独立 |

`mappingConfig.revision` 是变更标识：未存储配置时为 `defaults-75p-v1`，成功保存生成新修订，用于拒绝旧页面覆盖新配置。配置读取出错时不假定默认规则；`invalid` 可用**恢复默认**修复，`unavailable` 需待本地存储恢复。非法输入显示 400，旧页面冲突显示 409，存储读取或保存失败显示 503；失败不显示保存成功，非法输入保留本次填写供修改。

| 保存的模式值 | 报告名称 |
|---|---|
| `discount75` | Ultra 三个月 75p（2.5折） |
| `custom` | 手动映射 |
| `trial` | Ultra 1个月免费试用优先（历史模式） |
| `discount` | Ultra 三个月一折优先（历史模式） |
| 空字符串、缺失或未知值 | 未记录 |

`scan.mode`、`test.mode` 只读取实际保存值，缺失或未知时 JSON 为空字符串、HTML 显示未记录，不按入口、旧版本名或目标补写。当前 `custom` 或 `discount75` 配置可与旧 `g1-acq-v7.12-mappings` / `g1-acq-v7.11-mappings` / `g1-acq-v7.10-mappings` / `g1-acq-v7.9-mappings` 的 `custom` 或 `discount75`、`g1-acq-v7.8-75p` / `discount75`、`g1-acq-v7.7-trial` / `trial`、`g1-acq-v7.7-discount` / `discount` 记录并存；历史 `discount` 仍是一折模式。采集与执行独立写入两键，分别查看版本、模式、时间和执行配置修订。

只有 `g1-acq-v7.13-mappings` 标为本版采集记录；旧版本保留真实值与“旧采集记录”。已保存的最近 10 次响应继续显示；更早记录没有 `recentResponses` 时不补造历史，事件也不套用当前模式。版本未知或无记录时显示“尚未保存本版采集响应记录”。

| 采集字段 | 含义 |
|---|---|
| `scan.scannedResponses` | 累计处理的文字响应数，保持原有计数含义 |
| `scan.matchedResponses` | 文字响应中至少识别到一个候选 ID 的累计响应数，含重复 ID；保持原有含义 |
| `scan.nonTextResponses` | 累计非文本响应数，不计入 `scannedResponses` |
| `scan.recentResponses` | 最多 10 条响应事件；JSON 数组按接收顺序旧 → 新保存，HTML 表格按新 → 旧展示；每条含 `{at, path, bodyType, status, candidateCount, addedCount, omittedCount}` |

单次事件中，`candidateCount` 是该响应内去重后的候选数，`addedCount` 是本次新加入并实际保留的 ID 数，`omittedCount` 是本次因容量丢弃的不同 ID 数。状态包括 `new-skus`（新增）、`known-skus`（重复）、`no-skus`（无 ID）、`limit-reached`（无新增保留且有容量丢弃）、`non-text`（非文本）。`addedCount>0` 时优先标为 `new-skus`，即使同时 `omittedCount>0`；只有 `addedCount=0` 且 `omittedCount>0` 时才标为 `limit-reached`。路径只保留 `/`、`/ai`、`/plans`、`/_/…/data/batchexecute` 或 `[其他 one.google.com 路径]`，不保存 query、完整 URL、正文、请求头或响应头。

`configuredTarget` 与 `mappingConfig.target` 仍取当前启用且源恰为 `g1.ios.2tb.` 的前缀规则目标；`test.target` / `test.targetOrigin` 保留执行当时的同一兼容语义。它们不汇总全部 Pro exact：应用 Pro 停用旧前缀 → Gemini 后，`configuredTarget` 可为空而两条月付 exact 正常启用；若保留前缀 90p，则摘要仍显示 90p，精确覆盖的实际目标看卡片逐源数与 `test.matchedFrom[].to`。默认 `targetOrigin=user-specified`，手动配置含该前缀时为 `user-configured`，缺少该前缀时为空；本次不新增 JSON 字段。历史目标推断使用固定默认 2TB 常量，不用新配置回填旧记录：

| 历史执行记录 | 保留的 2TB 目标 | 保留的来源与模式 |
|---|---|---|
| `g1-acq-v7.12-mappings` / `g1-acq-v7.11-mappings` / `g1-acq-v7.10-mappings` / `g1-acq-v7.9-mappings` | 保留当时保存的目标，手动配置可与默认不同或为空 | 保留当时来源、`mode=discount75` / `custom`、配置修订、实际 `to` 与 `fallback=false`，不套用新模板；其中 v7.12 的旧 2TB 前缀 → Gemini、v7.11 的旧 20TB → Gemini 命中仍归旧入口历史 |
| `g1-acq-v7.8-75p` | `g1.2tb.ai.12months_ip_90p` | `user-specified`；`mode=discount75`、固定 75p 与 `fallback=false` 保留 |
| `g1-acq-v7.7-trial` | `g1.2tb.ai.12months_ip_90p` | `user-specified`；已保存的 `mode=trial` 保留试用历史含义 |
| `g1-acq-v7.7-discount` | `g1.2tb.ai.12months_ip_90p` | `user-specified`；已保存的 `mode=discount` 保留一折历史含义 |
| v7.5 / v7.6 | `g1.2tb.ai.12months_ip_90p` | `user-specified`；缺失 `mode` 时为空，版本保留 `g1-acq-v7.5` / `g1-acq-v7.6` |
| v7.3 / v7.4 | `g1.2tb.ai.annual_ip_90p.acq` | `user-specified`；缺失模式为空 |
| v7.2 | `g1.2tb.ai.annual.3months_ip_90p.acq` | `pattern-derived`；缺失模式为空 |
| v1 / v7.1 普通年付记录 | `g1.2tb.ai.annual` | `legacy`；缺失模式为空 |

`test.hitCount` 是全部规则的总改写数；`test.annualHitCount` 沿用兼容字段名，只统计源以 `g1.ios.2tb.` 开头的改写，手动精确规则命中此类源也计入。旧月付 `g1.ios.2tb.ai.m` 命中会计入，新 AI 月付候选 `g1.ios.ai.2tb.m.ip_3mo_75p.acq` 命中不计入；该字段不代表全部 Pro 命中。日志 `annualHits` 含义相同，报告显示“其中 2TB”；字段名不证明年付扣款。判断本模板使用卡片的本模板 / 每源次数和 `test.matchedFrom`，不以总数或该兼容字段替代。

`test.matchedFrom` 每行保留 `{id, to, count, fallback}`，`to` 为该源本次实际目标，可为 `g1.*`、`com.google.one.*` 或 `com.google.gemini.*`。本版 `fallback=false`，HTML 显示“否”。历史 `fallback=true` 保留当时使用备用的含义：v7.7 `discount` 备用为 75p，v7.7 `trial` 与 v7.6 备用为 90p，更早的 75p 行保持原值；HTML 按实际 `to` 显示 90p、75p 或“是”，目标不足时仅显示“是”。相同 75p 目标需结合版本、模式与 `fallback` 判断。

`status=rewritten` 表示至少一条规则命中，`no-match` 表示没有启用规则命中，`non-text` 表示非文本，`config-error` 表示配置损坏或读取失败并暂停改写；后三种原样返回响应。报告保存最近一次 `/ai?` 执行，后续零命中也会更新它。旧 v1 仅 2TB 行缺少 `to` 时补为 `g1.2tb.ai.annual`，缺少 `annualHitCount` 时从旧行次数计算，旧目标、来源、版本与已保存模式保持原值。

当前日志前缀为 `[g1-acq]`，运行版本为 `g1-acq-v7.13-mappings`，包含执行模式、映射状态与修订；采集摘要保留 `status`、`addedCount`、`candidates`、`omittedCount`、`occurrences`、`saved=yes/no`，改写摘要保留 `hits` 与 `annualHits`，命中行显示 `源 SKU → 实际目标 xN`。`saved=no` / `SKU collection unavailable` 表示本次采集未成功保存或未完成，报告仍可显示旧计数与时间。本版没有备用日志；历史 `fallback=实际完整目标编号` 与更早 `fallback=75p` 按原含义读取。

清单仍是旧 SKU 时，按下面顺序比较一次实际活动：

1. 在报告记录 `reportVersion`、`configuredMode`、实际 `scan.version` / `scan.mode`、`test.version` / `test.mode`、三个响应计数与最新事件时间，保留当前清单。
2. 从 Google App 重新进入实际提供的 2TB / Pro 方案，再浏览其它实际方案页，等待加载完成。
3. 返回 Safari 刷新报告。文字计数增长且最新事件为 `known-skus`，说明收到的是已保存 ID，次数会增加而清单不增加；`no-skus` 表示该响应未携带可识别 ID。若只增加 `nonTextResponses`，查看 `non-text` 事件。
4. 三个计数与最新事件时间均未变化，只能确认这轮未保存新的采集记录；存储写入失败也会保留旧计数。先查看脚本日志 `saved=no` / `SKU collection unavailable`，再逐项核对页面缓存、`one.google.com/` 匹配范围、VPN 连接、唯一开启的改写入口、当前配置的 HTTPS 解密、证书信任与 hostname。

重装或清空记录不会使服务器返回新编号。`?clear=1` 只清采集 / 测试两键，**不清映射**；**恢复默认只改映射，不清历史**。完整字段、表单反馈与实机记录模板见 [SKU 管理使用文档](docs/pro-annual-test.md)。

## 工作范围与本地存储

| 工具 | 脚本匹配范围 | 行为 |
|---|---|---|
| 主入口与 G1 ACQ 被动采集 | `^https://one\.google\.com/` 响应，跳过本地报告页 | 原始 SKU 采集、非文本计数、最近 10 次响应诊断 |
| 映射改写 | `^https://one\.google\.com/ai\?` 响应 | 采集后按当前配置单次替换，保存最近执行记录 |
| G1 Pro Annual Test 兼容入口 | `^https://one\.google\.com/ai\?` 响应 | 在原范围内使用同一映射配置 |
| 本地结果页 | `/g1-sku-report`、末尾 `/` 与 query | 读取配置和历史、导出 JSON；原生 POST 表单保存映射 |

| 本地键 | 内容 |
|---|---|
| `g1.sku.scan.v1` | 原 schema 1 采集数据，最多 300 个 ID、10 条脱敏响应事件 |
| `g1.pro.annual.test.v1` | 原 schema 1 最近执行数据，沿用 v7.9 的执行配置修订、时间与状态字段 |
| `g1.sku.mappings.v1` | 独立 schema 1 映射记录：`schemaVersion, revision, updatedAt, customized, rules`；最多 30 条 |

时间均使用 UTC。映射键不存在或为空时采用默认规则；显式保存空规则列表表示关闭改写，仍为 `custom`。映射键 JSON / schema / 规则损坏或读取失败时暂停改写，显示配置错误；普通报告 GET 与导出不写入配置。恢复默认保存 `customized=false`，恢复默认模式；采集与执行仍各自独立写入原两键。

- **脚本读取**：响应脚本采集原始正文，不读请求头或请求体；报告 POST 只读取 `Origin`、`Content-Type`、可选 `Sec-Fetch-Site` 与表单正文，不读 Cookie / 认证头。采集事件与导出不保存完整 URL、query、正文或请求头。
- **本地处理**：采集、改写、报告与映射共用手机 `$persistentStore`，无网络上报；HTML 无 JavaScript 和外部资源。模块与脚本下载使用固定 `@v7.13.0` GitHub / jsDelivr 地址。
- **改写范围**：只修改符合规则的商品 ID，不改价格字段；原生 StoreKit 返回另按实际收银台记录。
- **设备配置**：沿用 `[MITM]` 的 `%APPEND% one.google.com` 与 `[Rule]` 的全局 UDP 443 拦截；支持回退的 QUIC 请求转走 TCP，也会影响其它 App 的 HTTP/3、速度或连通性。脚本未申请定位、相册或通知权限，VPN、描述文件与根证书由设备配置管理。

## 文件

| 文件 | 用途 |
|---|---|
| [g1-acq-ultra-discount.sgmodule](g1-acq-ultra-discount.sgmodule) | G1 ACQ SKU 管理主入口，保留原文件名 |
| [g1-acq-v7.sgmodule](g1-acq-v7.sgmodule) | 保留名称 G1 ACQ 的兼容入口 |
| [g1-acq.js](g1-acq.js) | 响应唯一源，运行版本 `g1-acq-v7.13-mappings` |
| [g1-acq-discount.js](g1-acq-discount.js) | 自动生成、与响应源实现相同的兼容副本 |
| [g1-pro-annual-test.sgmodule](g1-pro-annual-test.sgmodule) | 保留名称与 `/ai?` 范围的兼容入口 |
| [g1-sku-scan.sgmodule](g1-sku-scan.sgmodule) | 旧版独立扫描模块，更新 pin 并保留报告请求体配置 |
| [g1-sku-scan.js](g1-sku-scan.js) | 历史独立扫描实现 `pro-annual-test-v2`，无模式与响应事件 |
| [g1-sku-report.js](g1-sku-report.js) | 本地管理页、POST 表单与 JSON 报告唯一源，`reportVersion=v7.13.0` |
| [g1-sku-report-discount.js](g1-sku-report-discount.js) | 自动生成、与报告源实现相同的兼容副本 |
| [lib/mapping-config.js](lib/mapping-config.js) | 响应与报告共享的映射配置引擎 |
| [tools/build-variants.cjs](tools/build-variants.cjs) | 嵌入共享配置引擎、生成两个兼容副本并检查同步 |
| [docs/pro-annual-test.md](docs/pro-annual-test.md) | 安装升级、预制模板、手动映射、报告字段、历史兼容与记录模板 |

## 离线验证

使用 Node.js 22 或更新版本（原生表单 pattern 按 UnicodeSets v 语义验证），在仓库根目录执行：

```sh
node tools/build-variants.cjs --check
node --test tests/*.test.cjs
```

[lib/mapping-config.js](lib/mapping-config.js) 是共享配置引擎源；[tools/build-variants.cjs](tools/build-variants.cjs) 更新 [g1-acq.js](g1-acq.js) 和 [g1-sku-report.js](g1-sku-report.js) 中的生成区块，再生成 [g1-acq-discount.js](g1-acq-discount.js) 与 [g1-sku-report-discount.js](g1-sku-report-discount.js)。修改源后运行 `node tools/build-variants.cjs`；`--check` 只检查两个源内区块和两个副本，不写文件。

验证项包括默认三条规则、五套模板的真实表单 POST / 303、两条月付 exact 与年度 / helium / 普通 2TB 的区分、Pro 与土区 20TB 共存、各源独立切换、应用 Pro 时原子停用旧 2TB 前缀及旧 exact 20TB → 同一 Gemini 目标并保留其他目标、同源合并启用与 ID / 顺序保留、重复应用、30 条内更新与超限原子失败、旧页面 / 保存前冲突、存储读写与回读失败；卡片核对当前规则一致、当前版本 / 修订门槛、等待与真实零命中、单源 / 双源次数、其他来源 / 目标不计入；也覆盖 Pro 12个月前缀不覆盖两条月付 exact、手动增删改与恢复、禁用 / 空列表、精确优先 / 最长前缀 / 单次替换、三个 SKU 命名空间与 Gemini 完整 178 字符表单边界、历史记录独立、300 / 10 上限、JSON 与四个模块配置。结果以实际命令输出为准；离线验证字符串与报告行为，实机结果按文档模板填写。

## 贡献致谢

感谢 [@cehomecambodia-lang](https://github.com/cehomecambodia-lang) 通过 [PR #3](https://github.com/crhywun/g1-acq/pull/3) 提供 20TB / 30TB Ultra 1个月免费试用 SKU 映射和三个月 90p 备用方案。

感谢 [@duwqijlk](https://github.com/duwqijlk) 通过 [PR #8](https://github.com/crhywun/g1-acq/pull/8) 提供 `com.google.gemini.2tb.ai.m.3month_ip_99p` 目标与旧 20TB → Pro 入口的购买记录。v7.12.0 曾使用 `g1.ios.2tb.` 广前缀；v7.13.0 将「1 元 Pro · 月付源核对」改为旧 Pro 月付与 AI 月付候选两条 exact。旧 Ultra 来源仅保留历史含义，本模板不借用该源；新候选的套餐身份、两条源的购买结果分别记录。
