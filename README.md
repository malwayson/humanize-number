# @malwayson/humanize-number

[![npm version](https://img.shields.io/npm/v/@malwayson/humanize-number.svg)](https://www.npmjs.com/package/@malwayson/humanize-number)
[![npm downloads](https://img.shields.io/npm/dm/@malwayson/humanize-number.svg)](https://www.npmjs.com/package/@malwayson/humanize-number)
[![Build Status](https://github.com/malwayson/humanize-number/workflows/CI/badge.svg)](https://github.com/malwayson/humanize-number/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@malwayson/humanize-number)](https://bundlephobia.com/package/@malwayson/humanize-number)

A powerful TypeScript library to convert numbers into human-readable formats with support for various format methods including data sizes, weights, distances, currency, temperature, duration, speed, volume, and more.

---

💖 **Support this project**: If you find this package useful, consider [supporting us via PayPal](https://www.paypal.com/ncp/payment/RXETC4BPH3FUW). Your support helps maintain and improve this library!

---

## Installation

```bash
npm install @malwayson/humanize-number
```

## Module System Support

This package supports both **CommonJS** and **ES Modules** (ESM) for maximum compatibility:

```typescript
// ESM (recommended for modern bundlers)
import { humanizeNumber } from "@malwayson/humanize-number";

// CommonJS
const { humanizeNumber } = require("@malwayson/humanize-number");
```

### Tree-Shaking Support

The package is fully tree-shakeable! Import only what you need to reduce bundle size:

```typescript
// Import specific locales (reduces bundle size)
import enUS from "@malwayson/humanize-number/locales/en-US";
import deDE from "@malwayson/humanize-number/locales/de-DE";

// Import specific presets
import compact from "@malwayson/humanize-number/presets/compact";
import verbose from "@malwayson/humanize-number/presets/verbose";

// Use them directly
humanizeNumber(1234567, "generic", { ...compact, locale: enUS });
```

### Benefits:

- ✅ **Smaller bundles**: Only include locales/presets you actually use
- ✅ **Better tree-shaking**: Modern bundlers can eliminate unused code
- ✅ **Faster load times**: Reduced JavaScript payload
- ✅ **ESM & CJS**: Works with both module systems

## ✨ What's New in v2.0

- 🌡️ **Temperature formatting** with Celsius, Fahrenheit, and Kelvin support
- ⏱️ **Duration formatting** from milliseconds to years
- 🚀 **Speed formatting** with km/h, mph, m/s, and knots
- 💧 **Volume formatting** with liters and gallons
- 📊 **Percentage formatting** with precision control
- 🔬 **Scientific notation** support
- 🌍 **Localization** with 9 built-in locales
- 🎯 **Presets** for common use cases (compact, verbose, financial, etc.)
- 📦 **Batch processing** for arrays and objects
- 📏 **Range formatting** for displaying value ranges
- 🔍 **Comparison utilities** for sorting and comparing humanized values
- 🧩 **Modular architecture** with tree-shaking support

## Features

- 🔢 Convert numbers to human-readable formats
- 📊 Support for **10 format methods** (data, weight, distance, currency, temperature, duration, speed, volume, percentage, generic)
- 🌍 **Multiple unit systems**: Metric and Imperial support
- 🌐 **Internationalization**: 9 built-in locales (en-US, de-DE, fr-FR, es-ES, ja-JP, zh-CN, pt-BR, ru-RU, en-GB)
- ⚙️ Highly customizable formatting options
- 🔄 Parse humanized strings back to numbers
- 🔄 **Unit conversion** between metric and imperial systems
- 📝 Full TypeScript support with comprehensive type definitions
- 🧪 Comprehensive test coverage (35+ tests)
- 🚀 Zero dependencies
- 📦 Batch processing capabilities
- 🔍 Built-in comparison and sorting utilities

## Quick Start

```typescript
import {
  humanizeNumber,
  humanizeData,
  humanizeWeight,
  humanizeTemperature,
  humanizeDuration,
  presets,
} from "@malwayson/humanize-number";

// Generic format (default)
humanizeNumber(1234); // "1.23 K"
humanizeNumber(1234567); // "1.23 M"
humanizeNumber(1234567890); // "1.23 B"

// Data format
humanizeData(1024); // "1 KB"
humanizeData(1048576); // "1 MB"
humanizeData(1073741824); // "1 GB"

// Weight format (metric - default)
humanizeWeight(1000); // "1 kg"
humanizeWeight(1500); // "1.5 kg"

// 🆕 Temperature format
humanizeTemperature(25, { temperatureScale: "celsius" }); // "25°C"
humanizeTemperature(77, { temperatureScale: "fahrenheit" }); // "77°F"

// 🆕 Duration format
humanizeDuration(90); // "1 minute 30 seconds"
humanizeDuration(3661); // "1 hour 1 minute"

// 🆕 Using presets
humanizeNumber(1234567, "generic", presets.compact); // "1M"
humanizeNumber(1000, "weight", presets.verbose); // "1.00 kilograms"

// Currency format
humanizeNumber(1000000, "currency"); // "1 M"
humanizeNumber(1500000, "currency"); // "1.5 M"
```

## Format Methods

### Available Format Methods

#### Core Formats

- **`generic`** (default): K, M, B, T (thousands, millions, billions, trillions)
- **`data`**: B, KB, MB, GB, TB, PB (bytes to petabytes)
- **`currency`**: K, M, B (thousands, millions, billions)

#### Measurement Formats

- **`weight`**:
  - _Metric_: mg, g, kg, t (milligrams to metric tons)
  - _Imperial_: gr, oz, lb, ton (grains to short tons)
- **`distance`**:
  - _Metric_: mm, cm, m, km, Mm (millimeters to megameters)
  - _Imperial_: in, ft, yd, mi (inches to miles)
- **`volume`** 🆕:
  - _Metric_: mL, L, kL (milliliters to kiloliters)
  - _Imperial_: fl oz, cup, pt, qt, gal (fluid ounces to gallons)
- **`speed`** 🆕:
  - _Metric_: m/s, km/h (meters per second, kilometers per hour)
  - _Imperial_: ft/s, mph, knots (feet per second, miles per hour, nautical miles per hour)

#### Special Formats

- **`temperature`** 🆕: Supports Celsius (°C), Fahrenheit (°F), and Kelvin (K)
- **`duration`** 🆕: ms, seconds, minutes, hours, days, weeks, months, years
- **`percentage`** 🆕: Formats decimal values as percentages with % symbol

### Detailed Examples

#### Temperature

```typescript
import {
  humanizeTemperature,
  convertTemperature,
} from "@malwayson/humanize-number";

// Celsius
humanizeTemperature(25, { temperatureScale: "celsius" }); // "25°C"
humanizeTemperature(0, { temperatureScale: "celsius" }); // "0°C"

// Fahrenheit
humanizeTemperature(77, { temperatureScale: "fahrenheit" }); // "77°F"
humanizeTemperature(32, { temperatureScale: "fahrenheit" }); // "32°F"

// Kelvin
humanizeTemperature(273.15, { temperatureScale: "kelvin" }); // "273.15 K"

// Convert between scales
convertTemperature(0, "celsius", "fahrenheit"); // 32
convertTemperature(100, "celsius", "kelvin"); // 373.15
```

#### Duration

```typescript
import { humanizeDuration } from "@malwayson/humanize-number";

humanizeDuration(90); // "1 minute 30 seconds"
humanizeDuration(3661); // "1 hour 1 minute"
humanizeDuration(86400); // "1 day"
humanizeDuration(604800); // "1 week"
humanizeDuration(0.5); // "500 milliseconds"

// Verbose units
humanizeDuration(3661, { verboseUnits: true }); // "1 hour 1 minute 1 second"
```

#### Speed

```typescript
import { humanizeSpeed, convertSpeed } from "@malwayson/humanize-number";

// Metric (m/s input)
humanizeSpeed(27.78, { unitSystem: "metric" }); // "100 km/h"
humanizeSpeed(10, { unitSystem: "metric" }); // "36 km/h"

// Imperial (m/s input)
humanizeSpeed(26.82, { unitSystem: "imperial" }); // "60 mph"

// Convert
convertSpeed(100, "metric", "imperial"); // 62.14 (100 km/h to mph)
```

#### Volume

```typescript
import { humanizeVolume, convertVolume } from "@malwayson/humanize-number";

// Metric (liters input)
humanizeVolume(1, { unitSystem: "metric" }); // "1 L"
humanizeVolume(0.5, { unitSystem: "metric" }); // "500 mL"

// Imperial (liters input)
humanizeVolume(3.78541, { unitSystem: "imperial" }); // "1 gal"

// Convert
convertVolume(5, "imperial", "metric"); // 18.93 (5 gallons to liters)
```

#### Percentage

```typescript
import { humanizePercentage } from "@malwayson/humanize-number";

humanizePercentage(0.1234); // "12.34%"
humanizePercentage(0.5); // "50%"
humanizePercentage(1.5); // "150%"
humanizePercentage(0.999); // "99.9%"
```

## 🎯 Presets

Presets provide pre-configured options for common use cases:

```typescript
import { humanizeNumber, presets } from "@malwayson/humanize-number";

// Compact - minimal formatting
humanizeNumber(1234567, "generic", presets.compact); // "1M"

// Verbose - detailed formatting with full unit names
humanizeNumber(1000, "weight", presets.verbose); // "1.00 kilograms"

// Financial - currency formatting with 2 decimal places
humanizeNumber(1234567.89, "currency", presets.financial); // "1.23 M"

// Scientific - scientific notation for large numbers
humanizeNumber(1234567890, "generic", presets.scientific); // "1.23e9"

// Approximate - rounded values
humanizeNumber(1234, "generic", presets.approximate); // "1 K"

// Metric - forces metric units
humanizeNumber(1000, "weight", presets.metric); // "1 kg"

// Imperial - forces imperial units
humanizeNumber(1000, "weight", presets.imperial); // "2.2 lbs"

// Minimal - no spaces, lowercase
humanizeNumber(1024, "data", presets.minimal); // "1kb"

// Detailed - maximum precision and verbosity
humanizeNumber(1234.5678, "generic", presets.detailed); // "1.2346 K"
```

### Available Presets

| Preset        | Description                           | Use Case                      |
| ------------- | ------------------------------------- | ----------------------------- |
| `compact`     | Minimal spacing, no decimals          | UI badges, compact displays   |
| `verbose`     | Full unit names, high precision       | Reports, documentation        |
| `financial`   | 2 decimals, precise formatting        | Financial reports, invoices   |
| `scientific`  | Scientific notation for large numbers | Scientific data, calculations |
| `approximate` | Rounded values, no decimals           | Quick estimates, overviews    |
| `metric`      | Forces metric system                  | International users           |
| `imperial`    | Forces imperial system                | US users                      |
| `minimal`     | Lowercase, no spaces                  | URL parameters, CSS values    |
| `detailed`    | Maximum information                   | Detailed logs, debugging      |

## 🌍 Localization

Support for 9 built-in locales with customizable decimal and thousands separators:

```typescript
import { humanizeNumber } from "@malwayson/humanize-number";

// German (Germany) - uses comma for decimal
humanizeNumber(1234.56, "generic", { locale: "de-DE" }); // "1,23 K"

// French (France) - uses comma for decimal, space for thousands
humanizeNumber(1234567, "generic", { locale: "fr-FR" }); // "1,23 M"
humanizeNumber(1234567, "generic", { locale: "fr-FR", precision: 0 }); // "1 235 K" (shows space separator)

// Japanese (Japan)
humanizeNumber(1234567, "generic", { locale: "ja-JP" }); // "1.23 M"

// Chinese (China)
humanizeNumber(1234567, "generic", { locale: "zh-CN" }); // "1.23 M"

// Spanish (Spain)
humanizeNumber(1234.56, "generic", { locale: "es-ES" }); // "1,23 K"

// Portuguese (Brazil)
humanizeNumber(1234.56, "generic", { locale: "pt-BR" }); // "1,23 K"

// Russian (Russia)
humanizeNumber(1234.56, "generic", { locale: "ru-RU" }); // "1,23 K"

// English (UK)
humanizeNumber(1234567, "generic", { locale: "en-GB" }); // "1.23 M"
```

### Supported Locales

| Locale  | Language        | Decimal | Thousands |
| ------- | --------------- | ------- | --------- |
| `en-US` | English (US)    | `.`     | `,`       |
| `en-GB` | English (UK)    | `.`     | `,`       |
| `de-DE` | German          | `,`     | `.`       |
| `fr-FR` | French          | `,`     | ` `       |
| `es-ES` | Spanish         | `,`     | `.`       |
| `ja-JP` | Japanese        | `.`     | `,`       |
| `zh-CN` | Chinese         | `.`     | `,`       |
| `pt-BR` | Portuguese (BR) | `,`     | `.`       |
| `ru-RU` | Russian         | `,`     | ` `       |

## 📦 Batch Processing

Process multiple values at once:

### Arrays

```typescript
import { humanizeArray } from "@malwayson/humanize-number";

const sizes = [1024, 1048576, 1073741824];
humanizeArray(sizes, "data");
// ["1 KB", "1 MB", "1 GB"]

const weights = [500, 1000, 1500];
humanizeArray(weights, "weight", { unitSystem: "imperial" });
// ["1.1 lbs", "2.2 lbs", "3.31 lbs"]
```

### Objects

```typescript
import { humanizeObject } from "@malwayson/humanize-number";

const systemStats = {
  cpu: 0.45,
  memory: 8589934592,
  disk: 512000000000,
  uptime: 86400,
};

humanizeObject(systemStats, {
  cpu: ["percentage"],
  memory: ["data"],
  disk: ["data"],
  uptime: ["duration"],
});
// {
//   cpu: "45%",
//   memory: "8 GB",
//   disk: "512 GB",
//   uptime: "1 day"
// }
```

### Ranges

```typescript
import { humanizeRange } from "@malwayson/humanize-number";

// Storage range
humanizeRange(500000000, 1000000000000, "data");
// "500 MB - 1 TB"

// Weight range
humanizeRange(1000, 5000, "weight");
// "1 kg - 5 kg"

// With unit combination
humanizeRange(100, 5000, "weight", { combineUnits: false });
// "100 g - 5 kg"
```

## 🔍 Comparison Utilities

Sort and compare humanized values:

```typescript
import {
  compareHumanized,
  sortHumanized,
  isGreaterThan,
} from "@malwayson/humanize-number";

// Compare two humanized strings
compareHumanized("2 GB", "1500 MB", "data"); // 1 (2 GB > 1500 MB)
compareHumanized("500 MB", "1 GB", "data"); // -1 (500 MB < 1 GB)

// Check if greater than
isGreaterThan("2 GB", "1500 MB", "data"); // true
isGreaterThan("500 MB", "1 GB", "data"); // false

// Sort array of humanized strings
const unsorted = ["2 TB", "500 MB", "1 GB", "128 GB"];
sortHumanized(unsorted, "data");
// ["500 MB", "1 GB", "128 GB", "2 TB"]

// Sort in descending order
sortHumanized(unsorted, "data", "desc");
// ["2 TB", "128 GB", "1 GB", "500 MB"]
```

## ⚙️ Configuration Options

All formatting functions accept a comprehensive options object:

```typescript
interface HumanizeOptions {
  // Basic Formatting
  precision?: number; // Decimal places (default: 2)
  separator?: string; // Decimal separator (default: '.')
  delimiter?: string; // Thousands delimiter (default: ',')
  spacer?: string; // Space between number and unit (default: ' ')
  lowercase?: boolean; // Use lowercase units (default: false)
  round?: boolean; // Round to nearest integer (default: false)

  // Unit System
  unitSystem?: "metric" | "imperial"; // Unit system (default: 'metric')

  // Temperature Specific
  temperatureScale?: "celsius" | "fahrenheit" | "kelvin"; // Temperature scale

  // Display Options
  showSign?: boolean; // Show + for positive numbers (default: false)
  verboseUnits?: boolean; // Use full unit names (default: false)

  // Scientific Notation
  scientificNotation?: boolean; // Use scientific notation (default: false)
  scientificThreshold?: number; // Threshold for scientific notation (default: 1e6)

  // Localization
  locale?: LocaleCode; // Locale for formatting (default: 'en-US')

  // Range Formatting
  combineUnits?: boolean; // Combine units in ranges (default: true)
}
```

### Examples with Options

```typescript
import { humanizeNumber } from "@malwayson/humanize-number";

// Custom precision
// Custom precision
humanizeNumber(1234, "generic", { precision: 0 }); // "1 K"
humanizeNumber(1234, "generic", { precision: 3 }); // "1.234 K"

// Custom separators
humanizeNumber(1234.56, "generic", { separator: "," }); // "1,23 K"
humanizeNumber(1234567, "generic", { delimiter: " " }); // "1.23 M"

// No spacing
humanizeNumber(1234, "generic", { spacer: "" }); // "1.23K"

// Lowercase units
humanizeNumber(1024, "data", { lowercase: true }); // "1 kb"

// Rounded values
humanizeNumber(1734, "generic", { round: true }); // "2 K"

// Show sign for positive numbers
humanizeNumber(1234, "generic", { showSign: true }); // "+1.23 K"

// Verbose unit names
humanizeNumber(1000, "weight", { verboseUnits: true }); // "1 kilogram"
humanizeNumber(1500, "distance", { verboseUnits: true }); // "1.5 kilometers"

// Scientific notation
humanizeNumber(123456789, "generic", { scientificNotation: true }); // "1.23e8"
humanizeNumber(1e12, "generic", { scientificNotation: true }); // "1.00e12"
```

## 🚀 Shorthand Functions

For convenience, the library provides shorthand functions for each format method:

```typescript
import {
  humanizeData,
  humanizeWeight,
  humanizeDistance,
  humanizeCurrency,
  humanizeTemperature,
  humanizeDuration,
  humanizeSpeed,
  humanizeVolume,
  humanizePercentage,
  // Unit system specific functions
  humanizeWeightMetric,
  humanizeWeightImperial,
  humanizeDistanceMetric,
  humanizeDistanceImperial,
  humanizeSpeedMetric,
  humanizeSpeedImperial,
  humanizeVolumeMetric,
  humanizeVolumeImperial,
} from "@malwayson/humanize-number";

// Standard functions (default to metric)
humanizeData(1024); // "1 KB"
humanizeWeight(1000); // "1 kg"
humanizeDistance(1000); // "1 km"
humanizeCurrency(1000000); // "1 M"
humanizeTemperature(25, { temperatureScale: "celsius" }); // "25°C"
humanizeDuration(90); // "1 minute 30 seconds"
humanizeSpeed(27.78); // "100 km/h"
humanizeVolume(1); // "1 L"
humanizePercentage(0.45); // "45%"

// Unit system specific functions
humanizeWeightMetric(1000); // "1 kg"
humanizeWeightImperial(453.592); // "1 lb"
humanizeDistanceMetric(1000); // "1 km"
humanizeDistanceImperial(1609.344); // "1 mi"
humanizeSpeedMetric(27.78); // "100 km/h"
humanizeSpeedImperial(26.82); // "60 mph"
humanizeVolumeMetric(1); // "1 L"
humanizeVolumeImperial(3.78541); // "1 gal"
```

## 🔄 Parsing Humanized Strings

Convert humanized strings back to numbers:

```typescript
import { parseHumanized } from "@malwayson/humanize-number";

parseHumanized("1.23 K"); // 1230
parseHumanized("1 KB", "data"); // 1024
parseHumanized("1.5 kg", "weight"); // 1500
parseHumanized("2 km", "distance"); // 2000

// With unit systems
parseHumanized("1 lb", "weight", "imperial"); // 453.592
parseHumanized("1 mi", "distance", "imperial"); // 1609.344

// Temperature
parseHumanized("25°C", "temperature"); // 25

// Duration
parseHumanized("1 hour 30 minutes", "duration"); // 5400

// Percentage
parseHumanized("45%", "percentage"); // 0.45
```

## 🔄 Unit Conversion

Convert values between metric and imperial systems:

```typescript
import {
  convertWeight,
  convertDistance,
  convertTemperature,
  convertSpeed,
  convertVolume,
  convertUnits,
} from "@malwayson/humanize-number";

// Weight conversion
convertWeight(1000, "metric", "imperial"); // 2.2046 (grams to pounds)
convertWeight(5, "imperial", "metric"); // 2267.96 (pounds to grams)

// Distance conversion
convertDistance(1000, "metric", "imperial"); // 3280.84 (meters to feet)
convertDistance(10, "imperial", "metric"); // 3.048 (feet to meters)

// Temperature conversion
convertTemperature(0, "celsius", "fahrenheit"); // 32
convertTemperature(100, "celsius", "kelvin"); // 373.15

// Speed conversion
convertSpeed(100, "metric", "imperial"); // 62.14 (km/h to mph)

// Volume conversion
convertVolume(5, "imperial", "metric"); // 18.93 (gallons to liters)

// Generic conversion (auto-detect format method)
convertUnits(1000, "weight", "metric", "imperial"); // 2.2046
```

## 💡 Real-World Use Cases

### 1. Dashboard Metrics

```typescript
import { humanizeObject, presets } from "@malwayson/humanize-number";

const dashboard = {
  activeUsers: 12567,
  totalStorage: 5368709120,
  avgResponseTime: 0.245,
  uptime: 2592000,
  errorRate: 0.0023,
};

humanizeObject(dashboard, {
  activeUsers: ["generic", presets.compact],
  totalStorage: ["data"],
  avgResponseTime: ["duration"],
  uptime: ["duration"],
  errorRate: ["percentage"],
});
// {
//   activeUsers: "13K",
//   totalStorage: "5 GB",
//   avgResponseTime: "245 milliseconds",
//   uptime: "1 month",
//   errorRate: "0.23%"
// }
```

### 2. File Upload Progress

```typescript
import { humanizeData, humanizeRange } from "@malwayson/humanize-number";

const uploadedBytes = 52428800; // 50 MB
const totalBytes = 104857600; // 100 MB

console.log(
  `Progress: ${humanizeData(uploadedBytes)} / ${humanizeData(totalBytes)}`
);
// Progress: 50 MB / 100 MB

console.log(`Range: ${humanizeRange(uploadedBytes, totalBytes, "data")}`);
// Range: 50 MB - 100 MB
```

### 3. System Monitoring

```typescript
import { humanizeData, humanizePercentage } from "@malwayson/humanize-number";

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
// Server 1: 8 GB RAM, 65% CPU
// Server 2: 16 GB RAM, 42% CPU
// Server 3: 32 GB RAM, 89% CPU
```

### 4. E-commerce Product Display

```typescript
import {
  humanizeWeight,
  humanizeNumber,
  presets,
} from "@malwayson/humanize-number";

const product = {
  price: 1299.99,
  weight: 850,
  inStock: 1234,
};

console.log(`Price: $${product.price}`);
console.log(`Weight: ${humanizeWeight(product.weight)}`);
console.log(
  `Stock: ${humanizeNumber(product.inStock, "generic", presets.compact)} units`
);
// Price: $1299.99
// Weight: 850 g
// Stock: 1K units
```

### 5. Fitness Tracking App

```typescript
import {
  humanizeDuration,
  humanizeDistance,
  humanizeSpeed,
} from "@malwayson/humanize-number";

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
console.log(`Avg Speed: ${humanizeSpeed(workout.avgSpeed)}`);
// Duration: 1 hour
// Distance: 5 km
// Calories: 450
// Avg Speed: 5 km/h
```

### 6. Weather Application

```typescript
import {
  humanizeTemperature,
  humanizeSpeed,
  convertTemperature,
} from "@malwayson/humanize-number";

const weather = {
  temperature: 22,
  windSpeed: 5.56, // m/s
  humidity: 0.68,
};

// For US users
console.log(
  `Temperature: ${humanizeTemperature(
    convertTemperature(weather.temperature, "celsius", "fahrenheit"),
    { temperatureScale: "fahrenheit" }
  )}`
);
console.log(
  `Wind: ${humanizeSpeed(weather.windSpeed, { unitSystem: "imperial" })}`
);
console.log(`Humidity: ${humanizePercentage(weather.humidity)}`);
// Temperature: 71.6°F
// Wind: 12 mph
// Humidity: 68%
```

### Complex Formatting

```typescript
const options = {
  precision: 1,
  separator: ",",
  delimiter: ".",
  spacer: " ",
  lowercase: true,
};

humanizeNumber(1234567.89, "data", options); // "1,2 mb"
```

### Handling Edge Cases

```typescript
humanizeNumber(0); // "0 "
humanizeNumber(-1234); // "-1.23 K"
humanizeNumber(Infinity); // "Infinity"
humanizeNumber(NaN); // "NaN"

// Error handling
try {
  humanizeNumber("not a number" as any);
} catch (error) {
  console.error(error.message); // "Invalid number: not a number"
}
```

## 📘 TypeScript Support

The library is written in TypeScript and includes full type definitions:

```typescript
import {
  humanizeNumber,
  FormatMethod,
  HumanizeOptions,
  UnitSystem,
  TemperatureScale,
  LocaleCode,
} from "@malwayson/humanize-number";

const formatMethod: FormatMethod = "data";
const unitSystem: UnitSystem = "metric";
const temperatureScale: TemperatureScale = "celsius";
const locale: LocaleCode = "en-US";

const options: HumanizeOptions = {
  precision: 1,
  unitSystem,
  temperatureScale,
  locale,
  verboseUnits: true,
};

const result: string = humanizeNumber(1024, formatMethod, options);
```

## Examples by Use Case

### File Sizes

```typescript
humanizeNumber(1024, "data"); // "1 KB"
humanizeNumber(5242880, "data"); // "5 MB"
humanizeNumber(1073741824, "data"); // "1 GB"
```

### Memory Usage

```typescript
humanizeNumber(8589934592, "data"); // "8 GB"
humanizeNumber(137438953472, "data"); // "128 GB"
```

### Financial Data

```typescript
humanizeNumber(1500000, "currency"); // "1.5 M"
humanizeNumber(2800000000, "currency"); // "2.8 B"
```

### Physical Measurements

```typescript
// Metric system
humanizeNumber(1500, "weight"); // "1.5 kg"
humanizeNumber(2500, "distance"); // "2.5 km"

// Imperial system
humanizeNumber(1500, "weight", { unitSystem: "imperial" }); // "3.31 lb"
humanizeNumber(2500, "distance", { unitSystem: "imperial" }); // "1.55 mi"
```

### Unit System Comparisons

```typescript
const weight = 1000; // grams

// Same weight in different systems
humanizeWeight(weight); // "1 kg" (metric)
humanizeWeightImperial(weight); // "2.2 lb" (imperial)

const distance = 1000; // meters

// Same distance in different systems
humanizeDistance(distance); // "1 km" (metric)
humanizeDistanceImperial(distance); // "1.09 yd" (imperial)
```

## 📖 API Reference

### Core Functions

#### `humanizeNumber(value, formatMethod?, options?)`

Main function to convert numbers to human-readable format.

**Parameters:**

- `value` (number): The number to convert
- `formatMethod` (FormatMethod, optional): The format method to use (default: 'generic')
- `options` (HumanizeOptions, optional): Formatting options

**Returns:** `string` - The formatted string

**Example:**

```typescript
humanizeNumber(1024, "data", { precision: 1 }); // "1.0 KB"
```

---

#### `parseHumanized(humanizedString, formatMethod?, unitSystem?)`

Parse a humanized string back to a number.

**Parameters:**

- `humanizedString` (string): The humanized string to parse
- `formatMethod` (FormatMethod, optional): The format method that was used (default: 'generic')
- `unitSystem` (UnitSystem, optional): The unit system that was used (default: 'metric')

**Returns:** `number` - The parsed number

**Example:**

```typescript
parseHumanized("1.5 KB", "data"); // 1536
```

---

### Format-Specific Functions

#### `humanizeData(value, options?)`

Format as data size (B, KB, MB, GB, TB, PB)

#### `humanizeWeight(value, options?)`

Format as weight (metric: mg, g, kg, t | imperial: gr, oz, lb, ton)

#### `humanizeDistance(value, options?)`

Format as distance (metric: mm, cm, m, km | imperial: in, ft, yd, mi)

#### `humanizeCurrency(value, options?)`

Format as currency (K, M, B)

#### `humanizeTemperature(value, options?)`

Format as temperature (°C, °F, K)

#### `humanizeDuration(value, options?)`

Format as duration (ms, seconds, minutes, hours, days, weeks, months, years)

#### `humanizeSpeed(value, options?)`

Format as speed (km/h, mph, m/s, ft/s, knots)

#### `humanizeVolume(value, options?)`

Format as volume (mL, L, kL, fl oz, cup, pt, qt, gal)

#### `humanizePercentage(value, options?)`

Format as percentage (%)

---

### Conversion Functions

#### `convertWeight(value, fromSystem, toSystem)`

Convert weight between metric and imperial systems.

**Parameters:**

- `value` (number): The weight value in grams (metric) or pounds (imperial)
- `fromSystem` (UnitSystem): Source unit system
- `toSystem` (UnitSystem): Target unit system

**Returns:** `number` - The converted value

---

#### `convertDistance(value, fromSystem, toSystem)`

Convert distance between metric and imperial systems.

**Parameters:**

- `value` (number): The distance value in meters (metric) or feet (imperial)
- `fromSystem` (UnitSystem): Source unit system
- `toSystem` (UnitSystem): Target unit system

**Returns:** `number` - The converted value

---

#### `convertTemperature(value, fromScale, toScale)`

Convert temperature between different scales.

**Parameters:**

- `value` (number): The temperature value
- `fromScale` (TemperatureScale): Source scale ('celsius', 'fahrenheit', 'kelvin')
- `toScale` (TemperatureScale): Target scale

**Returns:** `number` - The converted temperature

---

#### `convertSpeed(value, fromSystem, toSystem)`

Convert speed between metric (km/h) and imperial (mph) systems.

---

#### `convertVolume(value, fromSystem, toSystem)`

Convert volume between metric (liters) and imperial (gallons) systems.

---

#### `convertUnits(value, formatMethod, fromSystem, toSystem)`

Generic conversion function that auto-detects the format method.

---

### Batch Processing Functions

#### `humanizeArray(values, formatMethod, options?)`

Format an array of numbers.

**Parameters:**

- `values` (number[]): Array of numbers to format
- `formatMethod` (FormatMethod): The format method to use
- `options` (HumanizeOptions, optional): Formatting options

**Returns:** `string[]` - Array of formatted strings

---

#### `humanizeObject(obj, formatMap)`

Format an object with different format methods for each property.

**Parameters:**

- `obj` (Record<string, number>): Object with numeric values
- `formatMap` (Record<string, [FormatMethod, HumanizeOptions?]>): Map of property names to format configurations

**Returns:** `Record<string, string>` - Object with formatted strings

---

#### `humanizeRange(min, max, formatMethod, options?)`

Format a range of values.

**Parameters:**

- `min` (number): Minimum value
- `max` (number): Maximum value
- `formatMethod` (FormatMethod): The format method to use
- `options` (HumanizeOptions, optional): Formatting options

**Returns:** `string` - Formatted range (e.g., "1 KB - 5 MB")

---

### Comparison Functions

#### `compareHumanized(a, b, formatMethod, unitSystem?)`

Compare two humanized strings.

**Returns:** `number` - -1 if a < b, 0 if a === b, 1 if a > b

---

#### `isGreaterThan(a, b, formatMethod, unitSystem?)`

Check if first humanized value is greater than second.

**Returns:** `boolean`

---

#### `sortHumanized(values, formatMethod, order?, unitSystem?)`

Sort an array of humanized strings.

**Parameters:**

- `values` (string[]): Array of humanized strings
- `formatMethod` (FormatMethod): The format method used
- `order` ('asc' | 'desc', optional): Sort order (default: 'asc')
- `unitSystem` (UnitSystem, optional): The unit system used

**Returns:** `string[]` - Sorted array

---

### Unit-System-Specific Shortcuts

```typescript
// Weight
humanizeWeightMetric(value, options?)
humanizeWeightImperial(value, options?)

// Distance
humanizeDistanceMetric(value, options?)
humanizeDistanceImperial(value, options?)

// Speed
humanizeSpeedMetric(value, options?)
humanizeSpeedImperial(value, options?)

// Volume
humanizeVolumeMetric(value, options?)
humanizeVolumeImperial(value, options?)
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The library includes comprehensive tests covering:

- Core functionality (all 10 format methods)
- Temperature conversions
- Duration formatting
- Speed and volume conversions
- Percentage formatting
- Presets
- Batch processing
- Range formatting
- Comparison utilities
- Options and customization
- Error handling
- Parsing functionality

## 🔗 Examples

The library includes comprehensive examples demonstrating all features. Examples are organized in the `examples/` folder:

### Available Examples

- **`basic-usage.ts`** - Introduction to core features and basic formatting
- **`advanced-features.ts`** - Presets, localization, batch processing, comparison utilities
- **`real-world.ts`** - Real-world use cases (dashboards, file uploads, system monitoring, e-commerce, fitness, weather)
- **`comprehensive.ts`** - Complete showcase of all v2.0 features

### Running Examples

Run individual examples:

```bash
npm run example:basic          # Basic usage
npm run example:advanced       # Advanced features
npm run example:real-world     # Real-world scenarios
npm run example:comprehensive  # All features
```

Or run all examples:

```bash
npm run examples
```

Or build and run manually:

```bash
npm run build
node dist/examples/basic-usage.js
node dist/examples/advanced-features.js
node dist/examples/real-world.js
node dist/examples/comprehensive.js
```

See [`examples/README.md`](examples/README.md) for more details.

## 📊 Performance

- ⚡ Fast formatting with memoization for repeated conversions
- 🪶 Lightweight with zero dependencies
- 🌳 Tree-shakeable - import only what you need
- 📦 Small bundle size (~15KB minified)

## 🗺️ Roadmap

Future enhancements planned:

- React/Vue component wrappers
- CLI tool for command-line usage
- Browser CDN distribution
- Interactive playground website
- BigInt support for extremely large numbers
- Additional locales
- Custom unit definitions
- Plugin system for extensions

## 📝 Changelog

### v2.0.0 (Latest)

- ✨ Added 5 new format methods: temperature, duration, speed, volume, percentage
- ✨ Added scientific notation support
- ✨ Added 9 locales for internationalization
- ✨ Added 9 preset configurations
- ✨ Added batch processing (arrays, objects, ranges)
- ✨ Added comparison utilities
- ✨ Improved error handling
- ✨ Modular architecture with tree-shaking support
- 📝 Comprehensive TypeScript type definitions
- 🧪 35+ tests covering all features

### v1.0.0

- 🎉 Initial release
- ✨ 5 core format methods: data, weight, distance, currency, generic
- ✨ Metric and imperial unit system support
- ✨ Parsing functionality
- ✨ Unit conversion
- 📝 Full TypeScript support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**malwayson**

## 🙏 Acknowledgments

Thanks to all contributors and users of this library!

## 📮 Support

- 📧 Issues: [GitHub Issues](https://github.com/malwayson/humanize-number/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/malwayson/humanize-number/discussions)
- ⭐ Star this repo if you find it helpful!

---

Made with ❤️ by malwayson
