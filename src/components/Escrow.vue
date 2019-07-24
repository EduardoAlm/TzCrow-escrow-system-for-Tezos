<template>
  <div class="w3-cell-row">
    <div class="w3-display-middle">
      <div class="w3-container w3-cell">
        <h1>Your Escrow is up and running!</h1>
        <p>&nbsp;</p>
        <img
          src="../assets/TezCrowmain.png"
          style="width:450px; height:220px;"
        />
        <div>
          <div class="w3-container w3-cell">
            <TransactionListEscrow></TransactionListEscrow>
          </div>

          <p>&nbsp;</p>
          <h5>
            For DApp prototipe the only escrow available is the
            <b>tzCrow</b> escrow, for future updates you can expect to be able
            to take part in this process.
          </h5>
          <p></p>
          <h5>
            The crow appreciates your patience and promisses reliable and secure
            development in the upcoming updates!
          </h5>
          <p>&nbsp;</p>
          <h6>
            Best regards,
            <b>tzCrow</b>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionListEscrow from "./escrowPage/transactionListWaitEscrow.vue";

export default {
  name: "escrow",
  data: function() {
    return {};
  },
  components: {
    TransactionListEscrow: TransactionListEscrow
  }
};
</script>
