<template>
    <div>
        <item  v-for="user in data" :key="user.id" :user="user" 
        @fetchAllItems="fetchAllItems"
        @checkboxUser="checkboxUserStatus" 
        :usersSelected="usersSelected"/>
         
        <template>
            <div class="alluser--action" :class="{'show--action--bottom': usersSelected.length}">
                <button class="button is-warning is-rounded" @click="banItems()">Ban All Selected</button>
                <button class="button is-danger is-rounded" @click="deleteItems()">Delete All Selected</button>
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
            // for(var i = 0; i < this.usersSelected.length; i++){
            //     this.deleteUser(this.usersSelected[i])
            //     if(this.usersSelected.length === (i + 1)){
            //        this.usersSelected = []
            //     }
            // }
             this.deleteUsers(this.usersSelected)
        },
        banItems(){
            for(var i = 0; i < this.usersSelected.length; i++){
                this.updateUser(this.usersSelected[i],{status: 0})
                if(this.usersSelected.length === (i + 1)){
                   this.usersSelected = []
                }
            }
        },
        // Delete Items
        async deleteUser(id) {
            const user = await usersRepository.deleteUser(id)
            this.$emit('fetchAllItems')
            this.aleartMessage()
        },
        async deleteUsers(ids) {
            const users = await usersRepository.deleteUsers(ids)
            // this.$emit('fetchAllItems')
            // this.aleartMessage()
        },
        // Ban Items
        // async banItems(id) {
        //     const user = await usersRepository.deleteUser(id)
        //     this.$emit('fetchAllItems')
        //     this.aleartMessage()
        // },
         async updateUser(id, data) {
             console.log(id, data)
            const user = await usersRepository.updateUser(id, data)
            console.log(user)
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
        }
    }
}
</script>
