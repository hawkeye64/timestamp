---
title: Introduction
desc: What Timestamp is and where it fits
---

Timestamp is a small TypeScript library for working with immutable date and time objects.

It is not tied to a UI framework, backend framework, or application platform. You can use it in browser apps, Node.js services, SSR applications, static-site builds, tests, and framework-specific libraries.

## Design goals

- **Framework agnostic:** works with Vue, React, Svelte, plain TypeScript, Node.js, and other JavaScript runtimes.
- **Immutable by default:** parser and update helpers return frozen Timestamp objects.
- **Calendar-friendly:** date strings, weekday metadata, day-of-year, workweek, interval generation, and range comparison are first-class.
- **Runtime-safe:** no dependency on `window`, `document`, storage APIs, or framework state.
- **Small core:** deterministic primitives without full date-library scope.

## Basic example

```ts
import { addToDate, getDateTime, parseTimestamp } from '@timestamp-js/core'

const start = parseTimestamp('2026-06-08T09:30:15.250Z')
const end = start ? addToDate(start, { day: 2, minute: 45 }) : null

console.log(end ? getDateTime(end) : 'Invalid date')
```

## What Timestamp is not

Timestamp is not trying to replace every date library. It does not currently provide full timezone
conversion, duration phrase formatting, or relative phrase formatting. Non-Gregorian calendar
support is available through optional adapter packages and is still being proven against QCalendar.
