<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from "quasar";
import { useDark } from "@/.q-press/composables/dark";
import getMeta from "@/.q-press/assets/get-meta";

const { initDark } = useDark();
initDark();

useMeta({
  title: "Timestamp for JavaScript and TypeScript",
  titleTemplate: (title) => `${title} | Timestamp`,

  meta: getMeta(
    "Timestamp - Immutable date and time helpers for JavaScript and TypeScript",
    "Timestamp provides framework-agnostic, immutable date, time, interval, and range helpers for browser, Node.js, SSR, and modern JavaScript runtimes.",
  ),
});
</script>
