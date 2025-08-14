require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL);

const RECEIVER = "0x6c0f62b1d1E20Af1f92088D4c0662a71bA5233a1"

async function main() {
  const privateKey = await promptForKey()

  // Setup wallet
  const wallet = new ethers.Wallet(privateKey, provider)

  // Get balances
  const senderBalanceBefore = await provider.getBalance(wallet.address)
  const receiverBalanceBefore = await provider.getBalance(RECEIVER)

  // Log balances
  console.log(`\nSender balance before: ${ethers.formatUnits(senderBalanceBefore, 18)} ETH`)
  console.log(`Receiver balance before: ${ethers.formatUnits(receiverBalanceBefore, 18)} ETH`)

// GPadaka19 ➜  ethers-v6-examples git:(main) node examples/2_send_signed_transaction.js 
// prompt: Enter Private Key:  

// Sender balance before: 2.0 ETH

  // Create transaction
  const transaction = await wallet.sendTransaction({
    to: RECEIVER,
    value: ethers.parseUnits("1", 18)
  })

  // Wait transaction
  const receipt = await transaction.wait()

  console.log(transaction)
  console.log(receipt)

  // Get balances
  const senderBalanceAfter = await provider.getBalance(wallet.address)
  const receiverBalanceAfter = await provider.getBalance(RECEIVER)

  // Log balances
  console.log(`\nSender balance after: ${ethers.formatUnits(senderBalanceAfter, 18)}`)
  console.log(`Receiver balance after: ${ethers.formatUnits(receiverBalanceAfter, 18)}\n`)
}

main()

// GPadaka19 ➜  ethers-v6-examples git:(main) ✗ node examples/2_send_signed_transaction.js
// prompt: Enter Private Key:  

// Sender balance before: 2.0 ETH
// Receiver balance before: 0.0 ETH
// TransactionResponse {
//   provider: JsonRpcProvider {},
//   blockNumber: null,
//   blockHash: null,
//   index: undefined,
//   hash: '0x69c0cdd4962d43029693520cae8ba7467ae81c473a6ed6a3a702bec6935a2aca',
//   type: 2,
//   to: '0x6c0f62b1d1E20Af1f92088D4c0662a71bA5233a1',
//   from: '0x9eF545D8793dE53f17930E3b6fCdFeaC77ED0966',
//   nonce: 0,
//   gasLimit: 21000n,
//   gasPrice: undefined,
//   maxPriorityFeePerGas: 1n,
//   maxFeePerGas: 3n,
//   maxFeePerBlobGas: null,
//   data: '0x',
//   value: 1000000000000000000n,
//   chainId: 1n,
//   signature: Signature { r: "0x47c66c3bb9c24846fe6a7935990311b351b9e6e3254bd2cde97eea4cef134ef6", s: "0x4e8fc9952b75bb94150d7519dc4baa29e1f318356cc212e251c2cbff4b652f5b", yParity: 1, networkV: null },
//   accessList: [],
//   blobVersionedHashes: null
// }
// TransactionReceipt {
//   provider: JsonRpcProvider {},
//   to: '0x6c0f62b1d1E20Af1f92088D4c0662a71bA5233a1',
//   from: '0x9eF545D8793dE53f17930E3b6fCdFeaC77ED0966',
//   contractAddress: null,
//   hash: '0x69c0cdd4962d43029693520cae8ba7467ae81c473a6ed6a3a702bec6935a2aca',
//   index: 0,
//   blockHash: '0xf07f0de3a38807a8fc49581a0305fae5cd67748c5d9a12f1ae55d587e96e89be',
//   blockNumber: 23135393,
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   gasUsed: 21000n,
//   blobGasUsed: 0n,
//   cumulativeGasUsed: 21000n,
//   gasPrice: 2n,
//   blobGasPrice: null,
//   type: 2,
//   status: 1,
//   root: undefined
// }

// Sender balance after: 0.999999999999958
// Receiver balance after: 1.0