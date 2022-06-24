<template>
  <div>
    <v-toolbar color="indigo" class="white--text" bav>

      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ProjVue</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app>

      <v-list>
        <v-list-item-group>

          <v-list-item v-for="item in navs" :key="item" router :to="item.route">

            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>


            <v-list-item-title>{{ item.title }}</v-list-item-title>


          </v-list-item>

        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      navs: [
        { title: "DashBoard", icon: 'mdi-desktop-mac-dashboard', route: '/dashboard' },
        { title: "Projects", icon: 'mdi-clipboard-list', route: '/projects' },
        { title: "Team", icon: 'mdi-account-group', route: '/teams' }
      ]
    }
  }
}
</script>