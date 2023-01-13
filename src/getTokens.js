import axios from "axios"
import BigNumber from "bignumber.js";
import cardanoUtil from '@stricahq/typhonjs';
import ini from 'ini'
import fs from 'fs'

const config = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))
const apiAddress = "https://cardano-mainnet.blockfrost.io/api/v0/addresses/"

const headers = {
  'project_id': config.main.blockfrostID
}

function transform(inputs, address) {
  let finalUtxos = []
  // if (typeof inputs[0] === "undefined") {
  //   console.log("No inputs")
  //   return finalUtxos
  // }
  for (let i = 0; i < inputs.length; i++) {

const items=inputs[i].amount.filter((item) => item.unit !== 'lovelace')
for (let i=0;i<items.length;i++){
  let utxObject={
    policyId: items[i].unit.slice(0,56),
    assetName: items[i].unit.slice(56),
    amount: new BigNumber(items[i].quantity)
  }
finalUtxos.push(utxObject)
}

    
    // finalUtxos.push(inputs[i].amount.filter((item) => item.unit !== 'lovelace'))
  }
  return finalUtxos
}

export async function getTokens(address) {
  try {
    const response = await axios.get(apiAddress + address + "/utxos", { headers })
    const data = response.data
    const transformedData = transform(data, address)
    console.log(transformedData)
    return transformedData
  } catch (error) {
    console.error(error);
  }
}

// getTokens("addr1qxp9atl2wtga4z9qd5wm34zuhh9s6qre2gxlc72kdcflg8dpnqqgrds3nru3wr38xqhk2a8je540wz4tsdteaz0gjckqzsalg2")