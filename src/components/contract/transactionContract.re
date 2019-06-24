[%%version 0.9]
type proposition = {
    destination: key_hash,
    amount: tez
};

type storage= {
    owners: set(address),
    owners_signed: set(address),
    last_proposition: option(proposition)
};

 let%init storage = {
    owners: Set([tz1b7tUupMgCNw2cCLpKTkSD1NZzB5TkP2sv : address, tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv : address, tz1SL1KC6TwEuaMtSXLM7P51DFekbzytRX2z :address]),
    last_proposition: None,
    owners_signed: Set
};

let can_call = (storage) => {
    let sender = Current.sender();
    Set.mem(sender, storage.owners)
};

let fail_with_wrong_ownership = () => {
    Current.failwith("Only contract owners can propose new transactions")
};

[%%entry let create_proposition = (new_proposition: proposition, storage) => {
    if (can_call(storage)) {
        switch(storage.last_proposition) {
            | Some(proposition) => Current.failwith("Transaction proposal is already pending, please delete it before creating a new one")
            | None => ([], {
                last_proposition: Some(new_proposition),
                owners: storage.owners,
                owners_signed: Set
            })
        }
    } else {
        fail_with_wrong_ownership()
    }
}];

let delete_proposition = (storage, transactions) => {
    (transactions, {
        owners: storage.owners,
        last_proposition: None,
        owners_signed: Set
    })
};

[%%entry let delete_proposition = (parameter: unit, storage) => {
    if (can_call(storage)){
        delete_proposition(storage, [])
    } else {
        Current.failwith("Only contracts owners can sign transaction proposals")
    }
}];

[%%entry let sign_proposition = (parameter: unit, storage) => {
    if(can_call(storage)){
        let sender = Current.sender();
        ([],{
            last_proposition: storage.last_proposition,
            owners: storage.owners,
            owners_signed: Set.add(sender, storage.owners_signed)
        });
    } else {
        Current.failwith("Only contract owners can sign transaction proposals")
    }
}];

[%%entry let execute_proposition = (parameter: unit, storage) => {
    if (can_call(storage)){
        if(Set.size(storage.owners_signed) == Set.size(storage.owners)){
            switch (storage.last_proposition){
            | Some(proposition) => {
                let transfer = Account.transfer(
                    ~dest = proposition.destination,
                    ~amount = proposition.amount
                );
                delete_proposition(storage, [transfer]);
            }
            | None => Current.failwith("There is no proposition to execute")
            }
        } else {
            Current.failwith("More signatures required to execute the proposition")
        }
    } else {
        Current.failwith("Only contract owners can sign transaction proposals")
    }
}];