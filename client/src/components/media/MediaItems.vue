<template>
    <div>
        <div class="row" v-if="data">
            <div class="col-6 col-md-4 col-lg-3 col-xl-2" v-for="item in data" :key="item.id">
                <div class="media--item" v-if="item.thumbnails">
                    <div @click="quickEdit(item)" class="h-100">
                        <img :class="item.thumbnails.medium? '' : 'imgCover'"
                            :src="item.thumbnails.medium? item.thumbnails.medium : item.thumbnails.default"
                            :alt="itemSelected.title">
                    </div>

                    <div
                        v-if="previewItemAction || galleryMode"
                        class="media--action d-flex justify-content-between"
                        :class="{'showItemAction': checkItemsMedia.length}">
                        <a class="media--action--check custom--ckeckbox">
                            <b-checkbox :native-value="galleryMode? item : item.id" v-model="checkItemsMedia"></b-checkbox>
                        </a>
                        <!-- <a class="media--action--edit" @click="quickEdit(item)">
                            Edit
                            <i class="fa fa-pen ml-1"></i>
                        </a> -->
                    </div>
                </div>
            </div>

        </div>

        <!-- Modal Quick Edit -->
        <b-modal :canCancel="false" :width="640" :active.sync="modalQuickEdit" scroll="keep"
            class="modal--custom modal--edit--images modal--lg modal--preview--media">
            <div class="modal--content">
                <form @submit.prevent="submitForm()">
                    <div class="row h-100">
                        <div class="col-12 col-md-8 col-xl-9 media--preview--left">
                            <div v-if="itemSelected" class="media--content--preview">

                                <!-- Audio -->
                                <template v-if="itemSelected.type === 'audio'">
                                    <div v-if="itemSelected.provider === 'soundcloud'">
                                        <iframe width="100%" height="166" scrolling="no" frameborder="no"
                                            :src="itemSelected.data.embed">
                                        </iframe>
                                    </div>
                                    <div v-if="itemSelected.provider === 'file'" class="py-4">
                                        <vue-plyr>
                                            <audio>
                                                <source :src="itemSelected.url" :type="itemSelected.data.mime" />
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
                                                <iframe width="80%" class="video--iframe" :src="itemSelected.data.embed"
                                                    frameborder="0" allowfullscreen allowtransparency
                                                    allow="autoplay"></iframe>
                                            </div>
                                        </vue-plyr>
                                    </div>
                                    <!-- Video File -->
                                    <div v-if="itemSelected.provider === 'file'">
                                        <vue-plyr>
                                            <video poster="poster.png" :src="itemSelected.url">
                                                <source :src="itemSelected.url" :type="itemSelected.data.mime"
                                                    size="720">
                                            </video>
                                        </vue-plyr>
                                    </div>
                                </template>

                                <!-- Image -->
                                <template v-if="itemSelected.type === 'image'">
                                    <template v-if="itemSelected.thumbnails">
                                        <img :src="itemSelected.thumbnails.max" :alt="itemSelected.title">
                                    </template>
                                </template>

                                <!-- Document -->
                                <template v-if="itemSelected.type === 'document'">
                                    <div class="document--preview">
                                        <embed :src="itemSelected.url" :type="data.mime">
                                        <!-- <p>This browser does not support this files. Please download the file to view it:
                                            <a :href="itemSelected.url">Download PDF</a>.</p> -->
                                        </embed>
                                    </div>
                                    <!-- <object :data="itemSelected.url" :type="data.mime" width="750px" height="750px"> -->

                                    <!-- </object> -->
                                </template>

                            </div>
                        </div>

                        <div class="col-12 col-md-4 col-xl-3 media--preview--right">

                             <div class="text-left">
                                <h3 class="modal-card-title text-left">Action</h3>
                                <div class="active--media--items">
                                    <a class="button m-1" v-clipboard:copy="itemSelected.url"
                                        v-clipboard:success="onCopy" v-clipboard:error="onError">
                                        <div>
                                            <span class="icon is-small">
                                                <i class="fas fa-link"></i>
                                            </span>
                                        </div>
                                        <span>Copy link</span>
                                    </a>

                                    <a class="button m-1" target="_blank" :href="itemSelected.url">
                                        <div>
                                            <span class="icon is-small">
                                                <i class="fas fa-external-link-square-alt"></i>
                                            </span>
                                        </div>
                                        <span>External</span>
                                    </a>
                                    <a class="button m-1" @click="btnOpenModalCrop()" v-if="itemSelected.type === 'image'">
                                        <div>
                                            <span class="icon is-small">
                                                <i class="fas fa-crop"></i>
                                            </span>
                                        </div>
                                        <span>Crop</span>
                                    </a>

                                    <a class="button m-1" @click="confirmCustomDelete()">
                                        <div>
                                            <span class="icon is-small">
                                                <i class="fas fa-trash"></i>
                                            </span>
                                        </div>
                                        <span>Delete</span>
                                    </a>
                                </div>
                            </div>

                            <hr class="mt-4">

                            <div class="text-left">
                                <h3 class="modal-card-title text-left">Edit Item Details</h3>
                                <div class="createdBy d-flex align-items-center" v-if="itemSelected.user">
                                    <div class="d-flex align-items-center">
                                        <div class="avatar mr-2">
                                            <!-- <img :src="itemSelected.user.photo" v-if="itemSelected.user.photo" :alt="itemSelected.user.first_name"> -->
                                            <img src="./../../assets/images/user/64.png">
                                        </div>
                                        <span class="text-capitalize">
                                            {{itemSelected.user.first_name + ' ' + itemSelected.user.last_name }}</span>
                                    </div>
                                    <div class="ml-auto">
                                        <i class="fas fa-clock mr-2"></i>
                                        {{itemSelected.created }}
                                    </div>
                                </div>
                            </div>

                            <div class="content--edit--image mt-4">
                                <b-field>
                                    <b-input v-model="itemSelected.title" placeholder="Title" type="text">
                                    </b-input>
                                </b-field>
                                <b-field>
                                    <b-input placeholder="Description" v-model="itemSelected.description" rows="5"
                                        type="textarea"></b-input>
                                </b-field>

                                <!-- <div class="field has-addons justify-content-center">
                                    <p class="control flex-fill">
                                        <a class="button w-100" v-clipboard:copy="itemSelected.url"
                                            v-clipboard:success="onCopy" v-clipboard:error="onError">
                                            <span class="icon is-small">
                                                <i class="fas fa-link"></i>
                                            </span>
                                            <span>Copy link</span>
                                        </a>

                                    </p>
                                    <p class="control flex-fill">
                                                <a class="button w-100">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-crop"></i>
                                                    </span>
                                                    <span>Crop</span>
                                                </a>
                                            </p>
                                    <p class="control flex-fill">
                                        <a class="button w-100" target="_blank" :href="itemSelected.url">
                                            <span class="icon is-small">
                                                <i class="fas fa-external-link-square-alt"></i>
                                            </span>
                                            <span>External</span>
                                        </a>
                                    </p>
                                    <p class="control flex-fill">
                                        <a class="button w-100" @click="confirmCustomDelete()">
                                            <span class="icon is-small">
                                                <i class="fas fa-trash"></i>
                                            </span>
                                            <span>Delete</span>
                                        </a>
                                    </p>
                                </div> -->
                                <!-- <hr class="mt-0"> -->

                                <div class="d-flex justify-content-center action--preview--media">
                                    <button class="button is-light mr-2" type="button"
                                        @click="modalQuickEdit = false">Cancel</button>
                                    <button class="button is-primary" type="submit"
                                        :class="{'is-loading': isLoading}">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </b-modal>

        <!-- Modal Img Crop -->
        <modal-image-crop :itemSelected="itemSelected" ref="modalCrop"/>

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

    import ModalImageCrop from './ModalImageCrop'
    import {mapState} from 'vuex'

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
            },

        },
        components:{
            ModalImageCrop,
        },
        computed:{
            ...mapState({
                previewItemAction: state => state.media.previewItemAction,
                galleryMode: state => state.media.galleryMode,
            })
        },
        methods: {
            quickEdit(item) {
                 this.itemSelected = item
                if(!this.previewItemAction){
                    this.confirmCustomSetImage(item)
                } else if(this.galleryMode){
                    return false
                } else {
                    this.modalQuickEdit = true
                }
                this.itemSelected = item
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

            async deleteItem() {
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
            confirmCustomSetImage(item) {
                // this.$dialog.confirm({
                //     title: 'Select Item',
                //     message: 'Are you sure you want to <b>select</b> this item? This action cannot be undone.',
                //     confirmText: 'Select Image',
                //     type: 'is-primary',
                //     icon: 'information-outline',
                //     hasIcon: true,
                //     onConfirm: () => {
                //         this.$store.commit('setItemSelected', item)
                //         this.$store.commit('openMediaImage')
                //     }
                // })
                this.$store.commit('setItemSelected', item)
                this.$store.commit('openMediaImage')
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


            // Croup Image Methods
            btnOpenModalCrop(){
                this.$refs.modalCrop.openModalCrop()
            }

        }
    }
</script>
