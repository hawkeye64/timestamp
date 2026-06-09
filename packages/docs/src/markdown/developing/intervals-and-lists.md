---
title: Intervals And Lists
desc: Generate date and time collections for application workflows
---

List helpers are useful when you need predictable data structures for calendars, schedulers, availability grids, or reporting periods.

## Create an inclusive day list

`createDayList()` returns every date from the start boundary through the end boundary.

```ts [twoslash]
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

## Mark disabled days while building lists

`createDayList()` can apply disabled metadata as the list is generated. This is handy for date pickers, availability grids, and scheduler UIs.

```ts [twoslash]
import { createDayList, parseTimestamp } from "@timestamp-js/core";
import type { DisabledDays } from "@timestamp-js/core";

const start = parseTimestamp("2036-06-01")!;
const end = parseTimestamp("2036-06-07")!;
const today = parseTimestamp("2036-06-03")!;

const disabledDays: DisabledDays = [
  "2036-06-04",
  { from: "2036-06-06", to: "2036-06-07", label: "Maintenance" },
];

const days = createDayList(
  start,
  end,
  today,
  [0, 1, 2, 3, 4, 5, 6],
  undefined,
  undefined,
  [],
  disabledDays,
);

days.find((day) => day.date === "2036-06-04")?.disabled; // true
days.find((day) => day.date === "2036-06-06")?.disabledLabel; // "Maintenance"
```

## Create day intervals

`createIntervalList()` creates time slots for a single day. Pass the starting interval index, minutes per interval, total interval count, and the Timestamp to use for relative flags.

```ts [twoslash]
import { createIntervalList, parseTimestamp } from "@timestamp-js/core";

const day = parseTimestamp("2026-06-08")!;
const hourly = createIntervalList(day, 0, 60, 24, day);

hourly[0]?.time; // "00:00"
hourly[9]?.time; // "09:00"
hourly[23]?.time; // "23:00"
```

## Build smaller picker lists

You can also create compact option lists for forms or filters.

```ts [twoslash]
import { createIntervalList, parseTimestamp } from "@timestamp-js/core";

const day = parseTimestamp("2026-06-08")!;
const businessHours = createIntervalList(day, 9, 60, 8, day).map((timestamp) => timestamp.time);

businessHours;
// ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
```

## Generate localized labels

Month and weekday labels use `Intl.DateTimeFormat`, so pass an explicit locale when server and client output must match.

```ts [twoslash]
import { getMonthNames, getWeekdayNames } from "@timestamp-js/core";

getWeekdayNames("long", "en-US").slice(0, 3); // ["Sunday", "Monday", "Tuesday"]
getMonthNames("long", "en-US").slice(0, 3); // ["January", "February", "March"]
```

## Reuse formatter factories

Use formatter factories when your app needs labels one at a time instead of full arrays.

```ts [twoslash]
import { getMonthFormatter, getWeekdayFormatter } from "@timestamp-js/core";

const formatWeekday = getWeekdayFormatter();
const formatMonth = getMonthFormatter();

formatWeekday("Mon", "short", "en-US"); // "Mon"
formatMonth(5, "long", "en-US"); // "June"
```

## Create custom native locale formatters

`createNativeLocaleFormatter()` lets you share one host-local formatting strategy and switch options per call. Use `createNativeLocaleFormatterUTC()` when the timestamp should be converted to a native Date from UTC fields before formatting.

```ts [twoslash]
import {
  createNativeLocaleFormatter,
  createNativeLocaleFormatterUTC,
  parseTimestamp,
} from "@timestamp-js/core";

const formatDate = createNativeLocaleFormatter("en-US", (_timestamp, short) => ({
  dateStyle: short ? "medium" : "full",
}));

const formatDateUTC = createNativeLocaleFormatterUTC("en-US", (_timestamp, short) => ({
  dateStyle: short ? "medium" : "full",
  timeZone: "UTC",
}));

const timestamp = parseTimestamp("2036-06-08")!;

formatDate(timestamp, true); // "Jun 8, 2036"
formatDate(timestamp, false); // "Sunday, June 8, 2036"
formatDateUTC(timestamp, true); // "Jun 8, 2036"
```
