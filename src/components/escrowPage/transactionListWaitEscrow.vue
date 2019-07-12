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
                <h5>Transaction Description:</h5>
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
    margin-right: auto;width:185px"
        >
          <div class="w3-row">
            <div class="w3-cell">
              <button
                class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                @click="
                  execute();
                  modal2();
                  $modal.hide('detailsEscrowModal');
                "
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
      <modal
        name="executeEscrowModal"
        height="auto"
        :scrollable="true"
        @before-open="beforeOpen"
        @before-close="beforeClose"
      >
        <div class="w3-container w3-row">
          <div class="w3-cell-row">
            <div class="w3-container w3-cell-top w3-display-topleft">
              <h3 class="w3-text-blue" style="margin-top:10px">
                Execute Transactions
              </h3>
            </div>
            <div class="w3-container w3-cell-top w3-display-topright">
              <button
                class="w3-button w3-white w3-border-white w3-shadow-white w3-hover-white"
                style="width:40px;height:30px"
                @click="$modal.hide('executeEscrowModal')"
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
        <p>&nbsp;</p>
        <div class="w3-container w3-row">
          <div class="component-container">
            <div class="w3-cell-row">
              <h5>Seller Transfer</h5>
              <hr style="border: 0.7px solid gray;" />
              <div
                class="component-container w3-center"
                style="margin-left: auto;
    margin-right: auto;width:400px"
              >
                <div class="w3-row">
                  <div class="w3-cell w3-half">
                    <button
                      class="w3-btn w3-disabled w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-if="sellerSFlag"
                    >
                      Sign Transaction
                    </button>
                    <button
                      class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-else
                      @click="sellerSign()"
                    >
                      Sign Transaction
                    </button>
                  </div>
                  <div class="w3-cell w3-half">
                    <button
                      class="w3-btn w3-disabled w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-if="sellerSFlag === false || sellerTFlag"
                    >
                      Execute Transaction
                    </button>
                    <button
                      class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-else
                      @click="sellerExec()"
                    >
                      Execute Transaction
                    </button>
                  </div>
                </div>
                <p></p>
                <div
                  class="alert alert-success"
                  style="margin-left:20px;margin-right:20px"
                  v-if="requestErrS == false"
                >
                  <strong>Success!</strong>
                  Successfull operation.
                </div>
                <div
                  class="alert alert-warning"
                  style="margin-left:20px;margin-right:20px"
                  v-if="requestErrS == true"
                >
                  <strong>Error!</strong>
                  Something went wrong, check TzScan.
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>&nbsp;</p>
        <div class="w3-container w3-row">
          <div class="component-container">
            <div class="w3-cell-row">
              <h5>Buyer Transfer</h5>
              <hr style="border: 0.7px solid gray;" />
              <div
                class="component-container w3-center"
                style="margin-left: auto;
    margin-right: auto;width:400px"
              >
                <div class="w3-row">
                  <div class="w3-cell w3-half">
                    <button
                      class="w3-btn w3-disabled w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-if="sellerTFlag === false || buyerSFlag"
                    >
                      Sign Transaction
                    </button>
                    <button
                      class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-else
                      @click="buyerSign"
                    >
                      Sign Transaction
                    </button>
                  </div>
                  <div class="w3-cell w3-half">
                    <button
                      class="w3-btn w3-disabled w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-if="buyerSFlag === false || buyerTFlag"
                    >
                      Execute Transaction
                    </button>
                    <button
                      class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-else
                      @click="buyerExec"
                    >
                      Execute Transaction
                    </button>
                  </div>
                </div>
                <p></p>
                <div
                  class="alert alert-success"
                  style="margin-left:20px;margin-right:20px"
                  v-if="requestErrB == false"
                >
                  <strong>Success!</strong>
                  Successfull operation.
                </div>
                <div
                  class="alert alert-warning"
                  style="margin-left:20px;margin-right:20px"
                  v-if="requestErrB == true"
                >
                  <strong>Error!</strong>
                  Something went wrong, check TzScan.
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>&nbsp;</p>
        <div class="w3-container w3-row">
          <div class="component-container">
            <div class="w3-cell-row">
              <h5>Escrow Transfer</h5>
              <hr style="border: 0.7px solid gray;" />
              <div
                class="component-container w3-center"
                style="margin-left: auto;
    margin-right: auto;width:400px"
              >
                <div class="w3-row">
                  <div class="w3-cell w3-half">
                    <button
                      class="w3-btn w3-disabled w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-if="buyerTFlag === false || escrowSFlag"
                    >
                      Sign Transaction
                    </button>
                    <button
                      class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-else
                      @click="escrowSign"
                    >
                      Sign Transaction
                    </button>
                  </div>
                  <div class="w3-cell w3-half">
                    <button
                      class="w3-btn w3-disabled w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-if="escrowSFlag === false || escrowTFlag"
                    >
                      Execute Transaction
                    </button>
                    <button
                      class="w3-btn w3-round-xlarge w3-blue w3-hover-light-gray w3-text-white"
                      v-else
                      @click="escrowExec"
                    >
                      Execute Transaction
                    </button>
                  </div>
                </div>
                <p></p>
                <div
                  class="alert alert-success"
                  style="margin-left:20px;margin-right:20px"
                  v-if="requestErrE == false"
                >
                  <strong>Success!</strong>
                  Successfull operation.
                </div>
                <div
                  class="alert alert-warning"
                  style="margin-left:20px;margin-right:20px"
                  v-if="requestErrE == true"
                >
                  <strong>Error!</strong>
                  Something went wrong, check TzScan.
                </div>
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
import * as Cookies from "js-cookie";
import contractsign from "../contractUtils/signcontract.js";
import contractexecute from "../contractUtils/executecontract";
function find() {
  PouchDB.plugin(findPlugin);
  var db = new PouchDB("http://localhost:5984/contract_info");

  var arr = [];
  db.createIndex({
    index: { fields: ["contractstatus"] }
  })
    .then(function() {
      return db.find({
        selector: {
          contractstatus: { $eq: "Accepted!" }
        },
        sort: ["contractstatus"]
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
      requestErr: null,
      requestErrS: null,
      requestErrB: null,
      requestErrE: null,
      sellerTFlag: false,
      buyerTFlag: false,
      escrowTFlag: false,
      sellerSFlag: false,
      buyerSFlag: false,
      escrowSFlag: false
    };
  },
  methods: {
    modal: function(event) {
      console.log(event);
      this.$modal.show("detailsEscrowModal", { text: event });
    },
    modal2: function(event) {
      console.log(event);
      this.$modal.show("executeEscrowModal", { text: event });
    },
    updateDB() {
      const cid = this.cid;
      PouchDB.plugin(findPlugin);
      var db = new PouchDB("http://localhost:5984/contract_info");

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
              contractstatus: "Finished!",
              buyerResponse: result.docs[i].buyerResponse,
              sellerResponse: result.docs[i].sellerResponse
            };
            db.put(doc)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
            var db1 = new PouchDB(
              "http://crow:tezoscrow@/127.0.0.1:5984/sc_cid"
            );

            db1
              .createIndex({
                index: { fields: ["selleraddress"] }
              })
              .then(function() {
                return db.find({
                  selector: {
                    selleraddress: { $eq: result.docs[i].selleraddress },
                    contractstatus: { $eq: "Accepted!" },
                    buyeraddress: { $eq: result.docs[i].buyeraddress },
                    hxsc: { $eq: result.docs[i].hxsc },
                    contractname: { $eq: result.docs[i].hxsc }
                  },
                  sort: ["selleraddress"]
                });
              })
              .then(function(result) {
                var i = 0;
                for (i = 0; i < result.docs.length; i++) {
                  doc = {
                    _id: result.docs[i]._id,
                    _rev: result.docs[i]._rev,
                    selleraddress: result.docs[i].selleraddress,
                    createdon: result.docs[i].createdon,
                    productprice: result.docs[i].productprice,
                    colateral: result.docs[i].colateral,
                    fee: result.docs[i].fee,
                    productdesc: result.docs[i].productdesc,
                    contractname: result.docs[i].contractname,
                    updatedate: result.docs[i].updatedate,
                    buyeraddress: result.docs[i].buyeraddress,
                    hxsc: result.docs[i].hxsc,
                    contractstatus: "Finished!"
                  };
                  db1
                    .put(doc)
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
        });
    },
    sellerSign() {
      var data = JSON.parse(Cookies.get("data"));
      console.log(data.hxsc);
      var res = contractsign(data.hxsc);
      if (res === "Error") {
        this.requestErrS = true;
      } else {
        this.requestErrS = false;
      }
      this.sellerSFlag = true;
    },
    sellerExec() {
      var data = JSON.parse(Cookies.get("data"));
      var amount = 0;
      var sellerAmount = 0;
      var i = 0;
      var res = 0;
      var index = 0;
      var auxStr = "";
      var colateral;
      var fee;
      if (data.type === "Release") {
        if (data.amount.indexOf(".") > -1) {
          amount = parseFloat(data.amount);
        } else if (data.amount.indexOf(",") > -1) {
          index = data.amount.indexOf(",");
          auxStr = "";
          for (i = 0; i < data.amount.length; i++) {
            if (i == index) {
              auxStr += ".";
            } else {
              auxStr += data.amount[i];
            }
          }

          console.log(auxStr);
          amount = parseFloat(auxStr);
        } else {
          amount = parseInt(data.amount);
        }
        console.log(amount);
        console.log(data.colateral);
        colateral = data.colateral;
        fee = data.fee;
        console.log(data.fee);
        sellerAmount = amount * 2 + (colateral - amount * (0.5 * fee));

        console.log(sellerAmount);
        res = contractexecute(data.selleraddress, sellerAmount, data.hxsc);
      } else if (data.type === "Refund") {
        if (data.amount.indexOf(".") > -1) {
          amount = parseFloat(data.amount);
        } else if (data.amount.indexOf(",") > -1) {
          index = data.amount.indexOf(",");
          auxStr = "";
          for (i = 0; i < data.amount.length; i++) {
            if (i == index) {
              auxStr += ".";
            } else {
              auxStr += data.amount[i];
            }
          }

          console.log(auxStr);
          amount = parseFloat(auxStr);
        } else {
          amount = parseInt(data.amount);
        }
        console.log(amount);
        console.log(colateral);
        console.log(fee);
        colateral = data.colateral;
        fee = data.fee;

        sellerAmount = amount + (colateral - amount * (0.5 * fee));

        console.log(sellerAmount);

        res = contractexecute(data.selleraddress, sellerAmount, data.hxsc);
      }

      if (res === "Error") {
        this.requestErrS = true;
      } else {
        this.requestErrS = false;
      }
      this.sellerTFlag = true;
    },
    buyerSign() {
      var data = JSON.parse(Cookies.get("data"));
      var res = contractsign(data.hxsc);
      if (res === "Error") {
        this.requestErrB = true;
      } else {
        this.requestErrB = false;
      }
      this.buyerSFlag = true;
    },
    buyerExec() {
      var data = JSON.parse(Cookies.get("data"));
      var amount = 0;
      var buyerAmount = 0;
      var i = 0;
      var res = 0;
      var index = 0;
      var auxStr = "";
      var colateral;
      var fee;
      if (data.type === "Release") {
        if (data.amount.indexOf(".") > -1) {
          amount = parseFloat(data.amount);
        } else if (data.amount.indexOf(",") > -1) {
          index = data.amount.indexOf(",");
          auxStr = "";
          for (i = 0; i < data.amount.length; i++) {
            if (i == index) {
              auxStr += ".";
            } else {
              auxStr += data.amount[i];
            }
          }

          console.log(auxStr);
          amount = parseFloat(auxStr);
        } else {
          amount = parseInt(data.amount);
        }
        console.log(amount);
        console.log(data.colateral);
        colateral = data.colateral;
        fee = data.fee;
        console.log(data.fee);
        buyerAmount = colateral - amount * (0.5 * fee);

        console.log(buyerAmount);
        res = contractexecute(data.buyeraddress, buyerAmount, data.hxsc);
      } else if (data.type === "Refund") {
        if (data.amount.indexOf(".") > -1) {
          amount = parseFloat(data.amount);
        } else if (data.amount.indexOf(",") > -1) {
          index = data.amount.indexOf(",");
          auxStr = "";
          for (i = 0; i < data.amount.length; i++) {
            if (i == index) {
              auxStr += ".";
            } else {
              auxStr += data.amount[i];
            }
          }

          console.log(auxStr);
          amount = parseFloat(auxStr);
        } else {
          amount = parseInt(data.amount);
        }
        console.log(amount);
        console.log(colateral);
        console.log(fee);
        colateral = data.colateral;
        fee = data.fee;
        buyerAmount = amount + (colateral - amount * (0.5 * fee));

        console.log(buyerAmount);

        res = contractexecute(data.buyeraddress, buyerAmount, data.hxsc);
      }

      if (res === "Error") {
        this.requestErrB = true;
      } else {
        this.requestErrB = false;
        this.buyerTFlag = true;
      }
    },
    escrowSign() {
      var data = JSON.parse(Cookies.get("data"));
      var res = contractsign(data.hxsc);
      if (res === "Error") {
        this.requestErrE = true;
      } else {
        this.requestErrE = false;
      }
      this.escrowSFlag = true;
    },
    escrowExec() {
      var data = JSON.parse(Cookies.get("data"));
      var amount = 0;
      var escrowAmount = 0;
      var i = 0;
      var res = 0;
      var index = 0;
      var auxStr = "";
      var colateral;
      var fee;
      if (data.type === "Release") {
        if (data.amount.indexOf(".") > -1) {
          amount = parseFloat(data.amount);
        } else if (data.amount.indexOf(",") > -1) {
          index = data.amount.indexOf(",");
          auxStr = "";
          for (i = 0; i < data.amount.length; i++) {
            if (i == index) {
              auxStr += ".";
            } else {
              auxStr += data.amount[i];
            }
          }

          console.log(auxStr);
          amount = parseFloat(auxStr);
        } else {
          amount = parseInt(data.amount);
        }
        console.log(amount);
        console.log(data.colateral);
        colateral = data.colateral;
        fee = data.fee;
        console.log(data.fee);
        escrowAmount = amount * fee;

        console.log(escrowAmount);
        res = contractexecute(data.escrowaddress, escrowAmount, data.hxsc);
      } else if (data.type === "Refund") {
        if (data.amount.indexOf(".") > -1) {
          amount = parseFloat(data.amount);
        } else if (data.amount.indexOf(",") > -1) {
          index = data.amount.indexOf(",");
          auxStr = "";
          for (i = 0; i < data.amount.length; i++) {
            if (i == index) {
              auxStr += ".";
            } else {
              auxStr += data.amount[i];
            }
          }

          console.log(auxStr);
          amount = parseFloat(auxStr);
        } else {
          amount = parseInt(data.amount);
        }
        console.log(amount);
        console.log(colateral);
        console.log(fee);
        colateral = data.colateral;
        fee = data.fee;

        escrowAmount = amount * fee;

        console.log(escrowAmount);

        res = contractexecute(data.escrowaddress, escrowAmount, data.hxsc);
      }

      if (res === "Error") {
        this.requestErrE = true;
      } else {
        this.requestErrE = false;
        this.escrowTFlag = true;
      }

      this.updateDB();
    },
    find: function() {},
    scid(cid) {
      this.cid = cid;
    },
    execute() {
      const cid = this.cid;
      PouchDB.plugin(findPlugin);
      var db = new PouchDB("http://localhost:5984/contract_info");

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
              Cookies.set("data", {
                type: "Refund",
                amount: result.docs[i].productprice,
                colateral: result.docs[i].colateral,
                fee: result.docs[i].fee,
                selleraddress: result.docs[i].selleraddress,
                buyeraddress: result.docs[i].buyeraddress,
                escrowaddress: result.docs[i].escrowaddress,
                hxsc: result.docs[i].hxsc
              });
              console.log(Cookies.get("data"));
            } else if (
              result.docs[i].buyerResponse == "Release" &&
              result.docs[i].sellerResponse == "Release"
            ) {
              Cookies.set("data", {
                type: "Release",
                amount: result.docs[i].productprice,
                colateral: result.docs[i].colateral,
                fee: result.docs[i].fee,
                selleraddress: result.docs[i].selleraddress,
                buyeraddress: result.docs[i].buyeraddress,
                escrowaddress: result.docs[i].escrowaddress,
                hxsc: result.docs[i].hxsc
              });
              console.log(Cookies.get("data"));
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
