<template>
    <div class="card--block">
        <div class="card--content">
            <div class="row align-items-center">
                <div class="col-12">
                    <b-field class="field-group">
                        <div>
                            <!-- Main Image OR Video -->
                            <template v-if="mediaItemPreview.image">
                                <b-field class="field-group img--preview img--preview--mainimg" v-if="mediaItemPreview.thumbnails">
                                    <img :src="mediaItemPreview.thumbnails.max">
                                    <div class="wrap--replace--media" @click="openModalMedia('mainArticlePhoto')">
                                        <div class="btn--replace--media">Replace</div>
                                    </div>
                                    <a class="delete is-large btn--delete--media" @click="mediaItemPreview = ''"></a>
                                </b-field>
                            </template>
                            <div @click="openModalMedia('mainArticlePhoto')" v-else>
                                 <media-placeholder type="image" text="Browse Media" />
                            </div>

                        </div>
                    </b-field>
                </div>

                <div class="col-12">
                    <b-field class="field-group">
                        <b-input type="text" size="is-medium" placeholder="Title" v-model="mainFieldPost.title"/>
                    </b-field>
                </div>
                <div class="col-12">
                    <b-field class="field-group">
                        <b-input type="textarea" rows="2" placeholder="Excerpt" v-model="mainFieldPost.excerpt"/>
                    </b-field>
                </div>

            </div>
        </div>
    </div>

</template>


<script>
    import {
        mapState
    } from 'vuex';

    export default {
        props: ['post'],
        data() {
            return {
                title: '',
                mediaItemPreview: {image: ''},
                mainFieldPost: {
                    title: '',
                    excerpt: '',
                    media: '',
                }
            };
        },
        created(){
            this.resetData()
        },
        watch:{
            mainFieldPost: {
                handler(val){
                    this.sentDataToParent()
                },
                deep: true
            },
            mainArticlePhoto(){
                this.mediaItemPreview = this.mainArticlePhoto
                this.mainFieldPost.media = this.mainArticlePhoto.id
            },
            post(){
                if(this.post){
                    this.mainFieldPost.title = this.post.title
                    this.mainFieldPost.excerpt = this.post.excerpt
                    if(this.post.media){
                        this.mediaItemPreview = this.post.media
                    }
                }
            }
        },
        methods: {
            openModalMedia(type) {
                this.$store.commit('openMediaImageAndVideo', type)
            },
            // Send Data To Parent
            sentDataToParent(type) {
                this.$emit('setDataFromChild', this.mainFieldPost)
            },
            // Reset Data
            resetData(){
                this.$store.commit('resetPostData')
            }
        },
        computed: {
            ...mapState({
                mainArticlePhoto: state => state.media.mainArticlePhoto,
            })
        },
    }
</script>

