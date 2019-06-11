<template>
    <div class="card--block">
        <div class="card--content">

            <div class="row align-items-center">
                <div class="col-12">
                    <b-field class="field-group">
                        <b-input type="text" size="is-medium" rounded placeholder="Title" />
                    </b-field>
                </div>
                <div class="col-12">
                    <b-field class="field-group">
                        <b-input type="textarea" rows="2" rounded placeholder="Excerpt" />
                    </b-field>
                </div>

                <div class="col-12">
                    <b-field class="field-group">
                        <div>
                            <!-- Main Photo Image -->
                            <template v-if="mainArticlePhoto">
                                <b-field class="field-group img--preview" v-if="mainArticlePhoto.thumbnails">
                                    <img :src="mainArticlePhoto.thumbnails.large" alt="">
                                </b-field>
                            </template>
                            <div class="file--upload" @click="openModalMedia('mainArticlePhoto')">
                                {{mainArticlePhoto.image? 'Replace Main Photo' : ' Select Main Photo'}}
                            </div>
                        </div>
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
        data() {
            return {
                title: '',
            };
        },
        methods: {
            openModalMedia(type) {
                this.$store.commit('openMediaImageFromPosts', type)
            }
        },
        computed: {
            ...mapState({
                mainArticlePhoto: state => state.media.mainArticlePhoto,
            })
        },
    }
</script>

