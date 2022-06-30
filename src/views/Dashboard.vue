<template>
  <div class="dashboard">
    <h1 class="grey--text lighten-4 pt-md-2 pt-2 text-h4 mx-5 mt-5 mb-3 text-left">Dashboard</h1>
    <v-container fluid >

      <v-row no-gutters style="height:10rem">
        <v-col xs="8" sm="6" lg="4" xl="4" cols="12">
          <v-card class="white--text ma-2 warning" style="height:10rem">
            <v-card-title class="text-sm-h5 text-xs-h5 text-lg-h4">Projects</v-card-title>
            <v-card-text class="pt-2 white--text text-sm-h4 text-xs-h4 display-1">{{Project_Count}}</v-card-text>
          </v-card>
        </v-col>

        <v-col xs="8" sm="6" lg="4" xl="4" cols="12">
          <v-card class="white--text ma-2 primary" style="height:10rem">
            <v-card-title class="text-sm-h5 text-xs-h5 text-lg-h4">Teams</v-card-title>
            <v-card-text class="pt-2 white--text text-sm-h4 text-xs-h4 display-1">{{Project_Teams}}</v-card-text>
          </v-card>
        </v-col>

        <v-col xs="8" sm="6" lg="4" xl="4" cols="12">
          <v-card class="white--text ma-2 error" style="height:10rem">
            <v-card-title class="text-sm-h5 text-xs-h5 text-lg-h4">Completed Projects</v-card-title>
            <v-card-text class="pt-2 white--text text-sm-h4 text-xs-h4 display-1">{{Completed_Projects}}</v-card-text>
          </v-card>
        </v-col>

      </v-row>

    </v-container>
  </div>
</template>

<script>
import {colRef,teamRef} from '../../src/firebase-config'
import {onSnapshot} from '@firebase/firestore'
  export default{
    data(){
      return{
        cards:[
          {title:'Projects',count:0,theme:'warning'},
          {title:'Teams',count:0,theme:'primary'},
          {title:'Completed Projects',count:0,theme:'error'}
        ],
        Project_Count:0,Project_Teams:0,Completed_Projects:0
      }
    },
    methods:{
      fetchData(){
        let data=[]
        onSnapshot(colRef,snapshot=>{
          snapshot.docs.forEach(e=>{
            data.push({...e.data(),id:e.id});
          });
          this.Project_Count=data.length;
          console.log(data);
          data=data.filter(e=>{
            return e.status=="completed"
          });
          console.log(data);
          this.Completed_Projects=data.length;
          data=[]
        });
        onSnapshot(teamRef,snapshot=>{
          snapshot.docs.forEach(e=>{
            data.push({...e.data(),id:e.id});
          });
          this.Project_Teams=data.length;
          data=[]
        });
      }
    },
    created(){
      this.fetchData();
    }
  }
</script>