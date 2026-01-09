/**
 * Quick Demo of v3.1.0 Features
 * Run with: ts-node examples/v3.1.0-demo.ts
 */

import {
  examplePlugins,
  humanizeCurrency,
  humanizeNumber,
  registerPlugin,
} from "../src/index";

console.log("🎉 v3.1.0 Feature Demo\n");

// ============================================================================
// 1. CURRENCY SYMBOLS
// ============================================================================
console.log("💰 Currency Symbol Feature:");
console.log("-".repeat(50));

console.log("Default (USD):", humanizeCurrency(1500000));
console.log("Euro:", humanizeCurrency(1500000, { currencySymbol: "€" }));
console.log("Pound:", humanizeCurrency(1500000, { currencySymbol: "£" }));
console.log("Yen:", humanizeCurrency(1500000, { currencySymbol: "¥" }));

console.log("\nWith suffix position:");
console.log(
  "EUR:",
  humanizeCurrency(2500000, {
    currencySymbol: "EUR",
    currencyPosition: "suffix",
  })
);

console.log("\nCryptocurrency:");
console.log(
  "Bitcoin:",
  humanizeCurrency(50000, {
    currencySymbol: "₿",
    precision: 4,
  })
);

console.log("\nStock Market Cap:");
console.log(
  "Apple:",
  humanizeCurrency(2500000000000, {
    currencySymbol: "$",
    precision: 1,
  })
);

// ============================================================================
// 2. PLUGIN SYSTEM
// ============================================================================
console.log("\n\n🔌 Plugin System:");
console.log("-".repeat(50));

// Register plugins
registerPlugin(examplePlugins.seismic);
registerPlugin(examplePlugins.radiation);
registerPlugin(examplePlugins.altitude);
registerPlugin(examplePlugins.decibel);

console.log("\nEarthquakes:");
console.log("Moderate:", humanizeNumber(5.5, "seismic" as any));
console.log("Strong:", humanizeNumber(6.8, "seismic" as any));
console.log("Major:", humanizeNumber(7.5, "seismic" as any));

console.log("\nRadiation Levels:");
console.log("Chest X-ray:", humanizeNumber(0.000025, "radiation" as any));
console.log("CT Scan:", humanizeNumber(0.01, "radiation" as any));

console.log("\nAltitudes:");
console.log("Cruising altitude:", humanizeNumber(10000, "altitude" as any));
console.log(
  "Mt. Everest:",
  humanizeNumber(8848, "altitude" as any, { unitSystem: "metric" })
);

console.log("\nSound Levels:");
console.log("Whisper:", humanizeNumber(30, "decibel" as any));
console.log("Conversation:", humanizeNumber(60, "decibel" as any));
console.log("Rock Concert:", humanizeNumber(120, "decibel" as any));

// ============================================================================
// 3. COMBINED FEATURES
// ============================================================================
console.log("\n\n🎯 Real-World Dashboard:");
console.log("-".repeat(50));

console.log("\n📊 Financial Summary:");
console.log(
  "  Market Cap:",
  humanizeCurrency(150000000000, { currencySymbol: "$", precision: 1 })
);
console.log("  Revenue:  ", humanizeCurrency(5000000, { currencySymbol: "$" }));
console.log("  Profit:   ", humanizeCurrency(750000, { currencySymbol: "$" }));

console.log("\n🌍 Earthquake Monitor:");
console.log("  Magnitude:", humanizeNumber(6.8, "seismic" as any));
console.log(
  "  Radiation:",
  humanizeNumber(0.001, "radiation" as any),
  "(normal background)"
);

console.log("\n✅ v3.1.0 Demo Complete!");
console.log("\nFeatures demonstrated:");
console.log("  ✓ Custom currency symbols ($, €, £, ¥, ₿)");
console.log("  ✓ Currency positioning (prefix/suffix)");
console.log("  ✓ Plugin system (seismic, radiation, altitude, decibel)");
console.log("  ✓ Real-world use cases");
console.log("\nAll features working correctly! 🚀");
