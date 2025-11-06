// Types for format methods
export type FormatMethod =
  | "data"
  | "weight"
  | "distance"
  | "currency"
  | "generic";

// Types for unit systems
export type UnitSystem = "metric" | "imperial";

// Unit definitions for different format methods and unit systems
const UNITS = {
  data: {
    metric: [
      { value: 1024 ** 4, symbol: "TB" },
      { value: 1024 ** 3, symbol: "GB" },
      { value: 1024 ** 2, symbol: "MB" },
      { value: 1024, symbol: "KB" },
      { value: 1, symbol: "B" },
    ],
    imperial: [
      // Same as metric for data
      { value: 1024 ** 4, symbol: "TB" },
      { value: 1024 ** 3, symbol: "GB" },
      { value: 1024 ** 2, symbol: "MB" },
      { value: 1024, symbol: "KB" },
      { value: 1, symbol: "B" },
    ],
  },
  weight: {
    metric: [
      { value: 1000000, symbol: "t" }, // metric tons
      { value: 1000, symbol: "kg" },
      { value: 1, symbol: "g" },
      { value: 0.001, symbol: "mg" },
    ],
    imperial: [
      { value: 907184.74, symbol: "ton" }, // short tons (US)
      { value: 453.592, symbol: "lb" }, // pounds
      { value: 28.3495, symbol: "oz" }, // ounces
      { value: 1, symbol: "gr" }, // grains (base unit for imperial weight)
    ],
  },
  distance: {
    metric: [
      { value: 1000000, symbol: "Mm" }, // megameters
      { value: 1000, symbol: "km" },
      { value: 1, symbol: "m" },
      { value: 0.01, symbol: "cm" },
      { value: 0.001, symbol: "mm" },
    ],
    imperial: [
      { value: 1609.344, symbol: "mi" }, // miles
      { value: 1609.344 / 3, symbol: "yd" }, // yards (approximation)
      { value: 0.3048, symbol: "ft" }, // feet
      { value: 0.0254, symbol: "in" }, // inches
      { value: 1, symbol: "m" }, // use meters as base for conversion
    ],
  },
  currency: {
    metric: [
      { value: 1000000000, symbol: "B" }, // billions
      { value: 1000000, symbol: "M" }, // millions
      { value: 1000, symbol: "K" }, // thousands
      { value: 1, symbol: "" },
    ],
    imperial: [
      // Same as metric for currency
      { value: 1000000000, symbol: "B" }, // billions
      { value: 1000000, symbol: "M" }, // millions
      { value: 1000, symbol: "K" }, // thousands
      { value: 1, symbol: "" },
    ],
  },
  generic: {
    metric: [
      { value: 1000000000000, symbol: "T" }, // trillions
      { value: 1000000000, symbol: "B" }, // billions
      { value: 1000000, symbol: "M" }, // millions
      { value: 1000, symbol: "K" }, // thousands
      { value: 1, symbol: "" },
    ],
    imperial: [
      // Same as metric for generic
      { value: 1000000000000, symbol: "T" }, // trillions
      { value: 1000000000, symbol: "B" }, // billions
      { value: 1000000, symbol: "M" }, // millions
      { value: 1000, symbol: "K" }, // thousands
      { value: 1, symbol: "" },
    ],
  },
};

// Configuration options
export interface HumanizeOptions {
  precision?: number; // Number of decimal places (default: 2)
  separator?: string; // Decimal separator (default: '.')
  delimiter?: string; // Thousands delimiter (default: ',')
  spacer?: string; // Space between number and unit (default: ' ')
  lowercase?: boolean; // Use lowercase units (default: false)
  round?: boolean; // Round to nearest integer (default: false)
  unitSystem?: UnitSystem; // Unit system to use (default: 'metric')
}

/**
 * Converts a number into a human-readable format
 * @param value - The number to convert
 * @param formatMethod - The format method to use (optional, defaults to 'generic')
 * @param options - Additional formatting options
 * @returns Formatted string representation of the number
 */
