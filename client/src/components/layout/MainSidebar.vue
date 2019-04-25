<template>
    <div>
        <aside class="menu shadow main--sidebar" :class="{'is--mainSidebar--open': isMainMenuOpen, 'toggleNavSlide': toggleNavSlide}">
            <div class="wrap--upper--nav">
                <span class="icon" @click="toggleNavOpen">
                    <i class="mdi mdi-menu"></i>
                </span>
                <div class="head-logo">
                    DASHBOARD
                </div>
            </div>
            
            <vue-perfect-scrollbar class="menu--scroll" :settings="scrollSettings">
                <ul class="menu-list">
                    <li v-for="(list,i) in AsideLinks" :key="i">
                        <router-link v-if="!list.childLinks" :to="list.link" class="navbar-item" exact-active-class="is-active">
                            <span class="icon">
                                <i :class="list.icon"></i>
                            </span>
                            <span class="text-aside">{{ list.name }}</span>
                        </router-link>

                        <menu-item v-if="list.childLinks" :list="list" />
                    </li>
                </ul>

            </vue-perfect-scrollbar>
        </aside>
        <transition name="fade">
             <div @click="closeSidebar()" v-if="isMainMenuOpen" class="overlay--mainSidebar"></div>
        </transition>

    </div>

</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import MenuItem from './MenuItem';
    export default {
        data(){
            return{
                scrollSettings: {
                    maxScrollbarLength: 160
                },
                AsideLinks: [
                    { name: 'Dashboard', link: '/', icon: 'fas fa-tachometer-alt'},
                    { name: 'Users', link: '/users', icon: 'fas fa-user'},
                    { name: 'Groups', link: '/groups', icon: 'fas fa-users'},
                    { name: 'Media', link: '/media', icon: 'fa fa-images'},
                    
                    { name: 'Item Dropdown', link: '/', icon: 'fas fa-columns', childLinks:[
                        { name: 'Item One', link: '/a'},
                        { name: 'Item Two', link: '/sd'},
                        { name: 'Item three', link: '/sd'},
                        { name: 'Item four', link: '/sd'},
                    ]},
                    { name: 'Articles', link: '/articles', icon: 'far fa-newspaper'},

                ],
                toggleNavSlide: false,
            }
        },
        computed:{
            isMainMenuOpen(){
                return this.$store.state.isMainMenuOpen
            }
        },
        components: {
            VuePerfectScrollbar,
            MenuItem,
        },
       
        methods:{
            closeSidebar(){
                this.$store.commit('closeMainMenu')
            },
            toggleNavOpen(){
                this.toggleNavSlide =! this.toggleNavSlide
                if(this.toggleNavSlide){
                    document.body.classList.add("sidebar--mini")
                } else {
                    document.body.classList.remove("sidebar--mini")
                }
            },
        }
    }

</script>

<style>
 .active--menu{
     display: block;
 }
 .close--menu{
     display: none;
 }
</style>
