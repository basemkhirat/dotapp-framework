<template>
    <div>
        <item  v-for="user in data" :key="user.id" :user="user"
        @fetchAllItems="fetchAllItems"
        @checkboxUser="checkboxUserStatus"
        :usersSelected="usersSelected"/>

        <template>
            <div class="all--actions" :class="{'show--action--bottom': usersSelected.length}">
                <div class="wrap--content">
                    <button class="button is-warning" @click="confirmCustomUpdate()">{{$t('banAllSelected')}}</button>
                    <button class="button is-danger" @click="deleteItems()">{{$t('deleteAllSelected')}}</button>
                </div>
            </div>
        </template>

    </div>
</template>



<script>

import Item from './ListItem'
// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const usersRepository = RepositoryFactory.get('users')

export default {
    props:['data', 'allUserSelected'],
    data () {
            return {
                usersSelected:[],
            };
        },
    components: {
        Item
    },
    watch:{
        allUserSelected(){
            if(this.allUserSelected){
                this.data.map(item => {
                    this.usersSelected.push(item.id)
                })
            } else {
                 this.usersSelected = []
            }
        },
        usersSelected(){
            if(this.usersSelected){
                this.$emit('checkButtonSelectAll', this.usersSelected)
            }
        }

    },
    methods:{
         checkboxUserStatus(data){
            if(data.status == true){
                if(!this.usersSelected.indexOf(data.id) > -1){
                    this.usersSelected.push(data.id)
                }
            } else {
                if(this.usersSelected.indexOf(data.id) > -1){
                    for(var i = 0; i < this.usersSelected.length; i++){
                        if(this.usersSelected[i] == data.id){
                            this.usersSelected.splice(i, 1)
                        }
                    }
                }
            }
        },
        deleteItems(){
             this.confirmCustomDelete(this.usersSelected)
        },

        // Delete Items
        async deleteUser(id) {
            const user = await usersRepository.deleteUser(id)
            this.$emit('fetchAllItems')
            this.aleartMessage(user.message)
        },
        async deleteUsers(ids) {
            const users = await usersRepository.deleteUsers(ids)
            this.$emit('fetchAllItems')
            this.aleartMessage(users.message)
        },
        // Ban Items
        async activeItems() {
            const users = await usersRepository.updateUsers(this.usersSelected)
            this.$emit('fetchAllItems')
            this.aleartMessage(users.message)
        },
         async updateUser(id, data) {
            const user = await usersRepository.updateUser(id, data)
            this.$emit('fetchAllItems')
            this.aleartMessage(user.message)
        },
        fetchAllItems(){
            this.$emit('fetchAllItems')
        },
        aleartMessage(textMessage){
            this.$snackbar.open({
                message: textMessage,
                type: 'is-success',
                position: 'is-bottom-right',
                actionText: 'OK',
                queue: false,
                duration: 3000,
                indefinite: false,
            })
        },
        confirmCustomDelete(ids) {
            this.$dialog.confirm({
                title: this.$t('usersPage.messages.deleteUsers.title'),
                message: this.$t('usersPage.messages.deleteUsers.message'),
                confirmText: this.$t('usersPage.messages.deleteUsers.confirmText'),
                cancelText: this.$t('usersPage.messages.deleteUsers.cancelText'),
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteUsers(ids)
            })
        },
        confirmCustomUpdate() {
            this.$dialog.confirm({
               title: this.$t('usersPage.messages.banUsers.title'),
                message: this.$t('usersPage.messages.banUsers.message'),
                confirmText: this.$t('usersPage.messages.banUsers.confirmText'),
                cancelText: this.$t('usersPage.messages.banUsers.cancelText'),
                type: 'is-primary',
                icon: 'information-outline',
                hasIcon: true,
                onConfirm: () => this.activeItems()
            })
        }
    }
}
</script>
