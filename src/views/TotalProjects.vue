<template>
  <div class="totalprojects">
    <v-container fluid class="d-flex pa-5 align-center">
      <h1 class="grey--text display-1 font-weight-regular my-3 ml-5">
        Your Total Projects
      </h1>
      <v-spacer></v-spacer>
      <v-btn class="green white--text mr-5" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>Add
      </v-btn>
    </v-container>
    <!-- <hr> -->

    <v-container fluid>
      <span v-if="dataEmpty" class="text-center d-block text-h5"
        >Nothing to see here.....</span
      >

      <v-row class="mx-5" no-gutters>
        <v-col md="4" cols="12" v-for="data in projects" :key="data">
          <v-card class="ma-2" elevation="4">
            <v-card-title class="text-h6"
              >{{ data.title }}
              <v-spacer></v-spacer>
              <v-btn
                fab
                x-small
                class="primary white--text"
                @click="
                  overlay = !overlay;
                  tempid = data.id;
                  updt_project_title = data.title;
                  updt_project_details = data.details;
                "
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn
                fab
                x-small
                class="error white--text mx-2"
                @click="deleteData(data.id)"
              >
                <v-icon>mdi-delete</v-icon></v-btn
              >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    x-small
                    class="warning white--text"
                    :attrs="attrs"
                    v-on="on"
                    @click="details=!details;showTitle=data.title;showDetails=data.details;showStatus=data.status"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <span>Detials</span>
              </v-tooltip>
            </v-card-title>
            <v-card-text>{{ data.details }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>Add New Project</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Project Name"
              :rules="rules"
              counter="30"
              maxlength="30"
              v-model="projtitle"
            ></v-text-field>
            <v-textarea
              label="Project Discription"
              v-model="projdetails"
            ></v-textarea>
            <!-- <v-date- ></v-date-picker> -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green white--text lighten-1" @click="addData"
            >Add</v-btn
          >
          <v-btn
            class="secondary text--white lighten-2"
            @click="dialog = !dialog"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Overlay -->
    <v-overlay v-model="overlay">
      <v-card style="width: 25rem" light>
        <v-card-title class="pa-4">Enter updated data</v-card-title>
        <v-text-field
          class="px-4"
          label="Enter the updated project name"
          counter="30"
          maxlength="30"
          :rules="rules"
          v-model="updt_project_title"
        ></v-text-field>
        <v-textarea
          class="px-4"
          label="Enter the updated details of project"
          v-model="updt_project_details"
        ></v-textarea>
        <v-btn
          medium
          class="indigo white--text ma-4"
          @click="
            updateData(tempid);
            overlay = !overlay;
          "
          >Update</v-btn
        >

        <v-btn
          medium
          class="secondary white--text ma-4"
          @click="overlay = !overlay;"
          >Close</v-btn
        >
      </v-card>
    </v-overlay>

    <v-overlay v-model="details">
      <v-card light style="width:30rem" class="pa-4">
        <v-card-title>Project Name:</v-card-title>
        <v-card-text>{{showTitle}}</v-card-text>
        <v-card-title>Project Details:</v-card-title>
        <v-card-text>{{showDetails}}</v-card-text>        
        <v-card-title>Project Status:</v-card-title>
        <v-card-text>{{showStatus}}</v-card-text>
        <v-card-action>
          <v-btn class="secondary white--text ma-4" @click="details=!details">Close</v-btn>
        </v-card-action>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import { db, colRef } from "../../src/firebase-config";
import {
  onSnapshot,
  serverTimestamp,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
export default {
  data() {
    return {
      projects: [],
      overlay: false,
      addProject: true,
      dataEmpty: false,
      details:false,
      projtitle: "",
      projdetails: "",
      updt_project_title: "",
      updt_project_details: "",
      showTitle:'',showDetails:'',showStatus:'',
      rules: [
        (value) => !!value || "Required !",
        (value) => value.length <= 30 || "Max character limit is 30",
      ],
      dialog: false,
      tempid: 0,
    };
  },
  methods: {
    fetchData() {
      let data = [];
      const q=query(colRef,orderBy('createdAt'))
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.projects = data;
        data = [];
        if (this.projects.length != 0) {
          this.dataEmpty = false;
        }
      });
    },
    addData() {
      addDoc(colRef, {
        title: this.projtitle,
        details: this.projdetails,
        status:'ongoing',
        createdAt:serverTimestamp()
      })
        .then(() => console.log("Data added succsfully....!"))
        .catch((err) => console.log(err));
        this.dialog=!this.dialog
        this.projdetails="";this.projtitle=""
    },
    deleteData(id) {
      const delRef = doc(db, colRef.id, id);
      deleteDoc(delRef)
        .then(() => console.log("Data deleted succesfully...."))
        .catch((err) => console.log(err));
    },
    updateData(id) {
      const updtRef = doc(db, colRef.id, id);
      updateDoc(updtRef, {
        title: this.updt_project_title,
        details: this.updt_project_details,
      })
        .then(() => console.log("Data upated succesfully....."))
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
