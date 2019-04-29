<template>
  <div class="users">
    <div class="page--title">
      <h1 class="title--text">
        Users
        <span class="badge--count">
          (450)
        </span>
      </h1>
      <div class="page--title--action ml-auto">
          <router-link to="/addNewUser" class="button is-primary is-rounded">Add New User</router-link>
      </div>
    </div>
    <div class="card-filter--herader">
        <filter-items @selectAllItems="selectAllItems" />
    </div>
    <template v-if="dataLoading">
          <loading-data></loading-data>
    </template>
    <template v-else>
        <list-users :allUserSelected="allUserSelected" :data="users"/>
    </template>
  </div>
</template>

<script>
import users from '../../mocks/users.js'
import ListUsers from '../../components/users/list'
import FilterItems from '../../components/users/Filter'

// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const usersRepository = RepositoryFactory.get('users')

export default {
  name: 'users',
  data () {
        return {
            users,
            allUserSelected: false,
            page: 1, 
            limit: 10,
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
  methods:{
    selectAllItems(){
      this.allUserSelected =! this.allUserSelected 
    },
    async fetchAllUsers() {
        const users = await usersRepository.getAllUsers(this.page, this.limit)
        this.users = users;
        this.dataLoading = false;
    },
  }
}
</script>
