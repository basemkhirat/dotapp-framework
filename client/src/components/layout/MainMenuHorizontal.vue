<template>
    <div class="main--menu--horizontal">
        <div class="wrap--content">


            <ul class="menu-list nav">
                <li v-for="(list,index) in links" :key="index">
                    <a v-if="list.media" class="navbar-item">
                        <span class="icon">
                            <i :class="list.icon"></i>
                        </span>
                        <span class="text-aside">{{ list.name }}</span>
                    </a>
                    <router-link v-else-if="!list.childLinks" :to="list.link" class="navbar-item"
                        exact-active-class="is-active">
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
                        </a>
                        <b-dropdown-item class="sub--item" has-link v-for="(item, indexSub) in list.childLinks"
                            :key="indexSub">
                            <router-link :to="item.link" class="navbar-item" exact-active-class="is-active">
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
                    </ul> -->

                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import {
        mapState
    } from 'vuex';

    export default {
        data() {
            return {
                scrollSettings: {
                    maxScrollbarLength: 160
                },
                links: [],
                AsideLinks: [{
                        name: 'Dashboard',
                        link: '/',
                        icon: 'fas fa-tachometer-alt',
                        role: true
                    },
                    {
                        name: 'Users',
                        link: '/users',
                        icon: 'fas fa-user',
                        role: 'user.view'
                    },
                    {
                        name: 'Groups',
                        link: '/groups',
                        icon: 'fas fa-users',
                        role: 'role.view'
                    },
                    {
                        name: 'Media',
                        link: '/media',
                        icon: 'fa fa-images',
                        role: 'media.view'
                    },
                    {
                        name: 'Events',
                        link: '/events',
                        icon: 'far fa-calendar-alt',
                        role: true
                    },
                    {
                        name: 'Content',
                        link: '/',
                        icon: 'far fa-newspaper',
                        role: true,
                        childLinks: [{
                                name: 'Posts',
                                link: '/posts',
                                icon: 'far fa-newspaper',
                                role: 'post.view'
                            },
                            {
                                name: 'Categories',
                                link: '/categories',
                                icon: 'fas fa-puzzle-piece',
                                role: 'category.view'
                            },
                            {
                                name: 'Tags',
                                link: '/tags',
                                icon: 'fas fa-tags',
                                role: 'tag.view'
                            },
                        ]
                    },

                ],
            }
        },
        computed: {
            ...mapState({
                role: state => state.login.userDataPermission,
            })
        },
        watch: {
            role() {
                if (this.role) {
                    this.checkLinksRole()
                }
            },
        },
        created() {
            this.checkLinksRole()
        },

        methods: {
            checkLinksRole() {
                this.links = []
                const userPermission = JSON.parse(localStorage.getItem('userData'))
                this.AsideLinks.map(item => {
                    if (item.childLinks) {

                        if (userPermission.permissions.indexOf(item.role) > -1 || item.role === true) {

                            let itemHasSubmenu = {}
                            let dataItem = JSON.stringify(item)
                            itemHasSubmenu = JSON.parse(dataItem)
                            itemHasSubmenu.childLinks = []

                            item.childLinks.map(subItem => {
                                if (userPermission.permissions.indexOf(subItem.role) > -1 || subItem
                                    .role === true) {
                                    itemHasSubmenu.childLinks.push(subItem)
                                }
                            })
                            this.links.push(itemHasSubmenu)
                        }

                    } else {
                        if (userPermission.permissions.indexOf(item.role) > -1 || item.role === true) {
                            this.links.push(item)
                        }
                    }

                })
            },
        }
    }
</script>

<style>
    .active--menu {
        display: block;
    }

    .close--menu {
        display: none;
    }
</style>
