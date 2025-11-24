import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // Поддержка и import, и require
  dts: true,              // Генерация файлов типов .d.ts
  splitting: false,
  sourcemap: false,
  clean: true,            // Очищать папку dist перед сборкой
});