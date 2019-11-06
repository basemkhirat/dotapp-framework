<template>
    <div class="pages">
        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('menu')}}
                            <span class="badge--count" v-if="total">({{total}})</span>
                        </h1>
                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />
                    </div>
                    <div class="page--title--action ml-auto" @click="modalAddNewMenu = true">
                        <a class="button is-primary">{{$t('menuPage.addNewMenu')}}</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="row">
                <div class="col-12 col-lg-8">
                    <div class="card--block menus--blocks">
                        <div class="card-header">
                             <p class="card-header-title">
                                <span class="icon">
                                    <i class="fas fa-bars"></i>
                                </span>
                                Menus
                            </p>
                        </div>
                         <div class="card--content">
                            <VueNestable v-model="MainMenu" cross-list group="cross">
                                <VueNestableHandle slot-scope="{ item }" :item="item">
                                    {{item}}
                                    {{ item.title }}
                                </VueNestableHandle>
                            </VueNestable>
                         </div>
                    </div>

                </div>
                <!-- <div class="col-12 col-lg-4">
                    <VueNestable v-model="nestableItems3" cross-list group="cross">
                        <VueNestableHandle slot-scope="{ item }" :item="item">{{ item.text }}</VueNestableHandle>
                    </VueNestable>
                </div> -->

                <div class="col-12 col-lg-4">

                    <div class="card--block menus--blocks">
                        <div class="card--content">
                            <!-- Pages Block -->
                            <b-collapse aria-id="pages" :open="accordionPages" class="accordion" @open="checkAccordion('pages')">
                                <div
                                    class="card-header"
                                    slot="trigger"
                                    slot-scope="props"
                                    aria-controls="pages"
                                    role="button"
                                >
                                    <p class="card-header-title">
                                        <span class="icon">
                                            <i class="fas fa-flag"></i>
                                        </span>
                                        {{$t('pages')}}
                                    </p>
                                    <a class="card-header-icon">
                                        <b-icon
                                            :icon="props.open ? 'menu-down' : 'menu-up'">
                                        </b-icon>
                                    </a>
                                </div>
                                <div class="card--content">
                                    <form @submit.prevent="submitPages()">
                                        <b-field>
                                            <b-input
                                                expanded
                                                :placeholder="$t('search') + '...'"
                                                type="search"
                                                icon-pack="fa"
                                                icon="search"
                                                v-model="searchQueryPages"
                                            ></b-input>
                                        </b-field>
                                    </form>
                                    <div class="content--items">
                                        <VueNestable v-model="pages" cross-list group="cross">
                                            <VueNestableHandle slot-scope="{ item }" :item="item">{{ item.title }}</VueNestableHandle>
                                        </VueNestable>
                                    </div>
                                </div>
                            </b-collapse>
                            <!-- Category Block -->
                            <b-collapse aria-id="categories" :open="accordionCategories" @open="checkAccordion('categories')" class="accordion">
                                <div
                                    class="card-header"
                                    slot="trigger"
                                    slot-scope="props"
                                    aria-controls="categories"
                                    role="button"
                                >
                                    <p class="card-header-title">
                                        <span class="icon">
                                            <i class="fas fa-puzzle-piece"></i>
                                        </span>
                                        {{$t('categories')}}
                                    </p>
                                    <a class="card-header-icon">
                                        <b-icon
                                            :icon="props.open ? 'menu-down' : 'menu-up'">
                                        </b-icon>
                                    </a>
                                </div>
                                <div class="card--content">
                                    <form @submit.prevent="submitCategories()">
                                        <b-field>
                                            <b-input
                                                expanded
                                                :placeholder="$t('search') + '...'"
                                                type="search"
                                                icon-pack="fa"
                                                icon="search"
                                                v-model="searchQueryCategories"
                                            ></b-input>
                                        </b-field>
                                    </form>
                                    <div class="content--items">
                                        <VueNestable v-model="categories" cross-list group="cross">
                                            <VueNestableHandle slot-scope="{ item }" :item="item">{{ item.title }}</VueNestableHandle>
                                        </VueNestable>
                                    </div>
                                </div>
                            </b-collapse>
                            <!-- Tags Block -->
                            <b-collapse aria-id="tags" :open="accordionTags" class="accordion" @open="checkAccordion('tags')">
                                <div
                                    class="card-header"
                                    slot="trigger"
                                    slot-scope="props"
                                    aria-controls="tags"
                                    role="button"
                                >
                                    <p class="card-header-title">
                                        <span class="icon">
                                            <i class="fas fa-tags"></i>
                                        </span>
                                        {{$t('tags')}}
                                    </p>
                                    <a class="card-header-icon">
                                        <b-icon
                                            :icon="props.open ? 'menu-down' : 'menu-up'">
                                        </b-icon>
                                    </a>
                                </div>
                                <div class="card--content">
                                    <form @submit.prevent="submitTags()">
                                        <b-field>
                                            <b-input
                                                expanded
                                                :placeholder="$t('search') + '...'"
                                                type="search"
                                                icon-pack="fa"
                                                icon="search"
                                                v-model="searchQueryTags"
                                            ></b-input>
                                        </b-field>
                                    </form>
                                    <div class="content--items">
                                        <VueNestable v-model="tags" cross-list group="cross">
                                            <VueNestableHandle slot-scope="{ item }" :item="item">{{ item.title }}</VueNestableHandle>
                                        </VueNestable>
                                    </div>
                                </div>
                            </b-collapse>

                        </div>

                    </div>
                </div>
            </div>
        </div>


        <!-- Modal Add New Menu -->
            <b-modal :active.sync="modalAddNewMenu"
                has-modal-card full-screen :can-cancel="false">

                <div class="modal-card" style="width: 400px">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Add New Menu</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Menu Name">
                            <b-input
                                type="text"
                                v-model="menuName"
                                placeholder="Menu Name">
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot justify-content-center">
                        <button class="button" type="button" @click="modalAddNewMenu = false">Close</button>
                        <button class="button is-primary" @click="createNewMenu">Add</button>
                    </footer>
                </div>
            </b-modal>
    </div>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const pagesRepository = RepositoryFactory.get("pages");
