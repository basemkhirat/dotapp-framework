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
        }
    },
    created(){
        this.checkMenuTheme()
    },
    computed:{
        ...mapState({
            manuThemeState: state => state.globalSettings.menuTheme,
        }),
    },
    mounted(){
        if(this.manuThemeState){
            this.menuTheme = this.manuThemeState
        }
    },
    watch:{
        menuTheme(){
            this.$store.commit('setMenuTheme', this.menuTheme)
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
        }
    },

}
</script>

