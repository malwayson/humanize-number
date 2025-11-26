import { LocaleCode, RelativeTimeOptions } from "../types";

/**
 * Default relative time configuration
 */
const DEFAULT_THRESHOLDS = {
  seconds: 60,
  minutes: 60,
  hours: 24,
  days: 7,
  weeks: 4,
  months: 12,
};

/**
 * Relative time locale strings
 */
const RELATIVE_TIME_LOCALES: Record<LocaleCode, any> = {
  "en-US": {
    past: "{0} ago",
    future: "in {0}",
    now: "just now",
    seconds: { singular: "second", plural: "seconds" },
    minutes: { singular: "minute", plural: "minutes" },
    hours: { singular: "hour", plural: "hours" },
    days: { singular: "day", plural: "days" },
    weeks: { singular: "week", plural: "weeks" },
    months: { singular: "month", plural: "months" },
    years: { singular: "year", plural: "years" },
  },
  "en-GB": {
    past: "{0} ago",
    future: "in {0}",
    now: "just now",
    seconds: { singular: "second", plural: "seconds" },
    minutes: { singular: "minute", plural: "minutes" },
    hours: { singular: "hour", plural: "hours" },
    days: { singular: "day", plural: "days" },
    weeks: { singular: "week", plural: "weeks" },
    months: { singular: "month", plural: "months" },
    years: { singular: "year", plural: "years" },
  },
  "de-DE": {
    past: "vor {0}",
    future: "in {0}",
    now: "gerade eben",
    seconds: { singular: "Sekunde", plural: "Sekunden" },
    minutes: { singular: "Minute", plural: "Minuten" },
    hours: { singular: "Stunde", plural: "Stunden" },
    days: { singular: "Tag", plural: "Tagen" },
    weeks: { singular: "Woche", plural: "Wochen" },
    months: { singular: "Monat", plural: "Monaten" },
    years: { singular: "Jahr", plural: "Jahren" },
  },
  "fr-FR": {
    past: "il y a {0}",
    future: "dans {0}",
    now: "à l'instant",
    seconds: { singular: "seconde", plural: "secondes" },
    minutes: { singular: "minute", plural: "minutes" },
    hours: { singular: "heure", plural: "heures" },
    days: { singular: "jour", plural: "jours" },
    weeks: { singular: "semaine", plural: "semaines" },
    months: { singular: "mois", plural: "mois" },
    years: { singular: "an", plural: "ans" },
  },
  "es-ES": {
    past: "hace {0}",
    future: "en {0}",
    now: "ahora mismo",
    seconds: { singular: "segundo", plural: "segundos" },
    minutes: { singular: "minuto", plural: "minutos" },
    hours: { singular: "hora", plural: "horas" },
    days: { singular: "día", plural: "días" },
    weeks: { singular: "semana", plural: "semanas" },
    months: { singular: "mes", plural: "meses" },
    years: { singular: "año", plural: "años" },
  },
  "ja-JP": {
    past: "{0}前",
    future: "{0}後",
    now: "たった今",
    seconds: { singular: "秒", plural: "秒" },
    minutes: { singular: "分", plural: "分" },
    hours: { singular: "時間", plural: "時間" },
    days: { singular: "日", plural: "日" },
    weeks: { singular: "週間", plural: "週間" },
    months: { singular: "ヶ月", plural: "ヶ月" },
    years: { singular: "年", plural: "年" },
  },
  "zh-CN": {
    past: "{0}前",
    future: "{0}后",
    now: "刚刚",
    seconds: { singular: "秒", plural: "秒" },
    minutes: { singular: "分钟", plural: "分钟" },
    hours: { singular: "小时", plural: "小时" },
    days: { singular: "天", plural: "天" },
    weeks: { singular: "周", plural: "周" },
    months: { singular: "个月", plural: "个月" },
    years: { singular: "年", plural: "年" },
  },
  "pt-BR": {
    past: "há {0}",
    future: "em {0}",
    now: "agora mesmo",
    seconds: { singular: "segundo", plural: "segundos" },
    minutes: { singular: "minuto", plural: "minutos" },
    hours: { singular: "hora", plural: "horas" },
    days: { singular: "dia", plural: "dias" },
    weeks: { singular: "semana", plural: "semanas" },
    months: { singular: "mês", plural: "meses" },
    years: { singular: "ano", plural: "anos" },
  },
  "ru-RU": {
    past: "{0} назад",
    future: "через {0}",
    now: "только что",
    seconds: { singular: "секунду", plural: "секунд" },
    minutes: { singular: "минуту", plural: "минут" },
    hours: { singular: "час", plural: "часов" },
    days: { singular: "день", plural: "дней" },
    weeks: { singular: "неделю", plural: "недель" },
    months: { singular: "месяц", plural: "месяцев" },
    years: { singular: "год", plural: "лет" },
  },
};

