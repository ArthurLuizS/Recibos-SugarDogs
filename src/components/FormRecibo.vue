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
              v-model="reciboStore.form.infoData.data"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="todayValue"
                      @update:model-value="onDateInput"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Fechar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              dense
              rounded
              outlined
              label="Nome do Tutor"
              v-model="reciboStore.form.infoData.tutorName"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Nome do Pet"
              v-model="reciboStore.form.infoData.petName"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Raça do Pet"
              v-model="reciboStore.form.infoData.petBreed"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Contato"
              v-model="reciboStore.form.infoData.contact"
            ></q-input>
            <q-separator style="width: 100%" />
          </div>
        </div>
        <div class="full-width" style="position: relative">
          <label>Serviços</label>
          <div
            class="FormData flex row q-pa-xs q-pt-lg"
            v-for="(service, index) in reciboStore.form.serviceData"
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
              v-model="reciboStore.form.serviceData[index].type"
            ></q-select>
            <q-input
              dense
              rounded
              outlined
              label="Quantidade"
              v-model="reciboStore.form.serviceData[index].quantity"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Preço Unitário"
              v-model="reciboStore.form.serviceData[index].unitPrice"
            ></q-input>
            <q-input
              dense
              rounded
              outlined
              label="Desconto"
              v-model="reciboStore.form.serviceData[index].discount"
              @update:model-value="discount(index)"
            ></q-input>
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
      <div class="full-width flex justify-end q-pa-xs">
        <q-btn rounded color="primary" type="submit">Gerar Reciboo</q-btn>
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
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

const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("/");
  return `${day}/${month}/${year}`;
};

const onDateInput = () => {
  console.log(todayValue.value);
  reciboStore.form.infoData.data = formatDate(todayValue.value);
};

const discount = (index) => {
  // reciboStore.form.serviceData[index].servicePrice =
  //   (parseInt(reciboStore.form.serviceData[index].discount) / 100) *
  //     parseInt(reciboStore.form.serviceData[index].unitPrice) -
  //   parseInt(reciboStore.form.serviceData[index].unitPrice);
  // console.log(reciboStore.form.serviceData[index]);
};

const gerarRecibo = () => {
  console.log("gerar recibo");
  reciboStore.discount;
};

onBeforeMount(() => {
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const ano = dataAtual.getFullYear();

  reciboStore.form.infoData.data = `${dia}/${mes}/${ano}`;
});
</script>

<style>
.FormData > * {
  width: 160px;
}
</style>
