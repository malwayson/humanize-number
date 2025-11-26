import {
  LRUCache,
  compareValues,
  formatKeyValue,
  formatList,
  formatTableRow,
  formatTemplate,
  globalCache,
  humanizeAngle,
  humanizeArea,
  humanizeDiff,
  humanizeEnergy,
  humanizeFraction,
  humanizeFrequency,
  humanizePower,
  humanizePressure,
  humanizeRelativeTime,
  humanizeTransferRate,
  parseFraction,
  timeAgo,
  timeUntil,
} from "./src/index";

describe("humanize-number v3.0 - New Format Methods", () => {
  describe("Area Formatting", () => {
    test("formats metric areas", () => {
      expect(humanizeArea(1000000, { unitSystem: "metric" })).toBe("1 km²");
      expect(humanizeArea(5000, { unitSystem: "metric" })).toBe("5,000 m²");
      expect(humanizeArea(0.5, { unitSystem: "metric" })).toBe("50 dm²");
    });

    test("formats imperial areas", () => {
      expect(humanizeArea(4046.86, { unitSystem: "imperial" })).toBe("1 ac");
      expect(humanizeArea(1, { unitSystem: "imperial" })).toBe("1.2 sq yd");
      expect(humanizeArea(0.1, { unitSystem: "imperial" })).toBe("1.08 sq ft");
    });

    test("supports verbose units", () => {
      expect(
        humanizeArea(1000000, { unitSystem: "metric", verboseUnits: true })
      ).toBe("1 square kilometers");
      expect(
        humanizeArea(4046.86, { unitSystem: "imperial", verboseUnits: true })
      ).toBe("1 acres");
    });
  });

  describe("Energy Formatting", () => {
    test("formats metric energy", () => {
      expect(humanizeEnergy(1000, { unitSystem: "metric" })).toBe("1 kJ");
      expect(humanizeEnergy(1000000, { unitSystem: "metric" })).toBe(
        "239.01 kcal"
      );
      expect(humanizeEnergy(500, { unitSystem: "metric" })).toBe("500 J");
    });

    test("formats imperial energy", () => {
      expect(humanizeEnergy(1055.06, { unitSystem: "imperial" })).toBe(
        "252.17 cal"
      );
      expect(humanizeEnergy(2000, { unitSystem: "imperial" })).toBe(
        "478.01 cal"
      );
    });
  });

  describe("Pressure Formatting", () => {
    test("formats metric pressure", () => {
      expect(humanizePressure(101325, { unitSystem: "metric" })).toBe(
        "1.01 bar"
      );
      expect(humanizePressure(1000, { unitSystem: "metric" })).toBe("1 kPa");
      expect(humanizePressure(100, { unitSystem: "metric" })).toBe("100 Pa");
    });

    test("formats imperial pressure", () => {
      expect(humanizePressure(6894.76, { unitSystem: "imperial" })).toBe(
        "1 PSI"
      );
      expect(humanizePressure(14000, { unitSystem: "imperial" })).toBe(
        "2.03 PSI"
      );
    });
  });

  describe("Frequency Formatting", () => {
    test("formats frequencies", () => {
      expect(humanizeFrequency(1000)).toBe("1 kHz");
      expect(humanizeFrequency(1000000)).toBe("1 MHz");
      expect(humanizeFrequency(1000000000)).toBe("1 GHz");
      expect(humanizeFrequency(500)).toBe("500 Hz");
    });

    test("supports precision", () => {
      expect(humanizeFrequency(1234567, { precision: 3 })).toBe("1.235 MHz");
      expect(humanizeFrequency(999, { precision: 0 })).toBe("999 Hz");
    });
  });

  describe("Angle Formatting", () => {
    test("formats angles in degrees", () => {
      expect(humanizeAngle(45)).toBe("45 °");
      expect(humanizeAngle(180)).toBe("180 °");
      expect(humanizeAngle(360)).toBe("360 °");
    });

    test("supports precision", () => {
      expect(humanizeAngle(45.678, { precision: 2 })).toBe("45.68 °");
      expect(humanizeAngle(90.123, { precision: 1 })).toBe("90.1 °");
    });
  });

  describe("Power Formatting", () => {
    test("formats metric power", () => {
      expect(humanizePower(1000, { unitSystem: "metric" })).toBe("1 kW");
      expect(humanizePower(1000000, { unitSystem: "metric" })).toBe("1 MW");
      expect(humanizePower(500, { unitSystem: "metric" })).toBe("500 W");
    });

    test("formats imperial power", () => {
      expect(humanizePower(745.7, { unitSystem: "imperial" })).toBe("1 hp");
      expect(humanizePower(1500, { unitSystem: "imperial" })).toBe("2.01 hp");
    });
  });

  describe("Transfer Rate Formatting", () => {
    test("formats transfer rates in bytes", () => {
      expect(humanizeTransferRate(1024)).toBe("1 KB/s/s");
      expect(humanizeTransferRate(1048576)).toBe("1 MB/s/s");
      expect(humanizeTransferRate(1073741824)).toBe("1 GB/s/s");
    });

    test("formats transfer rates in bits", () => {
      expect(humanizeTransferRate(1000, { bits: true } as any)).toBe(
        "1 kbps/s"
      );
      expect(humanizeTransferRate(1000000, { bits: true } as any)).toBe(
        "1 Mbps/s"
      );
    });

    test("supports without per second suffix", () => {
      expect(humanizeTransferRate(1024, { perSecond: false } as any)).toBe(
        "1 KB/s"
      );
    });
  });
});

