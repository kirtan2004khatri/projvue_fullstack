<template>
  <v-app>
    <v-app-bar class="indigo" app v-if="allowed">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 white--text">ProjVue</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-avatar color="white" size="40">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app v-if="allowed">
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
      <v-container fluid v-if="!allowed" class="red lighten-2 pt-5" style="height:100vh">

        <v-card width="400" class="mx-auto mt-5">
          <v-card-title class="text-center d-block grey lighten-3">Login</v-card-title>
          <v-form class="mx-5 pa-4">
            <v-text-field label="Email id or Phone number" class="email" v-model="email"></v-text-field>
            <v-text-field 
              label="Password" 
              v-model="password" 
              :append-icon="show?'mdi-eye':'mdi-eye-off'"
              @click:append="show=!show"
              counter="8"
              maxlength="8"
              :rules="rules"
              :type="show ? 'text' : 'password'"
              ></v-text-field>
            <v-btn class="primary white--text mt-5 mb-2" block @click="login">Log in</v-btn>
          <v-card-text class="text-center">Dont have an account ? <span class="text-decoration-underline blue--text font-weight-bold" style="cursor:pointer" @click="signup=!signup">Create One</span></v-card-text>
          </v-form>
        </v-card>

      </v-container>
      <router-view v-if="allowed"></router-view>
    </v-main>

    <v-footer class="indigo white--text" app v-if="allowed">
      <span class="mx-auto">Vue@2022</span>
    </v-footer>
  </v-app>
</template>

<script>
import {auth} from '../src/firebase-config'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from '@firebase/auth'
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      allowed:false,
      signup:true,
      show:false,show2:false,
      navs: [
        {
          title: "DashBoard",
          icon: "mdi-desktop-mac-dashboard",
          route: "/dashboard",
        },
        { title: "Projects", icon: "mdi-clipboard-list", route: "/projects" },
        { title: "Team", icon: "mdi-account-group", route: "/teams" },
      ],
      rules:[
        v=>!!v || "Password Required",
        v=>v.length<=8 || "Password should be 8 character's long"
      ],
      erules:[
        v=>!!v||"Email Required",
        v=>v.includes("@")||"Email id should contain @!"
      ],
      password:'',email:'',username:''
    };
  },
  methods:{
    logAction(){
      createUserWithEmailAndPassword(auth,cemail,cpassword)
      .then((cred)=>console.log(cred))
      .catch(err=>console.log(err,cpassword,cemail));
    },
    login(){
      const cpassword=this.password;
      const cemail=this.email;
      signInWithEmailAndPassword(auth,cemail,cpassword)
      .then(cred=>
      {
        if(cred._tokenResponse.email==cemail){
          this.allowed=true;
          localStorage.setItem('loged in',1);
        }
        else{
          this.allowed=false;
        }
      })
      .catch(err=>console.log(err));
    }
  },
  created(){
    if(localStorage.getItem('loged in')==1){
      this.allowed=true
    }
  }
};
</script>
