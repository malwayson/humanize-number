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

// v3.0: Area units
export const AREA_UNITS = {
  metric: [
    { value: 1000000, symbol: "km²", name: "square kilometers" },
    { value: 10000, symbol: "ha", name: "hectares" },
    { value: 1, symbol: "m²", name: "square meters" },
    { value: 0.01, symbol: "dm²", name: "square decimeters" },
    { value: 0.0001, symbol: "cm²", name: "square centimeters" },
  ],
  imperial: [
    { value: 2589988, symbol: "sq mi", name: "square miles" },
    { value: 4046.86, symbol: "ac", name: "acres" },
    { value: 0.836127, symbol: "sq yd", name: "square yards" },
    { value: 0.092903, symbol: "sq ft", name: "square feet" },
    { value: 0.00064516, symbol: "sq in", name: "square inches" },
  ],
};

// v3.0: Energy units
export const ENERGY_UNITS = {
  metric: [
    { value: 3600000, symbol: "kWh", name: "kilowatt-hours" },
    { value: 4184, symbol: "kcal", name: "kilocalories" },
    { value: 1000, symbol: "kJ", name: "kilojoules" },
    { value: 1, symbol: "J", name: "joules" },
    { value: 0.001, symbol: "mJ", name: "millijoules" },
  ],
  imperial: [
    { value: 1055055.85, symbol: "BTU", name: "British thermal units" },
    { value: 3600000, symbol: "kWh", name: "kilowatt-hours" },
    { value: 4184, symbol: "kcal", name: "kilocalories" },
    { value: 4.184, symbol: "cal", name: "calories" },
    { value: 1, symbol: "J", name: "joules" },
  ],
};

// v3.0: Pressure units
export const PRESSURE_UNITS = {
  metric: [
    { value: 1000000, symbol: "MPa", name: "megapascals" },
    { value: 100000, symbol: "bar", name: "bars" },
    { value: 1000, symbol: "kPa", name: "kilopascals" },
    { value: 1, symbol: "Pa", name: "pascals" },
  ],
  imperial: [
    { value: 101325, symbol: "atm", name: "atmospheres" },
    { value: 6894.76, symbol: "PSI", name: "pounds per square inch" },
    { value: 3386.39, symbol: "inHg", name: "inches of mercury" },
    { value: 133.322, symbol: "mmHg", name: "millimeters of mercury" },
  ],
};

// v3.0: Frequency units
export const FREQUENCY_UNITS = {
  metric: [
    { value: 1000000000, symbol: "GHz", name: "gigahertz" },
    { value: 1000000, symbol: "MHz", name: "megahertz" },
    { value: 1000, symbol: "kHz", name: "kilohertz" },
    { value: 1, symbol: "Hz", name: "hertz" },
  ],
  imperial: [
    { value: 1000000000, symbol: "GHz", name: "gigahertz" },
    { value: 1000000, symbol: "MHz", name: "megahertz" },
    { value: 1000, symbol: "kHz", name: "kilohertz" },
    { value: 1, symbol: "Hz", name: "hertz" },
  ],
};

// v3.0: Angle units
export const ANGLE_UNITS = {
  metric: [
    { value: 1, symbol: "°", name: "degrees" },
    { value: 0.0174533, symbol: "rad", name: "radians" },
    { value: 0.9, symbol: "grad", name: "gradians" },
  ],
  imperial: [
    { value: 1, symbol: "°", name: "degrees" },
    { value: 0.0174533, symbol: "rad", name: "radians" },
    { value: 0.9, symbol: "grad", name: "gradians" },
  ],
};

// v3.0: Power units
export const POWER_UNITS = {
  metric: [
    { value: 1000000, symbol: "MW", name: "megawatts" },
    { value: 1000, symbol: "kW", name: "kilowatts" },
    { value: 1, symbol: "W", name: "watts" },
    { value: 0.001, symbol: "mW", name: "milliwatts" },
  ],
  imperial: [
    { value: 745.7, symbol: "hp", name: "horsepower" },
    { value: 1000, symbol: "kW", name: "kilowatts" },
    { value: 1, symbol: "W", name: "watts" },
    { value: 0.001, symbol: "mW", name: "milliwatts" },
  ],
};

// v3.0: Transfer rate units (bytes per second)
export const TRANSFER_RATE_UNITS = {
  metric: {
    bytes: [
      { value: 1024 ** 4, symbol: "TB/s", name: "terabytes per second" },
      { value: 1024 ** 3, symbol: "GB/s", name: "gigabytes per second" },
      { value: 1024 ** 2, symbol: "MB/s", name: "megabytes per second" },
      { value: 1024, symbol: "KB/s", name: "kilobytes per second" },
      { value: 1, symbol: "B/s", name: "bytes per second" },
    ],
    bits: [
      { value: 1000000000, symbol: "Gbps", name: "gigabits per second" },
      { value: 1000000, symbol: "Mbps", name: "megabits per second" },
      { value: 1000, symbol: "kbps", name: "kilobits per second" },
      { value: 1, symbol: "bps", name: "bits per second" },
    ],
  },
  imperial: {
    bytes: [
      { value: 1024 ** 4, symbol: "TB/s", name: "terabytes per second" },
      { value: 1024 ** 3, symbol: "GB/s", name: "gigabytes per second" },
      { value: 1024 ** 2, symbol: "MB/s", name: "megabytes per second" },
      { value: 1024, symbol: "KB/s", name: "kilobytes per second" },
      { value: 1, symbol: "B/s", name: "bytes per second" },
    ],
    bits: [
      { value: 1000000000, symbol: "Gbps", name: "gigabits per second" },
      { value: 1000000, symbol: "Mbps", name: "megabits per second" },
      { value: 1000, symbol: "kbps", name: "kilobits per second" },
      { value: 1, symbol: "bps", name: "bits per second" },
    ],
  },
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
  // v3.0 additions
  area: AREA_UNITS,
  energy: ENERGY_UNITS,
  pressure: PRESSURE_UNITS,
  frequency: FREQUENCY_UNITS,
  angle: ANGLE_UNITS,
  power: POWER_UNITS,
  "transfer-rate": TRANSFER_RATE_UNITS,
};
