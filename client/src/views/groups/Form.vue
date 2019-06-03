<template>
     <div class="groups">
          <div class="page--title">
               <h1 class="title--text">Groups</h1>
               <div class="page--title--action ml-auto" v-if="this.$route.params.id && isInUserPermissions('role.create')">
                    <router-link to="/groupForm" class="button is-primary is-rounded">Add New Group</router-link>
               </div>
          </div>
          <div class="card--block">
               <div class="card--hreader">
                    <div class="card--header--title">
                          {{this.$route.params.id ? 'Update Group' : 'Add New Group'}}
                    </div>
               </div>
               <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                         <div class="col-12 col-md-10 col-lg-8 ">
                              <b-field class="field-group mb-4">
                                   <b-input type="text" rounded placeholder="Group Name" v-model="name" />
                              </b-field>
                              <template v-if="this.$route.params.id">
                                    <b-field class="field-group text-center"  v-if="policies.indexOf('role.update') > -1">
                                        <b-switch v-model="roleStatus" :true-value="1" :false-value="0">
                                            Active
                                        </b-switch>
                                    </b-field>
                                </template>
                                <template v-else>
                                    <b-field class="field-group text-center">
                                        <b-switch v-model="roleStatus" :true-value="1" :false-value="0">
                                            Active
                                        </b-switch>
                                    </b-field>
                                </template>
                         </div>

                         <div class="col-12 col-md-10 col-lg-8 checkbox--group permissions--items">
                              <h3> Add Permissions To Group </h3>
                              <div class="row justify-content-center">

                                   <div class="col-12">
                                       <div class="permissions--item" v-for="(value , name) in allPermissions" :key="name">
                                           <div class="row">
                                               <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 permission--title">
                                                   {{name}}
                                               </div>
                                               <div class="col-12 col-sm-6 col-md-8 col-lg-9 col-xl-10 permission--content">
                                                   <div class="item-checkbox checkbox--switch" v-for="(checkLabel , checkValue) in value" :key="checkLabel">
                                                      <b-checkbox-button
                                                            v-model="permissions"
                                                            :native-value="checkValue"
                                                            type="is-light">
                                                            <span>
                                                                {{checkLabel}}
                                                            </span>
                                                            <span class="switch--item">
                                                                <span class="check"></span>
                                                            </span>
                                                        </b-checkbox-button>
                                                    </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                              </div>
                         </div>

                         <div class="col-12 text-center button--save--form mt-0">
                              <button class="button is-primary is-rounded"
                              :class="{'is-loading': isLoading}">{{this.$route.params.id ? 'Save Changes' : 'Add Group'}}</button>
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
    const groupsRepository = RepositoryFactory.get('groups')
    const permissionRepository = RepositoryFactory.get('permissions')
    export default {
        name: 'groupForm',
        data() {
            return {
                name: '',
                isLoading: false,
                groupStatus: 0,
                policies: [],
                permissions: [],
                allPermissions: [],
                roleStatus: 0

            };
        },

        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.getGroup(this.$route.params.id)
                } else {
                     this.resetfuild()
                }
            },
        },
        created() {
            if (this.$route.params.id) {
                this.getGroup(this.$route.params.id)
            }
            this.getAllPermissions()
        },
        components:{

        },

        methods: {

             resetfuild(){
                this.name = ''
                this.permissions = []
             },

             submitForm() {
                this.isLoading = false
                let data = {}
                data.name = this.name
                data.status = this.roleStatus
                if(this.permissions.length){
                    data.permissions = this.permissions
                }
                if (this.name) {
                    this.isLoading = true
                    if(this.$route.params.id){
                         this.updateGroup(this.$route.params.id, data)
                    } else {
                         this.newGroup(data)
                    }
                }
            },

            async newGroup(data) {
                const group = await groupsRepository.newGroup(data)
                if (group.success) {
                    this.successMessage(group.message)
                    this.$router.push('/groupForm/' + group.data)
                } else {
                    this.errorMessage(group[0])
                }
                this.isLoading = false
            },

            async getGroup(data) {
                const group = await groupsRepository.getGroup(data)
                this.name = group.name
                this.policies = group.policies
                this.roleStatus = group.status
                this.permissions = group.permissions

            },
            async updateGroup(id, data) {
                const group = await groupsRepository.updateGroup(id, data)
                if (group.success) {
                    this.successMessage(group.message)
                } else {
                    this.errorMessage(group[0])
                }
                this.isLoading = false
            },

            async getAllPermissions() {
                const allPermissions = await permissionRepository.getAllPermissions()
                this.allPermissions = allPermissions
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
