/* eslint-disable */
<template>
  <div class="w3-content">
    <img src="../assets/TezCrowmain.png" style="width:750px; height:420px;" />

    <div class="w3-center w3-content">
      <h2></h2>
      <Auth></Auth>
    </div>
    <p class="text-center">Transact Safely with Escrow Protection.</p>
    <p class="text-center">
      Open source Tezos DApp that allows two transacting parties, Buyer and
      Seller, to transact with the added security of an escrow of their choice.
    </p>
  </div>
</template>

<script>
import Auth from "../utils/auth.vue";
export default {
  name: "Index",
  components: {
    Auth
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  line-height: 1;
  font-size: 17px;
}
</style>
