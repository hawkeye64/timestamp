import { describe, expect, it } from 'vitest'
import {
  addCalendarMonths,
  createCalendarDayList,
  getCalendarDateIdentity,
  getCalendarEndOfMonth,
  getCalendarMonthFormatter,
  getCalendarMonthNames,
  getCalendarStartOfMonth,
  gregorianCalendar,
  makeCalendarDateUTC,
  parseCalendarTimestamp,
} from '@timestamp-js/core'
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

  it('creates calendar timestamps for QCalendar-style day data', () => {
    const newYear = parseCalendarTimestamp('1946-01-01', indianNationalCalendar)

    expect(newYear).toMatchObject({
      calendarId: 'saka',
      date: '1946-01-01',
      year: 1946,
      month: 1,
      day: 1,
      weekday: 4,
      doy: 1,
    })

    expect(getCalendarStartOfMonth(newYear!, indianNationalCalendar).date).toBe('1946-01-01')
    expect(getCalendarEndOfMonth(newYear!, indianNationalCalendar).date).toBe('1946-01-31')
    expect(addCalendarMonths(newYear!, 1, indianNationalCalendar).date).toBe('1946-02-01')
    expect(makeCalendarDateUTC(newYear!, indianNationalCalendar).toISOString()).toBe(
      '2024-03-21T00:00:00.000Z',
    )
  })

  it('exposes labels and identity data for adapter-native component APIs', () => {
    const newYear = parseCalendarTimestamp('1946-01-01', indianNationalCalendar)!
    const identity = getCalendarDateIdentity(newYear, indianNationalCalendar)
    const monthFormatter = getCalendarMonthFormatter(indianNationalCalendar)

    expect(identity).toMatchObject({
      calendarId: 'saka',
      nativeDate: '1946-01-01',
      native: { year: 1946, month: 1, day: 1 },
      gregorianDate: '2024-03-21',
    })
    expect(monthFormatter(1, 'long', 'en-US', 1946)).toBe('Chaitra')
    expect(getCalendarMonthNames(indianNationalCalendar, 'long', 'en-US', 1946)[0]).toBe('Chaitra')
  })

  it('builds Saka day lists across year boundaries', () => {
    const start = parseCalendarTimestamp('1945-12-29', indianNationalCalendar)!
    const end = parseCalendarTimestamp('1946-01-03', indianNationalCalendar)!
    const now = parseCalendarTimestamp('1946-01-01', indianNationalCalendar)!
    const days = createCalendarDayList(start, end, now, indianNationalCalendar)

    expect(days.map((day) => day.date)).toEqual([
      '1945-12-29',
      '1945-12-30',
      '1946-01-01',
      '1946-01-02',
      '1946-01-03',
    ])
    expect(days[2]?.current).toBe(true)
  })
})
