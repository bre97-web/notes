import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('md')
      }
    }
  }), vueJsx()],
  base: '/notes',
  build: {
    outDir: './docs',
    emptyOutDir: true,
    cssMinify: true,
    minify: true,
    manifest: true,
  }
})
