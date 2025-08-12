// vite.config.js

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
// 将配置对象改为一个函数，并接收 'mode' 参数
export default defineConfig(({ mode }) => {
  // 根据当前模式加载环境变量
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 你可以在这里使用 env 中的变量
    // 例如，如果你需要定义全局常量
    define: {
      'process.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE)
    }
  }
})