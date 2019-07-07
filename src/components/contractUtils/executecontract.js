import * as Cookies from "js-cookie";
const eztz = window.eztz;

eztz.node.setProvider("http://127.0.0.1:18731");

function contractexecute(address, amount) {
  const contractAdd = Cookies.get("contractAddress");
  eztz.contract.send(contractAdd, address, amount);
}

export default contractexecute;
