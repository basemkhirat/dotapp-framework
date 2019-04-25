<template>
    <div>
          <div class="row" v-if="data">
               <div class="col-6 col-md-4 col-lg-3 col-xl-2" v-for="item in data" :key="item.id">
                    <div class="media--item">
                         <img :src="item.images" alt="" @click="quickEdit(item)">
                         <div class="media--action d-flex justify-content-between"  :class="{'showItemAction': checkItemsGroup.length}">
                              <a class="media--action--check custom--ckeckbox">
                                   <b-checkbox :native-value="item.id" v-model="checkItemsGroup"></b-checkbox>
                              </a>
                              <a class="media--action--edit" @click="quickEdit(item)">
                                   Edit
                                   <i class="fa fa-pen ml-1"></i>
                              </a>
                         </div>
                    </div>
               </div>          
          </div>
          <!-- Modal Quick Edit -->
          <b-modal :canCancel="false" :width="640" :active.sync="modalQuickEdit" scroll="keep" class="modal--custom modal--edit--images">
               <div class="modal--content">
                    <h3 class="modal-card-title">Edit Image</h3>
                    <section class="modal-card-body" v-if="itemSelected">
                         <img :src="itemSelected.images" alt="">
                         <div class="content--edit--image mt-3">
                              <b-field>
                                   <b-input 
                                   rounded 
                                   v-model="itemSelected.title"
                                   placeholder="Title" type="text"></b-input>
                              </b-field>
                              <b-field>
                                   <b-input 
                                   placeholder="Description" 
                                   v-model="itemSelected.description"
                                   rows="2"
                                   type="textarea"></b-input>
                              </b-field>

                              <div class="field has-addons justify-content-center">
                                   <p class="control flex-fill">
                                        <a class="button is-rounded w-100"
                                        v-clipboard:copy="itemSelected.images"
                                        v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"
                                        >
                                             <span class="icon is-small">
                                                  <i class="fas fa-link"></i>
                                             </span>
                                             <span>Copy link</span>
                                        </a>
                                   </p>
                                   <p class="control flex-fill">
                                        <a class="button w-100">
                                             <span class="icon is-small">
                                                  <i class="fas fa-crop"></i>
                                             </span>
                                             <span>Crop</span>
                                        </a>
                                   </p>
                                   <p class="control flex-fill">
                                        <a class="button w-100" target="_blank" :href="itemSelected.images">
                                             <span class="icon is-small">
                                                  <i class="fas fa-external-link-square-alt"></i>
                                             </span>
                                             <span>External</span>
                                        </a>
                                   </p>
                                   <p class="control flex-fill">
                                        <a class="button is-rounded w-100">
                                             <span class="icon is-small">
                                                  <i class="fas fa-trash"></i>
                                             </span>
                                             <span>Delete</span>
                                        </a>
                                   </p>
                              </div>
                         </div>
                    </section>
                    
                    <hr class="mt-0">
                    <div class="d-flex justify-content-center">
                         <button class="button is-rounded is-light mr-2" @click="modalQuickEdit = false">Cancel</button>
                         <button class="button is-primary is-rounded">Save</button>
                    </div>    
               </div>
          </b-modal>
    </div>

</template>

<script>
export default {
     props:['data'],
     data(){
          return{
               checkItemsGroup:[],
               modalQuickEdit: false,
               itemSelected: {}
          }
     },
     watch:{
          checkItemsGroup(){
               this.$store.commit('checkItemsSelected', this.checkItemsGroup.length)
          }
     },
     methods:{
          quickEdit(item){
               this.modalQuickEdit = true
               this.itemSelected = item
          },

          // Copy Link Function
          onCopy: function () {
               // this.$snackbar.open(`copy to clipboard`)
               this.$snackbar.open({
                    message: 'copy to clipboard',
                    type: 'is-success',
               })
          },
          onError: function () {
               this.$snackbar.open({
                    message: 'Failed to copy Link',
                    type: 'is-danger',
               })
          }

     }
}
</script>

