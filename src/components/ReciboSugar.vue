<template>
  <div class="container">
    <div class="header tw-p-[20px] flex row justify-between">
      <div>
        <q-img src="src/assets/sugar-logo.png" class="tw-w-[120px]" />
      </div>
      <div class="flex column">
        <span>Recibo</span>
        <span>{{ dataFormatada }}</span>
        <div>
          Para <span>{{ reciboStore.form?.infoData.tutorName }} </span>
        </div>
        <div>
          PET: <span>{{ reciboStore.form?.infoData.petName }} </span>
        </div>
        <div>
          RAÇA: <span>{{ reciboStore.form?.infoData.petBreed }} </span>
        </div>
        <div>
          TEL: <span>{{ reciboStore.form?.infoData.contact }} </span>
        </div>
      </div>
    </div>
    <div class="table">
      <table class="tw-w-full">
        <thead>
          <tr>
            <th>Qtd</th>
            <th>Serviço</th>
            <th>Preço</th>
            <th>Desconto</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody v-if="reciboStore.form.serviceData[0].type != null">
          <tr
            v-for="(service, index) in reciboStore.form.serviceData"
            :key="index"
          >
            <td>{{ service?.quantity }}</td>
            <td>{{ service?.type }}</td>
            <td>{{ service?.unitPrice }}</td>
            <td>{{ service?.discount }}</td>
            <td>0 total</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRecibo } from "src/stores/recibo";

const reciboStore = useRecibo();

const dataAtual = new Date();
const dia = String(dataAtual.getDate()).padStart(2, "0");
const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
const ano = dataAtual.getFullYear();

const dataFormatada = `${dia}/${mes}/${ano}`;
</script>
