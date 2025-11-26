import { FormatMethod, HumanizeOptions, ValueDiff } from "../types";
import { humanizeNumber } from "./index";

/**
 * Calculate and humanize the difference between two values
 *
 * @param oldValue - Previous value
 * @param newValue - Current value
 * @param formatMethod - Format method to use (default: 'generic')
 * @param options - Humanize options
 * @returns ValueDiff object with humanized difference and metadata
 */
export function humanizeDiff(
  oldValue: number,
  newValue: number,
  formatMethod: FormatMethod = "generic",
  options: HumanizeOptions = {}
): ValueDiff {
  const raw = newValue - oldValue;
  const percent =
    oldValue !== 0 ? ((newValue - oldValue) / Math.abs(oldValue)) * 100 : 0;

  // Determine direction
  let direction: "up" | "down" | "unchanged" | "increase" | "decrease";
  if (raw > 0) {
    direction = "increase";
  } else if (raw < 0) {
    direction = "decrease";
  } else {
    direction = "unchanged";
  }

  // Format the difference value
  const humanized = humanizeNumber(Math.abs(raw), formatMethod, {
    ...options,
    showSign: false,
  });

  // Add sign if changed
  const value =
    direction === "increase"
      ? `+${humanized}`
      : direction === "decrease"
      ? `-${humanized}`
      : humanized;

  // Format percentage
  const percentString =
    direction === "unchanged"
      ? "0%"
      : `${direction === "increase" ? "+" : ""}${percent.toFixed(1)}%`;

  return {
    value,
    raw,
    direction,
    percent,
    percentString,
  };
}

/**
 * Compare two humanized values and return comparison result
 *
 * @param a - First value to compare
 * @param b - Second value to compare
 * @param formatMethod - Format method used
 * @param options - Humanize options
 * @returns -1 if a < b, 0 if equal, 1 if a > b
 */
export function compareValues(
  a: number,
  b: number,
  formatMethod: FormatMethod = "generic",
  options: HumanizeOptions = {}
): -1 | 0 | 1 {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Check if value increased
 */
export function isIncrease(oldValue: number, newValue: number): boolean {
  return newValue > oldValue;
}

/**
 * Check if value decreased
 */
export function isDecrease(oldValue: number, newValue: number): boolean {
  return newValue < oldValue;
}

/**
 * Check if value is unchanged
 */
export function isUnchanged(oldValue: number, newValue: number): boolean {
  return newValue === oldValue;
}
