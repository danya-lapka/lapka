import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import lapkaCss from '@danya-lapka/css-vite' 

export default defineConfig({
  plugins: [
    lapkaCss(),
    vue(),
    {
      name: 'remove-virtual-css-import',
      generateBundle(_, bundle) {
        Object.keys(bundle).forEach(fileName => {
          if (fileName.endsWith('.js') || fileName.endsWith('.mjs')) {
            const chunk = bundle[fileName];
            if (chunk.type === 'chunk') {
              // Удаляем импорт из сгенерированного кода
              chunk.code = chunk.code.replace(
                /import\s+"virtual:lapka\.css";?\s*/g, 
                ''
              );
            }
          }
        });
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@danya-lapka/components-vue',
      fileName: 'components-vuey'
    },
    rollupOptions: {
      external: ['vue', 'virtual:lapka.css'],
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