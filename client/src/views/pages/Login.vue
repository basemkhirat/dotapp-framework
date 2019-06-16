<template>
    <div class="login--page">
        <div class="login--form">
            <div class="card--block">
                <template v-if="loginErrorMessage">
                    <b-message type="is-danger" has-icon class="align-items-center">
                        {{loginErrorMessage}}
                    </b-message>
                </template>
                <form @submit.prevent="loginSubmit()">
                    <div class="logo--head">
                        <h3>Dashboard</h3>
                    </div>
                    <b-field class="field-group">
                        <b-input rounded type="email" placeholder="Email" icon="email-outline" v-model="userLogin.email" />
                    </b-field>
                    <b-field class="field-group">
                        <b-input rounded type="password" placeholder="Password" icon="key" v-model="userLogin.password"/>
                    </b-field>
                    <div class="text-center">
                        <button class="button is-rounded button-block is-primary w-100" :disabled="formValid" :class="{'is-loading': isLoading}">Login</button>
                    </div>
                </form>
            </div>
            <div class="text--lower">
                <router-link to="/forgotPassword">Forgot Password?</router-link>
            </div>
        </div>

    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {

        userLogin:{
          email: '',
          password: '',
        },
        formValid: false,
      }
    },
    computed: {
      ...mapState({
          isLoading: state => state.login.isLoading,
          loginErrorMessage: state => state.login.loginErrorMessage,
          loginSuccessful: state => state.login.loggingIn,
      })
    },
    created(){
        this.$store.commit('resetState')
    },
    watch: {
      userLogin: {
        handler(val){
          if(this.userLogin.email&& this.userLogin.password){
            this.formValid = false
          } else {
            this.formValid = true
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'doLogin',
      ]),
      loginSubmit() {
        if(!this.formValid){
          this.doLogin({
            email: this.userLogin.email,
            password: this.userLogin.password
          })
        }

      }
    }
  }
</script>
