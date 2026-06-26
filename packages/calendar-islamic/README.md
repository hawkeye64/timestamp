# @timestamp-js/calendar-islamic

Islamic calendar adapters for `@timestamp-js/core`.

The initial adapter is `islamicCivilCalendar`, a deterministic tabular Islamic civil calendar. It
does not model observational Hijri calendars or Umm al-Qura adjustments.

```ts
import { gregorianCalendar } from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const ramadan = { year: 1445, month: 9, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(islamicCivilCalendar.toEpochDay(ramadan))

gregorian // { year: 2024, month: 3, day: 11 }
```

This package is early calendar-adapter work. Treat the adapter contract as release-candidate API
until `@timestamp-js/core` reaches a stable `1.0.0`.
