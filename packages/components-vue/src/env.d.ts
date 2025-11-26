/// <reference types="vite/client" />

// Декларация нужна, чтобы можно было импортировать стили в entry-файле
declare module 'virtual:lapka.css' {
  const content: string;
  export default content;
}