<template>
    <div>
         <b-table
                :data="data"
                :paginated="false"
                :default-sort-direction="defaultSortDirection"
                :checked-rows.sync="checkedRows"
                checkable
                :striped="false"
                default-sort="id">
                <template slot-scope="props">
                    <b-table-column field="id" label="Id" sortable centered width="50">
                        {{ props.row.id }}
                    </b-table-column>
                    <b-table-column field="name" label="Name" sortable centered>
                        {{ props.row.name }}
                    </b-table-column>
                    <b-table-column field="userCount" label="Users"  sortable centered>
                        {{props.row.usersCount}}
                    </b-table-column>
                    <b-table-column label="Actions" centered width="200">
                        <button class="button--circle is-primary-light"><i class="fas fa-pen"></i></button>
                        <button class="button--circle is-danger-light"><i class="fas fa-trash"></i></button>
                    </b-table-column>

                </template>
                <template slot="bottom-left">
                    <button class="button is-danger is-rounded" v-if="checkedRows.length">
                        Delete Checked
                    </button>
                </template>
                <template slot="empty">
                    <section class="section table--loading">
                        <div class="content has-text-grey has-text-centered">
                            <template v-if="!isLoadingData">
                                <p>
                                    <b-icon
                                        icon="emoticon-sad"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>Nothing here.</p>
                            </template>
                            <template v-else>
                                <b-loading :is-full-page="false" :active.sync="isLoadingData"></b-loading>
                            </template>

                        </div>
                    </section>
                </template>

            </b-table>
            <b-pagination
                :total="totalArticles"
                :current.sync="pageCurrent"
                :order="order"
                :rounded="isRounded"
                :per-page="defaultPerPage">
            </b-pagination>
    </div>
</template>



<script>
export default {
    props:['data'],
    data () {
            return {
                modalViewArticle: false,
                checkedRows: [],
                defaultSortDirection: 'desc',
                totalArticles: 100,
                defaultPerPage: 25,
                pageCurrent: 1,
                order: 'is-centered',
                size: '',
                isRounded: true,
                isLoadingData: true,
                userDefaultStage: null,
            };
        },
    components: {
        
    }
}
</script>
