<template>
  <div class="block--item no--checkbox">
    <div class="row align-items-center" @click="showChildrenItems()">
      <div class="col-12 col-sm-6 col-xl table--item">
        <div class="block--item--title d-flex align-items-center item--text">
          <div class="text--title">{{item.name}}</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl table--item">
        <div class="block--item--title d-flex align-items-center item--text">
          <div class="text--title">{{item.description}}</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl table--item">
        <div class="block--item--title d-flex align-items-center item--text">
          <div class="text--title">{{item.type}}</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl table--item">
        <div class="item--text">
          <span class="icon">
            <i class="fas fa-clock"></i>
          </span>
          {{item.created}}
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl table--item">
        <div class="item--text">
          <span class="icon">
            <i class="fas fa-th-large"></i>
          </span>
          Items
          ({{block.items? block.items.length : item.items.length}})
        </div>
      </div>

      <div class="col-12 col-sm-12 col-xl item--text table--item">
        <div class="all--item--action d-flex align-item-center">
          <div class="all--item--action d-flex align-item-center">
            <button class="button--circle is-warning-light">
              <i
                class="fas fa-arrow-right icon--rotate"
                :class="showChildren? 'openBlockItem' : ''"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Child Items -->
    <b-collapse :open.sync="showChildren" animation="slide-down">
      <template v-if="dataLoading">
        <loading-data></loading-data>
      </template>
      <template v-else>
        <div class="wrap--block--items" v-if="block.items.length">
          <!-- <transition-group name="slide-left"> -->


        <Container @drop="onDrop" drag-handle-selector=".block--drop" v-if="block.items.length">
            <Draggable v-for="(block, index) in block.items" :key="block.id">

            <div
              class="block--item no--checkbox block--drop" >
              <div class="row align-items-center">
                <div class="col-12 col-sm-6 col-xl table--item">
                  <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">{{block.title}}</div>
                  </div>
                </div>
                <div class="col-12 col-sm-12 col-xl item--text table--item">
                  <div class="all--item--action d-flex align-item-center">
                    <div class="all--item--action d-flex align-item-center">
                      <button class="button--circle is-danger-light" @click="deleteBlock(index)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Draggable>
        </Container>




          <!-- </transition-group> -->
        </div>
        <template v-else>
          <no-data text="No items have been created" />
        </template>

        <div>
          <b-field class="addNewItem mt-4">
            <b-autocomplete
              :data="itemsData"
              v-model="itemFieldInput"
              placeholder="Add Item"
              :open-on-focus="true"
              field="title"
              class="w-100"
              :loading="isFetching"
              @select="option => itemField = option"
              @typing="getAsyncData"
            ></b-autocomplete>
            <div class="control">
              <button
                class="button is-primary"
                :disabled="checkSameId"
                :class="{'is-loading': isLoadingNewItem}"
                @click="addNewItem"
              >Add</button>
            </div>
          </b-field>
        </div>
        <div
          class="block--action d-flex align-items-center justify-content-center align-items-center mt-4"
        >
          <button
            class="button is-primary m-1"
            @click="saveChanges()"
            :class="{'is-loading': isLoading}"
          >{{$t('saveChanges')}}</button>
          <button class="button is-dark m-1" @click="canceleBlock()">Cancel</button>
        </div>
      </template>
    </b-collapse>
  </div>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const blocksRepository = RepositoryFactory.get("blocks");
const eventsRepository = RepositoryFactory.get("events");
const postsRepository = RepositoryFactory.get("posts");
const categoriesRepository = RepositoryFactory.get("categories");
import debounce from "lodash/debounce";
import { filter } from "minimatch";

// Draggable
import {
    Container,
    Draggable
} from "vue-smooth-dnd";
// Set Sort All Cards After Drop
import {applyDrag} from '../../helpers/DragAndDrop'


