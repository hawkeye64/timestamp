---
title: Hebrew Calendar
desc: Working with Hebrew calendar dates
keys: developing
examples: CalendarSystems
---

The `@timestamp-js/calendar-hebrew` package exports `hebrewCalendar`, with `jewishCalendar` as a
convenience alias. It models the deterministic arithmetic Hebrew calendar and uses civil/CLDR month
numbering for model dates.

## Package

```ts
import { gregorianCalendar } from '@timestamp-js/core'
import { hebrewCalendar } from '@timestamp-js/calendar-hebrew'

const roshHashanah = { year: 5785, month: 1, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(hebrewCalendar.toEpochDay(roshHashanah))

gregorian // { year: 2024, month: 10, day: 3 }
```

## Calendar Rules

Timestamp uses the month order that best matches end-user software expectations:

- `1` is Tishrei, where the civil Hebrew year begins.
- `5` is Shevat.
- `6` is Adar in common years.
- In leap years, `6` is Adar I and `7` is Adar II.
- Nisan follows Adar or Adar II.

Biblical and festival writing may call Nisan the first month. That is a naming/counting convention;
the Timestamp model uses civil/CLDR numbering so adapter-native `YYYY-MM-DD` values line up with
common localized calendar UI behavior.

The Hebrew adapter recommends `he-IL`, right-to-left presentation, and Sunday-through-Saturday
visible weeks. Apps can still pass their own locale, direction, or weekday order.

## QCalendar Integration

When the adapter is used with QCalendar, pass it as the calendar system for views that should behave
as native Hebrew calendars. Date-bearing values are Hebrew when the adapter is active, while
QCalendar also exposes Gregorian interop metadata for storage, export, and debugging boundaries. The
QCalendar adapter guide explains the integration boundary, outside-day behavior, and native month
navigation:

[Using Timestamp adapters with QCalendar](https://qcalendar.netlify.app/developing/calendar-adapters)

## Calendar Ranges

Use the adapter-aware helpers when you need native Hebrew weeks or months:

<MarkdownExample title="Hebrew Calendar Ranges" file="HebrewRanges"/>
