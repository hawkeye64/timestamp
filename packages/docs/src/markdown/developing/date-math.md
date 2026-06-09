---
title: Date Math
desc: Move immutable Timestamp values by calendar units
---

Date math helpers always return new Timestamp objects. The original object stays unchanged.

## Move by days, months, and years

```ts
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

```ts
import { addToDate, addToDateClamped, getDate, parseTimestamp } from "@timestamp-js/core";

const monthEnd = parseTimestamp("2026-01-31")!;

const overflow = addToDate(monthEnd, { month: 1 });
const clamped = addToDateClamped(monthEnd, { month: 1 });

getDate(overflow); // "2026-03-03"
getDate(clamped); // "2026-02-28"
```

## Leap-year clamping

Clamped math keeps leap-day anniversaries on the last valid day when the target year is not a leap year.

```ts
import { addToDateClamped, getDate, parseTimestamp } from "@timestamp-js/core";

const leapDay = parseTimestamp("2020-02-29")!;
const nextYear = addToDateClamped(leapDay, { year: 1 });

getDate(nextYear); // "2021-02-28"
```

## Move one day at a time

Use `nextDay()` and `prevDay()` when readability matters more than a generic offset object.

```ts
import { getDate, nextDay, parseTimestamp, prevDay } from "@timestamp-js/core";

const current = parseTimestamp("2026-06-08")!;

getDate(prevDay(current)); // "2026-06-07"
getDate(nextDay(current)); // "2026-06-09"
```
