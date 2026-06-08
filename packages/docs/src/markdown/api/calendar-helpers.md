---
title: Calendar Helpers
desc: Generate calendar-friendly dates, intervals, and labels
---

Timestamp includes helpers for calendar-style workflows without depending on a UI framework.

## Date math

```ts
import { addToDate, nextDay, parseTimestamp, prevDay } from "@timestamp-js/core";

const current = parseTimestamp("2026-06-08")!;
const tomorrow = nextDay(current);
const yesterday = prevDay(current);
const nextMonth = addToDate(current, { month: 1 });
```

## Lists

```ts
import { createDayList, createIntervalList, parseTimestamp } from "@timestamp-js/core";

const start = parseTimestamp("2026-06-01")!;
const end = parseTimestamp("2026-06-07")!;

const days = createDayList(start, end);
const intervals = createIntervalList(start, 24, 60);
```

## Labels

Use `Intl.DateTimeFormat`-backed helpers for month and weekday labels.

```ts
import { getMonthNames, getWeekdayNames } from "@timestamp-js/core";

const weekdays = getWeekdayNames("en-US");
const months = getMonthNames("en-US");
```

## Identifiers

Identifiers give stable numeric comparisons without converting to native `Date` objects repeatedly.

```ts
import { getDayIdentifier, getDayTimeIdentifier, parseTimestamp } from "@timestamp-js/core";

const timestamp = parseTimestamp("2026-06-08 09:30")!;

getDayIdentifier(timestamp);
getDayTimeIdentifier(timestamp);
```
