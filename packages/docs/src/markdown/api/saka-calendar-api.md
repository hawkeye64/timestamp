---
title: Saka Calendar API
desc: Searchable reference for @timestamp-js/calendar-saka
---

Use this page when you need the full method reference for `@timestamp-js/calendar-saka`.
The Saka adapter models the official Indian National Calendar using deterministic
Gregorian-aligned leap-year rules.

The displayed JSON is generated from `packages/calendar-saka/src/index.ts` with Q-Press.

## Adapter Export

Import `indianNationalCalendar` when you need the full `CalendarSystem` implementation. The
`sakaCalendar` export is an alias for the same adapter.

```ts
import { indianNationalCalendar, sakaCalendar } from '@timestamp-js/calendar-saka'
```

<script import>
import SakaCalendarApi from '@/api/SakaCalendar.json'
</script>

<MarkdownApi :api="SakaCalendarApi" name="Saka Calendar"/>
