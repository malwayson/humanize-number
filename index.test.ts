import {
  convertDistance,
  convertWeight,
  humanizeCurrency,
  humanizeData,
  humanizeDistance,
  humanizeDistanceImperial,
  humanizeNumber,
  humanizeWeight,
  humanizeWeightImperial,
  parseHumanized,
} from "./index";

describe("humanizeNumber", () => {
  describe("Generic format", () => {
    test("should format basic numbers", () => {
      expect(humanizeNumber(1234)).toBe("1.23 K");
      expect(humanizeNumber(1234567)).toBe("1.23 M");
      expect(humanizeNumber(1234567890)).toBe("1.23 B");
      expect(humanizeNumber(1234567890123)).toBe("1.23 T");
    });

    test("should handle zero and negative numbers", () => {
      expect(humanizeNumber(0)).toBe("0");
      expect(humanizeNumber(-1234)).toBe("-1.23 K");
      expect(humanizeNumber(-1234567)).toBe("-1.23 M");
    });

    test("should handle small numbers", () => {
      expect(humanizeNumber(123)).toBe("123");
      expect(humanizeNumber(12.34)).toBe("12.34");
    });
  });

  describe("Data format", () => {
    test("should format data sizes correctly", () => {
      expect(humanizeNumber(1024, "data")).toBe("1 KB");
      expect(humanizeNumber(1024 * 1024, "data")).toBe("1 MB");
      expect(humanizeNumber(1024 * 1024 * 1024, "data")).toBe("1 GB");
      expect(humanizeNumber(1024 * 1024 * 1024 * 1024, "data")).toBe("1 TB");
    });

    test("should format partial data sizes", () => {
      expect(humanizeNumber(1536, "data")).toBe("1.5 KB");
      expect(humanizeNumber(2.5 * 1024 * 1024, "data")).toBe("2.5 MB");
    });
  });

  describe("Weight format", () => {
    test("should format weights correctly (metric)", () => {
      expect(humanizeNumber(1000, "weight")).toBe("1 kg");
      expect(humanizeNumber(1500, "weight")).toBe("1.5 kg");
      expect(humanizeNumber(1000000, "weight")).toBe("1 t");
      expect(humanizeNumber(500, "weight")).toBe("500 g");
    });

    test("should format weights correctly (imperial)", () => {
      expect(
        humanizeNumber(453.592, "weight", { unitSystem: "imperial" })
      ).toBe("1 lb");
      expect(
        humanizeNumber(907184.74, "weight", { unitSystem: "imperial" })
      ).toBe("1 ton");
      expect(
        humanizeNumber(28.3495, "weight", { unitSystem: "imperial" })
      ).toBe("1 oz");
      expect(humanizeNumber(1, "weight", { unitSystem: "imperial" })).toBe(
        "1 gr"
      );
    });
  });

  describe("Distance format", () => {
    test("should format distances correctly (metric)", () => {
      expect(humanizeNumber(1000, "distance")).toBe("1 km");
      expect(humanizeNumber(1500, "distance")).toBe("1.5 km");
      expect(humanizeNumber(100, "distance")).toBe("100 m");
      expect(humanizeNumber(0.5, "distance")).toBe("50 cm");
    });

    test("should format distances correctly (imperial)", () => {
      expect(
        humanizeNumber(1609.344, "distance", { unitSystem: "imperial" })
      ).toBe("1 mi");
      expect(
        humanizeNumber(0.3048, "distance", { unitSystem: "imperial" })
      ).toBe("1 ft");
      expect(
        humanizeNumber(0.0254, "distance", { unitSystem: "imperial" })
      ).toBe("1 in");
      expect(humanizeNumber(1, "distance", { unitSystem: "imperial" })).toBe(
        "3.28 ft"
      );
    });
  });

  describe("Currency format", () => {
    test("should format currency amounts correctly", () => {
      expect(humanizeNumber(1000, "currency")).toBe("1 K");
      expect(humanizeNumber(1000000, "currency")).toBe("1 M");
      expect(humanizeNumber(1000000000, "currency")).toBe("1 B");
      expect(humanizeNumber(1234567, "currency")).toBe("1.23 M");
    });
  });

  describe("Options", () => {
    test("should respect precision option", () => {
      expect(humanizeNumber(1234, "generic", { precision: 0 })).toBe("1 K");
      expect(humanizeNumber(1234, "generic", { precision: 3 })).toBe("1.234 K");
    });

    test("should respect separator option", () => {
      expect(humanizeNumber(1234, "generic", { separator: "," })).toBe(
        "1,23 K"
      );
    });

    test("should respect delimiter option", () => {
      expect(humanizeNumber(1234567, "generic", { delimiter: " " })).toBe(
        "1.23 M"
      );
      expect(humanizeNumber(1234567890, "generic", { delimiter: "" })).toBe(
        "1.23 B"
      );
    });

    test("should respect spacer option", () => {
      expect(humanizeNumber(1234, "generic", { spacer: "" })).toBe("1.23K");
      expect(humanizeNumber(1234, "generic", { spacer: "_" })).toBe("1.23_K");
    });

    test("should respect lowercase option", () => {
      expect(humanizeNumber(1024, "data", { lowercase: true })).toBe("1 kb");
      expect(humanizeNumber(1000, "weight", { lowercase: true })).toBe("1 kg");
    });

    test("should respect round option", () => {
      expect(humanizeNumber(1234, "generic", { round: true })).toBe("1 K");
      expect(humanizeNumber(1734, "generic", { round: true })).toBe("2 K");
    });
  });

  describe("Edge cases", () => {
    test("should handle infinity", () => {
      expect(humanizeNumber(Infinity)).toBe("Infinity");
      expect(humanizeNumber(-Infinity)).toBe("-Infinity");
    });

    test("should handle NaN", () => {
      expect(humanizeNumber(NaN)).toBe("NaN");
    });
  });
});

