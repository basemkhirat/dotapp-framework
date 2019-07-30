<template>
  <div>
    <item
      v-for="item in data"
      :key="item.id"
      :item="item"
      @fetchAllItems="fetchAllItems"
      @checkboxItem="checkboxItemStatus"
      :itemsSelected="itemsSelected"
    />

    <template>
      <div class="all--actions" :class="{'show--action--bottom': itemsSelected.length}">
        <div class="wrap--content">
          <button class="button is-danger" @click="deleteItems()">
              {{$t('deleteAllSelected')}}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>



<script>
import Item from "./ListItem";
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const pagesRepository = RepositoryFactory.get("pages");

export default {
  props: ["data", "allItemsSelected"],
  data() {
    return {
      itemsSelected: []
    };
  },
  components: {
    Item
  },
  watch: {
    allItemsSelected() {
      if (this.allItemsSelected) {
        this.data.map(item => {
          this.itemsSelected.push(item.id);
        });
      } else {
        this.itemsSelected = [];
      }
    },
    itemsSelected() {
      if (this.itemsSelected) {
        this.$emit("checkButtonSelectAll", this.itemsSelected);
      }
    }
  },
  methods: {
    checkboxItemStatus(data) {
      if (data.status == true) {
        if (!this.itemsSelected.indexOf(data.id) > -1) {
          this.itemsSelected.push(data.id);
        }
      } else {
        if (this.itemsSelected.indexOf(data.id) > -1) {
          for (var i = 0; i < this.itemsSelected.length; i++) {
            if (this.itemsSelected[i] == data.id) {
              this.itemsSelected.splice(i, 1);
            }
          }
        }
      }
    },
    deleteItems() {
      this.confirmCustomDelete(this.itemsSelected);
    },

    // Delete Items
    async deletePages(ids) {
      const posts = await pagesRepository.deletePages(ids);
      this.$emit("fetchAllItems");
      this.aleartMessage(posts.message);
    },
    // Ban Items
    async updatePages(id, data) {
      const posts = await pagesRepository.updatePages(id, data);
      this.$emit("fetchAllItems");
      this.aleartMessage(posts.message);
    },
    fetchAllItems() {
      this.$emit("fetchAllItems");
    },
    aleartMessage(textMessage) {
      this.$snackbar.open({
        message: textMessage,
        type: "is-success",
        position: "is-bottom-right",
        actionText: "OK",
        queue: false,
        duration: 3000,
        indefinite: false
      });
    },
    confirmCustomDelete(ids) {
      this.$dialog.confirm({
        title: this.$t('pagesPage.messages.deletePages.title'),
        message: this.$t('pagesPage.messages.deletePages.message'),
        confirmText: this.$t('pagesPage.messages.deletePages.confirmText'),
        cancelText: this.$t('pagesPage.messages.deletePages.cancelText'),
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deletePages(ids)
      });
    }
  }
};
</script>
