import React, { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import WalletConnect from './components/WalletConnect';
import CollateralDeposit from './components/CollateralDeposit';
import TransactionStatus from './components/TransactionStatus';
import CrossChainAnimation from './components/CrossChainAnimation';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import { ChainTab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<ChainTab>('solana');

  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
        <div className="relative container max-w-4xl mx-auto px-4 py-8 flex-grow flex flex-col">
          <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="relative flex-grow z-10">
            <CrossChainAnimation />
            
            <div className="flex flex-col items-center">
              <WalletConnect />
              <CollateralDeposit />
              <TransactionStatus />
            </div>
          </div>
          
          <AppFooter />
        </div>
        
        {/* Decorative gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-700/10 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-700/10 rounded-full filter blur-[100px]" />
        </div>
      </div>
    </WalletProvider>
  );
}

export default App;