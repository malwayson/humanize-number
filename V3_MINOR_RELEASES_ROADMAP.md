# v3.x Minor Releases Roadmap

Strategic plan for releasing remaining features as minor versions after v3.0.0.

---

## ✅ Already Released in v3.0.0

- ✅ **Area formatting** (km², acres, hectares)
- ✅ **Energy formatting** (joules, kWh, calories)
- ✅ **Pressure formatting** (Pascal, PSI, bar)
- ✅ **Frequency formatting** (Hz, kHz, MHz, GHz)
- ✅ **Angle formatting** (degrees, radians, gradians)
- ✅ **Power formatting** (watts, horsepower)
- ✅ **Data Transfer Rates** (B/s, MB/s, Gbps)
- ✅ **Relative Time Formatting** (time ago/until, 9 locales)
- ✅ **Fraction Formatting** (1/2, ¾, mixed fractions)
- ✅ **Formatting Templates** (multi-value templates)
- ✅ **Better Memoization** (LRU cache with TTL)

---

## 📦 v3.1.0 - Plugin System & Extensions (Q1 2026)

**Theme:** Extensibility and customization

### Features

#### 1. **Custom Format Plugins/Extensions** 🎯 PRIMARY

```typescript
// Plugin interface
interface FormatPlugin {
  name: string;
  formats: string[];
  formatter: (value: number, options: any) => string;
  parser?: (str: string) => number;
  units?: UnitDefinition[];
}

// Register custom plugin
import { registerPlugin } from "@malwayson/humanize-number";

registerPlugin({
  name: "seismic",
  formats: ["richter", "magnitude"],
  formatter: (value, opts) => `${value.toFixed(1)} M`,
  units: [{ unit: "M", value: 1, symbol: "M" }],
});

humanizeNumber(7.5, "richter"); // "7.5 M"
```

#### 2. **Micro-packages** (Initial Setup)

- Create separate packages:
  - `@malwayson/humanize-data` (data formatting only)
  - `@malwayson/humanize-currency` (currency only)
  - `@malwayson/humanize-time` (duration + relative time)
- Shared core: `@malwayson/humanize-core`
- Users install only what they need

#### 3. **Bundle Size Optimizations**

- Implement dynamic imports for locale data
- Tree-shaking improvements
- Remove unused locales from builds
- Target: <5KB for minimal build (data + core only)

### Deliverables

- Plugin API documentation
- 3 example plugins (seismic, radiation, altitude)
- Micro-packages published to npm
- Bundle size benchmarks

### Testing

- Plugin registration/unregistration tests
- Plugin conflict resolution tests
- Micro-package integration tests
- Bundle size tests (<10KB main package)

---

## 📦 v3.2.0 - Financial & Parsing Enhancements (Q2 2026)

**Theme:** Advanced financial features and parsing

### Features

#### 1. **Financial Enhancements** 🎯 PRIMARY

```typescript
// Stock prices
humanizeStockPrice(142.35, {
  change: 2.15,
  changePercent: 1.53,
}); // "$142.35 ↑ +2.15 (+1.53%)"

// Market cap
humanizeMarketCap(2.5e12); // "$2.5 T"

// Financial ratios
humanizeRatio(0.15, "pe"); // "15.0x P/E"
humanizeRatio(0.035, "yield"); // "3.5% yield"

// Currency conversions
humanizeCurrency(100, "USD", {
  convertTo: "EUR",
  rate: 0.85,
}); // "€85.00"
```

#### 2. **Number Parsing Enhancements** 🎯 PRIMARY

```typescript
// Enhanced parsing with auto-detection
parseAdvanced("1.5K"); // { value: 1500, unit: "K", format: "generic" }
parseAdvanced("2 GB"); // { value: 2147483648, unit: "GB", format: "data" }
parseAdvanced("$1.2M"); // { value: 1200000, unit: "M", format: "currency" }

// Parse with validation
parseWithValidation("50 kg", {
  format: "weight",
  min: 0,
  max: 1000,
}); // { valid: true, value: 50000 }

// Parse multiple formats
parseBatch(["1 GB", "500 MB", "2 TB"], "data");
// [1073741824, 524288000, 2199023255552]

// Fuzzy parsing
parseFuzzy("approximately 1.5 kilometers");
// { value: 1500, confidence: 0.85, format: "distance" }
```

#### 3. **Financial Format Presets**

```typescript
presets.financial; // High precision, $ symbols
presets.stockPrice; // 2 decimals, change indicators
presets.marketCap; // Billions/Trillions
presets.accounting; // Parentheses for negatives
```

### Deliverables

- Financial formatting API
- Advanced parser with confidence scoring
- 50+ parsing tests
- Financial examples and docs

### Testing

- Stock price formatting tests
- Multi-currency conversion tests
- Advanced parser tests (100+ cases)
- Fuzzy parsing accuracy tests

---

## 📦 v3.3.0 - Animations & Visual Features (Q3 2026)

