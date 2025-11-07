# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-07

### 🎉 Major Release - Comprehensive Feature Expansion

Version 2.0.0 represents a major evolution of the library with **100% backward compatibility**. All v1.0 code will continue to work without any changes.

### ✨ Added

#### New Format Methods (5)

- **Temperature formatting**: Celsius, Fahrenheit, and Kelvin support with conversions
  - `humanizeTemperature(25, { temperatureScale: "celsius" })` → "25°C"
- **Duration formatting**: Milliseconds to years with human-readable output
  - `humanizeDuration(3661)` → "1 hour 1 minute 1 second"
- **Speed formatting**: km/h, mph, m/s, knots with conversions
  - `humanizeSpeed(27.78, { unitSystem: "metric" })` → "100 km/h"
- **Volume formatting**: Liters, gallons, and smaller units
  - `humanizeVolume(1, { unitSystem: "metric" })` → "1 L"
- **Percentage formatting**: Decimal to percentage conversion
  - `humanizePercentage(0.45)` → "45%"

#### Presets (9)

- `compact`: Minimal formatting for UI badges
- `verbose`: Detailed formatting with full unit names
- `financial`: Precise 2-decimal formatting for financial data
- `scientific`: Scientific notation for large numbers
- `approximate`: Rounded values for estimates
- `metric`: Forces metric unit system
- `imperial`: Forces imperial unit system
- `minimal`: Lowercase, no spaces for URLs/CSS
- `detailed`: Maximum precision and verbosity

#### Localization (9 locales)

- English (US, UK)
- German (Germany)
- French (France)
- Spanish (Spain)
- Japanese (Japan)
- Chinese (China)
- Portuguese (Brazil)
- Russian (Russia)
- Custom locale support

#### Batch Processing

- `humanizeArray()`: Process arrays of numbers
- `humanizeObject()`: Process objects with mixed format methods
- `humanizeRange()`: Format ranges with automatic unit selection

#### Comparison Utilities

- `compareHumanized()`: Compare two humanized strings
- `isGreaterThan()`: Check if one value is greater than another
- `sortHumanized()`: Sort arrays of humanized strings

#### Conversion Functions

- `convertTemperature()`: Convert between Celsius, Fahrenheit, Kelvin
- `convertSpeed()`: Convert between km/h and mph
- `convertVolume()`: Convert between liters and gallons
- `convertUnits()`: Generic conversion with auto-detection

#### Additional Options

- `showSign`: Display + for positive numbers
- `verboseUnits`: Use full unit names (e.g., "kilograms" instead of "kg")
- `scientific`: Enable scientific notation
- `locale`: Set locale for number formatting
- `temperatureScale`: Choose temperature scale
- `combineUnits`: Control unit display in ranges

#### Shorthand Functions

- 8 unit-system-specific shortcuts:
  - `humanizeWeightMetric()`, `humanizeWeightImperial()`
  - `humanizeDistanceMetric()`, `humanizeDistanceImperial()`
  - `humanizeSpeedMetric()`, `humanizeSpeedImperial()`
  - `humanizeVolumeMetric()`, `humanizeVolumeImperial()`

### 🏗️ Architecture

#### Modular Structure

- Reorganized into 8 separate modules for better tree-shaking:
  - `src/types/`: TypeScript type definitions
  - `src/units/`: Unit definitions for all format methods
  - `src/formatters/`: Main formatting logic
  - `src/converters/`: Unit conversion functions
  - `src/utils/`: Utility functions
  - `src/presets/`: Preset configurations
  - `src/locales/`: Locale configurations
  - `src/index.ts`: Main exports

#### Examples

- Created `examples/` folder with 4 comprehensive example files:
  - `basic-usage.ts`: Core features demonstration
  - `advanced-features.ts`: v2.0 features showcase
  - `real-world.ts`: 10 practical use cases
  - `comprehensive.ts`: Complete feature catalog

