---
title: Upgrade Guide
desc: Upgrade notes for Timestamp releases
keys: Other
---

Timestamp is currently in the `0.x` alpha line. Until the first stable release, small API adjustments can happen as QCalendar, QScroller, and third-party integrations validate the public surface.

## Current Guidance

- Prefer importing from `@timestamp-js/core`.
- Treat Timestamp objects as immutable values.
- Use parser and date math helpers instead of mutating fields manually.
- Watch release notes for timezone, UTC, calendar-system, and API-shape changes while the package is still alpha.

## From Embedded Timestamp Utilities

QCalendar and QScroller no longer own the canonical Timestamp documentation. If you previously referenced their embedded Timestamp utilities, migrate to `@timestamp-js/core` and use these docs as the source of truth.
