---
title: Quick Start
desc: Common Timestamp workflows and first-use examples
related:
  - /getting-started/installation
  - /getting-started/parsing
  - /getting-started/immutability
  - /api/calendar-helpers
---

This page covers the core Timestamp workflows most applications need first. The examples use
`@timestamp-js/core`; optional calendar adapters use the same helper surface when you want
adapter-native date fields.

## Install

```tabs
<<| bash pnpm |>>
pnpm add @timestamp-js/core
<<| bash bun |>>
bun add @timestamp-js/core
<<| bash yarn |>>
yarn add @timestamp-js/core
<<| bash npm |>>
npm install @timestamp-js/core
```

Timestamp is ESM, side-effect free, and ships TypeScript declarations.

## Parse a date

`parseTimestamp()` turns a date or date-time string into an immutable Timestamp object.

```ts
import { parseTimestamp } from '@timestamp-js/core'

const timestamp = parseTimestamp('2026-06-08 09:30')

timestamp?.date // '2026-06-08'
timestamp?.time // '09:30'
timestamp?.weekday // 1
```

Supported input includes date-only strings, space-separated date/time strings, ISO-style `T`
separators, optional seconds, optional milliseconds, and optional timezone suffixes.

## Get today

Use host-local helpers when the current runtime timezone should decide the date. Use UTC helpers
when SSR, SSG, tests, or server/client parity need stable UTC fields.

```ts
import { nowUTC, today, todayUTC } from '@timestamp-js/core'

const localDate = today()
const utcDate = todayUTC()
const utcTimestamp = nowUTC()
```

For deterministic rendering, pass the `Date` source yourself:

```ts
import { nowUTC } from '@timestamp-js/core'

const renderedAt = new Date('2026-06-08T12:00:00.000Z')
const now = nowUTC(renderedAt)
```

## Format fields

Timestamp stores common formatted values directly on the object, and helper functions return the
string forms used by UI components, routes, and storage keys.

```ts
import { getDate, getDateTime, getTime, parseTimestamp } from '@timestamp-js/core'

const timestamp = parseTimestamp('2026-06-08 09:30')!

getDate(timestamp) // '2026-06-08'
getTime(timestamp) // '09:30'
getDateTime(timestamp) // '2026-06-08 09:30'
```

## Do date math

Timestamp helpers return new frozen objects. The original timestamp is not mutated.

```ts
import { addToDate, addToDateClamped, nextDay, parseTimestamp, prevDay } from '@timestamp-js/core'

const start = parseTimestamp('2026-01-31')!

nextDay(start).date // '2026-02-01'
prevDay(start).date // '2026-01-30'
addToDate(start, { month: 1 }).date // '2026-03-03'
addToDateClamped(start, { month: 1 }).date // '2026-02-28'
```

Use `addToDateClamped()` for month-end workflows where the result should stay inside the target
month.

## Create a day list

Calendar-style views often need a list of immutable day objects.

```ts
import { createDayList, parseTimestamp } from '@timestamp-js/core'

const start = parseTimestamp('2026-06-01')!
const end = parseTimestamp('2026-06-07')!

const days = createDayList(start, end)

days.map((day) => day.date)
// [
//   '2026-06-01',
//   '2026-06-02',
//   '2026-06-03',
//   '2026-06-04',
//   '2026-06-05',
//   '2026-06-06',
//   '2026-06-07',
// ]
```

## Use a calendar adapter

Gregorian is the default. Pass a `CalendarSystem` when date fields should be native to another
calendar.

```tabs
<<| bash pnpm |>>
pnpm add @timestamp-js/core @timestamp-js/calendar-islamic
<<| bash bun |>>
bun add @timestamp-js/core @timestamp-js/calendar-islamic
<<| bash yarn |>>
yarn add @timestamp-js/core @timestamp-js/calendar-islamic
<<| bash npm |>>
npm install @timestamp-js/core @timestamp-js/calendar-islamic
```

```ts
import {
  getCalendarDirection,
  getCalendarWeekdays,
  parseCalendarTimestamp,
  today,
} from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const visible = parseCalendarTimestamp('1445-09-15', islamicCivilCalendar)!
const currentHijriDate = today(islamicCivilCalendar)

visible.calendarId // 'islamic-civil'
visible.date // '1445-09-15'
currentHijriDate // current date in Islamic civil fields
getCalendarDirection(islamicCivilCalendar) // 'rtl'
getCalendarWeekdays(islamicCivilCalendar) // [6, 0, 1, 2, 3, 4, 5]
```

Adapter presentation defaults are recommendations. Components can use them when an app omits
`locale`, `dir`, or `weekdays`, and the app can still override them for another language,
direction, or a five-day work week.

## Build adapter-native ranges

Use calendar-aware helpers when input and output dates belong to an adapter.

```ts
import {
  createCalendarDayList,
  getCalendarEndOfWeek,
  getCalendarStartOfWeek,
  getCalendarWeekdays,
  parseCalendarTimestamp,
} from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const visible = parseCalendarTimestamp('1445-09-15', islamicCivilCalendar)!
const weekdays = getCalendarWeekdays(islamicCivilCalendar)

const weekStart = getCalendarStartOfWeek(visible, weekdays, islamicCivilCalendar)
const weekEnd = getCalendarEndOfWeek(visible, weekdays, islamicCivilCalendar)
const days = createCalendarDayList(weekStart, weekEnd, visible, islamicCivilCalendar)

weekStart.date // '1445-09-14'
weekEnd.date // '1445-09-20'
days.length // 7
```

## Browser global usage

For CodePen-style usage, load the IIFE bundle and read helpers from the global object.

```html
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/core@latest/dist/index.global.min.js"></script>
<script>
  const timestamp = TimestampJsCore.parseTimestamp('2026-06-08')

  console.log(timestamp?.date)
</script>
```

Optional adapters also ship browser-global bundles. Load core first, then the adapter bundle.

## Next steps

- Use [Parsing](/getting-started/parsing) for supported input shapes and parser choices.
- Use [Immutability](/getting-started/immutability) for safe state updates.
- Use [Calendar Systems](/developing/calendar-systems) for adapters and native calendar fields.
- Use [Calendar Helpers](/api/calendar-helpers) for list, range, and label helpers.
