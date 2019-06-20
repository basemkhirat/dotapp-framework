
const GlobalSettings = {
    state: {
        menuTheme: localStorage.getItem('menuTheme') ? localStorage.getItem('menuTheme') : 'vertical'
    },
    getters: {

    },
    mutations: {
        setMenuTheme(state, theme){
            state.menuTheme = theme
            localStorage.setItem('menuTheme', theme)
        }
    },
    actions: {

    }
};

export default GlobalSettings;
