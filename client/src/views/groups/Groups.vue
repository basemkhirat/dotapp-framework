<template>
    <div class="groups">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('groups')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                    <div class="page--title--action ml-auto" v-if="isInUserPermissions('role.create')">
                        <router-link to="/groupForm" class="button is-primary">{{$t('groupsPage.addNewGroup')}}</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">

            <div class="card-filter--herader">
                <filter-items @featchByFilter="featchByFilter" @selectAllItems="selectAllItems"
                    :allItemChecked="allItemChecked" />
            </div>
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
            <template v-else>
                <list @fetchAllItems="fetchAllItems" :allItemsSelected="allItemsSelected"
                    @checkButtonSelectAll="checkButtonSelectAll" :data="groups" v-if="groups.length" />
                <template v-else>
                    <no-data :text="$t('groupsPage.messages.noData')"/>
                </template>
            </template>
            <template v-if="groups.length">
                <div class="pagination--custom--number">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>

        </div>

    </div>
</template>

<script>
    import List from '../../components/groups/list'
    import FilterItems from '../../components/groups/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const groupsRepository = RepositoryFactory.get('groups')

    export default {
        name: 'groups',
        data() {
            return {
                groups: [],
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 10,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t('groupsPage.breadcrumb[0]')
                }]
            };
        },
        components: {
            List,
            FilterItems,
        },
        created() {
            this.fetchAllItems()
        },
        watch: {
            page() {
                this.fetchAllItems()
            }
        },
        methods: {
            selectAllItems(checkButton) {
                if (checkButton) {
                    this.allItemsSelected = true
                } else {
                    this.allItemsSelected = false
                }
                // this.allItemsSelected =! this.allItemsSelected
            },
            // Check Button Select All Active Or Not
            checkButtonSelectAll(data) {
                this.allItemChecked = data
            },
            async fetchAllItems(filters) {
                this.dataLoading = true
                const groups = await groupsRepository.getAllGroups(this.page, this.limit, filters)
                this.groups = groups.data.docs;
                this.total = groups.data.total;
                this.dataLoading = false;
            },

            // Filters
            featchByFilter(filters) {
                this.fetchAllItems(filters)
            }

        }
    }
</script>
