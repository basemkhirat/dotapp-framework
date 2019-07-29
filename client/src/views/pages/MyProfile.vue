<template>
    <div class="users">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            My Profile
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                </div>
            </div>
        </div>
        <div class="wrap--content">
            <div class="card--block">
                <div class="card--content">
                    <form class="row justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-lg-8 col-xl-6">
                            <div class="row align-items-center">
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <div class="text-center">
                                            <div class="user--photo field-group">
                                                <img :src="userPhoto" v-if="userPhoto" class="avatar-l" alt="">
                                                <img src="./../../assets/images/user/user-128.png" v-else
                                                    class="avatar-l" alt="">
                                            </div>
                                            <a class="button is-dark m-2 is-small"
                                                @click="openModalMedia('image')">
                                                Change Photo
                                            </a>
                                        </div>
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input type="text" placeholder="First name" v-model="firstName" />
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input type="text" placeholder="Last name" v-model="lastName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input type="email" placeholder="User Email" v-model="email" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <span class="change--password" @click="changePassword =! changePassword">
                                            Change Password</span>
                                    </b-field>
                                </div>
                                <template v-if="changePassword">
                                    <div class="col-12">
                                        <b-field class="field-group">
                                            <b-input type="password"
                                                placeholder="New Password"
                                                v-model="password" />
                                        </b-field>
                                    </div>
                                    <div class="col-12">
                                        <b-field class="field-group">
                                            <b-input type="password"
                                                placeholder="Confirm Password" v-model="confirmPassword" />
                                        </b-field>
                                        <p class="help is-danger mt-0" v-if="errorConfirmPassword">
                                            Please fill the same password.
                                        </p>
                                    </div>
                                </template>

                            </div>
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">
                                {{$t('saveChanges')}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const usersRepository = RepositoryFactory.get('users')

    import {
        mapState
    } from 'vuex';

    export default {
        name: 'userForm',
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                oldPassword: '',
                password: '',
                confirmPassword: '',
                group: '',
                groups: [],
                isLoading: false,
                errorConfirmPassword: false,
                userStatus: 'Not Active',
                status: 0,
                changePassword: false,
                policies: [],
                userPhoto: '',
                page: 1,
                limit: 100,
                breadcrumb: [{
                    link: '',
                    label: 'My Profile'
                }]
            };
        },

        computed: {
            ...mapState({
                imageSelected: state => state.media.imageSelected,
            })
        },
        created(){
            this.getMyProfile()
        },
        watch:{
            imageSelected(){
                if(this.imageSelected){
                    this.userPhoto = this.imageSelected.thumbnails.medium
                }
            }
        },
        methods: {
            resetfuild() {
                this.firstName = ''
                this.lastName = ''
                this.email = ''
                this.password = ''
                this.confirmPassword = ''
            },
            submitForm() {
                this.errorConfirmPassword = true
                this.isLoading = false
                let data = {}
                data.first_name = this.firstName
                data.last_name = this.lastName
                data.email = this.email
                if (this.imageSelected.image) {
                    data.photo = this.imageSelected.id
                }
                if (this.firstName) {
                    if(this.changePassword){
                        if (this.password === this.confirmPassword) {
                            data.password = this.password
                            this.errorConfirmPassword = false
                            this.isLoading = true
                            this.updateUser(data)
                        } else {
                            this.isLoading = false
                            this.errorConfirmPassword = true
                        }
                    } else {
                        this.isLoading = true
                        this.updateUser(data)
                    }
                }
            },


            async getMyProfile() {
                const user = await usersRepository.getMyProfile()
                this.userId = user.id
                this.firstName = user.first_name
                this.lastName = user.last_name
                this.email = user.email
                this.status = user.status
                this.password = ''
                this.confirmPassword = ''
                if (user.photo) {
                    this.userPhoto = user.photo.thumbnails.medium
                }
            },
            async updateUser(data) {
                const user = await usersRepository.updateUser(this.userId, data)
                if (user.success) {
                    this.successMessage(user.message)
                } else {
                    this.errorMessage(user[0])
                }
                this.isLoading = false
                this.password = ''
                this.confirmPassword = ''
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
            successMessage(textMessage) {
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

            openModalMedia(type) {
                this.$store.commit('openMediaImage', type)
            }

        }
    }
</script>
