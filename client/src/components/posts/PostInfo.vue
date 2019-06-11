<template>
    <div class="col-12 col-lg-4">

        <div class="card--block">
            <div class="card--content">
                <!-- Status -->
                <div class="post--info--item">
                    <b-field class="field-group align-items-center justify-content-between">
                        <label class="label">Status</label>
                        <b-switch v-model="status">
                            Published
                        </b-switch>
                    </b-field>
                </div>
                <!-- Schedule Date -->
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">Schedule</label>
                        <datetime type="datetime" class="custom--datetime" placeholder="Schedule Date"
                            v-model="scheduleDate" use12-hour>
                        </datetime>
                    </b-field>
                </div>
                <!-- Format -->
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">Format</label>
                        <v-select :options="allSections" v-model="sections" label="title" placeholder="Section"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.title }}
                            </template>
                        </v-select>
                    </b-field>
                </div>
            </div>
        </div>

        <!-- Add Category -->
        <div class="card--block">
            <div class="card--content">
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">Category</label>
                        <treeselect class="custom--treeSelect" v-model="value" :multiple="true" :options="options" />
                    </b-field>
                </div>
            </div>
        </div>

        <!-- Add Tags -->
        <div class="card--block">
            <div class="card--content">
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">Tags</label>
                        <v-select :options="allTags" v-model="tags" label="title" multiple placeholder="Tags"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.title }}
                            </template>
                        </v-select>
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



    export default {
        data() {
            return {
                title: '',
                breadcrumb: [{
                    link: '/posts',
                    label: 'posts'
                }, {
                    link: '',
                    label: 'add & update post'
                }],
                sections: '',
                status: true,
                tags: '',
                allSections: ['News', 'Media', 'Sport', 'Art'],
                allTags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6'],
                scheduleDate: '',
                value: null,
                // define options
                options: [{
                    id: '1',
                    label: 'Sports',
                    children: [{
                        id: 's1',
                        label: 'sports child one',
                    }, {
                        id: 's2',
                        label: 'sports child two',
                    },{
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
                    },{
                        id: 'm3',
                        label: 'Movies child three',
                    }],
                },
                {
                    id: '3',
                    label: 'News',
                },],
            };
        },
        components: {
            datetime: Datetime,
            Treeselect,
        },

    }
</script>
