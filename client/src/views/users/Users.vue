<template>
  <div class="users">
    <div class="page--title">
      <h1 class="title--text">
        Users
        <span class="badge--count" v-if="total">
          ({{total}})
        </span>
      </h1>
      <div class="page--title--action ml-auto">
          <router-link to="/userForm" class="button is-primary is-rounded">Add New User</router-link>
      </div>
    </div>
    <div class="card-filter--herader">
        <filter-items @selectAllItems="selectAllItems" />
    </div>
    <template v-if="dataLoading">
          <loading-data></loading-data>
    </template>
    <template v-else>
          <list-users @fetchAllItems="fetchAllItems" :allUserSelected="allUserSelected" :data="users"/>        
    </template>
    <template v-if="users">
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
import ListUsers from '../../components/users/list'
import FilterItems from '../../components/users/Filter'

// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const usersRepository = RepositoryFactory.get('users')

export default {
  name: 'users',
  data () {
        return {
            users: [],
            total: null,
            allUserSelected: false,
            page: 1, 
            limit: 10,
            order: 'is-centered',
            dataLoading: true
        };
    },
  components: {
    ListUsers,
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
    selectAllItems(){
      this.allUserSelected =! this.allUserSelected 
    },
    async fetchAllItems() {
      this.dataLoading = true
        const data = await usersRepository.getAllUsers(this.page, this.limit)
        this.users = data.docs;
        this.total = data.total;
        this.dataLoading = false;
    },
    
  }
}
</script>