/**
 * Format relative time (e.g., "2 hours ago", "in 5 minutes")
 *
 * @param value - Timestamp in milliseconds or seconds ago/from now
 * @param options - Relative time options
 * @returns Humanized relative time string
 */
export function humanizeRelativeTime(
  value: number | Date,
  options: RelativeTimeOptions = {}
): string {
  const {
    locale = "en-US",
    baseDate,
    threshold = DEFAULT_THRESHOLDS,
    style = "long",
    numeric = "auto",
  } = options;

  // Get base timestamp
  const baseTime = baseDate ? baseDate.getTime() : Date.now();

  // Convert to milliseconds difference from base
  let diff: number;
  if (value instanceof Date) {
    diff = baseTime - value.getTime();
  } else if (value < 10000000000) {
    // Likely seconds
    diff = value * 1000;
  } else {
    // Milliseconds
    diff = value;
  }

  const isPast = diff > 0;
  const absDiff = Math.abs(diff);

  // Get locale strings
  const localeStrings =
    RELATIVE_TIME_LOCALES[locale] || RELATIVE_TIME_LOCALES["en-US"];

  // Just now (less than a few seconds)
  if (absDiff < 3000) {
    return localeStrings.now;
  }

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let timeValue: number;
  let unit: { singular: string; plural: string };

  // Determine appropriate unit
  if (years > 0) {
    timeValue = years;
    unit = localeStrings.years;
  } else if (months > 0 && months >= (threshold.months || 12) / 12) {
    timeValue = months;
    unit = localeStrings.months;
  } else if (weeks > 0 && days >= (threshold.days || 7)) {
    timeValue = weeks;
    unit = localeStrings.weeks;
  } else if (days > 0 && hours >= (threshold.hours || 24)) {
    timeValue = days;
    unit = localeStrings.days;
  } else if (hours > 0 && minutes >= (threshold.minutes || 60)) {
    timeValue = hours;
    unit = localeStrings.hours;
  } else if (minutes > 0 && seconds >= (threshold.seconds || 60)) {
    timeValue = minutes;
    unit = localeStrings.minutes;
  } else {
    timeValue = seconds;
    unit = localeStrings.seconds;
  }

  // Format based on style
  const unitName =
    style === "short"
      ? unit.plural.substring(0, 3)
      : style === "narrow"
      ? unit.plural.substring(0, 1)
      : timeValue === 1
      ? unit.singular
      : unit.plural;

  const formattedValue = `${timeValue} ${unitName}`;
  const template = isPast ? localeStrings.past : localeStrings.future;

  return template.replace("{0}", formattedValue);
}

/**
 * Shorthand for formatting past times
 */
export function timeAgo(
  value: number | Date,
  options: RelativeTimeOptions = {}
): string {
  return humanizeRelativeTime(value, options);
}

/**
 * Shorthand for formatting future times
 */
export function timeUntil(
  value: number | Date,
  options: RelativeTimeOptions = {}
): string {
  return humanizeRelativeTime(value, options);
}
