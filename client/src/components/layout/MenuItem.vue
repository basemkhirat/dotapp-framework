<template>
    <div class="menu--dropdown" :class="{'item--open--menu': itemOpen}">
        <a class="navbar-item item--has--submenu" :class="{'item--open': itemOpen}" @click="toggleMenu">
            <span class="icon">
                <i :class="list.icon"></i>
            </span>
            <span class="text-aside">{{ list.name }}</span>
            <span class="icon--dropdown--item">
                <i class="arrow--right fas fa-angle-right" :class="itemOpen ? 'menuItemOpen' : 'menuItemClose'"></i>
            </span>
        </a>
        <transition name="fade" mode="out-in">
            <ul class="" v-show="itemOpen">
                <li v-for="(list,i) in list.childLinks" :key="i">
                    <router-link :to="list.link" class="navbar-item" exact-active-class="is-active">
                        <span class="text-aside">{{ list.name }}</span>
                    </router-link>
                </li>
            </ul>
        </transition>
        
        
    </div>
</template>

<script>
export default {
    props:['list', 'toggleNavSlide'],
    data(){
        return{
            itemOpen: false
        }
    },
    watch:{
        toggleNavSlide(){
            if(this.toggleNavSlide){
                this.itemOpen = true
            } else {
                this.itemOpen = false
            }
        }
    },
    methods:{
        toggleMenu(){
            this.itemOpen = !this.itemOpen
        }
    }
}
</script>