describe("humanize-number v3.0 - Relative Time", () => {
  describe("humanizeRelativeTime", () => {
    test("formats past times", () => {
      const now = new Date("2024-01-01T12:00:00Z");
      const past = new Date("2024-01-01T11:00:00Z");

      expect(humanizeRelativeTime(past, { baseDate: now })).toBe("1 hour ago");
    });

    test("formats future times", () => {
      const now = new Date("2024-01-01T12:00:00Z");
      const future = new Date("2024-01-01T13:00:00Z");

      expect(humanizeRelativeTime(future, { baseDate: now })).toBe("in 1 hour");
    });

    test("supports different locales", () => {
      const now = new Date("2024-01-01T12:00:00Z");
      const past = new Date("2024-01-01T11:00:00Z");

      expect(
        humanizeRelativeTime(past, { baseDate: now, locale: "en-US" })
      ).toBe("1 hour ago");
      expect(
        humanizeRelativeTime(past, { baseDate: now, locale: "de-DE" })
      ).toBe("vor 1 Stunde");
      expect(
        humanizeRelativeTime(past, { baseDate: now, locale: "fr-FR" })
      ).toBe("il y a 1 heure");
    });

    test("supports different styles", () => {
      const now = new Date("2024-01-01T12:00:00Z");
      const past = new Date("2024-01-01T11:00:00Z");

      expect(humanizeRelativeTime(past, { baseDate: now, style: "long" })).toBe(
        "1 hour ago"
      );
      expect(
        humanizeRelativeTime(past, { baseDate: now, style: "short" })
      ).toBe("1 hou ago");
      expect(
        humanizeRelativeTime(past, { baseDate: now, style: "narrow" })
      ).toBe("1 h ago");
    });

    test("handles various time units", () => {
      const now = new Date("2024-01-01T12:00:00Z");

      expect(
        humanizeRelativeTime(new Date("2024-01-01T11:59:30Z"), {
          baseDate: now,
        })
      ).toBe("30 seconds ago");
      expect(
        humanizeRelativeTime(new Date("2024-01-01T11:30:00Z"), {
          baseDate: now,
        })
      ).toBe("30 minutes ago");
      expect(
        humanizeRelativeTime(new Date("2023-12-31T12:00:00Z"), {
          baseDate: now,
        })
      ).toBe("1 day ago");
      expect(
        humanizeRelativeTime(new Date("2023-12-01T12:00:00Z"), {
          baseDate: now,
        })
      ).toBe("1 month ago");
      expect(
        humanizeRelativeTime(new Date("2023-01-01T12:00:00Z"), {
          baseDate: now,
        })
      ).toBe("1 year ago");
    });
  });

  describe("timeAgo and timeUntil", () => {
    test("timeAgo formats past times", () => {
      const oneHourAgo = new Date(Date.now() - 3600000);
      expect(timeAgo(oneHourAgo)).toContain("ago");
    });

    test("timeUntil formats future times", () => {
      const oneHourLater = new Date(Date.now() + 3600000);
      expect(timeUntil(oneHourLater)).toContain("in");
    });
  });
});

