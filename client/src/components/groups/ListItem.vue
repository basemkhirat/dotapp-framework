<template>
    <div class="block--item" v-if="item.policies.indexOf('role.view') > -1">
        <div class="row align-items-center">
                <div class="item--checkbox">
                    <b-checkbox v-model="checkItemSelected" @input="updateCheckbox(item.id)" :native-value="item.id">
                    </b-checkbox>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-users"></i>
                        </span>
                        {{item.usersCount}} <span class="mx-1">User</span>
                    </div>
                </div> -->
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-clock"></i>
                        </span>
                        {{item.created}}
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text text-md-center">
                        <b-tag type="is-success" v-if="item.status">Published</b-tag>
                        <b-tag  type="is-danger" v-else>Not Published</b-tag>
                    </div>
                </div> -->
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text text-md-center">
                        ({{item.permissions.length}}) {{$t('permissions')}}
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-xl -1 table--item">
                    <div class="item--text text-md-center" v-if="item.policies.indexOf('role.update') > -1">
                        <div class="field">
                            <b-switch v-model="item.status" :true-value="1" :false-value="0" @input="changeStatus(item.id, item.status)">
                                {{$t('active')}}
                            </b-switch>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-12 col-xl item--text table--item">
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
            deleteItem(id) {
                this.confirmCustomDelete(id)
            },
            updateCheckbox() {
                this.$emit('checkboxItem', {id: this.item.id, status: this.checkItemSelected})
            },
            // Change Status
            changeStatus(id, status) {
                this.updateGroup(id, {status: status})
            },
            async updateGroup(id, data) {
                const group = await groupsRepository.updateGroup(id, data)

                if (group.success) {
                    this.successMessage(group.message)
                } else {
                    this.errorMessage(group[0])
                }
            },
            async deleteGroup(id) {
                const group = await groupsRepository.deleteGroup(id)
                if (group.success) {
                    this.successMessage(group.message)
                    this.$emit('fetchAllItems')
                } else {
                    this.errorMessage(group[0])
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


            aleartMessage(textMessage) {
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
                    title: this.$t('groupsPage.messages.deleteGroup.title'),
                    message: this.$t('groupsPage.messages.deleteGroup.message'),
                    confirmText: this.$t('groupsPage.messages.deleteGroup.confirmText'),
                    cancelText: this.$t('groupsPage.messages.deleteGroup.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteGroup(id)
                })
            }
        }
    }
</script>
