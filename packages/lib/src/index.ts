import {
  formatCalendarDate as formatCalendarDateImpl,
  getCalendarDirection as getCalendarDirectionImpl,
  getCalendarLocale as getCalendarLocaleImpl,
  getCalendarWeekdays as getCalendarWeekdaysImpl,
  gregorianCalendar,
  isCalendarRTL as isCalendarRTLImpl,
} from './calendar.js'
import type { CalendarDateParts, CalendarDirection, CalendarId, CalendarSystem } from './calendar.js'

export { gregorianCalendar } from './calendar.js'
export type { CalendarDateParts, CalendarDirection, CalendarId, CalendarSystem } from './calendar.js'

/**
 * Formats calendar fields using Timestamp's fixed `YYYY-MM-DD` date format.
 *
 * @param date Plain calendar date fields.
 * @returns Date string in `YYYY-MM-DD` form.
 * @category calendar
 */
export function formatCalendarDate(date: CalendarDateParts): string {
  return formatCalendarDateImpl(date)
}

/**
 * Returns the recommended locale for a calendar system.
 *
 * Calendar adapters can use this to publish their normal display locale. Callers can still pass
 * an explicit locale when an application needs a different language or numbering presentation.
 *
 * @param {CalendarSystem=} calendar Calendar system to read. Defaults to Gregorian.
 * @returns {string} BCP 47 locale, defaulting to `en-US`.
 * @category calendar
 */
export function getCalendarLocale(calendar: CalendarSystem = gregorianCalendar): string {
  return getCalendarLocaleImpl(calendar)
}

/**
 * Returns the recommended text direction for a calendar system.
 *
 * Calendar adapters can use this to publish their normal left-to-right or right-to-left
 * presentation. Callers can still pass an explicit direction when an application needs one.
 *
 * @param {CalendarSystem=} calendar Calendar system to read. Defaults to Gregorian.
 * @returns {CalendarDirection} `ltr` or `rtl`, defaulting to `ltr`.
 * @category calendar
 */
export function getCalendarDirection(
  calendar: CalendarSystem = gregorianCalendar,
): CalendarDirection {
  return getCalendarDirectionImpl(calendar)
}

/**
 * Returns true when a calendar system recommends right-to-left presentation.
 *
 * @param {CalendarSystem=} calendar Calendar system to read. Defaults to Gregorian.
 * @returns {boolean} True when the recommended direction is `rtl`.
 * @category calendar
 */
export function isCalendarRTL(calendar: CalendarSystem = gregorianCalendar): boolean {
  return isCalendarRTLImpl(calendar)
}

/**
 * Returns the recommended visible weekday order for a calendar system.
 *
 * Calendar adapters can use this to publish their normal visible week. Callers can still pass an
 * explicit weekday list for application-specific layouts such as a five-day work week.
 *
 * @param {CalendarSystem=} calendar Calendar system to read. Defaults to Gregorian.
 * @returns {number[]} Weekday numbers where Sunday is `0` and Saturday is `6`.
 * @category calendar
 */
export function getCalendarWeekdays(calendar: CalendarSystem = gregorianCalendar): number[] {
  return getCalendarWeekdaysImpl(calendar)
}

/**
 * Matches supported date and date-time input.
 *
 * Accepts `YYYY-MM`, `YYYY-MM-DD`, space-separated date/time strings,
 * ISO-style `T` separators, optional seconds, optional milliseconds, and
 * optional timezone suffixes such as `Z`, `+06:00`, or `-0700`.
 */
export const PARSE_DATETIME =
  /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?(?:[Tt\s]+(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2})(?:\.(\d{1,3}))?)?)?(?:\s*(Z|[+-]\d{2}:?\d{2}))?$/

/**
 * Matches the date portion of a timestamp string.
 */
export const PARSE_DATE = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?/

/**
 * Matches `HH`, `HH:mm`, `HH:mm:ss`, or `HH:mm:ss.SSS` time strings.
 */
export const PARSE_TIME = /^(\d\d?)(?::(\d\d?))?(?::(\d\d?))?(?:\.(\d{1,3}))?$/

/**
 * Month lengths for a non-leap Gregorian year.
 *
 * Index `0` is intentionally unused so month numbers can be used directly.
 */
export const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Month lengths for a leap Gregorian year.
 *
 * Index `0` is intentionally unused so month numbers can be used directly.
 */
export const DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Shared conversion constants for milliseconds, seconds, minutes, hours, and days.
 */
export const TIME_CONSTANTS = {
  MILLISECONDS_IN: {
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000,
    WEEK: 604800000,
  },
  SECONDS_IN: {
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    WEEK: 604800,
  },
  MINUTES_IN: {
    MINUTE: 1,
    HOUR: 60,
    DAY: 1440,
    WEEK: 10080,
  },
  HOURS_IN: {
    DAY: 24,
    WEEK: 168,
  },
  DAYS_IN: {
    WEEK: 7,
  },
}

/**
 * Minimum number of days found in any Gregorian month.
 */
export const DAYS_IN_MONTH_MIN = 28

/**
 * Maximum number of days found in any Gregorian month.
 */
export const DAYS_IN_MONTH_MAX = 31

/**
 * Maximum Gregorian month number.
 */
export const MONTH_MAX = 12

/**
 * Minimum Gregorian month number.
 */
export const MONTH_MIN = 1

/**
 * Minimum day-of-month number.
 */
export const DAY_MIN = 1

/**
 * First hour in a 24-hour day.
 */
export const FIRST_HOUR = 0

/**
 * Number of days in a week.
 */
export const DAYS_IN_WEEK = TIME_CONSTANTS.DAYS_IN.WEEK

/**
 * Number of minutes in an hour.
 */
export const MINUTES_IN_HOUR = TIME_CONSTANTS.MINUTES_IN.HOUR

/**
 * Number of hours in a day.
 */
export const HOURS_IN_DAY = TIME_CONSTANTS.HOURS_IN.DAY

/**
 * Number of milliseconds in one minute.
 */
export const MILLISECONDS_IN_MINUTE = TIME_CONSTANTS.MILLISECONDS_IN.MINUTE

/**
 * Number of milliseconds in one second.
 */
export const MILLISECONDS_IN_SECOND = TIME_CONSTANTS.MILLISECONDS_IN.SECOND

/**
 * Number of milliseconds in one hour.
 */
export const MILLISECONDS_IN_HOUR = TIME_CONSTANTS.MILLISECONDS_IN.HOUR

/**
 * Number of milliseconds in one day.
 */
export const MILLISECONDS_IN_DAY = TIME_CONSTANTS.MILLISECONDS_IN.DAY

/**
 * Number of milliseconds in one week.
 */
export const MILLISECONDS_IN_WEEK = TIME_CONSTANTS.MILLISECONDS_IN.WEEK

/**
 * Number of seconds in one minute.
 */
export const SECONDS_IN_MINUTE = TIME_CONSTANTS.SECONDS_IN.MINUTE

/**
 * Number of seconds in one hour.
 */
export const SECONDS_IN_HOUR = TIME_CONSTANTS.SECONDS_IN.HOUR

/**
 * Number of seconds in one day.
 */
export const SECONDS_IN_DAY = TIME_CONSTANTS.SECONDS_IN.DAY

/**
 * Inline style metadata that can be attached to disabled timestamp ranges.
 */
export type TimestampStyle = Record<string, string | number | undefined>

/**
 * CSS class metadata that can be attached to disabled timestamp ranges.
 */
export type TimestampClass = string | string[] | Record<string, boolean>

/**
 * Object form for a disabled day or disabled date range.
 */
export interface DisabledDayConfig {
  /**
   * Single disabled date in `YYYY-MM-DD` form.
   */
  date?: string

  /**
   * Inclusive range start date in `YYYY-MM-DD` form.
   */
  from?: string

  /**
   * Inclusive range end date in `YYYY-MM-DD` form.
   */
  to?: string

  /**
   * Alias for DisabledDayConfig.from.
   */
  start?: string

  /**
   * Alias for DisabledDayConfig.to.
   */
  end?: string

  /**
   * Optional background color metadata for matching disabled dates.
   */
  color?: string

  /**
   * Optional text color metadata for matching disabled dates.
   */
  textColor?: string

  /**
   * Optional CSS class metadata for matching disabled dates.
   */
  class?: TimestampClass

  /**
   * Optional inline style metadata for matching disabled dates.
   */
  style?: TimestampStyle

  /**
   * Optional human-readable label for matching disabled dates.
   */
  label?: string
}

/**
 * Supported disabled-day declaration.
 *
 * A string disables a single date, a string array disables multiple dates or
 * an inclusive two-date range, and an object can carry display metadata.
 */
export type DisabledDay = string | string[] | DisabledDayConfig

/**
 * Collection of disabled-day declarations.
 */
export type DisabledDays = DisabledDay[]

/**
 * Immutable timestamp data used by all parser, comparison, and date math helpers.
 *
 * Core parser helpers produce Gregorian calendar fields and preserve optional
 * ISO timezone suffixes without converting the wall-clock values into another
 * zone. Calendar adapter helpers can also produce timestamp-shaped values whose
 * year/month/day fields belong to the adapter identified by `calendarId`.
 */
export interface Timestamp {
  /**
   * Optional calendar-system identifier for adapter-produced timestamps.
   *
   * Core Gregorian helpers omit this field for backwards compatibility.
   */
  readonly calendarId?: CalendarId

  /**
   * Date string in `YYYY-MM-DD` form when the timestamp has a day.
   */
  readonly date: string

  /**
   * True when the timestamp includes a meaningful date/day value.
   */
  readonly hasDay: boolean

  /**
   * Calendar year. Core parser helpers use Gregorian years.
   */
  readonly year: number

  /**
   * Calendar month number, where the first month is `1`. Core parser helpers
   * use Gregorian month numbers.
   */
  readonly month: number

  /**
   * Calendar day of the month.
   */
  readonly day: number

  /**
   * Formatted time string.
   *
   * Minute precision is formatted as `HH:mm`; second precision as `HH:mm:ss`;
   * millisecond precision as `HH:mm:ss.SSS`.
   */
  readonly time?: string

  /**
   * True when the timestamp includes time fields.
   */
  readonly hasTime: boolean

  /**
   * Hour in 24-hour format.
   */
  readonly hour: number

  /**
   * Minute of the hour.
   */
  readonly minute: number

  /**
   * Optional second of the minute.
   */
  readonly second?: number

  /**
   * Optional millisecond of the second.
   */
  readonly millisecond?: number

  /**
   * Optional parsed ISO timezone suffix such as `Z`, `+06:00`, or `-0700`.
   *
   * The suffix is preserved for callers, but parsing does not convert the
   * wall-clock values into another timezone.
   */
  readonly timezone?: string

  /**
   * Weekday number where Sunday is `0` and Saturday is `6`.
   */
  readonly weekday?: number

  /**
   * Day of the year.
   */
  readonly doy?: number

  /**
   * ISO-style workweek number.
   */
  readonly workweek?: number

  /**
   * True when the timestamp is before a comparison timestamp.
   */
  readonly past?: boolean

  /**
   * True when the timestamp matches a comparison timestamp.
   */
  readonly current?: boolean

  /**
   * True when the timestamp is after a comparison timestamp.
   */
  readonly future?: boolean

  /**
   * True when this timestamp represents a disabled date.
   */
  readonly disabled?: boolean

  /**
   * Optional background color metadata for a disabled date.
   */
  readonly disabledColor?: string

  /**
   * Optional text color metadata for a disabled date.
   */
  readonly disabledTextColor?: string

  /**
   * Optional class metadata for a disabled date.
   */
  readonly disabledClass?: TimestampClass

  /**
   * Optional inline style metadata for a disabled date.
   */
  readonly disabledStyle?: TimestampStyle

  /**
   * Optional human-readable label for a disabled date.
   */
  readonly disabledLabel?: string

  /**
   * True when this timestamp's weekday matches a comparison timestamp's weekday.
   */
  readonly currentWeekday?: boolean
}

type MutableTimestamp = { -readonly [Key in keyof Timestamp]: Timestamp[Key] }

/**
 * Time-only value used when callers need hour/minute input without a date.
 */
export interface TimeObject {
  /**
   * Hour in 24-hour format.
   */
  readonly hour: number

  /**
   * Minute of the hour.
   */
  readonly minute: number

  /**
   * Optional second of the minute.
   */
  readonly second?: number

  /**
   * Optional millisecond of the second.
   */
  readonly millisecond?: number
}

/**
 * Immutable inclusive range between two Timestamp values.
 *
 * Range helpers normalize start/end order when created with createTimestampRange().
 */
export interface TimestampRange {
  /**
   * Inclusive range start.
   */
  readonly start: Timestamp

  /**
   * Inclusive range end.
   */
  readonly end: Timestamp
}

/**
 * Immutable elapsed duration broken into convenient absolute components.
 *
 * `totalMilliseconds` is signed. The component fields are absolute values so
 * callers can display or inspect them without repeatedly applying Math.abs().
 */
export interface TimestampDuration {
  /**
   * Signed elapsed milliseconds from the first timestamp to the second.
   */
  readonly totalMilliseconds: number

  /**
   * Absolute elapsed milliseconds.
   */
  readonly absoluteMilliseconds: number

  /**
   * Direction of the duration: `-1`, `0`, or `1`.
   */
  readonly sign: -1 | 0 | 1

  /**
   * Full days in the absolute duration.
   */
  readonly days: number

  /**
   * Remaining hours after full days are removed.
   */
  readonly hours: number

  /**
   * Remaining minutes after full hours are removed.
   */
  readonly minutes: number

  /**
   * Remaining seconds after full minutes are removed.
   */
  readonly seconds: number

  /**
   * Remaining milliseconds after full seconds are removed.
   */
  readonly milliseconds: number
}

/**
 * Options used when creating a Timestamp from calendar adapter fields.
 */
export interface CalendarTimestampOptions {
  /**
   * Include formatted time data when true. Defaults to true for compatibility
   * with calendar-view workflows that expect `00:00` when no explicit time is supplied.
   */
  readonly hasTime?: boolean

  /**
   * Hour in 24-hour format.
   */
  readonly hour?: number

  /**
   * Minute of the hour.
   */
  readonly minute?: number

  /**
   * Optional second of the minute.
   */
  readonly second?: number

  /**
   * Optional millisecond of the second.
   */
  readonly millisecond?: number

  /**
   * Optional parsed ISO timezone suffix such as `Z`, `+06:00`, or `-0700`.
   */
  readonly timezone?: string

  /**
   * Optional comparison timestamp from the same calendar system.
   */
  readonly now?: Timestamp | null
}

/**
 * Options used when creating a calendar-aware day list.
 */
export interface CalendarDayListOptions {
  /**
   * Weekday numbers to include, from `0` Sunday to `6` Saturday.
   */
  readonly weekdays?: number[]

  /**
   * Disable days before this calendar date string.
   */
  readonly disabledBefore?: string

  /**
   * Disable days after this calendar date string.
   */
  readonly disabledAfter?: string

  /**
   * Weekday numbers to mark disabled.
   */
  readonly disabledWeekdays?: number[]

  /**
   * Specific dates or date ranges to mark disabled.
   */
  readonly disabledDays?: DisabledDays

  /**
   * Maximum number of days to return.
   */
  readonly max?: number

  /**
   * Minimum number of days to return.
   */
  readonly min?: number
}

/**
 * Calendar-aware disabled-day options.
 */
export interface CalendarDisabledOptions {
  /**
   * Disable days before this calendar date string.
   */
  readonly disabledBefore?: string

  /**
   * Disable days after this calendar date string.
   */
  readonly disabledAfter?: string

  /**
   * Weekday numbers to mark disabled.
   */
  readonly disabledWeekdays?: number[]

  /**
   * Specific dates or date ranges to mark disabled.
   */
  readonly disabledDays?: DisabledDays
}

/**
 * Collection of adapter-native date strings.
 */
export type CalendarDateCollection = string[] | Set<string>

/**
 * Calendar-aware selected-date options.
 */
export interface CalendarSelectionOptions {
  /**
   * Adapter-native date strings to mark as selected.
   */
  readonly selectedDates?: CalendarDateCollection

  /**
   * Two adapter-native date strings marking an inclusive selected range.
   */
  readonly selectedStartEndDates?: string[]
}

/**
 * Selection state for one calendar date.
 */
