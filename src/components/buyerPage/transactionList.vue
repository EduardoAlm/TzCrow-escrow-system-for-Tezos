<template>
  <div class="w3-container">
    <div class="component-container" style="width: 100%">
      <table class="w3-table w3-bordered w3-centered w3-striped">
        <tr>
          <th>Address</th>
          <th>Contract Name</th>
          <th>Date of Creation</th>
          <th>Buyer Address</th>
          <th>Contract Status</th>
          <th>Details</th>
        </tr>
        <tr
          v-for="trans in transArray"
          v-bind:key="trans._id"
          class="w3-hover-orange"
        >
          <td>{{ trans.selleraddress }}</td>
          <td>{{ trans.contractname }}</td>
          <td>{{ trans.createdon }}</td>
          <td>{{ trans.buyeraddress }}</td>
          <td>{{ trans.contractstatus }}</td>
          <td>
            <button
              class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
              @click="modal(trans._id)"
            >
              See details
            </button>
          </td>
        </tr>
      </table>

      <modal
        name="detailsBuyerModal"
        height="auto"
        :scrollable="true"
        @before-open="beforeOpen"
        @before-close="beforeClose"
      >
        <div class="w3-container w3-row">
          <div class="w3-cell-row">
            <div class="w3-container w3-cell-top w3-display-topleft">
              <h3 class="w3-text-blue">Transaction Details</h3>
            </div>
            <div class="w3-container w3-cell-top w3-display-topright">
              <button
                class="w3-button w3-white w3-border-white w3-shadow-white w3-hover-white"
                @click="$modal.hide('detailsBuyerModal')"
              >
                <img
                  src="../../assets/cross.png"
                  style="width:20px;heigth:30px"
                />
              </button>
            </div>
          </div>
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
                <h5>Seller Address:</h5>
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
                <h5>Product Description:</h5>
                <p>{{ trans.productdesc }}</p>
                <hr style="border: 0.7px solid gray;" />
                <h5>Date of Update:</h5>
                <p>{{ trans.updatedate }}</p>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";
import * as Cookies from "js-cookies";
export default {
  name: "TransactionList",
  data: function() {
    return {
      transArray: null,
      id: ""
    };
  },
  methods: {
    modal: function(event) {
      console.log(event);
      this.$modal.show("detailsBuyerModal", { text: event });
    },
    find: function() {
      PouchDB.plugin(findPlugin);
      var db = new PouchDB("http://crow:tezoscrow@/127.0.0.1:5984/sc_cid");
      var bArray = [];
      var arr = [];
      db.createIndex({
        index: { fields: ["selleraddress"] }
      })
        .then(function() {
          return db.find({
            selector: { selleraddress: { $gt: null } },
            sort: ["selleraddress"]
          });
        })
        .then(function(result) {
          var i = 0;
          for (i = 0; i < result.docs.length; i++) {
            arr.push(result.docs[i]);
            let data = {
              id: result.docs[i]._id,
              rev: result.docs[i]._rev,
              selleraddress: result.docs[i].selleraddress,
              createdon: result.docs[i].createdon,
              productprice: result.docs[i].productprice,
              colateral: result.docs[i].colateral,
              fee: 1.5,
              productdesc: result.docs[i].productdesc,
              contractname: result.docs[i].contractname,
              updatedate: result.docs[i].updatedate,
              buyeraddress: result.docs[i].buyeraddress,
              hxsc: result.docs[i].hxsc,
              contractstatus: result.docs[i].contractstatus
            };
            bArray.push(data);

            console.log(bArray);
          }
          Cookies.set("bArray", bArray);
        })
        .catch(function(err) {
          console.log(err);
        });
      return arr;
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
    var data = this.find();
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
