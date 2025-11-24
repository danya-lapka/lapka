# 🐾 Danya Lapka Monorepo

[![npm-css](https://img.shields.io/npm/v/@danya-lapka/css?style=for-the-badge&label=css)](https://www.npmjs.com/package/@danya-lapka/css)
[![npm-vue](https://img.shields.io/npm/v/@danya-lapka/components-vue?style=for-the-badge&label=components-vue)](https://www.npmjs.com/package/@danya-lapka/css)

**Danya Lapka** is a monorepo containing an ultra-fast atomic CSS generator and reusable Vue 3 components powered by it.

- [🐾 Danya Lapka Monorepo](#-danya-lapka-monorepo)
  - [📦 Packages](#-packages)
  - [🚀 Quick Start](#-quick-start)
    - [1. Clone \& Install](#1-clone--install)
    - [2. Build All Packages](#2-build-all-packages)
    - [3. Development](#3-development)
  - [📋 Available Scripts](#-available-scripts)
  - [🛠 Tech Stack](#-tech-stack)
  - [📖 Documentation](#-documentation)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)


## 📦 Packages

| Package | Description | NPM |
|---------|-------------|-----|
| [@danya-lapka/css](packages/css) | Blazing-fast atomic CSS generator CLI. Zero-config, fully typed. | [![npm](https://img.shields.io/npm/v/@danya-lapka/css)](https://www.npmjs.com/package/@danya-lapka/css) |
| [@danya-lapka/components-vue](packages/components-vue) | Accessible, responsive Vue 3 UI components styled with Lapka CSS. | [![npm](https://img.shields.io/npm/v/@danya-lapka/components-vue)](https://www.npmjs.com/package/@danya-lapka/components-vue) |

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone &lt;your-repo-url&gt;
cd danya-lapka
npm install
```

### 2. Build All Packages

```bash
npm run build
```

### 3. Development

- CSS: `cd packages/css && npm run css` (watch mode)
- Components: `cd packages/components-vue && npm run dev` (build watch)

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build all packages (types + CSS + bundles) |
| `npm run publish:css` | Build & publish CSS package |
| `npm run publish:components-vue` | Build & publish Vue components package |

## 🛠 Tech Stack

- [Turborepo](https://turbo.build/repo) for monorepo orchestration
- TypeScript for full type safety
- Vite for Vue component bundling
- No runtime dependencies (peerDeps only)

## 📖 Documentation

- [Lapka CSS](/packages/css/README.md) - Full class reference & CLI docs
- [Vue Components](/packages/components-vue/README.md) - Props, examples & usage

## 🤝 Contributing

1. Fork & clone
2. `npm install`
3. Make changes
4. `npm run build`
5. PR to `main`

## 📄 License

MIT © Danya Lapka
