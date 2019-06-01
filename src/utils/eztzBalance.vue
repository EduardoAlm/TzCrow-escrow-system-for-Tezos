<template>
  <Keys></Keys>
</template>

<script>
const eztz = window.eztz;
eztz.node.setProvider("http://localhost:18739");
var mnemonic =
  "fried potatoes dog cat cup bottle word letter google youtube stack memory hand god trust father";
var keys = eztz.crypto.generateKeys(mnemonic, "password");
console.log(keys);
eztz.rpc
  .getBalance("tz1Km7LiSAjn9H8gCLx1XjeDSGWHKu6LPTe5")
  .then(function(res) {
    alert("Your balance is " + res);
  })
  .catch(function(e) {
    console.log(e);
  });

export default {
  name: "Keys"
};
</script>
