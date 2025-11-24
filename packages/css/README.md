# 🐾 Lapka CSS

**Lapka CSS** is an ultra-fast, drop-in atomic CSS generator for your project.  
It works without Webpack, Vite, or PostCSS plugins. It's just a TypeScript script that scans your files and generates CSS on the fly.

## ✨ Features

*   🚀 **Blazing fast**: Uses regex instead of AST, processing your entire project in milliseconds.
*   📦 **Zero-Config**: No complex configurations. Just copy the folder and run the script.
*   🎨 **Fully typed**: Written in TypeScript, easy to read and extend.
*   🛠 **User-Editable**: Want to change colors or breakpoints? Just edit the file `src/lib/rules.ts`.

---

## 🚀 Quick Start

### 1. Installation

Install Lapka CSS as a dev dependency:

```bash
npm install -D @danya-lapka/css
```

### 2. Run CLI

Lapka CSS provides a CLI tool. You can run it directly using `npx` or by adding scripts to your `package.json`.

**Direct usage with npx:**

```bash
npx @danya-lapka/css --watch
```

**Add to package.json scripts:**

```json
"scripts": {
  "css": "@danya-lapka/css --watch",
  "build:css": "@danya-lapka/css"
}
```

Then run:

```bash
npm run css
```

By default, the CSS file is generated at `./src/assets/main.css`. Import it into your application:

```javascript
// In main.ts, index.js, or App.vue
import './assets/main.css';
```

---

## ⚙️ CLI Configuration

You can override input/output directories via CLI flags:

| Flag | Description | Default |
| :--- | :--- | :--- |
| `-i`, `--input` | Folder to scan for classes | `./src` |
| `-o`, `--output` | Output file path | `./src/assets/main.css` |
| `-w`, `--watch` | Enable watch mode | `false` |

Example:
```bash
lapka-css -i ./components -o ./public/style.css --watch
```

---

## 📖 Class Reference

The system is based on **rem** units. `1` unit = `0.0625rem` (1px at a 16px base). `4` units = `0.25rem` (4px).

### CSS Variables

The generator creates CSS variables in `:root`.

```css
:root {
  /* colors */
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
  /* fonts */
  --font-heading: "Unbounded", sans-serif;
  --font-body: "Monocraft", monospace;
  /* other */
  font-size: 16px;
}
```

### Default Styles

```css
* {
  box-sizing: border-box;
  margin: 0; padding: 0;
  margin-block: 0;
  margin-inline: 0;
  border: none; 
  outline: none;
  transition: all .333s cubic-bezier(0.22, 0.61, 0.36, 1);
  position: relative;
  text-decoration: none;
  list-style: none;
}
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
svg path { 
  fill: currentColor 
}
```

`t` = top, `b` = bottom, `l` = left, `r` = right, `x` = left+right, `y` = top+bottom

***replace `n` with any number***

You can also use custom values:
+ `class-[10px]` → `prop: 10px;`
+ `class-[10px_5px]` → `prop: 10px 5px`
+ `class-[clamp(1rem,5vw,2rem)]` → `prop: clamp(1rem,5vw,2rem);`

### Actual CSS

