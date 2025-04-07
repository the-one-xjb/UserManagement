import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@': '/src', // 将 @ 别名指向 src 目录
      'antd':'/node_modules/antd/es' // 将 antd 别名指向 antd/es 目录
    }
  }
})
