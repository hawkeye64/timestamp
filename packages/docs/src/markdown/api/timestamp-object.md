---
title: Timestamp Object
desc: Timestamp shape and fields
---

Timestamp objects are immutable plain objects with Gregorian calendar fields and optional time fields.

```ts
export interface Timestamp {
  readonly calendarId?: CalendarId
  readonly date: string
  readonly hasDay: boolean
  readonly year: number
  readonly month: number
  readonly day: number
  readonly time?: string
  readonly hasTime: boolean
  readonly hour: number
  readonly minute: number
  readonly second?: number
  readonly millisecond?: number
  readonly timezone?: string
  readonly weekday?: number
  readonly doy?: number
  readonly workweek?: number
  readonly past?: boolean
  readonly current?: boolean
  readonly future?: boolean
  readonly disabled?: boolean
}
```

## Important fields

| Field        | Meaning                                                          |
| ------------ | ---------------------------------------------------------------- |
| `calendarId` | Optional calendar-system id for adapter-produced timestamps.     |
| `date`       | Date string in `YYYY-MM-DD` form when the timestamp has a day.   |
| `time`       | Time string formatted as `HH:mm`, `HH:mm:ss`, or `HH:mm:ss.SSS`. |
| `hasDay`     | True when the timestamp includes a meaningful date/day value.    |
| `hasTime`    | True when the timestamp includes time fields.                    |
| `weekday`    | Weekday number where Sunday is `0` and Saturday is `6`.          |
| `doy`        | Day of the year.                                                 |
| `workweek`   | ISO-style workweek number.                                       |
| `timezone`   | Preserved timezone suffix such as `Z`, `+06:00`, or `-0700`.     |
| `past`       | True when the timestamp is before a comparison timestamp.        |
| `current`    | True when the timestamp matches a comparison timestamp.          |
| `future`     | True when the timestamp is after a comparison timestamp.         |
| `disabled`   | True when this timestamp represents a disabled date.             |

## Hover documentation

The source is documented with TypeScript/JSDoc comments so editors can show field and helper details on hover.
