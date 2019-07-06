<template>
    <div class="articles">
        <div class="page--title">
            <h1 class="title--text">
                Not Authorized
            </h1>
        </div>
        <div class="card--block">
            <div class="card--content p-5">
                <b-notification type="is-danger">
                    You Are Not Authorized To View This Page!
                </b-notification>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'notAuthorized',
  data () {
        return {
           
        };
    },

}
</script>
