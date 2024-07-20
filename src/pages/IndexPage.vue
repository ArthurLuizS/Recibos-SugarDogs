<template>
  <q-page class="BgSugar">
    <div>
      <q-tabs
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
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import headerRecibo from "components/headerRecibo.vue";
import formRecibo from "components/FormRecibo.vue";
import recibo from "components/ReciboSugar.vue";

const tab = ref("form");
</script>

<style>
.BgSugar {
  background-colord: #f7f7f7;
}
.q-tab-panel {
  padding: 0;
}
</style>
