<template>
  <div class="project">
    <h1 class="ma-5 grey--text font-weight-regular">Projects</h1>

    <v-container fluid >

      <v-row no-gutters style="height:10rem" class="px-0">
        <v-col xs="8" sm="6" lg="4" xl="4" cols="12" v-for="card in cards" :key="card" router>
          <v-card class="white--text ma-3 " style="height:10rem;cursor:pointer" :class="card.theme" :to="card.route">
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
        projects:[
          {title:'Project 1',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. '},
          {title:'Project 2',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. '},
          {title:'Project 3',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. '},
          {title:'Project 4',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. '},
          {title:'Project 5',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse magni nemo pariatur libero odit reiciendis voluptatum placeat animi sunt numquam fuga dolorum nesciunt iste illo error, officiis cum quasi exercitationem cupiditate dolor consectetur. '},
        ],
        cards:[
          {title:'Ongoing',count:0,theme:'green',route:'/ongoing'},
          {title:'Completed',count:0,theme:'secondary',route:'/completed'},
          {title:'Total Projects',count:0,theme:'primary',route:'/total'}
        ]
      }
    }
  }
</script>
