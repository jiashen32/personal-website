# 项目交接文档：王甲申 · 个人主页

> 本文档用于把项目背景一次性交给 AI（如 DeepSeek），作为生成提示词、规划改动或排查问题的上下文。
> 阅读顺序建议：第 1 节 → 第 5 节（内容怎么改）→ 第 7 节（怎么提示）。

---

## 1. 项目定位

一个**求职用个人主页**，面向 Java 后端 / AI 应用开发岗位（2027 届）。

核心目标：把简历里的「做了什么、怎么做的、结果如何」讲清楚，而不是罗列技术名词。

- 站点内容全部来自单一数据文件 `src/data/profile.ts`，改数据即可更新整站。
- 设计走「编辑部 / 工程图纸」风格：纸色背景、细网格、等宽小标签、克制的描线；不用渐变和卡片阴影。
- 首页顺序即说服顺序：一句话定位 → 四个量化指标 → 项目 → 做法 → 技术栈 → 关于 → 联系。

**线上部署**：GitHub Pages（仓库项目页，子路径 `/personal-website/`），推送 `master` 自动构建发布。

---

## 2. 技术栈

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Vue 3 | ^3.5.42 | 视图层，全部使用 `<script setup lang="ts">` |
| Vite | ^8.2.2 | 开发服务器与构建 |
| Tailwind CSS | ^4.3.3 | 样式，设计变量集中在 `src/assets/main.css` 的 `@theme` |
| vue-router | ^5.3.1 | history 模式，`/`、`/about`、404 |
| Pinia | ^4.0.3 | 已安装并挂载，但目前没有实际业务 store（仅剩脚手架示例 `src/stores/counter.ts`） |
| @fontsource-variable | ^5.3.0 | Inter / JetBrains Mono 可变字体，自托管，无外部 CDN |
| TypeScript | ~6.0.0 | 类型检查用 `vue-tsc` |

构建脚本（`package.json`）：

```bash
npm run dev         # 开发服务器
npm run build       # 类型检查 + 构建到 dist/
npm run build-only  # 仅构建
npm run preview     # 预览构建产物
npm run type-check  # vue-tsc --build
```

Node 要求：`^22.18.0 || >=24.12.0`。
项目**没有** ESLint、Prettier 配置，也**没有**测试框架。

---

## 3. 实际目录结构（有效文件）

```text
portfolio-website/
├── src/
│   ├── main.ts                  # 引入自托管字体 + main.css，挂载 Pinia 和 Router
│   ├── App.vue                  # 全局布局：skip-link、吸顶导航、RouterView、页脚
│   ├── router/index.ts          # 3 条路由，afterEach 更新 document.title
│   ├── views/
│   │   ├── HomeView.vue         # 首页（唯一首屏加载；其余路由懒加载）
│   │   ├── AboutView.vue        # 关于：经历、教育、荣誉、技术栈
│   │   └── NotFoundView.vue     # 404
│   ├── components/
│   │   └── SkillGroupPanel.vue  # 技术栈分组 + 1–5 熟练度刻度条
│   ├── composables/
│   │   └── useReveal.ts         # IntersectionObserver 滚动淡入，尊重 reduced-motion
│   ├── data/
│   │   └── profile.ts           # ★ 唯一内容源
│   └── assets/
│       └── main.css             # Tailwind 入口 + @theme 设计变量 + 组件类
├── public/
│   ├── wangjiashen-resume-ai.pdf    # 「AI 应用开发工程师」版简历
│   ├── wangjiashen-resume-java.pdf  # 「Java / Agent 后端」版简历
│   └── favicon.svg
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
├── index.html                    # SEO meta（title / description / OG）
├── vite.config.ts                # @ 别名；base 由 VITE_BASE 决定
├── .env / .env.development       # VITE_BASE=/
├── .env.production               # VITE_BASE=/personal-website/
└── README.md
```

### 脚手架残留（当前未被页面使用）

`src/components/HelloWorld.vue`、`TheWelcome.vue`、`WelcomeItem.vue`、`src/components/icons/*`、`src/stores/counter.ts`、`src/assets/logo.svg` 都是 Vite 模板遗留，可以安全删除（删除前确认没有 import 引用）。

---

## 4. 内容模型：`src/data/profile.ts`

这是整个项目最重要的文件。所有文案、项目、经历、技能都在这里，视图只负责渲染。

导出的主要对象 / 类型：

