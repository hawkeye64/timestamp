---
title: Saka Calendar
desc: Working with Indian National Calendar dates
keys: developing
examples: CalendarSystems
---

The `@timestamp-js/calendar-saka` package exports `indianNationalCalendar`, with `sakaCalendar` as a
convenience alias. It models the official Indian National Calendar using deterministic
Gregorian-aligned leap-year rules.

## Package

```ts
import { gregorianCalendar } from '@timestamp-js/core'
import { indianNationalCalendar } from '@timestamp-js/calendar-saka'

const sakaNewYear = { year: 1946, month: 1, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(indianNationalCalendar.toEpochDay(sakaNewYear))

gregorian // { year: 2024, month: 3, day: 21 }
```

## Calendar Rules

Chaitra has 31 days when the corresponding Gregorian year is leap, and 30 days otherwise. Months
2-6 have 31 days, and months 7-12 have 30 days.

Week start is a locale concern, not an adapter rule. The example below uses `hi-IN-u-ca-indian`,
reads the locale week start from `Intl.Locale#weekInfo` when available, and renders left-to-right.

## QCalendar Integration

When the adapter is used with QCalendar, pass it as the calendar system for views that should behave
as native Saka calendars. Date-bearing values are Saka when the adapter is active, while QCalendar
also exposes Gregorian interop metadata for storage, export, and debugging boundaries. The QCalendar
adapter guide explains the integration boundary, outside-day behavior, and native month navigation:

[Using Timestamp adapters with QCalendar](https://qcalendar.netlify.app/developing/calendar-adapters)

## Calendar Ranges

Use the adapter-aware helpers when you need native Saka weeks or months:

<MarkdownExample title="Saka Calendar Ranges" file="SakaRanges"/>
