<template>
  <div class="teams pa-0">
    <h1 class="grey--text display-1 font-weight-regular my-3 ml-5 pa-3">
      Your Teams
    </h1>
    <v-container fluid class="ml-5">
      <v-row>
        <v-col col="4">
          <v-card class="white--text primary" router to="/team_members" >
            <v-card-title class="display-1">Team Members</v-card-title>
            <v-card-text class="display-1 white--text pt-2">0</v-card-text>
          </v-card>
        </v-col>
         <v-col col="4">
          <v-card class="white--text warning" router to="/total_teams" >
            <v-card-title class="display-1">Teams</v-card-title>
            <v-card-text class="display-1 white--text pt-2">0</v-card-text>
          </v-card>
        </v-col>
         <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>


