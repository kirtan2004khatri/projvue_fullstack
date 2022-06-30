<template>
  <div class="totalprojects">
    <v-container fluid class="d-flex pt-5 py-0 align-center">
      <h1 class="grey--text text-md-h4 text-h6 font-weight-regular mt-md-2 ml-md-5 pl-md-0 pl-2">
        Your Total Projects
      </h1>
      <v-spacer></v-spacer>
      <v-btn class="green white--text mr-md-5" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>Add
      </v-btn>
    </v-container>
    <!-- <hr> -->

    <v-container fluid class="pa-0 py-0 my-0 mx-md-5 mx-1">
      <v-breadcrumbs
        :items="items"
        large
        class="px-5 pt-md-5"
      ></v-breadcrumbs>
    </v-container>

    <v-container fluid>
      <span v-if="dataEmpty" class="text-center d-block text-h5"
        >Nothing to see here.....</span
      >

      <v-row class="mx-md-5" no-gutters>
        <v-col md="4" cols="12" v-for="data in temp" :key="data">
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
                @click="
                  deleteDialog = !deleteDialog;
                  deleteid = data.id;
                "
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
                    @click="
                      details = !details;
                      showTitle = data.title;
                      showDetails = data.details;
                      showStatus = data.status;
                      showTeam=data.team;
                    "
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <span>Detials</span>
              </v-tooltip>
            </v-card-title>
            <v-card-text>{{ data.startDate }} - {{ data.dueDate }}</v-card-text>
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

            <!-- Date pickers -->
            <!-- Start date -->
            <!-- <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu> -->
            <!-- Due date -->
             <!-- <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date2"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  :allowed-dates="allowedDates"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu> -->

          <v-select
            :items="teams"
            label="Select team for project"
            v-model="selected_team"
          ></v-select>

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
          @click="overlay = !overlay"
          >Close</v-btn
        >
      </v-card>
    </v-overlay>
    <!-- Details Modal -->
    <v-overlay v-model="details">
      <v-card light style="width: 30rem" class="pa-4">
      <v-card-title>Project Details</v-card-title>
      <v-card-text>
        <v-row>
        <v-col cols="6">
          Project Name : 
        </v-col>
        <v-col cols="6">
          {{showTitle}}
        </v-col>
         <v-col cols="6">
          Project Details : 
        </v-col>
        <v-col cols="6">
          {{showDetails}}
        </v-col>
         <v-col cols="6">
          Project Status : 
        </v-col>
        <v-col cols="6">
          {{showStatus}}
        </v-col>
         <v-col cols="6">
          Project Start Data : 
        </v-col>
        <v-col cols="6">
          {{startDate}}
        </v-col>
         <v-col cols="6">
          Project Due Date : 
        </v-col>
        <v-col cols="6">
          {{dueData}}
        </v-col>
         <v-col cols="6">
          Asssigned To Team : 
        </v-col>
        <v-col cols="6">
          {{showTeam}}
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
    <!-- Confirmation modal -->
    <v-dialog
      v-model="deleteDialog"
      class="d-flex ma-0 justify-center"
      max-width="295"
    >
      <v-card>
        <v-card-title
          >Do you want to delete this item permanently ?</v-card-title
        >
        <v-card-action>
          <v-btn
            class="green white--text mx-5 my-5"
            @click="deleteData(deleteid)"
            >Yes</v-btn
          >
          <v-btn
            class="secondary white--text"
            @click="deleteDialog = !deleteDialog"
            >No</v-btn
          >
        </v-card-action>
      </v-card>
    </v-dialog>

  <v-pagination
    v-if="pageVisible"
    v-model="page"
    :page="this.page"
    dark
    :length="Math.ceil(this.projects.length/12)"
    color="green"
    @input="viewer(page)"
    class="ma-5"
  ></v-pagination>

  </div>
</template>

<script>
import { db, colRef,teamRef } from "../../src/firebase-config";
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
      dataEmpty: true,
      details: false,
      projtitle: "",
      projdetails: "",
      updt_project_title: "",
      updt_project_details: "",
      showTitle: "",
      showDetails: "",
      showStatus: "",
      rules: [
        (value) => !!value || "Required !",
        (value) => value.length <= 30 || "Max character limit is 30",
      ],
      dialog: false,
      tempid: 0,
      deleteDialog: false,
      deleteid: 0,
      menu: false,
      startDate: "",
      dueDate: "",
      date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      date2:'',
      items:[
        {text:'Projects',href:'/projects'},
        {text:'Total Projects',disabled:true}
      ],
      teams:[],
      selected_team:'',showTeam:'',page:1,
      temp:[],pageVisible:false
    };
  },
  methods: {
    fetchData() {
      let data = [];
      const q = query(colRef, orderBy("createdAt"));
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.projects = data;
        this.temp=data.slice(0,12);
        data = [];
        if (this.projects.length != 0) {
          this.dataEmpty = false;
        }
        if((Math.ceil(this.projects.length/12))>1){
          this.pageVisible=true;
        }
      });
      onSnapshot(teamRef,snapshot=>{
        snapshot.docs.forEach(e=>{
          data.push({...e.data(),id:e.id});
        });
        data.forEach(e=>{
          this.teams.push(e.team_name);
        })
        data=[]
      })
    },
    addData() {
      addDoc(colRef, {
        title: this.projtitle,
        details: this.projdetails,
        status: "ongoing",
        team:this.selected_team,
        createdAt: serverTimestamp(),
      })
        .then(() => console.log("Data added succsfully....!"))
        .catch((err) => console.log(err));
      this.dialog = !this.dialog;
      this.projdetails = "";
      this.projtitle = "";
      this.selected_team=[]
    },
    deleteData(id) {
      const delRef = doc(db, colRef.id, id);
      deleteDoc(delRef)
        .then(() => console.log("Data deleted succesfully...."))
        .catch((err) => console.log(err));
      this.deleteDialog = false;
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
    allowedDates(){
      if(this.date<date1){
        return this.date
      }
    },
    viewer(page){
      this.temp=this.projects.slice((page-1)*12,(page-1)*12+12);
      console.log(this.temp);
      }
  },
  created() {
    this.fetchData();
    this.viewer(this.page);
  },
};
</script>
