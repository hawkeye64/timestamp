<template>
  <section class="timestamp-landing markdown-brand">
    <header class="timestamp-hero">
      <div class="timestamp-hero__glow timestamp-hero__glow--one" />
      <div class="timestamp-hero__glow timestamp-hero__glow--two" />

      <div class="timestamp-hero__copy">
        <div class="timestamp-eyebrow">Framework Agnostic</div>
        <img src="/timestamp-logo.svg" alt="Timestamp logo" class="timestamp-hero__logo" />
        <h1>Timestamp</h1>
        <p class="timestamp-hero__subtitle">{{ siteConfig.description }}</p>
        <p class="timestamp-hero__lede">
          Parse, compare, and compose immutable date and time objects without binding your app to a
          UI framework, browser timezone surprise, or heavyweight date runtime.
        </p>

        <div class="timestamp-actions">
          <q-btn
            to="/getting-started/introduction"
            no-caps
            rounded
            unelevated
            class="timestamp-action timestamp-action--solid"
          >
            <span>Get Started</span>
            <q-icon name="arrow_forward" />
          </q-btn>
          <q-btn
            to="/getting-started/installation"
            no-caps
            rounded
            unelevated
            class="timestamp-action timestamp-action--ghost"
          >
            <span>Install</span>
            <q-icon name="download" />
          </q-btn>
          <q-btn
            href="https://github.com/hawkeye64/timestamp"
            target="_blank"
            rel="noopener noreferrer"
            no-caps
            rounded
            unelevated
            class="timestamp-action timestamp-action--ghost"
          >
            <span>GitHub Repo</span>
            <q-icon :name="fabGithub" />
          </q-btn>
        </div>

        <div class="timestamp-pills" aria-label="Timestamp capabilities">
          <span v-for="pill in heroPills" :key="pill">{{ pill }}</span>
        </div>
      </div>

      <div class="timestamp-hero__visual" aria-label="Timestamp API preview">
        <div class="timestamp-preview">
          <div class="timestamp-preview__header">
            <span class="timestamp-eyebrow">Deterministic Core</span>
            <span class="timestamp-preview__note">Browser + Node + SSR</span>
          </div>

          <div class="timestamp-preview__stack">
            <article class="timestamp-code-card timestamp-code-card--main">
              <span class="timestamp-code-card__label">immutable timestamp</span>
              <pre><code>const start =
  parseTimestamp("2026-06-08")
const next =
  addToDate(start, { day: 7 })

start !== next
formatTimestamp(next)</code></pre>
            </article>

            <article class="timestamp-mini-card timestamp-mini-card--top">
              <q-icon name="lock_clock" />
              <strong>Immutable</strong>
              <span>Every helper returns a new object.</span>
            </article>

            <article class="timestamp-mini-card timestamp-mini-card--bottom">
              <q-icon name="public" />
              <strong>Timezone-aware</strong>
              <span>Suffixes stay preserved unless converted.</span>
            </article>
          </div>
        </div>
      </div>
    </header>

    <section class="timestamp-section">
      <div class="timestamp-section__heading">
        <div class="timestamp-eyebrow">Why It Exists</div>
        <h2>Small primitives for dates that need to behave the same everywhere</h2>
        <p>
          Timestamp is meant to sit underneath UI components, API clients, docs examples, tests, and
          server-rendered apps without bringing framework assumptions along for the ride.
        </p>
      </div>

      <div class="timestamp-feature-grid">
        <article v-for="feature in features" :key="feature.title" class="timestamp-feature">
          <div class="timestamp-feature__icon">
            <q-icon :name="feature.icon" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.body }}</p>
        </article>
      </div>
    </section>

    <section class="timestamp-resource-grid">
      <article class="timestamp-resource timestamp-resource--primary">
        <div class="timestamp-eyebrow">Design Model</div>
        <h2>Wall-clock friendly first, explicit instant conversion later</h2>
        <p>
          ISO strings with seconds, milliseconds, and timezone suffixes can be parsed today. The
          suffix is stored instead of silently converting the value, which keeps UI calendar work
          from drifting across server/client timezones.
        </p>
        <div class="timestamp-resource__links">
          <q-btn to="/developing/timezone-model" no-caps rounded unelevated>Timezone Model</q-btn>
          <q-btn to="/getting-started/ssr" no-caps rounded unelevated>SSR Notes</q-btn>
        </div>
      </article>

      <article class="timestamp-resource">
        <div class="timestamp-eyebrow">API Map</div>
        <div class="timestamp-link-list">
          <q-btn v-for="link in apiLinks" :key="link.to" :to="link.to" no-caps rounded unelevated>
            <q-icon :name="link.icon" />
            <span>{{ link.label }}</span>
          </q-btn>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { fabGithub } from '@quasar/extras/fontawesome-v7'
