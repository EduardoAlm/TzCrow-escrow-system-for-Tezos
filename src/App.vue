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
  </div>
</template>

<script>
import Nav from "./components/mainPage/Nav.vue";
import NavAuth from "./components/NavAuth.vue";
import Aboutus from "./components/mainPage/Aboutus.vue";
import HeaderAuth from "./utils/HeaderAuth.vue";
import "./utils/eztzBalance";
import * as Cookies from "js-cookie";

export default {
  name: "app",
  data() {
    return {
      status: false,
      address: ""
    };
  },
  mounted() {
    alert((this.address = Cookies.get("address")));
    alert((this.status = Cookies.get("status")));
  },
  components: {
    Nav: Nav,
    Aboutus: Aboutus,
    NavAuth: NavAuth,
    HeaderAuth: HeaderAuth
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
