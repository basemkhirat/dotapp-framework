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

        <form @submit.prevent="submitForm()">
            <div class="row">
                <div class="col-12 col-lg-8">

                    <!-- Main Field Post -->
                    <main-field-post @setDataFromChild="setDataFromMainField"/>

                    <!-- Content Editor -->
                    <content-editor @setDataFromChild="setDataFromCardsContent"/>

                    <!-- Main Button Save -->
                    <div class="text-center button--save--form">
                        <button class="button is-primary is-rounded"
                        :class="{'is-loading': isLoading}"
                        type="submit">Save Changes</button>
                    </div>

                </div>

                <!-- Post Info -->
                <post-info @setDataFromChild="setDataFromPostInfo" />
            </div>
        </form>
    </div>
</template>


<script>
    // Post Information
    import PostInfo from '../../components/posts/PostInfo'
    // Main Field Post
    import MainFieldPost from '../../components/posts/MainFieldPost'
    // Content Editor
    import ContentEditor from '../../components/posts/editor/ContentEditor'

    // Repository Data
    import { RepositoryFactory } from '../../repositories/RepositoryFactory'
    const postsRepository = RepositoryFactory.get('posts')

    export default {
        name: 'postForm',
        data() {
            return {
                breadcrumb: [{
                    link: '/posts',
                    label: 'posts'
                }, {
                    link: '',
                    label: 'add & update post'
                }],

                postInfo: {},
                postMainField: {},
                postMainFieldData: {},
                allCards: [],
                cardContent: [],
                isLoading: false,

            };
        },
        components: {
            PostInfo,
            ContentEditor,
            MainFieldPost
        },
        created(){
            if (this.$route.params.id) {
                this.getPost(this.$route.params.id)
            }
        },

        methods: {
            // Set Data From Post Info Components
            setDataFromPostInfo(data) {
                this.postInfo = data
            },
            // Set Data From Post Info Components
            setDataFromMainField(data) {
                this.postMainField = data
            },
            // Set Data From Post Info Components
            setDataFromCardsContent(data) {
                this.allCards = data
            },
            // Submit Form
            submitForm() {
                this.isLoading = false

                let postCardContent = JSON.parse(JSON.stringify(this.allCards))
                if(postCardContent) {
                    for (let key in postCardContent) {
                        if(postCardContent[key].type === 'image') {
                            let valueImg = postCardContent[key].image
                            if(valueImg.id) {
                                postCardContent[key].image = valueImg.id
                            }
                        }
                        if(postCardContent[key].type === 'video') {
                            let valueVideo = postCardContent[key].video
                            if(valueVideo.id) {
                                postCardContent[key].video = valueVideo.id
                            }
                        }
                        if(postCardContent[key].type === 'gallery') {
                            let valueGallery = postCardContent[key].gallery

                            postCardContent[key].gallery = []
                            valueGallery.map(item => {
                                postCardContent[key].gallery.push(item.id)
                            })
                        }
                    }
                }

                // Set Data
                let data = {}
                data.title = this.postMainField.title
                data.excerpt = this.postMainField.excerpt
                data.media = this.postMainField.media
                data.status = this.postInfo.status
                data.content = postCardContent

                if (data.title) {
                    this.isLoading = true
                    if(this.$route.params.id){
                        //  this.updatePost(this.$route.params.id, data)
                    } else {
                         this.newPost(data)
                    }
                }
            },
            // Add New Post
            async newPost(data) {
                const post = await postsRepository.newPost(data)
                if (post.success) {
                    this.successMessage(post.message)
                    // this.$router.push('/postForm/' + post.data)
                } else {
                    this.errorMessage(post[0])
                }
                this.isLoading = false
            },
            // Get Post Data
            async getPost(id) {
                const post = await postsRepository.getPost(id)
                this.postMainFieldData.title = post.title
                this.postMainFieldData.media = post.media
                this.postMainFieldData.excerpt = post.excerpt
                console.log(post)
            },
            // Update Post
            async updatePost(id, data) {
                const post = await postsRepository.updatePost(id, data)
                if (post.success) {
                    this.successMessage(post.message)
                } else {
                    this.errorMessage(post[0])
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
        },
        computed: {

        },
    }
</script>
