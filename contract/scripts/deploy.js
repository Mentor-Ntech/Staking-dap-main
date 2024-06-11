const hre = require("hardhat")

async function main() {
    const StakeToken = await hre.ethers.getContractFactory("StakeToken");
    const stakeToken = await StakeToken.deploy(1000)

    console.log("stakeToken contract deployed to", stakeToken.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
});