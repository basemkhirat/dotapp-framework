<template>
  <div>
    <!-- Page Head -->
    <div class="page--head">
      <div class="wrap--content">
        <div class="page--title">
          <div>
            <h1 class="title--text">Not Authorized</h1>
            <!-- Breadcrumb -->
            <breadcrumb :links="breadcrumb" />
          </div>
        </div>
      </div>
    </div>

    <div class="wrap--content">
      <div class="card--block">
        <div class="card--content p-5">
          <b-notification :closable="false" type="is-danger">You Are Not Authorized To View This Page!</b-notification>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notAuthorized",
  data() {
    return {
      breadcrumb: [
        {
          link: "",
          label: "Not Authorized"
        }
      ]
    };
  }
};
</script>
