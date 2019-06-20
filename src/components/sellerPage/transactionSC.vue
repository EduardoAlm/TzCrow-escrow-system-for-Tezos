<template>
  <div>
    <p></p>
    <h2>Transaction Information</h2>
    <p>&nbsp;</p>
    <div
      class="component-container"
      style="width: 40%;
    margin: 0 auto;"
    >
      <h4>Product Price</h4>
      <input
        :id="tzAmount"
        v-model="tzAmount"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        @keypress="checkNull"
      />
      <label class="w3-text-light-green" style>
        Collateral is 50% of the transaction required amount:
        {{ this.tzAmount * 0.5 }} tz
      </label>
      <div style="margin-top:30px"></div>
      <h4>Transaction Title</h4>
      <input
        :id="contractName"
        v-model="contractName"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        @keyup="checkName"
        @keypress="checkNull"
      />
      <div style="margin-top:30px"></div>
      <h4>Buyer Payment Time</h4>
      <div class="w3-row">
        <div class="w3-cell w3-half">
          <input
            :id="hours"
            v-model="hours"
            class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
            style="width:16%;margin-left:220px;border: 2px solid grey"
            type="text"
          />
        </div>
        <div class="w3-cell w3-half">
          <input
            :id="minutes"
            v-model="minutes"
            class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
            style="width:16%;margin-right:180px;border: 2px solid grey"
            type="text"
          />
        </div>
      </div>
      <label class="w3-text-light-green" style>Format 'hh:mm'</label>
      <h4>Product Description</h4>
      <input
        :id="productDescription"
        v-model="productDescription"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        @keyup="checkNull"
      />
      <div style="margin-top:30px"></div>
      <h4>Fee</h4>
      <label
        :id="fee"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        >0.05%</label
      >

      <p>&nbsp;</p>
      <div v-if="cnFlag == true || nullFlag == true">
        <button
          class="w3-button w3-round w3-green w3-hover-opacity"
          @click="getInfo"
          disabled
        >
          Create Transaction
        </button>
      </div>
      <div v-else>
        <button
          class="w3-button w3-round w3-green w3-hover-opacity"
          @click="getInfo"
        >
          Create Transaction
        </button>
      </div>
      <div
        class="alert alert-success"
        style="margin-top:20px"
        v-if="createFlag == true"
      >
        <strong>Success!</strong>
        You have successfully submitted the transaction data.
        <strong
          >To create a new one you have to go to the seller home page
          first.</strong
        >
      </div>
    </div>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import * as Cookies from "js-cookie";

export default {
  name: "transactionSC",
  data: function() {
    return {
      productDescription: "",
      contractName: "",
      tzAmount: "",
      colateral: "--",
      buyerPayTime: "",
      fee: 0.05,
      hours: "00",
      minutes: "00",

      cnFlag: false,
      nullFlag: true,
      createFlag: false
    };
  },
  methods: {
    pouch: function() {},
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
      this.buyerPayTime =
        this.hours.toString() + ":" + this.minutes.toString() + ":00";
      var dt = new Date();
      var db = new PouchDB("http://localhost:5984/sc_cid");
      var doc = {
        _id: (dt.getTime() / 1000).toString(),
        selleraddress: Cookies.get("address"),
        createdon: dt.toTimeString(),
        productprice: this.tzAmount,
        colateral: this.colateral,
        fee: this.fee,
        productdesc: data.productDesc,
        contractname: this.contractName,
        buyerPayTime: this.buyerPayTime,
        sellerPayTime: "2days??",
        buyeraddress: "",
        updatedate: "",
        hxsc: "",
        contractstatus: "Waiting..."
      };
      db.put(doc);
      this.productDescription = "";
      this.contractName = "";
      this.tzAmount = "";
      this.buyerPayTime = "";
      this.nullFlag = true;
      this.createFlag = true;
      Cookies.remove("arrayCN");
    },
    checkNull() {
      this.createFlag = false;
      if (
        this.productDescription === "" ||
        this.contractName === "" ||
        this.productPrice === ""
      ) {
        this.nullFlag = true;
      } else {
        this.nullFlag = false;
      }
    },
    checkName() {
      this.cnFlag = false;
      var verif = 0;
      var arrayCN = JSON.parse(Cookies.get("arrayCN"));
      console.log(arrayCN);
      for (var obj in arrayCN) {
        if (arrayCN[obj] === this.contractName) {
          verif = verif + 1;
        }
        console.log(this.contractName);
        console.log(arrayCN[obj]);
      }
      if (verif > 0) {
        this.cnFlag = true;
        this.contractName = "";
      } else {
        this.cnFlag = false;
        console.log("false");
      }
    }
  }
};
</script>
