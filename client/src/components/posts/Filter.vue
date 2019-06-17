<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <button class="button is-rounded w-100"
                              :class="{'is-primary' : checkItem}"
                              @click="selectAllItems">
                              Select All
                         </button>
                    </div>

                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <v-select :options="allStatus" v-model="status" label="name" placeholder="Sort By Status"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input placeholder="Search..." type="search" icon-pack="fa" rounded icon="search" v-model="searchQuery">
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
                status: '',
                checkItem: false,
                searchQuery: '',
                filters: {},
                allStatus: [{id: '1', name: 'Published'}, {id: '0', name: 'Not Published'}]
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
            },
            status(){
                if(this.status){
                    this.filters.status = this.status.id
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.status = ''
                    this.$emit('featchByFilter', this.filters)
                }
          },
        },
        methods: {
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems', this.checkItem)
            }
        }
    }

</script>


