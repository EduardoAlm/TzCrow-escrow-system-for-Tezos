<template>
  <div class="w3-container">
    <div class="component-container" style="width: 100%">
      <h4>Buyer Balance</h4>
      <p>{{ this.bal }} Tz</p>
      <button
        class="w3-btn w3-round-xlarge w3-green w3-hover-dark-green w3-text-white"
        @click="getBal"
      >
        Get Balance
      </button>
    </div>
  </div>
</template>

<script>
import * as Cookies from "js-cookie";
import deatomize from "../contractUtils/deatomize";
export default {
  name: "BuyerBalance",
  data: function() {
    return {
      bal: "----",
      address: ""
    };
  },
  mounted() {
    this.address = Cookies.get("address");
  },
  methods: {
    getBal() {
      const eztz = window.eztz;
      eztz.node.setProvider("http://localhost:18731");
      eztz.rpc
        .getBalance(this.address)
        .then(res => {
          this.bal = deatomize(res);
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
