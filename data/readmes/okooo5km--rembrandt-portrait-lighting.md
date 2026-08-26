# Rembrandt Portrait Lighting

<p align="center">
  <img src="./skills/rembrandt-portrait-lighting/assets/icon-large-v2.png" width="144" alt="伦勃朗光肖像技能图标">
</p>

把普通人物或宠物照片转换为画幅自适应、身份稳定、背景干净的专业伦勃朗光摄影棚肖像。

![伦勃朗光转换预览](./examples/rembrandt-portrait-lighting-preview.jpg)

## 这个 Skill 的来由

这个项目的起点其实很简单。

我一直很喜欢冷静、克制的低调光影：光不需要铺满整张脸，只要从一侧落下来，让眼神、皱纹和面部轮廓慢慢从暗处浮现，普通的瞬间也会拥有电影画面一样的分量。

于是我拿爷爷奶奶的一张日常合影做了尝试，把两个人分别整理成独立肖像，重新构建背景、构图和伦勃朗光。结果比预想中更打动我——照片里的人没有被“变成另一个人”，只是像被重新请进摄影棚，认真地照亮了一次。

后来我把这套反复调整过的处理方法封装成了这个 Skill，并把它分享在这里。它不只属于专业模特，也不只为了制作头像。我更希望它能帮助每个人，把家人、朋友、自己，甚至陪伴身边的宠物，从一张普通照片里重新看见：保留真实的年龄、神态和生活痕迹，同时拥有一张足够郑重、足够漂亮，也真正像他们自己的肖像大片。

普通人也值得被认真地拍摄，值得在光里拥有属于自己的主角时刻。这就是这个项目想做的事。

## 特点

- 根据正脸、三分之四脸、侧脸或宠物面部结构选择可信光型，不硬画“三角光”。
- 默认保留原图比例、方向、身份、年龄、表情、服装和宠物特征。
- 使用 `4:1–6:1` 主辅光比、负补光和必要时的克制轮廓光，形成清晰但可读的明暗层次。
- 背景采用无颗粒、无斑驳、无光晕的深炭灰至墨黑连续渐变。
- 允许小幅调整肩线、头部角度、视线空间和构图，避免证件照或遗像感。
- 支持人物、宠物、多人或人宠合影，以及头像、社交肖像、编辑横幅等常见画幅。

## 技能效果展示

### 原图

![普通合影原图](./examples/portrait-pair-original.jpg)

### 转换结果

| 奶奶的肖像 | 爷爷的肖像 |
| --- | --- |
| ![奶奶的伦勃朗光肖像](./examples/portrait-grandma-rembrandt.jpg) | ![爷爷的伦勃朗光肖像](./examples/portrait-grandpa-rembrandt.jpg) |

转换结果保留原人物身份、年龄、服装和自然神态，同时重建主光、暗部、主体分离与摄影棚背景。

> ✨ **一个小彩蛋**
>
> 照片里的爷爷 88 岁，奶奶 81 岁。愿这束从暗处亮起的光，也替我们留下一点朴素的祝福——身体安康，岁月从容，长寿常伴；也愿每一位被镜头认真照亮的人，都能带着自己的故事，精神而自在地走过更长的时光。

## 安装

### 在 Youmind 中使用

在 Youmind 中点击安装并直接使用：[打开「伦勃朗光影棚肖像」](https://youmind.com/zh-CN/skills/rembrandt-studio-portrait-tWODPRtUVhvzQ9)

### 在 Codex 等 Agent 中使用

需要本机已安装 Node.js 与 npm。推荐使用开放的 Agent Skills CLI 安装：

```bash
npx skills add okooo5km/rembrandt-portrait-lighting --skill rembrandt-portrait-lighting
```

CLI 会自动识别 Codex、Claude Code、Cursor 等受支持的 Agent，并让你选择安装位置。

只为 Codex 全局安装：

```bash
npx skills add okooo5km/rembrandt-portrait-lighting \
  --skill rembrandt-portrait-lighting \
  --agent codex \
  --global
```

也可以使用更短的 `repo@skill` 写法：

```bash
npx skills add okooo5km/rembrandt-portrait-lighting@rembrandt-portrait-lighting
```

> `skills` CLI 当前使用 `add` 作为安装命令，不是 `install`。

### 本地开发

只有在修改本仓库、希望 Skill 随源码实时更新时，才需要使用软链接：

```bash
git clone https://github.com/okooo5km/rembrandt-portrait-lighting.git
cd rembrandt-portrait-lighting
ln -s "$(pwd)/skills/rembrandt-portrait-lighting" \
  "${CODEX_HOME:-$HOME/.codex}/skills/rembrandt-portrait-lighting"
```

如果目标路径已经存在，先确认它是否指向本仓库，不要直接覆盖。

## 使用

在 Codex 中上传人物或宠物照片，并调用：

```text
使用 $rembrandt-portrait-lighting 将这张照片转换为专业伦勃朗光摄影棚肖像，保留原图比例，背景保持干净无噪点。
```

也可以指定用途或画幅：

```text
使用 $rembrandt-portrait-lighting 制作 4:5 编辑肖像。允许轻微调整肩线，主光从画面左侧照入，不要纯黑背景或遗像感。
```

## 项目结构

```text
.
├── README.md
├── examples/
│   ├── rembrandt-portrait-lighting-preview.jpg
│   ├── portrait-pair-original.jpg
│   ├── portrait-grandpa-rembrandt.jpg
│   └── portrait-grandma-rembrandt.jpg
└── skills/
    └── rembrandt-portrait-lighting/
        ├── SKILL.md
        ├── agents/openai.yaml
        ├── assets/
        │   ├── icon-large-v2.png
        │   └── icon-small-v2.png
        └── references/
            ├── production-prompt.md
            └── subject-diagnostics.md
```

详细工作流与质量标准见 [SKILL.md](./skills/rembrandt-portrait-lighting/SKILL.md)。
