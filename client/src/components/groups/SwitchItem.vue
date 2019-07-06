<template>
     <b-switch v-model="item">
          {{label}}
     </b-switch>
</template>

<script>
export default {
     props: ['valueItem', 'label', 'permissions'],
     data(){
          return{
               item: false,
          }
     },
     
     watch:{
          item(){
               if(this.item){
                    this.$emit('switchValue', {value: this.valueItem, status: true})
               } else {
                    this.$emit('switchValue', {value: this.valueItem, status: false})
               }
               
          },
          permissions(){
               if(this.permissions){
                    
                    if(this.permissions.indexOf(this.valueItem) > -1){
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