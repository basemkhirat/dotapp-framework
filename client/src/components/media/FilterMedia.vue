<template>
     <div class="filter--media py-4">
          <div class="row align-items-center">
               <div class="col-12 col-md-7">
                    <v-select :options="allTypes" v-model="type" label="title"
                    class="select--with--icon v--select--scroll my-2 my-md-0" v-if="previewItemAction">
                         <template slot="option" slot-scope="option">
                              {{ option.title }}
                         </template>
                    </v-select>
                    <v-select :options="orderOptions" v-model="order" label="title"
                    class="select--with--icon ml-0 ml-md-4 v--select--scroll my-2 my-md-0">
                         <template slot="option" slot-scope="option">
                              {{ option.title }}
                         </template>
                    </v-select>
               </div>
               <div class="col-12 col-md-5">
                    <div class="search">
                         <b-input :placeholder="$t('search') + '...'"
                              type="search"
                              icon-pack="fa"
                              v-model="searchQuery"
                              icon="search">
                         </b-input>
                    </div>
               </div>
          </div>
     </div>

</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const mediaRepository = RepositoryFactory.get('media')
    import {mapState} from 'vuex'
    import {order} from './../../helpers/Variables'
export default {
     data(){
          return {
               typeOptions: [
                    {
                         title: 'All',
                         icon: 'fas fa-clone',
                         value: 'all'
                    },
                    {
                         title: 'Images',
                         icon: 'fas fa-images',
                         value: 'image'
                    },
                    {
                         title: 'Videos',
                         icon: 'fas fa-play-circle',
                         value: 'video'
                    },
                    {
                         title: 'Audio',
                         icon: 'fas fa-volume-up',
                         value: 'audio'
                    },
                    {
                         title: 'Document',
                         icon: 'fas fa-file',
                         value: 'document'
                    }
               ],
               orderOptions: order,
               type: this.$t('all'),
               order: 'Recent',
               filters: {},
               searchQuery: '',
               allTypes: [],
          }
     },
     computed:{
          ...mapState({
               previewItemAction: state => state.media.previewItemAction,
          })
     },
     watch:{
          type(){
               if(this.type.type === 'all'){
                    this.filters.type = ''
                    this.$emit('changeFilters', this.filters)

               } else {
                    this.filters.type = this.type.type
                    this.$emit('changeFilters', this.filters)
               }
          },
          order(){
               this.filters.order = this.order.value
               this.$emit('changeFilters', this.filters)
          },
          searchQuery(){
               this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('changeFilters', this.filters)
                }, 500);

          },
     },
     created(){
         this.getMediaType()
     },


     methods:{
        //  Get Media Types
        async getMediaType() {
            const types = await mediaRepository.getMediaType()
            this.allTypes = types
            this.allTypes.unshift({title: this.$t('all'), type: 'all'})
        },
     }
}
</script>

