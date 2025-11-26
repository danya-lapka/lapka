// === 0. ТИПЫ (Внутренние, чтобы не зависеть от внешних файлов) ===
export type CssDeclaration = Record<string, string>;
export interface CssRule {
  selector: string;
  declarations: CssDeclaration;
  media?: string;
  isRawSelector?: boolean; // Для сложных правил типа Masonry
}
export interface Options { scale?: number; unit?: string; }
interface StaticRule { 
  type: 'static'; 
  selector: string; 
  declarations: CssDeclaration; 
}
interface DynamicRule { 
  type: 'dynamic'; 
  prefix: string; 
  match: RegExp; 
  generate: (ctx: { 
    className: string; 
    match: RegExpMatchArray;
    finalSelector: string
  }) => CssRule | CssRule[] | null; 
}

// === 1. КОНФИГУРАЦИЯ ТЕМЫ ===
export const THEME_COLORS: Record<string, string> = {
  'white': '#F2F2F2', 
  'gray1': '#BFBFBF', 'gray2': '#797979', 'gray3': '#333333', 
  'black': '#000000',
  'accent': '#FF40BF', 
  'accent1': '#FFBFE9', 'accent2': '#FF99DD', 'accent3': '#800054',
  'success': '#40FF40', 'success-alt': '#62B262', 
  'warn': '#FFFF40', 'warn-alt': '#B2B262',
  'error': '#FF4040', 'error-alt': '#B26262', 
  'info': '#4080FF', 'info-alt': '#627DB2'
};

export const THEME_FONTS = {
  'heading': '"Unbounded", sans-serif',
  'body': '"Monocraft", monospace'
};

// Брейкпоинты для адаптивности (md:class)
export const BREAKPOINTS: Record<string, string> = {
  'xs': '576px', 
  'sm': '768px', 
  'md': '1024px', 
  'lg': '1440px', 
  'xl': '1920px'
};

