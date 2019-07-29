<template>
    <div class="main--menu--horizontal">
        <!-- <div class="wrap--content"> -->

        <ul class="menu-list nav">
            <li v-for="(list,index) in links" :key="index">
                <a v-if="list.media" class="navbar-item">
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

                <b-dropdown aria-role="list" v-if="list.childLinks">
                    <a v-if="list.childLinks" class="navbar-item" slot="trigger">
                        <span class="icon">
                            <i :class="list.icon"></i>
                        </span>
                        <span class="text-aside">{{ list.name }}</span>
                        <span class="icon icon--right">
                            <i class="fas fa-angle-down"></i>
                        </span>
                    </a>
                    <b-dropdown-item
                        class="sub--item"
                        has-link
                        v-for="(item, indexSub) in list.childLinks"
                        :key="indexSub"
                    >
                        <router-link
                            :to="item.link"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="icon">
                                <i :class="item.icon"></i>
                            </span>
                            <span class="text-aside">{{ item.name }}</span>
                        </router-link>
                    </b-dropdown-item>
                </b-dropdown>

                <!-- <ul class="sub--menu">
                        <li v-for="(item, indexSub) in list.childLinks" :key="indexSub">
                            <router-link :to="item.link" class="navbar-item" exact-active-class="is-active">
                                <span class="icon">
                                    <i :class="item.icon"></i>
                                </span>
                                <span class="text-aside">{{ item.name }}</span>
                            </router-link>
                        </li>
                </ul>-->
            </li>
        </ul>
        <!-- </div> -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import { LangAR, LangEN } from "./../../helpers/lang/Lang";

export default {
    data() {
        return {
            scrollSettings: {
                maxScrollbarLength: 160
            },
            links: [],
            AsideLinks: [],
            lang: []
        };
    },
    computed: {
        ...mapState({
            userData: state => state.login.userData,
            role: state => state.login.userDataPermission
        })
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
    watch: {
        role() {
            if (this.role) {
                this.checkLinksRole();
            }
        }
    },
    created() {
        // this.checkLinksRole();
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
                    name: this.lang.menuItems.content,
                    link: "/",
                    icon: "far fa-newspaper",
                    role: true,
                    childLinks: [
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
                            name: this.lang.menuItems.events,
                            link: "/events",
                            icon: "far fa-calendar-alt",
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
                        {
                            name: this.lang.menuItems.authors,
                            link: "/authors",
                            icon: "fas fa-users",
                            role: true
                        }
                    ]
                }
            ];
            this.checkLinksRole();
        },
        checkLinksRole() {
            this.links = [];
            const userPermission = JSON.parse(localStorage.getItem("userData"));
            this.AsideLinks.map(item => {
                if (item.childLinks) {
                    if (
                        userPermission.permissions.indexOf(item.role) > -1 ||
                        item.role === true
                    ) {
                        let itemHasSubmenu = {};
                        let dataItem = JSON.stringify(item);
                        itemHasSubmenu = JSON.parse(dataItem);
                        itemHasSubmenu.childLinks = [];

                        item.childLinks.map(subItem => {
                            if (
                                userPermission.permissions.indexOf(
                                    subItem.role
                                ) > -1 ||
                                subItem.role === true
                            ) {
                                itemHasSubmenu.childLinks.push(subItem);
                            }
                        });
                        this.links.push(itemHasSubmenu);
                    }
                } else {
                    if (
                        userPermission.permissions.indexOf(item.role) > -1 ||
                        item.role === true
                    ) {
                        this.links.push(item);
                    }
                }
            });
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
</style>
