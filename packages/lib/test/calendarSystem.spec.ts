import { describe, expect, it } from 'vitest'
import {
  addCalendarMonths,
  createCalendarDayList,
  createCalendarMonthView,
  getCalendarDateIdentity,
  getCalendarDateState,
  getCalendarSelectionState,
  createCalendarTimestamp,
  getCalendarEndOfMonth,
  getCalendarMonthNames,
  getCalendarStartOfMonth,
  getEpochDay,
  gregorianCalendar,
  isValidCalendarDate,
  nextDay,
  parseCalendarTimestamp,
  parsed,
  prevDay,
  updateCalendarDisabled,
  validateCalendarTimestamp,
  type Timestamp,
} from '../src'

describe('[TIMESTAMP] calendar systems', () => {
  it('exposes the Gregorian calendar adapter as the default calendar contract', () => {
    expect(gregorianCalendar.id).toBe('gregorian')
    expect(gregorianCalendar.intlCalendar).toBe('gregory')
    expect(gregorianCalendar.monthsInYear(2026)).toBe(12)
    expect(gregorianCalendar.isLeapYear(2024)).toBe(true)
    expect(gregorianCalendar.daysInMonth(2024, 0)).toBe(0)
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
