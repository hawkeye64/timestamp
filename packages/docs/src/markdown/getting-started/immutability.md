---
title: Immutability
desc: Work with Timestamp objects without mutation
---

Timestamp objects are immutable. Parsers and update helpers return frozen objects, and functions that change fields return a new Timestamp instead of mutating the original.

```ts
import { addToDate, parseTimestamp } from "@timestamp-js/core";

const start = parseTimestamp("2026-06-08 09:30")!;
const next = addToDate(start, { day: 1 });

console.log(start.date); // 2026-06-08
console.log(next.date); // 2026-06-09
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
