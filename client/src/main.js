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

// Scroll To
var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo, {
     container: "body",
     duration: 500,
     easing: "ease",
     offset: 0,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })


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


// Vue Filter
Vue.filter('textLimit', function (value, num) {
    if (!value) return ''
    value = value.toString()
    if(value.length > num){
        let newText = value.substring(0, num)
        return newText + ' ...'
    } else {
        return value
    }
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
// Placeholder Media
Vue.component('mediaPlaceholder', {
  data(){
    return {
    }
  },
  props:['type', 'text'],
  template: `
    <div class="placeholder--media">
        <div class="d-flex align-items-center justify-content-center flex-column">
            <template v-if='type == "image"'>
                <i class="far fa-image"></i>
            </template>
            <template v-else-if='type == "video"'>
                <i class="fas fa-video"></i>
            </template>
            <template v-else-if='type == "gallery"'>
                <i class="fas fa-images"></i>
            </template>

            <span>{{text}}</span>
        </div>
    </div>`
})

// No Data Component
Vue.component('noData', {
    data(){
      return {
      }
    },
    props:['text'],
    template: `
      <div class="card--nodata">
            <div class="d-flex align-items-center justify-content-center flex-column">
                <span class="icon">
                    <svg version="1.1" x="0px" y="0px"
                        width="314.014px" height="314.015px" viewBox="0 0 314.014 314.015" style="enable-background:new 0 0 314.014 314.015;"
                        xml:space="preserve">
                    <g>
                        <g id="_x36_3._Trash">
                            <g>
                                <path d="M282.612,31.402h-47.099V15.701C235.513,7.033,228.471,0,219.812,0H94.205c-8.666,0-15.701,7.033-15.701,15.701v15.701
                                    H31.402c-8.668,0-15.701,7.033-15.701,15.699c0,8.668,7.033,15.701,15.701,15.701v219.81c0,17.344,14.06,31.402,31.4,31.402
                                    h188.411c17.341,0,31.398-14.059,31.398-31.402V62.803c8.664,0,15.701-7.033,15.701-15.701
                                    C298.313,38.436,291.292,31.402,282.612,31.402z M251.213,282.612H62.803V62.803h188.411V282.612z"/>
                            </g>
                        </g>
                    </g>
                    </svg>
                </span>

                <span v-if="text">{{text}}</span>
                <span v-else>No Data Here</span>
            </div>
      </div>`
  })



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
