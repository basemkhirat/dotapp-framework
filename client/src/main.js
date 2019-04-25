import Vue from 'vue'
import router from './router'
import store from './store/store'

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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
