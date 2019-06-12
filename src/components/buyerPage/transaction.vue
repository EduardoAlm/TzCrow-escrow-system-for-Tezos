<template>
  <div>
    <h2>Transaction Information</h2>
    <div class="component-container w3-display-middle" style="width: 40%">
      <h4>Seller Address</h4>
      <input
        :id="sAdd"
        v-model="sAdd"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        @keypress="checkNull"
        @keyup="checkAddress"
        type="text"
      />
      <div v-if="checkFlagAdd">
        <label class="w3-text-light-green" style>The address exists!</label>
      </div>
      <div v-else>
        <label class="w3-text-red" style>The address doesn't exists!</label>
      </div>
      <p>&nbsp;</p>
      <h4>Contract Name</h4>
      <input
        :id="contractName"
        v-model="contractName"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        @keypress="checkNull"
        @keyup="checkCName"
      />
      <div v-if="checkFlagCN">
        <label class="w3-text-light-green" style
          >The contract name corresponds to the inserted address!</label
        >
      </div>
      <div v-else>
        <label class="w3-text-red" style>Please enter the correct name!</label>
      </div>
      <p>&nbsp;</p>
      <h4>Required Tezos Amount</h4>
      <input
        :id="tzAmount"
        v-model="tzAmount"
        @keypress="checkNull"
        class="w3-input w3-border-5 w3-hover-border-green w3-round-large w3-light-grey"
        style="border:2px solid grey"
        type="text"
        @keyup="checkAmount"
      />
      <label class="w3-text-light-green" style>
        Colateral is 50% of the transaction required amount:
        {{ this.tzAmount * 0.5 }} tz
      </label>
      <div v-if="checkFlagA == true && checkFlagBal == true">
        <label class="w3-text-light-green" style
          >The required amount is correct!</label
        >
      </div>
      <div v-else-if="checkFlagBal == false && checkFlagA == true">
        <label class="w3-text-red" style>You dont have enough xtz!</label>
      </div>
      <div v-else>
        <label class="w3-text-red" style
          >Please enter the required amount!</label
        >
      </div>
      <p>&nbsp;</p>
      <div
        v-if="
          checkFlagA == false ||
            checkFlagAdd == false ||
            checkFlagCN == false ||
            checkFlagBal == false ||
            createFlag == true
        "
      >
        <button
          class="w3-button w3-round w3-green w3-hover-opacity"
          @click="getInfo"
          disabled
        >
          Make Transaction
        </button>
      </div>
      <div v-else>
        <button
          class="w3-button w3-round w3-green w3-hover-opacity"
          @click="getInfo"
        >
          Make Transaction
        </button>
      </div>
      <div
        class="alert alert-success"
        style="margin-top:20px"
        v-if="createFlag == true"
      >
        <strong>Success!</strong>
        You have successfully submitted the transaction data.
        <strong>
          To create a new one you have to go to the buyer home page first.
        </strong>
      </div>
    </div>
  </div>
</template>

<script>
import * as Cookies from "js-cookie";
import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";
export default {
  name: "transaction",
  data: function() {
    return {
      sAdd: "",
      contractName: "",
      tzAmount: "",
      colateral: "--",
      createFlag: false,
      nullFlag: true,

      checkFlagAdd: false,
      checkFlagCN: false,
      checkFlagA: false,
      checkFlagBal: true
    };
  },
  methods: {
    getInfo() {
      let data = {
        sAddress: this.sAdd,
        cName: this.contractName,
        tz: this.tzAmount,
        col: this.tzAmount * 0.5,
        complied: Cookies.get("address")
      };
      if (this.tzAmount > 0) {
        this.colateral = data.col;
      } else {
        this.colateral = "--";
      }
      console.log(data.sAddress);
      console.log(data.cName);
      console.log(data.tz);
      console.log(data.col);
      var bArray = JSON.parse(Cookies.get("bArray"));

      for (var obj in bArray) {
        if (
          this.contractName === bArray[obj].contractname &&
          this.sAdd === bArray[obj].selleraddress &&
          this.tzAmount === bArray[obj].productprice
        ) {
          PouchDB.plugin(findPlugin);
          var db = new PouchDB("http://localhost:5984/sc_cid");
          var dt = new Date();
          db.get(bArray[obj].id)
            .then(function(doc) {
              return db.put({
                _id: bArray[obj].id,
                _rev: doc._rev,
                selleraddress: bArray[obj].selleraddress,
                createdon: bArray[obj].createdon,
                productprice: bArray[obj].productprice,
                colateral: bArray[obj].colateral,
                fee: 1.5,
                productdesc: bArray[obj].id.productdesc,
                contractname: bArray[obj].contractname,
                updatedate: dt.toUTCString(),
                buyeraddress: Cookies.get("address"),
                hxsc: "",
                contractstatus: "In Process..."
              });
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      }

      this.createFlag = true;
      this.sAdd = "";
      this.contractName = "";
      this.tzAmount = "";
      this.checkNull = true;
      Cookies.remove("bArray");
    },
    getBal() {
      var bal;
      const eztz = window.eztz;
      eztz.node.setProvider("http://localhost:18731");
      eztz.rpc
        .getBalance(Cookies.get("address"))
        .then(res => {
          bal = res;
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
      return bal;
    },
    checkAddress() {
      var bArray = JSON.parse(Cookies.get("bArray"));
      console.log(bArray);
      for (var obj in bArray) {
        if (this.sAdd === bArray[obj].selleraddress) {
          this.checkFlagAdd = true;
          console.log("true");
        }
        console.log(this.sAdd);
        console.log(bArray[obj].selleraddress);
      }
    },
    checkCName() {
      var bArray = JSON.parse(Cookies.get("bArray"));
      console.log(bArray);
      for (var obj in bArray) {
        if (
          this.contractName === bArray[obj].contractname &&
          this.sAdd === bArray[obj].selleraddress
        ) {
          this.checkFlagCN = true;
          console.log("true");
        }
        console.log(this.contractName);
        console.log(bArray[obj].contractname);
      }
    },
    checkAmount() {
      var bArray = JSON.parse(Cookies.get("bArray"));
      console.log(bArray);
      var balance = this.getBal();
      for (var obj in bArray) {
        if (
          this.contractName === bArray[obj].contractname &&
          this.sAdd === bArray[obj].selleraddress &&
          this.tzAmount === bArray[obj].productprice
        ) {
          var col = this.tzAmount * 0.5;
          var total = col + this.tzAmount;
          if (balance <= 0 || total > balance) {
            this.checkFlagBal = false;
            console.log(balance);
            console.log("false");
          } else {
            this.checkFlagA = true;
            this.checkFlagBal = true;
            console.log("true");
          }
        }
        console.log(this.tzAmount);
        console.log(bArray[obj].productprice);
      }
    },
    checkNull() {
      if (
        this.sAdd === "" ||
        this.contractName === "" ||
        this.tzAmount === ""
      ) {
        this.nullFlag = true;
      } else {
        this.nullFlag = false;
      }
    }
  }
};
</script>
