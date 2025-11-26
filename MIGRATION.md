# Migration Guide

Complete migration guide for `@malwayson/humanize-number`.

---

## v2.x → v3.0

### 🎉 Good News: Backward Compatible!

v3.0 is **100% backward compatible** with v2.x. All existing code will continue to work without any changes.

### What's New in v3.0

#### 7 New Format Methods

```typescript
import {
  humanizeArea,
  humanizeEnergy,
  humanizePressure,
  humanizeFrequency,
  humanizeAngle,
  humanizePower,
  humanizeTransferRate,
} from "@malwayson/humanize-number";

humanizeArea(1000000, { unitSystem: "metric" }); // "1 km²"
humanizeEnergy(1000, { unitSystem: "metric" }); // "1 kJ"
humanizePressure(101325, { unitSystem: "metric" }); // "1.01 bar"
humanizeFrequency(1000000); // "1 MHz"
humanizeAngle(45); // "45 °"
humanizePower(1000, { unitSystem: "metric" }); // "1 kW"
humanizeTransferRate(1048576); // "1 MB/s/s"
```

#### Relative Time Formatting (NEW!)

```typescript
import {
  humanizeRelativeTime,
  timeAgo,
  timeUntil,
} from "@malwayson/humanize-number";

// Before v3.0
const hours = Math.floor((Date.now() - timestamp) / 3600000);
const message = `${hours} hours ago`;

// v3.0
humanizeRelativeTime(new Date(timestamp)); // "2 hours ago"
timeAgo(new Date(timestamp)); // "2 hours ago"
timeUntil(new Date(futureTimestamp)); // "in 5 days"

// Multi-locale support
humanizeRelativeTime(date, { locale: "de-DE" }); // "vor 2 Stunden"
```

#### Value Diff Tracking (NEW!)

```typescript
import { humanizeDiff } from "@malwayson/humanize-number";

// Before v3.0
const diff = newValue - oldValue;
const percent = ((diff / oldValue) * 100).toFixed(1);

// v3.0
const result = humanizeDiff(1024, 2048, "data");
console.log(result.value); // "+1 KB"
console.log(result.direction); // "increase"
console.log(result.percentString); // "+100.0%"
```

#### Template Formatting (NEW!)

```typescript
import { formatTemplate } from "@malwayson/humanize-number";

// Before v3.0
const message = `File: ${humanizeNumber(size, "data")}, Speed: ${humanizeNumber(
  speed,
  "speed"
)}`;

// v3.0
formatTemplate("File: {size:data}, Speed: {speed:speed}", {
  values: { size: 1048576, speed: 27.78 },
  formats: {},
}); // "File: 1 MB, Speed: 100 km/h"
```

#### Fraction Formatting (NEW!)

```typescript
import { humanizeFraction } from "@malwayson/humanize-number";

humanizeFraction(0.5); // "1/2"
humanizeFraction(0.75, { unicode: true }); // "¾"
humanizeFraction(1.5, { mixed: true }); // "1 1/2"
```

#### LRU Cache (NEW!)

```typescript
import { globalCache } from "@malwayson/humanize-number";

globalCache.enable(); // Enabled by default
globalCache.disable();
globalCache.clear();

const stats = globalCache.getStats();
console.log(stats.size, stats.maxSize, stats.enabled);
```

### New TypeScript Types

```typescript
import type {
  RelativeTimeOptions,
  ValueDiff,
  TemplateOptions,
  FractionOptions,
  CacheOptions,
} from "@malwayson/humanize-number";
```

### Breaking Changes

**None!** Version 3.0.0 is fully backward compatible.

### Upgrading

```bash
npm install @malwayson/humanize-number@latest
```

All tests should pass without changes. Adopt new features gradually.

---

## v1.0 → v2.0

### 🎉 Good News: Backward Compatible!

v2.0 is **100% backward compatible** with v1.0. All existing code will continue to work without any changes.

## What's New in v2.0

### New Format Methods

