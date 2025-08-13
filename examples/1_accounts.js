// Require packages
require("dotenv").config();
const { ethers } = require("ethers");

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

const provider = new ethers.JsonRpcProvider(URL);
const ADDRESS = "0xdadB0d80178819F2319190D340ce9A924f783711";

async function main() {
  // Get balance
  const balance = await provider.getBalance(ADDRESS);
  // Log balance
  console.log(`\nETH Balance of ${ADDRESS} --> ${ethers.formatUnits(balance, 18)} ETH`);
}

main()