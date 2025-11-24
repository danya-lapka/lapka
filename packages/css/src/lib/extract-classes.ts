import fs from 'fs/promises';
import path from 'path';

const EXTENSIONS = new Set(['.vue', '.js', '.ts', '.jsx', '.tsx', '.html']);

const IGNORED_DIRS = new Set([
  'node_modules', '.git', '.nuxt', 'dist', '.output', 
  '.turbo', 'coverage', 'scripts', 'generated', 'public'
]);

// Ищет class="..." и простые строки, похожие на utility-классы
const CLASS_REGEX = /(?:class(?:Name)?|:?class)\s*[:=]\s*["'`]([^"'`]+)["'`]|(["'`])([^"'`\s<>{}]+\-[^"'`\s<>{}]*)\2/g;
const SPLIT_REGEX = /\s+/;

async function walk(dir: string): Promise<string[]> {
  const files: string[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory()) {
        if (!IGNORED_DIRS.has(ent.name)) {
          files.push(...await walk(path.join(dir, ent.name)));
        }
      } else if (EXTENSIONS.has(path.extname(ent.name))) {
        files.push(path.join(dir, ent.name));
      }
    }
  } catch (e) {
    // Ignore errors
  }
  return files;
}

export async function extractClassesFromFiles(root: string): Promise<string[]> {
  const files = await walk(root);
  const classes = new Set<string>();

  await Promise.all(files.map(async (file) => {
    try {
      const content = await fs.readFile(file, 'utf8');
      let match;
      while ((match = CLASS_REGEX.exec(content)) !== null) {
        const raw = match[1] || match[3];
        if (raw) {
          const parts = raw.split(SPLIT_REGEX);
          for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.length > 1 && !trimmed.includes('<')) {
              classes.add(trimmed);
            }
          }
        }
      }
    } catch (e) {
      console.warn(`Error processing ${file}:`, e);
    }
  }));

  return Array.from(classes).sort();
}

export function escapeClassName(name: string): string {
  return name.replace(/([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
}