<template>
     <div class="filter--items">
          <div class="row">
               <div class="col-12 col-md">
                    <v-select :options="groups" v-model="group" label="title" placeholder="Sort By Group" class="select--with--icon w-100 v--select--scroll">
                         <template slot="option" slot-scope="option">
                              {{ option.title }}
                         </template>
                    </v-select>
               </div>
               <div class="col-12 col-md">
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
               group: '',
               groups: ['All', 'admin', 'editor', 'users']
          }
     }
}
</script>