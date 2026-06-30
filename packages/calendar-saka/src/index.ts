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
  /**
   * Package-facing id for the Saka adapter.
   */
  id: 'saka',

  /**
   * Intl calendar id for the Indian National Calendar.
   */
  intlCalendar: 'indian',

  /**
   * Human-readable adapter name.
   */
  label: 'Indian National (Saka)',

  /**
   * Default locale used for Indian National Calendar presentation.
   */
  defaultLocale: 'hi-IN',

  /**
   * Default text direction for Saka presentation.
   */
  defaultDirection: 'ltr',

  /**
   * Default visible week order for Saka presentation: Sunday through Saturday.
   *
   * Weekdays use JavaScript numbering, where Sunday is `0` and Saturday is `6`.
   */
  defaultWeekdays: Object.freeze([0, 1, 2, 3, 4, 5, 6]),

  /**
   * Returns the number of months in a Saka year.
   *
   * @returns Number of months in the year.
   */
  monthsInYear(): number {
    return MONTHS_IN_YEAR
  },

  /**
   * Returns true when the Saka year begins in a Gregorian leap year.
   *
   * @param year Saka year number.
   * @returns True when Chaitra has 31 days.
   */
  isLeapYear(year: number): boolean {
    return isSakaLeapYear(year)
  },

  /**
   * Returns the number of days in a Saka month.
   *
   * @param year Saka year number.
   * @param month Saka month number, where Chaitra is `1`.
   * @returns Number of days in the month, or `0` for an invalid month number.
   */
  daysInMonth(year: number, month: number): number {
    return sakaDaysInMonth(year, month)
  },

  /**
   * Converts a Saka date into the equivalent epoch day.
   *
   * @param date Saka date fields.
   * @returns Epoch day for the equivalent civil instant.
   */
  toEpochDay(date: CalendarDateParts): number {
    assertPositiveYear(date.year)
    return (
      getSakaYearStartEpochDay(date.year) + daysBeforeMonth(date.year, date.month) + date.day - 1
    )
  },

  /**
   * Converts an epoch day into Saka date fields.
   *
   * @param epochDay Epoch day to convert.
   * @returns Saka date fields.
   */
  fromEpochDay(epochDay: number): CalendarDateParts {
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

  /**
   * Moves a Saka date by a whole number of days.
   *
   * @param date Saka date fields.
   * @param amount Number of days to add. Negative values move backward.
   * @returns Shifted Saka date fields.
   */
  addDays(date: CalendarDateParts, amount: number): CalendarDateParts {
    return this.fromEpochDay(this.toEpochDay(date) + amount)
  },

  /**
   * Returns the next Saka date.
   *
   * @param date Saka date fields.
   * @returns Date fields for the following day.
   */
  nextDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, 1)
  },

  /**
   * Returns the previous Saka date.
   *
   * @param date Saka date fields.
   * @returns Date fields for the previous day.
   */
  prevDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, -1)
  },

  /**
   * Returns the one-based day-of-year for a Saka date.
   *
   * @param date Saka date fields.
   * @returns One-based day-of-year.
   */
  getDayOfYear(date: CalendarDateParts): number {
    return this.toEpochDay(date) - this.toEpochDay({ year: date.year, month: 1, day: 1 }) + 1
  },

  /**
   * Returns the weekday for a Saka date using JavaScript weekday numbering.
   *
   * @param date Saka date fields.
   * @returns Weekday number where Sunday is `0` and Saturday is `6`.
   */
  getWeekday(date: CalendarDateParts): number {
    return gregorianCalendar.getWeekday(gregorianCalendar.fromEpochDay(this.toEpochDay(date)))
  },
})

/**
 * Alias for the default Saka adapter exported by this package.
 */
export const sakaCalendar = indianNationalCalendar
