<template>
  <div class="w3-container">
    <div class="component-container" style="width: 90%">
      <h4>Transaction</h4>
      <p>&nbsp;</p>
      <router-link
        class="w3-btn w3-round-xlarge w3-green w3-hover-dark-green w3-text-white"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
        >Start Transaction</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionInit",
  data: function() {
    return {
      links: [
        {
          id: 0,
          page: "/transaction"
        }
      ]
    };
  }
};
</script>
