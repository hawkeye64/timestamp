import { describe, expect, it } from "vitest";
import * as timestamp from "../src";

describe("[TIMESTAMP] interval rounding helpers", () => {
  it("floors timestamps to the nearest interval", () => {
    const ts = timestamp.parseTimestamp("2036-06-08T09:37:30")!;

    expect(timestamp.floorToInterval(ts, 15).time).toBe("09:30");
  });

  it("ceils timestamps to the nearest interval", () => {
    const ts = timestamp.parseTimestamp("2036-06-08T09:37:30")!;

    expect(timestamp.ceilToInterval(ts, 15).time).toBe("09:45");
  });

  it("rounds timestamps to the nearest interval", () => {
    const down = timestamp.parseTimestamp("2036-06-08T09:37:00")!;
    const up = timestamp.parseTimestamp("2036-06-08T09:38:00")!;

    expect(timestamp.roundToInterval(down, 15).time).toBe("09:30");
    expect(timestamp.roundToInterval(up, 15).time).toBe("09:45");
  });

  it("returns an immutable copy for invalid intervals", () => {
    const ts = timestamp.parseTimestamp("2036-06-08T09:37:00")!;
    const rounded = timestamp.roundToInterval(ts, 0);

    expect(rounded).not.toBe(ts);
    expect(rounded.time).toBe(ts.time);
    expect(Object.isFrozen(rounded)).toBe(true);
  });
});