**Theme:** Dynamic UI and visual enhancements

### Features

#### 1. **Animated Value Changes** 🎯 PRIMARY

```typescript
// React/Vue/Angular components
import { AnimatedNumber } from "@malwayson/humanize-number/react";

<AnimatedNumber
  value={1024000}
  format="data"
  duration={1000}
  easing="easeOutCubic"
/>;
// Smoothly animates from 0 to "1 MB"

// Vanilla JS
const animator = animateValue({
  from: 0,
  to: 1048576,
  format: "data",
  duration: 1000,
  onUpdate: (value) => {
    element.textContent = value;
  },
});

// Count-up effect
countUp(element, {
  end: 1000000,
  format: "currency",
  duration: 2000,
});
```

#### 2. **Sparklines & Mini Charts**

```typescript
// Generate ASCII sparklines
generateSparkline([1024, 2048, 1536, 3072], "data");
// "1 KB ▁ 2 KB ▄ 1.5 KB ▂ 3 KB ▇"

// Format with trend indicators
humanizeWithTrend(2048, 1024, "data");
// "2 KB ↗ +100%"
```

#### 3. **Color-Coded Output**

```typescript
// Terminal colors
humanizeColored(75, "percentage", {
  thresholds: { low: 50, high: 80 },
  colors: { low: "green", med: "yellow", high: "red" },
});
// Returns ANSI colored string

// HTML/CSS classes
humanizeWithClass(2048, "data", { style: "badge" });
// '<span class="humanize-data-badge">2 KB</span>'
```

### Deliverables

- React/Vue/Svelte components
- Animation utilities
- Color/styling helpers
- Interactive examples

### Testing

- Animation timing tests
- Easing function tests
- Component render tests
- Cross-framework compatibility

---

## 📦 v3.4.0 - Runtime Support (Q4 2026)

**Theme:** Cross-platform and runtime compatibility

### Features

#### 1. **Deno Support** 🎯 PRIMARY

```typescript
// deno.json
{
  "imports": {
    "@malwayson/humanize-number": "npm:@malwayson/humanize-number@^3.4.0"
  }
}

// Deno-specific exports
import { humanizeData } from "@malwayson/humanize-number/deno";

// Works with Deno's module system
```

#### 2. **Bun Support** 🎯 PRIMARY

```typescript
// Optimized for Bun runtime
// package.json additions
{
  "bun": {
    "module": "./dist/bun/index.js"
  }
}

// Bun-specific optimizations
// - Native FFI for performance-critical paths
// - Bun.js specific APIs
```

#### 3. **Edge Runtime Support**

```typescript
// Cloudflare Workers
// Vercel Edge
// Deno Deploy
// Compatible with all edge runtimes

// Minimal bundle for edge
import { humanizeData } from "@malwayson/humanize-number/edge";
```

### Deliverables

- Deno module configuration
- Bun-optimized builds
- Edge runtime examples
- Cross-platform test suite

### Testing

- Deno integration tests
- Bun runtime tests
- Edge runtime tests (Workers, Vercel)
- Performance benchmarks across runtimes

---

## 📦 v3.5.0 - Advanced Use Cases (Q1 2027)

**Theme:** Power user features

### Features

#### 1. **Batch Processing Enhancements**

```typescript
// Parallel processing
humanizeArrayParallel(largeDataset, "data", {
  workers: 4,
});

// Stream processing
humanizeStream(readableStream, "data");
```

#### 2. **Custom Unit Systems**

```typescript
// Define custom unit systems
defineUnitSystem("nautical", {
  distance: [
    { unit: "ft", value: 1 },
    { unit: "fathom", value: 6 },
    { unit: "cable", value: 608 },
    { unit: "nm", value: 6076 },
  ],
});

humanizeDistance(12000, { unitSystem: "nautical" });
// "2 nm" (nautical miles)
```

#### 3. **Advanced Templates**

```typescript
// Conditional formatting
formatTemplate("Speed: {speed:speed|>100:fast|<50:slow}", values);

// Nested templates
formatTemplate("Server: {name} ({cpu:percentage}, {memory:data})", data);

// Custom formatters in templates
formatTemplate("{timestamp:date:YYYY-MM-DD}", values, {
  customFormatters: { date: customDateFormatter },
});
```

### Deliverables

- Stream processing API
- Custom unit system builder
- Advanced template engine
- Power user guide

### Testing

- Parallel processing tests
- Stream processing tests
- Custom unit system tests
- Template engine tests (100+ cases)

---

## 📦 v3.6.0 - Internationalization Expansion (Q2 2027)

**Theme:** Global reach

### Features

#### 1. **Additional Locales** (50+ total)

- Arabic (ar-SA)
- Hindi (hi-IN)
- Korean (ko-KR)
- Italian (it-IT)
- Dutch (nl-NL)
- Polish (pl-PL)
- Turkish (tr-TR)
- Swedish (sv-SE)
- And 40+ more...

#### 2. **RTL Support**

