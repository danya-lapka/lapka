import { defineConfig } from 'tsup';
import vuePlugin from 'esbuild-plugin-vue3';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,              
  splitting: false,
  sourcemap: false,
  clean: true,     
  external: ['virtual:lapka.css', 'vue'],
  esbuildPlugins: [
    vuePlugin({
      script: {
        compilerOptions: {
          declarations: true,
          emitDeclarationOnly: false
        }
      }
    })
  ],
  async onSuccess() {
    const { promises: fs } = await import('fs');
    const { join } = await import('path');
    
    const copyDeclarations = async (dir: string) => {
      try {
        const files = await fs.readdir(dir);
        for (const file of files) {
          const fullPath = join(dir, file);
          const stat = await fs.stat(fullPath);
          
          if (stat.isDirectory()) {
            await copyDeclarations(fullPath);
          } else if (file.endsWith('.d.ts')) {
            const destPath = fullPath.replace('src', 'dist');
            await fs.mkdir(join(destPath, '..'), { recursive: true });
            await fs.copyFile(fullPath, destPath);
          }
        }
      } catch (e) {
        // Игнорируем ошибки если папки нет
      }
    };
    
    await copyDeclarations('src');
  }    
});