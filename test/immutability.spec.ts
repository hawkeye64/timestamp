import { describe, expect, it } from "vitest";
import { addToDate, copyTimestamp, parseTimestamp, Timestamp } from "../src";

describe("[TIMESTAMP] immutability", () => {
  it("freezes parsed timestamps", () => {
    const ts = parseTimestamp("2026-06-08T09:30:15.125Z");
    expect(Object.isFrozen(ts)).toBe(true);
  });

  it("returns a new frozen timestamp from date math", () => {
    const ts = parseTimestamp("2026-06-08T09:30:15.125Z")!;
    const next = addToDate(ts, { day: 1, millisecond: 875 });

    expect(next).not.toBe(ts);
    expect(Object.isFrozen(next)).toBe(true);
    expect(ts.date).toBe("2026-06-08");
    expect(ts.time).toBe("09:30:15.125");
    expect(next.date).toBe("2026-06-09");
    expect(next.time).toBe("09:30:16.000");
  });

  it("freezes copied timestamps", () => {
    const copy = copyTimestamp(Timestamp);

    expect(copy).not.toBe(Timestamp);
    expect(Object.isFrozen(copy)).toBe(true);
  });
});
