# BLUME TOKEN - Security Audit Summary

## Manual Checks
- ✅ Ownership logic using OpenZeppelin Ownable
- ✅ Max transfer limits enforced in BLXToken
- ✅ Vault requires approval before token transfer
- ✅ Only users can deposit/withdraw their own tokens

## Tools Used
- Slither (for static analysis)
- Hardhat test scripts
- Manual verification on Sepolia

## Contracts Verified On Etherscan
- BLXToken: https://sepolia.etherscan.io/address/0x0BDA83f742ba63B38a0E51b7F7253a393441fCD9#code
- Vault: https://sepolia.etherscan.io/address/0xcDaEd6dd4251B6f602f037BB6E8dD39B4985054B#code
