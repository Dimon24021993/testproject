<template>
  <v-app>
    <v-app-bar app color="primary" height="100" src="./assets/backround.jpg">
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
          <div>
            <div>Created by Vitaliy Erofeev</div>
            <div class="caption">2021</div>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            v-for="(link, i) in links"
            :key="i"
            @click="goTo(link.url)"
            class="mx-4"
            dark
            icon
          >
            <v-icon size="24px">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    searchText: "",
    links: [
      {
        icon: "mdi-github",
        url: "https://github.com/VitaliyErofeev",
      },
    ],
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
    goTo(url) {
      window.open(url, "_blank").focus();
    },
  },
};
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>
