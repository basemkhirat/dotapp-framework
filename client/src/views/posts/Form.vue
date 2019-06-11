<template>
    <div class="posts">

        <div class="page--title">
            <h1 class="title--text">
                Articles
            </h1>

            <div class="page--title--action ml-auto">
                <button class="button is-primary is-rounded">Save Changes</button>
            </div>

        </div>

        <!-- Breadcrumb -->
        <breadcrumb :links="breadcrumb" />


        <div class="row">
            <div class="col-12 col-lg-8">
                <form class="">
                    <!-- Main Field Post -->
                    <main-field-post />

                    <!-- Content Editor -->
                    <content-editor />

                    <!-- Main Button Save -->
                    <div class="text-center button--save--form">
                        <button class="button is-primary is-rounded">Save Changes</button>
                    </div>
                </form>


            </div>

            <!-- Post Info -->
            <post-info />
        </div>


    </div>
</template>



<script>
    // Post Information
    import PostInfo from '../../components/posts/PostInfo'
    // Main Field Post
    import MainFieldPost from '../../components/posts/MainFieldPost'
    // Content Editor
    import ContentEditor from '../../components/posts/editor/ContentEditor'

    export default {
        name: 'articleForm',
        data() {
            return {
                breadcrumb: [{
                    link: '/posts',
                    label: 'posts'
                }, {
                    link: '',
                    label: 'add & update post'
                }],
            };
        },
        components: {
            PostInfo,
            ContentEditor,
            MainFieldPost
        },
        methods: {

        },
        computed: {

        },
    }
</script>
