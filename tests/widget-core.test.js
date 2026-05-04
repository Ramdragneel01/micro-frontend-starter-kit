import { describe, expect, it } from "vitest";
import { estimateTokenCost, latencySloColor, summarizeWidgetHealth } from "@mfe/widget-core";

describe("widget-core", () => {
  it("estimates cost for known model", () => {
    const value = estimateTokenCost("gpt-4o-mini", 1000, 1000);
    expect(value).toBeCloseTo(0.00075, 6);
  });

  it("returns zero for unknown model", () => {
    expect(estimateTokenCost("unknown", 1200, 500)).toBe(0);
  });

  it("classifies latency colors", () => {
    expect(latencySloColor(450)).toBe("green");
    expect(latencySloColor(900)).toBe("amber");
    expect(latencySloColor(1800)).toBe("red");
  });

  it("summarizes health ratios", () => {
    const summary = summarizeWidgetHealth([
      { status: "healthy" },
      { status: "healthy" },
      { status: "degraded" }
    ]);
    expect(summary.total).toBe(3);
    expect(summary.healthy).toBe(2);
    expect(summary.ratio).toBeCloseTo(2 / 3, 6);
  });
});
