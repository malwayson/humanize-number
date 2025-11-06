# @malwayson/humanize-number

A powerful TypeScript library to convert numbers into human-readable formats with support for various format methods including data sizes, weights, distances, currency, and generic formats.

## Installation

```bash
npm install @malwayson/humanize-number
```

## Features

- 🔢 Convert numbers to human-readable formats
- 📊 Support for multiple format methods (data, weight, distance, currency, generic)
- 🌍 **Multiple unit systems**: Metric and Imperial support
- ⚙️ Highly customizable formatting options
- 🔄 Parse humanized strings back to numbers
- 🔄 **Unit conversion** between metric and imperial systems
- 📝 Full TypeScript support
- 🧪 Comprehensive test coverage
- 🚀 Zero dependencies

## Quick Start

```typescript
import { humanizeNumber } from "@malwayson/humanize-number";

// Generic format (default)
humanizeNumber(1234); // "1.23 K"
humanizeNumber(1234567); // "1.23 M"
humanizeNumber(1234567890); // "1.23 B"

// Data format
humanizeNumber(1024, "data"); // "1 KB"
humanizeNumber(1048576, "data"); // "1 MB"
humanizeNumber(1073741824, "data"); // "1 GB"

// Weight format (metric - default)
humanizeNumber(1000, "weight"); // "1 kg"
humanizeNumber(1500, "weight"); // "1.5 kg"
humanizeNumber(500, "weight"); // "500 g"

// Weight format (imperial)
humanizeNumber(453.592, "weight", { unitSystem: "imperial" }); // "1 lb"
humanizeNumber(907184.74, "weight", { unitSystem: "imperial" }); // "1 ton"

// Distance format (metric - default)
humanizeNumber(1000, "distance"); // "1 km"
humanizeNumber(100, "distance"); // "100 m"
humanizeNumber(0.5, "distance"); // "50 cm"

// Distance format (imperial)
humanizeNumber(1609.344, "distance", { unitSystem: "imperial" }); // "1 mi"
humanizeNumber(0.3048, "distance", { unitSystem: "imperial" }); // "1 ft"

// Currency format
humanizeNumber(1000000, "currency"); // "1 M"
humanizeNumber(1500000, "currency"); // "1.5 M"
```

## Format Methods

### Available Format Methods

- **`generic`** (default): K, M, B, T (thousands, millions, billions, trillions)
- **`data`**: B, KB, MB, GB, TB (bytes, kilobytes, megabytes, gigabytes, terabytes)
- **`weight`**:
  - _Metric_: mg, g, kg, t (milligrams, grams, kilograms, metric tons)
  - _Imperial_: gr, oz, lb, ton (grains, ounces, pounds, short tons)
- **`distance`**:
  - _Metric_: mm, cm, m, km, Mm (millimeters, centimeters, meters, kilometers, megameters)
  - _Imperial_: in, ft, yd, mi (inches, feet, yards, miles)
- **`currency`**: K, M, B (thousands, millions, billions)

### Unit Systems

The library supports two unit systems:

- **`metric`** (default): Uses metric units (kg, m, etc.)
- **`imperial`**: Uses imperial/US customary units (lb, ft, etc.)

## Configuration Options

```typescript
interface HumanizeOptions {
  precision?: number; // Number of decimal places (default: 2)
  separator?: string; // Decimal separator (default: '.')
  delimiter?: string; // Thousands delimiter (default: ',')
  spacer?: string; // Space between number and unit (default: ' ')
  lowercase?: boolean; // Use lowercase units (default: false)
  round?: boolean; // Round to nearest integer (default: false)
  unitSystem?: UnitSystem; // Unit system: 'metric' | 'imperial' (default: 'metric')
}
```

### Examples with Options

