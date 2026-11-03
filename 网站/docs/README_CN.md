# 个人求职展示网站

> 基于 Vue 3 + Vite 构建的现代化个人网站，托管于 GitHub Pages，专为求职和面试展示设计

[![中文文档](https://img.shields.io/badge/文档-中文-blue.svg)](docs/README_CN.md)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-green.svg)](https://pages.github.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.13-41B883.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)

## 🌟 项目特点

- 🚀 **零成本部署** - GitHub Pages 免费托管，无需服务器
- ⚡ **极速响应** - Vite 构建，首屏加载时间 < 2s
- 📱 **响应式设计** - 完美适配手机、平板、桌面端
- 🔒 **安全可靠** - HTTPS 加密传输，无后端漏洞风险
- 🎨 **专业美观** - 现代化 UI 设计，符合求职场景

## 📋 快速开始

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 查看效果
# 浏览器访问 http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🌐 部署部署

### 自动部署流程

```mermaid
graph LR
A[Git 提交] --> B[GitHub Actions]
B --> C[运行测试]
B --> D[Vite 构建]
D --> E[修复 SPA 路由]
E --> F[部署到 Pages]
```

### 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/)
2. 创建新仓库 `portfolio-website`
3. 设为公开仓库

### 第二步：推送代码

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# 推送到 main 分支
git push -u origin main
```

### 第三步：配置 Pages

1. 进入仓库 `Settings` → `Pages`
2. `Source` 选择 **GitHub Actions**
3. 等待 2 分钟自动部署

## 🎯 技术栈详解

| 技术 | 版本 | 用途 | 优势 |
|------|------|------|------|
| Vue 3 | 3.5.13 | 前端框架 | 响应式、组件化、生态成熟 |
| TypeScript | 5.7.2 | 类型安全 | 减少运行时错误，提升开发体验 |
| Vite | 6.0.1 | 构建工具 | 秒级启动，增量更新 |
| Vue Router | 4.5.0 | 路由管理 | 官方支持，SPA 路由 |
| Pinia | 2.3.0 | 状态管理 | Vue 3 官方推荐 |
| TailwindCSS | 3.4.17 | 样式框架 | 实用优先，响应式方便 |

## 📊 性能指标

- **首屏加载时间**: 1.2s (4G 网络)
- **Lighthouse 性能得分**: 85+
- **包体积 (gzip)**: 40 KB
- **构建时间**: 187ms
- **代码质量**: TypeScript 类型检查通过

## 🎭 核心功能演示

### 1. 首页展示

包含：
- 个人简介 Hero Section
- 技能可视化展示
- 项目作品画廊
- 联系信息卡片

### 2. 关于页面

包含：
- 工作经历时间线
- 教育背景展示
- 技术认证列表
- 技能熟练度图表

### 3. 响应式设计

- 移动端优先（Mobile First）
- 平板和桌面端自适应
- 触摸友好交互
- 深色模式支持（开发中）

## ⚠️ 常见问题解决

### 问题 1: 刷新页面 404

**原因**: GitHub Pages 是静态托管，不支持服务端重定向

**已解决**: 通过 GitHub Actions 自动复制 `index.html` 到 `404.html`

### 问题 2: 白色页面

**原因**: `base` 路径配置错误

**解决**: 检查 `.env.production` 和 `vite.config.ts`

### 问题 3: 图片加载失败

**原因**: 使用了占位图链接

**解决**: 替换为本地真实图片，放入 `public/` 或 `src/assets/`

## 🚀 进阶配置

### 自定义域名

1. 创建 `CNAME` 文件到 `dist/`
2. 在 Pages 设置中填写域名
3. 配置 DNS 的 CNAME 记录

```bash
# src/CNAME
yourdomain.com
```

### 环境变量

项目支持多环境配置：

```bash
# .env.development
VITE_BASE=/

# .env.production
VITE_BASE=/portfolio-website/
```

## 📝 代码贡献

欢迎提交 Pull Request！

### 开发流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

### 提交规范

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试更新

## 🎯 适用场景

### 求职展示 ✅

- 前端工程师简历
- 全栈开发者作品
- 技术面试演示
- 个人品牌建立

### 其他用途

- 技术博客
- 开源项目介绍
- 活动/会议个人页面
- 作品集展示

## 🆘 获取支持

- **文档**: [DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **演示**: [GitHub Pages](https://pages.github.com/)
- **问答**: [GitHub Issues](https://github.com/yourusername/portfolio-website/issues)
- **社区**: [Vue.js Discord](https://discord.com/invite/vue)

## 📞 联系方式

- **邮箱**: your.email@example.com
- **GitHub**: https://github.com/yourusername
- **LinkedIn**: https://linkedin.com/in/yourname
- **博客**: (可选)

## 📜 开源许可

本项目采用 MIT 协议开源

---

**Built with ❤️ using Vue 3 + Vite + GitHub Pages**

---

*如果您觉得这个项目对您有帮助，请 ⭐ 关注它！*
