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
          Accept Transaction
        </button>
      </div>
      <div v-else>
        <button
          class="w3-button w3-round w3-green w3-hover-opacity"
          @click="getInfo"
        >
          Accept Transaction
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
import deatomize from "../contractUtils/deatomize";
export default {
  name: "transaction",
  data: function() {
    return {
      sAdd: "",
      contractName: "",
      tzAmount: "0",
      colateral: "--",
      createFlag: false,
      nullFlag: true,
      id: "",
      checkFlagAdd: false,
      checkFlagCN: false,
      checkFlagA: false,
      checkFlagBal: true,
      bal: ""
    };
  },
  methods: {
    getInfo() {
      Cookies.set("contractAddress", "KT1PhBfE8KegF1Ca4LSUJTGyqT7mCW1Hs9Hz");
      const contractAdd = "KT1PhBfE8KegF1Ca4LSUJTGyqT7mCW1Hs9Hz";

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
      let scd = {};
      for (var obj in bArray) {
        if (
          this.contractName === bArray[obj].contractname &&
          data.sAddress === bArray[obj].selleraddress &&
          data.tz === bArray[obj].productprice
        ) {
          PouchDB.plugin(findPlugin);
          var db = new PouchDB("http://localhost:5984/sc_cid");
          var db1 = new PouchDB("http://localhost:5984/contract_info");
          var dt = new Date();
          this.id = bArray[obj].id;
          db.get(bArray[obj].id)
            .then(function() {
              scd = {
                _id: bArray[obj].id,
                contractname: bArray[obj].contractname,
                selleraddress: bArray[obj].selleraddress,
                buyeraddress: Cookies.get("address"),
                escrowaddress: "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx",
                productprice: bArray[obj].productprice,
                createdon: bArray[obj].createdon,
                colateral: bArray[obj].colateral,
                fee: 0.05,
                productdesc: bArray[obj].productdesc,
                updatedate: dt.toUTCString(),
                hxsc: contractAdd,
                dapppkh: "tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv",
                contractstatus: "Accepted!",
                buyerResponse: "",
                sellerResponse: ""
              };
              console.log(scd);
              db1.put(scd);
              return db.put({
                _id: bArray[obj].id,
                _rev: bArray[obj].rev,
                selleraddress: bArray[obj].selleraddress,
                createdon: bArray[obj].createdon,
                productprice: bArray[obj].productprice,
                colateral: bArray[obj].colateral,
                fee: 0.05,
                productdesc: bArray[obj].productdesc,
                contractname: bArray[obj].contractname,
                updatedate: dt.toUTCString(),
                buyeraddress: Cookies.get("address"),
                hxsc: contractAdd,
                contractstatus: "Accepted!"
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
      this.tzAmount = "0";
      this.checkNull = true;
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
    checkAddress() {
      var bArray = JSON.parse(Cookies.get("bArray"));
      console.log(bArray);
      var verif = 0;
      for (var obj in bArray) {
        if (this.sAdd === bArray[obj].selleraddress) {
          verif = verif + 1;
        }
        console.log(this.sAdd);
        console.log(bArray[obj].selleraddress);
      }
      if (verif <= 0) {
        this.checkFlagAdd = false;
      } else {
        this.checkFlagAdd = true;
      }
    },
    checkCName() {
      var bArray = JSON.parse(Cookies.get("bArray"));
      console.log(bArray);
      var verif = 0;
      for (var obj in bArray) {
        if (
          this.contractName === bArray[obj].contractname &&
          this.sAdd === bArray[obj].selleraddress
        ) {
          verif = verif + 1;
          console.log("true");
        }
        console.log(this.contractName);
        console.log(bArray[obj].contractname);
      }
      if (verif <= 0) {
        this.checkFlagCN = false;
      } else {
        this.checkFlagCN = true;
      }
    },
    checkAmount() {
      var bArray = JSON.parse(Cookies.get("bArray"));
      console.log(bArray);

      this.getBal();
      for (var obj in bArray) {
        if (
          this.contractName === bArray[obj].contractname &&
          this.sAdd === bArray[obj].selleraddress &&
          this.tzAmount === bArray[obj].productprice
        ) {
          var col = this.tzAmount * 0.5;
          var total = col + parseInt(this.tzAmount, 10);
          console.log(col);
          console.log(total);
          if (this.bal <= 0 || total > this.bal) {
            this.checkFlagBal = false;
            console.log(this.bal);
            console.log("false");
          } else {
            this.checkFlagA = true;
            this.checkFlagBal = true;
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
