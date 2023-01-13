import BigNumber from "bignumber.js";
import cardanoUtil from '@stricahq/typhonjs';

export function getOutputs(amount, address) {
  return [
    {
      amount: new BigNumber(amount * 1000000),
      address: cardanoUtil.utils.getAddressFromBech32(address),
      tokens: []
    }
  ]
}