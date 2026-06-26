import { describe, expect, it } from 'vitest'
import { getEpochDay, gregorianCalendar, nextDay, parsed, prevDay, type Timestamp } from '../src'

describe('[TIMESTAMP] calendar systems', () => {
  it('exposes the Gregorian calendar adapter as the default calendar contract', () => {
    expect(gregorianCalendar.id).toBe('gregorian')
    expect(gregorianCalendar.intlCalendar).toBe('gregory')
    expect(gregorianCalendar.monthsInYear(2026)).toBe(12)
    expect(gregorianCalendar.isLeapYear(2024)).toBe(true)
    expect(gregorianCalendar.daysInMonth(2024, 2)).toBe(29)
    expect(gregorianCalendar.daysInMonth(2025, 2)).toBe(28)
  })

  it('maps Gregorian dates to stable epoch-day values', () => {
    const epoch = parsed('1970-01-01') as Timestamp
    const next = parsed('1970-01-02') as Timestamp
    const previous = parsed('1969-12-31') as Timestamp

    expect(getEpochDay(epoch)).toBe(0)
    expect(getEpochDay(next)).toBe(1)
    expect(getEpochDay(previous)).toBe(-1)
  })

  it('keeps existing nextDay and prevDay behavior on top of the Gregorian adapter', () => {
    const endOfYear = parsed('2026-12-31') as Timestamp
    const startOfYear = parsed('2027-01-01') as Timestamp

    expect(nextDay(endOfYear).date).toBe('2027-01-01')
    expect(prevDay(startOfYear).date).toBe('2026-12-31')
  })

  it('converts epoch days back into Gregorian date parts', () => {
    const leapDay = parsed('2024-02-29') as Timestamp

    expect(gregorianCalendar.fromEpochDay(getEpochDay(leapDay))).toEqual({
      year: 2024,
      month: 2,
      day: 29,
    })
  })
})
