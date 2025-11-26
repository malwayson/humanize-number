import { FractionOptions } from "../types";

/**
 * Unicode fraction characters
 */
const UNICODE_FRACTIONS: Record<string, string> = {
  "1/2": "½",
  "1/3": "⅓",
  "2/3": "⅔",
  "1/4": "¼",
  "3/4": "¾",
  "1/5": "⅕",
  "2/5": "⅖",
  "3/5": "⅗",
  "4/5": "⅘",
  "1/6": "⅙",
  "5/6": "⅚",
  "1/7": "⅐",
  "1/8": "⅛",
  "3/8": "⅜",
  "5/8": "⅝",
  "7/8": "⅞",
  "1/9": "⅑",
  "1/10": "⅒",
};

/**
 * Calculate greatest common divisor
 */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Convert decimal to fraction
 *
 * @param decimal - Decimal number to convert
 * @param options - Fraction formatting options
 * @returns Fraction as a string
 */
export function humanizeFraction(
  decimal: number,
  options: FractionOptions = {}
): string {
  const {
    maxDenominator = 100,
    mixed = false,
    improper = false,
    unicode = false,
  } = options;

  // Handle special cases
  if (decimal === 0) return "0";
  if (decimal === 1) return "1";
  if (Number.isInteger(decimal)) return decimal.toString();

  const isNegative = decimal < 0;
  const absDecimal = Math.abs(decimal);

  // Extract whole number for mixed fractions
  let whole = 0;
  let fractionalPart = absDecimal;

  if (mixed && absDecimal > 1) {
    whole = Math.floor(absDecimal);
    fractionalPart = absDecimal - whole;
  }

  // Convert fractional part to fraction
  const tolerance = 1.0e-6;
  let numerator = fractionalPart;
  let denominator = 1;

  // Find best approximation
  let bestNum = 0;
  let bestDen = 1;
  let bestError = Math.abs(fractionalPart);

  for (let den = 1; den <= maxDenominator; den++) {
    const num = Math.round(fractionalPart * den);
    const error = Math.abs(fractionalPart - num / den);

    if (error < bestError) {
      bestNum = num;
      bestDen = den;
      bestError = error;

      if (error < tolerance) break;
    }
  }

  numerator = bestNum;
  denominator = bestDen;

  // Simplify fraction
  const divisor = gcd(numerator, denominator);
  numerator = numerator / divisor;
  denominator = denominator / divisor;

  // Handle improper fractions
  if (!improper && !mixed && numerator > denominator) {
    whole = Math.floor(numerator / denominator);
    numerator = numerator % denominator;
  }

  // Format result
  let result = "";

  // Add whole number
  if (whole > 0) {
    result = whole.toString();
    if (numerator > 0) {
      result += " ";
    }
  }

  // Add fraction
  if (numerator > 0 && denominator > 1) {
    const fractionStr = `${numerator}/${denominator}`;

    // Use Unicode if requested and available
    if (unicode && UNICODE_FRACTIONS[fractionStr]) {
      result += UNICODE_FRACTIONS[fractionStr];
    } else {
      result += fractionStr;
    }
  }

  // Handle case where we only have a whole number
  if (result === "" && whole === 0 && numerator === 0) {
    result = "0";
  }

  // Add negative sign
  if (isNegative) {
    result = "-" + result;
  }

  return result || "0";
}

/**
 * Parse fraction string to decimal
 *
 * @param fraction - Fraction string (e.g., "1/2", "1 1/2", "½")
 * @returns Decimal number
 */
export function parseFraction(fraction: string): number {
  // Normalize Unicode fractions
  let normalized = fraction;
  for (const [ascii, unicode] of Object.entries(UNICODE_FRACTIONS)) {
    normalized = normalized.replace(unicode, ascii);
  }

  // Match patterns: "1/2", "1 1/2", "-1/2"
  const mixedMatch = normalized.match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const [, sign, whole, num, den] = mixedMatch;
    const decimal =
      parseInt(whole) + parseInt(num) / parseInt(den);
    return sign === "-" ? -decimal : decimal;
  }

  const simpleMatch = normalized.match(/^(-?)(\d+)\/(\d+)$/);
  if (simpleMatch) {
    const [, sign, num, den] = simpleMatch;
    const decimal = parseInt(num) / parseInt(den);
    return sign === "-" ? -decimal : decimal;
  }

  // Try parsing as regular number
  return parseFloat(fraction);
}

/**
 * Convert percentage to fraction
 */
export function percentageToFraction(
  percentage: number,
  options: FractionOptions = {}
): string {
  return humanizeFraction(percentage / 100, options);
}
