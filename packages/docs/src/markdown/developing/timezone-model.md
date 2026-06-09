---
title: Timezone Model
desc: How Timestamp handles timezone suffixes
---

Timestamp currently treats parsed strings as calendar-style wall-clock values.

That means a timezone suffix is preserved for caller awareness, but it does not trigger automatic conversion.

```ts
import { parseTimestamp } from "@timestamp-js/core";

const timestamp = parseTimestamp("2026-06-08T09:30:15.250-07:00");

timestamp?.hour; // 9
timestamp?.timezone; // -07:00
```

## Why no automatic conversion?

Calendar UIs and scheduling workflows often care about the visible wall-clock value. Automatically converting `2026-06-08T00:30:00Z` into a local timezone can unexpectedly move the date to the previous day.

Timestamp keeps parsing stable and explicit: parsing records the suffix and preserves the wall-clock fields.

## SSR note

If server and client timezone differences matter, pass explicit timestamps or use UTC parsing behavior with native `Date` input.
