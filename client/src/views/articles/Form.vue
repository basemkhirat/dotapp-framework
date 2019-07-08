<template>
  <div class="posts">
    <!-- Page Head -->
    <div class="page--head">
      <div class="wrap--content">
        <div class="page--title">
          <div>
            <h1 class="title--text">Artices</h1>

            <!-- Breadcrumb -->
            <breadcrumb :links="breadcrumb" />
          </div>

          <div class="page--title--action ml-auto">
            <button class="button is-primary" @click="submitForm">Save Changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap--content">
      <form @submit.prevent="submitForm()">
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="post--content">
              <!-- Main Field Post -->
              <main-field-post @setDataFromChild="setDataFromMainField" :post="this.post" />

              <!-- Content Editor -->
              <content-editor @setDataFromChild="setDataFromCardsContent" :post="this.post" />

              <!-- Main Button Save On Desktop Screen -->
              <div class="text-center button--save--form d-none d-lg-block">
                <button
                  class="button is-primary"
                  :class="{'is-loading': isLoading}"
                  type="submit"
                >Save Changes</button>
              </div>
            </div>
          </div>

          <!-- Post Info -->
          <post-info @setDataFromChild="setDataFromPostInfo" :post="this.post" />

          <!-- Main Button Save On Mobile Screen -->
          <div class="text-center button--save--form d-block d-lg-none w-100">
            <button class="button is-primary" :class="{'is-loading': isLoading}" type="submit">
              Save
              Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
// Post Information
import PostInfo from "../../components/articles/PostInfo";
// Main Field Post
import MainFieldPost from "../../components/articles/MainFieldPost";
// Content Editor
import ContentEditor from "../../components/articles/editor/ContentEditor";

// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const articlesRepository = RepositoryFactory.get("posts");

export default {
  name: "articleForm",
  data() {
    return {
      breadcrumb: [
        {
          link: "/articles",
          label: "articles"
        },
        {
          link: "",
          label: "add & update article"
        }
      ],
      postInfo: {},
      postMainField: {},
      postMainFieldData: {},
      allCards: [],
      cardContent: [],
      isLoading: false,
      post: {}
    };
  },
  components: {
    PostInfo,
    ContentEditor,
    MainFieldPost
  },
  created() {
    if (this.$route.params.id) {
      this.getPost(this.$route.params.id);
    }
  },
  watch: {},
  methods: {
    // Set Data From Post Info Components
    setDataFromPostInfo(data) {
      this.postInfo = data;
    },
    // Set Data From Post Info Components
    setDataFromMainField(data) {
      this.postMainField = data;
    },
    // Set Data From Post Info Components
    setDataFromCardsContent(data) {
      this.allCards = data;
    },
    // Submit Form
    submitForm() {
      this.isLoading = false;

      let postCardContent = JSON.parse(JSON.stringify(this.allCards));
      if (postCardContent) {
        for (let key in postCardContent) {
          if (postCardContent[key].type === "image") {
            let valueImg = postCardContent[key].image;
            if (valueImg.id) {
              postCardContent[key].image = valueImg.id;
            }
          }
          if (postCardContent[key].type === "video") {
            let valueVideo = postCardContent[key].video;
            if (valueVideo.id) {
              postCardContent[key].video = valueVideo.id;
            }
          }
          if (postCardContent[key].type === "gallery") {
            let valueGallery = postCardContent[key].gallery;

            postCardContent[key].gallery = [];
            valueGallery.map(item => {
              postCardContent[key].gallery.push(item.id);
            });
          }
        }
      }

      // Set Data
      let data = {};
      data.title = this.postMainField.title;
      data.excerpt = this.postMainField.excerpt;
      data.type = 'article';
      if (this.postMainField.media) {
        data.media = this.postMainField.media;
      }
      data.status = this.postInfo.status;
      data.tags = this.postInfo.tags;
      data.categories = this.postInfo.categories;
      if (this.postInfo.format) {
        data.format = this.postInfo.format.value;
      }
      if (this.postInfo.author) {
        data.author = this.postInfo.author.id;
      } else {
          data.author = null
      }
      data.published_at = this.postInfo.published_at;
      data.content = postCardContent;
      this.isLoading = true;
      if (this.$route.params.id) {
        this.updatePost(this.$route.params.id, data);
      } else {
        this.newPost(data);
      }
    },
    // Add New Post
    async newPost(data) {
      const post = await articlesRepository.newPost(data);
      if (post.success) {
        this.successMessage(post.message);
        this.$router.push("/articleForm/" + post.data);
      } else {
        this.errorMessage(post[0]);
      }
      this.isLoading = false;
    },
    // Get Post Data
    async getPost(id) {
      const post = await articlesRepository.getPost(id);
      this.post = post;
    },
    // Update Post
    async updatePost(id, data) {
      const post = await articlesRepository.updatePost(id, data);
      if (post.success) {
        this.successMessage(post.message);
      } else {
        this.errorMessage(post[0]);
      }
      this.isLoading = false;
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
    changeSideBarStyle() {
      document.body.classList.add("editor--mini");
      this.$store.commit("miniSidebar");
    }
  }
};
</script>
