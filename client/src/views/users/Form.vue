<template>
    <div class="users">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('users')}}
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                    <div class="page--title--action ml-auto"
                        v-if="this.$route.params.id && isInUserPermissions('user.create')">
                        <router-link to="/userForm" class="button is-primary ">{{$t('usersPage.addNewUser')}}</router-link>
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
                                            <a class="button is-dark  m-2 is-small"
                                                @click="openModalMedia('image')">
                                                {{$t('changePhoto')}}
                                            </a>
                                        </div>
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input  :placeholder="$t('firstName')" v-model="firstName" />
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input :placeholder="$t('lastName')" v-model="lastName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input type="email" :placeholder="$t('email')" v-model="email" />
                                    </b-field>
                                </div>

                                <div class="col-12" v-if="!this.$route.params.id">
                                    <b-field class="field-group">
                                        <v-select :options="groups" v-model="group" label="name" :placeholder="$t('group')"
                                            class="select--with--icon w-100 v--select--scroll">
                                            <template slot="option" slot-scope="option">
                                                {{ option.name }}
                                            </template>
                                        </v-select>
                                    </b-field>
                                </div>
                                <div class="col-12" v-else-if="policies.indexOf('user.status') > -1 && this.$route.params.id">
                                    <b-field class="field-group">
                                        <v-select :options="groups" v-model="group" label="name" :placeholder="$t('group')"
                                            class="select--with--icon w-100 v--select--scroll">
                                            <template slot="option" slot-scope="option">
                                                {{ option.name }}
                                            </template>
                                        </v-select>
                                    </b-field>
                                </div>

                                <div class="col-12" v-if="this.$route.params.id">
                                    <b-field class="field-group">
                                        <span class="change--password" @click="changePassword =! changePassword">
                                            {{$t('changePassword')}}
                                            </span>
                                    </b-field>
                                </div>
                                <template v-if="changePassword">
                                    <div class="col-12">
                                        <b-field class="field-group">
                                            <b-input type="password"
                                                :placeholder="this.$route.params.id ? this.$t('newPassword') : this.$t('password')"
                                                v-model="password" />
                                        </b-field>
                                    </div>
                                    <div class="col-12">
                                        <b-field class="field-group">
                                            <b-input type="password"
                                                :placeholder="$t('confirmPassword')" v-model="confirmPassword" />
                                        </b-field>
                                        <p class="help is-danger mt-0" v-if="errorConfirmPassword">
                                            {{$t('usersPage.messages.samePassword')}}
                                        </p>
                                    </div>
                                </template>

                            </div>
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary "
                                :class="{'is-loading': isLoading}">{{this.$route.params.id ? this.$t('saveChanges') : this.$t('add')}}</button>
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
                    label: this.$t('usersPage.breadcrumb[0]')
                }, {
                    link: '',
                    label: this.$t('usersPage.breadcrumb[1]')
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
                if (this.group) {
                    data.role = this.group.id
                }
                if (this.imageSelected) {
                    data.photo = this.imageSelected.id
                }
                if(this.$route.params.id){
                    if(this.changePassword){
                        data.password = this.password
                        if (this.password === this.confirmPassword) {
                            this.errorConfirmPassword = false
                            this.isLoading = true
                            this.updateUser(this.$route.params.id, data)

                        } else {
                            this.isLoading = false
                            this.errorConfirmPassword = true
                        }
                    } else {
                        this.updateUser(this.$route.params.id, data)
                    }

                } else {
                    data.password = this.password
                    if (this.password === this.confirmPassword) {
                        this.errorConfirmPassword = false
                        this.isLoading = true
                         this.newUser(data)
                    } else {
                        this.isLoading = false
                        this.errorConfirmPassword = true
                    }


                }
                if (this.firstName) {

                } else if (this.$route.params.id) {
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
