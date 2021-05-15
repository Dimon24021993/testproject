<template>
  <v-container>
    <v-row class="text-center">
      <!-- <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col></v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({
    info: [],
  }),
  created() {
    axios
      .get("http://registry.npmjs.com/-/v1/search?text=vuex")
      .then((res) => window.console.log(res.data.objects));
  },
};
</script>
