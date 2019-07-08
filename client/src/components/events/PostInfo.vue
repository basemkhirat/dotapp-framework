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
      </div>
    </div>

    <!-- Add Tags -->
    <div class="card--block">
      <div class="card--content">
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">Event Date & Time</label>
            <datetime
              type="datetime"
              class="custom--datetime theme-primary"
              placeholder="Event Date"
              v-model="postInfo.eventDate"
              use12-hour
            ></datetime>
          </b-field>
        </div>
      </div>
    </div>

    <div class="card--block">
      <div class="card--content">
        <!-- Type -->
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">Type</label>
            <div>
              <v-select
                :options="allType"
                v-model="typeContent"
                label="name"
                placeholder="type"
                class="select--with--icon w-100 v--select--scroll"
              >
                <template slot="option" slot-scope="option">{{ option.name }}</template>
              </v-select>
              <!-- Event Price -->
              <div v-if="typeContent.value === 'paid'">
                <b-input
                  type="text"
                  class="w-100 mt-3"
                  placeholder="Event Price"
                  v-model="postInfo.price"
                />
              </div>
            </div>
          </b-field>
        </div>
        <!-- Categories -->
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

    <div class="card--block">
      <div class="card--content">
        <!-- Location -->
        <div class="post--info--item">
          <b-field class="field-group flex-column">
            <label class="label">Location</label>
            <div class="field has-addons">
              <b-input
                type="text"
                class="w-100"
                placeholder="Location Title"
                v-model="postInfo.address"
              />
              <!-- <p class="control">
                                <b-tooltip label="Embed Location On Map"
                                type="is-dark"
                                    position="is-top">
                                    <button class="button is-primary " type="button">
                                        <i class="fas fa-map-marked-alt"></i>
                                    </button>
                                </b-tooltip>

              </p>-->
            </div>
            <b-input
              type="textarea"
              class="w-100"
              rows="3"
              placeholder="Location Embed"
              v-model="postInfo.map"
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

export default {
  props: ["post"],
  data() {
    return {
      postInfo: {
        status: 0,
        tags: [],
        published_at: "",
        eventDate: "",
        type: "free",
        categories: [],
        address: "",
        map: "",
        price: ""
      },
      filteredTags: [],
      tagsFilterLoading: false,
      scheduleDate: "",
      page: 1,
      limit: 10,
      allType: [
        {
          value: "free",
          name: "Free"
        },
        {
          value: "paid",
          name: "Paid"
        }
      ],
      typeContent: {
        value: "free",
        name: "Free"
      },
      categories: []
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
        this.postInfo.eventDate = this.post.scheduled_at;
        this.postInfo.price = this.post.price;
        this.postInfo.address = this.post.address;
        this.postInfo.map = this.post.map;
        if (this.post.type === "free") {
          this.typeContent = { value: "free", name: "Free" };
        } else if (this.post.type === "paid") {
          this.typeContent = { value: "paid", name: "Paid" };
        }
      }
    },
    typeContent() {
      this.postInfo.type = this.typeContent.value;
    }
  },
  created() {
    this.$emit("setDataFromChild", this.postInfo);
    this.fetchAllCategories();
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
            children.push({
              id: subItem.id,
              label: subItem.name
            });
          });
          this.categories.push({
            id: item.id,
            label: item.name,
            children: children
          });
        } else {
          this.categories.push({
            id: item.id,
            label: item.name
          });
        }
      });
    }
  }
};
</script>
