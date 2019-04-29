import axios from 'axios'
const Media = {
     state: {
          isLoading: false,
          loginError: null,
          loginSuccessful: false
        },
        mutations: {
          loginStart: state => state.loggingIn = true,
          loginStop: (state, errorMessage) => {
            state.loggingIn = false;
            state.loginError = errorMessage;
            state.loginSuccessful = !errorMessage;
          }
        },
        actions: {
          doLogin({ commit, state }, loginData) {
               state.isLoading = true
            commit('loginStart');
               console.log(loginData)
            axios.post('/auth/token', loginData)
            .then((response) => {
              commit('loginStop', null)
              console.log(response.data.data)
              state.isLoading = false
               localStorage.setItem('token', response.data.data.token)
            })
            .catch(error => {
               commit('loginStop', error.response.data.error)
              console.log(error)
              state.isLoading = false
            })


          }
        },
     getters: {}
}

export default Media