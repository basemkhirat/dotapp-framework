<template>
    <div class="users">
        <div class="page--title">
            <h1 class="title--text">
                Users
            </h1>
            <div class="page--title--action ml-auto" v-if="this.$route.params.id && isInUserPermissions('user.create')">
                <router-link to="/userForm" class="button is-primary is-rounded">Add New User</router-link>
            </div>
        </div>

        <!-- Breadcrumb -->
        <breadcrumb :links="breadcrumb" />

        <div class="card--block">
            <!-- <div class="card--hreader">
                <div class="card--header--title">
                    {{this.$route.params.id ? 'Update User' : 'Add New User'}}
                </div>
            </div> -->
            <div class="card--content">
                <form class="row justify-content-center" @submit.prevent="submitForm()">
                    <div class="col-12 col-lg-8 col-xl-6">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <b-field class="field-group">
                                    <div class="text-center">
                                        <div class="user--photo field-group">
                                            <img :src="userPhoto" v-if="userPhoto" class="avatar-l" alt="">
                                            <img src="./../../assets/images/user/user-128.png" v-else class="avatar-l"
                                                alt="">
                                        </div>
                                        <a class="button is-dark is-rounded m-2 is-small" @click="openModalMedia('image')">
                                            Change Photo
                                        </a>
                                    </div>
                                </b-field>
                            </div>
                            <div class="col-12 col-sm-6">
                                <b-field class="field-group">
                                    <b-input type="text" required rounded placeholder="First name"
                                        v-model="firstName" />
                                </b-field>
                            </div>
                            <div class="col-12 col-sm-6">
                                <b-field class="field-group">
                                    <b-input type="text" rounded placeholder="Last name" v-model="lastName" />
                                </b-field>
                            </div>
                            <div class="col-12">
                                <b-field class="field-group">
                                    <b-input type="email" required rounded placeholder="User Email" v-model="email" />
                                </b-field>
                            </div>

                            <div class="col-12 col-sm-6">
                                <b-field class="field-group">
                                    <v-select :options="groups" v-model="group" label="name" placeholder="Group"
                                        class="select--with--icon w-100 v--select--scroll">
                                        <template slot="option" slot-scope="option">
                                            {{ option.name }}
                                        </template>
                                    </v-select>
                                </b-field>
                            </div>
                            <div class="col-12 col-sm-6">
                                <template v-if="this.$route.params.id">
                                    <b-field class="field-group text-center"
                                        v-if="policies.indexOf('user.status') > -1">
                                        <b-switch v-model="userStatus" true-value="Active" false-value="Not Active">
                                            Active
                                        </b-switch>
                                    </b-field>
                                </template>
                                <template v-else>
                                    <b-field class="field-group text-center">
                                        <b-switch v-model="userStatus" true-value="Active" false-value="Not Active">
                                            Active
                                        </b-switch>
                                    </b-field>
                                </template>

                            </div>
                            <div class="col-12" v-if="this.$route.params.id">
                                <b-field class="field-group">
                                    <span class="change--password" @click="changePassword =! changePassword">Change
                                        Password</span>
                                </b-field>
                            </div>
                            <!-- <div class="col-12">
                                <b-field class="field-group" v-if="this.$route.params.id">
                                    <b-input minlength="7" type="password" required rounded placeholder="Old Password"
                                        v-model="oldPassword" />
                                </b-field>
                            </div> -->
                            <template v-if="changePassword">
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input minlength="7" type="password" required rounded
                                            :placeholder="this.$route.params.id ? 'New Password' : 'Password'"
                                            v-model="password" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input type="password" minlength="7" required rounded
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
                        <button class="button is-primary is-rounded"
                            :class="{'is-loading': isLoading}">{{this.$route.params.id ? 'Save Changes' : 'Add User'}}</button>
                    </div>
                </form>
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
    const groupsRepository = RepositoryFactory.get('groups')

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
                changePassword: true,
                policies: [],
                userPhoto: '',
                page: 1,
                limit: 100,
                breadcrumb: [{
                    link: '/users',
                    label: 'users'
                }, {
                    link: '',
                    label: 'add & update user'
                }]
            };
        },

        computed: {
            ...mapState({
                imageSelected: state => state.media.imageSelected,
            })
        },

        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.getUser(this.$route.params.id)
                    this.changePassword = false
                } else {
                    this.resetfuild()
                    this.changePassword = true
                }
            },
            userStatus() {
                if (this.userStatus == 'Active') {
                    this.status = 1
                } else {
                    this.status = 0
                }
            },
            status() {
                if (this.status == 1) {
                    this.userStatus = 'Active'
                } else {
                    this.userStatus = 'Not Active'
                }
            },

            imageSelected() {
                if (this.imageSelected.thumbnails) {
                    this.userPhoto = this.imageSelected.thumbnails.medium
                }
            }

        },
        created() {
            if (this.$route.params.id) {
                this.getUser(this.$route.params.id)
                this.changePassword = false
            }
            this.fetchAllItems()
        },

        methods: {
            resetfuild() {
                this.firstName = ''
                this.lastName = ''
                this.email = ''
                this.status = 0
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
                data.status = this.status
                if (this.group) {
                    data.role = this.group.id
                }
                if (this.imageSelected) {
                    data.photo = this.imageSelected.id
                }
                if (this.firstName && this.email && this.password && this.confirmPassword) {
                    data.password = this.password
                    if (this.password === this.confirmPassword) {
                        this.errorConfirmPassword = false
                        this.isLoading = true
                        if (this.$route.params.id) {
                            this.updateUser(this.$route.params.id, data)
                        } else {
                            this.newUser(data)
                        }

                    } else {
                        this.isLoading = false
                        this.errorConfirmPassword = true
                    }
                } else if (this.firstName && this.email && this.$route.params.id) {
                    this.isLoading = true
                    this.updateUser(this.$route.params.id, data)
                }
            },


            async newUser(data) {
                const user = await usersRepository.newUser(data)
                if (user.success) {
                    this.successMessage(user.message)
                    this.$router.push('/userForm/' + user.data)
                } else {
                    this.errorMessage(user[0])
                }
                this.isLoading = false
            },

            async getUser(data) {
                const user = await usersRepository.getUser(data)
                this.firstName = user.first_name
                this.lastName = user.last_name
                this.email = user.email
                this.status = user.status
                this.password = ''
                this.confirmPassword = ''
                this.policies = user.policies
                if (user.role) {
                    this.group = user.role
                }
                if (user.photo) {
                    this.userPhoto = user.photo.url
                }
            },
            async updateUser(id, data) {
                const user = await usersRepository.updateUser(id, data)
                if (user.success) {
                    this.successMessage(user.message)
                } else {
                    this.errorMessage(user[0])
                }
                // this.$store.dispatch('checkUserData');
                this.isLoading = false
                this.password = ''
                this.confirmPassword = ''
            },
            // Groups
            async fetchAllItems() {
                const groups = await groupsRepository.getAllGroups(this.page, this.limit)
                this.groups = groups.data.docs;
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
