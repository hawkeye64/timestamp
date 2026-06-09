---
title: Installation
desc: Add Timestamp to a project
---

Install the core package from npm:

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

The package is ESM, side-effect free, and designed for tree-shaking. Prefer named imports so bundlers can keep only the helpers your app actually uses.

```ts
import { parseTimestamp, today, type Timestamp } from "@timestamp-js/core";

const model = today();
const timestamp: Timestamp | null = parseTimestamp(model);
```

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
import type { Timestamp, TimeObject, DisabledDay } from "@timestamp-js/core";
```
