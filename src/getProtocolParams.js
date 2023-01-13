import fs from 'fs'
import BigNumber from "bignumber.js"
const json = JSON.parse(fs.readFileSync('./config/protocol.json', 'utf-8'))

const protocolParams = {
  minFeeA: new BigNumber(json.txFeePerByte),
  minFeeB: new BigNumber(json.txFeeFixed),
  stakeVKeyDeposit: new BigNumber(json.stakeAddressDeposit),
  lovelacePerUtxoWord: new BigNumber(json.utxoCostPerWord),
  collateralPercent: new BigNumber(json.collateralPercentage),
  priceMem: new BigNumber(json.executionUnitPrices.priceMemory),
  priceSteps: new BigNumber(json.executionUnitPrices.priceSteps),
  languageView: json.costModels
}


export default protocolParams;