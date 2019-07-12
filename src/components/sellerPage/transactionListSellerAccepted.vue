<template>
  <div class="w3-container">
    <div class="component-container" style="width: 100%">
      <table class="w3-table w3-bordered w3-centered w3-striped">
        <tr>
          <th>Your Address</th>
          <th>Contract Name</th>
          <th>Date of Creation</th>
          <th>Contract Status</th>
          <th>Details</th>
        </tr>
        <tr
          v-for="trans in transArray"
          v-bind:key="trans._id"
          class="w3-hover-light-gray"
        >
          <td>{{ trans.selleraddress }}</td>
          <td>{{ trans.contractname }}</td>
          <td>{{ trans.createdon }}</td>
          <td>{{ trans.contractstatus }}</td>
          <td>
            <button
              class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
              @click="
                modal(trans._id);
                contid(trans._id);
              "
            >
              See details
            </button>
          </td>
        </tr>
      </table>

      <modal
        name="detailsSellerAccModal"
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
                @click="$modal.hide('detailsSellerAccModal')"
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
                <h5>Your Address:</h5>
                <p>{{ trans.selleraddress }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5 class>Contract Name:</h5>
                <p>{{ trans.contractname }}</p>
                <hr style="border: 0.7px solid gray;" />
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
                <h5>Transaction Description:</h5>
                <p>{{ trans.productdesc }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Smart Contract Address:</h5>
                <p>{{ trans.hxsc }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Date of Update:</h5>
                <p>{{ trans.updatedate }}</p>
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
                @click="refund"
              >
                Refund Request
              </button>
            </div>
            <div class="w3-cell w3-half">
              <button
                class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                @click="release"
              >
                Release Funds
              </button>
            </div>
          </div>
        </div>

        <p>&nbsp;</p>
      </modal>
    </div>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";
import * as Cookies from "js-cookie";

function find() {
  PouchDB.plugin(findPlugin);
  var db = new PouchDB("http://crow:tezoscrow@/127.0.0.1:5984/sc_cid");
  var cnameArray = [];
  var arr = [];
  db.createIndex({
    index: { fields: ["selleraddress"] }
  })
    .then(function() {
      return db.find({
        selector: {
          selleraddress: { $eq: Cookies.get("address") },
          contractstatus: { $eq: "Accepted!" }
        },
        sort: ["selleraddress"]
      });
    })
    .then(function(result) {
      var i = 0;
      console.log(result);
      for (i = 0; i < result.docs.length; i++) {
        arr.push(result.docs[i]);
        cnameArray.push(result.docs[i].contractname);
        console.log(result.docs[i].contractname);
        console.log(cnameArray[i]);
      }
      if (cnameArray.length == 0) {
        Cookies.set("arrayCN", []);
      } else {
        Cookies.set("arrayCN", cnameArray);
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  return arr;
}

export default {
  name: "TransactionListSellerAccepted",
  data: function() {
    return {
      transArray: null,
      id: "",
      cid: ""
    };
  },
  methods: {
    modal: function(event) {
      console.log(event);
      this.$modal.show("detailsSellerAccModal", { text: event });
    },
    contid(id) {
      this.cid = id;
      console.log(this.cid);
    },
    find: function() {},
    beforeOpen(event) {
      console.log(event.params.text);
      this.id = event.params.text;
    },
    beforeClose(event) {
      console.log(event);
    },
    refund() {
      PouchDB.plugin(findPlugin);
      console.log(this.cid);
      const c_id = this.cid;
      var db = new PouchDB(
        "http://crow:tezoscrow@/127.0.0.1:5984/contract_info"
      );
      db.createIndex({
        index: { fields: ["_id"] }
      })
        .then(function() {
          return db.find({
            selector: {
              _id: { $eq: c_id }
            },
            sort: ["_id"]
          });
        })
        .then(function(result) {
          console.log(result);
          console.log(result.docs);
          for (var i = 0; i < result.docs.length; i++) {
            var doc = {
              _id: result.docs[i]._id,
              _rev: result.docs[i]._rev,
              contractname: result.docs[i].contractname,
              selleraddress: result.docs[i].selleraddress,
              buyeraddress: result.docs[i].buyeraddress,
              escrowaddress: result.docs[i].escrowaddress,
              productprice: result.docs[i].productprice,
              createdon: result.docs[i].createdon,
              colateral: result.docs[i].colateral,
              fee: result.docs[i].fee,
              productdesc: result.docs[i].productdesc,
              updatedate: result.docs[i].updatedate,
              hxsc: result.docs[i].hxsc,
              dapppkh: result.docs[i].dapppkh,
              contractstatus: result.docs[i].contractstatus,
              buyerResponse: result.docs[i].buyerResponse,
              sellerResponse: "Refund"
            };
            db.put(doc)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    release() {
      PouchDB.plugin(findPlugin);
      console.log(this.cid);
      const c_id = this.cid;
      var db = new PouchDB(
        "http://crow:tezoscrow@/127.0.0.1:5984/contract_info"
      );
      db.createIndex({
        index: { fields: ["_id"] }
      })
        .then(function() {
          return db.find({
            selector: {
              _id: { $eq: c_id }
            },
            sort: ["_id"]
          });
        })
        .then(function(result) {
          for (var i = 0; i < result.docs.length; i++) {
            var doc = {
              _id: result.docs[i]._id,
              _rev: result.docs[i]._rev,
              contractname: result.docs[i].contractname,
              selleraddress: result.docs[i].selleraddress,
              buyeraddress: result.docs[i].buyeraddress,
              escrowaddress: result.docs[i].escrowaddress,
              productprice: result.docs[i].productprice,
              createdon: result.docs[i].createdon,
              colateral: result.docs[i].colateral,
              fee: result.docs[i].fee,
              productdesc: result.docs[i].productdesc,
              updatedate: result.docs[i].updatedate,
              hxsc: result.docs[i].hxsc,
              dapppkh: result.docs[i].dapppkh,
              contractstatus: result.docs[i].contractstatus,
              buyerResponse: result.docs[i].buyerResponse,
              sellerResponse: "Release"
            };
            db.put(doc)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
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
