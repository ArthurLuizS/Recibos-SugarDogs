<template>
  <div class="">
    <q-form
      class="flex items-center justify-center column full-width"
      @reset="onReset"
      @submit="gerarRecibo"
    >
      <q-scroll-area
        :style="
          $q.screen.gt.sm
            ? 'height: 80vh; width: 70vw;'
            : 'height: 90vh; width: 97vw'
        "
      >
        <div class="flex column full-width">
          <label>Dados do Tutor e PET</label>
          <div class="flex row items-center FormData q-pa-xs" style="gap: 16px">
            <q-input
              dense
              rounded
              outlined
              label="Data do Recibo"
              v-model="form.infoData.data"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Nome do Tutor"
              v-model="form.infoData.tutorName"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Nome do Pet"
              v-model="form.infoData.petName"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Raça do Pet"
              v-model="form.infoData.petBreed"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Contato"
              v-model="form.infoData.contact"
            ></q-input>
            <q-separator style="width: 100%" />
          </div>
        </div>
        <div class="full-width" style="position: relative">
          <label>Serviços</label>
          <div
            class="FormData flex row q-pa-xs q-pt-lg"
            v-for="(service, index) in form.serviceData"
            :key="index"
            style="position: relative; gap: 16px"
          >
            <label style="position: absolute; top: 2px">{{ 1 + index }}</label>
            <q-select
              dense
              :options="options"
              rounded
              outlined
              label="Tipo"
            ></q-select>
            <q-input dense rounded outlined label="Quantidade"></q-input>
            <q-input dense rounded outlined label="Preço Unitário"></q-input>
            <q-input dense rounded outlined label="Desconto"></q-input>
            <q-btn
              round
              icon="delete"
              color="negative"
              size="xs"
              style="position: absolute; right: 5px; top: 1px; width: 10px"
              @click="confirmDelete(index)"
            />
            <q-separator style="width: 100%" />
          </div>
          <q-btn
            round
            color="primary"
            icon="add"
            size="xs"
            @click="moreService"
            style="
              position: absolute;
              bottom: -25px;
              right: 50%;
              transform: translateX(50%);
            "
          />
        </div>
      </q-scroll-area>
      <div class="full-width flex justify-end q-pa-xs">
        <q-btn rounded color="primary" type="submit">Gerar Reciboo</q-btn>
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRecibo } from "src/stores/recibo";
import { useQuasar } from "quasar";

const $q = useQuasar();
const reciboStore = useRecibo();

const options = ref(["Day Use", "Hospedagem", "Banho", "Banho + Tosa"]);
const form = ref({
  infoData: {
    data: null,
    tutorName: null,
    petName: null,
    petBreed: null,
    contact: null,
  },
  serviceData: [
    {
      tipe: null,
      quantity: null,
      unitPrice: null,
    },
  ],
});

const moreService = () => {
  form.value.serviceData.push({
    tipe: null,
    quantity: null,
    unitPrice: null,
  });
};

const confirmDelete = (indexService) => {
  $q.dialog({
    title: "Deletar Seção?",
    message: "Remover este registro de serviço?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')
      form.value.serviceData.splice(indexService, 1);
    })
    .onCancel(() => {});
};

const gerarRecibo = () => {
  reciboStore.form = form.value;
};
</script>

<style>
.FormData > * {
  width: 160px;
}
</style>
