import atomize from "./atomize";

const eztz = window.eztz;

function buyertransfer(contractAdd, buyerAddress, buyerAmount) {
  const keysext = eztz.crypto.extractKeys(
    "edsk4QLrcijEffxV31gGdN2HU7UpyJjA8drFoNcmnB28n89YjPNRFm"
  );
  console.log(keysext);
  console.log(keysext.pkh);
  console.log(keysext.sk);
  console.log(keysext);
  console.log(keysext.pkh);
  console.log(keysext.sk);
  console.log("normal" + buyerAmount);
  buyerAmount = atomize(buyerAmount);
  console.log("atomized" + buyerAmount);

  eztz.contract
    .send(
      contractAdd,
      "tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv",
      keysext,
      5,
      '(Right (Pair "' + buyerAddress + '" ' + buyerAmount + "))",
      1000000,
      400000,
      10000
    )
    .then(res => {
      eztz.rpc
        .awaitOperation(
          res.opbytes, //The operation hash to watch
          30, //Optional - Time between checks, defaults to 30 seconds
          180 //Optional - Timeout - will end after this, defaults to 180 seconds
        )
        .then(function(blockHash) {
          //Will resolve with the blockHash if found
          console.log("Found in block " + blockHash);
        })
        .catch(function() {
          //Reject on time out
        });
    })
    .catch(err => {
      console.log(err);
    });
}

export default buyertransfer;
