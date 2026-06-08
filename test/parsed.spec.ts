import { describe, it, expect } from "vitest";
import * as timestamp from "../src";

describe("[TIMESTAMP] parsed", () => {
  it("parses date", async () => {
    const tests = timestamp.parsed("2020-01-01");
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
    expect(tests.hasTime).toBe(true);
  });

  it("parses date and time", async () => {
    const tests = timestamp.parsed("2020-01-01 03:01");
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
    expect(tests.hasTime).toBe(true);
    expect(tests.hour).toBe(3);
    expect(tests.minute).toBe(1);
  });

  it("parses date and time (short)", async () => {
    const tests = timestamp.parsed("2020-1-1 3:01");
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
    expect(tests.hasTime).toBe(true);
    expect(tests.hour).toBe(3);
    expect(tests.minute).toBe(1);
  });

  it("parses ISO date time with seconds", async () => {
    const tests = timestamp.parsed("2026-06-08T09:30:15");
    expect(tests.year).toBe(2026);
    expect(tests.month).toBe(6);
    expect(tests.day).toBe(8);
    expect(tests.hour).toBe(9);
    expect(tests.minute).toBe(30);
    expect(tests.second).toBe(15);
    expect(tests.time).toBe("09:30:15");
  });

  it("parses ISO date time with milliseconds and timezone", async () => {
    const tests = timestamp.parsed("2026-06-08T09:30:15.125Z");
    expect(tests.second).toBe(15);
    expect(tests.millisecond).toBe(125);
    expect(tests.timezone).toBe("Z");
    expect(tests.time).toBe("09:30:15.125");
  });

  it("parses ISO date time with offset", async () => {
    const tests = timestamp.parsed("2026-06-08T09:30:15.5-07:00");
    expect(tests.second).toBe(15);
    expect(tests.millisecond).toBe(500);
    expect(tests.timezone).toBe("-07:00");
    expect(tests.time).toBe("09:30:15.500");
  });

  it("parses invalid", async () => {
    const tests = timestamp.parsed("1234");
    expect(tests).toBe(null);
  });
});
