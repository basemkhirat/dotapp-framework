<template>
    <b-modal :canCancel="false" :width="580" :active.sync="uploadFileFromParent" scroll="keep" class="modal--custom">
        <div class="modal--content">
               <form @submit.prevent="submitForm">
                    <h3>Upload</h3>
                    <section class="modal-card-body p-4">
                         <b-input icon-pack="fas" icon="link" :disabled="files.length >= 1" rounded placeholder="URL" type="url" v-model="itemLink"></b-input>
                         <div class="text-gray py-4 text-center">
                              Or
                         </div>
                         <div class="text-center">
                              <button class="button is-rounded is-dark" @click="uploadFiles" :disabled="itemLink.length >=1">
                                   <span v-if="files.length">{{ files.length }} File Selected</span>
                                   <span v-else>Select files <i class="fas fa-cloud-upload-alt ml-2"></i></span>
                              </button>
                              <input type="file" multiple hidden ref="inputFiles" @input="handelFiles($event)">
                         </div>
                    </section>

                    <hr class="mt-0">
                    <div class="d-flex justify-content-center ">
                         <button class="button is-rounded is-light mr-2" type="button" @click="closeModalUploadFile({newItem: false})">Cancel</button>
                         <button class="button is-primary is-rounded" type="submit" :class="{'is-loading': isLoading}">Add</button>
                    </div>
               </form>
        </div>
    </b-modal>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const mediaRepository = RepositoryFactory.get('media')

    export default {
        props: ['uploadFileFromParent'],
        data() {
            return {
                files: [],
                isLoading: false,
                filesName: [],
                itemLink: '',
            }
        },
        methods: {
            closeModalUploadFile(data) {
                this.$emit('changeModalUploadFiles', data)
                this.resetfuild()
            },
            uploadFiles() {
                this.$refs.inputFiles.click()
            },
            handelFiles(event) {
                const files = event.target.files;
                var vm = this;
                Array.from(files).forEach(file => {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    this.filesName.push(file.name)

                    reader.onload = function () {
                        vm.files.push(reader.result);
                    };
                });

            },
            resetfuild() {
                 this.itemLink = '',
                 this.files = []
            },
            submitForm() {
                this.isLoading = false
                let data = {}
                if(this.itemLink){
                     data.payload  = this.itemLink 
                      this.isLoading = true
                      this.newMediaItem(data)
                } else if (this.files.length){
                     this.files.map(item => {
                          this.isLoading = true
                         data.payload = item
                         this.newMediaItem(data)
                     })
                }
               
            },


            async newMediaItem(data) {
                const items = await mediaRepository.newMediaItem(data)
                if (items.success) {
                    this.successMessage(items.message)
                    this.closeModalUploadFile({newItem: true})
                     this.isLoading = false
                } else {
                     this.isLoading = false
                    // items.data.map(item => {
                    //     this.errorMessage(item)
                    // })
                    this.errorMessage(items.message)

                }
                this.isLoading = false
            },

            errorMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-danger',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
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

        }
    }
</script>