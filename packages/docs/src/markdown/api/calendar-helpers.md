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

## Labels

Use `Intl.DateTimeFormat`-backed helpers for month and weekday labels.

```ts
import { getMonthNames, getWeekdayNames } from '@timestamp-js/core'

const weekdays = getWeekdayNames('en-US')
const months = getMonthNames('en-US')
```

## Identifiers

Identifiers give stable numeric comparisons without converting to native `Date` objects repeatedly.

```ts
import { getDayIdentifier, getDayTimeIdentifier, parseTimestamp } from '@timestamp-js/core'

const timestamp = parseTimestamp('2026-06-08 09:30')!

getDayIdentifier(timestamp)
getDayTimeIdentifier(timestamp)
```
