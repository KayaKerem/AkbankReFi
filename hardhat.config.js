require("@nomiclabs/hardhat-waffle");
require("dotenv").config()


const PRIVATE_KEY = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      // gasPrice: 225000000000,
      // chainId: 43113,
      accounts: [PRIVATE_KEY]
    }
  }
};