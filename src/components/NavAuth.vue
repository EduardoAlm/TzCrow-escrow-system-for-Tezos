/* eslint-disable */
<template>
  <div class="w3-container">
    <nav class="w3-section w3-bar">
      <div class="w3-left">
        <router-link
          class="w3-btn w3-wide"
          v-for="routes in links"
          v-bind:key="routes.id"
          :to="`${routes.page}`"
        >
          <img v-if="routes.imageUrl" :src="routes.imageUrl" style="width: 50px; height: 50px;">
          {{ routes.text }}
        </router-link>
      </div>

      <div class="w3-right">
        <router-link
          class="w3-btn w3-wide"
          v-for="routes in links1"
          v-bind:key="routes.id"
          :to="`${routes.page}`"
        >
          <img v-if="routes.imageUrl" :src="routes.imageUrl" style="width: 50px; height: 50px;">
          {{ routes.text }}
        </router-link>
      </div>
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
          imageUrl: require("../assets/TezCrowLogo.png")
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
          text: "Fees",
          page: "/fee"
        },
        {
          id: 4,
          text: "Benefits",
          page: "/benefit"
        },
        {
          id: 5,
          text: "Withdraw",
          page: "/with"
        }
      ],
      links1: [
        {
          id: 6,
          imageUrl: require("../assets/trans.png")
        },
        {
          id: 7,
          text: "Seller",
          page: "/sell"
        },
        {
          id: 8,
          text: "Buyer"
        },
        {
          id: 9,
          text: "Escrow"
        }
      ]
    };
  }
};
</script>
