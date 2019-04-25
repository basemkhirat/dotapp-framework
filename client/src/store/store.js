import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import media from './modules/Media'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stateMediaModal: false,
  },
  mutations: {
    openMediaModal(state){
      this.state.stateMediaModal = !this.state.stateMediaModal
    },
    closeMediaModal(state){
      this.state.stateMediaModal = false
    }
  },
  actions: {

  },
  modules:{
    media,
  }
})