import siteConfig from '../../siteConfig'

const heroPills = ['Immutable', 'ISO parsing', 'SSR-friendly', 'ESM', 'Zero UI dependency']

const features = [
  {
    icon: 'event',
    title: 'Date + Time Objects',
    body: 'Represent date-only, time-only, and date-time values with explicit fields instead of hidden mutable Date state.',
  },
  {
    icon: 'sync_alt',
    title: 'Safe Date Math',
    body: 'Add, compare, diff, clamp, and validate values while returning fresh timestamp objects each time.',
  },
  {
    icon: 'travel_explore',
    title: 'Runtime Agnostic',
    body: 'Use the same helpers in browsers, Node.js, SSR, serverless, edge runtimes, Vue, React, or plain TypeScript.',
  },
  {
    icon: 'schedule',
    title: 'Intervals + Workweeks',
    body: 'Build predictable calendar structures such as day lists, intervals, weekdays, month labels, and workweek ranges.',
  },
  {
    icon: 'verified',
    title: 'Deterministic Testing',
    body: 'Prefer caller-provided values and explicit UTC helpers when server/client timezone differences matter.',
  },
  {
    icon: 'extension',
    title: 'Room to Grow',
    body: 'Future modules can add instant conversion, non-Gregorian calendars, relative labels, and duration helpers.',
  },
]

const apiLinks = [
  { label: 'Parsing', to: '/getting-started/parsing', icon: 'data_object' },
  { label: 'Timestamp Object', to: '/api/timestamp-object', icon: 'description' },
  { label: 'Calendar Helpers', to: '/api/calendar-helpers', icon: 'calendar_month' },
  { label: 'Comparisons', to: '/api/comparisons', icon: 'compare_arrows' },
]
</script>

<style lang="scss" scoped>
.timestamp-landing {
  padding: 28px clamp(16px, 2.5vw, 34px) 44px;
  color: var(--qpress-text-primary);
}

.timestamp-hero,
.timestamp-feature,
.timestamp-resource,
.timestamp-preview {
  border: 1px solid var(--qpress-border-strong);
  box-shadow: var(--qpress-card-shadow);
}

.timestamp-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(320px, 1.04fr);
  gap: clamp(22px, 4vw, 46px);
  overflow: hidden;
  padding: clamp(24px, 5vw, 56px);
  border-radius: 34px;
  background:
    radial-gradient(circle at 16% 4%, var(--qpress-hero-glow-primary), transparent 34%),
    radial-gradient(circle at 88% 80%, var(--qpress-hero-glow-secondary), transparent 30%),
    linear-gradient(140deg, var(--qpress-hero-start), var(--qpress-hero-end));
}

.timestamp-hero__glow {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 999px;
  background: var(--qpress-mesh-color);
  filter: blur(10px);
  pointer-events: none;
}

.timestamp-hero__glow--one {
  top: -110px;
  left: -70px;
}

.timestamp-hero__glow--two {
  right: -100px;
  bottom: -120px;
}

