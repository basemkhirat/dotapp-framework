import axios from 'axios'
import router from './../../router'
const Login = {
     state: {
          isLoading: false,
          loginErrorMessage: null,
          loginSuccessful: false,
          userData: {},
          successMessage: '',
          successMessageReset: '',

        },
        mutations: {
          resetState(state){
            state.isLoading = false
            state.loginErrorMessage = null
            state.loginSuccessful = false
            state.successMessage = ''
            state.successMessageReset = ''
          },
          // Logout
          logout(){
            localStorage.removeItem('token');
            router.push('/login')
          }
        },
        actions: {
          doLogin({ commit, state, dispatch }, loginData) {
              commit('resetState');
              state.isLoading = true
            axios.post('/auth/token', loginData)
              .then((response) => {
                state.isLoading = false
                localStorage.setItem('token', response.data.data.token)
                dispatch('checkUserData');
                window.location.href = '/'
              })
              .catch(error => {
                state.loginErrorMessage = error.data.errors[0]
                state.isLoading = false
              })
          },



        // Forgot Password
          forgotPassword({ commit, state, dispatch }, loginData) {
              commit('resetState');
                axios.post('/auth/forget', loginData)
                .then((response) => {
                    state.isLoading = false
                    state.successMessage = response.data.message
                })
              .catch(error => {
                state.loginErrorMessage = error.data.errors[0]
                state.isLoading = false
              })
          },

        // Reset Password
          resetPassword({ commit, state, dispatch }, loginData) {
              commit('resetState');
                axios.post('/auth/reset', loginData)
                .then((response) => {
                    state.isLoading = false
                    state.successMessageReset = response.data.message
                })
              .catch(error => {
                state.loginErrorMessage = error.data.errors[0]
                state.isLoading = false
              })
          },

          checkUserData({ commit, state }, loginData) {
            axios.get('/auth/user')
              .then((response) => {
                state.userData = response.data.data
              })
              .catch(error => {
                // state.loginErrorMessage = error.data.data[0]
              })

          }
        },
     getters: {}
}

export default Login
