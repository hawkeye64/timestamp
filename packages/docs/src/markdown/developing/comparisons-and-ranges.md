---
title: Comparisons And Ranges
desc: Compare dates, times, date-times, and inclusive ranges
---

Comparison helpers avoid repeatedly converting Timestamp objects back into native `Date` values.

## Compare date and time separately

```ts [twoslash]
import { compareDate, compareDateTime, compareTime, parseTimestamp } from "@timestamp-js/core";

const first = parseTimestamp("2026-06-08 09:30")!;
const second = parseTimestamp("2026-06-08 10:00")!;

compareDate(first, second); // true
compareTime(first, second); // false
compareDateTime(first, second); // false
```

Comparison helpers return booleans. Use identifiers or min/max helpers when you need ordering.

```ts [twoslash]
import {
  getDayIdentifier,
  getDayTimeIdentifier,
  getTimeIdentifier,
  parseTimestamp,
} from "@timestamp-js/core";

const first = parseTimestamp("2026-06-08 09:30")!;
const second = parseTimestamp("2026-06-08 10:00")!;

getDayIdentifier(first); // 202606080000
getTimeIdentifier(first); // 930
getDayTimeIdentifier(first) < getDayTimeIdentifier(second); // true
```

## Compare exact timestamps

Use `compareTimestamps()` when timezone suffixes and sub-minute precision matter too.

```ts [twoslash]
import { compareDateTime, compareTimestamps, parseTimestamp } from "@timestamp-js/core";

const utc = parseTimestamp("2036-06-08T09:30:15.250Z")!;
const offset = parseTimestamp("2036-06-08T09:30:15.250-07:00")!;

compareDateTime(utc, offset); // true
compareTimestamps(utc, offset); // false
```

## Check inclusive date ranges

```ts [twoslash]
import { isBetweenDates, parseTimestamp } from "@timestamp-js/core";

const start = parseTimestamp("2026-06-01")!;
const end = parseTimestamp("2026-06-30")!;
const target = parseTimestamp("2026-06-08")!;

isBetweenDates(target, start, end); // true
```

## Check overlap between ranges

```ts [twoslash]
import { isOverlappingDates, parseTimestamp } from "@timestamp-js/core";

const vacationStart = parseTimestamp("2026-06-10")!;
const vacationEnd = parseTimestamp("2026-06-14")!;
const blackoutStart = parseTimestamp("2026-06-12")!;
const blackoutEnd = parseTimestamp("2026-06-18")!;

isOverlappingDates(vacationStart, vacationEnd, blackoutStart, blackoutEnd); // true
```

## Pick min and max values

```ts [twoslash]
import { getDate, maxTimestamp, minTimestamp, parseTimestamp } from "@timestamp-js/core";

const dates = [
  parseTimestamp("2026-06-08")!,
  parseTimestamp("2026-06-12")!,
  parseTimestamp("2026-06-01")!,
];

getDate(minTimestamp(dates)); // "2026-06-01"
getDate(maxTimestamp(dates)); // "2026-06-12"
```

## Measure differences

`diffTimestamp()` returns milliseconds. `daysBetween()` and `weeksBetween()` provide common calendar-sized measurements.

```ts [twoslash]
import { daysBetween, diffTimestamp, parseTimestamp, weeksBetween } from "@timestamp-js/core";

const start = parseTimestamp("2036-06-01")!;
const end = parseTimestamp("2036-06-15")!;

diffTimestamp(start, end); // 1209600000
daysBetween(start, end); // 14
weeksBetween(start, end); // 3
```
