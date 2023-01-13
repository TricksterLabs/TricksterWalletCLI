import axios from "axios"
import ini from 'ini'
import fs from 'fs'

const config = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))
const apiAddress = "https://cardano-mainnet.blockfrost.io/api/v0/txs/"

const headers = {
  'project_id': config.main.blockfrostID
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function pollTx(txHash) {
  try {
    const response = await axios.get(apiAddress + txHash, { headers })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error.response.data.status_code, txHash);
    return error.response.data.status_code
  }
}

export async function checkTx(txHash) {
  let txStatus = 404
  while (txStatus == 404) {
    txStatus = await pollTx(txHash)
    await delay(parseInt(config.main.pollingRate))
  }
}