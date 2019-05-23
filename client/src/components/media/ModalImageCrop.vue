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
                                   :full="true"
                                   :centerBox="true"
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

               <div class="col-12 col-md-4 col-xl-3 bg-white py-5">
                    <button @click="modalCropImage = false" class="button is-dark">cancel</button>
                    <button @click="cropImage()" class="button is-primary">Crop Image</button>

                    <div>
                         <img v-if="imgPreview" :src="imgPreview" alt="" class="w-100" >
                    </div>
               </div>
          </div>
              
     </b-modal>
</template>


<script>
 // Crop Image
import { VueCropper }  from 'vue-cropper' 
export default {
     props:['itemSelected'],
     data(){
          return{
               modalCropImage: false,
               imgPreview: ''
          }
     },
     components:{
          VueCropper
     },
     methods:{
          openModalCrop(){
               this.modalCropImage = true
          },
          cropImage(){
               this.$refs.cropper.getCropData((data) => {
                    console.log(data)  
                    this.imgPreview = data
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