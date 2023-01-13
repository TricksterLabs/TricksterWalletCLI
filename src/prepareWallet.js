import cardanoUtil from '@stricahq/typhonjs';
import bip32ed25519 from '@stricahq/bip32ed25519';
import { mnemonicToEntropy } from 'bip39';

import protocolParams from './getProtocolParams.js';

const { Bip32PrivateKey } = bip32ed25519;

export async function prepareWallet(entropy) {
  const rootKey = await Bip32PrivateKey.fromEntropy(Buffer.from(entropy, "hex"));

  const HARDENED = 2147483648

  const accountKey = rootKey
    .derive(HARDENED + 1852) // purpose
    .derive(HARDENED + 1815) // coin type
    .derive(HARDENED + 0) // account index

  const paymentSKey = accountKey
    .derive(0)
    .derive(0)
    .toPrivateKey()

  const paymentVKey = paymentSKey
    .toPublicKey()
    .hash()
    .toString("hex")

  const stakeSKey = accountKey
    .derive(2)
    .derive(0)
    .toPrivateKey()

  const stakeVKey = stakeSKey
    .toPublicKey()
    .hash()
    .toString("hex")

  const paymentCred0 = {
    hash: paymentVKey,
    type: cardanoUtil.types.HashType.ADDRESS,
    bipPath: {
      purpose: 1852 + HARDENED,
      coin: 1815 + HARDENED,
      account: 0 + HARDENED,
      chain: 0,
      index: 0,
    },
  };

  const stakeCredential = {
    hash: stakeVKey,
    type: cardanoUtil.types.HashType.ADDRESS,
    bipPath: {
      purpose: 1852 + HARDENED,
      coin: 1815 + HARDENED,
      account: 0 + HARDENED,
      chain: 2,
      index: 0,
    },
  };

  const baseAddress0 = new cardanoUtil.address.BaseAddress(cardanoUtil.types.NetworkId.MAINNET, paymentCred0, stakeCredential);
  const stakeAddress = new cardanoUtil.address.RewardAddress(cardanoUtil.types.NetworkId.MAINNET, stakeCredential);

  return { baseAddress0, stakeAddress, paymentSKey, stakeSKey }
}