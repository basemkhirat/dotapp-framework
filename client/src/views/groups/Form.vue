<template>
     <div class="groups">
          <div class="page--title">
               <h1 class="title--text">Groups</h1>
               <div class="page--title--action ml-auto" v-if="this.$route.params.id">
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
                    <form class="row mt-3" @submit.prevent="submitForm()">
                         <div class="col-12 col-sm-12 col-lg-8 col-xl-4">
                              <b-field class="field-group">
                                   <b-input type="text" rounded placeholder="Group Name" v-model="name" />
                              </b-field>
                              <hr class="mb-0">
                         </div>

                         <div class="col-12 checkbox--group permissions--items">
                              <h3> Add Permissions To Group </h3>
                              <div class="row">
                                   <div class="col-12">
                                       <div class="permissions--item" v-for="(value , name) in allPermissions" :key="name">
                                           <div class="row">
                                               <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 permission--title">
                                                   {{name}}
                                               </div>
                                               <!-- <div class="col-12 col-sm-6 col-md-8 col-lg-9 col-xl-10 permission--content">
                                                   <div class="item-checkbox" v-for="(checkLabel ,checkValue) in value" :key="checkLabel">
                                                       <template v-if="this.permissions && this.$route.params.id">
                                                            <switch-item :label="checkLabel" :allPermissions="{permissions: permissions, value: checkValue}"  :value="checkValue" @switchValue="switchValue" />
                                                       </template>
                                                       <template v-else>
                                                            <switch-item :label="checkLabel" :value="checkValue" @switchValue="switchValue" />
                                                       </template>
                                                    </div>
                                               </div> -->
                                           </div>
                                       </div>
                                        <!-- <table class="table is-bordered is-fullwidth is-striped ">
                                             <tbody>
                                                  <tr v-for="(value , name) in allPermissions" :key="name">
                                                       <th>{{name}}</th>
                                                       <td>
                                                            
                                                            <div class="d-inline-block item-checkbox" v-for="(checkLabel ,checkValue) in value" :key="checkLabel">
                                                                 <b-checkbox v-model="permissions" :native-value="checkValue">
                                                                      {{checkLabel}}
                                                                 </b-checkbox>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table> -->
                                   </div>
                              </div>
                         </div>

                         <div class="col-12 text-center button--save--form">
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
    import SwitchItem from './../../components/groups/SwitchItem'
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
            SwitchItem
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

            switchValue(value){

                if(value.status == true && this.permissions.indexOf(value.value)){
                    this.permissions.push(value.value)
                } else{
                    for (let i = 0; i < this.permissions.length; i++) {
                        if(this.permissions[i] === value.value){
                            this.permissions.splice(i, 1);
                        }
                    }
                }               
                
            },


            async newGroup(data) {
                const group = await groupsRepository.newGroup(data)
                if (group.success) {
                    this.successMessage(group.message)
                    this.$router.push('/groupForm/' + group.data)
                } else if(group.status === 500) {
                    this.errorMessage(group.data)
                } else {
                    group.data.map(item => {
                        this.errorMessage(item)
                    })
                }
                this.isLoading = false
            },

            async getGroup(data) {
                const group = await groupsRepository.getGroup(data)
                this.name = group.name
                this.policies = group.policies
                this.permissions = group.permissions
                console.log(group.permissions)

            },
            async updateGroup(id, data) {
                const group = await groupsRepository.updateGroup(id, data)
                if (group.success) {
                    this.successMessage(group.message)
                } else {
                    group.data.map(item => {
                        this.errorMessage(item)
                    })
                }
                this.isLoading = false
            },
            
            async getAllPermissions() {
                const permissions = await permissionRepository.getAllPermissions()
                this.allPermissions = permissions
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