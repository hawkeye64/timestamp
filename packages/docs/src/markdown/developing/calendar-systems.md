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
Adapter-produced timestamps can use the optional `calendarId` field, but the current Gregorian core
helpers leave it unset so existing object output remains stable.

## Recommended package shape

Keep `@timestamp-js/core` small and predictable:

- Core owns shared types, immutable Timestamp objects, comparison/range primitives, time helpers,
  and the default Gregorian adapter.
- Optional calendar packages own calendar-specific math and parsing, for example
  `@timestamp-js/calendar-islamic`, `@timestamp-js/calendar-saka`,
  `@timestamp-js/calendar-hebrew`, or `@timestamp-js/calendar-chinese`.
- The Gregorian adapter remains available from core first. A separate
  `@timestamp-js/calendar-gregorian` package can be added later if external adapter packages need a
  reusable reference implementation.

This keeps existing users on one package while making advanced calendar support opt-in.

## Current adapters

Timestamp currently ships the default Gregorian adapter from `@timestamp-js/core` and optional
adapter packages for Islamic civil and Indian National/Saka dates. Optional adapters use the same
`CalendarSystem` contract, which keeps the conversion surface small while letting each package own
its calendar rules.

### Islamic civil adapter

The `@timestamp-js/calendar-islamic` package exports `islamicCivilCalendar`, a deterministic
tabular Islamic civil calendar:

```ts
import { gregorianCalendar } from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const ramadan = { year: 1445, month: 9, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(islamicCivilCalendar.toEpochDay(ramadan))

gregorian // { year: 2024, month: 3, day: 11 }
```

This adapter is intentionally arithmetic. It does not model observational Hijri calendars or
Umm al-Qura adjustments. Those should be separate adapters because their rules and supported date
ranges are different.

### Indian National/Saka adapter

The `@timestamp-js/calendar-saka` package exports `indianNationalCalendar`, with `sakaCalendar` as a
convenience alias. It models the official Indian National Calendar using deterministic
Gregorian-aligned leap-year rules:

```ts
import { gregorianCalendar } from '@timestamp-js/core'
import { indianNationalCalendar } from '@timestamp-js/calendar-saka'

const sakaNewYear = { year: 1946, month: 1, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(indianNationalCalendar.toEpochDay(sakaNewYear))

gregorian // { year: 2024, month: 3, day: 21 }
```

Chaitra has 31 days when the corresponding Gregorian year is leap, and 30 days otherwise. Months
2-6 have 31 days, and months 7-12 have 30 days.

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

## Publishing adapter packages

The workspace publish scripts publish `@timestamp-js/core` and every public
`packages/calendar-*` adapter package together:

```bash
pnpm ci:publish:latest
```

The docs package is private and is not included. New adapters should live under `packages/calendar-*`
so `ci:publish`, `ci:publish:alpha`, `ci:publish:beta`, and `ci:publish:latest` pick them up without
another hard-coded publish script change.

## Current limitation

The current top-level helpers still assume Gregorian Timestamp fields. The adapter foundation plus
Islamic civil and Saka adapter packages are in place, but only the Gregorian adapter is wired through
the existing helpers. Non-Gregorian support should be added incrementally with tests for parsing,
month lengths, next/previous day movement, range comparison, disabled days, and list generation
before a calendar package is considered stable.