| 导出 | 类型 | 说明 |
| --- | --- | --- |
| `profile` | object | 姓名、拼音、首字母、角色、大标题三段（`lead` / `accent` / `tail`）、副标题、简介、联系方式、简历下载项、统计数字（2 段实习 / 4 个项目 / 排名前 20%）、`updated` |
| `metrics` | `Metric[]` | 4 条量化成绩：`value` 主数字、`label` 指标名、`source` 来源说明 |
| `principles` | `Principle[]` | 「我的做法」4 条：`tag` 英文标签、`title`、`body` |
| `projects` | `Project[]` | 4 个独立项目：`period`、`domain`、`title`、`subtitle`、`description`、`points[]`、`metric`、`tech[]`、可选 `href` |
| `experience` | `Job[]` | 2 段实习：`period`、`role`、`company`、`summary`、`points[]` |
| `skillGroups` | `SkillGroup[]` | 4 组技术栈，每组含 `label`、`en`、`items[{ name, level(1–5) }]` |
| `education` | array | 学校、学历、时间、备注 |
| `honors` | `string[]` | 荣誉列表 |
| `about` | object | 关于页两段自我介绍 `paragraphs[]` |

> 联系方式（邮箱 / 电话 / 微信）是真实值，保存在 `profile.ts` 中；本文档不复述具体号码。
> `github` 字段当前为空字符串，留空时页面不渲染该条目。
> 简历链接用 `` `${import.meta.env.BASE_URL}xxx.pdf` `` 拼接，部署到子目录不会 404。

### 写作约束（改内容时必须遵守）

1. 项目条目写「遇到什么坑 → 用了什么办法 → 效果怎么衡量」，不写「使用了 XX 框架」。
2. 数字必须能在简历里对得上；对不上宁可删掉。
3. 每条 `points` 只写能站得住的技术动作，2–3 条为宜。
4. 语气克制，不堆形容词，不使用感叹号。

### 现有项目数据（概览）

| id | 项目 | 域 | 关键结果 |
| --- | --- | --- | --- |
| `yuyou` | 豫游 AI 助手 | Agent · RAG | 模型接入成本 −60% |
| `contract` | 合同风险智能审查平台 | 规则 + 模型双引擎 | 引用校验，不可溯源即丢弃 |
| `review` | AI 代码评审助手 | 上下文工程 · 评测 | 有效评论率 38% → 67%，token 成本 −52% |
| `pet` | 宠爱之家（宠物医院 SaaS） | SaaS · 高并发预约 | Lua 原子扣减，不超卖 |

---

## 5. 页面与交互

### 首页 `HomeView.vue`

按顺序渲染：

1. **Hero**：英文小标签（Portfolio / 日期）、三段式大标题（中间 `accent` 描色）、副标题、简介、两个按钮（查看项目 / 下载简历）、三列小信息（所在地 / 求职方向 / 到岗时间）
2. **资料铭牌（签名元素）**：右侧 `.plate`，角标刻度装饰，显示姓名、拼音、学校、毕业时间、实习段数、项目数、专业排名、更新时间
3. **指标带**：4 列 `gap-px` 网格，用背景色模拟发丝分隔线
4. **项目**：三栏布局（时间/领域 | 正文 + 要点 | 结果 + 技术标签）
5. **我的做法**：2×2 网格，4 条原则
6. **技术栈**：4 列 `SkillGroupPanel`
7. **关于**：两段文字 + 跳转 `/about`
8. **联系**：深色 `bg-night` 区块，邮箱、电话（`tel:`）、微信、地点、到岗时间、两个简历下载

### 关于页 `AboutView.vue`

Hero + 4 条事实数据 + 实习经历（时间/公司 | 角色/要点）+ 教育 + 荣誉 + 技术栈 + 结尾 CTA。

### 全局 `App.vue`

- 吸顶半透明毛玻璃导航（`bg-paper/85 backdrop-blur-md`），桌面 5 项 / 移动 3 项
- 导航下划线动画由 scoped CSS 实现（`.nav-link::after`）
- 页脚显示年份和「Vue 3 · Vite · Tailwind CSS」

### 路由

- `createWebHistory(import.meta.env.BASE_URL)`
- `/about`、404 页为路由级懒加载
- `scrollBehavior`：有 hash 时滚动到锚点并留 80px 顶部偏移；否则回到顶部
- `afterEach` 设置 `document.title`

### 滚动动画

