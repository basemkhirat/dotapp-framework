<template>
    <div>
        <div class="pb-0">
            <!-- Filter Media -->
            <filter-media @changeFilters="changeFilters" />

            <!-- Items Media -->
            <div>
                <template v-if="dataLoading">
                    <div
                        class="media--items--wrap d-flex align-items-center justify-content-center w-100"
                    >
                        <loading-data></loading-data>
                    </div>
                </template>

                <template v-else>
                    <div class="media--items--wrap">
                        <div class="media--items">
                            <media-items
                                :data="items"
                                @checkItemsMedia="checkItemsMedia"
                                @fetchAllItems="fetchAllItems"
                            />
                            <div class="py-4 text-center w-100">
                                <infinite-loading @infinite="infiniteHandler">
                                    <div slot="no-more"></div>
                                    <div slot="no-results"></div>
                                </infinite-loading>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Modal Upload Files -->
        <upload-files
            :uploadFileFromParent="mediaModalUploadFile"
            @changeModalUploadFiles="changeModalUploadFiles"
        />

        <!-- Modal Create Album -->
        <create-album
            :modalCreateAlbum="modalCreateAlbum"
            @changeModalCreateAlbum="changeModalCreateAlbum"
        />

        <!-- Action Lower Page -->
        <div class="all--actions" :class="{'show--action--bottom': itemsSelectedMedia.length}">
            <div class="wrap--content">
                <!-- <button class="button is-warning" @click="banItems()">Ban All Selected</button> -->
                <button
                    class="button is-danger"
                    @click="confirmCustomDelete()"
                >{{$t('deleteAllSelected')}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import filterMedia from "./FilterMedia";
import mediaItems from "./MediaItems";
import uploadFiles from "./UploadFiles";
import createAlbum from "./CreateAlbum";

// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const mediaRepository = RepositoryFactory.get("media");

import InfiniteLoading from "vue-infinite-loading";

export default {
    data() {
        return {
            mediaModalUploadFile: false,
            modalCreateAlbum: false,
            items: [],
            total: null,
            allUserSelected: false,
            page: 1,
            pageLoadMore: 2,
            limit: 25,
            order: "is-centered",
            dataLoading: false,
            filters: {},
            itemsSelectedMedia: [],
            filtersItems: {}
        };
    },
    created() {
        this.fetchAllItems();
    },
    components: {
        filterMedia,
        mediaItems,
        uploadFiles,
        createAlbum,
        InfiniteLoading
    },

    methods: {
        changeModalUploadFiles(data) {
            this.mediaModalUploadFile = !this.mediaModalUploadFile;
            if (data && data.newItem == true) {
                this.fetchAllItems();
            }
        },

        changeModalCreateAlbum() {
            this.modalCreateAlbum = !this.modalCreateAlbum;
        },

        // Get All Media
        async fetchAllItems() {
            this.pageLoadMore = 2;
            this.dataLoading = true;
            this.filters.type = this.filtersItems.type;
            const data = await mediaRepository.getAllMedia(
                this.page,
                this.limit,
                this.filters
            );
            this.items = data.docs;
            this.total = data.total;
            this.$emit("setTotalItems", data.total);
            this.dataLoading = false;
            this.itemsSelectedMedia = [];
        },

        checkItemsMedia(items) {
            this.itemsSelectedMedia = items;
        },

        confirmCustomDelete() {
            this.$dialog.confirm({
                title: this.$t("mediaPage.messages.deleteItems.title"),
                message: this.$t("mediaPage.messages.deleteItems.message"),
                confirmText: this.$t(
                    "mediaPage.messages.deleteItems.confirmText"
                ),
                cancelText: this.$t(
                    "mediaPage.messages.deleteItems.cancelText"
                ),
                type: "is-danger",
                hasIcon: true,
                onConfirm: () => {
                    this.deleteItems();
                }
            });
        },
        // Confirm Set Images To Gallery From Posts
        confirmCustomSetGallery() {
            this.$dialog.confirm({
                title: this.$t("mediaPage.messages.setToGallery.title"),
                message: this.$t("mediaPage.messages.setToGallery.message"),
                confirmText: this.$t(
                    "mediaPage.messages.setToGallery.confirmText"
                ),
                cancelText: this.$t(
                    "mediaPage.messages.setToGallery.cancelText"
                ),
                type: "is-primary",
                icon: "information-outline",
                hasIcon: true,
                onConfirm: () => {
                    this.$store.commit(
                        "setItemSelected",
                        this.itemsSelectedMedia
                    );
                    this.$store.commit("openMediaImage");
                }
            });
        },

        // Delete Items
        async deleteItems() {
            const items = await mediaRepository.deleteItems(
                this.itemsSelectedMedia
            );
            this.fetchAllItems();
            this.aleartMessage(items.message);
        },

        async infiniteHandler($state) {
            const data = await mediaRepository.getAllMedia(
                this.pageLoadMore,
                this.limit,
                this.filters
            );
            if (data.docs.length) {
                this.pageLoadMore += 1;
                this.items.push(...data.docs);
                $state.loaded();
            } else {
                $state.complete();
            }
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

        // Filters
        changeFilters(filters) {
            this.filtersItems = filters;
            this.filters = filters;
            this.fetchAllItems();
        }
    }
};
</script>
