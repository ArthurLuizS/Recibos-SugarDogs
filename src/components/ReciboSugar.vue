<template>
  <div class="container">
    <div class="header">
      <div><q-img src="src/assets/sugar-logo.png" /></div>
      <div>campos data</div>
    </div>
    <div class="table"></div>
    <div class="footer"></div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRecibo } from "src/stores/recibo";

const reciboStore = useRecibo();

const props = defineProps(["form"]);
</script>