export interface CalendarSelectionState {
  /**
   * True when the date is explicitly selected.
   */
  readonly selectedDate: boolean

  /**
   * True when the date is the selected range start.
   */
  readonly rangeFirst: boolean

  /**
   * True when the date is inside, but not at either edge of, the selected range.
   */
  readonly range: boolean

  /**
   * True when the date is the selected range end.
   */
  readonly rangeLast: boolean

  /**
   * True when any selected-date or selected-range state applies.
   */
  readonly selected: boolean
}

/**
 * Fully resolved state for one calendar date in a view.
 */
export interface CalendarDateState extends CalendarSelectionState {
  /**
   * Adapter-native timestamp for the rendered date.
   */
  readonly timestamp: Timestamp

  /**
   * Stable native/Gregorian identity for the rendered date.
   */
  readonly identity: CalendarDateIdentity

  /**
   * True when the date is outside the reference adapter month.
   */
  readonly outside: boolean

  /**
   * True when the date is disabled by calendar-aware disabled options.
   */
  readonly disabled: boolean
}

/**
 * Options used when resolving one calendar date's state.
 */
export interface CalendarDateStateOptions
  extends CalendarDisabledOptions, CalendarSelectionOptions {
  /**
   * Explicit outside-month state. When omitted, referenceMonth is used.
   */
  readonly outside?: boolean

  /**
   * Reference date whose adapter month defines outside-month state.
   */
  readonly referenceMonth?: Timestamp
}

/**
 * Options used when creating a calendar month view.
 */
export interface CalendarMonthViewOptions
  extends CalendarDisabledOptions, CalendarSelectionOptions {
  /**
   * Weekday numbers to include, from `0` Sunday to `6` Saturday.
   */
  readonly weekdays?: number[]

  /**
   * Maximum number of days to return.
   */
  readonly max?: number

  /**
   * Minimum number of days to return.
   */
  readonly min?: number
}

/**
 * Resolved calendar month view data.
 */
export interface CalendarMonthView {
  /**
   * Reference timestamp normalized through the calendar adapter.
   */
  readonly reference: Timestamp

  /**
   * First date of the reference adapter month.
   */
  readonly start: Timestamp

  /**
   * Last date of the reference adapter month.
   */
  readonly end: Timestamp

  /**
   * First rendered date in the month grid.
   */
  readonly visibleStart: Timestamp

  /**
   * Last rendered date in the month grid.
   */
  readonly visibleEnd: Timestamp

  /**
   * Rendered adapter-native day states.
   */
  readonly days: CalendarDateState[]
}

/**
 * Stable native and interop identity for a calendar date.
 *
 * Calendar-native APIs can use `nativeDate`, `native`, and `calendarId` while
 * storage, sorting, cross-calendar joins, and legacy interop can use
 * `epochDay` and `gregorianDate`.
 */
export interface CalendarDateIdentity {
  /**
   * Calendar id for the native date fields.
   */
  readonly calendarId: CalendarId

  /**
   * Native calendar date string in `YYYY-MM-DD` form.
   */
  readonly nativeDate: string

  /**
   * Native calendar date fields.
   */
  readonly native: CalendarDateParts

  /**
   * Canonical Gregorian date string for the same serial day.
   */
  readonly gregorianDate: string

  /**
   * Canonical Gregorian date fields for the same serial day.
   */
  readonly gregorian: CalendarDateParts

  /**
   * Stable serial day shared across calendar systems.
   */
  readonly epochDay: number
}

/**
 * Options for formatting a TimestampDuration.
 */
export interface FormatDurationOptions {
  /**
   * Include the millisecond component when true.
   */
  readonly milliseconds?: boolean

  /**
   * Preserve a leading `-` for negative durations when true.
   */
  readonly signed?: boolean
}

/**
 * Frozen empty timestamp template.
 *
 * Use copyTimestamp or parser helpers to create new timestamp objects
 * instead of mutating this shared default.
 */
export const Timestamp: Timestamp = freezeTimestamp({
  date: '',
  hasDay: false,
  year: 0,
  month: 0,
  day: 0,
  hasTime: false,
  hour: 0,
  minute: 0,
  weekday: 0,
  doy: 0,
  workweek: 0,
  past: false,
  current: false,
  future: false,
  disabled: false,
})

/**
 * Frozen empty time-object template.
 */
export const TimeObject: TimeObject = Object.freeze({
  hour: 0,
  minute: 0,
})

function freezeTimestamp(timestamp: Timestamp | MutableTimestamp): Timestamp {
  return Object.freeze({ ...timestamp }) as Timestamp
}

function cloneTimestamp(timestamp: Timestamp): MutableTimestamp {
  return { ...timestamp }
}

/**
 * Extracts calendar date fields from a timestamp-shaped value.
 *
 * @param timestamp Timestamp or timestamp-like object to read.
 * @returns Plain calendar date fields.
 * @category calendar
 */
export function toCalendarDateParts(
  timestamp: Pick<Timestamp, 'year' | 'month' | 'day'>,
): CalendarDateParts {
  return {
    year: timestamp.year,
    month: timestamp.month,
    day: timestamp.day,
  }
}

function getCalendarTimestampOptions(timestamp: Timestamp): CalendarTimestampOptions {
  return {
    hasTime: timestamp.hasTime,
    hour: timestamp.hour,
    minute: timestamp.minute,
    second: timestamp.second,
    millisecond: timestamp.millisecond,
    timezone: timestamp.timezone,
  }
}

function getCalendarWorkWeek(date: CalendarDateParts, calendar: CalendarSystem): number {
  const firstWeekday = calendar.getWeekday({ year: date.year, month: 1, day: 1 })
  return Math.floor((calendar.getDayOfYear(date) + firstWeekday - 1) / 7) + 1
}

function parseMillisecond(value: string | undefined): number | undefined {
  return value === undefined ? undefined : parseInt(value.padEnd(3, '0'), 10)
}

/**
 * Validates whether an input string matches the supported timestamp grammar.
 *
 * @param {string} input A string in the form `YYYY-MM-DD`, `YYYY-MM-DD HH:mm`, or a full ISO-like date time.
 * @returns {boolean} True if parseable
 * @category validation
 */
export function validateTimestamp(input: string): boolean {
  if (typeof input !== 'string') return false
  return PARSE_DATETIME.test(input)
}

/**
 * Fast low-level parser for date and date-time strings.
 *
 * This parser fills numeric fields, but does not update formatted date,
 * weekday, day-of-year, workweek, or relative flags. Use parseTimestamp()
 * when those derived fields are needed.
 *
 * @param {string} input In the form `YYYY-MM-DD`, `YYYY-MM-DD HH:mm:ss`, or an ISO-like date time with optional milliseconds and timezone suffix.
 * @returns {Timestamp} Minimal Timestamp object, or `null` when the input cannot be parsed.
 * @category parsing
 */
export function parsed(input: string): Timestamp | null {
  if (typeof input !== 'string') return null
  const parts = PARSE_DATETIME.exec(input)

  if (!parts || !parts[1] || !parts[2]) return null

  const year = parseInt(parts[1], 10)
  const month = parseInt(parts[2], 10)
  const day = parseInt(parts[3] || '1', 10)
  const hour = parseInt(parts[4] || '0', 10)
  const minute = parseInt(parts[5] || '0', 10)
  const second = parts[6] === undefined ? undefined : parseInt(parts[6], 10)
  const millisecond = parseMillisecond(parts[7])
  const timestamp: MutableTimestamp = {
    date: input,
    year,
    month,
    day,
    hour,
    minute,
    hasDay: !!parts[3],
    hasTime: true, // time is always present, even if '00:00'
    past: false,
    current: false,
    future: false,
    disabled: false,
    weekday: 0,
    doy: 0,
    workweek: 0,
  }

  if (second !== undefined) {
    timestamp.second = second
  }
  if (millisecond !== undefined) {
    timestamp.millisecond = millisecond
  }
  if (parts[8] !== undefined) {
    timestamp.timezone = parts[8]
  }

  timestamp.time = getTime(timestamp)

  return freezeTimestamp(timestamp)
}

