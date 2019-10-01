<template>
    <div class="statistics">
        <div class="row">
            <div class="col-12 col-sm-6 col-md-3 col-lg-6 pr-2">
                <div class="card--block">
                    <div class="statistics--content">
                        <span class="statistics--icon is-primary-light">
                            <i class="far fa-user"></i>
                        </span>
                        <div class="text-center">
                            <p class="statistics--title">{{$t('dashboardPage.statistics.users')}}</p>
                            <p class="statistics--number">{{usersTotal}}</p>
                        </div>
                    </div>
                    <template v-if="chartUsersData">
                        <trend
                            :data="chartUsersData"
                            :gradient="['#89f7fe', '#66a6ff']"
                            auto-draw
                            smooth
                            :height="68"
                            :padding="0"
                            >
                        </trend>
                    </template>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 col-lg-6 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                        <span class="statistics--icon is-success-light">
                            <i class="far fa-newspaper"></i>
                        </span>
                        <div class="text-center">
                            <p class="statistics--title">{{$t('dashboardPage.statistics.posts')}}</p>
                            <p class="statistics--number">{{postsTotal}}</p>
                        </div>
                    </div>
                    <template v-if="chartPostsData">
                        <trend
                            :data="chartPostsData"
                            :gradient="['#84fab0', '#8fd3f4']"
                            auto-draw
                            smooth
                            :height="68"
                            :padding="0"
                            >
                        </trend>
                    </template>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 col-lg-6 pr-2">
                <div class="card--block">
                    <div class="statistics--content">
                        <span class="statistics--icon is-warning-light">
                            <i class="far fa-clone"></i>
                        </span>
                        <div class="text-center">
                            <p class="statistics--title">{{$t('dashboardPage.statistics.media')}}</p>
                            <p class="statistics--number">{{mediaTotal}}</p>
                        </div>
                    </div>
                    <template v-if="chartMediaData">
                        <trend
                            :data="chartMediaData"
                            :gradient="['#f6d365', '#fda085']"
                            auto-draw
                            smooth
                            :height="68"
                            :padding="0"
                            >
                        </trend>
                    </template>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 col-lg-6 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                        <span class="statistics--icon is-purple-light">
                            <i class="fas fa-tags"></i>
                        </span>
                        <div class="text-center">
                            <p class="statistics--title">{{$t('tags')}}</p>
                            <p class="statistics--number">{{tagsTotal}}</p>
                        </div>
                    </div>
                    <template v-if="chartTagsData">
                        <trend
                            :data="chartTagsData"
                            :gradient="['#6a11cb', '#2575fc']"
                            auto-draw
                            smooth
                            :height="68"
                            :padding="0"
                            >
                        </trend>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const postsRepository = RepositoryFactory.get("posts");
const tagRepository = RepositoryFactory.get("tags");
const usersRepository = RepositoryFactory.get("users");
const mediaRepository = RepositoryFactory.get("media");

const chartsRepository = RepositoryFactory.get("charts");


import Vue from "vue"
import Trend from "vuetrend"

Vue.use(Trend)

export default {
    data() {
        return {
            usersTotal: null,
            tagsTotal: null,
            postsTotal: null,
            mediaTotal: null,
            page: 1,
            limit: 0,
            chartMediaData: [],
            chartTagsData: [],
            chartPostsData: [],
            chartUsersData: [],
        };
    },
    created() {
        this.getAllStatistics();
        this.getAllChart();
    },
    methods: {
        //  getAllStatistics() {
        //      this.getAllPosts()
        //  },
        async getAllStatistics() {

            const posts = await postsRepository.getAllPosts(
                this.page,
                this.limit,
                "filters",
                "post"
            );
            if (posts.success) {
                this.postsTotal = posts.data.total;
            }

            const tags = await tagRepository.getAllTags(
                this.page,
                this.limit
            );
            this.tagsTotal = tags.data.total;

            const users = await usersRepository.getAllUsers(
                this.page,
                this.limit
            );
            this.usersTotal = users.total;

            const media = await mediaRepository.getAllMedia(
                this.page,
                this.limit
            );
            this.mediaTotal = media.total;
        },

        async getAllChart() {

            const chartPostsData = await chartsRepository.getChartData(
                "post",
                "weeks",
                "7"
            );
            this.chartPostsData = chartPostsData.map(function(item) {
                return item.total;
            });
            const chartUsersData = await chartsRepository.getChartData(
                "user",
                "weeks",
                "7"
            );
            this.chartUsersData = chartUsersData.map(function(item) {
                return item.total;
            });
            const chartTagsData = await chartsRepository.getChartData(
                "tag",
                "weeks",
                "7"
            );
            this.chartTagsData = chartTagsData.map(function(item) {
                return item.total;
            });

            const chartMediaData = await chartsRepository.getChartData(
                "media",
                "weeks",
                "7"
            );
            this.chartMediaData = chartMediaData.map(function(item) {
                return item.total;
            });
        }
    }
};
</script>

<style>
</style>
