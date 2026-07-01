---
title: Hebrew Calendar API
desc: Searchable reference for @timestamp-js/calendar-hebrew
---

Use this page when you need the full method reference for `@timestamp-js/calendar-hebrew`.
The Hebrew adapter models the deterministic arithmetic Hebrew calendar and uses civil/CLDR month
numbering for native model dates.

The displayed JSON is generated from `packages/calendar-hebrew/src/index.ts` with Q-Press.

## Adapter Export

Import `hebrewCalendar` when you need the full `CalendarSystem` implementation. The `jewishCalendar`
export is an alias for the same adapter.

```ts
import { hebrewCalendar, jewishCalendar } from '@timestamp-js/calendar-hebrew'
```

<script import>
import HebrewCalendarApi from '@/api/HebrewCalendar.json'
</script>

<MarkdownApi :api="HebrewCalendarApi" name="Hebrew Calendar"/>
