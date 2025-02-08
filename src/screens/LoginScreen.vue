<template>
  <div class="flex h-screen p-6">
    <div
      id="companyBannerSide"
      class="h-full w-1/2 bg-teal-200 rounded-lg flex justify-center items-center"
    >
      Welcome!
    </div>

    <div
      id="loginOrRegisterSide"
      class="flex h-full w-1/2 justify-center items-center"
    >
      <div class="grid w-full justify-center p-4 gap-y-2">
        <div id="companyLogoContainer" class="flex justify-center items-center">
          <img
            src="/src/assets/logo/tasktrackerlogo.svg"
            class="w-16 h-20 object-cover"
          />
        </div>

        <span class="text-2xl font-bold text-center">TaskTracker</span>

        <div class="p-4 flex flex-col space-y-3 w-80">
          <q-input
            outlined
            label="email address"
            stack-label
            type="email"
            dense
            error-message="Must be a valid email"
            input-class="login-input-box-override"
            v-model="username"
          >
            <template v-slot:append>
              <q-icon name="email" size="1.23rem" color="blue" />
            </template>
          </q-input>

          <q-input
            outlined
            label="password"
            stack-label
            dense
            type="password"
            v-model="password"
            input-class="login-input-box-override"
          >
            <template v-slot:append>
              <q-icon name="key" size="1.23rem" color="blue" />
            </template>
          </q-input>

          <div id="forgotPassword" class="w-full text-right">
            <span class="text-xs text-blue-700 hover:text-purple-900"
              >Recover Password</span
            >
          </div>

          <q-btn
            color="teal-6"
            label="Login"
            no-caps
            @click="submitLogin"
            class="w-full"
          />

          <q-btn
            label="Sign-in with Google"
            no-caps
            @click="submitLogin"
            class="w-full"
          >
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup type="ts">
import { ref } from "vue";
import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore.ts";
import { useUserAuthenticationStore } from "../store/Pinia/Auth/UserAunthenticationStore";

const username = ref("");
const password = ref("");

var applicationUserStore = useApplicationUserStore();
var userAuthStore = useUserAuthenticationStore();

const submitLogin = async () => {
  const loginData = { email: username.value, unhashedPassword: password.value };

  var response = await userAuthStore.logUserIn(loginData);

  if(response != undefined) applicationUserStore.setActivelApplicationUser(response);
};
</script>
