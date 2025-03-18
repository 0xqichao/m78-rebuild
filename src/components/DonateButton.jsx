import { useState, useEffect } from "react";
import { connectWallet, getContract } from "../utils/web3";
import contractABI from "../contracts/FundM78.json";
import "./DonateButton.css";
import { ethers } from "ethers";

const DonateButton = ({ onUpdateDonors }) => {
  const [amount, setAmount] = useState("");
  const [totalDonations, setTotalDonations] = useState(0);
  const [donorCount, setDonorCount] = useState(0);

  // 获取合约余额和捐赠人数
  const fetchDonationData = async () => {
    try {
      const contract = await getContract("0x5FbDB2315678afecb367f032d93F642f64180aa3", contractABI);
      const provider = new ethers.BrowserProvider(window.ethereum);

      // 获取合约余额
      const balance = await provider.getBalance(contract.target);
      setTotalDonations(ethers.formatEther(balance));

      // 获取捐赠人数
      const count = await contract.getFunderCount();
      setDonorCount(count.toString());

      // 获取捐赠者名单
      const donorList = [];
      for (let i = 0; i < count; i++) {
        const donor = await contract.getFunder(i);
        donorList.push(donor);
      }
      onUpdateDonors(donorList); // 将捐赠者名单传递给父组件
    } catch (error) {
      console.error("获取数据失败：", error);
    }
  };

  useEffect(() => {
    fetchDonationData();
  }, []);

  const handleDonate = async () => {
    try {
      const userAddress = await connectWallet();
      const contract = await getContract("0x5FbDB2315678afecb367f032d93F642f64180aa3", contractABI);
      const tx = await contract.fund({ value: ethers.parseEther(amount) });
      await tx.wait();
      alert("捐赠成功！");
      fetchDonationData(); // 更新数据
    } catch (error) {
      console.error("捐赠失败：", error);
    }
  };

  return (
    <div className="donate-container">
      <div className="donation-stats">
        <p>总捐赠金额: {totalDonations} ETH</p>
        <p>捐赠人数: {donorCount}</p>
      </div>
      <input
        type="text"
        placeholder="捐赠金额 (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="donate-input"
      />
      <button onClick={handleDonate} className="donate-button">
        捐赠
      </button>
    </div>
  );
};

export default DonateButton;