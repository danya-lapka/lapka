import { Plugin, ViteDevServer } from 'vite';
import { generateCss, THEME_COLORS } from './engine';

export default function lapkaCss(): Plugin {
  // ВАЖНО: Используем расширение .css, чтобы Vite обработал это как стили
  const virtualId = 'virtual:lapka.css';
  const resolvedId = '\0' + virtualId;
  const cssFileName = 'lapka-styles.css';

  const knownClasses = new Set<string>();
  const themeColorKeys = new Set(Object.keys(THEME_COLORS));
  let server: ViteDevServer | null = null;

  const scanCode = (code: string) => {
    let hasNew = false;
    const matches = code.match(/([a-z0-9@:\[\]-]+)/gi);
    if (matches) {
      matches.forEach(m => {
        if (m.length > 2 && !m.includes('<') && !m.includes('=') && !m.includes(' ')) {
          if (!knownClasses.has(m)) {
            knownClasses.add(m);
            hasNew = true;
          }
        }
      });
    }

    const stringLiterals = code.match(/(["'`])(.*?)\1/g);
    if (stringLiterals) {
      stringLiterals.forEach(literal => {
        const content = literal.slice(1, -1);
        if (content.includes('/')) {
          const parts = content.split('/');
          if (parts.length === 2 && themeColorKeys.has(parts[0]) && themeColorKeys.has(parts[1])) {
            const [base, hover] = parts;
            const newPairs = [
                `bg-${base}`, `hover:bg-${hover}`,
                `color-${base}`, `hover:color-${hover}`,
                `border-${base}`, `hover:border-${hover}`,
                `outline-${base}`, `hover:outline-${hover}`
            ];
            newPairs.forEach(cls => {
                if (!knownClasses.has(cls)) {
                    knownClasses.add(cls);
                    hasNew = true;
                }
            });
          }
        }
      });
    }
    return hasNew;
  };

  return {
    name: '@danya-lapka/css-vite',
    
    // Получаем доступ к серверу Vite для ручной инвалидации
    configureServer(_server) {
      server = _server;
    },

    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },

    load(id) {
      if (id === resolvedId) {
        return generateCss(knownClasses);
      }
    },

    transformIndexHtml: {
      handler(html, { path, server }) {
        if (server) {
          return html.replace(
            '</head>',
            `<style id="lapka-styles">${generateCss(knownClasses)}</style></head>`
          );
        }
        return html.replace(
          '</head>',
          `<link rel="stylesheet" href="/${cssFileName}">\n</head>`
        );
      }
    },

     generateBundle(options, bundle) {
      if (process.env.NODE_ENV === 'production') {
        const cssContent = generateCss(knownClasses);
        this.emitFile({
          type: 'asset',
          fileName: cssFileName,
          source: cssContent
        });
      }
    },

    transform(code, id) {
      // Игнорируем node_modules и сам CSS файл
      if (/\.(vue|ts|tsx|js|jsx|svelte|astro|mdx)$/.test(id)) {
        const hasNewClasses = scanCode(code);
        
        // КЛЮЧЕВОЙ МОМЕНТ:
        // Если мы нашли новые классы прямо сейчас (при старте или редактировании),
        // мы должны сказать Vite, что наш CSS файл устарел.
        if (hasNewClasses && server) {
          const mod = server.moduleGraph.getModuleById(resolvedId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            
            // Отправляем событие обновления стиля (css-update), а не js-update
            server.ws.send({
              type: 'update',
              updates: [{
                type: 'css-update',
                path: virtualId,
                acceptedPath: virtualId,
                timestamp: Date.now()
              }]
            });
          }
        }
      }
      return null; 
    },

    async handleHotUpdate({ file, server, read }) {
      if (/\.(vue|ts|tsx|js|jsx)$/.test(file)) {
        const code = await read();
        if (scanCode(code)) {
            const mod = server.moduleGraph.getModuleById(resolvedId);
            if (mod) {
                server.moduleGraph.invalidateModule(mod);
                // При HMR тоже явно шлем css-update
                server.ws.send({
                    type: 'update',
                    updates: [{
                        type: 'css-update',
                        path: virtualId,
                        acceptedPath: virtualId,
                        timestamp: Date.now()
                    }]
                });
            }
        }
      }
    }
  };
}