/**
 * Matches supported date and date-time input.
 *
 * Accepts `YYYY-MM`, `YYYY-MM-DD`, space-separated date/time strings,
 * ISO-style `T` separators, optional seconds, optional milliseconds, and
 * optional timezone suffixes such as `Z`, `+06:00`, or `-0700`.
 */
export const PARSE_DATETIME =
  /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?(?:[Tt\s]+(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2})(?:\.(\d{1,3}))?)?)?(?:\s*(Z|[+-]\d{2}:?\d{2}))?$/;

/**
 * Matches the date portion of a timestamp string.
 */
export const PARSE_DATE = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?/;

/**
 * Matches `HH`, `HH:mm`, `HH:mm:ss`, or `HH:mm:ss.SSS` time strings.
 */
export const PARSE_TIME = /^(\d\d?)(?::(\d\d?))?(?::(\d\d?))?(?:\.(\d{1,3}))?$/;

/**
 * Month lengths for a non-leap Gregorian year.
 *
 * Index `0` is intentionally unused so month numbers can be used directly.
 */
export const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Month lengths for a leap Gregorian year.
 *
 * Index `0` is intentionally unused so month numbers can be used directly.
 */
export const DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
};

/**
 * Minimum number of days found in any Gregorian month.
 */
export const DAYS_IN_MONTH_MIN = 28;

/**
 * Maximum number of days found in any Gregorian month.
 */
export const DAYS_IN_MONTH_MAX = 31;

/**
 * Maximum Gregorian month number.
 */
export const MONTH_MAX = 12;

/**
 * Minimum Gregorian month number.
 */
export const MONTH_MIN = 1;

/**
 * Minimum day-of-month number.
 */
export const DAY_MIN = 1;

/**
 * First hour in a 24-hour day.
 */
export const FIRST_HOUR = 0;

/**
 * Number of days in a week.
 */
export const DAYS_IN_WEEK = TIME_CONSTANTS.DAYS_IN.WEEK;

/**
 * Number of minutes in an hour.
 */
export const MINUTES_IN_HOUR = TIME_CONSTANTS.MINUTES_IN.HOUR;

/**
 * Number of hours in a day.
 */
export const HOURS_IN_DAY = TIME_CONSTANTS.HOURS_IN.DAY;

/**
 * Number of milliseconds in one minute.
 */
export const MILLISECONDS_IN_MINUTE = TIME_CONSTANTS.MILLISECONDS_IN.MINUTE;

/**
 * Number of milliseconds in one hour.
 */
export const MILLISECONDS_IN_HOUR = TIME_CONSTANTS.MILLISECONDS_IN.HOUR;

/**
 * Number of milliseconds in one day.
 */
export const MILLISECONDS_IN_DAY = TIME_CONSTANTS.MILLISECONDS_IN.DAY;

/**
 * Number of milliseconds in one week.
 */
export const MILLISECONDS_IN_WEEK = TIME_CONSTANTS.MILLISECONDS_IN.WEEK;

/**
 * Inline style metadata that can be attached to disabled timestamp ranges.
 */
export type TimestampStyle = Record<string, string | number | undefined>;

/**
 * CSS class metadata that can be attached to disabled timestamp ranges.
 */
export type TimestampClass = string | string[] | Record<string, boolean>;

/**
 * Object form for a disabled day or disabled date range.
 */
export interface DisabledDayConfig {
  /**
   * Single disabled date in `YYYY-MM-DD` form.
   */
  date?: string;

  /**
   * Inclusive range start date in `YYYY-MM-DD` form.
   */
  from?: string;

  /**
   * Inclusive range end date in `YYYY-MM-DD` form.
   */
  to?: string;

  /**
   * Alias for {@link DisabledDayConfig.from}.
   */
  start?: string;

  /**
   * Alias for {@link DisabledDayConfig.to}.
   */
  end?: string;

  /**
   * Optional background color metadata for matching disabled dates.
   */
  color?: string;

  /**
   * Optional text color metadata for matching disabled dates.
   */
  textColor?: string;

  /**
   * Optional CSS class metadata for matching disabled dates.
   */
  class?: TimestampClass;

  /**
   * Optional inline style metadata for matching disabled dates.
   */
  style?: TimestampStyle;

  /**
   * Optional human-readable label for matching disabled dates.
   */
  label?: string;
}

/**
 * Supported disabled-day declaration.
 *
 * A string disables a single date, a string array disables multiple dates or
 * an inclusive two-date range, and an object can carry display metadata.
 */
export type DisabledDay = string | string[] | DisabledDayConfig;

/**
 * Collection of disabled-day declarations.
 */
export type DisabledDays = DisabledDay[];

/**
 * Immutable timestamp data used by all parser, comparison, and date math helpers.
 *
 * Timestamps use Gregorian calendar fields and preserve optional ISO timezone
 * suffixes without converting the wall-clock values into another zone.
 */
export interface Timestamp {
  /**
   * Date string in `YYYY-MM-DD` form when the timestamp has a day.
   */
  readonly date: string;

  /**
   * True when the timestamp includes a meaningful date/day value.
   */
  readonly hasDay: boolean;

  /**
   * Four-digit Gregorian year.
   */
  readonly year: number;

  /**
   * Gregorian month number, where January is `1` and December is `12`.
   */
  readonly month: number;

  /**
   * Day of the month.
   */
  readonly day: number;

  /**
   * Formatted time string.
   *
   * Minute precision is formatted as `HH:mm`; second precision as `HH:mm:ss`;
   * millisecond precision as `HH:mm:ss.SSS`.
   */
  readonly time?: string;

  /**
   * True when the timestamp includes time fields.
   */
  readonly hasTime: boolean;

  /**
   * Hour in 24-hour format.
   */
  readonly hour: number;

  /**
   * Minute of the hour.
   */
  readonly minute: number;

  /**
   * Optional second of the minute.
   */
  readonly second?: number;

  /**
   * Optional millisecond of the second.
   */
  readonly millisecond?: number;

  /**
   * Optional parsed ISO timezone suffix such as `Z`, `+06:00`, or `-0700`.
   *
   * The suffix is preserved for callers, but parsing does not convert the
   * wall-clock values into another timezone.
   */
  readonly timezone?: string;

  /**
   * Weekday number where Sunday is `0` and Saturday is `6`.
   */
  readonly weekday?: number;

  /**
   * Day of the year.
   */
  readonly doy?: number;

  /**
   * ISO-style workweek number.
   */
  readonly workweek?: number;

  /**
   * True when the timestamp is before a comparison timestamp.
   */
  readonly past?: boolean;

  /**
   * True when the timestamp matches a comparison timestamp.
   */
  readonly current?: boolean;

  /**
   * True when the timestamp is after a comparison timestamp.
   */
  readonly future?: boolean;

  /**
   * True when this timestamp represents a disabled date.
   */
  readonly disabled?: boolean;

  /**
   * Optional background color metadata for a disabled date.
   */
  readonly disabledColor?: string;

  /**
   * Optional text color metadata for a disabled date.
   */
  readonly disabledTextColor?: string;

  /**
   * Optional class metadata for a disabled date.
   */
  readonly disabledClass?: TimestampClass;

  /**
   * Optional inline style metadata for a disabled date.
   */
  readonly disabledStyle?: TimestampStyle;

  /**
   * Optional human-readable label for a disabled date.
   */
  readonly disabledLabel?: string;

