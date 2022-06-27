<template>
  <v-app>
    <v-app-bar class="indigo" app>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 white--text">ProjVue</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="item in navs" :key="item" router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer class="indigo white--text" app>
      <span class="mx-auto">Vue@2022</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      navs: [
        {
          title: "DashBoard",
          icon: "mdi-desktop-mac-dashboard",
          route: "/dashboard",
        },
        { title: "Projects", icon: "mdi-clipboard-list", route: "/projects" },
        { title: "Team", icon: "mdi-account-group", route: "/teams" },
      ],
    };
  },
};
</script>
