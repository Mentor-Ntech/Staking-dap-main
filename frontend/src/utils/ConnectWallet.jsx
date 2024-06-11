import { ethers, Contract } from "ethers";
import stakingAbi from '../ABI/stakingAbi.json';
import stakingTokenAbi from '../ABI/stakeTokenAbi.json';

export const connectWallet = async () => {
  try {
    let [signer, provider, stakingContract, stakeTokenContract, chainId] = [null, null, null, null, null];

    if (!window.ethereum) {
      throw new Error("Metamask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const chainIdHex = await window.ethereum.request({
      method: 'eth_chainId'
    });

    chainId = parseInt(chainIdHex, 16);
    const selectedAccount = accounts[0];

    if (!selectedAccount) {
      throw new Error('No Ethereum accounts are available');
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    const stakingContractAddress = "0x9C4CcBa8A7b4728Bc1Bd36A3e2d0a8135F882F73"; // staking
    const stakeTokenContractAddress = "0x84E075d5719D6c5e34D8Ea3CF03Bf4a69e32e8Ae"; // deploy

    stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
    stakeTokenContract = new Contract(stakeTokenContractAddress, stakingTokenAbi, signer);

    return { provider, selectedAccount, stakeTokenContract, stakingContract, chainId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
