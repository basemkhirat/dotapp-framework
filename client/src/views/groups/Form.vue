<template>
  <div class="users">
    <div class="page--title">
      <h1 class="title--text">Groups</h1>
    </div>
    <div class="card--block">
      <div class="card--hreader">
        <div class="card--header--title">
          Add New Group
        </div>
      </div>
      <div class="card--content">
          <form class="row mt-3">
               <div class="col-12 col-sm-12 col-lg-8 col-xl-4">
                    <b-field class="field-group">
                         <b-input type="text" rounded placeholder="Group Name" v-model="groupName" />
                    </b-field>
                    <hr class="mb-0">
               </div>

               <div class="col-12 checkbox--group">
                    <h3> Add Permissions To Group </h3>
                    <div class="row">
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="dd">
                                   Add Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="ss">
                                   Edit To Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="aa">
                                   Add New User
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="dasd">
                                   Add Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="ssas">
                                   Edit To Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="aada">
                                   Add New User
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="dad">
                                   Add Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="fsass">
                                   Edit To Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="aaas">
                                   Add New User
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="ddaf">
                                   Add Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="sdds">
                                   Edit To Post
                              </b-checkbox>
                         </div>
                         <div class="col-6 col-sm-4 col-lg-3 col-xl-2 field-group">
                              <b-checkbox v-model="permissions"
                                   native-value="arwa">
                                   Add New User
                              </b-checkbox>
                         </div>
                    </div>
               </div>
               
               <div class="col-12 text-center button--save--form">
                    <button class="button is-primary is-rounded">Add Group</button>
               </div>
         </form>
      </div>
    </div>

  </div>
</template>



<script>

     export default {
          name: 'groupForm',
          data() {
               return {
                    groupName: '',
                    permissions: []
               };
          },
          
          methods: {
              
          }
     }
</script>