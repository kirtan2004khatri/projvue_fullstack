<template>
  <div class="totalprojects">
    <v-container fluid class="d-flex pa-5 align-center">
      <h1 class="grey--text display-1 font-weight-regular my-3 ml-5">Your Total Projects</h1>
      <v-spacer></v-spacer>
      <v-btn class="green white--text mr-5" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>Add
      </v-btn>
    </v-container>
    <!-- <hr> -->

    <v-container fluid>

      <v-row class="mx-5" no-gutters>

        <v-col lg="6" sm="6" md="6" cols="12" v-for="data, key in projects">
          <v-card class="ma-2" @click="projectDetailsOverlay = !projectDetailsOverlay">
            <v-card-title>{{ data.title }}</v-card-title>
            <v-card-text>{{ data.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>

    <v-overlay v-model="projectDetailsOverlay" :absolute="absolute" opacity="0.8">
      <v-card light>
        <v-card-title>This is the title</v-card-title>
        <v-card-content>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut optio consectetur, voluptatibus
          tenetur debitis, saepe rem quasi tempora hic dolore fuga beatae eos rerum doloremque.</v-card-content>
      </v-card>
    </v-overlay>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>Add New Project</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Project Name" :rules="rules"></v-text-field>
            <v-textarea label="Project Discription"></v-textarea>
            <!-- <v-date- ></v-date-picker> -->
          </v-form>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green white--text lighten-1">Add</v-btn>
          <v-btn class="secondary text--white lighten-2" @click="dialog = !dialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-pagination v-model="page" length="4" next="page++;pageLimit+=pageLimit;keyLimit+=7" previous="page--" input="page"></v-pagination> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        { title: 'Project 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 4', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 5', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 6', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 7', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 8', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' },
        { title: 'Project 9', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. ' }
      ]
      , page: 1, pageLimit: 7, keyLimit: 0, projectDetailsOverlay: false, keyLimit: 0, addProject: true,
      rules: [
        value => !!value || 'Required !',
        value => (value && value.length >= 3) || 'Min 3 characters required'
      ], dialog: false
    }
  }
}
</script>
