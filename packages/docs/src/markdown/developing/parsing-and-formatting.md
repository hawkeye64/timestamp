---
title: Parsing And Formatting
desc: Turn external input into immutable Timestamp values
---

Use these examples when app code receives date strings from forms, APIs, route params, or persisted state.

Timestamp does not need a UI playground like CodePen because the package has no visual component. The useful examples are small, copyable TypeScript flows with known output.

## Parse common inputs

```ts [twoslash]
import { getDate, getDateTime, parseTimestamp } from '@timestamp-js/core'

const dateOnly = parseTimestamp('2026-06-08')!
const dateTime = parseTimestamp('2026-06-08 09:30')!
const iso = parseTimestamp('2026-06-08T09:30:15.250Z')!

getDate(dateOnly) // "2026-06-08"
getDateTime(dateTime) // "2026-06-08 09:30"
getDateTime(iso) // "2026-06-08 09:30:15.250Z"
```

## Preserve timezone suffixes

Timestamp keeps parsed wall-clock fields stable. Timezone suffixes are stored on the object, but parsing does not convert the date or time into the local runtime timezone.

```ts [twoslash]
import { parseTimestamp } from '@timestamp-js/core'

const timestamp = parseTimestamp('2026-06-08T09:30:15-07:00')!

timestamp.hour // 9
timestamp.minute // 30
timestamp.timezone // "-07:00"
```

## Convert native Date values explicitly

Use `parseDate()` when the input is already a JavaScript `Date` and you want host-local fields. Use `parseDateUTC()` when the Date represents an instant and you want UTC fields.

```ts [twoslash]
import { getDateTime, parseDate, parseDateUTC } from '@timestamp-js/core'

const instant = new Date('2026-06-08T09:30:00.000Z')

const localTimestamp = parseDate(instant)!
const utcTimestamp = parseDateUTC(instant)!

getDateTime(localTimestamp) // Depends on the host timezone.
getDateTime(utcTimestamp) // "2026-06-08 09:30"
```

## Parse time-only values

Use `parseTime()` for controls or APIs that only carry time-of-day data.

```ts [twoslash]
import { parseTime } from '@timestamp-js/core'

parseTime('09') // 540

parseTime('09:30:15.250') // 570
```

## Format individual pieces

Use `getDate()`, `getTime()`, and `getDateTime()` when you need stable string output for inputs, route params, storage, or display.

```ts [twoslash]
import { getDate, getDateTime, getTime, parseTimestamp } from '@timestamp-js/core'

const timestamp = parseTimestamp('2036-06-08T09:30:15.250Z')!

getDate(timestamp) // "2036-06-08"
getTime(timestamp) // "09:30:15.250"
getDateTime(timestamp) // "2036-06-08 09:30:15.250"
```

## Refresh formatted fields after custom transforms

Most helpers already return formatted timestamps. Reach for `updateFormatted()` only when you intentionally build or alter a timestamp-like object yourself.

```ts [twoslash]
import { copyTimestamp, parseTimestamp, updateFormatted } from '@timestamp-js/core'

const source = parseTimestamp('2036-06-08 09:30')!
const copied = copyTimestamp(source)

const refreshed = updateFormatted({ ...copied, hour: 14, minute: 45 })

refreshed.time // "14:45"
copied.time // "09:30"
```

## Convert back to native Date values

Use UTC output when the Date represents a portable instant. Use local output when you specifically need host-local `Date` behavior.

```ts [twoslash]
import {
  getDateObject,
  makeDate,
  makeDateTime,
  makeDateTimeUTC,
  makeDateUTC,
  parseTimestamp,
} from '@timestamp-js/core'

const timestamp = parseTimestamp('2036-06-08 09:30')!

makeDate(timestamp).getHours() // 0
makeDateTime(timestamp).getMinutes() // 30

makeDateUTC(timestamp).toISOString() // "2036-06-08T00:00:00.000Z"
makeDateTimeUTC(timestamp).toISOString() // "2036-06-08T09:30:00.000Z"

const localDate = getDateObject(timestamp)
localDate instanceof Date // true
```

## Type your application boundaries

Import types from the same package when your app accepts or returns Timestamp values.

```ts [twoslash]
import { parseTimestamp } from '@timestamp-js/core'
import type { TimeObject, Timestamp } from '@timestamp-js/core'

function asStorageKey(timestamp: Timestamp): string {
  return `${timestamp.date} ${timestamp.time ?? '00:00'}`
}

function toMinutes(time: TimeObject): number {
  return time.hour * 60 + time.minute
}

const timestamp = parseTimestamp('2036-06-08 09:30')!

asStorageKey(timestamp) // "2036-06-08 09:30"
toMinutes({ hour: 9, minute: 30 }) // 570
```
