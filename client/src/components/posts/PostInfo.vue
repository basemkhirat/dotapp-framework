<template>
    <div class="col-12 col-lg-4">

        <div class="card--block">
            <div class="card--content">
                <!-- Status -->
                <div class="post--info--item">
                    <b-field class="field-group align-items-center justify-content-between">
                        <label class="label">Status</label>
                        <b-switch v-model="postInfo.status" :true-value="1" :false-value="0">
                            Published
                        </b-switch>
                    </b-field>
                </div>
                <!-- Schedule Date -->
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">Schedule</label>
                        <datetime type="datetime" class="custom--datetime theme-primary" placeholder="Schedule Date"
                            v-model="postInfo.published_at" use12-hour>
                        </datetime>
                    </b-field>
                </div>
                <!-- Format -->
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">Format</label>
                        <v-select :options="allFormat" v-model="postInfo.format" label="name" placeholder="format"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </b-field>
                </div>
            </div>
        </div>

        <!-- Add Category -->
        <!-- <div class="card--block">
            <div class="card--content">
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">categories</label>
                        <treeselect class="custom--treeSelect" :flat="true" v-model="postInfo.categories"
                            :multiple="true" :options="optionsSelect" />
                    </b-field>
                </div>
            </div>
        </div> -->
        <!-- Add Tags -->
        <div class="card--block">
            <div class="card--content">
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">Tags</label>
                        <b-taginput v-model="postInfo.tags" :data="filteredTags" autocomplete :allow-new="true"
                            field="name" icon="label" rounded placeholder="Add a tag" :loading="tagsFilterLoading"
                            @typing="getFilteredTags">
                        </b-taginput>
                    </b-field>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // DatePicker
    import {
        Datetime
    } from 'vue-datetime';
    // DatePicker Style
    import 'vue-datetime/dist/vue-datetime.css'

    // Tree Select
    import Treeselect from '@riophae/vue-treeselect'
    // Tree Select Style
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const tagsRepository = RepositoryFactory.get('tags')

    import {allFormat} from './../../helpers/Variables'

    export default {
        props: ['post'],
        data() {
            return {
                postInfo: {
                    status: 0,
                    format: '',
                    tags: [],
                    published_at: '',
                    categories: [],
                },
                filteredTags: [],
                tagsFilterLoading: false,
                allSections: ['News', 'Media', 'Sport', 'Art'],
                allFormat,
                scheduleDate: '',
                page: 1,
                limit: 10,
                optionsSelect: [{
                        id: '1',
                        label: 'Sports',
                        children: [{
                            id: 's1',
                            label: 'sports child one',
                        }, {
                            id: 's2',
                            label: 'sports child two',
                        }, {
                            id: 's3',
                            label: 'sports child three',
                        }],
                    }, {
                        id: '2',
                        label: 'Movies',
                        children: [{
                            id: 'm1',
                            label: 'Movies child one',
                        }, {
                            id: 'm2',
                            label: 'Movies child two',
                        }, {
                            id: 'm3',
                            label: 'Movies child three',
                        }],
                    },
                    {
                        id: '3',
                        label: 'News',
                    },
                ],
            };
        },
        components: {
            Datetime,
            Treeselect,
        },
        watch: {
            postInfo: {
                handler(val) {
                    this.sentDataToParent()
                },
                deep: true
            },
            post() {
                if (this.post) {
                    this.postInfo.status = this.post.status
                    // this.postInfo.categories = this.post.categories
                    if(this.post.tags){
                        this.post.tags.map( item => {
                            this.postInfo.tags.push(item.name)
                        })
                    }
                    this.postInfo.published_at = this.post.published_at
                    this.postInfo.format = this.post.format
                }
            }
        },
        created() {
            this.$emit('setDataFromChild', this.postInfo)
        },
        methods: {
            // Send Data To Parent
            sentDataToParent(type) {
                this.$emit('setDataFromChild', this.postInfo)
            },
            // Filter Tags
            // getFilteredTags(text) {
            //     this.filteredTags = data.filter((option) => {
            //         return option.user.first_name
            //             .toString()
            //             .toLowerCase()
            //             .indexOf(text.toLowerCase()) >= 0
            //     })
            // },
            getFilteredTags(text) {
                this.filteredTags = []
                let filters = {}
                filters.searchQuery = text
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.fetchAllTags(filters)
                }, 500);


            },
            // Fetch Tags
            async fetchAllTags(filters) {
                this.tagsFilterLoading = true
                const tags = await tagsRepository.getAllTags(this.page, this.limit, filters)
                tags.data.docs.map(item => {
                    this.filteredTags.push(item.name)
                })
                this.tagsFilterLoading = false
            }
        },

    }
</script>
