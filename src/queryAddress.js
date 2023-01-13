import fs from 'fs'
import axios from "axios"
import ini from 'ini'
import readLineSync from 'readline-sync'

const config = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))
const apiAddress = "https://cardano-mainnet.blockfrost.io/api/v0/addresses/"

const headers = {
  'project_id': config.main.blockfrostID
}

async function queryAddress(address) {
  try {
    const response = await axios.get(apiAddress + address, { headers })
    const data = response.data
    return data
  } catch (error) {
    console.error(error.response.data);
  }
}

while (true) {
  let walletID = readLineSync.question("Wallt ID to query: ")
  let wallet = JSON.parse(fs.readFileSync('./wallets/' + walletID + '.json', 'utf-8'))
  let query = await queryAddress(wallet.baseAddress0Bech32)
  console.log(query)
  console.log(" ")
}
