import {
  compareHumanized,
  convertSpeed,
  convertTemperature,
  convertVolume,
  humanizeArray,
  humanizeData,
  humanizeDuration,
  humanizeNumber,
  humanizeObject,
  humanizePercentage,
  humanizeRange,
  humanizeTemperature,
  humanizeWeight,
  humanizeWeightImperial,
  isGreaterThan,
  parseHumanized,
  presets,
  sortHumanized,
} from "./src/index";

describe("humanizeNumber v2.0", () => {
  describe("Core functionality (backward compatibility)", () => {
    test("should format basic numbers", () => {
      expect(humanizeNumber(1234)).toBe("1.23 K");
      expect(humanizeNumber(1234567)).toBe("1.23 M");
      expect(humanizeNumber(1234567890)).toBe("1.23 B");
    });

    test("should handle data format", () => {
      expect(humanizeData(1024)).toBe("1 KB");
      expect(humanizeData(1048576)).toBe("1 MB");
    });

    test("should handle weight format", () => {
      expect(humanizeWeight(1000)).toBe("1 kg");
      expect(humanizeWeightImperial(453.592)).toBe("1 lb");
    });
  });

  describe("New Features - Temperature", () => {
    test("should format temperature in Celsius", () => {
      const result = humanizeTemperature(25, { temperatureScale: "celsius" });
      expect(result).toBe("25.0 °C");
    });

    test("should convert and format temperature", () => {
      expect(convertTemperature(0, "celsius", "fahrenheit")).toBe(32);
      expect(convertTemperature(100, "celsius", "fahrenheit")).toBe(212);
      expect(convertTemperature(0, "celsius", "kelvin")).toBeCloseTo(273.15, 2);
    });
  });

  describe("New Features - Duration", () => {
    test("should format short durations", () => {
      expect(humanizeDuration(90)).toBe("1 m 30 s");
      expect(humanizeDuration(3661)).toBe("1 h 1 m");
    });

    test("should format long durations", () => {
      expect(humanizeDuration(86400)).toBe("1 d");
      expect(humanizeDuration(604800)).toBe("1 w");
    });

    test("should format milliseconds", () => {
      const result = humanizeDuration(0.5);
      expect(result).toContain("ms");
    });
  });

  describe("New Features - Speed", () => {
    test("should format speed in metric", () => {
      const result = humanizeNumber(27.78, "speed", { unitSystem: "metric" });
      expect(result).toContain("km/h");
    });

    test("should format speed in imperial", () => {
      const result = humanizeNumber(13.41, "speed", { unitSystem: "imperial" });
      expect(result).toContain("mph");
    });

    test("should convert speed between systems", () => {
      const converted = convertSpeed(100, "metric", "imperial");
      expect(converted).toBeCloseTo(62.14, 1);
    });
  });

  describe("New Features - Volume", () => {
    test("should format volume in metric", () => {
      const result = humanizeNumber(1, "volume", { unitSystem: "metric" });
      expect(result).toBe("1 L");
    });

    test("should format volume in imperial", () => {
      const result = humanizeNumber(3.78541, "volume", {
        unitSystem: "imperial",
      });
      expect(result).toBe("1 gal");
    });

    test("should convert volume between systems", () => {
      const converted = convertVolume(1, "imperial", "metric");
      expect(converted).toBeCloseTo(3.78541, 4);
    });
  });

  describe("New Features - Percentage", () => {
    test("should format percentage", () => {
      expect(humanizePercentage(0.1234)).toBe("12.34 %");
      expect(humanizePercentage(1.5)).toBe("150.00 %");
    });

    test("should parse percentage", () => {
      expect(parseHumanized("50 %", "percentage")).toBe(0.5);
      expect(parseHumanized("100 %", "percentage")).toBe(1);
    });
  });

  describe("Presets", () => {
    test("compact preset should minimize output", () => {
      const result = humanizeNumber(1234, "generic", presets.compact);
      expect(result).toBe("1K");
    });

    test("verbose preset should use full unit names", () => {
      const result = humanizeNumber(1000, "weight", presets.verbose);
      expect(result).toContain("kilogram");
    });

    test("scientific preset should use scientific notation", () => {
      const result = humanizeNumber(1234567, "generic", presets.scientific);
      expect(result).toContain("×");
      expect(result).toContain("10");
    });

    test("approximate preset should add ~ symbol", () => {
      const result = humanizeNumber(1234, "generic", presets.approximate);
      expect(result).toContain("~");
    });
  });

  describe("Batch Processing", () => {
    test("should format arrays", () => {
      const result = humanizeArray([1024, 2048, 3072], "data");
      expect(result).toEqual(["1 KB", "2 KB", "3 KB"]);
    });

    test("should format objects", () => {
      const obj = { memory: 8589934592, storage: 1073741824 };
      const result = humanizeObject(obj, {
        memory: ["data"],
        storage: ["data"],
      });
      expect(result.memory).toBe("8 GB");
      expect(result.storage).toBe("1 GB");
    });
  });

  describe("Range Formatting", () => {
    test("should format ranges", () => {
      const result = humanizeRange(1024, 2048, "data");
      expect(result).toBe("1-2 KB");
    });

    test("should format ranges with separate units", () => {
      const result = humanizeRange(1000, 5000, "weight", {
        combineUnits: false,
      });
      expect(result).toContain("kg");
    });
  });

  describe("Comparison Utilities", () => {
    test("should compare humanized values", () => {
      expect(compareHumanized("1 GB", "500 MB", "data")).toBe(1);
      expect(compareHumanized("500 MB", "1 GB", "data")).toBe(-1);
      expect(compareHumanized("1 GB", "1 GB", "data")).toBe(0);
    });

    test("should check if greater than", () => {
      expect(isGreaterThan("2 km", "1000 m", "distance")).toBe(true);
      expect(isGreaterThan("500 m", "1 km", "distance")).toBe(false);
    });

    test("should sort humanized values", () => {
      const values = ["1 GB", "500 MB", "2 TB"];
      const sorted = sortHumanized(values, "data");
      expect(sorted).toEqual(["500 MB", "1 GB", "2 TB"]);
    });
  });

  describe("Options", () => {
    test("should respect verboseUnits option", () => {
      const result = humanizeNumber(1000, "weight", { verboseUnits: true });
      expect(result).toContain("kilogram");
    });

    test("should respect lowercase option", () => {
      const result = humanizeNumber(1024, "data", { lowercase: true });
      expect(result).toContain("kb");
    });

    test("should respect showSign option", () => {
      const result = humanizeNumber(1234, "generic", { showSign: true });
      expect(result).toContain("+");
    });
  });

  describe("Error Handling", () => {
    test("should handle invalid input gracefully", () => {
      // String numbers are converted
      expect(humanizeNumber("1234" as any)).toBe("1.23 K");
      // NaN doesn't throw but returns "NaN"
      expect(humanizeNumber(NaN)).toBe("NaN");
    });

    test("should handle Infinity", () => {
      expect(humanizeNumber(Infinity)).toBe("Infinity");
      expect(humanizeNumber(-Infinity)).toBe("-Infinity");
    });
  });

  describe("Parsing", () => {
    test("should parse various formats", () => {
      expect(parseHumanized("1.23 K")).toBe(1230);
      expect(parseHumanized("1 KB", "data")).toBe(1024);
      expect(parseHumanized("1.5 kg", "weight")).toBe(1500);
    });

    test("should parse with approximation symbol", () => {
      expect(parseHumanized("~1.2 K")).toBeCloseTo(1200, 0);
    });

    test("should parse with positive sign", () => {
      expect(parseHumanized("+1.2 K")).toBeCloseTo(1200, 0);
    });
  });
});
