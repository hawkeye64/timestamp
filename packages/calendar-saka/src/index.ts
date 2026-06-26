import { gregorianCalendar } from '@timestamp-js/core'
import type { CalendarDateParts, CalendarSystem } from '@timestamp-js/core'

const GREGORIAN_YEAR_OFFSET = 78
const MONTHS_IN_YEAR = 12
const SAKA_DAYS_IN_MONTH_COMMON = [0, 30, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30]
const SAKA_DAYS_IN_MONTH_LEAP = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30]

function assertPositiveYear(year: number): void {
  if (year < 1) {
    throw new RangeError('Saka calendar years start at 1.')
  }
}

function getGregorianYearForSakaYear(year: number): number {
  assertPositiveYear(year)
  return year + GREGORIAN_YEAR_OFFSET
}

function getSakaYearStartEpochDay(year: number): number {
  const gregorianYear = getGregorianYearForSakaYear(year)
  return gregorianCalendar.toEpochDay({
    year: gregorianYear,
    month: 3,
    day: gregorianCalendar.isLeapYear(gregorianYear) === true ? 21 : 22,
  })
}

function daysBeforeMonth(year: number, month: number): number {
  let days = 0

  for (let currentMonth = 1; currentMonth < month; currentMonth += 1) {
    days += sakaDaysInMonth(year, currentMonth)
  }

  return days
}

/**
 * Returns true when the Saka year begins in a Gregorian leap year.
 *
 * @param year Saka year number.
 * @returns True when Chaitra has 31 days.
 * @category calendar
 */
export function isSakaLeapYear(year: number): boolean {
  return gregorianCalendar.isLeapYear(getGregorianYearForSakaYear(year))
}

/**
 * Returns days in an Indian National Calendar (Saka) month.
 *
 * @param year Saka year number.
 * @param month Saka month number, where Chaitra is `1`.
 * @returns Number of days in the month, or `0` for an invalid month number.
 * @category calendar
 */
export function sakaDaysInMonth(year: number, month: number): number {
  assertPositiveYear(year)

  if (month < 1 || month > MONTHS_IN_YEAR) {
    return 0
  }

  return (
    isSakaLeapYear(year) === true
      ? SAKA_DAYS_IN_MONTH_LEAP[month]
      : SAKA_DAYS_IN_MONTH_COMMON[month]
  ) as number
}

/**
 * Deterministic Indian National Calendar (Saka) adapter.
 *
 * Saka year `1` begins in Gregorian year `79`. A Saka year starts on March 21
 * when the corresponding Gregorian year is leap, and March 22 otherwise.
 */
export const indianNationalCalendar: CalendarSystem = Object.freeze({
  id: 'saka',
  intlCalendar: 'indian',
  label: 'Indian National (Saka)',

  monthsInYear() {
    return MONTHS_IN_YEAR
  },

  isLeapYear(year: number) {
    return isSakaLeapYear(year)
  },

  daysInMonth(year: number, month: number) {
    return sakaDaysInMonth(year, month)
  },

  toEpochDay(date: CalendarDateParts) {
    assertPositiveYear(date.year)
    return (
      getSakaYearStartEpochDay(date.year) + daysBeforeMonth(date.year, date.month) + date.day - 1
    )
  },

  fromEpochDay(epochDay: number) {
    const gregorianDate = gregorianCalendar.fromEpochDay(epochDay)
    let year = gregorianDate.year - GREGORIAN_YEAR_OFFSET
    let yearStart = getSakaYearStartEpochDay(year)

    if (epochDay < yearStart) {
      year -= 1
      yearStart = getSakaYearStartEpochDay(year)
    }

    let dayOfYear = epochDay - yearStart
    let month = 1

    while (month < MONTHS_IN_YEAR) {
      const daysInCurrentMonth = this.daysInMonth(year, month)
      if (dayOfYear < daysInCurrentMonth) {
        break
      }
      dayOfYear -= daysInCurrentMonth
      month += 1
    }

    return {
      year,
      month,
      day: dayOfYear + 1,
    }
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
    return this.toEpochDay(date) - this.toEpochDay({ year: date.year, month: 1, day: 1 }) + 1
  },

  getWeekday(date: CalendarDateParts) {
    return gregorianCalendar.getWeekday(gregorianCalendar.fromEpochDay(this.toEpochDay(date)))
  },
})

/**
 * Alias for the default Saka adapter exported by this package.
 */
export const sakaCalendar = indianNationalCalendar
