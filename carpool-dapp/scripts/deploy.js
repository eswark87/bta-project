const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const CarpoolToken = await ethers.getContractFactory("CarpoolToken");
  const token = await CarpoolToken.deploy();
  await token.deployed();
  const CarpoolApp = await hre.ethers.getContractFactory("Carpool");
  const Carpool = await CarpoolApp.deploy(token.address);
  await Carpool.deployed();
  console.log(`Token Address: ${token.address}`);
  console.log(`Contract Address: ${Carpool.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
