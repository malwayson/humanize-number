import {
  convertDistance,
  convertWeight,
  humanizeCurrency,
  humanizeData,
  humanizeDistance,
  humanizeDistanceImperial,
  humanizeNumber,
  humanizeWeight,
  humanizeWeightImperial,
  parseHumanized,
} from "./index";

console.log("=== Basic Usage Examples ===");

// Generic format examples
console.log("Generic format:");
console.log(`1234 -> ${humanizeNumber(1234)}`);
console.log(`1234567 -> ${humanizeNumber(1234567)}`);
console.log(`1234567890 -> ${humanizeNumber(1234567890)}`);
console.log(`1234567890123 -> ${humanizeNumber(1234567890123)}`);

// Data format examples
console.log("\nData format:");
console.log(`1024 bytes -> ${humanizeData(1024)}`);
console.log(`1048576 bytes -> ${humanizeData(1048576)}`);
console.log(`1073741824 bytes -> ${humanizeData(1073741824)}`);
console.log(`1099511627776 bytes -> ${humanizeData(1099511627776)}`);

// Weight format examples
console.log("\nWeight format:");
console.log(`500 grams -> ${humanizeWeight(500)}`);
console.log(`1000 grams -> ${humanizeWeight(1000)}`);
console.log(`1500 grams -> ${humanizeWeight(1500)}`);
console.log(`1000000 grams -> ${humanizeWeight(1000000)}`);

// Distance format examples
console.log("\nDistance format:");
console.log(`0.5 meters -> ${humanizeDistance(0.5)}`);
console.log(`100 meters -> ${humanizeDistance(100)}`);
console.log(`1000 meters -> ${humanizeDistance(1000)}`);
console.log(`1500 meters -> ${humanizeDistance(1500)}`);

// Currency format examples
console.log("\nCurrency format:");
console.log(`1000 -> ${humanizeCurrency(1000)}`);
console.log(`1500000 -> ${humanizeCurrency(1500000)}`);
console.log(`2800000000 -> ${humanizeCurrency(2800000000)}`);

console.log("\n=== Custom Options Examples ===");

// Custom precision
console.log("Custom precision:");
console.log(
  `1234 (precision: 0) -> ${humanizeNumber(1234, "generic", { precision: 0 })}`
);
console.log(
  `1234 (precision: 3) -> ${humanizeNumber(1234, "generic", { precision: 3 })}`
);

// Custom separators
console.log("\nCustom separators:");
console.log(
  `1234 (separator: ',') -> ${humanizeNumber(1234, "generic", {
    separator: ",",
  })}`
);
console.log(
  `1234567 (delimiter: ' ') -> ${humanizeNumber(1234567, "generic", {
    delimiter: " ",
  })}`
);

// No spacing
console.log("\nNo spacing:");
console.log(
  `1234 (no spacer) -> ${humanizeNumber(1234, "generic", { spacer: "" })}`
);

// Lowercase units
console.log("\nLowercase units:");
console.log(
  `1024 bytes (lowercase) -> ${humanizeData(1024, { lowercase: true })}`
);
console.log(
  `1000 grams (lowercase) -> ${humanizeWeight(1000, { lowercase: true })}`
);

// Rounded values
console.log("\nRounded values:");
console.log(
  `1234 (rounded) -> ${humanizeNumber(1234, "generic", { round: true })}`
);
console.log(
  `1734 (rounded) -> ${humanizeNumber(1734, "generic", { round: true })}`
);

console.log("\n=== Edge Cases ===");
console.log(`0 -> ${humanizeNumber(0)}`);
console.log(`-1234 -> ${humanizeNumber(-1234)}`);
console.log(`Infinity -> ${humanizeNumber(Infinity)}`);
console.log(`NaN -> ${humanizeNumber(NaN)}`);

console.log("\n=== Parsing Examples ===");
console.log(`"1.23 K" -> ${parseHumanized("1.23 K")}`);
console.log(`"1 KB" (data) -> ${parseHumanized("1 KB", "data")}`);
console.log(`"1.5 kg" (weight) -> ${parseHumanized("1.5 kg", "weight")}`);
console.log(`"2 km" (distance) -> ${parseHumanized("2 km", "distance")}`);

console.log("\n=== Real-world Examples ===");

// File sizes
console.log("File sizes:");
const fileSizes = [1024, 5242880, 1073741824, 137438953472];
fileSizes.forEach((size) => {
  console.log(`${size} bytes -> ${humanizeData(size)}`);
});

// Network speeds
console.log("\nNetwork speeds (as data rates):");
const speeds = [1000000, 10000000, 100000000, 1000000000]; // bits per second
speeds.forEach((speed) => {
  console.log(`${speed} bps -> ${humanizeData(speed / 8)} per second`);
});

// Financial data
console.log("\nFinancial data:");
const amounts = [1500, 150000, 15000000, 1500000000];
amounts.forEach((amount) => {
  console.log(`$${amount} -> $${humanizeCurrency(amount)}`);
});

// Physical measurements
console.log("\nPhysical measurements:");
const weights = [50, 750, 1200, 75000];
weights.forEach((weight) => {
  console.log(`${weight}g -> ${humanizeWeight(weight)}`);
});

const distances = [0.25, 50, 1500, 25000];
distances.forEach((distance) => {
  console.log(`${distance}m -> ${humanizeDistance(distance)}`);
});

console.log("\n=== Unit System Examples ===");

// Imperial weight examples
console.log("\nImperial weights:");
const imperialWeights = [1, 28.3495, 453.592, 907184.74]; // gr, oz, lb, ton
imperialWeights.forEach((weight) => {
  console.log(
    `${weight}g -> ${humanizeNumber(weight, "weight", {
      unitSystem: "imperial",
    })}`
  );
});

// Imperial distance examples
console.log("\nImperial distances:");
const imperialDistances = [0.0254, 0.3048, 1609.344]; // in, ft, mi
imperialDistances.forEach((distance) => {
  console.log(
    `${distance}m -> ${humanizeNumber(distance, "distance", {
      unitSystem: "imperial",
    })}`
  );
});

// Using shorthand functions
console.log("\nUsing shorthand imperial functions:");
console.log(`453.592g -> ${humanizeWeightImperial(453.592)}`);
console.log(`1609.344m -> ${humanizeDistanceImperial(1609.344)}`);

console.log("\n=== Unit Conversion Examples ===");

// Weight conversions
console.log("\nWeight conversions:");
console.log(
  `1000g (metric) -> ${convertWeight(1000, "metric", "imperial")}lbs (imperial)`
);
console.log(
  `5lbs (imperial) -> ${convertWeight(5, "imperial", "metric")}g (metric)`
);

// Distance conversions
console.log("\nDistance conversions:");
console.log(
  `1000m (metric) -> ${convertDistance(
    1000,
    "metric",
    "imperial"
  )}ft (imperial)`
);
console.log(
  `10ft (imperial) -> ${convertDistance(10, "imperial", "metric")}m (metric)`
);

console.log("\n=== Mixed System Comparisons ===");

// Same values in different systems
const testWeight = 1000; // grams
console.log(`\nSame weight in different systems:`);
console.log(`${testWeight}g (metric): ${humanizeWeight(testWeight)}`);
console.log(`${testWeight}g (imperial): ${humanizeWeightImperial(testWeight)}`);

const testDistance = 1000; // meters
console.log(`\nSame distance in different systems:`);
console.log(`${testDistance}m (metric): ${humanizeDistance(testDistance)}`);
console.log(
  `${testDistance}m (imperial): ${humanizeDistanceImperial(testDistance)}`
);
