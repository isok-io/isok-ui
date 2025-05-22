import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "node:path";

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@components-lit': path.resolve(__dirname, '../components/components'),
      '@client': path.resolve(__dirname, '../client/src/apis'),
    }
  }
})
