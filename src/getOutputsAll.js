import BigNumber from "bignumber.js";
import cardanoUtil from '@stricahq/typhonjs';

// import {getTokens} from "./getTokens.js"



export function getOutputs(amount, address,tokens) {
  // const tokens=await getTokens(address)
  return [
    {
      amount: new BigNumber(amount * 1000000),
      address: cardanoUtil.utils.getAddressFromBech32(address),
      tokens: tokens
    }
  ]
}