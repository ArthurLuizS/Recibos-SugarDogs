import { defineStore } from "pinia";
import { Notify } from "quasar";
import CryptoJS from "crypto-js";
import axios from "axios";

export const useAuth = defineStore("auth", {
  state: () => ({
    username: null,
    password: null,
    is_staff: null,
    authenticated: null,
    hashUsername: null,
    hashPassword: null,
    correctUsername: "a0ec88a7e8e3eaef6fe6eb27d7845675",
    correctPassword: "f407d6fb10234215902e9c92e444bd9b",
  }),

  getters: {},

  actions: {
    async login() {
      try {
        this.hashPassword = CryptoJS.MD5(this.password);
        this.hashUsername = CryptoJS.MD5(this.username);
        // console.log(`hash da senha: ${hash.value}`);
        if (
          this.correctUsername == this.hashUsername &&
          this.correctPassword == this.hashPassword
        ) {
          this.authenticated = true;
          this.router.push("/");
        }
      } catch (error) {
        console.error(error);
        Notify.create({
          message: "Falha efetuando login, por favor tente novamente",
          color: "negative",
        });
      }
    },
    logout() {
      this.$reset();
      this.router.push("/login");
    },
  },
  persist: true,
});
