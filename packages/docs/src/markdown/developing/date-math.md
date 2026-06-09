---
title: Date Math
desc: Move immutable Timestamp values by calendar units
---

Date math helpers always return new Timestamp objects. The original object stays unchanged.

## Move by days, months, and years

```ts [twoslash]
import { addToDate, getDate, parseTimestamp } from "@timestamp-js/core";

const current = parseTimestamp("2026-06-08")!;

const nextWeek = addToDate(current, { day: 7 });
const nextMonth = addToDate(current, { month: 1 });
const lastYear = addToDate(current, { year: -1 });

getDate(nextWeek); // "2026-06-15"
getDate(nextMonth); // "2026-07-08"
getDate(lastYear); // "2025-06-08"
getDate(current); // "2026-06-08"
```

## Use clamped math for billing-style dates

JavaScript date overflow is useful for some workflows, but billing cycles and due dates often need end-of-month clamping.

```ts [twoslash]
import { addToDate, addToDateClamped, getDate, parseTimestamp } from "@timestamp-js/core";

const monthEnd = parseTimestamp("2026-01-31")!;

const overflow = addToDate(monthEnd, { month: 1 });
const clamped = addToDateClamped(monthEnd, { month: 1 });

getDate(overflow); // "2026-03-03"
getDate(clamped); // "2026-02-28"
```

## Leap-year clamping

Clamped math keeps leap-day anniversaries on the last valid day when the target year is not a leap year.

```ts [twoslash]
import { addToDateClamped, getDate, parseTimestamp } from "@timestamp-js/core";

const leapDay = parseTimestamp("2020-02-29")!;
const nextYear = addToDateClamped(leapDay, { year: 1 });

getDate(nextYear); // "2021-02-28"
```

## Move one day at a time

Use `nextDay()` and `prevDay()` when readability matters more than a generic offset object.

```ts [twoslash]
import { getDate, nextDay, parseTimestamp, prevDay } from "@timestamp-js/core";

const current = parseTimestamp("2026-06-08")!;

getDate(prevDay(current)); // "2026-06-07"
getDate(nextDay(current)); // "2026-06-09"
```

## Set minutes from midnight

`updateMinutes()` is useful for time pickers and interval grids that store time as minutes after midnight.

```ts [twoslash]
import { parseTimestamp, updateMinutes } from "@timestamp-js/core";

const day = parseTimestamp("2036-06-08")!;

const meeting = updateMinutes(day, 9 * 60 + 30);

meeting.time; // "09:30"
meeting.hour; // 9
meeting.minute; // 30
```

## Move by allowed weekdays

Use `relativeDays()` or `moveRelativeDays()` when "next day" should skip weekends or other disallowed weekdays.

```ts [twoslash]
import {
  getDate,
  moveRelativeDays,
  nextDay,
  parseTimestamp,
  prevDay,
  relativeDays,
} from "@timestamp-js/core";

const friday = parseTimestamp("2036-06-13")!;
const mondayToFriday = [1, 2, 3, 4, 5];

getDate(relativeDays(friday, nextDay, 1, mondayToFriday)); // "2036-06-16"
getDate(moveRelativeDays(friday, prevDay, 1, mondayToFriday)); // "2036-06-12"
```

## Find a specific weekday

`findWeekday()` moves forward or backward until the requested weekday is found.

```ts [twoslash]
import { findWeekday, getDate, nextDay, parseTimestamp, prevDay } from "@timestamp-js/core";

const current = parseTimestamp("2036-06-08")!;

getDate(findWeekday(current, 5, nextDay)); // "2036-06-13"
getDate(findWeekday(current, 1, prevDay)); // "2036-06-02"
```

## Type reusable offset objects

`AddToDateOptions` is useful when offsets are passed through app-level helpers.

```ts [twoslash]
import { addToDate, getDate, parseTimestamp } from "@timestamp-js/core";
import type { AddToDateOptions } from "@timestamp-js/core";

const renewalOffset: AddToDateOptions = { year: 1, day: -1 };
const startsAt = parseTimestamp("2036-06-08")!;

getDate(addToDate(startsAt, renewalOffset)); // "2037-06-07"
```
