<template>
  <div class="tags--page">
    <div class="page--title">
      <h1 class="title--text">
        Tags
        <span class="badge--count" v-if="total">
          ({{total}})
        </span>
      </h1>
      <div class="page--title--action ml-auto" v-if="isInUserPermissions('tag.create')">
          <router-link to="/tagForm" class="button is-primary is-rounded">Add New Tag</router-link>
      </div>

    </div>
    <!-- Breadcrumb -->
    <breadcrumb :links="breadcrumb" />

    <div class="card-filter--herader">
        <filter-items @selectAllItems="selectAllItems" @featchByFilter="featchByFilter" :allItemChecked="allItemChecked" />
    </div>
    <template v-if="dataLoading">
          <loading-data></loading-data>
    </template>
    <template v-else>
          <list @fetchAllItems="fetchAllItems"
          :allItemsSelected="allItemsSelected"
          @checkButtonSelectAll="checkButtonSelectAll"
          :data="tags" v-if="tags.length"/>
          <div class="no-data" v-else><span>No Data Here</span></div>
    </template>
     <template v-if="tags.length">
        <div class="pagination--custom--number">
            <b-pagination
                :total="total"
                :current.sync="page"
                :order="order"
                :rounded="true"
                :per-page="limit">
            </b-pagination>
        </div>
    </template>

  </div>
</template>

<script>
import List from '../../components/tags/list'
import FilterItems from '../../components/tags/Filter'

// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const tagsRepository = RepositoryFactory.get('tags')

export default {
  name: 'tags',
  data () {
        return {
            tags: [],
            total: null,
            allItemsSelected: false,
            allItemChecked: 0,
            page: 1,
            limit: 10,
            order: 'is-centered',
            dataLoading: true,
            breadcrumb:[{link: '', label:'tags'}]
        };
    },
  components: {
    List,
    FilterItems,
  },
  created(){
    this.fetchAllItems()
  },
  watch:{
    page(){
      this.fetchAllItems()
    }
  },
  methods:{
    selectAllItems(checkButton){
      if(checkButton){
        this.allItemsSelected = true
      } else {
          this.allItemsSelected = false
      }
      // this.allItemsSelected =! this.allItemsSelected
    },
    // Check Button Select All Active Or Not
    checkButtonSelectAll(data){
      this.allItemChecked = data
    },
    async fetchAllItems(filters) {
        this.dataLoading = true
        const tags = await tagsRepository.getAllTags(this.page, this.limit, filters)
        this.tags = tags.data.docs;
        this.total = tags.data.total;
        console.log(tags)
        this.dataLoading = false;
    },
    // Filters
    featchByFilter(filters){
        this.fetchAllItems(filters)
    }

  }
}
</script>
