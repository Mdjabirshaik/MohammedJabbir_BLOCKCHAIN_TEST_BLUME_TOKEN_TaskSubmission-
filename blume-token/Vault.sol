// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vault is Ownable {
    IERC20 public blxToken;

    mapping(address => uint256) public balances;

   constructor(address _blxToken) Ownable(msg.sender) {
    blxToken = IERC20(_blxToken);
}


    function deposit(uint256 amount) external {
        require(amount > 0, "Cannot deposit 0");

        bool success = blxToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");

        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        bool success = blxToken.transfer(msg.sender, amount);
        require(success, "Token transfer failed");
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
