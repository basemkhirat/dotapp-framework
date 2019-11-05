<template>
    <div class="media--page">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('media')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                    <div class="page--title--action ml-auto" v-if="isInUserPermissions('role.create')">
                        <button class="button is-primary btn--upload--media" @click="changeModalUploadFiles">
                            {{$t('upload')}}
                            <i class="fas fa-cloud-upload-alt ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <!-- Content Media Page -->
            <media-component @setTotalItems="setTotalItems" ref="mediaComponent" />
        </div>

    </div>
</template>

<script>
    import MediaComponent from './../../components/media/MediaComponent'
    export default {
        name: 'media',
        data() {
            return {
                total: '',
                breadcrumb: [{
                    link: '',
                    label: this.$t('mediaPage.breadcrumb[0]')
                }]
            };
        },
        components: {
            MediaComponent,
        },
        created() {},
        watch: {

        },
        methods: {
            setTotalItems(total) {
                this.total = total
            },
            changeModalUploadFiles() {
                this.$refs.mediaComponent.changeModalUploadFiles()

            }

        }
    }
</script>
