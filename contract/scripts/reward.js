const rew = require("hardhat");

async function main() {
    const RewardToken = await rew.ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy(10000000);

    console.log("Reward contract deployed to", rewardToken.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});


