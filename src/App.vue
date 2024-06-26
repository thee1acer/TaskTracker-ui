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
      () => applicationUserStore._activeApplicationUser,
      (activeApplicationUser) => {
        if (activeApplicationUser != undefined) {
          applicationUserStore._isAuthenticated = true;
        }
        if (
          activeApplicationUser?.token != undefined &&
          activeApplicationUser.tokenExpiry.getMilliseconds < Date.now
        ) {
          applicationUserStore._isTokenExpired = false;
        }
      },
      { immediate: true }
    );

    watch(
      () => applicationUserStore._isAuthenticated,
      (isAuthenticated) => {
        if (!isAuthenticated) {
          router.push({ name: "LoginScreen" });
        } else if (applicationUserStore._isTokenExpired) {
          applicationUserStore.logout();
          router.push({ name: "LoginScreen" });
        } else {
          router.push({ name: "TaskBoard" });
        }
      },
      { immediate: true }
    );

    return {
      applicationUserStore
    };
  },
  mounted() {}
});
</script>
