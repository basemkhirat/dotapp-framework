<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <button class="button w-100" :class="{'is-primary' : checkUsers}"
                            @click="selectAllItems">
                            Select All
                        </button>
                    </div>
                    <div class="input--fuild">
                        <v-select :options="groups" v-model="group" label="name" placeholder="Sort By Group"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <v-select :options="allStatus" v-model="status" label="name" placeholder="Sort By Status"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input placeholder="Search..." type="search" icon-pack="fa" icon="search"
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
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const groupsRepository = RepositoryFactory.get('groups')
    export default {
        data() {
            return {
                group: '',
                groups: [],
                checkUsers: false,
                page: 1,
                limit: 50,
                filters: {},
                searchQuery: '',
                status: '',
                allStatus: [{
                    id: '1',
                    name: 'Active'
                }, {
                    id: '0',
                    name: 'Not Active'
                }],
            }
        },
        created() {
            this.fetchAllItems()
        },
        watch: {
            group() {
                if (this.group) {
                    this.filters.group = this.group.id
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.group = ''
                    this.$emit('featchByFilter', this.filters)
                }
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
            searchQuery() {
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            }
        },
        methods: {
            selectAllItems() {
                this.checkUsers = !this.checkUsers
                this.$emit('selectAllItems')
            },
            async fetchAllItems() {
                const groups = await groupsRepository.getAllGroups(this.page, this.limit)
                this.groups = groups.data.docs;
            },
        }
    }
</script>
