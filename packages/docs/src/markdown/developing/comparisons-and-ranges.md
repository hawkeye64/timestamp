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

## Create reusable range objects

Use `TimestampRange` when the same inclusive boundaries need to flow through several helpers.

```ts [twoslash]
import {
  createTimestampRange,
  getDate,
  isTimestampInRange,
  parseTimestamp,
} from "@timestamp-js/core";

const june = createTimestampRange(parseTimestamp("2036-06-01")!, parseTimestamp("2036-06-30")!);
const target = parseTimestamp("2036-06-08")!;

isTimestampInRange(target, june); // true
getDate(june.start); // "2036-06-01"
getDate(june.end); // "2036-06-30"
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

## Check overlap between reusable range objects

Use `isRangeOverlapping()` when your app already passes around `TimestampRange` values.

```ts [twoslash]
import { createTimestampRange, isRangeOverlapping, parseTimestamp } from "@timestamp-js/core";

const planningWindow = createTimestampRange(
  parseTimestamp("2036-06-01")!,
  parseTimestamp("2036-06-30")!,
);
const blackout = createTimestampRange(parseTimestamp("2036-06-12")!, parseTimestamp("2036-06-18")!);

isRangeOverlapping(planningWindow, blackout); // true
```

## Intersect two ranges

`intersectRanges()` returns the shared section of two ranges, or `null` when they do not overlap.

```ts [twoslash]
import { createTimestampRange, getDate, intersectRanges, parseTimestamp } from "@timestamp-js/core";

const sprint = createTimestampRange(parseTimestamp("2036-06-01")!, parseTimestamp("2036-06-20")!);
const blackout = createTimestampRange(parseTimestamp("2036-06-10")!, parseTimestamp("2036-06-30")!);

const overlap = intersectRanges(sprint, blackout);

getDate(overlap!.start); // "2036-06-10"
getDate(overlap!.end); // "2036-06-20"
```

## Merge touching ranges

`mergeRanges()` sorts the ranges and joins ranges that overlap or touch. Date-only ranges touch when the next range starts on the next calendar day.

```ts [twoslash]
import { createTimestampRange, getDate, mergeRanges, parseTimestamp } from "@timestamp-js/core";

const merged = mergeRanges([
  createTimestampRange(parseTimestamp("2036-06-10")!, parseTimestamp("2036-06-12")!),
  createTimestampRange(parseTimestamp("2036-06-01")!, parseTimestamp("2036-06-04")!),
  createTimestampRange(parseTimestamp("2036-06-05")!, parseTimestamp("2036-06-07")!),
]);

getDate(merged[0]!.start); // "2036-06-01"
getDate(merged[0]!.end); // "2036-06-07"
merged.length; // 2
```

## Subtract blocked dates

`subtractRanges()` returns the pieces of a source range that remain after blocked ranges are removed.

```ts [twoslash]
import { createTimestampRange, getDate, parseTimestamp, subtractRanges } from "@timestamp-js/core";

const month = createTimestampRange(parseTimestamp("2036-06-01")!, parseTimestamp("2036-06-30")!);
const maintenance = [
  createTimestampRange(parseTimestamp("2036-06-10")!, parseTimestamp("2036-06-12")!),
];

const available = subtractRanges(month, maintenance);

getDate(available[0]!.end); // "2036-06-09"
getDate(available[1]!.start); // "2036-06-13"
```

## Find time-aware gaps

Pass `true` for `useTime` when ranges represent instants inside a day. Time-aware gaps use millisecond boundaries so adjacent ranges stay precise.

```ts [twoslash]
import { createTimestampRange, findRangeGaps, parseTimestamp } from "@timestamp-js/core";

const workBlock = createTimestampRange(
  parseTimestamp("2036-06-08T09:00")!,
  parseTimestamp("2036-06-08T10:00")!,
  true,
);
const booked = [
  createTimestampRange(
    parseTimestamp("2036-06-08T09:15")!,
    parseTimestamp("2036-06-08T09:29:59.999")!,
    true,
  ),
];

const gaps = findRangeGaps(workBlock, booked, true);

gaps[0]!.end.time; // "09:14:59.999"
gaps[1]!.start.time; // "09:30"
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
