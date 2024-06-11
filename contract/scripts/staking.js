const stik = require('hardhat')

async function main() {
    const Staking = await stik.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy('0x84E075d5719D6c5e34D8Ea3CF03Bf4a69e32e8Ae', '0x370B5e5AC742449D4D189C062037975967f86511');  //deploy address and reward address

    console.log("staking contract deployed to", staking.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

// 0x9C4CcBa8A7b4728Bc1Bd36A3e2d0a8135F882F73