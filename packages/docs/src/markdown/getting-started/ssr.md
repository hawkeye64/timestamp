---
title: SSR
desc: Use Timestamp safely in server-rendered applications
---

Timestamp is designed to work in SSR, SSG, browser, and backend contexts.

The package does not touch `window`, `document`, storage APIs, or framework-specific globals. That keeps imports safe during server rendering and static builds.

## Server and client timezones

The expected reality is simple: helpers that use the host clock use the timezone of the runtime where they execute.

That means a server in UTC and a browser in America/Edmonton can produce different values if both call `today()` during render.

For deterministic SSR output:

- Prefer passing explicit timestamps into helpers.
- Use caller-provided `now` values for relative comparisons.
- Use UTC parsing modes when the application wants server and client to agree on UTC calendar fields.

```ts
import { parseDate, parseTimestamp, updateRelative } from "@timestamp-js/core";

const now = parseTimestamp("2036-06-08")!;
const target = parseTimestamp("2036-06-09")!;

const stable = updateRelative(target, now);
```

## Date objects

`parseDate(date, true)` reads a native `Date` using UTC fields.

```ts
import { parseDate } from "@timestamp-js/core";

const timestamp = parseDate(new Date("2026-06-08T09:30:00Z"), true);
```
