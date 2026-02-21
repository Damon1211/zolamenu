import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    allowedHosts: [
      'localhost',
      '192.168.3.41',
      '685vk003te50.vicp.fun',
      '.vicp.fun'
    ]
  }
})
