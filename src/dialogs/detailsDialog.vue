<template>
  <div class="text-center">
    <v-dialog v-model="show" width="900">
      <template>
        <div class="dialog">
          <div class="dialog-card">
            <div class="dialog-card__header">
              <h2>{{ selectedPackage.name }}</h2>
            </div>
            <div class="dialog-card__content">
              <div class="main_information">
                <div class="version mr-2">
                  <span>
                    {{ "version: " + selectedPackage.version }}
                  </span>
                </div>
                <div class="version mr-2">
                  <span>
                    {{ "Author: " + selectedPackage.author.name }}
                  </span>
                </div>
                <div class="version">
                  <span>
                    {{
                      "Date: " +
                      new Date(selectedPackage.date).toLocaleDateString("ru")
                    }}
                  </span>
                </div>
              </div>
              <div class="description">
                {{ selectedPackage.description }}
              </div>
              <div class="links">
                <v-expansion-panels dense>
                  <v-expansion-panel>
                    <v-expansion-panel-header> Links </v-expansion-panel-header>
                    <v-expansion-panel-content
                      v-for="(value, name) in selectedPackage.links"
                      :key="value"
                    >
                      <a :href="value" target="_blank">{{ name }}</a>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
              <div class="files_container">
                <div class="header">
                  <div>{{ currentBranch }}</div>
                  <div></div>
                </div>
                <div class="file_list">
                  <v-data-table
                    :headers="headers"
                    :items="currenetNode"
                    :items-per-page="10"
                    class="elevation-1"
                    dense
                    hide-default-footer
                    hide-default-header
                  >
                    <template v-slot:item="item">
                      <tr @click="getFiles(item.item)">
                        <td>
                          <v-icon
                            >{{
                              item.item.type == "directory"
                                ? "mdi-folder"
                                : "mdi-file-outline"
                            }}
                          </v-icon>
                        </td>
                        <td>{{ item.item.type }}</td>
                        <td>{{ item.item.name }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </div>
              </div>
            </div>
            <div class="dialog-card__actions">
              <v-btn color="primary" text @click="$emit('close')">
                Close
              </v-btn>
            </div>
          </div>
        </div>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    currentVersion: "",
    currentBranch: "",
    currenetNode: {},
    headers: [
      {
        text: "Name",
        align: "left",
        value: "name",
      },
      { text: "Date", value: "date" },
      { text: "Version", value: "version" },
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
  created() {
    this.currentBranch = this.selectedPackage.name;
    if (this.files) this.currenetNode = this.files.files;

    this.setCurrentVersion();
    this.getPackageVersions(this.selectedPackage.name);

    this.$store
      .dispatch("getPackageFiles", {
        name: this.selectedPackage.name,
        version: this.currentVersion,
      })
      .then(() => {
        this.currenetNode = this.files.files;
      });
  },
  methods: {
    ...mapActions({
      getPackageVersions: "getPackageVersions",
    }),
    setCurrentVersion() {
      this.currentVersion = this.selectedPackage.version;
    },
    getFiles(item) {
      if (item.type == "directory") {
        this.history.push(this.currenetNode);
        this.currenetNode = [{ name: "...", type: "up" }, ...item.files];
      }
      if (item.type == "up") {
        this.currenetNode = this.history.pop();
      }
    },
  },
};
</script>
