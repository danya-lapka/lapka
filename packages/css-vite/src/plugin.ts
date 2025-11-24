import { Plugin } from 'vite';
import { generateCss, THEME_COLORS } from './engine';

export default function lapkaCss(): Plugin {
  const virtualId = 'virtual:lapka-css';
  const resolvedId = '\0' + virtualId;

  // Хранилище классов (Set гарантирует уникальность)
  const knownClasses = new Set<string>();
  const themeColorKeys = new Set(Object.keys(THEME_COLORS));

  // --- СКАНЕР КОДА ---
  const scanCode = (code: string) => {
    // 1. Стандартный поиск: ищем строки, похожие на классы (px-12, hover:bg-red, w-[50px])
    // Регулярка захватывает буквы, цифры, дефисы, двоеточия, скобки и @
    const matches = code.match(/([a-z0-9@:\[\]-]+)/gi);
    if (matches) {
      matches.forEach(m => {
        // Фильтруем мусор: слишком короткие строки или HTML-теги
        if (m.length > 2 && !m.includes('<') && !m.includes('=') && !m.includes(' ')) {
          knownClasses.add(m);
        }
      });
    }

    // 2. Умный поиск пар цветов для пропсов: bg="white-gray1"
    // Находим всё, что в кавычках
    const stringLiterals = code.match(/(["'`])(.*?)\1/g);
    if (stringLiterals) {
      stringLiterals.forEach(literal => {
        const content = literal.slice(1, -1); // убираем кавычки
        
        // Если строка содержит дефис (потенциально "color-hover")
        if (content.includes('-')) {
          const parts = content.split('-');
          // Проверяем: это формат "цвет-цвет" и оба цвета существуют в теме?
          if (parts.length === 2 && themeColorKeys.has(parts[0]) && themeColorKeys.has(parts[1])) {
            const [base, hover] = parts;
            
            // Если нашли пару, добавляем соответствующие классы в пул генерации
            // Это эмулирует то, что делает getColorClasses во Vue компоненте
            knownClasses.add(`bg-${base}`);
            knownClasses.add(`hover:bg-${hover}`);
            
            knownClasses.add(`color-${base}`);
            knownClasses.add(`hover:color-${hover}`);
            
            knownClasses.add(`border-${base}`);
            knownClasses.add(`hover:border-${hover}`);
          }
        }
      });
    }
  };

  return {
    name: 'vite-plugin-atomic-css',
    
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },

    load(id) {
      if (id === resolvedId) {
        return generateCss(knownClasses);
      }
    },

    transform(code, id) {
      // Сканируем только Vue/TS/JS файлы, игнорируем node_modules
      if (/\.(vue|ts|tsx|js|jsx)$/.test(id) && !id.includes('node_modules')) {
        scanCode(code);
      }
      return null; // Возвращаем null, чтобы не менять JS код
    },

    async handleHotUpdate({ file, server, read }) {
      if (/\.(vue|ts|tsx|js|jsx)$/.test(file)) {
        // Читаем обновленный контент файла
        const code = await read();
        
        // Сканируем новые классы
        scanCode(code);
        
        // Уведомляем Vite, что CSS изменился
        const module = server.moduleGraph.getModuleById(resolvedId);
        if (module) {
          server.moduleGraph.invalidateModule(module);
          
          server.ws.send({
            type: 'update',
            updates: [{
              type: 'js-update', // js-update заставит клиент перезапросить модуль
              path: virtualId,
              acceptedPath: virtualId,
              timestamp: Date.now()
            }]
          });
        }
      }
    }
  };
}