<template>
  <div class="block--item">
    <div class="row align-items-center">
      <div class="item--checkbox">
        <b-checkbox
          v-model="checkItemSelected"
          @input="updateCheckbox(item.id)"
          :native-value="item.id"
        ></b-checkbox>
      </div>
        <div class="col-12 col-sm-6 col-xl table--item">
            <div class="block--item--title d-flex align-items-center item--text">
                <div class="item--avatar--img">
                    <template v-if="item.image">
                        <img :src="item.image.thumbnails.small" :alt="item.image.title">
                    </template>
                    <img src="./../../assets/images/user/64.png">
                </div>
                <div class="text--title text-capitalize">
                    {{item.first_name}}
                </div>
            </div>
        </div>
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
        <div class="item--text">
          <span class="icon">
            <i class="fas fa-clock"></i>
          </span>
          {{item.created}}
        </div>
      </div>

      <div class="col-12 col-sm-12 col-xl item--text table--item">
        <div class="all--item--action d-flex align-item-center">
          <div class="all--item--action d-flex align-item-center">
            <router-link
              :to="'/authorForm/' + item.id"
              v-if="item.policies.indexOf('author.manage') > -1"
              class="button--circle is-primary-light"
            >
              <i class="fas fa-pen"></i>
            </router-link>
            <button
              class="button--circle is-danger-light"
              @click="deleteItem(item.id)"
              v-if="item.policies.indexOf('author.manage') > -1"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const authorsRepository = RepositoryFactory.get("authors");
export default {
  props: ["item", "itemsSelected"],
  data() {
    return {
      checkItemSelected: false
    };
  },
  watch: {
    itemsSelected() {
      if (this.itemsSelected.length) {
        this.itemsSelected.map(item => {
          if (item == this.item.id) {
            this.checkItemSelected = true;
          }
        });
      } else {
        this.checkItemSelected = false;
      }
    },
    $route(to, from) {
      this.fetchAllItems();
    }
  },
  methods: {
    deleteItem(id) {
      this.confirmCustomDelete(id);
    },
    updateCheckbox() {
      this.$emit("checkboxItem", {
        id: this.item.id,
        status: this.checkItemSelected
      });
    },
    async updateAuthor(id, data) {
      const author = await authorsRepository.updateAuthor(id, data);
      this.aleartMessage(author.message);
    },
    async deleteAuthor(id) {
      const author = await authorsRepository.deleteAuthor(id);
      this.aleartMessage(author.message);
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
    confirmCustomDelete(id) {
      this.$dialog.confirm({
        title: "Deleting Author",
        message:
          "Are you sure you want to <b>delete</b> This Author? This action cannot be undone.",
        confirmText: "Delete Group",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deleteAuthor(id)
      });
    }
  }
};
</script>
