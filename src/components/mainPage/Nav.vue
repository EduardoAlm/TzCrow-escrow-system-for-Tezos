/* eslint-disable */
<template>
  <div class="w3-center w3-container w3-border">
    <nav class="w3-section w3-bar">
      <router-link
        class="w3-btn w3-wide"
        v-for="routes in links"
        v-bind:key="routes.id"
        :to="`${routes.page}`"
      >
        <img
          v-if="routes.imageUrl"
          :src="routes.imageUrl"
          style="width: 50px; height: 50px;"
        />
        {{ routes.text }}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data: function() {
    return {
      links: [
        {
          id: 0,
          text: "tzCrow",
          page: "/",
          imageUrl: require("../../assets/TezCrowLogo.png")
        },
        {
          id: 1,
          text: "Get Started",
          page: "/introduction"
        },
        {
          id: 2,
          text: "How It Works",
          page: "/how"
        },
        {
          id: 3,
          text: "Fees/Benefits/Withdraw",
          page: "/fee"
        }
      ]
    };
  }
};
</script>
