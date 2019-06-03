<template>
  <div class="groups">
    <div class="page--title">
      <h1 class="title--text">Articles</h1>
      <div class="page--title--action ml-auto">
          <router-link to="/articleForm" class="button is-primary is-rounded">Add New Articles</router-link>
      </div>
    </div>
    <div class="card--block">
      <div class="card--hreader">
        <div class="card--header--title">
          All Articles
        </div>
        <div class="card--header--action">
             <filter-items />
        </div>
      </div>
      <div class="card--content">
        <list-articles :data="articles"/>
      </div>
    </div>


  </div>
</template>

<script>
import articles from '../../mocks/articles.js'
import ListArticles from '../../components/articles/list'
import FilterItems from '../../components/articles/Filter'

export default {
  name: 'articles',
  data () {
        return {
            articles,
        };
    },
  components: {
    ListArticles,
    FilterItems
  }
}
</script>
