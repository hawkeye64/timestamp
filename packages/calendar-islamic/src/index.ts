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
  id: 'islamic-civil',
  intlCalendar: 'islamic-civil',
  label: 'Islamic Civil',

  monthsInYear() {
    return MONTHS_IN_YEAR
  },

  isLeapYear(year: number) {
    return isIslamicCivilLeapYear(year)
  },

  daysInMonth(year: number, month: number) {
    return islamicCivilDaysInMonth(year, month)
  },

  toEpochDay(date: CalendarDateParts) {
    assertPositiveYear(date.year)
    return (
      ISLAMIC_EPOCH_DAY + daysBeforeYear(date.year) + daysBeforeMonth(date.month) + date.day - 1
    )
  },

  fromEpochDay(epochDay: number) {
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
 * Alias for the default Islamic adapter exported by this package.
 */
export const islamicCalendar = islamicCivilCalendar
