import { describe, expect, it } from 'vitest'
import * as timestamp from '../src'

describe('[TIMESTAMP] duration helpers', () => {
  it('creates duration objects from signed milliseconds', () => {
    const duration = timestamp.createDuration(
      timestamp.MILLISECONDS_IN_DAY +
        2 * timestamp.MILLISECONDS_IN_HOUR +
        3 * timestamp.MILLISECONDS_IN_MINUTE +
        4 * timestamp.MILLISECONDS_IN_SECOND +
        5,
    )

    expect(duration.sign).toBe(1)
    expect(duration.days).toBe(1)
    expect(duration.hours).toBe(2)
    expect(duration.minutes).toBe(3)
    expect(duration.seconds).toBe(4)
    expect(duration.milliseconds).toBe(5)
    expect(Object.isFrozen(duration)).toBe(true)
  })

  it('measures elapsed duration between timestamps', () => {
    const start = timestamp.parseTimestamp('2036-06-08T09:00')!
    const end = timestamp.parseTimestamp('2036-06-08T10:30:15.250')!
    const duration = timestamp.durationBetween(start, end)

    expect(duration.totalMilliseconds).toBe(5_415_250)
    expect(duration.hours).toBe(1)
    expect(duration.minutes).toBe(30)
    expect(duration.seconds).toBe(15)
    expect(duration.milliseconds).toBe(250)
  })

  it('adds and subtracts elapsed durations', () => {
    const start = timestamp.parseTimestamp('2036-06-08T09:00')!
    const duration = timestamp.createDuration(90 * timestamp.MILLISECONDS_IN_MINUTE)

    expect(timestamp.addDuration(start, duration).time).toBe('10:30')
    expect(timestamp.subtractDuration(start, duration).time).toBe('07:30')
  })

  it('formats durations with optional milliseconds and sign', () => {
    const duration = timestamp.createDuration(
      -(26 * timestamp.MILLISECONDS_IN_HOUR + 15 * timestamp.MILLISECONDS_IN_MINUTE + 10),
    )

    expect(timestamp.formatDuration(duration)).toBe('26:15:00')
    expect(timestamp.formatDuration(duration, { signed: true, milliseconds: true })).toBe(
      '-26:15:00.010',
    )
  })
})
