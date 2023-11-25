// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarpoolToken is ERC20, Ownable(msg.sender) {

    constructor() ERC20("CarpoolToken", "CTK") {
        _mint(msg.sender, 1000000 * 10**18); // Mint 1,000,000 tokens to the contract deployer
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    // Transfer tokens from the sender to a specific address
    function transferTokens(address from, address to, uint256 amount) external returns (bool) {
        _transfer(from, to, amount);
        return true;
    }
}

