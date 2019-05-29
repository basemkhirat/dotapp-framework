<template>
     <div class="tags--page">
          <div class="page--title">
               <h1 class="title--text">Groups</h1>
               <div class="page--title--action ml-auto" v-if="this.$route.params.id">
                    <router-link to="/tagForm" class="button is-primary is-rounded">Add New Tag</router-link>
               </div>
          </div>
          <div class="card--block">
               <div class="card--hreader">
                    <div class="card--header--title">
                          {{this.$route.params.id ? 'Update Tag' : 'Add New Tag'}}
                    </div>
               </div>
               <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                         <div class="col-12 col-md-10 col-lg-8">
                              <b-field class="field-group ">
                                   <b-input type="text" rounded placeholder="Tag Name" v-model="name" />
                              </b-field>
                         </div>

                         <div class="col-12 text-center button--save--form ">
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
const tagsRepository = RepositoryFactory.get('tags')
    export default {
        name: 'TagForm',
        data() {
            return {
                name: '',
                isLoading: false,
            };
        },

        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.getTag(this.$route.params.id)
                } else {
                     this.resetfuild()
                }
            },
        },
        created() {
            if (this.$route.params.id) {
                this.getTag(this.$route.params.id)
            }
        },
        components:{

        },

        methods: {

             resetfuild(){
                this.name = ''
             },

             submitForm() {
                this.isLoading = false
                let data = {}
                data.name = this.name

                if (this.name) {
                    this.isLoading = true
                    if(this.$route.params.id){
                         this.updateTag(this.$route.params.id, data)
                    } else {
                         this.newTag(data)
                    }
                }
            },

            async newTag(data) {
                const group = await tagsRepository.newTag(data)
                if (group.success) {
                    this.successMessage(group.message)
                    this.$router.push('/tagForm/' + group.data)
                } else if(group.status === 500) {
                    this.errorMessage(group.data)
                } else {
                    group.data.map(item => {
                        this.errorMessage(item)
                    })
                }
                this.isLoading = false
            },

            async getTag(data) {
                const tag = await tagsRepository.getTag(data)
                this.name = tag.name

            },
            async updateTag(id, data) {
                const tag = await tagsRepository.updateTag(id, data)
                if (tag.success) {
                    this.successMessage(tag.message)
                } else {
                    tag.data.map(item => {
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
