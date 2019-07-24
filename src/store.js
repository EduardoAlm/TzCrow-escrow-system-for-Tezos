import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

<<<<<<< HEAD
export default new Vuex.Store({
  state: {
    address: "",
    status
  },
  mutations: {},
  actions: {}
=======
export const store = new Vuex.Store({
  state: {
    status: false,
    address: ""
  }
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
});
