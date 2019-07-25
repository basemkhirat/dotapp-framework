<template>
    <ul class="list--statistics">
        <li class="list-statistics-item">
            <div class="statistics--content">
                <span class="statistics--icon is-primary-light">
                    <i class="far fa-user"></i>
                </span>
                <div class="text-center">
                    <p class="statistics--title"> {{$t('pages.dashboard.statistics.users')}}</p>
                    <p class="statistics--number">{{usersTotal}}</p>
                </div>
            </div>
        </li>
        <li class="list-statistics-item">
            <div class="statistics--content">
                <span class="statistics--icon is-success-light">
                    <i class="far fa-newspaper"></i>
                </span>
                <div class="text-center">
                    <p class="statistics--title"> {{$t('pages.dashboard.statistics.posts')}}</p>
                    <p class="statistics--number">{{postsTotal}}</p>
                </div>
            </div>
        </li>
        <li class="list-statistics-item">
            <div class="statistics--content">
                <span class="statistics--icon is-purple-light">
                    <i class="far fa-calendar-alt"></i>
                </span>
                <div class="text-center">
                    <p class="statistics--title"> {{$t('pages.dashboard.statistics.events')}}</p>
                    <p class="statistics--number">{{eventsTotal}}</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const postsRepository = RepositoryFactory.get("posts");
const eventsRepository = RepositoryFactory.get("events");
const usersRepository = RepositoryFactory.get("users");

export default {
    data() {
        return {
            usersTotal: null,
            eventsTotal: null,
            postsTotal: null,
            page: 1,
            limit: 0
        }
    },
    created() {
        this.getAllStatistics()
    },
     methods: {
        //  getAllStatistics() {
        //      this.getAllPosts()
        //  },
        async getAllStatistics() {
             const posts = await postsRepository.getAllPosts(
                this.page,
                this.limit,
                'filters',
                "post"
            )
            if(posts.success) {
                 this.postsTotal = posts.data.total;
            }

            const events = await eventsRepository.getAllEvents(
                this.page,
                this.limit,
            )
            this.eventsTotal = events.data.total;

             const users = await usersRepository.getAllUsers(
                this.page,
                this.limit,
            )
            this.usersTotal = users.total;
         }
     }
 };
</script>

<style>
</style>
