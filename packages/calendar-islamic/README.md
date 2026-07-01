# @timestamp-js/calendar-islamic

[![npm version](https://img.shields.io/npm/v/@timestamp-js/calendar-islamic?label=%40timestamp-js%2Fcalendar-islamic)](https://www.npmjs.com/package/@timestamp-js/calendar-islamic)
[![npm downloads](https://img.shields.io/npm/dt/@timestamp-js/calendar-islamic)](https://www.npmjs.com/package/@timestamp-js/calendar-islamic)
[![npm monthly downloads](https://img.shields.io/npm/dm/@timestamp-js/calendar-islamic)](https://www.npmjs.com/package/@timestamp-js/calendar-islamic)
[![license](https://img.shields.io/npm/l/@timestamp-js/calendar-islamic)](https://www.npmjs.com/package/@timestamp-js/calendar-islamic)

<span class="badge-github-sponsors"><a href="https://github.com/sponsors/hawkeye64" title="Sponsor this project on GitHub"><img src="https://img.shields.io/badge/github-sponsors-ea4aaa.svg?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors button" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

Islamic/Hijri calendar adapters for `@timestamp-js/core`.

The initial adapter is `islamicCivilCalendar`, a deterministic tabular Islamic civil/Hijri calendar.
It does not model observational Hijri calendars or Umm al-Qura adjustments.

```ts
import {
  createCalendarDayList,
  getCalendarEndOfMonth,
  getCalendarEndOfWeek,
  getCalendarStartOfMonth,
  getCalendarStartOfWeek,
  gregorianCalendar,
  parseCalendarTimestamp,
} from '@timestamp-js/core'
import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'

const ramadan = { year: 1445, month: 9, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(islamicCivilCalendar.toEpochDay(ramadan))

gregorian // { year: 2024, month: 3, day: 11 }

const visible = parseCalendarTimestamp('1445-09-15', islamicCivilCalendar)!
const weekdays = [0, 1, 2, 3, 4, 5, 6]

const weekStart = getCalendarStartOfWeek(visible, weekdays, islamicCivilCalendar)
const weekEnd = getCalendarEndOfWeek(visible, weekdays, islamicCivilCalendar)
const weekDays = createCalendarDayList(weekStart, weekEnd, visible, islamicCivilCalendar)

weekStart.date // '1445-09-14'
weekEnd.date // '1445-09-20'
weekDays.length // 7

const monthStart = getCalendarStartOfMonth(visible, islamicCivilCalendar)
const monthEnd = getCalendarEndOfMonth(visible, islamicCivilCalendar)
const monthDays = createCalendarDayList(monthStart, monthEnd, visible, islamicCivilCalendar)

monthStart.date // '1445-09-01'
monthEnd.date // '1445-09-30'
monthDays.length // 30
```

## Browser Globals

For CDN or CodePen usage, load `@timestamp-js/core` before the adapter package:

```html
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/core@latest/dist/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-islamic@latest/dist/index.global.min.js"></script>
<script>
  const visible = TimestampJsCore.parseCalendarTimestamp(
    '1445-09-15',
    TimestampJsCalendarIslamic.islamicCivilCalendar,
  )

  console.log(visible?.calendarId)
</script>
```

This package is early calendar-adapter work. Treat the adapter contract as release-candidate API
until `@timestamp-js/core` reaches a stable `1.0.0`.
