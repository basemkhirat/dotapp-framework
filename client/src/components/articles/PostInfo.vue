<template>
  <div class="col-12 col-lg-4">
    <div class="card--block">
      <div class="card--content">
        <!-- Status -->
        <div class="post--info--item">
          <b-field class="field-group align-items-center justify-content-between">
            <label class="label">Status</label>
            <b-switch v-model="postInfo.status" :true-value="1" :false-value="0">Published</b-switch>
          </b-field>
        </div>
        <!-- Schedule Date -->
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">Schedule</label>
            <datetime
              type="datetime"
              class="custom--datetime theme-primary"
              placeholder="Schedule Date"
              v-model="postInfo.published_at"
              use12-hour
            ></datetime>
          </b-field>
        </div>
        <!-- Format -->
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">Format</label>
            <v-select
              :options="allFormat"
              v-model="postInfo.format"
              label="name"
              placeholder="format"
              class="select--with--icon w-100 v--select--scroll"
            >
              <template slot="option" slot-scope="option">{{ option.name }}</template>
            </v-select>
          </b-field>
        </div>
      </div>
    </div>

    <!-- Add Author -->
    <div class="card--block">
      <div class="card--content">
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">Author</label>
            <v-select
              :options="authors"
              v-model="postInfo.author"
              label="name"
              placeholder="Author"
              class="select--with--icon w-100 v--select--scroll"
            >
              <template slot="option" slot-scope="option">{{ option.name }}</template>
            </v-select>
          </b-field>
        </div>
      </div>
    </div>

    <!-- Add Category -->
    <div class="card--block">
      <div class="card--content">
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">categories</label>
            <treeselect
              class="custom--treeSelect"
              :show-count="true"
              :flat="true"
              v-model="postInfo.categories"
              :multiple="true"
              :options="categories"
            />
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
// DatePicker
import { Datetime } from "vue-datetime";
// DatePicker Style
import "vue-datetime/dist/vue-datetime.css";

// Tree Select
import Treeselect from "@riophae/vue-treeselect";
// Tree Select Style
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const tagsRepository = RepositoryFactory.get("tags");
const categoriesRepository = RepositoryFactory.get("categories");
const authorsRepository = RepositoryFactory.get("authors");

import { allFormat } from "./../../helpers/Variables";

export default {
  props: ["post"],
  data() {
    return {
      postInfo: {
        status: 0,
        format: "",
        tags: [],
        published_at: "",
        categories: [],
        author: ""
      },
      authors: [],
      filteredTags: [],
      tagsFilterLoading: false,
      allSections: ["News", "Media", "Sport", "Art"],
      allFormat,
      scheduleDate: "",
      page: 1,
      limit: 10,
      value: null,
      categories: [],
      optionsSelect: [
        {
          id: "1",
          label: "Sports",
          children: [
            {
              id: "s1",
              label: "sports child one"
            },
            {
              id: "s2",
              label: "sports child two"
            },
            {
              id: "s3",
              label: "sports child three"
            }
          ]
        },
        {
          id: "2",
          label: "Movies",
          children: [
            {
              id: "m1",
              label: "Movies child one"
            },
            {
              id: "m2",
              label: "Movies child two"
            },
            {
              id: "m3",
              label: "Movies child three"
            }
          ]
        },
        {
          id: "3",
          label: "News"
        }
      ]
    };
  },
  components: {
    Datetime,
    Treeselect
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
        if (this.post.categories.length) {
          this.post.categories.map(item => {
            this.postInfo.categories.push(item.id);
          });
        }
        this.postInfo.published_at = this.post.published_at;
        this.postInfo.format = this.post.format;
        this.postInfo.author = this.post.author;
      }
    }
  },
  created() {
    this.$emit("setDataFromChild", this.postInfo);
    this.fetchAllCategories();
    this.fetchAllAuthors();
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
    // Fetch Categories
    async fetchAllCategories() {
      const categories = await categoriesRepository.getAllCategories(
        this.page,
        this.limit
      );
      let allCategories = categories.data.docs;
      allCategories.map(item => {
        if (item.children.length) {
          let children = [];
          item.children.map(subItem => {
            children.push({ id: subItem.id, label: subItem.name });
          });
          this.categories.push({
            id: item.id,
            label: item.name,
            children: children
          });
        } else {
          this.categories.push({ id: item.id, label: item.name });
        }
      });
    },
    // Fetch Authors
    async fetchAllAuthors() {
      const authors = await authorsRepository.getAllAuthors(
        this.page,
        this.limit
      );
      this.authors = authors.data.docs;
    }
  }
};
</script>
