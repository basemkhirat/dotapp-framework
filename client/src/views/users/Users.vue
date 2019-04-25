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
        <filter-items @selectAllUsers="selectAllUsers" />
    </div>
    <list-users :allUserSelected="allUserSelected" :data="users"/>
    
  </div>
</template>

<script>
import users from '../../mocks/users.js'
import ListUsers from '../../components/users/list'
import FilterItems from '../../components/users/Filter'

export default {
  name: 'users',
  data () {
        return {
            users,
            allUserSelected: false
        };
    },
  components: {
    ListUsers,
    FilterItems
  },
  methods:{
    selectAllUsers(){
      this.allUserSelected =! this.allUserSelected 
    }
  }
}
</script>