```typescript
humanizeNumber(1000, "data", {
  locale: "ar-SA",
  rtl: true,
});
// Proper right-to-left rendering
```

#### 3. **Cultural Adaptations**

```typescript
// Region-specific units
humanizeTemperature(25, {
  locale: "en-US", // Defaults to Fahrenheit
});
humanizeTemperature(25, {
  locale: "en-GB", // Defaults to Celsius
});
```

### Deliverables

- 50+ locale configurations
- RTL rendering support
- Cultural defaults
- Locale-specific tests

---

## Release Strategy

### Version Bumps

- **Major (4.0.0)**: Breaking changes only
- **Minor (3.x.0)**: New features, backward compatible
- **Patch (3.x.y)**: Bug fixes, performance improvements

### Release Cadence

- Minor releases: Every 3-4 months
- Patch releases: As needed
- Beta releases: 2 weeks before minor release

### Feature Flags

```typescript
// Enable experimental features
import { enableFeature } from "@malwayson/humanize-number";

enableFeature("animations"); // v3.3.0-beta
enableFeature("plugins"); // v3.1.0-beta
```

### Deprecation Policy

- Feature deprecation: Announced 2 minor versions before removal
- APIs deprecated in v3.x removed in v4.0
- Clear migration paths provided

---

## Testing Strategy

### Coverage Targets

- Unit tests: 100% coverage
- Integration tests: All feature combinations
- Performance tests: <5ms for common operations
- Bundle size: <25KB minified + gzip

### CI/CD Pipeline

- Run tests on Node.js 18, 20, 22
- Run tests on Deno 1.x
- Run tests on Bun 1.x
- Visual regression tests for components
- Bundle size monitoring

---

## Documentation Plan

### Per-Release Documentation

- **Release notes** in CHANGELOG.md
- **Migration guide** updates
- **API documentation** (TypeDoc)
- **Examples** for each feature
- **Video tutorials** for complex features

### Living Documentation

- Interactive playground
- CodeSandbox examples
- Stackblitz templates
- Performance comparisons

---

## Community Engagement

### Feedback Collection

- GitHub Discussions for feature requests
- RFC (Request for Comments) for major features
- Beta testing program
- User surveys after each release

### Contribution Guidelines

- Plugin contribution guide
- Locale contribution guide
- Feature request template
- Bug report template

---

## Success Metrics

### v3.1.0 Targets

- 10+ community plugins created
- Bundle size reduced by 30%
- 1000+ npm downloads/week

### v3.2.0 Targets

- 95%+ parsing accuracy
- Financial features adopted by 20+ projects
- 2000+ npm downloads/week

### v3.3.0 Targets

- 5+ framework integrations
- Animation components in 50+ projects
- 3000+ npm downloads/week

### v3.4.0 Targets

- Deno/Bun adoption by 100+ projects
- Edge runtime usage in 10+ production apps
- 4000+ npm downloads/week

### Overall v3.x Goals

- 10,000+ weekly downloads by v3.6.0
- 100+ contributors
- 500+ GitHub stars
- Featured in "Awesome JavaScript" lists

---

## Risk Mitigation

### Technical Risks

- **Bundle size creep**: Monitor with size-limit
- **Breaking changes**: Comprehensive testing + feature flags
- **Performance regression**: Automated benchmarks

### Community Risks

- **Low adoption**: Early beta program, clear docs
- **Plugin quality**: Review process, quality guidelines
- **Support burden**: Clear contribution guidelines

---

## Budget & Resources

### Development Time Estimates

- v3.1.0: 40-60 hours (plugin system is complex)
- v3.2.0: 30-40 hours (parsing + financial)
- v3.3.0: 50-70 hours (animations + components)
- v3.4.0: 20-30 hours (runtime compatibility)
- v3.5.0: 30-40 hours (advanced features)
- v3.6.0: 40-50 hours (50+ locales)

### Total: 210-290 hours across 18 months

---

## Next Steps for v3.1.0 (Immediate)

1. ✅ Publish v3.0.0 to npm
2. 📝 Design plugin API interface
3. 🔨 Implement plugin registration system
4. 📦 Create first micro-package (@malwayson/humanize-data)
5. 🧪 Write plugin system tests
6. 📖 Write plugin development guide
7. 🎉 Release v3.1.0-beta
8. 🐛 Collect feedback, fix bugs
9. 🚀 Release v3.1.0

**Estimated Timeline: 6-8 weeks after v3.0.0**

---

## Questions to Consider

1. Should we prioritize Deno/Bun support earlier (v3.1.0)?
2. Do we need a v3.x.0-LTS version for long-term support?
3. Should animations be a separate package from the start?
4. What's the minimum feature set for each micro-package?
5. How do we handle plugin conflicts/overrides?

---

**This roadmap is flexible and will adapt based on:**

- Community feedback
- Download metrics
- Feature requests
- Industry trends
- Competitive landscape

**Let's ship v3.0.0 first, then iterate based on real-world usage! 🚀**
