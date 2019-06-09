<template>
  <div class="w3-container">
    <div class="component-container" style="width: 90%">
      <h4>Buyer Address</h4>
      <div
        class="w3-panel w3-hover-border-green w3-round-large w3-white"
        style="border:2px solid grey"
      >
        <p>{{ this.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as Cookies from "js-cookie";

export default {
  name: "BuyerAddress",
  data: function() {
    return {
      address: ""
    };
  },
  mounted() {
    this.address = Cookies.get("address");
  }
};
</script>
