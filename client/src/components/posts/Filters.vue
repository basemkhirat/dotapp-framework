<template>
     <div class="filter--items">
          <form class="form--group">
               <div class="row">
                    <div class="col-12 col-md">
                         <v-select :options="allSections" v-model="sections" label="title" placeholder="Sort By Section" class="select--with--icon w-100 v--select--scroll">
                              <template slot="option" slot-scope="option">
                                   {{ option.title }}
                              </template>
                         </v-select>
                    </div>
                    <div class="col-12 col-md">
                         <v-select :options="statusItems" v-model="status" label="title" placeholder="Sort By Status" class="select--with--icon w-100 v--select--scroll">
                              <template slot="option" slot-scope="option">
                                   {{ option.title }}
                              </template>
                         </v-select>
                    </div>
                    <div class="col-12 col-md">
                         <v-select :options="allUsers" v-model="users" label="title" placeholder="Sort By User" class="select--with--icon w-100 v--select--scroll">
                              <template slot="option" slot-scope="option">
                                   {{ option.title }}
                              </template>
                         </v-select>
                    </div>
                    <div class="col-12 col-md">
                         <b-datepicker
                              placeholder="Select a date"
                              icon="calendar-today">
                         </b-datepicker>
                    </div>
                    <div class="col-12 col-md">
                         <div class="search">
                              <b-input :placeholder="$t('search') + '...'"
                                   type="search"
                                   icon-pack="fa"
                                   icon="search">
                              </b-input>
                         </div>
                    </div>
               </div>
          </form>
     </div>
</template>

<script>
export default {
     data(){
          return {
               sections: '',
               status: '',
               users: '',
               allSections: ['News', 'Media', 'Sport', 'Art'],
               statusItems: ['All', 'Published', 'Not Published'],
               allUsers: ['User One', 'User Two', 'User Three'],
          }
     }
}
</script>
