<template>
  <div class="posts">
    <div class="page--title">
      <h1 class="title--text">
        Posts
        <span class="badge--count" v-if="total">
          ({{total}})
        </span>
      </h1>
      <div class="page--title--action ml-auto" v-if="isInUserPermissions('post.create')">
          <router-link to="/postForm" class="button is-primary is-rounded">Add New Post</router-link>
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
          :data="posts" v-if="posts.length"/>
          <div class="no-data" v-else><span>No Data Here</span></div>
    </template>
     <template v-if="posts.length">
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
import List from '../../components/posts/list'
import FilterItems from '../../components/posts/Filter'

// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const postsRepository = RepositoryFactory.get('posts')

export default {
  name: 'posts',
  data () {
        return {
            posts: [],
            total: null,
            allItemsSelected: false,
            allItemChecked: 0,
            page: 1,
            limit: 10,
            order: 'is-centered',
            dataLoading: true,
            breadcrumb:[{link: '', label:'posts'}]
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
        const posts = await postsRepository.getAllPosts(this.page, this.limit, filters)
        this.posts = posts.data.docs;
        this.total = posts.data.total;
        this.dataLoading = false;
    },
    // Filters
    featchByFilter(filters){
        this.fetchAllItems(filters)
    }

  }
}
</script>
