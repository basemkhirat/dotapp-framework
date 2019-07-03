import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import media from './modules/Media'
import login from './modules/Login'
import globalSettings from './modules/GlobalSettings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toggleNavSlide: false,
    blockModal: false
  },
  mutations: {
    // Toggle Open Nav Sidebar
    toggleNavOpen(state){
        state.toggleNavSlide =! state.toggleNavSlide
        if(state.toggleNavSlide){
            document.body.classList.add("sidebar--mini")
        } else {
            document.body.classList.remove("sidebar--mini")
        }
    },
    miniSidebar(state){
        state.toggleNavSlide = true
        if(state.toggleNavSlide){
            document.body.classList.add("sidebar--mini")
        } else {
            document.body.classList.remove("sidebar--mini")
        }
    },
    miniSidebarOpen(state){
        state.toggleNavSlide = false
        if(state.toggleNavSlide){
            document.body.classList.add("sidebar--mini")
        } else {
            document.body.classList.remove("sidebar--mini")
        }
    },
    // Blocks Modal
    openBlocksModal(state){
        state.blockModal = true
    },
    closeBlocksModal(state){
        state.blockModal = false
    }
  },
  actions: {

  },
  modules:{
    media,
    login,
    globalSettings
  }
})
