# Portfolio Website

> 我的个人求职展示网站 - 使用 Vue 3 + Vite 构建，托管在 GitHub Pages 上

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.13-41B883.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🚀 快速开始

### 项目结构

```
portfolio-website/
├── .github/workflows/    # GitHub Actions 工作流
├── src/                  # 源代码
│   ├── components/       # 可复用组件
│   ├── views/           # 页面视图
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态管理
│   ├── assets/          # 静态资源
│   └── utils/           # 工具函数
├── public/              # 静态资源
├── .env                 # 环境变量
├── vite.config.ts       # Vite 配置
└── package.json         # 依赖配置
```

## 📦 安装依赖

```bash
npm install
```

## 🛠️ 开发脚本

### 本地开发
```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码格式化（如配置了 Prettier）
npm run lint
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🌐 部署指南

### GitHub Pages 自动部署

本项目使用 GitHub Actions 实现自动部署：

1. **创建 GitHub 仓库**
   ```bash
   # 在 GitHub 上创建新仓库
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 仓库 Settings → Pages
   - Source: 选择 **GitHub Actions**
   - 等待 Actions 自动部署

3. **工作流说明**
   - 每次 push 到 `main` 分支
   - 自动触发测试和构建
   - 修复 Vue Router 刷新 404 问题
   - 自动部署到 GitHub Pages

### URL 访问
- **默认域名**: `https://your-username.github.io/portfolio-website/`

## 🎯 技术选型

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | 3.5.13 | 响应式 UI 框架 |
| TypeScript | 5.7.2 | 类型安全 |
| Vite | 6.0.1 | 下一代构建工具 |
| Vue Router | 4.5.0 | 官方路由 |
| Pinia | 2.3.0 | 状态管理 |
| TailwindCSS | 3.4.17 | 实用优先 CSS |

## 🛡️ 安全特性

- ✅ **环境变量管理**: 敏感信息通过 GitHub Secrets 注入
- ✅ **HTTPS 强制启用**: 所有静态资源通过 HTTPS 传输
- ✅ **自动捕获**: GitHub Actions 自动进行代码扫描
- ✅ **零依赖后端**: 避免后端漏洞风险

## 📊 性能优化

- **代码分割**: 自动按路由和依赖进行 chunk 分割
- **懒加载**: 组件按需加载，减少首屏体积
- **图片优化**: 使用 WebP 格式和响应式图片
- **缓存策略**: 静态资源长期缓存

## 🔍 测试覆盖

- **单元测试**: Vitest + Vue Testing Library (待添加)
- **端到端测试**: Playwright (计划中)
- **手动测试**: 跨浏览器兼容性测试

## 🤝 开源许可

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📝 更新记录

### v1.0.0 (2024-01-01)
- ✅ 项目初始化
- ✅ Vue 3 + Vite + TypeScript 搭建
- ✅ 响应式设计完成
- ✅ GitHub Pages 自动部署
- ✅ 求职展示功能完整

## 🎨 可视化效果

- 响应式设计，完美适配移动端
- 暗色/亮色主题切换
- 平滑滚动和动画效果
- 语义化 HTML5 + ARIA 可访问性

## 🐛 已知问题

- [ ] 需要在生产环境测试 GitHub Actions 流程
- [ ] 需要添加真实的 GitHub API 数据加载
- [ ] 需要优化首屏加载速度至 Lighthouse 90+ 分

## 📞 联系方式

- 邮箱: your.email@example.com
- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourname

---

**Built with ❤️ using Vue 3 + Vite + GitHub Pages**
