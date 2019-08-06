# TzCrow

An escrow is a third party that increases the security of a transaction by controlling the funds associated with it.
This project has the goal of bringing that security to the Tezos Blockchain. Right now is still a prototipe and lacks in security on the dApp side, and so while it can run on the mainnet and alphanet, its still advisable for its usage on a sandboxed node. 

For launching the sandboxed node is advised to use the granary located in the https://github.com/EduardoAlm/Granary repository.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Aditional Packages
```
npm install js-cookie
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### If $/.tezos-node/config.json file is missing
Go to tezos folder and run, 
```
./tezos-node config init
```
the file will be created in $/.tezos-node/config.json.

### Localhost execution 
#### (*sandboxed*)
Open three terminals and in each one navigate to /tezos folder, them chose one and run, 
```
./src/bin_node/tezos-sandboxed-node.sh 1 --connections 1 --cors-header='content-type' --cors-origin='*'
```
,then on a diferent terminal run,
```
eval `./src/bin_client/tezos-init-sandboxed-client.sh 1 --cors-header='content-type' --cors-origin='*'`

```
to inicialize the client data.
For last open the last of the three terminals and run,
` tezos-activate-alpha `
to be able to test transactions etc... using default commands.

#### (*not sandboxed*)
Executar o comando que se segue, na pasta da tezos,
```
./tezos-node run
```

Once your node is up and runnning go to $/.tezos-node/config.json and alter the config.json file.
In there change the rpc listenning port to your node port.

Example:

![rpcConnection](src/assets/rpcConn.png)


