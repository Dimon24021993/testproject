import Axios from "axios"

const axios = Axios.create({ baseURL: "http://registry.npmjs.com/" })
const names = {
  SEARCH_PACKAGES: "searchPackages",
  PUSH_PACKAGES: "pushPackages",
  SET_ROWS_PER_PAGE: "setRowsPerPage",
  SET_SEARCH_TEXT: "setSearchText",
  SET_PAGE: "setPage",
  LOADING: "loading",
}

export default {
  state: {
    rowsPerPageItems: [5, 10, 15],
    rowsPerPage: 10,
    total: 0,
    packages: [],
    page: 1,
    searchText: "",
    loading: {},
  },
  getters: {
    getPackages(state) {
      return state.packages
    },
    getRowsPerPage(state) {
      return state.rowsPerPage
    },
    getRowsPerPageItems(state) {
      return state.rowsPerPageItems
    },
    getTotal(state) {
      return state.total
    },
    getPage(state) {
      return state.page
    },
  },
  mutations: {
    [names.PUSH_PACKAGES](state, value) {
      state.packages = value.objects || []
      state.total = value.total || 0
    },
    [names.SET_ROWS_PER_PAGE](state, value) {
      state.rowsPerPage = value || 10
    },
    [names.SET_SEARCH_TEXT](state, value) {
      state.searchText = value
    },
    [names.SET_PAGE](state, value) {
      state.page = value
    },
    [names.LOADING](state, obj) {
      state[names.LOADING][obj.name] = obj.value
    },
  },
  actions: {
    [names.SEARCH_PACKAGES](state, value) {
      if (value) state.commit(names.SET_SEARCH_TEXT, value)
      state.commit(names.LOADING, { name: names.SEARCH_PACKAGES, value: true })
      axios
        .get(`-/v1/search`, {
          params: {
            text: state.state.searchText,
            size: state.state.rowsPerPage,
            from: (state.state.page - 1) * state.state.rowsPerPage,
          },
        })
        .then((res) => {
          state.commit(names.PUSH_PACKAGES, res.data)
          state.commit(names.LOADING, {
            name: names.SEARCH_PACKAGES,
            value: false,
          })
        })
    },
    [names.SET_ROWS_PER_PAGE](state, value) {
      state.commit(names.SET_ROWS_PER_PAGE, value)
    },
    [names.SET_PAGE](state, value) {
      state.commit(names.SET_PAGE, value)
    },
  },
}
