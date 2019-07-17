<template>
    <!-- Editor Content -->
    <div class="card--block card--feed">
        <div class="card-header">
            <p class="card-header-title">
                <span class="icon">
                    <i class="far fa-calendar-alt"></i>
                </span>
                Latest Events
            </p>
        </div>

        <div class="card--content">
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
            <template v-else>
                <b-table
                    :data="events"
                    class="no--header table--feed"
                    :paginated="false"
                    v-if="events.length"
                >
                    <template slot-scope="props">
                        <b-table-column width="100" class="thumbnail--post--content">
                            <div class="thumbnail--post" v-if="props.row.media">
                                <router-link
                                    :to="'/eventForm/' + props.row.id"
                                    v-if="props.row.policies.indexOf('event.manage') > -1"
                                >
                                    <img
                                        :src="props.row.media.thumbnails.medium"
                                        :alt="props.row.title"
                                    />
                                </router-link>
                                <img
                                    v-else
                                    :src="props.row.media.thumbnails.medium"
                                    :alt="props.row.title"
                                />
                            </div>
                            <div class="placeholder-img thumbnail--post" v-else>
                                <img src="../../assets/images/img-placeholder.png" />
                            </div>
                        </b-table-column>

                        <b-table-column>
                            <div class="post--title">
                                <router-link
                                    :to="'/eventForm/' + props.row.id"
                                    v-if="props.row.policies.indexOf('event.manage') > -1"
                                >{{props.row.title}}</router-link>
                                <template v-else>{{props.row.title}}</template>
                            </div>

                            <div class="post--date">
                                <span class="icon">
                                    <i class="far fa-calendar-alt"></i>
                                </span>
                                {{props.row.scheduled}}
                            </div>
                        </b-table-column>
                        <b-table-column centered>
                            <div class="text--title">
                                <b-tag type="is-success" v-if="props.row.status === 1">Published</b-tag>
                                <b-tag type="is-danger" v-else>Not Published</b-tag>
                            </div>
                        </b-table-column>

                        <b-table-column>
                            <div class="item--text" v-if="props.row.place">
                                <span class="icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </span>
                                {{props.row.place | address}}
                            </div>
                        </b-table-column>
                        <b-table-column centered>
                            <div
                                class="block--item--title d-flex align-items-center justify-content-center item--text"
                            >
                                <div class="text--title">
                                    <b-tag type="is-warning" v-if="props.row.type === 'free'">Free</b-tag>
                                    <b-tag type="is-info" v-else>Paid</b-tag>
                                </div>
                            </div>
                        </b-table-column>
                        <b-table-column centered>
                            <div
                                class="block--item--title d-flex align-items-center item--text created--by"
                            >
                                <span class="icon">
                                    <i class="fas fa-user"></i>
                                </span>
                                <div
                                    class="text--title text-capitalize"
                                >{{props.row.user.first_name + ' ' + props.row.user.last_name}}</div>
                            </div>
                        </b-table-column>
                    </template>
                </b-table>
                <template v-else>
                    <no-data text="No events have been created" />
                </template>
            </template>
        </div>
    </div>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const eventsRepository = RepositoryFactory.get("events");

export default {
    data() {
        return {
            page: 1,
            limit: 5,
            events: [],
            dataLoading: false
        };
    },
    created() {
        this.fetchAllItems();
    },
    methods: {
        // Get Latest events
        async fetchAllItems() {
            this.dataLoading = true;
            const events = await eventsRepository.getAllEvents(
                this.page,
                this.limit
            );
            this.events = events.data.docs;
            this.dataLoading = false;
        }
    }
};
</script>
