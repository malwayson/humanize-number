# 🆕 What's New in v3.1.0

## Plugin System 🔌

Create custom format methods for any unit type!

```typescript
import { registerPlugin, humanizeNumber } from "@malwayson/humanize-number";

// Register a custom plugin
registerPlugin({
  name: "seismic",
  formatMethod: "seismic",
  units: {
    metric: [{ value: 1, symbol: "M", name: "magnitude" }],
    imperial: [{ value: 1, symbol: "M", name: "magnitude" }],
  },
  defaultOptions: { precision: 1 },
});

// Use it!
humanizeNumber(7.5, "seismic"); // "7.5 M"
```

**6 Example Plugins Included:**

- 🌍 **Seismic** - Earthquake magnitude
- ☢️ **Radiation** - Radiation dose
- ⛰️ **Altitude** - Elevation
- 🔊 **Decibel** - Sound levels
- 🧪 **pH** - Acidity/alkalinity
- 💡 **Luminosity** - Light output

```typescript
import { examplePlugins } from "@malwayson/humanize-number";

registerPlugin(examplePlugins.seismic);
registerPlugin(examplePlugins.radiation);

humanizeNumber(6.8, "seismic"); // "6.8 M"
humanizeNumber(0.001, "radiation"); // "1.00 mSv"
```

[📖 Plugin Guide](./V3.1.0_GUIDE.md#plugin-system)

## Enhanced Currency Formatting 💰

Customize currency symbols and positioning!

```typescript
import { humanizeCurrency } from "@malwayson/humanize-number";

// Different currencies
humanizeCurrency(1500000, { currencySymbol: "€" }); // "€1.50 M"
humanizeCurrency(1500000, { currencySymbol: "£" }); // "£1.50 M"
humanizeCurrency(1500000, { currencySymbol: "¥" }); // "¥1.50 M"
humanizeCurrency(1500000, { currencySymbol: "₿" }); // "₿1.50 M"

// Position control
humanizeCurrency(2500000, {
  currencySymbol: "EUR",
  currencyPosition: "suffix",
}); // "2.50 M EUR"

// Stock market
humanizeCurrency(2500000000000, {
  currencySymbol: "$",
  precision: 1,
}); // "$2.5 T"
```

**Supported Symbols:** $, €, £, ¥, ₹, ₽, ₿, CHF, USD, EUR, and more!

[📖 Currency Guide](./V3.1.0_GUIDE.md#currency-symbol-support)

---

## Quick Links

- [📖 v3.1.0 Complete Guide](./V3.1.0_GUIDE.md)
- [🎉 Release Highlights](./V3.1.0_RELEASE.md)
- [📝 Changelog](./CHANGELOG.md)
- [🗺️ Roadmap](./V3_MINOR_RELEASES_ROADMAP.md)
- [💻 Examples](./examples/v3.1.0-demo.ts)

---

This section should be added to the main README.md to highlight the new v3.1.0 features.
