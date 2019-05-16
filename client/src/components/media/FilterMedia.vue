<template>
     <div class="filter--media py-4">
          <div class="row align-items-center">
               <div class="col-12 col-md-6">
                    <v-select :options="typeOptions" v-model="filterType" label="title" class="select--with--icon v--select--scroll my-2 my-md-0">
                         <template slot="option" slot-scope="option">
                              <span :class="option.icon"></span>
                              {{ option.title }}
                         </template>
                    </v-select>
                    <v-select :options="typeOptionsShow" v-model="filterTypeShow" label="title" class="select--with--icon ml-0 ml-md-4 v--select--scroll my-2 my-md-0">
                         <template slot="option" slot-scope="option">
                              <span :class="option.icon"></span>
                              {{ option.title }}
                         </template>
                    </v-select>
               </div>
               <div class="col-12 col-sm-6">
                    <div class="search">
                         <b-input placeholder="Search..."
                              type="search"
                              icon-pack="fa"
                              rounded
                              icon="search">
                         </b-input>
                    </div>
               </div>
          </div>
     </div>
     
</template>

<script>
export default {
     data(){
          return {
               typeOptions: [
                    {
                         title: 'All',
                         icon: 'fas fa-clone',
                    },
                    {
                         title: 'Images',
                         icon: 'fas fa-images',
                    },
                    {
                         title: 'Videos',
                         icon: 'fas fa-play-circle',
                    },
                    {
                         title: 'Sound',
                         icon: 'fas fa-volume-up',
                    },
                    {
                         title: 'Document',
                         icon: 'fas fa-file',
                    }
               ],
               typeOptionsShow: [
                    {
                         title: 'Recent',
                         icon: 'fas fa-clone',
                    },
                    {
                         title: 'Aecent',
                         icon: 'fas fa-images',
                    },
               ],
               filterType: 'All',
               filterTypeShow: 'Recent'
          }
     },
     
     methods:{
          
     }
}
</script>

