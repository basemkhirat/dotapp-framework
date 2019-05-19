import axios from 'axios'
import router from './../../router'
const Login = {
     state: {
          isLoading: false,
          loginErrorMessage: null,
          loginSuccessful: false,
          userData: {},

        },
        mutations: {
          resetState(state){
            state.isLoading = true
            state.loginErrorMessage = null
            state.loginSuccessful = false
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
            axios.post('/auth/token', loginData)
              .then((response) => {
                state.isLoading = false
                localStorage.setItem('token', response.data.data.token)                
                dispatch('checkUserData');
                window.location.href = '/'
              })
              .catch(error => {
                state.loginErrorMessage = error.response.data.data[0]
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