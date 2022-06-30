<template>
  <div class="totalprojects">
    <h1
      class="grey--text text-h6 text-md-h4 font-weight-regular mt-md-3 ml-md-5 py-md-3 pl-md-5 pt-5 px-5 pb-2"
    >
      Your Ongoing Projects
    </h1>
    <!-- <hr> -->

    <v-container fluid class="py-0 mx-md-2 ma-0 pa-0 pl-md-3">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-container>

    <v-container fluid>
      <span v-if="dataEmpty" class="text-center d-block text-h5"
        >Nothing to see here.....</span
      >

      <v-row class="mx-md-5" no-gutters>
        <v-col md="4" cols="12" v-for="data in temp" :key="data">
          <v-card class="ma-2 grey lighten-4 d-flex pa-3">
            <span class="text-h6">{{ data.title }}</span>
            <v-spacer></v-spacer>
            <v-btn
              class="success white--text mx-1"
              fab
              x-small
              @click="updateData(data.id)"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              class="red white--text mx-1"
              fab
              x-small
              @click="deleteData(data.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              class="secondary white--text mx-1"
              fab
              x-small
              @click="
                details = !details;
                showTitle = data.title;
                showDetails = data.details;
                showStatus = data.status;
                showTeam = data.team;
              "
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- This is the details shower -->
    <v-overlay v-model="details">
      <v-card light style="width: 30rem" class="pa-4">
        <v-card-title>Project Details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6"> Project Name </v-col>
            <v-col cols="6">
              {{ showTitle }}
            </v-col>
            <v-col cols="6"> Project Details </v-col>
            <v-col cols="6">
              {{ showDetails }}
            </v-col>
            <v-col cols="6"> Project Stauts </v-col>
            <v-col cols="6">
              {{ showStatus }}
            </v-col>
            <v-col cols="6"> Associated Team Of Project : </v-col>
            <v-col cols="6">
              {{ showTeam }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-action>
          <v-btn class="secondary white--text ma-4" @click="details = !details"
            >Close</v-btn
          >
        </v-card-action>
      </v-card>
    </v-overlay>

    <v-container class="mt-md-5">
      <v-pagination
        v-model="page"
        :page="this.page"
        :length="Math.ceil(this.projects.length/12)"
        @input="viewer(page)"
        dark
        color="green"
        v-if="navVisible"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import { db, colRef } from "../../src/firebase-config";
import {
  doc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      projects: [],
      temp: [],
      projects_copy:[],
      page: 1,
      dataEmpty: true,
      details: false,
      showTitle: "",
      showDetails: "",
      showStatus: "",
      showTeam: "",
      items: [
        { text: "Projects", href: "/projects" },
        { text: "Ongoing Projects", disabled: true },
      ],
      navVisible:false
    };
  },
  methods: {
    fetchData() {
      let data = [];
      const q = query(colRef, where("status", "==", "ongoing"));
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.projects = data;
        this.temp=data.slice(0,12) ;
        console.log(this.projects);
        data = [];
        if((Math.ceil(this.projects.length/12))>1){
          this.navVisible=true;
        }
        if (this.projects.length != 0 || this.projects!=null) {
          this.dataEmpty = false;
        }
      });
    },
    deleteData(id) {
      const delRef = doc(db, colRef.id, id);
      deleteDoc(delRef)
        .then(() => console.log("Data deleted succesfully...."))
        .catch((err) => console.log(err));
    },
    updateData(id) {
      console.log(id);
      const updtRef = doc(db, colRef.id, id);
      updateDoc(updtRef, {
        status: "completed",
      })
        .then(() => console.log("Data updated succesfully..."))
        .catch((err) => console.log(err));
    },
    viewer(page) {
      this.temp = this.projects.slice((page - 1) * 12, (page - 1) * 12 + 12);
      console.log("Yeah")
    },
  },
  created() {
    this.fetchData(); 
    // this.viewer(this.page);
    console.log('On created: ',this.temp,this.projects);
  },
  updated(){
    // console.log('On update: ',this.temp,this.projects);
    if(this.temp.length>=9){
      // this.viewer(this.page);
      console.log(this.temp);
      
    }
  }
};
</script>
