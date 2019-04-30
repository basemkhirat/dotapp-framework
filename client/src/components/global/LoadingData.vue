<template>
    <div class="loading--data">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false">
            <b-icon
                pack="fas"
                icon="spinner"
                size="is-large"
                custom-class="fa-spin">
            </b-icon>
        </b-loading>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isLoading: true
        }
    }
}
</script>