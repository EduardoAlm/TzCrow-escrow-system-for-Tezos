import * as Cookies from "js-cookie";
const eztz = window.eztz;

function awaitContract() {
  Cookies.set("contractAddress", "KT1GQe4bjMc8UGDq1EqTXTAvF5E6uaKhxovA");

  eztz.contract.watch("KT1GQe4bjMc8UGDq1EqTXTAvF5E6uaKhxovA", 2, function(s) {
    console.log("New storage", s);
    return s;
  });

  eztz.rpc
    .getBalance("KT1GQe4bjMc8UGDq1EqTXTAvF5E6uaKhxovA")
    .then(console.log)
    .catch(console.log);
}

/*function constractpropose(address, amount) {
  eztz.contract.send(address);
}

function contractsign(address) {
  eztz.contract.send(address);
}

function contractexecute(address, amount) {
  eztz.contract.send(address, amount);
}
*/
export default awaitContract;

/*const content = `parameter
                    (or :_entries
                      (pair :proposition %_Liq_entry_create_proposition
                          (key_hash %destination)
                          (mutez %amount))
                      (or (unit %_Liq_entry_sign_proposition) (unit %_Liq_entry_execute_proposition)));
                  storage
                    (pair :storage
                      (set %owners address)
                      (pair (set %owners_signed address)
                            (option %last_proposition
                                (pair :proposition (key_hash %destination) (mutez %amount)))));
                  code { DUP ;
                        DIP { CDR @storage_slash_1 } ;
                        CAR @parameter_slash_2 ;
                        LAMBDA @can_call
                          (pair :storage
                              (set %owners address)
                              (pair (set %owners_signed address)
                                    (option %last_proposition
                                      (pair :proposition (key_hash %destination) (mutez %amount)))))
                          bool
                          { RENAME @storage_slash_3 ; CAR %owners ; SENDER @sender ; MEM } ;
                        DIP { DUP @parameter } ; SWAP ;
                        IF_LEFT
                          { RENAME @new_proposition_slash_12 ;
                            DIP { DIP { DIP { DUP @storage } ; SWAP } ; SWAP } ; SWAP ;
                            DIP { DIP { DUP @can_call } ; SWAP } ; SWAP ;
                            DIP { DUP @storage } ; SWAP ;
                            EXEC ;
                            IF { DUP @storage ;
                                  CDDR %last_proposition ;
                                  IF_NONE
                                    { DIP { DUP @new_proposition } ; SWAP ;
                                      SOME ;
                                      PUSH (set address) {} ;
                                      PAIR %owners_signed %last_proposition ;
                                      DIP { DUP @storage } ; SWAP ;
                                      CAR %owners ;
                                      PAIR %owners ;
                                      NIL operation ;
                                      PAIR }
                                    { PUSH string
                                          "Transaction proposal is already pending, please delete it before creating a new one" ;
                                      FAILWITH } }
                                { PUSH string "Only contract owners can propose new transactions" ; FAILWITH } ;
                            DIP { DROP ; DROP } }
                          { IF_LEFT
                              { RENAME @__slash_15 ;
                                DIP { DIP { DIP { DUP @storage } ; SWAP } ; SWAP } ; SWAP ;
                                DIP { DIP { DUP @can_call } ; SWAP } ; SWAP ;
                                DIP { DUP @storage } ; SWAP ;
                                EXEC ;
                                IF { DUP @storage ;
                                      CDDR %last_proposition ;
                                      DIP { DUP @storage } ; SWAP ;
                                      CDAR %owners_signed ;
                                      SENDER @sender ;
                                      DIP { PUSH bool True } ;
                                      UPDATE ;
                                      PAIR %owners_signed %last_proposition ;
                                      DIP { DUP @storage } ; SWAP ;
                                      CAR %owners ;
                                      PAIR %owners ;
                                      NIL operation ;
                                      PAIR }
                                    { PUSH string "Only contract owners can sign transaction proposals" ;
                                      FAILWITH } ;
                                DIP { DROP ; DROP } }
                              { RENAME @__slash_18 ;
                                DIP { DIP { DIP { DUP @storage } ; SWAP } ; SWAP } ; SWAP ;
                                DIP { DIP { DUP @can_call } ; SWAP } ; SWAP ;
                                DIP { DUP @storage } ; SWAP ;
                                EXEC ;
                                IF { DUP @storage ;
                                      CAR %owners ;
                                      SIZE ;
                                      DIP { DUP @storage } ; SWAP ;
                                      CDAR %owners_signed ;
                                      SIZE ;
                                      COMPARE ;
                                      EQ ;
                                      IF { DUP @storage ;
                                          CDDR %last_proposition ;
                                          IF_NONE
                                            { PUSH string "There is no proposition to execute" ; FAILWITH }
                                            { DUP @proposition ;
                                              CAR %destination ;
                                              IMPLICIT_ACCOUNT ;
                                              SWAP ;
                                              CDR %amount ;
                                              UNIT ;
                                              TRANSFER_TOKENS @transfer ;
                                              NIL operation ;
                                              SWAP ;
                                              CONS ;
                                              DIP { DUP } ; SWAP ;
                                              PAIR ;
                                              NONE (pair :proposition (key_hash %destination) (mutez %amount)) ;
                                              PUSH (set address) {} ;
                                              PAIR %owners_signed %last_proposition ;
                                              DIP { DUP } ; SWAP ;
                                              CAR @storage ;
                                              CAR %owners ;
                                              PAIR %owners ;
                                              SWAP ;
                                              CDR @transactions ;
                                              PAIR } }
                                        { PUSH string "More signatures required to execute the proposition" ;
                                          FAILWITH } }
                                    { PUSH string "Only contract owners can sign transaction proposals" ;
                                      FAILWITH } ;
                                DIP { DROP ; DROP } } } ;
                        DIP { DROP ; DROP ; DROP } };
`;

eztz.node.setProvider("http://localhost:18731");
const tezosNode = "http://localhost:18731";

async function generatecontract() {
  var mne = eztz.crypto.generateMnemonic();
  console.log(mne);
  var keys = eztz.crypto.generateKeys(
    mne,
    "tez.escrow@gmail.com" + "decentralizedApplication"
  );
  console.log(keys.pkh);
  console.log(keys.sk);
  const keysext = eztz.crypto.extractKeys(
    "edsk4QLrcijEffxV31gGdN2HU7UpyJjA8drFoNcmnB28n89YjPNRFm"
  );
  console.log(keysext);
  Cookies.set("contractAddress", "KT1BREGJgNf22ZThJ2pgu8as7rgaabzWyPD3");
 eztz.contract
    .originate(
      keysext,
      2000,
      content,
      'Pair {"tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv"}(Pair {} None)',
      false,
      false,
      null,
      500
    )
    .then(console.log)
    .catch(console.error);


  const keystore = {
    publicKey: keysext.pk,
    privateKey: keysext.sk,
    publicKeyHash: keysext.pkh,
    seed: "",
    storeType: StoreType.Fundraiser
  };
  const storage = '"Sample"';
  console.log(content);
  await TezosNodeWriter.sendContractOriginationOperation(
    tezosNode,
    keystore,
    10000,
    undefined,
    false,
    false,
    100000,
    "",
    "10000",
    "10000",
    content,
    storage
  )
    .then(result => {
      console.log("Injected operation group id " + result.operationGroupID);
    })
    .catch(err => {
      console.log(err);
    });
} */
