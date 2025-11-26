// Export types
export * from "./types";

// Export main formatter
export { humanizeNumber } from "./formatters";

// Export converters
export {
  convertDistance,
  convertSpeed,
  convertTemperature,
  convertUnits,
  convertVolume,
  convertWeight,
} from "./converters";

// Export presets
export { getPreset, presets } from "./presets";

// Export locale support
export { getLocale, locales, registerLocale } from "./locales";

// Export utils
export {
  formatWithPrecision,
  memoize,
  toScientificNotation,
  validateNumber,
} from "./utils";

// Export v3.0 utilities
export { compareValues, humanizeDiff } from "./formatters/diff";
export { humanizeFraction, parseFraction } from "./formatters/fraction";
export {
  humanizeRelativeTime,
  timeAgo,
  timeUntil,
} from "./formatters/relative-time";
export {
  formatKeyValue,
  formatList,
  formatTableRow,
  formatTemplate,
} from "./formatters/template";
export { globalCache, LRUCache } from "./utils/cache";

// Export units
export { UNITS } from "./units";

// Shorthand functions
import { humanizeNumber } from "./formatters";
import { HumanizeOptions } from "./types";
import { UNITS } from "./units";

export function humanizeData(value: number, options?: HumanizeOptions): string {
  return humanizeNumber(value, "data", options);
}

export function humanizeWeight(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "weight", options);
}

export function humanizeDistance(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "distance", options);
}

export function humanizeCurrency(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "currency", options);
}

export function humanizeTemperature(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "temperature", options);
}

export function humanizeDuration(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "duration", options);
}

export function humanizeSpeed(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "speed", options);
}

export function humanizeVolume(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "volume", options);
}

export function humanizePercentage(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "percentage", options);
}

// New v3.0 format methods
export function humanizeArea(value: number, options?: HumanizeOptions): string {
  return humanizeNumber(value, "area", options);
}

export function humanizeEnergy(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "energy", options);
}

export function humanizePressure(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "pressure", options);
}

export function humanizeFrequency(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "frequency", options);
}

export function humanizeAngle(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "angle", options);
}

export function humanizePower(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "power", options);
}

export function humanizeTransferRate(
  value: number,
  options?: HumanizeOptions
): string {
  return humanizeNumber(value, "transfer-rate", options);
}

// Unit system specific functions
export function humanizeWeightMetric(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "weight", { ...options, unitSystem: "metric" });
}

export function humanizeWeightImperial(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "weight", {
    ...options,
    unitSystem: "imperial",
  });
}

export function humanizeDistanceMetric(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "distance", {
    ...options,
    unitSystem: "metric",
  });
}

export function humanizeDistanceImperial(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "distance", {
    ...options,
    unitSystem: "imperial",
  });
}

export function humanizeSpeedMetric(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "speed", { ...options, unitSystem: "metric" });
}

export function humanizeSpeedImperial(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "speed", { ...options, unitSystem: "imperial" });
}

export function humanizeVolumeMetric(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "volume", { ...options, unitSystem: "metric" });
}

export function humanizeVolumeImperial(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "volume", {
    ...options,
    unitSystem: "imperial",
  });
}

// Parse humanized strings
export function parseHumanized(
  humanizedString: string,
  formatMethod: string = "generic",
  unitSystem: string = "metric"
): number {
  const trimmed = humanizedString.trim().replace(/^[~+]/, ""); // Remove approximation/sign symbols

  // Handle percentage
  if (trimmed.endsWith("%")) {
    const num = parseFloat(trimmed.slice(0, -1));
    return num / 100;
  }

  // Get units for the format method
  const units = (UNITS as any)[formatMethod]?.[unitSystem];
  if (!units) {
    return parseFloat(trimmed) || 0;
  }

  // Find matching unit
  let multiplier = 1;
  let numericPart = trimmed;

  for (const unit of units) {
    if (
      unit.symbol &&
      trimmed.toLowerCase().endsWith(unit.symbol.toLowerCase())
    ) {
      multiplier = unit.value;
      numericPart = trimmed.slice(0, -unit.symbol.length).trim();
      break;
    }
  }

  // Parse the numeric part
  const cleanNumber = numericPart.replace(/,/g, "").replace(/\s/g, "");
  const number = parseFloat(cleanNumber);

  return isNaN(number) ? 0 : number * multiplier;
}

// Batch processing
export function humanizeArray(
  values: number[],
  formatMethod: string = "generic",
  options?: HumanizeOptions
): string[] {
  return values.map((v) => humanizeNumber(v, formatMethod as any, options));
}

export function humanizeObject<T extends Record<string, any>>(
  obj: T,
  formatMap: Record<keyof T, [string, HumanizeOptions?]>
): Record<keyof T, string> {
  const result: any = {};

  for (const key in obj) {
    const config = formatMap[key];
    if (config) {
      const [formatMethod, options] = config;
      result[key] = humanizeNumber(obj[key], formatMethod as any, options);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

// Range formatting
export function humanizeRange(
  min: number,
  max: number,
  formatMethod: string = "generic",
  options: HumanizeOptions & {
    rangeSeparator?: string;
    combineUnits?: boolean;
  } = {}
): string {
  const {
    rangeSeparator = "-",
    combineUnits = true,
    ...formatOptions
  } = options;

  if (combineUnits) {
    // Format both numbers and combine units
    const minFormatted = humanizeNumber(
      min,
      formatMethod as any,
      formatOptions
    );
    const maxFormatted = humanizeNumber(
      max,
      formatMethod as any,
      formatOptions
    );

    // Extract unit from max value
    const unitMatch = maxFormatted.match(/\s*([a-zA-Z°%]+)$/);
    if (unitMatch) {
      const unit = unitMatch[1];
      const minValue = minFormatted.replace(/\s*[a-zA-Z°%]+$/, "");
      const maxValue = maxFormatted.replace(/\s*[a-zA-Z°%]+$/, "");
      return `${minValue}${rangeSeparator}${maxValue} ${unit}`;
    }
  }

  const minFormatted = humanizeNumber(min, formatMethod as any, formatOptions);
  const maxFormatted = humanizeNumber(max, formatMethod as any, formatOptions);
  return `${minFormatted}${rangeSeparator}${maxFormatted}`;
}

// Comparison utilities
export function compareHumanized(
  a: string,
  b: string,
  formatMethod: string = "generic",
  unitSystem: string = "metric"
): -1 | 0 | 1 {
  const aValue = parseHumanized(a, formatMethod, unitSystem);
  const bValue = parseHumanized(b, formatMethod, unitSystem);

  if (aValue < bValue) return -1;
  if (aValue > bValue) return 1;
  return 0;
}

export function isGreaterThan(
  a: string,
  b: string,
  formatMethod: string = "generic",
  unitSystem: string = "metric"
): boolean {
  return compareHumanized(a, b, formatMethod, unitSystem) > 0;
}

export function sortHumanized(
  values: string[],
  formatMethod: string = "generic",
  unitSystem: string = "metric"
): string[] {
  return [...values].sort((a, b) =>
    compareHumanized(a, b, formatMethod, unitSystem)
  );
}

// Default export
export default humanizeNumber;
