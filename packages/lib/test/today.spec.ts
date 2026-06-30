import { describe, it, expect } from 'vitest'
import * as timestamp from '../src'
import type { CalendarDateParts, CalendarSystem } from '../src'

const offsetGregorianCalendar: CalendarSystem = {
  id: 'offset-gregorian',
  label: 'Offset Gregorian',
  monthsInYear: timestamp.gregorianCalendar.monthsInYear,
  isLeapYear(year: number) {
    return timestamp.gregorianCalendar.isLeapYear(year - 1000)
  },
  daysInMonth(year: number, month: number) {
    return timestamp.gregorianCalendar.daysInMonth(year - 1000, month)
  },
  toEpochDay(date: CalendarDateParts) {
    return timestamp.gregorianCalendar.toEpochDay({ ...date, year: date.year - 1000 })
  },
  fromEpochDay(epochDay: number) {
    const date = timestamp.gregorianCalendar.fromEpochDay(epochDay)
    return { ...date, year: date.year + 1000 }
  },
  addDays(date: CalendarDateParts, amount: number) {
    return this.fromEpochDay(this.toEpochDay(date) + amount)
  },
  nextDay(date: CalendarDateParts) {
    return this.addDays(date, 1)
  },
  prevDay(date: CalendarDateParts) {
    return this.addDays(date, -1)
  },
  getDayOfYear(date: CalendarDateParts) {
    return timestamp.gregorianCalendar.getDayOfYear({ ...date, year: date.year - 1000 })
  },
  getWeekday(date: CalendarDateParts) {
    return timestamp.gregorianCalendar.getWeekday({ ...date, year: date.year - 1000 })
  },
}

describe('today', () => {
  it('today', async () => {
    const today = timestamp.today()
    const d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    const now = [
      year,
      timestamp.padNumber(Number(month), 2),
      timestamp.padNumber(Number(day), 2),
    ].join('-')
    expect(today).toBe(now)
  })

  it('todayUTC reads UTC calendar fields', () => {
    const date = new Date('2036-01-01T01:30:00.000Z')

    expect(timestamp.todayUTC(date)).toBe('2036-01-01')
  })

  it('todayUTC reads UTC fields through a calendar adapter', () => {
    const date = new Date('2036-01-01T01:30:00.000Z')

    expect(timestamp.todayUTC(date, offsetGregorianCalendar)).toBe('3036-01-01')
    expect(timestamp.parseDateUTC(date, offsetGregorianCalendar)?.date).toBe('3036-01-01')
    expect(timestamp.nowUTC(date, offsetGregorianCalendar).date).toBe('3036-01-01')
    expect(timestamp.isTodayUTC('3036-01-01', date, offsetGregorianCalendar)).toBe(true)
    expect(timestamp.isTodayUTC('2036-01-01', date, offsetGregorianCalendar)).toBe(false)
  })

  it('isTodayUTC checks against UTC calendar fields', () => {
    const date = new Date('2036-01-01T23:30:00.000Z')

    expect(timestamp.isTodayUTC('2036-01-01', date)).toBe(true)
    expect(timestamp.isTodayUTC('2036-01-02', date)).toBe(false)
  })

  it('nowUTC returns a timestamp with UTC date and time fields', () => {
    const date = new Date('2036-12-31T23:59:15.250Z')
    const now = timestamp.nowUTC(date)

    expect(now.date).toBe('2036-12-31')
    expect(now.time).toBe('23:59:15.250')
    expect(now.year).toBe(2036)
    expect(now.month).toBe(12)
    expect(now.day).toBe(31)
    expect(now.hour).toBe(23)
    expect(now.minute).toBe(59)
    expect(now.second).toBe(15)
    expect(now.millisecond).toBe(250)
    expect(Object.isFrozen(now)).toBe(true)
  })
})
