import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/en-US';
import quasarIconSet from 'quasar/icon-set/material-icons';

import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

import App from './App.vue';
//import router from './router';
//import store from './store';

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
  iconSet: quasarIconSet
});

//app.use(router);
//app.use(store);
app.mount('#app');
