import { fileURLToPath, URL } from 'node:url'

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
    // 构建优化
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
    },
  }
})
