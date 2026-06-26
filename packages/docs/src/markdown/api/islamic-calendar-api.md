---
title: Islamic/Hijri Calendar API
desc: Searchable reference for @timestamp-js/calendar-islamic
---

Use this page when you need the full method reference for `@timestamp-js/calendar-islamic`.
The Islamic civil/Hijri adapter is deterministic and arithmetic; it does not model observational
Hijri calendars or Umm al-Qura adjustments.

The displayed JSON is generated from `packages/calendar-islamic/src/index.ts` with Q-Press.

## Adapter Export

Import `islamicCivilCalendar` when you need the full `CalendarSystem` implementation. The
`islamicCalendar` export is an alias for the same adapter.

```ts
import { islamicCivilCalendar, islamicCalendar } from '@timestamp-js/calendar-islamic'
```

<script import>
import IslamicCalendarApi from '@/api/IslamicCalendar.json'
</script>

<MarkdownApi :api="IslamicCalendarApi" name="Islamic Calendar"/>
