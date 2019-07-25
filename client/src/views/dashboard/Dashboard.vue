<template>
    <div class="dashboard">
        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('pages.dashboard.pageName')}}
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />
                    </div>

                    <div class="page--title--action ml-auto">
                        <statistics />
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="row justify-content-center">
                <!-- Start Widget -->
                <div class="col-12 col-sm-12 col-md-8 ">


                    <!-- Posts Card -->
                    <posts-card />

                    <!-- Events Card -->
                    <events-card />

                </div>
            </div>
        </div>

        <!-- <div class="card--block">
      <div class="card--hreader">
        <div class="card--header--title">

        </div>

      </div>
      <div class="card--content">
      </div>
        </div> -->
    </div>
</template>

<script>
import Statistics from '../../components/dashboard/Statistics'
import PostsCard from '../../components/dashboard/PostsCard'
import EventsCard from '../../components/dashboard/EventsCard'

export default {
    name: "dashboard",
    data() {
        return {
            breadcrumb: [
                {
                    link: "",
                    label: this.$t('pages.dashboard.breadcrumb[0]')
                }
            ]
        };
    },
    components: {
        Statistics,
        PostsCard,
        EventsCard,
    },
    methods: {

    }
};
</script>
