<template>
     <b-modal :canCancel="false" :width="580" :active.sync="uploadFileFromParent" scroll="keep" class="modal--custom">
          <div class="modal--content">
               <h3>Upload</h3>
               <section class="modal-card-body p-5">
                    <b-input 
                    icon-pack="fas"
                    icon="link"
                    rounded 
                    placeholder="URL" type="url"></b-input>
                    <div class="text-gray py-4 text-center">
                         Or
                    </div>
                    <div class="text-center">
                         <button class="button is-rounded is-dark" @click="uploadFiles">
                              Select files <i class="fas fa-cloud-upload-alt ml-2"></i>
                         </button>
                         <input type="file" multiple hidden ref="inputFiles" @input="handelFiles($event)">
                    </div>
               </section>
               
               <hr class="mt-0">
               <div class="d-flex justify-content-center pb-4">
                    <button class="button is-rounded is-light mr-2" @click="closeModalUploadFile">Cancel</button>
                    <button class="button is-primary is-rounded">Done</button>
               </div>    
          </div>
     </b-modal>
</template>

<script>
     
     export default {
          props:['uploadFileFromParent'],
          data(){
               return{
                     files: [],
               }
          },
          methods:{
               closeModalUploadFile(){
                    this.$emit('changeModalUploadFiles')
               },
               uploadFiles(){
                    this.$refs.inputFiles.click()
               },
               handelFiles(event) {
                    const files = event.target.files;
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
