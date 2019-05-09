<template>
    <div>
        <div class="block--item" v-for="item in data" :key="item.id">
            <div class="row align-items-center">
                <div class="item--checkbox">
                    <b-checkbox 
                        v-model="itemsSelected"
                        :native-value="item.id">
                    </b-checkbox>
                </div>
                <div class="col-12 col-sm-6 col-xl">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.name}} 
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-users"></i>
                        </span>
                        {{item.usersCount}} <span class="mx-1">User</span>
                    </div>
                </div> -->
                <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-clock"></i>
                        </span>
                        {{item.created}}
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text text-center">
                        <b-tag rounded type="is-success" v-if="item.status">Published</b-tag>
                        <b-tag rounded  type="is-danger" v-else>Not Published</b-tag>
                    </div>
                </div> -->
            
                <div class="col-12 col-sm-12 col-xl item--text">
                    <div class="all--item--action d-flex align-item-center">
                        <button class="button--circle is-primary-light"><i class="fas fa-pen"></i></button>
                        <!-- <button class="button--circle is-warning-light"><i class="fas fa-ban"></i></button> -->
                        <button class="button--circle is-danger-light"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
         <div class="pagination--custom--number">
            <ul class="d-flex justify-content-end">
                <li class="nav-item">
                    <span class="page--count">
                            3 of 15
                    </span>
                </li>
                <li class="nav-item">
                <a>
                    <i class="fas fa-angle-left"></i>
                </a>
                </li>
                <li class="nav-item">
                    <a>
                        <i class="fas fa-angle-right"></i>
                    </a>
                </li>
            </ul>
        </div>
        <template>
            <div class="alluser--action" :class="{'show--action--bottom': itemsSelected.length}">
                <button class="button is-warning is-rounded">Ban All Selected</button>
                <button class="button is-danger is-rounded">Delete All Selected</button>
            </div>
        </template>
        
    </div>
</template>



<script>
export default {
    props:['data', 'allItemsSelected'],
    data () {
            return {
                itemsSelected:[]
            };
        },
    components: {
        
    },
    watch:{
        allItemsSelected(){
            if(this.allItemsSelected){
                this.data.map(item => {
                    this.itemsSelected.push(item.id)
                })
            } else {
                 this.itemsSelected = []
            }
        }
    }
}
</script>