// Псевдо-классы (hover:class)
export const PSEUDO_VARIANTS: Record<string, string> = {
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

const rootVars = [
  ...Object.entries(THEME_COLORS).map(([name, val]) => `  --color-${name}: ${val};`),
  ...Object.entries(THEME_FONTS).map(([name, val]) => `  --font-${name}: ${val};`)
].join('\n');

export const BASE_STYLES = `
:root {
${rootVars}
font-size: 16px;
}
* {
  box-sizing: border-box; 
  margin: 0; 
  padding: 0;
  margin-block: 0; 
  margin-inline: 0;
  border: none; 
  outline: none;
  transition: all .333s cubic-bezier(0.22, 0.61, 0.36, 1);
  position: relative; 
  text-decoration: none; 
  list-style: none;
}
html, body { width: 100%; min-height: 100vh; }
svg { 
  height: 1em; 
  width: auto; 
  color: currentColor; 
  fill: currentColor; 
}
svg path { fill: currentColor }
p + p { margin-top: 1cap }
`;

// === 2. РЕЕСТР ПРАВИЛ ===
const staticRules = new Map<string, StaticRule>();
const dynamicRules = new Map<string, DynamicRule[]>();

const escapeCache = new Map<string, string>();
export function escapeClassName(name: string): string {
  if (escapeCache.has(name)) return escapeCache.get(name)!;
  const result = name.replace(/([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
  escapeCache.set(name, result);
  return result;
}

function addStatic(className: string, declarations: CssDeclaration) {
  staticRules.set(className, {
    type: 'static',
    selector: `.${escapeClassName(className)}`,
    declarations
  });
}

function addDynamic(prefix: string, match: RegExp, generate: DynamicRule['generate']) {
  if (!dynamicRules.has(prefix)) dynamicRules.set(prefix, []);
  dynamicRules.get(prefix)!.push({ type: 'dynamic', prefix, match, generate });
}

// === 3. УТИЛИТЫ И ГЕНЕРАТОРЫ ===

function calculateValue(n: number, scale: number, unit: string): string {
  const valueNum = n * scale;
  return unit && Number.isFinite(valueNum) ? `${valueNum}${unit}` : String(valueNum);
}

function normalizeBracketValue(v: string): string {
  return v.replace(/_/g, ' ');
}

export const REM: Required<Options> = { scale: 0.0625, unit: 'rem' };

function createNumeric(prefix: string, property: string, opts?: Options) {
  const scale = opts?.scale ?? 1;
  const unit = opts?.unit ?? '';
  addDynamic(prefix, new RegExp(`^${prefix}-(\\d+)$`), ({ className, match }) => {
    const n = Number(match![1]);
    return { selector: `.${escapeClassName(className)}`, declarations: { [property]: calculateValue(n, scale, unit) } };
  });
}

function createBracket(prefix: string, property: string, mapValue?: (v: string) => CssDeclaration) {
  addDynamic(prefix, new RegExp(`^${prefix}-\\[(.+)\\]$`), ({ className, match }) => {
    const rawVal = match![1];
    const declarations = mapValue ? mapValue(rawVal) : { [property]: normalizeBracketValue(rawVal) };
    return { selector: `.${escapeClassName(className)}`, declarations };
  });
}

function createStringMap(prefix: string, property: string, map: Record<string, string>) {
  Object.entries(map).forEach(([suffix, value]) => {
    // Исправление: если prefix пустой, не добавляем дефис
    const key = prefix ? `${prefix}-${suffix}` : suffix;
    addStatic(key, { [property]: value });
  });
}

function createSideRules(prefix: string, property: string, opts?: Options) {
  createNumeric(prefix, property, opts);
  createBracket(prefix, property);
  const SIDES = ['top', 'right', 'bottom', 'left'] as const;
  SIDES.forEach(side => {
    const pSide = `${prefix}-${side}`;
    const propSide = `${property}-${side}`;
    createNumeric(pSide, propSide, opts);
    createBracket(pSide, propSide);
  });
  const createAxis = (axisSuffix: string, sides: string[]) => {
    const pAxis = `${prefix}${axisSuffix}`;
    const scale = opts?.scale ?? 1;
    const unit = opts?.unit ?? '';
    addDynamic(pAxis, new RegExp(`^${pAxis}-(\\d+)$`), ({ className, match }) => {
      const val = calculateValue(Number(match![1]), scale, unit);
      const declarations: CssDeclaration = {};
      sides.forEach(s => declarations[`${property}-${s}`] = val);
      return { selector: `.${escapeClassName(className)}`, declarations };
    });
    addDynamic(pAxis, new RegExp(`^${pAxis}-\\[(.+)\\]$`), ({ className, match }) => {
      const val = normalizeBracketValue(match![1]);
      const declarations: CssDeclaration = {};
      sides.forEach(s => declarations[`${property}-${s}`] = val);
      return { selector: `.${escapeClassName(className)}`, declarations };
    });
  };
  createAxis('x', ['left', 'right']);
  createAxis('y', ['top', 'bottom']);
}

// === 4. ОПРЕДЕЛЕНИЕ ПРАВИЛ ===

// --- Layout & Spacing ---
createSideRules('p', 'padding', REM);
createSideRules('m', 'margin', REM);
createNumeric('g', 'gap', REM);
createBracket('g', 'gap');
createNumeric('gx', 'column-gap', REM);
createBracket('gx', 'column-gap');
createNumeric('gy', 'row-gap', REM);
createBracket('gy', 'row-gap');

// --- Sizing ---
const sizeProps = { 
  w: 'width', 
  h: 'height', 
  'min-w': 'min-width', 
  'max-w': 'max-width', 
  'min-h': 'min-height', 
  'max-h': 'max-height' 
};
Object.entries(sizeProps).forEach(([prefix, prop]) => {
  createNumeric(prefix, prop, REM);
  createBracket(prefix, prop);
  addStatic(`${prefix}-auto`, { [prop]: 'auto' });
  if (prefix === 'w' || prefix === 'h') {
    addStatic(`${prefix}-min`, { [prop]: 'min-content' });
    addStatic(`${prefix}-max`, { [prop]: 'max-content' });
    addStatic(`${prefix}-fit`, { [prop]: 'fit-content' });
  }
});

// --- Position ---
['top', 'bottom', 'left', 'right'].forEach(pos => {
  createNumeric(pos, pos, REM);
  createBracket(pos, pos);
});
['relative', 'absolute', 'fixed', 'sticky', 'static'].forEach(p => addStatic(p, { position: p }));

// --- Flexbox ---
addStatic('f-row', { 'flex-direction': 'row' });
addStatic('f-col', { 'flex-direction': 'column' });
addStatic('f-row-rev', { 'flex-direction': 'row-reverse' });
addStatic('f-col-rev', { 'flex-direction': 'column-reverse' });
addStatic('f-wrap', { 'flex-wrap': 'wrap' });
addStatic('f-nowrap', { 'flex-wrap': 'nowrap' });
addStatic('f-wrap-rev', { 'flex-wrap': 'wrap-reverse' });
createBracket('flex', 'flex');

// --- Align / Justify ---
const alignMap = { 
  start: 'flex-start', 
  end: 'flex-end', 
  center: 'center', 
  stretch: 'stretch', 
  baseline: 'baseline' 
};
const justifyMap = { 
  start: 'flex-start', 
  end: 'flex-end', 
  center: 'center', 
  between: 'space-between', 
  around: 'space-around', 
  evenly: 'space-evenly' 
};

createStringMap('ai', 'align-items', alignMap);
createStringMap('ac', 'align-content', { ...alignMap, ...justifyMap });
createStringMap('as', 'align-self', { ...alignMap, auto: 'auto' });

createStringMap('jc', 'justify-content', justifyMap);
createStringMap('ji', 'justify-items', { 
  start: 'start', 
  end: 'end', 
  center: 'center', 
  stretch: 'stretch' 
});
createStringMap('js', 'justify-self', { 
  start: 'start', 
  end: 'end', 
  center: 'center', 
  stretch: 'stretch', 
  auto: 'auto' 
});

// --- Order ---
for (let i = 1; i <= 12; i++) addStatic(`order-${i}`, { order: String(i) });
addStatic('order-first', { order: '-9999' });
addStatic('order-last', { order: '9999' });

// --- Grid ---
for (let i = 1; i <= 12; i++) {
  addStatic(`g-cols-${i}`, { 'grid-template-columns': `repeat(${i}, minmax(0, 1fr))` });
  addStatic(`g-rows-${i}`, { 'grid-template-rows': `repeat(${i}, minmax(0, 1fr))` });
}
addStatic('col-auto', { 'grid-column': 'auto' });
addStatic('col-span-full', { 'grid-column': '1 / -1' });
addStatic('grid-flow-col', { 'grid-auto-flow': 'column' });
addStatic('grid-flow-row', { 'grid-auto-flow': 'row' });
addStatic('grid-flow-dense', { 'grid-auto-flow': 'dense' });
createBracket('g-cols', 'grid-template-columns');
createBracket('g-rows', 'grid-template-rows');
createBracket('col-span', 'grid-column');

// --- Colors ---
Object.keys(THEME_COLORS).forEach(name => {
  const val = `var(--color-${name})`;
  addStatic(`bg-${name}`, { 'background-color': val });
  addStatic(`color-${name}`, { 'color': val });
  addStatic(`border-${name}`, { 'border-color': val });
  addStatic(`outline-${name}`, { 'outline-color': val });
  addStatic(`fill-${name}`, { 'fill': val });
});
addStatic('bg-transparent', { 'background-color': 'transparent' });
addStatic('color-transparent', { 'color': 'transparent' });
addStatic('border-transparent', { 'border-color': 'transparent' });

const colorTransform = (v: string) => ({ val: /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) ? `#${v}` : v });
createBracket('bg', 'background-color', v => ({ 'background-color': colorTransform(v).val }));
createBracket('color', 'color', v => ({ 'color': colorTransform(v).val }));
createBracket('border', 'border-color', v => ({ 'border-color': colorTransform(v).val }));
createBracket('outline', 'outline-color', v => ({ 'outline-color': colorTransform(v).val }));
createBracket('fill', 'fill', v => ({ 'fill': colorTransform(v).val }));

// --- Typography ---
createStringMap('text', 'text-align', { 
  center: 'center', 
  left: 'left', 
  right: 'right', 
  justify: 'justify' 
});
createStringMap('', 'text-transform', { 
  uppercase: 'uppercase', 
  lowercase: 'lowercase', 
  capitalize: 'capitalize' 
});
createStringMap('', 'text-decoration', { 
  underline: 'underline', 
  'line-through': 'line-through', 
  'none': 'none' 
});
addStatic('italic', { 'font-style': 'italic' });
addStatic('normal', { 'font-style': 'normal' });
addStatic('truncate', { 
  overflow: 'hidden', 
  'text-overflow': 'ellipsis', 
  'white-space': 'nowrap' 
});

[
  ['heading-1', 64, 800], 
  ['heading-2', 48, 700], 
  ['heading-3', 40, 700], 
  ['heading-4', 36, 600],
  ['body-1', 36, 700], 
  ['body-2', 32, 600], 
  ['body-3', 24, 600], 
  ['body-4', 20, 500], 
  ['body-5', 16, 500], 
  ['body-6', 12, 500]
].forEach(([name, size, weight]) => {
  const isBody = String(name).startsWith('body');
  addStatic(name as string, {
    'font-family': isBody ? 'var(--font-body)' : 'var(--font-heading)',
    'font-size': calculateValue(size as number, REM.scale, REM.unit),
    'font-weight': String(weight),
    ...(isBody ? { 
      'letter-spacing': '-0.03em', 
      'line-height': '1.8cap',
      'font-feature-settings': '"liga" on, "calt" on',
      'font-variant-ligatures': 'contextual' 
    } : {})
  });
});

// --- Borders & Radius ---

const borderStyles = { 
  solid: 'solid', 
  dashed: 'dashed', 
  dotted: 'dotted', 
  double: 'double', 
  groove: 'groove', 
  ridge: 'ridge', 
  none: 'none' 
}

createNumeric('r', 'border-radius', REM);
createBracket('r', 'border-radius');
createNumeric('border-w', 'border-width', REM);
createStringMap('border', 'border-style', borderStyles);
createNumeric('outline-w', 'outline-width', REM);
createStringMap('outline', 'outline-style', borderStyles);

// --- Effects ---
createNumeric('z', 'z-index', { scale: 1, unit: '' });
addDynamic('opacity', /^opacity-(\d+)$/, ({ className, match }) => ({
  selector: `.${escapeClassName(className)}`,
  declarations: { opacity: (Number(match![1]) / 100).toString() }
}));
createStringMap('overflow', 'overflow', { 
  auto: 'auto', 
  hidden: 'hidden', 
  visible: 'visible', 
  scroll: 'scroll' 
});
createStringMap('c', 'cursor', { 
  pointer: 'pointer', 
  default: 'default', 
  text: 'text', 
  move: 'move', 
  'not-allowed': 'not-allowed' 
});

// --- Transforms ---
addDynamic('rotate', /^rotate-(\d+)$/, ({ className, match }) => ({
  selector: `.${escapeClassName(className)}`,
  declarations: { transform: `rotate(${match![1]}deg)` }
}));
addDynamic('scale', /^scale-(\d+)$/, ({ className, match }) => ({
  selector: `.${escapeClassName(className)}`,
  declarations: { transform: `scale(${Number(match![1]) / 100})` }
}));

// --- Display ---
createStringMap('dis', 'display', { 
  block: 'block', 
  inline: 'inline', 
  'inline-block': 'inline-block', 
  none: 'none', 
  flex: 'flex', 
  'inline-flex': 'inline-flex', 
  grid: 'grid', 
  'inline-grid': 'inline-grid' 
});

// --- Masonry (Complex) ---
addDynamic('gm', /^gm-(\d+)-(\d+)$/, ({ className, match, finalSelector }) => {
  const cols = String(parseInt(match![1]));
  const gapIdx = parseInt(match![2]);
  const gapValue = calculateValue(gapIdx, REM.scale, REM.unit);
  const baseSelector = finalSelector;
  return [
    {
      selector: baseSelector,
      declarations: {
        'display': 'block',
        'column-count': cols,
        'column-gap': gapValue,
        'align-items': 'start'
      } as CssDeclaration, 
      isRawSelector: true
    },
    {
      selector: `${baseSelector} > *`,
      declarations: {
        'break-inside': 'avoid',
        'margin-bottom': gapValue,
        'width': '100%'
      } as CssDeclaration, 
      isRawSelector: true
    }
  ];
});

addStatic('masonry', {'grid-template-rows': 'masonry'});
createBracket('content', 'content');


// === 5. ФУНКЦИЯ ГЕНЕРАЦИИ (Основная логика) ===

export function generateCss(classes: Set<string>): string {
  const rules: CssRule[] = [];

  classes.forEach(fullClassName => {
    let base = fullClassName;
    let media = '';
    let pseudo = '';

    const parts = fullClassName.split(':');
    if (parts.length > 1) {
      base = parts.pop()!;
      for (const p of parts) {
        if (BREAKPOINTS[p]) {
          media = `@media (min-width: ${BREAKPOINTS[p]})`;
        } else if (PSEUDO_VARIANTS[p]) {
          pseudo += PSEUDO_VARIANTS[p];
        }
      }
    }

    const finalSelector = `.${escapeClassName(fullClassName)}${pseudo}`;

    const wrapRule = (rule: CssRule): CssRule => {
      if (rule.isRawSelector) {
        return { ...rule, media: media || undefined };
      }
      return {
        selector: finalSelector,
        declarations: rule.declarations,
        media: media || undefined
      };
    };

    if (staticRules.has(base)) {
      rules.push(wrapRule(staticRules.get(base)!));
      return;
    }

    const dashIndex = base.indexOf('-');
    if (dashIndex !== -1) {
      const prefix = base.substring(0, dashIndex);
      const group = dynamicRules.get(prefix);
      if (group) {
        for (const { match, generate } of group) {
          const m = base.match(match);
          if (m) {
            const res = generate({ className: base, match: m, finalSelector });
            if (res) {
              if (Array.isArray(res)) {
                res.forEach(r => rules.push(wrapRule(r)));
              } else {
                rules.push(wrapRule(res));
              }
            }
            break;
          }
        }
      }
    }
  });

  const noMedia = rules.filter(r => !r.media);
  const withMedia = rules.filter(r => r.media).sort((a, b) => {
    const getPx = (s: string) => parseInt(s.match(/\d+/)![0]);
    return getPx(a.media!) - getPx(b.media!);
  });

  const ruleToString = (r: CssRule) => {
    const decls = Object.entries(r.declarations)
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    const block = `${r.selector}{${decls}}`;
    return r.media ? `${r.media}{${block}}` : block;
  };

  return BASE_STYLES + '\n' + 
         [...noMedia, ...withMedia].map(ruleToString).join('\n');
}