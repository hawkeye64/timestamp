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
- Use `todayUTC()` or `nowUTC()` when the application wants server and client to agree on UTC calendar fields.
- Use `parseDateUTC()` when converting native `Date` instances that represent instants.

```ts
import { nowUTC, parseTimestamp, updateRelative } from '@timestamp-js/core'

const now = nowUTC(new Date('2036-06-08T12:00:00.000Z'))
const target = parseTimestamp('2036-06-09')!

const stable = updateRelative(target, now)
```

If the render needs to be stable even when time passes between server render and client hydration, capture the date once in app code and pass it to `nowUTC(date)` or `todayUTC(date)`.

## Date objects

`parseDateUTC(date)` reads a native `Date` using UTC fields. `parseDate(date)` reads host-local fields.

```ts
import { nowUTC, parseDate, parseDateUTC, todayUTC } from '@timestamp-js/core'

const instant = new Date('2036-06-08T09:30:00Z')

const localTimestamp = parseDate(instant)
const utcTimestamp = parseDateUTC(instant)
const dateOnly = todayUTC(instant)
const dateTime = nowUTC(instant)
```
