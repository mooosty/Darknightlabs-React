import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@dynamic-labs/sdk-api': '/node_modules/@dynamic-labs/sdk-api',
    },
  },
})
