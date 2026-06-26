import { describe, expect, it } from 'vitest'
import { gregorianCalendar } from '@timestamp-js/core'
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
})
