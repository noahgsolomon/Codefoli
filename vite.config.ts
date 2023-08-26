import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'Components': path.resolve(__dirname, './src/common/Components'),
      'Type': path.resolve(__dirname, './src/common/Type'),
      'api': path.resolve(__dirname, './src/util/api'),
      'assets': path.resolve(__dirname, './src/assets'),
    }
  }
})