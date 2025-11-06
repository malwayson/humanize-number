// Data units (bytes)
export const DATA_UNITS = {
  metric: [
    { value: 1024 ** 4, symbol: "TB", name: "terabytes" },
    { value: 1024 ** 3, symbol: "GB", name: "gigabytes" },
    { value: 1024 ** 2, symbol: "MB", name: "megabytes" },
    { value: 1024, symbol: "KB", name: "kilobytes" },
    { value: 1, symbol: "B", name: "bytes" },
  ],
  imperial: [
    { value: 1024 ** 4, symbol: "TB", name: "terabytes" },
    { value: 1024 ** 3, symbol: "GB", name: "gigabytes" },
    { value: 1024 ** 2, symbol: "MB", name: "megabytes" },
    { value: 1024, symbol: "KB", name: "kilobytes" },
    { value: 1, symbol: "B", name: "bytes" },
  ],
};

// Weight units
export const WEIGHT_UNITS = {
  metric: [
    { value: 1000000, symbol: "t", name: "metric tons" },
    { value: 1000, symbol: "kg", name: "kilograms" },
    { value: 1, symbol: "g", name: "grams" },
    { value: 0.001, symbol: "mg", name: "milligrams" },
  ],
  imperial: [
    { value: 907184.74, symbol: "ton", name: "short tons" },
    { value: 453.592, symbol: "lb", name: "pounds" },
    { value: 28.3495, symbol: "oz", name: "ounces" },
    { value: 1, symbol: "gr", name: "grains" },
  ],
};

// Distance units
export const DISTANCE_UNITS = {
  metric: [
    { value: 1000000, symbol: "Mm", name: "megameters" },
    { value: 1000, symbol: "km", name: "kilometers" },
    { value: 1, symbol: "m", name: "meters" },
    { value: 0.01, symbol: "cm", name: "centimeters" },
    { value: 0.001, symbol: "mm", name: "millimeters" },
  ],
  imperial: [
    { value: 1609.344, symbol: "mi", name: "miles" },
    { value: 1609.344 / 1760, symbol: "yd", name: "yards" },
    { value: 0.3048, symbol: "ft", name: "feet" },
    { value: 0.0254, symbol: "in", name: "inches" },
    { value: 1, symbol: "m", name: "meters" },
  ],
};

// Currency units
export const CURRENCY_UNITS = {
  metric: [
    { value: 1000000000000, symbol: "T", name: "trillion" },
    { value: 1000000000, symbol: "B", name: "billion" },
    { value: 1000000, symbol: "M", name: "million" },
    { value: 1000, symbol: "K", name: "thousand" },
    { value: 1, symbol: "", name: "" },
  ],
  imperial: [
    { value: 1000000000000, symbol: "T", name: "trillion" },
    { value: 1000000000, symbol: "B", name: "billion" },
    { value: 1000000, symbol: "M", name: "million" },
    { value: 1000, symbol: "K", name: "thousand" },
    { value: 1, symbol: "", name: "" },
  ],
};

// Generic units
export const GENERIC_UNITS = {
  metric: [
    { value: 1000000000000, symbol: "T", name: "trillion" },
    { value: 1000000000, symbol: "B", name: "billion" },
    { value: 1000000, symbol: "M", name: "million" },
    { value: 1000, symbol: "K", name: "thousand" },
    { value: 1, symbol: "", name: "" },
  ],
  imperial: [
    { value: 1000000000000, symbol: "T", name: "trillion" },
    { value: 1000000000, symbol: "B", name: "billion" },
    { value: 1000000, symbol: "M", name: "million" },
    { value: 1000, symbol: "K", name: "thousand" },
    { value: 1, symbol: "", name: "" },
  ],
};

// Temperature units (base is Celsius)
export const TEMPERATURE_UNITS = {
  metric: [{ value: 1, symbol: "°C", name: "celsius" }],
  imperial: [{ value: 1, symbol: "°F", name: "fahrenheit" }],
};

// Duration units (base is seconds)
export const DURATION_UNITS = {
  metric: [
    { value: 31536000, symbol: "y", name: "years" },
    { value: 2592000, symbol: "mo", name: "months" },
    { value: 604800, symbol: "w", name: "weeks" },
    { value: 86400, symbol: "d", name: "days" },
    { value: 3600, symbol: "h", name: "hours" },
    { value: 60, symbol: "m", name: "minutes" },
    { value: 1, symbol: "s", name: "seconds" },
    { value: 0.001, symbol: "ms", name: "milliseconds" },
  ],
  imperial: [
    { value: 31536000, symbol: "y", name: "years" },
    { value: 2592000, symbol: "mo", name: "months" },
    { value: 604800, symbol: "w", name: "weeks" },
    { value: 86400, symbol: "d", name: "days" },
    { value: 3600, symbol: "h", name: "hours" },
    { value: 60, symbol: "m", name: "minutes" },
    { value: 1, symbol: "s", name: "seconds" },
    { value: 0.001, symbol: "ms", name: "milliseconds" },
  ],
};

// Speed units (base is m/s)
export const SPEED_UNITS = {
  metric: [
    { value: 1000 / 3600, symbol: "km/h", name: "kilometers per hour" },
    { value: 1, symbol: "m/s", name: "meters per second" },
    { value: 0.01, symbol: "cm/s", name: "centimeters per second" },
  ],
  imperial: [
    { value: 0.44704, symbol: "mph", name: "miles per hour" },
    { value: 0.3048, symbol: "ft/s", name: "feet per second" },
    { value: 0.514444, symbol: "kn", name: "knots" },
    { value: 1, symbol: "m/s", name: "meters per second" },
  ],
};

// Volume units (base is liters)
export const VOLUME_UNITS = {
  metric: [
    { value: 1000, symbol: "kL", name: "kiloliters" },
    { value: 1, symbol: "L", name: "liters" },
    { value: 0.001, symbol: "mL", name: "milliliters" },
  ],
  imperial: [
    { value: 3.78541, symbol: "gal", name: "gallons" },
    { value: 0.473176, symbol: "qt", name: "quarts" },
    { value: 0.0295735, symbol: "fl oz", name: "fluid ounces" },
    { value: 1, symbol: "L", name: "liters" },
  ],
};

// Percentage units
export const PERCENTAGE_UNITS = {
  metric: [
    { value: 1, symbol: "%", name: "percent" },
    { value: 0.01, symbol: "‰", name: "per mille" },
  ],
  imperial: [
    { value: 1, symbol: "%", name: "percent" },
    { value: 0.01, symbol: "‰", name: "per mille" },
  ],
};

// Export all units
export const UNITS = {
  data: DATA_UNITS,
  weight: WEIGHT_UNITS,
  distance: DISTANCE_UNITS,
  currency: CURRENCY_UNITS,
  generic: GENERIC_UNITS,
  temperature: TEMPERATURE_UNITS,
  duration: DURATION_UNITS,
  speed: SPEED_UNITS,
  volume: VOLUME_UNITS,
  percentage: PERCENTAGE_UNITS,
};
