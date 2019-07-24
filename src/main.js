import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store.js";
import VModal from "vue-js-modal";
Vue.use(Vuex);
Vue.use(VModal, { dialog: true });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
