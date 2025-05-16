import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

const CollateralDeposit: React.FC = () => {
  const { 
    walletState, 
    depositCollateral, 
    depositAmount, 
    setDepositAmount, 
    borrowAmount,
    transactionStatus
  } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletState.solanaConnected || !walletState.baseConnected) return;
    if (depositAmount <= 0 || depositAmount > walletState.usdcBalance) return;
    
    setIsSubmitting(true);
    
    try {
      await depositCollateral(depositAmount);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (transactionStatus.fundsReleased) {
    return null;
  }

  return (
    <div className="bg-opacity-20 bg-gray-900 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 w-full mt-6">
      <h3 className="text-white font-medium text-lg mb-4">Deposit Collateral</h3>
      
      <form onSubmit={handleDepositSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            USDC Amount to Deposit
          </label>
          <div className="relative">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              disabled={!walletState.solanaConnected || isSubmitting || transactionStatus.depositComplete}
              min={1}
              max={walletState.usdcBalance}
              step={1}
              className="w-full bg-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
              <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-1">
                <span className="text-blue-300 text-xs">$</span>
              </div>
              <span className="text-gray-400">USDC</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1 flex justify-between">
            <span>Balance: {walletState.usdcBalance.toFixed(2)} USDC</span>
            <button 
              type="button"
              onClick={() => setDepositAmount(walletState.usdcBalance)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
              disabled={!walletState.solanaConnected || isSubmitting || transactionStatus.depositComplete}
            >
              Max
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            ETH You Will Receive (75% LTV)
          </label>
          <div className="relative">
            <input
              type="number"
              value={borrowAmount}
              disabled
              className="w-full bg-gray-800/50 rounded-lg py-3 px-4 text-gray-300 focus:outline-none"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
              <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center mr-1">
                <span className="text-teal-300 text-xs">Ξ</span>
              </div>
              <span className="text-gray-400">ETH</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            <span>Borrowable at 75% of collateral value</span>
          </div>
        </div>
        
        <div className="relative group">
          <button
            type="submit"
            disabled={
              !walletState.solanaConnected || 
              !walletState.baseConnected ||
              isSubmitting || 
              transactionStatus.depositComplete ||
              depositAmount <= 0 || 
              depositAmount > walletState.usdcBalance
            }
            className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg text-white font-medium transition-all duration-200 shadow-lg shadow-purple-900/30
              ${(!walletState.solanaConnected || !walletState.baseConnected || isSubmitting || transactionStatus.depositComplete) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:from-purple-500 hover:to-teal-500'}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Transaction...
              </div>
            ) : transactionStatus.depositComplete ? (
              "Collateral Deposited ✓"
            ) : (
              "Deposit Collateral"
            )}
          </button>
          
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 bg-gray-800 rounded-lg p-2 text-sm text-gray-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            Collateral stays on Solana while you borrow ETH on Base!
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollateralDeposit;