// Core types for humanize-number library

// Format methods
export type FormatMethod =
  | "data"
  | "weight"
  | "distance"
  | "currency"
  | "generic"
  | "temperature"
  | "duration"
  | "speed"
  | "volume"
  | "percentage";

// Unit systems
export type UnitSystem = "metric" | "imperial";

// Temperature scales
export type TemperatureScale = "celsius" | "fahrenheit" | "kelvin";

// Locale codes
export type LocaleCode =
  | "en-US"
  | "en-GB"
  | "de-DE"
  | "fr-FR"
  | "es-ES"
  | "ja-JP"
  | "zh-CN"
  | "pt-BR"
  | "ru-RU"
  | "ar-SA"
  | "hi-IN"
  | string;

// Preset names
export type PresetName =
  | "compact"
  | "verbose"
  | "financial"
  | "scientific"
  | "approximate";

// Unit definition interface
export interface UnitDefinition {
  value: number;
  symbol: string;
  name?: string;
}

// Configuration options
export interface HumanizeOptions {
  precision?: number; // Number of decimal places (default: 2)
  separator?: string; // Decimal separator (default: '.')
  delimiter?: string; // Thousands delimiter (default: ',')
  spacer?: string; // Space between number and unit (default: ' ')
  lowercase?: boolean; // Use lowercase units (default: false)
  round?: boolean; // Round to nearest integer (default: false)
  unitSystem?: UnitSystem; // Unit system: 'metric' | 'imperial' (default: 'metric')
  locale?: LocaleCode; // Locale for formatting (default: 'en-US')
  scientific?: boolean; // Use scientific notation (default: false)
  approximate?: boolean; // Add approximation symbol (default: false)
  verboseUnits?: boolean; // Use full unit names instead of symbols (default: false)
  customUnits?: Record<string, string>; // Custom unit labels
  thresholds?: Record<string, number>; // Custom thresholds for unit switching
  temperatureScale?: TemperatureScale; // For temperature formatting
  maxDecimals?: number; // Maximum decimal places (auto-adjust)
  minValue?: number; // Minimum value before switching units
  showSign?: boolean; // Show + for positive numbers (default: false)
}

// Range formatting options
export interface RangeOptions extends HumanizeOptions {
  rangeSeparator?: string; // Separator between range values (default: '-')
  combineUnits?: boolean; // Show unit once for range (default: true)
}

// Batch processing options
export interface BatchOptions extends HumanizeOptions {
  formatMap?: Record<string, FormatMethod | [FormatMethod, HumanizeOptions?]>;
}

// Comparison result
export type ComparisonResult = -1 | 0 | 1;

// Validation error
export interface ValidationError {
  valid: false;
  error: string;
  value: any;
}

// Validation success
export interface ValidationSuccess<T> {
  valid: true;
  value: T;
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

// Parsed humanized value
export interface ParsedValue {
  value: number;
  unit: string;
  formatMethod: FormatMethod;
  unitSystem: UnitSystem;
}

// Locale configuration
export interface LocaleConfig {
  code: LocaleCode;
  decimal: string;
  thousands: string;
  units: {
    [key in FormatMethod]?: Record<string, string>;
  };
  suffixes?: {
    thousand?: string;
    million?: string;
    billion?: string;
    trillion?: string;
  };
}
