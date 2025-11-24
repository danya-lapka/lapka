export type CssDeclaration = Record<string, string>;

export type CssRule = {
  selector: string;
  declarations: CssDeclaration;
  media?: string;
  isRawSelector?: boolean; // Добавляем новый флаг
};

export type RuleContext = {
  className: string;
  match: RegExpMatchArray | null;
  value: string | null;
};

export type GenerateFn = (ctx: RuleContext) => CssRule | CssRule[] | null;

export interface BaseRule {
  type: 'static' | 'dynamic';
  meta?: any;
}

export interface StaticRule extends BaseRule {
  type: 'static';
  selector: string;
  declarations: CssDeclaration;
}

export interface DynamicRule extends BaseRule {
  type: 'dynamic';
  prefix: string; // Ключ для оптимизации поиска (например, 'p', 'm', 'bg')
  match: RegExp;
  generate: GenerateFn;
}

export type Rule = StaticRule | DynamicRule;

export type Options = {
  scale?: number;
  unit?: string;
};
