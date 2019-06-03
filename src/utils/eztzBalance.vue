<template>
  <Keys></Keys>
</template>

<script>
const eztz = window.eztz;
eztz.node.setProvider("http://localhost:18731");

var mnemonic =
  "fried potatoes dog cat cup bottle word letter google youtube stack memory hand god trust father";
var keys = eztz.crypto.generateKeys(mnemonic, "password");
var account = keys.pkh;
console.log(account);

eztz.rpc
  .getHeadHash()
  .then(res => {
    console.log("head:" + res);
  })
  .catch(function(e) {
    console.log("catch:" + e);
  });

eztz.rpc
  .getBalance(account)
  .then(res => {
    console.log("balance:" + res);
  })
  .catch(function(e) {
    console.log("catch:" + e);
  });

export default {
  name: "Keys"
};
</script>
