// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BLXToken is ERC20, Ownable {
    uint256 public maxTransferAmount;

    constructor(
        uint256 initialSupply,
        uint256 _maxTransferAmount
    ) ERC20("BLUME Token", "BLX") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
        maxTransferAmount = _maxTransferAmount;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function updateMaxTransferAmount(uint256 newLimit) external onlyOwner {
        maxTransferAmount = newLimit;
    }

    // New in OZ v5: _update() is the safe hook to use
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override {
        if (from != address(0) && from != owner()) {
            require(value <= maxTransferAmount, "Transfer exceeds allowed limit");
        }
        super._update(from, to, value);
    }
}
