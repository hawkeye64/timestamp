---
title: Calendar Systems
desc: How Timestamp plans to support non-Gregorian calendars
keys: developing
---

Timestamp currently treats Gregorian dates as the default public contract. Existing helpers such as
`parseTimestamp()`, `nextDay()`, `daysInMonth()`, and `getWeekday()` keep their current Gregorian
behavior for compatibility.

The calendar-system work starts underneath that contract. Core exposes a `CalendarSystem` adapter
shape and a built-in `gregorianCalendar` adapter so future calendar packages can plug into the same
date math model instead of creating separate, incompatible helper APIs.

## Recommended package shape

Keep `@timestamp-js/core` small and predictable:

- Core owns shared types, immutable Timestamp objects, comparison/range primitives, time helpers,
  and the default Gregorian adapter.
- Optional calendar packages own calendar-specific math and parsing, for example
  `@timestamp-js/calendar-islamic`, `@timestamp-js/calendar-hebrew`,
  `@timestamp-js/calendar-chinese`, or `@timestamp-js/calendar-saka`.
- The Gregorian adapter remains available from core first. A separate
  `@timestamp-js/calendar-gregorian` package can be added later if external adapter packages need a
  reusable reference implementation.

This keeps existing users on one package while making advanced calendar support opt-in.

## Adapter contract

A calendar adapter needs to answer questions that are calendar-specific:

```ts
import type { CalendarSystem } from '@timestamp-js/core'

export const myCalendar: CalendarSystem = {
  id: 'my-calendar',
  label: 'My Calendar',
  monthsInYear(year) {
    return 12
  },
  isLeapYear(year) {
    return false
  },
  daysInMonth(year, month) {
    return 30
  },
  toEpochDay(date) {
    // Convert calendar fields to a stable serial day.
    return 0
  },
  fromEpochDay(epochDay) {
    // Convert the stable serial day back to calendar fields.
    return { year: 1, month: 1, day: 1 }
  },
  addDays(date, amount) {
    return this.fromEpochDay(this.toEpochDay(date) + amount)
  },
  nextDay(date) {
    return this.addDays(date, 1)
  },
  prevDay(date) {
    return this.addDays(date, -1)
  },
  getDayOfYear(date) {
    return 1
  },
  getWeekday(date) {
    return 0
  },
}
```

The important part is `epochDay`. Calendar `year/month/day` fields are not directly comparable
across calendar systems. An adapter maps its fields to a stable serial day so ranges, min/max,
disabled dates, and list generation can eventually become calendar-agnostic.

## First-class support vs. display-only support

Locale labels and calendar math are different problems. `Intl.DateTimeFormat` can format labels with
calendar options in many runtimes, but display-only formatting is not enough for calendar views. A
real calendar adapter must control month length, leap rules, navigation, weekday calculation, and
range comparisons.

That means Islamic/Hijri, Hebrew, Chinese, Indian National/Saka, and similar calendars should be
treated as first-class adapter work, not only as translated Gregorian dates.

## Current limitation

The current top-level helpers still assume Gregorian Timestamp fields. The adapter foundation is in
place, but only the Gregorian adapter is wired through the existing helpers. Non-Gregorian support
should be added incrementally with tests for parsing, month lengths, next/previous day movement,
range comparison, disabled days, and list generation before a calendar package is considered stable.
