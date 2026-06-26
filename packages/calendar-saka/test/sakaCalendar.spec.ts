import { describe, expect, it } from 'vitest'
import { gregorianCalendar } from '@timestamp-js/core'
import { indianNationalCalendar, isSakaLeapYear, sakaCalendar, sakaDaysInMonth } from '../src'

function toGregorian(date: { year: number; month: number; day: number }) {
  return gregorianCalendar.fromEpochDay(indianNationalCalendar.toEpochDay(date))
}

describe('[TIMESTAMP] indianNationalCalendar', () => {
  it('exports the Saka adapter and alias', () => {
    expect(indianNationalCalendar.id).toBe('saka')
    expect(indianNationalCalendar.intlCalendar).toBe('indian')
    expect(sakaCalendar).toBe(indianNationalCalendar)
  })

  it('uses Gregorian leap years to determine Chaitra length', () => {
    expect(isSakaLeapYear(1946)).toBe(true)
    expect(isSakaLeapYear(1947)).toBe(false)
    expect(sakaDaysInMonth(1946, 1)).toBe(31)
    expect(sakaDaysInMonth(1947, 1)).toBe(30)
    expect(sakaDaysInMonth(1946, 2)).toBe(31)
    expect(sakaDaysInMonth(1946, 7)).toBe(30)
    expect(sakaDaysInMonth(1946, 13)).toBe(0)
  })

  it('converts modern Saka dates into Gregorian dates', () => {
    expect(toGregorian({ year: 1945, month: 12, day: 30 })).toEqual({
      year: 2024,
      month: 3,
      day: 20,
    })
    expect(toGregorian({ year: 1946, month: 1, day: 1 })).toEqual({
      year: 2024,
      month: 3,
      day: 21,
    })
    expect(toGregorian({ year: 1946, month: 1, day: 31 })).toEqual({
      year: 2024,
      month: 4,
      day: 20,
    })
    expect(toGregorian({ year: 1946, month: 2, day: 1 })).toEqual({
      year: 2024,
      month: 4,
      day: 21,
    })
    expect(toGregorian({ year: 1947, month: 1, day: 1 })).toEqual({
      year: 2025,
      month: 3,
      day: 22,
    })
  })

  it('roundtrips Saka dates through epoch day', () => {
    const dates = [
      { year: 1945, month: 12, day: 30 },
      { year: 1946, month: 1, day: 1 },
      { year: 1946, month: 6, day: 31 },
      { year: 1946, month: 12, day: 30 },
      { year: 1947, month: 1, day: 1 },
    ]

    for (const date of dates) {
      expect(indianNationalCalendar.fromEpochDay(indianNationalCalendar.toEpochDay(date))).toEqual(
        date,
      )
    }
  })

  it('moves across Saka year boundaries', () => {
    expect(indianNationalCalendar.nextDay({ year: 1945, month: 12, day: 30 })).toEqual({
      year: 1946,
      month: 1,
      day: 1,
    })
    expect(indianNationalCalendar.prevDay({ year: 1946, month: 1, day: 1 })).toEqual({
      year: 1945,
      month: 12,
      day: 30,
    })
  })
})
