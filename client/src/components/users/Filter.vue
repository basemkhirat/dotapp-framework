<template>
     <div class="filter--items">
          <div>
               <div class="row mr-auto">
                    <div class="col-12 col-sm-6">
                         <button class="button is-rounded w-100" :class="{'is-primary' : checkUsers}" @click="selectAllUsers">Select All</button>
                    </div>
                    <div class="col-12 col-sm-6">
                         <v-select :options="groups" v-model="group" label="title" placeholder="Sort By Group" class="select--with--icon w-100 v--select--scroll">
                              <template slot="option" slot-scope="option">
                                   {{ option.title }}
                              </template>
                         </v-select>
                    </div>
               </div>
          </div>
          <div>
               <div class="row">
                    <div class="col-12 col-md">
                         <div class="search icon--right">
                              <b-input placeholder="Search..."
                                   type="search"
                                   icon-pack="fa"
                                   rounded
                                   icon="search">
                              </b-input>
                         </div>
                    </div>
                    <!-- <div class="col-12 col-md">
                        
                    </div> -->
               </div>
          </div>     
     </div>
</template>

<script>
export default {
     data(){
          return {
               group: '',
               groups: ['All', 'admin', 'editor', 'users'],
               checkUsers: false,
          }
     },
     methods:{
          selectAllUsers(){
               this.checkUsers =! this.checkUsers
               this.$emit('selectAllUsers')
          }
     }
}
</script>