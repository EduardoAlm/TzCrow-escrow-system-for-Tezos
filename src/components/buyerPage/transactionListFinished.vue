<template>
  <div class="w3-container">
    <div class="component-container" style="width: 100%">
      <table class="w3-table w3-bordered w3-centered w3-striped">
        <tr>
          <th>Seller Address</th>
          <th>Contract Name</th>
          <th>Buyer Address</th>
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
          <td>{{ trans.buyeraddress }}</td>
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
        name="detailsBuyerModalFinished"
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
                @click="$modal.hide('detailsBuyerModalFinished')"
              >
                <img
                  src="../../assets/cross.png"
                  style="width:20px;height:20px"
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
        <p>&nbsp;</p>
      </modal>
    </div>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import findPlugin from "pouchdb-find";
export default {
  name: "transactionListFinished",
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
      this.$modal.show("detailsBuyerModalFinished", { text: event });
    },
    find: function() {
      PouchDB.plugin(findPlugin);
      var db = new PouchDB("http://crow:tezoscrow@/127.0.0.1:5984/sc_cid");

      var arr = [];
      db.createIndex({
        index: { fields: ["selleraddress"] }
      })
        .then(function() {
          return db.find({
            selector: {
              selleraddress: { $gt: null },
              contractstatus: { $eq: "Finished!" }
            },
            sort: ["selleraddress"]
          });
        })
        .then(function(result) {
          var i = 0;
          for (i = 0; i < result.docs.length; i++) {
            arr.push(result.docs[i]);
          }
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
    },
    contid(id) {
      this.cid = id;
      console.log(this.cid);
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
