import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    address: "",
    status: false
  },
  getters: {
    getAddress: state => state.address,
    getStatus: state => state.status
  },
  mutations: {
    setAddress(state, add) {
      state.address = add;
    },
    setStatus(state, stat) {
      state.status = stat;
    }
  },
  actions: {}
});
