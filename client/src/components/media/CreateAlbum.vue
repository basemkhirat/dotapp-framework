<template>
     <b-modal :canCancel="false" :width="580" :active.sync="modalCreateAlbum" scroll="keep" class="modal--custom">
          <div class="card">
               <header class="modal-card-head text-center">
                    <p class="modal-card-title">Add to album</p>
               </header>
               <section class="modal-card-body p-5">
                    <div class="text-center">
                         <v-select :options="albumOptions" v-model="albumModel" label="title" class="select--with--icon w-100">
                              <template slot="option" slot-scope="option">
                                   <span :class="option.icon"></span>
                                   {{ option.title }}
                              </template>
                         </v-select>
                    </div>
                    
                    <div class="text-center mt-4">
                         <transition name="slide-left">
                              <button class="button is-rounded is-light is-large" @click="createNewAlbum = !createNewAlbum">
                                   Create Album <i class="fas fa-plus ml-2"></i>
                              </button>
                         </transition>
                    </div>
                    <transition name="slide-left">
                         <div class="text-center mt-4" v-if="createNewAlbum">
                              <b-field class="mb-0">
                                   <b-input 
                                   icon-pack="fas"
                                   icon="images"
                                   expanded
                                   rounded 
                                   placeholder="New Album" type="text"></b-input>
                                   <p class="control">
                                        <button class="button is-primary is-rounded">Add</button>
                                   </p>
                              </b-field>
                         </div>
                    </transition>
                    
               </section>
               
               <div class="modal--footer px-3">
                    <hr class="mt-0">
                    <div class="d-flex justify-content-center pb-4">
                         <button class="button is-rounded is-light mr-2" @click="closeModalCreateAlbum">Cancel</button>
                         <button class="button is-primary is-rounded">Done</button>
                    </div>    
               </div>
          </div>
     </b-modal>
</template>

<script>
     
     export default {
          props:['modalCreateAlbum'],
          data(){
               return{
                    createNewAlbum: false,
                    albumOptions: [
                         {
                              title: 'Album Name One',
                              icon: 'fas fa-images',
                         },
                         {
                              title: 'Album Name Two',
                              icon: 'fas fa-images',
                         },
                    ],
                    albumModel: 'Album Name One'
               }
          },
          methods:{
               closeModalCreateAlbum(){
                    this.$emit('changeModalCreateAlbum')
               },
               
               
          }
     }
</script>
