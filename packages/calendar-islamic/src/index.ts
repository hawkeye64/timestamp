import { gregorianCalendar } from '@timestamp-js/core'
import type { CalendarDateParts, CalendarSystem } from '@timestamp-js/core'

const ISLAMIC_EPOCH_DAY = gregorianCalendar.toEpochDay({ year: 622, month: 7, day: 19 })
const MONTHS_IN_YEAR = 12

function assertPositiveYear(year: number): void {
  if (year < 1) {
    throw new RangeError('Islamic calendar years start at 1 AH.')
  }
}

function daysBeforeYear(year: number): number {
  assertPositiveYear(year)
  return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30)
}

function daysBeforeMonth(month: number): number {
  return Math.ceil(29.5 * (month - 1))
}

/**
 * Returns true when a tabular Islamic civil year is a leap year.
 *
 * @param year Islamic civil year number.
 * @returns True when the year contains a leap day in Dhu al-Hijjah.
 * @category calendar
 */
export function isIslamicCivilLeapYear(year: number): boolean {
  assertPositiveYear(year)
  return (11 * year + 14) % 30 < 11
}

/**
 * Returns days in a tabular Islamic civil month.
 *
 * @param year Islamic civil year number.
 * @param month Islamic civil month number, where Muharram is `1`.
 * @returns Number of days in the month, or `0` for an invalid month number.
 * @category calendar
 */
export function islamicCivilDaysInMonth(year: number, month: number): number {
  assertPositiveYear(year)

  if (month < 1 || month > MONTHS_IN_YEAR) {
    return 0
  }

  if (month === 12 && isIslamicCivilLeapYear(year) === true) {
    return 30
  }

  return month % 2 === 1 ? 30 : 29
}

/**
 * Deterministic tabular Islamic civil calendar.
 *
 * This adapter intentionally models the arithmetic/civil Hijri calendar. It
 * does not model observational calendars or Umm al-Qura adjustments.
 */
export const islamicCivilCalendar: CalendarSystem = Object.freeze({
  /**
   * Package-facing id for the Islamic civil adapter.
   */
  id: 'islamic-civil',

  /**
   * Intl calendar id for the arithmetic Islamic civil calendar.
   */
  intlCalendar: 'islamic-civil',

  /**
   * Human-readable adapter name.
   */
  label: 'Islamic Civil',

  /**
   * Default locale used for Islamic civil presentation.
   */
  defaultLocale: 'ar',

  /**
   * Default text direction for Arabic Hijri presentation.
   */
  defaultDirection: 'rtl',

  /**
   * Default visible week order for Hijri presentation: Saturday through Friday.
   *
   * Weekdays use JavaScript numbering, where Sunday is `0` and Saturday is `6`.
   */
  defaultWeekdays: Object.freeze([6, 0, 1, 2, 3, 4, 5]),

  /**
   * Returns the number of months in an Islamic civil year.
   *
   * @returns Number of months in the year.
   */
  monthsInYear(): number {
    return MONTHS_IN_YEAR
  },

  /**
   * Returns true when the Islamic civil year contains a leap day.
   *
   * @param year Islamic civil year number.
   * @returns True when the year contains a leap day in Dhu al-Hijjah.
   */
  isLeapYear(year: number): boolean {
    return isIslamicCivilLeapYear(year)
  },

  /**
   * Returns the number of days in an Islamic civil month.
   *
   * @param year Islamic civil year number.
   * @param month Islamic civil month number, where Muharram is `1`.
   * @returns Number of days in the month, or `0` for an invalid month number.
   */
  daysInMonth(year: number, month: number): number {
    return islamicCivilDaysInMonth(year, month)
  },

  /**
   * Converts an Islamic civil date into the equivalent epoch day.
   *
   * @param date Islamic civil date fields.
   * @returns Epoch day for the equivalent civil instant.
   */
  toEpochDay(date: CalendarDateParts): number {
    assertPositiveYear(date.year)
    return (
      ISLAMIC_EPOCH_DAY + daysBeforeYear(date.year) + daysBeforeMonth(date.month) + date.day - 1
    )
  },

  /**
   * Converts an epoch day into Islamic civil date fields.
   *
   * @param epochDay Epoch day to convert.
   * @returns Islamic civil date fields.
   */
  fromEpochDay(epochDay: number): CalendarDateParts {
    const days = epochDay - ISLAMIC_EPOCH_DAY
    let year = Math.floor((30 * days + 10646) / 10631)

    while (year > 1 && this.toEpochDay({ year, month: 1, day: 1 }) > epochDay) {
      year -= 1
    }

    while (this.toEpochDay({ year: year + 1, month: 1, day: 1 }) <= epochDay) {
      year += 1
    }

    let dayOfYear = epochDay - this.toEpochDay({ year, month: 1, day: 1 })
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
   * Moves an Islamic civil date by a whole number of days.
   *
   * @param date Islamic civil date fields.
   * @param amount Number of days to add. Negative values move backward.
   * @returns Shifted Islamic civil date fields.
   */
  addDays(date: CalendarDateParts, amount: number): CalendarDateParts {
    return this.fromEpochDay(this.toEpochDay(date) + amount)
  },

  /**
   * Returns the next Islamic civil date.
   *
   * @param date Islamic civil date fields.
   * @returns Date fields for the following day.
   */
  nextDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, 1)
  },

  /**
   * Returns the previous Islamic civil date.
   *
   * @param date Islamic civil date fields.
   * @returns Date fields for the previous day.
   */
  prevDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, -1)
  },

  /**
   * Returns the one-based day-of-year for an Islamic civil date.
   *
   * @param date Islamic civil date fields.
   * @returns One-based day-of-year.
   */
  getDayOfYear(date: CalendarDateParts): number {
    return this.toEpochDay(date) - this.toEpochDay({ year: date.year, month: 1, day: 1 }) + 1
  },

  /**
   * Returns the weekday for an Islamic civil date using JavaScript weekday numbering.
   *
   * @param date Islamic civil date fields.
   * @returns Weekday number where Sunday is `0` and Saturday is `6`.
   */
  getWeekday(date: CalendarDateParts): number {
    return gregorianCalendar.getWeekday(gregorianCalendar.fromEpochDay(this.toEpochDay(date)))
  },
})

/**
 * Alias for the default Islamic adapter exported by this package.
 */
export const islamicCalendar = islamicCivilCalendar
