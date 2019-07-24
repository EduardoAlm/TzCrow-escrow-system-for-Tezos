import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import GetStarted from "./views/Introduction.vue";
import How from "./views/How.vue";
import Fee from "./views/Fee.vue";
<<<<<<< HEAD
import Benefit from "./views/Benefit.vue";
import With from "./views/With.vue";
import Seller from "./views/Seller.vue";
=======
import Buy from "./views/Buy.vue";
import Sell from "./views/Sell.vue";
import Trans from "./views/Trans.vue";
import TransSC from "./views/TransSC.vue";
import Crow from "./views/Escrow.vue";
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/introduction",
      name: "Introductions",
      component: GetStarted
    },
    {
      path: "/how",
      name: "HowItWorks",
      component: How
    },
    {
      path: "/fee",
      name: "Fees",
      component: Fee
    },
    {
      path: "/buy",
      name: "Buyer",
      component: Buy
    },
    {
<<<<<<< HEAD
      path: "/with",
      name: "With",
      component: With
    },
    {
      path: "/seller",
      name: "Seller",
      component: Seller
=======
      path: "/sell",
      name: "Seller",
      component: Sell
    },
    {
      path: "/transaction",
      name: "Transactions",
      component: Trans
    },
    {
      path: "/transactionSC",
      name: "TransactionsSC",
      component: TransSC
    },
    {
      path: "/crow",
      name: "Escrow",
      component: Crow
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    }
  ]
});

export default router;
