# 部署指南

本文档详细说明如何将项目部署到 GitHub Pages。

## 📋 前置条件

- 已安装 [Node.js 22+](https://nodejs.org/)
- 已安装 [Git](https://git-scm.com/)
- GitHub 账号

## 🚀 快速部署步骤

### 1. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/)
2. 点击 `+` → `New repository`
3. 仓库名称: `portfolio-website`
4. 设置为 **Public**
5. 点击 `Create repository`

### 2. 关联本地仓库

```bash
# 进入项目目录
cd portfolio-website

# 添加 GitHub 远程仓库
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# 推送代码
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 `Settings` → `Pages`
2. 在 `Source` 下选择 **GitHub Actions**
3. 等待 1-2 分钟，GitHub Actions 会自动部署

### 4. 验证部署

访问你的网站：
```
https://YOUR_USERNAME.github.io/portfolio-website/
```

## 🔧 高级配置

### 自定义域名

1. 在 `dist/` 目录下创建 `CNAME` 文件：
   ```
   yourdomain.com
   ```

2. 在 GitHub Pages 设置中填入你的域名
3. 配置域名的 DNS：
   ```
   类型：CNAME
   主机：@
   值：YOUR_USERNAME.github.io
   ```

4. 在 GitHub Pages 设置中勾选 `Enforce HTTPS`

### 环境变量配置

项目支持多环境配置：

```bash
# 开发环境
VITE_BASE=/

# 生产环境（GitHub Pages 子路径）
VITE_BASE=/portfolio-website/
```

这些配置通过 `.env.production` 文件自动注入。

## 🔄 自动部署流程

GitHub Actions 会在每次 `push` 到 `main` 分支时自动运行：

```
代码提交 → 运行测试 → 构建 → 修复 404 → 部署到 Pages
```

### 工作流配置

查看 `.github/workflows/deploy.yml` 了解详细配置。

## 🐛 故障排除

### 部署后白屏

**原因**: `base` 路径配置错误

**解决**:
```bash
# 检查 .env.production
VITE_BASE=/portfolio-website/

# 确保 vite.config.ts 正确配置
base: process.env.VITE_BASE || '/'
```

### 刷新页面 404

这是 GitHub Pages 限制，项目已自动修复（通过 `cp dist/index.html dist/404.html`）

### 构建超时

GitHub 限制单个作业运行时间 360 分钟。如果构建时间过长：

```yaml
# 在 GitHub Actions 中增加超时
jobs:
  deploy:
    timeout-minutes: 60  # 默认 360，可调整
```

### CDN 缓存问题

如果更新后看不到效果：

1. 强制刷新浏览器（Ctrl+F5）
2. 使用 Incognito 模式
3. 等待 Git 缓存更新

## 📊 性能监控

部署后可查看：

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) 评分
- 使用 Chrome DevTools 分析性能
- 检查网络请求和加载时间

## 🎯 最佳实践

- ✅ 每次 `push` 前运行 `npm run build` 本地测试
- ✅ 使用 `npm run lint` 检查代码质量
- ✅ 保持 `package.json` 的 `dependencies` 精简
- ✅ 定期更新依赖（使用 `npm audit fix`）
- ✅ 添加 `.npmignore` 避免上传不必要的文件

## 📈 SEO 优化

虽然 GitHub Pages 是静态托管，但可以通过以下方式优化：

1. **Meta 标签**: 在 `index.html` 中添加描述性 meta 标签
2. **语义化 HTML**: 使用正确的标题层级
3. **图片 Alt 文本**: 为所有图片添加描述
4. **Sitemap**: 生成并添加 sitemap.xml

## 🆘 获取帮助

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [GitHub Pages 文档](https://pages.github.com/)

---

**最后更新**: {{ new Date().toISOString() }}
