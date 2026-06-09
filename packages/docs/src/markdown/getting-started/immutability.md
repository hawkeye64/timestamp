---
title: Immutability
desc: Work with Timestamp objects without mutation
---

Timestamp objects are immutable. Parsers and update helpers return frozen objects, and functions that change fields return a new Timestamp instead of mutating the original.

```ts
import { addToDate, parseTimestamp } from "@timestamp-js/core";

const start = parseTimestamp("2026-06-08 09:30")!;
const next = addToDate(start, { day: 1 });
const lastYear = addToDate(start, { year: -1 });

console.log(start.date); // 2026-06-08
console.log(next.date); // 2026-06-09
console.log(lastYear.date); // 2025-06-08
```

Calendar math normalizes through JavaScript date rules by default. For example, `addToDate()` with one year added to a leap-day value such as `2020-02-29` produces `2021-03-01`, because February 29 does not exist in 2021.

Use `addToDateClamped()` when month-end workflows should stay inside the target month:

```ts
import { addToDateClamped, parseTimestamp } from "@timestamp-js/core";

const leapDay = parseTimestamp("2020-02-29")!;
const renewalDate = addToDateClamped(leapDay, { year: 1 });

console.log(renewalDate.date); // 2021-02-28
```

## Manual copies

Use `copyTimestamp()` when you need to derive a value manually.

```ts
import { copyTimestamp, parseTimestamp } from "@timestamp-js/core";

const original = parseTimestamp("2026-05-30")!;
const firstOfMonth = copyTimestamp({ ...original, day: 1 });

console.log(original.day); // 30
console.log(firstOfMonth.day); // 1
```

## Why immutability matters

Immutability helps avoid accidental shared-state bugs in:

- Reactive UI state
- SSR and hydration
- Test fixtures
- Calendar range generation
- Shared utility functions used by multiple consumers
