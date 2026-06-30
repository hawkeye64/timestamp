---
title: Create a Calendar Adapter
desc: Build a custom Timestamp calendar system for QCalendar and other adapter-aware code
keys: developing
---

Timestamp calendar adapters let an application make date math native to its users without forking
Timestamp or QCalendar. Gregorian is the built-in default, Islamic Civil and Saka are published
adapter packages, and a custom adapter can model another calendar such as Persian, Hebrew, Chinese,
or a project-specific business calendar.

The adapter contract is intentionally small. The hard part is not wiring it into Timestamp; the hard
part is choosing the exact calendar rules and proving that the conversion to and from `epochDay` is
stable.

## What An Adapter Owns

A `CalendarSystem` owns the calendar-specific rules:

- how many months are in a year
- whether a year is a leap year
- how many days are in each month
- how to convert native `year/month/day` fields to `epochDay`
- how to convert `epochDay` back to native `year/month/day` fields
- how to move by days
- how to calculate day-of-year and weekday
- optional presentation defaults such as locale, direction, and visible weekday order

`epochDay` is the bridge. It is the neutral serial day shared across calendar systems, so Timestamp
and QCalendar can compare dates, generate ranges, apply disabled dates, and expose Gregorian interop
metadata without making Gregorian the user's native calendar.

## Minimal Adapter

Start with the `CalendarSystem` type from `@timestamp-js/core`:

```ts
import type { CalendarDateParts, CalendarSystem } from '@timestamp-js/core'

export const customCalendar: CalendarSystem = {
  // Stable package-facing id. Use a value that will not change between releases.
  id: 'custom-calendar',

  // Optional Intl calendar id, when this calendar is recognized by Intl.
  // Omit this for project-specific calendars or calendars without an Intl id.
  intlCalendar: 'gregory',

  // Human-readable name shown in documentation, debug tools, or picker UI.
  label: 'Custom Calendar',

  // Presentation defaults are used when adapter-aware UI does not receive explicit overrides.
  defaultLocale: 'en-US',
  defaultDirection: 'ltr',

  // JavaScript weekday numbering: Sunday is 0, Monday is 1, and Saturday is 6.
  // This example displays a Sunday-through-Saturday week.
  defaultWeekdays: [0, 1, 2, 3, 4, 5, 6],

  // Return the number of months in the supplied native calendar year.
  // Some calendars always return 12; lunisolar calendars may vary by year.
  monthsInYear(year: number): number {
    return 12
  },

  // Return true when the native year contains an extra day or leap month.
  isLeapYear(year: number): boolean {
    return false
  },

  // Return the number of days in a native month.
  // Return 0 for invalid month numbers so callers can validate boundaries.
  daysInMonth(year: number, month: number): number {
    return month % 2 === 1 ? 30 : 29
  },

  // Convert native year/month/day fields to a stable serial day.
  // epochDay is the neutral value Timestamp and QCalendar use for comparisons,
  // ranges, disabled dates, and cross-calendar interop.
  toEpochDay(date: CalendarDateParts): number {
    return 0
  },

  // Convert a stable serial day back to native year/month/day fields.
  // This must round-trip with toEpochDay():
  // fromEpochDay(toEpochDay(date)) should equal date for every valid date.
  fromEpochDay(epochDay: number): CalendarDateParts {
    return { year: 1, month: 1, day: 1 }
  },

  // Move by serial day so month and year boundaries remain correct.
  addDays(date: CalendarDateParts, amount: number): CalendarDateParts {
    return this.fromEpochDay(this.toEpochDay(date) + amount)
  },

  nextDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, 1)
  },

  prevDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, -1)
  },

  // Return the one-based day number within the native calendar year.
  getDayOfYear(date: CalendarDateParts): number {
    let doy = date.day
    for (let month = 1; month < date.month; month++) {
      doy += this.daysInMonth(date.year, month)
    }
    return doy
  },

  // Return JavaScript weekday numbering: Sunday is 0 and Saturday is 6.
  // The +4 offset is correct only when epochDay 0 maps to Thursday.
  getWeekday(date: CalendarDateParts): number {
    return (this.toEpochDay(date) + 4) % 7
  },
}
```

The example above is not a real calendar. It shows the shape of the adapter and the methods that
must agree with each other.

`id` and `intlCalendar` are separate on purpose. `id` is Timestamp's package-facing adapter
identifier. `intlCalendar` is the calendar identifier used by `Intl`, when one exists. For example,
Gregorian uses `gregory`, Islamic civil uses `islamic-civil`, and Saka uses `indian`. Omit
`intlCalendar` when you are building a project-specific calendar or a calendar that `Intl` does not
recognize.

The presentation defaults are recommendations. A component can use them when the caller does not
provide `locale`, `dir`, or `weekdays`. The caller can still override them for a different language,
an LTR/RTL presentation choice, or a five-day work week.

## Presentation Defaults

Calendar math is the required part of the adapter. Presentation defaults are optional, but they make
adapter-aware components much easier to use because the user can pass one `calendar-system` object
and get the normal language, direction, and visible week for that calendar.

Use these fields when your adapter has an obvious native presentation:

| Field              | Type          | Purpose                                                        |
| ------------------ | ------------- | -------------------------------------------------------------- |
| `defaultLocale`    | String        | BCP 47 locale used for labels when the caller omits `locale`   |
| `defaultDirection` | `ltr` / `rtl` | Text direction used when the caller omits `dir`                |
| `defaultWeekdays`  | Number array  | Visible weekday order used when the caller omits `weekdays`    |

For example:

