# Timestamp

[![npm](https://img.shields.io/npm/v/@timestamp-js/core/alpha?label=@timestamp-js/core)](https://www.npmjs.com/package/@timestamp-js/core)
[![Netlify Status](https://api.netlify.com/api/v1/badges/4020c938-0242-48ed-9069-c774e3909bfd/deploy-status)](https://app.netlify.com/projects/timestamp-js/deploys)
[![Verify Timestamp](https://github.com/hawkeye64/timestamp/actions/workflows/run-vitest.yml/badge.svg)](https://github.com/hawkeye64/timestamp/actions/workflows/run-vitest.yml)
[![License](https://img.shields.io/npm/l/@timestamp-js/core)](https://github.com/hawkeye64/timestamp/blob/master/LICENSE)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/hawkeye64/timestamp)](https://github.com/hawkeye64/timestamp)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/hawkeye64/timestamp)](https://github.com/hawkeye64/timestamp)
[![npm downloads](https://img.shields.io/npm/dt/@timestamp-js/core)](https://www.npmjs.com/package/@timestamp-js/core)

Framework-agnostic TypeScript utilities for date-only, time-only, date-time, interval, and range workflows in browsers, Node.js, and modern JavaScript runtimes.

Timestamp focuses on immutable plain objects and small utility functions. It is intentionally independent of any UI framework, backend framework, or application platform.

## Install

```bash
pnpm add @timestamp-js/core
```

## Basic Usage

```ts
import { addToDate, addToDateClamped, getDateTime, parseTimestamp } from "@timestamp-js/core";

const start = parseTimestamp("2026-06-08T09:30:15.250Z");
const end = start ? addToDate(start, { day: 2, minute: 45 }) : null;
const billingDate = start ? addToDateClamped(start, { month: 1 }) : null;

console.log(end ? getDateTime(end) : "Invalid date");
console.log(billingDate ? getDateTime(billingDate) : "Invalid date");
```

## Timestamp Values

Timestamp objects are immutable. Parsers and update helpers return frozen objects, and functions that change date/time fields return a new Timestamp instead of mutating the original.

```ts
const start = parseTimestamp("2026-06-08 09:30")!;
const next = addToDate(start, { day: 1 });

console.log(start.date); // 2026-06-08
console.log(next.date); // 2026-06-09
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
- Format weekday and month names through `Intl.DateTimeFormat`.
- Keep the public surface small, typed, immutable, and runtime-agnostic while the package stabilizes.

## Development

```bash
pnpm install
pnpm verify
```
