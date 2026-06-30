import { describe, expect, it } from 'vitest'
import {
  addCalendarMonths,
  addToDate,
  addToDateClamped,
  createCalendarDayList,
  createCalendarMonthView,
  getCalendarDateIdentity,
  getCalendarDateState,
  getCalendarDirection,
  getEndOfMonth,
  getEndOfWeek,
  getEndOfYear,
  getDayOfYear,
  getCalendarLocale,
  getCalendarSelectionState,
  getCalendarWeekdays,
  createCalendarTimestamp,
  createDayList,
  getCalendarEndOfMonth,
  getCalendarMonthNames,
  getCalendarStartOfMonth,
  getStartOfMonth,
  getStartOfWeek,
  getStartOfYear,
  getWeekday,
  getEpochDay,
  gregorianCalendar,
  isLeapYear,
  isValidCalendarDate,
  daysInMonth,
  nextDay,
  parseCalendarTimestamp,
  parsed,
  prevDay,
  updateFormatted,
  updateRelative,
  updateCalendarDisabled,
  validateCalendarTimestamp,
  isCalendarRTL,
  type CalendarDateParts,
  type CalendarSystem,
  type Timestamp,
} from '../src'

const tenMonthCalendar: CalendarSystem = {
  id: 'ten-month',
  label: 'Ten Month',
  defaultLocale: 'x-ten',
  defaultDirection: 'rtl',
  defaultWeekdays: [2, 3, 4, 5, 6, 0, 1],
  monthsInYear() {
    return 10
  },
  isLeapYear(year: number) {
    return year % 5 === 0
  },
  daysInMonth(year: number, month: number) {
    return this.isLeapYear(year) && month === 10 ? 31 : 30
  },
  toEpochDay(date: CalendarDateParts) {
    let days = 0
    for (let year = 1; year < date.year; year += 1) {
      days += this.isLeapYear(year) ? 301 : 300
    }
    for (let month = 1; month < date.month; month += 1) {
      days += this.daysInMonth(date.year, month)
    }
    return days + date.day - 1
  },
  fromEpochDay(epochDay: number) {
    let remaining = epochDay
    let year = 1
    while (remaining >= (this.isLeapYear(year) ? 301 : 300)) {
      remaining -= this.isLeapYear(year) ? 301 : 300
      year += 1
    }
    let month = 1
    while (remaining >= this.daysInMonth(year, month)) {
      remaining -= this.daysInMonth(year, month)
      month += 1
    }
    return { year, month, day: remaining + 1 }
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
    let doy = date.day
    for (let month = 1; month < date.month; month += 1) {
      doy += this.daysInMonth(date.year, month)
    }
    return doy
  },
  getWeekday(date: CalendarDateParts) {
    return this.toEpochDay(date) % 7
  },
}

