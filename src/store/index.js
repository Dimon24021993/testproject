import Vue from "vue"
import Vuex from "vuex"
import Axios from "axios"
import searchPackageModule from "./searchPackageModule"

const axios = Axios.create({ baseURL: "https://data.jsdelivr.com/v1/" })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPackage: {},
    versions: {},
    files: {},
    stats: {},
  },
  getters: {
    getSelectedPackage(state) {
      return state.selectedPackage
    },
    getVersions(state) {
      return state.versions
    },
    getFiles(state) {
      return state.files
    },
    getStats(state) {
      return state.stats
    },
  },
  mutations: {
    pushVersions(state, value) {
      state.versions = value
    },
    selectPackage(state, value) {
      state.selectedPackage = value
    },
    pushFiles(state, value) {
      state.files = value
    },
    pushStats(state, value) {
      state.stats = value
    },
  },
  actions: {
    selectPackage: (state, value) => {
      state.commit("selectPackage", value)
    },
    getPackageVersions: (state, value) => {
      axios
        .get(`package/npm/${value}`)
        .then((res) => state.commit("pushVersions", res.data))
    },
    getPackageStats: (state, value) => {
      return new Promise((resolve, reject) => {
        axios.get(`package/npm/${value.name}/stats`).then(
          (response) => {
            resolve(response)
            state.commit("pushStats", response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
    getPackageFiles: (state, value) => {
      return new Promise((resolve, reject) => {
        axios.get(`package/npm/${value.name}@${value.version}`).then(
          (response) => {
            resolve(response)
            state.commit("pushFiles", response.data)
          },
          (error) => {
            reject(error)
          }
        )
      })
    },
  },
  modules: { searchPackageModule },
})
