import { describe, it, expect } from 'vitest'
import {
  createNativeLocaleFormatter,
  createNativeLocaleFormatterUTC,
  makeDateTime,
  makeDateTimeUTC,
  parseTimestamp,
  type Timestamp,
} from '../src'

describe('[TIMESTAMP] createNativeLocaleFormatter', () => {
  it('monthFormatter', async () => {
    function monthFormatter() {
      const longOptions = { timeZone: 'UTC', month: 'long' } as const
      const shortOptions = { timeZone: 'UTC', month: 'short' } as const

      return createNativeLocaleFormatter('en-US', (_tms, short) =>
        short ? shortOptions : longOptions,
      )
    }

    const ts = parseTimestamp('2020-01-01') as Timestamp
    let tests = monthFormatter()(ts, true)
    expect(tests).toBe('Jan')
    tests = monthFormatter()(ts, false)
    expect(tests).toBe('January')
  })

  it('weekdayFormatter', async () => {
    function weekdayFormatter() {
      const longOptions = { timeZone: 'UTC', weekday: 'long' } as const
      const shortOptions = { timeZone: 'UTC', weekday: 'short' } as const

      return createNativeLocaleFormatter('en-US', (_tms, short) =>
        short ? shortOptions : longOptions,
      )
    }

    const ts = parseTimestamp('2020-01-01') as Timestamp
    let tests = weekdayFormatter()(ts, true)
    expect(tests).toBe('Wed')
    tests = weekdayFormatter()(ts, false)
    expect(tests).toBe('Wednesday')
  })

  it('dayFormatter', async () => {
    function dayFormatter() {
      const options = { timeZone: 'UTC', day: 'numeric' } as const

      return createNativeLocaleFormatter('en-US', () => options)
    }

    const ts = parseTimestamp('2020-01-01') as Timestamp
    const tests = dayFormatter()(ts, false)
    expect(tests).toBe('1')
  })

  it('keeps local and UTC formatter construction explicit', async () => {
    const options = { day: 'numeric', hour: 'numeric', minute: 'numeric' } as const
    const formatLocal = createNativeLocaleFormatter('en-US', () => options)
    const formatUTC = createNativeLocaleFormatterUTC('en-US', () => options)
    const ts = parseTimestamp('2020-01-01 00:30') as Timestamp
    const expectedLocal = new Intl.DateTimeFormat('en-US', options).format(makeDateTime(ts))
    const expectedUTC = new Intl.DateTimeFormat('en-US', options).format(makeDateTimeUTC(ts))

    expect(formatLocal(ts, false)).toBe(expectedLocal)
    expect(formatUTC(ts, false)).toBe(expectedUTC)
  })
})
