<template>
    <div class="col-12 col-lg-4">
        <!-- <div class="card--block"> -->
            <!-- <div class="card--content"> -->
                <!-- Status -->
                <!-- <div class="post--info--item">
                    <b-field class="field-group align-items-center justify-content-between">
                        <label class="label">Status</label>
                        <b-switch
                            v-model="postInfo.status"
                            :true-value="1"
                            :false-value="0"
                        >Published</b-switch>
                    </b-field>
                </div> -->
                <!-- Schedule Date -->
                <!-- <div class="post--info--item">
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
                </div>-->
            <!-- </div>
        </div> -->

        <!-- Add Tags -->
        <div class="card--block">
            <div class="card--content">
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">{{$t('eventDateAndTime')}}</label>
                        <datetime
                            type="datetime"
                            class="custom--datetime theme-primary"
                            :placeholder="$t('eventDate')"
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
                        <label class="label">{{$t('type')}}</label>
                        <div>
                            <v-select
                                :options="allType"
                                v-model="typeContent"
                                label="name"
                                :placeholder="$t('type')"
                                class="select--with--icon w-100 v--select--scroll"
                            >
                                <template slot="option" slot-scope="option">{{ option.name }}</template>
                            </v-select>
                            <!-- Event Price -->
                            <div v-if="typeContent.value === 'paid'">
                                <b-field class="mt-3">
                                    <b-select v-model="postInfo.currency">
                                        <option value="£">£</option>
                                        <option value="$">$</option>
                                        <option value="€">€</option>
                                    </b-select>
                                    <b-input
                                        type="number"
                                        class="w-100"
                                        :placeholder="$('eventPrice')"
                                        v-model="postInfo.price"
                                    />
                                </b-field>
                            </div>
                        </div>
                    </b-field>
                </div>
                <!-- Categories -->
                <div class="post--info--item">
                    <b-field class="field-group flex-column">
                        <label class="label">{{$t('categories')}}</label>
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
                        <label class="label">{{$t('address')}}</label>
                        <div class="field has-addons">
                            <b-autocomplete
                                v-model="place"
                                :placeholder="$t('address')"
                                :open-on-focus="true"
                                :allow-new="false"
                                :data="places"
                                field="name"
                                expanded
                                :loading="placesFilterLoading"
                                @typing="getFilteredPlaces"
                                @select="option => selectedPlace = option"
                            ></b-autocomplete>
                        </div>
                        <b-input
                            type="textarea"
                            class="w-100"
                            rows="3"
                            :placeholder="$t('locationEmbed')"
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
const placesRepository = RepositoryFactory.get("places");

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
                place: "",
                map: "",
                price: "",
                currency: "£"
            },
            filteredTags: [],
            tagsFilterLoading: false,
            placesFilterLoading: false,
            scheduleDate: "",
            places: [],
            page: 1,
            limit: 10,
            selectedPlace: null,
            place: "",
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
                this.postInfo.currency = this.post.currency;
                this.postInfo.place = this.post.place.id;
                if (this.post.place) {
                    this.place = this.post.place.name;
                    if (this.post.place.parent) {
                        this.place =
                            this.place + "-" + this.post.place.parent.name;
                        if (this.post.place.parent.parent) {
                            this.place =
                                this.place +
                                "-" +
                                this.post.place.parent.parent.name;
                        }
                    }
                }

                this.postInfo.map = this.post.map;
                if (this.post.type === "free") {
                    this.typeContent = { value: "free", name: "Free" };
                } else if (this.post.type === "paid") {
                    this.typeContent = { value: "paid", name: "Paid" };
                }

            }
        },

        place() {
            if(this.selectedPlace) {
                 this.postInfo.place = this.selectedPlace.id
            }
        },

        typeContent() {
            this.postInfo.type = this.typeContent.value;
        }
    },
    created() {
        this.fetchAllCategories();
        this.fetchAllPlaces();
    },
    mounted() {
        this.sentDataToParent();
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
        },

        getFilteredPlaces(text) {
            let filters = {};
            filters.searchQuery = text;
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.fetchAllPlaces(filters);
            }, 500);
        },

        // Fetch Places
        async fetchAllPlaces(filters) {
            this.placesFilterLoading = true;
            const places = await placesRepository.getAllPlaces(
                this.page,
                this.limit,
                filters
            );
            this.places = places.data.docs;
            this.placesFilterLoading = false;
        }
    }
};
</script>
