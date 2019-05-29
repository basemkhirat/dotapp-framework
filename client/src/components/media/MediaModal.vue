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
                                        <media-items :data="items" @checkItemsMedia="checkItemsMedia" @fetchAllItems="fetchAllItems"/>
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
                              <div v-if="itemsSelectedMedia.length">Selected: <strong class="ml-2">{{itemsSelectedMedia.length}}</strong></div>
                              <div class="ml-auto buttons">
                                   <!-- <button :class="{'showActionButton': itemsSelectedMedia}"
                                   class="button showButtonAddAlbum is-rounded"
                                   @click="changeModalCreateAlbum">
                                        Add to album
                                        <i class="fas fa-clone ml-2"></i>
                                   </button> -->
                                   <button :class="{'showActionButton': itemsSelectedMedia.length}"
                                   class="button is-rounded showButtonDeleteImage"
                                   @click="confirmCustomDelete">
                                        Delete
                                        <i class="fas fa-trash ml-2"></i>
                                   </button>
                                   <!-- <button :class="{'showActionButton': itemsSelectedMedia}"
                                   class="button is-rounded showButtonInsert">
                                        Insert to post
                                        <i class="fas fa-share ml-2"></i>
                                   </button> -->
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
               filters: {},
               itemsSelectedMedia:[],
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
               previewImages: state => state.previewImages,
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
               if(this.previewImages){
                   this.filters.type = 'image'
               } else {
                   this.filters.type = ''
               }
               const data = await mediaRepository.getAllMedia(this.page, this.limit, this.filters)
               this.items = data.docs;
               this.total = data.total;
               this.dataLoading = false;
               this.itemsSelectedMedia = []
          },

          checkItemsMedia(items){
               this.itemsSelectedMedia = items
          },

          confirmCustomDelete() {
                this.$dialog.confirm({
                    title: 'Deleting Items',
                    message: 'Are you sure you want to <b>delete</b> this Items? This action cannot be undone.',
                    confirmText: 'Delete Items',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () =>{
                         this.deleteItems()
                    }
                })
            },

            // Delete Items
          async deleteItems(ids) {
               const items = await mediaRepository.deleteItems(this.itemsSelectedMedia)
               this.fetchAllItems()
               this.aleartMessage(items.message)
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
            aleartMessage(textMessage){
               this.$snackbar.open({
                    message: textMessage,
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 3000,
                    indefinite: false,
               })
          },

          // Filters
          changeFilters(filters){
               this.filters = filters
               this.fetchAllItems()
          }

     }
}
</script>