`useReveal()` 在 mounted 时对 `[data-reveal]` 建 IntersectionObserver，进入视口加 `.is-revealed`。
`data-delay="1..4"` 控制 0.08s 递增延迟；`prefers-reduced-motion` 下直接显示。

---

## 6. 设计系统（`src/assets/main.css`）

### 颜色 token（Tailwind v4 `@theme`）

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--color-paper` | `#f2f3ee` | 页面主背景（冷调纸白） |
| `--color-surface` | `#fbfbf7` | 卡片 / 铭牌背景 |
| `--color-ink` | `#151a19` | 主文字 |
| `--color-ink-soft` | `#3f4b48` | 次级文字 |
| `--color-ink-mute` | `#5f6b67` | 标签 / 注释 |
| `--color-line` | `#d5dad3` | 发丝分隔线 |
| `--color-accent` | `#123f3b` | 深汽油绿，唯一强调色 |
| `--color-accent-strong` | `#0b2b28` | 按钮 hover |
| `--color-accent-soft` | `#e4ece8` | 浅强调底 |
| `--color-accent-light` | `#a9c9c0` | 辅助 |
| `--color-signal` | `#8a5d18` | 警示 / 次级信号色（当前极少使用） |
| `--color-night` | `#0f1513` | 联系区深色背景 |

字体：

- 正文 `Inter Variable` → `PingFang SC` → `Microsoft YaHei` → `Noto Sans SC` → system-ui
- 等宽 `JetBrains Mono Variable` → Consolas → Menlo

### 复用组件类

`.mono-label`（等宽小标签）、`.section-title`、`.btn-solid`、`.btn-ghost`、`.tag`、`.link-arrow`、`.status-dot.pulse`、`.plate`（带角标）、`.hero-grid`（首屏网格）、`.skip-link`。
动画：`dot-pulse`；滚动揭示：`[data-reveal]` / `.is-revealed` / `data-delay`。

### 设计约束

- 不使用渐变、卡片阴影、圆角（除状态点外基本直角）。
- 强调色只有一个（深汽油绿），靠留白、字重、发丝线建立层次。
- 数字统一用 `font-mono tabular-nums`。
- 新增区块沿用 `mono-label`（编号 + 英文）+ `section-title` 的标题模式。

---

## 7. 构建与部署

### 环境变量

| 文件 | `VITE_BASE` | 场景 |
| --- | --- | --- |
| `.env` / `.env.development` | `/` | 本地开发 |
| `.env.production` | `/personal-website/` | GitHub Pages 项目页 |

`vite.config.ts` 通过 `loadEnv(mode, process.cwd(), 'VITE_')` 读取，`base` 必须与站点实际访问路径一致，否则 JS/CSS 会 404。改完环境变量必须重新构建。

> 注意：`.env*` 文件已被 git 跟踪。项目已注明**不得**在其中放密钥。

### GitHub Actions（`.github/workflows/deploy.yml`）

- 触发：push 到 `master` + 手动 `workflow_dispatch`
- Node 24 + `npm ci` + `npm run build`
- `cp dist/index.html dist/404.html` 解决 history 模式深链回退
- `actions/configure-pages@v5`（`enablement: true` 首次自动启用 Pages）
- 上传 `dist` 并用 `actions/deploy-pages@v4` 发布
- `concurrency: pages` 串行化部署

### Git 远程

- `github` → `jiashen32/personal-website`（经由代理前缀访问）
- `origin` → Gitee 镜像仓库

---

## 8. 当前状态与已知问题

### 已完成

- 首页 / 关于 / 404 三页，响应式布局（移动端导航精简）
- 内容与视图分离，全部数据集中在 `profile.ts`
- 设计系统 token 化，滚动揭示动画，reduced-motion 适配
- SEO meta（title / description / OG）与基础无障碍（skip-link、focus-visible、aria-label）
- GitHub Pages 自动部署 + SPA 回退

### 待清理 / 风险点

