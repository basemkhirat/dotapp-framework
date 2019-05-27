<template>
     <header class="main--header">
          <div class="row align-items-center h-100">
               <div class="col-6">
                    <div class="btn-open--sidebar" @click="navMenuOpen">
                         <span class="icon">
                              <i class="mdi mdi-menu"></i>
                         </span>
                    </div>
                    <div class="btn-close--sidebar" @click="navMenuClose">
                         <span class="icon">
                              <i class="mdi mdi-close"></i>
                         </span>
                    </div>
               </div>
               <div class="col-6 d-flex">
                    <ul class="d-flex justify-content-end ml-auto align-items-center nav--links">
                         <li class="nav-item">
                              <a class="search--item" @click="mainSearch = true">
                                   <b-icon pack="fa" icon="search"></b-icon>
                              </a>
                         </li>
                         <li class="nav-item">
                              <a class="media--item" @click="openMediaModal">
                                   <b-icon pack="fa" icon="images"></b-icon>
                              </a>
                         </li>
                         <li class="nav-item">
                              <b-dropdown v-model="navigation" position="is-bottom-left">
                                   <a class="avatar--sm" slot="trigger">
                                        <img src="../../assets/images/user/user-64.png" alt="user name">
                                   </a>
                                   <b-dropdown-item custom>
                                        Logged as <b>{{userData.first_name}}  {{userData.last_name}}</b>
                                   </b-dropdown-item>
                                   <hr class="dropdown-divider">
                                   <b-dropdown-item value="settings">
                                        <b-icon pack="fa" icon="cog"></b-icon>
                                        Settings
                                   </b-dropdown-item>
                                   <b-dropdown-item value="logout" @click="logout()">
                                        <b-icon pack="fa" icon="sign-out-alt"></b-icon>
                                        Logout
                                   </b-dropdown-item>
                              </b-dropdown>
                         </li>

                    </ul>
               </div>
          </div>

          <!-- Main Search  -->
          <b-modal :active.sync="mainSearch" :width="640" scroll="keep" class="justify-content-start search--modal">
               <search/>
          </b-modal>


     </header>
</template>

<script>
     import Search from '../search/Search'
     import { mapState} from 'vuex';

     export default {
          data() {
               return {
                    navigation: false,
                    mainSearch: false,
               }
          },
          components:{
               Search,
          },
          computed: {
               ...mapState({
                    userData: state => state.login.userData,
               })
          },
          created(){
               this.$store.dispatch('checkUserData');
          },
          methods:{
               openMediaModal(){
                    this.$store.commit('openMediaModal')
               },
               navMenuOpen(){
                    document.body.classList.add("is--mainSidebar--open")
               },
               navMenuClose(){
                    document.body.classList.remove("is--mainSidebar--open")
               },
               logout(){
                    this.$store.commit('logout')
               }
          }
     }
</script>
