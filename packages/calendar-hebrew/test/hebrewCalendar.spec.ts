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
  validateCalendarTimestamp,
} from '@timestamp-js/core'
import {
  hebrewCalendar,
  hebrewDaysInMonth,
  hebrewMonthsInYear,
  isHebrewLeapYear,
  jewishCalendar,
} from '../src'

function toGregorian(date: { year: number; month: number; day: number }) {
  return gregorianCalendar.fromEpochDay(hebrewCalendar.toEpochDay(date))
}

describe('[TIMESTAMP] hebrewCalendar', () => {
  it('exports the Hebrew adapter and alias', () => {
    expect(hebrewCalendar.id).toBe('hebrew')
    expect(hebrewCalendar.intlCalendar).toBe('hebrew')
    expect(jewishCalendar).toBe(hebrewCalendar)
  })

  it('uses the 19-year Hebrew leap-year cycle', () => {
    expect(isHebrewLeapYear(5784)).toBe(true)
    expect(isHebrewLeapYear(5785)).toBe(false)
    expect(hebrewMonthsInYear(5784)).toBe(13)
    expect(hebrewMonthsInYear(5785)).toBe(12)
  })

  it('uses civil CLDR month numbering', () => {
    expect(hebrewDaysInMonth(5784, 1)).toBe(30) // Tishrei
    expect(hebrewDaysInMonth(5784, 5)).toBe(30) // Shevat
    expect(hebrewDaysInMonth(5784, 6)).toBe(30) // Adar I
    expect(hebrewDaysInMonth(5784, 7)).toBe(29) // Adar II
    expect(hebrewDaysInMonth(5784, 8)).toBe(30) // Nisan
    expect(hebrewDaysInMonth(5784, 13)).toBe(29) // Elul
    expect(hebrewDaysInMonth(5785, 6)).toBe(29) // Adar
    expect(hebrewDaysInMonth(5785, 13)).toBe(0)
  })

  it('converts modern Hebrew dates into Gregorian dates', () => {
    expect(toGregorian({ year: 5784, month: 1, day: 1 })).toEqual({
      year: 2023,
      month: 9,
      day: 16,
    })
    expect(toGregorian({ year: 5784, month: 8, day: 15 })).toEqual({
      year: 2024,
      month: 4,
      day: 23,
    })
    expect(toGregorian({ year: 5785, month: 1, day: 1 })).toEqual({
      year: 2024,
      month: 10,
      day: 3,
    })
    expect(toGregorian({ year: 5785, month: 6, day: 14 })).toEqual({
      year: 2025,
      month: 3,
      day: 14,
    })
  })

  it('roundtrips Hebrew dates through epoch day', () => {
    const dates = [
      { year: 5784, month: 1, day: 1 },
      { year: 5784, month: 6, day: 30 },
      { year: 5784, month: 7, day: 29 },
      { year: 5784, month: 8, day: 15 },
      { year: 5784, month: 13, day: 29 },
      { year: 5785, month: 1, day: 1 },
      { year: 5789, month: 12, day: 29 },
      { year: 5790, month: 1, day: 1 },
    ]

    for (const date of dates) {
      expect(hebrewCalendar.fromEpochDay(hebrewCalendar.toEpochDay(date))).toEqual(date)
    }
  })

  it('keeps Hebrew year lengths consistent with month lengths', () => {
    for (let year = 5780; year <= 5800; year += 1) {
      let monthTotal = 0

      for (let month = 1; month <= hebrewCalendar.monthsInYear(year); month += 1) {
        monthTotal += hebrewCalendar.daysInMonth(year, month)
      }

      expect(
        hebrewCalendar.toEpochDay({ year: year + 1, month: 1, day: 1 }) -
          hebrewCalendar.toEpochDay({ year, month: 1, day: 1 }),
      ).toBe(monthTotal)
    }
  })

  it('moves across every Hebrew month boundary without creating invalid dates', () => {
    for (let year = 5780; year <= 5800; year += 1) {
      const months = hebrewCalendar.monthsInYear(year)

      for (let month = 1; month <= months; month += 1) {
        const date = { year, month, day: hebrewCalendar.daysInMonth(year, month) }
        const next = hebrewCalendar.nextDay(date)

        expect(next).toEqual({
          year: month === months ? year + 1 : year,
          month: month === months ? 1 : month + 1,
          day: 1,
        })
      }
    }
  })

  it('moves across Hebrew year boundaries', () => {
    expect(hebrewCalendar.nextDay({ year: 5784, month: 13, day: 29 })).toEqual({
      year: 5785,
      month: 1,
      day: 1,
    })
    expect(hebrewCalendar.prevDay({ year: 5785, month: 1, day: 1 })).toEqual({
      year: 5784,
      month: 13,
      day: 29,
    })
  })

  it('creates calendar timestamps for QCalendar-style day data', () => {
    const roshHashanah = parseCalendarTimestamp('5785-01-01', hebrewCalendar)

    expect(roshHashanah).toMatchObject({
      calendarId: 'hebrew',
      date: '5785-01-01',
      year: 5785,
      month: 1,
      day: 1,
      weekday: 4,
      doy: 1,
    })

    expect(getCalendarStartOfMonth(roshHashanah!, hebrewCalendar).date).toBe('5785-01-01')
    expect(getCalendarEndOfMonth(roshHashanah!, hebrewCalendar).date).toBe('5785-01-30')
    expect(addCalendarMonths(roshHashanah!, 1, hebrewCalendar).date).toBe('5785-02-01')
    expect(makeCalendarDateUTC(roshHashanah!, hebrewCalendar).toISOString()).toBe(
      '2024-10-03T00:00:00.000Z',
    )
    expect(validateCalendarTimestamp('5785-06-29', hebrewCalendar)).toBe(true)
    expect(validateCalendarTimestamp('5785-06-30', hebrewCalendar)).toBe(false)
  })

  it('exposes labels and identity data for adapter-native component APIs', () => {
    const passover = parseCalendarTimestamp('5784-08-15', hebrewCalendar)!
    const identity = getCalendarDateIdentity(passover, hebrewCalendar)
    const monthFormatter = getCalendarMonthFormatter(hebrewCalendar)

    expect(identity).toMatchObject({
      calendarId: 'hebrew',
      nativeDate: '5784-08-15',
      native: { year: 5784, month: 8, day: 15 },
      gregorianDate: '2024-04-23',
    })
    expect(monthFormatter(1, 'long', 'en-US', 5784)).toBe('Tishri')
    expect(monthFormatter(8, 'long', 'en-US', 5784)).toBe('Nisan')
    expect(getCalendarMonthNames(hebrewCalendar, 'long', 'en-US', 5784)[4]).toBe('Shevat')
  })

  it('builds Hebrew day lists across month boundaries', () => {
    const start = parseCalendarTimestamp('5784-07-28', hebrewCalendar)!
    const end = parseCalendarTimestamp('5784-08-02', hebrewCalendar)!
    const now = parseCalendarTimestamp('5784-08-01', hebrewCalendar)!
    const days = createCalendarDayList(start, end, now, hebrewCalendar)

    expect(days.map((day) => day.date)).toEqual([
      '5784-07-28',
      '5784-07-29',
      '5784-08-01',
      '5784-08-02',
    ])
    expect(days[2]?.current).toBe(true)
  })
})
