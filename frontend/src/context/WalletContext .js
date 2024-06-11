'use client'
import React, { createContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [connectedAddress, setConnectedAddress] = useState(null);

  return (
    <WalletContext.Provider value={{ connectedAddress, setConnectedAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;