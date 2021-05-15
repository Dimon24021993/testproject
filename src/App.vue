<template>
  <v-app>
    <v-app-bar app color="primary" height="100" dark>
      <v-col cols="4">
        <v-row justify="center">
          <v-text-field
            v-model="searchText"
            class="mr-2"
            label="Enter to search NPM package"
            placeholder="Enter to search NPM package"
            solo
            hide-details
            light
            flat
            dense
            @keypress.enter="search()"
          ></v-text-field>
          <v-btn height="38" @click="search()"> SEARCH </v-btn>
        </v-row>
      </v-col>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    searchText: "",
  }),
  methods: {
    ...mapActions({
      searchPackages: "searchPackages",
    }),
    search() {
      this.searchPackages(this.searchText);
    },
  },
};
</script>
