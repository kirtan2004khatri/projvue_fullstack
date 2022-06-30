<template>
  <div class="teams pa-0">
    <h1 class="grey--text text-h4 font-weight-regular my-3 ml-5 pt-2">
      Your Teams
    </h1>
    <v-container fluid class="px-5">
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="white--text primary" router to="/team_members" >
            <v-card-title class="display-1">Team Members</v-card-title>
            <v-card-text class="display-1 white--text pt-2">{{this.members.length}}</v-card-text>
          </v-card>
        </v-col>
         <v-col cols="12" md="4">
          <v-card class="white--text warning" router to="/total_teams" >
            <v-card-title class="display-1">Teams</v-card-title>
            <v-card-text class="display-1 white--text pt-2">{{this.teams.length}}</v-card-text>
          </v-card>
        </v-col>
         <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {db,teamRef,teamMembRef} from '../../src/firebase-config';
import {onSnapshot} from '@firebase/firestore';
  export default{
    data(){
      return{
        teams:[],
        members:[],
        page:1,
        temp:[]
      }
    },
    methods:{
      fetchData(){
        let data=[];
        onSnapshot(teamRef,snapshot=>{
          snapshot.docs.forEach(e=>{
            data.push({...e.data(),id:e.id});
          });
          this.teams=data;
          this.temp=data;
          console.log(data);
          data=[];
        });
        onSnapshot(teamMembRef,snapshot=>{
          snapshot.docs.forEach(e=>{
            data.push({...e.data(),id:e.id});
          });
          this.members=data;
          console.log(data)
          data=[];
        })
      }
    },
    created(){
      this.fetchData();
    }
  }
</script>


