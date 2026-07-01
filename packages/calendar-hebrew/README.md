# @timestamp-js/calendar-hebrew

[![npm version](https://img.shields.io/npm/v/@timestamp-js/calendar-hebrew?label=%40timestamp-js%2Fcalendar-hebrew)](https://www.npmjs.com/package/@timestamp-js/calendar-hebrew)
[![npm downloads](https://img.shields.io/npm/dt/@timestamp-js/calendar-hebrew)](https://www.npmjs.com/package/@timestamp-js/calendar-hebrew)
[![npm monthly downloads](https://img.shields.io/npm/dm/@timestamp-js/calendar-hebrew)](https://www.npmjs.com/package/@timestamp-js/calendar-hebrew)
[![license](https://img.shields.io/npm/l/@timestamp-js/calendar-hebrew)](https://www.npmjs.com/package/@timestamp-js/calendar-hebrew)

<span class="badge-github-sponsors"><a href="https://github.com/sponsors/hawkeye64" title="Sponsor this project on GitHub"><img src="https://img.shields.io/badge/github-sponsors-ea4aaa.svg?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors button" /></a></span>
<span class="badge-paypal"><a href="https://paypal.me/hawkeye64" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

Hebrew calendar adapter for `@timestamp-js/core`.

The adapter is `hebrewCalendar`, with `jewishCalendar` as a convenience alias. It models the
deterministic arithmetic Hebrew calendar and uses civil/CLDR month numbering for model dates:
Tishrei is month `1`, Shevat is month `5`, Adar is month `6` in common years, and leap years insert
Adar II as month `7` before Nisan.

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
import { hebrewCalendar } from '@timestamp-js/calendar-hebrew'

const roshHashanah = { year: 5785, month: 1, day: 1 }
const gregorian = gregorianCalendar.fromEpochDay(hebrewCalendar.toEpochDay(roshHashanah))

gregorian // { year: 2024, month: 10, day: 3 }

const visible = parseCalendarTimestamp('5785-01-15', hebrewCalendar)!
const weekdays = [0, 1, 2, 3, 4, 5, 6]

const weekStart = getCalendarStartOfWeek(visible, weekdays, hebrewCalendar)
const weekEnd = getCalendarEndOfWeek(visible, weekdays, hebrewCalendar)
const weekDays = createCalendarDayList(weekStart, weekEnd, visible, hebrewCalendar)

weekStart.date // '5785-01-11'
weekEnd.date // '5785-01-17'
weekDays.length // 7

const monthStart = getCalendarStartOfMonth(visible, hebrewCalendar)
const monthEnd = getCalendarEndOfMonth(visible, hebrewCalendar)
const monthDays = createCalendarDayList(monthStart, monthEnd, visible, hebrewCalendar)

monthStart.date // '5785-01-01'
monthEnd.date // '5785-01-30'
monthDays.length // 30
```

## Browser Globals

For CDN or CodePen usage, load `@timestamp-js/core` before the adapter package:

```html
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/core@latest/dist/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-hebrew@latest/dist/index.global.min.js"></script>
<script>
  const visible = TimestampJsCore.parseCalendarTimestamp(
    '5785-01-15',
    TimestampJsCalendarHebrew.hebrewCalendar,
  )

  console.log(visible?.calendarId)
</script>
```

This package is early calendar-adapter work. Treat the adapter contract as release-candidate API
until `@timestamp-js/core` reaches a stable `1.0.0`.
