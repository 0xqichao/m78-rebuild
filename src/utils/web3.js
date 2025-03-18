import { BrowserProvider, ethers } from "ethers";

// 连接 MetaMask 钱包
export const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new BrowserProvider(window.ethereum); // 使用 BrowserProvider
    await provider.send("eth_requestAccounts", []); // 请求用户授权
    const signer = await provider.getSigner(); // 注意：getSigner 是异步的
    return signer.address;
  } else {
    throw new Error("请安装 MetaMask 钱包");
  }
};

// 获取合约实例
export const getContract = async (address, abi) => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // 注意：getSigner 是异步的
  return new ethers.Contract(address, abi, signer);
};