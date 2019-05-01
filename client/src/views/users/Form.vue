<template>
  <div class="users">
    <div class="page--title">
      <h1 class="title--text">
        Users
      </h1>
      <div class="page--title--action ml-auto" v-if="this.$route.params.id">
          <router-link to="/userForm" class="button is-primary is-rounded">Add New User</router-link>
      </div>
    </div>
    <div class="card--block">
      <div class="card--hreader">
        <div class="card--header--title">
          {{this.$route.params.id ? 'Update User' : 'Add New User'}}
        </div>
      </div>
      <div class="card--content">
          <form class="row justify-content-center" @submit.prevent="submitForm()">
              <div class="col-12 col-lg-8 col-xl-6">
                    <div class="row">
                         <div class="col-12">
                              <b-field class="field-group">
                                   <div class="text-center">
                                        <div class="user--photo field-group">
                                             <!-- <img v-if="userPhoto" :src="userPhoto" alt="user" class="avatar-l"> -->
                                             <img src="./../../assets/images/user/user-128.png" class="avatar-l" alt="">
                                        </div>
                                        <!-- <b-upload accept="image/*" @input="handleUserPhoto(files)"> -->
                                             <a class="button is-dark is-rounded m-2 is-small">Change Photo</a>
                                        <!-- </b-upload> -->
                                   </div>
                              </b-field>
                         </div>
                         <div class="col-12">
                              <b-field class="field-group">
                                   <b-input type="text" required rounded placeholder="First name" v-model="firstName" />
                              </b-field>
                         </div>
                         <div class="col-12">
                              <b-field class="field-group">
                                   <b-input type="email" required rounded placeholder="User Email" v-model="email" />
                              </b-field>
                         </div>
                          <div class="col-12">
                              <b-field class="field-group" v-if="this.$route.params.id">
                                   <b-input minlength="7" type="password" required rounded placeholder="Old Password" v-model="oldPassword" />
                              </b-field>
                         </div>
                         <div class="col-12">
                              <b-field class="field-group">
                                   <b-input minlength="7" type="password" required rounded :placeholder="this.$route.params.id ? 'New Password' : 'Password'" v-model="password" />
                              </b-field>
                         </div>
                         <div class="col-12">
                              <b-field class="field-group">
                                   <b-input type="password" minlength="7" required rounded placeholder="Confirm Password"
                                        v-model="confirmPassword" />
                              </b-field>
                              <p class="help is-danger mt-0" v-if="errorConfirmPassword">Please fill the same password.</p>
                         </div>
                         <div class="col-12">
                              <b-field class="field-group">
                                   <v-select :options="groups" v-model="group" label="title" placeholder="Group" class="select--with--icon w-100 v--select--scroll">
                                        <template slot="option" slot-scope="option">
                                             {{ option.title }}
                                        </template>
                                   </v-select>
                              </b-field>
                         </div>
                        
                    </div>
               </div>
               
               <div class="col-12 text-center button--save--form">
                    <button class="button is-primary is-rounded" :class="{'is-loading': isLoading}">{{this.$route.params.id ? 'Save Changes' : 'Add User'}}</button>
               </div>
         </form>
      </div>
    </div>     
    
  </div>
</template>


<script>
     // Repository Data
     import { RepositoryFactory } from '../../repositories/RepositoryFactory'
     const usersRepository = RepositoryFactory.get('users')

     export default {
          name: 'userForm',
          data() {
               return {
                    firstName: '',
                    email: '',
                    oldPassword: '',
                    password: '',
                    confirmPassword: '',
                    group: '',
                    groups: ['admin', 'user' ],
                    isLoading: false,
                    errorConfirmPassword: false,
               };
          },
         
          methods: {
               submitForm() {
                    this.errorConfirmPassword = true
                    this.isLoading = false
                    let data = {}
                    data.first_name = this.firstName
                    data.email = this.email
                    data.password = this.password
                    if(this.firstName&&this.email&&this.password&&this.confirmPassword){
                         if(this.password === this.confirmPassword){
                              this.errorConfirmPassword = false
                              this.isLoading = true
                              this.newUser(data)
                         } else {
                              this.isLoading = false
                              this.errorConfirmPassword = true
                         }
                    }
               },
               

               async newUser(data) {
                    const user = await usersRepository.newUser(data)
                    if(user.success){
                         this.successMessage()
                         this.router.push('/userForm/' + user)
                         // this.getUser()
                    } else {
                         user.data.map(item => {
                              this.errorMessage(item)
                         })
                         
                    }
                    this.isLoading = false
               },

               async getUser(data) {
                    const user = await usersRepository.getUser(data)
                    if(user.success){
                         this.successMessage()
                    } else {
                         user.data.map(item => {
                              this.errorMessage(item)
                         })
                         
                    }
                    this.isLoading = false
               },

               errorMessage(textMessage){
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
               successMessage(){
                    this.$snackbar.open({
                         message: 'user has been successfully created',
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