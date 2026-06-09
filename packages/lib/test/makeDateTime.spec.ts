import { describe, it, expect } from "vitest";
import * as timestamp from "../src";

describe("[TIMESTAMP] makeDateTime", () => {
  it("makeDateTime", async () => {
    const ts = timestamp.parsed("2019-12-31 23:59");
    const tests = timestamp.makeDateTime(ts);
    expect(tests.getFullYear()).toBe(2019);
    expect(tests.getMonth()).toBe(11);
    expect(tests.getDate()).toBe(31);
    expect(tests.getHours()).toBe(23);
    expect(tests.getMinutes()).toBe(59);
  });

  it("makeDateTimeUTC", async () => {
    const ts = timestamp.parsed("2019-12-31 23:59");
    const tests = timestamp.makeDateTimeUTC(ts);
    expect(tests).toStrictEqual(new Date("2019-12-31T23:59:00.000Z"));
  });

  it("makeDate and makeDateUTC", async () => {
    const ts = timestamp.parsed("2036-06-08 09:30");
    const localDate = timestamp.makeDate(ts);
    const utcDate = timestamp.makeDateUTC(ts);

    expect(localDate.getFullYear()).toBe(2036);
    expect(localDate.getMonth()).toBe(5);
    expect(localDate.getDate()).toBe(8);
    expect(localDate.getHours()).toBe(0);
    expect(localDate.getMinutes()).toBe(0);
    expect(utcDate).toStrictEqual(new Date("2036-06-08T00:00:00.000Z"));
  });

  it("makeDateTime and parseDate", async () => {
    const a = new Date(2021, 11, 28, 10, 0);
    const b = timestamp.parseDate(a);
    const c = timestamp.makeDateTime(b);
    expect(timestamp.compareDateTime(c, c)).toBe(true);
  });
});
