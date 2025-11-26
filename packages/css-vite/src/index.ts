import atomicCssPlugin from './plugin';

// Экспортируем плагин как default
export default atomicCssPlugin;

// Также можно экспортировать функцию генерации, если она вдруг понадобится отдельно
export { generateCss, THEME_COLORS, PSEUDO_VARIANTS, BREAKPOINTS } from './engine';