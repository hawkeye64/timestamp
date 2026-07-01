---
title: Installation
desc: Add Timestamp to a project
---

Install the core package from npm:

::: steps

## Install the package

Add `@timestamp-js/core` with your preferred package manager.

```tabs
<<| bash pnpm |>>
pnpm add @timestamp-js/core
<<| bash bun |>>
bun add @timestamp-js/core
<<| bash yarn |>>
yarn add @timestamp-js/core
<<| bash npm |>>
npm install @timestamp-js/core
```

## Import only the helpers you need

The package is ESM, side-effect free, and designed for tree-shaking. Prefer named imports so bundlers can keep only the helpers your app actually uses.

```ts
import { parseTimestamp, today, type Timestamp } from '@timestamp-js/core'

const model = today()
const timestamp: Timestamp | null = parseTimestamp(model)
```

## Confirm the runtime target

Timestamp uses standard JavaScript runtime APIs, so it is suitable for browser, Node.js, SSR, SSG, serverless, and edge-style environments.
:::

## Browser globals

Timestamp ships browser-global IIFE bundles for CDN and CodePen-style usage. Load `@timestamp-js/core` first, then any optional calendar adapters. Use the current package version or a dist tag that matches your release policy.

```html
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/core@latest/dist/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-islamic@latest/dist/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-saka@latest/dist/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@timestamp-js/calendar-hebrew@latest/dist/index.global.min.js"></script>
<script>
  const visible = TimestampJsCore.parseCalendarTimestamp(
    '1445-09-15',
    TimestampJsCalendarIslamic.islamicCivilCalendar,
  )

  console.log(visible?.calendarId)
</script>
```

The globals are `TimestampJsCore`, `TimestampJsCalendarIslamic`, `TimestampJsCalendarSaka`, and
`TimestampJsCalendarHebrew`.

## Runtime support

Timestamp targets modern JavaScript runtimes. It uses standard APIs such as `Date` and `Intl.DateTimeFormat`, and it avoids browser-only globals.

That makes it suitable for:

- Browser applications
- Node.js applications
- Server-rendered applications
- Static-site generation
- Serverless and edge-style runtimes that provide `Date` and `Intl`

## TypeScript

Types are shipped with the package and are available from the main export:

```ts
import type { Timestamp, TimeObject, DisabledDay } from '@timestamp-js/core'
```
