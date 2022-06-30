<template>
  <div class="totalprojects">
    <h1 class="grey--text text-md-h4 text-h5 font-weight-regular mt-5 ml-5 pt-md-2 pt-1 pl-md-5">
      Your Completed Projects
    </h1>
    <!-- <hr> -->

    <v-container fluid class="pa-0 mx-md-2 px-md-4">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-container>

    <v-container fluid>
      <span v-if="dataEmpty" class="text-center d-block text-h5 mt-md-0 mt-5"
        >Nothing to see here.....</span
      >

      <v-row class="mx-5" no-gutters>
        <v-col sm="6" md="4" cols="12" v-for="data in projects" :key="data">
          <v-card class="ma-2 green lighten-5">
            <!-- <v-navigation-drawer v-model="drawer" class="green">&emsp;</v-navigation-drawer> -->
            <v-card-title
              >{{ data.title }}
              <v-spacer></v-spacer>
              <v-icon>mdi-check</v-icon>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination
      :page="page"
      :length="Math.ceil(this.projects.length / 12)"
      dark
      color="green"
      v-if="navVisible"
    ></v-pagination>
  </div>
</template>

<script>
import { db, colRef } from "../../src/firebase-config";
import { onSnapshot, orderBy, query, where } from "@firebase/firestore";
export default {
  data() {
    return {
      projects: [],
      drawer: true,
      dataEmpty: true,
      items: [
        { text: "Projects", href: "/projects" },
        { text: "Completed Projects", disabled: true },
      ],
      navVisible:false
    };
  },
  methods: {
    fetchData() {
      let data = [];
      const q = query(
        colRef,
        where("status", "==", "completed"),
        orderBy("createdAt")
      );
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.projects = data;
        if (Math.ceil(this.projects.length / 12) > 1) {
          this.navVisible = true;
        }
        data = [];
        if (this.projects.length != 0) {
          this.dataEmpty = false;
        }
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