1. **`网站/` 目录是整站副本且已被 git 跟踪**，与根目录重复，容易混淆改错位置。建议确认后删除并提交。
2. **根目录存在异常文件名** `E:claudeportfolio-websiteQUICK_START.md`（路径拼接事故产物），`网站/` 下还有同类文件，建议删除。
3. 根目录文档过多且内容可能过时：`CHECKLIST.md`、`COMPLETED.md`、`DEMO_GUIDE.md`、`DEPLOY_REPORT.md`、`OPTIMIZATION_REPORT.md`、`PROJECT_STATUS.md`、`QUICK_START.md`。建议合并为一两份或移入 `docs/`。
4. `.gitignore` 忽略了 `.shots`，但该目录仍在本地存在（内含 Chromium 用户数据，约大量文件），未被跟踪，可安全删除。
5. **Pinia 已挂载但没有实际 store**，脚手架组件（HelloWorld 等）未使用，可移除依赖或补用途。
6. README 写 Vite 8.3，`package.json` 实际为 `^8.2.2`，版本描述需对齐。
7. `public/favicon.svg` 在 `index.html` 中写成绝对路径 `/favicon.svg`，部署到子目录时理论上不随 `base` 改写；Vite 对 `public` 资源有处理，但建议改为 `import.meta.env.BASE_URL` 或交由 Vite 处理以确保一致。
8. `.env.production` 的 `VITE_BASE` 与仓库名强耦合；若改仓库名或换自定义域名必须同步修改。
9. 无 CI 类型检查以外的质量门禁（无 lint / 无测试）。

### 可选的下一步方向

- 内容：补充 GitHub 链接、项目截图或架构图、更多可验证指标
- 体验：暗色模式、打印样式（可直接导出简历）、项目筛选/展开详情
- 工程：移除脚手架残留、引入 ESLint + Prettier、加 Lighthouse 检查
- 部署：自定义域名、访问统计（注意隐私）

---

## 9. 使用本文档生成提示词的建议（给 DeepSeek）

把本文档整份粘贴给 DeepSeek，再按任务选择下面的模板。**关键原则：告诉它「改哪个文件、保持什么不变、验收标准是什么」，不要只说「优化一下」。**

### 模板 A：修改文案 / 项目内容

```text
背景：这是一个 Vue 3 + Tailwind CSS 的个人主页，所有内容集中在 src/data/profile.ts。
请修改 [具体项目 / 字段]，要求：
- 只改 profile.ts 中的数据，不要改视图组件
- 遵守写作约束：写「坑 → 办法 → 效果」，数字需可验证，不用「使用了 XX 框架」式表述
- 保持 TypeScript 接口字段不变
- 输出完整修改后的相关代码片段，并说明改了哪几行
参考数据：[粘贴 profile.ts 中对应片段]
```

### 模板 B：调整 UI / 新增区块

```text
背景：[粘贴本文档第 2、5、6 节]
任务：在首页的 [位置] 新增 [区块]，包含 [内容]。
约束：
- 复用现有组件类（mono-label / section-title / tag / btn-solid 等）和 @theme 颜色变量
- 不引入新依赖、不写内联十六进制颜色
- 保持编辑部风格：无阴影、无渐变、直角、单一强调色
- 响应式：移动端单列，桌面端参考现有 max-w-[1180px] 容器
- 数据从 src/data/profile.ts 读取，必要时新增导出并更新接口
验收：npm run type-check 通过；移动端不横向滚动
请先给方案，再给完整代码。
```

### 模板 C：排查构建 / 部署问题

```text
背景：[粘贴本文档第 7 节]
现象：[具体错误信息、哪个页面 404、控制台报错]
已尝试：[...]
请按「最可能 → 次可能」列出原因，每条给出验证命令；确认后给出最小改动修复。
注意：base 由 VITE_BASE 控制，.env.production 为 /personal-website/。
```

### 模板 D：代码审查 / 清理

```text
基于本文档第 8 节，请对项目做一次清理计划：
- 列出可安全删除的脚手架文件与重复目录（注明验证方式）
- 指出潜在的构建、路由或无障碍问题
- 给出按优先级排序的改动清单，每项说明影响范围和回滚方式
不要直接假设文件内容，遇到不确定的请要求我提供。
```

### 通用补充要求（可追加到任意提示词末尾）

```text
输出要求：
1. 先给结论和改动范围，再给代码
2. 代码改动用 diff 形式或标明文件路径与行号
3. 不确定的地方明确说「需要确认」，不要编造文件内容
4. 中文注释，术语保留英文
```

---

## 10. 快速自检清单

修改后按此顺序验证：

1. `npm run type-check` 无错误
2. `npm run dev` 下检查首页 / 关于 / 未知路径
3. 移动端宽度（375px）无横向滚动，导航可用
4. 锚点跳转（`/#work`、`/#skills`）位置正确
5. `npm run build && npm run preview`，确认 `base` 前缀下资源不 404
6. 部署后直接访问 `/about` 深链，确认 404 回退生效

---

*文档生成时间：2026-11-04。若项目结构变化，请同步更新本文档。*
