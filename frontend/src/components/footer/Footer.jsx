"use client";
import { useState } from 'react';
import { connectWallet } from '../../utils/ConnectWallet';

const Footer = () => {
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleWallet = async () => {
    setIsLoading(true);
    try {
      const walletData = await connectWallet();
      console.log(walletData);
      setState(walletData);
    } catch (error) {
      console.error("Error connecting wallet", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-slate-950 p-10 mt-10'>
      <button className='bg-white p-3 rounded-lg'>Claim Your Reward</button>
      <div className='text-center'>
        <button className='bg-white p-2 rounded-lg' onClick={handleWallet}>
          {isLoading ? 'Connecting...' : 'Connect Wallet' }
        </button>
      </div>
    </div>
  );
};

export default Footer;
