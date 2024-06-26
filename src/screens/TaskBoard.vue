<template>
  <div class="task-board-screen-container">
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
    <q-btn label="Testing" />
  </div>
</template>

<script setup type="ts">

import { ref, onMounted } from "vue";
import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore.ts";
import { useUserAuthenticationStore } from "../store/Pinia/Auth/UserAunthenticationStore";

var applicationUserStore = useApplicationUserStore();
var userAuthStore = useUserAuthenticationStore();


onMounted(() => {
  console.log({Initiated_TaskBoard: true});

})
</script>
<style scoped>
.task-board-screen-container {
  background-color: cadetblue;
}
</style>
