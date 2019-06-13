/* eslint-disable */
<template>
  <div>
    <div class="w3-container w3-center">
      <p></p>
      <h2>Buyer</h2>
    </div>
    <p>&nbsp;</p>
    <div class="w3-cell-row">
      <div class="w3-container w3-cell" style="margin-left:100px; width:25%">
        <BuyerAddress></BuyerAddress>
        <div style="margin-top:30px"></div>
        <BuyerBalance></BuyerBalance>
        <div style="margin-top:30px"></div>
        <TransactionInit></TransactionInit>
      </div>
      <div class="w3-container w3-cell">
        <TransactionList></TransactionList>
      </div>
    </div>
  </div>
</template>

<script>
import BuyerAddress from "./buyerPage/buyerAddress.vue";
import BuyerBalance from "./buyerPage/buyerBalance.vue";
import TransactionInit from "./buyerPage/transactionInit.vue";
import TransactionList from "./buyerPage/transactionList.vue";

export default {
  name: "Buyer",
  props: {
    msg: String
  },
  components: {
    BuyerBalance: BuyerBalance,
    TransactionInit: TransactionInit,
    BuyerAddress: BuyerAddress,
    TransactionList: TransactionList
  }
};
</script>
