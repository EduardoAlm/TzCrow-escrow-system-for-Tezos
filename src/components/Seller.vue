/* eslint-disable */
<template>
  <div>
    <div class="w3-container w3-center">
      <p></p>
      <h2>Seller</h2>
    </div>
    <p>&nbsp;</p>
    <div class="w3-cell-row">
      <div class="w3-container w3-cell" style="margin-left:100px; width:25%">
        <SellerAddress></SellerAddress>
        <div style="margin-top:30px"></div>
        <SellerBalance></SellerBalance>
        <div style="margin-top:30px"></div>
        <TransactionCreate></TransactionCreate>
      </div>
      <div class="w3-container w3-cell">
        <TransactionListSeller></TransactionListSeller>
        <p>&nbsp;</p>
        <TransactionListSellerAccepted></TransactionListSellerAccepted>
        <p>&nbsp;</p>
        <transactionListFinished></transactionListFinished>
      </div>
    </div>
    <p>&nbsp;</p>
    <div class="component-container w3-center">
      <p></p>
      <h5>
        After you verify that the transaction has been accepted please transfer
        the funds to the escrow:
      </h5>
      <p></p>
      <h6>tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv</h6>
    </div>
  </div>
</template>

<script>
import SellerAddress from "./sellerPage/sellerAddress.vue";
import SellerBalance from "./sellerPage/sellerBalance.vue";
import TransactionCreate from "./sellerPage/transactionCreate.vue";
import TransactionListSeller from "./sellerPage/transactionListSeller.vue";
import TransactionListSellerAccepted from "./sellerPage/transactionListSellerAccepted.vue";
import transactionListFinished from "./buyerPage/transactionListFinished.vue";

export default {
  name: "Seller",
  props: {
    msg: String
  },
  components: {
    SellerBalance: SellerBalance,
    TransactionCreate: TransactionCreate,
    SellerAddress: SellerAddress,
    TransactionListSeller: TransactionListSeller,
    TransactionListSellerAccepted: TransactionListSellerAccepted,
    transactionListFinished: transactionListFinished
  }
};
</script>
