<template>
    <div class="block--item" v-if="user">
        <div class="row align-items-center">
            <div class="item--checkbox">
                <b-checkbox v-model="userSelected" @input="updateCheckbox(user.id)" :native-value="user.id">
                </b-checkbox>
            </div>
            <div class="col-12 col-sm-6 col-xl">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="item--avatar--img">
                        <template v-if="user.photo">
                            <img :src="user.photo.thumbnails.small" :alt="user.photo.title">
                        </template>
                        <img src="./../../assets/images/user/64.png">
                    </div>
                    <div class="text--title text-capitalize">
                        {{user.first_name}}
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-envelope"></i>
                    </span>
                    {{user.email}}
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-clock"></i>
                    </span>
                    {{user.created}}
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl">
                <div class="item--text">
                    <template v-if="user.role">
                        <span class="icon">
                            <i class="fas fa-award"></i>
                        </span>
                        {{user.role.name}}
                    </template>
                    <template v-else>
                        --------
                    </template>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-1">
                <div class="item--text text-center">
                    <div class="field">
                        <b-switch v-model="userStatus" true-value="Active" false-value="Not Active">
                            {{userStatus}}
                        </b-switch>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-xl item--text">
                <div class="all--item--action d-flex align-item-center">
                    <button class="button--circle is-primary-light"><i class="fas fa-pen"></i></button>
                    <button class="button--circle is-danger-light"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

     // Repository Data
     import { RepositoryFactory } from '../../repositories/RepositoryFactory'
     const usersRepository = RepositoryFactory.get('users')
    export default {
        props: ['user', 'usersSelected'],
        data () {
            return {
                userSelected: false,
                userStatus: this.user.status == 1? 'Active' : 'Not Active'
            };
        },
        watch:{
            userStatus(){
                let data = {}
                if(this.userStatus == 'Active'){
                    data.status = 1
                } else {
                    data.status = 0
                }
                this.updateUser(this.user.id, data)
            },
            usersSelected(){
                if(this.usersSelected.length){
                     this.usersSelected.map(item => {
                        if(item == this.user.id){
                            this.userSelected = true
                        }
                    })
                } else {
                     this.userSelected = false
                }
               
            }
        },
        methods: {
            updateCheckbox(){
                this.$emit('checkboxUser', {id: this.user.id, status: this.userSelected})
            },
            async updateUser(id, data) {

                const user = await usersRepository.updateUser(id, data)
                // console.log(user)
                // this.isLoading = false
                this.aleartMessage()
            },
            aleartMessage(){
                this.$snackbar.open({
                    message: 'user has been successfully updated',
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 3000,
                    indefinite: false,
                })
            }
        }
    }
</script>