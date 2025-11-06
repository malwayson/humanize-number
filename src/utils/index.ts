import { ValidationResult } from "../types";

/**
 * Validate if a value is a valid number
 */
export function validateNumber(value: any): ValidationResult<number> {
  if (typeof value === "number" && isFinite(value)) {
    return { valid: true, value };
  }

  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && isFinite(parsed)) {
      return { valid: true, value: parsed };
    }
  }

  if (typeof value === "bigint") {
    return { valid: true, value: Number(value) };
  }

  return {
    valid: false,
    error: `Invalid number: expected a finite number, got ${typeof value} (${value})`,
    value,
  };
}

/**
 * Format a number with precision and remove trailing zeros
 */
export function formatWithPrecision(
  value: number,
  precision: number,
  round: boolean = false
): string {
  if (round) {
    return Math.round(value).toString();
  }

  let formatted = value.toFixed(precision);

  // Remove trailing zeros after decimal point
  if (precision > 0) {
    formatted = parseFloat(formatted).toString();
  }

  return formatted;
}

/**
 * Add thousands delimiter to a number string
 */
export function addThousandsDelimiter(
  value: string,
  delimiter: string,
  decimalSeparator: string
): string {
  if (!delimiter) return value.replace(".", decimalSeparator);

  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

  return parts.join(decimalSeparator);
}

/**
 * Convert to scientific notation
 */
export function toScientificNotation(
  value: number,
  precision: number = 2
): string {
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);

  const formattedMantissa = mantissa.toFixed(precision);
  const superscriptExponent = exponent
    .toString()
    .split("")
    .map((digit) => {
      const superscripts: Record<string, string> = {
        "0": "⁰",
        "1": "¹",
        "2": "²",
        "3": "³",
        "4": "⁴",
        "5": "⁵",
        "6": "⁶",
        "7": "⁷",
        "8": "⁸",
        "9": "⁹",
        "-": "⁻",
      };
      return superscripts[digit] || digit;
    })
    .join("");

  return `${formattedMantissa} × 10${superscriptExponent}`;
}

/**
 * Get the appropriate unit for a value
 */
export function findAppropriateUnit<T extends { value: number }>(
  value: number,
  units: T[]
): T {
  const absValue = Math.abs(value);
  return units.find((u) => absValue >= u.value) || units[units.length - 1];
}

/**
 * Apply case transformation to a string
 */
export function applyCase(text: string, lowercase: boolean): string {
  return lowercase ? text.toLowerCase() : text;
}

/**
 * Clean a number string (remove delimiters)
 */
export function cleanNumberString(value: string): string {
  return value.replace(/,/g, "").replace(/\s/g, "");
}

/**
 * Check if a value is within a threshold
 */
export function isWithinThreshold(
  value: number,
  threshold: number | undefined,
  unitValue: number
): boolean {
  if (threshold === undefined) return true;
  return Math.abs(value) >= threshold;
}

/**
 * Format plural forms
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  if (Math.abs(count) === 1) return singular;
  return plural || `${singular}s`;
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key] as any, source[key] as any);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Cache decorator for memoization
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round to nearest multiple
 */
export function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}
