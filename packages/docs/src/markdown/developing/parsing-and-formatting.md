---
title: Parsing And Formatting
desc: Turn external input into immutable Timestamp values
---

Use these examples when app code receives date strings from forms, APIs, route params, or persisted state.

Timestamp does not need a UI playground like CodePen because the package has no visual component. The useful examples are small, copyable TypeScript flows with known output.

## Parse common inputs

```ts [twoslash]
import { getDate, getDateTime, parseTimestamp } from "@timestamp-js/core";

const dateOnly = parseTimestamp("2026-06-08")!;
const dateTime = parseTimestamp("2026-06-08 09:30")!;
const iso = parseTimestamp("2026-06-08T09:30:15.250Z")!;

getDate(dateOnly); // "2026-06-08"
getDateTime(dateTime); // "2026-06-08 09:30"
getDateTime(iso); // "2026-06-08 09:30:15.250Z"
```

## Preserve timezone suffixes

Timestamp keeps parsed wall-clock fields stable. Timezone suffixes are stored on the object, but parsing does not convert the date or time into the local runtime timezone.

```ts [twoslash]
import { parseTimestamp } from "@timestamp-js/core";

const timestamp = parseTimestamp("2026-06-08T09:30:15-07:00")!;

timestamp.hour; // 9
timestamp.minute; // 30
timestamp.timezone; // "-07:00"
```

## Convert native Date values explicitly

Use `parseDate()` when the input is already a JavaScript `Date`. The second argument controls whether Timestamp reads the date with local getters or UTC getters.

```ts [twoslash]
import { getDateTime, parseDate } from "@timestamp-js/core";

const instant = new Date("2026-06-08T09:30:00.000Z");

const localTimestamp = parseDate(instant)!;
const utcTimestamp = parseDate(instant, true)!;

getDateTime(localTimestamp); // Depends on the host timezone.
getDateTime(utcTimestamp); // "2026-06-08 09:30"
```

## Parse time-only values

Use `parseTime()` for controls or APIs that only carry time-of-day data.

```ts [twoslash]
import { parseTime } from "@timestamp-js/core";

parseTime("09"); // 540

parseTime("09:30:15.250"); // 570
```
