import type { DefineComponent } from 'vue';

declare module 'vue' {
  export interface ComponentCustomOptions {
    modelValue?: any;
  }
}

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}