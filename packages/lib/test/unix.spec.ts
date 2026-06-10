import { describe, expect, it } from "vitest";
import * as timestamp from "../src";

describe("[TIMESTAMP] Unix helpers", () => {
  it("converts timestamps to Unix milliseconds and seconds using UTC fields", () => {
    const ts = timestamp.parseTimestamp("2036-06-08T09:30:15.250")!;

    expect(timestamp.toUnixMilliseconds(ts)).toBe(Date.UTC(2036, 5, 8, 9, 30, 15, 250));
    expect(timestamp.toUnixSeconds(ts)).toBe(
      Math.floor(Date.UTC(2036, 5, 8, 9, 30, 15, 250) / 1000),
    );
  });

  it("converts Unix milliseconds to UTC timestamp fields", () => {
    const ts = timestamp.fromUnixMilliseconds(Date.UTC(2036, 5, 8, 9, 30, 15, 250));

    expect(ts?.date).toBe("2036-06-08");
    expect(ts?.time).toBe("09:30:15.250");
    expect(ts?.second).toBe(15);
    expect(ts?.millisecond).toBe(250);
  });

  it("converts Unix seconds to UTC timestamp fields", () => {
    const ts = timestamp.fromUnixSeconds(Date.UTC(2036, 5, 8, 9, 30, 15) / 1000);

    expect(ts?.date).toBe("2036-06-08");
    expect(ts?.time).toBe("09:30:15");
    expect(ts?.second).toBe(15);
    expect(ts?.millisecond).toBeUndefined();
  });

  it("returns null for invalid Unix input", () => {
    expect(timestamp.fromUnixMilliseconds(Number.NaN)).toBeNull();
    expect(timestamp.fromUnixSeconds(Number.NaN)).toBeNull();
  });
});
