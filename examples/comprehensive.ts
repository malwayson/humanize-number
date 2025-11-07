/**
 * @malwayson/humanize-number v2.0 - Comprehensive Examples
 *
 * This file demonstrates all the new features in version 2.0
 */

import {
  compareHumanized,
  convertSpeed,
  convertTemperature,
  convertVolume,
  humanizeArray,
  humanizeCurrency,
  humanizeData,
  humanizeDistance,
  humanizeDuration,
  humanizeNumber,
  humanizeObject,
  humanizePercentage,
  humanizeRange,
  humanizeSpeed,
  humanizeTemperature,
  humanizeVolume,
  humanizeWeight,
  presets,
  sortHumanized,
} from "../src/index";

console.log("=== @malwayson/humanize-number v2.0 Examples ===\n");

// ==================== NEW FEATURES ====================

console.log("🆕 NEW FEATURE: Temperature Formatting");
console.log("---------------------------------------");
console.log(
  `25°C: ${humanizeTemperature(25, { temperatureScale: "celsius" })}`
);
console.log(`0°C: ${humanizeTemperature(0, { temperatureScale: "celsius" })}`);
console.log(
  `Convert 0°C to Fahrenheit: ${convertTemperature(
    0,
    "celsius",
    "fahrenheit"
  )}°F`
);
console.log(
  `Convert 100°C to Kelvin: ${convertTemperature(100, "celsius", "kelvin")}K\n`
);

console.log("🆕 NEW FEATURE: Duration Formatting");
console.log("------------------------------------");
console.log(`90 seconds: ${humanizeDuration(90)}`);
console.log(`3661 seconds: ${humanizeDuration(3661)}`);
console.log(`86400 seconds (1 day): ${humanizeDuration(86400)}`);
console.log(`604800 seconds (1 week): ${humanizeDuration(604800)}`);
console.log(`0.5 seconds: ${humanizeDuration(0.5)}`);
console.log(`Verbose: ${humanizeDuration(3661, { verboseUnits: true })}\n`);

console.log("🆕 NEW FEATURE: Speed Formatting");
console.log("---------------------------------");
console.log(
  `100 km/h (metric): ${humanizeSpeed(27.78, { unitSystem: "metric" })}`
);
console.log(
  `60 mph (imperial): ${humanizeSpeed(26.82, { unitSystem: "imperial" })}`
);
console.log(
  `Convert 100 km/h to mph: ${convertSpeed(100, "metric", "imperial").toFixed(
    2
  )} mph\n`
);

console.log("🆕 NEW FEATURE: Volume Formatting");
console.log("----------------------------------");
console.log(`1 liter: ${humanizeVolume(1, { unitSystem: "metric" })}`);
console.log(`1 gallon: ${humanizeVolume(3.78541, { unitSystem: "imperial" })}`);
console.log(`500 mL: ${humanizeVolume(0.5, { unitSystem: "metric" })}`);
console.log(
  `Convert 5 gallons to liters: ${convertVolume(
    5,
    "imperial",
    "metric"
  ).toFixed(2)} L\n`
);

console.log("🆕 NEW FEATURE: Percentage Formatting");
console.log("--------------------------------------");
console.log(`0.1234 as percentage: ${humanizePercentage(0.1234)}`);
console.log(`1.5 as percentage: ${humanizePercentage(1.5)}`);
console.log(`0.999 as percentage: ${humanizePercentage(0.999)}\n`);

console.log("🆕 NEW FEATURE: Presets");
console.log("-----------------------");
console.log(`Compact: ${humanizeNumber(1234567, "generic", presets.compact)}`);
console.log(`Verbose: ${humanizeNumber(1000, "weight", presets.verbose)}`);
console.log(
  `Financial: ${humanizeNumber(1234567.89, "currency", presets.financial)}`
);
console.log(
  `Scientific: ${humanizeNumber(1234567890, "generic", presets.scientific)}`
);
console.log(
  `Approximate: ${humanizeNumber(1234, "generic", presets.approximate)}\n`
);

console.log("🆕 NEW FEATURE: Batch Processing");
console.log("---------------------------------");
const sizes = [1024, 1048576, 1073741824];
console.log(`Array of file sizes:`, humanizeArray(sizes, "data"));

const systemStats = {
  cpu: 0.45,
  memory: 8589934592,
  disk: 512000000000,
  uptime: 86400,
};
console.log(
  `System stats:`,
  JSON.stringify(
    humanizeObject(systemStats, {
      cpu: ["percentage"],
      memory: ["data"],
      disk: ["data"],
      uptime: ["duration"],
    }),
    null,
    2
  ),
  "\n"
);

console.log("🆕 NEW FEATURE: Range Formatting");
console.log("---------------------------------");
console.log(
  `Storage range: ${humanizeRange(500000000, 1000000000000, "data")}`
);
console.log(`Weight range: ${humanizeRange(1000, 5000, "weight")}`);
console.log(`Temperature range: 20-30°C\n`);

