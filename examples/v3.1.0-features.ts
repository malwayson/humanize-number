/**
 * v3.1.0 Examples - Plugin System & Currency Symbols
 * Practical examples of new features
 */

import {
  examplePlugins,
  FormatPlugin,
  humanizeCurrency,
  humanizeNumber,
  parseWithPlugin,
  registerPlugin,
} from "../src/index";

console.log("=== v3.1.0 Feature Examples ===\n");

// ============================================================================
// CURRENCY SYMBOL FEATURE
// ============================================================================

console.log("--- Currency Symbol Examples ---");

// Basic usage with different currencies
console.log("USD:", humanizeCurrency(1500000));
console.log("EUR:", humanizeCurrency(1500000, { currencySymbol: "€" }));
console.log("GBP:", humanizeCurrency(1500000, { currencySymbol: "£" }));
console.log("JPY:", humanizeCurrency(1500000, { currencySymbol: "¥" }));
console.log("INR:", humanizeCurrency(1500000, { currencySymbol: "₹" }));
console.log();

// Currency position
console.log(
  "Prefix (default):",
  humanizeCurrency(2500000, { currencySymbol: "$" })
);
console.log(
  "Suffix:",
  humanizeCurrency(2500000, {
    currencySymbol: "EUR",
    currencyPosition: "suffix",
  })
);
console.log();

// Real-world scenarios
console.log(
  "Stock Market Cap:",
  humanizeCurrency(2500000000000, { currencySymbol: "$", precision: 1 })
);
console.log(
  "Startup Valuation:",
  humanizeCurrency(150000000, { currencySymbol: "$" })
);
console.log(
  "Annual Salary:",
  humanizeCurrency(125000, { currencySymbol: "$", precision: 0 })
);
console.log(
  "Revenue (EU):",
  humanizeCurrency(5000000, { currencySymbol: "€", currencyPosition: "suffix" })
);
console.log();

// With other options
console.log(
  "Approximate:",
  humanizeCurrency(1500000, { currencySymbol: "$", approximate: true })
);
console.log(
  "Verbose:",
  humanizeCurrency(2500000, { currencySymbol: "$", verboseUnits: true })
);
console.log("Negative:", humanizeCurrency(-5000, { currencySymbol: "£" }));
console.log(
  "With Sign:",
  humanizeCurrency(3000, { currencySymbol: "$", showSign: true })
);
console.log();

// ============================================================================
// PLUGIN SYSTEM
// ============================================================================

console.log("--- Plugin System Examples ---");

// Register example plugins
registerPlugin(examplePlugins.seismic);
registerPlugin(examplePlugins.radiation);
registerPlugin(examplePlugins.altitude);
registerPlugin(examplePlugins.decibel);
registerPlugin(examplePlugins.ph);
registerPlugin(examplePlugins.luminosity);

// Seismic (Earthquake magnitude)
console.log("\n** Seismic/Earthquake Magnitude **");
console.log("Moderate:", humanizeNumber(5.5, "seismic" as any));
console.log("Strong:", humanizeNumber(6.8, "seismic" as any));
console.log("Major:", humanizeNumber(7.5, "seismic" as any));
console.log("Great:", humanizeNumber(9.1, "seismic" as any)); // 2011 Tōhoku

// Radiation
console.log("\n** Radiation Dose **");
console.log("Chest X-ray:", humanizeNumber(0.000025, "radiation" as any));
console.log("Annual background:", humanizeNumber(0.001, "radiation" as any));
console.log("CT scan:", humanizeNumber(0.01, "radiation" as any));
console.log("Lethal dose:", humanizeNumber(5, "radiation" as any));

// Altitude
console.log("\n** Altitude **");
console.log("Commercial flight:", humanizeNumber(10000, "altitude" as any));
console.log(
  "Mt. Everest (metric):",
  humanizeNumber(8848, "altitude" as any, { unitSystem: "metric" })
);
console.log("Stratosphere:", humanizeNumber(50000, "altitude" as any));

