import { describe, expect, it } from 'vitest'
import {
  createCalendarDayList,
  createCalendarMonthView,
  getCalendarDateIdentity,
  getCalendarSelectionState,
  getCalendarEndOfMonth,
  getCalendarMonthFormatter,
  getCalendarMonthNames,
  getCalendarStartOfMonth,
  gregorianCalendar,
  makeCalendarDateUTC,
  parseCalendarTimestamp,
  updateCalendarDisabled,
  validateCalendarTimestamp,
} from '@timestamp-js/core'
import { islamicCalendar, islamicCivilCalendar } from '../src'

function toGregorian(date: { year: number; month: number; day: number }) {
  return gregorianCalendar.fromEpochDay(islamicCivilCalendar.toEpochDay(date))
}

describe('[TIMESTAMP] islamicCivilCalendar', () => {
  it('exports the civil Islamic adapter and alias', () => {
    expect(islamicCivilCalendar.id).toBe('islamic-civil')
    expect(islamicCivilCalendar.intlCalendar).toBe('islamic-civil')
    expect(islamicCalendar).toBe(islamicCivilCalendar)
  })

  it('uses the tabular Islamic civil leap-year cycle', () => {
    expect(islamicCivilCalendar.isLeapYear(1445)).toBe(true)
    expect(islamicCivilCalendar.isLeapYear(1446)).toBe(false)
    expect(islamicCivilCalendar.daysInMonth(1445, 12)).toBe(30)
    expect(islamicCivilCalendar.daysInMonth(1446, 12)).toBe(29)
  })

  it('maps the Islamic epoch to the proleptic Gregorian epoch date', () => {
    expect(
      islamicCivilCalendar.fromEpochDay(
        gregorianCalendar.toEpochDay({
          year: 622,
          month: 7,
          day: 19,
        }),
      ),
    ).toEqual({
      year: 1,
      month: 1,
      day: 1,
    })
  })

  it('converts modern civil Hijri dates into Gregorian dates', () => {
    expect(toGregorian({ year: 1445, month: 9, day: 1 })).toEqual({
      year: 2024,
      month: 3,
      day: 11,
    })
    expect(toGregorian({ year: 1445, month: 10, day: 1 })).toEqual({
      year: 2024,
      month: 4,
      day: 10,
    })
    expect(toGregorian({ year: 1446, month: 12, day: 29 })).toEqual({
      year: 2025,
      month: 6,
      day: 26,
    })
  })

  it('moves across Islamic year boundaries', () => {
    expect(islamicCivilCalendar.nextDay({ year: 1446, month: 12, day: 29 })).toEqual({
      year: 1447,
      month: 1,
      day: 1,
    })
    expect(islamicCivilCalendar.prevDay({ year: 1447, month: 1, day: 1 })).toEqual({
      year: 1446,
      month: 12,
      day: 29,
    })
  })

  it('creates calendar timestamps for QCalendar-style day data', () => {
    const ramadan = parseCalendarTimestamp('1445-09-01', islamicCivilCalendar)

    expect(ramadan).toMatchObject({
      calendarId: 'islamic-civil',
      date: '1445-09-01',
      year: 1445,
      month: 9,
      day: 1,
      weekday: 1,
      doy: 237,
    })

    expect(getCalendarStartOfMonth(ramadan!, islamicCivilCalendar).date).toBe('1445-09-01')
    expect(getCalendarEndOfMonth(ramadan!, islamicCivilCalendar).date).toBe('1445-09-30')
    expect(makeCalendarDateUTC(ramadan!, islamicCivilCalendar).toISOString()).toBe(
      '2024-03-11T00:00:00.000Z',
    )
    expect(validateCalendarTimestamp('1445-09-30', islamicCivilCalendar)).toBe(true)
    expect(validateCalendarTimestamp('1445-09-31', islamicCivilCalendar)).toBe(false)
  })

  it('exposes labels and identity data for adapter-native component APIs', () => {
    const ramadan = parseCalendarTimestamp('1445-09-01', islamicCivilCalendar)!
    const identity = getCalendarDateIdentity(ramadan, islamicCivilCalendar)
    const monthFormatter = getCalendarMonthFormatter(islamicCivilCalendar)

    expect(identity).toMatchObject({
      calendarId: 'islamic-civil',
      nativeDate: '1445-09-01',
      native: { year: 1445, month: 9, day: 1 },
      gregorianDate: '2024-03-11',
    })
    expect(monthFormatter(9, 'long', 'en-US', 1445)).toBe('Ramadan')
    expect(getCalendarMonthNames(islamicCivilCalendar, 'long', 'en-US', 1445)[8]).toBe('Ramadan')
  })

  it('builds Islamic civil day lists with relative state', () => {
    const start = parseCalendarTimestamp('1445-09-01', islamicCivilCalendar)!
    const end = parseCalendarTimestamp('1445-09-05', islamicCivilCalendar)!
    const now = parseCalendarTimestamp('1445-09-03', islamicCivilCalendar)!
    const days = createCalendarDayList(start, end, now, islamicCivilCalendar)

    expect(days.map((day) => day.date)).toEqual([
      '1445-09-01',
      '1445-09-02',
      '1445-09-03',
      '1445-09-04',
      '1445-09-05',
    ])
    expect(days[2]?.current).toBe(true)
    expect(days[0]?.past).toBe(true)
    expect(days[4]?.future).toBe(true)
  })

  it('treats disabled and selected strings as native adapter dates', () => {
    const day = parseCalendarTimestamp('1445-10-01', islamicCivilCalendar)!
    const disabled = updateCalendarDisabled(
      day,
      undefined,
      undefined,
      [],
      [{ date: '1445-10-01', label: 'Follow-up' }],
      islamicCivilCalendar,
    )
    const selection = getCalendarSelectionState(
      day,
      {
        selectedDates: ['1445-10-01'],
        selectedStartEndDates: ['1445-09-29', '1445-10-03'],
      },
      islamicCivilCalendar,
    )

    expect(disabled.disabled).toBe(true)
    expect(disabled.disabledLabel).toBe('Follow-up')
    expect(selection).toMatchObject({
      selectedDate: true,
      range: true,
      selected: true,
    })
  })

  it('creates Islamic civil month views with native outside state', () => {
    const reference = parseCalendarTimestamp('1445-09-15', islamicCivilCalendar)!
    const now = parseCalendarTimestamp('1445-09-29', islamicCivilCalendar)!
    const view = createCalendarMonthView(reference, now, islamicCivilCalendar, {
      weekdays: [6, 0, 1, 2, 3, 4, 5],
      selectedDates: ['1445-09-29'],
      disabledDays: ['1445-10-01'],
    })
    const selected = view.days.find((day) => day.timestamp.date === '1445-09-29')
    const outside = view.days.find((day) => day.timestamp.date === '1445-10-01')

    expect(view.start.date).toBe('1445-09-01')
    expect(view.end.date).toBe('1445-09-30')
    expect(view.days).toHaveLength(42)
    expect(selected?.selected).toBe(true)
    expect(selected?.identity.gregorianDate).toBe('2024-04-08')
    expect(outside?.outside).toBe(true)
    expect(outside?.disabled).toBe(true)
  })
})
