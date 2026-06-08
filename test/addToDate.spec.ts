import { describe, it, expect } from "vitest";
import * as timestamp from "../src";

describe("[TIMESTAMP] addToDate", () => {
  it("addToDate 2019-12-31 add 1 day", () => {
    const ts = timestamp.parsed("2019-12-31");
    const tests = timestamp.addToDate(ts, { day: 1 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
  });

  it("addToDate 2020-01-01 remove 1 day", () => {
    const ts = timestamp.parsed("2020-01-01");
    const tests = timestamp.addToDate(ts, { day: -1 });
    expect(tests.year).toBe(2019);
    expect(tests.month).toBe(12);
    expect(tests.day).toBe(31);
  });

  it("addToDate 2020-01-01 add 7 days", () => {
    const ts = timestamp.parsed("2020-01-01");
    const tests = timestamp.addToDate(ts, { day: 7 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(8);
  });

  it("addToDate 2019-12-31 add 7 days", () => {
    const ts = timestamp.parsed("2019-12-31");
    const tests = timestamp.addToDate(ts, { day: 7 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(7);
  });

  it("addToDate 2019-12-31 add 50 days", () => {
    const ts = timestamp.parsed("2019-12-31");
    const tests = timestamp.addToDate(ts, { day: 50 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(2);
    expect(tests.day).toBe(19);
  });

  it("addToDate 2019-12-31 add 500 days", () => {
    const ts = timestamp.parsed("2019-12-31");
    const tests = timestamp.addToDate(ts, { day: 500 });
    expect(tests.year).toBe(2021);
    expect(tests.month).toBe(5);
    expect(tests.day).toBe(14);
  });

  it("addToDate 2019-12-31 add 1 year (Leap Year)", () => {
    const ts = timestamp.parsed("2019-12-31");
    const tests = timestamp.addToDate(ts, { year: 1 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(12);
    expect(tests.day).toBe(31);
  });

  it("addToDate 2020-01-01 add 3 month (Leap Year)", () => {
    const ts = timestamp.parsed("2020-01-01");
    const tests = timestamp.addToDate(ts, { month: 3 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(4);
    expect(tests.day).toBe(1);
  });

  it("addToDate 2020-04-01 remove 3 months (Leap Year)", () => {
    const ts = timestamp.parsed("2020-04-01");
    const tests = timestamp.addToDate(ts, { month: -3 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
  });

  it("addToDate 2020-12-31 remove 1 year (Leap Year)", () => {
    const ts = timestamp.parsed("2020-12-31");
    const tests = timestamp.addToDate(ts, { year: -1 });
    expect(tests.year).toBe(2019);
    expect(tests.month).toBe(12);
    expect(tests.day).toBe(31);
  });

  it("addToDate 2020-01-01 remove 1 minute", () => {
    const ts = timestamp.parsed("2020-01-01");
    const tests = timestamp.addToDate(ts, { minute: -1 });
    expect(tests.year).toBe(2019);
    expect(tests.month).toBe(12);
    expect(tests.day).toBe(31);
    expect(tests.hour).toBe(23);
    expect(tests.minute).toBe(59);
  });

  it("addToDate 2019-12-31 23:59 add 1 minute", () => {
    const ts = timestamp.parsed("2019-12-31 23:59");
    const tests = timestamp.addToDate(ts, { minute: 1 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
    expect(tests.hour).toBe(0);
    expect(tests.minute).toBe(0);
  });

  it("addToDate 2019-12-31 23:59 add 1 hour", () => {
    const ts = timestamp.parsed("2019-12-31 23:59");
    const tests = timestamp.addToDate(ts, { hour: 1 });
    expect(tests.year).toBe(2020);
    expect(tests.month).toBe(1);
    expect(tests.day).toBe(1);
    expect(tests.hour).toBe(0);
    expect(tests.minute).toBe(59);
  });

  it("addToDate adds seconds and milliseconds", () => {
    const ts = timestamp.parsed("2026-06-08T09:30:59.900");
    const tests = timestamp.addToDate(ts, { second: 1, millisecond: 200 });
    expect(tests.year).toBe(2026);
    expect(tests.month).toBe(6);
    expect(tests.day).toBe(8);
    expect(tests.hour).toBe(9);
    expect(tests.minute).toBe(31);
    expect(tests.second).toBe(1);
    expect(tests.millisecond).toBe(100);
    expect(tests.time).toBe("09:31:01.100");
  });

  it("addToDate 2020-01-01 remove 1 hour", () => {
    const ts = timestamp.parsed("2020-01-01");
    const tests = timestamp.addToDate(ts, { hour: -1 });
    expect(tests.year).toBe(2019);
    expect(tests.month).toBe(12);
    expect(tests.day).toBe(31);
    expect(tests.hour).toBe(23);
    expect(tests.minute).toBe(0);
  });
});
