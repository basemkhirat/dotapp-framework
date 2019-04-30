<template>
  <div class="users">
    <div class="page--title">
      <h1 class="title--text">Users</h1>
    </div>
    <div class="card--block">
      <div class="card--hreader">
        <div class="card--header--title">
          Add New User
        </div>
      </div>
      <div class="card--content">
          <form class="row justify-content-center" @submit.prevent="submitForm()">
              <div class="col-12 col-lg-8">
                    <div class="row">
                         <div class="col-12 col-md-6">
                              <b-field class="field-group">
                                   <b-input type="text" required rounded placeholder="First name" v-model="firstName" />
                              </b-field>
                         </div>
                         <div class="col-12 col-md-6">
                              <b-field class="field-group">
                                   <b-input type="email" required rounded placeholder="User Email" v-model="email" />
                              </b-field>
                         </div>
                         <div class="col-12 col-md-6">
                              <b-field class="field-group">
                                   <b-input type="password" required rounded placeholder="Password" v-model="password" />
                              </b-field>
                         </div>
                         <div class="col-12 col-md-6">
                              <b-field class="field-group">
                                   <b-input type="password" required rounded placeholder="Confirm Password"
                                        v-model="confirmPassword" />
                              </b-field>
                              <p class="help is-danger mt-0" v-if="errorConfirmPassword">Please fill the same password.</p>
                         </div>
                         <div class="col-12 col-md-6">
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
               <div class="col-12 col-lg-4">
                    <b-field class="field-group">
                         <div class="text-center">
                              <div class="user--photo field-group">
                                   <img v-if="userPhoto" :src="userPhoto" alt="user" class="avatar-l">
                                   <img v-else src="./../../assets/images/user/user-128.png" class="avatar-l" alt="">
                              </div>
                              <b-upload accept="image/*" @input="handleUserPhoto(files)">
                                   <a class="button is-dark is-rounded m-2 is-small">Change Photo</a>
                              </b-upload>
                         </div>
                    </b-field>
               </div>
               <div class="col-12 text-center button--save--form">
                    <button class="button is-primary is-rounded" :class="{'is-loading': isLoading}">Add User</button>
               </div>
         </form>
      </div>
    </div>

     <!-- Modal Photo Crop -->
     <b-modal :active.sync="ModalCropUserPhoto" :width="500" :canCancel="false">
          <button class="delete is-large close--modal" @click="ModalCropUserPhoto = false"></button>
          <div class="modal--content">
          <h3>User Photo</h3>
          <div class=" text-center modal-card-body-crop">
               <vue-croppie ref=croppieRef :enableOrientation="true" :mouseWheelZoom="true" :enableResize="false"
                    @result="result" :viewport="{ width: 200, height: 200, type: 'circle' }">
               </vue-croppie>
          </div>
          <div class="button--group ">
               <button class="button is-dark is-rounded m-1" @click="rotate(-90)">Rotate Left</button>
               <button class="button is-dark is-rounded m-1" @click="rotate(90)">Rotate Right</button>
               <button class="button is-primary is-rounded m-1" @click="crop()">Save Changes</button>
          </div>
          </div>
     </b-modal>
    
  </div>
</template>



<script>

     import Vue from 'vue';
     import VueCroppie from 'vue-croppie';
     import 'croppie/croppie.css' // import the croppie css manually
     Vue.use(VueCroppie);

     // Repository Data
     import { RepositoryFactory } from '../../repositories/RepositoryFactory'
     const usersRepository = RepositoryFactory.get('users')

     export default {
          name: 'userForm',
          data() {
               return {
                    firstName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    userPhoto: '',
                    files: [],
                    ModalCropUserPhoto: false,
                    group: '',
                    groups: ['admin', 'user' ],
                    isLoading: false,
                    errorConfirmPassword: false
               };
          },
          
          methods: {
               // Upload Photo And Crop
               handleUserPhoto() {
                    var files = event.target.files
                    var reader = new FileReader
                    reader.addEventListener('load', () => {
                         this.$refs.croppieRef.bind({
                              url: reader.result
                         })
                    })
                    reader.readAsDataURL(files[0])
                    this.ModalCropUserPhoto = true
               },

               // CALBACK USAGE
               crop() {
                    let options = {
                         format: 'jpeg',
                         circle: true,
                    }
                    this.$refs.croppieRef.result(options, (output) => {
                         this.userPhoto = output;
                    });
                    this.ModalCropUserPhoto = false
               },
               result(output) {
                    this.userPhoto = output;
               },
               update(val) {
                    console.log(val);
               },
               rotate(rotationAngle) {
                    // Rotates the image
                    this.$refs.croppieRef.rotate(rotationAngle);
               },
               closeModalNewUser(){
                    this.$emit('closeModalNewUser')
               },

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
                    // console.log(user)
                    this.isLoading = false
               },
          }
     }
</script>