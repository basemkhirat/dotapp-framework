<template>
     <!-- Modal Crop Image -->
     <b-modal :canCancel="false" :width="640" :active.sync="modalCropImage" scroll="keep"
          class="modal--custom modal--edit--images modal--lg modal--crop--image">
          <div class="row h-100">
               <div class="col-12 col-md-8 col-xl-9 bg-black">
                    <div class="image--crop--wrap">
                         <div class="image--crop--content">
                              <vueCropper
                                   ref="cropper"
                                   :img="itemSelected.url"
                                   :autoCrop="true"
                                   :full="false"
                                   :fixed="true"
                                   :fixedBox="false"
                                   :autoCropWidth="currentThumbnaile.width"
                                   :autoCropHeight="currentThumbnaile.height"
                                   :centerBox="true"
                                   :fixedNumber="[currentThumbnaile.width,currentThumbnaile.height]"
                              ></vueCropper>
                         </div>
                         <div class="action--crop">
                              <b-tooltip label="Rotate Left" type="is-dark" position="is-top">
                                   <button class="button is-dark is-rounded" @click="rotateLeft()"><i class="fas fa-undo"></i></button>
                              </b-tooltip>
                              <b-tooltip label="Rotate Right" type="is-dark" position="is-top">
                                   <button class="button is-dark is-rounded" @click="rotateRight()"><i class="fas fa-redo"></i></button>
                              </b-tooltip>
                              <b-tooltip label="Clear Crop" type="is-dark" position="is-top">
                                   <button class="button is-dark is-rounded" @click="clearCrop()"><i class="fas fa-crop"></i></button>
                              </b-tooltip>
                              <b-tooltip label="Zoom In" type="is-dark" position="is-top">
                                   <button class="button is-dark is-rounded" @click="zoomIn()"><i class="fas fa-search-plus"></i></button>
                              </b-tooltip>
                              <b-tooltip label="Zoom Out" type="is-dark" position="is-top">
                                   <button class="button is-dark is-rounded" @click="zoomOut()"><i class="fas fa-search-minus"></i></button>
                              </b-tooltip>
                         </div>
                    </div>

               </div>

               <div class="col-12 col-md-4 col-xl-3 bg-white right--thumbnails--preview">
                   <div class="thumbnails--preview">
                        <div class="thumbnails--item" v-for="item in thumbnails" :key="item.name" @click="checkThumbnail(item)" :class="{'thumbnail--selected' : item.name === currentThumbnaile.name}">
                            <img :src="`https://via.placeholder.com/${item.width}x${item.height}?text=${item.height}x${item.width}`">
                            <span>
                                {{item.name }} <br>
                                Width: {{item.width }}<br>
                                Height: {{item.height }}
                            </span>
                        </div>
                           <!-- <div class="col-6" v-for="item in itemSelected.thumbnails" :key="item.name" @click="checkThumbnail(item)">
                                <img :src="item">
                           </div> -->
                   </div>

                    <!-- <div>
                         <img v-if="imgPreview" :src="imgPreview" alt="" class="mw-100" >
                    </div> -->

                    <div class="d-flex justify-content-center action--preview--media">
                        <button class="button is-rounded is-light mr-2" type="button"
                            @click="modalCropImage = false">Cancel</button>
                        <button class="button is-primary is-rounded"
                            type="submit"
                            @click="cropImage()"
                            :class="{'is-loading': isLoading}">Save</button>
                    </div>
               </div>
          </div>

     </b-modal>
</template>


<script>
 // Crop Image
import { VueCropper }  from 'vue-cropper'

// Repository Data
import {
    RepositoryFactory
} from '../../repositories/RepositoryFactory'
const mediaRepository = RepositoryFactory.get('media')

export default {
     props:['itemSelected'],
     data(){
          return{
               modalCropImage: false,
               imgPreview: '',
               thumbnails: {},
               currentThumbnaile: {},
               isLoading: false
          }
     },
     components:{
          VueCropper
     },
     created(){
         this.getMediaThumbnails()
     },
     methods:{
          openModalCrop(){
               this.modalCropImage = true
          },
          cropImage(){
               this.$refs.cropper.getCropData((data) => {
                    this.imgPreview = data
                    this.saveImgCrop(data)
               })

          },
          rotateRight(){
               this.$refs.cropper.rotateRight()
          },
          rotateLeft(){
               this.$refs.cropper.rotateLeft()
          },
          clearCrop(){
               this.$refs.cropper.clearCrop()
          },
          zoomIn(){
               this.$refs.cropper.changeScale(2)
          },
          zoomOut(){
               this.$refs.cropper.changeScale(-2)
          },

        //  Get Media Thumbnails
        async getMediaThumbnails() {
            const thumbnails = await mediaRepository.getMediaThumbnails()
            this.thumbnails = thumbnails
            this.currentThumbnaile = thumbnails[0]
        },

        async setMediaThumbnails(id, data) {
            this.isLoading = true
            const item = await mediaRepository.setMediaThumbnails(id, data)
            if (item.success) {
                this.successMessage(item.message)
            } else {
                this.errorMessage(item.message)
            }
            this.isLoading = false
        },

        checkThumbnail(item){
            this.currentThumbnaile= item
        },

        saveImgCrop(imgSrc){
            let data = {}
            data.id = this.itemSelected.id
            data.size = this.currentThumbnaile.name
            data.data = imgSrc
            this.setMediaThumbnails(this.itemSelected.id, data)
        },

        successMessage(textMessage) {
            this.$snackbar.open({
                message: textMessage,
                type: 'is-success',
                position: 'is-bottom-right',
                actionText: 'OK',
                queue: false,
                duration: 10000,
                indefinite: false,
            })
        },

        aleartMessage(textMessage) {
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

           // this.$refs.cropper.getCropData((data) => {
            //     console.log(data)
            //     })

            // this.$refs.cropper.getCropBlob((data) => {
            // // do something
            // console.log(data)
            // })

     }
}
</script>
