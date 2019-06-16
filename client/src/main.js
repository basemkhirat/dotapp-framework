import Vue from 'vue'
import router from './router'
import store from './store/store'
import axios from 'axios'

import mixins from './mixins/mixins'

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
axios.defaults.baseURL = process.env.APP_URL + '/api';

const  accessToken  =  localStorage.getItem("token");

if (accessToken) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken
}

// Check User Is Authorized
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        return router.push('/login')
    }
    return Promise.reject(error.response);
});


// Vue Mixins
Vue.mixin({
  mixins: [mixins]
})




Vue.config.productionTip = false

// Global Components
Vue.component('loading-data', {
  data: function () {
    return {
      isLoading: true
    }
  },
  template: `
  <div class="loading--data">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false">
            <b-icon
                pack="fas"
                icon="spinner"
                size="is-large"
                custom-class="fa-spin">
            </b-icon>
        </b-loading>
    </div>`
})

Vue.component('breadcrumb', {
  data(){
    return {
    }
  },
  props:['links'],
  template: `
    <nav class="breadcrumb has-arrow-separator custom--breadcrumb " aria-label="breadcrumbs">
        <ul>
            <li>
                <router-link class="is--link" to="/">Backend</router-link>
            </li>
            <li v-for="(link , index) in links" :key="index">
                <router-link class="is--link" v-if="link.link" :to="link.link">{{link.label}}</router-link>
                <a v-else class="no--link" >{{link.label}}</a>
            </li>
        </ul>
    </nav>`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
