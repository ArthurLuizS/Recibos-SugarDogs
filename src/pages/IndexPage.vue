<template>
  <q-page class="BgSugar tw-flex tw-justify-center tw-bg-black">
    <div
      class="flex"
      :class="$q.screen.gt.md ? 'tw-max-w-[600px]' : 'tw-w-[100vw]'"
    >
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
          icon="pets"
          :done="step > 1"
          :color="step > 1 ? 'primary' : '#26A69A'"
          class="tw-w-full tw-h-full tw-overflow-hidden"
        >
          <div class="flex column tw-w-[100%] tw-min-h-[70vh] justify-between">
            <h1 class="tw-text-lg tw-text-center">Dados do Tutor e PET</h1>
            <div
              class="flex column tw-w-full tw-mt-5 tw-z-[1]"
              style="gap: 16px"
            >
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
                  v-model="reciboStore.form.infoData.data"
                  dense
                  rounded
                  outlined
                  type="date"
                  class="tw-w-[48%]"
                />
              </div>
            </div>
            <div class="flex row justify-center tw-z-[0]">
              <img
                src="../assets/beagle.png"
                class="tw-w-[150px] tw-h-[150px] tw-scale-[2]"
              />
              <img
                src="../assets/buldog.png"
                class="tw-w-[150px] tw-h-[150px]"
              />
            </div>
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Serviços"
          icon="pets"
          :done="step > 2"
          :color="step > 2 ? 'primary' : '#26A69A'"
          class="tw-h-full"
        >
          <div
            class="flex tw-h-[70vh]"
            :class="$q.screen.gt.md ? '' : 'tw-w-[95vw]'"
          >
            <formRecibo class="tw-w-full tw-h-full" />
          </div>
        </q-step>

        <q-step
          :name="3"
          title="Recibo"
          icon="receipt_long"
          :color="step == 3 ? 'primary' : '#26A69A'"
          class="tw-w-full tw-h-full"
        >
          <div class="tw-text-lg tw-text-center">Pré Visualização</div>
          <div
            ref="reciboDocument"
            class="flex tw-w-[100%] tw-min-h-[70vh] tw-px-3"
          >
            <div class="tw-w-full">
              <recibo />
            </div>
            <div class="pdf-only tw-text-gray-500 tw-text-xs tw-italic">
              <div class="tw-w-full">
                Orçamento elaborado por:
                <span class="tw-text-base"
                  >Leticia Cândida Santos da Silva.</span
                >
              </div>
              <div>
                <span>
                  Este é um recibo dos serviços da Sugar Dogs, sujeito às
                  condições a seguir indicadas: o preço da diária pode estar
                  sujeito a alterações em casos especificos, como: 1 - Datas
                  comemorátivas, 2 - Pacotes de hospedagens, 3 - Fidelidade.
                  Todos os valores são repassados previamente aos serviços.
                </span>
              </div>
              <div
                class="tw-w-full tw-text-center tw-text-base tw-text-black tw-font-semibold tw-mt-3"
              >
                <span> Agradecemos o seu contato! </span>
              </div>
              <div class="tw-text-center tw-mt-3 tw-text-black tw-font-bold">
                Sugar Dogs, Rua Padre Antonio Fernandes, 87 Cordeiro Recife,
                CEP: 50630-010 Telefone (81) 99888-4759 CNPJ: 48.174.470/0001-06
              </div>
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation
            class="tw-flex tw-justify-end tw-items-end q-pa-0 tw-relative"
          >
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Voltar"
              class="q-ml-sm"
            />
            <q-btn
              @click="handleButton"
              color="primary"
              :label="step === 3 ? 'Exportar Recibo' : 'Continuar'"
              v-if="step < 3"
            />
            <q-btn
              v-else
              rounded
              color="primary"
              label="Baixar recibo"
              @click="gerarRecibo"
              class="tw-absolute tw-left-3"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import formRecibo from "components/FormRecibo.vue";
import recibo from "components/ReciboSugar.vue";
import { useRecibo } from "src/stores/recibo";
import html2pdf from "html2pdf.js";

const $q = useQuasar();

const reciboStore = useRecibo();
const stepper = ref();
const reciboDocument = ref();

const step = ref(1);
const doneRecibo = ref(false);
const todayValue = ref();

const calcularDesconto = () => {
  console.log("calcular desconto");
};

const gerarRecibo = () => {
  const pdfOnlyElements = reciboDocument.value.querySelectorAll(".pdf-only");

  // Mostrar elementos com a classe 'pdf-only'
  pdfOnlyElements.forEach((element) => {
    element.style.display = "block";
  });
  const filename = () => {
    if (reciboStore.form.infoData.petName !== null)
      return `Recibo-${reciboStore.form.infoData.petName}-SugarDogs`;
    return "Recibo-SugarDogs.pdf";
  };
  const options = {
    margin: 1,
    filename: filename(),
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3.5 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .from(reciboDocument.value)
    .set(options)
    .save()
    .then(() => {
      pdfOnlyElements.forEach((element) => {
        element.style.display = "none";
      });
    });
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

  reciboStore.form.infoData.data = `${ano}-${mes}-${dia}`;
});
</script>

<style lang="scss">
.q-stepper {
  background-color: #f7f7f7 !important;
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
@media print {
  .pdf-only {
    display: block;
  }
}
/* .FormData > * {
  width: 150px;
} */
</style>
