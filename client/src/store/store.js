import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import media from './modules/Media'
import login from './modules/Login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stateMediaModal: false,
    previewImages: false
  },
  mutations: {
    openMediaModal(state){
      this.state.stateMediaModal = !this.state.stateMediaModal
      this.state.previewImages = false
    },
    // Open Media And Preview All Images
    openMediaImage(state){
      this.state.stateMediaModal = !this.state.stateMediaModal
      this.state.previewImages = true
    },
    closeMediaModal(state){
      this.state.stateMediaModal = false
    }
  },
  actions: {

  },
  modules:{
    media,
    login
  }
})
