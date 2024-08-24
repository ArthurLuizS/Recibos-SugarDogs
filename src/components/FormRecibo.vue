<template>
  <q-form
    class="flex items-center justify-center column tw-full-width tw-h-full"
    @reset="onReset"
    @submit="gerarRecibo"
  >
    <q-scroll-area class="tw-w-full tw-h-full">
      <div class="full-width" style="position: relative">
        <h1 class="tw-text-lg tw-text-center">
          Registro dos Serviços oferecidos ao PET
        </h1>
        <div
          class="FormData tw-mt-5 tw-min-h-[150px]"
          v-for="(service, index) in reciboStore.form.serviceData"
          :key="index"
          style="position: relative"
        >
          <label> Serviço: {{ 1 + index }} </label>
          <div class="flex row tw-justify-between q-pt-md q-mb-md tw-gap-3">
            <q-select
              dense
              :options="options"
              rounded
              outlined
              label="Tipo"
              v-model="reciboStore.form.serviceData[index].type"
              class="tw-w-[48%]"
            ></q-select>
            <q-input
              dense
              rounded
              outlined
              label="Quantidade"
              type="number"
              v-model="reciboStore.form.serviceData[index].quantity"
              class="tw-w-[48%]"
            />
            <q-input
              dense
              rounded
              outlined
              label="Preço Unitário"
              v-model="reciboStore.form.serviceData[index].unitPrice"
              mask="#,##"
              fill-mask="0"
              reverse-fill-mask
              class="tw-w-[48%]"
            />
            <q-input
              dense
              rounded
              outlined
              label="Desconto (%)"
              v-model="reciboStore.form.serviceData[index].discount"
              type="number"
              @update:model-value="discount(index)"
              class="tw-w-[48%]"
            />
          </div>
          <q-btn
            round
            icon="delete"
            color="negative"
            size="xs"
            style="position: absolute; right: 5px; top: 1px; width: 10px"
            @click="
              reciboStore.form.serviceData[index].type != null
                ? confirmDelete(index)
                : reciboStore.form.serviceData.splice(index, 1)
            "
          />
          <q-separator style="width: 100%" />
        </div>
        <q-btn
          round
          color="primary"
          icon="add"
          size="xs"
          @click="reciboStore.moreService"
          style="
            position: absolute;
            bottom: -25px;
            right: 50%;
            transform: translateX(50%);
          "
        />
      </div>
    </q-scroll-area>
  </q-form>
</template>
<script setup>
import { ref } from "vue";
import { useRecibo } from "src/stores/recibo";
import { useQuasar } from "quasar";

const $q = useQuasar();
const reciboStore = useRecibo();
const todayValue = ref();

const options = ref(["Day Use", "Hospedagem", "Banho", "Banho + Tosa"]);

const confirmDelete = (indexService) => {
  $q.dialog({
    title: "Deletar Seção?",
    message: "Remover este registro de serviço?",
    cancel: true,
    persistent: true,
  })

    .onOk(() => {
      // console.log('>>>> OK')
      reciboStore.form.serviceData.splice(indexService, 1);
    })
    .onCancel(() => {});
};

const gerarRecibo = () => {
  console.log("gerar recibo");
  reciboStore.discount;
};
</script>
