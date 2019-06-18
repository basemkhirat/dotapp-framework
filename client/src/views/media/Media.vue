<template>
  <div class="media--page">
    <div class="page--title">
      <h1 class="title--text">
        Media
        <span class="badge--count" v-if="total">
          ({{total}})
        </span>
      </h1>
      <div class="page--title--action ml-auto" v-if="isInUserPermissions('role.create')">
           <button class="button is-primary is-rounded"  @click="changeModalUploadFiles">
                Upload
                <i class="fas fa-cloud-upload-alt ml-2"></i>
            </button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <breadcrumb :links="breadcrumb" />

    <!-- Content Media Page -->
    <media-component  @setTotalItems="setTotalItems" ref="mediaComponent"/>

  </div>
</template>

<script>

import MediaComponent from './../../components/media/MediaComponent'
export default {
  name: 'media',
  data () {
        return {
            total: '',
            breadcrumb:[{link: '', label:'media'}]
        };
    },
  components: {
    MediaComponent,
  },
  created(){
  },
  watch:{

  },
  methods:{
      setTotalItems(total){
          this.total = total
      },
      changeModalUploadFiles(){
          this.$refs.mediaComponent.changeModalUploadFiles()

      }

  }
}
</script>
