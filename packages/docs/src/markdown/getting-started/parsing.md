---
title: Parsing
desc: Parse date and date-time input into Timestamp objects
---

`parseTimestamp()` is the main parser for user-facing date and date-time values.

```ts
import { parseTimestamp } from "@timestamp-js/core";

const dateOnly = parseTimestamp("2026-06-08");
const dateTime = parseTimestamp("2026-06-08 09:30");
const iso = parseTimestamp("2026-06-08T09:30:15.250Z");
```

## Supported shapes

- `2026-06-08`
- `2026-06-08 09:30`
- `2026-06-08T09:30`
- `2026-06-08T09:30:15`
- `2026-06-08T09:30:15.250Z`
- `2026-06-08T09:30:15.250-07:00`

Seconds, milliseconds, and timezone suffixes are optional.

## Parser choices

| Helper                  | Use it when                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `parseTimestamp(value)` | You need a complete Timestamp with formatted and calendar metadata.          |
| `parsed(value)`         | You need a faster, minimal Timestamp and do not need derived fields.         |
| `parseDate(date, utc)`  | You already have a JavaScript `Date` and want a Timestamp object.            |
| `parseTime(value)`      | You need a time-only object from `HH`, `HH:mm`, `HH:mm:ss`, or milliseconds. |

## Timezone suffixes

Timezone suffixes are preserved, but parsing does not convert the wall-clock values into another zone.

```ts
const timestamp = parseTimestamp("2026-06-08T09:30:15.250-07:00");

timestamp?.timezone;
// "-07:00"
```

That behavior keeps calendar-style wall-clock parsing stable and avoids silent date shifts during parsing.
