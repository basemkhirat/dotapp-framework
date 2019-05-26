<template>
     <div class="groups">
          <div class="page--title">
               <h1 class="title--text">Groups</h1>
               <div class="page--title--action ml-auto" v-if="this.$route.params.id">
                    <router-link to="/categoryForm" class="button is-primary is-rounded">Add New Category</router-link>
               </div>
          </div>
          <div class="card--block">
               <div class="card--hreader">
                    <div class="card--header--title">
                          {{this.$route.params.id ? 'Update Category' : 'Add New Category'}}
                    </div>
               </div>
               <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                         <div class="col-12 col-md-10 col-lg-8">
                              <b-field class="field-group ">
                                   <b-input type="text" rounded placeholder="Category Name" v-model="name" />
                              </b-field>
                              <b-field class="field-group">
                                   <b-input type="textarea" rounded rows="4" placeholder="Description" v-model="description" />
                              </b-field>
                         </div>

                         <div class="col-12 text-center button--save--form mt-0">
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
    export default {
        name: 'categoryForm',
        data() {
            return {
                name: '',
                description: '',
                isLoading: false,
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
        components:{

        },

        methods: {

             resetfuild(){
                this.name = ''
                this.description = ''
             },

             submitForm() {
                this.isLoading = false
                let data = {}
                data.name = this.name
                if(this.description){
                    data.description = this.description
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
                const group = await categoriesRepository.newCategory(data)
                if (group.success) {
                    this.successMessage(group.message)
                    this.$router.push('/categoryForm/' + group.data)
                } else if(group.status === 500) {
                    this.errorMessage(group.data)
                } else {
                    group.data.map(item => {
                        this.errorMessage(item)
                    })
                }
                this.isLoading = false
            },

            async getCategory(data) {
                const group = await categoriesRepository.getCategory(data)
                this.name = group.name
                this.description = group.description

            },
            async updateCategory(id, data) {
                const group = await categoriesRepository.updateCategory(id, data)
                if (group.success) {
                    this.successMessage(group.message)
                } else {
                    group.data.map(item => {
                        this.errorMessage(item)
                    })
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





        }
    }
</script>
