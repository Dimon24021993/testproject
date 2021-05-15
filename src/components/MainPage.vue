<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="packages.objects"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item="item">
            <tr>
              <td>{{ item.item.package.name }}</td>
              <td>
                {{ new Date(item.item.package.date).toLocaleDateString() }}
              </td>
              <td>{{ item.item.package.version }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",

  data: () => ({
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name",
      },
      { text: "Date", value: "date" },
      { text: "Version", value: "version" },
    ],
    info: [],
  }),
  computed: {
    ...mapGetters({
      packages: "getPackages",
    }),
  },
};
</script>