describe("Shorthand functions", () => {
  test("humanizeData should work correctly", () => {
    expect(humanizeData(1024)).toBe("1 KB");
  });

  test("humanizeWeight should work correctly", () => {
    expect(humanizeWeight(1000)).toBe("1 kg");
  });

  test("humanizeDistance should work correctly", () => {
    expect(humanizeDistance(1000)).toBe("1 km");
  });

  test("humanizeCurrency should work correctly", () => {
    expect(humanizeCurrency(1000000)).toBe("1 M");
  });
});

describe("parseHumanized", () => {
  test("should parse generic format correctly", () => {
    expect(parseHumanized("1.23 K")).toBe(1230);
    expect(parseHumanized("1.23 M")).toBe(1230000);
    expect(parseHumanized("1.23 B")).toBe(1230000000);
  });

  test("should parse data format correctly", () => {
    expect(parseHumanized("1 KB", "data")).toBe(1024);
    expect(parseHumanized("1 MB", "data")).toBe(1024 * 1024);
    expect(parseHumanized("1.5 KB", "data")).toBe(1536);
  });

  test("should parse weight format correctly", () => {
    expect(parseHumanized("1 kg", "weight")).toBe(1000);
    expect(parseHumanized("1.5 kg", "weight")).toBe(1500);
  });

  test("should parse imperial formats correctly", () => {
    expect(parseHumanized("1 lb", "weight", "imperial")).toBe(453.592);
    expect(parseHumanized("1 mi", "distance", "imperial")).toBe(1609.344);
  });

  test("should handle numbers without units", () => {
    expect(parseHumanized("123")).toBe(123);
    expect(parseHumanized("123.45")).toBe(123.45);
  });

  test("should handle invalid input", () => {
    expect(parseHumanized("invalid")).toBe(0);
    expect(parseHumanized("")).toBe(0);
  });
});

describe("Unit System Specific Functions", () => {
  test("humanizeWeightImperial should work correctly", () => {
    expect(humanizeWeightImperial(453.592)).toBe("1 lb");
    expect(humanizeWeightImperial(907184.74)).toBe("1 ton");
  });

  test("humanizeDistanceImperial should work correctly", () => {
    expect(humanizeDistanceImperial(1609.344)).toBe("1 mi");
    expect(humanizeDistanceImperial(0.3048)).toBe("1 ft");
  });
});

describe("Unit Conversion Functions", () => {
  test("convertWeight should convert correctly", () => {
    expect(convertWeight(1, "metric", "imperial")).toBeCloseTo(1 / 453.592, 5);
    expect(convertWeight(1, "imperial", "metric")).toBeCloseTo(453.592, 5);
    expect(convertWeight(1000, "metric", "metric")).toBe(1000);
  });

  test("convertDistance should convert correctly", () => {
    expect(convertDistance(1, "metric", "imperial")).toBeCloseTo(1 / 0.3048, 5);
    expect(convertDistance(1, "imperial", "metric")).toBeCloseTo(0.3048, 5);
    expect(convertDistance(1000, "metric", "metric")).toBe(1000);
  });
});