describe("humanize-number v3.0 - Value Diff", () => {
  describe("humanizeDiff", () => {
    test("calculates increase", () => {
      const result = humanizeDiff(100, 150);

      expect(result.value).toBe("+50");
      expect(result.raw).toBe(50);
      expect(result.direction).toBe("increase");
      expect(result.percent).toBe(50);
      expect(result.percentString).toContain("50");
    });

    test("calculates decrease", () => {
      const result = humanizeDiff(150, 100);

      expect(result.value).toBe("-50");
      expect(result.raw).toBe(-50);
      expect(result.direction).toBe("decrease");
      expect(result.percent).toBeCloseTo(-33.33, 1);
      expect(result.percentString).toContain("-33");
    });

    test("detects no change", () => {
      const result = humanizeDiff(100, 100);

      expect(result.value).toBe("0");
      expect(result.raw).toBe(0);
      expect(result.direction).toBe("unchanged");
      expect(result.percent).toBe(0);
      expect(result.percentString).toBe("0%");
    });

    test("supports format method", () => {
      const result = humanizeDiff(1024, 2048, "data");

      expect(result.value).toBe("+1 KB");
    });

    test("supports precision", () => {
      const result = humanizeDiff(100, 150.678, "generic", { precision: 1 });

      expect(result.percentString).toContain("50");
    });
  });

  describe("compareValues", () => {
    test("detects increase", () => {
      expect(compareValues(100, 150)).toBe(-1);
    });

    test("detects decrease", () => {
      expect(compareValues(150, 100)).toBe(1);
    });

    test("detects unchanged", () => {
      expect(compareValues(100, 100)).toBe(0);
    });
  });
});

describe("humanize-number v3.0 - Templates", () => {
  describe("formatTemplate", () => {
    test("formats simple templates", () => {
      const result = formatTemplate("Speed: {speed:speed}", {
        values: { speed: 100000 },
        formats: {},
      });

      expect(result).toBe("Speed: 360,000 km/h");
    });

    test("formats multiple values", () => {
      const result = formatTemplate(
        "Distance: {distance:distance}, Time: {time:duration}",
        {
          values: { distance: 5000, time: 3600000 },
          formats: {},
        }
      );

      expect(result).toContain("5 km");
      expect(result).toContain("1 mo 1 w");
    });

    test("supports options per placeholder", () => {
      const result = formatTemplate("Size: {size:data}", {
        values: { size: 1024 },
        formats: {},
        defaultOptions: { precision: 3 },
      });

      expect(result).toBe("Size: 1 KB");
    });
  });

  describe("formatList", () => {
    test("formats arrays with format method", () => {
      const result = formatList([1024, 2048, 4096], "data");

      expect(result).toContain("1 KB");
      expect(result).toContain("2 KB");
      expect(result).toContain("4 KB");
    });

    test("supports separators", () => {
      const result = formatList([1024, 2048], "data", {}, " | ");

      expect(result).toContain(" | ");
    });
  });

  describe("formatKeyValue", () => {
    test("formats key-value pairs", () => {
      const result = formatKeyValue(
        { "File Size": 1024 },
        { "File Size": "data" }
      );

      expect(result).toBe("File Size: 1 KB");
    });

    test("supports custom separators", () => {
      const result = formatKeyValue(
        { "File Size": 1024 },
        { "File Size": "data" },
        {},
        ", ",
        " = "
      );

      expect(result).toBe("File Size = 1 KB");
    });
  });

  describe("formatTableRow", () => {
    test("formats table rows", () => {
      const result = formatTableRow([1024, 100000], ["data", "speed"]);

      expect(result).toContain("1 KB");
      expect(result).toContain("360,000 km/h");
    });
  });
});

describe("humanize-number v3.0 - Fractions", () => {
  describe("humanizeFraction", () => {
    test("formats simple fractions", () => {
      expect(humanizeFraction(0.5)).toBe("1/2");
      expect(humanizeFraction(0.25)).toBe("1/4");
      expect(humanizeFraction(0.75)).toBe("3/4");
      expect(humanizeFraction(0.333)).toBe("1/3");
    });

    test("formats mixed fractions", () => {
      expect(humanizeFraction(1.5, { mixed: true })).toBe("1 1/2");
      expect(humanizeFraction(2.25, { mixed: true })).toBe("2 1/4");
      expect(humanizeFraction(3.75, { mixed: true })).toBe("3 3/4");
    });

    test("supports improper fractions", () => {
      expect(humanizeFraction(1.5, { improper: true })).toBe("3/2");
      expect(humanizeFraction(2.5, { improper: true })).toBe("5/2");
    });

    test("supports Unicode fractions", () => {
      expect(humanizeFraction(0.5, { unicode: true })).toBe("½");
      expect(humanizeFraction(0.25, { unicode: true })).toBe("¼");
      expect(humanizeFraction(0.75, { unicode: true })).toBe("¾");
      expect(humanizeFraction(0.333, { unicode: true })).toBe("⅓");
    });

    test("supports max denominator", () => {
      expect(humanizeFraction(0.333, { maxDenominator: 10 })).toBe("1/3");
      expect(humanizeFraction(0.142857, { maxDenominator: 10 })).toBe("1/7");
    });

    test("formats whole numbers", () => {
      expect(humanizeFraction(5)).toBe("5");
      expect(humanizeFraction(0)).toBe("0");
    });
  });

  describe("parseFraction", () => {
    test("parses simple fractions", () => {
      expect(parseFraction("1/2")).toBe(0.5);
      expect(parseFraction("1/4")).toBe(0.25);
      expect(parseFraction("3/4")).toBe(0.75);
    });

    test("parses mixed fractions", () => {
      expect(parseFraction("1 1/2")).toBe(1.5);
      expect(parseFraction("2 1/4")).toBe(2.25);
    });

    test("parses Unicode fractions", () => {
      expect(parseFraction("½")).toBe(0.5);
      expect(parseFraction("¼")).toBe(0.25);
      expect(parseFraction("¾")).toBe(0.75);
    });

    test("parses whole numbers", () => {
      expect(parseFraction("5")).toBe(5);
      expect(parseFraction("10")).toBe(10);
    });
  });
});

