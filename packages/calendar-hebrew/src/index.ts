import { gregorianCalendar } from '@timestamp-js/core'
import type { CalendarDateParts, CalendarSystem } from '@timestamp-js/core'

const PARTS_IN_HOUR = 1080
const HOURS_IN_DAY = 24
const MONTHS_IN_COMMON_YEAR = 12
const MONTHS_IN_LEAP_YEAR = 13

const CIVIL_TO_NISAN_BASED_COMMON = Object.freeze([0, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6])
const CIVIL_TO_NISAN_BASED_LEAP = Object.freeze([0, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6])

// Hebrew calendar epoch relative to Timestamp epoch days, where 1970-01-01 Gregorian is 0.
const HEBREW_EPOCH_DAY = -2092591

function assertPositiveYear(year: number): void {
  if (year < 1) {
    throw new RangeError('Hebrew calendar years start at 1 AM.')
  }
}

function getHebrewCalendarElapsedDays(year: number): number {
  assertPositiveYear(year)

  const cycleYear = (year - 1) % 19
  const cycles = Math.floor((year - 1) / 19)
  const monthsElapsed = 235 * cycles + 12 * cycleYear + Math.floor((7 * cycleYear + 1) / 19)
  const partsElapsed = 204 + 793 * (monthsElapsed % PARTS_IN_HOUR)
  const hoursElapsed =
    5 +
    12 * monthsElapsed +
    793 * Math.floor(monthsElapsed / PARTS_IN_HOUR) +
    Math.floor(partsElapsed / PARTS_IN_HOUR)
  let day = 1 + 29 * monthsElapsed + Math.floor(hoursElapsed / HOURS_IN_DAY)
  const parts = PARTS_IN_HOUR * (hoursElapsed % HOURS_IN_DAY) + (partsElapsed % PARTS_IN_HOUR)

  if (
    parts >= 18 * PARTS_IN_HOUR ||
    (day % 7 === 2 && parts >= 9 * PARTS_IN_HOUR + 204 && isHebrewLeapYear(year) !== true) ||
    (year > 1 &&
      day % 7 === 1 &&
      parts >= 15 * PARTS_IN_HOUR + 589 &&
      isHebrewLeapYear(year - 1) === true)
  ) {
    day += 1
  }

  if (day % 7 === 0 || day % 7 === 3 || day % 7 === 5) {
    day += 1
  }

  return day
}

function getYearStartEpochDay(year: number): number {
  return HEBREW_EPOCH_DAY + getHebrewCalendarElapsedDays(year)
}

function getDaysInHebrewYear(year: number): number {
  return getYearStartEpochDay(year + 1) - getYearStartEpochDay(year)
}

function isLongHeshvan(year: number): boolean {
  return getDaysInHebrewYear(year) % 10 === 5
}

function isShortKislev(year: number): boolean {
  return getDaysInHebrewYear(year) % 10 === 3
}

function getNisanBasedMonth(year: number, civilMonth: number): number {
  return (
    isHebrewLeapYear(year) === true
      ? CIVIL_TO_NISAN_BASED_LEAP[civilMonth]
      : CIVIL_TO_NISAN_BASED_COMMON[civilMonth]
  ) as number
}

function getDaysInNisanBasedMonth(year: number, month: number): number {
  if (month < 1 || month > MONTHS_IN_LEAP_YEAR) {
    return 0
  }

  if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 10 ||
    month === 13 ||
    (month === 12 && isHebrewLeapYear(year) !== true) ||
    (month === 8 && isLongHeshvan(year) !== true) ||
    (month === 9 && isShortKislev(year) === true)
  ) {
    return 29
  }

  return 30
}

function getDaysBeforeCivilMonth(year: number, month: number): number {
  let days = 0

  for (let currentMonth = 1; currentMonth < month; currentMonth += 1) {
    days += hebrewDaysInMonth(year, currentMonth)
  }

  return days
}

/**
 * Returns true when a Hebrew year contains Adar I and Adar II.
 *
 * @param year Hebrew year number.
 * @returns True when the year has 13 months.
 * @category calendar
 */
export function isHebrewLeapYear(year: number): boolean {
  assertPositiveYear(year)
  return (7 * year + 1) % 19 < 7
}

/**
 * Returns days in a Hebrew civil month.
 *
 * Timestamp uses civil/CLDR month numbering for Hebrew model dates: Tishrei is
 * month `1`, Shevat is month `5`, Adar is month `6` in common years, and leap
 * years insert Adar II as month `7` before Nisan.
 *
 * @param year Hebrew year number.
 * @param month Hebrew civil month number.
 * @returns Number of days in the month, or `0` for an invalid month number.
 * @category calendar
 */
export function hebrewDaysInMonth(year: number, month: number): number {
  assertPositiveYear(year)

  if (month < 1 || month > hebrewMonthsInYear(year)) {
    return 0
  }

  return getDaysInNisanBasedMonth(year, getNisanBasedMonth(year, month))
}

/**
 * Returns the number of months in a Hebrew year.
 *
 * @param year Hebrew year number.
 * @returns `13` for leap years, otherwise `12`.
 * @category calendar
 */
