<template>
     <div v-if="stateMediaModal">
          <b-modal @close="closeMediaModal" :canCancel="false" :has-modal-card="false" :active.sync="mediaModal" scroll="keep" class="modal--custom modal--lg media--content">
               <div class=" pb-0">
                    <div class="upper--media d-flex align-items-center">
                         <h2 class="title--one">
                              Media
                              <span class="badge--count" v-if="total">
                                   ({{total}})
                              </span>
                         </h2>
                         
                         <button class="button is-primary is-rounded ml-auto" @click="changeModalUploadFiles">
                              Upload 
                              <i class="fas fa-cloud-upload-alt ml-2"></i>
                         </button>
                    </div>

                    <!-- Filter Media -->
                    <filter-media @changeFilters="changeFilters" />

                    <!-- Items Media -->
                    <div class="">

                         <template v-if="dataLoading">
                              <div class="media--items--wrap d-flex align-items-center justify-content-center w-100">
                                   <loading-data></loading-data>
                              </div>
                         </template>

                          <template v-else>
        
                              <div  class="media--items--wrap">
                                   <div class="media--items">
                                        <media-items :data="items"/>
                                        <div class="py-4 text-center w-100">
                                             <infinite-loading @infinite="infiniteHandler">
                                                  <div slot="no-more"></div>
                                                  <div slot="no-results"></div>
                                             </infinite-loading>
                                        </div>
                                   </div>
                              </div>
                                   
                          </template>

                    </div>

                    <div class="lower--media--modal pt-4">
                         <div class="d-flex align-items-center">
                              <div v-if="itemsSelectedCount">Selected: <strong class="ml-2">{{itemsSelectedCount}}</strong></div>
                              <div class="ml-auto buttons">
                                   <!-- <button :class="{'showActionButton': itemsSelectedCount}" 
                                   class="button showButtonAddAlbum is-rounded" 
                                   @click="changeModalCreateAlbum">
                                        Add to album 
                                        <i class="fas fa-clone ml-2"></i>
                                   </button> -->
                                   <button :class="{'showActionButton': itemsSelectedCount}" 
                                   class="button is-rounded showButtonDeleteImage" 
                                   @click="confirmCustomDelete">
                                        Delete 
                                        <i class="fas fa-trash ml-2"></i>
                                   </button>
                                   <button :class="{'showActionButton': itemsSelectedCount}" 
                                   class="button is-rounded showButtonInsert">
                                        Insert to post 
                                        <i class="fas fa-share ml-2"></i>
                                   </button>
                                   <button class="button is-rounded is-light ml-4" @click="closeMediaModal">Cancel</button>
                              </div>
                         </div>
                    </div>
               </div>
          </b-modal>
         

          <!-- Modal Upload Files -->
          <upload-files :uploadFileFromParent="mediaModalUploadFile" @changeModalUploadFiles="changeModalUploadFiles" />

          <!-- Modal Create Album -->
          <create-album :modalCreateAlbum="modalCreateAlbum" @changeModalCreateAlbum="changeModalCreateAlbum"/>          

          
     </div>
</template>

<script>
import {mapState} from 'vuex'
import filterMedia from './FilterMedia'
import mediaItems from './MediaItems'
import uploadFiles from './UploadFiles'
import createAlbum from './CreateAlbum'

// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const mediaRepository = RepositoryFactory.get('media')

import InfiniteLoading from 'vue-infinite-loading';

export default {
     data(){
          return {
               mediaModal: false,
               mediaModalUploadFile: false,
               modalCreateAlbum: false,
               items: [],
               total: null,
               allUserSelected: false,
               page: 1, 
               pageLoadMore: 2, 
               limit:25,
               order: 'is-centered',
               dataLoading: false,
               filters: {}
          }
     },
     created(){
          if(this.mediaModal === true){
                this.fetchAllItems()
          }
     },
     components:{
          filterMedia,
          mediaItems,
          uploadFiles,
          createAlbum,
          InfiniteLoading
     },
     watch:{
          stateMediaModal(){
               this.stateMediaModal ? this.mediaModal = true : this.mediaModal = false
          },
          mediaModal(){
               if(this.mediaModal === true){
                    this.fetchAllItems()
               }
          }
     },
     computed:{
          ...mapState({
               stateMediaModal: state => state.stateMediaModal,
               itemsSelectedCount: state => state.media.itemsSelectedCount
          })
     },
     methods:{
          closeMediaModal(){
               this.$store.commit('closeMediaModal')
          },
          changeModalUploadFiles(data){
               this.mediaModalUploadFile = !this.mediaModalUploadFile
               if(data.newItem == true){
                    this.fetchAllItems()
               }
          },

          changeModalCreateAlbum(){
               this.modalCreateAlbum = !this.modalCreateAlbum
          },

          // Get All Media
          async fetchAllItems() {
               this.pageLoadMore = 2
               this.dataLoading = true
               const data = await mediaRepository.getAllMedia(this.page, this.limit, this.filters)
               this.items = data.docs;
               this.total = data.total;
               this.dataLoading = false;
          },
    
          confirmCustomDelete() {
                this.$dialog.confirm({
                    title: 'Deleting Images',
                    message: 'Are you sure you want to <b>delete</b> this images? This action cannot be undone.',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () =>{
                         this.$toast.open({
                              duration: 4000,
                              message: `Images deleted!`,
                              position: 'is-bottom-right',
                              // type: 'is-success'
                         })
                    }
                })
            },
     
           async infiniteHandler($state) {
               const data =  await mediaRepository.getAllMedia(this.pageLoadMore, this.limit, this.filters)
               if (data.docs.length) {
                    this.pageLoadMore += 1;
                    this.items.push(...data.docs);
                    $state.loaded();
               } else {
                    $state.complete();
               }
            },

          // Filters
          changeFilters(filters){
               this.filters = filters
               this.fetchAllItems()
          }

     }
}
</script>

