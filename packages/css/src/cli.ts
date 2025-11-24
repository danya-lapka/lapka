#!/usr/bin/env node

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { extractClassesFromFiles, generateCssFromClasses } from './index';

// === КОНФИГУРАЦИЯ ===
// По умолчанию ищем в корне проекта (на уровень выше от папки lapka-css, если запускаем скрипт оттуда,
// но обычно запускаем из корня через npm run, поэтому defaults ниже рассчитаны на запуск из корня проекта)
const DEFAULTS = {
  input: './src',           
  output: './src/assets/main.css', 
  watch: false,             
};

const C = {
  green: (t: string) => `\x1b[32m${t}\x1b[0m`,
  blue: (t: string) => `\x1b[34m${t}\x1b[0m`,
  yellow: (t: string) => `\x1b[33m${t}\x1b[0m`,
  red: (t: string) => `\x1b[31m${t}\x1b[0m`,
  dim: (t: string) => `\x1b[2m${t}\x1b[0m`,
};

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...DEFAULTS };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' || args[i] === '-i') config.input = args[++i];
    else if (args[i] === '--output' || args[i] === '-o') config.output = args[++i];
    else if (args[i] === '--watch' || args[i] === '-w') config.watch = true;
  }
  return config;
}

async function build(config: typeof DEFAULTS) {
  const start = performance.now();
  const inputPath = path.resolve(process.cwd(), config.input);
  const outputPath = path.resolve(process.cwd(), config.output);

  try {
    if (!fsSync.existsSync(inputPath)) {
      // Создаем входную папку, если это новый проект, чтобы не падало
      await fs.mkdir(inputPath, { recursive: true });
    }

    const outputDir = path.dirname(outputPath);
    if (!fsSync.existsSync(outputDir)) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    const classes = await extractClassesFromFiles(inputPath);
    const css = generateCssFromClasses(classes);

    await fs.writeFile(outputPath, css);

    const end = performance.now();
    const time = (end - start).toFixed(0);
    
    console.log(
      `${C.green('✔ Lapka CSS')} ` +
      `${C.dim(`[${classes.length} classes]`)} ` +
      `${C.blue(`→ ${config.output}`)} ` +
      `${C.yellow(`${time}ms`)}`
    );

  } catch (error) {
    console.error(C.red('❌ Build failed:'), error);
  }
}

function watch(config: typeof DEFAULTS) {
  console.clear();
  build(config);
  console.log(C.blue(`\n👀 Watching for changes in ${config.input}...`));

  let timer: NodeJS.Timeout;
  const watcher = fsSync.watch(config.input, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    if (path.resolve(config.input, filename) === path.resolve(config.output)) return;

    clearTimeout(timer);
    timer = setTimeout(() => {
      build(config);
    }, 50);
  });

  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });
}

const config = parseArgs();
if (config.watch) watch(config);
else build(config);