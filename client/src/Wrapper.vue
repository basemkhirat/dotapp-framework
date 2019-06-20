<template>
    <div class="main--wrap">

        <!-- Main Header -->
        <main-header />

        <!--  Menu Vertical-->
        <template v-if="menuTheme === 'vertical'">

            <transition name="page" mode="out-in">
                <!-- Main Sidebar -->
                <main-sidebar />
            </transition>
        </template>

        <!-- All Content Pages -->
        <div class="main--content">
            <div class="wrapper--content">
                <transition name="page" mode="out-in">
                    <router-view />
                </transition>
            </div>
        </div>

        <!-- Media -->
        <app-media-modal />

    </div>
</template>

<script>
    import MainHeader from './components/layout/MainHeader'
    import MainSidebar from './components/layout/MainSidebar'
    import AppMediaModal from './components/media/MediaModal'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                mediaModal: false
            }
        },
        computed: {
            ...mapState({
                menuTheme: state => state.globalSettings.menuTheme,
            })
        },
        components: {
            MainHeader,
            MainSidebar,
            AppMediaModal,
        },

    }
</script>
