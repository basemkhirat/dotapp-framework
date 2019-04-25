<template>
     <div class="gallery section">

          <div class="gallery--header">
               <div class="row">
                    <div class="col-6">

                    </div>
                    <div class="col-6 text-right">
                         <upload-files />
                    </div>
               </div>
               
          </div>

          <transition name="slide-left">
               <router-view />
          </transition>

     </div>
</template>

<script>
import UploadFiles from './../../components/gallery/UploadFiles'
export default {
     name: 'gallery',
     // data(){
     //      return {

     //      }
     // },
     components:{
          UploadFiles,
     }

}
</script>
