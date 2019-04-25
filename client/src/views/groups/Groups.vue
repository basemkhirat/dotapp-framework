<template>
  <div class="groups">
    <div class="page--title">
      <h1 class="title--text">Groups</h1>
      <div class="page--title--action ml-auto">
          <router-link to="/groupForm" class="button is-primary is-rounded">Add New Group</router-link>
      </div>
    </div>
    <div class="card--block">
      <div class="card--hreader">
        <div class="card--header--title">
          All Groups
        </div>
        <div class="card--header--action">
        </div>
      </div>
      <div class="card--content">
        <list-groups  :data="groups"/>
      </div>
    </div>

    
  </div>
</template>

<script>
import groups from '../../mocks/groups.js'
import ListGroups from '../../components/groups/list'
export default {
  name: 'groups',
  data () {
        return {
            groups,
        };
    },
  components: {
    ListGroups,
  }
}
</script>
