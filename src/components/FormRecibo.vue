<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset">
      <div>
        <label>Dados do Tutor e PET</label>
        <div>
          <q-input label="Data do Recibo"></q-input>
          <q-input label="Nome do Tutor"></q-input>
          <q-input label="Nome do Pet"></q-input>
          <q-input label="Raça do Pet"></q-input>
          <q-input label="Contato"></q-input>
        </div>
      </div>
      <div>
        <label>Serviços</label>
        <div>
          <q-input label="Tipo"></q-input>
          <q-input label="Quantidade"></q-input>
          <q-input label="Preço Unitário"></q-input>
          <q-input label="Desconto"></q-input>
        </div>
      </div>
    </q-form>
  </div>
</template>
