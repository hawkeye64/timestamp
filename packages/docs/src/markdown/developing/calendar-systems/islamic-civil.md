---
title: Islamic Civil (Hijri) Calendar
desc: Working with deterministic tabular Hijri dates
keys: developing
examples: CalendarSystems
---

The `@timestamp-js/calendar-islamic` package exports `islamicCivilCalendar`, a deterministic
tabular Islamic civil/Hijri calendar. It is designed for repeatable date math, range generation, and
UI views that need a Hijri-shaped calendar without depending on observation data.

This adapter intentionally does not model observational Hijri calendars or Umm al-Qura adjustments.
Those should be separate adapters because their rules and supported date ranges are different.

## Package

```ts
import { gregorianCalendar } from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const ramadan = { year: 1445, month: 9, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(islamicCivilCalendar.toEpochDay(ramadan))

gregorian // { year: 2024, month: 3, day: 11 }
```

## Calendar Rules

Islamic civil years have 12 lunar months. Months alternate between 30 and 29 days, with Dhu
al-Hijjah receiving an extra day in leap years. Leap years follow the tabular 30-year cycle.

Week start is a locale concern, not an adapter rule. The example below uses
`ar-SA-u-ca-islamic-civil`, reads the locale week start from `Intl.Locale#weekInfo` when available,
and renders the week/month panels right-to-left.

## QCalendar Integration

When the adapter is used with QCalendar, pass it as the calendar system for views that should behave
as native Hijri calendars. Date-bearing values are Hijri when the adapter is active, while QCalendar
also exposes Gregorian interop metadata for storage, export, and debugging boundaries. The QCalendar
adapter guide explains the integration boundary, outside-day behavior, and native month navigation:

[Using Timestamp adapters with QCalendar](https://qcalendar.netlify.app/developing/calendar-adapters)

## Calendar Ranges

Use the adapter-aware helpers when you need native Islamic civil weeks or months:

<MarkdownExample title="Islamic Civil Calendar Ranges" file="IslamicCivilRanges"/>
