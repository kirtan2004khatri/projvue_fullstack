<template>
  <div class="pb-5 mb-5">
    <v-container fluid class="d-flex justify-center align-center pt-4 px-5 text-md-h4 text-h6">
      <h1 class="grey--text text-md-h4 text-h6 font-weight-regular mt-3 ml-md-5">
        Your Team Members
      </h1>
      <v-spacer></v-spacer>
      <v-btn class="green white--text" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>Add
      </v-btn>
    </v-container>
    <v-container class="d-flex justify-start px-md-0 px-5 ml-md-5 pl-md-5 ml-1 mt-0">
      <v-breadcrumbs
        :items="items"
        large
        class="pa-0 ma-0"
      ></v-breadcrumbs>
    </v-container>
    <v-container class="px-md-0 mt-md-2 px-4">
      <v-card>
        <v-card-title>Members Details</v-card-title>
        <v-text-field
          append-icon="mdi-magnify"
          placeholder="Search any data from here....."
          solo
          class="mx-5"
          v-model="search"
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="teams"
          :search="search"
          @click="func"
        ></v-data-table>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog" width="450">
      <v-card class="px-5 py-4">
        <v-card-title class="pa-0 my-2">Add members</v-card-title>
        <v-text-field
          label="Member's Fullname"
          class="mt-2 mb-4"
          counter="30"
          :rules="rules"
          maxlength="30"
          v-model="name"
        ></v-text-field>
        <v-select
          :items="exparr"
          solo
          label="Select Expereince"
          v-model="exp"
        ></v-select>
        <v-select
          :items="developers"
          solo
          label="Select Developer type"
          v-model="position"
        ></v-select>
        <v-card-action>
          <v-btn class="primary white--text" @click="addData">OK</v-btn>
          <v-btn class="secondary white--text mx-4">Cancel</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db, teamMembRef } from "../../src/firebase-config";
import { onSnapshot, addDoc } from "@firebase/firestore";
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Position", value: "position" },
        { text: "Expereince", value: "expereince" },
      ],
      teams: [],
      page:1,
      developers: [
        "Front Developer",
        "Backend Developer",
        "Full Stack Developer",
        "UI/UX Designer",
      ],
      exparr: ["< 1 year", "1-2 yr", "2-3 yr", "3-4 yr", "4-5 yr", "> 5 yr"],
      dialog: false,
      rules: [
        (v) => !!v || "Required",
        (v) => v.length <= 30 || "Max character 30",
      ],
      name: "",
      exp: "",
      position: "",
      search: "",
      items:[
        {text:'Teams',href:'/teams'},
        {text:'Team Members',disabled:true},
      ]
    };
  },
  methods: {
    fetchData() {
      let data = [];
      onSnapshot(teamMembRef, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.teams = data;
        console.log(this.teams);
        data = [];
      });
    },
    addData() {
      addDoc(teamMembRef, {
        name: this.name,
        position: this.position,
        expereince: this.exp,
      })
        .then(() => console.log("Data addedd succesfully....."))
        .catch((err) => console.log(err));
      this.dialog = !this.dialog;
      this.name='',this.position='',this.exp=""
    }
  },
  created() {
    this.fetchData();
  },
};
</script>
