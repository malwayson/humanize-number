import { LocaleCode, LocaleConfig } from "../types";

// English (US)
export const enUS: LocaleConfig = {
  code: "en-US",
  decimal: ".",
  thousands: ",",
  units: {},
  suffixes: {
    thousand: "K",
    million: "M",
    billion: "B",
    trillion: "T",
  },
};

// English (GB)
export const enGB: LocaleConfig = {
  code: "en-GB",
  decimal: ".",
  thousands: ",",
  units: {},
  suffixes: {
    thousand: "K",
    million: "M",
    billion: "B",
    trillion: "T",
  },
};

// German
export const deDE: LocaleConfig = {
  code: "de-DE",
  decimal: ",",
  thousands: ".",
  units: {},
  suffixes: {
    thousand: "Tsd",
    million: "Mio",
    billion: "Mrd",
    trillion: "Bio",
  },
};

// French
export const frFR: LocaleConfig = {
  code: "fr-FR",
  decimal: ",",
  thousands: " ",
  units: {},
  suffixes: {
    thousand: "K",
    million: "M",
    billion: "Mrd",
    trillion: "T",
  },
};

// Spanish
export const esES: LocaleConfig = {
  code: "es-ES",
  decimal: ",",
  thousands: ".",
  units: {},
  suffixes: {
    thousand: "mil",
    million: "M",
    billion: "mil M",
    trillion: "B",
  },
};

// Japanese
export const jaJP: LocaleConfig = {
  code: "ja-JP",
  decimal: ".",
  thousands: ",",
  units: {},
  suffixes: {
    thousand: "千",
    million: "百万",
    billion: "十億",
    trillion: "兆",
  },
};

// Chinese (Simplified)
export const zhCN: LocaleConfig = {
  code: "zh-CN",
  decimal: ".",
  thousands: ",",
  units: {},
  suffixes: {
    thousand: "千",
    million: "百万",
    billion: "十亿",
    trillion: "万亿",
  },
};

// Portuguese (Brazil)
export const ptBR: LocaleConfig = {
  code: "pt-BR",
  decimal: ",",
  thousands: ".",
  units: {},
  suffixes: {
    thousand: "mil",
    million: "mi",
    billion: "bi",
    trillion: "tri",
  },
};

// Russian
export const ruRU: LocaleConfig = {
  code: "ru-RU",
  decimal: ",",
  thousands: " ",
  units: {},
  suffixes: {
    thousand: "тыс",
    million: "млн",
    billion: "млрд",
    trillion: "трлн",
  },
};

/**
 * Locale registry
 */
export const locales: Record<LocaleCode, LocaleConfig> = {
  "en-US": enUS,
  "en-GB": enGB,
  "de-DE": deDE,
  "fr-FR": frFR,
  "es-ES": esES,
  "ja-JP": jaJP,
  "zh-CN": zhCN,
  "pt-BR": ptBR,
  "ru-RU": ruRU,
};

/**
 * Get locale configuration
 */
export function getLocale(code: LocaleCode): LocaleConfig {
  return locales[code] || enUS;
}

/**
 * Register a custom locale
 */
export function registerLocale(locale: LocaleConfig): void {
  locales[locale.code] = locale;
}
