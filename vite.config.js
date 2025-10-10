import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'fs'

// package.json에서 homepage 읽기
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const homepage = pkg.homepage

export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_PATH || 
        (homepage ? new URL(homepage).pathname : './'),
  build: {
    outDir: 'dist'
  }
})
