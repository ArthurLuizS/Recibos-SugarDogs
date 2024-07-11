<template>
  <q-page class="flex flex-center">
    <!-- TODO: refazer toda a página  -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="username" label="Usuário" />
        <q-input v-model="password" label="Senha" type="password" />
        <q-btn @click="login" label="Entrar" color="primary" class="q-mt-md" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";

const username = ref("");
const password = ref("");
const correctPassword = ref("986899b4b2c7fa062d849a629f41c327");
const hash = ref(null);

const login = () => {
  hash.value = CryptoJS.MD5(password.value);
  console.log(`hash da senha: ${hash.value}`);
  if (correctPassword.value == hash.value) console.log("senha correta");
};

// export default {
//   setup() {
//     const username = ref("");
//     const password = ref("");
//     const errorMessage = ref("");
//     const router = useRouter();

//     const validUsername = "amiga";
//     const validPasswordHash = "5f4dcc3b5aa765d61d8327deb882cf99"; // hash de "password"

//     const login = () => {
//       if (
//         username.value === validUsername &&
//         md5(password.value).toString() === validPasswordHash
//       ) {
//         localStorage.setItem("authenticated", "true");
//         router.push("/recibo");
//       } else {
//         errorMessage.value = "Usuário ou senha incorretos";
//       }
//     };

//     return {
//       username,
//       password,
//       errorMessage,
//       login,
//     };
//   },
// };
</script>
