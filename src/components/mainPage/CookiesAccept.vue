<template>
  <footer class="w3-bottom w3-margin">
    <div class="w3-bar w3-blue">
      <div class="w3-bar-item">
        The usage of Cookies is required for this Dapp to work
      </div>
      <div class="w3-bar-item">
        <button
          class="w3-button w3-round-xxlarge w3-black w3-hover-green w3-small"
          @click="cookiesAcc"
        >
          Ok
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
import * as Cookies from "js-cookie";

export default {
  name: "CookiesAccept",
  methods: {
    cookiesAcc() {
      Cookies.set("cookAcc", true, { expires: 1 });
      window.location.reload(true);
    }
  }
};
</script>
