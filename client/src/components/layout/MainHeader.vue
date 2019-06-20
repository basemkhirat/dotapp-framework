<template>
    <header class="main--header" :class="{'theme--header--dark': menuTheme === 'horizontal'}">
        <div class="upper--header">
            <div class="row align-items-center h-100">
                <div class="col-6">
                    <div class="nav--brand" v-if="menuTheme === 'horizontal'">
                        Dashboard
                    </div>
                    <template v-if="menuTheme === 'vertical'">
                        <div class="btn-open--sidebar" @click="navMenuOpen">
                            <span class="icon">
                                <i class="mdi mdi-menu"></i>
                            </span>
                        </div>
                        <div class="btn-close--sidebar" @click="navMenuClose">
                            <span class="icon">
                                <i class="mdi mdi-close"></i>
                            </span>
                        </div>
                    </template>
                </div>
                <div class="col-6 d-flex">
                    <ul class="d-flex justify-content-end ml-auto align-items-center nav--links">
                        <li class="nav-item">
                            <a class="search--item" @click="mainSearch = true">
                                <b-icon pack="fa" icon="search"></b-icon>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="search--item" @click="themeSettings()">
                                <b-icon pack="fas" icon="cogs"></b-icon>
                            </a>
                        </li>

                        <li class="nav-item">
                            <b-dropdown v-model="navigation" position="is-bottom-left">
                                <a class="avatar--sm" slot="trigger">
                                    <template v-if="userData.photo">
                                        <img :src="userData.photo.thumbnails.small" alt="user name"
                                            v-if="userData.photo">
                                    </template>
                                    <img src="../../assets/images/user/user-64.png" alt="user name" v-else>
                                </a>
                                <b-dropdown-item custom>
                                    Logged as <b>{{userData.first_name}} {{userData.last_name}}</b>
                                </b-dropdown-item>
                                <hr class="dropdown-divider">
                                <b-dropdown-item @click="goToSettings()">
                                    <b-icon pack="fa" icon="cog"></b-icon>
                                    Settings
                                </b-dropdown-item>
                                <b-dropdown-item @click="logout()">
                                    <b-icon pack="fa" icon="sign-out-alt"></b-icon>
                                    Logout
                                </b-dropdown-item>
                            </b-dropdown>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

        <!-- Theme Settings -->
        <theme-settings ref="themeSettings" />

        <!-- Main Search  -->
        <b-modal :active.sync="mainSearch" :width="640" scroll="keep" class="justify-content-start search--modal">
            <search />
        </b-modal>

        <!--  Menu  Horizontal -->
        <template v-if="menuTheme === 'horizontal'">
            <transition name="fade">
                <main-menu-Horizontal />
            </transition>
        </template>

    </header>
</template>

<script>
    import Search from '../search/Search'
    import ThemeSettings from './ThemeSettings'
    import MainMenuHorizontal from './MainMenuHorizontal'
    import {
        mapState
    } from 'vuex';

    export default {
        data() {
            return {
                navigation: false,
                mainSearch: false,
            }
        },
        components: {
            Search,
            ThemeSettings,
            MainMenuHorizontal
        },
        computed: {
            ...mapState({
                userData: state => state.login.userData,
                menuTheme: state => state.globalSettings.menuTheme,
            })
        },
        created() {
            this.$store.dispatch('fetchUserData');
        },
        methods: {
            openMediaModal() {
                this.$store.commit('openMediaModal')
            },
            navMenuOpen() {
                document.body.classList.add("is--mainSidebar--open")
            },
            navMenuClose() {
                document.body.classList.remove("is--mainSidebar--open")
            },
            logout() {
                this.$store.commit('logout')
            },
            goToSettings() {
                this.$router.push('/userForm/' + this.userData.id)
            },
            //Setting Theme
            themeSettings() {
                this.$refs.themeSettings.themeSettings()
            }
        }
    }
</script>
