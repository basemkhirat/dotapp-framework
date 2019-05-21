<template>
    <div>
        <div class="row" v-if="data">
            <div class="col-6 col-md-4 col-lg-3 col-xl-2" v-for="item in data" :key="item.id">
                <div class="media--item" v-if="item.thumbnails">
                    <div @click="quickEdit(item)" class="h-100">
                        <img 
                        :class="item.thumbnails.medium? '' : 'imgCover'" 
                        :src="item.thumbnails.medium? item.thumbnails.medium : item.thumbnails.default" :alt="itemSelected.title" >
                    </div>
                    
                    <div class="media--action d-flex justify-content-between"
                        :class="{'showItemAction': checkItemsMedia.length}">
                        <a class="media--action--check custom--ckeckbox">
                            <b-checkbox :native-value="item.id" v-model="checkItemsMedia"></b-checkbox>
                        </a>
                        <a class="media--action--edit" @click="quickEdit(item)">
                            Edit
                            <i class="fa fa-pen ml-1"></i>
                        </a>
                    </div>
                </div>
            </div>
            
        </div>

        <!-- Modal Quick Edit -->
        <b-modal :canCancel="false" :width="640" :active.sync="modalQuickEdit" scroll="keep"
            class="modal--custom modal--edit--images">
            <div class="modal--content">
                <form @submit.prevent="submitForm()">
                    <h3 class="modal-card-title">Edit Image</h3>
                    <section class="modal-card-body" v-if="itemSelected">

                        <!-- Audio -->
                        <template v-if="itemSelected.type === 'audio'">
                            <div v-if="itemSelected.provider === 'soundcloud'">
                                <iframe width="100%" height="166" scrolling="no" 
                                frameborder="no" 
                                :src="itemSelected.data.embed">
                                </iframe>
                            </div>
                            <div v-if="itemSelected.provider === 'file'" class="py-4">
                                <vue-plyr>
                                    <audio>
                                        <source :src="itemSelected.url" :type="itemSelected.data.mime"/>
                                    </audio>
                                </vue-plyr>
                            </div>
                        </template>

                        <!-- Video -->
                        <template v-if="itemSelected.type === 'video'">
                            <!-- Video Youtube -->
                            <div v-if="itemSelected.provider === 'youtube'">

                                <vue-plyr>
                                    <div class="plyr__video-embed">
                                         <iframe width="400" 
                                            class="video--iframe"
                                            :src="itemSelected.data.embed" 
                                            frameborder="0" 
                                            allowfullscreen allowtransparency allow="autoplay"></iframe>
                                    </div>
                                </vue-plyr>
                            </div>
                            <!-- Video File -->
                            <div v-if="itemSelected.provider === 'file'">
                                <vue-plyr>
                                    <video poster="poster.png" :src="itemSelected.url">
                                        <source :src="itemSelected.url" :type="itemSelected.data.mime" size="720">
                                    </video>
                                </vue-plyr>
                            </div>
                        </template>

                        <!-- image -->
                        <template v-if="itemSelected.type === 'image'">
                            <template v-if="itemSelected.thumbnails">
                                <img :src="itemSelected.thumbnails.medium" :alt="itemSelected.title">
                            </template>
                        </template>
                        
                        <div class="content--edit--image mt-3">
                            <b-field>
                                <b-input rounded v-model="itemSelected.title" placeholder="Title" type="text"></b-input>
                            </b-field>
                            <b-field>
                                <b-input placeholder="Description" v-model="itemSelected.description" rows="3"
                                    type="textarea"></b-input>
                            </b-field>

                            <div class="field has-addons justify-content-center">
                                <p class="control flex-fill">
                                    <a class="button is-rounded w-100" v-clipboard:copy="itemSelected.url"
                                        v-clipboard:success="onCopy" v-clipboard:error="onError">
                                        <span class="icon is-small">
                                            <i class="fas fa-link"></i>
                                        </span>
                                        <span>Copy link</span>
                                    </a>
                                </p>
                                <!-- <p class="control flex-fill">
                                             <a class="button w-100">
                                                  <span class="icon is-small">
                                                       <i class="fas fa-crop"></i>
                                                  </span>
                                                  <span>Crop</span>
                                             </a>
                                        </p> -->
                                <p class="control flex-fill">
                                    <a class="button w-100" target="_blank" :href="itemSelected.url">
                                        <span class="icon is-small">
                                            <i class="fas fa-external-link-square-alt"></i>
                                        </span>
                                        <span>External</span>
                                    </a>
                                </p>
                                <p class="control flex-fill">
                                    <a class="button is-rounded w-100" @click="confirmCustomDelete()">
                                        <span class="icon is-small">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                        <span>Delete</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>

                    <hr class="mt-0">
                    <div class="d-flex justify-content-center">
                        <button class="button is-rounded is-light mr-2" type="button"
                            @click="modalQuickEdit = false">Cancel</button>
                        <button class="button is-primary is-rounded" type="submit"
                            :class="{'is-loading': isLoading}">Save</button>
                    </div>
                </form>
            </div>
        </b-modal>
    </div>

</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const mediaRepository = RepositoryFactory.get('media')

// Video Media Player
import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css' // only if your build system can import css, otherwise import it wherever you would import your css.
Vue.use(VuePlyr)

    export default {
        props: ['data'],
        data() {
            return {
                checkItemsMedia: [],
                modalQuickEdit: false,
                itemSelected: {},
                isLoading: false,
            }
        },
        watch: {
            checkItemsMedia() {
                this.$emit('checkItemsMedia', this.checkItemsMedia)
                console.log(this.data)
            }
        },
        
        methods: {
            quickEdit(item) {
                this.modalQuickEdit = true
                this.itemSelected = item
                console.log(item)
            },

            // Copy Link Function
            onCopy: function () {
                // this.$snackbar.open(`copy to clipboard`)
                this.$snackbar.open({
                    message: 'copy to clipboard',
                    type: 'is-success',
                })
            },
            onError: function () {
                this.$snackbar.open({
                    message: 'Failed to copy Link',
                    type: 'is-danger',
                })
            },
            submitForm() {
                this.isLoading = false
                let data = {}
                data.title = this.itemSelected.title
                data.description = this.itemSelected.description
                if (this.itemSelected.description || this.itemSelected.title) {
                    this.isLoading = true
                    this.updateMedia(this.itemSelected.id, data)
                }
            },

            async updateMedia(id, data) {
                const item = await mediaRepository.updateMedia(id, data)
                if (item.success) {
                    this.successMessage(item.message)
                } else {
                    item.data.map(item => {
                        this.errorMessage(item)
                    })
                }
                this.isLoading = false
            },

            async deleteItem(){
                const item = await mediaRepository.deleteItem(this.itemSelected.id)
                this.aleartMessage(item.message)
                this.$emit('fetchAllItems')
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

            confirmCustomDelete() {
                this.$dialog.confirm({
                    title: 'Deleting Item',
                    message: 'Are you sure you want to <b>delete</b> this item? This action cannot be undone.',
                    confirmText: 'Delete Item',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteItem()
                })
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

           

        }
    }
</script>