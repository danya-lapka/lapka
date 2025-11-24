import { CssRule } from '../types';
import { staticRules, dynamicRules, BASE_STYLES, escapeClassName } from './rules';

// Карта псевдо-классов
const PSEUDO_VARIANTS: Record<string, string> = {
  'hover': ':hover',
  'focus': ':focus',
  'active': ':active',
  'visited': ':visited',
  'disabled': ':disabled',
  'first': ':first-child',
  'last': ':last-child',
  'odd': ':nth-child(odd)',
  'even': ':nth-child(even)',
  'before': '::before',
  'after': '::after',
};

// Карта брейкпоинтов (min-width)
const BREAKPOINTS: Record<string, string> = {
  'xs': '576px',
  'sm': '768px',
  'md': '1024px',
  'lg': '1440px',
  'xl': '1920px',
};

export function applyRulesToClass(className: string): CssRule[] {
  // Разбор класса: [breakpoint]:[pseudo]:baseClass
  // Пример: md:hover:bg-red -> media='md', pseudo='hover', base='bg-red'
  
  let baseClass = className;
  let pseudoSuffix = '';
  let mediaQuery = '';
  
  const parts = className.split(':');
  
  // Если есть префиксы
  if (parts.length > 1) {
    baseClass = parts.pop()!; // Последний элемент - всегда базовый класс
    
    // Проходим по всем префиксам
    for (const part of parts) {
      if (BREAKPOINTS[part]) {
        mediaQuery = `@media (min-width: ${BREAKPOINTS[part]})`;
      } else if (PSEUDO_VARIANTS[part]) {
        pseudoSuffix += PSEUDO_VARIANTS[part];
      } else {
        // Неизвестный префикс — игнорируем весь класс
        return [];
      }
    }
  }

  // Функция-обертка для добавления селекторов и медиа
  const enhanceRule = (rule: CssRule): CssRule => {
    if (rule.isRawSelector) {
      return {
        selector: rule.selector,
        declarations: rule.declarations,
        media: mediaQuery || undefined
      };
    }

    // Экранируем исходный класс целиком (включая двоеточия)
    const escapedSelector = `.${escapeClassName(className)}`;
    
    return {
      selector: `${escapedSelector}${pseudoSuffix}`,
      declarations: rule.declarations,
      media: mediaQuery || undefined
    };
  };

  // 1. Проверяем Static
  const staticRule = staticRules.get(baseClass);
  if (staticRule) {
    return [enhanceRule({
      selector: '', // селектор перезапишется в enhanceRule
      declarations: staticRule.declarations
    })];
  }

  // 2. Проверяем Dynamic
  const dashIndex = baseClass.indexOf('-');
  if (dashIndex === -1) return []; 

  const prefix = baseClass.substring(0, dashIndex);
  const rules = dynamicRules.get(prefix);
  
  if (!rules) return [];

  const result: CssRule[] = [];
  
  for (const rule of rules) {
    const match = baseClass.match(rule.match);
    if (match) {
      const res = rule.generate({ className: baseClass, match, value: match[1] || null });
      if (res) {
        const generatedRules = Array.isArray(res) ? res : [res];
        generatedRules.forEach(r => result.push(enhanceRule(r)));
        break;
      }
    }
  }

  return result;
}

export function cssRuleToString(rule: CssRule): string {
  const decls = Object.entries(rule.declarations)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join('\n');
  const block = `${rule.selector} {\n${decls}\n}`;
  
  if (rule.media) {
    return `${rule.media} {\n${block}\n}`;
  }
  return block;
}

export function generateCssFromClasses(classes: string[]): string {
  const baseRules: CssRule[] = [];
  const mediaRules: CssRule[] = []; // Правила с @media храним отдельно
  const processed = new Set<string>();
  
  const sortedClasses = [...classes].sort();

  for (const className of sortedClasses) {
    if (processed.has(className)) continue;
    processed.add(className);

    const rules = applyRulesToClass(className);
    rules.forEach(rule => {
      if (rule.media) {
        mediaRules.push(rule);
      } else {
        baseRules.push(rule);
      }
    });
  }

  // Сортировка Media Rules по размеру экрана (от меньшего к большему) для правильного перекрытия
  const breakpointOrder = Object.keys(BREAKPOINTS);
  mediaRules.sort((a, b) => {
    const getBpIndex = (r: CssRule) => {
      const match = r.media?.match(/\(min-width: (\d+)px\)/);
      return match ? parseInt(match[1]) : 0;
    };
    return getBpIndex(a) - getBpIndex(b);
  });

  const cssBase = baseRules.map(cssRuleToString).join('\n\n');
  const cssMedia = mediaRules.map(cssRuleToString).join('\n\n');

  let finalCss = BASE_STYLES;
  if (cssBase) finalCss += '\n' + cssBase + '\n';
  if (cssMedia) finalCss += '\n/* Responsive Styles */\n' + cssMedia + '\n';

  return finalCss;
}