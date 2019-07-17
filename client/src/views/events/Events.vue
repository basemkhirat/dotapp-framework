<template>
    <div class="events">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Events
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                    <div class="page--title--action ml-auto" v-if="isInUserPermissions('event.manage')">
                        <router-link to="/eventForm" class="button is-primary">Add New Event</router-link>
                    </div>
                </div>
            </div>
        </div>


        <div class="wrap--content">
            <div class="card-filter--herader">
                <filter-items @selectAllItems="selectAllItems" @featchByFilter="featchByFilter"
                    :allItemChecked="allItemChecked" />
            </div>
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
            <template v-else>
                <list @fetchAllItems="fetchAllItems" :allItemsSelected="allItemsSelected"
                    @checkButtonSelectAll="checkButtonSelectAll" :data="events" v-if="events.length" />
                <template v-else>
                    <no-data text="No events have been created"/>
                </template>
            </template>
            <template v-if="events.length">
                <div class="pagination--custom--number">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>

        </div>
    </div>
</template>

<script>
    import List from '../../components/events/list'
    import FilterItems from '../../components/events/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const eventsRepository = RepositoryFactory.get('events')

    export default {
        name: 'events',
        data() {
            return {
                events: [],
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 1,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: 'events'
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
                const events = await eventsRepository.getAllEvents(this.page, this.limit, filters)
                this.events = events.data.docs;
                this.total = events.data.total;
                this.dataLoading = false;
            },
            // Filters
            featchByFilter(filters) {
                this.fetchAllItems(filters)
            }

        }
    }
</script>