export default {
  props: ["item", "currentItem"],
  data() {
    return {
      block: [],
      showChildren: false,
      dataLoading: true,
      isLoading: false,
      isLoadingNewItem: false,
      itemField: "",
      itemFieldInput: "",
      isFetching: false,
      page: 1,
      limit: 10,
      itemsData: [],
      checkSameId: true
    };
  },
  components: {
        Container,
        Draggable,
    },
  watch: {
    showChildren() {
      if (this.showChildren) {
          let filters = {};
        this.getBlock();
        this.showChildren = true;
        if (this.item.type === "event") {
          this.fetchAllEvents();
        } else if (this.item.type === "post") {
          this.fetchAllPosts(filters, 'post');
        } else if (this.item.type === "article") {
        this.fetchAllPosts(filters, 'article');
        } else if (this.item.type === "category") {
          this.fetchAllCategories();
        }
      }
    },
    currentItem() {
      if (this.currentItem) {
        if (this.currentItem === this.item.id) {
          this.showChildren = true;
        } else {
          this.showChildren = false;
        }
      }
    },
    itemField() {
      if (this.itemField) {
        let checkId = this.block.items.some(item => {
          return item.id === this.itemField.id;
        });
        if (checkId) {
          this.checkSameId = true;
        } else {
          this.checkSameId = false;
        }
      }
    }
  },
  methods: {
    deleteBlock(index) {
      this.block.items.splice(index, 1);
    },

    // Save Changes
    async saveChanges() {
      this.isLoading = true;
      let data = {};
      data.items = [];

      this.block.items.map(item => {
        data.items.push(item.id);
      });
      const block = await blocksRepository.updateBlock(this.item.id, data);
      this.isLoading = false;
      if (block.success) {
        this.successMessage(block.message);
      } else {
        this.errorMessage(block[0]);
      }
    },
    // Add New Item
    addNewItem() {
      this.isLoadingNewItem = true;
      this.block.items.push(this.itemField);
      this.itemField = "";
      this.itemFieldInput = "";
      this.isLoadingNewItem = false;
    },

    // Cancele Block
    canceleBlock() {
      this.showChildren = false;
    },
    async getBlock() {
      const block = await blocksRepository.getBlock(this.item.slug);
      this.dataLoading = false;
      this.block = block;
    },
    errorMessage(textMessage) {
      this.$snackbar.open({
        message: textMessage,
        type: "is-danger",
        position: "is-bottom-right",
        actionText: "OK",
        queue: false,
        duration: 10000,
        indefinite: false
      });
    },
    successMessage(textMessage) {
      this.$snackbar.open({
        message: textMessage,
        type: "is-success",
        position: "is-bottom-right",
        actionText: "OK",
        queue: false,
        duration: 10000,
        indefinite: false
      });
    },

    showChildrenItems() {
      this.showChildren = !this.showChildren;
      if (this.showChildren) {
        this.$emit("setCurrentItems", this.item.id);
      }
    },

    getAsyncData: debounce(function(name) {
      let filters = {};
      filters.searchQuery = name;
      if (this.item.type === "event") {
        this.fetchAllEvents(filters);
      } else if (this.item.type === "post") {
        this.fetchAllPosts(filters, 'post');
      }else if (this.item.type === "article") {
        this.fetchAllPosts(filters, 'article');
      } else if (this.item.type === "category") {
        this.fetchAllCategories(filters);
      }
    }, 500),

    async fetchAllEvents(filters) {
      this.isFetching = true;
      const events = await eventsRepository.getAllEvents(
        this.page,
        this.limit,
        filters
      );
      this.itemsData = events.data.docs;
      this.isFetching = false;
    },
    async fetchAllPosts(filters, type) {
      this.isFetching = true;
      const posts = await postsRepository.getAllPosts(
        this.page,
        this.limit,
        filters,
        type
      );
      this.itemsData = posts.data.docs;
      this.isFetching = false;
    },
    async fetchAllCategories(filters) {
      this.isFetching = true;
      const categories = await categoriesRepository.getAllCategories(
        this.page,
        this.limit,
        filters
      );
      this.itemsData = categories.data.docs;
      this.isFetching = false;
    },

    // Set Sort All Items After Drop
    onDrop(dropResult) {
        this.block.items = applyDrag(this.block.items, dropResult);
    },
  }
};
</script>
