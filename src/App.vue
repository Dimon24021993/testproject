<template>
  <v-app>
    <v-app-bar app color="primary" height="100" dark>
      <v-col cols="12">
        <v-row justify="center">
          <v-text-field
            label="NPM package name"
            placeholder="NPM package name"
            solo
            hide-details
            light
            flat
            dense
          ></v-text-field>
        </v-row>
      </v-col>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
