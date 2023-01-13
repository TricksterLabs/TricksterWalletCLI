# TricksterWalletCLI


### Installation

```
- Make a blockfrost account and copy the api key into blockfrostID in config/config.ini
- Install NodeJS
- Open terminal
- Go to a location of choice
- git clone https://github.com/TricksterLabs/TricksterWalletCLI.git
- npm install
```

### Usage (make sure you are in the root directory from terminal)

Make wallets:
```
node ./src/generateWallets.js
```

Send ada from one wallet (X):
```
node ./src/singleSend.js
```

Send all tokens and ada from one wallet (X):
```
node ./src/singleSendAll.js
```

Send ada from multiple wallets (X to Y):
```
node ./src/multipleSend.js
```

Get contents of a wallet (X):
```
node ./src/queryAddress.js
```

Convert entropy to private keys (you can find the entropy in each file in wallets folder):
```
node ./src/getWalletMnemonic.js
```


This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Info

This is an early proof of concept, it's good for mass sending to one address.
This is deprecated but works for what it's intended for.
You can find wallet information in wallets folder.
This has no measures of security, the private key is held in a text file, if your computer is infected it can be stolen.
Might need to update config/protocol.json from time to time.
Need to leave enough ada for the fee when sending (estimate it based on experience)