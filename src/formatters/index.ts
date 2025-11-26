import { convertTemperature } from "../converters";
import {
  FormatMethod,
  HumanizeOptions,
  TemperatureScale,
  UnitSystem,
} from "../types";
import { UNITS } from "../units";
import {
  addThousandsDelimiter,
  applyCase,
  findAppropriateUnit,
  formatWithPrecision,
  toScientificNotation,
  validateNumber,
} from "../utils";

/**
 * Main humanize function - converts a number to human-readable format
 */
export function humanizeNumber(
  value: number,
  formatMethod: FormatMethod = "generic",
  options: HumanizeOptions = {}
): string {
  // Handle special cases first
  if (!isFinite(value)) {
    if (isNaN(value)) return "NaN";
    return value.toString(); // Infinity or -Infinity
  }

  // Validate input
  const validation = validateNumber(value);
  if (!validation.valid) {
    throw new TypeError(validation.error);
  }
  const validValue = validation.value;

  // Default options
  const {
    precision = 2,
    separator = ".",
    delimiter = ",",
    spacer = " ",
    lowercase = false,
    round = false,
    unitSystem = "metric",
    scientific = false,
    approximate = false,
    verboseUnits = false,
    customUnits = {},
    temperatureScale = "celsius",
    showSign = false,
  } = options;

  if (validValue === 0) {
    const baseUnit = getBaseUnit(
      formatMethod,
      unitSystem,
      verboseUnits,
      customUnits
    );
    return `0${baseUnit ? spacer : ""}${applyCase(baseUnit, lowercase)}`;
  }

  // Handle scientific notation
  if (scientific && formatMethod === "generic") {
    return toScientificNotation(validValue, precision);
  }

  // Handle temperature
  if (formatMethod === "temperature") {
    return formatTemperature(
      validValue,
      temperatureScale,
      unitSystem,
      spacer,
      lowercase
    );
  }

  // Handle percentage
  if (formatMethod === "percentage") {
    return formatPercentage(validValue, precision, separator, spacer);
  }

  // Handle duration
  if (formatMethod === "duration") {
    return formatDuration(validValue, verboseUnits, spacer);
  }

  // Handle transfer-rate (special case with bits/bytes)
  if (formatMethod === "transfer-rate") {
    return formatTransferRate(validValue, options);
  }

  // Get absolute value for calculations
  const absValue = Math.abs(validValue);
  const isNegative = validValue < 0;

  // Find the appropriate unit
  const units = getUnitsForFormat(formatMethod, unitSystem, options);
  const unit = findAppropriateUnit(absValue, units);

  // Calculate the converted value
  let convertedValue = absValue / unit.value;

  // Apply rounding if requested
  if (round) {
    convertedValue = Math.round(convertedValue);
  }

  // Format the number with precision
  let formattedNumber = formatWithPrecision(convertedValue, precision, round);

  // Add thousands delimiter
  formattedNumber = addThousandsDelimiter(
    formattedNumber,
    delimiter,
    separator
  );

  // Get unit symbol or name
  let symbol = verboseUnits ? unit.name || unit.symbol : unit.symbol;
  if (customUnits[unit.symbol]) {
    symbol = customUnits[unit.symbol];
  }

  // Apply case transformation
  symbol = applyCase(symbol, lowercase);

  // Apply approximation symbol
  const approxSymbol = approximate ? "~" : "";

  // Apply sign
  const sign = isNegative ? "-" : showSign && validValue > 0 ? "+" : "";
  const space = symbol ? spacer : "";

  return `${approxSymbol}${sign}${formattedNumber}${space}${symbol}`;
}

/**
 * Get units for a format method (handles special cases)
 */
function getUnitsForFormat(
  formatMethod: FormatMethod,
  unitSystem: UnitSystem,
  options: HumanizeOptions
): any[] {
  // Format methods without units
  if (
    formatMethod === "fraction" ||
    formatMethod === "relative-time" ||
    formatMethod === "percentage" ||
    formatMethod === "duration"
  ) {
    return [];
  }

  if (formatMethod === "transfer-rate") {
    const bits = (options as any).bits || false;
    return (UNITS[formatMethod][unitSystem] as any)[bits ? "bits" : "bytes"];
  }
  
  const formatUnits = (UNITS as any)[formatMethod];
  if (!formatUnits) return [];
  
  return formatUnits[unitSystem] || [];
}

/**
 * Get the base unit for a format method
 */
