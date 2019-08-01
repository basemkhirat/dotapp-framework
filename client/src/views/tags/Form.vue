<template>
    <div class="tags--page">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                        {{$t('tags')}}
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                    <div class="page--title--action ml-auto"
                        v-if="this.$route.params.id && isInUserPermissions('tag.create')">
                        <router-link to="/tagForm" class="button is-primary ">{{$t('tagsPage.addNewTag')}}</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap--content">
            <div class="card--block">
                <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-md-10 col-lg-8">
                            <b-field class="field-group ">
                                <b-input :placeholder="$t('name')" v-model="name" />
                            </b-field>
                        </div>

                        <div class="col-12 text-center button--save--form ">
                            <button class="button is-primary "
                                :class="{'is-loading': isLoading}">{{this.$route.params.id ? $t('saveChanges') : $t('add')}}</button>
                        </div>
                    </form>
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
    const tagsRepository = RepositoryFactory.get('tags')
    export default {
        name: 'TagForm',
        data() {
            return {
                name: '',
                isLoading: false,
                breadcrumb: [{
                    link: '/tags',
                    label: this.$t("tagsPage.breadcrumb[0]")
                }, {
                    link: '',
                    label: this.$t("tagsPage.breadcrumb[1]")
                }]
            };
        },
        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.getTag(this.$route.params.id)
                } else {
                    this.resetfuild()
                }
            },
        },
        created() {
            if (this.$route.params.id) {
                this.getTag(this.$route.params.id)
            }
        },
        methods: {
            resetfuild() {
                this.name = ''
            },

            submitForm() {
                this.isLoading = false
                let data = {}
                data.name = this.name

                this.isLoading = true
                if (this.$route.params.id) {
                    this.updateTag(this.$route.params.id, data)
                } else {
                    this.newTag(data)
                }
            },

            async newTag(data) {
                const tag = await tagsRepository.newTag(data)
                if (tag.success) {
                    this.successMessage(tag.message)
                    this.$router.push('/tagForm/' + tag.data)
                } else {
                    this.errorMessage(tag[0])
                }
                this.isLoading = false
            },

            async getTag(data) {
                const tag = await tagsRepository.getTag(data)
                this.name = tag.name

            },
            async updateTag(id, data) {
                const tag = await tagsRepository.updateTag(id, data)
                if (tag.success) {
                    this.successMessage(tag.message)
                } else {
                    this.errorMessage(tag[0])
                }
                this.isLoading = false
            },

            errorMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-danger',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },
            successMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },
        }
    }
</script>
