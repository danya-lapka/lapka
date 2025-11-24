# @danya-lapka/css-vite

Лёгкий атомарный CSS-генератор для Vite.  
Генерирует CSS на лету по реально используемым классам — никакого мертвого кода.

Поддерживает:
- Адаптивность (`md:`, `lg:` и т.д.)
- Псевдо-состояния (`hover:`, `focus:`, `active:`)
- Произвольные значения `[...]` 
- Темизацию через CSS-переменные
- Masonry-грид (`gm-3-16`)
- Авто-подхват пар цветов вида `bg="white-gray1"` → `bg-white hover:bg-gray1`

[![npm](https://img.shields.io/npm/v/@danya-lapka/css-vite)](https://www.npmjs.com/package/@danya-lapka/css-vite)
![npm](https://img.shields.io/npm/dm/@danya-lapka/css-vite)

- [@danya-lapka/css-vite](#danya-lapkacss-vite)
  - [Установка](#установка)
  - [Использование](#использование)
  - [Особенности](#особенности)
  - [Примеры классов](#примеры-классов)
  - [Публикация новой версии](#публикация-новой-версии)
  - [Лицензия](#лицензия)


## Установка

```bash
npm i @danya-lapka/css-vite
```

## Использование

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import lapkaCss from '@danya-lapka/css-vite'

export default defineConfig({
  plugins: [
    lapkaCss(),
    // твои другие плагины (vue(), react(), etc.)
  ],
})
```

Импорт CSS (обязательно!):

```ts
import '@danya-lapka/css-vite'        // ← подтянет виртуальный модуль
// или
import 'virtual:lapka-css'
```

После этого можно писать обычные атомарные классы:

```html
<div class="p-32 hover:p-64 bg-white hover:bg-accent text-center md:text-left w-[420px] gm-3-32">
  Lapka в деле
</div>
```

## Особенности

- Никаких префиксов типа `tw-` или `uno-` — просто пишешь нужные классы
- Полная поддержка HMR (изменение классов → мгновенное обновление стилей)
- Автоматическое определение пар цветов из строковых литерал (например в Vue-компонентах)
- Встроенная тема (цвета, шрифты) + `:root` переменные
- Masonry через `gm-{cols}-{gap}`

## Примеры классов

```html
p-16 m-8-x hover:bg-accent md:p-32
w-100 h-[50vh] r-8 border-2 border-accent
heading-1 color-black hover:color-accent
gm-4-24            <!-- masonry 4 колонки, gap 1.5rem -->
```

## Публикация новой версии

```bash
# Из корня монорепо
npm run publish:css
```

Делает тип-чек + сборку + `npm publish --access public`

## Лицензия

MIT © [Danya Lapka](https://github.com/твой-ник)