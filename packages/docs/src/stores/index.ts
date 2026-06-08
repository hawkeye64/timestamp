import { defineStore } from "#q-app";
import { createPinia } from "pinia";

declare module "pinia" {
  // oxlint-disable-next-line typescript/no-empty-object-type
  export interface PiniaCustomProperties {
    // Add custom store properties here, if any.
  }
}

export default defineStore(() => {
  return createPinia();
});
