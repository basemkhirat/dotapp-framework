<template>
     <b-switch v-model="item">
          {{permissions}}
          {{label}}
     </b-switch>
</template>

<script>
export default {
     props: ['value', 'label', 'allPermissions', 'permissions'],
     data(){
          return{
               item: false,
          }
     },
     
     watch:{
          item(){
               console.log(this.value)
               if(this.value){
                    if(this.item){
                         this.$emit('switchValue', {value: this.value, status: true})
                    } else {
                         this.$emit('switchValue', {value: this.value, status: false})
                    }
               }
               
          },
          permissions(){
               // console.log(this.allPermissions.permissions)
               if(this.permissions){
                    
                    if(this.permissions.indexOf(this.value) > -1){
                         this.item = true
                         // console.log(this.allPermissions.value)
                    } else {
                         this.item = false
                    }
               }
          }
     },
     methods:{

     }
}
</script>