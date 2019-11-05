<template>
    <div>
        <aside class="menu shadow main--sidebar" :class="{ 'toggleNavSlide': toggleNavSlide}">
            <div class="wrap--upper--nav">
                <span class="icon" @click="toggleNavOpen">
                    <i class="mdi mdi-menu"></i>
                </span>
                <div class="head-logo">
                    <img src="../../assets/images/logo-white.png" alt="Elmodarrag">
                </div>
            </div>
            <perfect-scrollbar class="menu--scroll">
                <ul class="menu-list">
                    <li v-for="(list,i) in links" :key="i">
                        <a v-if="list.media" class="navbar-item" @click="openMedia()">
                            <span class="icon">
                                <i :class="list.icon"></i>
                            </span>
                            <span class="text-aside">{{ list.name }}</span>
                        </a>
                        <router-link
                            v-else-if="!list.childLinks"
                            :to="list.link"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="icon">
                                <i :class="list.icon"></i>
                            </span>
                            <span class="text-aside">{{ list.name }}</span>
                        </router-link>

                        <menu-item
                            v-if="list.childLinks"
                            :toggleNavSlide="toggleNavSlide"
                            :list="list"
                        />
                    </li>
                </ul>
            </perfect-scrollbar>
        </aside>
        <transition name="fade">
            <div @click="closeSidebar()" class="overlay--mainSidebar"></div>
        </transition>

        <div class="overlay--sidebar" @click="closeNavMenu"></div>
    </div>
</template>

<script>
import MenuItem from "./MenuItem";
import { mapState } from "vuex";
import { LangAR, LangEN } from "./../../helpers/lang/Lang";

export default {
    data() {
        return {
            scrollSettings: {
                maxScrollbarLength: 160
            },
            links: [],
            AsideLinks: [
                {
                    name: "Dashboard",
                    link: "/",
                    icon: "fas fa-tachometer-alt",
                    role: true
                },
                {
                    name: "Users",
                    link: "/users",
                    icon: "fas fa-user",
                    role: "user.view"
                },
                {
                    name: "Groups",
                    link: "/groups",
                    icon: "fas fa-users",
                    role: "role.view"
                },
                {
                    name: "Media",
                    link: "/media",
                    icon: "fa fa-images",
                    role: true
                },
                {
                    name: "Posts",
                    link: "/posts",
                    icon: "far fa-newspaper",
                    role: true
                },
                {
                    name: "Articles",
                    link: "/articles",
                    icon: "fas fa-newspaper",
                    role: true
                },
                {
                    name: "Pages",
                    link: "/pages",
                    icon: "fas fa-flag",
                    role: true
                },
                {
                    name: "Categories",
                    link: "/categories",
                    icon: "fas fa-puzzle-piece",
                    role: true
                },
                {
                    name: "Tags",
                    link: "/tags",
                    icon: "fas fa-tags",
                    role: true
                },
                {
                    name: "Authors",
                    link: "/authors",
                    icon: "fas fa-users",
                    role: true
                },

                // { name: 'Item Dropdown2', link: '/', icon: 'fas fa-columns', childLinks:[
                //     { name: 'Item One a', link: '/a'},
                //     { name: 'Item Two asds', link: '/sd'},
                //     { name: 'Item three ads', link: '/sd'},
                //     { name: 'Item four', link: '/sd'},
                // ]},
            ]
        };
    },
    computed: {
        ...mapState({
            userData: state => state.login.userData,
            role: state => state.login.userDataPermission,
            toggleNavSlide: state => state.toggleNavSlide
        })
    },
    watch: {
        role() {
            if (this.role) {
                this.checkLinksRole();
            }
        }
    },
    created() {
        this.checkLinksRole();
    },
    mounted() {
        if (this.userData.lang === "ar") {
            this.lang = LangAR;
            this.setMenuItems();
        } else {
            this.lang = LangEN;
            this.setMenuItems();
        }
    },
    components: {
        MenuItem
    },

    methods: {
        // Set Menu Items
        setMenuItems() {
            this.AsideLinks = [
                {
                    name: this.lang.menuItems.dashboard,
                    link: "/",
                    icon: "fas fa-tachometer-alt",
                    role: true
                },
                {
                    name: this.lang.menuItems.users,
                    link: "/users",
                    icon: "fas fa-user",
                    role: "user.view"
                },
                {
                    name: this.lang.menuItems.groups,
                    link: "/groups",
                    icon: "fas fa-users",
                    role: "role.view"
                },
                {
                    name: this.lang.menuItems.media,
                    link: "/media",
                    icon: "fa fa-images",
                    role: true
                },
                {
                    name: this.lang.menuItems.pages,
                    link: "/pages",
                    icon: "fas fa-flag",
                    role: true
                },

                {
                    name: this.lang.menuItems.posts,
                    link: "/posts",
                    icon: "far fa-newspaper",
                    role: true
                },
                {
                    name: this.lang.menuItems.articles,
                    link: "/articles",
                    icon: "fas fa-newspaper",
                    role: true
                },
                {
                    name: this.lang.menuItems.categories,
                    link: "/categories",
                    icon: "fas fa-puzzle-piece",
                    role: true
                },
                {
                    name: this.lang.menuItems.tags,
                    link: "/tags",
                    icon: "fas fa-tags",
                    role: true
                },
                // {
                //     name: this.lang.menuItems.menu,
                //     link: "/menu",
                //     icon: "fas fa-bars",
                //     role: true
                // },
                {
                    name: this.lang.menuItems.authors,
                    link: "/authors",
                    icon: "fas fa-users",
                    role: true
                }
            ];
            this.checkLinksRole();
        },

        closeSidebar() {
            this.$store.commit("closeMainMenu");
        },
        toggleNavOpen() {
            this.$store.commit("toggleNavOpen");
        },
        closeNavMenu() {
            document.body.classList.remove("is--mainSidebar--open");
        },
        checkLinksRole() {
            this.links = [];
            const userPermission = JSON.parse(localStorage.getItem("userData"));
            this.AsideLinks.map(item => {
                if (
                    userPermission.permissions.indexOf(item.role) > -1 ||
                    item.role === true
                ) {
                    this.links.push(item);
                }
            });
        },
        openMedia() {
            this.$store.commit("openMediaModal");
        }
    }
};
</script>

<style>
.active--menu {
    display: block;
}
.close--menu {
    display: none;
}
.menu--scroll{
    direction: ltr;
}
</style>
