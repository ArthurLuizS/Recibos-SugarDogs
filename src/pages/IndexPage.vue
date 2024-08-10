<template>
  <q-page class="BgSugar">
    <div class="tw-m-w-[100vw] tw-m-h-[100vw] tw-min-h-[100vh] flex">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        :contracted="$q.screen.lt.md"
        class="tw-w-full col-grow tw-flex tw-flex-col tw-justify-between"
      >
        <q-step
          :name="1"
          title="Dados do Tutor e do Pet"
          icon="settings"
          :done="step > 1"
          :color="step > 1 ? 'primary' : '#26A69A'"
          class="tw-w-full tw-h-full"
        >
          <div class="flex column tw-w-[100%] tw-min-h-[70vh]">
            <h1 class="tw-text-lg tw-text-center">Dados do Tutor e PET</h1>
            <div class="flex column tw-w-full tw-mt-5" style="gap: 16px">
              <div class="flex row tw-w-full tw-justify-between tw-gap-3">
                <span class="tw-w-full tw-text-lg">Tutor</span>
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
              <q-separator style="width: 100%" />
              <div class="flex row tw-w-full tw-justify-between tw-gap-3">
                <span class="tw-w-full tw-text-lg">Pet</span>

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
            </div>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Serviços"
          icon="create_new_folder"
          :done="step > 2"
          :color="step > 2 ? 'primary' : '#26A69A'"
          class="tw-w-full tw-h-full"
        >
          <div class="flex tw-w-full tw-h-[70vh]">
            <formRecibo class="tw-w-full tw-h-full" />
          </div>
        </q-step>

        <q-step
          :name="3"
          title="Recibo"
          icon="add_comment"
          :color="step == 3 ? 'primary' : '#26A69A'"
          class="tw-w-full tw-h-full"
        >
          <div
            ref="reciboDocument"
            class="flex tw-w-[100%] tw-min-h-[70vh] border tw-p-3"
          >
            <div class="tw-w-full">
              <recibo />
            </div>
            <div class="pdf-only">
              <span>
                Orçamento elaborado por: Leticia Cândida Santos da Silva
              </span>
              <span>
                Este é um recibo dos serviços da Sugar Dogs, sujeito às
                condições a seguir indicadas: o preço da diária pode estar
                sujeito a alterações em casos especificos, como: 1 - Datas
                comemorátivas, 2 - Pacotes de hospedagens, 3 - Fidelidade. Todos
                os valores são repassados previamente aos serviços.
              </span>
              <span> Agradecemos o seu contato! </span>
              <span>
                Sugar Dogs, Rua Padre Antonio Fernandes, 87 Cordeiro Recife,
                CEP: 50630-010 Telefone (81) 99888-4759 CNPJ: 48.174.470/0001-06
              </span>
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation
            class="tw-flex tw-justify-end tw-items-end q-pa-0"
          >
            <q-btn
              @click="handleButton"
              color="primary"
              :label="step === 3 ? 'Exportar Recibo' : 'Continuar'"
              v-if="step < 3"
            />
            <q-btn v-else label="exportar recibo" @click="gerarRecibo" />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Voltar"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import headerRecibo from "components/headerRecibo.vue";
import formRecibo from "components/FormRecibo.vue";
import recibo from "components/ReciboSugar.vue";
import { useRecibo } from "src/stores/recibo";
import html2pdf from "html2pdf.js";

const reciboStore = useRecibo();
const stepper = ref();
const reciboDocument = ref();
const ReciboSugar = ref();
const tab = ref("form");

const step = ref(1);
const doneRecibo = ref(false);
const todayValue = ref();

const calcularDesconto = () => {
  console.log("calcular desconto");
};

const gerarRecibo = () => {
  console.log("gerar recibo");
  console.log(reciboDocument);
  console.log(ReciboSugar);
  const options = {
    margin: 1,
    filename: "Recibo-SugarDogs.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3.5 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(reciboDocument.value).set(options).save();
};

const handleButton = () => {
  stepper.value.next();
  if (step.value === 3) {
    reciboStore.discount;
    doneRecibo.value = true;
  }
};

onBeforeMount(() => {
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const ano = dataAtual.getFullYear();

  reciboStore.form.infoData.data = `${dia}/${mes}/${ano}`;
});
</script>

<style lang="scss">
.BgSugar {
  background-colord: #f7f7f7;
}
.q-tab-panel {
  padding: 0;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 12px;
}

.q-stepper__nav {
  @apply tw-py-4 tw-px-1;
}

.q-stepper--horizontal .q-stepper__line:before,
.q-stepper--horizontal .q-stepper__line:after {
  background-color: #eee123;
}
.pdf-only {
  display: none;
}
/* .FormData > * {
  width: 150px;
} */
</style>