  /**
   * True when this timestamp's weekday matches a comparison timestamp's weekday.
   */
  readonly currentWeekday?: boolean;
}

type MutableTimestamp = { -readonly [Key in keyof Timestamp]: Timestamp[Key] };

/**
 * Time-only value used when callers need hour/minute input without a date.
 */
export interface TimeObject {
  /**
   * Hour in 24-hour format.
   */
  readonly hour: number;

  /**
   * Minute of the hour.
   */
  readonly minute: number;

  /**
   * Optional second of the minute.
   */
  readonly second?: number;

  /**
   * Optional millisecond of the second.
   */
  readonly millisecond?: number;
}

/**
 * Frozen empty timestamp template.
 *
 * Use {@link copyTimestamp} or parser helpers to create new timestamp objects
 * instead of mutating this shared default.
 */
export const Timestamp: Timestamp = freezeTimestamp({
  date: "",
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
});

/**
 * Frozen empty time-object template.
 */
export const TimeObject: TimeObject = Object.freeze({
  hour: 0,
  minute: 0,
});

function freezeTimestamp(timestamp: Timestamp | MutableTimestamp): Timestamp {
  return Object.freeze({ ...timestamp }) as Timestamp;
}

function cloneTimestamp(timestamp: Timestamp): MutableTimestamp {
  return { ...timestamp };
}

function parseMillisecond(value: string | undefined): number | undefined {
  return value === undefined ? undefined : parseInt(value.padEnd(3, "0"), 10);
}

/**
 * Validates whether an input string matches the supported timestamp grammar.
 *
 * @param {string} input A string in the form `YYYY-MM-DD`, `YYYY-MM-DD HH:mm`, or a full ISO-like date time.
 * @returns {boolean} True if parseable
 */
export function validateTimestamp(input: string): boolean {
  if (typeof input !== "string") return false;
  return PARSE_DATETIME.test(input);
}

/**
 * Fast low-level parser for date and date-time strings.
 *
 * This parser fills numeric fields, but does not update formatted date,
 * weekday, day-of-year, workweek, or relative flags. Use
 * {@link parseTimestamp} when those derived fields are needed.
 *
 * @param {string} input In the form `YYYY-MM-DD`, `YYYY-MM-DD HH:mm:ss`, or an ISO-like date time with optional milliseconds and timezone suffix.
 * @returns {Timestamp} This {@link Timestamp} is minimally filled in. The {@link Timestamp.date} and {@link Timestamp.time} as well as relative data will not be filled in.
 */
export function parsed(input: string): Timestamp | null {
  if (typeof input !== "string") return null;
  const parts = PARSE_DATETIME.exec(input);

  if (!parts || !parts[1] || !parts[2]) return null;

  const year = parseInt(parts[1], 10);
  const month = parseInt(parts[2], 10);
  const day = parseInt(parts[3] || "1", 10);
  const hour = parseInt(parts[4] || "0", 10);
  const minute = parseInt(parts[5] || "0", 10);
  const second = parts[6] === undefined ? undefined : parseInt(parts[6], 10);
  const millisecond = parseMillisecond(parts[7]);
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
  };

  if (second !== undefined) {
    timestamp.second = second;
  }
  if (millisecond !== undefined) {
    timestamp.millisecond = millisecond;
  }
  if (parts[8] !== undefined) {
    timestamp.timezone = parts[8];
  }

  timestamp.time = getTime(timestamp);

  return freezeTimestamp(timestamp);
}

/**
 * Takes a JavaScript Date and returns a {@link Timestamp}. The {@link Timestamp} is not updated with relative information.
 * @param {Date} date JavaScript Date
 * @param {boolean} utc If set the {@link Timestamp} will parse the Date as UTC
 * @returns {Timestamp} A minimal {@link Timestamp} without updated or relative updates.
 */
export function parseDate(date: Date, utc = false): Timestamp | null {
  if (!(date instanceof Date)) return null;
  const UTC = utc ? "UTC" : "";
  const second = date[`get${UTC}Seconds`]();
  const millisecond = date[`get${UTC}Milliseconds`]();
  const timestamp: MutableTimestamp = {
    date:
      padNumber(date[`get${UTC}FullYear`](), 4) +
      "-" +
      padNumber(date[`get${UTC}Month`]() + 1, 2) +
      "-" +
      padNumber(date[`get${UTC}Date`](), 2),
    time:
      padNumber(date[`get${UTC}Hours`]() || 0, 2) +
      ":" +
      padNumber(date[`get${UTC}Minutes`]() || 0, 2),
    year: date[`get${UTC}FullYear`](),
    month: date[`get${UTC}Month`]() + 1,
    day: date[`get${UTC}Date`](),
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
  };

  if (second !== 0) {
    timestamp.second = second;
  }
  if (millisecond !== 0) {
    timestamp.millisecond = millisecond;
  }

  return updateFormatted(timestamp);
}

/**
 * Pads a number to a requested string length.
 *
 * Useful for formatting values such as `5` as `05`.
 * @param {number} x The number to pad
 * @param {number} length The length of the required number as a string
 * @returns {string} The padded number (as a string). (ie: 5 = '05')
 */
export function padNumber(x: number, length: number): string {
  let padded = String(x);
  while (padded.length < length) {
    padded = "0" + padded;
  }

  return padded;
}

/**
 * Returns if the passed year is a leap year
 * @param {number} year The year to check (ie: 1999, 2020)
 * @returns {boolean} True if the year is a leap year
 */
