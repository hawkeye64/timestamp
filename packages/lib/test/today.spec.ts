import { describe, it, expect } from "vitest";
import * as timestamp from "../src";

describe("today", () => {
  it("today", async () => {
    const today = timestamp.today();
    const d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    const now = [
      year,
      timestamp.padNumber(Number(month), 2),
      timestamp.padNumber(Number(day), 2),
    ].join("-");
    expect(today).toBe(now);
  });

  it("todayUTC reads UTC calendar fields", () => {
    const date = new Date("2036-01-01T01:30:00.000Z");

    expect(timestamp.todayUTC(date)).toBe("2036-01-01");
  });

  it("nowUTC returns a timestamp with UTC date and time fields", () => {
    const date = new Date("2036-12-31T23:59:15.250Z");
    const now = timestamp.nowUTC(date);

    expect(now.date).toBe("2036-12-31");
    expect(now.time).toBe("23:59:15.250");
    expect(now.year).toBe(2036);
    expect(now.month).toBe(12);
    expect(now.day).toBe(31);
    expect(now.hour).toBe(23);
    expect(now.minute).toBe(59);
    expect(now.second).toBe(15);
    expect(now.millisecond).toBe(250);
    expect(Object.isFrozen(now)).toBe(true);
  });
});
