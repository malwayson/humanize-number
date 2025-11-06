/**
 * Advanced Features Examples
 *
 * This file demonstrates the advanced features in v2.0:
 * - New format methods (temperature, duration, speed, volume, percentage)
 * - Presets
 * - Localization
 * - Batch processing
 * - Comparison utilities
 */

import {
  compareHumanized,
  convertSpeed,
  convertTemperature,
  convertVolume,
  humanizeArray,
  humanizeDuration,
  humanizeNumber,
  humanizeObject,
  humanizePercentage,
  humanizeRange,
  humanizeSpeed,
  humanizeTemperature,
  humanizeVolume,
  isGreaterThan,
  presets,
  sortHumanized,
} from "../src/index";

console.log("=== Advanced Features Examples ===\n");

// ==================== NEW FORMAT METHODS ====================

console.log("1. Temperature Formatting 🌡️");
console.log("----------------------------");
console.log(`0°C: ${humanizeTemperature(0, { temperatureScale: "celsius" })}`);
console.log(
  `25°C: ${humanizeTemperature(25, { temperatureScale: "celsius" })}`
);
console.log(
  `100°C: ${humanizeTemperature(100, { temperatureScale: "celsius" })}`
);
console.log(
  `32°F: ${humanizeTemperature(32, { temperatureScale: "fahrenheit" })}`
);
console.log(
  `98.6°F: ${humanizeTemperature(98.6, { temperatureScale: "fahrenheit" })}`
);
console.log(
  `273.15 K: ${humanizeTemperature(273.15, { temperatureScale: "kelvin" })}`
);
console.log(`\nConversions:`);
console.log(`  0°C = ${convertTemperature(0, "celsius", "fahrenheit")}°F`);
console.log(`  32°F = ${convertTemperature(32, "fahrenheit", "celsius")}°C`);
console.log(`  100°C = ${convertTemperature(100, "celsius", "kelvin")} K\n`);

console.log("2. Duration Formatting ⏱️");
console.log("-------------------------");
console.log(`0.5 seconds: ${humanizeDuration(0.5)}`);
console.log(`90 seconds: ${humanizeDuration(90)}`);
console.log(`3,661 seconds: ${humanizeDuration(3661)}`);
console.log(`86,400 seconds: ${humanizeDuration(86400)}`);
console.log(`604,800 seconds: ${humanizeDuration(604800)}`);
console.log(`2,592,000 seconds: ${humanizeDuration(2592000)}`);
console.log(`\nVerbose format:`);
console.log(
  `  3,661 seconds: ${humanizeDuration(3661, { verboseUnits: true })}\n`
);

console.log("3. Speed Formatting 🚀");
console.log("----------------------");
console.log(`Metric (m/s input):`);
console.log(`  10 m/s: ${humanizeSpeed(10, { unitSystem: "metric" })}`);
console.log(`  27.78 m/s: ${humanizeSpeed(27.78, { unitSystem: "metric" })}`);
console.log(`\nImperial (m/s input):`);
console.log(`  13.41 m/s: ${humanizeSpeed(13.41, { unitSystem: "imperial" })}`);
console.log(`  26.82 m/s: ${humanizeSpeed(26.82, { unitSystem: "imperial" })}`);
console.log(`\nConversions:`);
console.log(
  `  100 km/h = ${convertSpeed(100, "metric", "imperial").toFixed(2)} mph\n`
);

console.log("4. Volume Formatting 💧");
console.log("-----------------------");
console.log(`Metric (liters input):`);
console.log(`  0.5 L: ${humanizeVolume(0.5, { unitSystem: "metric" })}`);
console.log(`  1 L: ${humanizeVolume(1, { unitSystem: "metric" })}`);
console.log(`  5 L: ${humanizeVolume(5, { unitSystem: "metric" })}`);
console.log(`\nImperial (liters input):`);
console.log(`  0.5 L: ${humanizeVolume(0.5, { unitSystem: "imperial" })}`);
console.log(
  `  3.78541 L: ${humanizeVolume(3.78541, { unitSystem: "imperial" })}`
);
console.log(`\nConversions:`);
console.log(
  `  5 gallons = ${convertVolume(5, "imperial", "metric").toFixed(2)} L\n`
);

console.log("5. Percentage Formatting 📊");
console.log("---------------------------");
console.log(`0.1234: ${humanizePercentage(0.1234)}`);
console.log(`0.5: ${humanizePercentage(0.5)}`);
console.log(`0.999: ${humanizePercentage(0.999)}`);
console.log(`1.5: ${humanizePercentage(1.5)}`);
console.log(`0.00123: ${humanizePercentage(0.00123)}\n`);

// ==================== PRESETS ====================

