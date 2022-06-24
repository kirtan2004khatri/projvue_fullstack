<template>
  <div class="totalprojects">
    <h1 class="grey--text display-1 font-weight-regular my-3 ml-5 pa-5 ">Your Completed Projects</h1>
    <!-- <hr> -->

    <v-container fluid>

      <v-row class="mx-5" no-gutters>

        <v-col lg="6" sm="6" md="6" cols="12" v-for="data, key in projects">
          <v-card class="ma-2 green lighten-5">
            <!-- <v-navigation-drawer v-model="drawer" class="green">&emsp;</v-navigation-drawer> -->
            <v-card-title>{{ data.title }}
              <v-spacer></v-spacer>
              <v-icon>mdi-check</v-icon>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-pagination v-model="page" length="4" next="page++;pageLimit+=pageLimit;keyLimit+=7" previous="page--" input="page"></v-pagination> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        { title: 'Project 1'},
        { title: 'Project 2'},
        { title: 'Project 3'},
        { title: 'Project 4'},
        { title: 'Project 5'},
        { title: 'Project 6'},
        { title: 'Project 7'},
        { title: 'Project 8'},
        { title: 'Project 9'}
      ]
      , page: 1 ,pageLimit:7 ,keyLimit:0,drawer:true
    }
  }
}
</script>
