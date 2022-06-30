<template>
  <div class="project mb-5 pb-5">
    <h1 class="grey--text text-h4 font-weight-regular pb-md-3 mt-5 mx-5 mb-3">Projects</h1>
    <v-container fluid>
      <v-row style="height: 10rem" class="px-1">
        <v-col sm="6" md="4" cols="12">
          <v-card class="white--text green" style="height: 10rem; cursor: pointer" to="/ongoing">
            <v-card-title class="text-h4">Ongoing</v-card-title>
            <v-card-text class="pt-2 white--text text-h4">{{ ongoing }}</v-card-text>
          </v-card>
        </v-col>

        <v-col sm="6" md="4" cols="12">
          <v-card class="white--text primary" style="height: 10rem; cursor: pointer" to="/completed">
            <v-card-title class="text-h4">Completed</v-card-title>
            <v-card-text class="pt-2 white--text text-h4">{{ completed }}</v-card-text>
          </v-card>
        </v-col>

        <v-col sm="6" md="4" cols="12">
          <v-card class="white--text secondary" style="height: 10rem; cursor: pointer" to="/total">
            <v-card-title class="text-h4">Total Projects</v-card-title>
            <v-card-text class="pt-2 white--text text-h4">{{ total }}</v-card-text>
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
