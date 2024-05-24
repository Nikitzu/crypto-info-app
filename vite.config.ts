import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/enums': path.resolve(__dirname, './src/enums'),
      '@/helpers': path.resolve(__dirname, './src/helpers'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
  plugins: [react()],
})