### 🧪 Testing

- Added 35 comprehensive tests for v2.0 features
- Total test coverage: 67 tests (32 from v1.0 + 35 new)
- All tests passing with 100% success rate

### 📚 Documentation

- Completely rewritten README.md with:
  - Quick start guide
  - Detailed API reference
  - 6 real-world use case examples
  - Complete options documentation
  - Migration guide compatibility notes
- Created `MIGRATION.md`: Comprehensive v1.0 → v2.0 migration guide
- Created `examples/README.md`: Guide for running examples
- Created `examples/INDEX.md`: Quick reference for all examples

### 📦 Developer Experience

- Added 5 new npm scripts:
  - `npm run example:basic`
  - `npm run example:advanced`
  - `npm run example:real-world`
  - `npm run example:comprehensive`
  - `npm run examples` (runs all)
- Enhanced TypeScript types with comprehensive interfaces
- Added JSDoc comments throughout codebase

### 🎯 Performance

- Implemented memoization for repeated conversions
- Optimized unit selection algorithm
- Reduced memory allocations
- Tree-shakeable exports for smaller bundles

### 🔧 Improvements

- Enhanced error handling with descriptive messages
- Better NaN and Infinity handling
- Improved validation for edge cases
- More precise unit conversions

### 📊 Statistics

- **Code size**: ~15KB minified
- **Format methods**: 10 (up from 5)
- **Presets**: 9
- **Locales**: 9
- **Tests**: 67 (100% passing)
- **Examples**: 4 comprehensive files
- **Zero dependencies**: No external runtime dependencies

## [1.0.0] - 2024-XX-XX

### 🎉 Initial Release

#### Added

- **5 Format Methods**:

  - `data`: Bytes to terabytes (B, KB, MB, GB, TB)
  - `weight`: Grams to tons with metric/imperial
  - `distance`: Meters to kilometers/miles with metric/imperial
  - `currency`: Thousands to billions (K, M, B)
  - `generic`: Thousands to trillions (K, M, B, T)

- **Core Features**:

  - Metric and imperial unit system support
  - Customizable precision, separators, and spacing
  - Parsing humanized strings back to numbers
  - Unit conversion between metric and imperial
  - Full TypeScript support with type definitions

- **Configuration Options**:

  - `precision`: Control decimal places
  - `separator`: Custom decimal separator
  - `delimiter`: Custom thousands delimiter
  - `spacer`: Custom spacing between number and unit
  - `lowercase`: Lowercase unit symbols
  - `round`: Round to nearest integer
  - `unitSystem`: Choose metric or imperial

- **Shorthand Functions**:

  - `humanizeData()`, `humanizeWeight()`, `humanizeDistance()`, `humanizeCurrency()`
  - `humanizeWeightMetric()`, `humanizeWeightImperial()`
  - `humanizeDistanceMetric()`, `humanizeDistanceImperial()`

- **Conversion Functions**:

  - `convertWeight()`: Convert between metric and imperial weights
  - `convertDistance()`: Convert between metric and imperial distances
  - `parseHumanized()`: Parse humanized strings back to numbers

- **Testing**:
  - 32 comprehensive tests covering all features
  - 100% test pass rate

---

## Migration Guide

### From v1.0 to v2.0

**Good news**: v2.0 is **100% backward compatible**! No changes required to existing code.

See [MIGRATION.md](MIGRATION.md) for:

- Detailed feature comparison
- Recommended improvements
- New TypeScript types
- Module structure changes
- Performance benefits

## Links

- [GitHub Repository](https://github.com/malwayson/humanize-number)
- [npm Package](https://www.npmjs.com/package/@malwayson/humanize-number)
- [Documentation](README.md)
- [Migration Guide](MIGRATION.md)
- [Examples](examples/)

---

**Full Changelog**: [v1.0.0...v2.0.0](https://github.com/malwayson/humanize-number/compare/v1.0.0...v2.0.0)
