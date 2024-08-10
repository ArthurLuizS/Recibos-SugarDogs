<template>
  <div class="container" ref="ReciboSugar">
    <div class="header tw-p-[20px] flex row justify-between">
      <div>
        <q-img
          src="src/assets/sugar-logo.png"
          class="tw-w-[120px] tw-h-[120px]"
        />
      </div>
      <div
        class="flex column tw-text-sm tw-max-w-[150px] tw-overflow-hidden tw-capitalize"
      >
        <div class="flex column tw-max-w-[150px]">
          <span class="tw-text-4xl tw-text-gray-600">Recibo</span>
          <span class="tw-text-base tw-text-center">
            {{
              reciboStore.form.infoData.data != null
                ? reciboStore.form.infoData.data
                : dataFormatada
            }}
          </span>
        </div>
        <div>
          <span>Para: </span>
          <span>{{ reciboStore.form?.infoData.tutorName }} </span>
        </div>
        <div>
          <span> Pet: </span>
          <span>{{ reciboStore.form?.infoData.petName }} </span>
        </div>
        <div>
          <span> Raça: </span>
          <span>{{ reciboStore.form?.infoData.petBreed }} </span>
        </div>
        <div>
          <span> Tel: </span>
          <span>{{ reciboStore.form?.infoData.contact }} </span>
        </div>
      </div>
    </div>
    <div class="">
      <q-table
        dense
        hide-bottom
        :rows="rows"
        :columns="columns"
        :row-class="rowClass"
      >
        <template v-slot:body-cell="props">
          <q-td
            :props="props"
            :class="props.pageIndex % 2 == 0 ? 'even' : 'odd'"
          >
            {{ props.value }}
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRecibo } from "src/stores/recibo";

const reciboStore = useRecibo();

const columns = [
  {
    name: "quantidade",
    label: "Qtd",
    field: "quantity",
    align: "left",
  },
  {
    name: "servico",
    label: "Serviço",
    field: "type",
    align: "left",
  },
  {
    name: "preco",
    label: "Preço",
    field: "unitPrice",
    align: "left",
    format: (val) => (val != null && val !== "" ? `${val}R$` : ""),
  },
  {
    name: "desconto",
    label: "Desconto",
    field: "discount",
    align: "left",
    format: (val) => (val != null && val !== "" ? `${val}%` : ""),
  },
  {
    name: "total",
    field: "servicePrice",
    label: "Total",
    align: "right",
    format: (val) => `${val}R$`,
  },
];

const rows = ref([
  ...reciboStore.form.serviceData,
  {
    servicePrice: reciboStore.form.total,
  },
]);

const rowClass = (row, index) => (index % 2 === 0 ? "even-row" : "odd-row");

const dataAtual = new Date();
const dia = String(dataAtual.getDate()).padStart(2, "0");
const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
const ano = dataAtual.getFullYear();

const dataFormatada = `${dia}/${mes}/${ano}`;
</script>

<style>
.even {
  background-color: #a800fe !important;
  color: white !important;
}

.odd {
  background-color: #eee123 !important;
}
</style>
