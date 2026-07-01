# @timestamp-js/calendar-saka

[![npm version](https://img.shields.io/npm/v/@timestamp-js/calendar-saka?label=%40timestamp-js%2Fcalendar-saka)](https://www.npmjs.com/package/@timestamp-js/calendar-saka)
[![npm downloads](https://img.shields.io/npm/dt/@timestamp-js/calendar-saka)](https://www.npmjs.com/package/@timestamp-js/calendar-saka)
[![npm monthly downloads](https://img.shields.io/npm/dm/@timestamp-js/calendar-saka)](https://www.npmjs.com/package/@timestamp-js/calendar-saka)
[![license](https://img.shields.io/npm/l/@timestamp-js/calendar-saka)](https://www.npmjs.com/package/@timestamp-js/calendar-saka)

<span class="badge-github-sponsors"><a href="https://github.com/sponsors/hawkeye64" title="Sponsor this project on GitHub"><img src="https://img.shields.io/badge/github-sponsors-ea4aaa.svg?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors button" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

Indian National Calendar (Saka) adapter for `@timestamp-js/core`.

The adapter is `indianNationalCalendar`, with `sakaCalendar` as a convenience alias. It models the
official Indian National Calendar using deterministic Gregorian-aligned leap-year rules.

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
import { indianNationalCalendar } from '@timestamp-js/calendar-saka'

const sakaNewYear = { year: 1946, month: 1, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(indianNationalCalendar.toEpochDay(sakaNewYear))

gregorian // { year: 2024, month: 3, day: 21 }

const visible = parseCalendarTimestamp('1946-01-15', indianNationalCalendar)!
const weekdays = [0, 1, 2, 3, 4, 5, 6]

const weekStart = getCalendarStartOfWeek(visible, weekdays, indianNationalCalendar)
const weekEnd = getCalendarEndOfWeek(visible, weekdays, indianNationalCalendar)
const weekDays = createCalendarDayList(weekStart, weekEnd, visible, indianNationalCalendar)

weekStart.date // '1946-01-11'
weekEnd.date // '1946-01-17'
weekDays.length // 7

const monthStart = getCalendarStartOfMonth(visible, indianNationalCalendar)
const monthEnd = getCalendarEndOfMonth(visible, indianNationalCalendar)
const monthDays = createCalendarDayList(monthStart, monthEnd, visible, indianNationalCalendar)

monthStart.date // '1946-01-01'
monthEnd.date // '1946-01-31'
monthDays.length // 31
```

## Browser Globals

For CDN or CodePen usage, load `@timestamp-js/core` before the adapter package:

```html
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/core@latest/dist/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-saka@latest/dist/index.global.min.js"></script>
<script>
  const visible = TimestampJsCore.parseCalendarTimestamp(
    '1946-01-15',
    TimestampJsCalendarSaka.indianNationalCalendar,
  )

  console.log(visible?.calendarId)
</script>
```

This package is early calendar-adapter work. Treat the adapter contract as release-candidate API
until `@timestamp-js/core` reaches a stable `1.0.0`.
