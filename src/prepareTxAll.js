import cardanoUtil from '@stricahq/typhonjs';
import protocolParams from './getProtocolParams.js';

import { getInputs } from './getInputs.js';
import {getTokens} from './getTokens.js';
import { getOutputs } from './getOutputsAll.js';
import { getTTL } from './getTTL.js';

export async function prepareTx(sendAmount, sendAddress, receiveAddress, TTL, paymentSKey) {
  const inputs = await getInputs(sendAddress)
  const tokens = await getTokens(sendAddress)
  // if (inputs.length === 0) {
  //   return
  // }
// console.log("inputs",inputs[1].tokens)
  const outputs = getOutputs(sendAmount, receiveAddress,tokens)
  
  // console.log("outputs",outputs)
  const finalTTL = await getTTL(TTL)

  const tx = new cardanoUtil.Transaction({ protocolParams }).paymentTransaction({
    inputs: inputs,
    outputs: outputs,
    changeAddress: cardanoUtil.utils.getAddressFromBech32(sendAddress),
    ttl: finalTTL
  })
  console.log(tx)
  // console.log(tx.outputs[0].tokens)

  console.log(tx.getFee().toNumber())


  const txHashBuffer = tx.getTransactionHash();
  const requiredSignatures = tx.getRequiredWitnesses();

  for (const [, bipPath] of requiredSignatures) {
    const privateKey = paymentSKey
    const witness = {
      publicKey: privateKey.toPublicKey().toBytes(),
      signature: privateKey.sign(txHashBuffer),
    };
    tx.addWitness(witness);
  }

  // console.log(tx.inputs.amount)
  // console.log(tx.outputs)

  const txBuilt = tx.buildTransaction()
  const txHash = txBuilt.hash
  const txBuffer = Buffer.from(txBuilt.payload, "hex")

  return { txBuffer, txHash }
}