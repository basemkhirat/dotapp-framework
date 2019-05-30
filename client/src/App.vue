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
  created(){
  }
}
</script>