```css
/* ----- Spacing ----- */
.p-n { padding: n * 0.0625rem }
.m-n { margin: n * 0.0625rem }

/* ----- Gap ----- */
.g-n { gap: n * 0.0625rem }
.gy-n { row-gap: n * 0.0625rem }
.gx-n { column-gap: n * 0.0625rem }

/* ----- Sizes ----- */
.w-n { width: n * 0.0625rem }
.w-auto { width: auto }
.min-w { min-width: n * 0.0625rem }
.max-w { max-width: n * 0.0625rem }
.w-max { width: max-content }
.w-min { width: min-content }
.w-fit { width: fit-content }
/* and same for height (.h) */

/* ----- Position ----- */
.relative { position: relative }
/* and absolute, fixed, sticky, static */

.top-n { top: n * 0.0625rem }
/* and bottom, left, right */

/* ----- Display ----- */
.dis-flex { display: flex }
/* and inline-flex, grid, inline-grid, none, block, inline-block, inline */

/* ----- Flexbox ----- */
.f-row { flex-direction: row }
/* and col, row-rev, col-rev */
.f-wrap { flex-wrap: wrap }
/* and nowrap, wrap-rev */
.flex-\[a_b_c\] { flex: a b c } /* grow_shrink_basis */

/* ----- Alignment ----- */
/* a = align, j = justify */
/* i = items, c = content, s = self */
.ai-center { align-items: center }
/* and start, end, stretch, baseline */
/* and between, around, evenly for space- */
/* and auto for self */

.order-n { order: n }
.order-first { order: -9999 }
.order-last { order: 9999 }

/* ----- Grid ----- */
.g-cols-n { grid-template-columns: repeat(n, minmax(0, 1fr)) }
.g-cols-\[10px_1fr_50\%\] { grid-template-columns: 10px 1fr 50% }
/* and rows */

.col-auto { grid-column: auto }
.col-span-full { grid-column: 1 / -1 }
.col-span-\[1_\/_span_2\] { grid-column: 1 / span 2 }

.g-flow-col { grid-auto-flow: column }
/* and row, dense */

/* Masonry */
.gm-n-z {
  display: block;
  column-count: n;
  column-gap: z * 0.0625rem;
  align-items: start;
}
.gm-n-z > * {
  break-inside: avoid;
  margin-bottom: z * 0.0625rem;
  width: 100%;
}
/* if browser supports */
.masonry { grid-template-rows: masonry }
/* combine with g-cols- and g- */

/* ----- Colors ----- */
.bg-name { background-color: var(--color-name) }
.bg-transparent { background-color: transparent }
.bg-\[\#fff\] { background-color: #fff; }
/* and for color, border, outline, fill */

/* ----- Typography ----- */
.text-center { text-align: center }
/* and left, right, justify */

.uppercase { text-transform: uppercase }
/* and lowercase, capitalize */

.underline { text-decoration: underline }
/* and line-through, none */

.italic { font-style: italic }
/* and normal */

.truncate { 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.heading-1 {
  font-family: var(--font-heading);
  font-size: 4rem; /* 64px */
  font-weight: 800;
}
/* (font-size in px, font-weight) */
/* heading-2 (48px, 700), heading-3 (40px, 700), heading-4 (36px, 600) */

.body-1 {
  font-family: var(--font-body);
  font-size: 2.25rem;
  font-weight: 700;
  font-feature-settings: "liga" on, "calt" on;
  font-variant-ligatures: contextual;
  letter-spacing: -0.03em;
  line-height: 1.8cap;
}
/* (font-size in px, font-weight) */
/* body-2 (32px, 600), body-3 (24px, 600), body-4 (20px, 500), body-5 (16px, 500), body-6 (12px, 500) */

p + p { margin-top: 1cap }

/* ----- Border ----- */
.r-n { border-radius: n * 0.0625rem }
.r-\[0_12px_0_12px\] { border-radius: 0 12px 0 12px }
.border-w-n { border-width: n * 0.0625rem }
.border-solid { border-style: solid }
/* and dashed, dotted, double, groove, ridge, none */
/* same with outline */

/* ----- Transform ----- */
.rotate-n { transform: rotate(n deg) }
.scale-n { transform: scale(n / 100) }
.opacity-n { opacity: n / 100 }

/* ----- Other ----- */
.overflow-hidden { overflow: hidden }
/* and auto, visible, scroll */

.c-pointer { cursor: pointer }
/* and default, text, move, not-allowed */

.z-n { z-index: n }

.content-\[\'Hello_World\'\] { content: 'Hello World' }
/* use with before: and after: */
```

### 📱 Responsiveness and States

Use prefixes separated by colons.

**Breakpoints** (`@media (min-width: ...)`):

+ `xl:` — `1920px`
+ `lg:` — `1440px`
+ `md:` — `1024px`
+ `sm:` — `768px`
+ `xs:` — `576px`

**Pseudo-classes**:
+ `hover:` — `class:hover`
+ `focus:` — `class:focus`
+ `active:` — `class:active`
+ `visited:` — `class:visited`
+ `disabled:` — `class:disabled`
+ `first:` — `class:first-child`
+ `last:` — `class:last-child`
+ `odd:` — `class:nth-child(odd)`
+ `even:` — `class:nth-child(even)`
+ `before:` — `class::before`
+ `after:` — `class::after`

---

## 🛠 Customization

To change colors, fonts, or add new rules, edit this file:  
👉 **`@danya-lapka/css/src/lib/rules.ts`**

*   Modify the `THEME_COLORS` object to change your color palette.
*   Use `addStatic` or `addDynamic` functions to add your own utility classes.