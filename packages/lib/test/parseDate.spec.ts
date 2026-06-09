import { describe, it, expect } from "vitest";
import * as timestamp from "../src";

describe("[TIMESTAMP] parseDate", () => {
  it("parseDate no time", async () => {
    const tests = timestamp.parseDate(new Date(2020, 0, 1));
    expect(tests.hasDay).toBe(true);
    expect(tests.hasTime).toBe(true);
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
  });

  it("parseTimestamp with time", async () => {
    const tests = timestamp.parseDate(new Date(2020, 0, 1, 3, 0));
    expect(tests.hasDay).toBe(true);
    expect(tests.hasTime).toBe(true);
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
    expect(tests.hour).toBe(3);
    expect(tests.minute).toBe(0);
  });

  it("parseDateUTC reads UTC fields", () => {
    const tests = timestamp.parseDateUTC(new Date("2036-06-08T23:59:15.250Z"));

    expect(tests?.hasDay).toBe(true);
    expect(tests?.hasTime).toBe(true);
    expect(tests?.date).toBe("2036-06-08");
    expect(tests?.time).toBe("23:59:15.250");
    expect(tests?.year).toBe(2036);
    expect(tests?.month).toBe(6);
    expect(tests?.day).toBe(8);
    expect(tests?.hour).toBe(23);
    expect(tests?.minute).toBe(59);
    expect(tests?.second).toBe(15);
    expect(tests?.millisecond).toBe(250);
  });
});
