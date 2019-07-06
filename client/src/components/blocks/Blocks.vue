<template>
    <!-- Blocks Modal -->
    <div>
         <!-- Modal Filter By Date -->
          <b-modal
          :has-modal-card="false"
          :active.sync="modalBlocks"
          :can-cancel="false"
          @close="closeBlockModal"
          :width="1400" scroll="keep"
          class="modal--custom blocks">
                <div class="page--head">
                    <div class="wrap--content">
                        <div class="page--title">
                            <div>
                                <h2 class="title--text">
                                    Blocks
                                    <span class="badge--count" v-if="total">
                                        ({{total}})
                                    </span>
                                </h2>
                            </div>
                            <div class="page--title--action ml-auto">
                                <button class="button is-dark" @click="closeBlockModal()">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="wrap--content">
                    <template v-if="dataLoading">
                        <loading-data></loading-data>
                    </template>
                    <template v-else>
                        <list :data="blocks" v-if="blocks.length" />
                        <template v-else>
                            <no-data text="No blocks have been created"/>
                        </template>
                    </template>
                    <template v-if="blocks.length">
                        <div class="pagination--custom--number">
                            <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                            </b-pagination>
                        </div>
                    </template>
                </div>

          </b-modal>
    </div>
</template>

<script>

import {mapState} from 'vuex'
import List from './list'

// Repository Data
import {
    RepositoryFactory
} from '../../repositories/RepositoryFactory'
const blocksRepository = RepositoryFactory.get('blocks')

export default {
    data () {
        return {
            modalBlocks: false,
            page: 1,
            limit: 10,
            total: null,
            order: 'is-centered',
            dataLoading: true,
            blocks: [],
        }
    },
    watch:{
        blockModal(){
            this.modalBlocks = this.blockModal
        },
        modalBlocks(){
            if(this.modalBlocks){
                this.fetchAllItems()
            }
        }
    },
    computed:{
        ...mapState({
            blockModal: state => state.blockModal
        })
    },
    components:{
        List,
    },
    created(){
        if(this.modalBlocks) {
            this.fetchAllItems()
        }
    },
    methods:{
        closeBlockModal(){
            this.$store.commit('closeBlocksModal')
        },
        // Fetch All Items
        async fetchAllItems(filters) {
            this.dataLoading = true
            const blocks = await blocksRepository.getAllBlocks(this.page, this.limit, filters)
            this.total = blocks.data.total;
            this.blocks = blocks.data.docs;
            this.dataLoading = false;
        },
    }
}
</script>

<style>

</style>
