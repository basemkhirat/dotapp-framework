
<template>
  <div class="users">
    <div class="page--title">
      <h1 class="title--text">
        Groups
        <span class="badge--count">
          (40)
        </span>
      </h1>
      <div class="page--title--action ml-auto">
          <router-link to="/groupForm" class="button is-primary is-rounded">Add New Group</router-link>
      </div>
    </div>
    <div class="card-filter--herader">
        <filter-items @selectAllItems="selectAllItems" />
    </div>
    <list :allItemsSelected="allItemsSelected" :data="groups"/>
    
  </div>
</template>

<script>
import groups from '../../mocks/groups.js'
import List from '../../components/groups/list'
import FilterItems from '../../components/groups/Filter'

export default {
  name: 'groups',
  data () {
        return {
            groups,
            allItemsSelected: false
        };
    },
  components: {
    List,
    FilterItems
  },
  methods:{
    selectAllItems(){
      this.allItemsSelected =! this.allItemsSelected 
    }
  }
}
</script>
