import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import lapkaCss from '@danya-lapka/css-vite' 

export default defineConfig({
  plugins: [
    vue(),
    lapkaCss()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@danya-lapka/components-vue',
      fileName: 'components-vuey'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          return '[name][extname]'; 
        }
      }
    }
  }
})