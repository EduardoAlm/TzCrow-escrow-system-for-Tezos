<template>
  <div>
    <h2>Transaction Information</h2>
    <div class="component-container w3-display-middle" style="width: 40%">
      <h4>Product Price</h4>
      <input
        :id="tzAmount"
        v-model="tzAmount"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
      />
      <label class="w3-text-light-green" style>
        Collateral is 50% of the transaction required amount:
        {{ this.colateral }} tz
      </label>
      <div style="margin-top:30px"></div>
      <h4>Transaction Title</h4>
      <input
        :id="contractName"
        v-model="contractName"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
      />
      <div style="margin-top:30px"></div>
      <h4>Product Description</h4>
      <input
        :id="productDescription"
        v-model="productDescription"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
      />
      <div style="margin-top:30px"></div>
      <h4>Fee</h4>
      <label
        :id="fee"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        >1.5%</label
      >

      <p>&nbsp;</p>
      <button
        class="w3-button w3-round w3-green w3-hover-opacity"
        @click="getInfo"
      >
        Create Transaction
      </button>
    </div>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import * as Cookies from "js-cookie";

function ipfs() {
  alert("ipfs");
}

export default {
  name: "transactionSC",
  data: function() {
    return {
      productDescription: "",
      contractName: "",
      tzAmount: "",
      colateral: "--",
      fee: 1.5
    };
  },
  methods: {
    pouch: function() {},
    ipfs: function() {},
    getInfo: function() {
      let data = {
        productDesc: this.productDescription,
        cName: this.contractName,
        tz: this.tzAmount,
        col: this.tzAmount * 0.5
      };
      if (this.tzAmount > 0) {
        this.colateral = data.col;
      } else {
        this.colateral = "--";
      }
      console.log(data.productDesc);
      console.log(data.cName);
      console.log(data.tz);
      console.log(data.col);
      console.log(this.fee);
      ipfs();

      var dt = new Date();
      var db = new PouchDB("http://localhost:5984/sc_cid");
      var doc = {
        _id: dt.toUTCString(),
        seller_address: Cookies.get("address"),
        product_price: this.tzAmount,
        colateral: this.colateral,
        fee: this.fee,
        product_description: this.productDescription,
        contract_name: this.contractName,
        cid: ""
      };
      db.put(doc);
    }
  },
  mounted() {}
};
</script>
