# tzCrow

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### If $/.tezos-node/config.json file is missing
Go to tezos folder and run, 
```
./tezos-node config init
```
the file will be created in $/.tezos-node/config.json.

### Localhost execution 
Open three terminals and in each one navigate to /tezos folder, them chose one and run, 
```
./src/bin_node/tezos-sandboxed-node.sh 9 --connections 1
```
,then on a diferent terminal run,
```
eval `./src/bin_client/tezos-init-sandboxed-client.sh 1`
```
to inicialize the client data.
For last open the last of the three terminals and run,
` tezos-activate-alpha `
to be able to test transactions etc... using default commands.

(ignorar o texto anterior)
Executar o comando que se segue, na pasta da tezos,
```
./tezos-node run
```

Once your node is up and runnning go to $/.tezos-node/config.json and alter the config.json file.
In there change the rpc listenning port to your node port.

Example:

![rpcConnection](src/assets/rpcConn.png)


