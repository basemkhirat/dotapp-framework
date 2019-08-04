<template>
    <b-modal
        :canCancel="false"
        :width="580"
        :active.sync="uploadFileFromParent"
        scroll="keep"
        class="modal--custom modalUploadFiles"
    >
        <div class="modal--content">
            <form @submit.prevent="submitForm">
                <h3>{{$t('upload')}}</h3>
                <section class="modal-card-body p-4">
                    <b-input
                        icon-pack="fas"
                        icon="link"
                        :disabled="files.length >= 1"
                        :placeholder="$t('url')"
                        type="url"
                        v-model="itemLink"
                    ></b-input>
                    <div class="text-gray py-4 text-center">{{$t('or')}}</div>
                    <div class="text-center">
                        <button
                            class="button is-dark"
                            type="button"
                            @click="uploadFiles"
                            :disabled="itemLink.length >=1"
                        >
                            <span v-if="files.length">{{ files.length }} {{$t('fileSelected')}}</span>
                            <span v-else>
                                {{$t('selectFiles')}}
                                <i class="fas fa-cloud-upload-alt ml-2"></i>
                            </span>
                        </button>
                        <input
                            type="file"
                            multiple
                            hidden
                            ref="inputFiles"
                            @input="handelFiles($event)"
                        />
                    </div>
                </section>

                <hr class="mt-0" />
                <div class="d-flex justify-content-center">
                    <button
                        class="button is-light mr-2"
                        type="button"
                        @click="closeModalUploadFile({newItem: false})"
                    >{{$t('cancel')}}</button>
                    <button
                        class="button is-primary"
                        type="submit"
                        :class="{'is-loading': isLoading}"
                    >{{$t('add')}}</button>
                </div>
            </form>
        </div>
    </b-modal>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
import { setTimeout } from "timers";
const mediaRepository = RepositoryFactory.get("media");

export default {
    props: ["uploadFileFromParent"],
    data() {
        return {
            files: [],
            isLoading: false,
            filesName: [],
            itemLink: "",
            handelUpload: true
        };
    },
    mounted() {},
    methods: {
        closeModalUploadFile(data) {
            this.$emit("changeModalUploadFiles", data);
            this.resetfuild();
        },
        uploadFiles() {
            this.$refs.inputFiles.click();
        },
        handelFiles(event) {
            const files = event.target.files;
            var vm = this;
            Array.from(files).forEach(file => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                this.filesName.push(file.name);

                reader.onload = function() {
                    vm.files.push(reader.result);
                };
            });
        },
        resetfuild() {
            (this.itemLink = ""), (this.files = []);
        },
        submitForm() {
            this.isLoading = false;
            let data = {};
            if (this.itemLink) {
                data.payload = this.itemLink;
                this.isLoading = true;
                this.newMediaItem(data);
            } else {
                if (this.files.length) {
                    this.isLoading = true;
                    data.payload = this.files[0];
                    this.newMediaItem(data);
                }
            }
        },

        async newMediaItem(data) {
            const items = await mediaRepository.newMediaItem(data);

            if (items.success) {
                this.successMessage(items.message);
                if (this.files.length > 1) {
                    this.files.splice(0, 1);
                    this.submitForm();
                } else if (this.files.length === 1) {
                    this.files = [];
                    this.submitForm();
                    this.closeModalUploadFile({ newItem: true });
                    this.isLoading = false;
                }
            } else {
                this.errorMessage(items.message);
                if (this.files.length > 1) {
                    this.files.splice(0, 1);
                    this.submitForm();
                } else if (this.files.length === 1) {
                    this.files = [];
                    this.submitForm();
                    this.closeModalUploadFile({ newItem: true });
                    this.isLoading = false;
                }
            }
            // this.isLoading = false
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
        }
    }
};
</script>
