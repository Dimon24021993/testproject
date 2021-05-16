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

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="py-2 white--text flex body-1">
          <span> Created by Vitaliy Erofeev </span>
          <v-spacer></v-spacer>
          <span>{{ new Date().getFullYear() }}</span>
        </v-card-title>

        <!-- <v-card-text class="py-2 white--text flex">
          <strong class="title"> Created by Vitaliy Erofeev </strong>
          <v-spacer></v-spacer>
          {{ new Date().getFullYear() }}
        </v-card-text> -->
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    searchText: "vuex",
  }),
  created() {
    this.searchPackages(this.searchText);
  },
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

<style lang="scss">
@import "./scss/main.scss";
</style>
