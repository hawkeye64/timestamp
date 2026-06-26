# @timestamp-js/calendar-saka

Indian National Calendar (Saka) adapter for `@timestamp-js/core`.

The adapter is `indianNationalCalendar`, with `sakaCalendar` as a convenience alias. It models the
official Indian National Calendar using deterministic Gregorian-aligned leap-year rules.

```ts
import {
  createCalendarDayList,
  getCalendarEndOfMonth,
  gregorianCalendar,
  parseCalendarTimestamp,
} from '@timestamp-js/core'
import { indianNationalCalendar } from '@timestamp-js/calendar-saka'

const sakaNewYear = { year: 1946, month: 1, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(indianNationalCalendar.toEpochDay(sakaNewYear))

gregorian // { year: 2024, month: 3, day: 21 }

const start = parseCalendarTimestamp('1946-01-01', indianNationalCalendar)!
const end = getCalendarEndOfMonth(start, indianNationalCalendar)
const days = createCalendarDayList(start, end, start, indianNationalCalendar)

days[0].date // '1946-01-01'
```

This package is early calendar-adapter work. Treat the adapter contract as release-candidate API
until `@timestamp-js/core` reaches a stable `1.0.0`.
