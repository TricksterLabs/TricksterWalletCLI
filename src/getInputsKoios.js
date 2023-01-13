import axios from "axios"
import BigNumber from "bignumber.js";
import cardanoUtil from '@stricahq/typhonjs';

const apiAddress = "https://api.koios.rest/api/v0/address_info?_address="

function transform(inputs, address) {
  let finalUtxos = []
  if (typeof inputs[0] === "undefined") {
    console.log("No inputs")
    return finalUtxos
  }
  for (let i = 0; i < inputs[0].utxo_set.length; i++) {
    let newObject = {
      txId: inputs[0].utxo_set[i].tx_hash,
      index: inputs[0].utxo_set[i].tx_index,
      amount: new BigNumber(inputs[0].utxo_set[i].value),
      tokens: inputs[0].utxo_set[i].asset_list,
      address: cardanoUtil.utils.getAddressFromBech32(address)
    }
    finalUtxos.push(newObject)
  }
  return finalUtxos
}

export async function getInputs(address) {
  try {
    const response = await axios.get(apiAddress + address)
    const data = response.data
    const transformedData = transform(data, address)
    // console.log(transformedData)
    return transformedData
  } catch (error) {
    console.error(error);
  }
}