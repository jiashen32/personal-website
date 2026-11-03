# Gitee Pages 部署指南

> 从 GitHub 完全迁移到 Gitee Pages

## 📋 前置检查

### 环境要求
- ✅ 项目已构建：`npm run build` 成功
- ✅ Git 已安装：`git --version`
- ✅ Gitee 账号已注册

### 项目状态
- 基础路径配置：已适配 Gitee Pages (`/personal-website/`)
- 生产构建：已生成 `dist/` 目录

## 🚀 部署步骤

### 第一步：在 Gitee 创建仓库

1. **访问 Gitee**：[https://gitee.com/projects/new](https://gitee.com/projects/new)

2. **填写信息**：
   - 仓库名：`personal-website`
   - 描述：个人求职展示网站（Vue 3 + Vite）
   - 可见性：**公开**
   - 不要勾选 ".gitignore" 和 "README"
   - 点击 **"创建"**

### 第二步：配置远程仓库

**在你的电脑上执行以下命令：**

```bash
# 进入项目目录
cd E:\claude\portfolio-website

# 1. 移除 GitHub 远程（如果存在）
git remote remove origin

# 2. 添加 Gitee 远程
# 根据你的 Gitee 用户名修改
git remote add origin https://git@gitee.com:admin665/portfolios-website.git

# 查看远程信息
```

### 第三步：提交并推送代码

```bash
# 1. 将所有更改加入暂存区
git add .

# 2. 提交更改
git commit -m "迁移到 Gitee Pages，适配 Vue 3 + Vite"

# 3. 推送到默认分支
git push -u origin main
```

### 第四步：启用 Gitee Pages

1. 在 Gitee 仓库页面，点击左侧菜单 **"Pages"**
2. 或访问：`https://gitee.com/<用户名>/personal-website/tree/main?sort=time`
3. 点击 **"配置 Pages"**
4. **源代码分支**：选择 `main`
5. **目录**：选择 `root` 或 `dist/`
6. 点击 **"保存"**

### 第五步：验证部署

访问你的 Pages 站点：
```
https://gitunershi.gitee.io/personal-website/
```

### 第六步：配置自定义域名（可选）

1. **在 Gitee Pages 设置中**：
   - 添加你的域名（如 `yourdomain.com`）
   - 保存配置

2. **配置域名的 DNS**：
   ```
   类型：CNAME
   主机：@  www
   值：gitunershi.gitee.io
   ```

3. **等待 DNS 生效**（10-60 分钟）
4. **启用 HTTPS**（在 Gitee Pages 设置中勾选）

## 🔧 重要配置说明

### 1. Vite 配置
基础路径已适配 Gitee Pages：

```typescript
// vite.config.ts
base: mode === 'production' ? (process.env.VITE_BASE || '/') : '/'
```

生产环境变量：`/personal-website/`

### 2. 环境变量
```
.env.development: VITE_BASE=/
.env.production: VITE_BASE=/personal-website/
```

### 3. 修复 SPA 路由
Gitee Pages 同样需要修复 `index.html` 404 问题：

```bash
# 在部署前运行
cp dist/index.html dist/404.html
```

## 📊 性能对比

| 平台 | 访问速度 | 推荐理由 |
|------|----------|----------|
| **Gitee Pages** | ⚡ 国内极快 | 无需翻墙，国内 CDN 加速 |
| GitHub Pages | 🐢 国内较慢 | 国际 CDN，可能访问慢 |
| 本地开发 | 🚀 最快 | 本地网络 |

## ✅ 检查清单

### 部署前
- [ ] 本地构建成功 (`npm run build`)
- [ ] Vite 配置正确
- [ ] 测试本地开发 (`npm run dev`)

### 部署中
- [ ] Gitee 仓库已创建
- [ ] 远程仓库已配置
- [ ] 代码已推送
- [ ] Pages 服务已启用

### 部署后
- [ ] Pages URL 可访问
- [ ] 路由刷新不 404
- [ ] 自定义域名生效（如已配置）
- [ ] HTTPS 正常

## 🎯 快速命令总结

```bash
# 1. 构建生产版本
npm run build

# 2. 修复 404 问题
cp dist/index.html dist/404.html

# 3. 添加到 Gitee
git remote add origin https://git@gitee.com:wangs128/zkr-website.git

# 4. 推送代码
git add .
git commit -m "Migrate to Gitee Pages"
git push -u origin main

# 5. 在 Gitee 网页启用 Pages
# 访问 https://gitee.com/<用户名>/personal-website
```

## 🆘 故障排查

### 问题 1: 页面白屏
**原因**: `base` 路径配置错误
**解决**: 检查 `.env.production`，确保 `VITE_BASE` 与仓库名匹配

### 问题 2: 刷新页面 404
**原因**: Gitee Pages 需要手动配置 `404.html`
**解决**: 部署前运行 `cp dist/index.html dist/404.html`

### 问题 3: 图片/资源加载失败
**原因**: 路径配置错误
**解决**: 使用相对路径，或在 Gitee Pages 设置中指定目录

### 问题 4: HTTPS 配置失败
**原因**: DNS 未生效或证书申请中
**解决**: 等待 10-30 分钟，HTTPS 自动申请证书

## 📞 技术支持

- **Gitee Pages 官方文档**: [https://git.cnitl.com/pages/guide](https://git.cnitl.com/pages/guide)
- **Vite 官方文档**: [https://vitejs.dev/](https://vitejs.dev/)
- **GitHub Actions 迁移**: [https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site](https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

---

**部署完成！祝你求职成功！🚀**
