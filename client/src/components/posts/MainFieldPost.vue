<template>
    <div class="card--block">
        <div class="card--content">
            <div class="row align-items-center">
                <div class="col-12">
                    <b-field class="field-group">
                        <div>
                            <!-- Main Image OR Video -->
                            <template v-if="mainArticlePhoto">
                                <b-field class="field-group img--preview img--preview--mainimg" v-if="mainArticlePhoto.thumbnails">
                                    <img :src="mainArticlePhoto.thumbnails.max">
                                </b-field>
                            </template>
                            <div class="file--upload" @click="openModalMedia('mainArticlePhoto')">
                                {{mainArticlePhoto.image? 'Replace' : ' Select Main Image Or Video'}}
                            </div>
                        </div>
                    </b-field>
                </div>

                <div class="col-12">
                    <b-field class="field-group">
                        <b-input required type="text" size="is-medium" rounded placeholder="Title" v-model="mainFieldPost.title"/>
                    </b-field>
                </div>
                <div class="col-12">
                    <b-field class="field-group">
                        <b-input type="textarea" required rows="2" rounded placeholder="Excerpt" v-model="mainFieldPost.excerpt"/>
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
                this.mainFieldPost.media = this.mainArticlePhoto.id
            },
            post(){
                if(this.post){
                    this.mainFieldPost.title = this.post.title
                    this.mainFieldPost.excerpt = this.post.excerpt
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

