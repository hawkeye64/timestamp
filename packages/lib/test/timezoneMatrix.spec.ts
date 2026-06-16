import { describe, expect, it } from 'vitest'
import * as timestamp from '../src'

const instant = new Date('2036-06-08T09:30:15.250Z')

describe('[TIMESTAMP] timezone matrix', () => {
  it('keeps UTC helpers stable across host timezones', () => {
    const now = timestamp.nowUTC(instant)

    expect(timestamp.todayUTC(instant)).toBe('2036-06-08')
    expect(timestamp.isTodayUTC('2036-06-08', instant)).toBe(true)
    expect(now.date).toBe('2036-06-08')
    expect(now.time).toBe('09:30:15.250')
  })

  it('reads native Date values with explicit local or UTC semantics', () => {
    const local = timestamp.parseDate(instant)
    const utc = timestamp.parseDateUTC(instant)

    expect(local?.year).toBe(instant.getFullYear())
    expect(local?.month).toBe(instant.getMonth() + 1)
    expect(local?.day).toBe(instant.getDate())
    expect(local?.hour).toBe(instant.getHours())
    expect(local?.minute).toBe(instant.getMinutes())

    expect(utc?.date).toBe('2036-06-08')
    expect(utc?.time).toBe('09:30:15.250')
  })

  it('round-trips Unix values with UTC fields', () => {
    const parsed = timestamp.parseTimestamp('2036-06-08T09:30:15.250')!
    const milliseconds = timestamp.toUnixMilliseconds(parsed)
    const seconds = timestamp.toUnixSeconds(parsed)

    expect(milliseconds).toBe(Date.UTC(2036, 5, 8, 9, 30, 15, 250))
    expect(seconds).toBe(Math.floor(milliseconds / 1000))
    expect(timestamp.getDateTime(timestamp.fromUnixMilliseconds(milliseconds)!)).toBe(
      '2036-06-08 09:30:15.250',
    )
    expect(timestamp.getDateTime(timestamp.fromUnixSeconds(seconds)!)).toBe('2036-06-08 09:30:15')
  })

  it('preserves timezone suffixes without host timezone conversion', () => {
    const parsed = timestamp.parseTimestamp('2036-06-08T09:30:15-07:00')!

    expect(parsed.date).toBe('2036-06-08')
    expect(parsed.time).toBe('09:30:15')
    expect(parsed.timezone).toBe('-07:00')
  })
})