```typescript
// v1.0 - Only these were available
humanizeNumber(1024, "data");
humanizeNumber(1000, "weight");
humanizeNumber(1000, "distance");
humanizeNumber(1000000, "currency");
humanizeNumber(1234, "generic");

// v2.0 - NEW format methods available
humanizeTemperature(25, { temperatureScale: "celsius" }); // "25°C"
humanizeDuration(90); // "1 minute 30 seconds"
humanizeSpeed(27.78); // "100 km/h"
humanizeVolume(1); // "1 L"
humanizePercentage(0.45); // "45%"
```

### New Options

```typescript
// v1.0 options
{
  precision: 2,
  separator: ".",
  delimiter: ",",
  spacer: " ",
  lowercase: false,
  round: false,
  unitSystem: "metric"
}

// v2.0 - NEW options added
{
  // All v1.0 options still work +
  temperatureScale: "celsius",      // NEW: For temperature formatting
  showSign: false,                  // NEW: Show + for positive numbers
  verboseUnits: false,              // NEW: Use full unit names
  scientificNotation: false,        // NEW: Use scientific notation
  scientificThreshold: 1e6,         // NEW: Threshold for scientific notation
  locale: "en-US",                  // NEW: Locale for number formatting
  combineUnits: true                // NEW: For range formatting
}
```

### Presets

```typescript
// v1.0 - No presets, had to configure manually
humanizeNumber(1234567, "generic", {
  precision: 0,
  spacer: "",
});

// v2.0 - Use convenient presets
import { presets } from "@malwayson/humanize-number";
humanizeNumber(1234567, "generic", presets.compact); // "1M"
humanizeNumber(1000, "weight", presets.verbose); // "1.00 kilograms"
humanizeNumber(1234567.89, "currency", presets.financial); // "1.23 M"
```

### Batch Processing

```typescript
// v1.0 - Had to map manually
const sizes = [1024, 1048576, 1073741824];
sizes.map((size) => humanizeNumber(size, "data"));

// v2.0 - Built-in batch processing
import { humanizeArray, humanizeObject } from "@malwayson/humanize-number";

humanizeArray(sizes, "data"); // ["1 KB", "1 MB", "1 GB"]

humanizeObject(
  {
    cpu: 0.45,
    memory: 8589934592,
  },
  {
    cpu: ["percentage"],
    memory: ["data"],
  }
);
// { cpu: "45%", memory: "8 GB" }
```

### Comparison Utilities

```typescript
// v1.0 - Had to parse and compare manually
const value1 = parseHumanized("2 GB", "data");
const value2 = parseHumanized("1500 MB", "data");
value1 > value2; // true

// v2.0 - Built-in comparison utilities
import {
  compareHumanized,
  sortHumanized,
  isGreaterThan,
} from "@malwayson/humanize-number";

isGreaterThan("2 GB", "1500 MB", "data"); // true
compareHumanized("2 GB", "1500 MB", "data"); // 1

const unsorted = ["2 TB", "500 MB", "1 GB", "128 GB"];
sortHumanized(unsorted, "data"); // ["500 MB", "1 GB", "128 GB", "2 TB"]
```

### Localization

```typescript
// v1.0 - Only en-US formatting
humanizeNumber(1234.56); // "1.23 K"

// v2.0 - 9 locales supported
humanizeNumber(1234.56, "generic", { locale: "de-DE" }); // "1,23 K"
humanizeNumber(1234.56, "generic", { locale: "fr-FR" }); // "1,23 M"
humanizeNumber(1234.56, "generic", { locale: "ja-JP" }); // "1.23 K"
```

### Range Formatting

```typescript
// v1.0 - Had to format separately and concatenate
const min = humanizeNumber(500000000, "data");
const max = humanizeNumber(1000000000000, "data");
`${min} - ${max}`; // "500 MB - 1 TB"

// v2.0 - Built-in range formatting
import { humanizeRange } from "@malwayson/humanize-number";
humanizeRange(500000000, 1000000000000, "data"); // "500 MB - 1 TB"
```

## Breaking Changes

**None!** 🎉 v2.0 is fully backward compatible with v1.0.

## Recommended Updates

While your v1.0 code will work fine, consider these improvements:

### 1. Use Shorthand Functions

