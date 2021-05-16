<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="packages"
          :items-per-page="10"
          class="elevation-1"
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
import { mapActions, mapGetters } from "vuex";
import detailsDialog from "../dialogs/detailsDialog";

export default {
  name: "HelloWorld",
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
  }),
  components: {
    detailsDialog,
  },
  computed: {
    ...mapGetters({
      packages: "getPackages",
    }),
  },
  methods: {
    ...mapActions({
      selectPackage: "selectPackage",
    }),
    openDetail(item) {
      this.selectPackage(item);
      this.dialog = true;
    },
  },
};
</script>
