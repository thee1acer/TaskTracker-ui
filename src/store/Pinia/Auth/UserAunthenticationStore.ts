import { defineStore } from "pinia";
import UserAuthenticationService from "../../../services/UserAuthentication/UserAuthenticationService";
import { LoginAuthDataDTO } from "../../../models/LoginAuthDataDTO";
import { computed } from "vue";

interface UserAuthenticationStore {}

export const useUserAuthenticationStore = defineStore("User Auth Store", {
  state: (): UserAuthenticationStore => ({}),

  getters: {},

  actions: {
    logUserIn(loginAuth: LoginAuthDataDTO) {
      return UserAuthenticationService.loginUserAsync(loginAuth);
    }
  }
});
