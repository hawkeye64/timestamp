<template>
  <div class="timestamp-calendar-example">
    <section class="timestamp-calendar-example__summary">
      <div class="timestamp-calendar-example__summary-copy">
        <div class="text-overline text-primary">Hebrew calendar</div>
        <h3>{{ calendar.label }}</h3>
        <p>
          Hebrew dates use civil month numbering, so Tishrei starts the year and leap years insert
          Adar II before Nisan.
        </p>
      </div>

      <div class="timestamp-calendar-example__stats">
        <div class="timestamp-calendar-example__stat">
          <span>Visible date</span>
          <strong>{{ visible.date }}</strong>
          <small>{{ toGregorianDate(visible) }} Gregorian</small>
        </div>
        <div class="timestamp-calendar-example__stat">
          <span>Week range</span>
          <strong>{{ weekStart.date }} to {{ weekEnd.date }}</strong>
          <small>Starts on {{ getWeekdayLabel(weekdays[0]) }}</small>
        </div>
        <div class="timestamp-calendar-example__stat">
          <span>Month range</span>
          <strong>{{ monthStart.date }} to {{ monthEnd.date }}</strong>
          <small>{{ selectedMonthInfo.label }}</small>
        </div>
      </div>
    </section>

    <section class="timestamp-calendar-example__panel">
      <h4>Week containing {{ visible.date }}</h4>
      <div class="timestamp-calendar-example__week" dir="rtl" lang="he">
        <div
          v-for="day in weekDays"
          :key="`week-${day.date}`"
          class="timestamp-calendar-example__day"
          :class="{ 'timestamp-calendar-example__day--selected': day.date === visible.date }"
        >
          <span>{{ getWeekdayLabel(day.weekday) }}</span>
          <strong>{{ day.date }}</strong>
          <small>{{ toGregorianDate(day) }}</small>
        </div>
      </div>
    </section>

    <section class="timestamp-calendar-example__panel">
      <h4>Months in {{ visible.year }}</h4>
      <div class="timestamp-calendar-example__year" dir="rtl" lang="he">
        <button
          v-for="month in yearMonths"
          :key="`month-${month.month}`"
          type="button"
          class="timestamp-calendar-example__month-name"
          :class="{
            'timestamp-calendar-example__month-name--selected':
              month.month === selectedMonthInfo.month,
          }"
          :aria-pressed="month.month === selectedMonthInfo.month"
          @click="selectMonth(month.month)"
        >
          <span>{{ month.number }}</span>
          <strong>{{ month.label }}</strong>
          <small>{{ month.days }}</small>
        </button>
      </div>

      <h4>Days in {{ selectedMonthInfo.number }} {{ selectedMonthInfo.label }}</h4>
      <div class="timestamp-calendar-example__month" dir="rtl" lang="he">
        <div
          v-for="day in monthDays"
          :key="`month-${day.date}`"
          class="timestamp-calendar-example__month-day"
          :class="{ 'timestamp-calendar-example__month-day--selected': day.date === visible.date }"
        >
          {{ day.day }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  createCalendarDayList,
  formatCalendarDate,
  getCalendarEndOfMonth,
  getCalendarEndOfWeek,
  getCalendarStartOfMonth,
  getCalendarStartOfWeek,
  gregorianCalendar,
  parseCalendarTimestamp,
  type CalendarDateParts,
  type Timestamp,
} from '@timestamp-js/core'
import { hebrewCalendar } from '@timestamp-js/calendar-hebrew'

type LocaleWithWeekInfo = Intl.Locale & {
  weekInfo?: {
    firstDay: number
  }
}

interface CalendarMonthOption {
  month: number
  number: string
  label: string
  days: string
}

const calendar = hebrewCalendar
const locale = 'he-IL-u-ca-hebrew'
const weekdays = getLocaleWeekdays(locale)
const weekdayLabels = getLocalizedWeekdayLabels(locale)
const monthFormatter = new Intl.DateTimeFormat(locale, {
  calendar: calendar.intlCalendar,
  month: 'long',
  timeZone: 'UTC',
})
const numberFormatter = new Intl.NumberFormat(locale)
const dayCountFormatter = new Intl.NumberFormat(locale, {
  style: 'unit',
  unit: 'day',
  unitDisplay: 'long',
})
const visible = parseRequired('5785-01-15')
const selectedMonth = ref(visible.month)

const weekStart = computed(() => getCalendarStartOfWeek(visible, weekdays, calendar))
const weekEnd = computed(() => getCalendarEndOfWeek(visible, weekdays, calendar))
const weekDays = computed(() =>
  createCalendarDayList(weekStart.value, weekEnd.value, visible, calendar),
)
const monthAnchor = computed(() =>
  parseRequired(formatCalendarDate({ year: visible.year, month: selectedMonth.value, day: 1 })),
)
const monthStart = computed(() => getCalendarStartOfMonth(monthAnchor.value, calendar))
const monthEnd = computed(() => getCalendarEndOfMonth(monthAnchor.value, calendar))
const monthDays = computed(() =>
  createCalendarDayList(monthStart.value, monthEnd.value, visible, calendar),
)
const yearMonths = computed(() =>
  Array.from({ length: calendar.monthsInYear(visible.year) }, (_value, index) =>
    createMonthOption(index + 1),
  ),
)
const selectedMonthInfo = computed<CalendarMonthOption>(
  () =>
    yearMonths.value.find((month) => month.month === selectedMonth.value) ??
    createMonthOption(selectedMonth.value),
)

