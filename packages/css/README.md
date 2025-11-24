# 🐾 Lapka CSS

[![npm](https://img.shields.io/npm/v/@danya-lapka/css?style=for-the-badge)](https://www.npmjs.com/package/@danya-lapka/css)

- [🐾 Lapka CSS](#-lapka-css)
- [🐾 Lapka CSS](#-lapka-css-1)
  - [✨ Features](#-features)
  - [🚀 Quick Start](#-quick-start)
    - [1. Installation](#1-installation)
    - [2. Run CLI](#2-run-cli)
  - [⚙️ CLI Configuration](#️-cli-configuration)
  - [📖 Class Reference](#-class-reference)
    - [CSS Variables (:root)](#css-variables-root)
    - [Default Styles](#default-styles)
    - [Spacing \& Layout](#spacing--layout)
    - [Typography](#typography)
    - [Colors \& Borders](#colors--borders)
    - [Transforms \& Other](#transforms--other)
  - [📱 Responsiveness and States](#-responsiveness-and-states)
  - [🛠 Customization](#-customization)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

# 🐾 Lapka CSS

**Lapka CSS** is an ultra-fast, drop-in atomic CSS generator for your project.  
No bundlers, no PostCSS, no config. Just a TS CLI that scans your files and generates minimal CSS.

## ✨ Features

*   🚀 **Blazing fast**: Regex-based parsing, processes 1000+ files in &lt;100ms
*   📦 **Zero-Config**: Scans `./src` → `./src/assets/main.css` by default
*   🎨 **Fully typed**: TS source, auto-generated `.d.ts`
*   🛠 **Editable Rules**: Customize in `src/lib/rules.ts`
*   🔍 **IntelliSense**: VS Code class autocomplete via CSS vars/docs

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install -D @danya-lapka/css
```

### 2. Run CLI

**Watch mode** (dev):
```bash
npx @danya-lapka/css --watch
```

**One-shot build**:
```bash
npx @danya-lapka/css
```

**Package.json scripts**:
```json
{
  "scripts": {
    "css": "@danya-lapka/css --watch",
    "build:css": "@danya-lapka/css"
  }
}
```

Import generated `main.css`:
```js
import './assets/main.css';  // Vite/Webpack/etc.
```

---

## ⚙️ CLI Configuration

| Flag | Shorthand | Description | Default |
|------|-----------|-------------|---------|
| `--input`, `-i` | `-i` | Input folder(s) to scan | `./src` |
| `--output`, `-o` | `-o` | Output CSS path | `./src/assets/main.css` |
| `--watch`, `-w` | `-w` | Watch for changes | `false` |

**Examples**:
```bash
# Custom paths
npx @danya-lapka/css -i ./components -o ./public/lapka.css -w

# Multiple inputs
npx @danya-lapka/css -i ./src,./components
```

---

## 📖 Class Reference

**Unit**: `1` = `0.0625rem` (1px @ 16px root). `4` = `0.25rem` (4px).

**Arbitrary values**: `p-[10px]`, `w-[clamp(20%,50vw,300px)]`, `bg-[#42ad83]`

### CSS Variables (:root)

```css
:root {
/* Colors */
  --color-white: #F2F2F2; 
  --color-gray1: #BFBFBF; 
  --color-gray2: #797979;
  --color-gray3: #333333; 
  --color-black: #000000;
  --color-accent: #FF40BF; 
  --color-accent1: #FFBFE9; 
  --color-accent2: #FF99DD; 
  --color-accent3: #800054;
  --color-success: #40FF40; 
  --color-success-alt: #62B262;
  --color-warn: #FFFF40; 
  --color-warn-alt: #B2B262;
  --color-error: #FF4040; 
  --color-error-alt: #B26262;
  --color-info: #4080FF; 
  --color-info-alt: #627DB2;

/* Fonts */
  --font-heading: "Unbounded", sans-serif;
  --font-body: "Monocraft", monospace;

/* Base */
  font-size: 16px;
}
```

### Default Styles

```css
* { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
  border: none; 
  outline: none;  
  transition: all .333s cubic-bezier(0.22, 0.61, 0.36, 1); }
  html, body { 
    width: 100%; 
    min-height: 100vh; 
  }
  svg { 
    height: 1em; 
    width: auto; 
    color: currentColor; 
    fill: currentColor; 
  }
```

### Spacing & Layout

`t/b/l/r/x/y` = top/bottom/left/right/horiz/vert

| Category | Classes |
|----------|---------|
| Padding | `p-n`, `pt-n`, `pr-n`, `pb-n`, `pl-n`, `px-n`, `py-n` |
| Margin | `m-n`, `mt-n`, ... |
| Gap | `g-n`, `gx-n`, `gy-n` |
| Width/Height | `w-n`, `h-n`, `min-w-n`, `max-w-n`, `w-full`, `w-auto`, `w-fit` |
| Position | `relative`, `absolute`, `fixed`, `sticky`; `top-n`, `left-n`, ... |

### Typography

| Class | Description |
|-------|-------------|
| `text-left/center/right/justify` | Alignment |
| `uppercase/lowercase/capitalize` | Transform |
| `underline/line-through/none` | Decoration |
| `truncate` | Ellipsis overflow |
| `heading-1` to `-4` | Headings (64px→36px) |
| `body-1` to `-6` | Body (32px→12px) |

`p + p { margin-top: 1cap }`

### Colors & Borders

`bg-name`, `color-name`, `border-name`, `outline-name`, `fill-name`

`name` = `white`, `gray1`, `accent`, `success`, etc. or `[#hex]`

Borders: `r-n` (radius), `border-w-n`, `border-solid/dashed/etc.`

### Transforms & Other

| Category | Classes |
|----------|---------|
| Display | `dis-flex`, `dis-grid`, `dis-none`, `block`, `inline-block` |
| Flex/Grid | `f-row/col`, `ai-center`, `g-cols-n`, `col-span-n` |
| Transforms | `rotate-n`, `scale-n`, `opacity-n` |
| Overflow | `overflow-hidden/auto/scroll` |
| Cursor | `c-pointer`, `c-default` |
| Z | `z-n` |

**Full list**: Edit `rules.ts` for custom.

---

## 📱 Responsiveness and States

**Prefixes** (space-separated):

**Breakpoints** (`min-width`):
- `xl:` 1920px
- `lg:` 1440px
- `md:` 1024px
- `sm:` 768px
- `xs:` 576px

**States**:
- `hover:`, `focus:`, `active:`, `disabled:`
- `first:`, `last:`, `odd:`, `even:`
- `before:`, `after:`

**Example**:
```html
<div class="p-16 md:p-24 hover:bg-gray1 sm:hover:bg-accent"></div>
```

---

## 🛠 Customization

Edit `@danya-lapka/css/src/lib/rules.ts`:

- `THEME_COLORS`: Colors
- `staticRules`: Add static classes
- `dynamicRules`: Add regex-based dynamics

Rebuild: `npm run build` in package.

## 🤝 Contributing

1. `npm install`
2. Edit `src/lib/rules.ts`
3. `npm run css` (test)
4. `npm run build`
5. PR

## 📄 License

MIT © Danya Lapka

**⭐ Star on [npm](https://www.npmjs.com/package/@danya-lapka/css)**