<template>
    <div>
        <aside class="menu shadow main--sidebar" :class="{ 'toggleNavSlide': toggleNavSlide}">
            <div class="wrap--upper--nav">
                <span class="icon" @click="toggleNavOpen">
                    <i class="mdi mdi-menu"></i>
                </span>
                <div class="head-logo">
                    DASHBOARD
                </div>
            </div>

            <!-- <vue-perfect-scrollbar class="menu--scroll" :settings="scrollSettings"> -->
                <div class="menu--scroll">
                <ul class="menu-list">
                    <li v-for="(list,i) in links" :key="i">
                        <a v-if="list.media" class="navbar-item" @click="openMedia()">
                            <span class="icon">
                                <i :class="list.icon"></i>
                            </span>
                            <span class="text-aside">{{ list.name }}</span>
                        </a>
                        <router-link v-else-if="!list.childLinks" :to="list.link" class="navbar-item" exact-active-class="is-active">
                            <span class="icon">
                                <i :class="list.icon"></i>
                            </span>
                            <span class="text-aside">{{ list.name }}</span>
                        </router-link>

                        <menu-item v-if="list.childLinks" :toggleNavSlide="toggleNavSlide" :list="list" />
                    </li>
                </ul>

            <!-- </vue-perfect-scrollbar> -->
            </div>
        </aside>
        <transition name="fade">
             <div @click="closeSidebar()" class="overlay--mainSidebar"></div>
        </transition>

        <div class="overlay--sidebar" @click="closeNavMenu"></div>

    </div>

</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import MenuItem from './MenuItem';
    import { mapState} from 'vuex';


    export default {
        data(){
            return{
                scrollSettings: {
                    maxScrollbarLength: 160
                },
                links:[],
                AsideLinks: [
                    { name: 'Dashboard', link: '/', icon: 'fas fa-tachometer-alt', role: true},
                    { name: 'Users', link: '/users', icon: 'fas fa-user', role: 'user.view'},
                    { name: 'Groups', link: '/groups', icon: 'fas fa-users', role: 'role.view'},
                    { name: 'Media', link: '/media', icon: 'fa fa-images', role: 'media.view', media: true},
                    { name: 'Posts', link: '/posts', icon: 'far fa-newspaper', role: true},
                    { name: 'Categories', link: '/categories', icon: 'far fa-newspaper', role: 'category.view'},
                    { name: 'Tags', link: '/tags', icon: 'fas fa-tags', role: 'tag.view'},
                    // { name: 'Item Dropdown2', link: '/', icon: 'fas fa-columns', childLinks:[
                    //     { name: 'Item One a', link: '/a'},
                    //     { name: 'Item Two asds', link: '/sd'},
                    //     { name: 'Item three ads', link: '/sd'},
                    //     { name: 'Item four', link: '/sd'},
                    // ]},

                ],
            }
        },
        computed: {
            ...mapState({
                role: state => state.login.userDataPermission,
                toggleNavSlide: state => state.toggleNavSlide,
            })
        },
        watch:{
          role(){
              if(this.role){
                  this.checkLinksRole()
              }
          },
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
                this.$store.commit('toggleNavOpen')
            },
            closeNavMenu(){
                document.body.classList.remove("is--mainSidebar--open")
            },
            checkLinksRole(){
                this.links = []
                this.AsideLinks.map(item => {
                    if(this.role.indexOf(item.role) > -1 || item.role === true){
                        this.links.push(item)
                    }
                })
            },
            openMedia(){
                this.$store.commit('openMediaModal')
            }

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
