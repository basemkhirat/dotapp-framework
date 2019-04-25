<template>
     <div v-if="stateMediaModal">
          <b-modal @close="closeMediaModal" :canCancel="false" :has-modal-card="false" :active.sync="mediaModal" scroll="keep" class="modal--custom modal--lg media--content">
               <div class=" pb-0">
                    <div class="upper--media d-flex align-items-center">
                         <h2 class="title--one">Media</h2>
                         <button class="button is-primary is-rounded ml-auto" @click="changeModalUploadFiles">Upload <i class="fas fa-cloud-upload-alt ml-2"></i></button>
                    </div>
                    <!-- Filter Media -->
                    <filter-media />

                    <!-- Items Media -->
                    <div class="row">

                         <vue-perfect-scrollbar class="media--items--wrap" :settings="scrollSettingsMedia">
                              <div class="media--items">
                                   <media-items :data="images"/>
                              </div>
                         </vue-perfect-scrollbar>

                    </div>

                    <div class="lower--media--modal pt-4">
                         <div class="d-flex align-items-center">
                              <div v-if="itemsSelectedCount">Selected: <strong class="ml-2">{{itemsSelectedCount}}</strong></div>
                              <div class="ml-auto buttons">
                                   <button :class="{'showActionButton': itemsSelectedCount}" 
                                   class="button showButtonAddAlbum is-rounded" 
                                   @click="changeModalCreateAlbum">
                                        Add to album 
                                        <i class="fas fa-clone ml-2"></i>
                                   </button>
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
import {images} from './../../mocks/media/images.js'
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
     data(){
          return {
               mediaModal: true,
               mediaModalUploadFile: false,
               modalCreateAlbum: false,
               images,
               scrollSettingsMedia: {
                    maxScrollbarLength: 160
                },
          }
     },
     components:{
          filterMedia,
          mediaItems,
          VuePerfectScrollbar,
          uploadFiles,
          createAlbum,
     },
     watch:{
          stateMediaModal(){
               this.stateMediaModal ? this.mediaModal = true : this.mediaModal = false
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
          changeModalUploadFiles(){
               this.mediaModalUploadFile = !this.mediaModalUploadFile
          },
          changeModalCreateAlbum(){
               this.modalCreateAlbum = !this.modalCreateAlbum
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
            }
     }
}
</script>

