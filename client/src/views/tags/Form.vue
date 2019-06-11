<template>
     <div class="tags--page">
          <div class="page--title">
               <h1 class="title--text">Tags</h1>
               <div class="page--title--action ml-auto" v-if="this.$route.params.id && isInUserPermissions('tag.create')">
                    <router-link to="/tagForm" class="button is-primary is-rounded">Add New Tag</router-link>
               </div>
          </div>

          <!-- Breadcrumb -->
          <breadcrumb :links="breadcrumb" />

          <div class="card--block">
               <!-- <div class="card--hreader">
                    <div class="card--header--title">
                          {{this.$route.params.id ? 'Update Tag' : 'Add New Tag'}}
                    </div>
               </div> -->
               <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                         <div class="col-12 col-md-10 col-lg-8">
                              <b-field class="field-group ">
                                   <b-input type="text" rounded placeholder="Tag Name" v-model="name" />
                              </b-field>
                         </div>

                         <div class="col-12 text-center button--save--form ">
                              <button class="button is-primary is-rounded"
                              :class="{'is-loading': isLoading}">{{this.$route.params.id ? 'Save Changes' : 'Add Tag'}}</button>
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
                breadcrumb:[{link: '/tags', label:'tags'},{link: '', label:'add & update tag'}]
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
                const tag = await tagsRepository.newTag(data)
                if (tag.success) {
                    this.successMessage(tag.message)
                    this.$router.push('/tagForm/' + tag.data)
                } else {
                    this.errorMessage(tag[0])
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
                    this.errorMessage(tag[0])
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
