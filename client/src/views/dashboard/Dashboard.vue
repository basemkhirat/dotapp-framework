<template>
    <div class="dashboard">
        <!-- Page Head -->
        <!-- <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('dashboardPage.pageName')}}
                        </h1>
                        <breadcrumb :links="breadcrumb" />
                    </div>
                    <div class="page--title--action ml-auto">
                    </div>
                </div>
            </div>
        </div> -->

        <div class="wrap--content">
            <div class="row">
                <div class="col-12 col-sm-12 col-lg-8">
                    <DashboardChart/>
                </div>
                <div class="col-12 col-sm-12 col-lg-4">
                    <statistics />
                </div>
                <!-- Posts Card -->
                <div class="col-12 col-sm-12 col-xl-6">
                    <posts-card />
                </div>
                <!-- Videos Card -->
                <div class="col-12 col-sm-12 col-xl-6">
                    <videos-card />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Statistics from '../../components/dashboard/Statistics'
import PostsCard from '../../components/dashboard/PostsCard'
import VideosCard from '../../components/dashboard/VideosCard'
import DashboardChart from '../../components/dashboard/DashboardChart'

export default {
    name: "dashboard",
    data() {
        return {
            breadcrumb: [
                {
                    link: "",
                    label: this.$t('dashboardPage.breadcrumb[0]')
                }
            ]
        };
    },
    components: {
        Statistics,
        PostsCard,
        VideosCard,
        DashboardChart
    },
    methods: {

    }
};
</script>
