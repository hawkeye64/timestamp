<template>
  <div class="timestamp-calendar-example">
    <section class="timestamp-calendar-example__summary">
      <div>
        <div class="text-overline text-primary">Indian National Calendar</div>
        <h3>{{ calendar.label }}</h3>
        <p>
          Saka dates use the same adapter-aware range helpers, so view code can stay calendar
          agnostic once the adapter is selected.
        </p>
      </div>

      <q-list dense bordered separator class="rounded-borders">
        <q-item>
          <q-item-section>
            <q-item-label caption>Visible date</q-item-label>
            <q-item-label
              >{{ visible.date }} ({{ toGregorianDate(visible) }} Gregorian)</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Week range</q-item-label>
            <q-item-label>{{ weekStart.date }} to {{ weekEnd.date }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Locale week start</q-item-label>
            <q-item-label>{{ getWeekdayLabel(weekdays[0]) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Month range</q-item-label>
            <q-item-label>{{ monthStart.date }} to {{ monthEnd.date }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </section>

    <section class="timestamp-calendar-example__panel">
      <h4>Week containing {{ visible.date }}</h4>
      <div class="timestamp-calendar-example__week">
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
      <div class="timestamp-calendar-example__year">
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
      <div class="timestamp-calendar-example__month">
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
import { indianNationalCalendar } from '@timestamp-js/calendar-saka'

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

const calendar = indianNationalCalendar
const locale = 'hi-IN-u-ca-indian'
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
const visible = parseRequired('1946-01-15')
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

<style lang="scss">
.timestamp-calendar-example {
  display: grid;
  gap: 24px;
  padding: 24px;

  &__summary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
    gap: 24px;
    align-items: start;
  }

  &__panel {
    display: grid;
    gap: 14px;

    h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  &__week {
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
  }

  &__day,
  &__month-day,
  &__month-name {
    border: 1px solid rgba(125, 125, 125, 0.35);
    border-radius: 6px;
    background: rgba(125, 125, 125, 0.08);
  }

  &__day {
    display: grid;
    flex: 1 1 0;
    gap: 4px;
    padding: 10px;
    min-width: 0;

    span,
    small {
      opacity: 0.72;
    }

    strong {
      font-weight: 600;
    }

    &--selected {
      border-color: currentColor;
      background: rgba(25, 118, 210, 0.16);
    }
  }

  &__month {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__year {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__month-day {
    display: grid;
    flex: 1 0 44px;
    min-height: 40px;
    place-items: center;

    &--selected {
      border-color: currentColor;
      background: rgba(25, 118, 210, 0.16);
      font-weight: 700;
    }
  }

  &__month-name {
    appearance: none;
    display: grid;
    flex: 1 1 150px;
    gap: 4px;
    padding: 10px;
    color: inherit;
    font: inherit;
    text-align: inherit;
    cursor: pointer;

    span,
    small {
      opacity: 0.72;
    }

    &--selected {
      border-color: currentColor;
      background: rgba(25, 118, 210, 0.16);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }
}

@media (max-width: 700px) {
  .timestamp-calendar-example {
    padding: 16px;

    &__summary,
    &__week {
      flex-direction: column;
    }

    &__summary {
      grid-template-columns: 1fr;
    }
  }
}
</style>
