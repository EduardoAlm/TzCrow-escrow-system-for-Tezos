/* eslint disable */
<template>
  <div id="app">
    <div v-if="status">
      <HeaderAuth></HeaderAuth>
      <NavAuth></NavAuth>
    </div>
    <div v-else>
      <Nav></Nav>
    </div>
    <router-view></router-view>
    <Aboutus></Aboutus>
    <div v-if="!this.acc">
      <CookiesAccept></CookiesAccept>
    </div>
  </div>
</template>

<script>
import Nav from "./components/mainPage/Nav.vue";
<<<<<<< HEAD
import Aboutus from "./components/mainPage/Aboutus.vue";
=======
import NavAuth from "./components/NavAuth.vue";
import Aboutus from "./components/mainPage/Aboutus.vue";
import HeaderAuth from "./utils/HeaderAuth.vue";
import CookiesAccept from "./components/mainPage/CookiesAccept";
import * as Cookies from "js-cookie";
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902

export default {
  name: "app",
  data() {
    return {
      status: false,
      address: "",
      acc: false
    };
  },
  mounted() {
    this.address = Cookies.get("address");
    this.status = Cookies.get("status");
    this.acc = Cookies.get("cookAcc");
  },
  components: {
    Nav: Nav,
    Aboutus: Aboutus,
    NavAuth: NavAuth,
    HeaderAuth: HeaderAuth,
    CookiesAccept: CookiesAccept
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>