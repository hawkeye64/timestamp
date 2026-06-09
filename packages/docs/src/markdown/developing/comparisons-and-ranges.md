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
import { getDayTimeIdentifier, parseTimestamp } from "@timestamp-js/core";

const first = parseTimestamp("2026-06-08 09:30")!;
const second = parseTimestamp("2026-06-08 10:00")!;

getDayTimeIdentifier(first) < getDayTimeIdentifier(second); // true
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
