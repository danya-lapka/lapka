# 🐾 Lapka Vue Components

[![npm](https://img.shields.io/npm/v/@danya-lapka/components-vue?style=for-the-badge)](https://www.npmjs.com/package/@danya-lapka/components-vue)

**Lapka Vue Components** are reusable, fully typed Vue 3 components styled exclusively with [Lapka CSS](https://www.npmjs.com/package/@danya-lapka/css). Atomic, responsive, accessible.

- [🐾 Lapka Vue Components](#-lapka-vue-components)
  - [✨ Features](#-features)
  - [🚀 Quick Start](#-quick-start)
    - [1. Installation](#1-installation)
    - [2. Generate CSS (User-side)](#2-generate-css-user-side)
    - [3. Use Components](#3-use-components)
    - [Local Preview](#local-preview)
  - [📦 Components](#-components)
    - [Button](#button)
      - [🔧 Props](#-props)
      - [🎨 Colors](#-colors)
      - [🔌 Events](#-events)
      - [💡 Examples](#-examples)
  - [⚙️ Build \& Development](#️-build--development)
  - [🛠 Customization](#-customization)
  - [🔗 Related](#-related)
  - [📄 License](#-license)


## ✨ Features

* 🎨 **Atomic Styling**: Zero CSS bloat, powered by Lapka CSS utilities
* 🔧 **TypeScript First**: Full props & emits typing
* 📱 **Responsive**: Built-in responsive variants via CSS prefixes
* ♿ **Accessible**: Semantic HTML, keyboard nav, ARIA-ready
* 📦 **Tree-Shakeable**: Only import what you use
* 🚀 **Zero Runtime**: Pure Vue 3 Composition API

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install @danya-lapka/components-vue @danya-lapka/css vue@^3.4.0
```

**Note**: `@danya-lapka/css` is a peer dependency for styles.

### 2. Generate CSS (User-side)

```bash
npm i @danya-lapka/css -D
npx @danya-lapka/css -i ./src,node_modules/@danya-lapka/components-vue/src -o ./src/lapka.css --watch
```

Import:
```js
import './lapka.css'
```

### 3. Use Components

**With auto-CSS** (Vite detects "style" field):

```vue
<script setup>
import { Button } from '@danya-lapka/components-vue'
</script>

<template>
  <Button size="lg" bg="accent-white" color="white-accent3">
    Get Started
  </Button>
</template>
```

### Local Preview

```bash
npm run build
npm run preview  # Serves http://localhost:4173 — test Button styles
```

---

## 📦 Components

### Button

Customizable, accessible button with size, color variants & hover states.

#### 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant |
| `bg` | string | `'white-gray1'` | Background: `${color1}-${color2}` (hover) |
| `color` | string | `'black-gray3'` | Text color: `${color1}-${color2}` (hover) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `class` | string | `''` | Additional Tailwind-like classes |

#### 🎨 Colors

Use Lapka CSS colors: `white`, `gray1/2/3`, `black`, `accent/1/2/3`, `success/alt`, `warn/alt`, `error/alt`, `info/alt`.

**Examples**:
- `bg="accent-black"` → accent bg → black on hover
- `bg="success-white"` → success bg → white on hover

#### 🔌 Events

| Event | Type |
|-------|------|
| `click` | `MouseEvent` |
| `mouseenter` | `MouseEvent` |
| `mouseleave` | `MouseEvent` |
| `focus` | `FocusEvent` |
| `blur` | `FocusEvent` |
| `keydown` | `KeyboardEvent` |

#### 💡 Examples

**Primary**:
```vue
<Button size="xl" bg="accent-white" color="white-accent3">
  Primary
</Button>
```

**Success**:
```vue
<Button size="md" bg="success-black" color="white-success-alt">
  Save
</Button>
```

**Destructive**:
```vue
<Button size="sm" bg="error-white" color="white-error-alt">
  Delete
</Button>
```

**Sizes Preview**:
```vue
<div class="flex g-4">
  <Button size="xs">XS</Button>
  <Button size="sm">SM</Button>
  <Button size="md">MD</Button>
  <Button size="lg">LG</Button>
  <Button size="xl">XL</Button>
</div>
```

---

## ⚙️ Build & Development

In monorepo:
```bash
cd packages/components-vue
npm run build:css  # Generates dist/lapka.css
npm run build      # Vite bundle
npm run dev        # Watch mode
```

## 🛠 Customization

- **CSS Vars**: Override in `:root` (see Lapka CSS docs)
- **Classes**: Pass `class` prop for utilities
- **Extend**: Copy Button.vue source & modify

## 🔗 Related

- [Lapka CSS Docs](https://www.npmjs.com/package/@danya-lapka/css)

## 📄 License

MIT © Danya Lapka
