---
title: Comparisons
desc: Compare dates, times, and ranges
---

Timestamp comparison helpers work with date-only, time-only, and date-time values.

```ts
import { compareDate, compareDateTime, compareTime, parseTimestamp } from "@timestamp-js/core";

const a = parseTimestamp("2026-06-08 09:30")!;
const b = parseTimestamp("2026-06-08 10:00")!;

compareDate(a, b);
compareTime(a, b);
compareDateTime(a, b);
```

## Ranges

Use range helpers when inclusive date boundaries matter.

```ts
import { isBetweenDates, isOverlappingDates, parseTimestamp } from "@timestamp-js/core";

const target = parseTimestamp("2026-06-08")!;
const start = parseTimestamp("2026-06-01")!;
const end = parseTimestamp("2026-06-30")!;

isBetweenDates(target, start, end);
isOverlappingDates(start, end, target, target);
```

## Min and max

```ts
import { maxTimestamp, minTimestamp, parseTimestamp } from "@timestamp-js/core";

const first = parseTimestamp("2026-06-08")!;
const second = parseTimestamp("2026-06-09")!;

minTimestamp(first, second);
maxTimestamp(first, second);
```
