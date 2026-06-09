---
title: FAQ
desc: Frequently asked Timestamp questions
keys: Other
---

::::details Q. Is Timestamp tied to Vue, React, Quasar, or a browser?
**A.** No. Timestamp is framework-agnostic TypeScript and is intended to work in frontend, backend, SSR, and test environments.
::::

::::details Q. Are Timestamp objects mutable?
**A.** No. Public helpers return immutable Timestamp objects. Date math and update helpers return new values instead of changing the input.
::::

::::details Q. Does Timestamp automatically convert timezone suffixes?
**A.** No. Timezone suffixes are accepted and preserved, but wall-clock fields are not converted during parsing.
::::

::::details Q. Should I use `today()`, `todayUTC()`, or `nowUTC()` in SSR?
**A.** Use `today()` when the host runtime's local timezone is correct for the action. Use `todayUTC()` when you need a UTC date string. Use `nowUTC()` when you need an immutable Timestamp built from UTC fields. For hydration-sensitive output, pass a captured `Date` or explicit Timestamp so the server and client render from the same input.
::::

::::details Q. Should I use Timestamp instead of a full date library?
**A.** Use Timestamp when you need small, deterministic date/time primitives. If you need broad timezone conversion, natural-language parsing, or mature locale formatting, pair it with a specialized date library.
::::
