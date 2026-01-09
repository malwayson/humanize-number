/**
 * Tests for v3.1.0 Plugin System
 */

import {
  clearPlugins,
  examplePlugins,
  FormatPlugin,
  formatWithPlugin,
  getAllPlugins,
  getPlugin,
  hasPlugin,
  humanizeNumber,
  parseWithPlugin,
  registerPlugin,
  unregisterPlugin,
} from "./src/index";

describe("Plugin System - v3.1.0", () => {
  beforeEach(() => {
    clearPlugins();
  });

  describe("registerPlugin", () => {
    it("should register a valid plugin", () => {
      const plugin: FormatPlugin = {
        name: "test",
        formatMethod: "test",
        units: {
          metric: [{ value: 1, symbol: "T", name: "test" }],
          imperial: [{ value: 1, symbol: "T", name: "test" }],
        },
      };

      registerPlugin(plugin);
      expect(hasPlugin("test")).toBe(true);
      expect(getPlugin("test")).toEqual(plugin);
    });

    it("should throw error if plugin lacks name", () => {
      const invalidPlugin = {
        formatMethod: "test",
        units: {
          metric: [],
          imperial: [],
        },
      } as any;

      expect(() => registerPlugin(invalidPlugin)).toThrow(
        "Plugin must have a name and formatMethod"
      );
    });

    it("should throw error if plugin lacks formatMethod", () => {
      const invalidPlugin = {
        name: "test",
        units: {
          metric: [],
          imperial: [],
        },
      } as any;

      expect(() => registerPlugin(invalidPlugin)).toThrow(
        "Plugin must have a name and formatMethod"
      );
    });

    it("should throw error if plugin lacks units", () => {
      const invalidPlugin = {
        name: "test",
        formatMethod: "test",
      } as any;

      expect(() => registerPlugin(invalidPlugin)).toThrow(
        "Plugin must define units for both metric and imperial"
      );
    });

    it("should throw error if plugin with same formatMethod already exists", () => {
      const plugin1: FormatPlugin = {
        name: "test1",
        formatMethod: "test",
        units: {
          metric: [{ value: 1, symbol: "T", name: "test" }],
          imperial: [{ value: 1, symbol: "T", name: "test" }],
        },
      };

      const plugin2: FormatPlugin = {
        name: "test2",
        formatMethod: "test",
        units: {
          metric: [{ value: 1, symbol: "T", name: "test" }],
          imperial: [{ value: 1, symbol: "T", name: "test" }],
        },
      };

      registerPlugin(plugin1);
      expect(() => registerPlugin(plugin2)).toThrow(
        'Plugin with formatMethod "test" already exists'
      );
    });
  });

  describe("unregisterPlugin", () => {
    it("should unregister an existing plugin", () => {
      const plugin: FormatPlugin = {
        name: "test",
        formatMethod: "test",
        units: {
          metric: [{ value: 1, symbol: "T", name: "test" }],
          imperial: [{ value: 1, symbol: "T", name: "test" }],
        },
      };

      registerPlugin(plugin);
      expect(hasPlugin("test")).toBe(true);

      const result = unregisterPlugin("test");
      expect(result).toBe(true);
      expect(hasPlugin("test")).toBe(false);
    });

    it("should return false when unregistering non-existent plugin", () => {
      const result = unregisterPlugin("nonexistent");
      expect(result).toBe(false);
    });
  });

  describe("getAllPlugins", () => {
    it("should return all registered plugins", () => {
      const plugin1: FormatPlugin = {
        name: "test1",
        formatMethod: "test1",
        units: {
          metric: [{ value: 1, symbol: "T1", name: "test1" }],
          imperial: [{ value: 1, symbol: "T1", name: "test1" }],
        },
      };

      const plugin2: FormatPlugin = {
        name: "test2",
        formatMethod: "test2",
        units: {
          metric: [{ value: 1, symbol: "T2", name: "test2" }],
          imperial: [{ value: 1, symbol: "T2", name: "test2" }],
        },
      };

      registerPlugin(plugin1);
      registerPlugin(plugin2);

      const plugins = getAllPlugins();
      expect(plugins).toHaveLength(2);
      expect(plugins).toContainEqual(plugin1);
      expect(plugins).toContainEqual(plugin2);
    });

    it("should return empty array when no plugins registered", () => {
      const plugins = getAllPlugins();
      expect(plugins).toEqual([]);
    });
  });

  describe("formatWithPlugin", () => {
    it("should format value using plugin", () => {
      const plugin: FormatPlugin = {
        name: "seismic",
        formatMethod: "seismic",
        units: {
          metric: [{ value: 1, symbol: "M", name: "magnitude" }],
          imperial: [{ value: 1, symbol: "M", name: "magnitude" }],
        },
        defaultOptions: {
          precision: 1,
        },
      };

      registerPlugin(plugin);
      const result = formatWithPlugin(7.5, "seismic");
      expect(result).toBe("7.5 M");
    });

    it("should use custom formatter if provided", () => {
      const plugin: FormatPlugin = {
        name: "custom",
        formatMethod: "custom",
        units: {
          metric: [{ value: 1, symbol: "C", name: "custom" }],
          imperial: [{ value: 1, symbol: "C", name: "custom" }],
        },
        formatter: (value, unit, options) => {
          return `CUSTOM: ${value} ${unit.symbol}`;
        },
      };

      registerPlugin(plugin);
      const result = formatWithPlugin(100, "custom");
      expect(result).toBe("CUSTOM: 100 C");
    });

    it("should throw error for non-existent plugin", () => {
      expect(() => formatWithPlugin(100, "nonexistent")).toThrow(
        'No plugin registered for format method "nonexistent"'
      );
    });

    it("should merge default options with user options", () => {
      const plugin: FormatPlugin = {
        name: "test",
        formatMethod: "test",
        units: {
          metric: [{ value: 1, symbol: "T", name: "test" }],
          imperial: [{ value: 1, symbol: "T", name: "test" }],
        },
        defaultOptions: {
          precision: 1,
        },
      };

      registerPlugin(plugin);
      const result1 = formatWithPlugin(7.555, "test");
      expect(result1).toBe("7.6 T");

      const result2 = formatWithPlugin(7.555, "test", { precision: 0 });
      expect(result2).toBe("8 T");
    });
  });

  describe("parseWithPlugin", () => {
    it("should parse value using plugin parser", () => {
      const plugin: FormatPlugin = {
        name: "seismic",
        formatMethod: "seismic",
        units: {
          metric: [{ value: 1, symbol: "M", name: "magnitude" }],
          imperial: [{ value: 1, symbol: "M", name: "magnitude" }],
        },
        parser: (str: string) => {
          const match = str.match(/^([\d.]+)\s*M$/i);
          return match ? parseFloat(match[1]) : null;
        },
      };

      registerPlugin(plugin);
      const result = parseWithPlugin("7.5 M", "seismic");
      expect(result).toBe(7.5);
    });

    it("should return null for invalid input", () => {
      const plugin: FormatPlugin = {
        name: "seismic",
        formatMethod: "seismic",
        units: {
          metric: [{ value: 1, symbol: "M", name: "magnitude" }],
          imperial: [{ value: 1, symbol: "M", name: "magnitude" }],
        },
        parser: (str: string) => {
          const match = str.match(/^([\d.]+)\s*M$/i);
          return match ? parseFloat(match[1]) : null;
        },
      };

      registerPlugin(plugin);
      const result = parseWithPlugin("invalid", "seismic");
      expect(result).toBeNull();
    });

    it("should throw error if plugin has no parser", () => {
      const plugin: FormatPlugin = {
        name: "test",
        formatMethod: "test",
        units: {
          metric: [{ value: 1, symbol: "T", name: "test" }],
          imperial: [{ value: 1, symbol: "T", name: "test" }],
        },
      };

      registerPlugin(plugin);
      expect(() => parseWithPlugin("100 T", "test")).toThrow(
        'Plugin "test" does not provide a parser'
      );
    });
  });

  describe("Integration with humanizeNumber", () => {
    it("should use plugin when formatMethod matches", () => {
      registerPlugin(examplePlugins.seismic);

      const result = humanizeNumber(7.5, "seismic" as any);
      expect(result).toBe("7.5 M");
    });

    it("should support multiple plugins", () => {
      registerPlugin(examplePlugins.seismic);
      registerPlugin(examplePlugins.decibel);

      const result1 = humanizeNumber(7.5, "seismic" as any);
      const result2 = humanizeNumber(85, "decibel" as any);

      expect(result1).toBe("7.5 M");
      expect(result2).toBe("85.0 dB");
    });
  });

  describe("Example Plugins", () => {
    it("should format seismic magnitude", () => {
      registerPlugin(examplePlugins.seismic);
      const result = formatWithPlugin(6.8, "seismic");
      expect(result).toBe("6.8 M");
    });

    it("should format radiation dose", () => {
      registerPlugin(examplePlugins.radiation);
      const result = formatWithPlugin(0.000025, "radiation");
      expect(result).toBe("25.00 μSv");
    });

    it("should format altitude", () => {
      registerPlugin(examplePlugins.altitude);
      const result = formatWithPlugin(10000, "altitude", {
        unitSystem: "imperial",
      });
      expect(result).toBe("33 ft");
    });

    it("should format decibels", () => {
      registerPlugin(examplePlugins.decibel);
      const result = formatWithPlugin(85.5, "decibel");
      expect(result).toBe("85.5 dB");
    });

    it("should format pH levels", () => {
      registerPlugin(examplePlugins.ph);
      const result = formatWithPlugin(7.4, "ph");
      expect(result).toBe("7.4 pH");
    });

    it("should clamp pH to 0-14 range", () => {
      registerPlugin(examplePlugins.ph);
      const result1 = formatWithPlugin(-1, "ph");
      const result2 = formatWithPlugin(15, "ph");
      expect(result1).toBe("0.0 pH");
      expect(result2).toBe("14.0 pH");
    });

    it("should format luminosity", () => {
      registerPlugin(examplePlugins.luminosity);
      const result = formatWithPlugin(5000, "luminosity");
      expect(result).toBe("5 klm");
    });
  });
});
