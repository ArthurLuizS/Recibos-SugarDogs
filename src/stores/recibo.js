import { defineStore } from "pinia";

export const useRecibo = defineStore("recibo", {
  state: () => ({
    form: {
      infoData: {
        data: null,
        tutorName: null,
        petName: null,
        petBreed: null,
        contact: null,
      },
      serviceData: [
        {
          type: null,
          quantity: null,
          unitPrice: null,
          discount: null,
        },
      ],
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    moreService() {
      this.form.serviceData.push({
        type: null,
        quantity: null,
        unitPrice: null,
        discount: null,
      });
    },
  },
});
