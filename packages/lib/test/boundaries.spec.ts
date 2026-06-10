import { describe, expect, it } from "vitest";
import * as timestamp from "../src";

describe("[TIMESTAMP] boundary helpers", () => {
  it("returns start and end of day", () => {
    const ts = timestamp.parseTimestamp("2036-06-08T09:30:15.250")!;

    expect(timestamp.getStartOfDay(ts).time).toBe("00:00");
    expect(timestamp.getEndOfDay(ts).time).toBe("23:59:59.999");
  });

  it("returns start and end of year", () => {
    const ts = timestamp.parseTimestamp("2036-06-08T09:30:15.250")!;

    expect(timestamp.getStartOfYear(ts).date).toBe("2036-01-01");
    expect(timestamp.getStartOfYear(ts).time).toBe("00:00");
    expect(timestamp.getEndOfYear(ts).date).toBe("2036-12-31");
    expect(timestamp.getEndOfYear(ts).time).toBe("23:59:59.999");
  });
});
