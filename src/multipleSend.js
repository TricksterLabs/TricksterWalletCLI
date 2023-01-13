import fs from 'fs'
import fg from 'fast-glob'
import ini from 'ini'
import readLineSync from 'readline-sync'

import { prepareWallet } from './prepareWallet.js';
import { prepareTx } from './prepareTx.js';
import { sendTx } from './sendTx.js';
import { checkTx } from './checkTx.js';

const config = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))

const fromWallets = parseInt(readLineSync.question("Send from wallet ID: "))
const toWallets = parseInt(readLineSync.question("Until wallet ID: "))
const sendAmount = parseFloat(readLineSync.question("ADA amount: "))
console.log("   ", sendAmount)
const receiveAddress = readLineSync.question("To address: ")
console.log("   ", receiveAddress)
console.log("   ")
const TTL = parseInt(config.main.ttl)

for (let i = fromWallets; i <= toWallets; i++) {
  let chooseWallet = i
  let parseWallet = JSON.parse(fs.readFileSync('./wallets/' + chooseWallet + '.json', 'utf8'))
  let wallet = await prepareWallet(parseWallet.entropy)
  let sendAddress = parseWallet.baseAddress0Bech32
  console.log("   ", sendAddress)
  let tx = await prepareTx(sendAmount, sendAddress, receiveAddress, TTL, wallet.paymentSKey)
  console.log("   ")
  let sent = await sendTx(tx.txBuffer)
}