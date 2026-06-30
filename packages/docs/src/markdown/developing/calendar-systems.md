---
title: Calendar Systems
desc: How Timestamp plans to support non-Gregorian calendars
keys: developing
---

Timestamp treats Gregorian dates as the default public contract. Calendar-aware helpers accept a
`CalendarSystem` argument and default to `gregorianCalendar`, so existing calls keep their Gregorian
behavior while adapter-based code can use native calendar fields.

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

If your application needs a calendar Timestamp does not publish yet, start with
[Create a Calendar Adapter](/developing/calendar-systems/create-adapter). Custom adapters use the
same `CalendarSystem` contract as the built-in Gregorian adapter and optional adapter packages.

## Adapter contract

A calendar adapter needs to answer questions that are calendar-specific:

```ts
import type { CalendarSystem } from '@timestamp-js/core'

export const myCalendar: CalendarSystem = {
  id: 'my-calendar',
  label: 'My Calendar',
  defaultLocale: 'en-US',
  defaultDirection: 'ltr',
  defaultWeekdays: [0, 1, 2, 3, 4, 5, 6],
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
disabled dates, selected dates, and list generation can stay calendar-agnostic internally while
public component APIs remain adapter-native.

Presentation fields such as `defaultLocale`, `defaultDirection`, and `defaultWeekdays` are optional
recommendations. Components can use them when the app does not pass explicit display props, but
callers can still override them for another language, direction, or work-week layout.

Use `getCalendarLocale()`, `getCalendarDirection()`, `isCalendarRTL()`, and
`getCalendarWeekdays()` when component or application code needs to read those defaults without
reaching into adapter internals. Each helper falls back to Gregorian defaults if an adapter omits a
presentation field.

## Calendar-aware core helpers

Core keeps the original helper names stable and makes calendar math adapter-capable where it makes
sense. Helpers such as `today()`, `parseDate()`, `nextDay()`, `daysInMonth()`,
`getStartOfWeek()`, `createDayList()`, `updateFormatted()`, `updateRelative()`, and `addToDate()`
default to Gregorian but accept a `CalendarSystem` when the input/output date fields should be
native to another calendar.

The explicitly named calendar helpers remain useful for component and adapter work because their
purpose is unambiguous and they return timestamp-shaped objects tagged with the adapter id:

```ts
import {
  createCalendarDayList,
  createCalendarMonthView,
  getCalendarDateIdentity,
  getCalendarEndOfMonth,
  getCalendarMonthFormatter,
  getCalendarSelectionState,
  parseCalendarTimestamp,
  updateCalendarDisabled,
} from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const visible = parseCalendarTimestamp('1445-09-01', islamicCivilCalendar)!
const start = visible
const end = getCalendarEndOfMonth(visible, islamicCivilCalendar)
const days = createCalendarDayList(start, end, visible, islamicCivilCalendar)

const monthLabel = getCalendarMonthFormatter(islamicCivilCalendar)
const identity = getCalendarDateIdentity(days[0], islamicCivilCalendar)
const disabled = updateCalendarDisabled(
  days[0],
  undefined,
  undefined,
  [],
  ['1445-09-01'],
  islamicCivilCalendar,
)
const selection = getCalendarSelectionState(
  days[0],
  { selectedStartEndDates: ['1445-09-01', '1445-09-05'] },
  islamicCivilCalendar,
)
const monthView = createCalendarMonthView(visible, visible, islamicCivilCalendar, {
  selectedDates: ['1445-09-03'],
  disabledDays: ['1445-09-04'],
})

days[0].calendarId // 'islamic-civil'
days[0].date // '1445-09-01'
monthLabel(days[0].month, 'long', 'en-US', days[0].year) // 'Ramadan'
identity.nativeDate // '1445-09-01'
identity.gregorianDate // '2024-03-11'
identity.epochDay // stable cross-calendar sort/range key
disabled.disabled // true
selection.rangeFirst // true
monthView.days[0].timestamp.date // adapter-native YYYY-MM-DD
monthView.days[0].identity.gregorianDate // Gregorian interop metadata
```

These helpers are the bridge for QCalendar-style views: adapters own calendar math, and core turns
adapter dates into immutable Timestamp objects with `weekday`, `doy`, `past`, `current`, `future`,
disabled state, selection/range state, outside-month state, and identity metadata. For component APIs
that need to feel adapter-native, expose the native fields while keeping `gregorianDate` and
`epochDay` available as deterministic interop keys.

## Gregorian interop metadata

Adapter-native dates should be the main contract when a component receives a `CalendarSystem`. For
example, a Saka calendar view should accept, emit, select, and disable Saka `YYYY-MM-DD` strings so
application code does not have to translate every interaction.

Timestamp still keeps Gregorian interop metadata available because real applications often have to
cross calendar boundaries:

- Existing apps may already store records keyed by Gregorian ISO dates.
- APIs, databases, exports, and analytics pipelines often expect Gregorian dates even when the UI is
  native to another calendar.
- Cross-calendar comparisons need a neutral serial key. Use `epochDay` for that job rather than a
  Gregorian display string.
- Debugging and migration are easier when you can see which civil/Gregorian day an adapter-native
  date maps to.
- Integrations can adopt native calendar UI incrementally without rewriting every storage or
  reporting boundary at the same time.

Treat `gregorianDate` as interop metadata and `epochDay` as the durable comparison key. User-facing
calendar state should stay native to the active adapter.

When a component accepts a calendar adapter, `YYYY-MM-DD` values at that component boundary should be
treated as native to that adapter. For example, `selected-dates`, `disabled-days`, and `model-value`
should all use Hijri strings when the Islamic civil adapter is active. Timestamp helpers keep
comparisons stable by converting those native strings to `epochDay` internally.

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

The top-level helpers default to Gregorian for compatibility. When a `CalendarSystem` can be
supplied, new component-facing code should pass it through consistently so parsing, navigation,
range generation, disabled/selected state, relative flags, and formatted metadata all use the same
calendar.

Use `parseCalendarTimestamp()` for adapter-native `YYYY-MM-DD` strings. Use helpers such as
`nextDay(timestamp, calendar)`, `createDayList(..., calendar)`, and
`updateRelative(timestamp, now, time, calendar)` when working with timestamp objects that already
belong to a calendar. Use the `*Calendar*` helper names when that makes the call site clearer.

Islamic civil and Saka are the current proving adapters. Additional calendar packages should wait
until these have been exercised by QCalendar and the adapter contract has proved useful.