export function humanizeNumber(
  value: number,
  formatMethod: FormatMethod = "generic",
  options: HumanizeOptions = {}
): string {
  // Default options
  const {
    precision = 2,
    separator = ".",
    delimiter = ",",
    spacer = " ",
    lowercase = false,
    round = false,
    unitSystem = "metric",
  } = options;

  // Handle edge cases
  if (value === 0) {
    const baseUnit = getBaseUnit(formatMethod, unitSystem, lowercase);
    return `0${baseUnit ? spacer : ""}${baseUnit}`;
  }
  if (!isFinite(value)) return value.toString();

  // Get absolute value for calculations
  const absValue = Math.abs(value);
  const isNegative = value < 0;

  // Find the appropriate unit
  const units = UNITS[formatMethod][unitSystem];
  const unit =
    units.find((u) => absValue >= u.value) || units[units.length - 1];

  // Calculate the converted value
  let convertedValue = absValue / unit.value;

  // Apply rounding if requested
  if (round) {
    convertedValue = Math.round(convertedValue);
  }

  // Format the number with precision
  let formattedNumber = convertedValue.toFixed(round ? 0 : precision);

  // Remove trailing zeros after decimal point
  if (!round && precision > 0) {
    formattedNumber = parseFloat(formattedNumber).toString();
  }

  // Add thousands delimiter
  if (delimiter) {
    const parts = formattedNumber.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
    formattedNumber = parts.join(separator);
  } else if (separator !== ".") {
    formattedNumber = formattedNumber.replace(".", separator);
  }

  // Apply case transformation to unit symbol
  let symbol = unit.symbol;
  if (lowercase && symbol) {
    symbol = symbol.toLowerCase();
  }

  // Construct final result
  const sign = isNegative ? "-" : "";
  const space = symbol ? spacer : "";

  return `${sign}${formattedNumber}${space}${symbol}`;
}

/**
 * Get the base unit for a format method
 */
function getBaseUnit(
  formatMethod: FormatMethod,
  unitSystem: UnitSystem = "metric",
  lowercase: boolean = false
): string {
  const units = UNITS[formatMethod][unitSystem];
  const baseUnit = units[units.length - 1].symbol;
  return lowercase ? baseUnit.toLowerCase() : baseUnit;
}

/**
 * Shorthand functions for specific format methods
 */

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

// Imperial system specific functions
export function humanizeWeightImperial(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "weight", {
    ...options,
    unitSystem: "imperial",
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

// Metric system specific functions (explicit)
export function humanizeWeightMetric(
  value: number,
  options?: Omit<HumanizeOptions, "unitSystem">
): string {
  return humanizeNumber(value, "weight", { ...options, unitSystem: "metric" });
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

/**
 * Parse a humanized string back to a number (basic implementation)
 * @param humanizedString - The humanized string to parse
 * @param formatMethod - The format method that was used
 * @param unitSystem - The unit system that was used
 * @returns The original number value
 */
export function parseHumanized(
  humanizedString: string,
  formatMethod: FormatMethod = "generic",
  unitSystem: UnitSystem = "metric"
): number {
  // Remove spaces and get the numeric part and unit
  const trimmed = humanizedString.trim();
  const units = UNITS[formatMethod][unitSystem];

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
  const cleanNumber = numericPart.replace(/,/g, "");
  const number = parseFloat(cleanNumber);

  return isNaN(number) ? 0 : number * multiplier;
}

/**
 * Convert weight from one unit system to another
 * @param value - The weight value in grams (metric) or grains (imperial)
 * @param fromSystem - The source unit system
 * @param toSystem - The target unit system
 * @returns The converted value
 */
export function convertWeight(
  value: number,
  fromSystem: UnitSystem,
  toSystem: UnitSystem
): number {
  if (fromSystem === toSystem) return value;

  // Convert to base unit (grams)
  let grams: number;
  if (fromSystem === "imperial") {
    grams = value; // grains is base for imperial, but we need to convert properly
    // Actually, let's use pounds as more common base for imperial weight
    grams = value * 453.592; // assuming input is in pounds
  } else {
    grams = value; // grams is base for metric
  }

  // Convert from grams to target system
  if (toSystem === "imperial") {
    return grams / 453.592; // convert to pounds
  } else {
    return grams; // return grams
  }
}

/**
 * Convert distance from one unit system to another
 * @param value - The distance value in meters (metric) or feet (imperial)
 * @param fromSystem - The source unit system
 * @param toSystem - The target unit system
 * @returns The converted value
 */
export function convertDistance(
  value: number,
  fromSystem: UnitSystem,
  toSystem: UnitSystem
): number {
  if (fromSystem === toSystem) return value;

  // Convert to base unit (meters)
  let meters: number;
  if (fromSystem === "imperial") {
    meters = value * 0.3048; // assuming input is in feet
  } else {
    meters = value; // meters is base for metric
  }

  // Convert from meters to target system
  if (toSystem === "imperial") {
    return meters / 0.3048; // convert to feet
  } else {
    return meters; // return meters
  }
}

// Default export
export default humanizeNumber;
