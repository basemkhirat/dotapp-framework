<template>
     <div class="main--wrap">

          <!-- Main Header -->
          <main-header />

          <!-- Main Sidebar -->
          <main-sidebar />

          <!-- All Content Pages -->
          <div class="main--content">
               <div class="wrapper--content">
                    <transition name="page" mode="out-in">
                         <router-view />
                    </transition>
               </div>
          </div>

          <!-- Media -->
          <app-media-modal />

     </div>
</template>

<script>
import MainHeader from './components/layout/MainHeader'
import MainSidebar from './components/layout/MainSidebar'
import AppMediaModal from './components/media/MediaModal'
export default {
     data(){
          return {
               mediaModal: false
          }
     },
     components:{
          MainHeader,
          MainSidebar,
          AppMediaModal
     },

}
</script>
