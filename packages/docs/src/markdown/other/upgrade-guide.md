---
title: Upgrade Guide
desc: Migrate embedded Timestamp utility usage to @timestamp-js/core
keys: Other
---

Use this guide when upgrading from an embedded Timestamp utility that shipped with another package, especially older QCalendar usage, to the standalone `@timestamp-js/core` package.

Timestamp is currently in the `0.x` alpha line. Until the first stable release, small API adjustments can happen as existing integrations and third-party projects validate the public surface.

## Install Timestamp Directly

Add `@timestamp-js/core` to your application dependencies. Do not rely on QCalendar, QScroller, or another UI package to provide Timestamp helpers for your app code.

```tabs
<<| bash pnpm |>>
pnpm add @timestamp-js/core
<<| bash bun |>>
bun add @timestamp-js/core
<<| bash yarn |>>
yarn add @timestamp-js/core
<<| bash npm |>>
npm install @timestamp-js/core
```

## Import From The Standalone Package

Replace QCalendar-owned or source-path Timestamp imports with direct `@timestamp-js/core` imports.

```ts
// Before: your app imported Timestamp helpers from QCalendar or a source utility path.
// import { parseTimestamp, today } from "@quasar/quasar-ui-qcalendar/..."

// After: your app owns the dependency explicitly.
import { parseTimestamp, today } from "@timestamp-js/core";
```

Import types from the same package:

```ts
import type { Timestamp, TimeObject, DisabledDay } from "@timestamp-js/core";
```

## Adjust For Immutability

The standalone package treats Timestamp objects as immutable values. Parsers and update helpers return frozen objects, and date math returns a new Timestamp instead of changing the input.

If older application code changed fields directly, switch to helper functions or create a copied value.

```ts
import { addToDate, copyTimestamp, parseTimestamp } from "@timestamp-js/core";

const current = parseTimestamp("2026-06-08 09:30")!;

// Prefer date math helpers when changing calendar fields.
const nextMonth = addToDate(current, { month: 1 });

// Use copyTimestamp() when you need a manual field replacement.
const firstOfMonth = copyTimestamp({ ...current, day: 1 });
```

Avoid mutation-style code:

```ts
const current = parseTimestamp("2026-06-08")!;

// Avoid this. Timestamp objects are immutable.
current.day = 1;
```

## Keep QCalendar Slot Values Separate

QCalendar components still pass timestamp-shaped slot and event values where their component API documents them. Treat those objects as component data. If app-level code needs reusable date/time utilities, parse or copy values with `@timestamp-js/core` instead of importing Timestamp helpers from QCalendar.

```ts
import { copyTimestamp, type Timestamp } from "@timestamp-js/core";

function useSlotTimestamp(timestamp: Timestamp): Timestamp {
  return copyTimestamp(timestamp);
}
```

## Parsing Differences To Know

The standalone package keeps the familiar calendar-style inputs and adds fuller ISO-like input support:

- `2026-06-08`
- `2026-06-08 09:30`
- `2026-06-08T09:30`
- `2026-06-08T09:30:15`
- `2026-06-08T09:30:15.250Z`
- `2026-06-08T09:30:15.250-07:00`

Seconds, milliseconds, and timezone suffixes are optional. Timezone suffixes are preserved, but the parser does not convert wall-clock values into another timezone.

## Migration Checklist

- Prefer importing from `@timestamp-js/core`.
- Treat Timestamp objects as immutable values.
- Use parser and date math helpers instead of mutating fields manually.
- Add `@timestamp-js/core` as a direct dependency in every app or package that uses Timestamp helpers.
- Review tests that assumed mutation because helpers now return new immutable objects.
- Review SSR-sensitive code that calls `today()` during render. Prefer explicit input values when server/client timezone differences matter.
- Watch release notes for timezone, UTC, calendar-system, and API-shape changes while the package is still alpha.
