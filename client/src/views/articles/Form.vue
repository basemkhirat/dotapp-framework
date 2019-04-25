<template>
     <div class="users">
          <div class="page--title">
               <h1 class="title--text">Articles</h1>
          </div>
          <div class="row">
               <div class="col-12 col-lg-8">
                    <div class="card--block">
                         <div class="card--hreader">
                              <div class="card--header--title">
                                   Add New Article
                              </div>
                         </div>
                         <div class="card--content">
                              <form class="">
                                   <div class="row align-items-center">
                                        <div class="col-12">
                                             <b-field class="field-group">
                                                  <b-input type="text" size="is-medium" rounded placeholder="Title"
                                                       v-model="title" />
                                             </b-field>
                                        </div>
                                        <div class="col-12">
                                             <b-field class="field-group">
                                                  <div class="file--upload">
                                                       Select Photo
                                                  </div>
                                             </b-field>
                                        </div>
                                   </div>

                                   <div class="col-12 text-center button--save--form">
                                        <button class="button is-primary is-rounded">Add Article</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               <div class="col-12 col-lg-4">
                    <div class="card--block">
                         <div class="card--hreader">
                              <div class="card--header--title">
                                   Status & Tags
                              </div>
                         </div>
                         <div class="card--content">
                              <div class="row align-items-center">
                                   <div class="col-12">
                                        <b-field class="field-group">
                                             <v-select :options="allSections" v-model="sections" label="title"
                                                  placeholder="Section"
                                                  class="select--with--icon w-100 v--select--scroll">
                                                  <template slot="option" slot-scope="option">
                                                       {{ option.title }}
                                                  </template>
                                             </v-select>
                                        </b-field>
                                   </div>
                                   <div class="col-12">
                                        <b-field class="field-group">
                                             <v-select :options="allTags" v-model="tags" label="title"
                                                  multiple placeholder="Tags"
                                                  class="select--with--icon w-100 v--select--scroll">
                                                  <template slot="option" slot-scope="option">
                                                       {{ option.title }}
                                                  </template>
                                             </v-select>
                                        </b-field>
                                   </div>
                                   <div class="col-12">
                                        <b-field class="field-group">
                                             <b-switch v-model="status">
                                                  Published
                                             </b-switch>
                                        </b-field>
                                   </div>
                              </div>
                              
                         </div>
                    </div>
               </div>
          </div>


     </div>
</template>



<script>
     export default {
          name: 'groupForm',
          data() {
               return {
                    title: '',
                    sections: '',
                    status: true,
                    tags: '',
                    allSections: ['News', 'Media', 'Sport', 'Art'],
                    allTags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
               };
          },

          methods: {

          }
     }
</script>