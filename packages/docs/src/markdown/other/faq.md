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
**A.** Not currently. Timezone suffixes are accepted and preserved, but wall-clock fields are not converted. Explicit instant/timezone conversion helpers are tracked as future work.
::::

::::details Q. Should I use Timestamp instead of a full date library?
**A.** Use Timestamp when you need small, deterministic date/time primitives. If you need broad timezone conversion, natural-language parsing, or mature locale formatting today, pair it with a specialized date library until those helpers are added.
::::
