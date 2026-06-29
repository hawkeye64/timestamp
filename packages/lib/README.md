# Timestamp

Framework-agnostic TypeScript utilities for date-only, time-only, date-time, interval, and range workflows in browsers, Node.js, and modern JavaScript runtimes.

Timestamp focuses on immutable plain objects and small utility functions. It is intentionally independent of any UI framework, backend framework, or application platform.

The package is ESM, side-effect free, and designed for tree-shaking. Prefer named imports so bundlers can keep only the helpers your app actually uses.

## Install

```bash
pnpm add @timestamp-js/core
```

## Basic Usage

```ts
import { addToDate, addToDateClamped, getDateTime, parseTimestamp } from '@timestamp-js/core'

const start = parseTimestamp('2026-06-08T09:30:15.250Z')
const end = start ? addToDate(start, { day: 2, minute: 45 }) : null
const billingDate = start ? addToDateClamped(start, { month: 1 }) : null

console.log(end ? getDateTime(end) : 'Invalid date')
console.log(billingDate ? getDateTime(billingDate) : 'Invalid date')
```

## Browser Globals

The package also ships a browser-global IIFE build for CDN and CodePen-style usage:

```html
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/core@0.1.0-rc.2/dist/index.global.min.js"></script>
<script>
  const today = TimestampJsCore.today()
  const parsed = TimestampJsCore.parseTimestamp(today)

  console.log(parsed?.date)
</script>
```

## Timestamp Values

Timestamp objects are immutable. Parsers and update helpers return frozen objects, and functions that change date/time fields return a new Timestamp instead of mutating the original.

```ts
const start = parseTimestamp('2026-06-08 09:30')!
const next = addToDate(start, { day: 1 })

console.log(start.date) // 2026-06-08
console.log(next.date) // 2026-06-09
```

## Supported Input Shape

The parser accepts compact calendar inputs and fuller ISO-style date-time inputs:

- `2026-06-08`
- `2026-06-08 09:30`
- `2026-06-08T09:30`
- `2026-06-08T09:30:15`
- `2026-06-08T09:30:15.250Z`
- `2026-06-08T09:30:15.250-07:00`

Seconds, milliseconds, and timezone suffixes are optional. Timezone suffixes are preserved on the Timestamp object, but the parser does not convert the wall-clock values into another zone.

## SSR And Runtime Compatibility

Timestamp is designed for server-rendered and client-rendered applications. The package is ESM, side-effect free, and does not depend on browser globals such as `window`, `document`, `navigator`, or storage APIs.

The library relies on standard JavaScript runtime APIs such as `Date` and `Intl.DateTimeFormat`, so it works in modern Node.js, browser, serverless, and edge-style runtimes that provide those APIs.

For deterministic SSR output, prefer passing explicit timestamps into helpers instead of calling `today()` during render. `today()` intentionally uses the host runtime clock and timezone.

## Documentation

The project includes a Q-Press documentation site under `packages/docs`.

```bash
pnpm docs:dev
pnpm docs:build
```

## Workspace Layout

The publishable package lives in `packages/lib` so the repository follows the same predictable workspace shape as the sibling projects. The root package is private and only coordinates shared scripts, dependency installation, verification, and docs builds.

## Current Scope

- Parse date strings and ISO-like date-time strings into Timestamp objects.
- Convert native `Date` objects into Timestamp objects.
- Compare dates, times, date-times, and timestamp ranges, including optional second and millisecond precision.
- Generate day and interval lists for calendar-style views.
- Generate adapter-aware calendar timestamps and day lists for optional calendar packages.
- Format weekday and month names through `Intl.DateTimeFormat`.
- Keep the public surface small, typed, immutable, and runtime-agnostic while the package stabilizes.

## Future Scope

The package is intentionally not trying to become a full general-purpose date library on day one. Planned evaluations include Temporal support, explicit timezone behavior, more alternate calendar systems, and compact formatting masks.

## Development

```bash
pnpm install
pnpm verify
```

Package builds emit ESM and TypeScript declarations with `tsc`, plus browser-global IIFE bundles with `obuild`.
