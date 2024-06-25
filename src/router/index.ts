import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { useApplicationUserStore } from "../store/Pinia/ApplicationUser/ApplicationUserStore";
import LoginScreen from "../screens/LoginScreen.vue";
import TaskBoard from "../screens/TaskBoard.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/login", name: "LoginScreen", component: LoginScreen },
  { path: "/taskboard", name: "TaskBoard", component: TaskBoard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const applicationUserStore = useApplicationUserStore();

  if (!applicationUserStore.isAuthenticated && to.name !== "LoginScreen") {
    next({ name: "LoginScreen" });
  } else if (
    applicationUserStore.isAuthenticated &&
    applicationUserStore.isTokenExpired
  ) {
    applicationUserStore.logout();
    next({ name: "LoginScreen" });
  } else {
    next();
  }
});

export default router;
