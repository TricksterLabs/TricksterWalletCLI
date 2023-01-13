import axios from "axios"
import ini from 'ini'
import fs from 'fs'

// import { checkTx } from "./checkTx.js"

const config = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))
const apiAddress = config.main.submitAPI

// const headers = {
//   'Content-Type': 'application/cbor',
//   'project_id': ''
// }

let headers = {}

if (apiAddress == "https://cardano-mainnet.blockfrost.io/api/v0/tx/submit") {
  headers = {
    'Content-Type': 'application/cbor',
    'project_id': config.main.blockfrostID
  }
} else {
  headers = {
    'Content-Type': 'application/cbor'
  }
}



export async function sendTx(tx) {
  try {
    const response = await axios.post(apiAddress, tx, { headers })
    // const response2 = await axios.post("https://api.koios.rest/api/v0/submittx", tx, { headers })
    // const response3 = await axios.post("https://eu-de.trickster.fi/api/v0/submittx", tx, { headers })
    // const response4 = await axios.post("https://eu-fr.trickster.fi/api/v0/submittx", tx, { headers })
    // const response4 = await axios.post("https: //cedric.app/api/submit/tx", tx, { headers })
    // await checkTx(txHash)
    console.log("1", response.data)
    // console.log("2",response2.data)
    // console.log("3",response3.data)
    // console.log("4",response4.data)
    // console.log("4",response4.data)
  } catch (error) {
    console.error(error.response);
  }
}
// export function sendTx(tx) {
//   const promise1 = axios.post(apiAddress, tx, { headers })
// const promise2 = axios.post("https://api.koios.rest/api/v0/submittx", tx, { headers })
// Promise.all([promise1, promise2]).then(function(values) {
//   console.log(values);
// });}