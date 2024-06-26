import { createApp } from "vue";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/en-US";
import quasarIconSet from "quasar/icon-set/material-icons";

import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";

import { createPinia } from "pinia";

import piniaPersistedstate from "pinia-plugin-persistedstate";

import router from "./router";

import App from "./App.vue";

const pinia = createPinia();

pinia.use(piniaPersistedstate);

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
  iconSet: quasarIconSet
});

app.use(router);
app.use(pinia);

app.mount("#app");
