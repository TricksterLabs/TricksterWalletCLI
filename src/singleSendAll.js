import fs from 'fs'
import fg from 'fast-glob'
import ini from 'ini'
import readLineSync from 'readline-sync'

import { prepareWallet } from './prepareWallet.js';
import { prepareTx } from './prepareTxAll.js';
import { sendTx } from './sendTx.js';
import { checkTx } from './checkTx.js';

const config = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))

while (true) {
  const chooseWallet = parseInt(readLineSync.question("Send from wallet ID: "))
  const parseWallet = JSON.parse(fs.readFileSync('./wallets/' + chooseWallet + '.json', 'utf8'))
  console.log("   ", parseWallet.baseAddress0Bech32)
  const wallet = await prepareWallet(parseWallet.entropy)
  const sendAmount = parseFloat(readLineSync.question("ADA amount: "))
  console.log("   ", sendAmount)
  const sendAddress = parseWallet.baseAddress0Bech32
  const receiveAddress = readLineSync.question("To address: ")
  console.log("   ", receiveAddress)
  const TTL = parseInt(config.main.ttl)
  const tx = await prepareTx(sendAmount, sendAddress, receiveAddress, TTL, wallet.paymentSKey)
  console.log("   ")
  await sendTx(tx.txBuffer)
}