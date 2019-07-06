<template>
    <div class="posts">
        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Events
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>
                    <div class="page--title--action ml-auto">
                        <button class="button is-primary"
                        :class="{'is-loading': isLoading}"
                        @click="submitForm">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <form @submit.prevent="submitForm()">
                <div class="row">
                    <div class="col-12 col-lg-8">
                        <div class="post--content">
                            <!-- Main Field Post -->
                            <main-field-post @setDataFromChild="setDataFromMainField" :post="this.post" />

                            <!-- Main Button Save On Desktop Screen -->
                            <div class="text-center button--save--form d-none d-lg-block">
                                <button class="button is-primary" :class="{'is-loading': isLoading}"
                                    type="submit">Save Changes</button>
                            </div>
                        </div>

                    </div>

                    <!-- Post Info -->
                    <post-info @setDataFromChild="setDataFromPostInfo" :post="this.post" />

                    <!-- Main Button Save On Mobile Screen -->
                    <div class="text-center button--save--form d-block d-lg-none w-100">
                        <button class="button is-primary" :class="{'is-loading': isLoading}"
                            type="submit">Save
                            Changes</button>
                    </div>

                </div>
            </form>
        </div>
    </div>
</template>


<script>
    // Post Information
    import PostInfo from '../../components/events/PostInfo'
    // Main Field Post
    import MainFieldPost from '../../components/events/MainFieldPost'
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const postsRepository = RepositoryFactory.get('events')

    export default {
        name: 'postForm',
        data() {
            return {
                breadcrumb: [{
                    link: '/events',
                    label: 'events'
                }, {
                    link: '',
                    label: 'add & update  event'
                }],
                postInfo: {},
                postMainField: {},
                postMainFieldData: {},
                allCards: [],
                cardContent: [],
                isLoading: false,
                post: {},
            };
        },
        components: {
            PostInfo,
            MainFieldPost
        },
        created() {
            if (this.$route.params.id) {
                this.getEvent(this.$route.params.id)
            }
        },
        watch: {
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
                // Set Data
                let data = {}
                data.title = this.postMainField.title
                data.excerpt = this.postMainField.excerpt
                if (this.postMainField.media) {
                    data.media = this.postMainField.media
                }
                data.content = this.postMainField.content
                data.status = this.postInfo.status
                data.tags = this.postInfo.tags
                data.categories = this.postInfo.categories
                data.published_at = this.postInfo.published_at
                data.scheduled_at = this.postInfo.eventDate
                data.price = this.postInfo.price
                data.address = this.postInfo.address
                data.map = this.postInfo.map
                data.type = this.postInfo.type

                if(data.type === 'free'){
                   data.price = ''
                }
                this.isLoading = true
                if (this.$route.params.id) {
                    this.updateEvent(this.$route.params.id, data)
                } else {
                    this.newEvent(data)
                }
            },
            // Add New Post
            async newEvent(data) {
                const post = await postsRepository.newEvent(data)
                if (post.success) {
                    this.successMessage(post.message)
                    this.$router.push('/eventForm/' + post.data)
                } else {
                    this.errorMessage(post[0])
                }
                this.isLoading = false
            },
            // Get Post Data
            async getEvent(id) {
                const post = await postsRepository.getEvent(id)
                this.post = post
            },
            // Update Post
            async updateEvent(id, data) {
                const post = await postsRepository.updateEvent(id, data)
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
    }
</script>
