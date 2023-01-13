import fs from 'fs'
import fg from 'fast-glob'
import readlineSync from 'readline-sync'

import { generateWallet } from './generateWallet.js'

let walletCount = (fg.sync('./wallets/*.json', { onlyFiles: true, onlyDirectories: false, unique: true, deep: 1 })).length;
let howMany = parseInt(readlineSync.question("Amount of wallets to generate: "))

for (let i = 1 + walletCount; i <= howMany + walletCount; i++) {
  let newWallet = await generateWallet()
  fs.writeFileSync('./wallets/' + i + '.json', JSON.stringify(newWallet));
}

console.log("Generated " + howMany + " wallets!")