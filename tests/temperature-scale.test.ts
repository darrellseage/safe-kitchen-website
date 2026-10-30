import { describe, expect, it } from "vitest";
import { clampToScale, formatReading, parseReading, positionOfValue, valueAtPosition } from "@/lib/temperature-scale";

const fridge = { min: -5, max: 15 };

describe("temperature scale", () => {
  it("turns a tap position into a reading rounded to 0.1", () => {
    expect(valueAtPosition(0, fridge)).toBe(-5);
    expect(valueAtPosition(1, fridge)).toBe(15);
    expect(valueAtPosition(0.4321, fridge)).toBe(3.6);
    expect(valueAtPosition(1.4, fridge)).toBe(15);
  });

  it("places readings on the scale, pinning values beyond it to the ends", () => {
    expect(positionOfValue(5, fridge)).toBe(0.5);
    expect(positionOfValue(40, fridge)).toBe(1);
  });

  it("clamps nudges to the scale", () => {
    expect(clampToScale(15.05, fridge)).toBe(15);
    expect(clampToScale(3.56, fridge)).toBe(3.6);
  });

  it("parses keypad input in common forms and rejects nonsense", () => {
    expect(parseReading("3.4")).toBe(3.4);
    expect(parseReading("−18,5")).toBe(-18.5);
    expect(parseReading("72")).toBe(72);
    expect(parseReading("abc")).toBeNull();
    expect(parseReading("3.45")).toBeNull();
    expect(parseReading("999")).toBeNull();
  });

  it("formats with a real minus sign and never shows −0.0", () => {
    expect(formatReading(-19.4)).toBe("−19.4");
    expect(formatReading(-0.04)).toBe("0.0");
    expect(formatReading(3)).toBe("3.0");
  });
});
