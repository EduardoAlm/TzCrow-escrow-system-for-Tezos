<template>
  <div class="w3-container">
    <div class="component-container" style="width: 100%">
      <table class="w3-table w3-bordered w3-centered w3-striped">
        <tr>
          <th>Your Address</th>
          <th>Seller Address</th>
          <th>Buyer Address</th>
          <th>Contract Name:</th>
          <th>Buyer Response</th>
          <th>Seller Response</th>
          <th>Buyer Pay Time:</th>
          <th>Seller Pay Time:</th>
          <th>Details</th>
        </tr>
        <tr
          v-for="trans in transArray"
          v-bind:key="trans._id"
          class="w3-hover-light-gray"
        >
          <td>{{ trans.escrowaddress }}</td>
          <td>{{ trans.selleraddress }}</td>
          <td>{{ trans.buyeraddress }}</td>
          <td>{{ trans.contractname }}</td>
          <td>{{ trans.buyerResponse }}</td>
          <td>{{ trans.sellerResponse }}</td>
          <td>{{ trans.buyerPayTime }}</td>
          <td>{{ trans.sellerPayTime }}</td>
          <td>
            <button
              class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
              @click="
                modal(trans._id);
                scid(trans._id);
              "
            >
              See details
            </button>
          </td>
        </tr>
      </table>

      <modal
        name="detailsEscrowModal"
        height="auto"
        :scrollable="true"
        @before-open="beforeOpen"
        @before-close="beforeClose"
      >
        <div class="w3-container w3-row">
          <div class="w3-cell-row">
            <div class="w3-container w3-cell-top w3-display-topleft">
              <h3 class="w3-text-blue" style="margin-top:10px">
                Transaction Details
              </h3>
            </div>
            <div class="w3-container w3-cell-top w3-display-topright">
              <button
                class="w3-button w3-white w3-border-white w3-shadow-white w3-hover-white"
                style="width:40px;height:30px"
                @click="$modal.hide('detailsEscrowModal')"
              >
                <img
                  src="../../assets/cross.png"
                  style="width:20px;heigth:30px"
                />
              </button>
            </div>
          </div>
          <p></p>
        </div>
        <p>&nbsp;</p>
        <div class="w3-container w3-row">
          <div class="w3-cell-row">
            <div v-for="trans in transArray" v-bind:key="trans._id">
              <div
                v-if="trans._id == id"
                class="component-container"
                style="border: 0.7px solid gray;"
              >
                <h5 class>Date of Creation:</h5>
                <p>{{ trans.createdon }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Product Price:</h5>
                <p>{{ trans.productprice }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Transaction Colateral:</h5>
                <p>{{ trans.colateral }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Transaction Fee:</h5>
                <p>{{ trans.fee }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Product Description:</h5>
                <p>{{ trans.productdesc }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Date of Update:</h5>
                <p>{{ trans.updatedate }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Smart Contract Address:</h5>
                <p>{{ trans.hxsc }}</p>
              </div>
            </div>
          </div>
        </div>
        <p></p>
        <div
          class="component-container w3-center"
          style="margin-left: auto;
    margin-right: auto;width:400px"
        >
          <div class="w3-row">
            <div class="w3-cell w3-half">
              <button
                class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                @click="sign"
              >
                Sign Transaction
              </button>
            </div>
            <div class="w3-cell w3-half">
              <button
                class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                @click="execute"
              >
                Execute Transaction
              </button>
            </div>
          </div>
        </div>
        <p></p>
        <div
          class="alert alert-success"
          style="margin-left:20px;margin-right:20px"
          v-if="requestErr == false"
        >
          <strong>Success!</strong>
          You have successfully submitted the request for transaction.
        </div>
        <div
          class="alert alert-warning"
          style="margin-left:20px;margin-right:20px"
          v-if="requestErr == true"
        >
          <strong>Error!</strong>
          Something went wrong with the transaction request.
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";
import * as Cookies from "js-cookie";
import contractsign from "../contractUtils/signcontract.js";
import transactionLogic from "../contractUtils/transactionLogic.js";
function find() {
  PouchDB.plugin(findPlugin);
  var db = new PouchDB("http://localhost:5984/contract_info");

  var arr = [];
  db.createIndex({
    index: { fields: ["hxsc"] }
  })
    .then(function() {
      return db.find({
        selector: {
          hxsc: { $eq: Cookies.get("contractAddress") }
        },
        sort: ["hxsc"]
      });
    })
    .then(function(result) {
      var i = 0;
      console.log(result);
      for (i = 0; i < result.docs.length; i++) {
        arr.push(result.docs[i]);
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  return arr;
}

export default {
  name: "TransactionListEscrow",
  data: function() {
    return {
      transArray: null,
      id: "",
      cid: "",
      requestErr: null
    };
  },
  methods: {
    modal: function(event) {
      console.log(event);
      this.$modal.show("detailsEscrowModal", { text: event });
    },
    find: function() {},
    scid(cid) {
      this.cid = cid;
    },
    sign() {
      var len = this.transArray.length;
      var i = 0;
      for (i = 0; i < len; i++) {
        console.log(this.transArray[i].escrowaddress);
        contractsign(this.transArray[i].escrowaddress);
      }
    },

    execute() {
      const cid = this.cid;
      PouchDB.plugin(findPlugin);
      var db = new PouchDB("http://localhost:5984/contract_info");

      var res = "";
      db.createIndex({
        index: { fields: ["_id"] }
      })
        .then(function() {
          return db.find({
            selector: {
              _id: { $eq: cid }
            },
            sort: ["_id"]
          });
        })
        .then(function(result) {
          for (var i = 0; i < result.docs.length; i++) {
            if (
              result.docs[i].buyerResponse == "Refund" &&
              result.docs[i].sellerResponse == "Refund"
            ) {
              res = transactionLogic(
                "Refund",
                result.docs[i].productprice,
                result.docs[i].colateral,
                result.docs[i].fee
              );
              console.log(res);
              if (res === "Success") {
                Cookies.set("requestErr", false);
              } else {
                Cookies.set("requestErr", true);
              }
            } else if (
              result.docs[i].buyerResponse == "Release" &&
              result.docs[i].sellerResponse == "Release"
            ) {
              res = transactionLogic(
                "Release",
                result.docs[i].productprice,
                result.docs[i].colateral,
                result.docs[i].fee
              );
              console.log(res);
              if (res === "Success") {
                Cookies.set("requestErr", false);
              } else {
                Cookies.set("requestErr", true);
              }
            } else {
              Cookies.set("requestErr", true);
            }
          }
        });
      if (Cookies.get("requestErr") === "false") {
        this.requestErr = false;
      } else {
        this.requestErr = true;
      }
      console.log(this.requestErr);
      Cookies.remove("requestErr");
    },
    beforeOpen(event) {
      console.log(event.params.text);
      this.id = event.params.text;
    },
    beforeClose(event) {
      console.log(event);
    }
  },
  mounted() {
    var data = find();
    console.log(data);
    this.transArray = data;
  }
};
</script>

<style scoped>
hr {
  border: 0.7px solid gray;
}
</style>
