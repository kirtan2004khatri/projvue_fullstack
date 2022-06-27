<template>
  <div class="totalprojects">
    <h1 class="grey--text display-1 font-weight-regular my-3 ml-5 pa-5 ">Your Completed Projects</h1>
    <!-- <hr> -->

    <v-container fluid>

      <span v-if="dataEmpty" class="text-center d-block text-h5">Nothing to see here.....</span>

      <v-row class="mx-5" no-gutters>

        <v-col sm="6" md="4" cols="12" v-for="data in projects">
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
import { db, colRef } from '../../src/firebase-config';
import { onSnapshot, orderBy, query, where } from '@firebase/firestore';
export default {
  data() {
    return {
      projects: [],drawer: true,
      dataEmpty: true
    }
  },
  methods: {
    fetchData() {
      let data = [];
      const q=query(colRef,where("status","==","completed"),orderBy('createdAt'));
      onSnapshot(q, snapshot => {
        snapshot.docs.forEach(e => {
          data.push({ ...e.data(), id: e.id });
        });
        this.projects = data;
        data = [];
        if (this.projects.length != 0) {
          this.dataEmpty =false;
        }
      })
    }
  },
  created(){
    this.fetchData();
  }
}
</script>
