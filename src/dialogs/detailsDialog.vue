<template>
  <div class="text-center">
    <v-dialog v-model="show" width="900" scrollable>
      <v-card class="dialog-container">
        <div class="dialog">
          <div class="dialog-card">
            <div class="dialog-card__header">
              <h2>{{ selectedPackage.name }}</h2>
            </div>
            <div class="dialog-card__content">
              <div class="main_information">
                <div class="tags mr-2">
                  <span>
                    {{ "version: " + selectedPackage.version }}
                  </span>
                </div>
                <div v-if="selectedPackage.date" class="tags mr-2">
                  <span>
                    {{
                      "Date: " +
                      new Date(selectedPackage.date).toLocaleDateString("ru")
                    }}
                  </span>
                </div>
                <div v-if="selectedPackage.author" class="tags">
                  <span>
                    {{ "Author: " + selectedPackage.author.name }}
                  </span>
                </div>
              </div>
              <div v-if="selectedPackage.description" class="description">
                {{ selectedPackage.description }}
              </div>
              <div class="links">
                <v-expansion-panels dense>
                  <v-expansion-panel>
                    <v-expansion-panel-header> Links </v-expansion-panel-header>
                    <v-expansion-panel-content
                      v-for="(value, name, i) in selectedPackage.links"
                      :key="i"
                    >
                      <a :href="value" target="_blank">{{ name }}</a>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
              <div class="files_container">
                <v-data-table
                  :headers="headers"
                  :items="currenetNode"
                  :items-per-page="10"
                  class="elevation-1"
                  dense
                  hide-default-footer
                  hide-default-header
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <div>{{ currentBranch.join("/") }}</div>
                      <v-spacer></v-spacer>
                      <div class="version_select">
                        <v-select
                          v-model="currentVersion"
                          :items="versions.versions"
                          label="Vesion"
                          dense
                          light
                          hide-details
                        ></v-select>
                      </div>
                    </v-toolbar>
                  </template>
                  <template v-slot:item="{ item }">
                    <tr @click="getFiles(item)">
                      <td>
                        <v-icon
                          >{{
                            item.type == "directory"
                              ? "mdi-folder"
                              : item.type == "file"
                              ? "mdi-file-outline"
                              : "mdi-arrow-up-bold"
                          }}
                        </v-icon>
                      </td>
                      <td>
                        {{ item.type != "up" ? item.type : "..." }}
                      </td>
                      <td>{{ item.name }}</td>
                      <td>
                        <v-btn small icon>
                          <v-icon
                            v-if="item.type == 'file'"
                            @click="getPackFileByHash(item)"
                          >
                            mdi-download
                          </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </div>
              <div v-if="Object.keys(statistics).length != 0">
                <div>{{ `Usage per Month: ${usageCount}` }}</div>
                <v-sheet
                  flat
                  class="v-sheet--offset mx-auto"
                  color="grey lighten-2"
                  elevation="1"
                  max-width="calc(100% - 32px)"
                >
                  <v-sparkline
                    :value="Object.values(statistics)"
                    color="white"
                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                    :smooth="16"
                    line-width="2"
                    padding="16"
                  ></v-sparkline>
                </v-sheet>
              </div>
            </div>
            <div class="dialog-card__actions">
              <v-btn color="primary" text @click="$emit('close')">
                Close
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    currentVersion: "",
    currentBranch: [],
    currenetNode: [],
    statistics: {},
    usageCount: 0,
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name",
      },
      { text: "Date", value: "date" },
      { text: "Version", value: "version" },
      { text: "", value: "" },
    ],
    history: [],
  }),
  props: {
    dialog: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters({
      selectedPackage: "getSelectedPackage",
      versions: "getVersions",
      files: "getFiles",
      stats: "getStats",
    }),
    show: {
      get() {
        return this.dialog;
      },
      set() {
        this.$emit("close");
      },
    },
  },
  watch: {
    currentVersion(oldVal, newVal) {
      if (newVal != oldVal) {
        this.getPackFiles();
        this.getPackStats();
      }
    },
  },
  created() {
    this.setCurrentVersion();
    this.getPackageVersions(this.selectedPackage.name);
  },
  methods: {
    ...mapActions({
      getPackageVersions: "getPackageVersions",
      getPackageStats: "getPackageStats",
    }),
    setCurrentVersion() {
      this.currentVersion = this.selectedPackage.version;
    },
    setCurrentBranch() {
      this.currentBranch = [];
      this.currentBranch.push(this.selectedPackage.name);
    },
    getFiles(item) {
      if (item.type == "directory") {
        this.history.push(this.currenetNode);
        this.currenetNode = [{ name: "", type: "up" }, ...item.files];
        this.currentBranch.push(item.name);
      }
      if (item.type == "up") {
        this.currenetNode = this.history.pop();
        this.currentBranch.pop();
      }
    },
    getPackFiles() {
      this.$store
        .dispatch("getPackageFiles", {
          name: this.selectedPackage.name,
          version: this.currentVersion,
        })
        .then((res) => {
          this.setCurrentBranch();
          this.currenetNode = res.data.files;
        });
    },
    getPackStats() {
      this.$store
        .dispatch("getPackageStats", {
          name: this.selectedPackage.name,
        })
        .then((res) => {
          if (res.data.versions[this.currentVersion]) {
            this.statistics = res.data.versions[this.currentVersion].dates;
            this.usageCount = res.data.versions[this.currentVersion].total;
          } else {
            this.statistics = [];
            this.usageCount = 0;
          }
        });
    },
    getPackFileByHash(item) {
      let curBranch = [...this.currentBranch];
      let currentPath =
        this.currentBranch.length > 1
          ? `/${curBranch.splice(1, curBranch.length).join("/")}`
          : "";

      var url = `https://cdn.jsdelivr.net/npm/${this.selectedPackage.name}@${this.currentVersion}${currentPath}/${item.name}`;
      window.open(url, "_blank").focus();
    },
  },
};
</script>