describe("humanize-number v3.0 - LRU Cache", () => {
  describe("LRUCache", () => {
    test("caches values", () => {
      const cache = new LRUCache<string, number>({ maxSize: 3 });

      cache.set("a", 1);
      cache.set("b", 2);
      cache.set("c", 3);

      expect(cache.get("a")).toBe(1);
      expect(cache.get("b")).toBe(2);
      expect(cache.get("c")).toBe(3);
    });

    test("evicts oldest when full", () => {
      const cache = new LRUCache<string, number>({ maxSize: 2 });

      cache.set("a", 1);
      cache.set("b", 2);
      cache.set("c", 3); // Should evict 'a'

      expect(cache.get("a")).toBeUndefined();
      expect(cache.get("b")).toBe(2);
      expect(cache.get("c")).toBe(3);
    });

    test("updates access order on get", () => {
      const cache = new LRUCache<string, number>({ maxSize: 2 });

      cache.set("a", 1);
      cache.set("b", 2);
      cache.get("a"); // Access 'a' to make it recently used
      cache.set("c", 3); // Should evict 'b' instead of 'a'

      expect(cache.get("a")).toBe(1);
      expect(cache.get("b")).toBeUndefined();
      expect(cache.get("c")).toBe(3);
    });

    test("supports TTL", () => {
      const cache = new LRUCache<string, number>({ maxSize: 3, ttl: 100 });

      cache.set("a", 1);
      expect(cache.get("a")).toBe(1);

      // Wait for expiration
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(cache.get("a")).toBeUndefined();
          resolve();
        }, 150);
      });
    });

    test("can be cleared", () => {
      const cache = new LRUCache<string, number>({ maxSize: 3 });

      cache.set("a", 1);
      cache.set("b", 2);

      expect(cache.getStats().size).toBe(2);

      cache.clear();

      expect(cache.getStats().size).toBe(0);
      expect(cache.get("a")).toBeUndefined();
    });
  });

  describe("Global Cache", () => {
    test("is available globally", () => {
      expect(globalCache).toBeDefined();
      expect(globalCache.getStats).toBeDefined();
    });

    test("can be enabled/disabled", () => {
      globalCache.clear();
      globalCache.disable();

      // Set a value
      globalCache.set("test", "value");

      // Should not retrieve when disabled
      expect(globalCache.get("test")).toBeUndefined();

      globalCache.enable();

      // Set again when enabled
      globalCache.set("test", "value");
      expect(globalCache.get("test")).toBe("value");

      globalCache.clear();
    });
  });
});

describe("humanize-number v3.0 - Integration Tests", () => {
  test("combines relative time with formatting", () => {
    const now = new Date("2024-01-01T12:00:00Z");
    const past = new Date("2024-01-01T11:00:00Z");

    const relativeTime = humanizeRelativeTime(past, { baseDate: now });
    expect(relativeTime).toBe("1 hour ago");
  });

  test("combines diff with formatting", () => {
    const diff = humanizeDiff(1024, 2048, "data");

    expect(diff.value).toBe("+1 KB");
    expect(diff.direction).toBe("increase");
  });

  test("cache is available globally", () => {
    globalCache.clear();
    globalCache.enable();

    globalCache.set("test", "value");
    expect(globalCache.get("test")).toBe("value");

    const stats = globalCache.getStats();
    expect(stats.size).toBeGreaterThan(0);

    globalCache.clear();
  });
});