```typescript
// v1.0 style (still works)
humanizeNumber(1024, "data");
humanizeNumber(1000, "weight");

// v2.0 style (more concise)
humanizeData(1024);
humanizeWeight(1000);
```

### 2. Use Presets

```typescript
// v1.0 style (still works)
humanizeNumber(1234567, "generic", {
  precision: 0,
  spacer: "",
  round: true,
});

// v2.0 style (cleaner)
humanizeNumber(1234567, "generic", presets.compact);
```

### 3. Use Batch Processing

```typescript
// v1.0 style (still works)
const formatted = values.map((v) => humanizeNumber(v, "data"));

// v2.0 style (more efficient)
const formatted = humanizeArray(values, "data");
```

### 4. Use Comparison Utilities

```typescript
// v1.0 style (still works)
const a = parseHumanized("2 GB", "data");
const b = parseHumanized("1 GB", "data");
const sorted = values
  .map((v) => ({ str: v, num: parseHumanized(v, "data") }))
  .sort((a, b) => a.num - b.num)
  .map((v) => v.str);

// v2.0 style (much simpler)
const sorted = sortHumanized(values, "data");
```

## TypeScript Changes

### New Types Available

```typescript
// v2.0 - Additional types
import {
  // v1.0 types (still available)
  FormatMethod,
  UnitSystem,
  HumanizeOptions,

  // NEW v2.0 types
  TemperatureScale, // "celsius" | "fahrenheit" | "kelvin"
  LocaleCode, // "en-US" | "de-DE" | etc.
  LocaleConfig, // Locale configuration interface
  Preset, // Preset configuration type
} from "@malwayson/humanize-number";
```

### Updated FormatMethod Type

```typescript
// v1.0
type FormatMethod = "data" | "weight" | "distance" | "currency" | "generic";

// v2.0 (backward compatible)
type FormatMethod =
  | "data"
  | "weight"
  | "distance"
  | "currency"
  | "generic"
  | "temperature" // NEW
  | "duration" // NEW
  | "speed" // NEW
  | "volume" // NEW
  | "percentage"; // NEW
```

## Module Structure Changes

### v1.0 - Single File

```
humanize-number/
├── index.ts
├── package.json
└── README.md
```

### v2.0 - Modular Structure

```
humanize-number/
├── src/
│   ├── index.ts           # Main exports
│   ├── types/             # Type definitions
│   ├── units/             # Unit definitions
│   ├── formatters/        # Formatting logic
│   ├── converters/        # Conversion functions
│   ├── utils/             # Utility functions
│   ├── presets/           # Preset configurations
│   └── locales/           # Locale configurations
├── dist/                  # Compiled output
├── package.json
└── README.md
```

**Benefits:**

- Tree-shaking support (smaller bundles)
- Better code organization
- Easier to maintain and extend
- Same public API (no import changes needed)

## Performance Improvements

v2.0 includes performance optimizations:

- ✅ Memoization for repeated conversions
- ✅ Optimized unit selection algorithm
- ✅ Cached locale configurations
- ✅ Reduced memory allocations

## Testing

v2.0 includes comprehensive test coverage (35+ tests):

```bash
npm test
```

Test coverage:

- ✅ All 10 format methods
- ✅ All conversion functions
- ✅ Presets
- ✅ Batch processing
- ✅ Comparison utilities
- ✅ Error handling
- ✅ Edge cases

## Examples

See comprehensive examples:

```bash
npm run build
node dist/examples.v2.js
```

## Getting Help

- 📖 [Documentation](README.md)
- 🐛 [Report Issues](https://github.com/malwayson/humanize-number/issues)
- 💬 [Discussions](https://github.com/malwayson/humanize-number/discussions)

## Summary

✅ **No breaking changes** - All v1.0 code works in v2.0  
✨ **New features** - 5 new format methods, presets, batch processing, comparison utilities  
🚀 **Performance** - Optimized and more efficient  
📝 **Documentation** - Comprehensive guides and examples  
🧪 **Testing** - 35+ tests covering all functionality

**Upgrade today to take advantage of the new features while maintaining full compatibility!**

```bash
npm install @malwayson/humanize-number@latest
```
