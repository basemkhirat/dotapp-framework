<template>
    <div class="block--item" v-if="item">
        <div class="row align-items-center">
                <div class="item--checkbox">
                    <b-checkbox v-model="checkItemSelected" @input="updateCheckbox(item.id)" :native-value="item.id">
                    </b-checkbox>
                </div>
                <div class="col-12 col-sm-6 col-xl">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.name}} 
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-users"></i>
                        </span>
                        {{item.usersCount}} <span class="mx-1">User</span>
                    </div>
                </div> -->
                <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-clock"></i>
                        </span>
                        {{item.created}}
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text text-center">
                        <b-tag rounded type="is-success" v-if="item.status">Published</b-tag>
                        <b-tag rounded  type="is-danger" v-else>Not Published</b-tag>
                    </div>
                </div> -->
                <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text text-center">
                        ({{item.permissions.length}}) Permissions
                    </div>
                </div>
            
                <div class="col-12 col-sm-12 col-xl item--text">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <router-link :to="'/groupForm/' + item.id" v-if="item.policies.indexOf('role.update') > -1" class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                            <button class="button--circle is-danger-light" @click="deleteItem(item.id)" v-if="item.policies.indexOf('role.delete') > -1"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>

     // Repository Data
     import { RepositoryFactory } from '../../repositories/RepositoryFactory'
     const groupsRepository = RepositoryFactory.get('groups')
    export default {
        props: ['item', 'itemsSelected'],
        data () {
            return {
                checkItemSelected: false,
            };
        },
        watch:{
            itemsSelected(){
                if(this.itemsSelected.length){
                     this.itemsSelected.map(item => {
                        if(item == this.item.id){
                            this.checkItemSelected = true
                        }
                    })
                } else {
                     this.checkItemSelected = false
                }
               
            }
        },
        methods: {
            deleteItem(id){
                this.confirmCustomDelete(id)
            },
            updateCheckbox(){
                this.$emit('checkboxItem', {id: this.item.id, status: this.checkItemSelected})
            },
            async updateGroup(id, data) {
                const group = await groupsRepository.updateGroup(id, data)
                this.aleartMessage(group.message)
            },
            async deleteGroup(id) {
                const group = await groupsRepository.deleteGroup(id)
                this.aleartMessage(group.message)
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
            confirmCustomDelete(id) {
                this.$dialog.confirm({
                    title: 'Deleting Group',
                    message: 'Are you sure you want to <b>delete</b> This Group? This action cannot be undone.',
                    confirmText: 'Delete Group',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteGroup(id)
                })
            }
        }
    }
</script>