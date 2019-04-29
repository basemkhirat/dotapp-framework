<template>
    <div class="login--page">
        <div class="login--form card--block">
            <form @submit.prevent="loginSubmit()">
                <div class="logo--head">
                    <h3>Dashboard</h3>
                </div>
                <b-field class="field-group">
                    <b-input rounded type="email" placeholder="Email" icon="email-outline" v-model="email" />
                </b-field>
                <b-field class="field-group">
                    <b-input rounded type="password" placeholder="Password" icon="key" v-model="password"/>
                </b-field>
                <div class="text-center">
                    <button class="button is-rounded button-block is-primary w-100" :class="{'is-loading': isLoading}">Login</button>
                </div>
            </form>
        </div>

        
        
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.login.isLoading,
        loginError: state => state.login.loggingIn,
        loginSuccessful: state => state.login.loggingIn,
    })
      
    },
    methods: {
      ...mapActions([
        'doLogin'
      ]),
      loginSubmit() {
        this.doLogin({
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>
