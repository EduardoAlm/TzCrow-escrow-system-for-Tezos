/* eslint disable */
<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
    <Aboutus></Aboutus>
  </div>
</template>

<script>
import Nav from "./components/mainPage/Nav.vue";
import Aboutus from "./components/mainPage/Aboutus.vue";
import "./utils/eztzBalance";

export default {
  name: "app",
  components: {
    Nav: Nav,
    Aboutus: Aboutus
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
