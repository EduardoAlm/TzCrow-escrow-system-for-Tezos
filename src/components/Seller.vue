/* eslint-disable */
<template>
<<<<<<< HEAD
  <div class="w3-container w3-center">
    <h2>How it Works</h2>
    <div class="w3-content">
      <p>&nbsp;</p>
      <p>When a Buyer starts the escrow transaction, his Tez is locked.</p>
      <p>
        Once he confirms that the Seller’s obligations are fulfilled, he can
        release his funds to the Seller.
      </p>
      <p>
        An Escrow Agent, chosen by the Buyer and Seller will oversee the
        transaction.
      </p>
      <p>
        If a dispute occurs, he can intervene and refund the Buyer, or release
        funds to the Seller.
      </p>
      <p>&nbsp;</p>
    </div>
    <img src="../assets/escromodel.png" style="height:600px;" />
=======
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
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
  </div>
</template>

<script>
<<<<<<< HEAD
=======
import SellerAddress from "./sellerPage/sellerAddress.vue";
import SellerBalance from "./sellerPage/sellerBalance.vue";
import TransactionCreate from "./sellerPage/transactionCreate.vue";
import TransactionListSeller from "./sellerPage/transactionListSeller.vue";
import TransactionListSellerAccepted from "./sellerPage/transactionListSellerAccepted.vue";
import transactionListFinished from "./buyerPage/transactionListFinished.vue";

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
export default {
  name: "Seller",
  props: {
    msg: String
<<<<<<< HEAD
  }
};
</script>

<style scoped>
p {
  line-height: 0.5;
  font-size: 17px;
}
</style>
=======
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
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
