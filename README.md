# 王甲申 · 个人主页

求职用的个人主页：Java 后端 / AI 应用开发方向，2027 届。
站点只做一件事——把简历里「做了什么、怎么做的、结果如何」讲清楚，而不是罗列技术名词。

线上内容全部来自 `src/data/profile.ts` 这一个文件，改数据即可，不需要动模板。

## 技术栈

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Vue 3 | 3.5 | 视图层（`<script setup>` + TypeScript） |
| Vite | 8.3 | 开发服务器与构建 |
| Tailwind CSS | 4 | 样式（`@theme` 中集中定义配色与字体变量） |
| vue-router | 5 | 路由（`/` 首页、`/about`、404） |
| @fontsource-variable | 5.3 | Inter / JetBrains Mono 可变字体，自托管，不依赖外部 CDN |

## 目录结构

```
src/
  data/profile.ts         ← 唯一内容源：个人信息 / 项目 / 实习 / 技能 / 教育 / 荣誉
  views/HomeView.vue      ← 首页：hero、量化指标、项目、做法、技术栈、联系
  views/AboutView.vue     ← 关于：经历、教育、荣誉、技术栈
  views/NotFoundView.vue  ← 404
  components/             ← SkillGroupPanel 等展示组件
  assets/main.css         ← Tailwind 入口 + @theme 设计变量
public/
  wangjiashen-resume-ai.pdf    ← 「AI 应用开发工程师」版简历（页面上的下载按钮指向它）
  wangjiashen-resume-java.pdf  ← 「Java / Agent 后端」版简历
  favicon.svg
```

## 改内容

编辑 `src/data/profile.ts`，主要字段：

| 字段 | 说明 |
| --- | --- |
| `name` / `pinyin` / `initials` | 姓名、拼音（hero 铭牌）、首字母（导航方块与头像位） |
| `headline` | 首页大标题，拆成 `lead` / `accent`（描色）/ `tail` 三段 |
| `subline` / `bio` | 副标题与简介段落 |
| `email` / `phone` / `wechat` / `location` | 联系区，`phone` 会自动生成 `tel:` 链接 |
| `github` | 留空则不渲染该行 |
| `stats` | hero 下方铭牌里的数字（实习段数、项目数、排名） |
| `metrics` | 四条量化成绩，`value` 是主数字，`label` 是它属于谁，`note` 是一句怎么得到的 |
| `projects` | 每个项目：`period` `domain`（如 AGENT · RAG）`title` `subtitle` `description` `points[]` `metric` `tech[]`，有 `href` 才显示外链 |
| `experience` | 实习：`period` `role` `company` `summary` `points[]` |
| `skillGroups` | 技术栈四列，`level` 为 1–5，控制右侧进度条格数 |
| `education` / `honors` | 教育经历与荣誉（荣誉是字符串数组） |
| `resumes` | 下载按钮，`href` 已用 `import.meta.env.BASE_URL` 拼接，部署到子目录也不会 404 |

写内容的两条约束（也是这份站点的取舍）：
1. 项目条目写「遇到什么坑 → 用了什么办法 → 效果怎么衡量」，不写「使用了 XX 框架」。
2. 数字必须能在简历里对得上；对不上宁可删掉。

## 换简历

把新的 PDF 覆盖到 `public/wangjiashen-resume-ai.pdf` 与 `public/wangjiashen-resume-java.pdf`（文件名保持一致即可，无需改代码）。
若文件名不同，同步改 `profile.ts` 中 `resumes` 的 `href`。

## 本地开发

```bash
npm install
npm run dev        # 开发服务器
npm run build      # 产物到 dist/
npm run preview    # 预览构建产物
npm run type-check # vue-tsc 类型检查
```

## 部署

托管在 **GitHub Pages**，地址为 `https://<用户名>.github.io/personal-website/`。
推送 `master` 后由 `.github/workflows/deploy.yml` 自动构建并发布，无需手动上传 `dist/`。

`base` 由环境变量 `VITE_BASE` 决定，**必须与站点的实际访问路径一致**，否则 JS/CSS 会 404：

| 部署位置 | 访问地址示例 | `VITE_BASE` |
| --- | --- | --- |
| 仓库子路径（GitHub Pages 项目页） | `https://user.github.io/personal-website/` | `/personal-website/` |
| 用户根域 / 独立域名 | `https://user.github.io/` | `/` |

当前 `.env.production` 中写的是 `VITE_BASE=/personal-website/`，即按仓库子路径部署。
改完环境变量要重新 `npm run build`，构建产物里的资源前缀才会更新。

首次部署只需在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中把
**Source** 选为 **GitHub Actions**，之后推送即自动发布。

路由使用 history 模式，直接访问 `/about` 这类深链需要在托管端配置 SPA 回退。
工作流会把 `dist/index.html` 复制为 `dist/404.html`，GitHub Pages 因此能正确回退到
SPA，由前端路由渲染对应页面（未知路径显示 404 页）。

## 设计与内容原则

- 排版走「编辑部」风格：纸色背景、细网格、等宽小标签、克制的描线，不用渐变和卡片阴影。
- 首页顺序即说服顺序：一句话定位 → 四个数字 → 项目 → 做法 → 技术栈 → 联系。
- 「我的做法」四条（先定验收标准 / 结果可追溯 / 失败可降级 / 成本可核算）是几个项目的共同方法，用来回答「你后端怎么取舍」。

## License

内容与简历归作者本人所有；模板部分 MIT。