export function isLeapYear(year: number): boolean {
  // A year is a Gregorian leap year if it is divisible by 4,
  // but not by 100, unless it is also divisible by 400.
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the days of the specified month in a year
 * @param {number} year The year (ie: 1999, 2020)
 * @param {number} month The Gregorian month number, where January is `1`
 * @returns {number} The number of days in the month (corrected for leap years)
 */
export function daysInMonth(year: number, month: number): number {
  return (isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH[month]) as number;
}

/**
 * Returns a {@link Timestamp} of next day from passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {Timestamp} A new {@link Timestamp} representing the next day
 */
export function nextDay(timestamp: Timestamp): Timestamp {
  const date = new Date(timestamp.year, timestamp.month - 1, timestamp.day + 1);
  return updateFormatted(
    normalizeTimestamp({
      ...timestamp,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }),
  );
}

/**
 * Returns a {@link Timestamp} of previous day from passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {Timestamp} A new {@link Timestamp} representing the previous day
 */
export function prevDay(timestamp: Timestamp): Timestamp {
  const date = new Date(timestamp.year, timestamp.month - 1, timestamp.day - 1);
  return updateFormatted(
    normalizeTimestamp({
      ...timestamp,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }),
  );
}

/**
 * Returns today's date
 * @returns {string} Date string in the form `YYYY-MM-DD`
 */
export function today(): string {
  const d = new Date(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    year = d.getFullYear();

  return [year, padNumber(month, 2), padNumber(day, 2)].join("-");
}

/**
 * Takes a date string ('YYYY-MM-DD') and validates if it is today's date
 * @param {string} date Date string in the form 'YYYY-MM-DD'
 * @returns {boolean} True if the date is today's date
 */
export function isToday(date: string): boolean {
  return date === today();
}

/**
 * Returns the start of the week give a {@link Timestamp} and weekdays (in which it finds the day representing the start of the week).
 * If today {@link Timestamp} is passed in then this is used to update relative information in the returned {@link Timestamp}.
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the start of the week
 * @param {number[]} weekdays The array is [0,1,2,3,4,5,6] where 0=Sunday and 6=Saturday
 * @param {Timestamp=} today If passed in then the {@link Timestamp} is updated with relative information
 * @returns {Timestamp} A new {@link Timestamp} representing the start of the week
 */
export function getStartOfWeek(
  timestamp: Timestamp,
  weekdays: number[],
  today: Timestamp,
): Timestamp {
  let start = cloneTimestamp(timestamp);
  if (!weekdays) {
    return freezeTimestamp(start);
  }
  if (start.day === 1 || start.weekday === 0) {
    while (!weekdays.includes(Number(start.weekday))) {
      start = nextDay(start);
    }
  }
  start = findWeekday(start, weekdays[0] as number, prevDay);
  start = updateFormatted(start);
  if (today) {
    start = updateRelative(start, today, start.hasTime);
  }
  return start;
}

/**
 * Returns the end of the week give a {@link Timestamp} and weekdays (in which it finds the day representing the last of the week).
 * If today {@link Timestamp} is passed in then this is used to update relative information in the returned {@link Timestamp}.
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the end of the week
 * @param {number[]} weekdays The array is [0,1,2,3,4,5,6] where 0=Sunday and 6=Saturday
 * @param {Timestamp=} today If passed in then the {@link Timestamp} is updated with relative information
 * @returns {Timestamp} A new {@link Timestamp} representing the end of the week
 */
export function getEndOfWeek(
  timestamp: Timestamp,
  weekdays: number[],
  today: Timestamp,
): Timestamp {
  let end = cloneTimestamp(timestamp);
  if (!weekdays || !Array.isArray(weekdays)) {
    return freezeTimestamp(end);
  }

  // is last day of month?
  const lastDay = daysInMonth(end.year, end.month);
  if (lastDay === end.day || end.weekday === weekdays[weekdays.length - 1]) {
    while (!weekdays.includes(Number(end.weekday))) {
      end = prevDay(end);
    }
  }
  end = findWeekday(end, weekdays[weekdays.length - 1]!, nextDay);
  end = updateFormatted(end);
  if (today) {
    end = updateRelative(end, today, end.hasTime);
  }
  return end;
}

/**
 * Finds the start of the month based on the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the start of the month
 * @returns {Timestamp} A {@link Timestamp} of the start of the month
 */
export function getStartOfMonth(timestamp: Timestamp): Timestamp {
  let start = cloneTimestamp(timestamp);
  start.day = DAY_MIN;
  start = updateFormatted(start);
  return start;
}

/**
 * Finds the end of the month based on the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the end of the month
 * @returns {Timestamp} A {@link Timestamp} of the end of the month
 */
export function getEndOfMonth(timestamp: Timestamp): Timestamp {
  let end = cloneTimestamp(timestamp);
  end.day = daysInMonth(end.year, end.month);
  end = updateFormatted(end);
  return end;
}

/**
 * Converts time input into minutes since midnight.
 *
 * Strings may include seconds or milliseconds, but sub-minute precision is
 * ignored for this minute-oriented helper.
 *
 * @param input - Minutes since midnight, a time string, or an object with hour and minute fields.
 * @returns Minutes since midnight, or `false` when the input cannot be parsed.
 */
export function parseTime(
  input: number | string | { hour: number; minute: number },
): number | false {
  const type = Object.prototype.toString.call(input);
  switch (type) {
    case "[object Number]":
      // when a number is given, it's minutes since 12:00am
      return input as number;
    case "[object String]": {
      // when a string is given, it's a hh:mm:ss format where seconds are optional, but not used for minute math
      const parts = PARSE_TIME.exec(input as string);
      if (!parts) {
        return false;
      }
      return parseInt(parts[1]!, 10) * 60 + parseInt(parts[2] || "0", 10);
    }
    case "[object Object]":
      // when an object is given, it must have hour and minute
      if (
        typeof input !== "object" ||
        typeof input.hour !== "number" ||
        typeof input.minute !== "number"
      ) {
        return false;
      }
      if (typeof input === "object" && "hour" in input && "minute" in input) {
        return input.hour * 60 + input.minute;
      }
      return false;
  }

  return false;
}

/**
 * Compares two {@link Timestamp}s for exactness
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the two {@link Timestamp}s are an exact match
 */
export function compareTimestamps(ts1: Timestamp, ts2: Timestamp): boolean {
  if (!ts1 || !ts2) return false;

  return (
    ts1.year === ts2.year &&
    ts1.month === ts2.month &&
    ts1.day === ts2.day &&
    ts1.hour === ts2.hour &&
    ts1.minute === ts2.minute &&
    ts1.second === ts2.second &&
    ts1.millisecond === ts2.millisecond &&
    ts1.timezone === ts2.timezone
  );
}

/**
 * Compares the date of two {@link Timestamp}s that have been updated with relative data
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the two dates are the same
 */
export function compareDate(ts1: Timestamp, ts2: Timestamp): boolean {
  return getDate(ts1) === getDate(ts2);
}

/**
 * Compares the time of two {@link Timestamp}s that have been updated with relative data
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the two times are an exact match
 */
export function compareTime(ts1: Timestamp, ts2: Timestamp): boolean {
  return getTime(ts1) === getTime(ts2);
}

/**
 * Compares the date and time of two {@link Timestamp}s that have been updated with relative data
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the date and time are an exact match
 */
export function compareDateTime(ts1: Timestamp, ts2: Timestamp): boolean {
  return getDateTime(ts1) === getDateTime(ts2);
}

/**
 * High-level parser that converts a string to a fully formatted {@link Timestamp}.
 *
 * If `now` is supplied, the returned timestamp also includes relative flags
 * such as `past`, `current`, `future`, and `currentWeekday`.
 *
 * @param {string} input In the form `YYYY-MM-DD`, `YYYY-MM-DD HH:mm:ss`, or an ISO-like date time with optional milliseconds and timezone suffix.
 * @param {Timestamp} now A {@link Timestamp} to use for relative data updates
 * @returns {Timestamp} The {@link Timestamp.date} will be filled in as well as the {@link Timestamp.time} if a time is supplied and formatted fields (doy, weekday, workweek, etc). If 'now' is supplied, then relative data will also be updated.
 */
export function parseTimestamp(input: string, now: Timestamp | null = null): Timestamp | null {
  let timestamp = parsed(input);
  if (!timestamp) return null;

  timestamp = updateFormatted(timestamp as Timestamp);

  if (now) {
    timestamp = updateRelative(timestamp as Timestamp, now, timestamp.hasTime);
  }

  return timestamp as Timestamp;
}

/**
 * Converts a {@link Timestamp} into a numeric date identifier based on the passed {@link Timestamp}'s date
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The numeric date identifier
 */
export function getDayIdentifier(timestamp: Timestamp): number {
  return (
    (timestamp.year ?? 0) * 100000000 +
    (timestamp.month ?? 0) * 1000000 +
    (timestamp.day ?? 0) * 10000
  );
}

/**
 * Converts a {@link Timestamp} into a numeric time identifier based on the passed {@link Timestamp}'s time
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The numeric time identifier
 */
export function getTimeIdentifier(timestamp: Timestamp): number {
  return (timestamp.hour ?? 0) * 100 + (timestamp.minute ?? 0);
}

function getTimeComparisonValue(timestamp: Timestamp): number {
  return (
    (((timestamp.hour ?? 0) * TIME_CONSTANTS.MINUTES_IN.HOUR + (timestamp.minute ?? 0)) *
      TIME_CONSTANTS.SECONDS_IN.MINUTE +
      (timestamp.second ?? 0)) *
      TIME_CONSTANTS.MILLISECONDS_IN.SECOND +
    (timestamp.millisecond ?? 0)
  );
}

/**
 * Converts a {@link Timestamp} into a numeric date and time identifier based on the passed {@link Timestamp}'s date and time
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The numeric date+time identifier
 */
export function getDayTimeIdentifier(timestamp: Timestamp): number {
  return getDayIdentifier(timestamp) + getTimeIdentifier(timestamp);
}

/**
 * Returns the difference between two {@link Timestamp}s
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @param {boolean=} strict Optional flag to not to return negative numbers
 * @returns {number} The difference
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
  );
  const utc2 = Date.UTC(
    ts2.year ?? 0,
    (ts2.month ?? 1) - 1,
    ts2.day ?? 1,
    ts2.hour ?? 0,
    ts2.minute ?? 0,
    ts2.second ?? 0,
    ts2.millisecond ?? 0,
  );
  if (strict === true && utc2 < utc1) {
    // Not negative number
    // utc2 - utc1 < 0  -> utc2 < utc1 ->   NO: utc1 >= utc2
    return 0;
  }
  return utc2 - utc1;
}

/**
 * Updates a {@link Timestamp} with relative data (past, current and future)
 * @param {Timestamp} timestamp The {@link Timestamp} that needs relative data updated
 * @param {Timestamp} now {@link Timestamp} that represents the current date (optional time)
 * @param {boolean=} time Optional flag to include time ('timestamp' and 'now' params should have time values)
 * @returns {Timestamp} A new {@link Timestamp}
 */
export function updateRelative(timestamp: Timestamp, now: Timestamp, time = false): Timestamp {
  const ts = cloneTimestamp(timestamp as Timestamp);
  let a = getDayIdentifier(now);
  let b = getDayIdentifier(ts);
  let current = a === b;

  if (ts.hasTime && time && current) {
    a = getTimeComparisonValue(now);
    b = getTimeComparisonValue(ts);
    current = a === b;
  }

  ts.past = b < a;
  ts.current = current;
  ts.future = b > a;
  ts.currentWeekday = ts.weekday === now.weekday;

  return freezeTimestamp(ts);
}

/**
 * Returns a timestamp set to a number of minutes past midnight.
 *
 * The returned timestamp has updated hour/minute fields and clears second and
 * millisecond precision because this helper is minute-oriented.
 *
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @param {number} minutes The number of minutes to set from midnight
 * @param {Timestamp=} now Optional {@link Timestamp} representing current date and time
 * @returns {Timestamp} A new {@link Timestamp}
 */
export function updateMinutes(
  timestamp: Timestamp,
  minutes: number,
  now: Timestamp | null = null,
): Timestamp {
  let ts = cloneTimestamp(timestamp);
  ts.hasTime = true;
  ts.hour = Math.floor(minutes / TIME_CONSTANTS.MINUTES_IN.HOUR);
  ts.minute = minutes % TIME_CONSTANTS.MINUTES_IN.HOUR;
  delete ts.second;
  delete ts.millisecond;
  ts.time = getTime(ts);
  if (now) {
    return updateRelative(ts, now, true);
  }

  return freezeTimestamp(ts);
}

/**
 * Updates the {@link Timestamp} with the weekday
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @returns A new Timestamp
 */
export function updateWeekday(timestamp: Timestamp): Timestamp {
  const ts = cloneTimestamp(timestamp);
  ts.weekday = getWeekday(ts);

  return freezeTimestamp(ts);
}

/**
 * Updates the {@link Timestamp} with the day of the year (doy)
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @returns A new Timestamp
 */
export function updateDayOfYear(timestamp: Timestamp): Timestamp {
  const ts = cloneTimestamp(timestamp);
  ts.doy = getDayOfYear(ts) || 0;

  return freezeTimestamp(ts);
}

/**
 * Updates the {@link Timestamp} with the workweek
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @returns A new {@link Timestamp}
 */
export function updateWorkWeek(timestamp: Timestamp): Timestamp {
  const ts = cloneTimestamp(timestamp);
  ts.workweek = getWorkWeek(ts);

  return freezeTimestamp(ts);
}

function isDisabledDayConfig(value: DisabledDay): value is DisabledDayConfig {
  return typeof value === "object" && value !== null && Array.isArray(value) === false;
}

function applyDisabledDayConfig(
  timestamp: MutableTimestamp,
  config?: DisabledDayConfig,
): MutableTimestamp {
  timestamp.disabled = true;

  if (config !== undefined) {
    timestamp.disabledColor = config.color;
    timestamp.disabledTextColor = config.textColor;
    timestamp.disabledClass = config.class;
    timestamp.disabledStyle = config.style;
    timestamp.disabledLabel = config.label;
  }

  return timestamp;
}

function isTimestampInDisabledDay(timestamp: Timestamp, day: DisabledDay): boolean {
  const target = getDayIdentifier(timestamp);

  if (Array.isArray(day) === true) {
    if (day.length === 2 && day[0] && day[1]) {
      const start = parsed(day[0]);
      const end = parsed(day[1]);

      return start !== null && end !== null && isBetweenDates(timestamp, start, end);
    }

    return day.some((date) => {
      const disabledDay = parseTimestamp(date);

      return disabledDay !== null && getDayIdentifier(disabledDay) === target;
    });
  }

  if (isDisabledDayConfig(day) === true) {
    const date = day.date;
    const startDate = day.from ?? day.start;
    const endDate = day.to ?? day.end;

    if (date !== undefined) {
      const disabledDay = parseTimestamp(date);

      return disabledDay !== null && getDayIdentifier(disabledDay) === target;
    }

    if (startDate !== undefined && endDate !== undefined) {
      const start = parsed(startDate);
      const end = parsed(endDate);

      return start !== null && end !== null && isBetweenDates(timestamp, start, end);
    }

    return false;
  }

  const disabledDay = parseTimestamp(day);

  return disabledDay !== null && getDayIdentifier(disabledDay) === target;
}

/**
 * Updates the passed {@link Timestamp} with disabled, if needed
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @param {string} [disabledBefore] In `YYYY-MM-DD` format
 * @param {string} [disabledAfter] In `YYYY-MM-DD` format
 * @param {number[]} [disabledWeekdays] An array of numbers representing weekdays [0 = Sun, ..., 6 = Sat]
 * @param {DisabledDays} [disabledDays] An array of days in 'YYYY-MM-DD' format. If an array with a pair of dates is in first array, then this is treated as a range. Object entries can include date/from/to plus color metadata.
 * @returns A new {@link Timestamp}
 */
export function updateDisabled(
  timestamp: Timestamp,
  disabledBefore?: string,
  disabledAfter?: string,
  disabledWeekdays?: number[],
  disabledDays?: DisabledDays,
): Timestamp {
  let ts = cloneTimestamp(timestamp);
  const t = getDayIdentifier(ts);

  if (disabledBefore !== undefined) {
    const disabledDay = parsed(disabledBefore);
    if (disabledDay) {
      const before = getDayIdentifier(disabledDay);
      if (t <= before) {
        ts.disabled = true;
      }
    }
  }

  if (ts.disabled !== true && disabledAfter !== undefined) {
    const disabledDay = parsed(disabledAfter!);
    if (disabledDay) {
      const after = getDayIdentifier(disabledDay);
      if (t >= after) {
        ts.disabled = true;
      }
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledWeekdays) && disabledWeekdays.length > 0) {
    for (const weekday in disabledWeekdays) {
      if (disabledWeekdays[weekday] === ts.weekday) {
        ts.disabled = true;
        break;
      }
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledDays) && disabledDays.length > 0) {
    for (const day of disabledDays) {
      if (isTimestampInDisabledDay(ts, day) === true) {
        ts = applyDisabledDayConfig(ts, isDisabledDayConfig(day) === true ? day : undefined);
        break;
      }
    }
  }

  return freezeTimestamp(ts);
}

/**
 * Updates the passed {@link Timestamp} with formatted data (time string, date string, weekday, day of year and workweek)
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @returns A new {@link Timestamp}
 */
export function updateFormatted(timestamp: Timestamp): Timestamp {
  const ts = cloneTimestamp(timestamp);
  ts.hasTime = true;
  ts.time = getTime(ts);
  ts.date = getDate(ts);
  ts.weekday = getWeekday(ts);
  ts.doy = getDayOfYear(ts) || 0;
  ts.workweek = getWorkWeek(ts);

  return freezeTimestamp(ts);
}

/**
 * Returns day of the year (doy) for the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The day of the year
 */
export function getDayOfYear(timestamp: Timestamp): number | void {
  if (timestamp.year === 0) return;
  return (
    (Date.UTC(timestamp.year, timestamp.month - 1, timestamp.day) -
      Date.UTC(timestamp.year, 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

/**
 * Returns workweek for the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The work week
 */
export function getWorkWeek(timestamp: Timestamp): number {
  let ts: Timestamp = timestamp;
  if (ts.year === 0) {
    const parsedToday = parseTimestamp(today());
    if (parsedToday) {
      ts = parsedToday;
    }
  }

  // Remove time components of date
  const weekday = new Date(Date.UTC(ts.year, ts.month - 1, ts.day));

  // Adjust the date to the correct day of the week
  const dayAdjustment = 4; // thursday is 4
  weekday.setUTCDate(weekday.getUTCDate() - ((weekday.getUTCDay() + 6) % 7) + dayAdjustment);

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  weekday.setUTCDate(weekday.getUTCDate() + dayAdjustment - (weekday.getUTCDay() || 7));

  // Get first day of year
  var yearStart = new Date(Date.UTC(weekday.getUTCFullYear(), 0, 1));

  // Calculate full weeks to nearest Thursday
  var weekNumber = Math.ceil(((weekday.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);

  return weekNumber;
}

/**
 * Returns weekday for the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The weekday
 */
export function getWeekday(timestamp: Timestamp): number {
  let weekday = timestamp.weekday;
  if (timestamp.hasDay) {
    const floor = Math.floor;
    const day = timestamp.day;
    const month = ((timestamp.month + 9) % MONTH_MAX) + 1;
    const century = floor(timestamp.year / 100);
    const year = (timestamp.year % 100) - (timestamp.month <= 2 ? 1 : 0);

    weekday =
      (((day +
        floor(2.6 * month - 0.2) -
        2 * century +
        year +
        floor(year / 4) +
        floor(century / 4)) %
        7) +
        7) %
      7;
  }

  return weekday ?? 0;
}

/**
 * Makes a copy of the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The original {@link Timestamp}
 * @returns {Timestamp} A copy of the original {@link Timestamp}
 */
export function copyTimestamp(timestamp: Timestamp): Timestamp {
  return freezeTimestamp(timestamp);
}

/**
 * Used internally to convert {@link Timestamp} used with 'parsed' or 'parseDate' so the 'date' portion of the {@link Timestamp} is correct.
 * @param {Timestamp} timestamp The (raw) {@link Timestamp}
 * @returns {string} A formatted date ('YYYY-MM-DD')
 */
export function getDate(timestamp: Timestamp): string {
  let str = `${padNumber(timestamp.year, 4)}-${padNumber(timestamp.month, 2)}`;

  if (timestamp.hasDay) str += `-${padNumber(timestamp.day, 2)}`;

  return str;
}

/**
 * Used internally to convert {@link Timestamp} with 'parsed' or 'parseDate' so the 'time' portion of the {@link Timestamp} is correct.
 * @param {Timestamp} timestamp The (raw) {@link Timestamp}
 * @returns {string} A formatted time ('hh:mm')
 */
export function getTime(timestamp: Timestamp): string {
  if (!timestamp.hasTime) {
    return "";
  }

  let time = `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`;
  if (timestamp.second !== undefined || timestamp.millisecond !== undefined) {
    time += `:${padNumber(timestamp.second ?? 0, 2)}`;
  }
  if (timestamp.millisecond !== undefined) {
    time += `.${padNumber(timestamp.millisecond, 3)}`;
  }

  return time;
}

/**
 * Returns a formatted string date and time ('YYYY-YY-MM hh:mm')
 * @param {Timestamp} timestamp The {@link Timestamp}
 * @returns {string} A formatted date time ('YYYY-MM-DD HH:mm')
 */
export function getDateTime(timestamp: Timestamp): string {
  return getDate(timestamp) + " " + (timestamp.hasTime ? getTime(timestamp) : "00:00");
}

/**
 * An alias for {relativeDays}
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @param {function} [mover=nextDay] The mover function to use (ie: {nextDay} or {prevDay}).
 * @param {number} [days=1] The number of days to move.
 * @param {number[]} [allowedWeekdays=[ 0, 1, 2, 3, 4, 5, 6 ]] An array of numbers representing the weekdays. ie: [0 = Sun, ..., 6 = Sat].
 * @returns A new {@link Timestamp}
 */
export function moveRelativeDays(
  timestamp: Timestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
): Timestamp {
  return relativeDays(timestamp, mover, days, allowedWeekdays);
}

/**
 * Moves the {@link Timestamp} the number of relative days
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @param {function} [mover=nextDay] The mover function to use (ie: {nextDay} or {prevDay}).
 * @param {number} [days=1] The number of days to move.
 * @param {number[]} [allowedWeekdays=[ 0, 1, 2, 3, 4, 5, 6 ]] An array of numbers representing the weekdays. ie: [0 = Sun, ..., 6 = Sat].
 * @returns A new {@link Timestamp}
 */
export function relativeDays(
  timestamp: Timestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
): Timestamp {
  let ts: Timestamp = copyTimestamp(timestamp);
  if (!allowedWeekdays.includes(Number(ts.weekday)) && ts.weekday === 0 && mover === nextDay) {
    ++days;
  }
  while (--days >= 0) {
    ts = mover(ts);
    if (allowedWeekdays.length < 7 && !allowedWeekdays.includes(Number(ts.weekday))) {
      ++days;
    }
  }

  return ts;
}

/**
 * Finds the specified weekday (forward or back) based on the {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to transform
 * @param {number} weekday The weekday number (Sun = 0, ..., Sat = 6)
 * @param {function} [mover=nextDay] The function to use ({prevDay} or {nextDay}).
 * @param {number} [maxDays=6] The number of days to look forward or back.
 * @returns A new {@link Timestamp}
 */
export function findWeekday(
  timestamp: Timestamp,
  weekday: number,
  mover = nextDay,
  maxDays = 6,
): Timestamp {
  let ts: Timestamp = copyTimestamp(timestamp);
  while (ts.weekday !== weekday && --maxDays >= 0) ts = mover(ts);
  return ts;
}

/**
 * Creates an array of {@link Timestamp}s based on start and end params
 * @param {Timestamp} start The starting {@link Timestamp}
 * @param {Timestamp} end The ending {@link Timestamp}
 * @param {Timestamp} now The relative day
 * @param {number[]} weekdays An array of numbers (representing days of the week) that are 0 (=Sunday) to 6 (=Saturday)
 * @param {string} [disabledBefore] Days before this date are disabled (YYYY-MM-DD)
 * @param {string} [disabledAfter] Days after this date are disabled (YYYY-MM-DD)
 * @param {number[]} [disabledWeekdays] An array representing weekdays that are disabled [0 = Sun, ..., 6 = Sat]
 * @param {DisabledDays} [disabledDays] An array of days in 'YYYY-MM-DD' format. If an array with a pair of dates is in first array, then this is treated as a range.
 * @param {number} [max=42] Max days to do
 * @param {number} [min=0]  Min days to do
 * @returns {Timestamp[]} The requested array of {@link Timestamp}s
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
): Timestamp[] {
  const begin = getDayIdentifier(start);
  const stop = getDayIdentifier(end);
  const days: Timestamp[] = [];
  let current: Timestamp = copyTimestamp(start);
  let currentIdentifier = 0;
  let stopped = currentIdentifier === stop;

  if (stop < begin) {
    return days;
  }

  while ((!stopped || days.length < min) && days.length < max) {
    currentIdentifier = getDayIdentifier(current);
    stopped = stopped || (currentIdentifier > stop && days.length >= min);
    if (stopped) {
      break;
    }
    if (!weekdays.includes(Number(current.weekday))) {
      current = relativeDays(current, nextDay);
      continue;
    }
    let day: Timestamp = copyTimestamp(current);
    day = updateFormatted(day);
    day = updateRelative(day, now);
    day = updateDisabled(day, disabledBefore, disabledAfter, disabledWeekdays, disabledDays);
    days.push(day);
    current = relativeDays(current, nextDay);
  }

  return days;
}

/**
 * Creates an array of interval {@link Timestamp}s based on params
 * @param {Timestamp} timestamp The starting {@link Timestamp}
 * @param {number} first The starting interval time
 * @param {number} minutes How many minutes between intervals (ie: 60, 30, 15 would be common ones)
 * @param {number} count The number of intervals needed
 * @param {Timestamp} now A relative {@link Timestamp} with time
 * @returns {Timestamp[]} The requested array of interval {@link Timestamp}s
 */
export function createIntervalList(
  timestamp: Timestamp,
  first: number,
  minutes: number,
  count: number,
  now: Timestamp,
): Timestamp[] {
  const intervals: Timestamp[] = [];

  for (let i = 0; i < count; ++i) {
    const mins = (first + i) * minutes;
    intervals.push(updateMinutes(timestamp, mins, now));
  }

  return intervals;
}

/**
 * Callback that returns `Intl.DateTimeFormat` options for a timestamp.
 *
 * Used by {@link createNativeLocaleFormatter} to let callers switch between
 * long and short formatting styles per timestamp.
 */
export type LocaleFormatter = (
  _timestamp: Timestamp,
  _short: boolean,
) => Intl.DateTimeFormatOptions;

/**
 * Function that formats a weekday key for a locale.
 */
export type WeekdayFormatter = (
  _weekday: keyof typeof weekdayDateMap,
  _type: string,
  _locale?: string,
) => string;

/**
 * Function that formats a zero-based month number for a locale.
 */
export type MonthFormatter = (_month: number, _type?: string, _locale?: string) => string;

/**
 * @callback getOptions
 * @param {Timestamp} timestamp A {@link Timestamp} object
 * @param {boolean} short True if using short options
 * @returns {Object} An Intl object representing options to be used
 */

/**
 * @callback formatter
 * @param {Timestamp} timestamp The {@link Timestamp} being used
 * @param {boolean} short If short format is being requested
 * @returns {string} The localized string of the formatted {@link Timestamp}
 */

/**
 * Returns a locale formatter backed by `Intl.DateTimeFormat`.
 *
 * The helper is SSR-safe: if `Intl.DateTimeFormat` is unavailable in a target
 * runtime, it returns a formatter that produces an empty string instead of
 * throwing during module load.
 *
 * @param {string} locale The locale to use (ie: en-US)
 * @param {getOptions} cb The function to call for options. This function should return an Intl formatted object. The function is passed (timestamp, short).
 * @returns {formatter} The function has params (timestamp, short). The short is to use the short options.
 */
export function createNativeLocaleFormatter(
  locale: string,
  cb: LocaleFormatter,
): (_timestamp: Timestamp, _short: boolean) => string {
  const emptyFormatter = (): string => "";

  /* istanbul ignore next */
  if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
    return emptyFormatter;
  }

  return (timestamp: Timestamp, short: boolean): string => {
    try {
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, cb(timestamp, short));
      return intlFormatter.format(makeDateTime(timestamp));
    } catch (e) /* istanbul ignore next */ {
      console.error(`Intl.DateTimeFormat: ${(e as Error).message} -> ${getDateTime(timestamp)}`);
      return "";
    }
  };
}

/**
 * Makes a JavaScript Date from the passed {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @param {boolean} utc True to get Date object using UTC
 * @returns {Date} A JavaScript Date
 */
export function makeDate(timestamp: Timestamp, utc = true): Date {
  if (utc) return new Date(Date.UTC(timestamp.year, timestamp.month - 1, timestamp.day, 0, 0));
  return new Date(timestamp.year, timestamp.month - 1, timestamp.day, 0, 0);
}

/**
 * Makes a JavaScript Date from the passed {@link Timestamp} (with time)
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @param {boolean} utc True to get Date object using UTC
 * @returns {Date} A JavaScript Date
 */
export function makeDateTime(timestamp: Timestamp, utc = true): Date {
  if (utc)
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
    );
  return new Date(
    timestamp.year,
    timestamp.month - 1,
    timestamp.day,
    timestamp.hour,
    timestamp.minute,
    timestamp.second ?? 0,
    timestamp.millisecond ?? 0,
  );
}

/**
 * Converts a {@link Timestamp} to a local JavaScript `Date`.
 *
 * This is equivalent to `makeDateTime(timestamp, false)`.
 *
 * @param {Timestamp} timestamp The {@link Timestamp} to convert
 * @returns {Date} A local JavaScript Date
 */
export function getDateObject(timestamp: Timestamp): Date {
  return makeDateTime(timestamp, false);
}

/**
 * Validates if the input is a finite number.
 *
 * @param input - The value to be validated. Can be a string or a number.
 * @returns A boolean indicating whether the input is a finite number.
 *          Returns true if the input is a finite number, false otherwise.
 */
export function validateNumber(input: string | number): boolean {
  return isFinite(Number(input));
}

/**
 * Given an array of {@link Timestamp}s, finds the max date (and possible time)
 * @param {Timestamp[]} timestamps This is an array of {@link Timestamp}s
 * @param {boolean=} useTime Default false; if true, uses time in the comparison as well
 * @returns The {@link Timestamp} with the highest date (and possibly time) value
 */
export function maxTimestamp(timestamps: Timestamp[], useTime = false): Timestamp {
  const func = useTime === true ? getDayTimeIdentifier : getDayIdentifier;
  return timestamps.reduce((prev, cur) => {
    return Math.max(func(prev), func(cur)) === func(prev) ? prev : cur;
  });
}

/**
 * Given an array of {@link Timestamp}s, finds the min date (and possible time)
 * @param {Timestamp[]} timestamps This is an array of {@link Timestamp}s
 * @param {boolean=} useTime Default false; if true, uses time in the comparison as well
 * @returns The {@link Timestamp} with the lowest date (and possibly time) value
 */
export function minTimestamp(timestamps: Timestamp[], useTime = false): Timestamp {
  const func = useTime === true ? getDayTimeIdentifier : getDayIdentifier;
  return timestamps.reduce((prev, cur) => {
    return Math.min(func(prev), func(cur)) === func(prev) ? prev : cur;
  });
}

/**
 * Determines if the passed {@link Timestamp} is between (or equal) to two {@link Timestamp}s (range)
 * @param {Timestamp} timestamp The {@link Timestamp} for testing
 * @param {Timestamp} startTimestamp The starting {@link Timestamp}
 * @param {Timestamp} endTimestamp The ending {@link Timestamp}
 * @param {boolean=} useTime If true, use time from the {@link Timestamp}s
 * @returns {boolean} True if {@link Timestamp} is between (or equal) to two {@link Timestamp}s (range)
 */
export function isBetweenDates(
  timestamp: Timestamp,
  startTimestamp: Timestamp,
  endTimestamp: Timestamp,
  useTime = false,
): boolean {
  const cd = getDayIdentifier(timestamp) + (useTime === true ? getTimeIdentifier(timestamp) : 0);
  const sd =
    getDayIdentifier(startTimestamp) + (useTime === true ? getTimeIdentifier(startTimestamp) : 0);
  const ed =
    getDayIdentifier(endTimestamp) + (useTime === true ? getTimeIdentifier(endTimestamp) : 0);

  return cd >= sd && cd <= ed;
}

/**
 * Determine if two ranges of {@link Timestamp}s overlap each other
 * @param {Timestamp} startTimestamp The starting {@link Timestamp} of first range
 * @param {Timestamp} endTimestamp The endinging {@link Timestamp} of first range
 * @param {Timestamp} firstTimestamp The starting {@link Timestamp} of second range
 * @param {Timestamp} lastTimestamp The ending {@link Timestamp} of second range
 * @returns {boolean} True if the two ranges overlap each other
 */
export function isOverlappingDates(
  startTimestamp: Timestamp,
  endTimestamp: Timestamp,
  firstTimestamp: Timestamp,
  lastTimestamp: Timestamp,
): boolean {
  const start = getDayIdentifier(startTimestamp);
  const end = getDayIdentifier(endTimestamp);
  const first = getDayIdentifier(firstTimestamp);
  const last = getDayIdentifier(lastTimestamp);
  return (
    (start >= first && start <= last) || // overlap left
    (end >= first && end <= last) || // overlap right
    (first >= start && end >= last) // surrounding
  );
}

/**
 * Date and time offsets accepted by {@link addToDate} and {@link addToDateClamped}.
 *
 * Positive values add time; negative values subtract time. The result is
 * normalized through JavaScript Date rules, so overflowing months, days,
 * seconds, or milliseconds roll into adjacent fields.
 */
export interface AddToDateOptions {
  /**
   * Number of years to add or subtract.
   */
  year?: number;

  /**
   * Number of months to add or subtract.
   */
  month?: number;

  /**
   * Number of days to add or subtract.
   */
  day?: number;

  /**
   * Number of hours to add or subtract.
   */
  hour?: number;

  /**
   * Number of minutes to add or subtract.
   */
  minute?: number;

  /**
   * Number of seconds to add or subtract.
   */
  second?: number;

  /**
   * Number of milliseconds to add or subtract.
   */
  millisecond?: number;
}

/**
 * Adds or subtracts date/time units from a timestamp.
 *
 * This function returns a new frozen {@link Timestamp}; it does not mutate the
 * timestamp passed in.
 *
 * @param {Timestamp} timestamp The {@link Timestamp} object
 * @param {Object} options configuration data
 * @param {number=} options.year If positive, adds years. If negative, removes years.
 * @param {number=} options.month If positive, adds months. If negative, removes month.
 * @param {number=} options.day If positive, adds days. If negative, removes days.
 * @param {number=} options.hour If positive, adds hours. If negative, removes hours.
 * @param {number=} options.minute If positive, adds minutes. If negative, removes minutes.
 * @param {number=} options.second If positive, adds seconds. If negative, removes seconds.
 * @param {number=} options.millisecond If positive, adds milliseconds. If negative, removes milliseconds.
 * @returns {Timestamp} A new normalized {@link Timestamp}
 */
export function addToDate(timestamp: Timestamp, options: AddToDateOptions): Timestamp {
  const ts = cloneTimestamp(timestamp);

  if (options.year) ts.year += options.year;
  if (options.month) ts.month += options.month;
  if (options.day) ts.day += options.day;
  if (options.hour) ts.hour += options.hour;
  if (options.minute) ts.minute += options.minute;
  if (options.second) ts.second = (ts.second ?? 0) + options.second;
  if (options.millisecond) ts.millisecond = (ts.millisecond ?? 0) + options.millisecond;

  return updateFormatted(normalizeTimestamp(ts));
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
 * This function returns a new frozen {@link Timestamp}; it does not mutate the
 * timestamp passed in.
 *
 * @param {Timestamp} timestamp The {@link Timestamp} object
 * @param {Object} options configuration data
 * @param {number=} options.year If positive, adds years. If negative, removes years.
 * @param {number=} options.month If positive, adds months. If negative, removes month.
 * @param {number=} options.day If positive, adds days. If negative, removes days.
 * @param {number=} options.hour If positive, adds hours. If negative, removes hours.
 * @param {number=} options.minute If positive, adds minutes. If negative, removes minutes.
 * @param {number=} options.second If positive, adds seconds. If negative, removes seconds.
 * @param {number=} options.millisecond If positive, adds milliseconds. If negative, removes milliseconds.
 * @returns {Timestamp} A new normalized {@link Timestamp}
 */
export function addToDateClamped(timestamp: Timestamp, options: AddToDateOptions): Timestamp {
  const ts = cloneTimestamp(timestamp);

  if (options.year || options.month) {
    const target = normalizeYearMonth(
      ts.year + (options.year ?? 0),
      ts.month + (options.month ?? 0),
    );
    ts.year = target.year;
    ts.month = target.month;
    ts.day = Math.min(ts.day, daysInMonth(ts.year, ts.month));
  }

  if (options.day) ts.day += options.day;
  if (options.hour) ts.hour += options.hour;
  if (options.minute) ts.minute += options.minute;
  if (options.second) ts.second = (ts.second ?? 0) + options.second;
  if (options.millisecond) ts.millisecond = (ts.millisecond ?? 0) + options.millisecond;

  return updateFormatted(normalizeTimestamp(ts));
}

/**
 * Normalizes a year/month pair while keeping the day out of the calculation.
 * This lets clamped date math choose the final day explicitly instead of
 * letting JavaScript Date roll an overflowing day into the next month.
 */
function normalizeYearMonth(year: number, month: number): Pick<Timestamp, "year" | "month"> {
  const date = new Date(year, month - 1, 1);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
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
  );
  const timestamp: MutableTimestamp = {
    ...ts,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };

  if (ts.second !== undefined || date.getSeconds() !== 0) {
    timestamp.second = date.getSeconds();
  }
  if (ts.millisecond !== undefined || date.getMilliseconds() !== 0) {
    timestamp.millisecond = date.getMilliseconds();
  }

  return freezeTimestamp(timestamp);
}

/**
 * Returns number of days between two {@link Timestamp}s
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns Number of days
 */
export function daysBetween(ts1: Timestamp, ts2: Timestamp): number {
  const diff = diffTimestamp(ts1, ts2, true);
  return Math.floor(diff / TIME_CONSTANTS.MILLISECONDS_IN.DAY);
}

/**
 * Returns number of weeks between two {@link Timestamp}s
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 */
export function weeksBetween(ts1: Timestamp, ts2: Timestamp): number {
  let t1: Timestamp = copyTimestamp(ts1);
  let t2: Timestamp = copyTimestamp(ts2);
  t1 = findWeekday(t1, 0);
  t2 = findWeekday(t2, 6);
  return Math.ceil(daysBetween(t1, t2) / TIME_CONSTANTS.DAYS_IN.WEEK);
}

// Known dates
const weekdayDateMap = {
  Sun: new Date("2020-01-05T00:00:00.000Z"),
  Mon: new Date("2020-01-06T00:00:00.000Z"),
  Tue: new Date("2020-01-07T00:00:00.000Z"),
  Wed: new Date("2020-01-08T00:00:00.000Z"),
  Thu: new Date("2020-01-09T00:00:00.000Z"),
  Fri: new Date("2020-01-10T00:00:00.000Z"),
  Sat: new Date("2020-01-11T00:00:00.000Z"),
};

type IntlNameFormat = "long" | "short" | "narrow";

function resolveIntlNameFormat(
  options: Record<IntlNameFormat, Intl.DateTimeFormatOptions>,
  type?: string,
): Intl.DateTimeFormatOptions {
  if (type === "long" || type === "short" || type === "narrow") {
    return options[type];
  }

  return options.long;
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
 */
export function getWeekdayFormatter(): WeekdayFormatter {
  const emptyFormatter = (): string => "";
  const options: Record<IntlNameFormat, Intl.DateTimeFormatOptions> = {
    long: { timeZone: "UTC", weekday: "long" },
    short: { timeZone: "UTC", weekday: "short" },
    narrow: { timeZone: "UTC", weekday: "narrow" },
  };

  /* istanbul ignore next */
  if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
    return emptyFormatter as WeekdayFormatter;
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
      );
      return intlFormatter.format(weekdayDateMap[weekday]);
    } catch (e) /* istanbul ignore next */ {
      if (e instanceof Error) {
        console.error(`Intl.DateTimeFormat: ${e.message} -> day of week: ${weekday}`);
      }
      return "";
    }
  }

  return weekdayFormatter;
}

/**
 * Retrieves an array of localized weekday names.
 *
 * @param {string} type - The format type for the weekday names. Can be 'narrow', 'short', or 'long'.
 * @param {string} [locale] - The locale to use for formatting. If not provided, the default locale is used.
 * @returns {string[]} An array of localized weekday names in the specified format.
 */
export function getWeekdayNames(type: string, locale: string): string[] {
  const shortWeekdays = Object.keys(weekdayDateMap);
  const weekdayFormatter = getWeekdayFormatter();
  return shortWeekdays.map((weekday) =>
    String(weekdayFormatter(weekday as keyof typeof weekdayDateMap, type, locale)),
  );
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
 */
export function getMonthFormatter(): MonthFormatter {
  const emptyFormatter = (): string => "";
  const options: Record<IntlNameFormat, Intl.DateTimeFormatOptions> = {
    long: { timeZone: "UTC", month: "long" },
    short: { timeZone: "UTC", month: "short" },
    narrow: { timeZone: "UTC", month: "narrow" },
  };

  /* istanbul ignore next */
  if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
    return emptyFormatter;
  }

  /**
   * Formats a given month into a string based on the specified type and locale.
   *
   * @param {number} month - The month to format (0 for January, 11 for December).
   * @param {string} type - The format type (e.g., 'narrow', 'long', 'short', etc.).
   * @param {string} [locale] - The locale to use for formatting (defaults to the system locale if not provided).
   * @returns {string} The formatted month string.
   */
  function monthFormatter(month: number, type = "long", locale?: string): string {
    try {
      const intlFormatter = new Intl.DateTimeFormat(
        locale || undefined,
        resolveIntlNameFormat(options, type),
      );
      const date = new Date();
      date.setDate(1);
      date.setMonth(month);
      return intlFormatter.format(date);
    } catch (e: unknown) /* istanbul ignore next */ {
      if (e instanceof Error) {
        console.error(`Intl.DateTimeFormat: ${e.message} -> month: ${month}`);
      }
      return "";
    }
  }

  return monthFormatter;
}

/**
 * Retrieves an array of localized month names.
 *
 * @param {string} type - The format type for the month names. Can be 'narrow', 'short', or 'long'.
 * @param {string} [locale] - The locale to use for formatting. If not provided, the default locale is used.
 * @returns {string[]} An array of localized month names in the specified format.
 */
export function getMonthNames(type: string, locale: string): string[] {
  const monthFormatter = getMonthFormatter();
  return [...Array(12).keys()].map((month) => monthFormatter(month, type, locale));
}

// the exports...
export default {
  PARSE_DATETIME,
  PARSE_DATE,
  PARSE_TIME,
  DAYS_IN_MONTH,
  DAYS_IN_MONTH_LEAP,
  DAYS_IN_MONTH_MIN,
  DAYS_IN_MONTH_MAX,
  MONTH_MAX,
  MONTH_MIN,
  DAY_MIN,
  TIME_CONSTANTS,
  DAYS_IN_WEEK,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  FIRST_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_WEEK,
  Timestamp,
  TimeObject,
  today,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  parseTime,
  validateTimestamp,
  parsed,
  parseTimestamp,
  parseDate,
  getDayIdentifier,
  getTimeIdentifier,
  getDayTimeIdentifier,
  diffTimestamp,
  updateRelative,
  updateMinutes,
  updateWeekday,
  updateDayOfYear,
  updateWorkWeek,
  updateDisabled,
  updateFormatted,
  getDayOfYear,
  getWorkWeek,
  getWeekday,
  isLeapYear,
  daysInMonth,
  copyTimestamp,
  padNumber,
  getDate,
  getTime,
  getDateTime,
  nextDay,
  prevDay,
  relativeDays,
  findWeekday,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter,
  makeDate,
  makeDateTime,
  getDateObject,
  validateNumber,
  isBetweenDates,
  isOverlappingDates,
  daysBetween,
  weeksBetween,
  addToDate,
  addToDateClamped,
  compareTimestamps,
  compareDate,
  compareTime,
  compareDateTime,
  getWeekdayFormatter,
  getWeekdayNames,
  getMonthFormatter,
  getMonthNames,
};
