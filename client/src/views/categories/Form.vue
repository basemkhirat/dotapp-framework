<template>
     <div class="groups">
          <div class="page--title">
               <h1 class="title--text">Categories</h1>
               <div class="page--title--action ml-auto" v-if="this.$route.params.id && isInUserPermissions('category.create')">
                    <router-link to="/categoryForm" class="button is-primary is-rounded">Add New Category</router-link>
               </div>
          </div>

          <!-- Breadcrumb -->
          <breadcrumb :links="breadcrumb" />

          <div class="card--block">
               <!-- <div class="card--hreader">
                    <div class="card--header--title">
                        {{this.$route.params.id ? 'Update Category' : 'Add New Category'}}
                    </div>
               </div> -->
               <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                         <div class="col-12 col-md-10 col-lg-8">
                            <b-field class="field-group">
                                <div class="text-center">
                                    <div class="user--photo field-group">
                                        <img :src="photo" v-if="photo" class="avatar-l" alt="">
                                        <img src="./../../assets/images/img-placeholder.png" v-else class="avatar-l" alt="">
                                    </div>
                                    <a class="button is-dark is-rounded m-2 is-small" @click="openModalMedia">Change Photo</a>
                                </div>
                            </b-field>
                              <b-field class="field-group">
                                   <b-input type="text" rounded placeholder="Category Name" v-model="name" />
                              </b-field>
                              <b-field class="field-group">
                                   <b-input type="textarea" rounded rows="4" placeholder="Description" v-model="description" />
                              </b-field>
                         </div>

                         <div class="col-12 text-center button--save--form">
                              <button class="button is-primary is-rounded"
                              :class="{'is-loading': isLoading}">{{this.$route.params.id ? 'Save Changes' : 'Add Category'}}</button>
                         </div>
                    </form>
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

      import { mapState } from 'vuex';

    export default {
        name: 'categoryForm',
        data() {
            return {
                name: '',
                description: '',
                isLoading: false,
                photo: '',
                breadcrumb:[{link: '/categories', label:'categories'},{link: '', label:'add & update category'}]
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
        computed:{
            ...mapState({
                imageSelected: state => state.media.imageSelected,
            })
        },
        watch:{
            imageSelected(){
                if(this.imageSelected){
                    this.photo = this.imageSelected.url
                }
            }
        },

        methods: {

             resetfuild(){
                this.name = ''
                this.description = ''
                this.photo = ''
             },

             submitForm() {
                this.isLoading = false
                let data = {}
                data.name = this.name
                if(this.description){
                    data.description = this.description
                }
                if(this.imageSelected){
                    data.image = this.imageSelected.id
                }

                if (this.name) {
                    this.isLoading = true
                    if(this.$route.params.id){
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
                if(category.image){
                     this.photo = category.image.url
                }

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

            openModalMedia(){
                this.$store.commit('openMediaImage')
            }



        }
    }
</script>