console.log("6. Presets 🎯");
console.log("-------------");
console.log(`Compact: ${humanizeNumber(1234567, "generic", presets.compact)}`);
console.log(`Verbose: ${humanizeNumber(1000, "weight", presets.verbose)}`);
console.log(
  `Financial: ${humanizeNumber(1234567.89, "currency", presets.financial)}`
);
console.log(
  `Scientific: ${humanizeNumber(1234567890, "generic", presets.scientific)}`
);
console.log(
  `Approximate: ${humanizeNumber(1234, "generic", presets.approximate)}`
);
console.log(`Metric: ${humanizeNumber(1000, "weight", presets.metric)}`);
console.log(`Imperial: ${humanizeNumber(1000, "weight", presets.imperial)}`);
console.log(`Minimal: ${humanizeNumber(1024, "data", presets.minimal)}`);
console.log(
  `Detailed: ${humanizeNumber(1234.5678, "generic", presets.detailed)}\n`
);

// ==================== LOCALIZATION ====================

console.log("7. Localization 🌍");
console.log("------------------");
console.log(
  `English (US): ${humanizeNumber(1234.56, "generic", { locale: "en-US" })}`
);
console.log(
  `English (UK): ${humanizeNumber(1234.56, "generic", { locale: "en-GB" })}`
);
console.log(
  `German: ${humanizeNumber(1234.56, "generic", { locale: "de-DE" })}`
);
console.log(
  `French: ${humanizeNumber(1234.56, "generic", { locale: "fr-FR" })}`
);
console.log(
  `Spanish: ${humanizeNumber(1234.56, "generic", { locale: "es-ES" })}`
);
console.log(
  `Japanese: ${humanizeNumber(1234.56, "generic", { locale: "ja-JP" })}`
);
console.log(
  `Chinese: ${humanizeNumber(1234.56, "generic", { locale: "zh-CN" })}`
);
console.log(
  `Portuguese (BR): ${humanizeNumber(1234.56, "generic", { locale: "pt-BR" })}`
);
console.log(
  `Russian: ${humanizeNumber(1234.56, "generic", { locale: "ru-RU" })}\n`
);

// ==================== BATCH PROCESSING ====================

console.log("8. Batch Processing 📦");
console.log("----------------------");

const fileSizes = [1024, 1048576, 1073741824, 5368709120];
console.log("Array processing:");
console.log(`  Input: [${fileSizes.join(", ")}]`);
console.log(`  Output: [${humanizeArray(fileSizes, "data").join(", ")}]`);

const systemStats = {
  cpu: 0.65,
  memory: 8589934592,
  disk: 512000000000,
  uptime: 86400,
  errorRate: 0.0023,
};
console.log("\nObject processing:");
console.log("  Input:", systemStats);
console.log(
  "  Output:",
  humanizeObject(systemStats, {
    cpu: ["percentage"],
    memory: ["data"],
    disk: ["data"],
    uptime: ["duration"],
    errorRate: ["percentage"],
  })
);

console.log("\nRange formatting:");
console.log(`  Storage: ${humanizeRange(500000000, 1000000000000, "data")}`);
console.log(`  Weight: ${humanizeRange(1000, 5000, "weight")}`);
console.log(`  Distance: ${humanizeRange(100, 10000, "distance")}\n`);

// ==================== COMPARISON UTILITIES ====================

console.log("9. Comparison Utilities 🔍");
console.log("--------------------------");

console.log("Comparing values:");
console.log(`  Is 2 GB > 1500 MB? ${isGreaterThan("2 GB", "1500 MB", "data")}`);
console.log(`  Is 500 MB > 1 GB? ${isGreaterThan("500 MB", "1 GB", "data")}`);
console.log(
  `  Compare 2 GB vs 1500 MB: ${compareHumanized("2 GB", "1500 MB", "data")}`
);
console.log(
  `  Compare 500 MB vs 1 GB: ${compareHumanized("500 MB", "1 GB", "data")}`
);

const unsortedSizes = ["2 TB", "500 MB", "1 GB", "128 GB", "16 KB"];
console.log("\nSorting:");
console.log(`  Unsorted: [${unsortedSizes.join(", ")}]`);
console.log(
  `  Ascending: [${sortHumanized(unsortedSizes, "data").join(", ")}]`
);
console.log(
  `  Descending: [${sortHumanized(unsortedSizes, "data", "desc").join(", ")}]\n`
);

// ==================== SCIENTIFIC NOTATION ====================

console.log("10. Scientific Notation 🔬");
console.log("--------------------------");
console.log(
  `Large number: ${humanizeNumber(123456789, "generic", { scientific: true })}`
);
console.log(
  `Very large: ${humanizeNumber(1e12, "generic", { scientific: true })}`
);
console.log(
  `Extremely large: ${humanizeNumber(9.876543e20, "generic", {
    scientific: true,
  })}\n`
);

// ==================== VERBOSE UNITS ====================

console.log("11. Verbose Units 📝");
console.log("-------------------");
console.log(
  `Weight: ${humanizeNumber(1500, "weight", { verboseUnits: true })}`
);
console.log(
  `Distance: ${humanizeNumber(2500, "distance", { verboseUnits: true })}`
);
console.log(`Data: ${humanizeNumber(2048, "data", { verboseUnits: true })}`);
console.log(`Duration: ${humanizeDuration(3661, { verboseUnits: true })}\n`);

console.log("✅ Advanced features examples completed!");
