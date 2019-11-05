
<template>
    <!-- Editor Content -->
    <div class="card--block card--feed">
        <div class="card-header">
            <p class="card-header-title">
                <span class="icon">
                    <i class="far fa-newspaper"></i>
                </span>
                {{$t('dashboardPage.latestVideos')}}
            </p>
        </div>

        <div class="card--content">
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
            <template v-else>
                <b-table
                    :data="posts"
                    class="no--header table--feed"
                    :paginated="false"
                    v-if="posts.length"
                >
                    <template slot-scope="props">
                        <b-table-column width="100" class="thumbnail--post--content">
                            <div class="thumbnail--post" v-if="props.row.media">
                                <router-link
                                    :to="'/postForm/' + props.row.id"
                                    v-if="props.row.policies.indexOf('post.update') > -1"
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
                                    :to="'/postForm/' + props.row.id"
                                    v-if="props.row.policies.indexOf('post.update') > -1"
                                >{{props.row.title}}</router-link>
                                <template v-else>{{props.row.title}}</template>
                            </div>

                            <div class="post--date">
                                <span class="icon">
                                    <i class="fas fa-clock"></i>
                                </span>
                                {{props.row.created}}
                            </div>
                        </b-table-column>
                        <b-table-column centered>
                            <div class="text--title">
                                <b-tag type="is-success" v-if="props.row.status === 1">
                                    {{$t('published')}}
                                </b-tag>
                                <b-tag type="is-danger" v-else>
                                    {{$t('notPublished')}}
                                </b-tag>
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
                    <no-data text="No posts have been created" />
                </template>
            </template>
        </div>
    </div>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const postsRepository = RepositoryFactory.get("posts");

export default {
    data() {
        return {
            page: 1,
            limit: 5,
            posts: [],
            dataLoading: false
        };
    },
    created() {
        this.fetchAllItems();
    },
    methods: {
        // Get Latest Posts
        async fetchAllItems() {
            this.dataLoading = true;
            const posts = await postsRepository.getAllPosts(
                this.page,
                this.limit,{format: 'video'},
                "post"
            );
            this.posts = posts.data.docs;
            this.dataLoading = false;
        }
    }
};
</script>
