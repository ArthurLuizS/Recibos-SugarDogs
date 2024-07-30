<template>
  <q-page class="BgSugar">
    <div class="q-pa-xs">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        :contracted="$q.screen.lt.md"
      >
        <q-step
          :name="1"
          title="Dados do Tutor e do Pet"
          icon="settings"
          :done="step > 1"
          class="q-pa-xs"
        >
          <div class="flex tw-w-full">
            <label>Dados do Tutor e PET</label>
            <div class="flex column tw-w-full" style="gap: 16px">
              <div class="flex row tw-w-full tw-justify-between">
                <span class="tw-w-full">Tutor</span>
                <q-input
                  dense
                  rounded
                  outlined
                  label="Nome do Tutor"
                  v-model="reciboStore.form.infoData.tutorName"
                  class="tw-w-[48%]"
                />
                <q-input
                  dense
                  rounded
                  outlined
                  label="Contato"
                  v-model="reciboStore.form.infoData.contact"
                  class="tw-w-[48%]"
                  mask="(##) #####-####"
                />
              </div>
              <div class="flex row tw-w-full tw-justify-between">
                <span class="tw-w-full">Pet</span>

                <q-input
                  dense
                  rounded
                  outlined
                  label="Nome do Pet"
                  v-model="reciboStore.form.infoData.petName"
                  class="tw-w-[48%]"
                />
                <q-input
                  dense
                  rounded
                  outlined
                  label="Raça do Pet"
                  v-model="reciboStore.form.infoData.petBreed"
                  class="tw-w-[48%]"
                />
              </div>
              <div class="flex row tw-w-full tw-justify-between">
                <span class="tw-w-full">Data do Recibo</span>
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="reciboStore.form.infoData.data"
                  class="tw-w-[48%]"
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
              </div>
              <q-separator style="width: 100%" />
            </div>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Serviços"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          Form dos serviços
          <formRecibo />
        </q-step>

        <q-step :name="3" title="Recibo" icon="add_comment">
          <recibo />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="
                $refs.stepper.next();
                step === 3 ? reciboStore.discount : '';
              "
              color="primary"
              :label="step === 3 ? 'Exportar Recibo' : 'Continuar'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
    <!-- <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="form" label="Dados do Recibo" />
        <q-tab name="recibo" label="Recibo" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="form">
          <form-recibo />
        </q-tab-panel>
      </q-tab-panels>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="recibo">
          <recibo />
        </q-tab-panel>
      </q-tab-panels> -->
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import headerRecibo from "components/headerRecibo.vue";
import formRecibo from "components/FormRecibo.vue";
import recibo from "components/ReciboSugar.vue";
import { useRecibo } from "src/stores/recibo";

const reciboStore = useRecibo();
const tab = ref("form");

const step = ref(1);
const todayValue = ref();

const calcularDesconto = () => {
  console.log("calcular desconto");
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
.BgSugar {
  background-colord: #f7f7f7;
}
.q-tab-panel {
  padding: 0;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 12px;
}
/* .FormData > * {
  width: 150px;
} */
</style>
