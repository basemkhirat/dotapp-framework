<template>
    <div>
        <div class="theme--settings" :class="{'openTheme' : widgetThemeSetting}">
            <div class="item--setting">
                <label class="label">
                    {{$t('themeSettings.menu')}}
                </label>
                <b-field class="justify-content-center">
                    <b-radio-button v-model="menuTheme"
                        native-value="vertical">
                        {{$t('themeSettings.vertical')}}
                    </b-radio-button>

                    <b-radio-button v-model="menuTheme"
                        native-value="horizontal">
                        {{$t('themeSettings.horizontal')}}
                    </b-radio-button>
                </b-field>
            </div>
            <!-- Language -->
            <div class="item--setting">
                <label class="label">
                    {{$t('themeSettings.language')}}
                </label>
                <b-field class="justify-content-center">
                    <b-radio-button v-model="language"
                        @input="changeLanguage()"
                        native-value="ar">
                        {{$t('themeSettings.arabic')}}
                    </b-radio-button>

                    <b-radio-button v-model="language"
                        @input="changeLanguage()"
                        native-value="en">
                        {{$t('themeSettings.english')}}
                    </b-radio-button>
                </b-field>

            </div>
        </div>
        <transition name="fade">
            <div class="overlay" v-if="widgetThemeSetting" @click="widgetThemeSetting = false"></div>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
        return {
            widgetThemeSetting: false,
            menuTheme: '',
            language: '',
        }
    },
    created(){
        this.checkMenuTheme()
    },
    computed:{
        ...mapState({
            userData: state => state.login.userData,
            manuThemeState: state => state.globalSettings.menuTheme,
        }),
    },
    mounted(){
        if(this.manuThemeState){
            this.menuTheme = this.manuThemeState
        }
        if(this.userData){
            this.language = this.userData.lang
        }
    },
    watch:{
        menuTheme(){
            this.$store.commit('setMenuTheme', this.menuTheme)
        },
        language(){
            this.setUserData()
        },
        manuThemeState(){
            this.checkMenuTheme()
        }
    },
    methods:{
        //Setting Theme
        themeSettings(){
            this.widgetThemeSetting = true
        },
        //  Check Menu Theme
        checkMenuTheme(){
             if(this.manuThemeState === 'horizontal'){
                document.body.classList.remove('menuIsVertical', 'sidebar--mini')
                document.body.classList.add('menuIsHorizontal')
            } else {
                document.body.classList.remove('menuIsHorizontal')
                document.body.classList.add('menuIsVertical')
            }
        },
        setUserData() {
            localStorage.setItem('language', this.language)
            let userData = this.userData
            userData.lang = this.language
            localStorage.setItem("userData", JSON.stringify(userData));
        },
        changeLanguage() {
            window.location.reload()
        }
    },

}
</script>

