/**
 * Basic Usage Examples
 *
 * This file demonstrates the core features and basic usage
 * of @malwayson/humanize-number v2.0
 */

import {
  humanizeCurrency,
  humanizeData,
  humanizeDistance,
  humanizeNumber,
  humanizeWeight,
} from "../src/index";

console.log("=== Basic Usage Examples ===\n");

// ==================== GENERIC NUMBERS ====================
console.log("1. Generic Number Formatting");
console.log("-----------------------------");
console.log(`1,234: ${humanizeNumber(1234)}`);
console.log(`1,234,567: ${humanizeNumber(1234567)}`);
console.log(`1,234,567,890: ${humanizeNumber(1234567890)}`);
console.log(`12,345,678,901,234: ${humanizeNumber(12345678901234)}\n`);

// ==================== DATA SIZES ====================
console.log("2. Data Size Formatting");
console.log("-----------------------");
console.log(`500 bytes: ${humanizeData(500)}`);
console.log(`1,024 bytes: ${humanizeData(1024)}`);
console.log(`1,048,576 bytes: ${humanizeData(1048576)}`);
console.log(`1,073,741,824 bytes: ${humanizeData(1073741824)}`);
console.log(`1,099,511,627,776 bytes: ${humanizeData(1099511627776)}\n`);

// ==================== WEIGHT ====================
console.log("3. Weight Formatting");
console.log("--------------------");
console.log("Metric System (default):");
console.log(`  100 grams: ${humanizeWeight(100)}`);
console.log(`  1,000 grams: ${humanizeWeight(1000)}`);
console.log(`  1,500 grams: ${humanizeWeight(1500)}`);
console.log(`  5,000,000 grams: ${humanizeWeight(5000000)}`);

console.log("\nImperial System:");
console.log(`  100 grams: ${humanizeWeight(100, { unitSystem: "imperial" })}`);
console.log(
  `  453.592 grams: ${humanizeWeight(453.592, { unitSystem: "imperial" })}`
);
console.log(
  `  1,000 grams: ${humanizeWeight(1000, { unitSystem: "imperial" })}`
);
console.log(
  `  5,000,000 grams: ${humanizeWeight(5000000, { unitSystem: "imperial" })}\n`
);

// ==================== DISTANCE ====================
console.log("4. Distance Formatting");
console.log("----------------------");
console.log("Metric System (default):");
console.log(`  0.5 meters: ${humanizeDistance(0.5)}`);
console.log(`  100 meters: ${humanizeDistance(100)}`);
console.log(`  1,000 meters: ${humanizeDistance(1000)}`);
console.log(`  5,000 meters: ${humanizeDistance(5000)}`);

console.log("\nImperial System:");
console.log(
  `  0.3048 meters: ${humanizeDistance(0.3048, { unitSystem: "imperial" })}`
);
console.log(
  `  100 meters: ${humanizeDistance(100, { unitSystem: "imperial" })}`
);
console.log(
  `  1,609.344 meters: ${humanizeDistance(1609.344, {
    unitSystem: "imperial",
  })}`
);
console.log(
  `  5,000 meters: ${humanizeDistance(5000, { unitSystem: "imperial" })}\n`
);

// ==================== CURRENCY ====================
console.log("5. Currency Formatting");
console.log("----------------------");
console.log(`$1,500: ${humanizeCurrency(1500)}`);
console.log(`$50,000: ${humanizeCurrency(50000)}`);
console.log(`$1,000,000: ${humanizeCurrency(1000000)}`);
console.log(`$1,500,000: ${humanizeCurrency(1500000)}`);
console.log(`$2,800,000,000: ${humanizeCurrency(2800000000)}\n`);

// ==================== CUSTOM OPTIONS ====================
console.log("6. Custom Formatting Options");
console.log("-----------------------------");
console.log(
  `Custom precision (0): ${humanizeNumber(1234, "generic", { precision: 0 })}`
);
console.log(
  `Custom precision (3): ${humanizeNumber(1234, "generic", { precision: 3 })}`
);
console.log(
  `Custom separator: ${humanizeNumber(1234.56, "generic", { separator: "," })}`
);
console.log(`Lowercase units: ${humanizeData(1024, { lowercase: true })}`);
console.log(`No spacer: ${humanizeNumber(1234, "generic", { spacer: "" })}`);
console.log(`Rounded: ${humanizeNumber(1734, "generic", { round: true })}\n`);

// ==================== NEGATIVE NUMBERS ====================
console.log("7. Negative Numbers");
console.log("-------------------");
console.log(`-1,234: ${humanizeNumber(-1234)}`);
console.log(`-1,048,576 bytes: ${humanizeData(-1048576)}`);
console.log(`-1,000 grams: ${humanizeWeight(-1000)}`);
console.log(`-5,000 meters: ${humanizeDistance(-5000)}\n`);

// ==================== EDGE CASES ====================
console.log("8. Edge Cases");
console.log("-------------");
console.log(`Zero: ${humanizeNumber(0)}`);
console.log(`Very small: ${humanizeNumber(0.001)}`);
console.log(`Very large: ${humanizeNumber(1e15)}`);
console.log(`Infinity: ${humanizeNumber(Infinity)}`);
console.log(`NaN: ${humanizeNumber(NaN)}\n`);

console.log("✅ Basic usage examples completed!");
