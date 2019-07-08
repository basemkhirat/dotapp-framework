<template>
    <div class="authors">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Authors
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>
                    <div class="page--title--action ml-auto"
                        v-if="this.$route.params.id && isInUserPermissions('author.manage')">
                        <button @click="addNewAuthor()" class="button is-primary ">Add New Author</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card--block">
                <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-md-10 col-lg-8">
                            <b-field class="field-group">
                                <div class="text-center">
                                    <div class="user--photo field-group">
                                        <img :src="photo" v-if="photo" class="avatar-l" alt="">
                                        <img src="./../../assets/images/img-placeholder.png" v-else class="avatar-l"
                                            alt="">
                                    </div>
                                    <a class="button is-dark m-2 is-small" @click="openModalMedia('image')">
                                        Change Photo</a>
                                </div>
                            </b-field>
                            <b-field class="field-group">
                                <b-input type="text" placeholder="Author Name" v-model="name" />
                            </b-field>
                            <b-field class="field-group">
                                <b-input type="textarea" rows="4" placeholder="Description"
                                    v-model="description" />
                            </b-field>
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{this.$route.params.id ? 'Save Changes' : 'Add Author'}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'

    const authorsRepository = RepositoryFactory.get('authors')

    import {
        mapState
    } from 'vuex';

    export default {
        name: 'authorForm',
        data() {
            return {
                name: '',
                description: '',
                isLoading: false,
                photo: '',
                breadcrumb: [{
                    link: '/authors',
                    label: 'authors'
                }, {
                    link: '',
                    label: 'add & update author'
                }]
            };
        },

        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.getAuthor(this.$route.params.id)
                } else {
                    this.resetfuild()
                }
            },
        },
        created() {
            if (this.$route.params.id) {
                this.getAuthor(this.$route.params.id)
            }
        },
        computed: {
            ...mapState({
                imageSelected: state => state.media.imageSelected,
            })
        },
        watch: {
            imageSelected() {
                if (this.imageSelected.thumbnails) {
                    this.photo = this.imageSelected.thumbnails.medium
                }
            }
        },

        methods: {

            resetfuild() {
                this.name = ''
                this.description = ''
                this.photo = ''
            },
            // Add New Author Button
            addNewAuthor() {
                this.resetfuild()
                this.$router.push({
                    path: '/authorForm',
                })
            },

            submitForm() {
                this.isLoading = false
                let data = {}
                data.name = this.name
                if (this.description) {
                    data.description = this.description
                }
                if (this.imageSelected) {
                    data.image = this.imageSelected.id
                }

                this.isLoading = true
                if (this.$route.params.id) {
                    this.updateAuthor(this.$route.params.id, data)
                } else {
                    this.newAuthor(data)
                }
            },

            async newAuthor(data) {
                const author = await authorsRepository.newAuthor(data)
                if (author.success) {
                    this.successMessage(author.message)
                    this.$router.push('/authorForm/' + author.data)
                } else {
                    this.errorMessage(author[0])
                }
                this.isLoading = false
            },

            async getAuthor(data) {
                const author = await authorsRepository.getAuthor(data)
                this.name = author.name
                this.description = author.description
                if (author.image) {
                    this.photo = author.image.thumbnails.medium
                }

            },
            async updateAuthor(id, data) {
                const author = await authorsRepository.updateAuthor(id, data)
                if (author.success) {
                    this.successMessage(author.message)
                } else {
                    this.errorMessage(author[0])
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

            openModalMedia(type) {
                this.$store.commit('openMediaImage', type)
            }



        }
    }
</script>
