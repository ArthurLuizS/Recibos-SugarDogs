<template>
  <q-page
    class="flex flex-center tw-bg-gradient-to-b tw-from-[#eee123] tw-to-[#a800fe]"
  >
    <div
      class="tw-w-[245px] tw-h-[275px] tw-bg-gradient-to-r tw-from-[#a800fe] tw-to-[#eee123] tw-rounded-tl-[20px] tw-rounded-tr-[15px] tw-rounded-br-[20px] tw-pt-[5px] tw-pr-[2px]"
    >
      <div
        class="tw-w-[240px] tw-h-[270px] tw-flex tw-flex-col tw-relative tw-justify-between tw-bg-white tw-rounded-tl-xl tw-rounded-tr-xl tw-rounded-bl-xl tw-rounded-br-2xl tw-shadow-2xl"
      >
        <div class="tw-w-full tw-h-[80px]">
          <img
            src="src/assets/sugar-logo.png"
            class="tw-w-[100px] tw-h-[100px] tw-rounded-full tw-absolute tw-top-0 tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%]"
          />
        </div>
        <div class="tw-w-full tw-p-3 tw-flex tw-flex-col tw-gap-3 boder">
          <q-input label="Usuário" outlined flat dense v-model="username">
            <template v-slot:append>
              <q-icon class="tw-cursor-pointer" name="person" />
            </template>
          </q-input>
          <q-input
            label="Senha"
            outlined
            flat
            dense
            :type="visibility ? 'text' : 'password'"
            v-model="password"
          >
            <template v-slot:append>
              <q-icon
                class="tw-cursor-pointer"
                :name="visibility ? 'visibility' : 'visibility_off'"
                @click="visibility = !visibility"
              />
            </template>
          </q-input>
        </div>
        <div
          class="tw-w-full tw-flex tw-items-center tw-justify-center tw-pb-2"
        >
          <q-btn rounded color="primary" label="Entrar" @click="login" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "src/stores/auth";

const auth = useAuth();

const username = ref("");
const password = ref("");

const visibility = ref(false);

const login = () => {
  auth.username = username.value;
  auth.password = password.value;
  auth.login();
};
</script>
