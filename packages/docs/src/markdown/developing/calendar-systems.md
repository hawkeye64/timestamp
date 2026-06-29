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

- [Islamic Civil (Hijri)](/developing/calendar-systems/islamic-civil) documents the deterministic
  tabular Hijri calendar, including Arabic labels, RTL presentation, and native week/month ranges.
- [Saka](/developing/calendar-systems/saka) documents the Indian National Calendar adapter,
  including locale-aware labels and native week/month ranges.

Additional calendar pages should be added under this section as new adapters prove their behavior
against real QCalendar usage.

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

## Calendar-aware core helpers

Core keeps the original Gregorian helpers stable and adds adapter-aware helpers beside them. Use
these when a UI needs timestamp-shaped objects for a non-Gregorian calendar:

```ts
import {
  createCalendarDayList,
  getCalendarDateIdentity,
  getCalendarEndOfMonth,
  getCalendarMonthFormatter,
  parseCalendarTimestamp,
} from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const visible = parseCalendarTimestamp('1445-09-01', islamicCivilCalendar)!
const start = visible
const end = getCalendarEndOfMonth(visible, islamicCivilCalendar)
const days = createCalendarDayList(start, end, visible, islamicCivilCalendar)

const monthLabel = getCalendarMonthFormatter(islamicCivilCalendar)
const identity = getCalendarDateIdentity(days[0], islamicCivilCalendar)

days[0].calendarId // 'islamic-civil'
days[0].date // '1445-09-01'
monthLabel(days[0].month, 'long', 'en-US', days[0].year) // 'Ramadan'
identity.nativeDate // '1445-09-01'
identity.gregorianDate // '2024-03-11'
identity.epochDay // stable cross-calendar sort/range key
```

These helpers are the first bridge for QCalendar-style views: adapters own calendar math, and core
turns adapter dates into immutable Timestamp objects with `weekday`, `doy`, `past`, `current`,
`future`, and disabled-state metadata. For component APIs that need to feel adapter-native, expose
the native fields while keeping `gregorianDate` and `epochDay` available as deterministic interop
keys.

## First-class support vs. display-only support

Locale labels and calendar math are different problems. `Intl.DateTimeFormat` can format labels with
calendar options in many runtimes, but display-only formatting is not enough for calendar views. A
real calendar adapter must control month length, leap rules, navigation, weekday calculation, and
range comparisons.

That means Islamic/Hijri, Hebrew, Chinese, Indian National/Saka, and similar calendars should be
treated as first-class adapter work, not only as translated Gregorian dates.

## Temporal

Temporal is the right ecosystem direction to watch. `Temporal.PlainDate` carries calendar-system
metadata, and Temporal is designed to replace the older JavaScript `Date` model. Timestamp is keeping
its adapter contract small for now because Temporal is still not available in every target browser,
and QCalendar-style views need deterministic adapter rules for range generation, list generation,
and package-level tree shaking.

The current adapter shape should stay easy to bridge later: adapters already convert their
year/month/day fields through a stable serial day, which is the same boundary QCalendar needs when
different calendar systems eventually share the same view code.

## Integration status

The original top-level helpers such as `parseTimestamp()`, `nextDay()`, `createDayList()`, and
`createNativeLocaleFormatterUTC()` remain Gregorian for compatibility. Calendar-aware equivalents
such as `parseCalendarTimestamp()`, `nextCalendarDay()`, `createCalendarDayList()`, and
`createCalendarLocaleFormatterUTC()` are available for adapter-based views.

Islamic civil and Saka are the current proving adapters. Additional calendar packages should wait
until these have been exercised by QCalendar and the adapter contract has proved useful.
