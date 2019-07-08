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
        <p>&nbsp;</p>
        <transactionListAccepted></transactionListAccepted>
      </div>
    </div>
    <p>&nbsp;</p>
    <div class="component-container w3-center">
      <p></p>
      <h5>
        After you accept the transction please transfer the funds to the escrow:
      </h5>
      <p></p>
      <h6>tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv</h6>
    </div>
  </div>
</template>

<script>
import BuyerAddress from "./buyerPage/buyerAddress.vue";
import BuyerBalance from "./buyerPage/buyerBalance.vue";
import TransactionInit from "./buyerPage/transactionInit.vue";
import TransactionList from "./buyerPage/transactionList.vue";
import transactionListAccepted from "./buyerPage/transactionListAccepted.vue";

export default {
  name: "Buyer",
  props: {
    msg: String
  },
  components: {
    BuyerBalance: BuyerBalance,
    TransactionInit: TransactionInit,
    BuyerAddress: BuyerAddress,
    TransactionList: TransactionList,
    transactionListAccepted: transactionListAccepted
  }
};
</script>
