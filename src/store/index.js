import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: {},
  },
  getters: {
    getPackages(state) {
      return state.packages;
    },
  },
  mutations: {
    pushPackages(state, value) {
      state.packages = value;
    },
  },
  actions: {
    searchPackages: (state, value) => {
      axios
        .get(`http://registry.npmjs.com/-/v1/search?text=${value}`)
        .then((res) => state.commit("pushPackages", res.data));
    },
  },
  modules: {},
});
