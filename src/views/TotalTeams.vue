<template>
  <div class="teams pa-0">
    <v-container fluid class="d-flex justify-between align-center px-5 mt-5">
      <h1 class="grey--text text-md-h4 text-h6 font-weight-regular">
        Your Teams
      </h1>
      <v-spacer></v-spacer>
      <v-btn class="green white--text" @click="dialog=!dialog">
        <v-icon>mdi-plus</v-icon>
        Add
      </v-btn>
    </v-container>
    <v-container fluid class="pl-5 mt-5">
      <h2 v-if="dataEmpty" class="text-center font-weight-regular">
        Nothing to see here.....
      </h2>

      <v-row>
        <v-col v-for="items in teams" :key="items" md="4" cols="12">
          <v-card elevation="5">
            <v-card-title>{{ items.team_name }}
            <v-spacer></v-spacer>
            <v-btn fab class="white--text primary" x-small><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn fab class="white--text red mx-2" x-small><v-icon>mdi-delete</v-icon></v-btn>
            <v-btn fab class="white--text warning" x-small><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Dialog selection -->
    <v-dialog v-model="dialog" width="400" class="pa-5">
      <v-card class="px-3">
        <v-card-title class="px-2 pt-4">Add Team</v-card-title>
        <v-text-field label="Add team name" counter="30" maxlength="30" v-model="name"></v-text-field>
        <v-select
          v-model="selected_members"
          :items="members"
          chips
          label="Select Team Mates"
          multiple
        ></v-select>
        <v-card-action>
          <v-btn class="primary white--text my-5" @click="addData">Create</v-btn>
          <v-btn class="secondary white--text mx-4" @click="dialog=!dialog">Cancel</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>

  <v-dialog width="450">
    <v-card>
      <v-card-title>Team Details</v-card-title>
      <v-card-text>
        Team Members:<br>
        {{}}
      </v-card-text>
    </v-card>
  </v-dialog>

  </div>
</template>

<script>
import { db, teamRef, teamMembRef } from "../../src/firebase-config";
import { onSnapshot, addDoc } from "@firebase/firestore";
export default {
  data() {
    return {
      teams: ["dasds", "dasdasd", "dasdsa", "dasdasdad"],
      members: [],
      selected_members:[],
      teams: [],
      dataEmpty: false,
      selected:[],
      dialog:false,
      name:''
    };
  },
  methods: {
    fetchData() {
      let data = [];
      onSnapshot(teamRef, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.teams = data;
        data = [];
      });
      let data2=[]
      onSnapshot(teamMembRef, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data2.push({ ...e.data(), id: e.id });
        });
        console.log(data2);
        data2.forEach(e=>{
          this.members.push(e.name);
        })
        data2=[]
      });
    },
    addData() {
      addDoc(teamRef, {
        team_name: this.name,
        team_members: this.selected_members,
      })
        .then(() => console.log("Data addedd succesfully....."))
        .catch((err) => console.log(err));
      this.dialog = !this.dialog;
      console.log(this.members)
    },
    func() {
      alert("This is the alert !");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
