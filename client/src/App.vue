<template>
  <div id="app">
    <transition name="slide-left" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

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
    document.body.classList.add('lang--ar')
  }
}
</script>
