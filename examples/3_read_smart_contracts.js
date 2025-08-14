require("dotenv").config()
const { ethers } = require("ethers")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)"
]

// Setup contract
const ERC20_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider)

async function main() {
  // Get contract state
  const name = await contract.name()
  const symbol = await contract.symbol()
  const decimals = await contract.decimals()
  const totalSupply = await contract.totalSupply()

  // Log contract state
  console.log(`\nReading from ${ERC20_ADDRESS}\n`)
  console.log(`Name: ${name}`)
  console.log(`Symbol: ${symbol}`)
  console.log(`Decimals: ${decimals}`)
  console.log(`Total Supply: ${totalSupply}`)

  // GPadaka19 ➜  ethers-v6-examples git:(main) ✗ node examples/3_read_smart_contracts.js 
  // Reading from 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
  // Name: USD Coin
  // Symbol: USDC
  // Decimals: 6
  // Total Supply: 43045455372951411

  // Get ERC20 balance
  const USER_ADDRESS = "0xEe7aE85f2Fe2239E27D9c1E23fFFe168D63b4055"
  const balance = await contract.balanceOf(USER_ADDRESS)

  // Log ERC20 balance
  console.log(`Balance: ${balance}`)

  // GPadaka19 ➜  ethers-v6-examples git:(main) ✗ node examples/3_read_smart_contracts.js
  // Reading from 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48

  // Name: USD Coin
  // Symbol: USDC
  // Decimals: 6
  // Total Supply: 43045007489931381
  // Balance: 1882460322840474
}

main()