import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 用 loadEnv 读取 .env / .env.production，process.env 里拿不到 VITE_ 变量
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      vue(),
      // 环境特定添加 devtools
      mode === 'development' && vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 基础路径：部署在二级目录（如 GitHub / Gitee Pages 的项目页）时必须与仓库名一致
    base: env.VITE_BASE || '/',
    // 仅扫描应用入口；public 下的独立页面使用浏览器 import map，不应由 Vite 解析依赖
    optimizeDeps: {
      entries: ['index.html', 'design-world/index.html'],
    },
    // 构建优化
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      // Three.js 仅用于独立实验页，不进入主页首包；允许其作为单独入口保持完整。
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          designWorld: resolve(import.meta.dirname, 'design-world/index.html'),
        },
      },
    },
  }
})
