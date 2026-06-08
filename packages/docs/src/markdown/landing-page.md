---
title: Timestamp
desc: Immutable date and time helpers for JavaScript and TypeScript
---

# Timestamp

Framework-agnostic TypeScript utilities for date-only, time-only, date-time, interval, and range workflows in browsers, Node.js, SSR, and modern JavaScript runtimes.

Timestamp keeps the public surface small and deterministic: immutable plain objects, explicit parser helpers, no UI framework dependency, and no hidden browser-only state.

[Get Started](/getting-started/introduction) | [Install](/getting-started/installation) | [API](/api/timestamp-object)

## Why use it?

- Immutable Timestamp objects make date math safer in reactive, server-rendered, and shared-library code.
- ISO-like parsing accepts date-only strings, date-time strings, seconds, milliseconds, and timezone suffixes.
- Calendar helpers generate days, intervals, workweeks, weekday labels, month labels, and stable numeric identifiers.
- The package is ESM, side-effect free, and designed for browsers, Node.js, serverless, and edge-style runtimes.
