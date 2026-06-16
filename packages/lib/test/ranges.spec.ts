import { describe, expect, it } from 'vitest'
import * as timestamp from '../src'

describe('[TIMESTAMP] range helpers', () => {
  it('creates normalized inclusive ranges', () => {
    const start = timestamp.parseTimestamp('2036-06-10')!
    const end = timestamp.parseTimestamp('2036-06-01')!
    const range = timestamp.createTimestampRange(start, end)

    expect(range.start.date).toBe('2036-06-01')
    expect(range.end.date).toBe('2036-06-10')
    expect(Object.isFrozen(range)).toBe(true)
    expect(Object.isFrozen(range.start)).toBe(true)
    expect(Object.isFrozen(range.end)).toBe(true)
  })

  it('checks containment and overlap', () => {
    const source = timestamp.createTimestampRange(
      timestamp.parseTimestamp('2036-06-01')!,
      timestamp.parseTimestamp('2036-06-30')!,
    )
    const target = timestamp.parseTimestamp('2036-06-08')!
    const overlapping = timestamp.createTimestampRange(
      timestamp.parseTimestamp('2036-06-15')!,
      timestamp.parseTimestamp('2036-07-02')!,
    )

    expect(timestamp.isTimestampInRange(target, source)).toBe(true)
    expect(timestamp.isRangeOverlapping(source, overlapping)).toBe(true)
  })

  it('returns the intersection of two ranges', () => {
    const first = timestamp.createTimestampRange(
      timestamp.parseTimestamp('2036-06-01')!,
      timestamp.parseTimestamp('2036-06-20')!,
    )
    const second = timestamp.createTimestampRange(
      timestamp.parseTimestamp('2036-06-10')!,
      timestamp.parseTimestamp('2036-06-30')!,
    )

    const overlap = timestamp.intersectRanges(first, second)

    expect(overlap?.start.date).toBe('2036-06-10')
    expect(overlap?.end.date).toBe('2036-06-20')
  })

  it('merges overlapping and touching date ranges', () => {
    const ranges = timestamp.mergeRanges([
      timestamp.createTimestampRange(
        timestamp.parseTimestamp('2036-06-10')!,
        timestamp.parseTimestamp('2036-06-12')!,
      ),
      timestamp.createTimestampRange(
        timestamp.parseTimestamp('2036-06-01')!,
        timestamp.parseTimestamp('2036-06-04')!,
      ),
      timestamp.createTimestampRange(
        timestamp.parseTimestamp('2036-06-05')!,
        timestamp.parseTimestamp('2036-06-07')!,
      ),
    ])

    expect(ranges).toHaveLength(2)
    expect(ranges[0]?.start.date).toBe('2036-06-01')
    expect(ranges[0]?.end.date).toBe('2036-06-07')
    expect(ranges[1]?.start.date).toBe('2036-06-10')
    expect(ranges[1]?.end.date).toBe('2036-06-12')
  })

  it('subtracts blocked ranges from a date range', () => {
    const source = timestamp.createTimestampRange(
      timestamp.parseTimestamp('2036-06-10')!,
      timestamp.parseTimestamp('2036-06-18')!,
    )
    const blocked = [
      timestamp.createTimestampRange(
        timestamp.parseTimestamp('2036-06-12')!,
        timestamp.parseTimestamp('2036-06-14')!,
      ),
    ]

    const available = timestamp.subtractRanges(source, blocked)

    expect(available).toHaveLength(2)
    expect(available[0]?.start.date).toBe('2036-06-10')
    expect(available[0]?.end.date).toBe('2036-06-11')
    expect(available[1]?.start.date).toBe('2036-06-15')
    expect(available[1]?.end.date).toBe('2036-06-18')
  })

  it('finds time-aware gaps using millisecond boundaries', () => {
    const source = timestamp.createTimestampRange(
      timestamp.parseTimestamp('2036-06-08T09:00')!,
      timestamp.parseTimestamp('2036-06-08T10:00')!,
      true,
    )
    const occupied = [
      timestamp.createTimestampRange(
        timestamp.parseTimestamp('2036-06-08T09:15')!,
        timestamp.parseTimestamp('2036-06-08T09:29:59.999')!,
        true,
      ),
    ]

    const gaps = timestamp.findRangeGaps(source, occupied, true)

    expect(gaps).toHaveLength(2)
    expect(gaps[0]?.start.time).toBe('09:00')
    expect(gaps[0]?.end.time).toBe('09:14:59.999')
    expect(gaps[1]?.start.time).toBe('09:30')
    expect(gaps[1]?.end.time).toBe('10:00')
  })
})
