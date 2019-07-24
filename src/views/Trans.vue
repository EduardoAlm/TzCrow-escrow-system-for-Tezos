<template>
  <div>
    <Transactions></Transactions>
  </div>
</template>

<script>
// @ is an alias to /src
import Transactions from "../components/buyerPage/transaction.vue";

export default {
  name: "Transaction",
  components: {
    Transactions
  }
};
</script>
