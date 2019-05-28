<template>
  <div class="groups">
    <div class="page--title">
      <h1 class="title--text">
        Groups
        <span class="badge--count" v-if="total">
          ({{total}})
        </span>
      </h1>
      <div class="page--title--action ml-auto">
          <router-link to="/groupForm" class="button is-primary is-rounded">Add New Group</router-link>
      </div>
    </div>
    <div class="card-filter--herader">
        <filter-items @featchByFilter="featchByFilter" @selectAllItems="selectAllItems" :allItemChecked="allItemChecked" />
    </div>
    <template v-if="dataLoading">
          <loading-data></loading-data>
    </template>
    <template v-else>
          <list @fetchAllItems="fetchAllItems"
          :allItemsSelected="allItemsSelected"
          @checkButtonSelectAll="checkButtonSelectAll"
          :data="groups" v-if="groups.length"/>
          <div class="no-data" v-else><span>No Data Here</span></div>
    </template>
     <template v-if="groups.length">
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
import List from '../../components/groups/list'
import FilterItems from '../../components/groups/Filter'

// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const groupsRepository = RepositoryFactory.get('groups')

export default {
  name: 'groups',
  data () {
        return {
            groups: [],
            total: null,
            allItemsSelected: false,
            allItemChecked: 0,
            page: 1,
            limit: 10,
            order: 'is-centered',
            dataLoading: true
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
        const groups = await groupsRepository.getAllGroups(this.page, this.limit, filters)
        this.groups = groups.data.docs;
        this.total = groups.data.total;
        this.dataLoading = false;
    },

    // Filters
    featchByFilter(filters){
        this.fetchAllItems(filters)
    }

  }
}
</script>
