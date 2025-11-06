import { HumanizeOptions } from "../types";

/**
 * Compact preset - minimal formatting, no spaces, no decimals
 */
export const compact: HumanizeOptions = {
  precision: 0,
  spacer: "",
  round: true,
  lowercase: false,
};

/**
 * Verbose preset - full unit names, maximum readability
 */
export const verbose: HumanizeOptions = {
  precision: 2,
  spacer: " ",
  verboseUnits: true,
  lowercase: false,
};

/**
 * Financial preset - currency-style formatting with proper delimiters
 */
export const financial: HumanizeOptions = {
  precision: 2,
  delimiter: ",",
  separator: ".",
  spacer: "",
  round: false,
};

/**
 * Scientific preset - scientific notation for very large/small numbers
 */
export const scientific: HumanizeOptions = {
  precision: 3,
  scientific: true,
  spacer: " ",
};

/**
 * Approximate preset - rounded with approximation symbol
 */
export const approximate: HumanizeOptions = {
  precision: 1,
  approximate: true,
  round: false,
  spacer: " ",
};

/**
 * Metric preset - explicit metric system
 */
export const metric: HumanizeOptions = {
  unitSystem: "metric",
  precision: 2,
  spacer: " ",
};

/**
 * Imperial preset - explicit imperial system
 */
export const imperial: HumanizeOptions = {
  unitSystem: "imperial",
  precision: 2,
  spacer: " ",
};

/**
 * Minimal preset - absolute minimal formatting
 */
export const minimal: HumanizeOptions = {
  precision: 0,
  spacer: "",
  delimiter: "",
  round: true,
};

/**
 * Detailed preset - maximum detail and precision
 */
export const detailed: HumanizeOptions = {
  precision: 4,
  spacer: " ",
  delimiter: ",",
  verboseUnits: true,
};

/**
 * Collection of all presets
 */
export const presets = {
  compact,
  verbose,
  financial,
  scientific,
  approximate,
  metric,
  imperial,
  minimal,
  detailed,
};

/**
 * Get preset by name
 */
export function getPreset(name: keyof typeof presets): HumanizeOptions {
  return presets[name];
}