```typescript
import { humanizeNumber } from "@malwayson/humanize-number";

// Custom precision
humanizeNumber(1234, "generic", { precision: 0 }); // "1 K"
humanizeNumber(1234, "generic", { precision: 3 }); // "1.234 K"

// Custom separators
humanizeNumber(1234, "generic", { separator: "," }); // "1,23 K"
humanizeNumber(1234567, "generic", { delimiter: " " }); // "1.23 M"

// No spacing
humanizeNumber(1234, "generic", { spacer: "" }); // "1.23K"

// Lowercase units
humanizeNumber(1024, "data", { lowercase: true }); // "1 kb"

// Rounded values
humanizeNumber(1734, "generic", { round: true }); // "2 K"
```

## Shorthand Functions

For convenience, the library provides shorthand functions for each format method:

```typescript
import {
  humanizeData,
  humanizeWeight,
  humanizeDistance,
  humanizeCurrency,
  // Unit system specific functions
  humanizeWeightMetric,
  humanizeWeightImperial,
  humanizeDistanceMetric,
  humanizeDistanceImperial,
} from "@malwayson/humanize-number";

// Standard functions (default to metric)
humanizeData(1024); // "1 KB"
humanizeWeight(1000); // "1 kg"
humanizeDistance(1000); // "1 km"
humanizeCurrency(1000000); // "1 M"

// Unit system specific functions
humanizeWeightMetric(1000); // "1 kg"
humanizeWeightImperial(453.592); // "1 lb"
humanizeDistanceMetric(1000); // "1 km"
humanizeDistanceImperial(1609.344); // "1 mi"
```

## Parsing Humanized Strings

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
```

## Unit Conversion

Convert values between metric and imperial systems:

```typescript
import { convertWeight, convertDistance } from "@malwayson/humanize-number";

// Weight conversion
convertWeight(1000, "metric", "imperial"); // 2.2046 (grams to pounds)
convertWeight(5, "imperial", "metric"); // 2267.96 (pounds to grams)

// Distance conversion
convertDistance(1000, "metric", "imperial"); // 3280.84 (meters to feet)
convertDistance(10, "imperial", "metric"); // 3.048 (feet to meters)
```

## Advanced Usage

### Complex Formatting

```typescript
const options = {
  precision: 1,
  separator: ",",
  delimiter: ".",
  spacer: " ",
  lowercase: true,
  round: false,
};

humanizeNumber(1234567.89, "data", options); // "1,2 mb"
```

### Handling Edge Cases

```typescript
humanizeNumber(0); // "0 "
humanizeNumber(-1234); // "-1.23 K"
humanizeNumber(Infinity); // "Infinity"
humanizeNumber(NaN); // "NaN"
```

## TypeScript Support

The library is written in TypeScript and includes full type definitions:

```typescript
import {
  humanizeNumber,
  FormatMethod,
  HumanizeOptions,
} from "@malwayson/humanize-number";

const formatMethod: FormatMethod = "data";
const options: HumanizeOptions = { precision: 1 };
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

## API Reference

### `humanizeNumber(value, formatMethod?, options?)`

Main function to convert numbers to human-readable format.

**Parameters:**

- `value` (number): The number to convert
- `formatMethod` (FormatMethod, optional): The format method to use (default: 'generic')
- `options` (HumanizeOptions, optional): Formatting options

**Returns:** `string` - The formatted string

### `parseHumanized(humanizedString, formatMethod?, unitSystem?)`

Parse a humanized string back to a number.

**Parameters:**

- `humanizedString` (string): The humanized string to parse
- `formatMethod` (FormatMethod, optional): The format method that was used (default: 'generic')
- `unitSystem` (UnitSystem, optional): The unit system that was used (default: 'metric')

**Returns:** `number` - The parsed number

### `convertWeight(value, fromSystem, toSystem)`

Convert weight between unit systems.

**Parameters:**

- `value` (number): The weight value to convert
- `fromSystem` (UnitSystem): The source unit system
- `toSystem` (UnitSystem): The target unit system

**Returns:** `number` - The converted value

### `convertDistance(value, fromSystem, toSystem)`

Convert distance between unit systems.

**Parameters:**

- `value` (number): The distance value to convert
- `fromSystem` (UnitSystem): The source unit system
- `toSystem` (UnitSystem): The target unit system

**Returns:** `number` - The converted value

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
