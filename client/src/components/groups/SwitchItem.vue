<template>
     <b-switch v-model="item">
          {{label}}
     </b-switch>
</template>

<script>
export default {
     props: ['value', 'label', 'allPermissions'],
     data(){
          return{
               item: false,
          }
     },
     
     watch:{
          item(){
               if(this.item){
                    this.$emit('switchValue', {value: this.value, status: true})
               } else {
                     this.$emit('switchValue', {value: this.value, status: false})
               }
          },
          allPermissions(){
               if(this.allPermissions){
                    if(this.allPermissions.permissions.indexOf(this.allPermissions.value) > -1){
                         this.item = true
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