function parseRequired(value: string): Timestamp {
  const timestamp = parseCalendarTimestamp(value, calendar)

  if (timestamp === null) {
    throw new Error(`Invalid ${calendar.label} date: ${value}`)
  }

  return timestamp
}

function toGregorianDate(timestamp: Timestamp): string {
  return formatCalendarDate(gregorianCalendar.fromEpochDay(calendar.toEpochDay(timestamp)))
}

function getLocalizedMonthLabel(date: CalendarDateParts): string {
  return monthFormatter.format(new Date(calendar.toEpochDay(date) * 86400000))
}

function createMonthOption(month: number): CalendarMonthOption {
  return {
    month,
    number: numberFormatter.format(month),
    label: getLocalizedMonthLabel({ year: visible.year, month, day: 15 }),
    days: dayCountFormatter.format(calendar.daysInMonth(visible.year, month)),
  }
}

function selectMonth(month: number): void {
  selectedMonth.value = month
}

function getWeekdayLabel(weekday: number | undefined): string {
  return weekdayLabels[Number(weekday)] ?? ''
}

function getLocaleWeekdays(localeName: string): number[] {
  const firstDay = (new Intl.Locale(localeName) as LocaleWithWeekInfo).weekInfo?.firstDay ?? 7
  const firstWeekday = firstDay % 7

  return Array.from({ length: 7 }, (_value, index) => (firstWeekday + index) % 7)
}

function getLocalizedWeekdayLabels(localeName: string): string[] {
  const formatter = new Intl.DateTimeFormat(localeName, {
    calendar: calendar.intlCalendar,
    weekday: 'short',
    timeZone: 'UTC',
  })
  const sundayEpochDay = gregorianCalendar.toEpochDay({ year: 2024, month: 3, day: 24 })

  return Array.from({ length: 7 }, (_value, weekday) => {
    const date = new Date((sundayEpochDay + weekday) * 86400000)
    return formatter.format(date)
  })
}
</script>

<style scoped lang="scss">
.timestamp-calendar-example {
  display: grid;
  gap: 2rem;
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 2rem;
}

.timestamp-calendar-example__summary {
  display: grid;
  gap: 1.25rem;
}

.timestamp-calendar-example__summary-copy {
  display: grid;
  gap: 0.75rem;
}

.timestamp-calendar-example__summary h3,
.timestamp-calendar-example__panel h4 {
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
}

.timestamp-calendar-example__summary h3 {
  font-size: 2.25rem;
}

.timestamp-calendar-example__summary p {
  max-width: 70ch;
  margin: 0;
  line-height: 1.6;
}

.timestamp-calendar-example__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.timestamp-calendar-example__stat,
.timestamp-calendar-example__day,
.timestamp-calendar-example__month-day,
.timestamp-calendar-example__month-name {
  border: 1px solid rgba(125, 125, 125, 0.35);
  background: rgba(125, 125, 125, 0.08);
}

.timestamp-calendar-example__stat {
  display: grid;
  gap: 0.25rem;
  min-width: 0;
  padding: 0.875rem 1rem;
  border-radius: 6px;
}

.timestamp-calendar-example__stat span,
.timestamp-calendar-example__stat small,
.timestamp-calendar-example__day small,
.timestamp-calendar-example__month-name small {
  opacity: 0.72;
}

.timestamp-calendar-example__stat strong,
.timestamp-calendar-example__day strong,
.timestamp-calendar-example__month-name strong {
  overflow-wrap: anywhere;
}

.timestamp-calendar-example__panel {
  display: grid;
  gap: 1rem;
}

.timestamp-calendar-example__panel h4 {
  font-size: 1.5rem;
}

.timestamp-calendar-example__week,
.timestamp-calendar-example__year,
.timestamp-calendar-example__month {
  display: grid;
  gap: 0.5rem;
}

.timestamp-calendar-example__week {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.timestamp-calendar-example__day {
  display: grid;
  gap: 0.35rem;
  min-width: 0;
  min-height: 7.5rem;
  padding: 0.75rem;
  border-radius: 6px;
  text-align: start;
}

.timestamp-calendar-example__day span {
  font-size: 1rem;
  font-weight: 700;
}

.timestamp-calendar-example__day--selected,
.timestamp-calendar-example__month-day--selected {
  border-color: currentColor;
  background: rgba(25, 118, 210, 0.16);
}

.timestamp-calendar-example__year {
  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
}

.timestamp-calendar-example__month-name {
  appearance: none;
  display: grid;
  gap: 0.3rem;
  min-height: 6rem;
  padding: 0.75rem;
  border-radius: 6px;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.timestamp-calendar-example__month-name:hover,
.timestamp-calendar-example__month-name--selected {
  border-color: currentColor;
  background: rgba(25, 118, 210, 0.16);
}

.timestamp-calendar-example__month-name:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.timestamp-calendar-example__month {
  grid-template-columns: repeat(7, minmax(2.5rem, 1fr));
}

.timestamp-calendar-example__month-day {
  display: grid;
  min-height: 2.75rem;
  place-items: center;
  border-radius: 4px;
  font-weight: 600;
}

@media (max-width: 780px) {
  .timestamp-calendar-example {
    padding: 1rem;
  }

  .timestamp-calendar-example__stats {
    grid-template-columns: 1fr;
  }

  .timestamp-calendar-example__week {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .timestamp-calendar-example__week,
  .timestamp-calendar-example__year {
    grid-template-columns: 1fr;
  }
}
</style>
