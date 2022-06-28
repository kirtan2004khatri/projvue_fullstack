<template>
  <div class="dashboard">
    <h1 class="grey--text lighten-4 display-1 pa-5">Dashboard</h1>
    <v-container fluid >

      <v-row no-gutters style="height:10rem" class="px-5">
        <v-col xs="8" sm="6" lg="4" xl="4" cols="12" v-for="card in cards" :key="card">
          <v-card class="white--text ma-2" style="height:10rem" :class="card.theme">
            <v-card-title class="text-sm-h5 text-xs-h5 text-lg-h4">{{card.title}}</v-card-title>
            <v-card-text class="pt-2 white--text text-sm-h4 text-xs-h4 display-1">{{card.count}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        cards:[
          {title:'Projects',count:0,theme:'warning'},
          {title:'Teams',count:0,theme:'primary'},
          {title:'Completed Projects',count:0,theme:'error'}
        ]
      }
    }
  }
</script>
