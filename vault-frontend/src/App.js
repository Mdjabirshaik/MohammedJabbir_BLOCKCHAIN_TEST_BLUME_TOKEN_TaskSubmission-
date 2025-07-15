import { useState } from "react";
import { ethers } from "ethers";

const BLX_ADDRESS = "0x0BDA83f742ba63B38a0E51b7F7253a393441fCD9";
const VAULT_ADDRESS = "0xcDaEd6dd4251B6f602f037BB6E8dD39B4985054B";

const BLX_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)"
];

const VAULT_ABI = [
  "function deposit(uint256 amount) external",
  "function withdraw(uint256 amount) external",
  "function getBalance(address user) external view returns (uint256)"
];

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [blx, setBLX] = useState(null);
  const [vault, setVault] = useState(null);
  const [vaultBalance, setVaultBalance] = useState("0");

  const connect = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const blxContract = new ethers.Contract(BLX_ADDRESS, BLX_ABI, signer);
      const vaultContract = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);

      setWallet(accounts[0]);
      setBLX(blxContract);
      setVault(vaultContract);

      const balance = await vaultContract.getBalance(accounts[0]);
      setVaultBalance(ethers.formatUnits(balance, 18));
    }
  };

  const deposit = async () => {
    const amount = ethers.parseUnits("100", 18);
    const approveTx = await blx.approve(VAULT_ADDRESS, amount);
    await approveTx.wait();
    const depositTx = await vault.deposit(amount);
    await depositTx.wait();
    const newBalance = await vault.getBalance(wallet);
    setVaultBalance(ethers.formatUnits(newBalance, 18));
    alert("✅ Deposit successful!");
  };

  const withdraw = async () => {
    const amount = ethers.parseUnits("50", 18);
    const withdrawTx = await vault.withdraw(amount);
    await withdrawTx.wait();
    const newBalance = await vault.getBalance(wallet);
    setVaultBalance(ethers.formatUnits(newBalance, 18));
    alert("✅ Withdraw successful!");
  };

  return (
    <div className="p-10 space-y-6 font-mono">
      <h1 className="text-2xl font-bold">🚀 BLX Vault DApp</h1>

      {wallet ? (
        <>
          <p>🔗 Connected: {wallet}</p>
          <p>📊 Vault Balance: {vaultBalance} BLX</p>

          <div className="space-x-4">
            <button
              onClick={deposit}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Deposit 100 BLX
            </button>

            <button
              onClick={withdraw}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
            >
              Withdraw 50 BLX
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={connect}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