.timestamp-hero__copy,
.timestamp-hero__visual {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.timestamp-hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.timestamp-eyebrow {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 14px;
  border: 1px solid var(--qpress-border-strong);
  border-radius: 999px;
  background: var(--qpress-chip-bg);
  color: var(--qpress-chip-text);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.timestamp-hero__logo {
  width: clamp(84px, 10vw, 118px);
  border-radius: 28px;
  box-shadow: var(--qpress-shadow-large);
}

.timestamp-hero h1 {
  margin: 0;
  color: var(--qpress-text-primary);
  font-size: clamp(3.25rem, 8vw, 6.4rem);
  font-weight: 850;
  letter-spacing: -0.07em;
  line-height: 0.92;
}

.timestamp-hero__subtitle {
  max-width: 680px;
  margin: 0;
  color: var(--qpress-text-primary);
  font-size: clamp(1.15rem, 2vw, 1.48rem);
  font-weight: 750;
  line-height: 1.45;
}

.timestamp-hero__lede,
.timestamp-section__heading p,
.timestamp-feature p,
.timestamp-resource p,
.timestamp-mini-card span {
  color: var(--qpress-text-soft);
  line-height: 1.7;
}

.timestamp-hero__lede {
  max-width: 640px;
  margin: 0;
}

.timestamp-actions,
.timestamp-pills,
.timestamp-resource__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  max-width: 100%;
}

.timestamp-action {
  min-height: 48px;
  padding: 0 18px;
  border: 1px solid var(--qpress-border-strong);
  font-weight: 800;
}

.timestamp-action :deep(.q-btn__content) {
  gap: 10px;
}

.timestamp-action--solid {
  background: var(--qpress-action-solid-bg);
  color: var(--qpress-action-solid-text);
  box-shadow: var(--qpress-action-solid-shadow);
}

.timestamp-action--ghost {
  background: var(--qpress-action-ghost-bg);
  color: var(--qpress-action-ghost-text);
}

.timestamp-pills span {
  padding: 8px 12px;
  border: 1px solid var(--qpress-pill-border);
  border-radius: 999px;
  background: var(--qpress-pill-bg);
  color: var(--qpress-pill-text);
  font-size: 0.84rem;
  font-weight: 700;
}

.timestamp-preview {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;
  min-height: 100%;
  padding: clamp(18px, 3vw, 26px);
  border-radius: 30px;
  background:
    linear-gradient(180deg, var(--qpress-panel-gradient-top), var(--qpress-panel-gradient-bottom)),
    var(--qpress-surface-panel);
}

.timestamp-preview__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.timestamp-preview__note {
  color: var(--qpress-text-muted);
  font-size: 0.84rem;
  font-weight: 700;
}

.timestamp-preview__stack {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.28fr) minmax(140px, 0.42fr);
  grid-template-rows: auto auto;
  align-items: center;
  gap: clamp(14px, 2.2vw, 24px);
  min-height: clamp(320px, 31vw, 390px);
}

.timestamp-code-card,
.timestamp-mini-card {
  position: relative;
  box-sizing: border-box;
  border: 1px solid var(--qpress-highlight-border);
  background: var(--qpress-highlight-bg);
  backdrop-filter: blur(10px);
}

.timestamp-code-card {
  z-index: 2;
  grid-row: 1 / span 2;
  align-self: center;
  width: 100%;
  padding: clamp(18px, 2.4vw, 24px);
  border-radius: 24px;
  box-shadow: var(--qpress-shadow-large);
  transform: rotate(-2deg);
}

.timestamp-code-card__label {
  display: block;
  margin-bottom: 12px;
  color: var(--qpress-meta-text);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.timestamp-code-card pre {
  overflow: hidden;
  max-width: 100%;
  margin: 0;
  color: var(--qpress-text-primary);
  font-size: clamp(0.72rem, 1.05vw, 0.84rem);
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
}

.timestamp-mini-card {
  z-index: 3;
  display: grid;
  gap: 5px;
  width: 100%;
  padding: 16px;
  border-radius: 22px;
  box-shadow: var(--qpress-card-shadow);
}

.timestamp-mini-card :deep(.q-icon) {
  color: var(--qpress-icon-color);
  font-size: 1.75rem;
}

.timestamp-mini-card strong {
  color: var(--qpress-text-primary);
  font-size: 0.96rem;
}

.timestamp-mini-card--top {
  align-self: end;
  transform: rotate(3deg);
}

.timestamp-mini-card--bottom {
  align-self: start;
  transform: rotate(-4deg);
}

.timestamp-section,
.timestamp-resource-grid {
  margin-top: 30px;
}

.timestamp-section__heading {
  max-width: 820px;
  margin: 0 auto 22px;
  text-align: center;
}

.timestamp-section__heading h2,
.timestamp-resource h2 {
  margin: 14px 0 10px;
  color: var(--qpress-text-primary);
  font-size: clamp(1.85rem, 3.4vw, 2.7rem);
  line-height: 1.12;
}

.timestamp-section__heading p,
.timestamp-resource p {
  margin: 0;
}

.timestamp-feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.timestamp-feature,
.timestamp-resource {
  overflow: hidden;
  padding: 22px;
  border-radius: 24px;
  background: var(--qpress-surface-raised);
}

.timestamp-feature__icon {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 16px;
  border-radius: 16px;
  background: var(--qpress-icon-bg);
  color: var(--qpress-icon-color);
  font-size: 1.45rem;
}

.timestamp-feature h3 {
  margin: 0 0 9px;
  color: var(--qpress-text-primary);
  font-size: 1.08rem;
}

.timestamp-feature p {
  margin: 0;
  font-size: 0.94rem;
}

.timestamp-resource-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  gap: 18px;
}

