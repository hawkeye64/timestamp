---
title: Validation And Boundaries
desc: Validate input, inspect calendar facts, and derive period boundaries
---

Use these helpers when app code needs to accept external input, guard form values, or build calendar-style boundaries before doing date math.

## Validate before parsing

`validateTimestamp()` is a lightweight grammar check. Use `parseTimestamp()` when you need a full immutable object.

```ts [twoslash]
import { parseTimestamp, validateTimestamp } from "@timestamp-js/core";

validateTimestamp("2036-06-08T09:30:15.250Z"); // true
validateTimestamp("not a date"); // false

const timestamp = validateTimestamp("2036-06-08") ? parseTimestamp("2036-06-08") : null;

timestamp?.date; // "2036-06-08"
```

## Use the low-level parser when you only need fields

`parsed()` is intentionally smaller than `parseTimestamp()`. It reads fields and preserves timezone suffixes, but does not fill derived values such as weekday, day of year, or workweek.

```ts [twoslash]
import { parsed, parseTimestamp } from "@timestamp-js/core";

const minimal = parsed("2036-06-08T09:30:15-07:00")!;
const formatted = parseTimestamp("2036-06-08T09:30:15-07:00")!;

minimal.timezone; // "-07:00"
minimal.doy; // 0
formatted.doy; // 160
```

## Validate numeric input

`validateNumber()` is useful before converting text input into offsets, intervals, or form-driven date math.

```ts [twoslash]
import { validateNumber } from "@timestamp-js/core";

validateNumber("15"); // true
validateNumber(30); // true
validateNumber("fifteen"); // false
```

## Inspect Gregorian month facts

Use `isLeapYear()` and `daysInMonth()` when you need to explain or constrain calendar choices.

```ts [twoslash]
import { daysInMonth, isLeapYear } from "@timestamp-js/core";

isLeapYear(2036); // true
daysInMonth(2036, 2); // 29
daysInMonth(2037, 2); // 28
```

## Format small numeric pieces

`padNumber()` is intentionally simple, but it keeps custom output consistent with Timestamp's own formatting.

```ts [twoslash]
import { padNumber } from "@timestamp-js/core";

padNumber(7, 2); // "07"
padNumber(42, 4); // "0042"
```

## Read period boundaries

Start/end helpers are useful for month grids, week views, and reporting ranges.

```ts [twoslash]
import {
  getDate,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  parseTimestamp,
} from "@timestamp-js/core";

const now = parseTimestamp("2036-06-08")!;
const weekdays = [0, 1, 2, 3, 4, 5, 6];

getDate(getStartOfWeek(now, weekdays, now)); // "2036-06-08"
getDate(getEndOfWeek(now, weekdays, now)); // "2036-06-14"
getDate(getStartOfMonth(now)); // "2036-06-01"
getDate(getEndOfMonth(now)); // "2036-06-30"
```

## Read and refresh derived fields

Parser helpers fill these values for normal use. The explicit helpers are useful when code creates or transforms timestamp-like objects and then needs fresh derived metadata.

```ts [twoslash]
import {
  getDayOfYear,
  getWeekday,
  getWorkWeek,
  parseTimestamp,
  updateDayOfYear,
  updateWeekday,
  updateWorkWeek,
} from "@timestamp-js/core";

const timestamp = parseTimestamp("2036-06-08")!;

getWeekday(timestamp); // 0
getDayOfYear(timestamp); // 160
getWorkWeek(timestamp); // 23

updateWeekday(timestamp).weekday; // 0
updateDayOfYear(timestamp).doy; // 160
updateWorkWeek(timestamp).workweek; // 23
```

## Reuse shared constants sparingly

Constants are best when your app needs to avoid duplicate magic numbers.

```ts [twoslash]
import {
  DAYS_IN_WEEK,
  HOURS_IN_DAY,
  MILLISECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  TIME_CONSTANTS,
} from "@timestamp-js/core";

DAYS_IN_WEEK; // 7
HOURS_IN_DAY; // 24
MINUTES_IN_HOUR; // 60
MILLISECONDS_IN_DAY; // 86400000
TIME_CONSTANTS.SECONDS_IN.HOUR; // 3600
```
