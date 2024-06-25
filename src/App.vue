<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useApplicationUserStore } from "./store/Pinia/ApplicationUser/ApplicationUserStore.ts";

import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const applicationUserStore = useApplicationUserStore();
    const router = useRouter();

    watch(
      () => applicationUserStore.isAuthenticated,
      (isAuthenticated) => {
        if (!isAuthenticated) {
          router.push({ name: "LoginScreen" });
        } else if (applicationUserStore.isTokenExpired) {
          applicationUserStore.logout();
          router.push({ name: "LoginScreen" });
        } else {
          router.push({ name: "TaskBoard" });
        }
      },
      { immediate: true }
    );

    return {};
  }
});
</script>
