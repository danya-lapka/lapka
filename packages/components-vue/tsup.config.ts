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
    vuePlugin()
  ]       
});