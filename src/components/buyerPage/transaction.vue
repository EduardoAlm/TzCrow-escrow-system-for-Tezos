<template>
  <div>
    <h2>Transaction Information</h2>
    <div class="component-container w3-display-middle" style="width: 40%">
      <h4>Buyer Address</h4>
      <input
        :id="bAdd"
        v-model="bAdd"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
      />
      <p>&nbsp;</p>
      <h4>Contract Name</h4>
      <input
        :id="contractName"
        v-model="contractName"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
      />
      <p>&nbsp;</p>
      <h4>Required Tezos Amount</h4>
      <input
        :id="tzAmount"
        v-model="tzAmount"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
      />
      <p>&nbsp;</p>
      <button
        class="w3-button w3-round w3-green w3-hover-opacity"
        @click="getInfo"
      >
        Make Transaction
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "transaction",
  data: function() {
    return {
      bAdd: "",
      contractName: "",
      tzAmount: ""
    };
  },
  methods: {
    getInfo() {
      let data = {
        bAddress: this.bAdd,
        cName: this.contractName,
        tz: this.tzAmount
      };
      console.log(data.bAddress);
      console.log(data.cName);
      console.log(data.tz);
    }
  }
};
</script>
