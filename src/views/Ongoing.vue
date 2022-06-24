<template>
  <div class="totalprojects">
    <h1 class="grey--text display-1 font-weight-regular my-3 ml-5 pa-5 ">Your Ongoing Projects</h1>
    <!-- <hr> -->

    <v-container fluid>

      <v-row class="mx-5" no-gutters>

        <v-col lg="6" sm="6" md="6" cols="12" v-for="data, key in projects">
          <v-card class="ma-2 grey lighten-4">
            <v-card-title>{{ data.title }}
              <v-spacer></v-spacer>
                <v-btn class="success white--text mx-1" fab small><v-icon>mdi-check</v-icon></v-btn>
                <v-btn class="red white--text mx-1" fab small><v-icon>mdi-delete</v-icon></v-btn>
                <v-btn class="secondary white--text mx-1" fab small><v-icon>mdi-dots-vertical</v-icon></v-btn>
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
      , page: 1 ,pageLimit:7 ,keyLimit:0
    }
  }
}
</script>
