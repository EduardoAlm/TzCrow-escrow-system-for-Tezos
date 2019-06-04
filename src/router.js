import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import GetStarted from "./views/Introduction.vue";
import How from "./views/How.vue";
import Fee from "./views/Fee.vue";
import Benefit from "./views/Benefit.vue";
import With from "./views/With.vue";
import Seller from "./views/Seller.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/introduction",
      name: "introduction",
      component: GetStarted
    },
    {
      path: "/how",
      name: "How",
      component: How
    },
    {
      path: "/fee",
      name: "Fee",
      component: Fee
    },
    {
      path: "/benefit",
      name: "Benefit",
      component: Benefit
    },
    {
      path: "/with",
      name: "With",
      component: With
    },
    {
      path: "/seller",
      name: "Seller",
      component: Seller
    }
  ]
});
