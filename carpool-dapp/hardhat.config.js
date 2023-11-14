require("@nomiclabs/hardhat-waffle")
require('dotenv').config();

const PRIVATEKEY = process.env.PRIVATEKEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {},
      },
      {
        version: "0.8.4",
        settings: {},
      },
      {
        version: "0.8.0",
        settings: {},
      },
      {
        version: "0.8.20",
        settings: {},
      },
      {
        version: "0.8.19",
        settings: {},
      },
      // Add more compiler versions as needed
    ],
  },
  networks: {
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/i5g_gtahojk6nF78YXb8ZY5knJl5qHHx",
      accounts: [PRIVATEKEY]
    }
  }
};