// Decibel
console.log("\n** Sound Levels (Decibels) **");
console.log("Whisper:", humanizeNumber(30, "decibel" as any));
console.log("Normal conversation:", humanizeNumber(60, "decibel" as any));
console.log("Heavy traffic:", humanizeNumber(85, "decibel" as any));
console.log("Rock concert:", humanizeNumber(120, "decibel" as any));

// pH
console.log("\n** pH Levels **");
console.log("Battery acid:", humanizeNumber(1.0, "ph" as any));
console.log("Lemon juice:", humanizeNumber(2.5, "ph" as any));
console.log("Pure water:", humanizeNumber(7.0, "ph" as any));
console.log("Baking soda:", humanizeNumber(9.0, "ph" as any));
console.log("Bleach:", humanizeNumber(13.0, "ph" as any));

// Luminosity
console.log("\n** Light Output (Lumens) **");
console.log("Candle:", humanizeNumber(12, "luminosity" as any));
console.log("60W bulb:", humanizeNumber(800, "luminosity" as any));
console.log("Bright LED:", humanizeNumber(5000, "luminosity" as any));
console.log("Stadium lights:", humanizeNumber(500000, "luminosity" as any));

// ============================================================================
// CUSTOM PLUGIN CREATION
// ============================================================================

console.log("\n--- Custom Plugin Examples ---");

// Wind Speed Plugin
const windSpeedPlugin: FormatPlugin = {
  name: "windSpeed",
  formatMethod: "wind-speed",
  units: {
    metric: [
      { value: 1000 / 3600, symbol: "km/h", name: "kilometers per hour" },
      { value: 1, symbol: "m/s", name: "meters per second" },
    ],
    imperial: [
      { value: 0.44704, symbol: "mph", name: "miles per hour" },
      { value: 0.514444, symbol: "kn", name: "knots" },
    ],
  },
  defaultOptions: {
    precision: 1,
    unitSystem: "imperial",
  },
};

registerPlugin(windSpeedPlugin);

console.log("\n** Wind Speed **");
console.log("Light breeze:", humanizeNumber(5, "wind-speed" as any));
console.log("Moderate wind:", humanizeNumber(15, "wind-speed" as any));
console.log("Strong wind:", humanizeNumber(25, "wind-speed" as any));
console.log(
  "Gale (metric):",
  humanizeNumber(20, "wind-speed" as any, { unitSystem: "metric" })
);

// Beaufort Scale Plugin with Custom Formatter
const beaufortPlugin: FormatPlugin = {
  name: "beaufort",
  formatMethod: "beaufort",
  units: {
    metric: [{ value: 1, symbol: "Bf", name: "Beaufort" }],
    imperial: [{ value: 1, symbol: "Bf", name: "Beaufort" }],
  },
  defaultOptions: {
    precision: 0,
  },
  formatter: (value, unit, options) => {
    // Convert m/s to Beaufort scale (0-12)
    const beaufort = Math.round(Math.pow(value / 0.836, 2 / 3));
    const clamped = Math.max(0, Math.min(12, beaufort));

    const descriptions = [
      "Calm",
      "Light air",
      "Light breeze",
      "Gentle breeze",
      "Moderate breeze",
      "Fresh breeze",
      "Strong breeze",
      "High wind",
      "Gale",
      "Strong gale",
      "Storm",
      "Violent storm",
      "Hurricane",
    ];

    return `${clamped} ${unit.symbol} (${descriptions[clamped]})`;
  },
};

registerPlugin(beaufortPlugin);

console.log("\n** Beaufort Wind Scale **");
console.log("Calm:", humanizeNumber(0.5, "beaufort" as any));
console.log("Light breeze:", humanizeNumber(3, "beaufort" as any));
console.log("Moderate breeze:", humanizeNumber(7, "beaufort" as any));
console.log("Gale:", humanizeNumber(17, "beaufort" as any));
console.log("Storm:", humanizeNumber(25, "beaufort" as any));
console.log("Hurricane:", humanizeNumber(35, "beaufort" as any));

