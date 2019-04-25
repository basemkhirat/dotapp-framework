<template>
    <div>
        <div class="block--item" v-for="user in data" :key="user.id">
            <div class="row align-items-center">
                <div class="item--checkbox">
                    <b-checkbox 
                        v-model="usersSelected"
                        :native-value="user.id">
                    </b-checkbox>
                </div>
                <div class="col-12 col-sm-6 col-xl">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="item--avatar--img">
                            <img :src="user.imgUrl" alt="">
                        </div>
                        <div class="text--title">
                            {{user.name}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-envelope"></i>
                        </span>
                        {{user.email}}
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text">
                        <span class="icon">
                            <i class="fas fa-clock"></i>
                        </span>
                        {{user.date}}
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl">
                    <div class="item--text">
                        <span class="icon">
                           <i class="fas fa-award"></i>
                        </span>
                        {{user.role}}
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-xl item--text">
                    <div class="all--item--action d-flex align-item-center">
                        <button class="button--circle is-primary-light"><i class="fas fa-pen"></i></button>
                        <button class="button--circle is-warning-light"><i class="fas fa-ban"></i></button>
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
            <div class="alluser--action" :class="{'show--action--bottom': usersSelected.length}">
                <button class="button is-warning is-rounded">Ban All Selected</button>
                <button class="button is-danger is-rounded">Delete All Selected</button>
            </div>
        </template>
        
    </div>
</template>



<script>
export default {
    props:['data', 'allUserSelected'],
    data () {
            return {
                usersSelected:[]
            };
        },
    components: {
        
    },
    watch:{
        allUserSelected(){
            if(this.allUserSelected){
                this.data.map(item => {
                    this.usersSelected.push(item.id)
                })
            } else {
                 this.usersSelected = []
            }
        }
    }
}
</script>
