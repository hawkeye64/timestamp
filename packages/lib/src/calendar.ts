const MILLISECONDS_IN_DAY = 86400000
const GREGORIAN_DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const GREGORIAN_DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Stable identifier for a calendar implementation.
 *
 * The built-in Gregorian adapter uses `gregorian` as its package-facing id and
 * `gregory` as its Intl calendar id.
 */
export type CalendarId = 'gregorian' | (string & {})

/**
 * Recommended text direction for calendar presentation.
 */
export type CalendarDirection = 'ltr' | 'rtl'

/**
 * Plain calendar date fields.
 */
export interface CalendarDateParts {
  /**
   * Calendar year.
   */
  readonly year: number

  /**
   * Calendar month number. The first month is `1`.
   */
  readonly month: number

  /**
   * Day of the month. The first day is `1`.
   */
  readonly day: number
}

/**
 * Calendar implementation contract used by Timestamp helpers.
 *
 * Calendar packages should implement this interface without import-time side
 * effects. Core range and comparison helpers can use `epochDay` as a stable
 * serial value instead of comparing calendar-specific year/month/day fields.
 */
export interface CalendarSystem {
  /**
   * Package-facing calendar id.
   */
  readonly id: CalendarId

  /**
   * Optional Intl calendar id, when one exists.
   */
  readonly intlCalendar?: string

  /**
   * Human-readable calendar name.
   */
  readonly label: string

  /**
   * Recommended BCP 47 locale for presentation when the caller does not provide one.
   */
  readonly defaultLocale?: string

  /**
   * Recommended text direction for presentation when the caller does not provide one.
   */
  readonly defaultDirection?: CalendarDirection

  /**
   * Recommended visible weekday order when the caller does not provide one.
   *
   * Weekdays use JavaScript numbering, where Sunday is `0` and Saturday is `6`.
   */
  readonly defaultWeekdays?: readonly number[]

  /**
   * Number of months in a calendar year.
   */
  monthsInYear(year: number): number

  /**
   * True when the calendar year has a leap day or leap month.
   */
  isLeapYear(year: number): boolean

  /**
   * Number of days in the specified calendar month.
   */
  daysInMonth(year: number, month: number): number

  /**
   * Converts a calendar date into a stable serial day.
   *
   * For Gregorian this is the number of UTC days since 1970-01-01. Other
   * calendar adapters should return the serial day for the equivalent civil
   * instant so comparisons and ranges can stay calendar-agnostic.
   */
  toEpochDay(date: CalendarDateParts): number

  /**
   * Converts a stable serial day into calendar date fields.
   */
  fromEpochDay(epochDay: number): CalendarDateParts

  /**
   * Moves a calendar date by a whole number of days.
   */
  addDays(date: CalendarDateParts, amount: number): CalendarDateParts

  /**
   * Returns the next calendar date.
   */
  nextDay(date: CalendarDateParts): CalendarDateParts

  /**
   * Returns the previous calendar date.
   */
  prevDay(date: CalendarDateParts): CalendarDateParts

  /**
   * Returns day-of-year for a calendar date.
   */
  getDayOfYear(date: CalendarDateParts): number

  /**
   * Returns weekday where Sunday is `0` and Saturday is `6`.
   */
  getWeekday(date: CalendarDateParts): number
}

function padNumber(value: number, length: number): string {
  let padded = String(value)
  while (padded.length < length) {
    padded = '0' + padded
  }

  return padded
}

/**
 * Formats calendar fields using the Timestamp package's fixed date format.
 */
export function formatCalendarDate(date: CalendarDateParts): string {
  return `${padNumber(date.year, 4)}-${padNumber(date.month, 2)}-${padNumber(date.day, 2)}`
}

function fromUtcDate(date: Date): CalendarDateParts {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  }
}

function toGregorianUtcDate(date: CalendarDateParts): Date {
  return new Date(Date.UTC(date.year, date.month - 1, date.day))
}

/**
 * Built-in proleptic Gregorian calendar adapter.
 *
 * This preserves the current Timestamp behavior and gives future calendar
 * packages a concrete contract to implement.
 */
export const gregorianCalendar: CalendarSystem = Object.freeze({
  id: 'gregorian',
  intlCalendar: 'gregory',
  label: 'Gregorian',
  defaultLocale: 'en-US',
  defaultDirection: 'ltr',
  defaultWeekdays: Object.freeze([0, 1, 2, 3, 4, 5, 6]),

  monthsInYear() {
    return 12
  },

  isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  },

  daysInMonth(year: number, month: number) {
    return (
      this.isLeapYear(year) ? GREGORIAN_DAYS_IN_MONTH_LEAP[month] : GREGORIAN_DAYS_IN_MONTH[month]
    ) as number
  },

  toEpochDay(date: CalendarDateParts) {
    return Math.floor(Date.UTC(date.year, date.month - 1, date.day) / MILLISECONDS_IN_DAY)
  },

  fromEpochDay(epochDay: number) {
    return fromUtcDate(new Date(epochDay * MILLISECONDS_IN_DAY))
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
    const yearStart = this.toEpochDay({ year: date.year, month: 1, day: 1 })
    return this.toEpochDay(date) - yearStart + 1
  },

  getWeekday(date: CalendarDateParts) {
    return toGregorianUtcDate(date).getUTCDay()
  },
})

/**
 * Returns the recommended locale for a calendar system.
 *
 * @param calendar Calendar implementation to read.
 * @returns BCP 47 locale, defaulting to `en-US`.
 * @category calendar
 */
export function getCalendarLocale(calendar: CalendarSystem = gregorianCalendar): string {
  return calendar.defaultLocale ?? gregorianCalendar.defaultLocale ?? 'en-US'
}

/**
 * Returns the recommended text direction for a calendar system.
 *
 * @param calendar Calendar implementation to read.
 * @returns `ltr` or `rtl`, defaulting to `ltr`.
 * @category calendar
 */
export function getCalendarDirection(
  calendar: CalendarSystem = gregorianCalendar,
): CalendarDirection {
  return calendar.defaultDirection ?? gregorianCalendar.defaultDirection ?? 'ltr'
}

/**
 * Returns true when a calendar system recommends right-to-left presentation.
 *
 * @param calendar Calendar implementation to read.
 * @returns True when the recommended direction is `rtl`.
 * @category calendar
 */
export function isCalendarRTL(calendar: CalendarSystem = gregorianCalendar): boolean {
  return getCalendarDirection(calendar) === 'rtl'
}

/**
 * Returns the recommended visible weekday order for a calendar system.
 *
 * @param calendar Calendar implementation to read.
 * @returns Weekday numbers where Sunday is `0` and Saturday is `6`.
 * @category calendar
 */
export function getCalendarWeekdays(calendar: CalendarSystem = gregorianCalendar): number[] {
  return [
    ...(calendar.defaultWeekdays ?? gregorianCalendar.defaultWeekdays ?? [0, 1, 2, 3, 4, 5, 6]),
  ]
}
