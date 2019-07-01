<template>
    <div class="login--page">
        <div class="login--form">
            <div class="card--block">
                <template v-if="loginErrorMessage">
                    <b-message type="is-danger" has-icon class="align-items-center">
                        {{loginErrorMessage}}
                    </b-message>
                </template>

                <!-- Forgot Passsword -->
                <div v-show="forgotPasswordStatus">
                    <form @submit.prevent="formSubmit()">
                        <div class="logo--head">
                            <h3>Reset Password</h3>
                        </div>
                        <b-field class="field-group">
                            <b-input type="email" placeholder="Email" icon="email-outline" name="email" v-model="email" />
                        </b-field>
                        <div class="text-center">
                            <button class="button button-block is-primary w-100"
                                :class="{'is-loading': isLoading}">Reset Password</button>
                        </div>
                    </form>
                </div>

                <!-- Resert Password -->
                <div v-show="!forgotPasswordStatus">
                    <form @submit.prevent="formSubmitReset()">
                        <div class="logo--head">
                            <h3>Reset Password</h3>
                        </div>
                        <b-field class="field-group">
                        <b-input   required type="text" placeholder="Code" v-model="code"/>
                        </b-field>
                        <b-field class="field-group">
                            <b-input
                                type="password"
                                placeholder="Password"
                                required
                                v-model="password"
                                icon="key"
                                minlength="7"
                                password-reveal>
                            </b-input>
                        </b-field>
                        <div class="text-center">
                            <button class="button button-block is-primary w-100"
                                :class="{'is-loading': isLoading}">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="text--lower">
                <router-link to="/login">Back To Login.</router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';

    export default {
        data() {
            return {
                email: '',
                forgotPasswordStatus: true,
                password: '',
                code: ''
            }
        },
        created(){
            this.$store.commit('resetState')
        },
        computed: {
            ...mapState({
                isLoading: state => state.login.isLoading,
                loginErrorMessage: state => state.login.loginErrorMessage,
                successMessage: state => state.login.successMessage,
                successMessageReset: state => state.login.successMessageReset,
            })
        },

        watch: {
            successMessage() {
                if (this.successMessage) {
                    this.forgotPasswordStatus = false
                    this.successMessageAleart(this.successMessage)
                }
            },
            successMessageReset() {
                if (this.successMessageReset) {
                    this.successMessageAleart(this.successMessageReset)
                    this.$router.push('/login')
                }
            }
        },

        methods: {
            ...mapActions([
                'forgotPassword',
                'resetPassword'
            ]),
            formSubmit() {
                if (this.email) {
                    this.forgotPassword({
                        email: this.email,
                    })
                }
            },
            formSubmitReset() {
                if (this.password && this.code) {
                    this.resetPassword({
                        code: this.code,
                        password: this.password,
                    })
                }
            },
            errorMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-danger',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },
            successMessageAleart(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },

        }
    }
</script>
