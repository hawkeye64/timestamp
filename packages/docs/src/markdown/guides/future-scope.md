---
title: Future Scope
desc: Planned areas of evaluation
---

Timestamp starts small on purpose. The core should stay deterministic and easy to reason about before broader date/time features are added.

## Under evaluation

- Temporal support
- Explicit timezone and instant conversion helpers
- `todayUTC()` and `nowUTC()`
- Alternate calendar systems beyond Gregorian
- Duration helpers
- Unix timestamp helpers
- Compact formatting masks
- Relative phrase helpers such as "just now" or "6h ago"
- Browser-global builds for environments that do not use ESM bundlers

## Design constraint

New functionality should avoid surprising conversions or hidden runtime state. When behavior can differ between server, client, and local timezones, the API should make that choice explicit.
