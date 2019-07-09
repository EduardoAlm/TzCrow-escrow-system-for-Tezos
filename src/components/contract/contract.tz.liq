[%%version 0.53]
type proposition = {
  destination: key_hash ;
  amount: tez }
type storage =
  {
    owners: address set ;
    owners_signed: address set }
let%init
  storage =
  {
    owners =
      ((Set
          ([(tz1ddb9NMYHZi5UzPdzTZMYQQZoMub195zgv : address)]))
         [@explicit_arity ]);
    
    owners_signed = Set
  } 

let can_call storage =
  let sender = Current.sender ()  in Set.mem sender storage.owners 
  
let delete_proposition storage transactions =
  (transactions,
   { owners = (storage.owners); owners_signed = Set
   }) 
let%entry
  sign_proposition (_ : unit) storage =
  if can_call storage
  then
    let sender = Current.sender ()  in
    ([],
     {
       
       owners = (storage.owners);
       owners_signed = (Set.add sender storage.owners_signed)
     })
  else
    Current.failwith "Only contract owners can sign transaction proposals"
        
let%entry
  execute_proposition (new_proposition : proposition) storage =
  if can_call storage
  then
    (if (Set.size storage.owners_signed) = (Set.size storage.owners)
     then
       let transfer =
         Account.transfer ~dest:(new_proposition.destination)
           ~amount:(new_proposition.amount)
       in
       delete_proposition storage [transfer]
     else
       Current.failwith
         "More signatures required to execute the proposition")
  else
    Current.failwith "Only contract owners can sign transaction proposals"