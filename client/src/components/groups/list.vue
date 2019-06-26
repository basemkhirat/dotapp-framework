<template>
    <div>
        <item  v-for="item in data" :key="item.id" :item="item"
        @fetchAllItems="fetchAllItems"
        @checkboxItem="checkboxItemStatus"
        :itemsSelected="itemsSelected"/>

        <template>
            <div class="all--actions" :class="{'show--action--bottom': itemsSelected.length}">
                <div class="wrap--content">
                    <!-- <button class="button is-warning is-rounded" @click="banItems()">Ban All Selected</button> -->
                    <button class="button is-danger is-rounded" @click="deleteItems()">Delete All Selected</button>
                </div>
            </div>
        </template>

    </div>
</template>



<script>

import Item from './ListItem'
// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const groupsRepository = RepositoryFactory.get('groups')

export default {
    props:['data', 'allItemsSelected'],
    data () {
            return {
                itemsSelected:[],
            };
        },
    components: {
        Item
    },
    watch:{
        allItemsSelected(){
            if(this.allItemsSelected){
                this.data.map(item => {
                    this.itemsSelected.push(item.id)
                })
            } else {
                 this.itemsSelected = []
            }
        },
        itemsSelected(){
            if(this.itemsSelected.length){
                this.$emit('checkButtonSelectAll', this.itemsSelected)
            }
        }
    },
    methods:{
         checkboxItemStatus(data){
            if(data.status == true){
                if(!this.itemsSelected.indexOf(data.id) > -1){
                    this.itemsSelected.push(data.id)
                }
            } else {
                if(this.itemsSelected.indexOf(data.id) > -1){
                    for(var i = 0; i < this.itemsSelected.length; i++){
                        if(this.itemsSelected[i] == data.id){
                            this.itemsSelected.splice(i, 1)
                        }
                    }
                }
            }
        },
        deleteItems(){
            this.confirmCustomDelete(this.itemsSelected)

        },
        // banItems(){
        //     for(var i = 0; i < this.itemsSelected.length; i++){
        //         this.updateGroups(this.itemsSelected[i],{status: 0})
        //         if(this.itemsSelected.length === (i + 1)){
        //            this.itemsSelected = []
        //         }
        //     }
        // },
        // Delete Items
        async deleteGroups(id) {
            const groups = await groupsRepository.deleteGroup(id)
            this.$emit('fetchAllItems')
            // this.aleartMessage(groups.message)
        },
        // Delete Items
        async deleteGroups(ids) {
            const groups = await groupsRepository.deleteGroups(ids)
            this.$emit('fetchAllItems')
            this.aleartMessage(groups.message)
        },
        // Ban Items
         async updateGroups(id, data) {
            const groups = await groupsRepository.updateGroup(id, data)
            this.$emit('fetchAllItems')
            this.aleartMessage(groups.message)
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
                title: 'Deleting Groups',
                message: 'Are you sure you want to <b>delete</b> all Groups? This action cannot be undone.',
                confirmText: 'Delete Groups',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteGroups(ids)
            })
        },
    }
}
</script>
