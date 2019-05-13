<template>
     <div class="media--content">
          <div class="page--title">
               <h1 class="title--text">Media</h1>
               <!-- <div class="page--title--action ml-auto">
                    <router-link to="/groupForm" class="button is-primary is-rounded">Add New Group</router-link>
               </div> -->
          </div>
          <div class="card--block">
               <div class="card--hreader">
                    <div class="card--header--title">
                         All Media
                    </div>
                    <div class="card--header--action">
                         <div class="row align-items-center">
                              <div class="col-12 col-sm">
                                   <v-select :options="typeOptions" v-model="filterType" label="title"
                                        class="select--with--icon v--select--scroll w-100">
                                        <template slot="option" slot-scope="option">
                                             <span :class="option.icon"></span>
                                             {{ option.title }}
                                        </template>
                                   </v-select>
                              </div>
                              <div class="col-12 col-sm">
                                   <v-select :options="typeOptionsShow" v-model="filterTypeShow" label="title"
                                        class="select--with--icon v--select--scroll w-100">
                                        <template slot="option" slot-scope="option">
                                             <span :class="option.icon"></span>
                                             {{ option.title }}
                                        </template>
                                   </v-select>
                              </div>
                              <div class="col-12 col-sm">
                                   <div class="search">
                                        <b-input placeholder="Search..." type="search" icon-pack="fa" rounded
                                             icon="search">
                                        </b-input>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div class="card--content">
                    <div class="media--items">
                         <media-items :data="images" />
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
     import {
          images
     } from '../../mocks/media/images.js'
     import MediaItems from '../../components/media/MediaItems'
     import {
          mapState
     } from 'vuex'

     // Repository Data
     import { RepositoryFactory } from '../../repositories/RepositoryFactory'
     const mediaRepository = RepositoryFactory.get('media')


     export default {
          name: 'groups',
          data() {
               return {
                    images,
                    typeOptions: [{
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
                    typeOptionsShow: [{
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
               };
          },
          components: {
               MediaItems,
          },
          computed: {
               ...mapState({
                    itemsSelectedCount: state => state.media.itemsSelectedCount
               })
          },
          methods: {

          }
     }
</script>