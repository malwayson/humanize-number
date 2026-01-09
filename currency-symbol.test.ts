/**
 * Tests for v3.1.0 Currency Symbol Feature
 */

import { humanizeCurrency } from "./src/index";

describe("Currency Symbol Feature - v3.1.0", () => {
  describe("currencySymbol option", () => {
    it("should use default $ symbol", () => {
      const result = humanizeCurrency(1000);
      expect(result).toBe("$1.00 K");
    });

    it("should use custom currency symbol", () => {
      const result = humanizeCurrency(1000, { currencySymbol: "€" });
      expect(result).toBe("€1.00 K");
    });

    it("should support various currency symbols", () => {
      const testCases = [
        { symbol: "£", expected: "£1.00 K" },
        { symbol: "¥", expected: "¥1.00 K" },
        { symbol: "₹", expected: "₹1.00 K" },
        { symbol: "₽", expected: "₽1.00 K" },
        { symbol: "₿", expected: "₿1.00 K" },
        { symbol: "CHF", expected: "CHF1.00 K" },
      ];

      testCases.forEach(({ symbol, expected }) => {
        const result = humanizeCurrency(1000, { currencySymbol: symbol });
        expect(result).toBe(expected);
      });
    });
  });

  describe("currencyPosition option", () => {
    it("should use prefix position by default", () => {
      const result = humanizeCurrency(1500000, { currencySymbol: "€" });
      expect(result).toBe("€1.50 M");
    });

    it("should support suffix position", () => {
      const result = humanizeCurrency(1500000, {
        currencySymbol: "€",
        currencyPosition: "suffix",
      });
      expect(result).toBe("1.50 M €");
    });

    it("should work with prefix position explicitly set", () => {
      const result = humanizeCurrency(2500, {
        currencySymbol: "$",
        currencyPosition: "prefix",
      });
      expect(result).toBe("$2.50 K");
    });
  });

  describe("Combined options", () => {
    it("should work with precision", () => {
      const result = humanizeCurrency(1234.567, {
        currencySymbol: "£",
        precision: 3,
      });
      expect(result).toBe("£1.235 K");
    });

    it("should work with approximate", () => {
      const result = humanizeCurrency(1500, {
        currencySymbol: "¥",
        approximate: true,
      });
      expect(result).toBe("~¥1.50 K");
    });

    it("should work with negative numbers", () => {
      const result = humanizeCurrency(-5000, { currencySymbol: "$" });
      expect(result).toBe("-$5.00 K");
    });

    it("should work with showSign for positive numbers", () => {
      const result = humanizeCurrency(3000, {
        currencySymbol: "$",
        showSign: true,
      });
      expect(result).toBe("+$3.00 K");
    });

    it("should work with custom delimiter and separator", () => {
      const result = humanizeCurrency(1234567, {
        currencySymbol: "€",
        delimiter: ".",
        separator: ",",
      });
      expect(result).toBe("€1,23 M");
    });

    it("should work with lowercase units", () => {
      const result = humanizeCurrency(1500000, {
        currencySymbol: "$",
        lowercase: true,
      });
      expect(result).toBe("$1.50 m");
    });

    it("should work with verboseUnits", () => {
      const result = humanizeCurrency(1500000, {
        currencySymbol: "$",
        verboseUnits: true,
      });
      expect(result).toBe("$1.50 million");
    });

    it("should work with suffix position and approximate", () => {
      const result = humanizeCurrency(2500000, {
        currencySymbol: "CHF",
        currencyPosition: "suffix",
        approximate: true,
      });
      expect(result).toBe("~2.50 M CHF");
    });

    it("should work with suffix position and negative", () => {
      const result = humanizeCurrency(-1200, {
        currencySymbol: "€",
        currencyPosition: "suffix",
      });
      expect(result).toBe("-1.20 K €");
    });
  });

  describe("Edge cases", () => {
    it("should handle zero", () => {
      const result = humanizeCurrency(0, { currencySymbol: "$" });
      expect(result).toBe("$0");
    });

    it("should handle very large numbers", () => {
      const result = humanizeCurrency(5000000000000, { currencySymbol: "$" });
      expect(result).toBe("$5.00 T");
    });

    it("should handle very small numbers", () => {
      const result = humanizeCurrency(0.5, { currencySymbol: "$" });
      expect(result).toBe("$0.50");
    });

    it("should handle numbers without unit suffix", () => {
      const result = humanizeCurrency(500, { currencySymbol: "€" });
      expect(result).toBe("€500.00");
    });

    it("should work with custom spacer", () => {
      const result = humanizeCurrency(1500000, {
        currencySymbol: "$",
        spacer: "",
      });
      expect(result).toBe("$1.50M");
    });

    it("should handle empty currency symbol", () => {
      const result = humanizeCurrency(1500, { currencySymbol: "" });
      expect(result).toBe("1.50 K");
    });

    it("should handle imperial unit system", () => {
      const result = humanizeCurrency(1500000, {
        currencySymbol: "$",
        unitSystem: "imperial",
      });
      expect(result).toBe("$1.50 M");
    });
  });

  describe("Real-world scenarios", () => {
    it("should format USD amounts", () => {
      expect(humanizeCurrency(1500, { currencySymbol: "$" })).toBe("$1.50 K");
      expect(humanizeCurrency(250000, { currencySymbol: "$" })).toBe(
        "$250.00 K"
      );
      expect(humanizeCurrency(5000000, { currencySymbol: "$" })).toBe(
        "$5.00 M"
      );
    });

    it("should format EUR amounts", () => {
      expect(
        humanizeCurrency(2000, {
          currencySymbol: "€",
          currencyPosition: "suffix",
        })
      ).toBe("2.00 K €");
      expect(
        humanizeCurrency(500000, {
          currencySymbol: "€",
          currencyPosition: "suffix",
        })
      ).toBe("500.00 K €");
    });

    it("should format stock market values", () => {
      expect(
        humanizeCurrency(2500000000000, {
          currencySymbol: "$",
          precision: 1,
        })
      ).toBe("$2.5 T");
      expect(
        humanizeCurrency(150000000000, {
          currencySymbol: "$",
          precision: 1,
        })
      ).toBe("$150.0 B");
    });

    it("should format salary ranges", () => {
      expect(humanizeCurrency(75000, { currencySymbol: "$" })).toBe("$75.00 K");
      expect(
        humanizeCurrency(125000, {
          currencySymbol: "$",
          precision: 0,
        })
      ).toBe("$125 K");
    });

    it("should format cryptocurrency values", () => {
      expect(
        humanizeCurrency(50000, {
          currencySymbol: "₿",
          precision: 4,
        })
      ).toBe("₿50.0000 K");
      expect(
        humanizeCurrency(2500, {
          currencySymbol: "ETH",
          precision: 1,
        })
      ).toBe("ETH2.5 K");
    });
  });
});
