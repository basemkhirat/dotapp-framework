<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Categories
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

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
                                <b-input type="text" placeholder="Category Name" v-model="name" />
                            </b-field>
                            <b-field class="field-group">
                                <b-input type="textarea" rows="4" placeholder="Description"
                                    v-model="description" />
                            </b-field>
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{this.$route.params.id ? 'Save Changes' : 'Add Category'}}</button>
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

    const categoriesRepository = RepositoryFactory.get('categories')

    import {
        mapState
    } from 'vuex';

    export default {
        name: 'categoryForm',
        data() {
            return {
                name: '',
                description: '',
                isLoading: false,
                photo: '',
                breadcrumb: [{
                    link: '/categories',
                    label: 'categories'
                }, {
                    link: '',
                    label: 'add & update category'
                }]
            };
        },

        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.getCategory(this.$route.params.id)
                } else {
                    this.resetfuild()
                }
            },
        },
        created() {
            if (this.$route.params.id) {
                this.getCategory(this.$route.params.id)
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
            // Add New Category Button
            addNewCategory() {
                this.resetfuild()
                this.$router.push({
                    path: '/categoryForm',
                    query: {
                        parentId: this.$route.query.parentId
                    }
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
                if (this.$route.query.parentId) {
                    data.parent = this.$route.query.parentId
                }

                if (this.name) {
                    this.isLoading = true
                    if (this.$route.params.id) {
                        this.updateCategory(this.$route.params.id, data)
                    } else {
                        this.newCategory(data)
                    }
                }
            },

            async newCategory(data) {
                const category = await categoriesRepository.newCategory(data)
                if (category.success) {
                    this.successMessage(category.message)
                    this.$router.push('/categoryForm/' + category.data)
                } else {
                    this.errorMessage(category[0])
                }
                this.isLoading = false
            },

            async getCategory(data) {
                const category = await categoriesRepository.getCategory(data)
                this.name = category.name
                this.description = category.description
                if (category.image) {
                    this.photo = category.image.thumbnails.medium
                }
                if (this.$route.query.parentId) {
                    data.parent = this.$route.query.parentId
                }
                // this.$router.push({query: { parentId: category.parent}})

            },
            async updateCategory(id, data) {
                const category = await categoriesRepository.updateCategory(id, data)
                if (category.success) {
                    this.successMessage(category.message)
                } else {
                    this.errorMessage(category[0])
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
