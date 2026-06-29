import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, realpath, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { runInNewContext } from 'node:vm'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const tempDir = await mkdtemp(join(tmpdir(), 'timestamp-package-smoke-'))

try {
  const scopeDir = join(tempDir, 'node_modules', '@timestamp-js')
  await mkdir(scopeDir, { recursive: true })
  await symlink(await realpath(join(rootDir, 'packages/lib')), join(scopeDir, 'core'), 'dir')
  await symlink(
    await realpath(join(rootDir, 'packages/calendar-islamic')),
    join(scopeDir, 'calendar-islamic'),
    'dir',
  )
  await symlink(
    await realpath(join(rootDir, 'packages/calendar-saka')),
    join(scopeDir, 'calendar-saka'),
    'dir',
  )

  const consumerPath = join(tempDir, 'consumer.mjs')
  await writeFile(
    consumerPath,
    `
      import {
        createCalendarDayList,
        getCalendarEndOfMonth,
        getCalendarStartOfMonth,
        parseCalendarTimestamp,
      } from '@timestamp-js/core'
      import { islamicCivilCalendar } from '@timestamp-js/calendar-islamic'
      import { indianNationalCalendar } from '@timestamp-js/calendar-saka'

      export const islamicVisible = parseCalendarTimestamp('1445-09-15', islamicCivilCalendar)
      export const sakaVisible = parseCalendarTimestamp('1946-01-15', indianNationalCalendar)

      export const islamicMonth = createCalendarDayList(
        getCalendarStartOfMonth(islamicVisible, islamicCivilCalendar),
        getCalendarEndOfMonth(islamicVisible, islamicCivilCalendar),
        islamicVisible,
        islamicCivilCalendar,
      )
      export const sakaMonth = createCalendarDayList(
        getCalendarStartOfMonth(sakaVisible, indianNationalCalendar),
        getCalendarEndOfMonth(sakaVisible, indianNationalCalendar),
        sakaVisible,
        indianNationalCalendar,
      )
    `,
    'utf8',
  )

  const result = await import(pathToFileURL(consumerPath).href)

  assert.notEqual(result.islamicVisible, null)
  assert.notEqual(result.sakaVisible, null)
  assert.equal(result.islamicMonth[0]?.calendarId, 'islamic-civil')
  assert.equal(result.islamicMonth[0]?.date, '1445-09-01')
  assert.equal(result.islamicMonth.at(-1)?.date, '1445-09-30')
  assert.equal(result.sakaMonth[0]?.calendarId, 'saka')
  assert.equal(result.sakaMonth[0]?.date, '1946-01-01')
  assert.equal(result.sakaMonth.at(-1)?.date, '1946-01-31')

  const sandbox = {}
  runInNewContext(
    await readFile(join(rootDir, 'packages/lib/dist/index.global.js'), 'utf8'),
    sandbox,
  )
  runInNewContext(
    await readFile(join(rootDir, 'packages/calendar-islamic/dist/index.global.js'), 'utf8'),
    sandbox,
  )
  runInNewContext(
    await readFile(join(rootDir, 'packages/calendar-saka/dist/index.global.js'), 'utf8'),
    sandbox,
  )

  assert.equal(typeof sandbox.TimestampJsCore?.parseCalendarTimestamp, 'function')
  assert.equal(sandbox.TimestampJsCalendarIslamic?.islamicCivilCalendar?.id, 'islamic-civil')
  assert.equal(sandbox.TimestampJsCalendarSaka?.indianNationalCalendar?.id, 'saka')

  const globalIslamicVisible = sandbox.TimestampJsCore.parseCalendarTimestamp(
    '1445-09-15',
    sandbox.TimestampJsCalendarIslamic.islamicCivilCalendar,
  )
  const globalSakaVisible = sandbox.TimestampJsCore.parseCalendarTimestamp(
    '1946-01-15',
    sandbox.TimestampJsCalendarSaka.indianNationalCalendar,
  )

  assert.equal(globalIslamicVisible.calendarId, 'islamic-civil')
  assert.equal(globalSakaVisible.calendarId, 'saka')

  console.log('Package import smoke test passed.')
} finally {
  await rm(tempDir, { recursive: true, force: true })
}
