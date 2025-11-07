# Examples Index

Quick reference for all examples in this folder.

## Files Overview

| File                   | Description               | Key Features                                                                                                                           |
| ---------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `basic-usage.ts`       | Core functionality        | Generic numbers, data sizes, weights, distances, currency, options                                                                     |
| `advanced-features.ts` | v2.0 new features         | Temperature, duration, speed, volume, percentage, presets, localization, batch processing, comparison                                  |
| `real-world.ts`        | Practical applications    | Dashboard metrics, file uploads, system monitoring, e-commerce, fitness tracking, weather, cloud storage, API monitoring, data centers |
| `comprehensive.ts`     | Complete feature showcase | All features from v2.0 in one file                                                                                                     |

## Quick Start

```bash
# Run individual examples
npm run example:basic
npm run example:advanced
npm run example:real-world
npm run example:comprehensive

# Run all examples
npm run examples
```

## Example Categories

### Basic Features

- **Numbers**: Format any number (1234 → "1.23 K")
- **Data Sizes**: Bytes to petabytes (1024 → "1 KB")
- **Weights**: Grams to tons, pounds (1000 → "1 kg")
- **Distances**: Meters to megameters, miles (1000 → "1 km")
- **Currency**: Thousands to billions (1000000 → "1 M")

### Advanced Features (v2.0)

- **Temperature**: Celsius, Fahrenheit, Kelvin (25 → "25°C")
- **Duration**: Milliseconds to years (90 → "1 minute 30 seconds")
- **Speed**: km/h, mph, m/s (27.78 → "100 km/h")
- **Volume**: Liters, gallons (1 → "1 L")
- **Percentage**: Decimal to percent (0.45 → "45%")

### Productivity Features

- **Presets**: 9 pre-configured settings (compact, verbose, financial, etc.)
- **Localization**: 9 languages (en-US, de-DE, fr-FR, es-ES, ja-JP, zh-CN, pt-BR, ru-RU, en-GB)
- **Batch Processing**: Arrays, objects, ranges
- **Comparison**: Sort, compare humanized strings

### Real-World Scenarios

1. **Dashboard Metrics**: System stats, user counts
2. **File Management**: Upload progress, storage
3. **System Monitoring**: Server stats, memory, CPU
4. **E-commerce**: Product info, inventory
5. **Fitness Apps**: Workouts, distances, calories
6. **Weather Apps**: Temperature, wind, humidity
7. **Cloud Storage**: File organization
8. **API Monitoring**: Response times, error rates
9. **Data Centers**: Infrastructure stats
10. **File Sorting**: Sort by size

## Code Snippets

### Basic Usage

\`\`\`typescript
import { humanizeNumber } from "@malwayson/humanize-number";

humanizeNumber(1234); // "1.23 K"
humanizeNumber(1024, "data"); // "1 KB"
\`\`\`

### With Presets

\`\`\`typescript
import { humanizeNumber, presets } from "@malwayson/humanize-number";

humanizeNumber(1234567, "generic", presets.compact); // "1M"
\`\`\`

### Batch Processing

\`\`\`typescript
import { humanizeArray } from "@malwayson/humanize-number";

humanizeArray([1024, 1048576, 1073741824], "data");
// ["1 KB", "1 MB", "1 GB"]
\`\`\`

### Comparison

\`\`\`typescript
import { sortHumanized } from "@malwayson/humanize-number";

sortHumanized(["2 TB", "500 MB", "1 GB"], "data");
// ["500 MB", "1 GB", "2 TB"]
\`\`\`

## Learning Path

1. **Start with** `basic-usage.ts` - Learn the fundamentals
2. **Then explore** `advanced-features.ts` - Discover v2.0 features
3. **See applications** in `real-world.ts` - Understand practical usage
4. **Reference** `comprehensive.ts` - Complete feature catalog

## Tips

- All examples are TypeScript with full type safety
- Examples are self-contained and can run independently
- Output is formatted with emojis and clear sections
- Each example includes explanatory comments
- Real-world examples use realistic data

## Contributing Examples

Have a great use case? Consider adding it to `real-world.ts` or creating a new example file!

## More Information

- [Main README](../README.md) - Full documentation
- [Migration Guide](../MIGRATION.md) - Upgrading from v1.0
- [GitHub Repository](https://github.com/malwayson/humanize-number) - Source code and issues