function parseDateByMode(
  date: Date,
  utc: boolean,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp | null {
  if (!(date instanceof Date)) return null
  if (Number.isNaN(date.getTime())) return null

  const UTC = utc ? 'UTC' : ''
  const gregorian = {
    year: date[`get${UTC}FullYear`](),
    month: date[`get${UTC}Month`]() + 1,
    day: date[`get${UTC}Date`](),
  }
  const second = date[`get${UTC}Seconds`]()
  const millisecond = date[`get${UTC}Milliseconds`]()
  const timestamp: MutableTimestamp = {
    date: formatCalendarDate(gregorian),
    time:
      padNumber(date[`get${UTC}Hours`]() || 0, 2) +
      ':' +
      padNumber(date[`get${UTC}Minutes`]() || 0, 2),
    year: gregorian.year,
    month: gregorian.month,
    day: gregorian.day,
    hour: date[`get${UTC}Hours`](),
    minute: date[`get${UTC}Minutes`](),
    weekday: 0,
    doy: 0,
    workweek: 0,
    hasDay: true,
    hasTime: true, // Date always has time, even if it is '00:00'
    past: false,
    current: false,
    future: false,
    disabled: false,
  }

  if (second !== 0) {
    timestamp.second = second
  }
  if (millisecond !== 0) {
    timestamp.millisecond = millisecond
  }

  const formatted = updateFormatted(timestamp)
  if (calendar === gregorianCalendar) {
    return formatted
  }

  return createCalendarTimestampFromEpochDay(gregorianCalendar.toEpochDay(gregorian), calendar, {
    ...getCalendarTimestampOptions(formatted),
  })
}

/**
 * Converts a JavaScript Date into a formatted Timestamp using host-local fields.
 *
 * Use parseDateUTC() when the Date represents an instant that should be read
 * with UTC getters instead of host-local getters.
 *
 * @param {Date} date JavaScript Date to convert.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} Formatted Timestamp object, or `null` for invalid input.
 * @category parsing
 */
export function parseDate(
  date: Date,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp | null {
  return parseDateByMode(date, false, calendar)
}

/**
 * Converts a JavaScript Date into a formatted Timestamp using UTC fields.
 *
 * Use this when server and client output should agree on the same UTC calendar
 * and time fields for a native Date instant.
 *
 * @param {Date} date JavaScript Date to convert.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} Formatted Timestamp object, or `null` for invalid input.
 * @category parsing
 */
export function parseDateUTC(
  date: Date,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp | null {
  return parseDateByMode(date, true, calendar)
}

/**
 * Pads a number to a requested string length.
 *
 * Useful for formatting values such as `5` as `05`.
 * @param {number} x The number to pad
 * @param {number} length The length of the required number as a string
 * @returns {string} The padded number (as a string). (ie: 5 = '05')
 * @category formatting
 */
export function padNumber(x: number, length: number): string {
  let padded = String(x)
  while (padded.length < length) {
    padded = '0' + padded
  }

  return padded
}

/**
 * Returns if the passed year is a leap year
 * @param {number} year The year to check (ie: 1999, 2020)
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {boolean} True if the year is a leap year
 * @category calendar
 */
export function isLeapYear(year: number, calendar: CalendarSystem = gregorianCalendar): boolean {
  return calendar.isLeapYear(year)
}

/**
 * Returns the days of the specified month in a year
 * @param {number} year The year (ie: 1999, 2020)
 * @param {number} month The month number in the selected calendar, where January is `1` for Gregorian.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {number} The number of days in the month (corrected for leap years)
 * @category calendar
 */
export function daysInMonth(
  year: number,
  month: number,
  calendar: CalendarSystem = gregorianCalendar,
): number {
  return calendar.daysInMonth(year, month)
}

/**
 * Returns a new Timestamp for the next calendar day.
 *
 * @param {Timestamp} timestamp Base Timestamp object.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New Timestamp representing the next day.
 * @category arithmetic
 */
export function nextDay(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return nextCalendarDay(timestamp, calendar)
}

/**
 * Returns a new Timestamp for the previous calendar day.
 *
 * @param {Timestamp} timestamp Base Timestamp object.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New Timestamp representing the previous day.
 * @category arithmetic
 */
export function prevDay(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return prevCalendarDay(timestamp, calendar)
}

function formatCalendarDateFromDate(
  date: Date,
  utc: boolean,
  calendar: CalendarSystem = gregorianCalendar,
): string {
  const UTC = utc ? 'UTC' : ''
  const gregorian = {
    year: date[`get${UTC}FullYear`](),
    month: date[`get${UTC}Month`]() + 1,
    day: date[`get${UTC}Date`](),
  }
  const epochDay = gregorianCalendar.toEpochDay(gregorian)

  return formatCalendarDate(calendar.fromEpochDay(epochDay))
}

/**
 * Returns today's date using the host runtime timezone.
 *
 * For SSR or static rendering, server and client runtimes can produce different
 * values when they run in different timezones. Use todayUTC() when the app
 * wants a stable UTC calendar date instead. Pass a calendar system to return
 * today's date in that calendar's native `YYYY-MM-DD` fields.
 *
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {string} Date string in the form `YYYY-MM-DD`
 * @category state
 */
export function today(calendar: CalendarSystem = gregorianCalendar): string {
  return formatCalendarDateFromDate(new Date(), false, calendar)
}

/**
 * Returns today's date using UTC calendar fields.
 *
 * Pass a Date fixture to make SSR, tests, and hydration-sensitive render paths
 * deterministic. This helper reads UTC fields only; it does not convert an
 * existing Timestamp or timezone-suffixed string. Pass a calendar system to
 * return today's UTC date in that calendar's native `YYYY-MM-DD` fields.
 *
 * @param {Date} date Date source to read. Defaults to the current Date.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {string} UTC date string in the form `YYYY-MM-DD`
 * @category state
 */
export function todayUTC(date = new Date(), calendar: CalendarSystem = gregorianCalendar): string {
  return formatCalendarDateFromDate(date, true, calendar)
}

/**
 * Returns the current date-time as an immutable Timestamp using UTC fields.
 *
 * Use this when server and client output should agree on UTC calendar and time
 * values. For fully deterministic SSR output, pass a Date captured by the
 * caller instead of allowing each runtime to create its own current Date.
 *
 * @param {Date} date Date source to read. Defaults to the current Date.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} Immutable Timestamp built from UTC fields.
 * @category state
 */
export function nowUTC(date = new Date(), calendar: CalendarSystem = gregorianCalendar): Timestamp {
  return parseDateUTC(date, calendar) as Timestamp
}

/**
 * Takes a date string ('YYYY-MM-DD') and validates if it is today's date
 * @param {string} date Date string in the form 'YYYY-MM-DD'
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {boolean} True if the date is today's date
 * @category comparison
 */
export function isToday(date: string, calendar: CalendarSystem = gregorianCalendar): boolean {
  return date === today(calendar)
}

/**
 * Checks whether a date string matches today's UTC date.
 *
 * Pass a Date fixture when SSR, tests, or hydration-sensitive render paths need
 * deterministic behavior.
 *
 * @param {string} date Date string in the form `YYYY-MM-DD`.
 * @param {Date} now Date source to read. Defaults to the current Date.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {boolean} True when the date matches the UTC date.
 * @category comparison
 */
export function isTodayUTC(
  date: string,
  now = new Date(),
  calendar: CalendarSystem = gregorianCalendar,
): boolean {
  return date === todayUTC(now, calendar)
}

/**
 * Returns the start of the week for a Timestamp and weekday set.
 * If a current Timestamp is provided, the returned Timestamp includes updated relative information.
 * @param {Timestamp} timestamp The Timestamp to use to find the start of the week
 * @param {number[]} weekdays The array is [0,1,2,3,4,5,6] where 0=Sunday and 6=Saturday
 * @param {Timestamp=} today Current timestamp used to update relative information
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} A new Timestamp representing the start of the week
 * @category ranges
 */
export function getStartOfWeek(
  timestamp: Timestamp,
  weekdays: number[],
  today: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return getCalendarStartOfWeek(timestamp, weekdays, calendar, today)
}

/**
 * Returns the end of the week for a Timestamp and weekday set.
 * If a current Timestamp is provided, the returned Timestamp includes updated relative information.
 * @param {Timestamp} timestamp The Timestamp to use to find the end of the week
 * @param {number[]} weekdays The array is [0,1,2,3,4,5,6] where 0=Sunday and 6=Saturday
 * @param {Timestamp=} today Current timestamp used to update relative information
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} A new Timestamp representing the end of the week
 * @category ranges
 */
export function getEndOfWeek(
  timestamp: Timestamp,
  weekdays: number[],
  today: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return getCalendarEndOfWeek(timestamp, weekdays, calendar, today)
}

/**
 * Finds the start of the month based on the passed in Timestamp
 * @param {Timestamp} timestamp The Timestamp to use to find the start of the month
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} A Timestamp of the start of the month
 * @category ranges
 */
export function getStartOfMonth(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return getCalendarStartOfMonth(timestamp, calendar)
}

/**
 * Finds the end of the month based on the passed in Timestamp
 * @param {Timestamp} timestamp The Timestamp to use to find the end of the month
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} A Timestamp of the end of the month
 * @category ranges
 */
export function getEndOfMonth(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return getCalendarEndOfMonth(timestamp, calendar)
}

/**
 * Converts time input into minutes since midnight.
 *
 * Strings may include seconds or milliseconds, but sub-minute precision is
 * ignored for this minute-oriented helper.
 *
 * @param input - Minutes since midnight, a time string, or an object with hour and minute fields.
 * @returns Minutes since midnight, or `false` when the input cannot be parsed.
 * @category parsing
 */
export function parseTime(
  input: number | string | { hour: number; minute: number },
): number | false {
  const type = Object.prototype.toString.call(input)
  switch (type) {
    case '[object Number]':
      // when a number is given, it's minutes since 12:00am
      return input as number
    case '[object String]': {
      // when a string is given, it's a hh:mm:ss format where seconds are optional, but not used for minute math
      const parts = PARSE_TIME.exec(input as string)
      if (!parts) {
        return false
      }
      return parseInt(parts[1]!, 10) * 60 + parseInt(parts[2] || '0', 10)
    }
    case '[object Object]':
      // when an object is given, it must have hour and minute
      if (
        typeof input !== 'object' ||
        typeof input.hour !== 'number' ||
        typeof input.minute !== 'number'
      ) {
        return false
      }
      if (typeof input === 'object' && 'hour' in input && 'minute' in input) {
        return input.hour * 60 + input.minute
      }
      return false
  }

  return false
}

/**
 * Compares two Timestamp objects for exact date, time, and timezone equality.
 *
 * @param {Timestamp} ts1 First Timestamp object.
 * @param {Timestamp} ts2 Second Timestamp object.
 * @returns {boolean} True when both timestamps match exactly.
 * @category comparison
 */
export function compareTimestamps(ts1: Timestamp, ts2: Timestamp): boolean {
  if (!ts1 || !ts2) return false

  return (
    ts1.year === ts2.year &&
    ts1.month === ts2.month &&
    ts1.day === ts2.day &&
    ts1.hour === ts2.hour &&
    ts1.minute === ts2.minute &&
    ts1.second === ts2.second &&
    ts1.millisecond === ts2.millisecond &&
    ts1.timezone === ts2.timezone
  )
}

/**
 * Compares the calendar date portion of two Timestamp objects.
 *
 * @param {Timestamp} ts1 First Timestamp object.
 * @param {Timestamp} ts2 Second Timestamp object.
 * @returns {boolean} True when both dates are the same.
 * @category comparison
 */
export function compareDate(ts1: Timestamp, ts2: Timestamp): boolean {
  return getDate(ts1) === getDate(ts2)
}

/**
 * Compares the formatted time portion of two Timestamp objects.
 *
 * @param {Timestamp} ts1 First Timestamp object.
 * @param {Timestamp} ts2 Second Timestamp object.
 * @returns {boolean} True when both times are the same.
 * @category comparison
 */
export function compareTime(ts1: Timestamp, ts2: Timestamp): boolean {
  return getTime(ts1) === getTime(ts2)
}

/**
 * Compares the formatted date and time portions of two Timestamp objects.
 *
 * @param {Timestamp} ts1 First Timestamp object.
 * @param {Timestamp} ts2 Second Timestamp object.
 * @returns {boolean} True when both date-time values are the same.
 * @category comparison
 */
export function compareDateTime(ts1: Timestamp, ts2: Timestamp): boolean {
  return getDateTime(ts1) === getDateTime(ts2)
}

/**
 * Converts a supported date or date-time string into a formatted Timestamp object.
 *
 * If `now` is supplied, the returned timestamp also includes relative flags
 * such as `past`, `current`, `future`, and `currentWeekday`.
 *
 * @param {string} input Date or date-time string, such as `YYYY-MM-DD`, `YYYY-MM-DD HH:mm:ss`, or an ISO-like value with optional milliseconds and timezone suffix.
 * @param {Timestamp} now Optional Timestamp used to calculate relative flags.
 * @returns {Timestamp} Formatted Timestamp object, or `null` when the input cannot be parsed.
 * @category parsing
 */
export function parseTimestamp(input: string, now: Timestamp | null = null): Timestamp | null {
  let timestamp = parsed(input)
  if (!timestamp) return null

  timestamp = updateFormatted(timestamp as Timestamp)

  if (now) {
    timestamp = updateRelative(timestamp as Timestamp, now, timestamp.hasTime)
  }

  return timestamp as Timestamp
}

/**
 * Converts a Timestamp date into a sortable numeric identifier.
 *
 * @param {Timestamp} timestamp Timestamp object to read.
 * @returns {number} Numeric date identifier.
 * @category conversion
 */
export function getDayIdentifier(timestamp: Timestamp): number {
  return (
    (timestamp.year ?? 0) * 100000000 +
    (timestamp.month ?? 0) * 1000000 +
    (timestamp.day ?? 0) * 10000
  )
}

/**
 * Converts a Timestamp date into a stable serial day for a calendar system.
 *
 * The default Gregorian value is the number of UTC days since 1970-01-01.
 * Alternate calendar adapters should map their year/month/day fields to the
 * same serial day space so ranges and comparisons can be calendar-agnostic.
 *
 * @param {Timestamp} timestamp Timestamp object to read.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {number} Stable serial day.
 * @category conversion
 */
export function getEpochDay(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): number {
  return calendar.toEpochDay(toCalendarDateParts(timestamp))
}

/**
 * Converts a Timestamp date into a stable serial-day identifier for a calendar system.
 *
 * This is an alias-friendly helper for calendar views that need sorted keys,
 * range comparisons, or virtualized day rows across different calendar adapters.
 *
 * @param timestamp Timestamp object to read.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Stable serial day.
 * @category calendar
 */
export function getCalendarDayIdentifier(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): number {
  return getEpochDay(timestamp, calendar)
}

/**
 * Creates stable native and Gregorian identities for a calendar timestamp.
 *
 * Use this when component APIs need to expose adapter-native values while also
 * preserving a canonical Gregorian key for storage, comparisons, or interop
 * with existing data.
 *
 * @param timestamp Timestamp object to identify.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Calendar-native date, Gregorian interop date, and shared epoch day.
 * @category calendar
 */
export function getCalendarDateIdentity(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): CalendarDateIdentity {
  const native = toCalendarDateParts(timestamp)
  const epochDay = calendar.toEpochDay(native)
  const gregorian = gregorianCalendar.fromEpochDay(epochDay)

  return Object.freeze({
    calendarId: calendar.id,
    nativeDate: formatCalendarDate(native),
    native,
    gregorianDate: formatCalendarDate(gregorian),
    gregorian,
    epochDay,
  })
}

/**
 * Returns true when calendar date fields are valid for a calendar system.
 *
 * @param date Calendar date fields to validate.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns True when year, month, and day can exist in the calendar.
 * @category calendar
 */
export function isValidCalendarDate(
  date: CalendarDateParts,
  calendar: CalendarSystem = gregorianCalendar,
): boolean {
  if (date.year < 1) return false
  if (date.month < 1 || date.month > calendar.monthsInYear(date.year)) return false
  return date.day >= 1 && date.day <= calendar.daysInMonth(date.year, date.month)
}

/**
 * Creates an immutable Timestamp-shaped value from calendar adapter fields.
 *
 * The returned timestamp uses adapter year/month/day fields, is tagged with
 * `calendarId`, and derives weekday/day-of-year values from the adapter.
 *
 * @param date Calendar date fields.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param options Optional time and relative comparison settings.
 * @returns Timestamp-shaped calendar value.
 * @category calendar
 */
export function createCalendarTimestamp(
  date: CalendarDateParts,
  calendar: CalendarSystem = gregorianCalendar,
  options: CalendarTimestampOptions = {},
): Timestamp {
  const timestamp: MutableTimestamp = {
    calendarId: calendar.id,
    date: formatCalendarDate(date),
    hasDay: true,
    year: date.year,
    month: date.month,
    day: date.day,
    hasTime: options.hasTime ?? true,
    hour: options.hour ?? 0,
    minute: options.minute ?? 0,
    past: false,
    current: false,
    future: false,
    disabled: false,
    weekday: calendar.getWeekday(date),
    doy: calendar.getDayOfYear(date),
    workweek: getCalendarWorkWeek(date, calendar),
  }

  if (options.second !== undefined) {
    timestamp.second = options.second
  }
  if (options.millisecond !== undefined) {
    timestamp.millisecond = options.millisecond
  }
  if (options.timezone !== undefined) {
    timestamp.timezone = options.timezone
  }

  timestamp.time = getTime(timestamp)

  const formatted = freezeTimestamp(timestamp)
  return options.now
    ? updateCalendarRelative(formatted, options.now, calendar, formatted.hasTime)
    : formatted
}

/**
 * Parses a date or date-time string as calendar adapter fields.
 *
 * Unlike parseTimestamp(), this helper validates the date against the supplied
 * calendar and derives weekday/day-of-year values through the adapter.
 *
 * @param input Date or date-time string.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param now Optional comparison timestamp from the same calendar system.
 * @returns Calendar timestamp, or `null` when the input cannot be parsed or validated.
 * @category calendar
 */
export function parseCalendarTimestamp(
  input: string,
  calendar: CalendarSystem = gregorianCalendar,
  now: Timestamp | null = null,
): Timestamp | null {
  const timestamp = parsed(input)
  if (timestamp === null) return null

  const date = toCalendarDateParts(timestamp)
  if (isValidCalendarDate(date, calendar) === false) return null

  return createCalendarTimestamp(date, calendar, {
    ...getCalendarTimestampOptions(timestamp),
    now,
  })
}

/**
 * Validates whether an input string can be parsed as a calendar adapter timestamp.
 *
 * The default Gregorian calendar preserves existing Timestamp semantics. When
 * an alternate calendar is supplied, `YYYY-MM-DD` is interpreted as native to
 * that adapter.
 *
 * @param input Date or date-time string.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns True when the string can be parsed and exists in the calendar.
 * @category calendar
 */
export function validateCalendarTimestamp(
  input: string,
  calendar: CalendarSystem = gregorianCalendar,
): boolean {
  return parseCalendarTimestamp(input, calendar) !== null
}

/**
 * Creates a calendar timestamp from a stable serial day.
 *
 * @param epochDay Stable serial day.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param options Optional time and relative comparison settings.
 * @returns Timestamp-shaped calendar value.
 * @category calendar
 */
export function createCalendarTimestampFromEpochDay(
  epochDay: number,
  calendar: CalendarSystem = gregorianCalendar,
  options: CalendarTimestampOptions = {},
): Timestamp {
  return createCalendarTimestamp(calendar.fromEpochDay(epochDay), calendar, options)
}

/**
 * Updates formatted calendar metadata on a timestamp-shaped value.
 *
 * @param timestamp Timestamp object to transform.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Timestamp with adapter date formatting and metadata.
 * @category calendar
 */
export function updateCalendarFormatted(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return createCalendarTimestamp(
    toCalendarDateParts(timestamp),
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Returns a timestamp with relative flags compared through a calendar adapter.
 *
 * @param timestamp Timestamp object to update.
 * @param now Timestamp representing the comparison point in the same calendar.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param time Include time-of-day in the comparison when true.
 * @returns New Timestamp object with relative flags.
 * @category calendar
 */
export function updateCalendarRelative(
  timestamp: Timestamp,
  now: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
  time = false,
): Timestamp {
  const ts = cloneTimestamp(timestamp)
  let a = getCalendarDayIdentifier(now, calendar)
  let b = getCalendarDayIdentifier(ts, calendar)
  let current = a === b

  if (ts.hasTime && time && current) {
    a = getTimeComparisonValue(now)
    b = getTimeComparisonValue(ts)
    current = a === b
  }

  ts.past = b < a
  ts.current = current
  ts.future = b > a
  ts.currentWeekday = ts.weekday === now.weekday

  return freezeTimestamp(ts)
}

/**
 * Returns a calendar timestamp for the next day.
 *
 * @param timestamp Base timestamp.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns New timestamp for the next adapter day.
 * @category calendar
 */
export function nextCalendarDay(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return createCalendarTimestamp(
    calendar.nextDay(toCalendarDateParts(timestamp)),
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Returns a calendar timestamp for the previous day.
 *
 * @param timestamp Base timestamp.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns New timestamp for the previous adapter day.
 * @category calendar
 */
export function prevCalendarDay(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return createCalendarTimestamp(
    calendar.prevDay(toCalendarDateParts(timestamp)),
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Adds a number of days through a calendar adapter.
 *
 * @param timestamp Base timestamp.
 * @param amount Number of days to move.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns New timestamp after moving.
 * @category calendar
 */
export function addCalendarDays(
  timestamp: Timestamp,
  amount: number,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return createCalendarTimestamp(
    calendar.addDays(toCalendarDateParts(timestamp), amount),
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Adds a number of months through a calendar adapter and clamps invalid days.
 *
 * @param timestamp Base timestamp.
 * @param amount Number of calendar months to move.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns New timestamp after moving.
 * @category calendar
 */
export function addCalendarMonths(
  timestamp: Timestamp,
  amount: number,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  let { year, month, day } = toCalendarDateParts(timestamp)
  let remaining = Math.trunc(amount)

  while (remaining > 0) {
    month += 1
    if (month > calendar.monthsInYear(year)) {
      year += 1
      month = 1
    }
    remaining -= 1
  }

  while (remaining < 0) {
    month -= 1
    if (month < 1) {
      year -= 1
      month = calendar.monthsInYear(year)
    }
    remaining += 1
  }

  day = Math.min(day, calendar.daysInMonth(year, month))
  return createCalendarTimestamp(
    { year, month, day },
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Adds a number of years through a calendar adapter and clamps invalid days.
 *
 * @param timestamp Base timestamp.
 * @param amount Number of calendar years to move.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns New timestamp after moving.
 * @category calendar
 */
export function addCalendarYears(
  timestamp: Timestamp,
  amount: number,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  let { year, month, day } = toCalendarDateParts(timestamp)
  year += Math.trunc(amount)
  month = Math.min(month, calendar.monthsInYear(year))
  day = Math.min(day, calendar.daysInMonth(year, month))
  return createCalendarTimestamp(
    { year, month, day },
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Returns the start of the calendar month for a timestamp.
 *
 * @param timestamp Base timestamp.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns First day of the adapter month.
 * @category calendar
 */
export function getCalendarStartOfMonth(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return createCalendarTimestamp(
    { ...toCalendarDateParts(timestamp), day: 1 },
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Returns the end of the calendar month for a timestamp.
 *
 * @param timestamp Base timestamp.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Last day of the adapter month.
 * @category calendar
 */
export function getCalendarEndOfMonth(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  const date = toCalendarDateParts(timestamp)
  return createCalendarTimestamp(
    {
      ...date,
      day: calendar.daysInMonth(date.year, date.month),
    },
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Returns the start of the calendar year for a timestamp.
 *
 * @param timestamp Base timestamp.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns First day of the adapter year.
 * @category calendar
 */
export function getCalendarStartOfYear(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return createCalendarTimestamp(
    { year: timestamp.year, month: 1, day: 1 },
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Returns the end of the calendar year for a timestamp.
 *
 * @param timestamp Base timestamp.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Last day of the adapter year.
 * @category calendar
 */
export function getCalendarEndOfYear(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  const month = calendar.monthsInYear(timestamp.year)
  return createCalendarTimestamp(
    { year: timestamp.year, month, day: calendar.daysInMonth(timestamp.year, month) },
    calendar,
    getCalendarTimestampOptions(timestamp),
  )
}

/**
 * Finds the nearest matching weekday through a calendar adapter.
 *
 * @param timestamp Base timestamp.
 * @param weekday Weekday number to find.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param direction Direction to search.
 * @param maxDays Maximum days to inspect.
 * @returns Matching timestamp, or the last inspected timestamp.
 * @category calendar
 */
export function findCalendarWeekday(
  timestamp: Timestamp,
  weekday: number,
  calendar: CalendarSystem = gregorianCalendar,
  direction: 'next' | 'prev' = 'next',
  maxDays = 6,
): Timestamp {
  let ts: Timestamp = copyTimestamp(timestamp)
  const mover = direction === 'next' ? nextCalendarDay : prevCalendarDay

  while (ts.weekday !== weekday && --maxDays >= 0) {
    ts = mover(ts, calendar)
  }

  return ts
}

/**
 * Returns the start of a calendar week for a timestamp and weekday set.
 *
 * @param timestamp Base timestamp.
 * @param weekdays Weekday numbers to include, from `0` Sunday to `6` Saturday.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param now Optional comparison timestamp from the same calendar.
 * @returns Start of the adapter week.
 * @category calendar
 */
export function getCalendarStartOfWeek(
  timestamp: Timestamp,
  weekdays: number[],
  calendar: CalendarSystem = gregorianCalendar,
  now: Timestamp | null = null,
): Timestamp {
  let start = updateCalendarFormatted(timestamp, calendar)
  if (!weekdays || !Array.isArray(weekdays)) {
    return start
  }

  if (start.day === 1 || start.weekday === 0) {
    while (!weekdays.includes(Number(start.weekday))) {
      start = nextCalendarDay(start, calendar)
    }
  }

  start = findCalendarWeekday(start, weekdays[0] as number, calendar, 'prev')
  return now ? updateCalendarRelative(start, now, calendar, start.hasTime) : start
}

/**
 * Returns the end of a calendar week for a timestamp and weekday set.
 *
 * @param timestamp Base timestamp.
 * @param weekdays Weekday numbers to include, from `0` Sunday to `6` Saturday.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param now Optional comparison timestamp from the same calendar.
 * @returns End of the adapter week.
 * @category calendar
 */
export function getCalendarEndOfWeek(
  timestamp: Timestamp,
  weekdays: number[],
  calendar: CalendarSystem = gregorianCalendar,
  now: Timestamp | null = null,
): Timestamp {
  let end = updateCalendarFormatted(timestamp, calendar)
  if (!weekdays || !Array.isArray(weekdays)) {
    return end
  }

  const lastDay = calendar.daysInMonth(end.year, end.month)
  if (lastDay === end.day || end.weekday === weekdays[weekdays.length - 1]) {
    while (!weekdays.includes(Number(end.weekday))) {
      end = prevCalendarDay(end, calendar)
    }
  }

  end = findCalendarWeekday(end, weekdays[weekdays.length - 1]!, calendar, 'next')
  return now ? updateCalendarRelative(end, now, calendar, end.hasTime) : end
}

/**
 * Creates an inclusive list of calendar adapter days between start and end.
 *
 * @param start First day in the list.
 * @param end Last day boundary for the list.
 * @param now Timestamp used to calculate relative flags.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param options Optional weekday, disabled, and size filters.
 * @returns Timestamp days for the adapter calendar.
 * @category calendar
 */
export function createCalendarDayList(
  start: Timestamp,
  end: Timestamp,
  now: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
  options: CalendarDayListOptions = {},
): Timestamp[] {
  const {
    weekdays = [0, 1, 2, 3, 4, 5, 6],
    disabledBefore,
    disabledAfter,
    disabledWeekdays = [],
    disabledDays = [],
    max = 42,
    min = 0,
  } = options
  const begin = getCalendarDayIdentifier(start, calendar)
  const stop = getCalendarDayIdentifier(end, calendar)
  const days: Timestamp[] = []
  let current = updateCalendarFormatted(start, calendar)
  let currentIdentifier = 0
  let stopped = currentIdentifier === stop

  if (stop < begin) {
    return days
  }

  while ((!stopped || days.length < min) && days.length < max) {
    currentIdentifier = getCalendarDayIdentifier(current, calendar)
    stopped = stopped || (currentIdentifier > stop && days.length >= min)
    if (stopped) {
      break
    }
    if (!weekdays.includes(Number(current.weekday))) {
      current = nextCalendarDay(current, calendar)
      continue
    }
    let day = updateCalendarFormatted(current, calendar)
    day = updateCalendarRelative(day, now, calendar)
    day = updateCalendarDisabled(
      day,
      disabledBefore,
      disabledAfter,
      disabledWeekdays,
      disabledDays,
      calendar,
    )
    days.push(day)
    current = nextCalendarDay(current, calendar)
  }

  return days
}

/**
 * Returns true when a timestamp falls outside the reference timestamp's adapter month.
 *
 * @param timestamp Timestamp to test.
 * @param reference Timestamp whose month defines the inside range.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns True when timestamp is outside reference's calendar month.
 * @category calendar
 */
export function isOutsideCalendarMonth(
  timestamp: Timestamp,
  reference: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): boolean {
  const start = getCalendarStartOfMonth(reference, calendar)
  const end = getCalendarEndOfMonth(reference, calendar)
  const targetIdentifier = getCalendarDayIdentifier(timestamp, calendar)

  return (
    targetIdentifier < getCalendarDayIdentifier(start, calendar) ||
    targetIdentifier > getCalendarDayIdentifier(end, calendar)
  )
}

/**
 * Converts a Timestamp time into a sortable numeric identifier.
 *
 * @param {Timestamp} timestamp Timestamp object to read.
 * @returns {number} Numeric time identifier.
 * @category conversion
 */
export function getTimeIdentifier(timestamp: Timestamp): number {
  return (timestamp.hour ?? 0) * 100 + (timestamp.minute ?? 0)
}

function getTimeComparisonValue(timestamp: Timestamp): number {
  return (
    (((timestamp.hour ?? 0) * TIME_CONSTANTS.MINUTES_IN.HOUR + (timestamp.minute ?? 0)) *
      TIME_CONSTANTS.SECONDS_IN.MINUTE +
      (timestamp.second ?? 0)) *
      TIME_CONSTANTS.MILLISECONDS_IN.SECOND +
    (timestamp.millisecond ?? 0)
  )
}

/**
 * Converts a Timestamp date and time into a sortable numeric identifier.
 *
 * @param {Timestamp} timestamp Timestamp object to read.
 * @returns {number} Numeric date-time identifier.
 * @category conversion
 */
export function getDayTimeIdentifier(timestamp: Timestamp): number {
  return getDayIdentifier(timestamp) + getTimeIdentifier(timestamp)
}

/**
 * Returns the difference between two Timestamps
 * @param {Timestamp} ts1 The first Timestamp
 * @param {Timestamp} ts2 The second Timestamp
 * @param {boolean=} strict Optional flag to not to return negative numbers
 * @returns {number} The difference
 * @category arithmetic
 */
export function diffTimestamp(ts1: Timestamp, ts2: Timestamp, strict = false): number {
  const utc1 = Date.UTC(
    ts1.year ?? 0,
    (ts1.month ?? 1) - 1,
    ts1.day ?? 1,
    ts1.hour ?? 0,
    ts1.minute ?? 0,
    ts1.second ?? 0,
    ts1.millisecond ?? 0,
  )
  const utc2 = Date.UTC(
    ts2.year ?? 0,
    (ts2.month ?? 1) - 1,
    ts2.day ?? 1,
    ts2.hour ?? 0,
    ts2.minute ?? 0,
    ts2.second ?? 0,
    ts2.millisecond ?? 0,
  )
  if (strict === true && utc2 < utc1) {
    // Not negative number
    // utc2 - utc1 < 0  -> utc2 < utc1 ->   NO: utc1 >= utc2
    return 0
  }
  return utc2 - utc1
}

/**
 * Returns a Timestamp with relative flags compared to a supplied `now` value.
 *
 * The returned object includes `past`, `current`, `future`, and
 * `currentWeekday` flags. Pass `true` for `time` when both values should be
 * compared at time-of-day precision.
 *
 * @param {Timestamp} timestamp Timestamp object to update.
 * @param {Timestamp} now Timestamp representing the comparison point.
 * @param {boolean=} time Include time-of-day in the comparison when true.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New Timestamp object with relative flags.
 * @category state
 */
export function updateRelative(
  timestamp: Timestamp,
  now: Timestamp,
  time = false,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  const ts = cloneTimestamp(timestamp as Timestamp)
  let a = getCalendarDayIdentifier(now, calendar)
  let b = getCalendarDayIdentifier(ts, calendar)
  let current = a === b

  if (ts.hasTime && time && current) {
    a = getTimeComparisonValue(now)
    b = getTimeComparisonValue(ts)
    current = a === b
  }

  ts.past = b < a
  ts.current = current
  ts.future = b > a
  ts.currentWeekday = ts.weekday === now.weekday

  return freezeTimestamp(ts)
}

/**
 * Returns a timestamp set to a number of minutes past midnight.
 *
 * The returned timestamp has updated hour/minute fields and clears second and
 * millisecond precision because this helper is minute-oriented.
 *
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {number} minutes The number of minutes to set from midnight
 * @param {Timestamp=} now Optional Timestamp representing current date and time
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} A new Timestamp
 * @category arithmetic
 */
export function updateMinutes(
  timestamp: Timestamp,
  minutes: number,
  now: Timestamp | null = null,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  let ts = cloneTimestamp(timestamp)
  ts.hasTime = true
  ts.hour = Math.floor(minutes / TIME_CONSTANTS.MINUTES_IN.HOUR)
  ts.minute = minutes % TIME_CONSTANTS.MINUTES_IN.HOUR
  delete ts.second
  delete ts.millisecond
  ts.time = getTime(ts)
  if (now) {
    return updateRelative(ts, now, true, calendar)
  }

  return freezeTimestamp(ts)
}

/**
 * Updates the Timestamp with the weekday
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns A new Timestamp
 * @category formatting
 */
export function updateWeekday(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  const ts = cloneTimestamp(timestamp)
  ts.weekday = getWeekday(ts, calendar)

  return freezeTimestamp(ts)
}

/**
 * Updates the Timestamp with the day of the year (doy)
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns A new Timestamp
 * @category formatting
 */
export function updateDayOfYear(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  const ts = cloneTimestamp(timestamp)
  ts.doy = getDayOfYear(ts, calendar) || 0

  return freezeTimestamp(ts)
}

/**
 * Updates the Timestamp with the workweek
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns A new Timestamp
 * @category formatting
 */
export function updateWorkWeek(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  const ts = cloneTimestamp(timestamp)
  ts.workweek = getWorkWeek(ts, calendar)

  return freezeTimestamp(ts)
}

function isDisabledDayConfig(value: DisabledDay): value is DisabledDayConfig {
  return typeof value === 'object' && value !== null && Array.isArray(value) === false
}

function applyDisabledDayConfig(
  timestamp: MutableTimestamp,
  config?: DisabledDayConfig,
): MutableTimestamp {
  timestamp.disabled = true

  if (config !== undefined) {
    timestamp.disabledColor = config.color
    timestamp.disabledTextColor = config.textColor
    timestamp.disabledClass = config.class
    timestamp.disabledStyle = config.style
    timestamp.disabledLabel = config.label
  }

  return timestamp
}

function isTimestampInDisabledDay(timestamp: Timestamp, day: DisabledDay): boolean {
  const target = getDayIdentifier(timestamp)

  if (Array.isArray(day) === true) {
    if (day.length === 2 && day[0] && day[1]) {
      const start = parsed(day[0])
      const end = parsed(day[1])

      return start !== null && end !== null && isBetweenDates(timestamp, start, end)
    }

    return day.some((date) => {
      const disabledDay = parseTimestamp(date)

      return disabledDay !== null && getDayIdentifier(disabledDay) === target
    })
  }

  if (isDisabledDayConfig(day) === true) {
    const date = day.date
    const startDate = day.from ?? day.start
    const endDate = day.to ?? day.end

    if (date !== undefined) {
      const disabledDay = parseTimestamp(date)

      return disabledDay !== null && getDayIdentifier(disabledDay) === target
    }

    if (startDate !== undefined && endDate !== undefined) {
      const start = parsed(startDate)
      const end = parsed(endDate)

      return start !== null && end !== null && isBetweenDates(timestamp, start, end)
    }

    return false
  }

  const disabledDay = parseTimestamp(day)

  return disabledDay !== null && getDayIdentifier(disabledDay) === target
}

function parseCalendarDateIdentifier(value: string, calendar: CalendarSystem): number | null {
  const timestamp = parseCalendarTimestamp(value, calendar)
  return timestamp === null ? null : getCalendarDayIdentifier(timestamp, calendar)
}

function isTimestampInCalendarDisabledDay(
  timestamp: Timestamp,
  day: DisabledDay,
  calendar: CalendarSystem,
): boolean {
  const target = getCalendarDayIdentifier(timestamp, calendar)

  if (Array.isArray(day) === true) {
    if (day.length === 2 && day[0] && day[1]) {
      const start = parseCalendarDateIdentifier(day[0], calendar)
      const end = parseCalendarDateIdentifier(day[1], calendar)

      return (
        start !== null &&
        end !== null &&
        target >= Math.min(start, end) &&
        target <= Math.max(start, end)
      )
    }

    return day.some((date) => parseCalendarDateIdentifier(date, calendar) === target)
  }

  if (isDisabledDayConfig(day) === true) {
    const date = day.date
    const startDate = day.from ?? day.start
    const endDate = day.to ?? day.end

    if (date !== undefined) {
      return parseCalendarDateIdentifier(date, calendar) === target
    }

    if (startDate !== undefined && endDate !== undefined) {
      const start = parseCalendarDateIdentifier(startDate, calendar)
      const end = parseCalendarDateIdentifier(endDate, calendar)

      return (
        start !== null &&
        end !== null &&
        target >= Math.min(start, end) &&
        target <= Math.max(start, end)
      )
    }

    return false
  }

  return parseCalendarDateIdentifier(day, calendar) === target
}

/**
 * Updates the passed Timestamp with disabled, if needed
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {string} [disabledBefore] In `YYYY-MM-DD` format
 * @param {string} [disabledAfter] In `YYYY-MM-DD` format
 * @param {number[]} [disabledWeekdays] An array of numbers representing weekdays [0 = Sun, ..., 6 = Sat]
 * @param {DisabledDays} [disabledDays] An array of days in 'YYYY-MM-DD' format. If an array with a pair of dates is in first array, then this is treated as a range. Object entries can include date/from/to plus color metadata.
 * @returns A new Timestamp
 * @category state
 */
export function updateDisabled(
  timestamp: Timestamp,
  disabledBefore?: string,
  disabledAfter?: string,
  disabledWeekdays?: number[],
  disabledDays?: DisabledDays,
): Timestamp {
  let ts = cloneTimestamp(timestamp)
  const t = getDayIdentifier(ts)

  if (disabledBefore !== undefined) {
    const disabledDay = parsed(disabledBefore)
    if (disabledDay) {
      const before = getDayIdentifier(disabledDay)
      if (t <= before) {
        ts.disabled = true
      }
    }
  }

  if (ts.disabled !== true && disabledAfter !== undefined) {
    const disabledDay = parsed(disabledAfter!)
    if (disabledDay) {
      const after = getDayIdentifier(disabledDay)
      if (t >= after) {
        ts.disabled = true
      }
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledWeekdays) && disabledWeekdays.length > 0) {
    for (const weekday in disabledWeekdays) {
      if (disabledWeekdays[weekday] === ts.weekday) {
        ts.disabled = true
        break
      }
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledDays) && disabledDays.length > 0) {
    for (const day of disabledDays) {
      if (isTimestampInDisabledDay(ts, day) === true) {
        ts = applyDisabledDayConfig(ts, isDisabledDayConfig(day) === true ? day : undefined)
        break
      }
    }
  }

  return freezeTimestamp(ts)
}

/**
 * Updates a timestamp with disabled state using calendar-native date strings.
 *
 * The default Gregorian calendar preserves existing Timestamp behavior. When
 * an alternate calendar is supplied, `disabledBefore`, `disabledAfter`, and
 * `disabledDays` are parsed as native dates for that adapter.
 *
 * @param timestamp Timestamp to transform.
 * @param disabledBefore Disable days on or before this adapter date.
 * @param disabledAfter Disable days on or after this adapter date.
 * @param disabledWeekdays Weekday numbers to mark disabled.
 * @param disabledDays Specific adapter dates or date ranges to mark disabled.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns New timestamp with disabled metadata applied.
 * @category calendar
 */
export function updateCalendarDisabled(
  timestamp: Timestamp,
  disabledBefore?: string,
  disabledAfter?: string,
  disabledWeekdays?: number[],
  disabledDays?: DisabledDays,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  let ts = cloneTimestamp(timestamp)
  const target = getCalendarDayIdentifier(ts, calendar)

  if (disabledBefore !== undefined) {
    const before = parseCalendarDateIdentifier(disabledBefore, calendar)
    if (before !== null && target <= before) {
      ts.disabled = true
    }
  }

  if (ts.disabled !== true && disabledAfter !== undefined) {
    const after = parseCalendarDateIdentifier(disabledAfter, calendar)
    if (after !== null && target >= after) {
      ts.disabled = true
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledWeekdays) && disabledWeekdays.length > 0) {
    for (const weekday of disabledWeekdays) {
      if (weekday === ts.weekday) {
        ts.disabled = true
        break
      }
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledDays) && disabledDays.length > 0) {
    for (const day of disabledDays) {
      if (isTimestampInCalendarDisabledDay(ts, day, calendar) === true) {
        ts = applyDisabledDayConfig(ts, isDisabledDayConfig(day) === true ? day : undefined)
        break
      }
    }
  }

  return freezeTimestamp(ts)
}

function isTimestampInCalendarDateCollection(
  timestamp: Timestamp,
  dates: CalendarDateCollection | undefined,
  calendar: CalendarSystem,
): boolean {
  if (dates === undefined) {
    return false
  }

  const target = getCalendarDayIdentifier(timestamp, calendar)
  for (const date of dates) {
    if (parseCalendarDateIdentifier(date, calendar) === target) {
      return true
    }
  }

  return false
}

/**
 * Resolves selected-date and selected-range state for a calendar timestamp.
 *
 * The default Gregorian calendar preserves existing Timestamp behavior. When
 * an alternate calendar is supplied, selected date strings are parsed as native
 * adapter dates.
 *
 * @param timestamp Timestamp to inspect.
 * @param options Selected dates and selected start/end dates.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Selected-date state for the timestamp.
 * @category calendar
 */
export function getCalendarSelectionState(
  timestamp: Timestamp,
  options: CalendarSelectionOptions = {},
  calendar: CalendarSystem = gregorianCalendar,
): CalendarSelectionState {
  const selectedDate = isTimestampInCalendarDateCollection(
    timestamp,
    options.selectedDates,
    calendar,
  )
  const target = getCalendarDayIdentifier(timestamp, calendar)
  const rangeBoundaryDates = options.selectedStartEndDates ?? []
  let rangeFirst = false
  let range = false
  let rangeLast = false

  if (rangeBoundaryDates.length === 2 && rangeBoundaryDates[0] && rangeBoundaryDates[1]) {
    const first = parseCalendarDateIdentifier(rangeBoundaryDates[0], calendar)
    const last = parseCalendarDateIdentifier(rangeBoundaryDates[1], calendar)

    if (first !== null && last !== null) {
      const start = Math.min(first, last)
      const end = Math.max(first, last)

      rangeFirst = target === start
      rangeLast = target === end
      range = target > start && target < end
    }
  }

  return Object.freeze({
    selectedDate,
    rangeFirst,
    range,
    rangeLast,
    selected: selectedDate || rangeFirst || range || rangeLast,
  })
}

/**
 * Resolves disabled, selected, identity, and outside-month state for one date.
 *
 * @param timestamp Timestamp to resolve.
 * @param options Calendar-aware disabled, selection, and outside-month options.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Calendar date state suitable for component scopes.
 * @category calendar
 */
export function getCalendarDateState(
  timestamp: Timestamp,
  options: CalendarDateStateOptions = {},
  calendar: CalendarSystem = gregorianCalendar,
): CalendarDateState {
  const disabledTimestamp = updateCalendarDisabled(
    timestamp,
    options.disabledBefore,
    options.disabledAfter,
    options.disabledWeekdays,
    options.disabledDays,
    calendar,
  )
  const selection = getCalendarSelectionState(disabledTimestamp, options, calendar)
  const outside =
    options.outside ??
    (options.referenceMonth === undefined
      ? false
      : isOutsideCalendarMonth(disabledTimestamp, options.referenceMonth, calendar))

  return Object.freeze({
    timestamp: disabledTimestamp,
    identity: getCalendarDateIdentity(disabledTimestamp, calendar),
    outside,
    disabled: disabledTimestamp.disabled === true,
    ...selection,
  })
}

/**
 * Creates native calendar month view state for component rendering.
 *
 * The returned `days` use adapter-native `YYYY-MM-DD` values, while each
 * state's identity also includes Gregorian interop metadata.
 *
 * @param timestamp Reference timestamp in the adapter calendar.
 * @param now Timestamp used to calculate relative flags.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param options Calendar-aware disabled, selection, weekday, and size options.
 * @returns Calendar month view state.
 * @category calendar
 */
export function createCalendarMonthView(
  timestamp: Timestamp,
  now: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
  options: CalendarMonthViewOptions = {},
): CalendarMonthView {
  const weekdays = options.weekdays ?? [0, 1, 2, 3, 4, 5, 6]
  const reference = updateCalendarFormatted(timestamp, calendar)
  const start = getCalendarStartOfMonth(reference, calendar)
  const end = getCalendarEndOfMonth(reference, calendar)
  const visibleStart = getCalendarStartOfWeek(start, weekdays, calendar, now)
  const visibleEnd = getCalendarEndOfWeek(end, weekdays, calendar, now)
  const days = createCalendarDayList(visibleStart, visibleEnd, now, calendar, {
    weekdays,
    disabledBefore: options.disabledBefore,
    disabledAfter: options.disabledAfter,
    disabledWeekdays: options.disabledWeekdays,
    disabledDays: options.disabledDays,
    max: options.max ?? weekdays.length * 6,
    min: options.min ?? weekdays.length * 6,
  }).map((day) =>
    getCalendarDateState(
      day,
      {
        ...options,
        referenceMonth: reference,
      },
      calendar,
    ),
  )

  return Object.freeze({
    reference,
    start,
    end,
    visibleStart,
    visibleEnd,
    days,
  })
}

/**
 * Updates the passed Timestamp with formatted data (time string, date string, weekday, day of year and workweek)
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns A new Timestamp
 * @category formatting
 */
export function updateFormatted(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  const ts = cloneTimestamp(timestamp)
  ts.hasTime = true
  ts.time = getTime(ts)
  ts.date = getDate(ts)
  ts.weekday = getWeekday(ts, calendar)
  ts.doy = getDayOfYear(ts, calendar) || 0
  ts.workweek = getWorkWeek(ts, calendar)

  return freezeTimestamp(ts)
}

/**
 * Returns day of the year (doy) for the passed in Timestamp
 * @param {Timestamp} timestamp The Timestamp to use
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {number} The day of the year
 * @category formatting
 */
export function getDayOfYear(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): number | void {
  if (timestamp.year === 0) return
  return calendar.getDayOfYear(toCalendarDateParts(timestamp))
}

/**
 * Returns workweek for the passed in Timestamp
 * @param {Timestamp} timestamp The Timestamp to use
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {number} The work week
 * @category formatting
 */
export function getWorkWeek(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): number {
  let ts: Timestamp = timestamp
  if (ts.year === 0) {
    const parsedToday = parseCalendarTimestamp(today(calendar), calendar)
    if (parsedToday) {
      ts = parsedToday
    }
  }

  if (calendar !== gregorianCalendar) {
    return getCalendarWorkWeek(toCalendarDateParts(ts), calendar)
  }

  // Remove time components of date
  const weekday = new Date(Date.UTC(ts.year, ts.month - 1, ts.day))

  // Adjust the date to the correct day of the week
  const dayAdjustment = 4 // thursday is 4
  weekday.setUTCDate(weekday.getUTCDate() - ((weekday.getUTCDay() + 6) % 7) + dayAdjustment)

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  weekday.setUTCDate(weekday.getUTCDate() + dayAdjustment - (weekday.getUTCDay() || 7))

  // Get first day of year
  var yearStart = new Date(Date.UTC(weekday.getUTCFullYear(), 0, 1))

  // Calculate full weeks to nearest Thursday
  var weekNumber = Math.ceil(((weekday.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7)

  return weekNumber
}

/**
 * Returns weekday for the passed in Timestamp
 * @param {Timestamp} timestamp The Timestamp to use
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {number} The weekday
 * @category formatting
 */
export function getWeekday(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): number {
  let weekday = timestamp.weekday
  if (timestamp.hasDay) {
    weekday = calendar.getWeekday(toCalendarDateParts(timestamp))
  }

  return weekday ?? 0
}

/**
 * Returns an immutable copy of a Timestamp object.
 *
 * @param {Timestamp} timestamp Timestamp object to copy.
 * @returns {Timestamp} Frozen Timestamp copy.
 * @category state
 */
export function copyTimestamp(timestamp: Timestamp): Timestamp {
  return freezeTimestamp(timestamp)
}

function setTimeParts(
  timestamp: Timestamp,
  hour: number,
  minute: number,
  second?: number,
  millisecond?: number,
): Timestamp {
  const ts = cloneTimestamp(timestamp)
  ts.hasTime = true
  ts.hour = hour
  ts.minute = minute

  if (second === undefined) {
    delete ts.second
  } else {
    ts.second = second
  }

  if (millisecond === undefined) {
    delete ts.millisecond
  } else {
    ts.millisecond = millisecond
  }

  return updateFormatted(ts)
}

/**
 * Returns a Timestamp at the start of the same calendar day.
 *
 * @param {Timestamp} timestamp Timestamp object to transform.
 * @returns {Timestamp} New Timestamp at `00:00`.
 * @category ranges
 */
export function getStartOfDay(timestamp: Timestamp): Timestamp {
  return setTimeParts(timestamp, 0, 0)
}

/**
 * Returns a Timestamp at the end of the same calendar day.
 *
 * @param {Timestamp} timestamp Timestamp object to transform.
 * @returns {Timestamp} New Timestamp at `23:59:59.999`.
 * @category ranges
 */
export function getEndOfDay(timestamp: Timestamp): Timestamp {
  return setTimeParts(timestamp, 23, 59, 59, 999)
}

/**
 * Returns a Timestamp at the start of the same calendar year.
 *
 * @param {Timestamp} timestamp Timestamp object to transform.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New Timestamp for the first calendar day of the year at `00:00`.
 * @category ranges
 */
export function getStartOfYear(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return getStartOfDay(getCalendarStartOfYear(timestamp, calendar))
}

/**
 * Returns a Timestamp at the end of the same calendar year.
 *
 * @param {Timestamp} timestamp Timestamp object to transform.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New Timestamp for the last calendar day of the year at `23:59:59.999`.
 * @category ranges
 */
export function getEndOfYear(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return getEndOfDay(getCalendarEndOfYear(timestamp, calendar))
}

/**
 * Formats the date portion of a Timestamp object.
 *
 * @param {Timestamp} timestamp Timestamp object to format.
 * @returns {string} Date string such as `YYYY-MM-DD`.
 * @category conversion
 */
export function getDate(timestamp: Timestamp): string {
  let str = `${padNumber(timestamp.year, 4)}-${padNumber(timestamp.month, 2)}`

  if (timestamp.hasDay) str += `-${padNumber(timestamp.day, 2)}`

  return str
}

/**
 * Formats the time portion of a Timestamp object.
 *
 * Minute precision is formatted as `HH:mm`; second precision as `HH:mm:ss`;
 * millisecond precision as `HH:mm:ss.SSS`.
 *
 * @param {Timestamp} timestamp Timestamp object to format.
 * @returns {string} Time string, or an empty string when the timestamp has no time.
 * @category conversion
 */
export function getTime(timestamp: Timestamp): string {
  if (!timestamp.hasTime) {
    return ''
  }

  let time = `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`
  if (timestamp.second !== undefined || timestamp.millisecond !== undefined) {
    time += `:${padNumber(timestamp.second ?? 0, 2)}`
  }
  if (timestamp.millisecond !== undefined) {
    time += `.${padNumber(timestamp.millisecond, 3)}`
  }

  return time
}

/**
 * Formats a Timestamp as date plus time.
 *
 * @param {Timestamp} timestamp Timestamp object to format.
 * @returns {string} Date-time string such as `YYYY-MM-DD HH:mm`.
 * @category conversion
 */
export function getDateTime(timestamp: Timestamp): string {
  return getDate(timestamp) + ' ' + (timestamp.hasTime ? getTime(timestamp) : '00:00')
}

/**
 * Alias for relativeDays.
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {function} [mover=nextDay] The mover function to use (ie: {nextDay} or {prevDay}).
 * @param {number} [days=1] The number of days to move.
 * @param {number[]} [allowedWeekdays=[ 0, 1, 2, 3, 4, 5, 6 ]] An array of numbers representing the weekdays. ie: [0 = Sun, ..., 6 = Sat].
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns A new Timestamp
 * @category ranges
 */
export function moveRelativeDays(
  timestamp: Timestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  return relativeDays(timestamp, mover, days, allowedWeekdays, calendar)
}

/**
 * Moves the Timestamp the number of relative days
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {function} [mover=nextDay] The mover function to use (ie: {nextDay} or {prevDay}).
 * @param {number} [days=1] The number of days to move.
 * @param {number[]} [allowedWeekdays=[ 0, 1, 2, 3, 4, 5, 6 ]] An array of numbers representing the weekdays. ie: [0 = Sun, ..., 6 = Sat].
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns A new Timestamp
 * @category ranges
 */
export function relativeDays(
  timestamp: Timestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  let ts: Timestamp = copyTimestamp(timestamp)
  if (!allowedWeekdays.includes(Number(ts.weekday)) && ts.weekday === 0 && mover === nextDay) {
    ++days
  }
  while (--days >= 0) {
    ts = mover(ts, calendar)
    if (allowedWeekdays.length < 7 && !allowedWeekdays.includes(Number(ts.weekday))) {
      ++days
    }
  }

  return ts
}

/**
 * Finds the specified weekday (forward or back) based on the Timestamp
 * @param {Timestamp} timestamp The Timestamp to transform
 * @param {number} weekday The weekday number (Sun = 0, ..., Sat = 6)
 * @param {function} [mover=nextDay] The function to use ({prevDay} or {nextDay}).
 * @param {number} [maxDays=6] The number of days to look forward or back.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns A new Timestamp
 * @category ranges
 */
export function findWeekday(
  timestamp: Timestamp,
  weekday: number,
  mover = nextDay,
  maxDays = 6,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  let ts: Timestamp = copyTimestamp(timestamp)
  while (ts.weekday !== weekday && --maxDays >= 0) ts = mover(ts, calendar)
  return ts
}

/**
 * Creates an inclusive list of Timestamp days between start and end.
 *
 * The returned days are formatted, marked with relative flags against `now`,
 * and can include disabled metadata when disabled options are supplied.
 *
 * @param {Timestamp} start First day in the list.
 * @param {Timestamp} end Last day boundary for the list.
 * @param {Timestamp} now Timestamp used to calculate relative flags.
 * @param {number[]} weekdays Weekday numbers to include, from `0` Sunday to `6` Saturday.
 * @param {string} [disabledBefore] Disable days before this `YYYY-MM-DD` date.
 * @param {string} [disabledAfter] Disable days after this `YYYY-MM-DD` date.
 * @param {number[]} [disabledWeekdays] Weekday numbers to mark disabled.
 * @param {DisabledDays} [disabledDays] Specific dates or date ranges to mark disabled.
 * @param {number} [max=42] Maximum number of days to return.
 * @param {number} [min=0] Minimum number of days to return.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp[]} Timestamp days.
 * @category ranges
 */
export function createDayList(
  start: Timestamp,
  end: Timestamp,
  now: Timestamp,
  weekdays: number[] = [0, 1, 2, 3, 4, 5, 6],
  disabledBefore: string | undefined = undefined,
  disabledAfter: string | undefined = undefined,
  disabledWeekdays: number[] = [],
  disabledDays: DisabledDays = [],
  max = 42,
  min = 0,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp[] {
  if (calendar !== gregorianCalendar) {
    return createCalendarDayList(start, end, now, calendar, {
      weekdays,
      disabledBefore,
      disabledAfter,
      disabledWeekdays,
      disabledDays,
      max,
      min,
    })
  }

  const begin = getDayIdentifier(start)
  const stop = getDayIdentifier(end)
  const days: Timestamp[] = []
  let current: Timestamp = copyTimestamp(start)
  let currentIdentifier = 0
  let stopped = currentIdentifier === stop

  if (stop < begin) {
    return days
  }

  while ((!stopped || days.length < min) && days.length < max) {
    currentIdentifier = getDayIdentifier(current)
    stopped = stopped || (currentIdentifier > stop && days.length >= min)
    if (stopped) {
      break
    }
    if (!weekdays.includes(Number(current.weekday))) {
      current = relativeDays(current, nextDay)
      continue
    }
    let day: Timestamp = copyTimestamp(current)
    day = updateFormatted(day)
    day = updateRelative(day, now)
    day = updateDisabled(day, disabledBefore, disabledAfter, disabledWeekdays, disabledDays)
    days.push(day)
    current = relativeDays(current, nextDay)
  }

  return days
}

/**
 * Creates an array of interval Timestamp objects for one day.
 *
 * @param {Timestamp} timestamp Base date for the intervals.
 * @param {number} first Starting interval index.
 * @param {number} minutes Minutes between intervals, such as 60, 30, or 15.
 * @param {number} count Number of intervals to create.
 * @param {Timestamp} now Timestamp used to calculate relative flags.
 * @returns {Timestamp[]} Interval Timestamp objects.
 * @category ranges
 */
export function createIntervalList(
  timestamp: Timestamp,
  first: number,
  minutes: number,
  count: number,
  now: Timestamp,
): Timestamp[] {
  const intervals: Timestamp[] = []

  for (let i = 0; i < count; ++i) {
    const mins = (first + i) * minutes
    intervals.push(updateMinutes(timestamp, mins, now))
  }

  return intervals
}

/**
 * Callback that returns `Intl.DateTimeFormat` options for a timestamp.
 *
 * Used by createNativeLocaleFormatter to let callers switch between
 * long and short formatting styles per timestamp.
 */
export type LocaleFormatter = (_timestamp: Timestamp, _short: boolean) => Intl.DateTimeFormatOptions

/**
 * Function that formats a weekday key for a locale.
 */
export type WeekdayFormatter = (
  _weekday: keyof typeof weekdayDateMap,
  _type: string,
  _locale?: string,
) => string

/**
 * Function that formats a zero-based month number for a locale.
 */
export type MonthFormatter = (_month: number, _type?: string, _locale?: string) => string

/**
 * Function that formats a one-based calendar adapter month number for a locale.
 */
export type CalendarMonthFormatter = (
  _month: number,
  _type?: string,
  _locale?: string,
  _year?: number,
) => string

/**
 * @callback getOptions
 * @param {Timestamp} timestamp A Timestamp object
 * @param {boolean} short True if using short options
 * @returns {Object} An Intl object representing options to be used
 */

/**
 * @callback formatter
 * @param {Timestamp} timestamp The Timestamp being used
 * @param {boolean} short If short format is being requested
 * @returns {string} The localized string of the formatted Timestamp
 */

function createNativeLocaleFormatterByMode(
  locale: string,
  cb: LocaleFormatter,
  toDate: (timestamp: Timestamp) => Date,
): (_timestamp: Timestamp, _short: boolean) => string {
  const emptyFormatter = (): string => ''

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter
  }

  return (timestamp: Timestamp, short: boolean): string => {
    try {
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, cb(timestamp, short))
      return intlFormatter.format(toDate(timestamp))
    } catch (e) {
      console.error(`Intl.DateTimeFormat: ${(e as Error).message} -> ${getDateTime(timestamp)}`)
      return ''
    }
  }
}

/**
 * Returns a host-local locale formatter backed by `Intl.DateTimeFormat`.
 *
 * The helper is SSR-safe: if `Intl.DateTimeFormat` is unavailable in a target
 * runtime, it returns a formatter that produces an empty string instead of
 * throwing during module load.
 *
 * Use `createNativeLocaleFormatterUTC()` when Timestamp values should be read
 * as UTC fields before formatting.
 *
 * @param {string} locale The locale to use (ie: en-US)
 * @param {getOptions} cb The function to call for options. This function should return an Intl formatted object. The function is passed (timestamp, short).
 * @returns {formatter} The function has params (timestamp, short). The short is to use the short options.
 * @category locale
 */
export function createNativeLocaleFormatter(
  locale: string,
  cb: LocaleFormatter,
): (_timestamp: Timestamp, _short: boolean) => string {
  return createNativeLocaleFormatterByMode(locale, cb, makeDateTime)
}

/**
 * Returns a UTC locale formatter backed by `Intl.DateTimeFormat`.
 *
 * This helper constructs the native `Date` with UTC fields before formatting.
 * Pair it with `timeZone: "UTC"` when calendar labels must remain pinned to
 * the Timestamp's UTC date instead of the viewer's local timezone.
 *
 * @param {string} locale The locale to use (ie: en-US)
 * @param {getOptions} cb The function to call for options. This function should return an Intl formatted object. The function is passed (timestamp, short).
 * @returns {formatter} The function has params (timestamp, short). The short is to use the short options.
 * @category locale
 */
export function createNativeLocaleFormatterUTC(
  locale: string,
  cb: LocaleFormatter,
): (_timestamp: Timestamp, _short: boolean) => string {
  return createNativeLocaleFormatterByMode(locale, cb, makeDateTimeUTC)
}

/**
 * Returns a UTC locale formatter for a calendar adapter.
 *
 * The formatter converts adapter date fields through the adapter's serial day
 * before constructing the native Date. When the adapter has an Intl calendar id,
 * it is supplied to Intl.DateTimeFormat unless the caller already provided a
 * `calendar` option. The helper supplies `timeZone: "UTC"` unless the caller
 * provides a different timezone.
 *
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param locale The locale to use.
 * @param cb Callback that returns Intl formatting options.
 * @returns Function that formats a calendar timestamp.
 * @category calendar
 */
export function createCalendarLocaleFormatterUTC(
  calendar: CalendarSystem,
  locale: string,
  cb: LocaleFormatter,
): (_timestamp: Timestamp, _short: boolean) => string {
  return createNativeLocaleFormatterByMode(
    locale,
    (timestamp, short) => {
      const options = cb(timestamp, short) as Intl.DateTimeFormatOptions & {
        calendar?: string
      }
      const resolvedOptions =
        options.timeZone === undefined
          ? {
              ...options,
              timeZone: 'UTC',
            }
          : options

      if (calendar.intlCalendar === undefined || resolvedOptions.calendar !== undefined) {
        return resolvedOptions
      }

      return {
        ...resolvedOptions,
        calendar: calendar.intlCalendar,
      }
    },
    (timestamp) => makeCalendarDateTimeUTC(timestamp, calendar),
  )
}

/**
 * Converts a Timestamp date into a host-local JavaScript Date.
 *
 * @param {Timestamp} timestamp Timestamp object to convert.
 * @returns {Date} Host-local JavaScript Date object.
 * @category conversion
 */
export function makeDate(timestamp: Timestamp): Date {
  return new Date(timestamp.year, timestamp.month - 1, timestamp.day, 0, 0)
}

/**
 * Converts a Timestamp date into a UTC JavaScript Date.
 *
 * @param {Timestamp} timestamp Timestamp object to convert.
 * @returns {Date} JavaScript Date object built with `Date.UTC()`.
 * @category conversion
 */
export function makeDateUTC(timestamp: Timestamp): Date {
  return new Date(Date.UTC(timestamp.year, timestamp.month - 1, timestamp.day, 0, 0))
}

/**
 * Converts an adapter calendar timestamp date into a UTC JavaScript Date.
 *
 * The native Date always represents the equivalent Gregorian civil day so Intl
 * can format the adapter date correctly when paired with a calendar option.
 *
 * @param timestamp Calendar timestamp object to convert.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns JavaScript Date object built with `Date.UTC()`.
 * @category calendar
 */
export function makeCalendarDateUTC(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Date {
  const date = gregorianCalendar.fromEpochDay(getCalendarDayIdentifier(timestamp, calendar))
  return new Date(Date.UTC(date.year, date.month - 1, date.day, 0, 0))
}

/**
 * Converts a Timestamp date and time into a host-local JavaScript Date.
 *
 * @param {Timestamp} timestamp Timestamp object to convert.
 * @returns {Date} Host-local JavaScript Date object.
 * @category conversion
 */
export function makeDateTime(timestamp: Timestamp): Date {
  return new Date(
    timestamp.year,
    timestamp.month - 1,
    timestamp.day,
    timestamp.hour,
    timestamp.minute,
    timestamp.second ?? 0,
    timestamp.millisecond ?? 0,
  )
}

/**
 * Converts an adapter calendar timestamp date-time into a UTC JavaScript Date.
 *
 * @param timestamp Calendar timestamp object to convert.
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns JavaScript Date object built with `Date.UTC()`.
 * @category calendar
 */
export function makeCalendarDateTimeUTC(
  timestamp: Timestamp,
  calendar: CalendarSystem = gregorianCalendar,
): Date {
  const date = gregorianCalendar.fromEpochDay(getCalendarDayIdentifier(timestamp, calendar))
  return new Date(
    Date.UTC(
      date.year,
      date.month - 1,
      date.day,
      timestamp.hour,
      timestamp.minute,
      timestamp.second ?? 0,
      timestamp.millisecond ?? 0,
    ),
  )
}

/**
 * Converts a Timestamp date and time into a UTC JavaScript Date.
 *
 * @param {Timestamp} timestamp Timestamp object to convert.
 * @returns {Date} JavaScript Date object built with `Date.UTC()`.
 * @category conversion
 */
export function makeDateTimeUTC(timestamp: Timestamp): Date {
  return new Date(
    Date.UTC(
      timestamp.year,
      timestamp.month - 1,
      timestamp.day,
      timestamp.hour,
      timestamp.minute,
      timestamp.second ?? 0,
      timestamp.millisecond ?? 0,
    ),
  )
}

/**
 * Converts a Timestamp into Unix milliseconds by reading its fields as UTC.
 *
 * This is deterministic across server and client runtimes. It does not read or
 * convert the optional `timezone` suffix stored on the Timestamp.
 *
 * @param {Timestamp} timestamp Timestamp object to convert.
 * @returns {number} Unix milliseconds.
 * @category conversion
 */
export function toUnixMilliseconds(timestamp: Timestamp): number {
  return makeDateTimeUTC(timestamp).getTime()
}

/**
 * Converts a Timestamp into Unix seconds by reading its fields as UTC.
 *
 * Milliseconds are floored because Unix seconds are integer-oriented.
 *
 * @param {Timestamp} timestamp Timestamp object to convert.
 * @returns {number} Unix seconds.
 * @category conversion
 */
export function toUnixSeconds(timestamp: Timestamp): number {
  return Math.floor(toUnixMilliseconds(timestamp) / MILLISECONDS_IN_SECOND)
}

/**
 * Converts Unix milliseconds into an immutable Timestamp using UTC fields.
 *
 * @param {number} milliseconds Unix milliseconds.
 * @returns {Timestamp | null} Timestamp built from UTC fields, or `null` for invalid input.
 * @category conversion
 */
export function fromUnixMilliseconds(milliseconds: number): Timestamp | null {
  return parseDateUTC(new Date(milliseconds))
}

/**
 * Converts Unix seconds into an immutable Timestamp using UTC fields.
 *
 * @param {number} seconds Unix seconds.
 * @returns {Timestamp | null} Timestamp built from UTC fields, or `null` for invalid input.
 * @category conversion
 */
export function fromUnixSeconds(seconds: number): Timestamp | null {
  return fromUnixMilliseconds(seconds * MILLISECONDS_IN_SECOND)
}

/**
 * Converts a Timestamp to a local JavaScript Date.
 *
 * This is equivalent to `makeDateTime(timestamp)`.
 *
 * @param {Timestamp} timestamp Timestamp object to convert.
 * @returns {Date} Local JavaScript Date object.
 * @category conversion
 */
export function getDateObject(timestamp: Timestamp): Date {
  return makeDateTime(timestamp)
}

/**
 * Validates if the input is a finite number.
 *
 * @param input - The value to be validated. Can be a string or a number.
 * @returns A boolean indicating whether the input is a finite number.
 *          Returns true if the input is a finite number, false otherwise.
 * @category validation
 */
export function validateNumber(input: string | number): boolean {
  return isFinite(Number(input))
}

/**
 * Finds the latest Timestamp in an array.
 *
 * @param {Timestamp[]} timestamps Timestamp objects to compare.
 * @param {boolean=} useTime Include time-of-day in the comparison when true.
 * @returns Latest Timestamp object.
 * @category comparison
 */
export function maxTimestamp(timestamps: Timestamp[], useTime = false): Timestamp {
  const func = useTime === true ? getDayTimeIdentifier : getDayIdentifier
  return timestamps.reduce((prev, cur) => {
    return Math.max(func(prev), func(cur)) === func(prev) ? prev : cur
  })
}

/**
 * Finds the earliest Timestamp in an array.
 *
 * @param {Timestamp[]} timestamps Timestamp objects to compare.
 * @param {boolean=} useTime Include time-of-day in the comparison when true.
 * @returns Earliest Timestamp object.
 * @category comparison
 */
export function minTimestamp(timestamps: Timestamp[], useTime = false): Timestamp {
  const func = useTime === true ? getDayTimeIdentifier : getDayIdentifier
  return timestamps.reduce((prev, cur) => {
    return Math.min(func(prev), func(cur)) === func(prev) ? prev : cur
  })
}

function getTimestampSortValue(timestamp: Timestamp, useTime: boolean): number {
  if (useTime === true) {
    return toUnixMilliseconds(timestamp)
  }

  return getEpochDay(timestamp) * MILLISECONDS_IN_DAY
}

function compareTimestampOrder(first: Timestamp, second: Timestamp, useTime: boolean): number {
  return getTimestampSortValue(first, useTime) - getTimestampSortValue(second, useTime)
}

function createFrozenRange(start: Timestamp, end: Timestamp): TimestampRange {
  return Object.freeze({ start: copyTimestamp(start), end: copyTimestamp(end) })
}

function isRangeTouchingOrOverlapping(
  first: TimestampRange,
  second: TimestampRange,
  useTime: boolean,
): boolean {
  const step = useTime ? 1 : MILLISECONDS_IN_DAY
  return (
    getTimestampSortValue(second.start, useTime) <= getTimestampSortValue(first.end, useTime) + step
  )
}

function moveBoundary(timestamp: Timestamp, amount: number, useTime: boolean): Timestamp {
  if (useTime === true) {
    return fromUnixMilliseconds(toUnixMilliseconds(timestamp) + amount) as Timestamp
  }

  return addToDate(timestamp, { day: amount })
}

/**
 * Creates an inclusive Timestamp range and normalizes start/end order.
 *
 * @param {Timestamp} start First boundary.
 * @param {Timestamp} end Second boundary.
 * @param {boolean=} useTime Include time-of-day when ordering boundaries.
 * @returns {TimestampRange} Frozen inclusive Timestamp range.
 * @category ranges
 */
export function createTimestampRange(
  start: Timestamp,
  end: Timestamp,
  useTime = false,
): TimestampRange {
  if (compareTimestampOrder(start, end, useTime) <= 0) {
    return createFrozenRange(start, end)
  }

  return createFrozenRange(end, start)
}

/**
 * Checks whether a Timestamp falls inside an inclusive TimestampRange.
 *
 * @param {Timestamp} timestamp Timestamp object to test.
 * @param {TimestampRange} range Inclusive range to test against.
 * @param {boolean=} useTime Include time-of-day in the comparison.
 * @returns {boolean} True when the timestamp is inside the range.
 * @category comparison
 */
export function isTimestampInRange(
  timestamp: Timestamp,
  range: TimestampRange,
  useTime = false,
): boolean {
  return isBetweenDates(timestamp, range.start, range.end, useTime)
}

/**
 * Checks whether two inclusive TimestampRange values overlap.
 *
 * @param {TimestampRange} first First range.
 * @param {TimestampRange} second Second range.
 * @param {boolean=} useTime Include time-of-day in the comparison.
 * @returns {boolean} True when the ranges overlap.
 * @category comparison
 */
export function isRangeOverlapping(
  first: TimestampRange,
  second: TimestampRange,
  useTime = false,
): boolean {
  const firstRange = createTimestampRange(first.start, first.end, useTime)
  const secondRange = createTimestampRange(second.start, second.end, useTime)
  return (
    getTimestampSortValue(firstRange.start, useTime) <=
      getTimestampSortValue(secondRange.end, useTime) &&
    getTimestampSortValue(secondRange.start, useTime) <=
      getTimestampSortValue(firstRange.end, useTime)
  )
}

/**
 * Returns the inclusive intersection of two TimestampRange values.
 *
 * @param {TimestampRange} first First range.
 * @param {TimestampRange} second Second range.
 * @param {boolean=} useTime Include time-of-day in the comparison.
 * @returns {TimestampRange | null} Intersected range, or `null` when the ranges do not overlap.
 * @category ranges
 */
export function intersectRanges(
  first: TimestampRange,
  second: TimestampRange,
  useTime = false,
): TimestampRange | null {
  if (isRangeOverlapping(first, second, useTime) === false) {
    return null
  }

  const start =
    compareTimestampOrder(first.start, second.start, useTime) >= 0 ? first.start : second.start
  const end = compareTimestampOrder(first.end, second.end, useTime) <= 0 ? first.end : second.end

  return createTimestampRange(start, end, useTime)
}

/**
 * Merges overlapping or touching TimestampRange values.
 *
 * Date-only ranges touch when the next range starts on the next calendar day.
 * Time-aware ranges touch when the next range starts one millisecond after the
 * previous range ends.
 *
 * @param {TimestampRange[]} ranges Ranges to merge.
 * @param {boolean=} useTime Include time-of-day in the comparison.
 * @returns {TimestampRange[]} Merged ranges sorted by start boundary.
 * @category ranges
 */
export function mergeRanges(ranges: TimestampRange[], useTime = false): TimestampRange[] {
  const sorted = ranges
    .map((range) => createTimestampRange(range.start, range.end, useTime))
    .sort((a, b) => compareTimestampOrder(a.start, b.start, useTime))

  const merged: TimestampRange[] = []

  for (const range of sorted) {
    const last = merged[merged.length - 1]

    if (last === undefined || isRangeTouchingOrOverlapping(last, range, useTime) === false) {
      merged.push(range)
      continue
    }

    const end = compareTimestampOrder(last.end, range.end, useTime) >= 0 ? last.end : range.end
    merged[merged.length - 1] = createFrozenRange(last.start, end)
  }

  return merged
}

/**
 * Subtracts blocked ranges from a source range.
 *
 * The result is useful for availability windows because it returns the pieces
 * of the source range that remain after each blocked range is removed.
 *
 * @param {TimestampRange} source Source range.
 * @param {TimestampRange[]} blocked Ranges to remove from the source.
 * @param {boolean=} useTime Include time-of-day in the comparison.
 * @returns {TimestampRange[]} Remaining ranges.
 * @category ranges
 */
export function subtractRanges(
  source: TimestampRange,
  blocked: TimestampRange[],
  useTime = false,
): TimestampRange[] {
  const normalizedSource = createTimestampRange(source.start, source.end, useTime)
  const blockers = mergeRanges(blocked, useTime)
  let available: TimestampRange[] = [normalizedSource]

  for (const blocker of blockers) {
    const nextAvailable: TimestampRange[] = []

    for (const range of available) {
      const overlap = intersectRanges(range, blocker, useTime)

      if (overlap === null) {
        nextAvailable.push(range)
        continue
      }

      if (compareTimestampOrder(range.start, overlap.start, useTime) < 0) {
        nextAvailable.push(
          createTimestampRange(range.start, moveBoundary(overlap.start, -1, useTime), useTime),
        )
      }

      if (compareTimestampOrder(overlap.end, range.end, useTime) < 0) {
        nextAvailable.push(
          createTimestampRange(moveBoundary(overlap.end, 1, useTime), range.end, useTime),
        )
      }
    }

    available = nextAvailable
  }

  return available
}

/**
 * Finds open gaps inside a source range after occupied ranges are removed.
 *
 * This is an alias for subtractRanges() with naming that reads naturally in
 * booking, resource, and availability workflows.
 *
 * @param {TimestampRange} source Source range.
 * @param {TimestampRange[]} occupied Ranges that are not available.
 * @param {boolean=} useTime Include time-of-day in the comparison.
 * @returns {TimestampRange[]} Gap ranges.
 * @category ranges
 */
export function findRangeGaps(
  source: TimestampRange,
  occupied: TimestampRange[],
  useTime = false,
): TimestampRange[] {
  return subtractRanges(source, occupied, useTime)
}

/**
 * Checks whether a Timestamp falls inside an inclusive range.
 *
 * @param {Timestamp} timestamp Timestamp object to test.
 * @param {Timestamp} startTimestamp Inclusive start boundary.
 * @param {Timestamp} endTimestamp Inclusive end boundary.
 * @param {boolean=} useTime Include time-of-day in the comparison when true.
 * @returns {boolean} True when the timestamp is inside the range.
 * @category comparison
 */
export function isBetweenDates(
  timestamp: Timestamp,
  startTimestamp: Timestamp,
  endTimestamp: Timestamp,
  useTime = false,
): boolean {
  const cd = getDayIdentifier(timestamp) + (useTime === true ? getTimeIdentifier(timestamp) : 0)
  const sd =
    getDayIdentifier(startTimestamp) + (useTime === true ? getTimeIdentifier(startTimestamp) : 0)
  const ed =
    getDayIdentifier(endTimestamp) + (useTime === true ? getTimeIdentifier(endTimestamp) : 0)

  return cd >= sd && cd <= ed
}

/**
 * Checks whether two inclusive Timestamp ranges overlap.
 *
 * @param {Timestamp} startTimestamp Start of the first range.
 * @param {Timestamp} endTimestamp End of the first range.
 * @param {Timestamp} firstTimestamp Start of the second range.
 * @param {Timestamp} lastTimestamp End of the second range.
 * @returns {boolean} True when the ranges overlap.
 * @category comparison
 */
export function isOverlappingDates(
  startTimestamp: Timestamp,
  endTimestamp: Timestamp,
  firstTimestamp: Timestamp,
  lastTimestamp: Timestamp,
): boolean {
  const start = getDayIdentifier(startTimestamp)
  const end = getDayIdentifier(endTimestamp)
  const first = getDayIdentifier(firstTimestamp)
  const last = getDayIdentifier(lastTimestamp)
  return (
    (start >= first && start <= last) || // overlap left
    (end >= first && end <= last) || // overlap right
    (first >= start && end >= last) // surrounding
  )
}

/**
 * Date and time offsets accepted by addToDate() and addToDateClamped().
 *
 * Positive values add time; negative values subtract time. The result is
 * normalized through JavaScript Date rules, so overflowing months, days,
 * seconds, or milliseconds roll into adjacent fields.
 */
export interface AddToDateOptions {
  /**
   * Number of years to add or subtract.
   */
  year?: number

  /**
   * Number of months to add or subtract.
   */
  month?: number

  /**
   * Number of days to add or subtract.
   */
  day?: number

  /**
   * Number of hours to add or subtract.
   */
  hour?: number

  /**
   * Number of minutes to add or subtract.
   */
  minute?: number

  /**
   * Number of seconds to add or subtract.
   */
  second?: number

  /**
   * Number of milliseconds to add or subtract.
   */
  millisecond?: number
}

/**
 * Adds or subtracts date/time units from a timestamp.
 *
 * This function returns a new frozen Timestamp; it does not mutate the
 * timestamp passed in. Invalid target dates are normalized through JavaScript
 * Date rules, so month overflow can roll into the following month.
 *
 * @param {Timestamp} timestamp Timestamp object to offset.
 * @param {Object} options Date/time units to add or subtract.
 * @param {number=} options.year If positive, adds years. If negative, removes years.
 * @param {number=} options.month If positive, adds months. If negative, removes month.
 * @param {number=} options.day If positive, adds days. If negative, removes days.
 * @param {number=} options.hour If positive, adds hours. If negative, removes hours.
 * @param {number=} options.minute If positive, adds minutes. If negative, removes minutes.
 * @param {number=} options.second If positive, adds seconds. If negative, removes seconds.
 * @param {number=} options.millisecond If positive, adds milliseconds. If negative, removes milliseconds.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New normalized Timestamp object.
 * @category arithmetic
 */
function addToCalendarDateTime(
  timestamp: Timestamp,
  options: AddToDateOptions,
  calendar: CalendarSystem,
): Timestamp {
  let ts = updateCalendarFormatted(timestamp, calendar)

  if (options.year) ts = addCalendarYears(ts, options.year, calendar)
  if (options.month) ts = addCalendarMonths(ts, options.month, calendar)
  if (options.day) ts = addCalendarDays(ts, options.day, calendar)

  const hasTimeOffset =
    options.hour !== undefined ||
    options.minute !== undefined ||
    options.second !== undefined ||
    options.millisecond !== undefined

  if (hasTimeOffset) {
    const totalMilliseconds =
      (ts.hour + (options.hour ?? 0)) * MILLISECONDS_IN_HOUR +
      (ts.minute + (options.minute ?? 0)) * MILLISECONDS_IN_MINUTE +
      ((ts.second ?? 0) + (options.second ?? 0)) * MILLISECONDS_IN_SECOND +
      ((ts.millisecond ?? 0) + (options.millisecond ?? 0))
    const dayOffset = Math.floor(totalMilliseconds / MILLISECONDS_IN_DAY)
    let timeMilliseconds = totalMilliseconds % MILLISECONDS_IN_DAY

    if (timeMilliseconds < 0) {
      timeMilliseconds += MILLISECONDS_IN_DAY
    }
    if (dayOffset !== 0) {
      ts = addCalendarDays(ts, dayOffset, calendar)
    }

    const next = cloneTimestamp(ts)
    next.hasTime = true
    next.hour = Math.floor(timeMilliseconds / MILLISECONDS_IN_HOUR)
    timeMilliseconds %= MILLISECONDS_IN_HOUR
    next.minute = Math.floor(timeMilliseconds / MILLISECONDS_IN_MINUTE)
    timeMilliseconds %= MILLISECONDS_IN_MINUTE
    next.second = Math.floor(timeMilliseconds / MILLISECONDS_IN_SECOND)
    next.millisecond = timeMilliseconds % MILLISECONDS_IN_SECOND
    if (next.second === 0 && timestamp.second === undefined && options.second === undefined) {
      delete next.second
    }
    if (
      next.millisecond === 0 &&
      timestamp.millisecond === undefined &&
      options.millisecond === undefined
    ) {
      delete next.millisecond
    }
    ts = next
  }

  return updateCalendarFormatted(ts, calendar)
}

/**
 * Adds or subtracts date/time units from a timestamp.
 *
 * This function returns a new frozen Timestamp; it does not mutate the
 * timestamp passed in. Gregorian dates are normalized through JavaScript Date
 * rules. Adapter-native dates use the supplied calendar system for year,
 * month, and day math.
 *
 * @param {Timestamp} timestamp Timestamp object to offset.
 * @param {Object} options Date/time units to add or subtract.
 * @param {number=} options.year If positive, adds years. If negative, removes years.
 * @param {number=} options.month If positive, adds months. If negative, removes month.
 * @param {number=} options.day If positive, adds days. If negative, removes days.
 * @param {number=} options.hour If positive, adds hours. If negative, removes hours.
 * @param {number=} options.minute If positive, adds minutes. If negative, removes minutes.
 * @param {number=} options.second If positive, adds seconds. If negative, removes seconds.
 * @param {number=} options.millisecond If positive, adds milliseconds. If negative, removes milliseconds.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New normalized Timestamp object.
 * @category arithmetic
 */
export function addToDate(
  timestamp: Timestamp,
  options: AddToDateOptions,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  if (calendar !== gregorianCalendar) {
    return addToCalendarDateTime(timestamp, options, calendar)
  }

  const ts = cloneTimestamp(timestamp)

  if (options.year) ts.year += options.year
  if (options.month) ts.month += options.month
  if (options.day) ts.day += options.day
  if (options.hour) ts.hour += options.hour
  if (options.minute) ts.minute += options.minute
  if (options.second) ts.second = (ts.second ?? 0) + options.second
  if (options.millisecond) ts.millisecond = (ts.millisecond ?? 0) + options.millisecond

  return updateFormatted(normalizeTimestamp(ts))
}

/**
 * Adds or subtracts date/time units from a timestamp while clamping invalid
 * target month days to the last valid day in the target month.
 *
 * This helper is useful for calendar and billing workflows where adding one
 * month to January 31 should produce February 28/29 instead of rolling into
 * March. Day and time offsets still use normal JavaScript Date normalization
 * after the year/month clamp is applied.
 *
 * This function returns a new frozen Timestamp; it does not mutate the
 * timestamp passed in.
 *
 * @param {Timestamp} timestamp Timestamp object to offset.
 * @param {Object} options Date/time units to add or subtract.
 * @param {number=} options.year If positive, adds years. If negative, removes years.
 * @param {number=} options.month If positive, adds months. If negative, removes month.
 * @param {number=} options.day If positive, adds days. If negative, removes days.
 * @param {number=} options.hour If positive, adds hours. If negative, removes hours.
 * @param {number=} options.minute If positive, adds minutes. If negative, removes minutes.
 * @param {number=} options.second If positive, adds seconds. If negative, removes seconds.
 * @param {number=} options.millisecond If positive, adds milliseconds. If negative, removes milliseconds.
 * @param {CalendarSystem=} calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns {Timestamp} New normalized Timestamp object.
 * @category arithmetic
 */
export function addToDateClamped(
  timestamp: Timestamp,
  options: AddToDateOptions,
  calendar: CalendarSystem = gregorianCalendar,
): Timestamp {
  if (calendar !== gregorianCalendar) {
    return addToCalendarDateTime(timestamp, options, calendar)
  }

  const ts = cloneTimestamp(timestamp)

  if (options.year || options.month) {
    const target = normalizeYearMonth(
      ts.year + (options.year ?? 0),
      ts.month + (options.month ?? 0),
    )
    ts.year = target.year
    ts.month = target.month
    ts.day = Math.min(ts.day, daysInMonth(ts.year, ts.month))
  }

  if (options.day) ts.day += options.day
  if (options.hour) ts.hour += options.hour
  if (options.minute) ts.minute += options.minute
  if (options.second) ts.second = (ts.second ?? 0) + options.second
  if (options.millisecond) ts.millisecond = (ts.millisecond ?? 0) + options.millisecond

  return updateFormatted(normalizeTimestamp(ts))
}

/**
 * Normalizes a year/month pair while keeping the day out of the calculation.
 * This lets clamped date math choose the final day explicitly instead of
 * letting JavaScript Date roll an overflowing day into the next month.
 * @category arithmetic
 */
function normalizeYearMonth(year: number, month: number): Pick<Timestamp, 'year' | 'month'> {
  const date = new Date(year, month - 1, 1)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  }
}

/**
 * Normalizes a timestamp object by creating a JavaScript Date object and extracting standardized values.
 * This function ensures that the timestamp values are consistent and correctly represent a valid date and time.
 *
 * @param {Object} ts - The timestamp object to normalize.
 * @param {number} ts.year - The year of the timestamp.
 * @param {number} ts.month - The month of the timestamp (1-12).
 * @param {number} ts.day - The day of the month.
 * @param {number} ts.hour - The hour of the day (0-23).
 * @param {number} ts.minute - The minute of the hour (0-59).
 * @returns {Object} A new object with normalized timestamp values.
 *                   The returned object includes all properties from the input object,
 *                   with year, month, day, hour, and minute properties updated to normalized values.
 */
function normalizeTimestamp(ts: Timestamp): Timestamp {
  const date = new Date(
    ts.year,
    ts.month - 1,
    ts.day,
    ts.hour,
    ts.minute,
    ts.second ?? 0,
    ts.millisecond ?? 0,
  )
  const timestamp: MutableTimestamp = {
    ...ts,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }

  if (ts.second !== undefined || date.getSeconds() !== 0) {
    timestamp.second = date.getSeconds()
  }
  if (ts.millisecond !== undefined || date.getMilliseconds() !== 0) {
    timestamp.millisecond = date.getMilliseconds()
  }

  return freezeTimestamp(timestamp)
}

/**
 * Returns number of days between two Timestamps
 * @param {Timestamp} ts1 The first Timestamp
 * @param {Timestamp} ts2 The second Timestamp
 * @returns Number of days
 * @category arithmetic
 */
export function daysBetween(ts1: Timestamp, ts2: Timestamp): number {
  const diff = diffTimestamp(ts1, ts2, true)
  return Math.floor(diff / TIME_CONSTANTS.MILLISECONDS_IN.DAY)
}

/**
 * Returns number of weeks between two Timestamps
 * @param {Timestamp} ts1 The first Timestamp
 * @param {Timestamp} ts2 The second Timestamp
 * @category arithmetic
 */
export function weeksBetween(ts1: Timestamp, ts2: Timestamp): number {
  let t1: Timestamp = copyTimestamp(ts1)
  let t2: Timestamp = copyTimestamp(ts2)
  t1 = findWeekday(t1, 0)
  t2 = findWeekday(t2, 6)
  return Math.ceil(daysBetween(t1, t2) / TIME_CONSTANTS.DAYS_IN.WEEK)
}

/**
 * Creates a TimestampDuration from signed milliseconds.
 *
 * @param {number} milliseconds Signed elapsed milliseconds.
 * @returns {TimestampDuration} Frozen duration object.
 * @category duration
 */
export function createDuration(milliseconds: number): TimestampDuration {
  const sign: -1 | 0 | 1 = milliseconds === 0 ? 0 : milliseconds < 0 ? -1 : 1
  let remaining = Math.abs(milliseconds)
  const days = Math.floor(remaining / MILLISECONDS_IN_DAY)
  remaining -= days * MILLISECONDS_IN_DAY
  const hours = Math.floor(remaining / MILLISECONDS_IN_HOUR)
  remaining -= hours * MILLISECONDS_IN_HOUR
  const minutes = Math.floor(remaining / MILLISECONDS_IN_MINUTE)
  remaining -= minutes * MILLISECONDS_IN_MINUTE
  const seconds = Math.floor(remaining / MILLISECONDS_IN_SECOND)
  remaining -= seconds * MILLISECONDS_IN_SECOND

  return Object.freeze({
    totalMilliseconds: milliseconds,
    absoluteMilliseconds: Math.abs(milliseconds),
    sign,
    days,
    hours,
    minutes,
    seconds,
    milliseconds: remaining,
  })
}

/**
 * Measures the elapsed duration between two Timestamp values.
 *
 * Timestamp fields are read as UTC so the result is deterministic across
 * server and client runtimes.
 *
 * @param {Timestamp} start Start timestamp.
 * @param {Timestamp} end End timestamp.
 * @returns {TimestampDuration} Frozen duration object.
 * @category duration
 */
export function durationBetween(start: Timestamp, end: Timestamp): TimestampDuration {
  return createDuration(toUnixMilliseconds(end) - toUnixMilliseconds(start))
}

/**
 * Adds an elapsed duration to a Timestamp.
 *
 * This helper treats the Timestamp fields as UTC and returns a Timestamp built
 * from UTC fields. Use addToDate() for calendar-unit arithmetic such as
 * "one month from now".
 *
 * @param {Timestamp} timestamp Timestamp object to offset.
 * @param {TimestampDuration | number} duration Duration object or signed milliseconds.
 * @returns {Timestamp} Offset Timestamp.
 * @category duration
 */
export function addDuration(timestamp: Timestamp, duration: TimestampDuration | number): Timestamp {
  const milliseconds = typeof duration === 'number' ? duration : duration.totalMilliseconds
  return fromUnixMilliseconds(toUnixMilliseconds(timestamp) + milliseconds) as Timestamp
}

/**
 * Subtracts an elapsed duration from a Timestamp.
 *
 * @param {Timestamp} timestamp Timestamp object to offset.
 * @param {TimestampDuration | number} duration Duration object or signed milliseconds.
 * @returns {Timestamp} Offset Timestamp.
 * @category duration
 */
export function subtractDuration(
  timestamp: Timestamp,
  duration: TimestampDuration | number,
): Timestamp {
  const milliseconds = typeof duration === 'number' ? duration : duration.totalMilliseconds
  return addDuration(timestamp, -milliseconds)
}

/**
 * Formats a duration as `HH:mm:ss` or `HH:mm:ss.SSS`.
 *
 * Hours include full days, so a two-day duration formats as `48:00:00`.
 *
 * @param {TimestampDuration | number} duration Duration object or signed milliseconds.
 * @param {FormatDurationOptions=} options Formatting options.
 * @returns {string} Formatted duration.
 * @category duration
 */
export function formatDuration(
  duration: TimestampDuration | number,
  options: FormatDurationOptions = {},
): string {
  const value = typeof duration === 'number' ? createDuration(duration) : duration
  const hours = value.days * HOURS_IN_DAY + value.hours
  const sign = options.signed === true && value.sign < 0 ? '-' : ''
  let formatted = `${sign}${padNumber(hours, 2)}:${padNumber(value.minutes, 2)}:${padNumber(value.seconds, 2)}`

  if (options.milliseconds === true) {
    formatted += `.${padNumber(value.milliseconds, 3)}`
  }

  return formatted
}

function roundTimestampToInterval(
  timestamp: Timestamp,
  minutes: number,
  rounder: (value: number) => number,
): Timestamp {
  if (minutes <= 0 || Number.isFinite(minutes) === false) {
    return copyTimestamp(timestamp)
  }

  const interval = minutes * MILLISECONDS_IN_MINUTE
  const value = toUnixMilliseconds(timestamp)
  return fromUnixMilliseconds(rounder(value / interval) * interval) as Timestamp
}

/**
 * Floors a Timestamp down to the nearest interval.
 *
 * @param {Timestamp} timestamp Timestamp object to round.
 * @param {number} minutes Interval size in minutes.
 * @returns {Timestamp} Rounded Timestamp.
 * @category arithmetic
 */
export function floorToInterval(timestamp: Timestamp, minutes: number): Timestamp {
  return roundTimestampToInterval(timestamp, minutes, Math.floor)
}

/**
 * Ceils a Timestamp up to the nearest interval.
 *
 * @param {Timestamp} timestamp Timestamp object to round.
 * @param {number} minutes Interval size in minutes.
 * @returns {Timestamp} Rounded Timestamp.
 * @category arithmetic
 */
export function ceilToInterval(timestamp: Timestamp, minutes: number): Timestamp {
  return roundTimestampToInterval(timestamp, minutes, Math.ceil)
}

/**
 * Rounds a Timestamp to the nearest interval.
 *
 * @param {Timestamp} timestamp Timestamp object to round.
 * @param {number} minutes Interval size in minutes.
 * @returns {Timestamp} Rounded Timestamp.
 * @category arithmetic
 */
export function roundToInterval(timestamp: Timestamp, minutes: number): Timestamp {
  return roundTimestampToInterval(timestamp, minutes, Math.round)
}

// Known dates
const weekdayDateMap = {
  Sun: new Date('2020-01-05T00:00:00.000Z'),
  Mon: new Date('2020-01-06T00:00:00.000Z'),
  Tue: new Date('2020-01-07T00:00:00.000Z'),
  Wed: new Date('2020-01-08T00:00:00.000Z'),
  Thu: new Date('2020-01-09T00:00:00.000Z'),
  Fri: new Date('2020-01-10T00:00:00.000Z'),
  Sat: new Date('2020-01-11T00:00:00.000Z'),
}

type IntlNameFormat = 'long' | 'short' | 'narrow'

function resolveIntlNameFormat(
  options: Record<IntlNameFormat, Intl.DateTimeFormatOptions>,
  type?: string,
): Intl.DateTimeFormatOptions {
  if (type === 'long' || type === 'short' || type === 'narrow') {
    return options[type]
  }

  return options.long
}

/**
 * Returns a function that uses Intl.DateTimeFormat to format weekdays.
 *
 * @function getWeekdayFormatter
 * @returns {function} A function that formats weekdays.
 *
 * @example
 * const formatWeekday = getWeekdayFormatter();
 * console.log(formatWeekday('Mon', 'long', 'en-US')); // "Monday"
 * console.log(formatWeekday('Mon', 'short', 'fr-FR')); // "lun."
 *
 * @param {string} weekday - The abbreviation of the weekday (e.g., 'Mon', 'Tue', 'Wed', etc.).
 * @param {string} [type='long'] - The type of formatting to use ('narrow', 'short', or 'long').
 * @param {string} [locale=''] - The locale to use for formatting.
 *
 * @returns {string} The formatted weekday.
 * @category locale
 */
export function getWeekdayFormatter(): WeekdayFormatter {
  const emptyFormatter = (): string => ''
  const options: Record<IntlNameFormat, Intl.DateTimeFormatOptions> = {
    long: { timeZone: 'UTC', weekday: 'long' },
    short: { timeZone: 'UTC', weekday: 'short' },
    narrow: { timeZone: 'UTC', weekday: 'narrow' },
  }

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter as WeekdayFormatter
  }

  /**
   * Formats a given weekday into a localized string based on the specified type and locale.
   *
   * @param {number} weekday - The day of the week (0 for Sunday, 1 for Monday, etc.).
   * @param {string} type - The format type (e.g., 'narrow', 'short', 'long') to use for formatting.
   * @param {string} [locale] - The locale string (e.g., 'en-US') to use for formatting. Defaults to the user's locale if not provided.
   * @returns {string} The formatted weekday string.
   */
  function weekdayFormatter(
    weekday: keyof typeof weekdayDateMap,
    type: string,
    locale?: string,
  ): string {
    try {
      const intlFormatter = new Intl.DateTimeFormat(
        locale || undefined,
        resolveIntlNameFormat(options, type),
      )
      return intlFormatter.format(weekdayDateMap[weekday])
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Intl.DateTimeFormat: ${e.message} -> day of week: ${weekday}`)
      }
      return ''
    }
  }

  return weekdayFormatter
}

/**
 * Retrieves localized weekday names.
 *
 * @param {string} type Format type: `narrow`, `short`, or `long`.
 * @param {string} locale Locale to use for formatting, such as `en-US`.
 * @returns {string[]} Localized weekday names in Sunday-first order.
 * @category locale
 */
export function getWeekdayNames(type: string, locale: string): string[] {
  const shortWeekdays = Object.keys(weekdayDateMap)
  const weekdayFormatter = getWeekdayFormatter()
  return shortWeekdays.map((weekday) =>
    String(weekdayFormatter(weekday as keyof typeof weekdayDateMap, type, locale)),
  )
}

/**
 * Creates and returns a function for formatting month names based on locale and format type.
 *
 * @returns {Function} A function that formats month names.
 *   The returned function accepts the following parameters:
 *   @param {number} month - The month to format (0-11, where 0 is January).
 *   @param {string} [type='long'] - The format type: 'narrow', 'short', or 'long'.
 *   @param {string} [locale] - The locale to use for formatting. If not provided, the default locale is used.
 *   @returns {string} The formatted month name.
 *
 * @throws {Error} If Intl or Intl.DateTimeFormat is not supported in the environment.
 * @category locale
 */
export function getMonthFormatter(): MonthFormatter {
  const emptyFormatter = (): string => ''
  const options: Record<IntlNameFormat, Intl.DateTimeFormatOptions> = {
    long: { timeZone: 'UTC', month: 'long' },
    short: { timeZone: 'UTC', month: 'short' },
    narrow: { timeZone: 'UTC', month: 'narrow' },
  }

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter
  }

  /**
   * Formats a given month into a string based on the specified type and locale.
   *
   * @param {number} month - The month to format (0 for January, 11 for December).
   * @param {string} type - The format type (e.g., 'narrow', 'long', 'short', etc.).
   * @param {string} [locale] - The locale to use for formatting (defaults to the system locale if not provided).
   * @returns {string} The formatted month string.
   */
  function monthFormatter(month: number, type = 'long', locale?: string): string {
    try {
      const intlFormatter = new Intl.DateTimeFormat(
        locale || undefined,
        resolveIntlNameFormat(options, type),
      )
      const date = new Date()
      date.setDate(1)
      date.setMonth(month)
      return intlFormatter.format(date)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Intl.DateTimeFormat: ${e.message} -> month: ${month}`)
      }
      return ''
    }
  }

  return monthFormatter
}

/**
 * Returns a function that formats one-based calendar adapter month numbers.
 *
 * This is the calendar-aware counterpart to getMonthFormatter(). It converts
 * adapter fields through the adapter's epoch-day mapping, then asks Intl to
 * format the equivalent Gregorian Date with the adapter's Intl calendar id
 * when one is available.
 *
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @returns Function that formats one-based month numbers for the adapter.
 * @category calendar
 */
export function getCalendarMonthFormatter(
  calendar: CalendarSystem = gregorianCalendar,
): CalendarMonthFormatter {
  const options: Record<IntlNameFormat, Intl.DateTimeFormatOptions> = {
    long: { timeZone: 'UTC', month: 'long' },
    short: { timeZone: 'UTC', month: 'short' },
    narrow: { timeZone: 'UTC', month: 'narrow' },
  }
  const fallbackFormatter = (month: number): string =>
    Number.isFinite(month) && month >= 1 ? `Month ${month}` : ''

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return fallbackFormatter
  }

  return (month: number, type = 'long', locale?: string, year = 1): string => {
    const calendarMonth = Math.trunc(month)
    const calendarYear = Math.trunc(year)
    const date = {
      year: calendarYear,
      month: calendarMonth,
      day: 1,
    }

    if (
      Number.isFinite(calendarMonth) === false ||
      Number.isFinite(calendarYear) === false ||
      isValidCalendarDate(date, calendar) === false
    ) {
      return ''
    }

    try {
      const resolvedOptions = resolveIntlNameFormat(options, type) as Intl.DateTimeFormatOptions & {
        calendar?: string
      }
      const formatterOptions =
        calendar.intlCalendar === undefined || resolvedOptions.calendar !== undefined
          ? resolvedOptions
          : {
              ...resolvedOptions,
              calendar: calendar.intlCalendar,
            }
      const gregorianDate = gregorianCalendar.fromEpochDay(calendar.toEpochDay(date))
      const nativeDate = new Date(
        Date.UTC(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day),
      )

      return new Intl.DateTimeFormat(locale || undefined, formatterOptions).format(nativeDate)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Intl.DateTimeFormat: ${e.message} -> calendar month: ${calendarMonth}`)
      }
      return fallbackFormatter(calendarMonth)
    }
  }
}

/**
 * Retrieves localized month names.
 *
 * @param {string} type Format type: `narrow`, `short`, or `long`.
 * @param {string} locale Locale to use for formatting, such as `en-US`.
 * @returns {string[]} Localized month names in January-first order.
 * @category locale
 */
export function getMonthNames(type: string, locale: string): string[] {
  const monthFormatter = getMonthFormatter()
  return [...Array(12).keys()].map((month) => monthFormatter(month, type, locale))
}

/**
 * Retrieves localized month names for a calendar adapter.
 *
 * Month numbers are generated from `1` through `calendar.monthsInYear(year)`.
 * Pass a year when the calendar can have leap months or year-specific month
 * naming rules.
 *
 * @param calendar Calendar system to use. Defaults to Gregorian; pass an adapter such as islamicCivilCalendar for native calendar fields.
 * @param type Format type: `narrow`, `short`, or `long`.
 * @param locale Locale to use for formatting, such as `en-US`.
 * @param year Calendar year to sample. Defaults to `1`.
 * @returns Localized month names in calendar-native order.
 * @category calendar
 */
export function getCalendarMonthNames(
  calendar: CalendarSystem = gregorianCalendar,
  type: string = 'long',
  locale?: string,
  year: number = 1,
): string[] {
  const monthFormatter = getCalendarMonthFormatter(calendar)
  return [...Array(calendar.monthsInYear(year)).keys()].map((month) =>
    monthFormatter(month + 1, type, locale, year),
  )
}
