# @danya-lapka/css-vite

A lightweight atomic CSS generator for Vite.  
Generates CSS on-the-fly based only on the classes actually used—zero dead code.

Features:
- Responsive variants (`md:`, `lg:`, etc.)
- Pseudo-states (`hover:`, `focus:`, `active:`)
- Arbitrary values (`[...]`)
- Theming via CSS variables
- Masonry grid (`gm-3-16`)
- Automatic color pair detection (e.g., `bg="white-gray1"` → `bg-white hover:bg-gray1`)

[![npm](https://img.shields.io/npm/v/@danya-lapka/css-vite)](https://www.npmjs.com/package/@danya-lapka/css-vite)
![npm](https://img.shields.io/npm/dm/@danya-lapka/css-vite)

- [@danya-lapka/css-vite](#danya-lapkacss-vite)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [CSS Classes](#css-classes)
    - [Variants](#variants)
  - [License](#license)

## Installation

```bash
npm i @danya-lapka/css-vite
```

## Usage

```ts
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import lapkaCss from '@danya-lapka/css-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    lapkaCss(),
  ],
  optimizeDeps: {
    exclude: ['virtual:lapka.css'],
    include: ['@danya-lapka/css-vite']
  },
  build: {
    rollupOptions: {
      external: ['virtual:lapka.css']
    }
  }
})

```

Import CSS (required!):

```ts
// main.ts
import 'virtual:lapka.css'
```

## Features

- No prefixes like `tw-` or `uno-` — just write class names directly
- Full HMR support (edit classes → instant style updates)
- Automatic color pair detection from string literals (e.g., in Vue components)
- Built-in theme (colors, fonts) via `:root` CSS variables
- Masonry layouts via `gm-{cols}-{gap}`

## CSS Classes

`t` — top  
`b` — bottom  
`l` — left  
`r` — right  
`x` — left + right  
`y` — top + bottom  

Unit: `1` = `0.0625rem` (`1px` at base `16px`)  
`n` — any number  
`[]` — arbitrary value

```css
.p-n { padding: n * 0.0625rem }
/* also pt-n, pr-n, pb-n, pl-n, px-n, py-n, p-[value] */

.m-n { margin: n * 0.0625rem }
/* also mt-n, mr-n, mb-n, ml-n, mx-n, my-n, m-[value] */

.g-n { gap: n * 0.0625rem }
/* also gx-n, gy-n, g-[value], gx-[value], gy-[value] */

.w-n { width: n * 0.0625rem }
/* also w-[value], w-auto, w-min, w-max, w-fit */

.h-n { height: n * 0.0625rem }
/* also h-[value], h-auto, h-min, h-max, h-fit */

.min-w-n { min-width: n * 0.0625rem }   /* also min-w-[value] */
.max-w-n { max-width: n * 0.0625rem }   /* also max-w-[value] */
.min-h-n { min-height: n * 0.0625rem }  /* also min-h-[value] */
.max-h-n { max-height: n * 0.0625rem }  /* also max-h-[value] */

.top-n { top: n * 0.0625rem }           /* also top-[value] */
.right-n { right: n * 0.0625rem }       /* also right-[value] */
.bottom-n { bottom: n * 0.0625rem }     /* also bottom-[value] */
.left-n { left: n * 0.0625rem }         /* also left-[value] */

.relative { position: relative }
/* also absolute, fixed, sticky, static */

.z-n { z-index: n }

.r-n { border-radius: n * 0.0625rem }    /* also r-[value] */

.border-w-n { border-width: n * 0.0625rem }   /* also border-w-[value] */
.border-solid { border-style: solid }
/* also dashed, dotted, double, groove, ridge, none */

.outline-solid { outline-style: solid }
/* also dashed, dotted, double, groove, ridge, none */

.bg-white { background-color: var(--color-white) }
/* also bg-gray1, bg-accent, bg-success … all theme keys */

.color-white { color: var(--color-white) }
/* also color-black, color-accent … */

.border-white { border-color: var(--color-white) }
.outline-white { outline-color: var(--color-white) }
.fill-white { fill: var(--color-white) }

.bg-transparent { background-color: transparent }
/* also color-transparent, border-transparent */

.bg-[value] { background-color: value }     /* hex without # → # is auto-added */
.color-[value] { color: value }
/* also border-[value], outline-[value], fill-[value] */

heading-1 { font-size: 4rem; font-weight: 800; font-family: var(--font-heading) }
/* also heading-2, heading-3, heading-4 */

body-1 { font-size: 2.25rem; font-weight: 700; font-family: var(--font-body) }
/* also body-2 … body-6 */

.text-center { text-align: center }
/* also text-left, text-right, text-justify */

uppercase { text-transform: uppercase }
/* also lowercase, capitalize */

underline { text-decoration: underline }
/* also line-through, none */

italic { font-style: italic }
normal { font-style: normal }
truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }

.flex-[1_0_auto] { flex: 1 0 auto }          /* underscore = space */

f-row { flex-direction: row }
/* also f-col, f-row-rev, f-col-rev */

f-wrap { flex-wrap: wrap }
/* also f-nowrap, f-wrap-rev */

inline-flex { display: inline-flex }

ai-center { align-items: center }
/* also ai-start, ai-end, ai-stretch, ai-baseline */

ac-center { align-content: center }
/* also ac-start, ac-end, ac-between, ac-around, ac-evenly … */

as-center { align-self: center }
/* also as-start, as-end, as-stretch, as-auto … */

jc-center { justify-content: center }
/* also jc-start, jc-end, jc-between, jc-around, jc-evenly */

ji-center { justify-items: center }
/* also ji-start, ji-end, ji-stretch */

js-center { justify-self: center }
/* also js-start, js-end, js-stretch, js-auto */

g-cols-6 { grid-template-columns: repeat(6, minmax(0,1fr)) }   /* n = 1..12 */
g-rows-4 { grid-template-rows: repeat(4, minmax(0,1fr)) }      /* n = 1..12 */
g-cols-[repeat(auto-fit,minmax(250px,1fr))] { grid-template-columns: repeat(auto-fit,minmax(250px,1fr)) }
g-rows-[…] { grid-template-rows: … }
col-span-3 { grid-column: span 3 }          /* also col-span-n, col-span-[value] */
col-span-full { grid-column: 1 / -1 }
col-auto { grid-column: auto }

grid-flow-col { grid-auto-flow: column }
/* also grid-flow-row, grid-flow-dense */

order-6 { order: 6 }                        /* n = 1..12 */
order-first { order: -9999 }
order-last { order: 9999 }

gm-3-24 { column-count: 3; column-gap: 1.5rem }   /* gm-{cols}-{gap} */
→ gm-3-24 > * { break-inside: avoid; margin-bottom: 1.5rem; width: 100% }

opacity-75 { opacity: 0.75 }                /* n = 0..100 */
rotate-90 { transform: rotate(90deg) }
scale-125 { transform: scale(1.25) }

c-pointer { cursor: pointer }
/* also c-default, c-text, c-move, c-not-allowed */

overflow-hidden { overflow: hidden }
/* also overflow-auto, overflow-visible, overflow-scroll */

dis-block { display: block }
/* also inline, inline-block, none, flex, inline-flex, grid, inline-grid */

content-['★'] { content: '★' }
/* also before:content-['…'], after:content-['…'] */

masonry { grid-template-rows: masonry }
```

### Variants

Breakpoints: `xs:`, `sm:`, `md:`, `lg:`, `xl:` → `@media (min-width: …)`  
States: `hover:`, `focus:`, `active:`, `disabled:`  
Child selectors: `first:`, `last:`, `odd:`, `even:`  
Pseudo-elements: `before:`, `after:`

Variants can be stacked with colons:  
`md:hover:p-64`, `lg:active:bg-accent`

## License

MIT © Danya Lapka