<template>
    <div class="block--item">
        <div class="row align-items-center">

            <div class="item--checkbox">
                <b-checkbox v-model="checkItemSelected" @input="updateCheckbox(item.id)" :native-value="item.id">
                </b-checkbox>
            </div>

            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        <router-link :to="`/categories/${item.id}`">
                            {{item.name}}
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        {{item.description}}
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-clock"></i>
                    </span>
                    {{item.created}}
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-th-large"></i>
                    </span>
                    {{$t('children')}}
                    ({{item.children.length}})
                </div>
            </div>

            <div class="col-12 col-sm-12 col-xl item--text table--item">
                <div class="all--item--action d-flex align-item-center">
                    <div class="all--item--action d-flex align-item-center">
                        <router-link :to="'/categoryForm/' + item.id"
                            v-if="item.policies.indexOf('category.update') > -1"
                            class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                        <button class="button--circle is-danger-light" @click="deleteItem(item.id)"
                            v-if="item.policies.indexOf('category.delete') > -1"><i class="fas fa-trash"></i></button>
                    </div>
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
    const categoriesRepository = RepositoryFactory.get('categories')
    export default {
        props: ['item', 'itemsSelected'],
        data() {
            return {
                checkItemSelected: false,
            };
        },
        watch: {
            itemsSelected() {
                if (this.itemsSelected.length) {
                    this.itemsSelected.map(item => {
                        if (item == this.item.id) {
                            this.checkItemSelected = true
                        }
                    })
                } else {
                    this.checkItemSelected = false
                }
            },
            '$route' (to, from) {
                this.fetchAllItems()
            }
        },
        methods: {
            deleteItem(id) {
                this.confirmCustomDelete(id)
            },
            updateCheckbox() {
                this.$emit('checkboxItem', {
                    id: this.item.id,
                    status: this.checkItemSelected
                })
            },
            async updateCategory(id, data) {
                const category = await categoriesRepository.updateCategory(id, data)
                this.aleartMessage(category.message)
            },
            async deleteCategory(id) {
                const category = await categoriesRepository.deleteCategory(id)
                this.aleartMessage(category.message)
                this.$emit('fetchAllItems')
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
                    title: this.$t('categoriesPage.messages.deleteCategory.title'),
                    message: this.$t('categoriesPage.messages.deleteCategory.message'),
                    confirmText: this.$t('categoriesPage.messages.deleteCategory.confirmText'),
                    cancelText: this.$t('categoriesPage.messages.deleteCategory.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteCategory(id)
                })
            }
        }
    }
</script>
