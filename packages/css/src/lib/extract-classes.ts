import fs from 'fs/promises';
import path from 'path';

const EXTENSIONS = new Set(['.vue', '.js', '.ts', '.jsx', '.tsx', '.html']);

const IGNORED_DIRS = new Set([
  'node_modules', '.git', '.nuxt', 'dist', '.output', 
  '.turbo', 'coverage', 'scripts', 'generated', 'public'
]);

const CLASS_REGEX = /(?:class(?:Name)?|:?class)\s*[:=]\s*["'`]([^"'`]+)["'`]/g;
const SPLIT_REGEX = /\s+/;

const STRING_LITERAL_REGEX = /"((?:[^"\\]|\\.)*)"| '((?:[^'\\]|\\.)*)' | `((?:[^`\\]|\\.)*)` /g;

const COLOR_PAIR_REGEX = /^([a-z][a-z0-9-]+)-([a-z][a-z0-9-]+)$/i;

const COLOR_ATTR_REGEX = /\b(bg|color)\s*=\s*["']([^"']+)["']/gi;

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

      // class= attributes
      while ((match = CLASS_REGEX.exec(content)) !== null) {
        const raw = match[1];
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

      // Color attributes in template (bg="white-black")
      let attrMatch;
      COLOR_ATTR_REGEX.lastIndex = 0;
      while ((attrMatch = COLOR_ATTR_REGEX.exec(content)) !== null) {
        const prefix = attrMatch[1];
        const value = attrMatch[2];
        const idx = value.lastIndexOf('-');
        if (idx > 0) {
          const def = value.slice(0, idx);
          const hover = value.slice(idx + 1);
          classes.add(`${prefix}-${def}`);
          classes.add(`hover:${prefix}-${hover}`);
        }
      }

      // String literals
      let strMatch;
      STRING_LITERAL_REGEX.lastIndex = 0;
      while ((strMatch = STRING_LITERAL_REGEX.exec(content)) !== null) {
        let inner = strMatch[1] || strMatch[2] || strMatch[3] || '';
        inner = inner.replace(/\\(.)/g, '$1');

        const parts = inner.split(SPLIT_REGEX);
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.length > 1 && 
              !trimmed.includes('<') && 
              !trimmed.includes('{') && 
              !trimmed.includes('}') && 
              /^[a-z][a-z0-9:-]*$/i.test(trimmed)) {
            classes.add(trimmed);

            // Color pairs in literals ('white-gray1')
            if (COLOR_PAIR_REGEX.test(trimmed)) {
              const [, def, hover] = trimmed.match(COLOR_PAIR_REGEX)!;
              ['bg', 'color'].forEach(prefix => {
                classes.add(`${prefix}-${def}`);
                classes.add(`hover:${prefix}-${hover}`);
              });
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
  return name.replace(/([ !"#$%&'()*+,./:;<=>?@[\\^`{|}~])/g, '\\$1');
}