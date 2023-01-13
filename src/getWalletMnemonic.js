import { entropyToMnemonic } from 'bip39';
import readLineSync from 'readline-sync'
const entropy=readLineSync.question("Entropy: ")
console.log(entropyToMnemonic(entropy))