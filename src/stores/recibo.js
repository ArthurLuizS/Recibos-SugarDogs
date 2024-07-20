import { defineStore } from "pinia";

export const useRecibo = defineStore("recibo", {
  state: () => ({
    form: {},
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {},
});
