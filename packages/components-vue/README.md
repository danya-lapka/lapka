# @danya-lapka/components-vue

[![npm](https://img.shields.io/npm/v/@danya-lapka/components-vue)](https://www.npmjs.com/package/@danya-lapka/components-vue)
![npm](https://img.shields.io/npm/dm/@danya-lapka/components-vue)

- [@danya-lapka/components-vue](#danya-lapkacomponents-vue)
  - [Installation](#installation)


## Installation

```bash
npm i @danya-lapka/components-vue
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import lapkaCss from '@danya-lapka/css-vite'

export default defineConfig({
  plugins: [
    lapkaCss(),
    vue(),
    vueDevTools()
  ],
  optimizeDeps: {
    exclude: ['virtual:lapka.css'],
    include: ['@danya-lapka/css-vite', '@danya-lapka/components-vue']
  },
  build: {
    rollupOptions: {
      external: ['virtual:lapka.css']
    }
  }
})
```