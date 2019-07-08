function transactionLogic(type, amountValue, colateral, fee) {
  var amount = 0;
  var buyerAmount = 0;
  var sellerAmount = 0;
  var escrow = 0;
  var total = 0;
  var i = 0;
  var index = 0;
  var auxStr = "";
  if (type === "Release") {
    if (amountValue.indexOf(".") > -1) {
      amount = parseFloat(amountValue);
    } else if (amountValue.indexOf(",") > -1) {
      index = amountValue.indexOf(",");
      auxStr = "";
      for (i = 0; i < amountValue.length; i++) {
        if (i == index) {
          auxStr += ".";
        } else {
          auxStr += amountValue[i];
        }
      }

      console.log(auxStr);
      amount = parseFloat(auxStr);
    } else {
      amount = parseInt(amountValue);
    }
    console.log(amount);
    console.log(colateral);
    console.log(fee);
    buyerAmount = colateral - amount * (0.5 * fee);
    sellerAmount = amount * 2 + (colateral - amount * (0.5 * fee));
    escrow = amount * fee;
    total = buyerAmount + sellerAmount + escrow;
    console.log(buyerAmount);
    console.log(sellerAmount);
    console.log(escrow);
    console.log(total);
    return "Success";
  } else if (type === "Refund") {
    if (amountValue.indexOf(".") > -1) {
      amount = parseFloat(amountValue);
    } else if (amountValue.indexOf(",") > -1) {
      index = amountValue.indexOf(",");
      auxStr = "";
      for (i = 0; i < amountValue.length; i++) {
        if (i == index) {
          auxStr += ".";
        } else {
          auxStr += amountValue[i];
        }
      }

      console.log(auxStr);
      amount = parseFloat(auxStr);
    } else {
      amount = parseInt(amountValue);
    }
    console.log(amount);
    console.log(colateral);
    console.log(fee);
    buyerAmount = amount + (colateral - amount * (0.5 * fee));
    sellerAmount = amount + (colateral - amount * (0.5 * fee));
    escrow = amount * fee;
    total = buyerAmount + sellerAmount + escrow;
    console.log(buyerAmount);
    console.log(sellerAmount);
    console.log(escrow);
    console.log(total);
    return "Success";
  } else {
    return "Error";
  }
}

export default transactionLogic;
