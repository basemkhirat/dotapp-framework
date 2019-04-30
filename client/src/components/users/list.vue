<template>
    <div>
        <item  v-for="user in data" :key="user.id" :user="user" @checkboxUser="checkboxUserStatus"/>
         
        <template>
            <div class="alluser--action" :class="{'show--action--bottom': usersSelected.length}">
                <button class="button is-warning is-rounded">Ban All Selected</button>
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
            for(var i = 0; i < this.usersSelected.length; i++){
                // this.deleteUser(this.usersSelected[i])
                if(this.usersSelected.length === (i + 1)){
                   this.usersSelected = []
                }
            }
        },
        // Delete Items
        async deleteUser(id) {
            const user = await usersRepository.deleteUser(id)
            this.$emit('fetchAllUsers')
            this.aleartMessage()
        },
        aleartMessage(){
            this.$snackbar.open({
                message: 'user has been successfully Deleted',
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
