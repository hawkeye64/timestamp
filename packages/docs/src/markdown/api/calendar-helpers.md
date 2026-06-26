---
title: Calendar Helpers
desc: Generate calendar-friendly dates, intervals, and labels
---

Timestamp includes helpers for calendar-style workflows without depending on a UI framework.

## Date math

```ts
import { addToDate, addToDateClamped, nextDay, parseTimestamp, prevDay } from '@timestamp-js/core'

const current = parseTimestamp('2026-06-08')!
const tomorrow = nextDay(current)
const yesterday = prevDay(current)
const nextMonth = addToDate(current, { month: 1 })
const lastYear = addToDate(current, { year: -1 })

const monthEnd = parseTimestamp('2026-01-31')!
const billingDate = addToDateClamped(monthEnd, { month: 1 }) // 2026-02-28
```

## Lists

```ts
import { createDayList, createIntervalList, parseTimestamp } from '@timestamp-js/core'

const start = parseTimestamp('2026-06-01')!
const end = parseTimestamp('2026-06-07')!

const days = createDayList(start, end)
const intervals = createIntervalList(start, 0, 60, 24, start)
```

## Adapter calendar lists

Use the calendar-aware helpers when date fields belong to an optional calendar adapter rather than
the built-in Gregorian calendar.

```ts
import {
  createCalendarDayList,
  getCalendarEndOfMonth,
  getCalendarEndOfWeek,
  parseCalendarTimestamp,
  getCalendarStartOfMonth,
  getCalendarStartOfWeek,
} from '@timestamp-js/core'
import { indianNationalCalendar } from '@timestamp-js/calendar-saka'

const visible = parseCalendarTimestamp('1946-01-15', indianNationalCalendar)!
const weekdays = [0, 1, 2, 3, 4, 5, 6]

const weekStart = getCalendarStartOfWeek(visible, weekdays, indianNationalCalendar)
const weekEnd = getCalendarEndOfWeek(visible, weekdays, indianNationalCalendar)
const weekDays = createCalendarDayList(weekStart, weekEnd, visible, indianNationalCalendar)

weekStart.date // '1946-01-11'
weekEnd.date // '1946-01-17'
weekDays.map((day) => day.date)
// [
//   '1946-01-11',
//   '1946-01-12',
//   '1946-01-13',
//   '1946-01-14',
//   '1946-01-15',
//   '1946-01-16',
//   '1946-01-17',
// ]

const monthStart = getCalendarStartOfMonth(visible, indianNationalCalendar)
const monthEnd = getCalendarEndOfMonth(visible, indianNationalCalendar)
const monthDays = createCalendarDayList(monthStart, monthEnd, visible, indianNationalCalendar)

monthStart.date // '1946-01-01'
monthEnd.date // '1946-01-31'
monthDays.length // 31
```

### Islamic civil ranges

The same helpers work with Islamic civil dates. The input and output dates stay in Islamic civil
year/month/day fields, while the adapter supplies stable serial-day comparison under the hood.

```ts
import {
  createCalendarDayList,
  getCalendarEndOfMonth,
  getCalendarEndOfWeek,
  getCalendarStartOfMonth,
  getCalendarStartOfWeek,
  parseCalendarTimestamp,
} from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const visible = parseCalendarTimestamp('1445-09-15', islamicCivilCalendar)!
const weekdays = [0, 1, 2, 3, 4, 5, 6]

const weekStart = getCalendarStartOfWeek(visible, weekdays, islamicCivilCalendar)
const weekEnd = getCalendarEndOfWeek(visible, weekdays, islamicCivilCalendar)
const weekDays = createCalendarDayList(weekStart, weekEnd, visible, islamicCivilCalendar)

weekStart.date // '1445-09-14'
weekEnd.date // '1445-09-20'
weekDays.map((day) => day.date)
// [
//   '1445-09-14',
//   '1445-09-15',
//   '1445-09-16',
//   '1445-09-17',
//   '1445-09-18',
//   '1445-09-19',
//   '1445-09-20',
// ]

const monthStart = getCalendarStartOfMonth(visible, islamicCivilCalendar)
const monthEnd = getCalendarEndOfMonth(visible, islamicCivilCalendar)
const monthDays = createCalendarDayList(monthStart, monthEnd, visible, islamicCivilCalendar)

monthStart.date // '1445-09-01'
monthEnd.date // '1445-09-30'
monthDays.length // 30
```

## Labels

Use `Intl.DateTimeFormat`-backed helpers for month and weekday labels.

```ts
import { getMonthNames, getWeekdayNames } from '@timestamp-js/core'

const weekdays = getWeekdayNames('en-US')
const months = getMonthNames('en-US')
```

For adapter calendar labels, convert through the adapter first so Intl receives the equivalent civil
day instead of interpreting the adapter year/month/day as Gregorian fields.
The helper supplies `timeZone: 'UTC'` by default.

```ts
import { createCalendarLocaleFormatterUTC } from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const formatMonth = createCalendarLocaleFormatterUTC(islamicCivilCalendar, 'en-US', () => ({
  month: 'long',
}))
```

## Identifiers

Identifiers give stable numeric comparisons without converting to native `Date` objects repeatedly.

```ts
import {
  getCalendarDayIdentifier,
  getDayIdentifier,
  getDayTimeIdentifier,
  parseTimestamp,
} from '@timestamp-js/core'

const timestamp = parseTimestamp('2026-06-08 09:30')!

getDayIdentifier(timestamp)
getDayTimeIdentifier(timestamp)
getCalendarDayIdentifier(timestamp)
```
