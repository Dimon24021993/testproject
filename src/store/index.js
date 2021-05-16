import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: [],
    selectedPackage: {},
    versions: {},
    files: {},
    stats: {},
  },
  getters: {
    getPackages(state) {
      return state.packages;
    },
    getSelectedPackage(state) {
      return state.selectedPackage;
    },
    getVersions(state) {
      return state.versions;
    },
    getFiles(state) {
      return state.files;
    },
    getStats(state) {
      return state.stats;
    },
  },
  mutations: {
    pushPackages(state, value) {
      state.packages = value;
    },
    pushVersions(state, value) {
      state.versions = value;
    },
    selectPackage(state, value) {
      state.selectedPackage = value;
    },
    pushFiles(state, value) {
      state.files = value;
    },
    pushStats(state, value) {
      state.stats = value;
    },
  },
  actions: {
    selectPackage: (state, value) => {
      state.commit("selectPackage", value);
    },
    searchPackages: (state, value) => {
      axios
        .get(`http://registry.npmjs.com/-/v1/search?text=${value}`)
        .then((res) => state.commit("pushPackages", res.data.objects));
    },
    getPackageVersions: (state, value) => {
      axios
        .get(`https://data.jsdelivr.com/v1/package/npm/${value}`)
        .then((res) => state.commit("pushVersions", res.data));
    },
    getPackageStats: (state, value) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://data.jsdelivr.com/v1/package/npm/${value.name}/stats`)
          .then(
            (response) => {
              resolve(response);
              state.commit("pushStats", response.data);
            },
            (error) => {
              reject(error);
            }
          );
      });
    },
    getPackageFiles: (state, value) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://data.jsdelivr.com/v1/package/npm/${value.name}@${value.version}`
          )
          .then(
            (response) => {
              resolve(response);
              state.commit("pushFiles", response.data);
            },
            (error) => {
              reject(error);
            }
          );
      });
    },
  },
  modules: {},
});
