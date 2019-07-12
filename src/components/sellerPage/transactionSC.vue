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
        @mouseover="checkTime"
        @keyup="checkAmount"
      />
      <label class="w3-text-light-green" style>
        Collateral is 50% of the transaction required amount:
        {{ this.tzAmount * 0.5 }} tz
      </label>
      <div v-if="checkFlagBal === false">
        <label class="w3-text-red" style>You dont have enough xtz!</label>
      </div>
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
        @mouseover="checkTime"
      />
      <p>&nbsp;</p>
      <!-- <div style="margin-top:30px">
      <h4>Buyer Payment Time</h4>

      <div
        class="component-container w3-center"
        style="margin-left: auto;
    margin-right: auto;width:110px"
      ->
        <div class="w3-row">
          <div class="w3-cell w3-half">
            <input
              :id="hours"
              v-model="hours"
              class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
              style="width:40px;border: 2px solid grey"
              type="text"
            />
          </div>

          <div class="w3-cell w3-half">
            <input
              :id="minutes"
              v-model="minutes"
              class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
              style="width:40px;border: 2px solid grey"
              type="text"
            />
          </div>
        </div>
      </div>
      <div class="alert alert-warning" style="margin-top:20px" v-if="checktimeFlag == true">
        <strong>Warning!</strong>
        The time limit you set in not allowed.
      </div>
      <label class="w3-text-light-green" style>Format 'h:m'</label></!-->
      <h4>Transaction Description</h4>
      <input
        :id="productDescription"
        v-model="productDescription"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        @keyup="checkNull"
        @mouseover="checkTime"
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
      <div v-if="cnFlag == false || nullFlag == true">
        <button
          class="w3-button w3-round w3-green w3-hover-opacity"
          @click="getInfo"
          @mouseover="checkTime"
          disabled
        >
          Create Transaction
        </button>
      </div>
      <div v-else>
        <button
          class="w3-button w3-round w3-green w3-hover-opacity"
          @click="getInfo"
          @mouseover="checkTime"
        >
          Create Transaction
        </button>
      </div>
    </div>
    <div
      class="alert alert-success"
      style="margin-top:20px"
      v-if="createFlag == true"
    >
      <strong>Success!</strong>
      You have successfully submitted the transaction data.
      <strong>
        To create a new one you have to go to the seller home page first.
      </strong>
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import * as Cookies from "js-cookie";
import deatomize from "../contractUtils/deatomize";
export default {
  name: "transactionSC",
  data: function() {
    return {
      productDescription: "",
      contractName: "",
      tzAmount: "0",
      colateral: "--",
      buyerPayTime: "",
      fee: 0.05,
      hours: "05",
      minutes: "00",
      checktimeFlag: false,
      cnFlag: false,
      nullFlag: true,
      createFlag: false,
      checkFlagBal: true,
      bal: ""
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
      this.buyerPayTime = this.hours.toString() + ":" + this.minutes.toString();
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
      this.cnFlag = false;
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
    checkTime() {
      if (
        this.hours < 5 ||
        this.hours > 48 ||
        this.minutes < 0 ||
        this.minutes > 60
      ) {
        this.hours = 5;
        this.minutes = 0;
        this.checktimeFlag = true;
      } else {
        this.checktimeFlag = false;
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
        this.cnFlag = false;
        this.contractName = "";
      } else {
        this.cnFlag = true;
        console.log("false");
      }
    },
    getBal() {
      const eztz = window.eztz;
      eztz.node.setProvider("http://localhost:18731");
      eztz.rpc
        .getBalance(Cookies.get("address"))
        .then(res => {
          this.bal = deatomize(res);
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    checkAmount() {
      this.getBal();
      console.log(this.bal);
      console.log(this.checkFlagBal);
      console.log(this.tzAmount * 0.5);
      if (this.bal <= 0 || this.tzAmount * 0.5 > this.bal) {
        this.checkFlagBal = false;
      } else {
        this.checkFlagBal = true;
      }
    }
  }
};
</script>
