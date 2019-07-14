<template>
  <div class="col-12 col-lg-4">
    <div class="card--block">
      <div class="card--content">
        <!-- Status -->
        <div class="post--info--item">
          <b-field class="field-group align-items-center justify-content-between">
            <label class="label mb-0">Status</label>
            <b-switch v-model="postInfo.status" :true-value="1" :false-value="0">Published</b-switch>
          </b-field>
        </div>
      </div>
    </div>

    <!-- Add Tags -->
    <div class="card--block">
      <div class="card--content">
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">Tags</label>
            <b-taginput
              v-model="postInfo.tags"
              :data="filteredTags"
              autocomplete
              :allow-new="true"
              field="name"
              icon="label"
              placeholder="Add a tag"
              :loading="tagsFilterLoading"
              @typing="getFilteredTags"
            ></b-taginput>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const tagsRepository = RepositoryFactory.get("tags");

export default {
  props: ["post"],
  data() {
    return {
      postInfo: {
        status: 0,
        tags: [],
      },
      filteredTags: [],
      tagsFilterLoading: false,
      page: 1,
      limit: 10,
    };
  },
  watch: {
    postInfo: {
      handler() {
        this.sentDataToParent();
      },
      deep: true
    },
    post() {
      if (this.post) {
        this.postInfo.status = this.post.status;
        if (this.post.tags.length) {
          this.post.tags.map(item => {
            this.postInfo.tags.push(item.name);
          });
        }
      }
    }
  },
  created() {
    this.$emit("setDataFromChild", this.postInfo);
  },
  methods: {
    // Send Data To Parent
    sentDataToParent() {
      this.$emit("setDataFromChild", this.postInfo);
    },
    getFilteredTags(text) {
      this.filteredTags = [];
      let filters = {};
      filters.searchQuery = text;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.fetchAllTags(filters);
      }, 500);
    },
    // Fetch Tags
    async fetchAllTags(filters) {
      this.tagsFilterLoading = true;
      const tags = await tagsRepository.getAllTags(
        this.page,
        this.limit,
        filters
      );
      tags.data.docs.map(item => {
        this.filteredTags.push(item.name);
      });
      this.tagsFilterLoading = false;
    },

  }
};
</script>


<style lang="scss">
    .post--info--item {
        .mb-0{
            margin-bottom: 0 !important;
        }
    }
</style>
