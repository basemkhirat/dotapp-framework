import axios from "axios";
import router from "./../../router";
const Login = {
    state: {
        isLoading: false,
        loginErrorMessage: null,
        loginSuccessful: false,
        userData: localStorage.getItem("userData") ,
        successMessage: "",
        successMessageReset: "",
        userDataPermission: [],
        userAuth: "",
        userToken: "",
        token: localStorage.getItem("token"),
    },
    getters: {
        token(state){
            return  state.token;
        }
    },
    mutations: {
        resetState(state) {
            state.isLoading = false;
            state.loginErrorMessage = null;
            state.loginSuccessful = false;
            state.successMessage = "";
            state.successMessageReset = "";
        },
        // Logout
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("userData")
            router.push("/login");
        },
        //  Set Token
        setToken(state, data) {
            localStorage.setItem("token", data.token);
            state.token = data.token;
        }
    },
    actions: {
        doLogin({ commit, state, dispatch }, loginData) {
            commit("resetState");
            state.isLoading = true;
            axios
                .post("/auth/token", loginData)
                .then(response => {
                    state.isLoading = false;
                    commit("setToken", response.data.data);
                    if(response.data.data){
                        dispatch('checkUserData')
                    }
                })
                .catch(error => {
                    state.loginErrorMessage = error.data.errors[0];
                    state.isLoading = false;
                });
        },

        // Forgot Password
        forgotPassword({ commit, state, dispatch }, loginData) {
            commit("resetState");
            axios
                .post("/auth/forget", loginData)
                .then(response => {
                    state.isLoading = false;
                    state.successMessage = response.data.message;
                })
                .catch(error => {
                    state.loginErrorMessage = error.data.errors[0];
                    state.isLoading = false;
                });
        },

        // Reset Password
        resetPassword({ commit, state, dispatch }, loginData) {
            commit("resetState");
            axios
                .post("/auth/reset", loginData)
                .then(response => {
                    state.isLoading = false;
                    state.successMessageReset = response.data.message;
                })
                .catch(error => {
                    state.loginErrorMessage = error.data.errors[0];
                    state.isLoading = false;
                });
        },

        async checkUserData({ commit, state }, loginData) {
            try {
                const AuthStr = 'Bearer ' + state.token;
                const response = await axios
                    .get("/auth/user", { headers: { Authorization: AuthStr }});
                localStorage.setItem("userData", JSON.stringify(response.data.data));
                state.userData = response.data.data;
                state.userDataPermission = response.data.data.permissions;
                window.location.href = "/";
            }
            catch (error) {
                state.loginErrorMessage = error.data.data[0];
            }
        },
        fetchUserData({ commit, state }, loginData) {
            axios.get("/auth/user").then(response => {
                localStorage.setItem("userData", JSON.stringify(response.data.data));
                state.userData = response.data.data;
            })
        }
    }
};

export default Login;