```ts
export const customCalendar: CalendarSystem = {
  id: 'custom-calendar',
  label: 'Custom Calendar',
  defaultLocale: 'fa-IR',
  defaultDirection: 'rtl',
  defaultWeekdays: [6, 0, 1, 2, 3, 4, 5],

  // calendar math...
}
```

The weekday numbers use JavaScript weekday numbering: Sunday is `0`, Monday is `1`, and Saturday is
`6`. `defaultWeekdays` is a visible-week recommendation, not a permanent rule. An application can
still pass `:weekdays="[1, 2, 3, 4, 5]"` for a five-day work week while keeping all date math native
to your adapter.

Timestamp also exposes helper functions so components and application code can read these defaults
without knowing the adapter internals:

```ts
import {
  getCalendarDirection,
  getCalendarLocale,
  getCalendarWeekdays,
  isCalendarRTL,
} from '@timestamp-js/core'

const locale = getCalendarLocale(customCalendar)
const dir = getCalendarDirection(customCalendar)
const weekdays = getCalendarWeekdays(customCalendar)
const rtl = isCalendarRTL(customCalendar)
```

These helpers fall back to Gregorian defaults when a custom adapter omits one of the presentation
fields.

## Prove The Conversion Boundary

Before using an adapter in UI code, test the conversion boundary:

```ts
import { describe, expect, it } from 'vitest'
import { customCalendar } from './custom-calendar'

describe('customCalendar', () => {
  it('round trips native dates through epochDay', () => {
    const dates = [
      { year: 1, month: 1, day: 1 },
      { year: 1, month: 12, day: 29 },
      { year: 2, month: 1, day: 1 },
    ]

    for (const date of dates) {
      expect(customCalendar.fromEpochDay(customCalendar.toEpochDay(date))).toEqual(date)
    }
  })

  it('moves by serial day', () => {
    const date = { year: 1, month: 1, day: 1 }
    const next = customCalendar.nextDay(date)

    expect(customCalendar.toEpochDay(next)).toBe(customCalendar.toEpochDay(date) + 1)
  })
})
```

Also test month boundaries, leap years, the first supported date, the last supported date, and any
dates that are historically or culturally important for the calendar.

## Use It With Timestamp

Once the adapter is stable, pass it to calendar-aware helpers:

```ts
import { createCalendarDayList, parseCalendarTimestamp, today } from '@timestamp-js/core'
import { customCalendar } from './custom-calendar'

const now = parseCalendarTimestamp(today(customCalendar), customCalendar)!
const start = parseCalendarTimestamp('0001-01-01', customCalendar)!
const end = parseCalendarTimestamp('0001-01-07', customCalendar)!

const days = createCalendarDayList(start, end, now, customCalendar)

days.map((day) => day.date)
```

Top-level helpers also default to Gregorian but accept a calendar adapter where it makes sense:

```ts
import { addToDate, daysInMonth, parseDateUTC } from '@timestamp-js/core'
import { customCalendar } from './custom-calendar'

const timestamp = parseDateUTC(new Date(Date.UTC(2026, 0, 1)), customCalendar)!
const nextMonth = addToDate(timestamp, { month: 1 }, customCalendar)
const monthLength = daysInMonth(nextMonth.year, nextMonth.month, customCalendar)
```

## Use It With QCalendar

QCalendar can consume the same adapter through `calendar-system`:

```vue
<script setup>
import { ref } from 'vue'
import { customCalendar } from './custom-calendar'

const selectedDate = ref('0001-01-01')
</script>

<template>
  <q-calendar-month v-model="selectedDate" :calendar-system="customCalendar" />
</template>
```

When `calendar-system` is active, date-bearing values should be native to that adapter. Slot scopes
also include identity metadata such as `calendarIdentity.gregorianDate` and
`calendarIdentity.epochDay` for storage, export, debugging, or cross-calendar comparisons.

## Labels And Presentation

The adapter owns date math. It does not have to own every label.

Use `Intl.DateTimeFormat` when the runtime supports the calendar and locale you need. Add adapter
metadata, helper functions, or application-level formatters when the runtime does not provide the
right names.

Right-to-left rendering, first day of week, numbering systems, and language are presentation
choices. Put good defaults on the adapter when there is an obvious native presentation. In
QCalendar, those defaults are used when the app does not pass explicit `locale`, `weekdays`, or
`dir` props.

Do not encode application policy into an adapter default. If a calendar is normally seven days wide,
keep `defaultWeekdays` seven days wide. A five-day work week, regional business schedule, or special
planning surface should be an explicit QCalendar `weekdays` override in the application.

## Practical Limits

Timestamp can support a calendar when the adapter can answer the contract deterministically for the
date range your application needs.

Some calendar systems need explicit rule choices:

- Observational calendars depend on real-world sightings or authorities. They can be supported only
  if the adapter uses a deterministic table, a published authority dataset, or a clearly documented
  approximation.
- Calendars with historical reforms need a chosen cutover rule. Different countries and communities
  may have different cutover dates.
- Calendars with multiple variants need separate adapters or explicit options. For example,
  tabular, observational, and authority-published lunar calendars should not pretend to be the same
  adapter.
- Very large or open-ended datasets may need packaged lookup tables, generated data, or a bounded
  supported range.
- Calendars whose rules are intentionally private, changing, or unknowable cannot be implemented as
  a reliable deterministic adapter without an external source of truth.

So the answer is not usually "Timestamp cannot support that calendar." The real question is whether
the calendar rules can be defined clearly enough for `toEpochDay()` and `fromEpochDay()` to agree.
If they can, Timestamp and QCalendar can use the adapter.