console.log("🆕 NEW FEATURE: Comparison Utilities");
console.log("-------------------------------------");
console.log(
  `Is 2 GB > 1500 MB? ${compareHumanized("2 GB", "1500 MB", "data") > 0}`
);
console.log(
  `Is 500 MB > 1 GB? ${compareHumanized("500 MB", "1 GB", "data") > 0}`
);

const unsorted = ["2 TB", "500 MB", "1 GB", "128 GB"];
console.log(`Unsorted: ${unsorted.join(", ")}`);
console.log(`Sorted: ${sortHumanized(unsorted, "data").join(", ")}\n`);

console.log("🆕 NEW FEATURE: Advanced Options");
console.log("---------------------------------");
console.log(
  `Show sign: ${humanizeNumber(1234, "generic", { showSign: true })}`
);
console.log(
  `Verbose units: ${humanizeNumber(1500, "weight", { verboseUnits: true })}`
);
console.log(`Lowercase: ${humanizeNumber(1024, "data", { lowercase: true })}`);
console.log(
  `Custom separator: ${humanizeNumber(1234.56, "generic", { separator: "," })}`
);
console.log(`No spacer: ${humanizeNumber(1234, "generic", { spacer: "" })}\n`);

// ==================== EXISTING FEATURES ====================

console.log("\n✅ EXISTING FEATURES (Backward Compatible)");
console.log("===========================================\n");

console.log("Basic Number Formatting:");
console.log(`1,234: ${humanizeNumber(1234)}`);
console.log(`1,234,567: ${humanizeNumber(1234567)}`);
console.log(`1,234,567,890: ${humanizeNumber(1234567890)}\n`);

console.log("Data Sizes:");
console.log(`1024 bytes: ${humanizeData(1024)}`);
console.log(`1048576 bytes: ${humanizeData(1048576)}`);
console.log(`1073741824 bytes: ${humanizeData(1073741824)}\n`);

console.log("Weights:");
console.log(`1000g (metric): ${humanizeWeight(1000)}`);
console.log(
  `1000g (imperial): ${humanizeWeight(1000, { unitSystem: "imperial" })}\n`
);

console.log("Distances:");
console.log(`1000m (metric): ${humanizeDistance(1000)}`);
console.log(
  `1000m (imperial): ${humanizeDistance(1000, { unitSystem: "imperial" })}\n`
);

console.log("Currency:");
console.log(`$1,500,000: ${humanizeCurrency(1500000)}`);
console.log(`$2,800,000,000: ${humanizeCurrency(2800000000)}\n`);

// ==================== REAL-WORLD USE CASES ====================

console.log("\n💡 REAL-WORLD USE CASES");
console.log("========================\n");

console.log("1. Dashboard Metrics:");
const dashboard = {
  activeUsers: 12567,
  totalStorage: 5368709120,
  avgResponseTime: 0.245,
  uptime: 2592000,
  errorRate: 0.0023,
};
console.log(
  JSON.stringify(
    humanizeObject(dashboard, {
      activeUsers: ["generic", presets.compact],
      totalStorage: ["data"],
      avgResponseTime: ["duration"],
      uptime: ["duration"],
      errorRate: ["percentage"],
    }),
    null,
    2
  ),
  "\n"
);

console.log("2. File Upload Progress:");
const uploadedBytes = 52428800; // 50 MB
const totalBytes = 104857600; // 100 MB
console.log(
  `Progress: ${humanizeData(uploadedBytes)} / ${humanizeData(totalBytes)}`
);
console.log(`Range: ${humanizeRange(uploadedBytes, totalBytes, "data")}\n`);

console.log("3. System Monitoring:");
const servers = [
  { name: "Server 1", memory: 8589934592, cpu: 0.65 },
  { name: "Server 2", memory: 17179869184, cpu: 0.42 },
  { name: "Server 3", memory: 34359738368, cpu: 0.89 },
];
servers.forEach((server) => {
  console.log(
    `${server.name}: ${humanizeData(server.memory)} RAM, ${humanizePercentage(
      server.cpu
    )} CPU`
  );
});
console.log();

console.log("4. E-commerce:");
const product = {
  price: 1299.99,
  weight: 850,
  dimensions: "30x20x10 cm",
  inStock: 1234,
};
console.log(`Price: $${product.price}`);
console.log(`Weight: ${humanizeWeight(product.weight)}`);
console.log(
  `Stock: ${humanizeNumber(
    product.inStock,
    "generic",
    presets.compact
  )} units\n`
);

console.log("5. Fitness App:");
const workout = {
  duration: 3600,
  distance: 5000,
  caloriesBurned: 450,
  avgSpeed: 1.39, // m/s
};
console.log(
  `Duration: ${humanizeDuration(workout.duration, { verboseUnits: true })}`
);
console.log(`Distance: ${humanizeDistance(workout.distance)}`);
console.log(`Calories: ${workout.caloriesBurned}`);
console.log(
  `Avg Speed: ${humanizeSpeed(workout.avgSpeed, { unitSystem: "metric" })}\n`
);

console.log("\n🎉 All examples completed successfully!");
console.log("📦 Package: @malwayson/humanize-number v2.0.0");
console.log("📚 Documentation: https://github.com/malwayson/humanize-number");
