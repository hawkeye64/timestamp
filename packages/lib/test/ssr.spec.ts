import { describe, expect, it } from 'vitest'
import { addToDate, getDateTime, parseTimestamp } from '../src'

describe('[TIMESTAMP] SSR compatibility', () => {
  it('runs without browser globals', () => {
    expect(globalThis.window).toBeUndefined()
    expect(globalThis.document).toBeUndefined()

    const start = parseTimestamp('2026-06-08T09:30:15.250Z')!
    const end = addToDate(start, { day: 1, millisecond: 750 })

    expect(getDateTime(end)).toBe('2026-06-09 09:30:16.000')
  })
})
