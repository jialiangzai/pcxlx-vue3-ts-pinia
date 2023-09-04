import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import IconsResolver from 'unplugin-icons/resolver' //是它
// import Icons from 'unplugin-icons/vite' //是它
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3030,
    open: true,
    proxy: {
      '/api': {
        target: 'http://uat.admin.banlu.xuexiluxian.cn/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // IconsResolver({
        //   prefix: 'Icon',
        // }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // IconsResolver({
        //   enabledCollections: ['ep'],
        // }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@/stores': '/src/stores',
      '@utils': '/src/utils',
    },
  },
})
