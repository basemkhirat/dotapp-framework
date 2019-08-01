<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <button class="button w-100" :class="{'is-primary' : checkItem}"
                            @click="selectAllItems">
                            {{$t('selectAll')}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <v-select :options="orderOptions" :clearable="false"
                        v-model="order" label="title" class="select--with--icon w-100 w-fuild-md v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.title }}
                            </template>
                        </v-select>
                    </div>

                    <div class="input--fuild">
                        <v-select :options="allStatus" v-model="status" label="name" :placeholder="$t('sortByStatus')"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + '...'" type="search" icon-pack="fa" icon="search"
                                v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const categoriesRepository = RepositoryFactory.get('categories')
    export default {
        props: ['allItemChecked'],
        data() {
            return {
                status: '',
                checkItem: false,
                searchQuery: '',
                filters: {categories: []},
                allStatus: [{
                    id: '1',
                    name: this.$t('published')
                }, {
                    id: '0',
                    name: this.$t('notPublished')
                }],
                page: 1,
                limit: 100,

                order: { "title": this.$t('aecent'), "value": "desc" },
                orderOptions : [
                    {
                        title: this.$t('aecent'),
                        value: 'desc'
                    },
                    {
                        title: this.$t('recent'),
                        value: 'asc'
                    }
                ],
            }
        },
        watch: {
            allItemChecked() {
                if (this.allItemChecked == 0) {
                    this.checkItem = false
                }
            },
            // Search Query
            searchQuery() {
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            },
            // Status
            status() {
                if (this.status) {
                    this.filters.status = this.status.id
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.status = ''
                    this.$emit('featchByFilter', this.filters)
                }
            },
            // Order
            order(){
                this.filters.order = this.order.value
                this.$emit('featchByFilter', this.filters)
            },

        },
        methods: {
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems', this.checkItem)
            },
        }
    }
</script>