describe('[TIMESTAMP] calendar systems', () => {
  it('exposes the Gregorian calendar adapter as the default calendar contract', () => {
    expect(gregorianCalendar.id).toBe('gregorian')
    expect(gregorianCalendar.intlCalendar).toBe('gregory')
    expect(gregorianCalendar.monthsInYear(2026)).toBe(12)
    expect(getCalendarLocale()).toBe('en-US')
    expect(getCalendarDirection()).toBe('ltr')
    expect(getCalendarWeekdays()).toEqual([0, 1, 2, 3, 4, 5, 6])
    expect(isCalendarRTL()).toBe(false)
    expect(gregorianCalendar.isLeapYear(2024)).toBe(true)
    expect(gregorianCalendar.daysInMonth(2024, 0)).toBe(0)
    expect(gregorianCalendar.daysInMonth(2024, 2)).toBe(29)
    expect(gregorianCalendar.daysInMonth(2025, 2)).toBe(28)
  })

  it('reads presentation defaults from calendar adapters', () => {
    const weekdays = getCalendarWeekdays(tenMonthCalendar)

    expect(getCalendarLocale(tenMonthCalendar)).toBe('x-ten')
    expect(getCalendarDirection(tenMonthCalendar)).toBe('rtl')
    expect(isCalendarRTL(tenMonthCalendar)).toBe(true)
    expect(weekdays).toEqual([2, 3, 4, 5, 6, 0, 1])
    expect(weekdays).not.toBe(tenMonthCalendar.defaultWeekdays)
  })

  it('maps Gregorian dates to stable epoch-day values', () => {
    const epoch = parsed('1970-01-01') as Timestamp
    const next = parsed('1970-01-02') as Timestamp
    const previous = parsed('1969-12-31') as Timestamp

    expect(getEpochDay(epoch)).toBe(0)
    expect(getEpochDay(next)).toBe(1)
    expect(getEpochDay(previous)).toBe(-1)
  })

  it('creates native and Gregorian identity data for calendar dates', () => {
    const timestamp = createCalendarTimestamp({ year: 2026, month: 6, day: 29 }, gregorianCalendar)
    const identity = getCalendarDateIdentity(timestamp, gregorianCalendar)

    expect(identity).toEqual({
      calendarId: 'gregorian',
      nativeDate: '2026-06-29',
      native: { year: 2026, month: 6, day: 29 },
      gregorianDate: '2026-06-29',
      gregorian: { year: 2026, month: 6, day: 29 },
      epochDay: getEpochDay(timestamp),
    })
    expect(Object.isFrozen(identity)).toBe(true)
  })

  it('keeps existing nextDay and prevDay behavior on top of the Gregorian adapter', () => {
    const endOfYear = parsed('2026-12-31') as Timestamp
    const startOfYear = parsed('2027-01-01') as Timestamp

    expect(nextDay(endOfYear).date).toBe('2027-01-01')
    expect(prevDay(startOfYear).date).toBe('2026-12-31')
  })

  it('lets legacy calendar helpers operate through an adapter when supplied', () => {
    const endOfYear = createCalendarTimestamp({ year: 4, month: 10, day: 30 }, tenMonthCalendar)
    const leapYearEnd = createCalendarTimestamp({ year: 5, month: 10, day: 31 }, tenMonthCalendar)
    const midYear = createCalendarTimestamp({ year: 5, month: 2, day: 3 }, tenMonthCalendar)

    expect(isLeapYear(5, tenMonthCalendar)).toBe(true)
    expect(daysInMonth(5, 10, tenMonthCalendar)).toBe(31)
    expect(nextDay(endOfYear, tenMonthCalendar).date).toBe('0005-01-01')
    expect(prevDay(leapYearEnd, tenMonthCalendar).date).toBe('0005-10-30')
    expect(getDayOfYear(midYear, tenMonthCalendar)).toBe(33)
    expect(getWeekday(midYear, tenMonthCalendar)).toBe(0)
  })

  it('lets legacy range and metadata helpers operate through an adapter when supplied', () => {
    const day = createCalendarTimestamp({ year: 5, month: 10, day: 31 }, tenMonthCalendar)
    const now = createCalendarTimestamp({ year: 5, month: 10, day: 30 }, tenMonthCalendar)
    const formatted = updateFormatted({ ...day, weekday: 99, doy: 0 }, tenMonthCalendar)
    const relative = updateRelative(day, now, false, tenMonthCalendar)

    expect(getStartOfMonth(day, tenMonthCalendar).date).toBe('0005-10-01')
    expect(getEndOfMonth(day, tenMonthCalendar).date).toBe('0005-10-31')
    expect(getStartOfYear(day, tenMonthCalendar).date).toBe('0005-01-01')
    expect(getEndOfYear(day, tenMonthCalendar).date).toBe('0005-10-31')
    expect(getStartOfWeek(day, [1, 2, 3], now, tenMonthCalendar).weekday).toBe(1)
    expect(getEndOfWeek(day, [1, 2, 3], now, tenMonthCalendar).weekday).toBe(3)
    expect(formatted.weekday).toBe(2)
    expect(formatted.doy).toBe(301)
    expect(relative.future).toBe(true)
  })

  it('lets legacy list and arithmetic helpers operate through an adapter when supplied', () => {
    const start = createCalendarTimestamp({ year: 5, month: 10, day: 29 }, tenMonthCalendar)
    const end = createCalendarTimestamp({ year: 6, month: 1, day: 2 }, tenMonthCalendar)
    const now = createCalendarTimestamp({ year: 5, month: 10, day: 30 }, tenMonthCalendar)
    const days = createDayList(
      start,
      end,
      now,
      undefined,
      undefined,
      undefined,
      [],
      [],
      10,
      0,
      tenMonthCalendar,
    )
    const moved = addToDate(
      createCalendarTimestamp({ year: 5, month: 10, day: 31 }, tenMonthCalendar, {
        hour: 23,
        minute: 30,
      }),
      { hour: 2 },
      tenMonthCalendar,
    )

    expect(days.map((day) => day.date)).toEqual([
      '0005-10-29',
      '0005-10-30',
      '0005-10-31',
      '0006-01-01',
      '0006-01-02',
    ])
    expect(moved.date).toBe('0006-01-01')
    expect(moved.time).toBe('01:30')
    expect(addToDateClamped(start, { month: 1 }, tenMonthCalendar).date).toBe('0006-01-29')
  })

  it('converts epoch days back into Gregorian date parts', () => {
    const leapDay = parsed('2024-02-29') as Timestamp

    expect(gregorianCalendar.fromEpochDay(getEpochDay(leapDay))).toEqual({
      year: 2024,
      month: 2,
      day: 29,
    })
  })

  it('creates timestamp-shaped values from calendar fields', () => {
    const timestamp = createCalendarTimestamp({ year: 2026, month: 6, day: 26 }, gregorianCalendar)

    expect(timestamp.calendarId).toBe('gregorian')
    expect(timestamp.date).toBe('2026-06-26')
    expect(timestamp.weekday).toBe(5)
    expect(timestamp.doy).toBe(177)
    expect(timestamp.current).toBe(false)
  })

  it('parses and validates date strings through a calendar adapter', () => {
    expect(parseCalendarTimestamp('2024-02-29', gregorianCalendar)?.date).toBe('2024-02-29')
    expect(parseCalendarTimestamp('2025-02-29', gregorianCalendar)).toBeNull()
    expect(validateCalendarTimestamp('2024-02-29', gregorianCalendar)).toBe(true)
    expect(validateCalendarTimestamp('2025-02-29', gregorianCalendar)).toBe(false)
    expect(isValidCalendarDate({ year: 2024, month: 13, day: 1 }, gregorianCalendar)).toBe(false)
  })

  it('moves and clamps calendar months', () => {
    const leapDay = createCalendarTimestamp({ year: 2024, month: 2, day: 29 }, gregorianCalendar)

    expect(addCalendarMonths(leapDay, 12, gregorianCalendar).date).toBe('2025-02-28')
    expect(addCalendarMonths(leapDay, -1, gregorianCalendar).date).toBe('2024-01-29')
  })

  it('creates adapter-aware day lists', () => {
    const start = createCalendarTimestamp({ year: 2026, month: 6, day: 1 }, gregorianCalendar)
    const end = createCalendarTimestamp({ year: 2026, month: 6, day: 7 }, gregorianCalendar)
    const now = createCalendarTimestamp({ year: 2026, month: 6, day: 3 }, gregorianCalendar)
    const days = createCalendarDayList(start, end, now, gregorianCalendar, {
      weekdays: [1, 3, 5],
    })

    expect(days.map((day) => day.date)).toEqual(['2026-06-01', '2026-06-03', '2026-06-05'])
    expect(days[1]?.current).toBe(true)
    expect(getCalendarStartOfMonth(end, gregorianCalendar).date).toBe('2026-06-01')
    expect(getCalendarEndOfMonth(start, gregorianCalendar).date).toBe('2026-06-30')
  })

  it('applies disabled and selected state through the calendar helpers', () => {
    const day = createCalendarTimestamp({ year: 2026, month: 6, day: 3 }, gregorianCalendar)
    const disabled = updateCalendarDisabled(
      day,
      undefined,
      undefined,
      [],
      [{ date: '2026-06-03', label: 'Holiday' }],
      gregorianCalendar,
    )
    const selection = getCalendarSelectionState(
      day,
      {
        selectedDates: new Set(['2026-06-03']),
        selectedStartEndDates: ['2026-06-01', '2026-06-05'],
      },
      gregorianCalendar,
    )
    const state = getCalendarDateState(
      day,
      {
        selectedStartEndDates: ['2026-06-01', '2026-06-05'],
        referenceMonth: createCalendarTimestamp(
          { year: 2026, month: 7, day: 1 },
          gregorianCalendar,
        ),
      },
      gregorianCalendar,
    )

    expect(disabled.disabled).toBe(true)
    expect(disabled.disabledLabel).toBe('Holiday')
    expect(selection).toMatchObject({
      selectedDate: true,
      range: true,
      selected: true,
    })
    expect(state.outside).toBe(true)
    expect(state.range).toBe(true)
    expect(state.identity.gregorianDate).toBe('2026-06-03')
  })

  it('creates native month view state', () => {
    const reference = createCalendarTimestamp({ year: 2026, month: 6, day: 15 }, gregorianCalendar)
    const now = createCalendarTimestamp({ year: 2026, month: 6, day: 3 }, gregorianCalendar)
    const view = createCalendarMonthView(reference, now, gregorianCalendar, {
      selectedDates: ['2026-06-03'],
      disabledDays: ['2026-06-04'],
    })

    expect(view.start.date).toBe('2026-06-01')
    expect(view.end.date).toBe('2026-06-30')
    expect(view.days).toHaveLength(42)
    expect(view.days.find((day) => day.timestamp.date === '2026-06-03')?.selected).toBe(true)
    expect(view.days.find((day) => day.timestamp.date === '2026-06-04')?.disabled).toBe(true)
    expect(view.days.some((day) => day.outside)).toBe(true)
  })

  it('formats Gregorian month names through the calendar month helpers', () => {
    expect(getCalendarMonthNames(gregorianCalendar, 'short', 'en-US', 2026).slice(0, 3)).toEqual([
      'Jan',
      'Feb',
      'Mar',
    ])
  })
})
