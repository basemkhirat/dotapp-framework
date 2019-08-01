<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <button class="button w-100"
                              :class="{'is-primary' : checkItem}"
                              @click="selectAllItems">
                              {{$t('selectAll')}}
                         </button>
                    </div>
                    <!-- <div class="input--fuild">
                        <v-select :options="groups" v-model="group" label="title" placeholder="Sort By Group"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.title }}
                            </template>
                        </v-select>
                    </div> -->
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + '...'" type="search" icon-pack="fa" icon="search" v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props:['allItemChecked'],
        data() {
            return {
                group: '',
                groups: ['All', 'admin', 'editor', 'users'],
                checkItem: false,
                searchQuery: '',
                filters: {}
            }
        },
        watch:{
            allItemChecked(){
                if(this.allItemChecked == 0){
                    this.checkItem= false
                }
            },
            searchQuery(){
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            }
        },
        methods: {
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems', this.checkItem)
            }
        }
    }

</script>