// Blood Alcohol Content Plugin
const bacPlugin: FormatPlugin = {
  name: "bac",
  formatMethod: "bac",
  units: {
    metric: [
      { value: 1, symbol: "‰", name: "permille" },
      { value: 0.1, symbol: "%", name: "percent" },
    ],
    imperial: [{ value: 1, symbol: "%", name: "percent" }],
  },
  defaultOptions: {
    precision: 2,
  },
  formatter: (value, unit, options) => {
    const formatted = (value * 100).toFixed(options.precision || 2);
    return `${formatted}${options.spacer || ""}${unit.symbol}`;
  },
};

registerPlugin(bacPlugin);

console.log("\n** Blood Alcohol Content **");
console.log("Sober:", humanizeNumber(0, "bac" as any));
console.log("Legal limit (US):", humanizeNumber(0.0008, "bac" as any));
console.log("Impaired:", humanizeNumber(0.002, "bac" as any));

// Air Quality Index Plugin
const aqiPlugin: FormatPlugin = {
  name: "aqi",
  formatMethod: "aqi",
  units: {
    metric: [{ value: 1, symbol: "AQI", name: "Air Quality Index" }],
    imperial: [{ value: 1, symbol: "AQI", name: "Air Quality Index" }],
  },
  defaultOptions: {
    precision: 0,
  },
  formatter: (value, unit, options) => {
    const rounded = Math.round(value);
    let category = "";

    if (rounded <= 50) category = "Good";
    else if (rounded <= 100) category = "Moderate";
    else if (rounded <= 150) category = "Unhealthy (sensitive)";
    else if (rounded <= 200) category = "Unhealthy";
    else if (rounded <= 300) category = "Very Unhealthy";
    else category = "Hazardous";

    return `${rounded} ${unit.symbol} (${category})`;
  },
};

registerPlugin(aqiPlugin);

console.log("\n** Air Quality Index **");
console.log("Clean air:", humanizeNumber(25, "aqi" as any));
console.log("Moderate:", humanizeNumber(75, "aqi" as any));
console.log("Unhealthy:", humanizeNumber(175, "aqi" as any));
console.log("Hazardous:", humanizeNumber(350, "aqi" as any));

// ============================================================================
// PLUGIN WITH PARSER
// ============================================================================

console.log("\n--- Plugin Parser Examples ---");

// Seismic has a parser
const parsedSeismic = parseWithPlugin("7.5 M", "seismic");
console.log("Parsed '7.5 M':", parsedSeismic);

const parsedSeismic2 = parseWithPlugin("6.8 M", "seismic");
console.log("Parsed '6.8 M':", parsedSeismic2);

// Invalid parse
const invalid = parseWithPlugin("invalid", "seismic");
console.log("Parsed 'invalid':", invalid);

// ============================================================================
// COMBINED FEATURES
// ============================================================================

console.log("\n--- Combined Features ---");

// Currency with all options
console.log(
  "Full options:",
  humanizeCurrency(1234567.89, {
    currencySymbol: "€",
    currencyPosition: "suffix",
    precision: 3,
    delimiter: ".",
    separator: ",",
    approximate: true,
    verboseUnits: true,
  })
);

// Multiple plugins working together
console.log("\nEnvironmental Dashboard:");
console.log("  Temperature:", humanizeNumber(22.5, "temperature"));
console.log("  Air Quality:", humanizeNumber(45, "aqi" as any));
console.log("  Wind Speed:", humanizeNumber(8, "wind-speed" as any));
console.log("  pH (rain):", humanizeNumber(5.6, "ph" as any));

console.log("\nEarthquake Report:");
console.log("  Magnitude:", humanizeNumber(6.8, "seismic" as any));
console.log("  Radiation (normal):", humanizeNumber(0.001, "radiation" as any));

console.log("\nFinancial Summary:");
console.log(
  "  Market Cap:",
  humanizeCurrency(150000000000, { currencySymbol: "$", precision: 1 })
);
console.log("  Revenue:", humanizeCurrency(5000000, { currencySymbol: "$" }));
console.log("  Profit:", humanizeCurrency(750000, { currencySymbol: "$" }));
console.log("  Loss:", humanizeCurrency(-250000, { currencySymbol: "$" }));

console.log("\n=== Examples Complete! ===");
