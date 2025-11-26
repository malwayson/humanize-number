// Core types for humanize-number library

// Format methods (v2.0 + v3.0)
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
  | "percentage"
  // v3.0 new formats
  | "area"
  | "energy"
  | "pressure"
  | "frequency"
  | "angle"
  | "power"
  | "transfer-rate"
  | "fraction"
  | "relative-time";

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
  relativeTime?: {
    past: string; // e.g., "{0} ago"
    future: string; // e.g., "in {0}"
    now: string; // e.g., "just now"
    seconds: { singular: string; plural: string };
    minutes: { singular: string; plural: string };
    hours: { singular: string; plural: string };
    days: { singular: string; plural: string };
    weeks: { singular: string; plural: string };
    months: { singular: string; plural: string };
    years: { singular: string; plural: string };
  };
}

// v3.0 New types

// Custom format plugin
export interface FormatPlugin {
  name: string;
  formatMethod: string;
  units: Record<UnitSystem, UnitDefinition[]>;
  defaultOptions?: Partial<HumanizeOptions>;
  formatter?: (
    value: number,
    unit: UnitDefinition,
    options: HumanizeOptions
  ) => string;
}

// Plugin registry
export interface PluginRegistry {
  [formatMethod: string]: FormatPlugin;
}

// Relative time options
export interface RelativeTimeOptions {
  locale?: LocaleCode;
  baseDate?: Date; // Base date for comparison (default: now)
  threshold?: {
    seconds?: number; // Default: 60
    minutes?: number; // Default: 60
    hours?: number; // Default: 24
    days?: number; // Default: 7
    weeks?: number; // Default: 4
    months?: number; // Default: 12
  };
  style?: "long" | "short" | "narrow"; // e.g., "5 minutes" vs "5 min" vs "5m"
  numeric?: "auto" | "always"; // "auto" uses "yesterday", "tomorrow"
}

// Value diff/change result
export interface ValueDiff {
  value: string; // Humanized difference
  raw: number; // Raw numeric difference
  direction: "up" | "down" | "unchanged" | "increase" | "decrease";
  percent: number; // Percentage change
  percentString: string; // Humanized percentage
}

// Template formatter options
export interface TemplateOptions {
  values: Record<string, number>;
  formats: Record<string, FormatMethod | [FormatMethod, HumanizeOptions?]>;
  defaultFormat?: FormatMethod;
  defaultOptions?: HumanizeOptions;
}

// Financial options (v3.0 enhancements)
export interface FinancialOptions extends HumanizeOptions {
  currency?: string; // ISO currency code (USD, EUR, GBP, etc.)
  symbol?: boolean; // Show currency symbol (default: false)
  symbolPosition?: "prefix" | "suffix"; // Symbol placement (default: 'prefix')
  crypto?: boolean; // Treat as cryptocurrency (default: false)
  cryptoSymbol?: string; // Crypto symbol (BTC, ETH, etc.)
  showChange?: boolean; // Show + or - for stock prices (default: false)
}

// Transfer rate options
export interface TransferRateOptions extends HumanizeOptions {
  bits?: boolean; // Use bits instead of bytes (default: false)
  perSecond?: boolean; // Show "/s" suffix (default: true)
}

// Fraction options
export interface FractionOptions {
  maxDenominator?: number; // Maximum denominator (default: 100)
  mixed?: boolean; // Use mixed fractions like "1 1/2" (default: false)
  improper?: boolean; // Allow improper fractions (default: false)
  unicode?: boolean; // Use Unicode fractions (½, ⅓, etc.) (default: false)
}

// LRU Cache options
export interface CacheOptions {
  maxSize?: number; // Maximum cache entries (default: 1000)
  ttl?: number; // Time to live in ms (default: undefined - no expiration)
  enabled?: boolean; // Enable/disable cache (default: true)
}

// Global configuration
export interface GlobalConfig {
  defaultLocale?: LocaleCode;
  defaultUnitSystem?: UnitSystem;
  defaultPrecision?: number;
  cache?: CacheOptions;
  plugins?: PluginRegistry;
}
