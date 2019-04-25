<template>
     <div class="upload--files">
          <button class="button is-primary is-rounded" @click="uploadFiles">Upload Files</button>

          <input type="file" multiple hidden ref="inputFiles" @input="handelFiles($event)">

          <!-- Modal File -->
          <b-modal :has-modal-card="false" :active.sync="isCardModalActive" :width="1240" scroll="keep" class="modal--custom modal--lg">
            <div class="card">
                <div class="card-content">
                     <div v-if="files.length">
                          <transition-group tag="div" class="row" name="slide-left">
                               <div class="col-3" v-for="(file, index) in files" :key="index">
                                   <img :src="file" alt="Image">
                              </div>
                          </transition-group>
                     </div>
                    
                </div>
            </div>
        </b-modal>

     </div>
</template>

<script>
export default {
     data(){
          return{
               files: [],
               isCardModalActive: false
          }
     },
     methods:{
          uploadFiles(){
               this.$refs.inputFiles.click()
          },
          handelFiles(event) {
               const files = event.target.files;
               this.isCardModalActive = true
                var vm = this;
                Array.from(files).forEach(file => {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        vm.files.push(reader.result);
                    };
                });
                console.log(this.files)
               //  this.isCardModalActive = true
          },          
     }
}
</script>