function getBaseUnit(
  formatMethod: FormatMethod,
  unitSystem: UnitSystem,
  verboseUnits: boolean,
  customUnits: Record<string, string>
): string {
  // Format methods without units
  if (
    formatMethod === "fraction" ||
    formatMethod === "relative-time" ||
    formatMethod === "percentage" ||
    formatMethod === "duration"
  ) {
    return "";
  }

  const formatUnits = (UNITS as any)[formatMethod];
  if (!formatUnits) return "";
  
  const units = formatUnits[unitSystem];
  if (!units || !Array.isArray(units) || units.length === 0) return "";

  const baseUnit = units[units.length - 1];
  if (!baseUnit) return "";

  const symbol = verboseUnits
    ? baseUnit.name || baseUnit.symbol
    : baseUnit.symbol;

  return customUnits[baseUnit.symbol] || symbol;
}

/**
 * Format transfer rate (handles bits vs bytes)
 */
function formatTransferRate(
  value: number,
  options: HumanizeOptions
): string {
  const {
    precision = 2,
    separator = ".",
    delimiter = ",",
    spacer = " ",
    lowercase = false,
    unitSystem = "metric",
    showSign = false,
  } = options;

  const bits = (options as any).bits || false;
  const perSecond = (options as any).perSecond !== false;

  const absValue = Math.abs(value);
  const isNegative = value < 0;

  // Get appropriate units (bits or bytes)
  const units = (UNITS["transfer-rate"][unitSystem] as any)[
    bits ? "bits" : "bytes"
  ];
  const unit = findAppropriateUnit(absValue, units);

  let convertedValue = absValue / unit.value;
  let formattedNumber = formatWithPrecision(convertedValue, precision, false);
  formattedNumber = addThousandsDelimiter(formattedNumber, delimiter, separator);

  const symbol = applyCase((unit as any).symbol || "", lowercase);
  const sign = isNegative ? "-" : showSign && value > 0 ? "+" : "";

  return `${sign}${formattedNumber}${spacer}${symbol}${perSecond ? "/s" : ""}`;
}

/**
 * Format temperature with proper scale conversion
 */
function formatTemperature(
  value: number,
  scale: TemperatureScale,
  unitSystem: UnitSystem,
  spacer: string,
  lowercase: boolean
): string {
  // Determine target scale based on unit system if not specified
  let targetScale = scale;
  if (unitSystem === "imperial" && scale === "celsius") {
    targetScale = "fahrenheit";
  }

  // Convert if needed (assuming input is in Celsius)
  const converted = convertTemperature(value, "celsius", targetScale);

  const symbols: Record<TemperatureScale, string> = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K",
  };

  const symbol = applyCase(symbols[targetScale], lowercase);
  return `${converted.toFixed(1)}${spacer}${symbol}`;
}

/**
 * Format percentage
 */
function formatPercentage(
  value: number,
  precision: number,
  separator: string,
  spacer: string
): string {
  const percentage = (value * 100).toFixed(precision);
  return `${percentage.replace(".", separator)}${spacer}%`;
}

/**
 * Format duration in human-readable format
 */
function formatDuration(
  seconds: number,
  verboseUnits: boolean,
  spacer: string
): string {
  const units = [
    { value: 31536000, symbol: "y", name: "year" },
    { value: 2592000, symbol: "mo", name: "month" },
    { value: 604800, symbol: "w", name: "week" },
    { value: 86400, symbol: "d", name: "day" },
    { value: 3600, symbol: "h", name: "hour" },
    { value: 60, symbol: "m", name: "minute" },
    { value: 1, symbol: "s", name: "second" },
  ];

  if (seconds < 1) {
    const ms = Math.round(seconds * 1000);
    return `${ms}${spacer}${
      verboseUnits ? "millisecond" + (ms !== 1 ? "s" : "") : "ms"
    }`;
  }

  const parts: string[] = [];
  let remaining = Math.abs(seconds);

  for (const unit of units) {
    if (remaining >= unit.value) {
      const count = Math.floor(remaining / unit.value);
      remaining %= unit.value;

      const label = verboseUnits
        ? unit.name + (count !== 1 ? "s" : "")
        : unit.symbol;

      parts.push(`${count}${spacer}${label}`);

      // Limit to 2 most significant units
      if (parts.length >= 2) break;
    }
  }

  return parts.join(" ") || `0${spacer}${verboseUnits ? "seconds" : "s"}`;
}
