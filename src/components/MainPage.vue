<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :loading="$store.state.searchPackageModule.loading.searchPackages"
          :headers="headers"
          :items="packages"
          :items-per-page.sync="rowsPerPage"
          :page.sync="page"
          class="elevation-1"
          :server-items-length="total"
          :footer-props="pagination"
        >
          <template v-slot:item="{ item }">
            <tr @click="openDetail(item.package)">
              <td>{{ item.package.name }}</td>
              <td>
                {{ new Date(item.package.date).toLocaleDateString() }}
              </td>
              <td>{{ item.package.version }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col></v-col>
    </v-row>
    <template v-if="dialog">
      <details-dialog :dialog="dialog" @close="dialog = false" />
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import detailsDialog from "../dialogs/detailsDialog"

export default {
  name: "MainPage",
  data: () => ({
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name",
      },
      { text: "Date", value: "date" },
      { text: "Version", value: "version" },
    ],
    info: [],
    dialog: false,
    paginationObj: {},
  }),
  components: {
    detailsDialog,
  },
  computed: {
    ...mapGetters({
      packages: "getPackages",
      getRowsPerPage: "getRowsPerPage",
      getPage: "getPage",
      total: "getTotal",
      rowsPerPageItems: "getRowsPerPageItems",
    }),
    pagination: {
      get() {
        return {
          ...this.paginationObj,
          itemsPerPageOptions: this.rowsPerPageItems,
        }
      },
      set(value) {
        this.paginationObj = value
      },
    },
    rowsPerPage: {
      get() {
        return this.getRowsPerPage
      },
      set(value) {
        this.setRowsPerPage(value)
        if (this.page == 1) this.searchPackages()
        else this.page = 1
      },
    },
    page: {
      get() {
        return this.getPage
      },
      set(value) {
        this.setPage(value)
        this.searchPackages()
      },
    },
  },
  methods: {
    ...mapActions({
      selectPackage: "selectPackage",
      setRowsPerPage: "setRowsPerPage",
      searchPackages: "searchPackages",
      setPage: "setPage",
    }),
    openDetail(item) {
      this.selectPackage(item)
      this.dialog = true
    },
  },
}
</script>
