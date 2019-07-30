<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <button class="button w-100" :class="{'is-primary' : checkItem}"
                            @click="selectAllItems">
                            {{$t('selectAll')}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <b-tooltip
                            :always="!!this.dateFrom > 0 || !!this.dateTo.length > 0"
                            type="is-dark"
                            :active="(!this.modalFilterByDate) && (!!this.dateFrom.length || !!this.dateTo.length)"
                            :label="
                                (this.dateFrom ? `From: ${this.dateFrom}` : '') +
                                (this.dateFrom && this.dateTo ? ' - ' : '') +
                                (this.dateTo ? `To: ${this.dateTo}` : '')"
                            >
                            <button class="button w-100" @click="filterByDate">
                                <i class="far fa-calendar-alt"></i>
                            </button>
                        </b-tooltip>
                    </div>
                    <div class="input--fuild">
                        <v-select :options="orderOptions" :clearable="false"
                        v-model="order" label="title" class="select--with--icon w-100 w-fuild-md v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.title }}
                            </template>
                        </v-select>
                    </div>

                    <div class="input--fuild">
                        <v-select :options="allCategories" v-model="categories" label="name"
                        multiple
                            :placeholder="$t('sortByCategories')" class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <v-select :options="allFormat" v-model="format" label="name" :placeholder="$t('sortByFormat')"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>

                    <div class="input--fuild">
                        <v-select :options="allStatus" v-model="status" label="name" :placeholder="$t('sorByStatus')"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + '...'" type="search" icon-pack="fa" icon="search"
                                v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <!-- Modal Filter By Date -->
          <b-modal :has-modal-card="false" :active.sync="modalFilterByDate"
          :can-cancel="false"
          :width="640" scroll="keep" class="modal--custom">
                <div class="card-content text-left">
                    <b-field class="field-group flex-column">
                        <label class="label">{{$t('from')}}</label>
                        <datetime type="datetime" class="custom--datetime theme-primary" :placeholder="$t('from')"
                            v-model="dateFrom" use12-hour>
                        </datetime>
                    </b-field>
                    <b-field class="field-group flex-column">
                        <label class="label">{{$t('to')}}</label>
                        <datetime type="datetime" class="custom--datetime theme-primary" :placeholder="$t('to')"
                            v-model="dateTo" use12-hour>
                        </datetime>
                    </b-field>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="button is-danger mr-2" type="button"
                        @click="unsetDate()">{{$t('unsetDate')}}</button>
                    <button class="button is-primary"
                        @click="setDate"
                        type="button">{{$t('setDate')}}</button>
                </div>
        </b-modal>

    </div>
</template>

<script>
    // DatePicker
    import {
        Datetime
    } from 'vue-datetime';
    // DatePicker Style
    import 'vue-datetime/dist/vue-datetime.css'

    import {
        allFormat,
        order
    } from './../../helpers/Variables'

    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const categoriesRepository = RepositoryFactory.get('categories')
    export default {
        props: ['allItemChecked'],
        data() {
            return {
                status: '',
                checkItem: false,
                searchQuery: '',
                filters: {categories: []},
                allStatus: [{
                    id: '1',
                    name: this.$t('published')
                }, {
                    id: '0',
                    name: this.$t('notPublished')
                }],
                categories: [],
                allCategories: [],
                format: '',
                allFormat,
                page: 1,
                limit: 100,
                modalFilterByDate: false,
                dateFrom: '',
                dateTo: '',
                orderOptions: order,
                order: 'Recent',
            }
        },
        components: {
            Datetime,
        },
        watch: {
            allItemChecked() {
                if (this.allItemChecked == 0) {
                    this.checkItem = false
                }
            },
            // Search Query
            searchQuery() {
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            },
            // Status
            status() {
                if (this.status) {
                    this.filters.status = this.status.id
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.status = ''
                    this.$emit('featchByFilter', this.filters)
                }
            },
            // Order
            order(){
                this.filters.order = this.order.value
                this.$emit('featchByFilter', this.filters)
            },
            // Format
            format() {
                if (this.format) {
                    this.filters.format = this.format.value
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.format = ''
                    this.$emit('featchByFilter', this.filters)
                }
            },
            // Format
            categories() {
                if (this.categories) {
                    this.filters.categories = []
                    this.categories.map(item => {
                        this.filters.categories.push(item.id)
                    })
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.categories = []
                    this.$emit('featchByFilter', this.filters)
                }
            },

        },
        created(){
            this.fetchAllCategories()
        },
        methods: {
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems', this.checkItem)
            },

            // Filter By Date
            filterByDate(){
                this.modalFilterByDate = true
            },
            // Reset Date
            unsetDate(){
                this.modalFilterByDate = false
                this.dateFrom = ''
                this.dateTo = ''
                this.filters.dateFrom = this.dateFrom
                this.filters.dateTo = this.dateTo
                this.$emit('featchByFilter', this.filters)
            },
            // Set Date
            setDate(){
                this.modalFilterByDate = false
                this.filters.dateFrom = this.dateFrom
                this.filters.dateTo = this.dateTo
                this.$emit('featchByFilter', this.filters)
            },

            // Get All Categories
            async fetchAllCategories() {
                const categories = await categoriesRepository.getAllCategories(this.page, this.limit)
                this.allCategories = categories.data.docs;
            },
        }
    }
</script>
