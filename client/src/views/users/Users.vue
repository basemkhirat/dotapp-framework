<template>
  <div class="users">
    <div class="page--title">
      <h1 class="title--text">
        Users
        <span class="badge--count">
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
      <transition name="slide-left" mode="out-in">
          <loading-data></loading-data>
      </transition>
    </template>
    <template v-else>
        <transition name="slide-left" mode="out-in">
          <list-users @fetchAllUsers="fetchAllUsers" :allUserSelected="allUserSelected" :data="users"/>
        </transition>
        
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
    this.fetchAllUsers()
  },
  watch:{
    page(){
      this.fetchAllUsers()
    }
  },
  methods:{
    selectAllItems(){
      this.allUserSelected =! this.allUserSelected 
    },
    async fetchAllUsers() {
      this.dataLoading = true
        const data = await usersRepository.getAllUsers(this.page, this.limit)
        this.users = data.docs;
        this.total = data.total;
        console.log(data.docs)
        this.dataLoading = false;
    },
    
  }
}
</script>