const categoriesRepository = RepositoryFactory.get('categories')
const tagsRepository = RepositoryFactory.get('tags')
import { VueNestable, VueNestableHandle } from "vue-nestable";

export default {
    name: "menus",
    data() {
        return {
            menus: [],
            total: null,
            page: 1,
            limit: 5,
            order: "is-centered",
            dataLoading: true,
            drag: false,
            modalAddNewMenu: false,
            menuName: '',
            breadcrumb: [
                {
                    link: "",
                    label: this.$t("menuPage.breadcrumb[0]")
                }
            ],
            searchQueryPages: "",
            searchQueryCategories: "",
            searchQueryTags: "",
            pages: [],
            categories: [],
            tags: [],
            filtersPages: {
                searchQuery: ""
            },
            filtersCategories: {
                searchQuery: ""
            },
            filtersTags: {
                searchQuery: ""
            },
            MainMenu: [
                {
                    id: 0,
                    title: "Andy"
                },

            ],

            accordionPages: false,
            accordionCategories: false,
            accordionTags: false,

        };
    },
    components: {
        VueNestable,
        VueNestableHandle,
    },

    watch: {
        // Search Query
        searchQueryPages() {
            this.filtersPages.searchQuery = this.searchQueryPages;
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.fetchPages(this.filtersPages);
            }, 300);
        },
        // Search Query
        searchQueryCategories() {
            this.filtersCategories.searchQuery = this.searchQueryCategories;
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.fetchCategories(this.filtersCategories);
            }, 300);
        },
        // Search Query
        searchQueryTags() {
            this.filtersTags.searchQuery = this.searchQueryTags;
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.fetchTags(this.filtersTags);
            }, 300);
        }
    },
    created() {
        // this.fetchPages();
        // this.fetchCategories();
        // this.fetchTags();
    },
    methods: {
        async fetchPages(filters) {
            this.dataLoading = true;
            const pages = await pagesRepository.getAllPages(
                this.page,
                this.limit,
                filters
            );
            this.pages = pages.data.docs.map( item => {
                return {id: item.id, title: item.title, children: []}
            });
        },
        async fetchCategories(filters) {
            const categories = await categoriesRepository.getAllCategories(
                this.page,
                this.limit,
                filters
            );
            this.categories = categories.data.docs.map( item => {
                return {id: item.id, title: item.name, children: []}
            });
        },
        async fetchTags(filters) {
            const tags = await tagsRepository.getAllTags(
                this.page,
                this.limit,
                filters
            );
            this.tags = tags.data.docs.map( item => {
                return {id: item.id, title: item.name, children: []}
            });
        },

        submitTags() {
            this.fetchTags();
        },
        submitCategories() {
            this.fetchCategories();
        },
        submitPages() {
            this.fetchPages();
        },
        checkAccordion(item) {
            this.accordionPages = false
            this.accordionTags = false
            this.accordionCategories = false
            if(item === 'pages') {
                this.accordionPages = true
            }
            if(item === 'tags') {
                this.accordionTags = true
            }
            if(item === 'categories') {
                this.accordionCategories = true
            }
        },

        createNewMenu() {

        }
    }
};
</script>

<style>
/*
* Style for nestable
*/
.nestable {
    position: relative;
}
.nestable .nestable-list {
    margin: 0;
    padding: 0 0 0 40px;
    list-style-type: none;
}
.nestable > .nestable-list {
    padding: 0;
}
.nestable-item,
.nestable-item-copy {
    margin: 5px 0 0;
}

.nestable-handle{
     display: block;
    margin: 5px 0;
    padding: 5px 10px;
    color: #333;
    text-decoration: none;
    border: 1px solid #e7eaec;
    background: #f5f5f5;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    box-sizing: border-box;
        color: inherit;
    border: 1px dashed #e7eaec;
    background: #f3f3f4;
    padding: 10px;
    font-size: 13px;
}
.nestable-item:first-child,
.nestable-item-copy:first-child {
    margin-top: 0;
}
.nestable-item .nestable-list,
.nestable-item-copy .nestable-list {
    margin-top: 5px;
}
.nestable-item {
    position: relative;
}
.nestable-item.is-dragging .nestable-list {
    pointer-events: none;
}
.nestable-item.is-dragging * {
    opacity: 0;
    filter: alpha(opacity=0);
}
.nestable-item.is-dragging:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    border: 1px dashed #ccc;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
.nestable-drag-layer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
}
.nestable-drag-layer > .nestable-list {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    /* background-color: rgba(106, 127, 233, 0.274); */
}
.nestable [draggable="true"] {
    cursor: move;
}

.nestable-list-empty{
    padding: 15px;
    text-align: center;
    text-transform: capitalize;
    margin-top: 20px;
    margin-bottom: 0;
    color: #999;
}

</style>
