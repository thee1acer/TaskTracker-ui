<template>
  <div class="login-screen-container">
    <div class="login-screen-banner">
      <div class="login-header-text">TaskTracker</div>
      <q-input
        class="login-input-box"
        outlined
        type="email"
        hint="Email Adress"
        error-message="must be valid email"
        v-model:model-value="username"
      />
      <q-input
        class="login-input-box"
        outlined
        type="password"
        hint="Password"
        v-model:model-value="password"
      />
      <q-btn class="login-button" label="login" @click="submitLogin" />
    </div>
  </div>
</template>

<script setup type="ts">
import { ref } from "vue";
import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore.ts";
import { useUserAuthenticationStore } from "../store/Pinia/Auth/UserAunthenticationStore";

const username = ref("");
const password = ref("");

const submitLogin = async () => {
  const loginData = { email: username.value, unhashedPassword: password.value };

  var applicationUserStore = useApplicationUserStore();
  var userAuthStore = useUserAuthenticationStore();

  await userAuthStore.logUserIn(loginData).then((res) =>{ applicationUserStore.setActivelApplicationUser(applicationUserStore)});

  //console.log(applicationUserStore._activeApplicationUser)

  //useApplicationUserStore().setActivelApplicationUser(response)
  //applicationUserStore.setActivelApplicationUser(appUser)
};
</script>

<style scoped>
.login-screen-container {
  background-color: rgb(162, 167, 168);
  height: 100vh;
  padding-left: 30vw;
  padding-top: 10vh;
}

.login-screen-banner {
  height: 70vh;
  width: 35vw;
  background-color: rgb(149, 210, 239);
  border-radius: 20px;
  padding: 10px;
  padding-top: 70px;
  border: 1px solid rgb(200, 197, 197);
  box-shadow: 1px;
}

.login-input-box {
  margin-bottom: 15px;
  margin-left: 70px;
  width: 70%;
  align-self: center;
}

.login-button {
  width: 80%;
  margin-left: 50px;
  margin-top: 100px;
  background-color: rgb(200, 239, 242);
  color: rgb(24, 49, 68);
  height: 50px;
  border-radius: 10px;
}

.login-header-text {
  width: 100%;
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgb(24, 49, 68);
}
</style>
