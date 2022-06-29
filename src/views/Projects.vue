<template>
  <div class="project">
    <h1 class="pt-5 pl-5 grey--text font-weight-regular">Projects</h1>
    <v-container fluid>
      <v-row style="height: 10rem" class="px-2">
        <v-col sm="6" md="4" cols="12">
          <v-card class="white--text green" style="height: 10rem; cursor: pointer" to="/ongoing">
            <v-card-title class="text-sm-h5 text-xs-h5 text-lg-h4">Ongoing</v-card-title>
            <v-card-text class="pt-2 white--text text-sm-h4 text-xs-h4 display-1">{{ ongoing }}</v-card-text>
          </v-card>
        </v-col>

        <v-col sm="6" md="4" cols="12">
          <v-card class="white--text primary" style="height: 10rem; cursor: pointer" to="/completed">
            <v-card-title class="text-sm-h5 text-xs-h5 text-lg-h4">Completed</v-card-title>
            <v-card-text class="pt-2 white--text text-sm-h4 text-xs-h4 display-1">{{ completed }}</v-card-text>
          </v-card>
        </v-col>

        <v-col sm="6" md="4" cols="12">
          <v-card class="white--text secondary" style="height: 10rem; cursor: pointer" to="/total">
            <v-card-title class="text-sm-h5 text-xs-h5 text-lg-h4">Total Projects</v-card-title>
            <v-card-text class="pt-2 white--text text-sm-h4 text-xs-h4 display-1">{{ total }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db, colRef } from "../../src/firebase-config";
import { onSnapshot, serverTimestamp, addDoc } from "@firebase/firestore";
export default {
  data() {
    return {
      total: 0, ongoing: 0, completed: 0
    };
  },
  methods: {
    fetchData() {
      let data = [];
      onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.total = data.length;

        this.ongoing = data.filter(element => {
          return element.status == "ongoing";
        });
        this.ongoing = this.ongoing.length

        this.completed = data.filter(element => {
          return element.status == "completed";
        });
        this.completed = this.completed.length
        data = [];
      });
    },
  },
  created() {
    this.fetchData();
  }
};
</script>
