---
title: Intervals And Lists
desc: Generate date and time collections for application workflows
---

List helpers are useful when you need predictable data structures for calendars, schedulers, availability grids, or reporting periods.

## Create an inclusive day list

`createDayList()` returns every date from the start boundary through the end boundary.

```ts
import { createDayList, getDate, parseTimestamp } from "@timestamp-js/core";

const start = parseTimestamp("2026-06-01")!;
const end = parseTimestamp("2026-06-05")!;

const days = createDayList(start, end, start).map(getDate);

days;
// [
//   "2026-06-01",
//   "2026-06-02",
//   "2026-06-03",
//   "2026-06-04",
//   "2026-06-05",
// ]
```

## Create day intervals

`createIntervalList()` creates time slots for a single day. Pass the starting interval index, minutes per interval, total interval count, and the Timestamp to use for relative flags.

```ts
import { createIntervalList, parseTimestamp } from "@timestamp-js/core";

const day = parseTimestamp("2026-06-08")!;
const hourly = createIntervalList(day, 0, 60, 24, day);

hourly[0]?.time; // "00:00"
hourly[9]?.time; // "09:00"
hourly[23]?.time; // "23:00"
```

## Build smaller picker lists

You can also create compact option lists for forms or filters.

```ts
import { createIntervalList, parseTimestamp } from "@timestamp-js/core";

const day = parseTimestamp("2026-06-08")!;
const businessHours = createIntervalList(day, 9, 60, 8, day).map((timestamp) => timestamp.time);

businessHours;
// ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
```

## Generate localized labels

Month and weekday labels use `Intl.DateTimeFormat`, so pass an explicit locale when server and client output must match.

```ts
import { getMonthNames, getWeekdayNames } from "@timestamp-js/core";

getWeekdayNames("long", "en-US").slice(0, 3); // ["Sunday", "Monday", "Tuesday"]
getMonthNames("long", "en-US").slice(0, 3); // ["January", "February", "March"]
```
