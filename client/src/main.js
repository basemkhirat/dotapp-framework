import Vue from 'vue'
import router from './router'
import store from './store/store'
import axios from 'axios'

// Vue Select
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

import App from './App.vue'


import Buefy from 'buefy'
Vue.use(Buefy)

// Copy Text
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)





// config file with base endpoint url
import { baseEndpointUrl } from './../env';
axios.defaults.baseURL = baseEndpointUrl;

const  accessToken  =  (localStorage.getItem('token')) ? 'Bearer ' + localStorage.getItem('token').split('"').join(''): '';

if (accessToken) {
    axios.defaults.headers.common['Authorization'] =  accessToken
    console.log(accessToken)
}

axios.interceptors.response.use((response) => {
  console.log(accessToken)
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUseId');

        // get return url from route parameters or default to '/'
        return router.push('/login')
    }
    return Promise.reject(error.response);
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