export function hebrewMonthsInYear(year: number): number {
  return isHebrewLeapYear(year) === true ? MONTHS_IN_LEAP_YEAR : MONTHS_IN_COMMON_YEAR
}

/**
 * Deterministic arithmetic Hebrew calendar adapter.
 *
 * Model dates use civil/CLDR month numbering, where Tishrei is month `1`.
 * Biblical/festival numbering that starts with Nisan is a naming convention,
 * not the native model numbering used by this adapter.
 */
export const hebrewCalendar: CalendarSystem = Object.freeze({
  /**
   * Package-facing id for the Hebrew calendar adapter.
   */
  id: 'hebrew',

  /**
   * Intl calendar id for Hebrew calendar formatting.
   */
  intlCalendar: 'hebrew',

  /**
   * Human-readable adapter name.
   */
  label: 'Hebrew',

  /**
   * Default locale used for Hebrew calendar presentation.
   */
  defaultLocale: 'he-IL',

  /**
   * Default text direction for Hebrew calendar presentation.
   */
  defaultDirection: 'rtl',

  /**
   * Default visible week order for Hebrew calendar presentation: Sunday through Saturday.
   *
   * Weekdays use JavaScript numbering, where Sunday is `0` and Saturday is `6`.
   */
  defaultWeekdays: Object.freeze([0, 1, 2, 3, 4, 5, 6]),

  /**
   * Returns the number of months in a Hebrew year.
   *
   * @param year Hebrew year number.
   * @returns Number of months in the year.
   */
  monthsInYear(year: number): number {
    return hebrewMonthsInYear(year)
  },

  /**
   * Returns true when the Hebrew year contains Adar I and Adar II.
   *
   * @param year Hebrew year number.
   * @returns True when the year has 13 months.
   */
  isLeapYear(year: number): boolean {
    return isHebrewLeapYear(year)
  },

  /**
   * Returns the number of days in a Hebrew civil month.
   *
   * @param year Hebrew year number.
   * @param month Hebrew civil month number, where Tishrei is `1`.
   * @returns Number of days in the month, or `0` for an invalid month number.
   */
  daysInMonth(year: number, month: number): number {
    return hebrewDaysInMonth(year, month)
  },

  /**
   * Converts a Hebrew civil date into the equivalent epoch day.
   *
   * @param date Hebrew civil date fields.
   * @returns Epoch day for the equivalent civil instant.
   */
  toEpochDay(date: CalendarDateParts): number {
    assertPositiveYear(date.year)
    return (
      getYearStartEpochDay(date.year) +
      getDaysBeforeCivilMonth(date.year, date.month) +
      date.day -
      1
    )
  },

  /**
   * Converts an epoch day into Hebrew civil date fields.
   *
   * @param epochDay Epoch day to convert.
   * @returns Hebrew civil date fields.
   */
  fromEpochDay(epochDay: number): CalendarDateParts {
    const gregorianDate = gregorianCalendar.fromEpochDay(epochDay)
    let year = gregorianDate.year + 3761

    while (getYearStartEpochDay(year + 1) <= epochDay) {
      year += 1
    }

    while (getYearStartEpochDay(year) > epochDay) {
      year -= 1
    }

    const yearStart = getYearStartEpochDay(year)
    let dayOfYear = epochDay - yearStart
    let month = 1

    while (month < this.monthsInYear(year)) {
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
   * Moves a Hebrew civil date by a whole number of days.
   *
   * @param date Hebrew civil date fields.
   * @param amount Number of days to add. Negative values move backward.
   * @returns Shifted Hebrew civil date fields.
   */
  addDays(date: CalendarDateParts, amount: number): CalendarDateParts {
    return this.fromEpochDay(this.toEpochDay(date) + amount)
  },

  /**
   * Returns the next Hebrew civil date.
   *
   * @param date Hebrew civil date fields.
   * @returns Date fields for the following day.
   */
  nextDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, 1)
  },

  /**
   * Returns the previous Hebrew civil date.
   *
   * @param date Hebrew civil date fields.
   * @returns Date fields for the previous day.
   */
  prevDay(date: CalendarDateParts): CalendarDateParts {
    return this.addDays(date, -1)
  },

  /**
   * Returns the one-based day-of-year for a Hebrew civil date.
   *
   * @param date Hebrew civil date fields.
   * @returns One-based day-of-year.
   */
  getDayOfYear(date: CalendarDateParts): number {
    return this.toEpochDay(date) - this.toEpochDay({ year: date.year, month: 1, day: 1 }) + 1
  },

  /**
   * Returns the weekday for a Hebrew civil date using JavaScript weekday numbering.
   *
   * @param date Hebrew civil date fields.
   * @returns Weekday number where Sunday is `0` and Saturday is `6`.
   */
  getWeekday(date: CalendarDateParts): number {
    return gregorianCalendar.getWeekday(gregorianCalendar.fromEpochDay(this.toEpochDay(date)))
  },
})

/**
 * Alias for the default Hebrew calendar adapter exported by this package.
 */
export const jewishCalendar = hebrewCalendar
