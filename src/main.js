import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store.js";

Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
