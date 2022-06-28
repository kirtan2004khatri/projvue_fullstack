import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Teams from '../views/Teams.vue'
import TotalProjects from '../views/TotalProjects.vue'
import Ongoing from '../views/Ongoing.vue'
import CompletedProjects from '../views/CompletedProjects.vue'
import TeamMembers from '../views/TeamMembers.vue'
import TotalTeams from '../views/TotalTeams.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name:'dashboard',
    component:Dashboard
  },
  {
    path: '/projects',
    name:'projects',
    component:Projects
  },
  {
    path: '/teams',
    name:'teams',
    component:Teams
  },
  {
    path:'/total',
    name:'total',
    component:TotalProjects
  },
  {
    path:"/ongoing",
    name:"ongoing",
    component:Ongoing
  },
  {
    path:"/completed",
    name:"completedProjects",
    component:CompletedProjects
  },
  {
    path:"/team_members",
    name:"team_members",
    component:TeamMembers
  },
  {
    path:'/total_teams',
    name:"total_teams",
    component:TotalTeams
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
