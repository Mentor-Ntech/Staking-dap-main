// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Staking is ReentrancyGuard {

    //Creating variable for stakingtoken and rewardtoken
      IERC20 public s_stakingToken;
      IERC20 public s_rewardToken;

    uint public constant REWARD_RATE=1e18; //uint public constant REWARD_RATE=10;
    uint private totalStakedTokens;
    uint public rewardPerTokenStored;
    uint public lastUpdateTime;
  

    //We are going to map through the address with our integers.
    mapping(address=>uint) public stakedBalance;
    mapping(address=>uint) public rewards;
    mapping(address=>uint) public userRewardPerTokenPaid;


    //Event in smart contract is used to logged information
    //indexed user is the perfoming the stake action
    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);

    //construct is typically used to set the owners of contract which will be using ERC-20

     constructor(address stakingToken, address rewardToken) {
        //contruct is going to take some peremeter (address stakingToken, address rewardToken)

        s_stakingToken=IERC20(stakingToken);
        s_rewardToken=IERC20(rewardToken);
     }

    function rewardPerToken() public view returns(uint) {

        if(totalStakedTokens==0) {
            return rewardPerTokenStored;
        }
        uint totalTime = block.timestamp - lastUpdateTime;
        uint totalRewards = REWARD_RATE * totalTime;
        return rewardPerTokenStored + totalRewards / totalStakedTokens;
    }

    function earned(address account) public view returns(uint) {
        return stakedBalance[account] * (rewardPerToken() - userRewardPerTokenPaid[account] + rewards[account]);
    }

    //Modifier help the code more readable and useable and also check the behaviour of the function

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account]=rewardPerTokenStored;
        _; // This syntax is to excute our functions
    }

    function stake(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");
        totalStakedTokens+=amount;
        stakedBalance[msg.sender]+=amount;
        emit Staked(msg.sender,amount);
        bool success = s_stakingToken.transferFrom(msg.sender,address(this), amount);
        require(success, "Transfer Failed");
    }

    function withdraw(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");
        totalStakedTokens-=amount;
        stakedBalance[msg.sender]-=amount;
        emit Withdrawn(msg.sender, amount);

        bool success =s_stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer Failed");
    }

    function getReward() external nonReentrant updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        require(reward>0, "No rewards to claim");
        rewards[msg.sender]=0;

        emit RewardsClaimed(msg.sender, reward);
        bool success = s_rewardToken.transfer(msg.sender, reward);
        require(success, "Transfer Failed");
    }

}

 