.timestamp-resource__links {
  margin-top: 18px;
}

.timestamp-resource__links :deep(.q-btn),
.timestamp-link-list :deep(.q-btn) {
  border: 1px solid var(--qpress-border-strong);
  background: var(--qpress-resource-link-bg);
  color: var(--qpress-resource-link-text);
  font-weight: 800;
}

.timestamp-link-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.timestamp-link-list :deep(.q-btn__content) {
  justify-content: flex-start;
  gap: 10px;
}

@media (max-width: 980px) {
  .timestamp-hero,
  .timestamp-resource-grid {
    grid-template-columns: 1fr;
  }

  .timestamp-preview__stack {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 16px;
    min-height: 0;
  }

  .timestamp-code-card,
  .timestamp-mini-card {
    position: relative;
    inset: auto;
  }

  .timestamp-code-card {
    transform: rotate(-1deg);
  }

  .timestamp-mini-card {
    width: 100%;
  }

  .timestamp-mini-card--top {
    right: auto;
    transform: rotate(1.5deg);
  }

  .timestamp-mini-card--bottom {
    right: auto;
    bottom: auto;
    transform: rotate(-1.5deg);
  }

  .timestamp-feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .timestamp-landing {
    padding-inline: 14px;
  }

  .timestamp-hero {
    padding: 22px;
    border-radius: 26px;
  }

  .timestamp-hero__logo {
    width: 72px;
    border-radius: 22px;
  }

  .timestamp-hero h1 {
    font-size: clamp(3rem, 17vw, 4.35rem);
    letter-spacing: -0.08em;
  }

  .timestamp-hero__subtitle {
    font-size: 1rem;
    line-height: 1.35;
  }

  .timestamp-hero__lede {
    font-size: 0.95rem;
  }

  .timestamp-action {
    min-height: 44px;
    padding: 0 14px;
    font-size: 0.82rem;
  }

  .timestamp-feature-grid {
    grid-template-columns: 1fr;
  }

  .timestamp-preview__stack {
    gap: 14px;
  }

  .timestamp-preview__header {
    display: grid;
    justify-content: stretch;
  }

  .timestamp-preview__note {
    font-size: 0.78rem;
  }

  .timestamp-code-card {
    padding: 16px;
    border-radius: 20px;
  }

  .timestamp-code-card pre {
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.74rem;
    line-height: 1.6;
  }

  .timestamp-mini-card {
    padding: 15px;
    border-radius: 18px;
  }

  .timestamp-code-card,
  .timestamp-mini-card--top,
  .timestamp-mini-card--bottom {
    transform: none;
  }
}

@media (max-width: 420px) {
  .timestamp-landing {
    padding-inline: 10px;
  }

  .timestamp-hero {
    padding: 18px 16px;
  }

  .timestamp-hero h1 {
    font-size: clamp(2.65rem, 13.5vw, 3.45rem);
  }

  .timestamp-actions {
    gap: 8px;
  }

  .timestamp-action {
    flex: 1 1 calc(50% - 8px);
    min-width: 0;
  }

  .timestamp-action :deep(.q-btn__content) {
    gap: 7px;
  }

  .timestamp-action--ghost:last-child {
    flex-basis: 100%;
  }

  .timestamp-preview {
    padding: 14px;
  }

  .timestamp-code-card pre {
    font-size: 0.68rem;
  }
}
</style>
