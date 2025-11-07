import { LocaleCode, LocaleConfig } from "../types";

// Re-export individual locales for tree-shaking
export { deDE } from "./de-DE";
export { enGB } from "./en-GB";
export { enUS } from "./en-US";
export { esES } from "./es-ES";
export { frFR } from "./fr-FR";
export { jaJP } from "./ja-JP";
export { ptBR } from "./pt-BR";
export { ruRU } from "./ru-RU";
export { zhCN } from "./zh-CN";

// Import for locales object
import deDELocale from "./de-DE";
import enGBLocale from "./en-GB";
import enUSLocale from "./en-US";
import esESLocale from "./es-ES";
import frFRLocale from "./fr-FR";
import jaJPLocale from "./ja-JP";
import ptBRLocale from "./pt-BR";
import ruRULocale from "./ru-RU";
import zhCNLocale from "./zh-CN";

/**
 * Locale registry
 */
export const locales: Record<LocaleCode, LocaleConfig> = {
  "en-US": enUSLocale,
  "en-GB": enGBLocale,
  "de-DE": deDELocale,
  "fr-FR": frFRLocale,
  "es-ES": esESLocale,
  "ja-JP": jaJPLocale,
  "zh-CN": zhCNLocale,
  "pt-BR": ptBRLocale,
  "ru-RU": ruRULocale,
};

/**
 * Get locale configuration
 */
export function getLocale(code: LocaleCode): LocaleConfig {
  return locales[code] || enUSLocale;
}

/**
 * Register a custom locale
 */
export function registerLocale(locale: LocaleConfig): void {
  locales[locale.code] = locale;
}
