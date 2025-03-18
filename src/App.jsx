import { useState } from 'react';
import './App.css';
import DonateButton from "./components/DonateButton";

function App() {
  const [donors, setDonors] = useState([]);

  return (
    <div className="app">
      <header className="header">
        <h1>M78星球重建计划</h1>
        <p>帮助M78星球重建家园，贡献你的力量！</p>
      </header>
      <main className="main-content">
        <div className="left-panel">
          <DonateButton onUpdateDonors={setDonors} />
          <div className="testnet-link">
            <p>需要获取Sepolia ETH？</p>
            <a href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia" target="_blank" rel="noopener noreferrer">
              点击这里获取
            </a>
          </div>
        </div>
        <div className="right-panel">
          <h3>捐赠者名单</h3>
          <div className="donor-list-container">
            <ul className="donor-list">
              {donors.map((donor, index) => (
                <li key={index}>{donor}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>© 2025-2030 M78星球重建计划. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;