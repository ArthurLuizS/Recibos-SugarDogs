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
          quantity: 1,
          unitPrice: null,
          discount: 0,
          servicePrice: null,
        },
      ],
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    discount: (state) => {
      for (let i = 0; i < state.form.serviceData.length; i += 1) {
        let service = state.form.serviceData[i];
        if (service.discount === "") service.discount = 0;
        service.servicePrice =
          parseInt(service.unitPrice) * parseInt(service.quantity) -
          (parseInt(service.discount) / 100) *
            (parseInt(service.unitPrice) * parseInt(service.quantity));
      }
    },
  },
  actions: {
    moreService() {
      this.form.serviceData.push({
        type: null,
        quantity: 1,
        unitPrice: null,
        discount: 0,
      });
    },
  },
});
