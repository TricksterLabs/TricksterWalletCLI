import fs from 'fs'
import axios from "axios"
import ini from 'ini'

const config = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))
const apiAddress = "https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest"

const headers = {
  'project_id': config.main.blockfrostID
}

export async function getTTL(TTL) {
  try {
    const response = await axios.get(apiAddress, { headers })
    const data = response.data.slot
    return data + TTL
  } catch (error) {
    console.error(error.response.data);
  }
}