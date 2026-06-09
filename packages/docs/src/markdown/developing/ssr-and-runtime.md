---
title: SSR And Runtime
desc: Keep Timestamp behavior deterministic across server and client renders
---

Timestamp is framework-agnostic and does not read browser globals. That makes it safe to import in browser apps, Node.js, SSR builds, serverless functions, workers, and tests.

The SSR detail to watch is not the import itself. It is whether your code asks the runtime for the current date or locale-dependent labels during render.

## Prefer explicit inputs during render

If server and client run in different timezones, `today()` can produce different values.

```ts
import { parseTimestamp, updateRelative } from "@timestamp-js/core";

const renderedNow = parseTimestamp("2036-06-08")!;
const event = parseTimestamp("2036-06-10")!;

const stable = updateRelative(event, renderedNow);

stable.future; // true
```

## Use UTC conversion when the source is an instant

When your input is a native `Date`, pass `true` as the second `parseDate()` argument to read UTC fields.

```ts
import { getDateTime, parseDate } from "@timestamp-js/core";

const instant = new Date("2026-06-08T09:30:00.000Z");
const timestamp = parseDate(instant, true);

getDateTime(timestamp!); // "2026-06-08 09:30"
```

## Pass locales explicitly

`Intl.DateTimeFormat` can use the host default locale. Pass a locale when labels are rendered on both server and client.

```ts
import { getMonthNames, getWeekdayNames } from "@timestamp-js/core";

const weekdays = getWeekdayNames("long", "en-US");
const months = getMonthNames("long", "en-US");

weekdays[0]; // "Sunday"
months[0]; // "January"
```

## Test with injected dates

Tests are more stable when the current date is an explicit fixture.

```ts
import { parseTimestamp, updateRelative } from "@timestamp-js/core";

const now = parseTimestamp("2026-06-08")!;
const target = parseTimestamp("2026-06-07")!;

updateRelative(target, now).past; // true
```
