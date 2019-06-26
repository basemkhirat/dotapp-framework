<template>
  <div id="app">
    <transition name="slide-left" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
  @import 'sass/core';
</style>

<script>
export default {
  data(){
    return{

    }
  },
  watch: {
    '$route' (to, from) {
        // document.body.classList.remove('editor--mini')
        // this.$store.commit('miniSidebarOpen')
        this.$store.commit('resetType')

    }
  },
  created(){
  }
}
</script>
