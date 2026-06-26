---
title: Timestamp API
desc: Searchable reference for @timestamp-js/core helpers
---

Use this page when you need the full method reference for `@timestamp-js/core`.
The topic pages explain common workflows; this API page keeps the complete helper list searchable.

The displayed JSON is generated from `packages/lib/src/index.ts` with Q-Press. Use
`pnpm --filter @timestamp-js/docs api:review` to create a `.generated.json` review file, then
`pnpm --filter @timestamp-js/docs api:generate` to replace the displayed `Timestamp.json` once the
source JSDoc is ready. Generated review files are for comparison only and should be removed before
committing unless you intentionally want to keep the diff artifact.

Adapter packages have separate generated API pages so each published package has its own reference:
[Islamic Calendar API](/api/islamic-calendar-api) and [Saka Calendar API](/api/saka-calendar-api).

<script import>
import TimestampApi from '@/api/Timestamp.json'
</script>

<MarkdownApi :api="TimestampApi" name="Timestamp"/>
